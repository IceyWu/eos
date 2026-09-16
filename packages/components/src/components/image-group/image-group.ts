import { IMAGE_GROUP_STYLES } from "./image-group.css";

export interface EosImageGroupItem {
	src: string;
	srcType?: "blurhash" | "url";
	alt?: string;
	width?: number | string;
	height?: number | string;
	loading?: "eager" | "lazy";
	crossOrigin?: string;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	placeholder?: string;
	placeholderType?: "blurhash" | "url";
	placeholderFill?: boolean;
	showDelay?: number;
	responsive?: boolean;
	circle?: boolean;
}

export type EosImageGroupLayout = "grid" | "featured" | "pair";

export class EosImageGroup extends HTMLElement {
	private _items: EosImageGroupItem[] = [];
	private _layout: EosImageGroupLayout = "grid";
	private _maxVisible = 9;
	private themeObserver?: MutationObserver;

	static get observedAttributes() {
		return ["items", "layout", "max-visible"];
	}

	get items() {
		return this._items;
	}

	set items(value: EosImageGroupItem[]) {
		this._items = Array.isArray(value) ? value : [];
		this.render();
	}

	get layout() {
		return this._layout;
	}

	set layout(value: EosImageGroupLayout) {
		this._layout = ["grid", "featured", "pair"].includes(value)
			? value
			: "grid";
		this.render();
	}

	get maxVisible() {
		return this._maxVisible;
	}

	set maxVisible(value: number) {
		this._maxVisible = Math.max(1, Math.floor(Number(value) || 1));
		this.render();
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.readAttributes();
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
		name: string,
		_oldValue: string | null,
		newValue: string | null,
	) {
		if (!this.isConnected) return;
		if (name === "items") {
			try {
				const items = JSON.parse(newValue || "[]");
				this._items = Array.isArray(items) ? items : [];
			} catch {
				this._items = [];
			}
		} else {
			this.readAttributes();
		}
		this.render();
	}

	private readAttributes() {
		const layout = this.getAttribute("layout") as EosImageGroupLayout | null;
		this._layout =
			layout && ["grid", "featured", "pair"].includes(layout) ? layout : "grid";
		this._maxVisible = Math.max(
			1,
			Math.floor(Number(this.getAttribute("max-visible")) || 9),
		);
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

	private escape(value: string) {
		return value.replace(/[&<>"']/g, (character) => {
			const entities: Record<string, string> = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			};
			return entities[character] || character;
		});
	}

	private imageAttribute(
		name: string,
		value: boolean | number | string | undefined,
	) {
		if (value === undefined || value === false) return "";
		if (value === true) return ` ${name}`;
		return ` ${name}="${this.escape(String(value))}"`;
	}

	private getLayoutMetrics(itemCount: number) {
		if (this._layout === "featured") {
			if (itemCount <= 2) {
				return { columns: Math.max(1, itemCount), rows: 1 };
			}
			return {
				columns: itemCount === 3 ? 3 : 4,
				rows: Math.max(2, Math.ceil((itemCount - 1) / 2)),
			};
		}

		if (this._layout === "pair") {
			const columns = Math.min(2, Math.max(1, itemCount));
			return {
				columns,
				rows: Math.max(1, Math.ceil(itemCount / columns)),
			};
		}

		const columns =
			itemCount <= 1 ? 1 : itemCount === 4 ? 2 : Math.min(3, itemCount);
		return {
			columns,
			rows: Math.max(1, Math.ceil(itemCount / columns)),
		};
	}

	private render() {
		const root = this.shadowRoot;
		if (!root) return;
		const items = this._items.slice(0, this._maxVisible);
		const remaining = Math.max(0, this._items.length - items.length);
		const { columns, rows } = this.getLayoutMetrics(items.length);
		const remainder = items.length % columns;
		const aspectRows =
			(this._layout === "grid" && columns === 3) ||
			(this._layout === "featured" && items.length > 2) ||
			this._layout === "pair"
				? Math.min(rows, 2)
				: rows;
		const featuredRemainder = Math.max(0, items.length - 1) % 2;
		const markup = items
			.map((item, index) => {
				const alt = this.escape(String(item.alt || ""));
				const src = this.escape(String(item.src || ""));
				const imageAttributes = [
					this.imageAttribute("src-type", item.srcType),
					this.imageAttribute("width", item.width),
					this.imageAttribute("height", item.height),
					this.imageAttribute("loading", item.loading ?? "eager"),
					this.imageAttribute("crossorigin", item.crossOrigin),
					this.imageAttribute("object-fit", item.objectFit ?? "cover"),
					this.imageAttribute("placeholder", item.placeholder),
					this.imageAttribute("placeholder-type", item.placeholderType),
					this.imageAttribute("placeholder-fill", item.placeholderFill),
					this.imageAttribute("show-delay", item.showDelay),
					this.imageAttribute("responsive", item.responsive),
					this.imageAttribute("circle", item.circle),
				].join("");
				const hasOverflow = index === items.length - 1 && remaining > 0;
				const count = hasOverflow
					? '<span class="count" aria-hidden="true">+' + remaining + "</span>"
					: "";
				return (
					'<button class="tile' +
					(hasOverflow ? " has-overflow" : "") +
					'" type="button" data-index="' +
					index +
					'" aria-label="' +
					(alt || "Image " + (index + 1)) +
					'"><eos-image src="' +
					src +
					'" alt="' +
					alt +
					'"' +
					imageAttributes +
					"></eos-image>" +
					count +
					"</button>"
				);
			})
			.join("");
		root.innerHTML =
			`<style>${IMAGE_GROUP_STYLES}</style>` +
			'<div class="group ' +
			this._layout +
			'" data-count="' +
			items.length +
			'" data-columns="' +
			columns +
			'" data-remainder="' +
			remainder +
			'" data-featured-remainder="' +
			featuredRemainder +
			'" style="--eos-image-group-columns:' +
			columns +
			";--eos-image-group-rows:" +
			rows +
			";--eos-image-group-aspect-rows:" +
			aspectRows +
			'" role="group" aria-label="Image group">' +
			markup +
			"</div>";
		root.querySelectorAll<HTMLButtonElement>(".tile").forEach((tile) => {
			tile.addEventListener("click", () => {
				const index = Number(tile.dataset.index);
				this.dispatchEvent(
					new CustomEvent("image-click", {
						detail: { index, item: this._items[index] },
						bubbles: true,
						composed: true,
					}),
				);
			});
		});
	}
}
