import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { i18n } from './app/lib/i18n';

const getUrl = createGetUrl('/docs', i18n);

export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const paths = new Set<string>();

    for (const path of getStaticPaths()) {
      paths.add(path);
    }

    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const normalized = entry.replaceAll('\\', '/');
      if (i18n.languages.some((locale) => normalized.endsWith(`.${locale}.mdx`))) continue;

      const slugs = getSlugs(normalized);
      for (const locale of i18n.languages) paths.add(getUrl(slugs, locale));
      paths.add(`/llms.mdx/docs/${[...slugs, 'content.md'].join('/')}`);
    }

    return [...paths];
  },
} satisfies Config;
