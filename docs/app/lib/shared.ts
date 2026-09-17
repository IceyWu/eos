import { createGetUrl } from 'fumadocs-core/source';
import { i18n } from './i18n';

export const appName = 'EOS UI';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

/**
 * Static hosting serves each documentation page from its directory index.
 * Keep client-side documentation links aligned with that URL shape.
 */
export function withDocsTrailingSlash(path: string): string {
  if (!path) return path;

  const separatorIndex = path.search(/[?#]/);
  const pathname = separatorIndex === -1 ? path : path.slice(0, separatorIndex);
  const suffix = separatorIndex === -1 ? '' : path.slice(separatorIndex);
  const isDocsPath = pathname === docsRoute
    || pathname.startsWith(`${docsRoute}/`)
    || i18n.languages.some((language) => pathname.startsWith(`/${language}${docsRoute}`));

  if (!isDocsPath || pathname.endsWith('/')) return path;
  return `${pathname}/${suffix}`;
}

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'IceyWu',
  repo: 'eos',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute, i18n);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}
