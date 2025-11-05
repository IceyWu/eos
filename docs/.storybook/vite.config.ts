
import { mergeConfig } from 'vite';
import path from 'path';

export default {
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@eosjs/components': path.resolve(__dirname, '../../packages/components/src/index.ts'),
        },
      },
    });
  },
};
