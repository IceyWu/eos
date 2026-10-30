import '@eosjs/ui';
import { ArrowRight, ArrowUpRight, BookOpenText, Bot, Check, Code2, Copy, Sun, UserRound } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getLocaleConfig } from '@/lib/i18n';
import { withDocsPrerenderPath } from '@/lib/shared';
import './home.css';

const platforms = ['React', 'Vue', 'Angular', 'HTML'];
const imageBlurhash = 'LTE3P2_4xvay_4_3xuay_3-;ayR%';

function ComponentCard({
  children,
  className = '',
  description,
  title,
  to,
  viewDocsLabel,
}: {
  children: ReactNode;
  className?: string;
  description: string;
  title: string;
  to: string;
  viewDocsLabel: string;
}) {
  return (
    <article className={`eos-home__card ${className}`.trim()}>
      <Link aria-label={viewDocsLabel.replace('{title}', title)} className="eos-home__card-link" to={to}>
        <span>
          <strong>{title}</strong>
          <small>{description}</small>
        </span>
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
      </Link>
      <div className="eos-home__card-preview">{children}</div>
    </article>
  );
}

function ProgressPreview({ locale }: { locale: string }) {
  const progressRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(2);
  const { home } = getLocaleConfig(locale);

  useEffect(() => {
    const progress = progressRef.current;
    const handleSegmentClick = (event: Event) => {
      setCurrent((event as CustomEvent<{ index: number }>).detail.index);
    };

    progress?.addEventListener('segment-click', handleSegmentClick);
    return () => progress?.removeEventListener('segment-click', handleSegmentClick);
  }, []);

  return (
    <div className="eos-home__progress-preview">
      <eos-progress-bar
        ref={progressRef}
        current={String(current)}
        suppressHydrationWarning
        total="5"
        variant="tiktok"
      />
      <span>{home.step} {current + 1} {home.of} 5</span>
    </div>
  );
}

function ScrollbarPreview({ itemLabel }: { itemLabel: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollbar = scrollbarRef.current as HTMLElement & {
      attach?: (element: HTMLElement) => void;
      detach?: () => void;
    };
    const content = contentRef.current;

    if (content && scrollbar.attach) scrollbar.attach(content);
    return () => scrollbar.detach?.();
  }, []);

  return (
    <div className="eos-home__scroll-preview">
      <div ref={contentRef} className="eos-home__scroll-content">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index}>{itemLabel} {String(index + 1).padStart(2, '0')}</span>
        ))}
      </div>
      <eos-scrollbar
        ref={scrollbarRef}
        direction="vertical"
        suppressHydrationWarning
        thumb-size="6"
      />
    </div>
  );
}

export default function Home({
  description,
  getStartedPathname,
  locale,
}: {
  description: string;
  getStartedPathname: string;
  locale: string;
}) {
  const navigate = useNavigate();
  const config = getLocaleConfig(locale);
  const { home } = config;
  const docsPath = (path: string) => withDocsPrerenderPath(`${config.prefix}${path}`);
  const skillsRawPath = `${config.prefix}/skills.md`;
  const skillsPath = `${skillsRawPath}?view=browser`;
  const llmsPath = `${config.prefix}/llms.txt?view=browser`;
  const [persona, setPersona] = useState<'agent' | 'human'>('agent');
  const [siteOrigin, setSiteOrigin] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [selectedExample, setSelectedExample] = useState(0);

  useEffect(() => setSiteOrigin(window.location.origin), []);

  const agentPrompt = home.agentPrompt.replace(
    '{skillsUrl}',
    siteOrigin ? new URL(skillsRawPath, siteOrigin).toString() : skillsRawPath,
  );
  const visibleAgentPrompt = home.agentPrompt.replace('{skillsUrl}', 'skills.md');

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard.writeText(agentPrompt);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };

  const examples = [
    {
      code: "import '@eosjs/ui/button';\n\n<eos-button variant=\"solid\">Continue</eos-button>",
      id: 'button',
    },
    {
      code: "import '@eosjs/ui/carousel';\n\n<eos-carousel loop>\n  <article>One</article>\n  <article>Two</article>\n</eos-carousel>",
      id: 'carousel',
    },
    {
      code: `import '@eosjs/ui/image';\n\n<eos-image src=\"${imageBlurhash}\" src-type=\"blurhash\" alt=\"Landscape\" />`,
      id: 'image',
    },
  ];

  return (
    <main className="eos-home">
      <section className="eos-home__hero">
        <div className="eos-home__hero-grid">
          <div className="eos-home__hero-copy">
            <p className="eos-home__eyebrow">{home.heroEyebrow}</p>
            <h1>
              {home.heroTitle}{' '}
              <span>{home.heroAccent}</span>
            </h1>
            <p className="eos-home__description">{description}</p>
            <div className="eos-home__actions">
              <eos-button
                size="lg"
                suppressHydrationWarning
                variant="solid"
                onClick={() => navigate(getStartedPathname)}
              >
                {home.getStarted}
                <ArrowRight aria-hidden="true" slot="end" />
              </eos-button>
              <eos-button
                size="lg"
                suppressHydrationWarning
                variant="outline"
                onClick={() => window.open('https://github.com/IceyWu/eos', '_blank', 'noopener,noreferrer')}
              >
                {home.github}
              </eos-button>
            </div>
            <div aria-label={home.supportedPlatforms} className="eos-home__platforms">
              {platforms.map((item) => <span key={item}>{item}</span>)}
              <span>Web Components</span>
            </div>
          </div>

          <aside aria-label={home.personaLabel} className="eos-home__agent-card">
            <div aria-label={home.personaLabel} className="eos-home__persona-switch" role="group">
              <button aria-pressed={persona === 'agent'} onClick={() => setPersona('agent')} type="button">
                <Bot aria-hidden="true" size={16} />{home.agentModeLabel}
              </button>
              <button aria-pressed={persona === 'human'} onClick={() => setPersona('human')} type="button">
                <UserRound aria-hidden="true" size={16} />{home.humanModeLabel}
              </button>
            </div>
            {persona === 'agent' ? (
              <div className="eos-home__agent-content">
                <p>{home.agentDescription}</p>
                <div className="eos-home__prompt">
                  <code>{visibleAgentPrompt}</code>
                  <button aria-label={home.copyPrompt} onClick={copyAgentPrompt} type="button">
                    {copyStatus === 'copied' ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
                  </button>
                </div>
                <span aria-live="polite" className="eos-home__copy-status">
                  {copyStatus === 'copied' ? home.promptCopied : copyStatus === 'error' ? home.copyFailed : ''}
                </span>
                <div className="eos-home__agent-links">
                  <a href={skillsPath} rel="noreferrer" target="_blank">{home.skills}</a>
                  <a href={llmsPath} rel="noreferrer" target="_blank">{home.llms}</a>
                </div>
              </div>
            ) : (
              <div className="eos-home__human-content">
                <p>{home.humanDescription}</p>
                <span>{home.heroInstallLabel}</span>
                <pre><code>pnpm add @eosjs/ui</code></pre>
                <Link to={getStartedPathname}>{home.heroPreviewLink}<ArrowRight aria-hidden="true" size={15} /></Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="eos-home__showcase">
        <div className="eos-home__section-heading">
          <span className="eos-home__section-eyebrow">{home.showcaseEyebrow}</span>
          <h2>{home.showcaseTitle}</h2>
          <p>{home.showcaseDescription}</p>
          <Link className="eos-home__browse" to={docsPath('/docs/components')}>
            {home.browseComponents}<ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="eos-home__cards">
          <ComponentCard
            className="eos-home__card--half"
            description={home.buttonDescription}
            title="Button"
            to={docsPath('/docs/components/button')}
            viewDocsLabel={home.viewDocs}
          >
            <eos-button size="lg" suppressHydrationWarning variant="solid">{home.tryButton}</eos-button>
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--half"
            description={home.carouselDescription}
            title="Carousel"
            to={docsPath('/docs/components/carousel')}
            viewDocsLabel={home.viewDocs}
          >
            <eos-carousel loop suppressHydrationWarning>
              {home.carouselSlides.map((slide, index) => <div className={`eos-home__slide eos-home__slide--${['violet', 'rose', 'cyan'][index]}`} key={slide}>{slide}</div>)}
            </eos-carousel>
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--third"
            description={home.imageDescription}
            title="Image"
            to={docsPath('/docs/components/image')}
            viewDocsLabel={home.viewDocs}
          >
            <eos-image
              alt="BlurHash landscape preview"
              loading="eager"
              src={imageBlurhash}
              src-type="blurhash"
              suppressHydrationWarning
            />
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--third"
            description={home.progressDescription}
            title="ProgressBar"
            to={docsPath('/docs/components/progress-bar')}
            viewDocsLabel={home.viewDocs}
          >
            <ProgressPreview locale={locale} />
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--third"
            description={home.scrollbarDescription}
            title="Scrollbar"
            to={docsPath('/docs/components/scrollbar')}
            viewDocsLabel={home.viewDocs}
          >
            <ScrollbarPreview itemLabel={home.scrollableItem} />
          </ComponentCard>
        </div>
      </section>

      <section className="eos-home__developer">
        <div className="eos-home__section-heading">
          <span className="eos-home__section-eyebrow">{home.developerEyebrow}</span>
          <h2>{home.developerTitle}</h2>
          <p>{home.developerDescription}</p>
        </div>
        <div className="eos-home__developer-card">
          <div aria-label={home.developerEyebrow} className="eos-home__example-list" role="group">
            {home.developerExamples.map((label, index) => (
              <button
                aria-pressed={selectedExample === index}
                key={label}
                onClick={() => setSelectedExample(index)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="eos-home__developer-example">
            <pre><code>{examples[selectedExample].code}</code></pre>
            <div aria-label={home.heroLivePreview} className="eos-home__developer-preview">
              {selectedExample === 0 ? (
                <eos-button size="lg" suppressHydrationWarning variant="solid">Continue</eos-button>
              ) : selectedExample === 1 ? (
                <eos-carousel loop suppressHydrationWarning>
                  {home.carouselSlides.map((slide, index) => (
                    <div className={`eos-home__slide eos-home__slide--${['violet', 'rose', 'cyan'][index]}`} key={slide}>{slide}</div>
                  ))}
                </eos-carousel>
              ) : (
                <eos-image alt="BlurHash landscape preview" loading="eager" src={imageBlurhash} src-type="blurhash" suppressHydrationWarning />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="eos-home__foundations">
        <div className="eos-home__section-heading">
          <span className="eos-home__section-eyebrow">{home.foundationsEyebrow}</span>
          <h2>{home.foundationsTitle}</h2>
        </div>
        <div className="eos-home__foundation-grid">
          <Link className="eos-home__foundation-card" to={docsPath('/docs/getting-started')}>
            <Code2 aria-hidden="true" size={18} />
            <h3>{home.frameworkFeature}</h3>
            <p>{home.frameworkDescription}</p>
          </Link>
          <Link className="eos-home__foundation-card" to={docsPath('/docs/components')}>
            <Sun aria-hidden="true" size={18} />
            <h3>{home.themeFeature}</h3>
            <p>{home.themeDescription}</p>
          </Link>
          <Link className="eos-home__foundation-card" to={docsPath('/docs/components')}>
            <BookOpenText aria-hidden="true" size={18} />
            <h3>{home.docsFeature}</h3>
            <p>{home.docsDescription}</p>
          </Link>
        </div>
      </section>

      <section className="eos-home__closing">
        <h2>{home.closingTitle}</h2>
        <p>{home.closingDescription}</p>
        <div className="eos-home__install">
          <code>pnpm add @eosjs/ui</code>
        </div>
        <p className="eos-home__closing-note">
          {home.license} · <Link to={getStartedPathname}>{home.getStarted} →</Link>
        </p>
      </section>
    </main>
  );
}
