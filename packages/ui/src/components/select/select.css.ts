import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const SELECT_STYLES = `
${EOS_THEME_TOKENS}

:host {
  position: relative;
  display: inline-block;
  inline-size: 280px;
  block-size: 60px;
  color: var(--eos-color-foreground);
  font: 400 14px/20px var(--eos-font-family);
  vertical-align: middle;
}
:host([full-width]) { display: block; inline-size: 100%; }
:host([open]) { z-index: 10; }
:host([disabled]) { opacity: .5; }
* { box-sizing: border-box; }

.trigger {
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  inline-size: 100%;
  block-size: 100%;
  padding: 0 28px;
  overflow: hidden;
  border: 1px solid var(--eos-color-border);
  border-radius: 9999px;
  background: var(--eos-color-surface);
  color: var(--eos-color-foreground);
  box-shadow: 0 2px 4px var(--eos-shadow-color, rgba(0,0,0,.04)), 0 1px 2px var(--eos-shadow-color, rgba(0,0,0,.06));
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: opacity 140ms cubic-bezier(.2,0,0,1), transform 180ms cubic-bezier(.2,0,0,1), border-radius 220ms cubic-bezier(.2,0,0,1);
}
.trigger::before {
  content: "";
  inline-size: 9px;
  block-size: 14px;
  flex: 0 0 9px;
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
.trigger:hover:not(:disabled) { transform: translateY(-1px); }
.trigger:active:not(:disabled) { transform: scale(.985); }
.trigger:focus-visible { outline: 2px solid var(--eos-color-focus-ring); outline-offset: 3px; }
.trigger:disabled { cursor: not-allowed; }
:host([open]:focus-within) .panel { outline: 2px solid var(--eos-color-focus-ring); outline-offset: 3px; }
.trigger-label { min-inline-size: 0; flex: 1; overflow-wrap: anywhere; color: var(--eos-color-foreground); font-weight: 500; }
.placeholder { color: var(--eos-color-foreground-muted); font-weight: 400; }

.panel {
  position: fixed;
  z-index: 1;
  inset: auto;
  left: 0;
  top: 0;
  inline-size: 280px;
  block-size: 280px;
  overflow: hidden;
  border: 1px solid var(--eos-color-border);
  border-radius: 24px;
  background: var(--eos-color-surface);
  box-shadow: 0 8px 28px var(--eos-shadow-color, rgba(0,0,0,.10)), 0 1px 3px var(--eos-shadow-color, rgba(0,0,0,.06));
  opacity: 0;
  clip-path: inset(0 0 0 100% round 24px);
  pointer-events: none;
  visibility: hidden;
  transition: clip-path 240ms cubic-bezier(.2,0,0,1), opacity 160ms cubic-bezier(.2,0,0,1), visibility 240ms;
}
:host([open]) .panel[data-positioned="true"] { clip-path: inset(0 round 24px); opacity: 1; pointer-events: auto; visibility: visible; }
:host([open]) .panel[data-placement^="right"] { clip-path: inset(0 100% 0 0 round 24px); }
:host([open]) .panel[data-placement^="top"] { clip-path: inset(100% 0 0 0 round 24px); }
:host([open]) .panel[data-placement^="bottom"] { clip-path: inset(0 0 100% 0 round 24px); }
:host([open]) .panel[data-positioned="true"] { clip-path: inset(0 round 24px); }
:host([open]) .panel[data-placement^="top"]::before, :host([open]) .panel[data-placement^="bottom"]::before {
  content: "";
  position: absolute;
  z-index: 2;
  inset-block-start: calc(50% - 40px);
  inset-inline-start: 50%;
  inline-size: min(380px, calc(100% - 80px));
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--eos-color-border) 55%, transparent);
  border-radius: 50%;
  clip-path: inset(0 0 50%);
  transform: translateX(-50%);
  pointer-events: none;
}
:host([open]) .panel[data-placement^="right"] .selection-pill { inset-inline-start: var(--eos-select-pill-start, 88px); inset-inline-end: 12px; }
:host([open]) .panel[data-placement^="right"] .selection-pointer { inset-inline-start: 22px; inset-inline-end: auto; transform: translateY(-50%); }
:host([open]) .panel[data-placement^="top"], :host([open]) .panel[data-placement^="bottom"] { inline-size: min(520px, calc(100vw - 24px)); block-size: min(240px, calc(100vh - 24px)); }
:host([open]) .panel[data-placement^="right"] .option { justify-content: flex-start; padding-inline-start: calc(var(--eos-select-content-start, 130px) + var(--eos-select-label-offset, 0px)); padding-inline-end: 12px; }
:host([open]) .panel[data-placement^="right"] .option-label { text-align: start; }
:host([open]) .panel[data-placement^="right"] .option::before { inset-inline-start: var(--eos-select-tick-x, 22px); inset-inline-end: auto; }
:host([open]) .panel[data-placement^="top"] .selection-pill, :host([open]) .panel[data-placement^="bottom"] .selection-pill { inset-block-start: 50%; inset-inline-start: 50%; inset-inline-end: auto; inline-size: min(176px, calc(100% - 72px)); block-size: 44px; transform: translate(-50%, -50%); }
:host([open]) .panel[data-placement^="top"] .selection-pointer { inset-block-start: auto; inset-block-end: 18px; inset-inline-start: 50%; inset-inline-end: auto; transform: translateX(-50%) rotate(-90deg); }
:host([open]) .panel[data-placement^="bottom"] .selection-pointer { inset-block-start: 18px; inset-block-end: auto; inset-inline-start: 50%; inset-inline-end: auto; transform: translateX(-50%) rotate(90deg); }
.selection-overlay { position: absolute; z-index: 2; inset: 0; pointer-events: none; opacity: 0; transition: opacity 160ms cubic-bezier(.2,0,0,1); }
:host([open]) .selection-overlay { opacity: 1; transition-delay: 80ms; }
.selection-pill { position: absolute; inset-block-start: 50%; inset-inline-start: 12px; inset-inline-end: var(--eos-select-pill-start, 88px); block-size: 48px; border-radius: 22px; background: var(--eos-color-surface-secondary); box-shadow: 0 2px 6px var(--eos-shadow-color, rgba(0,0,0,.08)); transform: translateY(-50%); }
.selection-pointer { position: absolute; inset-block-start: 50%; inset-inline-end: 22px; inline-size: 8px; block-size: 12px; background: var(--eos-color-foreground); clip-path: polygon(0 0, 100% 50%, 0 100%); transform: translateY(-50%) rotate(180deg); }

.viewport {
  position: absolute;
  z-index: 3;
  inset-block-start: 50%;
  inset-inline: 0;
  block-size: min(264px, calc(100% - 16px));
  transform: translateY(-50%);
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: none;
  overscroll-behavior: contain;
  scrollbar-width: none;
  scroll-behavior: auto;
}
.viewport::before, .viewport::after {
  content: "";
  position: sticky;
  z-index: 3;
  display: block;
  inline-size: 100%;
  block-size: 58px;
  pointer-events: none;
}
.viewport::before { inset-block-start: 0; margin-block-end: -58px; background: linear-gradient(to bottom, var(--eos-color-surface) 4%, color-mix(in srgb, var(--eos-color-surface) 0%, transparent) 100%); }
.viewport::after { inset-block-end: 0; margin-block-start: -58px; background: linear-gradient(to top, var(--eos-color-surface) 4%, color-mix(in srgb, var(--eos-color-surface) 0%, transparent) 100%); }
.viewport::-webkit-scrollbar { display: none; }
.list { position: relative; inline-size: 100%; }
.option {
  position: absolute;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  inline-size: 100%;
  block-size: var(--eos-select-row-height, 44px);
  padding-block: 0;
  padding-inline-start: 12px;
  padding-inline-end: calc(var(--eos-select-content-start, 130px) + var(--eos-select-label-offset, 0px));
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--eos-color-foreground-muted);
  font: inherit;
  text-align: start;
  cursor: pointer;
  z-index: 1;
  opacity: var(--eos-option-opacity, 1);
  transition: opacity 180ms cubic-bezier(.2,0,0,1), color 150ms cubic-bezier(.2,0,0,1);
}
.option::before {
  content: "";
  position: absolute;
  inset-inline-end: var(--eos-select-tick-x, 22px);
  inline-size: 10px;
  block-size: 1px;
  background: var(--eos-color-foreground-muted);
  transition: inline-size 150ms cubic-bezier(.2,0,0,1), background-color 150ms cubic-bezier(.2,0,0,1);
}
.option[data-active="true"] { z-index: 3; color: var(--eos-color-foreground); opacity: 1 !important; }
.option[data-active="true"]::before { inline-size: 12px; background: var(--eos-color-foreground); }
.option[data-hovered="true"] { color: var(--eos-color-foreground); }
.option-content { display: contents; }
.option-prefix, .option-label { position: relative; z-index: 1; }
.option-prefix { display: inline-flex; inline-size: 28px; flex: 0 0 28px; align-items: center; justify-content: center; font-size: 18px; line-height: 24px; }
.option-label { min-inline-size: 0; flex: 0 1 auto; overflow-wrap: anywhere; text-align: end; }
.option:disabled { cursor: not-allowed; }
.option:focus-visible { outline: 0; }
.panel[data-placement^="top"] .viewport, .panel[data-placement^="bottom"] .viewport { inset-block: 0; inset-inline-start: 50%; inset-inline-end: auto; inline-size: calc(100% - 16px); block-size: 100%; transform: translateX(-50%); overflow-x: auto; overflow-y: hidden; }
.panel[data-placement^="top"] .viewport::before, .panel[data-placement^="top"] .viewport::after, .panel[data-placement^="bottom"] .viewport::before, .panel[data-placement^="bottom"] .viewport::after { position: absolute; inset-block: 0; inline-size: 20px; block-size: auto; margin-block: 0; }
.panel[data-placement^="top"] .viewport::before, .panel[data-placement^="bottom"] .viewport::before { inset-inline-start: 0; inset-block-start: 0; margin-inline-end: 0; margin-block-end: 0; background: linear-gradient(to right, var(--eos-color-surface) 4%, color-mix(in srgb, var(--eos-color-surface) 0%, transparent) 100%); }
.panel[data-placement^="top"] .viewport::after, .panel[data-placement^="bottom"] .viewport::after { inset-inline-end: 0; inset-block-end: 0; margin-inline-start: 0; margin-block-start: 0; background: linear-gradient(to left, var(--eos-color-surface) 4%, color-mix(in srgb, var(--eos-color-surface) 0%, transparent) 100%); }
.panel[data-placement^="top"] .list, .panel[data-placement^="bottom"] .list { block-size: 100%; }
.panel[data-placement^="top"] .option, .panel[data-placement^="bottom"] .option { inset-block-start: 50%; inline-size: var(--eos-select-column-width, 60px); block-size: 44px; min-block-size: 44px; justify-content: center; gap: 0; padding: 0; border-radius: 12px; transform: translateY(calc(-50% + var(--eos-select-arc-offset, 0px))); }
.panel[data-placement^="top"] .option-content, .panel[data-placement^="bottom"] .option-content { position: absolute; inset-inline-start: 50%; display: flex; align-items: center; gap: 8px; inline-size: 120px; block-size: 100%; font-size: 14px; line-height: 20px; pointer-events: none; }
.panel[data-placement^="top"] .option[data-side="before"] .option-content, .panel[data-placement^="bottom"] .option[data-side="before"] .option-content { justify-content: flex-end; transform: translateX(calc(-50% - var(--eos-select-content-shift, 0px))); }
.panel[data-placement^="top"] .option[data-side="after"] .option-content, .panel[data-placement^="bottom"] .option[data-side="after"] .option-content { justify-content: flex-start; transform: translateX(calc(-50% + var(--eos-select-content-shift, 0px))); }
.panel[data-placement^="top"] .option[data-active="true"] .option-content, .panel[data-placement^="bottom"] .option[data-active="true"] .option-content { justify-content: center; transform: translateX(-50%); }
.panel[data-placement^="top"] .option[data-active="true"] .option-label, .panel[data-placement^="bottom"] .option[data-active="true"] .option-label { font-size: 14px; line-height: 20px; }
.panel[data-placement^="top"] .option::before, .panel[data-placement^="bottom"] .option::before { inset-inline-start: 50%; inset-inline-end: auto; inline-size: 1px; block-size: 8px; transform: translateX(-50%) rotate(var(--eos-select-tick-rotation, 0deg)); }
.panel[data-placement^="top"] .option::before { inset-block-start: 2px; }
.panel[data-placement^="bottom"] .option::before { inset-block-start: auto; inset-block-end: 2px; }
.panel[data-placement^="top"] .option[data-active="true"], .panel[data-placement^="bottom"] .option[data-active="true"] { z-index: 3; }
.panel[data-placement^="top"] .option-prefix, .panel[data-placement^="bottom"] .option-prefix { inline-size: 24px; flex-basis: 24px; font-size: 18px; }
.panel[data-placement^="top"] .option-label, .panel[data-placement^="bottom"] .option-label { max-inline-size: 100px; text-align: center; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.panel[data-placement^="top"] .option[data-active="true"]::before, .panel[data-placement^="bottom"] .option[data-active="true"]::before { opacity: 0; }
.panel[data-placement^="top"] .selection-overlay, .panel[data-placement^="bottom"] .selection-overlay { z-index: 2; }
.empty { position: absolute; inset: 50% 12px auto; z-index: 5; margin: 0; color: var(--eos-color-foreground-muted); text-align: center; transform: translateY(-50%); }
.status { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (max-width: 380px) {
  :host { inline-size: min(280px, calc(100vw - 32px)); }
  .trigger { gap: 16px; padding-inline: 20px; }
  .option { gap: 8px; }
  .option-prefix { inline-size: 22px; flex-basis: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
  .trigger:hover:not(:disabled), .trigger:active:not(:disabled) { transform: none; }
}
`;
