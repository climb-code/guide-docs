---
title: Responsive Web Design
description: Learn how to create CSS layouts that adapt to different screens, user preferences, and input methods.
---

Responsive web design makes a page usable across phones, tablets, laptops, and large displays. It uses flexible layouts, responsive media, and targeted media queries instead of separate versions of a site for each device.

## Start with the viewport

Every responsive page should include this tag in its HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

It tells mobile browsers to use the device width when calculating the page viewport.

## Use a mobile-first approach

Write the base styles for small screens, then enhance the layout when more space is available.

```css
.navigation {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 48rem) {
  .navigation {
    grid-template-columns: repeat(4, auto);
    justify-content: end;
  }
}
```

This approach keeps the default layout simple and makes larger-screen changes explicit.

## Build flexible layouts

Prefer flexible sizing over fixed widths.

```css
.container {
  width: min(100% - 2rem, 70rem);
  margin-inline: auto;
}
```

The container leaves `1rem` of space on both sides of small screens and never grows beyond `70rem` on large screens.

For columns, use Grid or Flexbox with flexible values:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
```

## Make media scale safely

Images, videos, and other embedded media should not overflow their containers.

```css
img,
video,
iframe {
  max-width: 100%;
}

img,
video {
  height: auto;
}
```

For images that fill a fixed visual area, use `object-fit`:

```css
.card-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}
```

Always provide meaningful `alt` text for informative images.

## Choose breakpoints by content

Breakpoints should respond to the point where content no longer fits well—not to a specific phone model.

```css
@media (min-width: 40rem) {
  .article-layout {
    grid-template-columns: 12rem minmax(0, 1fr);
  }
}

@media (min-width: 72rem) {
  .article-layout {
    grid-template-columns: 16rem minmax(0, 1fr) 14rem;
  }
}
```

Use `min-width` queries for mobile-first styles. Use `max-width` queries when a specific layout must change below a limit.

## Use responsive typography

Relative units and `clamp()` make text scale smoothly while preserving sensible bounds.

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
}

p {
  max-width: 65ch;
}
```

The heading never becomes smaller than `2rem` or larger than `4rem`. Limiting line length with `ch` improves readability for body text.

## Respect user preferences

Media features let you adapt to preferences such as reduced motion, dark color schemes, and increased contrast.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    transition-duration: 0.01ms;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
```

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    background: #111827;
    color: #f9fafb;
  }
}
```

These preferences complement—rather than replace—an accessible theme control when your site provides one.

## Design for input methods

Not every visitor uses a mouse. Ensure interactive controls have a comfortable target size and a visible keyboard focus state.

```css
button,
a {
  min-height: 2.75rem;
}

:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}
```

Use hover effects as an enhancement, not the only way to reveal information or controls.

## Container queries

Container queries adapt a component to the space given by its parent, rather than the entire viewport.

```css
.card-list {
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .card {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1rem;
  }
}
```

They are especially useful for reusable components that appear in different parts of a layout.

## Test responsive layouts

Test pages at narrow, medium, and wide widths. Also check:

- Browser zoom at 200%.
- Long headings, translated text, and empty states.
- Keyboard navigation and visible focus.
- Touch-sized controls on small screens.
- Reduced-motion and dark-mode preferences.

## Common mistakes

- Hiding content on mobile instead of reorganizing it.
- Using only fixed pixel widths.
- Choosing breakpoints based only on popular device sizes.
- Letting images or code blocks cause horizontal scrolling.
- Removing focus outlines without providing a clear replacement.
- Treating responsive design as visual resizing rather than usability across contexts.

## Key points

- Start with a correct viewport tag and small-screen base styles.
- Use flexible units, Grid, Flexbox, and fluid media.
- Add breakpoints where the content needs them.
- Respect preferences and support keyboard and touch input.
- Test real content at many widths and zoom levels.
