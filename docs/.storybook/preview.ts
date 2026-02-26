import type { Preview } from "@storybook/react";
import { lightTheme } from "./theme";

// 导入并注册 Eos 组件库
import "@eosjs/components";

const preview: Preview = {
	parameters: {
		// Controls 面板配置
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			// 美化 controls 表格排序
			sort: "requiredFirst",
			// 展开属性分类
			expanded: true,
		},
		// Docs 页面配置
		docs: {
			// 应用自定义主题
			theme: lightTheme,
			// 侧边目录
			toc: {
				disable: false,
				headingSelector: "h2, h3",
				title: "目录",
				unsafeTocbotOptions: {
					orderedList: false,
				},
			},
			// canvas 区域配置
			canvas: {
				sourceState: "shown",
			},
		},
		// 背景色配置
		backgrounds: {
			default: "白色",
			values: [
				{
					name: "白色",
					value: "#ffffff",
				},
				{
					name: "浅灰",
					value: "#f8fafc",
				},
				{
					name: "深色",
					value: "#1e293b",
				},
			],
		},
		// 视口配置
		viewport: {
			viewports: {
				mobile: {
					name: "移动端",
					styles: { width: "375px", height: "812px" },
					type: "mobile",
				},
				tablet: {
					name: "平板",
					styles: { width: "768px", height: "1024px" },
					type: "tablet",
				},
				desktop: {
					name: "桌面端",
					styles: { width: "1280px", height: "900px" },
					type: "desktop",
				},
				wide: {
					name: "宽屏",
					styles: { width: "1920px", height: "1080px" },
					type: "desktop",
				},
			},
		},
		layout: "padded",
		// 禁用不必要的动作日志噪音
		actions: { argTypesRegex: "^on[A-Z].*" },
	},
};

export default preview;
