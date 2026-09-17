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

const HTMLElementBase = (globalThis.HTMLElement ??
	class {}) as typeof HTMLElement;

export class EosImageGroup extends HTMLElementBase {
	private _items: EosImageGroupItem[] = [];
	private _layout: EosImageGroupLayout = "grid";
	private _maxVisible = 9;
	private themeObserver?: MutationObserver;
	private renderQueued = false;

	static get observedAttributes() {
		return ["items", "layout", "max-visible"];
	}

	get items() {
		return this._items;
	}

	set items(value: EosImageGroupItem[]) {
		this._items = Array.isArray(value) ? value : [];
		this.scheduleRender();
	}

	get layout() {
		return this._layout;
	}

	set layout(value: EosImageGroupLayout) {
		this._layout = ["grid", "featured", "pair"].includes(value)
			? value
			: "grid";
		this.scheduleRender();
	}

	get maxVisible() {
		return this._maxVisible;
	}

	set maxVisible(value: number) {
		this._maxVisible = Math.max(1, Math.floor(Number(value) || 1));
		this.scheduleRender();
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
		this.scheduleRender();
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
		this.scheduleRender();
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

	private scheduleRender() {
		if (this.renderQueued) return;
		this.renderQueued = true;
		queueMicrotask(() => {
			this.renderQueued = false;
			if (this.isConnected) this.render();
		});
	}

	private setImageAttribute(
		image: Element,
		name: string,
		value: boolean | number | string | undefined,
	) {
		if (value === undefined || value === false) {
			image.removeAttribute(name);
			return;
		}
		if (value === true) {
			if (!image.hasAttribute(name)) image.setAttribute(name, "");
			return;
		}
		const nextValue = String(value);
		if (image.getAttribute(name) !== nextValue) {
			image.setAttribute(name, nextValue);
		}
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
		let group = root.querySelector<HTMLElement>(".group");
		if (!group) {
			root.innerHTML = `<style>${IMAGE_GROUP_STYLES}</style>`;
			group = document.createElement("div");
			group.setAttribute("role", "group");
			group.setAttribute("aria-label", "Image group");
			group.addEventListener("click", (event) => {
				const target = event.target as Element;
				const tile = target.closest<HTMLButtonElement>(".tile");
				if (!tile) return;
				const index = Number(tile.dataset.index);
				this.dispatchEvent(
					new CustomEvent("image-click", {
						detail: { index, item: this._items[index] },
						bubbles: true,
						composed: true,
					}),
				);
			});
			root.append(group);
		}

		group.className = `group ${this._layout}`;
		group.dataset.count = String(items.length);
		group.dataset.columns = String(columns);
		group.dataset.remainder = String(remainder);
		group.dataset.featuredRemainder = String(featuredRemainder);
		group.style.setProperty("--eos-image-group-columns", String(columns));
		group.style.setProperty("--eos-image-group-rows", String(rows));
		group.style.setProperty(
			"--eos-image-group-aspect-rows",
			String(aspectRows),
		);

		const existing = new Map(
			Array.from(group.querySelectorAll<HTMLButtonElement>(".tile")).map(
				(tile) => [Number(tile.dataset.index), tile] as const,
			),
		);
		items.forEach((item, index) => {
			let tile = existing.get(index);
			if (!tile) {
				tile = document.createElement("button");
				tile.className = "tile";
				tile.type = "button";
				tile.append(document.createElement("eos-image"));
			}
			existing.delete(index);
			tile.dataset.index = String(index);
			tile.setAttribute("aria-label", item.alt || `Image ${index + 1}`);
			const hasOverflow = index === items.length - 1 && remaining > 0;
			tile.classList.toggle("has-overflow", hasOverflow);

			const image = tile.querySelector("eos-image");
			if (!image) return;
			this.setImageAttribute(image, "src", item.src);
			this.setImageAttribute(image, "alt", item.alt || "");
			this.setImageAttribute(image, "src-type", item.srcType);
			this.setImageAttribute(image, "width", item.width);
			this.setImageAttribute(image, "height", item.height);
			this.setImageAttribute(image, "loading", item.loading ?? "eager");
			this.setImageAttribute(image, "crossorigin", item.crossOrigin);
			this.setImageAttribute(image, "object-fit", item.objectFit ?? "cover");
			this.setImageAttribute(image, "placeholder", item.placeholder);
			this.setImageAttribute(image, "placeholder-type", item.placeholderType);
			this.setImageAttribute(image, "placeholder-fill", item.placeholderFill);
			this.setImageAttribute(image, "show-delay", item.showDelay);
			this.setImageAttribute(image, "responsive", item.responsive);
			this.setImageAttribute(image, "circle", item.circle);

			let count = tile.querySelector<HTMLSpanElement>(".count");
			if (hasOverflow) {
				count ??= document.createElement("span");
				count.className = "count";
				count.setAttribute("aria-hidden", "true");
				count.textContent = `+${remaining}`;
				if (!count.parentElement) tile.append(count);
			} else {
				count?.remove();
			}
			group.append(tile);
		});
		existing.forEach((tile) => tile.remove());
	}
}
