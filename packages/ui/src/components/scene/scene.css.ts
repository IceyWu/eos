import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

const SCENE_THEME_TOKENS = EOS_THEME_TOKENS.replace(
	':host([data-eos-theme="dark"])',
	':host([data-eos-theme="dark"]), :host-context([data-eos-theme="dark"])',
).replace(
	':host([data-eos-theme="light"])',
	':host([data-eos-theme="light"]), :host-context([data-eos-theme="light"])',
);

export const SCENE_STYLES = `
${SCENE_THEME_TOKENS}

:host {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--eos-scene-aspect-ratio, 16 / 9);
  overflow: hidden;
  border: 1px solid var(--eos-color-border);
  border-radius: var(--eos-scene-radius, 16px);
  background: var(--eos-color-surface-secondary);
  color: var(--eos-color-foreground);
  isolation: isolate;
  cursor: inherit;
}

:host([hidden]) {
  display: none;
}

.viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.plane {
  position: absolute;
  inset: 0;
}

.content {
  position: absolute;
  inset: 0;
}

slot[name="content"] {
  display: block;
  width: 100%;
  height: 100%;
}

::slotted([slot="content"]) {
  display: block;
  width: 100%;
  height: 100%;
}

slot:not([name]) {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

::slotted(eos-scene-item) {
  pointer-events: auto;
}
`;

export const SCENE_ITEM_STYLES = `
${SCENE_THEME_TOKENS}

:host {
  position: absolute;
  top: var(--eos-scene-item-y, 50%);
  left: var(--eos-scene-item-x, 50%);
  z-index: var(--eos-scene-item-z, 1);
  display: block;
  transform: translate(var(--eos-scene-item-shift-x, -50%), var(--eos-scene-item-shift-y, -50%));
  color: var(--eos-color-foreground);
  pointer-events: auto;
}

:host([hidden]) {
  display: none;
}

.content {
  display: block;
}
`;
