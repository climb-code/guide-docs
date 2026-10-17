---
title: CSS Scrollbar Styling
description: Style scrollbar color and width with standard CSS while keeping scrolling discoverable and accessible.
---

CSS provides a small set of properties for scrollbar appearance. Scrollbar rendering depends on the operating system, browser, input device, and user preferences, so treat styling as progressive enhancement rather than a fixed-size layout tool.

## Set the scrollbar color

Use `scrollbar-color` to set the thumb and track colors, in that order.

```css
.results {
  overflow: auto;
  scrollbar-color: #64748b #e2e8f0;
}
```

The browser may adjust colors to preserve contrast or follow forced-colors settings. `scrollbar-color: auto` restores the platform's default colors.

## Choose a width

`scrollbar-width` accepts `auto`, `thin`, or `none`:

```css
.compact-list {
  overflow: auto;
  scrollbar-width: thin;
}
```

Avoid `none` for content that requires scrolling. Hiding the scrollbar can make overflow difficult to discover, especially for users who rely on a mouse or have limited scrolling experience.

## Use a WebKit scrollbar fallback when needed

Some browsers also support non-standard `::-webkit-scrollbar` pseudo-elements. Keep the standard properties first and scope the fallback to the specific scroll container.

```css
.code-panel {
  overflow: auto;
  scrollbar-color: #94a3b8 #1e293b;
  scrollbar-width: thin;
}

.code-panel::-webkit-scrollbar {
  width: 0.75rem;
  height: 0.75rem;
}

.code-panel::-webkit-scrollbar-track {
  background: #1e293b;
}

.code-panel::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border: 2px solid #1e293b;
  border-radius: 999px;
}
```

Do not assume that the pseudo-elements control every browser, and avoid relying on exact scrollbar dimensions. Overlay scrollbars may not reserve layout space.

## Respect user settings

Increased contrast and forced-colors modes can replace author colors. Let the platform choose accessible colors when it requests them:

```css
@media (forced-colors: active) {
  .results,
  .code-panel {
    scrollbar-color: auto;
  }
}
```

Use colors with sufficient contrast, keep scrollable regions visibly scrollable, and make sure content remains reachable with keyboard and touch input.

## Practical guidelines

- Prefer subtle color changes over removing or dramatically shrinking scrollbars.
- Scope styling to a component instead of changing every scrollbar globally.
- Do not size layout around a presumed scrollbar width.
- Test with keyboard, touch, high contrast, and forced-colors settings.
- Preserve overflow behavior; scrollbar styling does not replace `overflow` management.

## Key takeaways

- `scrollbar-color` styles the thumb and track; `scrollbar-width` sets a broad width choice.
- Platform conventions and user settings can override scrollbar appearance.
- WebKit pseudo-elements are non-standard and should be optional fallbacks.
- Keep scrolling discoverable and accessible.
