import type { Preview } from "@storybook/react";

// 导入并注册 Eos 组件库
import '@eosjs/components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        disable: false,
        headingSelector: 'h1, h2, h3',
      },
    },
  },
};

export default preview;
