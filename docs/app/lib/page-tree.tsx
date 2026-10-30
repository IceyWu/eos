import { BookOpen, Bot, FileText, House } from 'lucide-react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { getLocaleConfig, localizePath } from './i18n';
import { withDocsPrerenderPath } from './shared';

export function preparePageTree(tree: PageTree.Root, locale: string): PageTree.Root {
  const normalize = (node: PageTree.Node): PageTree.Node => {
    if (node.type !== 'folder') return node;

    const children = node.children.map(normalize);
    return {
      ...node,
      children,
      ...(node.index && children.length === 0 ? { collapsible: false } : {}),
    };
  };

  const localePrefix = getLocaleConfig(locale).prefix;
  const links: PageTree.Node[] = [
    { type: 'page', $id: `home-${locale}`, name: locale === 'zh' ? '首页' : 'Home', url: localePrefix || '/', icon: <House aria-hidden="true" size={15} /> },
    { type: 'page', $id: `getting-started-${locale}`, name: locale === 'zh' ? '快速开始' : 'Getting started', url: withDocsPrerenderPath(localizePath(locale, '/docs/getting-started')), icon: <BookOpen aria-hidden="true" size={15} /> },
    { type: 'page', $id: `skills-${locale}`, name: 'skills.md', url: withDocsPrerenderPath(localizePath(locale, '/docs/skills')), icon: <Bot aria-hidden="true" size={15} /> },
    { type: 'page', $id: `llms-${locale}`, name: 'llms.txt', url: withDocsPrerenderPath(localizePath(locale, '/docs/llms')), icon: <FileText aria-hidden="true" size={15} /> },
  ];

  return {
    ...tree,
    children: [
      ...links,
      ...tree.children.filter((node) => node.type === 'folder').map(normalize),
    ],
  };
}
