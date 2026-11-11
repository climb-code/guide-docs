---
title: CSS Architecture and Naming
description: Organize stylesheets with reusable components, predictable class names, and low-specificity rules.
---

CSS architecture is the way a project organizes its styles so they remain understandable as the site grows. A few consistent conventions make it easier to find rules, reuse components, and change one part of a page without surprising another.

## Keep styles scoped to components

Prefer classes that describe a component or its purpose over broad selectors that affect every matching element.

```css
/* Broad: may affect unrelated buttons across the site. */
button {
  padding: 0.75rem 1rem;
}

/* Scoped: applies to buttons belonging to this component. */
.product-card__button {
  padding: 0.75rem 1rem;
}
```

Element selectors are still useful for sensible defaults, such as setting the page font or heading margins. Use component classes for styles that should apply only in a particular part of the interface.

## Use clear, consistent class names

Choose names that describe what an element is or does, rather than how it currently looks.

```html
<article class="product-card">
  <h2 class="product-card__title">Travel mug</h2>
  <p class="product-card__description">Keeps drinks warm on the go.</p>
  <button class="product-card__button">Add to cart</button>
</article>
```

The example uses a BEM-inspired convention: `component__part` identifies a part of a component. A modifier can represent a variant, such as `.product-card--featured`. BEM is one option, not a CSS requirement; consistency matters more than the specific naming scheme.

## Keep specificity predictable

Prefer a single class selector for component styles. Deeply nested selectors are harder to override and can tie styles to a particular HTML structure.

```css
/* Easier to reuse and override. */
.product-card__title {
  font-size: 1.25rem;
}

/* More tightly coupled to the current markup. */
.catalog main article h2 {
  font-size: 1.25rem;
}
```

Avoid using IDs for styling and reach for `!important` only when there is a specific reason. Low-specificity rules work well with the cascade and are easier to maintain.

## Share design values with custom properties

Put repeated colors, spacing, and other design values in custom properties. This gives the project a small set of values that can be updated consistently.

```css
:root {
  --color-accent: #2563eb;
  --space-card: 1rem;
  --radius-card: 0.75rem;
}

.product-card {
  padding: var(--space-card);
  border-radius: var(--radius-card);
}

.product-card__button {
  background: var(--color-accent);
}
```

Read more about [CSS custom properties](/css/css-variables).

## Organize stylesheets by responsibility

For a small project, one stylesheet with clear sections may be enough. As it grows, split styles by component or feature, and keep global rules such as resets and typography separate from component rules. Use your build tool or framework's supported import system to combine files when needed.

## Practical guidelines

- Use a consistent naming convention for classes.
- Keep each component's styles close together and easy to locate.
- Prefer reusable classes over repeated inline styles.
- Keep selector specificity low and avoid unnecessary nesting.
- Remove unused rules as components change.
- Use CSS custom properties for values shared across components.

These conventions make CSS easier to extend while leaving room to choose the structure that fits the project.
