import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import resolve from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const components = readdirSync(new URL("../src/components/", import.meta.url));
const dependencies = { carousel: ["progress-bar"], "image-group": ["image"], scene: ["scene-item"] };
const classes = {
	button: "EosButton",
	"card-stack": "EosCardStack",
	carousel: "EosCarousel",
	image: "EosImage",
	"image-group": "EosImageGroup",
	"progress-bar": "EosProgressBar",
	scrollbar: "EosScrollbar",
	select: "EosSelect",
	scene: "EosScene",
};
const run = (code) => execFileSync(process.execPath, ["--input-type=module"], {
	cwd: packageRoot,
	encoding: "utf8",
	input: code,
});
const registry = `
import assert from 'node:assert/strict';
const registered = new Map();
globalThis.customElements = {
  get: (name) => registered.get(name),
  define: (name, constructor) => {
    assert.ok(!registered.has(name), 'duplicate registration: ' + name);
    registered.set(name, constructor);
  },
};
`;

test("every component has a runtime entry, declarations, and side-effect metadata", () => {
	assert.deepEqual(Object.keys(classes).sort(), components.sort());
	for (const name of components) {
		const entry = pkg.exports[`./${name}`];
		assert.ok(entry, `missing export: ${name}`);
		assert.ok(existsSync(new URL(`../${entry.types}`, import.meta.url)));
		assert.ok(existsSync(new URL(`../${entry.import}`, import.meta.url)));
		assert.ok(pkg.sideEffects.includes(entry.import));
	}
});

for (const name of components) {
	test(`${name}: isolated registration, dependency registration, and root interoperability`, () => {
		run(`${registry}
const entry = await import('@eosjs/ui/${name}');
assert.deepEqual([...registered.keys()].sort(), ${JSON.stringify([name, ...(dependencies[name] ?? [])].map((item) => `eos-${item}`).sort())});
assert.equal(registered.get('eos-${name}'), entry.${classes[name]});
const root = await import('@eosjs/ui');
root.registerComponents();
assert.equal(root.${classes[name]}, entry.${classes[name]});
assert.equal(registered.size, ${components.length + 1});
`);
	});
	test(`${name}: side-effect-only import survives consumer bundling`, async () => {
		const bundle = await rollup({
			input: "consumer",
			plugins: [
				{
					name: "test-consumer",
					resolveId: (id) => id === "consumer" ? id : null,
					load: (id) => id === "consumer" ? `import '@eosjs/ui/${name}';` : null,
				},
				resolve({ rootDir: packageRoot }),
			],
		});
		try {
			const { output } = await bundle.generate({ format: "esm" });
			assert.equal(output.length, 1);
			run(`${registry}
await import('data:text/javascript;base64,${Buffer.from(output[0].code).toString("base64")}');
assert.deepEqual([...registered.keys()].sort(), ${JSON.stringify([name, ...(dependencies[name] ?? [])].map((item) => `eos-${item}`).sort())});
`);
		} finally {
			await bundle.close();
		}
	});
}

test("all public runtime entries are safe to import without a browser", () => {
	run(`
for (const name of ${JSON.stringify(components)}) await import('@eosjs/ui/' + name);
const root = await import('@eosjs/ui');
root.registerComponents();
`);
});

test("config can be imported before registration without loading components", () => {
	run(`${registry}
const { COMPONENT_CONFIG } = await import('@eosjs/ui/config');
assert.equal(COMPONENT_CONFIG.getTagName('button'), 'eos-button');
assert.equal(registered.size, 0);
`);
});

test("public types resolve consistently through root and selective exports", () => {
	execFileSync(process.execPath, [
		"node_modules/typescript/bin/tsc", "--ignoreConfig", "--noEmit", "--skipLibCheck",
		"--module", "esnext", "--moduleResolution", "bundler", "--target", "es2022",
		"--lib", "es2022,dom", "tests/exports.types.ts",
	], { cwd: packageRoot, stdio: "pipe" });
});
