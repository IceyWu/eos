/**
 * EosCarousel 组件
 * 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
 *
 * @tagname eos-carousel
 *
 * @attr {boolean} autoplay - 是否自动播放
 * @attr {string} interval - 自动播放间隔（毫秒），最小 1000，默认 2000
 * @attr {boolean} loop - 是否循环播放
 * @attr {string} show-navigation - 是否显示导航按钮，默认 true
 * @attr {string} initial-index - 初始显示的 slide 索引
 * @attr {"top"|"bottom"|"left"|"right"} indicator-position - 指示器位置
 * @attr {"default"|"dots"|"tiktok"} indicator-style - 指示器样式
 * @attr {string} virtual-threshold - 虚拟化阈值，超过此值自动开启三槽虚拟渲染，默认 8
 *
 * @fires {CustomEvent} change - 切换 slide 时触发，detail: { currentIndex, previousIndex }
 * @fires {CustomEvent} slide-active - 当前 slide 激活时触发
 * @fires {CustomEvent} slide-click - 点击 slide 时触发
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

	// 事件监听器引用（用于正确清理）
	private keydownHandler: ((e: KeyboardEvent) => void) | null = null;
	private touchStartHandler: ((e: Event) => void) | null = null;
	private touchEndHandler: ((e: Event) => void) | null = null;

	// 进度控制相关
	private customProgress: number = 0;
	private useCustomProgress: boolean = false;
	private progressTimer: number | null = null;
	private progressStartTime: number = 0;
	private progressDuration: number = 0;
	private progressCallback: (() => void) | null = null;

	// 记录已绑定 click 事件的 slide，避免重复绑定
	private boundClickSlides = new WeakSet<Element>();

	// ── 虚拟化渲染相关 ──────────────────────────────────────────
	/** 当前是否处于虚拟渲染模式 */
	private isVirtualMode: boolean = false;
	/** 三个可复用的 DOM 节点，pos: -1=prev / 0=current / 1=next */
	private virtualDivs: Array<{ el: HTMLElement; pos: number }> = [];

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
			"virtual-threshold",
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
		const value = parseInt(this.getAttribute("interval") || "2000", 10);
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
				this.triggerSlideActiveEvent();

				// slotchange 触发时 assignedElements 可能尚未就绪（Shadow DOM 时序特性），
				// 延迟一帧无条件再同步一次，确保虚拟模式在 slot 就绪后正确初始化
				requestAnimationFrame(() => {
					this.updateSlideCount();
					if (
						this.isVirtualMode &&
						this.virtualDivs.every((vd) => vd.el.children.length === 0)
					) {
						this.initVirtualDivs();
					}
				});
			});
		}
	}

	private triggerSlideActiveEvent() {
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			const slides = slot.assignedElements();
			const currentSlide = slides[this.currentIndex];
			if (currentSlide) {
				this.dispatchEvent(
					new CustomEvent("slide-active", {
						detail: {
							index: this.currentIndex,
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
	}

	private setupSlideClickListeners() {
		const slot = this.shadowRoot?.querySelector("slot");
		if (slot) {
			const slides = slot.assignedElements();
			slides.forEach((slide, _index) => {
				// 跳过已绑定过的 slide，避免重复绑定
				if (this.boundClickSlides.has(slide)) return;
				this.boundClickSlides.add(slide);
				slide.addEventListener("click", () => {
					const currentSlides = slot.assignedElements();
					const currentIndex = currentSlides.indexOf(slide);
					if (currentIndex === -1) return;
					this.dispatchEvent(
						new CustomEvent("slide-click", {
							detail: { index: currentIndex },
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
			case "indicator-style": {
				// 只更新 progress-bar 的 class，不重建整个 Shadow DOM
				const bar = this.shadowRoot?.querySelector(".progress-bar");
				if (bar) {
					bar.className = `progress-bar position-${this.indicatorPosition} style-${this.indicatorStyle}`;
					this.renderProgressBar();
				}
				break;
			}
			case "virtual-threshold":
				// 阈值变化时重新评估是否切换虚拟模式
				this.evaluateVirtualMode();
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
          --progress-bar-gap: 3px;
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
          transform: translateY(-50%) translateZ(0);
          width: 43px;
          height: 43px;
          border-radius: 50%;
          background: rgba(0,0,0,.18);
          border: 1px solid rgba(255, 255, 255, .15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, border-color 0.3s ease;
          z-index: 10;
          isolation: isolate;
          backdrop-filter: blur(8px);
        }

        .nav-button svg {
          width: 23px;
          height: 23px;
          stroke: rgba(255, 255, 255, 0.7);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          transition: stroke 0.3s ease;
        }

        .nav-button:hover {
          border-color: rgba(255, 255, 255, 0.8);
        }

        .nav-button:hover svg {
          stroke: rgba(255, 255, 255, 1);
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
          transform: translateZ(0);
          isolation: isolate;
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
          height: 3px;
        }
        
        .progress-bar.style-tiktok .progress-segment.active {
          height: 3px;
          /* 保持默认背景色，表示 0% 状态 */
        }
        
        .progress-bar.style-tiktok .progress-segment.active.completed {
          /* 完成状态显示为白色 (100%) */
          background: rgba(255, 255, 255, 0.9);
        }
        
        .progress-bar.style-tiktok .progress-segment.active.animating {
          /* animating 时保持半透明背景，进度由 .progress-fill 显示 */
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
          width: 3px;
        }
        
        .progress-bar.style-tiktok.position-left .progress-segment.active,
        .progress-bar.style-tiktok.position-right .progress-segment.active {
          width: 3px;
        }

        /* 通用激活状态（默认和dots样式使用） */
        .progress-bar:not(.style-tiktok) .progress-segment.passed {
          background: var(--progress-bar-active-color);
        }

        .progress-bar:not(.style-tiktok) .progress-segment.active.completed {
          /* 完成状态显示为激活色 (100%) */
          background: var(--progress-bar-active-color);
        }

        .progress-bar:not(.style-tiktok) .progress-segment.active.animating {
          /* animating 时保持半透明背景，进度由 .progress-fill 显示 */
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

        /* ── 虚拟化三槽渲染 ────────────────────────────────── */
        :host([data-virtual]) .slides-container {
          display: block;
          position: relative;
        }

        :host([data-virtual]) ::slotted(*) {
          display: none !important;
        }

        .virtual-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          transition: transform var(--carousel-transition);
          overflow: hidden;
          display: none;
        }

        :host([data-virtual]) .virtual-slide {
          display: block;
        }

        .virtual-slide[data-pos="-1"] { transform: translateX(-100%); }
        .virtual-slide[data-pos="0"]  { transform: translateX(0%);    }
        .virtual-slide[data-pos="1"]  { transform: translateX(100%);  }

        .virtual-slide > * {
          width: 100%;
          height: 100%;
        }
      </style>

      <div class="carousel" role="region" aria-label="图片轮播" aria-live="polite">
        <div class="slides-wrapper">
          <div class="slides-container" role="list" aria-atomic="false">
            <slot></slot>
            <div class="virtual-slide" data-pos="-1"></div>
            <div class="virtual-slide" data-pos="0"></div>
            <div class="virtual-slide" data-pos="1"></div>
          </div>
        </div>

        <button class="nav-button prev" aria-label="上一张" aria-controls="slides-container">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="14 18 8 12 14 6"></polyline>
          </svg>
        </button>

        <button class="nav-button next" aria-label="下一张" aria-controls="slides-container">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="10 18 16 12 10 6"></polyline>
          </svg>
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
			this.pause();
			this.prev();
		});

		nextButton?.addEventListener("click", () => {
			this.pause();
			this.next();
		});

		// 触摸事件
		if (slidesWrapper) {
			this.touchStartHandler = (e: Event) =>
				this.handleTouchStart(e as TouchEvent);
			this.touchEndHandler = (e: Event) =>
				this.handleTouchEnd(e as TouchEvent);
			slidesWrapper.addEventListener("touchstart", this.touchStartHandler, {
				passive: true,
			});
			slidesWrapper.addEventListener("touchend", this.touchEndHandler, {
				passive: true,
			});
		}

		// 键盘导航
		this.keydownHandler = (e: KeyboardEvent) => this.handleKeydown(e);
		this.addEventListener("keydown", this.keydownHandler);
		this.setAttribute("tabindex", "0");
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
		if (!slot) return;

		const slides = slot.assignedElements();
		this.totalSlides = slides.length;

		if (this.totalSlides === 0) {
			this.hideControls();
			return;
		}

		if (this.totalSlides === 1) {
			this.hideControls();
			this.pause();
			return;
		}

		if (this.currentIndex >= this.totalSlides) {
			this.currentIndex = 0;
		}

		// 评估是否需要开启虚拟模式
		this.evaluateVirtualMode();

		this.renderProgressBar();
		this.updateNavigationButtons();

		// slot 就绪后启动自动播放（connectedCallback 时 totalSlides 为 0，play() 会被跳过）
		if (this.autoplay && !this.isPlaying && this.totalSlides > 1) {
			this.play();
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
		// 虚拟化模式由 goToVirtual 负责位置更新，此处不处理
		if (this.isVirtualMode) return;

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

	// ── 虚拟化三槽渲染方法 ────────────────────────────────────────────

	/** 读取 virtual-threshold 属性，默认 8 */
	private get virtualThreshold(): number {
		const v = parseInt(this.getAttribute("virtual-threshold") ?? "", 10);
		return Number.isFinite(v) && v > 0 ? v : 8;
	}

	/**
	 * 根据当前 slide 数与 threshold 决定是否启用虚拟三槽模式。
	 * 启用时在 host 元素挂载 data-virtual 属性（触发 CSS 切换），
	 * 关闭时摘除该属性并清空槽位缓存。
	 */
	private evaluateVirtualMode() {
		const shouldVirtual = this.totalSlides > this.virtualThreshold;
		if (shouldVirtual === this.isVirtualMode) {
			// 已经是虚拟模式，但槽位尚未填充（如 slotchange 触发了两次）则补充初始化
			if (shouldVirtual && this.virtualDivs.length === 0) {
				this.initVirtualDivs();
			}
			return;
		}
		this.isVirtualMode = shouldVirtual;
		if (shouldVirtual) {
			this.setAttribute("data-virtual", "");
			this.initVirtualDivs();
		} else {
			this.removeAttribute("data-virtual");
			this.virtualDivs = [];
		}
	}

	/**
	 * 初始化三个复用 DOM 槽位，使用 cloneNode(true) 从 slot 拷贝真实元素。
	 * 支持任意内容：img / video / 自定义 HTML，无需特殊配置。
	 * 若 slot 尚未完成分配（assignedElements 为空），延迟一帧重试。
	 */
	private initVirtualDivs() {
		const container = this.shadowRoot?.querySelector(".slides-container");
		if (!container || this.totalSlides === 0) return;

		const divEls = container.querySelectorAll<HTMLElement>(".virtual-slide");
		if (divEls.length < 3) return;

		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>("slot");
		const assigned = slot?.assignedElements() ?? [];

		// slot 尚未分配完成，延迟一帧重试
		if (assigned.length === 0) {
			requestAnimationFrame(() => this.initVirtualDivs());
			return;
		}

		this.virtualDivs = [
			{ el: divEls[0], pos: -1 }, // prev
			{ el: divEls[1], pos: 0 }, // current
			{ el: divEls[2], pos: 1 }, // next
		];

		const total = this.totalSlides;
		const prevIdx = (this.currentIndex - 1 + total) % total;
		const nextIdx = (this.currentIndex + 1) % total;

		this.fillVirtualSlot(divEls[0], prevIdx);
		this.fillVirtualSlot(divEls[1], this.currentIndex);
		this.fillVirtualSlot(divEls[2], nextIdx);
	}

	/**
	 * 将 slot 中第 index 个元素克隆（深复制）到目标虚拟槽位 div 内。
	 * cloneNode(true) 保留完整 DOM 结构及内联事件，适配图片/视频/任意内容。
	 * 激活懒加载：把克隆节点内 data-src 赋给 src，只在真正展示时才触发加载。
	 */
	private fillVirtualSlot(target: HTMLElement, index: number) {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>("slot");
		if (!slot) return;
		const assigned = slot.assignedElements();
		const source = assigned[index];
		if (!source) return;
		target.innerHTML = "";
		const clone = source.cloneNode(true) as HTMLElement;
		// 激活懒加载：data-src → src，确保只在槽位填充时才发起媒体请求
		for (const el of clone.querySelectorAll<
			HTMLImageElement | HTMLVideoElement
		>("img[data-src], video[data-src]")) {
			const dataSrc = el.getAttribute("data-src");
			if (dataSrc) {
				el.setAttribute("src", dataSrc);
				el.removeAttribute("data-src");
			}
			if (el instanceof HTMLVideoElement) {
				el.load();
			}
		}
		// 激活自定义组件（如 eos-image）上的 data-src
		for (const el of clone.querySelectorAll("[data-src]")) {
			const dataSrc = el.getAttribute("data-src");
			if (dataSrc) {
				el.setAttribute("src", dataSrc);
				el.removeAttribute("data-src");
			}
		}
		target.appendChild(clone);
	}

	/**
	 * 三槽位切换动画（核心虚拟化逻辑）。
	 * 只有 3 个真实 DOM 节点在循环复用，无论数据量多大 DOM 规模恒定。
	 */
	private goToVirtual(newIndex: number, previousIndex: number) {
		const total = this.totalSlides;
		if (!this.virtualDivs.length || total < 2) return;

		const diff = (newIndex - previousIndex + total) % total;
		const isForward = diff <= Math.floor(total / 2);

		const prevVd = this.virtualDivs.find((vd) => vd.pos === -1);
		const curVd = this.virtualDivs.find((vd) => vd.pos === 0);
		const nextVd = this.virtualDivs.find((vd) => vd.pos === 1);
		if (!prevVd || !curVd || !nextVd) return;

		if (isForward) {
			// prev 槽瞬移到右侧，填入新 next 内容
			prevVd.el.style.transition = "none";
			prevVd.el.setAttribute("data-pos", "1");
			prevVd.pos = 1;
			this.fillVirtualSlot(prevVd.el, (newIndex + 1) % total);
			void prevVd.el.getBoundingClientRect(); // 强制回流使瞬移生效
			prevVd.el.style.transition = "";

			// current → prev(-1)，next → current(0)
			curVd.pos = -1;
			curVd.el.setAttribute("data-pos", "-1");
			nextVd.pos = 0;
			nextVd.el.setAttribute("data-pos", "0");
		} else {
			// next 槽瞬移到左侧，填入新 prev 内容
			nextVd.el.style.transition = "none";
			nextVd.el.setAttribute("data-pos", "-1");
			nextVd.pos = -1;
			this.fillVirtualSlot(nextVd.el, (newIndex - 1 + total) % total);
			void nextVd.el.getBoundingClientRect();
			nextVd.el.style.transition = "";

			// current → next(+1)，prev → current(0)
			curVd.pos = 1;
			curVd.el.setAttribute("data-pos", "1");
			prevVd.pos = 0;
			prevVd.el.setAttribute("data-pos", "0");
		}
	}

	/**
	 * 渲染进度条（增量更新）
	 * 仅在 segment 数量变化时重建 DOM，其余情况只修改 class，避免不必要的回流
	 */
	private renderProgressBar() {
		const progressBar = this.shadowRoot?.querySelector(".progress-bar");
		if (!progressBar || this.totalSlides === 0) return;

		const isDots = this.indicatorStyle === "dots";
		const isVertical =
			this.indicatorPosition === "left" || this.indicatorPosition === "right";

		// 仅在数量不匹配时重建，其余增量更新 class
		const existingSegments =
			progressBar.querySelectorAll<HTMLElement>(".progress-segment");

		if (existingSegments.length !== this.totalSlides) {
			// 数量变化：重建，使用 DocumentFragment 减少回流次数
			progressBar.innerHTML = "";
			const fragment = document.createDocumentFragment();
			for (let i = 0; i < this.totalSlides; i++) {
				const segment = document.createElement("div");
				segment.className = "progress-segment";
				segment.addEventListener("click", () => {
					this.pause();
					this.goTo(i);
				});
				fragment.appendChild(segment);
			}
			progressBar.appendChild(fragment);
		}

		// 增量更新：只修改需要变化的 class，不销毁 DOM / 不重绑事件
		const segments =
			progressBar.querySelectorAll<HTMLElement>(".progress-segment");
		for (let i = 0; i < this.totalSlides; i++) {
			const segment = segments[i];
			if (!segment) continue;

			segment.classList.remove("active", "passed", "animating", "completed");

			if (i === this.currentIndex) {
				segment.classList.add("active");
				if (!isDots) {
					if (this.useCustomProgress) {
						segment.classList.add("animating");
						let fill = segment.querySelector<HTMLElement>(
							".progress-fill.custom",
						);
						if (!fill) {
							fill = document.createElement("div");
							fill.className = "progress-fill custom";
							segment.appendChild(fill);
						}
						if (isVertical) {
							fill.style.height = `${this.customProgress}%`;
						} else {
							fill.style.width = `${this.customProgress}%`;
						}
					} else if (!this.isPlaying) {
						segment.classList.add("completed");
						segment.querySelector(".progress-fill.custom")?.remove();
					} else {
						segment.querySelector(".progress-fill.custom")?.remove();
					}
				}
			} else if (i < this.currentIndex) {
				if (!isDots) segment.classList.add("passed");
				segment.querySelector(".progress-fill.custom")?.remove();
			} else {
				segment.querySelector(".progress-fill.custom")?.remove();
			}
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
		this.pause();
		this.clearAutoplayTimer();
		this.stopSlideProgress();

		// 移除键盘监听
		if (this.keydownHandler) {
			this.removeEventListener("keydown", this.keydownHandler);
			this.keydownHandler = null;
		}

		// 移除触摸监听
		const slidesWrapper = this.shadowRoot?.querySelector(".slides-wrapper");
		if (slidesWrapper) {
			if (this.touchStartHandler) {
				slidesWrapper.removeEventListener("touchstart", this.touchStartHandler);
				this.touchStartHandler = null;
			}
			if (this.touchEndHandler) {
				slidesWrapper.removeEventListener("touchend", this.touchEndHandler);
				this.touchEndHandler = null;
			}
		}
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

		// 停止之前的进度
		this.stopSlideProgress();

		// 重置自定义进度（必须在 renderProgressBar 之前）
		this.customProgress = 0;
		this.useCustomProgress = false;

		// 更新 slide 位置（虚拟化模式走三槽动画，slot 模式走 translateX）
		if (this.isVirtualMode) {
			this.goToVirtual(index, previousIndex);
		} else {
			this.updateSlidePosition();
		}

		// 更新进度条
		this.renderProgressBar();

		// 更新导航按钮状态
		this.updateNavigationButtons();

		// 触发 change 事件
		this.dispatchEvent(
			new CustomEvent("change", {
				detail: { currentIndex: index, previousIndex },
				bubbles: true,
				composed: true,
			}),
		);

		// 触发 slide-active 事件，通知外部当前激活的 slide
		this.triggerSlideActiveEvent();

		// 过渡动画结束后解锁（监听 transitionend，带兜底超时）
		const container = this.shadowRoot?.querySelector(".slides-container") as HTMLElement;
		const unlockTransition = () => {
			this.isTransitioning = false;
		};
		if (container) {
			const onEnd = () => {
				container.removeEventListener("transitionend", onEnd);
				unlockTransition();
			};
			container.addEventListener("transitionend", onEnd, { once: true });
			// 兜底：防止 transitionend 不触发（如元素被隐藏）
			setTimeout(unlockTransition, 600);
		} else {
			unlockTransition();
		}

		// 自动播放模式下，切换后重新调度下一次
		if (this.isPlaying) {
			this.scheduleNextSlide();
		}
	}

	play() {
		if (this.isPlaying || this.totalSlides <= 1) return;
		this.isPlaying = true;
		this.scheduleNextSlide();
	}

	/** 调度下一次自动切换 */
	private scheduleNextSlide() {
		this.clearAutoplayTimer();
		if (!this.isPlaying) return;
		this.autoplayTimer = window.setTimeout(() => {
			if (!this.isPlaying) return;
			this.next();
			this.scheduleNextSlide();
		}, this.interval);
	}

	private clearAutoplayTimer() {
		if (this.autoplayTimer !== null) {
			clearTimeout(this.autoplayTimer);
			this.autoplayTimer = null;
		}
	}

	/**
	 * 开始当前 slide 的进度倒计时
	 * @param options.duration 持续时间（毫秒），默认使用 interval
	 * @param options.onComplete 完成回调函数
	 */
	startSlideProgress(options?: { duration?: number; onComplete?: () => void }) {
		this.stopSlideProgress();

		const duration = options?.duration ?? this.interval;
		this.progressCallback = options?.onComplete || null;
		this.progressDuration = duration;
		this.progressStartTime = Date.now();
		this.useCustomProgress = true;
		this.customProgress = 0;
		this.renderProgressBar();

		const updateProgress = () => {
			const elapsed = Date.now() - this.progressStartTime;
			const progress = Math.min((elapsed / this.progressDuration) * 100, 100);
			this.customProgress = progress;
			this.updateProgressDisplay();

			if (progress >= 100) {
				const callback = this.progressCallback;
				this.stopSlideProgress();
				if (callback) callback();
			} else {
				this.progressTimer = window.requestAnimationFrame(updateProgress);
			}
		};

		this.progressTimer = window.requestAnimationFrame(updateProgress);
	}

	stopSlideProgress() {
		if (this.progressTimer !== null) {
			window.cancelAnimationFrame(this.progressTimer);
			this.progressTimer = null;
		}
		this.progressCallback = null;
	}

	/**
	 * 更新进度条显示（提取的共享方法）
	 */
	private updateProgressDisplay() {
		const progressBar = this.shadowRoot?.querySelector(".progress-bar");
		if (!progressBar) return;

		const segments = progressBar.querySelectorAll(".progress-segment");
		const currentSegment = segments[this.currentIndex];
		if (!currentSegment) return;

		const fill = currentSegment.querySelector(
			".progress-fill.custom",
		) as HTMLElement;
		if (!fill) return;

		const isVertical =
			this.indicatorPosition === "left" || this.indicatorPosition === "right";
		if (isVertical) {
			fill.style.height = `${this.customProgress}%`;
		} else {
			fill.style.width = `${this.customProgress}%`;
		}
	}

	pause() {
		this.isPlaying = false;
		this.clearAutoplayTimer();
		this.stopSlideProgress();
		this.renderProgressBar();
	}

	/**
	 * 手动同步进度显示（用于视频播放进度）
	 * @param progress 进度值 0-100
	 */
	updateProgress(progress: number) {
		this.customProgress = Math.max(0, Math.min(100, progress));
		this.updateProgressDisplay();
	}
}
