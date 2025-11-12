import { formatSize } from "@eos/utils";
import { decode } from "blurhash";

// 全局图片加载器池，限制并发加载数量
class ImageLoader {
	private static instance: ImageLoader;
	private loadingQueue: Array<{ src: string; resolve: Function; reject: Function }> = [];
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
		while (this.activeLoads < this.maxConcurrent && this.loadingQueue.length > 0) {
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
		return this.cache.get(key) || null;
	}

	static set(blurhash: string, width: number, height: number, dataUrl: string) {
		const key = `${blurhash}_${width}_${height}`;
		
		// 简单的 LRU 策略：超过最大缓存时删除最早的
		if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
			const firstKey = this.cache.keys().next().value;
			if (firstKey !== undefined) {
				this.cache.delete(firstKey);
			}
		}
		
		this.cache.set(key, dataUrl);
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
					entries.forEach(entry => {
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
					rootMargin: '50px' // 提前50px开始加载
				}
			);
		}
		return LazyLoadObserver.instance;
	}

	static observe(element: Element, callback: Function) {
		this.elements.set(element, callback);
		this.getObserver().observe(element);
	}

	static unobserve(element: Element) {
		this.getObserver().unobserve(element);
		this.elements.delete(element);
	}
}

/**
 * 优化的 EosImage 组件
 * 支持加载状态、错误处理、BlurHash、懒加载和资源池管理
 */
export class EosImage extends HTMLElement {
	private img: HTMLImageElement | null = null;
	private isLoading = true;
	private hasError = false;
	private blurhashDataUrl: string | null = null;
	private loadTimer: number | null = null;
	private imageLoader = ImageLoader.getInstance();
	private isRendered = false;
	private pendingLoad = false;

	// 监听的属性
	static get observedAttributes() {
		return [
			"src",
			"alt",
			"width",
			"height",
			"loading",
			"crossorigin",
			"object-fit",
			"blurhash",
			"blurhash-only",
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

				.blurhash-preview {
					filter: blur(0);
					transform: scale(1.1);
				}

				.blurhash-image {
					filter: blur(0);
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
				<!-- BlurHash 预览 -->
				<img class="image blurhash-preview hidden" alt="">
				
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
				
				<!-- 加载遮罩（用于 blurhash 模式） -->
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

		// 缓存 DOM 引用
		this.img = this.shadowRoot.querySelector('.main-image') as HTMLImageElement;
		this.isRendered = true;
	}

	connectedCallback() {
		this.updateStyles();
		this.processBlurhash();

		// 检查是否需要懒加载
		const loading = this.getAttribute('loading');
		const isBlurhashOnly = this.hasAttribute('blurhash-only');
		
		if (!isBlurhashOnly) {
			if (loading === 'lazy') {
				// 使用 IntersectionObserver 实现懒加载
				LazyLoadObserver.observe(this, () => this.loadImage());
			} else {
				this.loadImage();
			}
		} else {
			this.isLoading = false;
			this.updateDisplay();
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
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue !== newValue && this.isRendered) {
			switch (name) {
				case 'src':
					this.isLoading = true;
					this.hasError = false;
					this.updateDisplay();
					if (!this.hasAttribute('blurhash-only')) {
						const loading = this.getAttribute('loading');
						if (loading !== 'lazy') {
							this.loadImage();
						}
					}
					break;
				
				case 'object-fit':
				case 'width':
				case 'height':
					this.updateStyles();
					break;
				
				case 'blurhash':
					this.processBlurhash();
					this.updateDisplay();
					break;
				
				case 'blurhash-only':
					if (newValue !== null) {
						this.isLoading = false;
						this.updateDisplay();
					}
					break;
				
				default:
					this.updateImageAttributes();
			}
		}
	}

	private async loadImage() {
		const src = this.getAttribute('src');
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
			const showDelay = parseInt(this.getAttribute('show-delay') || '0', 10);
			
			const showImage = () => {
				this.isLoading = false;
				this.hasError = false;
				if (this.img) {
					this.img.src = src;
				}
				this.updateDisplay();
				this.updateImageAttributes();
				this.dispatchEvent(
					new CustomEvent('load', {
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
				new CustomEvent('error', {
					detail: { src },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	private processBlurhash() {
		const blurhash = this.getAttribute('blurhash');
		if (!blurhash) {
			this.blurhashDataUrl = null;
			return;
		}

		// 获取解码尺寸
		const width = parseInt(this.getAttribute('width') || '32');
		const height = parseInt(this.getAttribute('height') || '32');
		const decodeWidth = Math.min(width, 32);
		const decodeHeight = Math.min(height, 32);

		// 检查缓存
		let dataUrl = BlurhashCache.get(blurhash, decodeWidth, decodeHeight);
		
		if (!dataUrl) {
			try {
				// 解码 blurhash
				const pixels = decode(blurhash, decodeWidth, decodeHeight);
				
				// 创建 canvas
				const canvas = document.createElement('canvas');
				canvas.width = decodeWidth;
				canvas.height = decodeHeight;
				
				const ctx = canvas.getContext('2d');
				if (ctx) {
					const imageData = ctx.createImageData(decodeWidth, decodeHeight);
					imageData.data.set(pixels);
					ctx.putImageData(imageData, 0, 0);
					
					dataUrl = canvas.toDataURL();
					// 缓存结果
					BlurhashCache.set(blurhash, decodeWidth, decodeHeight, dataUrl);
				}
			} catch (error) {
				console.error('Failed to decode blurhash:', error);
			}
		}

		this.blurhashDataUrl = dataUrl;
	}

	private updateDisplay() {
		if (!this.shadowRoot) return;

		const blurhashPreview = this.shadowRoot.querySelector('.blurhash-preview') as HTMLImageElement;
		const mainImage = this.shadowRoot.querySelector('.main-image') as HTMLImageElement;
		const loadingContainer = this.shadowRoot.querySelector('.loading-container') as HTMLElement;
		const loadingOverlay = this.shadowRoot.querySelector('.loading-overlay') as HTMLElement;
		const errorContainer = this.shadowRoot.querySelector('.error-container') as HTMLElement;

		// 重置所有状态
		[blurhashPreview, mainImage, loadingContainer, loadingOverlay, errorContainer].forEach(el => {
			el?.classList.add('hidden');
		});

		const isBlurhashOnly = this.hasAttribute('blurhash-only');

		if (isBlurhashOnly && this.blurhashDataUrl) {
			// 只显示 blurhash
			blurhashPreview.src = this.blurhashDataUrl;
			blurhashPreview.classList.remove('hidden');
		} else if (this.isLoading) {
			// 加载状态
			if (this.blurhashDataUrl) {
				blurhashPreview.src = this.blurhashDataUrl;
				blurhashPreview.classList.remove('hidden');
				loadingOverlay.classList.remove('hidden');
			} else {
				loadingContainer.classList.remove('hidden');
			}
		} else if (this.hasError) {
			// 错误状态
			errorContainer.classList.remove('hidden');
		} else {
			// 显示主图片
			mainImage.classList.remove('hidden');
		}
	}

	private updateStyles() {
		if (!this.shadowRoot) return;

		const host = this.shadowRoot.host as HTMLElement;
		const width = this.getAttribute('width');
		const height = this.getAttribute('height');
		const objectFit = this.getAttribute('object-fit') || 'cover';

		// 更新宿主元素尺寸
		if (width) {
			host.style.width = formatSize(width);
		}
		if (height) {
			host.style.height = formatSize(height);
		}

		// 更新所有图片的 object-fit
		const images = this.shadowRoot.querySelectorAll('.image');
		images.forEach((img: Element) => {
			(img as HTMLElement).style.objectFit = objectFit;
		});
	}

	private updateImageAttributes() {
		if (!this.img) return;

		const alt = this.getAttribute('alt');
		const crossorigin = this.getAttribute('crossorigin');

		if (alt) this.img.alt = alt;
		if (crossorigin) this.img.crossOrigin = crossorigin;

		// 同时更新 blurhash 预览的 alt
		const blurhashPreview = this.shadowRoot?.querySelector('.blurhash-preview') as HTMLImageElement;
		if (blurhashPreview && alt) {
			blurhashPreview.alt = alt;
		}
	}
}

