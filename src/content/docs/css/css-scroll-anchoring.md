---
title: CSS Scroll Anchoring
description: Understand how scroll anchoring keeps content in view when layout changes, and when to opt out with overflow-anchor.
---

When content is inserted or resized above the visible part of a scroll container, the browser can adjust the scroll position to keep the content the user was reading in view. This behavior is called **scroll anchoring**.

## Why scroll anchoring helps

Consider an article where an image above the current reading position loads after the page has already been scrolled. Without scroll anchoring, the new image can push the visible text down. Scroll anchoring compensates for layout changes above the viewport so the reader can continue from roughly the same place.

The browser chooses an anchor node in the visible area and adjusts the scroll position as layout changes. In most pages, this behavior works automatically and needs no CSS.

## Opt out of anchoring

Use `overflow-anchor: none` on a scroll container or a region where automatic adjustments interfere with an intentional interaction:

```css
live-log {
  display: block;
  max-height: 20rem;
  overflow: auto;
  overflow-anchor: none;
}
```

For example, an application that deliberately manages a live log's scroll position may opt out so browser adjustments do not compete with that behavior. Keep the opt-out scoped to the affected area where possible.

## Keep anchoring enabled by default

Disabling scroll anchoring globally can make pages jump when content above the viewport changes. Only opt out after reproducing a specific conflict, and test both when the user is near the top of a scroll area and when they are reading farther down.

```css
/* Scope the opt-out to a widget that manages its own scroll position. */
.virtualized-log {
  overflow-anchor: none;
}
```

`overflow-anchor` support varies between browsers. Check the browsers you support before relying on it; the browser's normal scroll behavior remains the fallback where the property is unsupported.

## Key takeaways

- Scroll anchoring helps keep visible content in place when layout changes above it.
- Browsers handle anchoring automatically for typical scrolling pages.
- `overflow-anchor: none` opts a region out; use it sparingly and scope it to a demonstrated conflict.

See [MDN's scroll anchoring guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_anchoring) for more detail.
