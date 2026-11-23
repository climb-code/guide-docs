---
title: CSS Text Wrapping Balance
description: Improve line breaks in headings and paragraphs with text-wrap-style values such as balance and pretty.
---

CSS normally chooses line breaks quickly as text flows into its container. The `text-wrap-style` property lets you ask the browser to use a different wrapping strategy when the default line breaks leave an awkward heading or paragraph.

## Balance short headings

Use `text-wrap: balance` on a short title or caption to make its lines more even. It is especially useful when a heading wraps differently at nearby viewport widths.

```css
.card-title {
  max-inline-size: 22ch;
  text-wrap: balance;
}
```

Balancing chooses line breaks to reduce uneven leftover space. It does not justify the text or force every line to have exactly the same width. The browser may limit balancing on long blocks to keep layout work reasonable.

## Improve paragraph wrapping

Use `text-wrap: pretty` when the browser's preferred line breaks leave a short final line or otherwise awkward paragraph. The browser can spend more effort choosing line breaks than it does with its default wrapping strategy.

```css
.article p {
  max-inline-size: 68ch;
  text-wrap: pretty;
}
```

The exact improvements are browser-defined. Keep normal wrapping as a sensible fallback; the text remains readable if a browser does not support the requested value.

## Choose a value for the content

| Value | Useful for | Behavior |
| --- | --- | --- |
| `auto` | General text | Uses the browser's preferred wrapping strategy. |
| `balance` | Short headings and captions | Tries to make lines more even. |
| `pretty` | Paragraphs | Can consider more lines to improve overall breaks. |
| `stable` | Editable text | Keeps earlier line breaks more stable as text is edited. |

The `text-wrap` shorthand sets wrapping mode and style together. You can set the style alone with `text-wrap-style`:

```css
.headline {
  text-wrap-style: balance;
}

.editable-note {
  text-wrap-style: stable;
}
```

## Apply it selectively

Text balancing can change the number and position of line breaks, so avoid applying it indiscriminately to long pages. Use it where the line shape matters, and keep a readable maximum line length.

```css
h1,
.card-title {
  max-inline-size: 24ch;
  text-wrap: balance;
}

.article-body {
  max-inline-size: 68ch;
  text-wrap: pretty;
}
```

Avoid adding manual `<br>` elements just to get a preferred desktop line break. Natural wrapping can adapt better to narrow screens, translation, and larger text settings.

## Check support and readability

Treat these values as progressive enhancement. If a browser does not recognize a value, it keeps the browser's normal line wrapping.

```css
.headline {
  max-inline-size: 24ch;
}

@supports (text-wrap: balance) {
  .headline {
    text-wrap: balance;
  }
}
```

Review line breaks at narrow and wide widths, with zoom, and with the actual fonts used by the page. Good wrapping depends on font metrics, language, and available width.

## Key points

- `balance` is best suited to short headings and captions.
- `pretty` can improve paragraph line breaks at the cost of more layout work.
- `stable` is intended to keep wrapping more stable while editable content changes.
- Use wrapping strategies selectively and keep a normal layout as a fallback.
- Recheck the result across widths, languages, fonts, and text zoom levels.

## Further reading

See the [CSS Text Module Level 4 draft](https://drafts.csswg.org/css-text-4/#text-wrap-style) for the `text-wrap-style` values and wrapping behavior.
