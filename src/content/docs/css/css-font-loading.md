---
title: CSS Font Loading
description: Load web fonts efficiently with @font-face, font-display, and useful fallback font stacks.
---

Web fonts can make a site distinctive, but they also affect loading speed and text readability. CSS gives you the `@font-face` rule to define a font and the `font-display` descriptor to control what users see while that font loads.

## Define a web font

Use `@font-face` to connect a font file to a family name. Prefer modern WOFF2 files because they are compact and broadly supported.

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-latin.woff2") format("woff2");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Inter", system-ui, sans-serif;
}
```

The `font-family` name is the label you use later in regular CSS. A variable font can cover a range of weights in one file, as shown by `400 700`.

## Choose a loading behavior

`font-display` controls the trade-off between showing text immediately and waiting for the web font.

- `swap` shows a fallback immediately, then replaces it when the font is ready. This is usually a good default for body text.
- `optional` prioritizes rendering quickly and may keep the fallback on slower connections.
- `block` briefly hides text while the font loads. Avoid it for most content because invisible text is frustrating.
- `fallback` allows a short wait, then shows the fallback if the font is not ready.

```css
@font-face {
  font-family: "Display";
  src: url("/fonts/display.woff2") format("woff2");
  font-display: optional;
}
```

## Provide metric-compatible fallbacks

Always include fallback fonts. A similar fallback reduces layout movement when a web font replaces it.

```css
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

code,
pre {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

Use a serif, sans-serif, or monospace generic family at the end of each stack. It ensures readable text even if a browser cannot load any earlier option.

## Load only the characters you need

For a large family, split files by script with `unicode-range`. Browsers then download a file only when its characters appear on the page.

```css
@font-face {
  font-family: "Newsreader";
  src: url("/fonts/newsreader-latin.woff2") format("woff2");
  font-weight: 400 700;
  unicode-range: U+0000-00FF;
}
```

Avoid loading every weight and style “just in case.” Include only the weights, italics, and character sets the design actually uses.

## Use local font files deliberately

Self-hosted fonts give you control over caching and reduce reliance on third-party requests. Keep them in a publicly served folder, use long-lived cache headers when possible, and preload only the most important font file.

```html
<link
  rel="preload"
  href="/fonts/inter-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Preloading too many files competes with images, CSS, and JavaScript. Reserve it for the font needed above the fold.

## Key points

- Define web fonts with `@font-face` and use WOFF2 when available.
- Use `font-display: swap` or `optional` to keep text visible while fonts load.
- Include sensible fallback stacks to preserve readability and reduce layout shift.
- Ship only the font files, weights, and character sets your site needs.
