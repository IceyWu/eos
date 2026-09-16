import { defineDocsConfig } from "@lobehub/docs-kit/src/config";
import legacyRedirects from "./compatibility.json";

export default defineDocsConfig({
	alias: {
		// Use source during docs development so component changes are reflected
		// without rebuilding packages/components/dist first.
		"@eosjs/components": "packages/components/src/index.ts",
	},
	atomDirs: [{ dir: "packages/components/src/components" }],
	description:
		"A framework-agnostic Web Components library for calm, expressive interfaces.",
	homePage: "./docs/home/home.tsx",
	legacyRedirects,
	navSections: {
		"packages/components/src/components/button/index.mdx": "Components",
		"packages/components/src/components/carousel/index.mdx": "Components",
		"packages/components/src/components/image/index.mdx": "Components",
		"packages/components/src/components/image-group/index.mdx": "Components",
		"packages/components/src/components/progress-bar/index.mdx": "Components",
		"packages/components/src/components/scrollbar/index.mdx": "Components",
	},
	publicDocs: ["docs/getting-started.mdx", "docs/playground.mdx"],
	siteUrl: "https://eos-ui.netlify.app",
	themeConfig: {
		apiHeader: {
			docUrl: "{github}/edit/main/{atomId}",
			github: "https://github.com/IceyWu/eos",
			packageName: "@eosjs/components",
			sourceUrl: "{github}/tree/main/{atomId}",
		},
		home: { install: "pnpm add @eosjs/components" },
		prefersColor: "auto",
		socialLinks: [
			{
				href: "https://github.com/IceyWu/eos",
				icon: "github",
				label: "GitHub",
			},
		],
	},
	title: "EOS UI",
});
