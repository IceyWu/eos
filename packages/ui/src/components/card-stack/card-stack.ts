import { CARD_STACK_STYLES } from "./card-stack.css";

/** Create one card for an index. The caller owns the data source. */
export type CardStackRenderer = (index: number) => HTMLElement;

const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/**
 * A swipeable, bounded-DOM stack of cards. Set `itemCount` and `renderItem` after
 * creating the element; three cards rest in the stack, with one extra card
 * mounted briefly while a new neighbour is revealed.
 *
 * @customElement eos-card-stack
 * @attr {number} item-count - Number of cards in the external data source
 * @attr {number} initial-index - Initial zero-based index
 * @attr {boolean} loop - Wrap at either end
 * @fires change - detail: { currentIndex, previousIndex }
 */
export class EosCardStack extends HTMLElementBase {
	static get observedAttributes() {
		return ["item-count", "initial-index", "loop"];
	}

	private renderer: CardStackRenderer | null = null;
	private index = 0;
	private initialized = false;
	private pointerId: number | null = null;
	private startX = 0;
	private startY = 0;
	private dragX = 0;
	private dragging = false;
	private animating = false;
	private incomingCard: HTMLElement | null = null;
	private incomingDirection: -1 | 1 | null = null;
	private finishTimer: number | null = null;
	private themeObserver?: MutationObserver;
	private themeFromContext: string | null = null;
	private readonly motionQuery =
		typeof window === "undefined"
			? null
			: window.matchMedia("(prefers-reduced-motion: reduce)");

	get itemCount(): number {
		const value = Number(this.getAttribute("item-count"));
		return Number.isSafeInteger(value) && value > 0 ? value : 0;
	}

	set itemCount(value: number) {
		this.setAttribute("item-count", String(value));
	}

	get initialIndex(): number {
		return Number(this.getAttribute("initial-index")) || 0;
	}

	set initialIndex(value: number) {
		this.setAttribute("initial-index", String(value));
	}

	get loop(): boolean {
		return this.hasAttribute("loop");
	}

	set loop(value: boolean) {
		this.toggleAttribute("loop", value);
	}

	get currentIndex(): number {
		return this.index;
	}

	get renderItem(): CardStackRenderer | null {
		return this.renderer;
	}

	set renderItem(value: CardStackRenderer | null) {
		this.renderer = value;
		this.refresh();
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		if (!this.initialized) {
			this.index = this.clamp(this.initialIndex);
			this.initialized = true;
		}
		this.render();
		if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
		this.syncTheme();
		this.themeObserver = new MutationObserver(() => this.syncTheme());
		this.themeObserver.observe(document.documentElement, {
			attributes: true,
			subtree: true,
			attributeFilter: [
				"class",
				"data-color-mode",
				"data-lobe-demo-appearance",
				"data-theme",
				"data-eos-theme",
			],
		});
	}

	disconnectedCallback() {
		this.cancelAnimation();
		this.themeObserver?.disconnect();
		this.themeObserver = undefined;
		this.pointerId = null;
	}

	private syncTheme() {
		const current = this.getAttribute("data-eos-theme");
		if (current !== null && current !== this.themeFromContext) return;
		const ancestor = this.parentElement?.closest(
			"[data-eos-theme], .dark, .light, [data-color-mode], [data-lobe-demo-appearance], [data-theme]",
		);
		const theme =
			ancestor?.getAttribute("data-eos-theme") ??
			(ancestor?.matches(
				'.dark, [data-color-mode="dark"], [data-lobe-demo-appearance="dark"], [data-theme="dark"]',
			)
				? "dark"
				: ancestor?.matches(
							'.light, [data-color-mode="light"], [data-lobe-demo-appearance="light"], [data-theme="light"]',
						)
					? "light"
					: null);
		if ((theme === "light" || theme === "dark") && current !== theme) {
			this.themeFromContext = theme;
			this.setAttribute("data-eos-theme", theme);
		}
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null,
	) {
		if (oldValue === newValue || !this.initialized) return;
		if (name === "initial-index") return;
		this.index = this.clamp(this.index);
		this.refresh();
	}

	/** Rebuild the visible window after an external item changes. */
	refresh() {
		if (!this.isConnected || !this.shadowRoot?.querySelector(".cards")) return;
		this.cancelAnimation();
		this.mountCards();
		this.updateControls();
	}

	next() {
		this.navigate(1);
	}

	prev() {
		this.navigate(-1);
	}

	/** Adjacent moves animate; distant jumps replace the visible window directly. */
	goTo(index: number) {
		if (!Number.isSafeInteger(index) || index < 0 || index >= this.itemCount)
			return;
		if (index === this.index + 1) this.next();
		else if (index === this.index - 1) this.prev();
		else if (index !== this.index) this.setIndex(index);
	}

	private clamp(index: number) {
		return Math.min(
			Math.max(0, Math.trunc(index) || 0),
			Math.max(0, this.itemCount - 1),
		);
	}

	private adjacent(direction: -1 | 1): number | null {
		return this.adjacentFrom(this.index, direction);
	}

	private adjacentFrom(index: number, direction: -1 | 1): number | null {
		if (this.itemCount < 2) return null;
		const target = index + direction;
		if (target >= 0 && target < this.itemCount) return target;
		return this.loop ? (target + this.itemCount) % this.itemCount : null;
	}

	private render() {
		if (!this.shadowRoot) return;
		this.shadowRoot.innerHTML = `
			<style>${CARD_STACK_STYLES}</style>
			<div class="stage" role="region" aria-label="Card stack">
				<div class="cards"></div>
				<button class="nav prev" type="button" aria-label="Previous card"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
				<button class="nav next" type="button" aria-label="Next card"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
				<span class="status" role="status" aria-live="polite"></span>
			</div>`;
		const cards = this.shadowRoot.querySelector<HTMLElement>(".cards");
		cards?.addEventListener("pointerdown", this.onPointerDown);
		cards?.addEventListener("pointermove", this.onPointerMove);
		cards?.addEventListener("pointerup", this.onPointerUp);
		cards?.addEventListener("pointercancel", this.onPointerCancel);
		this.shadowRoot
			.querySelector(".nav.prev")
			?.addEventListener("click", () => this.prev());
		this.shadowRoot
			.querySelector(".nav.next")
			?.addEventListener("click", () => this.next());
		this.addEventListener("keydown", this.onKeyDown);
		this.mountCards();
		this.updateControls();
	}

	private mountCards() {
		const container = this.shadowRoot?.querySelector<HTMLElement>(".cards");
		if (!container) return;
		this.incomingCard = null;
		this.incomingDirection = null;
		container.replaceChildren();
		if (!this.renderer || this.itemCount === 0) return;
		const positions: Array<{ name: string; index: number | null }> = [
			{ name: "previous", index: this.adjacent(-1) },
			{ name: "next", index: this.adjacent(1) },
			{ name: "current", index: this.index },
		];
		for (const position of positions) {
			if (position.index === null) continue;
			const card = this.createCard(position.name, position.index);
			if (card) container.append(card);
		}
		this.updateStatus();
	}

	private createCard(position: string, index: number): HTMLElement | null {
		const content = this.renderer?.(index);
		if (!(content instanceof HTMLElement)) return null;
		const card = document.createElement("div");
		card.className = "card";
		card.dataset.position = position;
		card.dataset.index = String(index);
		if (position !== "current") {
			card.inert = true;
			card.setAttribute("aria-hidden", "true");
		}
		card.append(content);
		return card;
	}

	private ensureIncoming(direction: -1 | 1): HTMLElement | null {
		if (this.incomingCard && this.incomingDirection === direction)
			return this.incomingCard;
		this.clearIncoming();
		const targetIndex = this.adjacent(direction);
		const incomingIndex =
			targetIndex === null ? null : this.adjacentFrom(targetIndex, direction);
		if (incomingIndex === null) return null;
		const incoming = this.createCard("incoming", incomingIndex);
		if (!incoming) return null;
		const sign = direction === 1 ? 1 : -1;
		incoming.style.setProperty("--x", `${sign * 48}px`);
		incoming.style.setProperty("--rotate", `${sign * 10}deg`);
		incoming.style.setProperty("--scale", ".82");
		this.shadowRoot?.querySelector(".cards")?.append(incoming);
		this.incomingCard = incoming;
		this.incomingDirection = direction;
		return incoming;
	}

	private clearIncoming() {
		this.incomingCard?.remove();
		this.incomingCard = null;
		this.incomingDirection = null;
	}

	private updateStatus() {
		const status = this.shadowRoot?.querySelector(".status");
		if (status)
			status.textContent = this.itemCount
				? `Card ${this.index + 1} of ${this.itemCount}`
				: "No cards";
	}

	private updateControls() {
		const prev = this.shadowRoot?.querySelector<HTMLButtonElement>(".nav.prev");
		const next = this.shadowRoot?.querySelector<HTMLButtonElement>(".nav.next");
		if (prev) prev.disabled = !this.renderer || this.adjacent(-1) === null;
		if (next) next.disabled = !this.renderer || this.adjacent(1) === null;
	}

	private setIndex(index: number) {
		const previousIndex = this.index;
		this.index = index;
		this.mountCards();
		this.updateControls();
		this.emitChange(previousIndex);
	}

	private emitChange(previousIndex: number) {
		this.dispatchEvent(
			new CustomEvent("change", {
				detail: { currentIndex: this.index, previousIndex },
				bubbles: true,
				composed: true,
			}),
		);
	}

	private navigate(direction: -1 | 1) {
		if (this.animating || !this.renderer) return;
		const targetIndex = this.adjacent(direction);
		if (targetIndex === null) return;
		const current = this.shadowRoot?.querySelector<HTMLElement>(
			'.card[data-position="current"]',
		);
		const target = this.shadowRoot?.querySelector<HTMLElement>(
			`.card[data-position="${direction === 1 ? "next" : "previous"}"]`,
		);
		if (!current || !target) {
			this.setIndex(targetIndex);
			return;
		}
		this.animating = true;
		current.removeAttribute("data-dragging");
		current.removeAttribute("data-revealing");
		target.removeAttribute("data-revealing");
		current.setAttribute("data-settling", "");
		current.setAttribute("data-past-threshold", "");
		target.setAttribute("data-promoted", "");
		const stale = this.shadowRoot?.querySelector<HTMLElement>(
			`.card[data-position="${direction === 1 ? "previous" : "next"}"]`,
		);
		const incoming = this.ensureIncoming(direction);
		incoming?.removeAttribute("data-preview");
		// A frame boundary lets transitions start at the last pointer-driven position.
		requestAnimationFrame(() => {
			if (!this.animating) return;
			current.style.setProperty("--x", direction === 1 ? "-32px" : "32px");
			current.style.setProperty("--rotate", direction === 1 ? "-6deg" : "6deg");
			current.style.setProperty("--scale", ".9");
			target.style.setProperty("--x", "0px");
			target.style.setProperty("--rotate", "0deg");
			target.style.setProperty("--scale", "1");
			if (stale) stale.style.setProperty("--opacity", "0");
			if (incoming) {
				incoming.style.setProperty("--x", direction === 1 ? "32px" : "-32px");
				incoming.style.setProperty(
					"--rotate",
					direction === 1 ? "6deg" : "-6deg",
				);
				incoming.style.setProperty("--scale", ".9");
				incoming.style.setProperty("--opacity", "1");
			}
		});
		const complete = () => {
			if (!this.animating) return;
			this.finishTimer = null;
			this.animating = false;
			this.finishNavigation(direction, targetIndex, current, target);
		};
		if (this.motionQuery?.matches) complete();
		else this.finishTimer = window.setTimeout(complete, 240);
	}

	private finishNavigation(
		direction: -1 | 1,
		targetIndex: number,
		current: HTMLElement,
		target: HTMLElement,
	) {
		const container = this.shadowRoot?.querySelector<HTMLElement>(".cards");
		if (!container) return;
		container
			.querySelector(
				`.card[data-position="${direction === 1 ? "previous" : "next"}"]`,
			)
			?.remove();
		const previousIndex = this.index;
		this.index = targetIndex;
		current.dataset.position = direction === 1 ? "previous" : "next";
		current.inert = true;
		current.setAttribute("aria-hidden", "true");
		target.dataset.position = "current";
		target.inert = false;
		target.removeAttribute("aria-hidden");
		for (const card of [current, target]) {
			card.removeAttribute("data-settling");
			card.removeAttribute("data-revealing");
			card.removeAttribute("data-past-threshold");
			card.removeAttribute("data-promoted");
			card.style.removeProperty("--x");
			card.style.removeProperty("--rotate");
			card.style.removeProperty("--scale");
		}
		const incomingIndex = this.adjacent(direction);
		const incoming =
			this.incomingCard ??
			(incomingIndex === null
				? null
				: this.createCard(
						direction === 1 ? "next" : "previous",
						incomingIndex,
					));
		if (incoming) {
			incoming.dataset.position = direction === 1 ? "next" : "previous";
			incoming.removeAttribute("data-preview");
			incoming.style.removeProperty("--x");
			incoming.style.removeProperty("--rotate");
			incoming.style.removeProperty("--scale");
			incoming.style.removeProperty("--opacity");
			if (!incoming.isConnected) container.append(incoming);
		}
		this.incomingCard = null;
		this.incomingDirection = null;
		this.updateStatus();
		this.updateControls();
		this.emitChange(previousIndex);
	}

	private cancelAnimation() {
		if (this.finishTimer !== null) window.clearTimeout(this.finishTimer);
		this.finishTimer = null;
		this.animating = false;
		this.dragging = false;
		this.clearIncoming();
	}

	private readonly onPointerDown = (event: PointerEvent) => {
		if (
			this.animating ||
			!this.renderer ||
			this.itemCount < 2 ||
			(event.pointerType === "mouse" && event.button !== 0)
		)
			return;
		if (
			(event.target as Element).closest(
				"button, a, input, textarea, select, [data-no-swipe]",
			)
		)
			return;
		this.pointerId = event.pointerId;
		this.startX = event.clientX;
		this.startY = event.clientY;
		this.dragX = 0;
		this.dragging = false;
	};

	private readonly onPointerMove = (event: PointerEvent) => {
		if (event.pointerId !== this.pointerId) return;
		const dx = event.clientX - this.startX;
		const dy = event.clientY - this.startY;
		if (!this.dragging) {
			if (Math.abs(dx) < 6) return;
			if (Math.abs(dy) > Math.abs(dx)) {
				this.pointerId = null;
				return;
			}
			this.dragging = true;
			this.shadowRoot
				?.querySelector<HTMLElement>(".cards")
				?.setPointerCapture(event.pointerId);
		}
		const direction: -1 | 1 = dx < 0 ? 1 : -1;
		const canNavigate = this.adjacent(direction) !== null;
		this.dragX = canNavigate ? dx : dx * 0.2;
		const width =
			this.shadowRoot?.querySelector<HTMLElement>(".cards")?.clientWidth || 320;
		const progress = Math.min(1, Math.abs(this.dragX) / width);
		const depthProgress = canNavigate ? Math.min(1, progress / 0.25) : 0;
		const pastThreshold = progress >= 0.25 && canNavigate;
		const current = this.shadowRoot?.querySelector<HTMLElement>(
			'.card[data-position="current"]',
		);
		if (current) {
			current.setAttribute("data-dragging", "");
			current.toggleAttribute("data-past-threshold", pastThreshold);
			current.style.setProperty("--x", `${this.dragX}px`);
			current.style.setProperty(
				"--rotate",
				`${(this.dragX < 0 ? -1 : 1) * depthProgress * 12}deg`,
			);
			current.style.setProperty("--scale", String(1 - 0.1 * depthProgress));
		}
		const target = this.shadowRoot?.querySelector<HTMLElement>(
			`.card[data-position="${direction === 1 ? "next" : "previous"}"]`,
		);
		const opposite = this.shadowRoot?.querySelector<HTMLElement>(
			`.card[data-position="${direction === 1 ? "previous" : "next"}"]`,
		);
		if (opposite?.hasAttribute("data-revealing")) {
			opposite.removeAttribute("data-revealing");
			opposite.removeAttribute("data-promoted");
			opposite.style.removeProperty("--x");
			opposite.style.removeProperty("--rotate");
			opposite.style.removeProperty("--scale");
		}
		if (target) target.style.removeProperty("--opacity");
		if (target) {
			target.setAttribute("data-revealing", "");
			target.toggleAttribute("data-promoted", pastThreshold);
			const baseX = direction === 1 ? 32 : -32;
			const baseRotate = direction === 1 ? 6 : -6;
			const baseScale = 0.9;
			target.style.setProperty("--x", `${baseX * (1 - depthProgress)}px`);
			target.style.setProperty(
				"--rotate",
				`${baseRotate * (1 - depthProgress)}deg`,
			);
			target.style.setProperty(
				"--scale",
				String(baseScale + (1 - baseScale) * depthProgress),
			);
		}
		const reveal = canNavigate
			? Math.min(1, Math.max(0, (progress - 0.2) / 0.1))
			: 0;
		if (reveal > 0) {
			const sign = direction === 1 ? 1 : -1;
			const incoming = this.ensureIncoming(direction);
			if (incoming) {
				incoming.setAttribute("data-preview", "");
				incoming.style.setProperty("--x", `${sign * (48 - 16 * reveal)}px`);
				incoming.style.setProperty(
					"--rotate",
					`${sign * (10 - 4 * reveal)}deg`,
				);
				incoming.style.setProperty("--scale", String(0.82 + 0.08 * reveal));
				incoming.style.setProperty("--opacity", String(reveal));
			}
			if (opposite) opposite.style.setProperty("--opacity", String(1 - reveal));
		} else {
			this.clearIncoming();
			for (const card of this.shadowRoot?.querySelectorAll<HTMLElement>(
				".card",
			) ?? []) {
				card.style.removeProperty("--opacity");
			}
		}
	};

	private readonly onPointerUp = (event: PointerEvent) => {
		if (event.pointerId !== this.pointerId) return;
		this.pointerId = null;
		if (!this.dragging) return;
		this.dragging = false;
		const width =
			this.shadowRoot?.querySelector<HTMLElement>(".cards")?.clientWidth || 320;
		if (Math.abs(this.dragX) >= width * 0.25) {
			this.navigate(this.dragX < 0 ? 1 : -1);
		} else {
			this.resetDrag();
		}
	};

	private readonly onPointerCancel = () => {
		this.pointerId = null;
		this.dragging = false;
		this.resetDrag();
	};

	private resetDrag() {
		this.clearIncoming();
		for (const card of this.shadowRoot?.querySelectorAll<HTMLElement>(
			".card",
		) ?? []) {
			card.removeAttribute("data-dragging");
			card.removeAttribute("data-revealing");
			card.removeAttribute("data-past-threshold");
			card.removeAttribute("data-promoted");
			card.style.removeProperty("--x");
			card.style.removeProperty("--rotate");
			card.style.removeProperty("--scale");
			card.style.removeProperty("--opacity");
		}
		this.dragX = 0;
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (
			event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			(event.target as Element).closest("button, input, textarea, select")
		)
			return;
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			this.prev();
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			this.next();
		}
	};
}
