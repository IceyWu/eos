import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@eosjs/ui": resolve(
				import.meta.dirname,
				"../../packages/ui/src/index.ts",
			),
			"@eosjs/utils": resolve(
				import.meta.dirname,
				"../../packages/utils/src/index.ts",
			),
		},
	},
	server: {
		port: 3003,
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(import.meta.dirname, "index.html"),
				carousel: resolve(import.meta.dirname, "carousel.html"),
			},
		},
	},
});
