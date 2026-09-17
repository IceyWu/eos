'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import { Code2, Copy, ExternalLink, Monitor, Moon, RotateCcw, Smartphone, Sun, SunMoon } from 'lucide-react';
import * as EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import { getLocaleConfig } from '@/lib/i18n';

const Editor = ((EditorModule as any).default?.default ?? (EditorModule as any).default ?? EditorModule) as typeof EditorModule.default;

export function Demo({ of: Component, source: initialSource, title, layout, locale = 'en' }: { of: ComponentType; source?: string; title?: string; layout?: string; locale?: string }) {
  const labels = getLocaleConfig(locale).demo;
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
    <section className={`eos-demo eos-demo--${layout ?? 'default'}`} data-demo-appearance={appearance} aria-label={title ?? labels.interactiveExample}>
      <header className="eos-demo__caption">
        {title ? <h3>{title}</h3> : <span />}
        <div className="eos-demo__actions" role="toolbar" aria-label={labels.controls}>
          <details className="eos-demo__menu"><summary aria-label={labels.previewViewport} title={labels.previewViewport}><Monitor size={15} /></summary><div role="menu"><button type="button" role="menuitem"><Monitor size={14} /> {labels.responsive}</button><button type="button" role="menuitem"><Smartphone size={14} /> {labels.mobile}</button></div></details>
          <details className="eos-demo__menu"><summary aria-label={labels.previewTheme} title={labels.previewTheme}><SunMoon size={15} /></summary><div role="menu"><button type="button" role="menuitem" aria-pressed={appearance === 'light'} onClick={() => setAppearance('light')}><Sun size={14} /> {labels.light}</button><button type="button" role="menuitem" aria-pressed={appearance === 'dark'} onClick={() => setAppearance('dark')}><Moon size={14} /> {labels.dark}</button></div></details>
          <span className="eos-demo__separator" />
          <button type="button" aria-label={labels.showSource} title={labels.showSource} aria-pressed={sourceOpen} onClick={() => setSourceOpen((value) => !value)}><Code2 size={15} /></button>
          <button type="button" aria-label={copied ? labels.copied : labels.copySource} title={copied ? labels.copied : labels.copySource} onClick={copySource}><Copy size={15} /></button>
          <button type="button" aria-label={labels.resetPreview} title={labels.resetPreview} onClick={() => setAppearance('light')}><RotateCcw size={15} /></button>
          <button type="button" aria-label={labels.openPreview} title={labels.openPreview} onClick={() => window.open(window.location.href, '_blank', 'noopener,noreferrer')}><ExternalLink size={15} /></button>
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
