---
title: CSS Environment Variables
description: Use env() and browser-provided CSS values to keep content clear of safe areas and device interface elements.
---

CSS environment variables expose values supplied by the browser or operating system. The `env()` function is especially useful for keeping fixed controls clear of notches, rounded screen edges, and other interface areas that can cover page content.

## Add safe-area padding

The `safe-area-inset-*` variables describe the space between the viewport edges and the rectangle where content is safe to display. Add them to ordinary spacing so the design still has breathing room on devices where the inset is zero:

```css
.bottom-toolbar {
  position: fixed;
  inset-inline: 0;
  inset-block-end: 0;
  padding: 0.75rem 1rem;
  padding-block-end: calc(0.75rem + env(safe-area-inset-bottom, 0px));
  background: white;
}
```

The fallback after the comma is used if that particular environment variable is unavailable. On devices without a bottom inset, the browser-provided value is normally `0px`, so the regular `0.75rem` padding remains.

When an iOS page intentionally extends to the screen edges, declare `viewport-fit=cover` in the document head and use the insets to protect important controls:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Only opt into the full viewport when the layout handles the safe area. Keep content and controls inside the padded area so they are not hidden by device cutouts.

## Apply insets to all edges

Add the physical left and right insets, along with the block-edge insets, around a full-screen interface:

```css
.app-shell {
  min-height: 100vh;
  padding-block-start: calc(1rem + env(safe-area-inset-top, 0px));
  padding-block-end: calc(1rem + env(safe-area-inset-bottom, 0px));
  padding-left: calc(1rem + env(safe-area-inset-left, 0px));
  padding-right: calc(1rem + env(safe-area-inset-right, 0px));
}
```

Avoid replacing normal spacing with an inset value. The `calc()` expressions add the device-specific inset to the spacing the design already needs.

## Environment variables and custom properties

Environment variables and custom properties both work with CSS values, but they have different owners:

- `env(safe-area-inset-bottom)` reads a browser-provided, read-only value that is globally available.
- `var(--page-gutter)` reads an author-defined custom property that can be scoped, inherited, and changed by your styles.

You can combine them when a component has a shared spacing token:

```css
:root {
  --page-gutter: 1rem;
}

.bottom-toolbar {
  padding-left: calc(var(--page-gutter) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter) + env(safe-area-inset-right, 0px));
}
```

## Other environment values

The `env()` function also supports values for specific contexts, such as viewport segments on some foldable devices and title-bar dimensions for desktop apps using a window-controls overlay. These variables are only useful when the browser and relevant device or app feature expose them. Check each variable's support separately rather than assuming that support for `env()` means every environment variable exists.

## Browser support and testing

`env()` and safe-area insets are broadly supported in modern browsers, but the values depend on the device, browser UI, and page configuration. Some specialized variables have narrower support. Test fixed headers and footers on real target devices or browser emulators, and ensure the page remains usable when the values are zero or unavailable.

## Key points

- Use `env(safe-area-inset-*, fallback)` to account for browser-provided safe areas.
- Add insets to the design's normal padding instead of using them as the only spacing.
- `viewport-fit=cover` is useful for edge-to-edge pages when paired with safe-area padding.
- Environment variables are read-only browser values; custom properties are author-defined values.
- Support for individual environment variables can differ even when `env()` itself is available.
