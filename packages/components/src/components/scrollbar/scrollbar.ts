/**
 * EosScrollbar 组件
 * 自定义滚动条，可独立使用或嵌入任意可滚动容器。
 * 支持水平/垂直方向、拖拽交互、自动隐藏、自定义样式。
 * 支持虚拟列表模式：通过 setVirtualScroll 手动驱动滚动状态。
 *
 * @tagname eos-scrollbar
 *
 * @attr {"horizontal"|"vertical"} direction - 滚动方向，默认 horizontal
 * @attr {boolean} auto-hide - 是否自动隐藏（无交互时淡出），默认 false
 * @attr {string} thumb-color - 滑块颜色
 * @attr {string} track-color - 轨道颜色
 * @attr {string} thumb-size - 滑块粗细（px），默认 6
 * @attr {string} thumb-min-size - 滑块最小长度（px），默认 30
 * @attr {string} border-radius - 圆角（px），默认 3
 *
 * @fires {CustomEvent} scroll-change - 滚动位置变化，detail: { position, ratio, scrollOffset? }
 */
export class EosScrollbar extends HTMLElement {
	private _ratio = 0;          // 0~1，当前滚动位置
	private _thumbRatio = 0.2;   // 滑块占轨道比例
	private _dragging = false;
	private _dragStart = 0;
	private _dragStartRatio = 0;
	private _hideTimer: number | null = null;
	private _visible = true;
	private _targetEl: HTMLElement | null = null;
	private _scrollHandler: (() => void) | null = null;
	private _resizeObserver: ResizeObserver | null = null;

	// ── 虚拟列表模式 ──────────────────────────────────────
	private _virtualMode = false;
	private _virtualContentSize = 0;   // 逻辑内容总尺寸
	private _virtualViewportSize = 0;  // 可视区域尺寸
	private _virtualScrollOffset = 0;  // 当前滚动偏移量

	static get observedAttributes() {
		return ["direction", "auto-hide", "thumb-color", "track-color", "thumb-size", "thumb-min-size", "border-radius"];
	}

	get direction(): "horizontal" | "vertical" {
		return (this.getAttribute("direction") as "horizontal" | "vertical") || "horizontal";
	}
	set direction(v: "horizontal" | "vertical") { this.setAttribute("direction", v); }

	get autoHide(): boolean { return this.hasAttribute("auto-hide"); }
	set autoHide(v: boolean) { v ? this.setAttribute("auto-hide", "") : this.removeAttribute("auto-hide"); }

	get thumbColor(): string { return this.getAttribute("thumb-color") || "rgba(0,0,0,0.4)"; }
	get trackColor(): string { return this.getAttribute("track-color") || "rgba(0,0,0,0.1)"; }
	get thumbSize(): number { return parseInt(this.getAttribute("thumb-size") || "6", 10); }
	get thumbMinSize(): number { return parseInt(this.getAttribute("thumb-min-size") || "30", 10); }
	get borderRadius(): number { return parseInt(this.getAttribute("border-radius") || "3", 10); }

	/** 当前滚动比例 0~1 */
	get ratio(): number { return this._ratio; }
	set ratio(v: number) {
		this._ratio = Math.max(0, Math.min(1, v));
		this.updateThumbPosition();
	}

	/** 滑块占轨道比例 0~1 */
	get thumbRatio(): number { return this._thumbRatio; }
	set thumbRatio(v: number) {
		this._thumbRatio = Math.max(0.05, Math.min(1, v));
		this.updateThumbPosition();
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
		this.setupEvents();
		if (this.autoHide) {
			this._visible = false;
			const track = this.shadowRoot?.querySelector(".track");
			if (track) track.classList.remove("visible");
		}
	}

	disconnectedCallback() {
		this.detach();
		this.cleanupEvents();
	}

	attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
		if (oldValue === newValue) return;
		this.render();
		this.setupEvents();
		this.updateThumbPosition();
	}

	// ── 公共 API ──────────────────────────────────────────

	/**
	 * 绑定到一个可滚动的 DOM 元素，自动同步滚动位置
	 */
	attach(el: HTMLElement) {
		this.detach();
		this._targetEl = el;
		this._scrollHandler = () => this.syncFromTarget();
		el.addEventListener("scroll", this._scrollHandler, { passive: true });

		this._resizeObserver = new ResizeObserver(() => this.syncFromTarget());
		this._resizeObserver.observe(el);
		// 也观察内容尺寸变化
		if (el.firstElementChild) {
			this._resizeObserver.observe(el.firstElementChild);
		}

		this.syncFromTarget();
	}

	/**
	 * 解除与目标元素的绑定
	 */
	detach() {
		if (this._targetEl && this._scrollHandler) {
			this._targetEl.removeEventListener("scroll", this._scrollHandler);
		}
		this._resizeObserver?.disconnect();
		this._targetEl = null;
		this._scrollHandler = null;
		this._resizeObserver = null;
	}

	/**
	 * 虚拟列表模式：手动设置滚动状态。
	 * 适用于虚拟列表/虚拟滚动场景，DOM 实际高度与逻辑内容高度不一致时使用。
	 *
	 * @param options.contentSize  逻辑内容总尺寸（如所有行高之和）
	 * @param options.viewportSize 可视区域尺寸
	 * @param options.scrollOffset 当前滚动偏移量
	 */
	setVirtualScroll(options: { contentSize: number; viewportSize: number; scrollOffset: number }) {
		this._virtualMode = true;
		this._virtualContentSize = options.contentSize;
		this._virtualViewportSize = options.viewportSize;
		this._virtualScrollOffset = options.scrollOffset;

		if (this._virtualContentSize <= this._virtualViewportSize) {
			this._thumbRatio = 1;
			this._ratio = 0;
		} else {
			this._thumbRatio = this._virtualViewportSize / this._virtualContentSize;
			this._ratio = this._virtualScrollOffset / (this._virtualContentSize - this._virtualViewportSize);
		}
		this._ratio = Math.max(0, Math.min(1, this._ratio));
		this.updateThumbPosition();
		this.emitChange();

		if (this.autoHide) {
			this.showTemporarily();
		}
	}

	/**
	 * 退出虚拟列表模式，恢复为自动从 DOM 同步
	 */
	clearVirtualScroll() {
		this._virtualMode = false;
		this._virtualContentSize = 0;
		this._virtualViewportSize = 0;
		this._virtualScrollOffset = 0;
		if (this._targetEl) {
			this.syncFromTarget();
		}
	}

	/**
	 * 从目标元素同步滚动状态（非虚拟模式时使用）
	 */
	private syncFromTarget() {
		if (this._virtualMode) return; // 虚拟模式由外部驱动

		const el = this._targetEl;
		if (!el) return;

		const isVert = this.direction === "vertical";
		const scrollSize = isVert ? el.scrollHeight : el.scrollWidth;
		const clientSize = isVert ? el.clientHeight : el.clientWidth;
		const scrollPos = isVert ? el.scrollTop : el.scrollLeft;

		if (scrollSize <= clientSize) {
			this._thumbRatio = 1;
			this._ratio = 0;
		} else {
			this._thumbRatio = clientSize / scrollSize;
			this._ratio = scrollPos / (scrollSize - clientSize);
		}
		this.updateThumbPosition();
		this.emitChange();

		if (this.autoHide) {
			this.showTemporarily();
		}
	}

	/**
	 * 滚动目标元素到指定比例位置
	 */
	private scrollTargetTo(ratio: number) {
		if (this._virtualMode) {
			// 虚拟模式：计算逻辑偏移量，通过事件通知外部
			const maxScroll = this._virtualContentSize - this._virtualViewportSize;
			if (maxScroll <= 0) return;
			this._virtualScrollOffset = ratio * maxScroll;
			return;
		}

		const el = this._targetEl;
		if (!el) return;

		const isVert = this.direction === "vertical";
		const scrollSize = isVert ? el.scrollHeight : el.scrollWidth;
		const clientSize = isVert ? el.clientHeight : el.clientWidth;
		const maxScroll = scrollSize - clientSize;

		if (maxScroll <= 0) return;

		const pos = ratio * maxScroll;
		if (isVert) {
			el.scrollTop = pos;
		} else {
			el.scrollLeft = pos;
		}
	}

	// ── 渲染 ──────────────────────────────────────────

	private render() {
		if (!this.shadowRoot) return;
		const isVert = this.direction === "vertical";
		const size = this.thumbSize;
		const radius = this.borderRadius;

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					--sb-thumb-color: ${this.thumbColor};
					--sb-track-color: ${this.trackColor};
					--sb-size: ${size}px;
					--sb-radius: ${radius}px;
				}
				.track {
					position: relative;
					background: var(--sb-track-color);
					border-radius: var(--sb-radius);
					${isVert ? `width: var(--sb-size); height: 100%;` : `height: var(--sb-size); width: 100%;`}
					cursor: pointer;
					user-select: none;
					-webkit-user-select: none;
				}
				.thumb {
					position: absolute;
					background: var(--sb-thumb-color);
					border-radius: var(--sb-radius);
					${isVert ? `width: 100%; left: 0;` : `height: 100%; top: 0;`}
					cursor: grab;
					transition: opacity 0.2s ease, background 0.15s ease;
					min-${isVert ? "height" : "width"}: ${this.thumbMinSize}px;
				}
				.thumb:hover {
					background: ${this.thumbColor.replace(/[\d.]+\)$/, (m) => {
						const v = parseFloat(m);
						return `${Math.min(v + 0.15, 1)})`;
					})};
				}
				.thumb:active, .thumb.dragging {
					cursor: grabbing;
					background: ${this.thumbColor.replace(/[\d.]+\)$/, (m) => {
						const v = parseFloat(m);
						return `${Math.min(v + 0.25, 1)})`;
					})};
				}
				:host([auto-hide]) .track {
					opacity: 0;
					transition: opacity 0.3s ease;
				}
				:host([auto-hide]) .track.visible {
					opacity: 1;
				}
			</style>
			<div class="track${this._visible ? " visible" : ""}" role="scrollbar" aria-orientation="${this.direction}" aria-valuenow="${Math.round(this._ratio * 100)}" aria-valuemin="0" aria-valuemax="100">
				<div class="thumb"></div>
			</div>
		`;
		this.updateThumbPosition();
	}

	// ── 事件处理 ──────────────────────────────────────────

	private _boundMouseMove: ((e: MouseEvent) => void) | null = null;
	private _boundMouseUp: (() => void) | null = null;

	private setupEvents() {
		const track = this.shadowRoot?.querySelector(".track");
		const thumb = this.shadowRoot?.querySelector(".thumb");
		if (!track || !thumb) return;

		// 点击轨道跳转
		track.addEventListener("mousedown", (e: Event) => {
			const me = e as MouseEvent;
			if (me.target === thumb) return;
			e.preventDefault();
			const rect = (track as HTMLElement).getBoundingClientRect();
			const isVert = this.direction === "vertical";
			const clickPos = isVert ? (me.clientY - rect.top) / rect.height : (me.clientX - rect.left) / rect.width;
			// 将点击位置转换为 ratio（考虑 thumb 大小）
			const newRatio = Math.max(0, Math.min(1, (clickPos - this._thumbRatio / 2) / (1 - this._thumbRatio)));
			this._ratio = newRatio;
			this.updateThumbPosition();
			this.scrollTargetTo(this._ratio);
			this.emitChange();
		});

		// 拖拽滑块
		thumb.addEventListener("mousedown", (e: Event) => {
			const me = e as MouseEvent;
			e.preventDefault();
			e.stopPropagation();
			this._dragging = true;
			const rect = (track as HTMLElement).getBoundingClientRect();
			const isVert = this.direction === "vertical";
			this._dragStart = isVert ? me.clientY : me.clientX;
			this._dragStartRatio = this._ratio;
			thumb.classList.add("dragging");

			this._boundMouseMove = (ev: MouseEvent) => {
				if (!this._dragging) return;
				const current = isVert ? ev.clientY : ev.clientX;
				const trackSize = isVert ? rect.height : rect.width;
				const delta = (current - this._dragStart) / (trackSize * (1 - this._thumbRatio));
				this._ratio = Math.max(0, Math.min(1, this._dragStartRatio + delta));
				this.updateThumbPosition();
				this.scrollTargetTo(this._ratio);
				this.emitChange();
			};

			this._boundMouseUp = () => {
				this._dragging = false;
				thumb.classList.remove("dragging");
				if (this._boundMouseMove) document.removeEventListener("mousemove", this._boundMouseMove);
				if (this._boundMouseUp) document.removeEventListener("mouseup", this._boundMouseUp);
				this._boundMouseMove = null;
				this._boundMouseUp = null;
			};

			document.addEventListener("mousemove", this._boundMouseMove);
			document.addEventListener("mouseup", this._boundMouseUp);
		});
	}

	private cleanupEvents() {
		if (this._boundMouseMove) document.removeEventListener("mousemove", this._boundMouseMove);
		if (this._boundMouseUp) document.removeEventListener("mouseup", this._boundMouseUp);
		this._boundMouseMove = null;
		this._boundMouseUp = null;
	}

	// ── 内部更新 ──────────────────────────────────────────

	private updateThumbPosition() {
		const thumb = this.shadowRoot?.querySelector(".thumb") as HTMLElement;
		if (!thumb) return;

		const isVert = this.direction === "vertical";
		const thumbPercent = this._thumbRatio * 100;
		const offset = this._ratio * (100 - thumbPercent);

		if (isVert) {
			thumb.style.height = `${thumbPercent}%`;
			thumb.style.top = `${offset}%`;
		} else {
			thumb.style.width = `${thumbPercent}%`;
			thumb.style.left = `${offset}%`;
		}

		// 更新 ARIA
		const track = this.shadowRoot?.querySelector(".track");
		if (track) {
			track.setAttribute("aria-valuenow", String(Math.round(this._ratio * 100)));
		}
	}

	private emitChange() {
		const detail: Record<string, number> = { position: this._ratio, ratio: this._thumbRatio };
		if (this._virtualMode) {
			detail.scrollOffset = this._virtualScrollOffset;
		}
		this.dispatchEvent(new CustomEvent("scroll-change", {
			detail,
			bubbles: true,
			composed: true,
		}));
	}

	private showTemporarily() {
		const track = this.shadowRoot?.querySelector(".track");
		if (!track) return;
		track.classList.add("visible");
		this._visible = true;

		if (this._hideTimer !== null) clearTimeout(this._hideTimer);
		this._hideTimer = window.setTimeout(() => {
			if (!this._dragging) {
				track.classList.remove("visible");
				this._visible = false;
			}
			this._hideTimer = null;
		}, 1500);
	}
}
