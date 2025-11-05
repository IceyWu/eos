import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// 将 l- 开头的标签识别为自定义元素
					isCustomElement: (tag) => tag.startsWith("l-"),
				},
			},
		}),
	],
	server: {
		port: 3002,
	},
});
