import { registerComponents } from "@eosjs/components";
import "./style.css";

registerComponents();

const image =
	"https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959814881.JPEG";
const secondImage =
	"https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959816821.JPEG";
const thirdImage =
	"https://lpalette.oss-accelerate.aliyuncs.com/prod/1/1765959821196.JPEG";
const blurhash = "LCF~22^M0LEQ~A9vs:r=tmROV?f+";

document.querySelector("#app").innerHTML = `
  <div class="playground">
    <header class="topbar"><div class="brand-mark">EOS UI</div><span class="topbar-context">HTML Playground</span></header>
    <main class="content">
      <section class="intro"><p class="eyebrow">Components</p><h1>Playground</h1><p class="lede">A compact view of the EOS Web Components.</p></section>
      <section class="component-grid" aria-label="EOS components">
        <article class="demo-card"><header class="demo-card-header"><div><p class="card-kicker">Action</p><h2>Button</h2></div><span class="card-tag">4 states</span></header><div class="demo-body button-demo"><div class="button-row"><eos-button>Primary</eos-button><eos-button variant="secondary">Secondary</eos-button><eos-button variant="outline">Outline</eos-button><eos-button color="danger">Danger</eos-button></div></div></article>
        <article class="demo-card"><header class="demo-card-header"><div><p class="card-kicker">Media</p><h2>Image</h2></div><span class="card-tag">BlurHash</span></header><div class="image-demo"><eos-image src="${image}" alt="Mountain landscape" placeholder="${blurhash}" placeholder-type="blurhash" object-fit="cover"></eos-image></div></article>
        <article class="demo-card demo-card--carousel"><header class="demo-card-header"><div><p class="card-kicker">Media</p><h2>Carousel</h2></div><span class="card-tag">3 slides</span></header><div class="carousel-demo"><eos-carousel loop indicator-style="tiktok" show-navigation style="--carousel-height: min(42vw, 360px)"><div class="slide"><eos-image src="${image}" alt="Mountain landscape" object-fit="cover"></eos-image><span class="slide-label">Mountain landscape</span></div><div class="slide"><eos-image src="${secondImage}" alt="Landscape detail" object-fit="cover"></eos-image><span class="slide-label">Landscape detail</span></div><div class="slide"><eos-image src="${thirdImage}" alt="Night landscape" object-fit="cover"></eos-image><span class="slide-label">Night landscape</span></div></eos-carousel></div></article>
        <article class="demo-card"><header class="demo-card-header"><div><p class="card-kicker">Feedback</p><h2>ProgressBar</h2></div><span class="card-tag">3 variants</span></header><div class="demo-body progress-demo"><div class="progress-row"><span>Default</span><eos-progress-bar total="5" current="2" variant="default"></eos-progress-bar></div><div class="progress-row"><span>Dots</span><eos-progress-bar total="5" current="2" variant="dots"></eos-progress-bar></div><div class="progress-row"><span>TikTok</span><eos-progress-bar total="5" current="2" variant="tiktok"></eos-progress-bar></div></div></article>
      </section>
    </main>
  </div>`;
