---
title: CSS Performance Optimization
description: Write faster, more efficient CSS by understanding rendering, minimizing repaints, and reducing layout work.
---

CSS has a direct impact on how fast a page renders and responds to user interaction. Understanding how browsers process CSS lets you avoid common bottlenecks and write styles that paint quickly and animate smoothly.

## How browsers render CSS

When a browser parses your HTML it builds a DOM tree. It then parses your CSS and builds a CSSOM (CSS Object Model). These two trees are combined into a render tree, which is used to calculate layout, paint pixels, and composite layers.

There are three rendering stages that can be triggered by a style change:

| Stage | What it does | Cost |
| --- | --- | --- |
| **Layout** | Calculates position and size of every element | Most expensive |
| **Paint** | Fills pixels with color, text, shadows, etc. | Moderate |
| **Composite** | Combines layers onto the screen | Cheapest |

Triggering layout (also called reflow) forces the browser to recalculate positions for potentially the entire document. Targeting the composite stage only is the goal for smooth animations.

## Prefer transform and opacity for animations

`transform` and `opacity` are composited by the browser and do not trigger layout or paint.

```css
/* ✅ Animates on the compositor — smooth */
.button:hover {
  transform: scale(1.05);
  opacity: 0.9;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* ❌ Triggers layout — causes jank */
.button:hover {
  width: 110%;
  margin-left: -5%;
}
```

Animating `width`, `height`, `top`, `left`, `margin`, or `padding` forces layout recalculations on every frame.

## Promote elements to their own layer

Adding `will-change` tells the browser to promote an element to its own compositor layer ahead of time, avoiding the cost of promotion during animation.

```css
.animated-card {
  will-change: transform;
}
```

Use `will-change` sparingly. Each layer uses GPU memory, and overusing it wastes resources. Remove `will-change` after an animation completes when possible.

```css
.card {
  will-change: auto; /* reset after animation */
}
```

## Reduce selector complexity

The browser matches selectors right-to-left. A deeply nested or overly specific selector causes more work during style calculation.

```css
/* ❌ Complex — browser checks many ancestors */
nav ul li a.active span {
  color: blue;
}

/* ✅ Simple — one class to match */
.nav-link-active-text {
  color: blue;
}
```

Keep selectors short and flat. Prefer class selectors over tag or attribute selectors for frequently matched elements.

## Minimize layout-triggering properties

Avoid reading layout-dependent properties (`offsetWidth`, `getBoundingClientRect`) immediately after writing styles in JavaScript. This forces the browser to flush pending layout updates — called a forced synchronous layout or layout thrashing.

In pure CSS, avoid toggling properties that resize elements inside loops or `:hover` states that affect many siblings.

## Use contain to isolate layout

The `contain` property tells the browser that an element's subtree is independent of the rest of the page, allowing it to skip recalculating other parts of the document when the element changes.

```css
.widget {
  contain: layout style;
}
```

| Value | Effect |
| --- | --- |
| `layout` | Changes inside do not affect outside layout |
| `style` | Counters and quotes are scoped |
| `paint` | Content does not render outside the box |
| `size` | Element's size does not depend on children |
| `content` | Shorthand for `layout paint style` |
| `strict` | Shorthand for `layout paint style size` |

## content-visibility for off-screen content

`content-visibility: auto` skips rendering work for elements outside the viewport. The browser still reserves the element's space using `contain-intrinsic-size`.

```css
.article-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* estimated height */
}
```

This can dramatically reduce initial render time for long pages by deferring work until each section scrolls into view.

## Efficient use of CSS custom properties

Custom properties (CSS variables) do not trigger layout when changed — only the properties that use them do. Grouping theme changes onto a single root variable update is more efficient than updating many individual properties.

```css
:root {
  --accent: #3b82f6;
}

/* Changing --accent once updates all uses */
.button { background: var(--accent); }
.link   { color: var(--accent); }
```

## Reduce unused CSS

Unused CSS forces the browser to parse and store rules that are never applied. Tools like PurgeCSS or built-in bundler tree-shaking remove selectors that don't match any element in your HTML.

Split large stylesheets and load only what each page needs using `<link media="...">` or dynamic imports.

## Critical CSS

Inline the CSS required to render above-the-fold content directly in the `<head>`. This unblocks the first paint without waiting for an external stylesheet to download.

```html
<style>
  /* critical above-the-fold styles */
  body { margin: 0; font-family: system-ui; }
  .hero { display: flex; min-height: 100vh; }
</style>
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
```

## Key takeaways

- Animate only `transform` and `opacity` for smooth, compositor-only animations.
- Use `will-change` carefully — only on elements that will actually animate.
- Keep selectors short and flat to reduce style calculation time.
- Use `contain` to isolate independent widgets from the rest of the layout.
- Use `content-visibility: auto` to skip rendering work for off-screen sections.
- Remove unused CSS and inline critical styles to speed up first paint.
