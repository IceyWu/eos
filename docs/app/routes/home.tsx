import EosHome from '../../home/home';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { useParams } from 'react-router';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { baseOptions } from '@/lib/layout.shared';
import { getLocaleConfig, i18n, localizePath } from '@/lib/i18n';
import { preparePageTree } from '@/lib/page-tree';
import { source } from '@/lib/source';
import { withDocsPrerenderPath } from '@/lib/shared';
import type { Route } from './+types/home';

export async function loader({ params }: Route.LoaderArgs) {
  if (params.lang && !i18n.languages.includes(params.lang)) {
    throw new Response('Not found', { status: 404 });
  }

  const locale = params.lang ?? i18n.defaultLanguage;
  const pageTree = await source.serializePageTree(
    preparePageTree(source.getPageTree(locale), locale),
  );

  return { pageTree };
}

export function meta({ params }: Route.MetaArgs) {
  const config = getLocaleConfig(params.lang ?? i18n.defaultLanguage);
  return [
    { title: config.home.title },
    { name: 'description', content: config.homeDescription },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { lang = i18n.defaultLanguage } = useParams();
  const config = getLocaleConfig(lang);
  const { pageTree } = useFumadocsLoader(loaderData);

  return (
    <DocsLayout {...baseOptions(lang, true)} sidebar={{ collapsible: false }} tree={pageTree}>
      <EosHome
        description={config.homeDescription}
        getStartedPathname={withDocsPrerenderPath(localizePath(lang, '/docs/getting-started'))}
        locale={lang}
      />
    </DocsLayout>
  );
}
