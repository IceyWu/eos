import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { i18n } from './i18n';
import EosNavbar from '@/components/navbar';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: 'English' },
    zh: {
      displayName: '中文',
      'Search(search trigger)': '搜索文档',
      'Copy Markdown(page actions)': '复制 Markdown',
      'On this page(table of contents)': '本页目录',
    },
  });

export function baseOptions(locale: string = i18n.defaultLanguage): BaseLayoutProps {
  return {
    nav: {
      title: null,
      component: <EosNavbar locale={locale} />,
    },
    i18n,
    slots: {
      searchTrigger: false,
      languageSelect: false,
      themeSwitch: false,
    },
  };
}
