import { SCENE_STYLES } from "./scene.css";

const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/** @customElement eos-scene
 * @attr {string} aria-label - Accessible name for the scene content.
 */
export class EosScene extends HTMLElementBase {
	static get observedAttributes() {
		return ["aria-label"];
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
				<style>${SCENE_STYLES}</style>
				<div class="viewport" part="viewport" role="group">
					<div class="plane" part="plane">
						<div class="content" part="content"><slot name="content"></slot></div>
						<slot></slot>
					</div>
				</div>
			`;
		}
		this.syncAccessibility();
	}

	attributeChangedCallback() {
		this.syncAccessibility();
	}

	private syncAccessibility() {
		const viewport = this.shadowRoot?.querySelector<HTMLElement>(".viewport");
		if (!viewport) return;
		const chinese = (this.lang || document.documentElement.lang)
			.toLowerCase()
			.startsWith("zh");
		viewport.setAttribute(
			"aria-label",
			this.getAttribute("aria-label") ||
				(chinese ? "场景内容" : "Scene content"),
		);
	}
}
