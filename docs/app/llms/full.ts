import { docsLlms } from '@/lib/source';
import type { Route } from './+types/full';
import { i18n } from '@/lib/i18n';
import { textFileResponse } from './text-response';

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = params.lang ?? i18n.defaultLanguage;
  if (!i18n.languages.includes(locale)) throw new Response('Not found', { status: 404 });
  const prefix = locale === 'zh' ? '/zh' : '';
  const content = `Agent instructions: [${prefix}/skills.md](${prefix}/skills.md).\nComponent index: [${prefix}/llms.txt](${prefix}/llms.txt).\n\n${await docsLlms.full(locale)}`;
  return textFileResponse(request, content, {
    contentType: 'text/plain; charset=utf-8',
    locale,
    title: locale === 'zh' ? 'llms-full.txt · EOS UI 完整文档' : 'llms-full.txt · EOS UI full documentation',
  });
}
