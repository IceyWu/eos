import { EosButton } from "./components/button";
import { EosCardStack } from "./components/card-stack";
import { EosCarousel } from "./components/carousel";
import { EosImage } from "./components/image";
import { EosImageGroup, ImageGroup } from "./components/image-group";
import { EosProgressBar } from "./components/progress-bar";
import { EosScene, EosSceneItem } from "./components/scene";
import { EosScrollbar } from "./components/scrollbar";
import { EosSelect } from "./components/select";
import { COMPONENT_CONFIG, type ComponentRegistration } from "./config";
import { registerComponent } from "./register";

export type { CardStackRenderer } from "./components/card-stack";
export type {
	EosImageGroupItem,
	EosImageGroupLayout,
} from "./components/image-group";
export type { EosSceneAnchor } from "./components/scene";
export type {
	EosSelectBoundary,
	EosSelectOption,
	EosSelectPlacement,
} from "./components/select";
export type { ComponentRegistration } from "./config";
export { registerComponent } from "./register";

export {
	COMPONENT_CONFIG,
	EosButton,
	EosCardStack,
	EosCarousel,
	EosImage,
	EosImageGroup,
	EosProgressBar,
	EosScene,
	EosSceneItem,
	EosScrollbar,
	EosSelect,
	ImageGroup,
};

/**
 * 组件注册表
 */
const COMPONENTS: ComponentRegistration[] = [
	{ name: "button", component: EosButton },
	{ name: "card-stack", component: EosCardStack },
	{ name: "carousel", component: EosCarousel },
	{ name: "image", component: EosImage },
	{ name: "image-group", component: EosImageGroup },
	{ name: "progress-bar", component: EosProgressBar },
	{ name: "scrollbar", component: EosScrollbar },
	{ name: "select", component: EosSelect },
	{ name: "scene", component: EosScene },
	{ name: "scene-item", component: EosSceneItem },
];

/**
 * 注册所有 Eos Web Components
 * 自动检查组件是否已注册，避免重复注册
 */
export function registerComponents() {
	COMPONENTS.forEach(({ name, component }) =>
		registerComponent(name, component),
	);
}

// 自动注册所有组件
if (typeof customElements !== "undefined") {
	registerComponents();
}
