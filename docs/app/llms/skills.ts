import type { Route } from './+types/skills';
import { i18n } from '@/lib/i18n';
import { textFileResponse } from './text-response';

export function loader({ params, request }: Route.LoaderArgs) {
  const locale = params.lang ?? i18n.defaultLanguage;
  if (!i18n.languages.includes(locale)) throw new Response('Not found', { status: 404 });

  const prefix = locale === 'zh' ? '/zh' : '';
  const content = locale === 'zh'
    ? `---\nname: eos-ui\ndescription: 在使用 EOS UI Web Components 时查阅组件文档、属性和事件 API，并生成符合项目设计规范的界面。\n---\n\n# EOS UI Agent 指南\n\nEOS UI 是一套可用于 React、Vue、Angular 和原生 HTML 的 Web Components 组件库。\n\n## 工作流程\n\n1. 从 [LLM 文档索引](${prefix}/llms.txt) 中查找相关组件。\n2. 读取对应组件的 Markdown 页面：${prefix}/llms.mdx/docs/components/<组件名>/content.md。\n3. 先查阅 [快速开始](${prefix}/llms.mdx/docs/getting-started/content.md)，按需导入组件并使用其公开属性、事件和方法。\n4. 遵循 EOS 设计系统的语义令牌、Light/Dark 主题、键盘交互和减少动态效果约定。\n5. 使用 [完整文档](${prefix}/llms-full.txt) 搜索跨组件 API 或集成说明。\n\n## 项目资源\n\n- 文档首页：${prefix}/docs\n- 组件目录：${prefix}/docs/components\n- LLM 索引：${prefix}/llms.txt\n- 完整 LLM 文档：${prefix}/llms-full.txt\n- Markdown 页面模式：${prefix}/llms.mdx/docs/<页面路径>/content.md\n`
    : `---\nname: eos-ui\ndescription: Use EOS UI Web Components documentation to look up component APIs and build interfaces that follow the EOS design system.\n---\n\n# EOS UI Agent Guide\n\nEOS UI is a framework-agnostic Web Components library for React, Vue, Angular, and native HTML.\n\n## Workflow\n\n1. Find relevant components in the [LLM documentation index](/llms.txt).\n2. Read each component's Markdown reference at /llms.mdx/docs/components/<component>/content.md.\n3. Read the [getting started guide](/llms.mdx/docs/getting-started/content.md), import only the components you need, and use their documented attributes, events, and methods.\n4. Follow the EOS semantic tokens, Light/Dark themes, keyboard interaction, and reduced-motion guidance.\n5. Search the [full documentation](/llms-full.txt) for cross-component APIs and integration details.\n\n## Project resources\n\n- Documentation home: /docs\n- Component catalog: /docs/components\n- LLM index: /llms.txt\n- Full LLM documentation: /llms-full.txt\n- Markdown page pattern: /llms.mdx/docs/<page-path>/content.md\n`;

  return textFileResponse(request, content, {
    contentType: 'text/markdown; charset=utf-8',
    locale,
    title: locale === 'zh' ? 'skills.md · EOS UI Agent 指南' : 'skills.md · EOS UI Agent Guide',
  });
}
