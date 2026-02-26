import { addons } from "storybook/manager-api";
import { lightTheme } from "./theme";

addons.setConfig({
	theme: lightTheme,
	// 侧边栏配置
	sidebar: {
		showRoots: true,
		collapsedRoots: [],
	},
	// 启用键盘快捷键
	enableShortcuts: true,
	// 工具栏
	toolbar: {
		title: { hidden: false },
		zoom: { hidden: false },
		eject: { hidden: false },
		copy: { hidden: false },
		fullscreen: { hidden: false },
	},
});
