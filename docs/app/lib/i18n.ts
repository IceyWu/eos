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
  api: Record<string, string>;
  demo: Record<string, string>;
};

export const localeConfig: Record<Locale, LocaleConfig> = {
  en: {
    prefix: '',
    contentSuffix: '',
    homeDescription: 'A framework-agnostic Web Components library for calm, expressive interfaces.',
    api: { generatedFrom: 'Generated from', forComponent: 'for', unavailable: 'Generated API metadata for this component is unavailable.', attributes: 'Attributes', events: 'Events', methods: 'Methods', name: 'Name', type: 'Type', defaultValue: 'Default', description: 'Description', signature: 'Signature' },
    demo: { interactiveExample: 'Interactive example', controls: 'Demo controls', previewViewport: 'Preview viewport', responsive: 'Responsive', mobile: 'Mobile', previewTheme: 'Preview theme', light: 'Light', dark: 'Dark', showSource: 'Show source', copySource: 'Copy source', copied: 'Copied', resetPreview: 'Reset preview', openPreview: 'Open preview' },
  },
  zh: {
    prefix: '/zh',
    contentSuffix: '.zh',
    homeDescription: '面向各种框架的平静、富有表现力的 Web Components 库。',
    api: { generatedFrom: '生成来源', forComponent: '对应', unavailable: '当前组件没有可用的生成 API 元数据。', attributes: '属性', events: '事件', methods: '方法', name: '名称', type: '类型', defaultValue: '默认值', description: '描述', signature: '签名' },
    demo: { interactiveExample: '交互示例', controls: '示例控制', previewViewport: '预览视口', responsive: '响应式', mobile: '移动端', previewTheme: '预览主题', light: '浅色', dark: '深色', showSource: '显示源码', copySource: '复制源码', copied: '已复制', resetPreview: '重置预览', openPreview: '打开预览' },
  },
};

export function getLocaleConfig(locale?: string): LocaleConfig {
  const key = locale as Locale;
  return localeConfig[key] ?? localeConfig[i18n.defaultLanguage as Locale];
}

export function localizePath(locale: string | undefined, pathname: string): string {
  return `${getLocaleConfig(locale).prefix}${pathname}`;
}
