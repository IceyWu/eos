import { registerComponents } from "@eosjs/components";
import { ButtonDemo } from "./components/button-demo.js";
import { CarouselDemo } from "./components/carousel-demo.js";
import { ImageDemo } from "./components/image-demo.js";

// 注册 Web Components
registerComponents();

// 组件映射
const components = {
	button: ButtonDemo,
	image: ImageDemo,
	carousel: CarouselDemo,
};

// 当前选中的组件
let currentComponent = "button";

// 初始化应用
function initApp() {
	setupNavigation();
	renderComponent(currentComponent);
}

// 设置导航
function setupNavigation() {
	const navItems = document.querySelectorAll(".nav-item");

	navItems.forEach((item) => {
		item.addEventListener("click", () => {
			// 移除所有活动状态
			navItems.forEach((nav) => nav.classList.remove("active"));

			// 添加当前活动状态
			item.classList.add("active");

			// 获取组件类型并渲染
			const componentType = item.dataset.component;
			currentComponent = componentType;
			renderComponent(componentType);
		});
	});
}

// 渲染组件
function renderComponent(componentType) {
	const container = document.getElementById("demo-container");
	const ComponentClass = components[componentType];

	if (ComponentClass && container) {
		// 清空容器
		container.innerHTML = "";

		// 创建并渲染组件
		const component = new ComponentClass();
		component.render(container);

		// 添加淡入动画
		container.style.opacity = "0";
		container.style.transform = "translateY(20px)";

		requestAnimationFrame(() => {
			container.style.transition = "all 0.4s ease";
			container.style.opacity = "1";
			container.style.transform = "translateY(0)";
		});
	}
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", initApp);
