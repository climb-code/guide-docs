---
title: CSS Media Queries
description: Apply CSS conditionally based on viewport size, device capabilities, and user preferences.
---

Media queries let stylesheets respond to properties of the browser environment. They are commonly used for responsive layouts, but can also adapt a page for printing, reduced motion, dark color schemes, and different input devices.

## Write a media query

Use an `@media` rule to apply styles only when its condition matches:

```css
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

The base rule works at every width. At `48rem` and above, the grid switches to two columns. This mobile-first pattern keeps the small-screen layout as the default.

## Combine conditions

Write multiple features in one query to require all of them. The `and` keyword combines conditions:

```css
@media (min-width: 48rem) and (orientation: landscape) {
  .toolbar {
    position: sticky;
    top: 0;
  }
}
```

Separate queries with commas to match either condition:

```css
@media (max-width: 30rem), (orientation: portrait) {
  .sidebar {
    display: none;
  }
}
```

Here the sidebar is hidden when the viewport is narrow or in portrait orientation.

## Use range syntax

Modern media queries support comparison operators, which can make ranges easier to read:

```css
@media (30rem <= width <= 70rem) {
  .page {
    padding-inline: 2rem;
  }
}
```

This matches widths from `30rem` through `70rem`. The equivalent traditional form is:

```css
@media (min-width: 30rem) and (max-width: 70rem) {
  .page {
    padding-inline: 2rem;
  }
}
```

## Adapt to capabilities and preferences

Media features can describe more than screen dimensions. For example, `hover` and `pointer` let you tailor interactions to the available input:

```css
@media (hover: hover) and (pointer: fine) {
  .menu-link:hover {
    text-decoration: underline;
  }
}
```

Use preference features to respect operating-system settings:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
```

Common preference features include `prefers-color-scheme`, `prefers-reduced-motion`, and `prefers-contrast`. Keep important content available in each mode, and provide a site-level theme control when users need to override their system preference.

## Create print styles

Use the `print` media type to remove interface elements and improve document readability on paper:

```css
@media print {
  nav,
  .button,
  .cookie-banner {
    display: none;
  }

  body {
    color: #000;
    background: #fff;
    font-size: 12pt;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
}
```

Test print styles with the browser's print preview. A page that looks correct on screen can paginate differently on paper.

## Practical guidelines

- Choose breakpoints where the content needs a layout change, rather than targeting specific device models.
- Prefer a small number of clear conditions over many narrow breakpoints.
- Keep the default styles useful when a query does not match.
- Test keyboard, touch, print, and preference modes when the page supports them.
- Use container queries when a component should respond to its own available space instead of the viewport.

## Key points

- `@media` applies styles when environment conditions match.
- Combine conditions with `and`, or separate alternatives with commas.
- Width, orientation, input capabilities, print output, and user preferences can all be queried.
- Start with usable default styles, then add focused conditional changes.

## Next topic

Continue with **Responsive Web Design** to combine media queries with fluid layouts, responsive media, and breakpoints.
