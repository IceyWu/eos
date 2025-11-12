import path from "path";
import { mergeConfig } from "vite";

export default {
	async viteFinal(config) {
		return mergeConfig(config, {
			resolve: {
				alias: {
					"@eosjs/components": path.resolve(
						__dirname,
						"../../packages/components/src/index.ts",
					),
				},
			},
		});
	},
};
