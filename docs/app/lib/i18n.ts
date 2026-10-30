import { defineI18n } from 'fumadocs-core/i18n';

export const languages = ['en', 'zh'];
export type Locale = 'en' | 'zh';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages,
  hideLocale: 'default-locale',
  parser: 'dot',
});

export type LocaleConfig = {
  prefix: string;
  contentSuffix: string;
  homeDescription: string;
  home: {
    title: string;
    heroTitle: string;
    heroAccent: string;
    heroEyebrow: string;
    heroInstallLabel: string;
    heroSnippetLabel: string;
    heroLivePreview: string;
    heroPreviewButton: string;
    heroPreviewLink: string;
    personaLabel: string;
    agentModeLabel: string;
    humanModeLabel: string;
    agentDescription: string;
    agentPrompt: string;
    humanDescription: string;
    copyPrompt: string;
    promptCopied: string;
    copyFailed: string;
    showcaseEyebrow: string;
    developerEyebrow: string;
    developerTitle: string;
    developerDescription: string;
    developerExamples: [string, string, string];
    foundationsEyebrow: string;
    foundationsTitle: string;
    frameworkFeature: string;
    frameworkDescription: string;
    themeFeature: string;
    themeDescription: string;
    docsFeature: string;
    docsDescription: string;
    github: string;
    getStarted: string;
    browseComponents: string;
    skills: string;
    llms: string;
    supportedPlatforms: string;
    ecosystemCaption: string;
    showcaseTitle: string;
    showcaseDescription: string;
    viewDocs: string;
    buttonDescription: string;
    carouselDescription: string;
    imageDescription: string;
    progressDescription: string;
    scrollbarDescription: string;
    tryButton: string;
    carouselSlides: [string, string, string];
    step: string;
    of: string;
    scrollableItem: string;
    closingTitle: string;
    closingDescription: string;
    license: string;
  };
  api: Record<string, string>;
  demo: Record<string, string>;
};

export const localeConfig: Record<Locale, LocaleConfig> = {
  en: {
    prefix: '',
    contentSuffix: '',
    homeDescription: 'A framework-agnostic Web Components library for calm, expressive interfaces.',
    home: {
      title: 'EOS UI Kit — Framework-agnostic Web Components',
      heroTitle: 'EOS UI', heroAccent: 'Kit', heroEyebrow: 'WEB COMPONENTS · BUILT FOR THE OPEN WEB',
      heroInstallLabel: 'Add the library', heroSnippetLabel: 'Use a component', heroLivePreview: 'Live component preview', heroPreviewButton: 'Explore Button', heroPreviewLink: 'View the quick start',
      personaLabel: 'Choose a quick start',
      agentModeLabel: "I'm an Agent", humanModeLabel: "I'm a Human", agentDescription: 'Give your coding agent the EOS UI guide before it chooses components.',
      agentPrompt: 'Read {skillsUrl} and follow it to build interfaces with @eosjs/ui.', humanDescription: 'Install EOS UI, then follow the quick start to add your first component.',
      copyPrompt: 'Copy prompt', promptCopied: 'Prompt copied', copyFailed: 'Could not copy the prompt',
      github: 'GitHub', getStarted: 'Get started', browseComponents: 'Browse components', skills: 'skills.md', llms: 'llms.txt',
      supportedPlatforms: 'Supported platforms', ecosystemCaption: 'One component system, every web stack', showcaseEyebrow: 'Components', showcaseTitle: 'Built for the web',
      showcaseDescription: 'Explore live examples of EOS components, then open the full component catalog.', viewDocs: 'View {title} documentation',
      developerEyebrow: 'Developer experience', developerTitle: 'Code in. Components out.', developerDescription: 'See the same component API rendered live as you explore its usage.',
      developerExamples: ['Button', 'Carousel', 'Image'],
      foundationsEyebrow: 'Foundations', foundationsTitle: 'One system for everyday interfaces',
      frameworkFeature: 'Framework agnostic', frameworkDescription: 'Use the same custom elements in React, Vue, Angular, and native HTML.',
      themeFeature: 'Light and dark themes', themeDescription: 'Build with EOS semantic tokens across both appearance modes.',
      docsFeature: 'Documented APIs', docsDescription: 'Explore live examples alongside component properties, events, and methods.',
      buttonDescription: 'events · variants · CSS variables', carouselDescription: 'navigation · indicators · touch gestures', imageDescription: 'lazy loading · BlurHash',
      progressDescription: 'steps · loading · navigation', scrollbarDescription: 'drag · synchronized scrolling', tryButton: 'Try the button',
      carouselSlides: ['SLIDE / 01', 'SLIDE / 02', 'SLIDE / 03'], step: 'Step', of: 'of', scrollableItem: 'Scrollable item',
      closingTitle: 'Start building with EOS', closingDescription: 'Open-source components for interfaces that work across frameworks.', license: 'Open source · MIT license',
    },
    api: { generatedFrom: 'Generated from', forComponent: 'for', unavailable: 'Generated API metadata for this component is unavailable.', attributes: 'Attributes', events: 'Events', methods: 'Methods', name: 'Name', type: 'Type', defaultValue: 'Default', description: 'Description', signature: 'Signature' },
    demo: { interactiveExample: 'Interactive example', controls: 'Demo controls', previewViewport: 'Preview viewport', responsive: 'Responsive', tablet: 'Tablet', mobile: 'Mobile', useDarkTheme: 'Use dark demo theme', useLightTheme: 'Use light demo theme', showSource: 'Show source', hideSource: 'Hide source', sourceCode: 'Source code', copySource: 'Copy source', copied: 'Copied', copyFailed: 'Could not copy source', resetPreview: 'Reset preview', openPreview: 'Open preview' },
  },
  zh: {
    prefix: '/zh',
    contentSuffix: '.zh',
    homeDescription: '一套可用于 React、Vue、Angular 与原生 HTML 的精炼 Web Components 组件库。',
    home: {
      title: 'EOS UI Kit — 跨框架 Web Components 组件库',
      heroTitle: 'EOS UI', heroAccent: 'Kit', heroEyebrow: '面向开放 Web 的组件系统',
      heroInstallLabel: '安装组件库', heroSnippetLabel: '使用组件', heroLivePreview: '实时组件预览', heroPreviewButton: '查看 Button 文档', heroPreviewLink: '阅读快速开始',
      personaLabel: '选择使用方式',
      agentModeLabel: '我是 Agent', humanModeLabel: '我是开发者', agentDescription: '让编码 Agent 先阅读 EOS UI 指南，再选择组件并生成界面。',
      agentPrompt: '请先阅读 {skillsUrl}，并遵循其中的约定使用 @eosjs/ui 构建界面。', humanDescription: '安装 EOS UI，再从快速开始了解如何添加第一个组件。',
      copyPrompt: '复制提示词', promptCopied: '已复制提示词', copyFailed: '无法复制提示词',
      github: 'GitHub', getStarted: '快速开始', browseComponents: '浏览全部组件', skills: 'skills.md', llms: 'llms.txt',
      supportedPlatforms: '支持的平台', ecosystemCaption: '一套组件系统，适用于各种 Web 技术栈', showcaseEyebrow: '组件示例', showcaseTitle: '为 Web 构建',
      showcaseDescription: '体验 EOS 组件的实时示例，并浏览完整组件目录。', viewDocs: '查看{title}文档',
      developerEyebrow: '开发体验', developerTitle: '写下代码，查看真实组件', developerDescription: '切换组件示例，直接查看对应 API 和运行效果。',
      developerExamples: ['按钮', '轮播', '图片'],
      foundationsEyebrow: '设计基础', foundationsTitle: '一套系统，构建日常界面',
      frameworkFeature: '跨框架使用', frameworkDescription: '在 React、Vue、Angular 和原生 HTML 中使用同一套自定义元素。',
      themeFeature: '浅色与深色主题', themeDescription: '使用 EOS 语义令牌，适配两种外观模式。',
      docsFeature: '完整 API 文档', docsDescription: '查看实时示例、组件属性、事件和方法说明。',
      buttonDescription: '事件 · 变体 · CSS 变量', carouselDescription: '导航 · 指示器 · 触摸手势', imageDescription: '懒加载 · BlurHash',
      progressDescription: '步骤 · 加载 · 导航', scrollbarDescription: '拖动 · 同步滚动', tryButton: '试用按钮',
      carouselSlides: ['幻灯片 / 01', '幻灯片 / 02', '幻灯片 / 03'], step: '步骤', of: '共', scrollableItem: '可滚动项目',
      closingTitle: '开始使用 EOS 构建', closingDescription: '跨框架可用的开源组件，帮助构建稳定易用的界面。', license: '开源 · MIT 许可证',
    },
    api: { generatedFrom: '生成来源', forComponent: '对应', unavailable: '当前组件没有可用的生成 API 元数据。', attributes: '属性', events: '事件', methods: '方法', name: '名称', type: '类型', defaultValue: '默认值', description: '描述', signature: '签名' },
    demo: { interactiveExample: '交互示例', controls: '示例控制', previewViewport: '预览视口', responsive: '响应式', tablet: '平板', mobile: '移动端', useDarkTheme: '切换到深色示例主题', useLightTheme: '切换到浅色示例主题', showSource: '显示源码', hideSource: '隐藏源码', sourceCode: '组件源码', copySource: '复制源码', copied: '已复制', copyFailed: '复制源码失败', resetPreview: '重置预览', openPreview: '打开预览' },
  },
};

export function getLocaleConfig(locale?: string): LocaleConfig {
  const key = locale as Locale;
  return localeConfig[key] ?? localeConfig[i18n.defaultLanguage as Locale];
}

export function localizePath(locale: string | undefined, pathname: string): string {
  return `${getLocaleConfig(locale).prefix}${pathname}`;
}
