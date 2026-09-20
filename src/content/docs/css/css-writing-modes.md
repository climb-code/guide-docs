---
title: CSS Writing Modes
description: Control text direction and layout flow with CSS writing-mode, direction, and text-orientation.
---

CSS Writing Modes allow you to change the direction in which text and layout flow. This is essential for internationalisation — supporting languages that read right-to-left (Arabic, Hebrew) or top-to-bottom (Japanese, Chinese, Mongolian) — and for creative typographic effects like vertical labels and rotated headings.

## writing-mode

`writing-mode` sets the block flow direction: the direction in which block-level boxes are stacked and inline content flows.

```css
.vertical-text {
  writing-mode: vertical-rl;
}
```

| Value | Block direction | Inline direction |
| --- | --- | --- |
| `horizontal-tb` | Top to bottom | Left to right (default) |
| `vertical-rl` | Right to left | Top to bottom |
| `vertical-lr` | Left to right | Top to bottom |
| `sideways-rl` | Right to left | Top to bottom, glyphs upright |
| `sideways-lr` | Left to right | Top to bottom, glyphs upright |

## direction

`direction` controls whether inline content flows left-to-right or right-to-left within the current writing mode. It should usually follow the document's language rather than be set manually in CSS — use the `dir` HTML attribute or the `lang` attribute and let the browser handle it.

```css
.rtl-container {
  direction: rtl;
}
```

For bidirectional text, use the Unicode `<bdi>` element or `unicode-bidi` in CSS instead of forcing a direction.

## text-orientation

`text-orientation` controls the orientation of characters within a vertical writing mode. It only applies when `writing-mode` is vertical.

```css
.japanese-column {
  text-orientation: mixed;
  writing-mode: vertical-rl;
}
```

| Value | Behaviour |
| --- | --- |
| `mixed` | Rotates Latin characters 90°; CJK characters remain upright. |
| `upright` | All characters are upright regardless of script. |
| `sideways` | All characters are rotated 90°. |

## Logical properties and writing modes

Physical properties (`margin-top`, `padding-left`, `border-right`) are tied to screen directions and break in non-horizontal writing modes. Logical properties map to the current writing mode instead.

```css
/* Physical — breaks in vertical mode */
.card {
  margin-left: 1rem;
  padding-top: 0.5rem;
}

/* Logical — adapts to writing mode */
.card {
  margin-inline-start: 1rem;
  padding-block-start: 0.5rem;
}
```

| Physical | Logical equivalent |
| --- | --- |
| `top` | `block-start` |
| `bottom` | `block-end` |
| `left` | `inline-start` |
| `right` | `inline-end` |

## Vertical navigation labels

A common use case is rotating sidebar labels or table headers.

```css
.sidebar-label {
  display: block;
  writing-mode: vertical-lr;
  transform: rotate(180deg); /* flip so text reads bottom-to-top */
}
```

Or use `vertical-rl` without a transform for right-to-left vertical text.

## Internationalisation with lang and dir

Combine the `lang` attribute with `dir` for proper bidirectional layout.

```html
<p lang="ar" dir="rtl">مرحبا بالعالم</p>
```

CSS logical properties ensure that spacing and borders honour the `dir` attribute automatically, so your layout adapts without custom overrides.

## Impact on flexbox and grid

Writing mode affects flex and grid axes. In a vertical writing mode:

- The **block axis** runs horizontally.
- The **inline axis** runs vertically.

This means `flex-direction: row` lays items out top-to-bottom in a vertical writing mode.

```css
.layout {
  display: flex;
  writing-mode: vertical-rl;
  /* flex items now stack horizontally */
}
```

## Accessibility

- Declare the language and text direction in HTML (`lang` and `dir`) so screen readers use the correct pronunciation and reading order.
- Do not use CSS writing modes to visually rotate text that should remain in its logical order — this can confuse both assistive technology and search engines.
- Test keyboard navigation after changing writing modes, as focus order follows DOM order, not visual order.

## Key takeaways

- `writing-mode` changes the block and inline flow directions for an entire subtree.
- Use `text-orientation` to control character rotation inside vertical text.
- Prefer logical properties (`margin-inline-start`, `padding-block-end`) over physical ones so layouts adapt to writing modes automatically.
- Always set language and direction in HTML (`lang`, `dir`) and let CSS handle the visual adjustments.
