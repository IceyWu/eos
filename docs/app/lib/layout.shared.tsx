import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import EosNavbar from '@/components/navbar';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      component: <EosNavbar />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
