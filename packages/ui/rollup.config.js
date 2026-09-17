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

export default [
	// 未压缩版本
	{
		input: "src/index.ts",
		output: {
			file: "dist/bundle.js",
			format: "esm",
			sourcemap: true,
		},
		plugins: [resolve(), typescript(tsOptions)],
		treeshake: {
			moduleSideEffects: false,
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
		plugins: [resolve(), typescript(tsOptions), terser()],
	},
];
