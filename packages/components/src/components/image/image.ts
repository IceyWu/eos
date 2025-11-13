import { formatSize } from "@eos/utils";
import { decode } from "blurhash";

// 全局图片加载器池,限制并发加载数量
class ImageLoader {
	private static instance: ImageLoader;
	private loadingQueue: Array<{
		src: string;
		resolve: (img: HTMLImageElement) => void;
		reject: (error: Error) => void;
	}> = [];
	private activeLoads = 0;
	private maxConcurrent = 6; // 浏览器通常限制同域名并发连接数为6
	private imageCache = new Map<string, HTMLImageElement>();

	static getInstance(): ImageLoader {
		if (!ImageLoader.instance) {
			ImageLoader.instance = new ImageLoader();
		}
		return ImageLoader.instance;
	}

	async load(src: string): Promise<HTMLImageElement> {
		// 检查缓存
		const cached = this.imageCache.get(src);
		if (cached) {
			return Promise.resolve(cached);
		}

		return new Promise((resolve, reject) => {
			this.loadingQueue.push({ src, resolve, reject });
			this.processQueue();
		});
	}

	private processQueue() {
		while (
			this.activeLoads < this.maxConcurrent &&
			this.loadingQueue.length > 0
		) {
			const task = this.loadingQueue.shift();
			if (!task) continue;

			this.activeLoads++;
			const img = new Image();

			img.onload = () => {
				this.activeLoads--;
				this.imageCache.set(task.src, img);
				task.resolve(img);
				this.processQueue();
			};

			img.onerror = () => {
				this.activeLoads--;
				task.reject(new Error(`Failed to load image: ${task.src}`));
				this.processQueue();
			};

			img.src = task.src;
		}
	}

	// 清理缓存（可选）
	clearCache(src?: string) {
		if (src) {
			this.imageCache.delete(src);
		} else {
			this.imageCache.clear();
		}
	}
}

// BlurHash 缓存
class BlurhashCache {
	private static cache = new Map<string, string>();
	private static maxSize = 100; // 限制缓存大小

	static get(blurhash: string, width: number, height: number): string | null {
		const key = `${blurhash}_${width}_${height}`;
		return BlurhashCache.cache.get(key) || null;
	}

	static set(blurhash: string, width: number, height: number, dataUrl: string) {
		const key = `${blurhash}_${width}_${height}`;

		// 简单的 LRU 策略：超过最大缓存时删除最早的
		if (
			BlurhashCache.cache.size >= BlurhashCache.maxSize &&
			!BlurhashCache.cache.has(key)
		) {
			const firstKey = BlurhashCache.cache.keys().next().value;
			if (firstKey !== undefined) {
				BlurhashCache.cache.delete(firstKey);
			}
		}

		BlurhashCache.cache.set(key, dataUrl);
	}
}

// IntersectionObserver 单例，用于懒加载
class LazyLoadObserver {
	private static instance: IntersectionObserver | null = null;
	private static elements = new WeakMap<Element, Function>();

	static getObserver(): IntersectionObserver {
		if (!LazyLoadObserver.instance) {
			LazyLoadObserver.instance = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const callback = LazyLoadObserver.elements.get(entry.target);
							if (callback) {
								callback();
								LazyLoadObserver.instance?.unobserve(entry.target);
								LazyLoadObserver.elements.delete(entry.target);
							}
						}
					});
				},
				{
					rootMargin: "50px", // 提前50px开始加载
				},
			);
		}
		return LazyLoadObserver.instance;
	}

	static observe(element: Element, callback: Function) {
		LazyLoadObserver.elements.set(element, callback);
		LazyLoadObserver.getObserver().observe(element);
	}

	static unobserve(element: Element) {
		LazyLoadObserver.getObserver().unobserve(element);
		LazyLoadObserver.elements.delete(element);
	}
}

/**
 * 优化的 EosImage 组件
 * 
 * 新的参数系统：
 * - src: 图片资源，可以是 URL 或 blurhash
 * - src-type: 'url' | 'blurhash' - 指定 src 的类型
 * - placeholder: 占位资源，可以是 URL 或 blurhash
 * - placeholder-type: 'url' | 'blurhash' - 指定 placeholder 的类型
 * 
 * 逻辑：
 * 1. 如果 src-type 是 'blurhash'，直接显示解码后的图片，不显示 loading 状态
 * 2. 如果 src-type 是 'url'，显示 placeholder 作为 loading 占位符
 */
export class EosImage extends HTMLElement {
	// 配置常量
	private static readonly CONFIG = {
		MAX_BLURHASH_SIZE: 32,
		SHOW_DELAY_DEFAULT: 0,
		FADE_DURATION: 300
	} as const;

	// 状态管理
	private isLoading = true;
	private hasError = false;
	private placeholderDataUrl: string | null = null;
	private srcDataUrl: string | null = null;
	private loadTimer: number | null = null;
	private imageLoader = ImageLoader.getInstance();
	private isRendered = false;

	// DOM 元素缓存
	private img: HTMLImageElement | null = null;
	private placeholderImage: HTMLImageElement | null = null;
	private loadingContainer: HTMLElement | null = null;
	private loadingOverlay: HTMLElement | null = null;
	private errorContainer: HTMLElement | null = null;

	// 监听的属性
	static get observedAttributes() {
		return [
			"src",
			"src-type",
			"alt",
			"width",
			"height",
			"loading",
			"crossorigin",
			"object-fit",
			"placeholder",
			"placeholder-type",
			"show-delay",
		];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.initializeDOM();
	}

	// 初始化 DOM 结构，只执行一次
	private initializeDOM() {
		if (!this.shadowRoot) return;

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: inline-block;
					position: relative;
					overflow: hidden;
					background: #f0f0f0;
					min-width: 100px;
					min-height: 100px;
				}

				.container {
					width: 100%;
					height: 100%;
					position: relative;
				}

				.image {
					width: 100%;
					height: 100%;
					display: block;
					animation: fadeIn 0.3s ease-in;
				}

				.placeholder-image {
					filter: blur(0);
					transform: scale(1.1);
				}

				.loading-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(255, 255, 255, 0.3);
				}

				.loading-container,
				.error-container {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #666;
				}

				.default-loading {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12px;
				}

				.spinner {
					width: 32px;
					height: 32px;
					border: 3px solid #e0e0e0;
					border-top-color: #007bff;
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}

				.default-error {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12px;
					color: #999;
				}

				.error-icon {
					width: 48px;
					height: 48px;
					color: #ccc;
				}

				@keyframes spin {
					to { transform: rotate(360deg); }
				}

				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				:host([responsive]) .image {
					max-width: 100%;
					height: auto;
				}

				:host([circle]) {
					border-radius: 50%;
				}

				:host([circle]) .image {
					border-radius: 50%;
				}

				.hidden { display: none !important; }
			</style>
			<div class="container">
				<!-- 占位符图片 -->
				<img class="image placeholder-image hidden" alt="">
				
				<!-- 主图片 -->
				<img class="image main-image hidden" alt="">
				
				<!-- 加载状态 -->
				<div class="loading-container hidden">
					<slot name="loading">
						<div class="default-loading">
							<div class="spinner"></div>
							<span>加载中...</span>
						</div>
					</slot>
				</div>
				
				<!-- 加载遮罩（用于有占位符时） -->
				<div class="loading-overlay hidden">
					<slot name="loading"></slot>
				</div>
				
				<!-- 错误状态 -->
				<div class="error-container hidden">
					<slot name="error">
						<div class="default-error">
							<svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
								<line x1="9" y1="9" x2="15" y2="15"/>
								<line x1="15" y1="9" x2="9" y2="15"/>
							</svg>
							<span>图片加载失败</span>
						</div>
					</slot>
				</div>
			</div>
		`;

		// 缓存所有 DOM 元素引用
		this.img = this.shadowRoot.querySelector(".main-image") as HTMLImageElement;
		this.placeholderImage = this.shadowRoot.querySelector(".placeholder-image") as HTMLImageElement;
		this.loadingContainer = this.shadowRoot.querySelector(".loading-container") as HTMLElement;
		this.loadingOverlay = this.shadowRoot.querySelector(".loading-overlay") as HTMLElement;
		this.errorContainer = this.shadowRoot.querySelector(".error-container") as HTMLElement;
		this.isRendered = true;
	}

	connectedCallback() {
		this.updateStyles();
		this.processPlaceholder();
		this.processSource();

		// 检查是否需要懒加载
		const loading = this.getAttribute("loading");
		const srcType = this.getAttribute("src-type") || "url";

		// 如果 src 是 blurhash，直接显示，不需要加载
		if (srcType === "blurhash") {
			this.isLoading = false;
			this.updateDisplay();
		} else {
			// URL 类型需要加载
			if (loading === "lazy") {
				// 使用 IntersectionObserver 实现懒加载
				LazyLoadObserver.observe(this, () => this.loadImage());
			} else {
				this.loadImage();
			}
		}
	}

	disconnectedCallback() {
		// 清理定时器
		if (this.loadTimer !== null) {
			clearTimeout(this.loadTimer);
			this.loadTimer = null;
		}

		// 取消懒加载观察
		LazyLoadObserver.unobserve(this);
		
		// 清理事件监听器
		if (this.img) {
			this.img.onerror = null;
			this.img.onload = null;
		}
		
		// 清理 DOM 引用
		this.img = null;
		this.placeholderImage = null;
		this.loadingContainer = null;
		this.loadingOverlay = null;
		this.errorContainer = null;
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue !== newValue && this.isRendered) {
			switch (name) {
				case "src":
				case "src-type":
					this.isLoading = true;
					this.hasError = false;
					this.processSource();
					const srcType = this.getAttribute("src-type") || "url";

					// blurhash 类型直接显示，不加载
					if (srcType === "blurhash") {
						this.isLoading = false;
						this.updateDisplay();
					} else {
						const loading = this.getAttribute("loading");
						if (loading !== "lazy") {
							this.loadImage();
						} else {
							this.updateDisplay();
						}
					}
					break;

				case "object-fit":
				case "width":
				case "height":
					this.updateStyles();
					if (name === "width" || name === "height") {
						this.processPlaceholder();
						this.processSource();
					}
					break;

				case "placeholder":
				case "placeholder-type":
					this.processPlaceholder();
					this.updateDisplay();
					break;

				default:
					this.updateImageAttributes();
			}
		}
	}

	private async loadImage() {
		const src = this.getAttribute("src");
		if (!src) {
			this.hasError = true;
			this.isLoading = false;
			this.updateDisplay();
			return;
		}

		// 清理之前的定时器
		if (this.loadTimer !== null) {
			clearTimeout(this.loadTimer);
			this.loadTimer = null;
		}

		try {
			// 使用图片加载器池
			await this.imageLoader.load(src);

			// 获取延时参数
			const showDelay = parseInt(this.getAttribute("show-delay") || String(EosImage.CONFIG.SHOW_DELAY_DEFAULT), 10);

			const showImage = () => {
				this.isLoading = false;
				this.hasError = false;
				if (this.img) {
					this.img.src = src;
				}
				this.updateDisplay();
				this.updateImageAttributes();
				this.dispatchEvent(
					new CustomEvent("load", {
						detail: { src },
						bubbles: true,
						composed: true,
					}),
				);
			};

			if (showDelay > 0) {
				this.loadTimer = window.setTimeout(showImage, showDelay);
			} else {
				showImage();
			}
		} catch (error) {
			this.isLoading = false;
			this.hasError = true;
			this.updateDisplay();
			this.dispatchEvent(
				new CustomEvent("error", {
					detail: { src },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	/**
	 * 解码 blurhash 字符串为 data URL
	 */
	private decodeBlurhash(blurhash: string): string | null {
		if (!blurhash) return null;

		// 获取解码尺寸
		const width = parseInt(this.getAttribute("width") || String(EosImage.CONFIG.MAX_BLURHASH_SIZE));
		const height = parseInt(this.getAttribute("height") || String(EosImage.CONFIG.MAX_BLURHASH_SIZE));
		const decodeWidth = Math.min(width, EosImage.CONFIG.MAX_BLURHASH_SIZE);
		const decodeHeight = Math.min(height, EosImage.CONFIG.MAX_BLURHASH_SIZE);

		// 检查缓存
		let dataUrl = BlurhashCache.get(blurhash, decodeWidth, decodeHeight);

		if (!dataUrl) {
			try {
				// 解码 blurhash
				const pixels = decode(blurhash, decodeWidth, decodeHeight);

				// 创建 canvas
				const canvas = document.createElement("canvas");
				canvas.width = decodeWidth;
				canvas.height = decodeHeight;

				const ctx = canvas.getContext("2d");
				if (ctx) {
					const imageData = ctx.createImageData(decodeWidth, decodeHeight);
					imageData.data.set(pixels);
					ctx.putImageData(imageData, 0, 0);

					dataUrl = canvas.toDataURL();
					// 缓存结果
					BlurhashCache.set(blurhash, decodeWidth, decodeHeight, dataUrl);
				}
			} catch (error) {
				console.error("Failed to decode blurhash:", error);
				// 发送 BlurHash 解码错误事件
				this.dispatchEvent(new CustomEvent("blurhash-error", {
					detail: { error, blurhash },
					bubbles: true,
					composed: true,
				}));
			}
		}

		return dataUrl;
	}

	/**
	 * 处理占位符资源
	 */
	private processPlaceholder() {
		const placeholder = this.getAttribute("placeholder");
		const placeholderType = this.getAttribute("placeholder-type") || "url";

		if (!placeholder) {
			this.placeholderDataUrl = null;
			return;
		}

		if (placeholderType === "blurhash") {
			this.placeholderDataUrl = this.decodeBlurhash(placeholder);
		} else {
			// URL 类型直接使用
			this.placeholderDataUrl = placeholder;
		}
	}

	/**
	 * 处理主图资源
	 */
	private processSource() {
		const src = this.getAttribute("src");
		const srcType = this.getAttribute("src-type") || "url";

		if (!src) {
			this.srcDataUrl = null;
			return;
		}

		if (srcType === "blurhash") {
			this.srcDataUrl = this.decodeBlurhash(src);
		} else {
			// URL 类型保留原始值
			this.srcDataUrl = src;
		}
	}

	/**
	 * 更新显示状态
	 */
	private updateDisplay() {
		if (!this.shadowRoot || !this.placeholderImage || !this.img || 
			!this.loadingContainer || !this.loadingOverlay || !this.errorContainer) {
			return;
		}

		// 重置所有状态
		[
			this.placeholderImage,
			this.img,
			this.loadingContainer,
			this.loadingOverlay,
			this.errorContainer,
		].forEach((el) => {
			el?.classList.add("hidden");
		});

		const srcType = this.getAttribute("src-type") || "url";

		// 如果 src 是 blurhash，直接显示解码后的图片，忽略错误状态
		if (srcType === "blurhash" && this.srcDataUrl) {
			// 强制重置错误状态，因为 BlurHash 不应该有加载错误
			this.hasError = false;
			
			// 清除图片的事件监听器，避免 onerror 被触发
			this.img.onerror = null;
			this.img.onload = null;
			this.img.src = this.srcDataUrl;
			this.img.classList.remove("hidden");
			return;
		}

		// 错误状态（仅对 URL 类型有效）
		if (this.hasError && srcType === "url") {
			this.errorContainer.classList.remove("hidden");
			return;
		}

		// URL 加载状态
		if (this.isLoading) {
			// 显示占位符
			if (this.placeholderDataUrl) {
				this.placeholderImage.src = this.placeholderDataUrl;
				this.placeholderImage.classList.remove("hidden");
				this.loadingOverlay.classList.remove("hidden");
			} else {
				this.loadingContainer.classList.remove("hidden");
			}
		} else {
			// 显示主图片（URL 类型加载完成）
			this.img.classList.remove("hidden");
		}
	}

	/**
	 * 更新样式
	 */
	private updateStyles() {
		if (!this.shadowRoot) return;

		const host = this.shadowRoot.host as HTMLElement;
		const width = this.getAttribute("width");
		const height = this.getAttribute("height");
		const objectFit = this.getAttribute("object-fit") || "cover";

		// 更新宿主元素尺寸
		if (width) {
			host.style.width = formatSize(width);
		}
		if (height) {
			host.style.height = formatSize(height);
		}

		// 更新所有图片的 object-fit
		const images = this.shadowRoot.querySelectorAll(".image");
		images.forEach((img: Element) => {
			(img as HTMLElement).style.objectFit = objectFit;
		});
	}

	/**
	 * 更新图片属性
	 */
	private updateImageAttributes() {
		if (!this.img) return;

		const alt = this.getAttribute("alt");
		const crossorigin = this.getAttribute("crossorigin");

		if (alt) this.img.alt = alt;
		if (crossorigin) this.img.crossOrigin = crossorigin;

		// 同时更新占位符图片的 alt
		const placeholderImage = this.shadowRoot?.querySelector(
			".placeholder-image",
		) as HTMLImageElement;
		if (placeholderImage && alt) {
			placeholderImage.alt = alt;
		}
	}
}
