import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

/**
 * EosProgressBar 组件
 * 分段式进度条，支持 default / dots / tiktok 三种样式，
 * 支持加载波纹动画、自定义进度填充、水平/垂直方向。
 * 可独立使用，也可嵌入 eos-carousel。
 *
 * @tagname eos-progress-bar
 *
 * @attr {number} total - 总段数
 * @attr {number} current - 当前激活的段索引（0-based）
 * @attr {"default"|"dots"|"tiktok"} variant - 样式变体
 * @attr {"top"|"bottom"|"left"|"right"} position - 位置方向
 * @attr {boolean} loading - 当前段是否显示加载波纹
 *
 * @fires {CustomEvent} segment-click - 点击某段时触发，detail: { index }
 */
export class EosProgressBar extends HTMLElement {
	private _total = 0;
	private _current = 0;
	private _loading = false;

	// 进度动画相关
	private _progress = 0;
	private _animating = false;
	private _progressTimer: number | null = null;
	private _progressStartTime = 0;
	private _progressDuration = 0;
	private _progressCallback: (() => void) | null = null;

	private getSafeTotal(value: string | null) {
		const parsed = Number.parseInt(value || "0", 10);
		return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
	}

	private getSafeCurrent(value: string | null, total = this._total) {
		const parsed = Number.parseInt(value || "0", 10);
		if (!Number.isFinite(parsed) || total <= 0) return 0;
		return Math.max(0, Math.min(total - 1, parsed));
	}

	static get observedAttributes() {
		return ["total", "current", "variant", "position", "loading"];
	}

	get total(): number { return this._total; }
	set total(v: number) { this._total = v; this.setAttribute("total", String(v)); }

	get current(): number { return this._current; }
	set current(v: number) { this._current = v; this.setAttribute("current", String(v)); }

	get variant(): "default" | "dots" | "tiktok" {
		return (this.getAttribute("variant") as any) || "default";
	}
	set variant(v: "default" | "dots" | "tiktok") { this.setAttribute("variant", v); }

	get position(): "top" | "bottom" | "left" | "right" {
		return (this.getAttribute("position") as any) || "bottom";
	}
	set position(v: "top" | "bottom" | "left" | "right") { this.setAttribute("position", v); }

	get loading(): boolean { return this.hasAttribute("loading"); }
	set loading(v: boolean) {
		if (v) { this.setAttribute("loading", ""); }
		else { this.removeAttribute("loading"); }
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this._total = this.getSafeTotal(this.getAttribute("total"));
		this._current = this.getSafeCurrent(this.getAttribute("current"));
		this._loading = this.hasAttribute("loading");
		this.render();
		this.updateSegments();
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		if (oldValue === newValue) return;
		switch (name) {
			case "total":
				this._total = this.getSafeTotal(newValue);
				this._current = this.getSafeCurrent(this.getAttribute("current"));
				this.rebuildSegments();
				break;
			case "current":
				this._current = this.getSafeCurrent(newValue);
				this.stopProgress();
				this._progress = 0;
				this._animating = false;
				this._loading = this.hasAttribute("loading");
				this.updateSegments();
				break;
			case "variant":
			case "position": {
				const bar = this.shadowRoot?.querySelector(".bar");
				if (bar) {
					bar.className = `bar variant-${this.variant} pos-${this.position}`;
				}
				break;
			}
			case "loading":
				this._loading = this.hasAttribute("loading");
				if (this._loading) {
					this.stopProgress();
					this._animating = false;
					this._progress = 0;
				}
				this.updateSegments();
				break;
		}
	}

	// ── 公共 API ──────────────────────────────────────────

	/** 开始当前段的进度动画 */
	startProgress(options?: { duration?: number; onComplete?: () => void }) {
		this.stopProgress();
		this._loading = false;
		this.removeAttribute("loading");

		const duration = options?.duration ?? 3000;
		this._progressCallback = options?.onComplete || null;
		this._progressDuration = duration;
		this._progressStartTime = Date.now();
		this._animating = true;
		this._progress = 0;
		this.updateSegments();

		const tick = () => {
			const elapsed = Date.now() - this._progressStartTime;
			const progress = Math.min((elapsed / this._progressDuration) * 100, 100);
			this._progress = progress;
			this.updateFill();

			if (progress >= 100) {
				const cb = this._progressCallback;
				this.stopProgress();
				if (cb) cb();
			} else {
				this._progressTimer = window.requestAnimationFrame(tick);
			}
		};
		this._progressTimer = window.requestAnimationFrame(tick);
	}

	/** 停止进度动画 */
	stopProgress() {
		if (this._progressTimer !== null) {
			cancelAnimationFrame(this._progressTimer);
			this._progressTimer = null;
		}
		this._progressCallback = null;
	}

	/** 手动设置进度 0-100 */
	setProgress(value: number) {
		this._progress = Math.max(0, Math.min(100, value));
		this._animating = true;
		this.updateFill();
	}

	/** 设置加载状态 */
	setLoading(v: boolean) {
		this.loading = v;
	}

	// ── 内部方法 ──────────────────────────────────────────

	private render() {
		if (!this.shadowRoot) return;
		this.shadowRoot.innerHTML = `
			<style>
				${EOS_THEME_TOKENS}
				:host {
					display: block;
					--pb-height: var(--progress-bar-height, 3px);
					--pb-gap: var(--progress-bar-gap, 3px);
					--pb-color: var(--progress-bar-color, var(--eos-color-border, rgba(0,0,0,0.16)));
					--pb-active: var(--progress-bar-active-color, var(--eos-color-accent, #006fee));
				}
				.bar {
					display: flex;
					gap: var(--pb-gap);
				}
				/* ── 位置 ── */
				.bar.pos-bottom, .bar.pos-top { flex-direction: row; }
				.bar.pos-left, .bar.pos-right { flex-direction: column; }

				/* ── default 样式 ── */
				.bar.variant-default .seg {
					height: var(--pb-height);
					background: var(--pb-color);
					border-radius: 2px;
					position: relative;
					overflow: hidden;
					flex: 1;
					min-width: 30px;
					cursor: pointer;
				}
				.bar.variant-default.pos-left .seg,
				.bar.variant-default.pos-right .seg {
					width: var(--pb-height); height: 30px; min-width: unset;
				}

				/* ── dots 样式 ── */
				.bar.variant-dots { gap: 8px; }
				.bar.variant-dots .seg {
					width: 8px; height: 8px; border-radius: 50%;
					background: var(--pb-color); cursor: pointer;
					transition: transform 0.15s ease, background-color 0.15s ease; flex: none;
				}
				.bar.variant-dots .seg.active { background: var(--pb-active); transform: scale(1.2); }

				/* ── tiktok 样式 ── */
				.bar.variant-tiktok .seg {
					height: 3px;
					background: var(--pb-color);
					border-radius: 1.5px;
					position: relative;
					overflow: hidden;
					flex: 1;
					cursor: pointer;
					transition: background-color 0.15s ease;
				}
				.bar.variant-tiktok .seg.passed { background: var(--pb-active); }
				.bar.variant-tiktok .seg.active.completed { background: var(--pb-active); }
				.bar.variant-tiktok .seg.active.animating { background: var(--pb-color); }
				.bar.variant-tiktok .fill { background: var(--pb-active); }

				.bar.variant-tiktok.pos-left .seg,
				.bar.variant-tiktok.pos-right .seg { width: 3px; height: auto; }

				/* ── 通用 passed/completed/animating（非 tiktok） ── */
				.bar:not(.variant-tiktok) .seg.passed { background: var(--pb-active); }
				.bar:not(.variant-tiktok) .seg.active.completed { background: var(--pb-active); }
				.bar:not(.variant-tiktok) .seg.active.animating { background: var(--pb-color); }

				/* ── fill 进度条 ── */
				.fill {
					position: absolute; top: 0; left: 0;
					height: 100%; width: 0%;
					background: var(--pb-active);
					transition: width 0.1s linear;
				}
				.bar.pos-left .fill, .bar.pos-right .fill {
					width: 100%; height: 0%;
					transition: height 0.1s linear;
				}

				/* ── 加载波纹 ── */
				@keyframes loadingRipple {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
				.seg.active.loading {
					background: linear-gradient(90deg,
						var(--pb-color) 0%,
						var(--pb-active) 50%,
						var(--pb-color) 100%
					) !important;
					background-size: 200% 100% !important;
					animation: loadingRipple 1.5s ease-in-out infinite !important;
				}
			.seg.active.loading .fill { display: none; }
			.seg:focus-visible {
				outline: 2px solid var(--eos-color-focus-ring, #006fee);
				outline-offset: 3px;
			}
				@media (prefers-reduced-motion: reduce) {
					.bar.variant-dots .seg,
					.bar.variant-tiktok .seg,
					.fill { transition: none; }
					.seg.active.loading { animation: none !important; background: var(--pb-active) !important; }
				}
			</style>
			<div class="bar variant-${this.variant} pos-${this.position}" role="tablist" aria-label="Progress"></div>
		`;
	}

	private rebuildSegments() {
		const bar = this.shadowRoot?.querySelector(".bar");
		if (!bar) return;
		bar.innerHTML = "";
		const frag = document.createDocumentFragment();
		for (let i = 0; i < this._total; i++) {
			const seg = document.createElement("div");
			seg.className = "seg";
			seg.setAttribute("role", "tab");
			seg.addEventListener("click", () => {
				this.dispatchEvent(new CustomEvent("segment-click", {
					detail: { index: i }, bubbles: true, composed: true,
				}));
			});
			seg.addEventListener("keydown", (event) => {
				const key = (event as KeyboardEvent).key;
				if (key === "Enter" || key === " ") {
					event.preventDefault();
					seg.click();
					return;
				}
				const last = this._total - 1;
				let next = i;
				if (key === "ArrowRight" || key === "ArrowDown") next = Math.min(last, i + 1);
				if (key === "ArrowLeft" || key === "ArrowUp") next = Math.max(0, i - 1);
				if (key === "Home") next = 0;
				if (key === "End") next = last;
				if (next !== i) {
					event.preventDefault();
					this.shadowRoot?.querySelectorAll<HTMLElement>(".seg")[next]?.focus();
				}
			});
			frag.appendChild(seg);
		}
		bar.appendChild(frag);
		this.updateSegments();
	}

	private updateSegments() {
		const bar = this.shadowRoot?.querySelector(".bar");
		if (!bar) return;
		const segs = bar.querySelectorAll<HTMLElement>(".seg");
		if (segs.length !== this._total) {
			this.rebuildSegments();
			return;
		}
		const isDots = this.variant === "dots";
		for (let i = 0; i < this._total; i++) {
			const seg = segs[i];
			if (!seg) continue;
			seg.setAttribute("aria-selected", String(i === this._current));
			seg.tabIndex = i === this._current ? 0 : -1;
			seg.classList.remove("active", "passed", "animating", "completed", "loading");
			seg.querySelector(".fill")?.remove();

			if (i === this._current) {
				seg.classList.add("active");
				if (!isDots) {
					if (this._loading) {
						seg.classList.add("loading");
					} else if (this._animating) {
						seg.classList.add("animating");
						const fill = document.createElement("div");
						fill.className = "fill";
						const isVert = this.position === "left" || this.position === "right";
						if (isVert) { fill.style.height = `${this._progress}%`; }
						else { fill.style.width = `${this._progress}%`; }
						seg.appendChild(fill);
					} else {
						seg.classList.add("completed");
					}
				}
			} else if (i < this._current) {
				if (!isDots) seg.classList.add("passed");
			}
		}
	}

	private updateFill() {
		const bar = this.shadowRoot?.querySelector(".bar");
		if (!bar) return;
		const segs = bar.querySelectorAll(".seg");
		const seg = segs[this._current];
		if (!seg) return;
		const fill = seg.querySelector(".fill") as HTMLElement;
		if (!fill) return;
		const isVert = this.position === "left" || this.position === "right";
		if (isVert) { fill.style.height = `${this._progress}%`; }
		else { fill.style.width = `${this._progress}%`; }
	}

	disconnectedCallback() {
		this.stopProgress();
	}
}
