import type { Route } from './+types/mdx';
import { docsLlms, source } from '@/lib/source';
import { i18n } from '@/lib/i18n';

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.lang ?? i18n.defaultLanguage;
  if (!i18n.languages.includes(locale)) return new Response('not found', { status: 404 });
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  // remove the appended "content.md"
  slugs.pop();
  const page = source.getPage(slugs, locale);
  if (!page) {
    return new Response('not found', { status: 404 });
  }
  return new Response(await docsLlms.page(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}
