import { SCENE_ITEM_STYLES } from "./scene.css";

const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/** Which item edge, corner, or center is aligned with its scene coordinate. */
export type EosSceneAnchor =
	| "center"
	| "top-left"
	| "top"
	| "top-right"
	| "right"
	| "bottom-right"
	| "bottom"
	| "bottom-left"
	| "left";

/**
 * @customElement eos-scene-item
 * @attr {number} x - Normalized horizontal scene coordinate from 0 to 1.
 * @attr {number} y - Normalized vertical scene coordinate from 0 to 1.
 * @attr {EosSceneAnchor} anchor - The item edge, corner, or center aligned with x/y.
 * @attr {number} z-index - Stacking order among scene items.
 */
export class EosSceneItem extends HTMLElementBase {
	static get observedAttributes() {
		return ["x", "y", "z-index", "anchor"];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		const root = this.shadowRoot;
		if (!root) return;
		if (!root.hasChildNodes()) {
			root.innerHTML = `
				<style>${SCENE_ITEM_STYLES}</style>
				<div class="content"><slot></slot></div>
			`;
		}
		this.updatePosition();
	}

	attributeChangedCallback() {
		this.updatePosition();
	}

	/** Normalized horizontal coordinate. */
	get x(): number {
		return this.readCoordinate("x");
	}
	set x(value: number) {
		this.setAttribute("x", String(value));
	}

	/** Normalized vertical coordinate. */
	get y(): number {
		return this.readCoordinate("y");
	}
	set y(value: number) {
		this.setAttribute("y", String(value));
	}

	/** Item alignment around its x/y coordinate. */
	get anchor(): EosSceneAnchor {
		const value = this.getAttribute("anchor") as EosSceneAnchor | null;
		return value &&
			[
				"center",
				"top-left",
				"top",
				"top-right",
				"right",
				"bottom-right",
				"bottom",
				"bottom-left",
				"left",
			].includes(value)
			? value
			: "center";
	}
	set anchor(value: EosSceneAnchor) {
		this.setAttribute("anchor", value);
	}

	private readCoordinate(name: "x" | "y") {
		const value = Number(this.getAttribute(name));
		return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.5;
	}

	private updatePosition() {
		if (!this.isConnected) return;
		const formatPercent = (value: number) =>
			`${Number((value * 100).toFixed(4))}%`;
		this.style.setProperty(
			"--eos-scene-item-x",
			formatPercent(this.readCoordinate("x")),
		);
		this.style.setProperty(
			"--eos-scene-item-y",
			formatPercent(this.readCoordinate("y")),
		);
		const shifts: Record<string, [string, string]> = {
			center: ["-50%", "-50%"],
			"top-left": ["0%", "0%"],
			top: ["-50%", "0%"],
			"top-right": ["-100%", "0%"],
			right: ["-100%", "-50%"],
			"bottom-right": ["-100%", "-100%"],
			bottom: ["-50%", "-100%"],
			"bottom-left": ["0%", "-100%"],
			left: ["0%", "-50%"],
		};
		const [shiftX, shiftY] = shifts[this.anchor] ?? shifts.center;
		this.style.setProperty("--eos-scene-item-shift-x", shiftX);
		this.style.setProperty("--eos-scene-item-shift-y", shiftY);
		const zIndex = Number(this.getAttribute("z-index"));
		this.style.setProperty(
			"--eos-scene-item-z",
			String(Number.isFinite(zIndex) ? zIndex : 1),
		);
	}
}
