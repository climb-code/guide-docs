---
title: CSS Color Schemes
description: Use the color-scheme property and prefers-color-scheme media query to support light and dark interfaces.
---

CSS can adapt an interface to a user's preferred light or dark appearance. The `color-scheme` property tells the browser which schemes an element supports, while the `prefers-color-scheme` media query lets you customize your own styles.

## Tell the browser which schemes are supported

Set `color-scheme` on the document to let browser-rendered controls, scrollbars, and other interface elements use an appropriate appearance:

```css
:root {
  color-scheme: light dark;
}
```

The order does not force a preference. It lists the schemes the page supports, and the browser can choose according to the user's preference. Use `only` when a scheme must be enforced:

```css
:root {
  color-scheme: only light;
}
```

Enforcing a scheme can override user preferences, so reserve it for interfaces that cannot safely support another appearance.

## Style for the user's preference

Use `prefers-color-scheme` to change page colors and other authored styles:

```css
:root {
  color-scheme: light dark;
  --page-background: white;
  --page-text: #202124;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page-background: #202124;
    --page-text: #f1f3f4;
  }
}

body {
  background: var(--page-background);
  color: var(--page-text);
}
```

The media query follows the operating system or browser preference. If the page also offers its own theme control, apply that choice through a class or data attribute and define how it takes precedence over the media query.

## Set a scheme for part of a page

An element can declare a supported scheme independently. This helps native controls inside a component match its appearance:

```css
.dark-panel {
  color-scheme: dark;
  background: #202124;
  color: white;
}
```

## Key points

- `color-scheme` informs browser-rendered UI about the schemes an element supports.
- `prefers-color-scheme` lets authored styles respond to the user's preference.
- Declare supported schemes and choose accessible foreground and background colors for each theme.
- Test form controls and other native UI in every supported scheme.
