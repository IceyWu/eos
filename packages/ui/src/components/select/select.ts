import { SELECT_STYLES } from "./select.css";

/** An option accepted by EosSelect. Labels, values and prefixes are rendered as text. */
export interface EosSelectOption {
	value: string;
	label: string;
	prefix?: string;
	disabled?: boolean;
}

export type EosSelectPlacement = "auto" | "top" | "right" | "bottom" | "left";
export type EosSelectBoundary =
	| Element
	| Element[]
	| { x: number; y: number; width: number; height: number };

type FloatingSide = Exclude<EosSelectPlacement, "auto">;
type PositionRect = {
	left: number;
	top: number;
	right: number;
	bottom: number;
};

const FLOATING_SIDES: readonly FloatingSide[] = [
	"left",
	"right",
	"top",
	"bottom",
];
const FLOATING_GAP = 12;
const FLOATING_PADDING = 12;

function intersectRects(rects: readonly PositionRect[]): PositionRect {
	return rects.reduce(
		(result, rect) => ({
			left: Math.max(result.left, rect.left),
			top: Math.max(result.top, rect.top),
			right: Math.min(result.right, rect.right),
			bottom: Math.min(result.bottom, rect.bottom),
		}),
		{ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight },
	);
}

/**
 * EOS Select
 * A morphing pill selector with a centered pointer wheel and a virtualized list.
 * Set `options` as a property; only visible rows plus a small overscan are mounted.
 * @tagname eos-select
 * @attr {string} value - Selected option value
 * @attr {boolean} open - Whether the option list is open
 * @attr {boolean} disabled - Whether the control can be used
 * @attr {string} placeholder - Text shown when there is no selection
 * @attr {string} aria-label - Accessible name
 * @fires {CustomEvent} change - Selection changed, detail: { value, option }
 */
const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/** @customElement eos-select */
export class EosSelect extends HTMLElementBase {
	private readonly root: ShadowRoot;
	private _options: readonly EosSelectOption[] = [];
	private _value = "";
	private _activeIndex = -1;
	private _hoverIndex = -1;
	private _pointerDownIndex = -1;
	private _rowHeight = 40;
	private _columnWidth = 60;
	private _viewportHeight = 264;
	private _viewportWidth = 264;
	private _leadingSpace = (264 - 40) / 2;
	private _leadingInlineSpace = (264 - 60) / 2;
	private _horizontalLayout = false;
	private _layoutMeasured = false;
	private _renderStart = -1;
	private _themeObserver?: MutationObserver;
	private _typeahead = "";
	private _typeaheadTimer?: number;
	private _renderFrame = 0;
	private _scrollSettleTimer?: number;
	private _snapFallbackTimer?: number;
	private _snapTargetIndex = -1;
	private _pendingSelectionIndex = -1;
	private _isSnapAnimating = false;
	private _lastScrollTop = 0;
	private _lastScrollLeft = 0;
	private _scrollDirection = 1;
	private _positionObserver?: ResizeObserver;
	private _positionIntersectionObserver?: IntersectionObserver;
	private _positionUpdateHandler = () => this.scheduleFloatingPositionUpdate();
	private _positionFrame = 0;
	private _positionRequest = 0;
	private _boundary?: EosSelectBoundary;

	static get observedAttributes() {
		return [
			"value",
			"open",
			"disabled",
			"placeholder",
			"aria-label",
			"aria-labelledby",
			"placement",
		];
	}

	constructor() {
		super();
		this.root = this.attachShadow({ mode: "open" });
	}

	get options(): readonly EosSelectOption[] {
		return this._options;
	}
	set options(value: readonly EosSelectOption[]) {
		this._options = Array.isArray(value)
			? value.filter(
					(option) =>
						option &&
						typeof option.value === "string" &&
						typeof option.label === "string",
				)
			: [];
		this._activeIndex =
			this.selectedIndex >= 0
				? this.selectedIndex
				: this._options.length
					? 0
					: -1;
		if (this.isConnected) this.render();
	}

	get value() {
		return this._value;
	}
	set value(value: string) {
		const next = String(value ?? "");
		if (next === this._value) return;
		this._value = next;
		if (this.getAttribute("value") !== next) this.setAttribute("value", next);
		else this.syncState();
	}

	get open() {
		return this.hasAttribute("open");
	}
	set open(value: boolean) {
		this.toggleAttribute("open", Boolean(value));
	}
	get disabled() {
		return this.hasAttribute("disabled");
	}
	set disabled(value: boolean) {
		this.toggleAttribute("disabled", Boolean(value));
	}
	get placement(): EosSelectPlacement {
		const value = this.getAttribute("placement");
		return value === "top" ||
			value === "right" ||
			value === "bottom" ||
			value === "left"
			? value
			: "auto";
	}
	set placement(value: EosSelectPlacement) {
		if (value === "auto") this.removeAttribute("placement");
		else if (
			value === "top" ||
			value === "right" ||
			value === "bottom" ||
			value === "left"
		)
			this.setAttribute("placement", value);
	}
	get boundary() {
		return this._boundary;
	}
	set boundary(value: EosSelectBoundary | undefined) {
		this._boundary = value;
		if (this.open) this.startFloatingPositioning();
	}

	private get selectedIndex() {
		return this._options.findIndex((option) => option.value === this._value);
	}
	private get selectedOption() {
		return this._options[this.selectedIndex];
	}

	connectedCallback() {
		this._value = this.getAttribute("value") ?? this._value;
		this._activeIndex =
			this.selectedIndex >= 0
				? this.selectedIndex
				: this._options.length
					? 0
					: -1;
		this.syncTheme();
		this._themeObserver = new MutationObserver(() => this.syncTheme());
		this._themeObserver.observe(document.documentElement, {
			attributes: true,
			subtree: true,
			attributeFilter: [
				"class",
				"data-eos-theme",
				"data-color-mode",
				"data-lobe-demo-appearance",
				"data-theme",
			],
		});
		this.render();
		window.addEventListener("resize", this.measureViewport);
		document.addEventListener("pointerdown", this.handleOutsidePointer, true);
		this.addEventListener("keydown", this.handleKeydown);
	}

	disconnectedCallback() {
		this.stopFloatingPositioning();
		this._themeObserver?.disconnect();
		this._themeObserver = undefined;
		window.removeEventListener("resize", this.measureViewport);
		this.clearSnapTimers();
		document.removeEventListener(
			"pointerdown",
			this.handleOutsidePointer,
			true,
		);
		this.removeEventListener("keydown", this.handleKeydown);
		if (this._typeaheadTimer) clearTimeout(this._typeaheadTimer);
		cancelAnimationFrame(this._renderFrame);
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue === newValue || !this.isConnected) return;
		if (name === "value") {
			this._value = newValue ?? "";
			this._activeIndex = this.selectedIndex;
			if (this._activeIndex < 0 && this._options.length) this._activeIndex = 0;
			if (this.open) this.scrollActiveIntoView(false);
		}
		this.syncState();
		if (name === "open" && this.open) {
			this._activeIndex =
				this.selectedIndex >= 0
					? this.selectedIndex
					: this._options.length
						? 0
						: -1;
			this.syncActiveRows();
			this.scrollActiveIntoView(false);
			this._renderRows(true);
			this.startFloatingPositioning();
		} else if (name === "open") {
			this.stopFloatingPositioning();
			this._renderRows(true);
		} else if (name === "placement" && this.open) {
			if (this.selectedIndex >= 0) this._activeIndex = this.selectedIndex;
			this._renderRows(true);
			this.scrollActiveIntoView(false);
			const trigger = this.root.querySelector<HTMLElement>(".trigger");
			const panel = this.root.querySelector<HTMLElement>(".panel");
			if (trigger && panel) void this.updateFloatingPosition(trigger, panel);
		}
	}

	private startFloatingPositioning() {
		const trigger = this.root.querySelector<HTMLElement>(".trigger");
		const panel = this.root.querySelector<HTMLElement>(".panel");
		if (!trigger || !panel || !this.open) return;
		this.stopFloatingPositioning();
		panel.removeAttribute("data-positioned");
		panel.dataset.placement = "left";
		document.addEventListener("scroll", this._positionUpdateHandler, true);
		window.addEventListener("resize", this._positionUpdateHandler);
		window.visualViewport?.addEventListener(
			"resize",
			this._positionUpdateHandler,
		);
		window.visualViewport?.addEventListener(
			"scroll",
			this._positionUpdateHandler,
		);
		this._positionObserver = new ResizeObserver(this._positionUpdateHandler);
		this._positionObserver.observe(trigger);
		this._positionObserver.observe(panel);
		for (const boundary of this.getBoundaryElements())
			this._positionObserver.observe(boundary);
		this.updateFloatingPosition(trigger, panel);
	}

	private stopFloatingPositioning() {
		this._positionRequest++;
		cancelAnimationFrame(this._positionFrame);
		this._positionFrame = 0;
		document.removeEventListener("scroll", this._positionUpdateHandler, true);
		window.removeEventListener("resize", this._positionUpdateHandler);
		window.visualViewport?.removeEventListener(
			"resize",
			this._positionUpdateHandler,
		);
		window.visualViewport?.removeEventListener(
			"scroll",
			this._positionUpdateHandler,
		);
		this._positionObserver?.disconnect();
		this._positionObserver = undefined;
		this._positionIntersectionObserver?.disconnect();
		this._positionIntersectionObserver = undefined;
	}

	private scheduleFloatingPositionUpdate() {
		if (this._positionFrame || !this.open) return;
		this._positionFrame = requestAnimationFrame(() => {
			this._positionFrame = 0;
			const trigger = this.root.querySelector<HTMLElement>(".trigger");
			const panel = this.root.querySelector<HTMLElement>(".panel");
			if (trigger && panel) this.updateFloatingPosition(trigger, panel);
		});
	}

	private getBoundaryElements(): Element[] {
		if (!this._boundary) return [];
		const boundaries = Array.isArray(this._boundary)
			? this._boundary
			: [this._boundary];
		return boundaries.filter(
			(boundary): boundary is Element => boundary instanceof Element,
		);
	}

	private getFloatingBounds(): PositionRect {
		const visualViewport = window.visualViewport;
		const viewport: PositionRect = visualViewport
			? {
					left: visualViewport.offsetLeft,
					top: visualViewport.offsetTop,
					right: visualViewport.offsetLeft + visualViewport.width,
					bottom: visualViewport.offsetTop + visualViewport.height,
				}
			: {
					left: 0,
					top: 0,
					right: window.innerWidth,
					bottom: window.innerHeight,
				};
		const boundaries = this._boundary
			? Array.isArray(this._boundary)
				? this._boundary
				: [this._boundary]
			: [];
		const rects: PositionRect[] = [viewport];
		for (const boundary of boundaries) {
			if (boundary instanceof Element) {
				const rect = boundary.getBoundingClientRect();
				rects.push({
					left: rect.left,
					top: rect.top,
					right: rect.right,
					bottom: rect.bottom,
				});
			} else {
				rects.push({
					left: boundary.x,
					top: boundary.y,
					right: boundary.x + boundary.width,
					bottom: boundary.y + boundary.height,
				});
			}
		}
		return intersectRects(rects);
	}

	private updateFloatingPosition(trigger: HTMLElement, panel: HTMLElement) {
		const request = ++this._positionRequest;
		const bounds = this.getFloatingBounds();
		const triggerRect = trigger.getBoundingClientRect();
		const available = (side: FloatingSide) => {
			const width = Math.max(
				0,
				bounds.right - bounds.left - FLOATING_PADDING * 2,
			);
			const height = Math.max(
				0,
				bounds.bottom - bounds.top - FLOATING_PADDING * 2,
			);
			if (side === "left")
				return {
					width: Math.min(
						520,
						triggerRect.left - bounds.left - FLOATING_GAP - FLOATING_PADDING,
					),
					height: Math.min(280, height),
				};
			if (side === "right")
				return {
					width: Math.min(
						520,
						bounds.right - triggerRect.right - FLOATING_GAP - FLOATING_PADDING,
					),
					height: Math.min(280, height),
				};
			if (side === "top")
				return {
					width: Math.min(520, width),
					height: Math.min(
						240,
						triggerRect.top - bounds.top - FLOATING_GAP - FLOATING_PADDING,
					),
				};
			return {
				width: Math.min(520, width),
				height: Math.min(
					240,
					bounds.bottom - triggerRect.bottom - FLOATING_GAP - FLOATING_PADDING,
				),
			};
		};
		const requested = this.placement;
		const preferred: FloatingSide = requested === "auto" ? "left" : requested;
		const required =
			preferred === "top" || preferred === "bottom"
				? { width: 280, height: 240 }
				: { width: 280, height: 280 };
		const fits = (side: FloatingSide) => {
			const size = available(side);
			return side === "left" || side === "right"
				? size.width >= required.width && size.height >= required.height
				: size.height >= required.height && size.width >= required.width;
		};
		const side =
			requested !== "auto" && fits(preferred)
				? preferred
				: ([...FLOATING_SIDES].sort((a, b) => {
						const sizeA = available(a);
						const sizeB = available(b);
						const areaA = Math.max(0, sizeA.width) * Math.max(0, sizeA.height);
						const areaB = Math.max(0, sizeB.width) * Math.max(0, sizeB.height);
						return areaB - areaA;
					})[0] ?? preferred);
		const size = available(side);
		const maxWidth = Math.max(0, size.width);
		const maxHeight = Math.max(0, size.height);
		panel.style.maxWidth = `${maxWidth}px`;
		panel.style.maxHeight = `${maxHeight}px`;
		panel.dataset.placement = side;
		const panelRect = panel.getBoundingClientRect();
		let left =
			side === "left"
				? triggerRect.left - FLOATING_GAP - panelRect.width
				: side === "right"
					? triggerRect.right + FLOATING_GAP
					: triggerRect.left + (triggerRect.width - panelRect.width) / 2;
		let top =
			side === "top"
				? triggerRect.top - FLOATING_GAP - panelRect.height
				: side === "bottom"
					? triggerRect.bottom + FLOATING_GAP
					: triggerRect.top + (triggerRect.height - panelRect.height) / 2;
		left = Math.max(
			bounds.left + FLOATING_PADDING,
			Math.min(left, bounds.right - FLOATING_PADDING - panelRect.width),
		);
		top = Math.max(
			bounds.top + FLOATING_PADDING,
			Math.min(top, bounds.bottom - FLOATING_PADDING - panelRect.height),
		);
		if (!this.open || request !== this._positionRequest || !panel.isConnected)
			return;
		panel.style.left = `${left}px`;
		panel.style.top = `${top}px`;
		panel.dataset.positioned = "true";
		this.measureViewport();
		this.observeTriggerPosition(trigger);
	}

	private observeTriggerPosition(trigger: HTMLElement) {
		this._positionIntersectionObserver?.disconnect();
		const rect = trigger.getBoundingClientRect();
		if (
			rect.left < 0 ||
			rect.top < 0 ||
			rect.right > window.innerWidth ||
			rect.bottom > window.innerHeight
		)
			return;
		this._positionIntersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.intersectionRatio < 1)) {
					this._positionIntersectionObserver?.disconnect();
					this.scheduleFloatingPositionUpdate();
				}
			},
			{
				rootMargin: `-${rect.top}px -${window.innerWidth - rect.right}px -${window.innerHeight - rect.bottom}px -${rect.left}px`,
				threshold: [1],
			},
		);
		this._positionIntersectionObserver.observe(trigger);
	}

	private render() {
		this.stopFloatingPositioning();
		const label = this.escape(
			this.getAttribute("aria-label") ?? "Select an option",
		);
		this.root.innerHTML = `<style>${SELECT_STYLES}</style>
<button class="trigger" part="trigger" type="button" role="combobox" aria-label="${label}" aria-valuetext="" aria-haspopup="listbox" aria-expanded="${this.open}" aria-controls="eos-select-list" ${this.disabled ? "disabled" : ""}>
<span class="trigger-label" part="value"></span></button>
<div class="panel" part="panel"><div class="viewport" part="viewport"><div class="list" id="eos-select-list" role="listbox"></div><p class="empty" hidden>No options available</p></div><div class="selection-overlay" part="selection-indicator" aria-hidden="true"><span class="selection-pill"></span><span class="selection-pointer"></span></div></div>
<span class="status" aria-live="polite"></span>`;
		const trigger = this.root.querySelector<HTMLButtonElement>(".trigger");
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		const list = this.root.querySelector<HTMLElement>(".list");
		if (!trigger || !viewport || !list) return;
		trigger.addEventListener("click", () => {
			if (!this.disabled) this.open = !this.open;
		});
		viewport.addEventListener("scroll", this.handleScroll, { passive: true });
		viewport.addEventListener("scrollend", this.handleScrollEnd);
		viewport.addEventListener("wheel", this.handleWheel, { passive: false });
		viewport.addEventListener("pointerdown", this.interruptSnap, {
			passive: true,
		});
		viewport.addEventListener("touchstart", this.interruptSnap, {
			passive: true,
		});
		list.addEventListener("pointermove", this.handlePointerMove);
		list.addEventListener("pointerdown", this.handlePointerDown);
		list.addEventListener("pointerleave", this.handlePointerLeave);
		list.addEventListener("click", this.handleOptionClick);
		const empty = this.root.querySelector<HTMLElement>(".empty");
		if (empty) empty.hidden = this._options.length > 0;
		this.updateSelectionGeometry();
		this.measureViewport();
		this.syncState();
		if (this.open) this.startFloatingPositioning();
	}

	private measureViewport = () => {
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		const list = this.root.querySelector<HTMLElement>(".list");
		if (!viewport || !list) return;
		const horizontal = this.isHorizontalCompass();
		const changed =
			!this._layoutMeasured ||
			horizontal !== this._horizontalLayout ||
			(horizontal &&
				Math.abs(viewport.clientWidth - this._viewportWidth) > 1) ||
			(!horizontal &&
				Math.abs(viewport.clientHeight - this._viewportHeight) > 1);
		if (!changed) return;
		this._layoutMeasured = true;
		this._horizontalLayout = horizontal;
		if (horizontal) {
			viewport.scrollTop = 0;
			this._lastScrollTop = 0;
		} else {
			viewport.scrollLeft = 0;
			this._lastScrollLeft = 0;
		}
		if (horizontal) {
			const width = viewport.clientWidth || this._viewportWidth;
			this._viewportWidth = width;
			this._leadingInlineSpace = Math.max(0, (width - this._columnWidth) / 2);
			list.style.inlineSize = `${this._options.length * this._columnWidth + this._leadingInlineSpace * 2}px`;
			list.style.blockSize = "100%";
		} else {
			const height = viewport.clientHeight || this._viewportHeight;
			this._viewportHeight = height;
			this._leadingSpace = Math.max(0, (height - this._rowHeight) / 2);
			list.style.blockSize = `${this._options.length * this._rowHeight + this._leadingSpace * 2}px`;
			list.style.inlineSize = "100%";
		}
		this._renderRows(true);
		if (this.open) this.scrollActiveIntoView(false);
	};

	private syncState() {
		const trigger = this.root.querySelector<HTMLButtonElement>(".trigger");
		const triggerLabel = this.root.querySelector<HTMLElement>(".trigger-label");
		const listbox = this.root.querySelector<HTMLElement>(".list");
		if (!trigger || !triggerLabel || !listbox) return;
		const selected = this.selectedOption;
		const placeholder = this.getAttribute("placeholder") ?? "Select an option";
		const label = this.getAttribute("aria-label") ?? "Select an option";
		const labelledBy = this.getAttribute("aria-labelledby");
		trigger.disabled = this.disabled;
		trigger.setAttribute("aria-expanded", String(this.open));
		trigger.setAttribute("aria-valuetext", selected?.label ?? placeholder);
		listbox.setAttribute("aria-label", label);
		if (labelledBy) {
			trigger.setAttribute("aria-labelledby", labelledBy);
			trigger.removeAttribute("aria-label");
		} else {
			trigger.removeAttribute("aria-labelledby");
			trigger.setAttribute("aria-label", label);
		}
		triggerLabel.classList.toggle("placeholder", !selected);
		triggerLabel.innerHTML = selected
			? `${selected.prefix ? `<span class="option-prefix" aria-hidden="true">${this.escape(selected.prefix)}</span>` : ""}${this.escape(selected.label)}`
			: this.escape(placeholder);
		this.updateSelectionGeometry();
		this._renderRows(true);
	}

	private _renderRows(force = false) {
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		const list = this.root.querySelector<HTMLElement>(".list");
		if (!viewport || !list) return;
		const horizontal = this.isHorizontalCompass();
		const axisOffset = horizontal ? viewport.scrollLeft : viewport.scrollTop;
		const leading = horizontal ? this._leadingInlineSpace : this._leadingSpace;
		const step = horizontal ? this._columnWidth : this._rowHeight;
		const viewportSize = horizontal
			? this._viewportWidth
			: this._viewportHeight;
		const firstVisible = Math.max(0, Math.floor((axisOffset - leading) / step));
		const first = Math.max(0, firstVisible - 3);
		const count = Math.ceil(viewportSize / step) + 7;
		const end = Math.min(this._options.length, first + count);
		if (!force && first === this._renderStart) {
			this.syncActiveRows();
			return;
		}
		this._renderStart = first;
		const fragment = document.createDocumentFragment();
		for (let index = first; index < end; index++) {
			const option = this._options[index];
			if (!option) continue;
			const row = document.createElement("button");
			row.type = "button";
			row.className = "option";
			row.dataset.index = String(index);
			row.dataset.value = option.value;
			row.dataset.active = String(index === this._activeIndex);
			row.dataset.hovered = String(index === this._hoverIndex);
			row.dataset.selected = String(option.value === this._value);
			row.id = `eos-select-option-${index}`;
			row.setAttribute("role", "option");
			row.setAttribute("aria-selected", String(option.value === this._value));
			row.disabled = Boolean(option.disabled);
			row.tabIndex = -1;
			if (horizontal)
				row.style.insetInlineStart = `${this._leadingInlineSpace + index * this._columnWidth}px`;
			else
				row.style.insetBlockStart = `${this._leadingSpace + index * this._rowHeight}px`;
			this.updateRowGeometry(row, index);
			row.innerHTML = `<span class="option-content">${option.prefix ? `<span class="option-prefix" aria-hidden="true">${this.escape(option.prefix)}</span>` : ""}<span class="option-label">${this.escape(option.label)}</span></span>`;
			fragment.append(row);
		}
		list.replaceChildren(fragment);
		this.syncActiveRows();
	}

	private syncActiveRows() {
		for (const row of this.root.querySelectorAll<HTMLButtonElement>(
			".option",
		)) {
			const index = Number(row.dataset.index);
			row.dataset.active = String(index === this._activeIndex);
			row.dataset.hovered = String(index === this._hoverIndex);
			this.updateRowGeometry(row, index);
		}
		const trigger = this.root.querySelector<HTMLButtonElement>(".trigger");
		if (this.open && this._activeIndex >= 0)
			trigger?.setAttribute(
				"aria-activedescendant",
				`eos-select-option-${this._activeIndex}`,
			);
		else trigger?.removeAttribute("aria-activedescendant");
	}

	private updateRowGeometry(row: HTMLElement, index: number) {
		if (this.isHorizontalCompass()) {
			this.updateHorizontalRowGeometry(row, index);
			return;
		}
		const contentStart = Math.max(82, Math.min(130, this.clientWidth * 0.3));
		const tickStart = Math.max(24, contentStart - 82);
		const radius = Math.max(120, Math.min(160, this.clientWidth * 0.3));
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		const centerIndex = viewport
			? viewport.scrollTop / this._rowHeight
			: Math.max(0, this._activeIndex);
		const distance = Math.abs(index - centerIndex);
		const verticalDistance = Math.min(distance * this._rowHeight, radius);
		const arcOffset =
			radius - Math.sqrt(Math.max(0, radius ** 2 - verticalDistance ** 2));
		const labelOffset = Math.min(56, arcOffset * 0.5);
		row.style.setProperty(
			"--eos-option-opacity",
			String(Math.max(0.2, 1 - distance * 0.16)),
		);
		row.style.setProperty("--eos-select-arc-offset", `${arcOffset}px`);
		row.style.setProperty("--eos-select-content-start", `${contentStart}px`);
		row.style.setProperty("--eos-select-label-offset", `${labelOffset}px`);
		row.style.setProperty("--eos-select-tick-x", `${tickStart + arcOffset}px`);
	}

	private updateHorizontalRowGeometry(row: HTMLElement, index: number) {
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		const centerIndex = viewport
			? viewport.scrollLeft / this._columnWidth
			: Math.max(0, this._activeIndex);
		const distance = Math.abs(index - centerIndex);
		const arcDistance = Math.min(distance, 3);
		const maxArcOffset = Math.max(
			0,
			((viewport?.clientHeight ?? this._viewportHeight) - this._rowHeight) / 2 -
				8,
		);
		// The vertical compass uses a real semicircle around the selected item:
		// the nearest pair sits slightly above it, while the next pairs fan below.
		const arcOffset =
			arcDistance <= 1
				? -28 * arcDistance
				: arcDistance <= 2
					? -28 + 60 * (arcDistance - 1)
					: 32 + 64 * (arcDistance - 2);
		const clampedArcOffset = Math.max(
			-maxArcOffset,
			Math.min(arcOffset, maxArcOffset),
		);
		const horizontalDistance = arcDistance * this._columnWidth;
		row.dataset.side = index < centerIndex ? "before" : "after";
		const tickRotation =
			(Math.atan2(
				Math.sign(index - centerIndex) * horizontalDistance,
				Math.abs(clampedArcOffset) || 1,
			) *
				180) /
			Math.PI;
		const opacity =
			distance <= 3
				? Math.max(0.64, 1 - distance * 0.12)
				: Math.max(0, 0.46 - (distance - 3) * 1.2);
		row.style.setProperty("--eos-option-opacity", String(opacity));
		row.style.setProperty("--eos-select-arc-offset", `${clampedArcOffset}px`);
		row.style.setProperty(
			"--eos-select-column-width",
			`${this._columnWidth}px`,
		);
		const contentShift =
			distance <= 1 ? distance * 88 : distance <= 2 ? (2 - distance) * 88 : 0;
		row.style.setProperty("--eos-select-content-shift", `${contentShift}px`);
		row.style.setProperty("--eos-select-tick-rotation", `${tickRotation}deg`);
	}

	private isHorizontalCompass() {
		const placement =
			this.root.querySelector<HTMLElement>(".panel")?.dataset.placement ??
			"left";
		return placement.startsWith("top") || placement.startsWith("bottom");
	}

	private updateSelectionGeometry() {
		const indicator =
			this.root.querySelector<HTMLElement>(".selection-overlay");
		if (!indicator) return;
		const contentStart = Math.max(82, Math.min(130, this.clientWidth * 0.3));
		indicator.style.setProperty(
			"--eos-select-pill-start",
			`${Math.max(28, contentStart - 22)}px`,
		);
	}

	private handleScroll = () => {
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		if (!viewport) return;
		const scrollOffset = this.isHorizontalCompass()
			? viewport.scrollLeft
			: viewport.scrollTop;
		const lastOffset = this.isHorizontalCompass()
			? this._lastScrollLeft
			: this._lastScrollTop;
		if (scrollOffset !== lastOffset)
			this._scrollDirection = scrollOffset > lastOffset ? 1 : -1;
		if (this.isHorizontalCompass()) this._lastScrollLeft = scrollOffset;
		else this._lastScrollTop = scrollOffset;
		if (!this._isSnapAnimating && this._options.length) {
			this._activeIndex = this.nearestEnabledIndex(scrollOffset);
			if (this._scrollSettleTimer) clearTimeout(this._scrollSettleTimer);
			this._scrollSettleTimer = window.setTimeout(this.snapToNearest, 110);
		}
		if (this._renderFrame) return;
		this._renderFrame = requestAnimationFrame(() => {
			this._renderFrame = 0;
			this._renderRows();
		});
	};

	private handleWheel = (event: WheelEvent) => {
		this.interruptSnap();
		if (
			!this.isHorizontalCompass() ||
			Math.abs(event.deltaY) < Math.abs(event.deltaX)
		)
			return;
		event.preventDefault();
		const viewport = event.currentTarget as HTMLElement;
		viewport.scrollLeft += event.deltaY;
	};

	private handleScrollEnd = () => {
		if (this._isSnapAnimating) {
			this.finishSnap();
			return;
		}
		if (this._scrollSettleTimer) clearTimeout(this._scrollSettleTimer);
		this._scrollSettleTimer = window.setTimeout(this.snapToNearest, 40);
	};

	private snapToNearest = () => {
		this._scrollSettleTimer = undefined;
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		if (!viewport || !this._options.length || !this.open) return;
		const index = this.nearestEnabledIndex(
			this.isHorizontalCompass() ? viewport.scrollLeft : viewport.scrollTop,
		);
		if (index < 0) return;
		this._activeIndex = index;
		this.scrollToIndex(index, true);
	};

	private nearestEnabledIndex(scrollTop: number) {
		const step = this.isHorizontalCompass()
			? this._columnWidth
			: this._rowHeight;
		const nearest = Math.max(
			0,
			Math.min(this._options.length - 1, Math.round(scrollTop / step)),
		);
		return this.findEnabled(nearest, this._scrollDirection);
	}

	private scrollToIndex(index: number, smooth: boolean) {
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		if (!viewport || index < 0) return;
		if (this._scrollSettleTimer) clearTimeout(this._scrollSettleTimer);
		this._scrollSettleTimer = undefined;
		const horizontal = this.isHorizontalCompass();
		const offset = index * (horizontal ? this._columnWidth : this._rowHeight);
		this._snapTargetIndex = index;
		this._isSnapAnimating = true;
		const behavior =
			smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
				? "smooth"
				: "instant";
		viewport.scrollTo(
			horizontal ? { left: offset, behavior } : { top: offset, behavior },
		);
		if (
			behavior === "instant" ||
			Math.abs(
				(horizontal ? viewport.scrollLeft : viewport.scrollTop) - offset,
			) < 1
		) {
			this.finishSnap();
		} else {
			if (this._snapFallbackTimer) clearTimeout(this._snapFallbackTimer);
			this._snapFallbackTimer = window.setTimeout(this.finishSnap, 600);
		}
	}

	private finishSnap = () => {
		if (this._snapFallbackTimer) clearTimeout(this._snapFallbackTimer);
		this._snapFallbackTimer = undefined;
		this._isSnapAnimating = false;
		if (this._snapTargetIndex >= 0) this._activeIndex = this._snapTargetIndex;
		this._snapTargetIndex = -1;
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		this._lastScrollTop = viewport?.scrollTop ?? 0;
		this._lastScrollLeft = viewport?.scrollLeft ?? 0;
		this._renderRows(true);
		const pendingIndex = this._pendingSelectionIndex;
		this._pendingSelectionIndex = -1;
		if (pendingIndex >= 0) this.commitSelection(pendingIndex);
	};

	private interruptSnap = () => {
		if (!this._isSnapAnimating) return;
		this.clearSnapTimers();
		this._isSnapAnimating = false;
		this._snapTargetIndex = -1;
		this._pendingSelectionIndex = -1;
	};

	private clearSnapTimers() {
		if (this._scrollSettleTimer) clearTimeout(this._scrollSettleTimer);
		if (this._snapFallbackTimer) clearTimeout(this._snapFallbackTimer);
		this._scrollSettleTimer = undefined;
		this._snapFallbackTimer = undefined;
	}

	private handlePointerMove = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		const row = (event.target as Element).closest<HTMLButtonElement>(".option");
		if (!row || row.disabled) return;
		this._hoverIndex = Number(row.dataset.index);
		this.syncActiveRows();
	};

	private handlePointerDown = (event: PointerEvent) => {
		const row = (event.target as Element).closest<HTMLButtonElement>(".option");
		this._pointerDownIndex =
			row && !row.disabled ? Number(row.dataset.index) : -1;
	};

	private handlePointerLeave = () => {
		this._hoverIndex = -1;
		this.syncActiveRows();
	};

	private handleOptionClick = (event: MouseEvent) => {
		const row = (event.target as Element).closest<HTMLButtonElement>(".option");
		if (!row || row.disabled) return;
		const index = Number(row.dataset.index);
		if (event.detail > 0 && this._pointerDownIndex !== index) return;
		this._pointerDownIndex = -1;
		const option = this._options[index];
		if (!option) return;
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		this._activeIndex = index;
		if (
			viewport &&
			Math.abs(
				(this.isHorizontalCompass()
					? viewport.scrollLeft
					: viewport.scrollTop) -
					index *
						(this.isHorizontalCompass() ? this._columnWidth : this._rowHeight),
			) >= 1
		) {
			this._pendingSelectionIndex = index;
			this._renderRows(true);
			this.scrollToIndex(index, true);
			return;
		}
		this.commitSelection(index);
	};

	private handleOutsidePointer = (event: PointerEvent) => {
		if (this.open && !event.composedPath().includes(this)) this.open = false;
	};

	private handleKeydown = (event: KeyboardEvent) => {
		if (this.disabled) return;
		const trigger = this.root.querySelector<HTMLButtonElement>(".trigger");
		if (event.key === "Escape" && this.open) {
			event.preventDefault();
			this.open = false;
			trigger?.focus();
			return;
		}
		if (event.key === "Tab" && this.open) {
			this.open = false;
			return;
		}
		if (event.key === "Enter" || event.key === " ") {
			if (!this.open) {
				event.preventDefault();
				this.open = true;
			} else if (this._activeIndex >= 0) {
				event.preventDefault();
				this.selectActive();
			}
			return;
		}
		const horizontalCompass = this.open && this.isHorizontalCompass();
		const previousKey = horizontalCompass ? "ArrowLeft" : "ArrowUp";
		const nextKey = horizontalCompass ? "ArrowRight" : "ArrowDown";
		if (
			event.key === previousKey ||
			event.key === nextKey ||
			event.key === "Home" ||
			event.key === "End"
		) {
			event.preventDefault();
			if (!this.open) this.open = true;
			if (!this._options.length) return;
			const step = event.key === previousKey ? -1 : 1;
			const next =
				event.key === "Home"
					? 0
					: event.key === "End"
						? this._options.length - 1
						: this._activeIndex < 0
							? step > 0
								? 0
								: this._options.length - 1
							: this._activeIndex + step;
			this._activeIndex = this.findEnabled(
				Math.max(0, Math.min(this._options.length - 1, next)),
				step,
			);
			this.scrollActiveIntoView();
			this._renderRows(true);
			this.syncActiveRows();
			return;
		}
		if (
			event.key.length === 1 &&
			!event.ctrlKey &&
			!event.metaKey &&
			!event.altKey
		)
			this.searchByPrefix(event.key);
	};

	private selectActive() {
		if (
			!this._options[this._activeIndex] ||
			this._options[this._activeIndex]?.disabled
		)
			return;
		const viewport = this.root.querySelector<HTMLElement>(".viewport");
		if (
			viewport &&
			Math.abs(
				(this.isHorizontalCompass()
					? viewport.scrollLeft
					: viewport.scrollTop) -
					this._activeIndex *
						(this.isHorizontalCompass() ? this._columnWidth : this._rowHeight),
			) >= 1
		) {
			this._pendingSelectionIndex = this._activeIndex;
			this.scrollToIndex(this._activeIndex, true);
			return;
		}
		this.commitSelection(this._activeIndex);
	}

	private commitSelection(index: number) {
		const option = this._options[index];
		if (!option || option.disabled) return;
		const changed = option.value !== this._value;
		this._value = option.value;
		this._activeIndex = index;
		this.setAttribute("value", option.value);
		this.open = false;
		this.root.querySelector<HTMLButtonElement>(".trigger")?.focus();
		if (changed)
			this.dispatchEvent(
				new CustomEvent("change", {
					detail: { value: option.value, option },
					bubbles: true,
					composed: true,
				}),
			);
	}

	private findEnabled(index: number, direction: number) {
		if (!this._options.length) return -1;
		let next = index;
		for (
			let attempts = 0;
			attempts < this._options.length && this._options[next]?.disabled;
			attempts++
		) {
			next += direction;
			if (next < 0) next = this._options.length - 1;
			if (next >= this._options.length) next = 0;
		}
		return this._options[next]?.disabled ? -1 : next;
	}

	private searchByPrefix(character: string) {
		this._typeahead += character.toLocaleLowerCase();
		if (this._typeaheadTimer) clearTimeout(this._typeaheadTimer);
		this._typeaheadTimer = window.setTimeout(() => {
			this._typeahead = "";
		}, 600);
		const start = Math.max(this._activeIndex, 0);
		for (let offset = 1; offset <= this._options.length; offset++) {
			const index = (start + offset) % this._options.length;
			const option = this._options[index];
			if (
				option &&
				!option.disabled &&
				option.label.toLocaleLowerCase().startsWith(this._typeahead)
			) {
				this._activeIndex = index;
				if (!this.open) this.open = true;
				this.scrollActiveIntoView();
				this._renderRows(true);
				this.syncActiveRows();
				break;
			}
		}
	}

	private scrollActiveIntoView(smooth = true) {
		this.scrollToIndex(this._activeIndex, smooth);
	}

	private syncTheme() {
		const dark = this.closest(
			'[data-eos-theme="dark"],.dark,[data-color-mode="dark"],[data-theme="dark"]',
		);
		const light = this.closest(
			'[data-eos-theme="light"],.light,[data-color-mode="light"],[data-theme="light"]',
		);
		const scheme = getComputedStyle(this).colorScheme;
		const theme = dark
			? "dark"
			: light
				? "light"
				: scheme === "dark"
					? "dark"
					: null;
		if (theme && this.getAttribute("data-eos-theme") !== theme)
			this.setAttribute("data-eos-theme", theme);
		else if (!theme && this.hasAttribute("data-eos-theme"))
			this.removeAttribute("data-eos-theme");
	}

	private escape(value: string) {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};
		return value.replace(
			/[&<>"']/g,
			(character) => entities[character] ?? character,
		);
	}
}
