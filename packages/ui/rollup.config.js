import { readdirSync } from "node:fs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const tsOptions = {
	tsconfig: "./tsconfig.json",
	declaration: false,
	declarationMap: false,
	outDir: "dist",
	exclude: ["**/*.test.ts", "**/*.spec.ts"],
};

const componentEntries = Object.fromEntries(
	readdirSync(new URL("./src/entries/", import.meta.url))
		.filter((file) => file.endsWith(".ts"))
		.map((file) => [file.slice(0, -3), `src/entries/${file}`]),
);

export default [
	// 未压缩版本
	{
		input: {
			bundle: "src/index.ts",
			config: "src/config.ts",
			...componentEntries,
		},
		output: {
			dir: "dist",
			entryFileNames: "[name].js",
			chunkFileNames: "chunks/[name]-[hash].js",
			format: "esm",
			sourcemap: true,
		},
		plugins: [
			resolve({ ignoreSideEffectsForRoot: true }),
			typescript(tsOptions),
		],
		treeshake: {
			// Selective entries register elements as module side effects.
			moduleSideEffects: true,
			propertyReadSideEffects: false,
		},
	},
	// 压缩版本
	{
		input: "src/index.ts",
		output: {
			file: "dist/bundle.min.js",
			format: "esm",
			sourcemap: true,
		},
		plugins: [
			resolve({ ignoreSideEffectsForRoot: true }),
			typescript(tsOptions),
			terser(),
		],
	},
];
