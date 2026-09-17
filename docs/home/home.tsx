import '@eosjs/components';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getLocaleConfig } from '@/lib/i18n';
import './home.css';

const platforms = ['Web Components', 'React', 'Vue', 'Angular', 'HTML'];
const imageBlurhash = 'LTE3P2_4xvay_4_3xuay_3-;ayR%';

function ComponentCard({
  children,
  className = '',
  description,
  title,
  to,
}: {
  children: ReactNode;
  className?: string;
  description: string;
  title: string;
  to: string;
}) {
  return (
    <article className={`eos-home__card ${className}`.trim()}>
      <Link aria-label={`View ${title} documentation`} className="eos-home__card-link" to={to}>
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

function ProgressPreview() {
  const progressRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(2);

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
      <span>Step {current + 1} of 5</span>
    </div>
  );
}

function ScrollbarPreview() {
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
          <span key={index}>Scrollable item {String(index + 1).padStart(2, '0')}</span>
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
  const docsPath = (path: string) => `${getLocaleConfig(locale).prefix}${path}`;

  return (
    <main className="eos-home">
      <section className="eos-home__hero">
        <h1>
          EOS <span>UI Kit</span>
        </h1>
        <p>{description}</p>
        <div className="eos-home__actions">
          <eos-button
            size="lg"
            suppressHydrationWarning
            variant="outline"
            onClick={() => window.open('https://github.com/IceyWu/eos', '_blank', 'noopener,noreferrer')}
          >
            GitHub
          </eos-button>
          <eos-button
            size="lg"
            suppressHydrationWarning
            variant="solid"
            onClick={() => navigate(getStartedPathname)}
          >
            Get Started
            <ArrowRight aria-hidden="true" slot="end" />
          </eos-button>
        </div>
        <div aria-label="Supported platforms" className="eos-home__ecosystem">
          <div className="eos-home__ecosystem-track">
            {platforms.map((item) => (
              <span key={item}>
                <b>{item.slice(0, 1)}</b>
                {item}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="eos-home__ecosystem-track">
            {platforms.map((item) => (
              <span key={item}>
                <b>{item.slice(0, 1)}</b>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="eos-home__ecosystem-caption">One component system, every web stack</div>
      </section>

      <section className="eos-home__showcase">
        <div className="eos-home__section-heading">
          <h2>Built for the web</h2>
          <p>5 focused components — every example below is a live render, not a screenshot.</p>
        </div>
        <div className="eos-home__cards">
          <ComponentCard
            className="eos-home__card--half"
            description="events · variants · CSS variables"
            title="Button"
            to={docsPath('/docs/components/button')}
          >
            <eos-button size="lg" suppressHydrationWarning variant="solid">
              Try the button
            </eos-button>
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--half"
            description="touch · keyboard · autoplay"
            title="Carousel"
            to={docsPath('/docs/components/carousel')}
          >
            <eos-carousel autoplay interval="3200" loop suppressHydrationWarning>
              <div className="eos-home__slide eos-home__slide--violet">SLIDE / 01</div>
              <div className="eos-home__slide eos-home__slide--rose">SLIDE / 02</div>
              <div className="eos-home__slide eos-home__slide--cyan">SLIDE / 03</div>
            </eos-carousel>
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--third"
            description="lazy loading · BlurHash"
            title="Image"
            to={docsPath('/docs/components/image')}
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
            description="steps · loading · navigation"
            title="ProgressBar"
            to={docsPath('/docs/components/progress-bar')}
          >
            <ProgressPreview />
          </ComponentCard>
          <ComponentCard
            className="eos-home__card--third"
            description="drag · synchronized scrolling"
            title="Scrollbar"
            to={docsPath('/docs/components/scrollbar')}
          >
            <ScrollbarPreview />
          </ComponentCard>
        </div>
      </section>

      <section className="eos-home__closing">
        <h2>Start building with EOS now</h2>
        <p>Open-source primitives for interfaces that work across frameworks.</p>
        <div className="eos-home__install">
          <code>pnpm add @eosjs/components</code>
        </div>
        <p className="eos-home__closing-note">
          Open source · MIT license · <Link to={getStartedPathname}>Get Started →</Link>
        </p>
      </section>
    </main>
  );
}
