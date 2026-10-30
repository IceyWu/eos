import { PROGRESS_BAR_STYLES } from "./progress-bar.css";

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
 * @attr {boolean} scrubbable - 拖动后松开选择所在分段
 * @attr {string} aria-label - 分段导航的可访问名称
 *
 * @fires {CustomEvent} segment-click - 点击某段时触发，detail: { index }
 */
const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/** @customElement eos-progress-bar */
export class EosProgressBar extends HTMLElementBase {
	private _total = 0;
	private _current = 0;
	private _loading = false;
	private _bar: HTMLElement | null = null;
	private _segments: HTMLButtonElement[] = [];
	private _fills: HTMLElement[] = [];
	private _activeFill: HTMLElement | null = null;
	private _labels: readonly string[] = [];
	private _scrubIndex: number | null = null;
	private _pointerId: number | null = null;
	private _suppressClick = false;

	// 进度动画相关
	private _progress = 0;
	private _animating = false;
	private _progressTimer: number | null = null;
	private _progressStartTime = 0;
	private _progressDuration = 0;
	private _progressCallback: (() => void) | null = null;
	private _progressPaused = false;

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
		return [
			"total",
			"current",
			"variant",
			"position",
			"loading",
			"aria-label",
			"scrubbable",
		];
	}

	get total(): number {
		return this._total;
	}
	set total(v: number) {
		const value = this.getSafeTotal(String(v));
		if (value !== this._total || !this.hasAttribute("total"))
			this.setAttribute("total", String(value));
	}

	get current(): number {
		return this._current;
	}
	set current(v: number) {
		const value = this.getSafeCurrent(String(v));
		if (value !== this._current || !this.hasAttribute("current"))
			this.setAttribute("current", String(value));
	}

	get variant(): "default" | "dots" | "tiktok" {
		return (this.getAttribute("variant") as any) || "default";
	}
	set variant(v: "default" | "dots" | "tiktok") {
		this.setAttribute("variant", v);
	}

	get position(): "top" | "bottom" | "left" | "right" {
		return (this.getAttribute("position") as any) || "bottom";
	}
	set position(v: "top" | "bottom" | "left" | "right") {
		this.setAttribute("position", v);
	}

	get loading(): boolean {
		return this.hasAttribute("loading");
	}
	set loading(v: boolean) {
		if (v) {
			this.setAttribute("loading", "");
		} else {
			this.removeAttribute("loading");
		}
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this._total = this.getSafeTotal(this.getAttribute("total"));
		this._current = this.getSafeCurrent(this.getAttribute("current"));
		this._loading = this.hasAttribute("loading");
		if (!this._bar) {
			this.render();
			this.rebuildSegments();
		} else {
			this.updateSegments();
		}
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue === newValue) return;
		switch (name) {
			case "total":
				this.stopProgress();
				this._total = this.getSafeTotal(newValue);
				this._current = this.getSafeCurrent(this.getAttribute("current"));
				this.rebuildSegments();
				break;
			case "current":
				if (this.getSafeCurrent(newValue) === this._current) return;
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
				this.updateSegments();
				break;
			}
			case "aria-label":
				this._bar?.setAttribute("aria-label", newValue || "Progress");
				break;
			case "scrubbable":
				this.cancelScrub();
				this._suppressClick = false;
				break;
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

	/** Localized labels, one per segment. No HTML is interpreted. */
	get segmentLabels(): readonly string[] {
		return this._labels;
	}
	set segmentLabels(labels: readonly string[]) {
		this._labels = [...labels];
		this._segments.forEach((segment, index) =>
			this.labelSegment(segment, index),
		);
	}

	get progress(): number {
		return this._progress;
	}

	/** A segment's native button, for tooltip anchoring and native events. */
	getSegment(index: number): HTMLButtonElement | undefined {
		return this._segments[index];
	}

	/** Resolve the nearest visible segment, including gaps and vertical layouts. */
	getSegmentIndexAt(clientX: number, clientY: number): number | undefined {
		const vertical = this.position === "left" || this.position === "right";
		const point = vertical ? clientY : clientX;
		let result: number | undefined;
		let distance = Infinity;
		this._segments.forEach((segment, index) => {
			const rect = segment.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			const next = Math.abs(
				point -
					(vertical ? rect.top + rect.height / 2 : rect.left + rect.width / 2),
			);
			if (next < distance) {
				distance = next;
				result = index;
			}
		});
		return result;
	}

	/** One playback clock can update the segment and its fraction without starting another RAF. */
	setState(current: number, progress: number) {
		const index = this.getSafeCurrent(String(current));
		const needsState =
			index !== this._current || !this._animating || this._loading;
		this.stopProgress();
		this._current = index;
		this._progress = Number.isFinite(progress)
			? Math.max(0, Math.min(100, progress))
			: 0;
		this._animating = true;
		if (this.getAttribute("current") !== String(index))
			this.setAttribute("current", String(index));
		if (this.hasAttribute("loading")) {
			// The attribute callback applies the final state once.
			this.removeAttribute("loading");
		} else if (needsState) this.updateSegments();
		else this.updateFill();
	}

	/** 开始当前段的进度动画 */
	startProgress(options?: { duration?: number; onComplete?: () => void }) {
		this.stopProgress();
		this.removeAttribute("loading");
		const duration = options?.duration ?? 3000;
		this._progressDuration = Number.isFinite(duration)
			? Math.max(0, duration)
			: 3000;
		this._progressCallback = options?.onComplete || null;
		this._progressStartTime = performance.now();
		this._animating = true;
		this._progress = 0;
		this.updateSegments();
		if (!this._progressDuration) {
			this.advanceProgress();
			return;
		}
		this._progressTimer = requestAnimationFrame(this.advanceProgress);
	}

	private advanceProgress = () => {
		this._progressTimer = null;
		this._progress =
			this._progressDuration === 0
				? 100
				: Math.min(
						((performance.now() - this._progressStartTime) /
							this._progressDuration) *
							100,
						100,
					);
		this.updateFill();
		if (this._progress >= 100) {
			const callback = this._progressCallback;
			this.stopProgress();
			callback?.();
		} else {
			this._progressTimer = requestAnimationFrame(this.advanceProgress);
		}
	};

	/** Stop the internal clock and retain the displayed fraction. */
	stopProgress() {
		if (this._progressTimer !== null) cancelAnimationFrame(this._progressTimer);
		this._progressTimer = null;
		this._progressCallback = null;
		this._progressPaused = false;
	}

	pauseProgress() {
		if (
			!this._animating ||
			this._progressPaused ||
			this._progressTimer === null
		)
			return;
		this._progress = Math.min(
			((performance.now() - this._progressStartTime) /
				Math.max(this._progressDuration, 1)) *
				100,
			100,
		);
		this.updateFill();
		cancelAnimationFrame(this._progressTimer);
		this._progressTimer = null;
		this._progressPaused = true;
	}

	resumeProgress() {
		if (!this._animating || !this._progressPaused) return;
		this._progressStartTime =
			performance.now() - (this._progress / 100) * this._progressDuration;
		this._progressPaused = false;
		this._progressTimer = requestAnimationFrame(this.advanceProgress);
	}

	/** External-clock update: only the cached active fill's transform changes per frame. */
	setProgress(value: number) {
		this.setState(this._current, value);
	}

	/** 设置加载状态 */
	setLoading(v: boolean) {
		this.loading = v;
	}

	// ── 内部方法 ──────────────────────────────────────────

	private render() {
		const root = this.shadowRoot;
		if (!root) return;
		root.innerHTML = `
			<style>${PROGRESS_BAR_STYLES}</style>
			<div class="bar" role="group"></div>
		`;
		const bar = root.querySelector<HTMLElement>(".bar");
		if (!bar) return;
		this._bar = bar;
		bar.className = `bar variant-${this.variant} pos-${this.position}`;
		bar.setAttribute(
			"aria-label",
			this.getAttribute("aria-label") || "Progress",
		);
		bar.addEventListener("click", this.handleClick);
		bar.addEventListener("keydown", this.handleKeydown);
		bar.addEventListener("pointerdown", this.handlePointerDown);
		bar.addEventListener("pointermove", this.handlePointerMove);
		bar.addEventListener("pointerup", this.handlePointerUp);
		bar.addEventListener("pointercancel", this.cancelScrub);
		bar.addEventListener("lostpointercapture", this.cancelScrub);
	}

	private labelSegment(segment: HTMLElement, index: number) {
		segment.setAttribute(
			"aria-label",
			this._labels[index] || `${index + 1} / ${this._total}`,
		);
	}

	private rebuildSegments() {
		if (!this._bar) return;
		this._segments = [];
		this._fills = [];
		const fragment = document.createDocumentFragment();
		for (let index = 0; index < this._total; index++) {
			const segment = document.createElement("button");
			segment.type = "button";
			segment.className = "seg";
			segment.part.add("segment");
			segment.dataset.index = String(index);
			this.labelSegment(segment, index);
			const track = document.createElement("span");
			track.className = "track";
			track.part.add("track");
			const fill = document.createElement("span");
			fill.className = "fill";
			fill.part.add("fill");
			track.append(fill);
			segment.append(track);
			fragment.append(segment);
			this._segments.push(segment);
			this._fills.push(fill);
		}
		this._bar.replaceChildren(fragment);
		this.updateSegments();
	}

	private updateSegments() {
		this._activeFill = this._fills[this._current] ?? null;
		this._segments.forEach((segment, index) => {
			const active = index === this._current;
			segment.classList.toggle("active", active);
			segment.classList.toggle(
				"passed",
				index < this._current && this.variant !== "dots",
			);
			segment.classList.toggle("loading", active && this._loading);
			segment.classList.toggle(
				"animating",
				active && this._animating && !this._loading && this.variant !== "dots",
			);
			segment.classList.toggle(
				"completed",
				active && !this._animating && !this._loading && this.variant !== "dots",
			);
			segment.tabIndex = active ? 0 : -1;
			if (active) segment.setAttribute("aria-current", "step");
			else segment.removeAttribute("aria-current");
		});
		this.updateFill();
	}

	private updateFill() {
		if (!this._activeFill) return;
		const vertical = this.position === "left" || this.position === "right";
		const transform = `${vertical ? "scaleY" : "scaleX"}(${this._progress / 100})`;
		if (this._activeFill.style.transform !== transform)
			this._activeFill.style.transform = transform;
	}

	private select(index: number) {
		this.dispatchEvent(
			new CustomEvent("segment-click", {
				detail: { index },
				bubbles: true,
				composed: true,
			}),
		);
	}

	private handleClick = (event: MouseEvent) => {
		if (event.detail > 0 && this._suppressClick) {
			this._suppressClick = false;
			return;
		}
		const segment = (event.target as Element).closest<HTMLButtonElement>(
			"button.seg",
		);
		if (segment) this.select(Number(segment.dataset.index));
	};

	private handleKeydown = (event: KeyboardEvent) => {
		const segment = (event.target as Element).closest<HTMLButtonElement>(
			"button.seg",
		);
		if (!segment || event.altKey || event.ctrlKey || event.metaKey) return;
		const visible = this._segments.filter(
			(item) => item.getClientRects().length > 0,
		);
		const index = visible.indexOf(segment);
		let next = index;
		const rtl =
			(this.position === "top" || this.position === "bottom") &&
			getComputedStyle(this).direction === "rtl";
		const forward = rtl ? "ArrowLeft" : "ArrowRight";
		const backward = rtl ? "ArrowRight" : "ArrowLeft";
		if (event.key === forward || event.key === "ArrowDown")
			next = Math.min(visible.length - 1, index + 1);
		else if (event.key === backward || event.key === "ArrowUp")
			next = Math.max(0, index - 1);
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = visible.length - 1;
		else return;
		event.preventDefault();
		visible[next]?.focus();
	};

	private handlePointerDown = (event: PointerEvent) => {
		if (
			!this.hasAttribute("scrubbable") ||
			event.button !== 0 ||
			!event.isPrimary
		)
			return;
		this._suppressClick = false;
		this._pointerId = event.pointerId;
		this._scrubIndex =
			this.getSegmentIndexAt(event.clientX, event.clientY) ?? null;
		this._bar?.setPointerCapture(event.pointerId);
	};
	private handlePointerMove = (event: PointerEvent) => {
		if (this._pointerId !== event.pointerId) return;
		this._scrubIndex =
			this.getSegmentIndexAt(event.clientX, event.clientY) ?? null;
	};
	private handlePointerUp = (event: PointerEvent) => {
		if (this._pointerId !== event.pointerId) return;
		const index =
			this.getSegmentIndexAt(event.clientX, event.clientY) ?? this._scrubIndex;
		this._pointerId = null;
		this._scrubIndex = null;
		this._suppressClick = true;
		if (this._bar?.hasPointerCapture(event.pointerId))
			this._bar.releasePointerCapture(event.pointerId);
		if (index !== null && index !== undefined) this.select(index);
	};
	private cancelScrub = () => {
		const pointerId = this._pointerId;
		this._scrubIndex = null;
		this._pointerId = null;
		if (pointerId !== null && this._bar?.hasPointerCapture(pointerId))
			this._bar.releasePointerCapture(pointerId);
	};

	disconnectedCallback() {
		this.stopProgress();
		this.cancelScrub();
	}
}
