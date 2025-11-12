#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// 读取根目录的 package.json 获取主版本号
const rootPackageJson = JSON.parse(
	readFileSync(join(rootDir, "package.json"), "utf-8"),
);
const targetVersion = rootPackageJson.version;

console.log(`🔄 Syncing all packages to version: ${targetVersion}`);

// 需要同步版本的包路径
const packagesToSync = [
	"packages/utils/package.json",
	"packages/components/package.json",
	"docs/package.json",
];

let updatedCount = 0;

packagesToSync.forEach((packagePath) => {
	const fullPath = join(rootDir, packagePath);

	try {
		const packageJson = JSON.parse(readFileSync(fullPath, "utf-8"));
		const oldVersion = packageJson.version;

		if (oldVersion !== targetVersion) {
			packageJson.version = targetVersion;
			writeFileSync(fullPath, JSON.stringify(packageJson, null, "\t") + "\n");
			console.log(
				`✅ Updated ${packagePath}: ${oldVersion} → ${targetVersion}`,
			);
			updatedCount++;
		} else {
			console.log(`✓ ${packagePath}: already at ${targetVersion}`);
		}
	} catch (error) {
		console.error(`❌ Failed to update ${packagePath}:`, error.message);
	}
});

if (updatedCount > 0) {
	console.log(
		`\n🎉 Successfully updated ${updatedCount} package(s) to version ${targetVersion}`,
	);
} else {
	console.log(`\n✨ All packages are already at version ${targetVersion}`);
}
