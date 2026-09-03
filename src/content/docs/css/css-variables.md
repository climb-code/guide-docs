---
title: CSS Variables (Custom Properties)
description: Learn how to define, use, scope, and theme CSS custom properties with practical examples.
---

CSS variables, formally called **custom properties**, let you store a value once and reuse it throughout a stylesheet. They are especially useful for design tokens such as colors, spacing, fonts, and component settings.

## Define and use a variable

Custom-property names begin with two hyphens (`--`). Put shared values on `:root` so they are available to the whole document, then read them with `var()`.

```css
:root {
  --brand-color: #2563eb;
  --surface-color: #ffffff;
  --space-md: 1rem;
}

.button {
  background-color: var(--brand-color);
  color: var(--surface-color);
  padding: var(--space-md);
}
```

The browser substitutes `var(--brand-color)` with `#2563eb` when it calculates the button's styles.

## Use meaningful design tokens

Name a variable after its role rather than its current visual value. A name such as `--color-text` is easier to maintain than `--dark-gray`, because the color can change without renaming every reference.

```css
:root {
  --color-text: #1f2937;
  --color-muted-text: #6b7280;
  --color-border: #d1d5db;
  --radius-card: 0.75rem;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  color: var(--color-text);
}

.card__meta {
  color: var(--color-muted-text);
}
```

## Add a fallback value

`var()` accepts an optional second argument. The fallback is used when the referenced custom property is missing or invalid.

```css
.notice {
  border-left: 4px solid var(--notice-color, #f59e0b);
}
```

This lets a component have a sensible default while still allowing callers to customize it:

```css
.notice--success {
  --notice-color: #16a34a;
}

.notice--error {
  --notice-color: #dc2626;
}
```

## Understand scope and inheritance

Custom properties follow the normal CSS cascade. A value declared on an element is available to that element and its descendants, unless a closer declaration overrides it.

```html
<section class="pricing">
  <article class="plan">
    <h2>Starter</h2>
  </article>
</section>
```

```css
.pricing {
  --accent-color: #7c3aed;
}

.plan {
  border-top: 4px solid var(--accent-color);
}

.plan--featured {
  --accent-color: #db2777;
}
```

The regular plan gets purple, while a `.plan--featured` element gets pink. This local override does not change any elements outside that featured plan.

:::tip
Use `:root` for site-wide tokens and a component selector for values that should only affect that component and its children.
:::

## Create a light and dark theme

Variables make theme changes small and predictable: use semantic tokens in components, then replace only the token values for each theme.

```css
:root {
  color-scheme: light;
  --color-page: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color-page: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}

body {
  background: var(--color-page);
  color: var(--color-text);
}

.card {
  background: var(--color-surface);
}
```

When JavaScript changes the root element to `<html data-theme="dark">`, every component using these tokens updates automatically.

## Combine variables with calculations

Use custom properties inside `calc()`, gradients, transforms, and other CSS functions.

```css
:root {
  --base-space: 0.5rem;
  --sidebar-width: 16rem;
}

.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  gap: calc(var(--base-space) * 3);
}

.badge {
  --hue: 214;
  background: hsl(var(--hue) 85% 94%);
  color: hsl(var(--hue) 70% 28%);
}
```

The value must still make sense for the CSS property where it is used. For example, a variable containing `1rem` cannot be used as a color.

## Set values from JavaScript

JavaScript can update a custom property without adding or removing many CSS classes.

```js
const root = document.documentElement;

root.style.setProperty('--brand-color', '#ea580c');
```

For user input, validate the value before applying it. Prefer a small, known set of choices for important visual or layout settings.

## Custom properties vs Sass variables

Sass variables are replaced while Sass compiles the stylesheet. CSS custom properties remain in the browser, so they can inherit, respond to media queries, and change at runtime.

```css
:root {
  --content-width: 70rem;
}

@media (max-width: 48rem) {
  :root {
    --content-width: 100%;
  }
}

.content {
  width: var(--content-width);
}
```

Use CSS custom properties for values that benefit from the cascade or runtime changes. Build-time variables can still be useful for compile-time-only configuration.

## Common mistakes

- Forgetting the two hyphens when defining a property: write `--brand-color`, not `brand-color`.
- Using visual names such as `--blue` for a semantic role that may later change.
- Declaring every value globally when it only belongs to one component.
- Expecting a fallback to apply when a valid, but unsuitable, value was defined elsewhere.
- Storing a complete declaration in a variable; store the value and use it with the appropriate property instead.

## Key points

- Define custom properties with `--name` and read them with `var(--name)`.
- Use semantic names to create maintainable design tokens.
- Scope variables deliberately; closer declarations override inherited values.
- Use fallbacks for configurable components and variables for theme tokens.
- Custom properties are live browser values, so CSS and JavaScript can update them at runtime.
