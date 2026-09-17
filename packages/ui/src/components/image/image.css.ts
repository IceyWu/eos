import { EOS_THEME_TOKENS } from "../../styles/tokens.css";

export const IMAGE_STYLES = `
${EOS_THEME_TOKENS}

:host {
  display: inline-block;
  position: relative;
  overflow: hidden;
  min-width: 100px;
  min-height: 100px;
  border-radius: 12px;
  background: var(--eos-color-surface-secondary);
  color: var(--eos-color-foreground-muted);
  vertical-align: middle;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  animation: eos-image-fade-in 300ms cubic-bezier(0.2, 0, 0, 1);
}

.placeholder-image {
  filter: blur(8px);
  transform: scale(1.08);
}

:host([placeholder-fill]) .placeholder-image {
  position: absolute;
  z-index: 1;
  object-fit: cover !important;
  filter: blur(8px);
  transform: scale(1.08);
}

:host([placeholder-fill]) .main-image {
  position: absolute;
  z-index: 2;
}

.loading-container,
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.loading-container.overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: color-mix(in srgb, var(--eos-color-surface) 70%, transparent);
}

.default-loading,
.default-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--eos-color-foreground-muted);
  font: 400 14px/20px var(--eos-font-family);
  text-align: center;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--eos-color-border);
  border-top-color: var(--eos-color-accent);
  border-radius: 50%;
  animation: eos-image-spin 700ms linear infinite;
}

.error-icon {
  width: 32px;
  height: 32px;
  color: var(--eos-color-foreground-muted);
}

:host([responsive]) .image {
  max-width: 100%;
  height: auto;
}

:host([circle]),
:host([circle]) .image {
  border-radius: 50%;
}

.hidden {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .image,
  .spinner {
    animation: none;
  }
}

@keyframes eos-image-spin {
  to { transform: rotate(360deg); }
}

@keyframes eos-image-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
