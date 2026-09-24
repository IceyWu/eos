import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const CARD_STACK_STYLES = `
${EOS_THEME_TOKENS}
:host { display: block; position: relative; inline-size: 100%; block-size: var(--card-stack-height, 420px); color: var(--eos-color-foreground); font-family: var(--eos-font-family); }
* { box-sizing: border-box; }
.stage { position: relative; inline-size: 100%; block-size: 100%; overflow: hidden; display: grid; place-items: center; }
.cards { position: relative; inline-size: min(var(--card-stack-card-width, 320px), calc(100% - 96px)); block-size: 100%; perspective: 900px; touch-action: pan-y; }
.card { position: absolute; inset: 0; overflow: hidden; border: 1px solid var(--eos-color-border); border-radius: var(--radius-panel, 24px); background: var(--eos-color-surface); box-shadow: 0 2px 4px var(--eos-shadow-field, transparent); transform: translateX(var(--x, 0px)) rotate(var(--rotate, 0deg)) scale(var(--scale, 1)); opacity: var(--opacity, 1); transition: transform 220ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms cubic-bezier(0.2, 0, 0, 1); }
.card > * { inline-size: 100%; block-size: 100%; }
.card[data-position="current"] { z-index: 2; cursor: grab; }
.card[data-position="current"]:active { cursor: grabbing; }
.card[data-position="previous"] { z-index: 0; --x: -32px; --rotate: -6deg; --scale: .9; }
.card[data-position="next"] { z-index: 1; --x: 32px; --rotate: 6deg; --scale: .9; }
.card[data-position="incoming"] { z-index: 1; --opacity: 0; }
.card[data-position="incoming"][data-preview] { transition: none; }
.card[data-position="current"][data-past-threshold] { z-index: 0; }
.card[data-promoted] { z-index: 3; }
.card[data-dragging] { transition: none; }
.card[data-revealing] { transition: none; }
.card[data-settling] { pointer-events: none; }
.nav { position: absolute; z-index: 4; inset-block-start: 50%; transform: translateY(-50%); inline-size: 44px; block-size: 44px; display: grid; place-items: center; border: 1px solid var(--eos-color-border); border-radius: 9999px; background: var(--eos-color-surface); color: var(--eos-color-foreground); cursor: pointer; }
.nav:hover:not(:disabled) { background: var(--eos-color-default-hover); }
.nav:focus-visible { outline: 2px solid var(--eos-color-focus-ring); outline-offset: 2px; }
.nav:disabled { opacity: .5; cursor: not-allowed; }
.nav.prev { inset-inline-start: 0; }
.nav.next { inset-inline-end: 0; }
.nav svg { inline-size: 20px; block-size: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.status { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 480px) {
	.stage { place-items: start center; }
	.cards { inline-size: min(var(--card-stack-card-width, 320px), calc(100% - 32px)); block-size: calc(100% - 56px); }
	.nav { inset-block-start: auto; inset-block-end: 0; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .card { transition-duration: 0ms; } }
`;
