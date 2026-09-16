'use client';

import { Search, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { useTheme } from 'fumadocs-ui/provider/base';
import { gitConfig, appName } from '@/lib/shared';

export default function EosNavbar() {
  const { pathname } = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const links = [['Home', '/'], ['Components', '/docs/components/button'], ['Base UI', '/docs'], ['Playground', '/docs/playground'], ['Getting Started', '/docs/getting-started']];
  return <header className="eos-topbar">
    <Link className="eos-topbar__brand" to="/"><span className="eos-topbar__mark">✦</span><strong>{appName}</strong></Link>
    <span className="eos-topbar__divider">/</span>
    <nav className="eos-topbar__links" aria-label="Primary navigation">{links.map(([label, url]) => <Link key={url} className={(url === '/' ? pathname === '/' : pathname.startsWith(url)) ? 'is-active' : undefined} to={url}>{label}</Link>)}<span className="eos-topbar__more">•••</span></nav>
    <div className="eos-topbar__tools">
      <SearchTrigger className="eos-topbar__search" aria-label="Search documentation"><Search size={15} /><span>Search</span><kbd>Ctrl K</kbd></SearchTrigger>
      <button type="button" className="eos-topbar__icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{resolvedTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}</button>
      <a className="eos-topbar__icon" href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} aria-label="GitHub">◌</a>
    </div>
  </header>;
}
