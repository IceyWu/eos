import { create } from "storybook/theming/create";

// 内联 SVG Logo（靛紫色品牌图标）
const brandLogoSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" fill="none">
  <rect width="30" height="30" rx="8" x="0" y="3" fill="%236366f1"/>
  <text x="15" y="23" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="800" fill="white">E</text>
  <text x="42" y="24" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="%231e293b">Eos</text>
  <text x="70" y="24" font-family="system-ui,sans-serif" font-size="12" font-weight="400" fill="%2394a3b8">Components</text>
</svg>`;

export const lightTheme = create({
	base: "light",

	// 品牌信息
	brandTitle: "Eos Components",
	brandImage: brandLogoSvg,
	brandUrl: "/",
	brandTarget: "_self",

	// 主色调 - 使用现代蓝紫渐变风格
	colorPrimary: "#6366f1",
	colorSecondary: "#6366f1",

	// 整体背景
	appBg: "#f8fafc",
	appContentBg: "#ffffff",
	appPreviewBg: "#f1f5f9",
	appBorderColor: "#e2e8f0",
	appBorderRadius: 8,

	// 文字
	textColor: "#1e293b",
	textInverseColor: "#ffffff",
	textMutedColor: "#64748b",

	// 工具栏
	barTextColor: "#64748b",
	barSelectedColor: "#6366f1",
	barHoverColor: "#6366f1",
	barBg: "#ffffff",

	// 输入框
	inputBg: "#ffffff",
	inputBorder: "#e2e8f0",
	inputTextColor: "#1e293b",
	inputBorderRadius: 6,

	// 按钮
	buttonBg: "#6366f1",
	buttonBorder: "#6366f1",
});

export const darkTheme = create({
	base: "dark",

	brandTitle: "Eos Components",
	brandImage: brandLogoSvg,
	brandUrl: "/",
	brandTarget: "_self",

	colorPrimary: "#818cf8",
	colorSecondary: "#818cf8",

	appBg: "#0f172a",
	appContentBg: "#1e293b",
	appPreviewBg: "#1e293b",
	appBorderColor: "#334155",
	appBorderRadius: 8,

	textColor: "#e2e8f0",
	textInverseColor: "#1e293b",
	textMutedColor: "#94a3b8",

	barTextColor: "#94a3b8",
	barSelectedColor: "#818cf8",
	barHoverColor: "#818cf8",
	barBg: "#1e293b",

	inputBg: "#0f172a",
	inputBorder: "#334155",
	inputTextColor: "#e2e8f0",
	inputBorderRadius: 6,

	buttonBg: "#818cf8",
	buttonBorder: "#818cf8",
});

export default lightTheme;
