---
title: CSS font-size-adjust
description: Preserve the apparent size and readability of text when a fallback font is used.
---

Fallback fonts can have very different lowercase letter heights even when they use the same `font-size`. The `font-size-adjust` property can normalize a chosen font metric across the fonts in a family stack, helping text remain similarly legible while a web font is unavailable or fails to load.

## Match the x-height

The one-value form specifies a target ratio for the font's x-height relative to its font size. The example uses a target of `0.52`; choose a value that matches the primary font you intend to use:

```css
body {
  font-family: "Guide Sans", Arial, sans-serif;
  font-size: 1rem;
  font-size-adjust: 0.52;
}
```

The browser adjusts the rendered font size using each available font's metrics. This means the preferred font is adjusted too, so the target should be based on that font rather than an arbitrary value. If you do not know the font's metric, compare the result visually and check line wrapping at different widths.

## Choose a different metric

The default metric is `ex-height`, which measures the height of lowercase characters such as `x`. Newer syntax can specify another metric:

```css
.code-label {
  font-family: "Guide Mono", ui-monospace, monospace;
  font-size-adjust: ch-width 0.6;
}
```

`ch-width` uses the advance width of the `0` glyph. Other metrics include `cap-height`, `ic-width`, and `ic-height`. Use a metric that fits the text and writing system you are trying to keep consistent; `font-size-adjust` does not make different typefaces identical.

## Keep a natural fallback

Include a complete font stack whether or not you use `font-size-adjust`. Older browsers can ignore an unsupported declaration and continue using the listed fonts:

```css
.article {
  font-family: "Guide Sans", "Segoe UI", sans-serif;
}

@supports (font-size-adjust: 0.52) {
  .article {
    font-size-adjust: 0.52;
  }
}
```

The property is broadly supported in current browsers (Baseline 2024), while some of the newer metric keywords may not be available everywhere. Use the one-value `ex-height` form for the widest support, and check compatibility before relying on the additional metrics.

## When to use it

`font-size-adjust` is most useful when the fallback has noticeably smaller or larger lowercase letters than the primary face, especially for small body text or interface labels. It complements `font-display` and a thoughtfully chosen fallback stack. It is not a substitute for checking contrast, line height, line length, or actual text at zoomed sizes.

## Key points

- `font-size-adjust` matches a font metric such as x-height across the available fonts in a family stack.
- Set its ratio to match the preferred font; the preferred face is adjusted too.
- The default metric is `ex-height`; newer syntax can target other metrics.
- Keep a usable font stack because unsupported declarations are ignored.
- Review the visual result and line wrapping with the actual fonts and content.
