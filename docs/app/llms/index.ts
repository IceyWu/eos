import { docsLlms } from '@/lib/source';
import type { Route } from './+types/index';
import { i18n } from '@/lib/i18n';
import { textFileResponse } from './text-response';

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = params.lang ?? i18n.defaultLanguage;
  if (!i18n.languages.includes(locale)) throw new Response('Not found', { status: 404 });
  const prefix = locale === 'zh' ? '/zh' : '';
  const index = (await docsLlms.index(locale))
    .replace(/^# (?:Docs|文档)$/m, '# EOS UI')
    .replace(/^- \[(?:EOS UI Documentation|EOS UI 文档)\]\([^)]+\):.*\r?\n/gm, '')
    .replace(/^- \[(?:skills\.md|llms\.txt)\]\([^)]+\):.*\r?\n/gm, '')
    .replace(/^- \[(?:文档示例|Test)\]\([^)]+\):.*\r?\n/gm, '')
    .replace(
    /\]\(((?:\/zh)?\/docs(?:\/[^)]+)?)\)/g,
    (_match, path: string) => `](${path.replace(/^(\/zh)?\/docs/, '$1/llms.mdx/docs')}/content.md)`,
    );
  const content = `> Framework-agnostic Web Components for React, Vue, Angular, and native HTML.\n\nAgent instructions: [${prefix}/skills.md](${prefix}/skills.md).\nFull documentation: [${prefix}/llms-full.txt](${prefix}/llms-full.txt).\n\n${index}`;
  return textFileResponse(request, content, {
    contentType: 'text/plain; charset=utf-8',
    locale,
    title: locale === 'zh' ? 'llms.txt · EOS UI 文档索引' : 'llms.txt · EOS UI documentation index',
  });
}
