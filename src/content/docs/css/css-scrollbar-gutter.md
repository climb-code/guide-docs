---
title: CSS Scrollbar Gutter
description: Reserve space for scrollbars to prevent page content from shifting when an element becomes scrollable.
---

When a page gains a vertical scrollbar, the available content width can shrink and cause the layout to shift. The `scrollbar-gutter` property can reserve space for a scrollbar before it appears.

## Keep the layout from shifting

Set `scrollbar-gutter: stable` on the scroll container. For the page, apply it to the root element:

```css
html {
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

The browser reserves a gutter when the element uses classic scrollbars, even while the content does not overflow. When the scrollbar appears, it occupies that reserved space instead of reducing the content width unexpectedly.

## Center content consistently

With `stable`, the reserved gutter is placed on the inline end. Add `both-edges` to reserve matching space on both sides, which can keep centered content visually centered:

```css
html {
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
}
```

## Important details

- The property applies to a scroll container and does not itself make content scrollable.
- Overlay scrollbars do not take up layout space, so there may be no visible gutter to reserve.
- Use `overflow-y: auto` when a scrollbar should appear only if needed; use `overflow-y: scroll` when it should always be shown.
- Check the result on platforms with both classic and overlay scrollbars.

## Key points

- `scrollbar-gutter: stable` helps avoid horizontal layout shifts when classic scrollbars appear.
- `stable both-edges` reserves matching space on both inline sides.
- The effect depends on the platform's scrollbar behavior and the element's overflow settings.
