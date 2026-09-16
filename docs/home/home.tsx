import { Link } from 'react-router';
import './home.css';

export default function Home({ description, getStartedPathname }: { description: string; getStartedPathname: string }) {
  return (
    <main className="eos-home">
      <section className="eos-home__hero">
        <h1>EOS <span>UI Kit</span></h1>
        <p>{description}</p>
        <div className="eos-home__actions">
          <a className="eos-button eos-button--github" href="https://github.com/IceyWu/eos" rel="noreferrer" target="_blank">
            <svg aria-hidden="true" height="16" viewBox="0 0 24 24" width="16"><path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.52 1.06 1.52 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.98c.84 0 1.68.12 2.46.36 1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v1.42c0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" fill="currentColor" /></svg>
            GitHub
          </a>
          <Link className="eos-button eos-button--outline" to={getStartedPathname}>Get Started <span aria-hidden="true">→</span></Link>
        </div>
        <div className="eos-home__ecosystem" aria-label="Supported platforms">
          <div className="eos-home__ecosystem-track">
            {['Web Components', 'React', 'Vue', 'Angular', 'HTML'].map((item) => (
              <span key={item}><b>{item.slice(0, 1)}</b>{item}</span>
            ))}
          </div>
          <div aria-hidden="true" className="eos-home__ecosystem-track">
            {['Web Components', 'React', 'Vue', 'Angular', 'HTML'].map((item) => (
              <span key={item}><b>{item.slice(0, 1)}</b>{item}</span>
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
          <Link className="eos-home__card eos-home__card--large" to="/docs/components/button">
            <strong>Button</strong><span>events · variants · CSS variables</span>
            <div className="eos-home__card-preview"><span>Try the button</span></div>
          </Link>
          <Link className="eos-home__card" to="/docs/components/carousel">
            <strong>Carousel</strong><span>touch · keyboard · autoplay</span>
            <div className="eos-home__carousel-mark"><i /><i /><i /></div>
          </Link>
          <Link className="eos-home__card" to="/docs/components/image">
            <strong>Image</strong><span>lazy loading · placeholders</span>
            <div className="eos-home__image-mark" />
          </Link>
          <Link className="eos-home__card" to="/docs/components/progress-bar">
            <strong>ProgressBar</strong><span>steps · loading · navigation</span>
            <div className="eos-home__progress-mark"><i /><i /><i /><i /></div>
          </Link>
          <Link className="eos-home__card" to="/docs/components/scrollbar">
            <strong>Scrollbar</strong><span>drag · virtual scroll</span>
            <div className="eos-home__scroll-mark"><i /></div>
          </Link>
        </div>
      </section>

      <section className="eos-home__closing">
        <h2>Start building with EOS now</h2>
        <p>Open-source primitives for interfaces that work across frameworks.</p>
        <div className="eos-home__install"><code>pnpm add @eosjs/components</code></div>
        <p className="eos-home__closing-note">Open source · MIT license · <Link to={getStartedPathname}>Get Started →</Link></p>
      </section>
    </main>
  );
}
