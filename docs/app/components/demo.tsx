'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import { Code2, Copy, ExternalLink, Monitor, Moon, RotateCcw, Smartphone, Sun, SunMoon } from 'lucide-react';
import * as EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

const Editor = ((EditorModule as any).default?.default ?? (EditorModule as any).default ?? EditorModule) as typeof EditorModule.default;

export function Demo({ of: Component, source: initialSource, title, layout }: { of: ComponentType; source?: string; title?: string; layout?: string }) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const [source, setSource] = useState(initialSource ?? Component.toString());
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);
  const copySource = async () => {
    await navigator.clipboard?.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };
  return (
    <section className={`eos-demo eos-demo--${layout ?? 'default'}`} data-demo-appearance={appearance} aria-label={title ?? 'Interactive example'}>
      <header className="eos-demo__caption">
        {title ? <h3>{title}</h3> : <span />}
        <div className="eos-demo__actions" role="toolbar" aria-label="Demo controls">
          <details className="eos-demo__menu"><summary aria-label="Preview viewport" title="Preview viewport"><Monitor size={15} /></summary><div role="menu"><button type="button" role="menuitem"><Monitor size={14} /> Responsive</button><button type="button" role="menuitem"><Smartphone size={14} /> Mobile</button></div></details>
          <details className="eos-demo__menu"><summary aria-label="Preview theme" title="Preview theme"><SunMoon size={15} /></summary><div role="menu"><button type="button" role="menuitem" aria-pressed={appearance === 'light'} onClick={() => setAppearance('light')}><Sun size={14} /> Light</button><button type="button" role="menuitem" aria-pressed={appearance === 'dark'} onClick={() => setAppearance('dark')}><Moon size={14} /> Dark</button></div></details>
          <span className="eos-demo__separator" />
          <button type="button" aria-label="Show source" title="Show source" aria-pressed={sourceOpen} onClick={() => setSourceOpen((value) => !value)}><Code2 size={15} /></button>
          <button type="button" aria-label={copied ? 'Copied' : 'Copy source'} title={copied ? 'Copied' : 'Copy source'} onClick={copySource}><Copy size={15} /></button>
          <button type="button" aria-label="Reset preview" title="Reset preview" onClick={() => setAppearance('light')}><RotateCcw size={15} /></button>
          <button type="button" aria-label="Open preview" title="Open preview" onClick={() => window.open(window.location.href, '_blank', 'noopener,noreferrer')}><ExternalLink size={15} /></button>
        </div>
      </header>
      <div className="eos-demo__preview">
        <Component />
        {sourceOpen ? <span className="eos-demo__live">LIVE</span> : null}
      </div>
      {sourceOpen ? <div className="eos-demo__source"><Editor value={source} onValueChange={setSource} highlight={(code) => Prism.highlight(code, Prism.languages.jsx, 'jsx')} padding={16} textareaId="eos-demo-editor" /></div> : null}
    </section>
  );
}
