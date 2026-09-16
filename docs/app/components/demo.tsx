import type { ComponentType } from 'react';

export function Demo({ of: Component, title }: { of: ComponentType; title?: string; layout?: string }) {
  return <section className="eos-demo" aria-label={title ?? 'Interactive example'}>{title ? <h3>{title}</h3> : null}<div className="eos-demo__preview"><Component /></div></section>;
}
