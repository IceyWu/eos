import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";

export default {
	globs: ["src/components/**/*.ts"],
	exclude: ["**/*.test.ts", "**/*.spec.ts"],
	outdir: ".",
	plugins: [
		jsxTypesPlugin({
			outdir: ".",
			fileName: "jsx-types.d.ts",
			globalTypePath: "@eosjs/components",
		}),
	],
};
