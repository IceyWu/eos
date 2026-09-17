import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@eosjs/ui": resolve(
				__dirname,
				"../../packages/ui/src/index.ts",
			),
			"@eosjs/utils": resolve(__dirname, "../../packages/utils/src/index.ts"),
		},
	},
	server: {
		port: 3003,
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				carousel: resolve(__dirname, "carousel.html"),
			},
		},
	},
});
