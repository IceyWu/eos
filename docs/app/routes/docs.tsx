import type { Route } from './+types/docs';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { docs, source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { useMDXComponents } from '@/components/mdx';
import { use } from 'react';
import { getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import type * as PageTree from 'fumadocs-core/page-tree';
import { getLocaleConfig, i18n } from '@/lib/i18n';

function preparePageTree(tree: PageTree.Root): PageTree.Root {
  const normalize = (node: PageTree.Node): PageTree.Node => {
    if (node.type !== 'folder') return node;

    const children = node.children.map(normalize);
    return {
      ...node,
      children,
      ...(node.index && children.length === 0 ? { collapsible: false } : {}),
    };
  };

  return {
    ...tree,
    children: tree.children.map(normalize),
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const locale = params.lang ?? i18n.defaultLanguage;
  const page = source.getPage(slugs, locale);
  if (!page) throw new Response('Not found', { status: 404 });

  const pageTree = await source.serializePageTree(
    preparePageTree(source.getPageTree(locale)),
  );

  return {
    slugs,
    path: page.path,
    markdownUrl: getPageMarkdownUrl(page).url,
    pageTree,
    locale,
  };
}

function Content({ path, locale, markdownUrl }: { path: string; locale: string; markdownUrl: string }) {
  const { contentSuffix } = getLocaleConfig(locale);
  const localizedPath = path.replace(/\.mdx$/, `${contentSuffix}.mdx`);
  const page = docs.docs.find((entry) => entry.info.path === localizedPath)
    ?? docs.getPage(localizedPath)
    ?? docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);
  const title = page.title;
  const description = page.description;

  // content is loaded lazily, call `page.preload()` in your loader to avoid suspending
  const { toc } = use(page.load());
  const Mdx = page.body;

  return (
    <DocsPage toc={toc}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`}
        />
      </div>
      <DocsBody>
        <Mdx components={useMDXComponents(locale)} />
      </DocsBody>
    </DocsPage>
  );
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { pageTree, path, markdownUrl, locale } = useFumadocsLoader(loaderData);

  return (
    <DocsLayout {...baseOptions(locale)} sidebar={{ collapsible: false }} tree={pageTree}>
      <Content path={path} locale={locale} markdownUrl={markdownUrl} />
    </DocsLayout>
  );
}
