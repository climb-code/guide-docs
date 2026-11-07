---
title: CSS Nesting
description: Write related CSS rules inside a parent selector to keep component styles organized.
---

CSS nesting lets you place selectors inside another rule. The nested selector is combined with the parent selector, which can keep styles for one component together.

## Nest a child selector

Write a nested selector directly inside its parent:

```css
.card {
  padding: 1rem;
  border: 1px solid #d1d5db;

  .card-title {
    margin: 0;
    font-size: 1.25rem;
  }
}
```

This is equivalent to `.card .card-title`. The nested selector targets descendants of the parent.

## Use the nesting selector

Use `&` when the nested selector needs to refer to the parent itself, such as for a modifier or pseudo-class:

```css
.button {
  background: #2563eb;
  color: white;

  &:hover {
    background: #1d4ed8;
  }

  &.button--quiet {
    background: transparent;
    color: #1d4ed8;
  }
}
```

Here, `&:hover` becomes `.button:hover`, and `&.button--quiet` becomes `.button.button--quiet`.

## Group related rules

Nesting also works with at-rules, which can keep responsive or state-specific styles near the component:

```css
.card {
  display: grid;
  gap: 1rem;

  @media (min-width: 48rem) {
    grid-template-columns: 1fr 2fr;
  }
}
```

## Keep nesting shallow

Deeply nested selectors can become difficult to understand and may create overly specific selectors. Keep nesting to a small number of levels and avoid using it to mirror every layer of your HTML.

## Key points

- Nested selectors are combined with their parent selector.
- Use `&` to refer explicitly to the parent selector.
- Nesting can group component rules and at-rules together.
- Keep nesting shallow so selectors stay readable and predictable.
