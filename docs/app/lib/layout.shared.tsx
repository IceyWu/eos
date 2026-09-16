import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Search, Sun } from 'lucide-react';
import { Link } from 'react-router';
import { appName, gitConfig } from './shared';

function EosNavbar() {
  return (
    <header className="eos-topbar">
      <Link className="eos-topbar__brand" to="/">
        <span className="eos-topbar__mark">✦</span>
        <strong>{appName}</strong>
      </Link>
      <span className="eos-topbar__divider">/</span>
      <nav className="eos-topbar__links" aria-label="Primary navigation">
        <Link to="/">Home</Link>
        <Link className="is-active" to="/docs/components/button">Components</Link>
        <Link to="/docs">Base UI</Link>
        <Link to="/docs/playground">Playground</Link>
        <Link to="/docs/getting-started">Getting Started</Link>
        <span className="eos-topbar__more">•••</span>
      </nav>
      <div className="eos-topbar__tools">
        <Link className="eos-topbar__search" to="/docs" aria-label="Search documentation"><Search size={15} /><span>Search</span><kbd>Ctrl K</kbd></Link>
        <button type="button" className="eos-topbar__icon" aria-label="Toggle theme"><Sun size={16} /></button>
        <a className="eos-topbar__icon" href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} aria-label="GitHub">◌</a>
      </div>
    </header>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      component: <EosNavbar />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
