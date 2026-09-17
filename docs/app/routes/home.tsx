import EosHome from '../../home/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { useParams } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';
import { getLocaleConfig, i18n, localizePath } from '@/lib/i18n';
import { withDocsTrailingSlash } from '@/lib/shared';

export default function Home() {
  const { lang = i18n.defaultLanguage } = useParams();
  const config = getLocaleConfig(lang);

  return (
    <HomeLayout {...baseOptions(lang)}>
      <EosHome
        description={config.homeDescription}
        getStartedPathname={withDocsTrailingSlash(localizePath(lang, '/docs/getting-started'))}
        locale={lang}
      />
    </HomeLayout>
  );
}
