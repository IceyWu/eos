import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith("eos-"),
				},
			},
		}),
	],
	resolve: {
		alias: {
			"@eosjs/components": resolve(__dirname, "../../packages/components/src/index.ts"),
			"@eosjs/utils": resolve(__dirname, "../../packages/utils/src/index.ts"),
		},
	},
	server: {
		port: 3002,
	},
});
