/**
 * EosCarousel 组件
 * 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
 */
export class EosCarousel extends HTMLElement {
	// 内部状态
	private currentIndex: number = 0;
	private totalSlides: number = 0;
	private isPlaying: boolean = false;
	private autoplayTimer: number | null = null;
	private touchStartX: number = 0;
	private touchEndX: number = 0;
	private isTransitioning: boolean = false;
	private customProgress: number = 0; // 自定义进度 0-100
	private useCustomProgress: boolean = false; // 是否使用自定义进度

	// 定义可观察的属性
	static get observedAttributes() {
		return [
			"autoplay",
			"interval",
			"loop",
			"show-navigation",
			"initial-index",
			"indicator-position",
			"indicator-style",
		];
	}

	// 属性 getter
	get autoplay(): boolean {
		return this.hasAttribute("autoplay");
	}

	set autoplay(value: boolean) {
		if (value) {
			this.setAttribute("autoplay", "");
		} else {
			this.removeAttribute("autoplay");
		}
	}

	get interval(): number {
		const value = parseInt(this.getAttribute("interval") || "3000", 10);
		return Math.max(value, 1000); // 最小值 1000ms
	}

	set interval(value: number) {
		this.setAttribute("interval", String(Math.max(value, 1000)));
	}

	get loop(): boolean {
		return this.hasAttribute("loop");
	}

	set loop(value: boolean) {
		if (value) {
			this.setAttribute("loop", "");
		} else {
			this.removeAttribute("loop");
		}
	}

	get showNavigation(): boolean {
		return this.getAttribute("show-navigation") !== "false";
	}

	set showNavigation(value: boolean) {
		if (value) {
			this.setAttribute("show-navigation", "true");
		} else {
			this.setAttribute("show-navigation", "false");
		}
	}

	get initialIndex(): number {
		return parseInt(this.getAttribute("initial-index") || "0", 10);
	}

	set initialIndex(value: number) {
		this.setAttribute("initial-index", String(value));
	}

	get indicatorPosition(): "top" | "bottom" | "left" | "right" {
		return (
			(this.getAttribute("indicator-position") as
				| "top"
				| "bottom"
				| "left"
				| "right") || "bottom"
		);
	}

	set indicatorPosition(value: "top" | "bottom" | "left" | "right") {
		this.setAttribute("indicator-position", value);
	}

	get indicatorStyle(): "default" | "dots" | "tiktok" {
		return (
			(this.getAttribute("indicator-style") as "default" | "dots" | "tiktok") ||
			"default"
		);
	}

	set indicatorStyle(value: "default" | "dots" | "tiktok") {
		this.setAttribute("indicator-style", value);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		// 设置初始索引
		const initial = this.initialIndex;
		if (initial > 0) {
			this.currentIndex = initial;
		}

		this.render();
		this.setupSlotListener();
		this.updateSlideCount();
		this.setupEventListeners();

		// 如果启用自动播放，则开始播放
		if (this.autoplay) {
			this.play();
		}
	}

	private setupSlotListener() {
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			slot.addEventListener("slotchange", () => {
				this.updateSlideCount();
				this.updateSlidePosition();
				this.setupSlideClickListeners();
			});
		}
	}

	private setupSlideClickListeners() {
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			const slides = slot.assignedElements();
			slides.forEach((slide, index) => {
				slide.addEventListener("click", () => {
					this.dispatchEvent(
						new CustomEvent("slide-click", {
							detail: { index },
							bubbles: true,
							composed: true,
						}),
					);
				});
			});
		}
	}

	disconnectedCallback() {
		this.cleanup();
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue === newValue) return;

		switch (name) {
			case "autoplay":
				if (this.autoplay) {
					this.play();
				} else {
					this.pause();
				}
				break;
			case "interval":
				if (this.isPlaying) {
					this.pause();
					this.play();
				}
				break;
			case "loop":
				this.updateNavigationButtons();
				break;
			case "show-navigation":
				this.updateNavigationButtons();
				break;
			case "initial-index":
				// 只在组件初始化时生效
				break;
			case "indicator-position":
			case "indicator-style":
				this.render();
				this.setupEventListeners();
				this.updateSlideCount();
				break;
		}
	}

	private render() {
		if (!this.shadowRoot) return;

		this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: var(--carousel-height, 400px);
          overflow: hidden;
          --carousel-transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          --progress-bar-height: 3px;
          --progress-bar-gap: 4px;
          --progress-bar-color: rgba(255, 255, 255, 0.3);
          --progress-bar-active-color: rgba(255, 255, 255, 1);
          --control-bg: rgba(0, 0, 0, 0.3);
          --control-hover-bg: rgba(0, 0, 0, 0.5);
        }

        .carousel {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .slides-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .slides-container {
          display: flex;
          height: 100%;
          transition: transform var(--carousel-transition);
          will-change: transform;
        }

        ::slotted(*) {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--control-bg);
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          z-index: 10;
        }

        .nav-button:hover {
          background: var(--control-hover-bg);
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .nav-button.prev {
          left: 20px;
        }

        .nav-button.next {
          right: 20px;
        }

        .nav-button.hidden {
          display: none;
        }

        /* 指示器容器基础样式 */
        .progress-bar {
          position: absolute;
          display: flex;
          z-index: 10;
        }

        /* 位置样式 */
        .progress-bar.position-bottom {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          gap: var(--progress-bar-gap);
          padding: 0 20px;
        }

        .progress-bar.position-top {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          gap: var(--progress-bar-gap);
          padding: 0 20px;
        }

        .progress-bar.position-left {
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          flex-direction: column;
          gap: var(--progress-bar-gap);
          padding: 20px 0;
        }

        .progress-bar.position-right {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          flex-direction: column;
          gap: var(--progress-bar-gap);
          padding: 20px 0;
        }

        /* 默认样式（进度条） */
        .progress-bar.style-default .progress-segment {
          height: var(--progress-bar-height);
          background: var(--progress-bar-color);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          flex: 1;
          min-width: 30px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .progress-bar.style-default.position-left .progress-segment,
        .progress-bar.style-default.position-right .progress-segment {
          width: var(--progress-bar-height);
          height: 30px;
          min-width: unset;
        }

        /* 点样式 */
        .progress-bar.style-dots {
          gap: 8px;
        }

        .progress-bar.style-dots .progress-segment {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--progress-bar-color);
          cursor: pointer;
          transition: all 0.3s ease;
          flex: none;
        }

        .progress-bar.style-dots .progress-segment.active {
          background: var(--progress-bar-active-color);
          transform: scale(1.2);
        }

        /* 抖音样式（等分进度条） */
        .progress-bar.style-tiktok {
          left: 0;
          right: 0;
          padding: 0 20px;
          gap: 3px;
        }

        .progress-bar.style-tiktok.position-bottom {
          bottom: 20px;
          transform: none;
        }

        .progress-bar.style-tiktok.position-top {
          top: 20px;
          transform: none;
        }

        .progress-bar.style-tiktok.position-left,
        .progress-bar.style-tiktok.position-right {
          top: 0;
          bottom: 0;
          padding: 20px 0;
          transform: none;
          width: auto;
        }

        .progress-bar.style-tiktok.position-left {
          left: 20px;
        }

        .progress-bar.style-tiktok.position-right {
          right: 20px;
        }

        .progress-bar.style-tiktok .progress-segment {
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 1.5px;
          position: relative;
          overflow: hidden;
          flex: 1;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        /* tiktok样式高亮效果 */
        .progress-bar.style-tiktok .progress-segment.passed {
          background: rgba(255, 255, 255, 0.9);
          height: 4px;
        }
        
        .progress-bar.style-tiktok .progress-segment.active {
          height: 4px;
        }
        
        .progress-bar.style-tiktok .progress-segment.active:not(.animating) {
          background: rgba(255, 255, 255, 0.9);
        }
        
        .progress-bar.style-tiktok .progress-segment.active.animating {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* tiktok进度填充的颜色 */
        .progress-bar.style-tiktok .progress-fill {
          background: rgba(255, 255, 255, 0.9);
        }

        .progress-bar.style-tiktok.position-left .progress-segment,
        .progress-bar.style-tiktok.position-right .progress-segment {
          width: 3px;
          height: auto;
        }
        
        .progress-bar.style-tiktok.position-left .progress-segment.passed,
        .progress-bar.style-tiktok.position-right .progress-segment.passed {
          width: 4px;
        }
        
        .progress-bar.style-tiktok.position-left .progress-segment.active,
        .progress-bar.style-tiktok.position-right .progress-segment.active {
          width: 4px;
        }

        /* 通用激活状态（默认和dots样式使用） */
        .progress-bar:not(.style-tiktok) .progress-segment.passed {
          background: var(--progress-bar-active-color);
        }

        .progress-bar:not(.style-tiktok) .progress-segment.active:not(.animating) {
          background: var(--progress-bar-active-color);
        }

        .progress-bar:not(.style-tiktok) .progress-segment.active.animating {
          background: var(--progress-bar-color);
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--progress-bar-active-color);
          width: 0%;
          transform-origin: left;
        }

        .progress-bar.position-left .progress-fill,
        .progress-bar.position-right .progress-fill {
          width: 100%;
          height: 0%;
          transform-origin: top;
        }

        .progress-segment.active.animating .progress-fill:not(.custom) {
          animation: fillProgress var(--interval) linear forwards;
        }

        .progress-bar.position-left .progress-segment.active.animating .progress-fill:not(.custom),
        .progress-bar.position-right .progress-segment.active.animating .progress-fill:not(.custom) {
          animation: fillProgressVertical var(--interval) linear forwards;
        }

        .progress-segment.active.animating .progress-fill.custom {
          transition: width 0.1s linear;
        }

        .progress-bar.position-left .progress-segment.active.animating .progress-fill.custom,
        .progress-bar.position-right .progress-segment.active.animating .progress-fill.custom {
          transition: height 0.1s linear;
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes fillProgressVertical {
          from { height: 0%; }
          to { height: 100%; }
        }
      </style>

      <div class="carousel" role="region" aria-label="图片轮播" aria-live="polite">
        <div class="slides-wrapper">
          <div class="slides-container" role="list" aria-atomic="false">
            <slot></slot>
          </div>
        </div>

        <button class="nav-button prev" aria-label="上一张" aria-controls="slides-container">
          ←
        </button>

        <button class="nav-button next" aria-label="下一张" aria-controls="slides-container">
          →
        </button>

        <div class="progress-bar position-${this.indicatorPosition} style-${this.indicatorStyle}" role="tablist" aria-label="轮播进度"></div>
      </div>
    `;
	}

	private setupEventListeners() {
		const prevButton = this.shadowRoot?.querySelector(".nav-button.prev");
		const nextButton = this.shadowRoot?.querySelector(".nav-button.next");
		const slidesWrapper = this.shadowRoot?.querySelector(".slides-wrapper");

		prevButton?.addEventListener("click", () => {
			this.pause(); // 用户交互时暂停自动播放
			this.prev();
		});

		nextButton?.addEventListener("click", () => {
			this.pause(); // 用户交互时暂停自动播放
			this.next();
		});

		// 触摸事件
		if (slidesWrapper) {
			const touchStartHandler = (e: Event) =>
				this.handleTouchStart(e as TouchEvent);
			const touchEndHandler = (e: Event) =>
				this.handleTouchEnd(e as TouchEvent);
			slidesWrapper.addEventListener("touchstart", touchStartHandler, {
				passive: true,
			});
			slidesWrapper.addEventListener("touchend", touchEndHandler, {
				passive: true,
			});
		}

		// 键盘导航
		this.addEventListener("keydown", (e) => this.handleKeydown(e));
		this.setAttribute("tabindex", "0"); // 使组件可聚焦
	}

	private handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case "ArrowLeft":
				e.preventDefault();
				this.pause();
				this.prev();
				break;
			case "ArrowRight":
				e.preventDefault();
				this.pause();
				this.next();
				break;
		}
	}

	private handleTouchStart(e: TouchEvent) {
		this.touchStartX = e.touches[0].clientX;
	}

	private handleTouchEnd(e: TouchEvent) {
		this.touchEndX = e.changedTouches[0].clientX;
		const diff = this.touchStartX - this.touchEndX;
		const threshold = 50; // 滑动阈值 50px

		if (Math.abs(diff) > threshold) {
			this.pause(); // 用户交互时暂停自动播放

			if (diff > 0) {
				// 向左滑动，显示下一个
				this.next();
			} else {
				// 向右滑动，显示上一个
				this.prev();
			}
		}
	}

	private updateSlideCount() {
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			const assignedNodes = slot.assignedElements();
			this.totalSlides = assignedNodes.length;

			// 处理边界情况
			if (this.totalSlides === 0) {
				// 没有 slides，隐藏导航和进度条
				this.hideControls();
				return;
			}

			if (this.totalSlides === 1) {
				// 只有一个 slide，隐藏导航和进度条，禁用自动播放
				this.hideControls();
				this.pause();
				return;
			}

			// 确保当前索引在有效范围内
			if (this.currentIndex >= this.totalSlides) {
				this.currentIndex = 0;
			}

			this.renderProgressBar();
			this.updateNavigationButtons();
		}
	}

	private hideControls() {
		const prevButton = this.shadowRoot?.querySelector(".nav-button.prev");
		const nextButton = this.shadowRoot?.querySelector(".nav-button.next");
		const progressBar = this.shadowRoot?.querySelector(".progress-bar");

		prevButton?.classList.add("hidden");
		nextButton?.classList.add("hidden");
		if (progressBar) {
			(progressBar as HTMLElement).style.display = "none";
		}
	}

	private updateSlidePosition() {
		const container = this.shadowRoot?.querySelector(
			".slides-container",
		) as HTMLElement;
		if (container) {
			const offset = -this.currentIndex * 100;
			container.style.transform = `translateX(${offset}%)`;

			// 更新 CSS 变量以同步动画时长
			(this.shadowRoot?.host as HTMLElement)?.style.setProperty(
				"--interval",
				`${this.interval}ms`,
			);
		}
	}

	private renderProgressBar() {
		const progressBar = this.shadowRoot?.querySelector(".progress-bar");
		if (!progressBar || this.totalSlides === 0) return;

		progressBar.innerHTML = "";
		const isDots = this.indicatorStyle === "dots";
		const isVertical =
			this.indicatorPosition === "left" || this.indicatorPosition === "right";

		for (let i = 0; i < this.totalSlides; i++) {
			const segment = document.createElement("div");
			segment.className = "progress-segment";

			// 添加点击事件，允许用户点击进度条跳转
			segment.addEventListener("click", () => {
				this.pause(); // 用户交互时暂停自动播放
				this.goTo(i);
			});

			if (i === this.currentIndex) {
				segment.classList.add("active");

				// dots样式不需要进度动画
				if (!isDots) {
					// 使用自定义进度或自动播放动画
					if (this.useCustomProgress) {
						// 自定义进度模式（用于视频）
						segment.classList.add("animating");
						const fill = document.createElement("div");
						fill.className = "progress-fill custom";
						if (isVertical) {
							fill.style.height = `${this.customProgress}%`;
						} else {
							fill.style.width = `${this.customProgress}%`;
						}
						segment.appendChild(fill);
					} else if (this.isPlaying) {
						// 自动播放模式（用于图片）
						segment.classList.add("animating");
						const fill = document.createElement("div");
						fill.className = "progress-fill";
						segment.appendChild(fill);
					}
				}
			} else if (i < this.currentIndex) {
				// dots样式不需要passed状态，但tiktok样式需要
				if (!isDots) {
					segment.classList.add("passed");
				}
			}
			progressBar.appendChild(segment);
		}
	}

	private updateNavigationButtons() {
		const prevButton = this.shadowRoot?.querySelector(
			".nav-button.prev",
		) as HTMLButtonElement;
		const nextButton = this.shadowRoot?.querySelector(
			".nav-button.next",
		) as HTMLButtonElement;

		if (!prevButton || !nextButton) return;

		// 根据 show-navigation 属性显示或隐藏按钮
		if (!this.showNavigation || this.totalSlides <= 1) {
			prevButton.classList.add("hidden");
			nextButton.classList.add("hidden");
			return;
		}

		prevButton.classList.remove("hidden");
		nextButton.classList.remove("hidden");

		// 非循环模式下，在边界处禁用按钮
		if (!this.loop) {
			prevButton.disabled = this.currentIndex === 0;
			nextButton.disabled = this.currentIndex === this.totalSlides - 1;
		} else {
			prevButton.disabled = false;
			nextButton.disabled = false;
		}
	}

	private cleanup() {
		// 停止自动播放
		this.pause();

		// 注意：由于事件监听器是匿名函数，无法精确移除
		// 但组件销毁时，浏览器会自动清理这些监听器
		// 这里主要确保定时器被清理
	}

	// 公共方法
	next() {
		if (this.totalSlides === 0) return;

		if (this.currentIndex < this.totalSlides - 1) {
			this.goTo(this.currentIndex + 1);
		} else if (this.loop) {
			this.goTo(0);
		}
	}

	prev() {
		if (this.totalSlides === 0) return;

		if (this.currentIndex > 0) {
			this.goTo(this.currentIndex - 1);
		} else if (this.loop) {
			this.goTo(this.totalSlides - 1);
		}
	}

	goTo(index: number) {
		// 验证索引
		if (index < 0 || index >= this.totalSlides) {
			console.warn(`[EosCarousel] Invalid slide index: ${index}`);
			return;
		}

		// 防止重复切换或在过渡中切换
		if (index === this.currentIndex || this.isTransitioning) {
			return;
		}

		// 设置过渡状态锁
		this.isTransitioning = true;

		const previousIndex = this.currentIndex;
		this.currentIndex = index;

		// 更新 slide 位置
		this.updateSlidePosition();

		// 更新进度条
		this.renderProgressBar();

		// 更新导航按钮状态
		this.updateNavigationButtons();

		// 重置自定义进度
		this.customProgress = 0;
		this.useCustomProgress = false;

		// 触发 change 事件
		this.dispatchEvent(
			new CustomEvent("change", {
				detail: { currentIndex: index, previousIndex },
				bubbles: true,
				composed: true,
			}),
		);

		// 触发 slide-active 事件，通知外部当前激活的 slide
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			const slides = slot.assignedElements();
			const currentSlide = slides[index];
			if (currentSlide) {
				this.dispatchEvent(
					new CustomEvent("slide-active", {
						detail: {
							index,
							slide: currentSlide,
							mediaType:
								currentSlide.getAttribute("data-media-type") || "image",
						},
						bubbles: true,
						composed: true,
					}),
				);
			}
		}

		// 过渡动画结束后解锁
		setTimeout(() => {
			this.isTransitioning = false;
		}, 500); // 与 CSS transition 时长一致
	}

	play() {
		// 如果已经在播放或只有一个 slide，不执行
		if (this.isPlaying || this.totalSlides <= 1) return;

		this.isPlaying = true;

		// 重新渲染进度条以显示填充动画
		this.renderProgressBar();

		// 启动自动播放定时器
		this.autoplayTimer = window.setInterval(() => {
			if (this.currentIndex < this.totalSlides - 1) {
				this.next();
			} else if (this.loop) {
				this.goTo(0);
			} else {
				// 到达最后一个且不循环，停止播放
				this.pause();
			}
		}, this.interval);
	}

	pause() {
		if (this.autoplayTimer) {
			clearInterval(this.autoplayTimer);
			this.autoplayTimer = null;
		}
		this.isPlaying = false;

		// 重新渲染进度条以移除填充动画
		this.renderProgressBar();
	}

	/**
	 * 更新当前 slide 的自定义进度（用于视频播放进度同步）
	 * @param progress 进度值 0-100
	 */
	updateProgress(progress: number) {
		this.customProgress = Math.max(0, Math.min(100, progress));
		this.useCustomProgress = true;

		// 更新进度条显示
		const progressBar = this.shadowRoot?.querySelector(".progress-bar");
		if (progressBar) {
			const segments = progressBar.querySelectorAll(".progress-segment");
			const currentSegment = segments[this.currentIndex];
			if (currentSegment) {
				const fill = currentSegment.querySelector(
					".progress-fill.custom",
				) as HTMLElement;
				if (fill) {
					const isVertical =
						this.indicatorPosition === "left" ||
						this.indicatorPosition === "right";
					if (isVertical) {
						fill.style.height = `${this.customProgress}%`;
					} else {
						fill.style.width = `${this.customProgress}%`;
					}
				}
			}
		}

		// 当进度达到 100% 时，自动切换到下一个
		if (this.customProgress >= 100) {
			setTimeout(() => {
				this.next();
			}, 100);
		}
	}

	/**
	 * 启用自定义进度模式（用于视频）
	 */
	enableCustomProgress() {
		this.useCustomProgress = true;
		this.customProgress = 0;
		this.renderProgressBar();
	}

	/**
	 * 禁用自定义进度模式（恢复自动播放）
	 */
	disableCustomProgress() {
		this.useCustomProgress = false;
		this.customProgress = 0;
		this.renderProgressBar();
	}
}
