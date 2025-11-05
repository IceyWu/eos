export { EosButton } from "./components/button/button";
export { EosCarousel } from "./components/carousel/carousel";
export { COMPONENT_CONFIG } from "./config";

import { EosButton } from "./components/button/button";
import { EosCarousel } from "./components/carousel/carousel";
import { COMPONENT_CONFIG, type ComponentRegistration } from "./config";

/**
 * 组件注册表
 */
const COMPONENTS: ComponentRegistration[] = [
	{ name: "button", component: EosButton },
	{ name: "carousel", component: EosCarousel },
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
if (typeof window !== 'undefined') {
	registerComponents();
}
