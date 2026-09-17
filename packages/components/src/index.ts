import { EosButton } from "./components/button";
import { EosCarousel } from "./components/carousel";
import { EosImage } from "./components/image";
import { EosImageGroup, ImageGroup } from "./components/image-group";
import { EosProgressBar } from "./components/progress-bar";
import { EosScrollbar } from "./components/scrollbar";
import { COMPONENT_CONFIG, type ComponentRegistration } from "./config";

export {
	COMPONENT_CONFIG,
	EosButton,
	EosCarousel,
	EosImage,
	EosImageGroup,
	EosProgressBar,
	EosScrollbar,
	ImageGroup,
};

/**
 * 组件注册表
 */
const COMPONENTS: ComponentRegistration[] = [
	{ name: "button", component: EosButton },
	{ name: "carousel", component: EosCarousel },
	{ name: "image", component: EosImage },
	{ name: "image-group", component: EosImageGroup },
	{ name: "progress-bar", component: EosProgressBar },
	{ name: "scrollbar", component: EosScrollbar },
];

/**
 * 注册所有 Eos Web Components
 * 自动检查组件是否已注册，避免重复注册
 */
export function registerComponents() {
	try {
		COMPONENTS.forEach(({ name, component }) => {
			const tagName = COMPONENT_CONFIG.getTagName(name);
			if (!customElements.get(tagName)) {
				customElements.define(tagName, component);
			}
		});
	} catch (error) {
		console.error("Failed to register Eos components:", error);
	}
}

/**
 * 注册单个组件
 * @param name 组件名称（不含前缀）
 * @param component 组件类
 */
export function registerComponent(
	name: string,
	component: CustomElementConstructor,
) {
	try {
		const tagName = COMPONENT_CONFIG.getTagName(name);
		if (!customElements.get(tagName)) {
			customElements.define(tagName, component);
		}
	} catch (error) {
		console.error(`Failed to register component ${name}:`, error);
	}
}

// 自动注册所有组件
if (typeof window !== "undefined") {
	registerComponents();
}
