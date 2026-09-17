import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Demo } from './demo';
import { ComponentApi } from '@/lib/component-api';

function Api({ name, locale }: { name: string; locale: string }) {
  return <ComponentApi name={name} locale={locale} />;
}

export function getMDXComponents(components?: MDXComponents, locale = 'en') {
  return {
    ...defaultMdxComponents,
    Api: (props: { name: string }) => <Api {...props} locale={locale} />,
    Demo: (props: React.ComponentProps<typeof Demo>) => <Demo {...props} locale={locale} />,
    ...components,
  } satisfies MDXComponents;
}

export function useMDXComponents(locale = 'en') {
  return getMDXComponents(undefined, locale);
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
