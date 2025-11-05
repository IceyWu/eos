import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ES Module 中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  async viteFinal(config) {
    // 确保能正确解析 monorepo 中的 workspace 包
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@eosjs/components': join(__dirname, '..', '..', 'packages', 'components', 'dist', 'index.js'),
    };
    return config;
  },
};

export default config;
