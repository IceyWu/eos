import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "dist/bundle.js",
			format: "esm",
			sourcemap: true,
		},
		{
			file: "dist/bundle.min.js",
			format: "esm",
			sourcemap: true,
			compact: true,
		},
	],
	plugins: [
		resolve(),
		typescript({
			tsconfig: "./tsconfig.json",
			declaration: false,
			declarationMap: false,
			outDir: "dist",
			exclude: ["**/*.test.ts", "**/*.spec.ts"],
		}),
	],
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false,
	},
};
