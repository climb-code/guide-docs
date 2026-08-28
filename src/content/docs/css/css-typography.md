---
title: CSS Typography
description: Learn how to style readable text with font families, sizes, weights, spacing, alignment, and web fonts.
---

Typography controls how text looks and feels on a page. Good typography makes content readable, creates visual hierarchy, and supports a consistent design.

## Font family

The `font-family` property defines the typeface used for text. List fallback fonts in case the preferred font is unavailable.

```css
body {
  font-family: Inter, Arial, sans-serif;
}
```

Generic font families include `serif`, `sans-serif`, `monospace`, `cursive`, and `fantasy`. Always end a font stack with a suitable generic family.

Use quotes around names containing spaces:

```css
h1 {
  font-family: "Times New Roman", Times, serif;
}
```

## Font size

`font-size` controls the size of text.

```css
body {
  font-size: 1rem;
}

h1 {
  font-size: 2.5rem;
}
```

Relative units such as `rem` let text respond to browser font preferences. Fluid headings can use `clamp()`:

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

## Font weight and style

`font-weight` controls how light or bold text appears.

```css
h2 {
  font-weight: 700;
}

.meta {
  font-weight: 400;
  font-style: italic;
}
```

Common weights range from `100` to `900`, but a font only displays weights it supports. Keyword values include `normal`, `bold`, `lighter`, and `bolder`.

## Line height

`line-height` controls the vertical space between lines of text.

```css
body {
  line-height: 1.6;
}
```

A unitless value scales with the element's font size. Body text often benefits from a line height between `1.4` and `1.7`, depending on the font and line length.

## Text alignment

Use `text-align` to align inline content within its container.

```css
.page-title {
  text-align: center;
}

.price {
  text-align: end;
}
```

Logical values such as `start` and `end` adapt to left-to-right and right-to-left languages.

## Text decoration

`text-decoration` adds or controls lines on text.

```css
a {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

a:hover {
  text-decoration-style: wavy;
}
```

Avoid removing link underlines unless another clear visual cue shows that the text is interactive.

## Text transformation

`text-transform` changes the displayed capitalization without changing the HTML text.

```css
.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

Values include `uppercase`, `lowercase`, `capitalize`, and `none`.

## Letter and word spacing

```css
h1 {
  letter-spacing: -0.02em;
}

.intro {
  word-spacing: 0.1em;
}
```

Small spacing changes can improve a heading or label. Large changes can make paragraphs harder to read.

## Indentation and wrapping

```css
.article p:first-of-type {
  text-indent: 2em;
}

.filename {
  overflow-wrap: anywhere;
}
```

`overflow-wrap` helps long URLs and unbroken strings wrap instead of overflowing their container.

Use `white-space` to control spaces and line breaks:

```css
.code-output {
  white-space: pre-wrap;
}
```

## Text overflow

Single-line text can be shortened with an ellipsis:

```css
.card-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

The element needs a constrained width for overflow to occur. Make sure the full text remains available when it is important.

## Web fonts

`@font-face` loads a custom font file.

```css
@font-face {
  font-family: "Guide Sans";
  src: url("/fonts/guide-sans.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Guide Sans", Arial, sans-serif;
}
```

WOFF2 is a compact format designed for the web. `font-display: swap` lets fallback text appear while the custom font loads.

:::tip
Load only the font families and weights your design actually uses. Large font files can slow down the first page render.
:::

## Readable line length

Very long lines are difficult to scan. The `ch` unit provides a useful content-width limit.

```css
.article {
  max-width: 65ch;
  margin-inline: auto;
}
```

Around 45 to 75 characters per line is a practical range for much body content, although the ideal width depends on the font and audience.

## Font shorthand

The `font` shorthand can set several properties at once.

```css
.summary {
  font: italic 600 1.125rem/1.6 Georgia, serif;
}
```

In this example, the order is style, weight, size, line height, and family. `font-size` and `font-family` are required when using the shorthand.

## Accessible typography

- Use relative font units so users can resize text.
- Maintain enough contrast between text and its background.
- Keep body text large enough to read comfortably.
- Avoid long paragraphs written entirely in uppercase.
- Do not rely on font style or color alone to communicate meaning.
- Preserve a visible distinction between links and ordinary text.

## Complete example

```css
:root {
  --font-body: Inter, Arial, sans-serif;
  --font-heading: Georgia, serif;
}

body {
  color: #1f2937;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
}

h1,
h2,
h3 {
  color: #111827;
  font-family: var(--font-heading);
  line-height: 1.2;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.02em;
}

article {
  max-width: 65ch;
}
```

## Common mistakes

- Using a custom font without fallback fonts.
- Setting body text with fixed sizes that ignore user preferences.
- Using a line height that is too tight for multiline text.
- Loading every available font weight even when most are unused.
- Removing link decoration without providing another clear cue.
- Making lines so wide that readers lose their place.

## Key points

- Use a fallback stack with every font family.
- Relative font sizes and unitless line heights create flexible text.
- Spacing, line length, and contrast are central to readability.
- Web fonts should be optimized and loaded deliberately.
- Typography should create hierarchy without reducing accessibility.

## Next topic

Continue with **CSS Display** to learn how block, inline, flex, grid, and hidden elements participate in page layout.
