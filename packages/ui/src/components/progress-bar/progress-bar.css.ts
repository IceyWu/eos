import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const PROGRESS_BAR_STYLES = `
${EOS_THEME_TOKENS}
:host {
  display: block;
  min-width: 0;
  --pb-height: var(--progress-bar-height, 4px);
  --pb-gap: var(--progress-bar-gap, 4px);
  --pb-hit: var(--progress-bar-hit-size, 44px);
  --pb-color: var(--progress-bar-color, var(--eos-color-border));
  --pb-active: var(--progress-bar-active-color, var(--eos-color-accent));
}

:host([scrubbable]) {
  touch-action: none;
}

.bar {
  display: flex;
  gap: var(--pb-gap);
  min-width: 0;
}

.seg {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 0;
  height: var(--pb-hit);
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.track {
  position: relative;
  display: block;
  width: 100%;
  height: var(--pb-height);
  background: var(--pb-color);
  border-radius: var(--eos-radius-full, 9999px);
  overflow: hidden;
}

.fill {
  position: absolute;
  inset: 0;
  display: none;
  background: var(--pb-active);
  transform: scaleX(0);
  transform-origin: left top;
}

:host(:dir(rtl)) .fill {
  transform-origin: right top;
}

.seg.passed .track, .seg.completed .track {
  background: var(--pb-active);
}

.seg.animating .fill {
  display: block;
}

.seg:focus-visible {
  outline: 2px solid var(--eos-color-focus-ring);
  outline-offset: 2px;
}

.bar.pos-left, .bar.pos-right {
  flex-direction: column;
  height: 100%;
}

.bar.pos-left .seg, .bar.pos-right .seg {
  width: var(--pb-hit);
  min-height: 0;
}

.bar.pos-left .track, .bar.pos-right .track {
  width: var(--pb-height);
  height: 100%;
}

.bar.variant-dots .seg {
  flex: 0 0 var(--pb-hit);
}

.bar.variant-dots .track {
  width: 8px;
  height: 8px;
  border-radius: var(--eos-radius-full, 9999px);
}

.bar.variant-dots .seg.active .track {
  background: var(--pb-active);
  transform: scale(1.2);
}

.seg.loading .track {
  background: linear-gradient(90deg, var(--pb-color), var(--pb-active), var(--pb-color));
  background-size: 200% 100%;
  animation: loadingRipple 1.5s ease-in-out infinite;
}

.seg.loading .fill {
  display: none;
}

@keyframes loadingRipple {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .seg.loading .track {
    animation: none;
    background: var(--pb-active);
  }
}
`;
