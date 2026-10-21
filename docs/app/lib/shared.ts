import { createGetUrl } from 'fumadocs-core/source';
import { i18n } from './i18n';

export const appName = 'EOS UI';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

/**
 * Static prerendering emits route data beside each page as `<path>.data`.
 * Keep client navigations on the same no-trailing-slash path so React Router
 * requests the emitted data file instead of a nonexistent `<path>/_.data`.
 */
export function withDocsPrerenderPath(path: string): string {
  if (!path) return path;

  const separatorIndex = path.search(/[?#]/);
  const pathname = separatorIndex === -1 ? path : path.slice(0, separatorIndex);
  const suffix = separatorIndex === -1 ? '' : path.slice(separatorIndex);
  const isDocsPath = pathname === docsRoute
    || pathname.startsWith(`${docsRoute}/`)
    || i18n.languages.some((language) => pathname.startsWith(`/${language}${docsRoute}`));

  if (!isDocsPath || pathname === docsRoute || !pathname.endsWith('/')) return path;
  return `${pathname.slice(0, -1)}${suffix}`;
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
