import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const BUTTON_STYLES = `
${EOS_THEME_TOKENS}

:host {
  display: inline-flex;
  vertical-align: middle;
  --eos-button-color: var(--eos-color-accent);
  --eos-button-color-foreground: var(--eos-color-accent-foreground);
  --eos-button-color-hover: var(--eos-color-accent-hover);
}

:host([color="default"]) {
  --eos-button-color: var(--eos-color-default);
  --eos-button-color-foreground: var(--eos-color-default-foreground);
  --eos-button-color-hover: var(--eos-color-default-hover);
}

:host([color="secondary"]) {
  --eos-button-color: var(--eos-color-secondary);
  --eos-button-color-foreground: var(--eos-color-secondary-foreground);
  --eos-button-color-hover: var(--eos-color-secondary-hover);
}

:host([color="success"]) {
  --eos-button-color: var(--eos-color-success);
  --eos-button-color-foreground: var(--eos-color-success-foreground);
  --eos-button-color-hover: var(--eos-color-success-hover);
}

:host([color="warning"]) {
  --eos-button-color: var(--eos-color-warning);
  --eos-button-color-foreground: var(--eos-color-warning-foreground);
  --eos-button-color-hover: var(--eos-color-warning-hover);
}

:host([color="danger"]) {
  --eos-button-color: var(--eos-color-danger);
  --eos-button-color-foreground: var(--eos-color-danger-foreground);
  --eos-button-color-hover: var(--eos-color-danger-hover);
}

:host([full-width]) {
  display: flex;
  width: 100%;
}

button {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 36px;
  height: 36px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 24px;
  font: 500 14px/20px var(--eos-font-family);
  letter-spacing: 0;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1), border-color 150ms cubic-bezier(0.2, 0, 0, 1), color 150ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms cubic-bezier(0.2, 0, 0, 1), transform 150ms cubic-bezier(0.2, 0, 0, 1);
}

button:active:not(:disabled) {
  transform: scale(0.96);
}

:host([size="sm"]) button {
  height: 32px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
}

:host([size="lg"]) button {
  height: 40px;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 20px;
}

:host(:not([variant])) button,
:host([variant="primary"]) button {
  background: var(--eos-button-color);
  color: var(--eos-button-color-foreground);
}

:host(:not([variant])) button:hover:not(:disabled),
:host([variant="primary"]) button:hover:not(:disabled) {
  background: var(--eos-button-color-hover);
}

:host([variant="solid"]) button {
  background: var(--eos-button-color);
  color: var(--eos-button-color-foreground);
}

:host([variant="solid"]) button:hover:not(:disabled) {
  background: var(--eos-button-color-hover);
}

:host([variant="bordered"]) button {
  border-color: var(--eos-button-color);
  color: var(--eos-button-color);
}

:host([variant="bordered"]) button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--eos-button-color) 12%, transparent);
}

:host([variant="light"]) button,
:host([variant="flat"]) button {
  background: color-mix(in srgb, var(--eos-button-color) 12%, transparent);
  color: var(--eos-button-color);
}

:host([variant="light"]) button:hover:not(:disabled),
:host([variant="flat"]) button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--eos-button-color) 20%, transparent);
}

:host([variant="secondary"]) button {
  background: var(--eos-color-default);
  color: var(--eos-color-default-foreground);
}

:host([variant="secondary"]) button:hover:not(:disabled),
:host([variant="tertiary"]) button:hover:not(:disabled) {
  background: var(--eos-color-default-hover);
}

:host([variant="tertiary"]) button {
  background: var(--eos-color-surface-secondary);
  color: var(--eos-color-default-foreground);
}

:host([variant="outline"]) button {
  border-color: var(--eos-color-border);
  background: transparent;
  color: var(--eos-color-default-foreground);
}

:host([variant="outline"]) button:hover:not(:disabled) {
  border-color: var(--eos-color-accent);
  color: var(--eos-color-accent);
}

:host([variant="ghost"]) button {
  background: transparent;
  color: var(--eos-color-default-foreground);
}

:host([variant="ghost"]) button:hover:not(:disabled) {
  background: var(--eos-color-accent-soft);
  color: var(--eos-color-accent-soft-foreground);
}

:host([variant="ghost"][color]) button {
  color: var(--eos-button-color);
}

:host([variant="ghost"][color]) button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--eos-button-color) 12%, transparent);
  color: var(--eos-button-color);
}

:host([variant="danger"]) button {
  background: var(--eos-color-danger);
  color: var(--eos-color-danger-foreground);
}

:host([variant="danger"]) button:hover:not(:disabled) {
  background: var(--eos-color-danger-hover);
}

:host([variant="dangerSoft"]) button {
  background: var(--eos-color-danger-soft);
  color: var(--eos-color-danger-soft-foreground);
}

:host([variant="dangerSoft"]) button:hover:not(:disabled) {
  background: var(--eos-color-danger-soft);
  color: var(--eos-color-danger-hover);
}

button:focus-visible {
  outline: 2px solid var(--eos-color-focus-ring);
  outline-offset: 2px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

:host([icon-only]) button {
  width: 36px;
  padding: 0;
  gap: 0;
}

:host([icon-only]) button > span[part="content"] {
  display: none;
}

:host([icon-only]) button > slot[name="start"] {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  margin: 0;
}

:host([size="sm"][icon-only]) button { width: 32px; }
:host([size="lg"][icon-only]) button { width: 40px; }

::slotted([slot="start"]),
::slotted([slot="end"]) {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  align-items: center;
  justify-content: center;
}

::slotted(svg) {
  width: 100%;
  height: 100%;
}

.eos-button__spinner {
  width: 12px;
  height: 12px;
  border: 1.5px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: eos-button-spin 600ms linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  button {
    transition: none;
  }

  button:active:not(:disabled) {
    transform: none;
  }

  .eos-button__spinner {
    animation: none;
  }
}

@keyframes eos-button-spin { to { transform: rotate(360deg); } }
`;
