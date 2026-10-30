import { Suspense } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { demoRegistry } from '@/lib/demo-registry';
import { i18n } from '@/lib/i18n';

export default function DemoPreview() {
  const { demoId } = useParams();
  const [searchParams] = useSearchParams();
  const DemoComponent = demoId ? demoRegistry[demoId.toLowerCase()] : undefined;

  if (!DemoComponent) {
    return (
      <main className="eos-demo-preview-error" role="alert">
        <h1>Demo not found</h1>
        <p>This preview link does not match a documented example.</p>
      </main>
    );
  }

  const locale = searchParams.get('locale') === 'zh' ? 'zh' : i18n.defaultLanguage;
  const appearance = searchParams.get('appearance') === 'dark' ? 'dark' : 'light';
  const viewport = searchParams.get('viewport') === 'mobile' ? 'mobile' : 'responsive';
  const requestedLayout = searchParams.get('layout');
  const layout = ['center', 'bare'].includes(requestedLayout ?? '') ? requestedLayout : 'default';

  return (
    <main
      className={`eos-demo eos-demo--standalone eos-demo--${layout}`}
      data-demo-appearance={appearance}
      data-demo-viewport={viewport}
      data-eos-theme={appearance}
      data-standalone-demo={demoId}
      lang={locale}
    >
      <title>{`${demoId} · EOS UI`}</title>
      <div className="eos-demo__preview">
        <Suspense fallback={<p className="eos-demo-preview-loading">Loading preview…</p>}>
          <DemoComponent />
        </Suspense>
      </div>
    </main>
  );
}
