---
title: CSS Units and Sizing
description: Learn how absolute, relative, font, percentage, and viewport units create flexible and responsive sizes in CSS.
---

CSS units describe the size of lengths such as widths, spacing, borders, and text. Choosing the right unit helps a design adapt to different content, user settings, and screen sizes.

```css
.card {
  width: 90%;
  max-width: 40rem;
  padding: 1.5rem;
  border-radius: 12px;
}
```

Some CSS properties accept unitless values, while a length normally combines a number and a unit.

## Pixels

The pixel unit (`px`) is an absolute CSS unit. It is useful for small, precise values such as borders and icons.

```css
.avatar {
  width: 48px;
  height: 48px;
  border: 2px solid #cbd5e1;
}
```

CSS pixels are reference units, not necessarily individual physical screen pixels. Browsers scale them appropriately for the device.

Fixed pixels can be less flexible for typography and large layout dimensions, especially when users change their preferred font size.

## Percentages

A percentage is calculated relative to another value, usually a property of the containing block.

```css
.main-content {
  width: 75%;
}
```

The reference depends on the property. For example:

- Percentage `width` is usually based on the containing block's width.
- Percentage padding and margins are based on the containing block's inline size.
- Percentage font size is based on the parent element's font size.

```css
.image {
  width: 100%;
  height: auto;
}
```

This common pattern lets an image shrink with its container while preserving its aspect ratio.

## The em unit

`em` is relative to a font size. For `font-size`, it uses the parent element's font size. For most other properties, it uses the current element's font size.

```css
.button {
  font-size: 1rem;
  padding: 0.75em 1.25em;
  border-radius: 0.5em;
}
```

Because the padding is based on the button's font size, the whole button scales when its font size changes.

Nested font sizes defined with `em` can compound:

```css
.parent {
  font-size: 1.2em;
}

.child {
  font-size: 1.2em;
}
```

The child becomes `1.44` times the size inherited by the parent. Use `rem` when you want to avoid this compounding behavior.

## The rem unit

`rem` means **root em**. It is relative to the root `<html>` element's font size, which is `16px` by default in most browsers.

```css
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
```

If the root font size is `16px`, then `2.5rem` computes to `40px`. More importantly, `rem` values can scale when the user changes the browser's default font size.

:::tip
Use `rem` for most typography and reusable spacing. It provides consistent sizing across the page while respecting user font preferences.
:::

## Character units

The `ch` unit is based on the width of the `0` character in the current font. It is useful for limiting line length.

```css
.article {
  max-width: 65ch;
}
```

This creates a readable measure that responds to the chosen font.

The `ex` unit relates to a font's x-height, but it is less commonly used.

## Viewport units

Viewport units are relative to the browser's visible area.

| Unit | Relative to |
| --- | --- |
| `vw` | 1% of the viewport width. |
| `vh` | 1% of the viewport height. |
| `vmin` | 1% of the viewport's smaller dimension. |
| `vmax` | 1% of the viewport's larger dimension. |

```css
.hero {
  min-height: 70vh;
  padding-inline: 5vw;
}
```

Mobile browser controls can change the available viewport height. Modern viewport units provide more explicit behavior:

- `svh` uses the small viewport height.
- `lvh` uses the large viewport height.
- `dvh` follows the dynamic viewport height as browser controls appear or disappear.

```css
.full-screen-dialog {
  min-height: 100dvh;
}
```

## Physical units

CSS also supports physical units such as `in`, `cm`, `mm`, `pt`, and `pc`.

```css
@media print {
  body {
    margin: 15mm;
  }
}
```

These units are mainly useful for print styles. On screens, they do not guarantee an exact physical measurement on every device.

## Unitless values

Some properties accept numbers without a unit.

```css
body {
  line-height: 1.6;
}

.modal {
  z-index: 10;
  opacity: 0.9;
}
```

A unitless `line-height` scales with the element's font size and is inherited cleanly by child elements.

Zero can usually be written without a unit:

```css
.card {
  margin: 0;
  border-width: 0;
}
```

## Width and height

The `width` and `height` properties set an element's dimensions according to its box-sizing mode.

```css
.video {
  width: 100%;
  height: auto;
}
```

For content that can change, prefer flexible widths and natural heights over fixed dimensions.

```css
.container {
  width: 90%;
  max-width: 75rem;
  margin-inline: auto;
}
```

## Minimum and maximum sizes

Size constraints allow elements to remain flexible within safe limits.

```css
.sidebar {
  width: 30%;
  min-width: 16rem;
  max-width: 24rem;
}
```

When constraints conflict, minimum sizes generally take priority over maximum sizes.

## Intrinsic sizing keywords

CSS can size elements according to their content.

```css
.badge {
  width: fit-content;
}
```

Useful keywords include:

| Keyword | Behavior |
| --- | --- |
| `min-content` | Uses the smallest size the content can take without avoidable overflow. |
| `max-content` | Uses the content's preferred size without wrapping. |
| `fit-content` | Uses available space but does not grow beyond the preferred content size. |

## The calc function

`calc()` performs calculations and can combine compatible units.

```css
.main {
  width: calc(100% - 18rem);
  min-height: calc(100dvh - 4rem);
}
```

Spaces around `+` and `-` operators are required.

CSS calculations are especially helpful when a flexible area must account for a fixed header or sidebar.

## min, max, and clamp

Modern CSS functions can choose sizes according to available space.

```css
.container {
  width: min(90%, 70rem);
}
```

`min()` chooses the smallest value, while `max()` chooses the largest.

`clamp()` accepts a minimum, preferred, and maximum value:

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

The heading grows with the viewport but never becomes smaller than `2rem` or larger than `4rem`.

## Logical dimensions

Logical properties adapt to the document's writing direction.

```css
.card {
  inline-size: 100%;
  max-inline-size: 40rem;
  min-block-size: 12rem;
}
```

- `inline-size` usually corresponds to width in horizontal writing.
- `block-size` usually corresponds to height in horizontal writing.

Logical properties make layouts easier to support in both left-to-right and right-to-left languages.

## Practical unit choices

A flexible starting point is:

- Use `rem` for font sizes and consistent spacing.
- Use `em` when a component should scale with its own text.
- Use `%` for dimensions relative to a container.
- Use `px` for thin borders and small precise details.
- Use `dvh` or other viewport units for screen-relative sections.
- Use `ch` to control readable text width.
- Use `clamp()` for fluid values with safe limits.

## Common mistakes

- Adding units to properties that require unitless numbers, such as `z-index`.
- Using fixed widths that overflow on small screens.
- Creating deeply nested font sizes with `em` and getting unexpected compounding.
- Using `100vh` on mobile without checking how browser controls affect the layout.
- Removing user font scaling by relying only on fixed pixel typography.
- Forgetting the required spaces around `+` and `-` inside `calc()`.

## Key points

- Absolute and relative units solve different sizing problems.
- `rem` follows the root font size; `em` follows a relevant element font size.
- Percentages depend on the property and its containing context.
- Viewport units create screen-relative dimensions.
- Constraints and functions such as `min()`, `max()`, and `clamp()` keep layouts flexible.
- Prefer sizes that adapt to content and user settings.

## Next topic

Continue with **CSS Typography** to learn how to style fonts, text alignment, line spacing, and readable content.
