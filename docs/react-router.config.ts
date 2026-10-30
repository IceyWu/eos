import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { i18n } from './app/lib/i18n';

const getUrl = createGetUrl('/docs', i18n);

export default {
  ssr: true,
  routeDiscovery: { mode: 'initial' },
  async prerender({ getStaticPaths }) {
    const paths = new Set<string>();

    for (const path of getStaticPaths()) {
      paths.add(path);
    }

    for (const locale of i18n.languages) {
      const prefix = locale === i18n.defaultLanguage ? '' : `/${locale}`;
      paths.add(`${prefix}/skills.md`);
      paths.add(`${prefix}/llms.txt`);
      paths.add(`${prefix}/llms-full.txt`);
    }

    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const normalized = entry.replaceAll('\\', '/');
      if (i18n.languages.some((locale) => normalized.endsWith(`.${locale}.mdx`))) continue;

      const slugs = getSlugs(normalized);
      for (const locale of i18n.languages) paths.add(getUrl(slugs, locale));
      paths.add(`/llms.mdx/docs/${[...slugs, 'content.md'].join('/')}`);
    }

    for await (const entry of glob('**/demos/*.tsx', { cwd: 'content/docs' })) {
      const demoId = entry
        .replaceAll('\\', '/')
        .replace(/\.tsx$/, '')
        .replaceAll('/', '-')
        .toLowerCase();
      paths.add(`/~demos/${demoId}`);
    }

    return [...paths];
  },
} satisfies Config;
