'use client';

import type { ComponentType } from 'react';
import { useRef, useState } from 'react';
import { Code2, Copy, ExternalLink, Monitor, Moon, RotateCcw, Smartphone, Sun, Tablet } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import { getLocaleConfig } from '@/lib/i18n';

function SourcePanel({ source, label }: { source: string; label: string }) {
  const highlighted = Prism.highlight(source, Prism.languages.jsx, 'jsx');
  return (
    <div aria-label={label} className="eos-demo__source" role="region">
      <pre><code className="language-jsx" dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
    </div>
  );
}

export function Demo({ id, of: Component, source: initialSource, title, layout, locale = 'en' }: { id: string; of: ComponentType; source?: string; title?: string; layout?: string; locale?: string }) {
  const labels = getLocaleConfig(locale).demo;
  const [sourceOpen, setSourceOpen] = useState(false);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [viewport, setViewport] = useState<'responsive' | 'tablet' | 'mobile'>('responsive');
  const [resetKey, setResetKey] = useState(0);
  const [copyMessage, setCopyMessage] = useState<'copied' | 'failed' | null>(null);
  const viewportMenu = useRef<HTMLDetailsElement>(null);
  const source = initialSource ?? Component.toString();

  const copySource = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(source);
      } else {
        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = source;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.opacity = '0';
        document.body.append(temporaryInput);
        let copied = false;
        try {
          temporaryInput.select();
          copied = document.execCommand('copy');
        } finally {
          temporaryInput.remove();
        }
        if (!copied) throw new Error('Clipboard is unavailable');
      }

      setCopyMessage('copied');
      window.setTimeout(() => setCopyMessage(null), 1200);
    } catch {
      setCopyMessage('failed');
      window.setTimeout(() => setCopyMessage(null), 2400);
    }
  };

  const resetPreview = () => {
    setAppearance('light');
    setViewport('responsive');
    setSourceOpen(false);
    setCopyMessage(null);
    setResetKey((value) => value + 1);
    if (viewportMenu.current) viewportMenu.current.open = false;
  };

  const previewUrl = `/~demos/${encodeURIComponent(id)}?locale=${encodeURIComponent(locale)}&appearance=${appearance}&layout=${encodeURIComponent(layout ?? 'default')}&viewport=${viewport}`;

  return (
    <section className={`eos-demo eos-demo--${layout ?? 'default'}`} data-demo-appearance={appearance} data-demo-viewport={viewport} data-eos-theme={appearance} aria-label={title ?? labels.interactiveExample}>
      <header className="eos-demo__caption">
        {title ? <h3>{title}</h3> : <span />}
        <div className="eos-demo__actions" role="toolbar" aria-label={labels.controls}>
          <details className="eos-demo__menu" ref={viewportMenu}>
            <summary aria-label={`${labels.previewViewport}: ${labels[viewport]}`} title={`${labels.previewViewport}: ${labels[viewport]}`}><Monitor size={15} /></summary>
            <div aria-label={labels.previewViewport} role="group">
              <button type="button" aria-pressed={viewport === 'responsive'} onClick={() => { setViewport('responsive'); if (viewportMenu.current) viewportMenu.current.open = false; }}><Monitor size={14} /> {labels.responsive}</button>
              <button type="button" aria-pressed={viewport === 'tablet'} onClick={() => { setViewport('tablet'); if (viewportMenu.current) viewportMenu.current.open = false; }}><Tablet size={14} /> {labels.tablet}</button>
              <button type="button" aria-pressed={viewport === 'mobile'} onClick={() => { setViewport('mobile'); if (viewportMenu.current) viewportMenu.current.open = false; }}><Smartphone size={14} /> {labels.mobile}</button>
            </div>
          </details>
          <button type="button" aria-label={appearance === 'light' ? labels.useDarkTheme : labels.useLightTheme} title={appearance === 'light' ? labels.useDarkTheme : labels.useLightTheme} onClick={() => setAppearance((value) => value === 'light' ? 'dark' : 'light')}>
            {appearance === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <span className="eos-demo__separator" />
          <button type="button" aria-label={sourceOpen ? labels.hideSource : labels.showSource} title={sourceOpen ? labels.hideSource : labels.showSource} aria-pressed={sourceOpen} onClick={() => setSourceOpen((value) => !value)}><Code2 size={15} /></button>
          <button type="button" aria-label={copyMessage === 'copied' ? labels.copied : copyMessage === 'failed' ? labels.copyFailed : labels.copySource} title={copyMessage === 'copied' ? labels.copied : copyMessage === 'failed' ? labels.copyFailed : labels.copySource} onClick={copySource}><Copy size={15} /></button>
          <span className="sr-only" role="status" aria-live="polite">{copyMessage === 'copied' ? labels.copied : copyMessage === 'failed' ? labels.copyFailed : ''}</span>
          <button type="button" aria-label={labels.resetPreview} title={labels.resetPreview} onClick={resetPreview}><RotateCcw size={15} /></button>
          <a href={previewUrl} aria-label={labels.openPreview} title={labels.openPreview} target="_blank" rel="noreferrer"><ExternalLink size={15} /></a>
        </div>
      </header>
      <div className="eos-demo__preview">
        <Component key={resetKey} />
      </div>
      {sourceOpen ? <SourcePanel label={labels.sourceCode} source={source} /> : null}
    </section>
  );
}
