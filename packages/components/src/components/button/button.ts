/**
 * EosButton 组件
 * 一个简单的按钮组件
 */
export class EosButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
		this.shadowRoot
			?.querySelector("button")
			?.addEventListener("click", this.handleClick);
	}

	disconnectedCallback() {
		this.shadowRoot
			?.querySelector("button")
			?.removeEventListener("click", this.handleClick);
	}

	private handleClick = () => {
		this.dispatchEvent(
			new CustomEvent("e-click", {
				detail: { message: "Button clicked!" },
				bubbles: true,
				composed: true,
			}),
		);
	};

	private render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
          button {
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
          button:hover {
            background: #0056b3;
          }
          button:active {
            background: #004085;
          }
        </style>
        <button>
          <slot>Click me</slot>
        </button>
      `;
		}
	}
}
