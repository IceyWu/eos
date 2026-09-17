import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const IMAGE_GROUP_STYLES = `
${EOS_THEME_TOKENS}

:host {
  display: block;
  width: 100%;
}

.group {
  display: grid;
  gap: var(--eos-image-group-gap, 4px);
  aspect-ratio: var(--eos-image-group-columns) / var(--eos-image-group-aspect-rows);
  width: 100%;
  overflow: hidden;
  border-radius: var(--eos-image-group-radius, 12px);
}

.group.grid,
.group.pair {
  grid-template-columns: repeat(var(--eos-image-group-columns), minmax(0, 1fr));
  grid-template-rows: repeat(var(--eos-image-group-rows), minmax(0, 1fr));
}

.group.grid[data-columns="3"] {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.group.grid[data-columns="3"] .tile {
  grid-column: span 2;
}

.group.grid[data-columns="3"][data-remainder="1"] .tile:last-child {
  grid-column: 1 / -1;
}

.group.grid[data-columns="3"][data-remainder="2"] .tile:nth-last-child(-n + 2) {
  grid-column: span 3;
}

.group.pair[data-remainder="1"] .tile:last-child {
  grid-column: 1 / -1;
}

.group.featured {
  grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(var(--eos-image-group-rows), minmax(0, 1fr));
}

.group.featured[data-count="1"] {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.group.featured[data-count="2"] {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
}

.group.featured[data-count="3"] {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}

.group.featured[data-count]:not([data-count="1"]):not([data-count="2"]) .tile:first-child {
  grid-row: 1 / -1;
}

.group.featured[data-featured-remainder="1"]:not([data-count="2"]) .tile:last-child {
  grid-column: 2 / 4;
}

.tile {
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border: 0;
  border-radius: var(--eos-image-group-radius, 12px);
  padding: 0;
  background: var(--eos-color-surface-secondary);
  color: var(--eos-color-foreground);
  cursor: pointer;
}

.tile.has-overflow::before {
  position: absolute;
  z-index: 2;
  inset: 0;
  border-radius: inherit;
  background: var(--eos-image-group-overlay, rgb(0 0 0 / 32%));
  content: "";
  pointer-events: none;
}

.tile::after {
  position: absolute;
  z-index: 3;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--eos-image-group-border, rgb(0 0 0 / 10%));
  content: "";
  pointer-events: none;
}

.tile eos-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  transition: transform 150ms cubic-bezier(0.2, 0, 0, 1);
}

.tile:hover eos-image {
  transform: scale(1.03);
}

.tile:focus-visible {
  z-index: 1;
  outline: 2px solid var(--eos-color-focus-ring);
  outline-offset: -2px;
}

.count {
  position: absolute;
  z-index: 4;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  min-width: 36px;
  transform: translate(-50%, -50%);
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--eos-image-group-count-background, var(--eos-color-surface));
  color: var(--eos-image-group-count-foreground, var(--eos-color-foreground));
  box-shadow: 0 1px 4px var(--eos-image-group-count-shadow, rgb(0 0 0 / 18%));
  font: 600 13px/18px var(--eos-font-family);
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .tile eos-image {
    transition: none;
  }
}
`;
