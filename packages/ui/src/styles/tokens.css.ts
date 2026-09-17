/**
 * EOS semantic theme tokens.
 *
 * Public roles are separated from component aliases so host applications can
 * theme components without knowing the Shadow DOM implementation details.
 * The component-local aliases keep Shadow DOM styles readable and allow a host
 * application to override the public tokens without knowing implementation
 * details.
 */
export const EOS_THEME_TOKENS = `
:host {
  /* Primitive palette: values, never consumed directly by component rules. */
  --eos-palette-blue-600: #006fee;
  --eos-palette-purple-600: #8e4ec6;
  --eos-palette-green-600: #17c964;
  --eos-palette-amber-600: #f5a524;
  --eos-palette-red-600: #d92d30;

  /* Semantic layer: roles, not appearances. */
  --eos-color-accent: var(--accent-accent, var(--eos-palette-blue-600));
  --eos-color-accent-foreground: var(--accent-accent-foreground, #fcfcfc);
  --eos-color-accent-hover: var(--accent-accent-hover, #338af3);
  --eos-color-accent-soft: var(--accent-accent-soft, rgba(0, 111, 238, 0.14));
  --eos-color-accent-soft-foreground: var(--accent-accent-soft-foreground, #005bc4);
  --eos-color-secondary: var(--secondary-secondary, var(--eos-palette-purple-600));
  --eos-color-secondary-foreground: var(--secondary-secondary-foreground, #fcfcfc);
  --eos-color-secondary-hover: var(--secondary-secondary-hover, #a66be0);
  --eos-color-success: var(--success-success, var(--eos-palette-green-600));
  --eos-color-success-foreground: var(--success-success-foreground, #062a16);
  --eos-color-success-hover: var(--success-success-hover, #35d578);
  --eos-color-warning: var(--warning-warning, var(--eos-palette-amber-600));
  --eos-color-warning-foreground: var(--warning-warning-foreground, #3b2500);
  --eos-color-warning-hover: var(--warning-warning-hover, #f7b84b);
  --eos-color-border: var(--border, #dedee0);
  --eos-color-surface: var(--surface-surface, #ffffff);
  --eos-color-default: var(--default-default, #ebebec);
  --eos-color-default-foreground: var(--default-default-foreground, #18181b);
  --eos-color-default-hover: var(--default-default-hover, #e1e1e2);
  --eos-color-surface-secondary: var(--surface-surface-secondary, #efeff0);
  --eos-color-foreground: var(--foreground-foreground, #18181b);
  --eos-color-foreground-muted: var(--foreground-muted, #71717a);
  --eos-color-danger: var(--danger-danger, var(--eos-palette-red-600));
  --eos-color-danger-foreground: var(--danger-danger-foreground, #fcfcfc);
  --eos-color-danger-hover: var(--danger-danger-hover, #e84a4d);
  --eos-color-danger-soft: var(--danger-danger-soft, rgba(217, 45, 48, 0.14));
  --eos-color-danger-soft-foreground: var(--danger-danger-soft-foreground, #8e2528);
  --eos-color-focus-ring: var(--focus-ring, var(--eos-palette-blue-600));
  --eos-font-family: var(--font-family, Inter, sans-serif);
}

:host([data-eos-theme="dark"]) {
  --eos-color-surface: #18181b;
  --eos-color-foreground: #fcfcfc;
  --eos-color-foreground-muted: #a1a1aa;
  --eos-color-border: #28282c;
  --eos-color-default: #27272a;
  --eos-color-default-foreground: #fcfcfc;
  --eos-color-default-hover: #2e2e31;
  --eos-color-surface-secondary: #232325;
  --eos-color-danger: #d92d30;
  --eos-color-danger-hover: #e84a4d;
  --eos-color-danger-soft: rgba(217, 45, 48, 0.14);
  --eos-color-danger-soft-foreground: #f17a7a;
  --eos-color-secondary: #9750dd;
  --eos-color-secondary-hover: #a66be0;
}

:host([data-eos-theme="light"]) {
  --eos-color-surface: #ffffff;
  --eos-color-foreground: #18181b;
  --eos-color-foreground-muted: #71717a;
  --eos-color-border: #dedee0;
  --eos-color-default: #ebebec;
  --eos-color-default-foreground: #18181b;
  --eos-color-default-hover: #e1e1e2;
  --eos-color-surface-secondary: #efeff0;
}
`;
