import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type DemoModule = { default: ComponentType };

const modules = import.meta.glob<DemoModule>('../../content/docs/**/demos/*.tsx');

function toDemoId(modulePath: string) {
  const relativePath = modulePath.split('/content/docs/')[1];
  if (!relativePath) return undefined;

  return relativePath.replace(/\.tsx$/, '').replaceAll('/', '-').toLowerCase();
}

export const demoRegistry: Record<string, LazyExoticComponent<ComponentType>> =
  Object.fromEntries(
    Object.entries(modules).flatMap(([modulePath, load]) => {
      const id = toDemoId(modulePath);
      return id ? [[id, lazy(load)]] : [];
    }),
  );
