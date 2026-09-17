'use client';

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { LanguageSelect, LanguageSelectText } from 'fumadocs-ui/layouts/shared/slots/language-select';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { gitConfig, appName } from '@/lib/shared';
import { getLocaleConfig, localizePath } from '@/lib/i18n';

export default function EosNavbar({ locale = 'en' }: { locale?: string }) {
  const { pathname } = useLocation();
  const [atTop, setAtTop] = useState(true);
  const { prefix } = getLocaleConfig(locale);
  const links = [
    [locale === 'zh' ? '首页' : 'Home', prefix || '/', 'url'],
    [locale === 'zh' ? '组件' : 'Components', localizePath(locale, '/docs/components/button'), 'nested-url'],
  ] as const;

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY < 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return <header className="eos-topbar" data-transparent={atTop ? '' : undefined}>
    <div className="eos-topbar__inner">
      <Link className="eos-topbar__brand" to={prefix || '/'}><span className="eos-topbar__mark">✦</span><strong>{appName}</strong></Link>
      <span className="eos-topbar__divider">/</span>
      <nav className="eos-topbar__links" aria-label={locale === 'zh' ? '主导航' : 'Primary navigation'}>{links.map(([label, url, active]) => <Link key={url} className={(active === 'url' ? pathname === url : pathname.startsWith(url)) ? 'is-active' : undefined} to={url}>{label}</Link>)}</nav>
      <div className="eos-topbar__tools">
        <FullSearchTrigger className="eos-topbar__search" />
        <LanguageSelect className="eos-topbar__language"><Languages size={16} /><LanguageSelectText /></LanguageSelect>
        <ThemeSwitch className="eos-topbar__theme" />
        <a className="eos-topbar__icon" href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} aria-label="GitHub" target="_blank" rel="noreferrer"><svg aria-hidden="true" height="17" viewBox="0 0 24 24" width="17"><path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.52 1.06 1.52 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.26-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.98c.84 0 1.68.12 2.46.36 1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v1.42c0 .32.18.6.69.49A10.02 10.02 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" fill="currentColor" /></svg></a>
      </div>
    </div>
  </header>;
}
