import { BUTTON_STYLES } from "./button.css";

/**
 * EOS Button
 *
 * EOS Button custom element.
 * @tagname eos-button
 */
const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

/** @customElement eos-button */
export class EosButton extends HTMLElementBase {
	private readonly shadowRootElement: ShadowRoot;
	private themeObserver?: MutationObserver;

	constructor() {
		super();
		this.shadowRootElement = this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return [
			"aria-label",
			"aria-keyshortcuts",
			"aria-pressed",
			"color",
			"disabled",
			"full-width",
			"icon-only",
			"loading",
			"name",
			"size",
			"type",
			"value",
			"variant",
		];
	}

	connectedCallback() {
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
			],
		});
		this.render();
	}

	disconnectedCallback() {
		this.themeObserver?.disconnect();
		this.themeObserver = undefined;
	}

	attributeChangedCallback(
		_name: string,
		_oldValue: string | null,
		_newValue: string | null,
	) {
		if (this.isConnected) this.render();
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	set disabled(value: boolean) {
		this.toggleAttribute("disabled", value);
	}

	get loading() {
		return this.hasAttribute("loading");
	}

	set loading(value: boolean) {
		this.toggleAttribute("loading", value);
	}

	private getButtonType() {
		const type = this.getAttribute("type");
		return type === "submit" || type === "reset" ? type : "button";
	}

	private render() {
		const disabled = this.disabled || this.loading;
		const ariaLabel = this.getAttribute("aria-label");
		const ariaKeyshortcuts = this.getAttribute("aria-keyshortcuts");
		const ariaPressed = this.getAttribute("aria-pressed");
		const name = this.getAttribute("name");
		const value = this.getAttribute("value");

		this.shadowRootElement.innerHTML = `
<style>${BUTTON_STYLES}</style>
<button part="button" type="${this.getButtonType()}" ${disabled ? "disabled" : ""}
  ${ariaLabel ? `aria-label="${this.escapeAttribute(ariaLabel)}"` : ""}
  ${ariaKeyshortcuts ? `aria-keyshortcuts="${this.escapeAttribute(ariaKeyshortcuts)}"` : ""}
  ${ariaPressed ? `aria-pressed="${this.escapeAttribute(ariaPressed)}"` : ""}
  ${this.loading ? 'aria-busy="true"' : ""}
  ${name ? `name="${this.escapeAttribute(name)}"` : ""}
  ${value ? `value="${this.escapeAttribute(value)}"` : ""}>
  ${this.loading ? '<span class="eos-button__spinner" aria-hidden="true"></span>' : '<slot name="start"></slot>'}
  <span part="content"><slot></slot></span>
  ${this.loading ? "" : '<slot name="end"></slot>'}
</button>`;
	}

	private syncTheme() {
		const darkContext = this.closest(
			'.dark, [data-color-mode="dark"], [data-lobe-demo-appearance="dark"], [data-theme="dark"]',
		);
		const lightContext = this.closest(
			'.light, [data-color-mode="light"], [data-lobe-demo-appearance="light"], [data-theme="light"]',
		);
		const colorScheme = getComputedStyle(this).colorScheme;
		const theme = darkContext
			? "dark"
			: lightContext
				? "light"
				: colorScheme === "dark"
					? "dark"
					: null;

		if (theme) this.setAttribute("data-eos-theme", theme);
		else this.removeAttribute("data-eos-theme");
	}

	private escapeAttribute(value: string) {
		return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
	}
}
