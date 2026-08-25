---
title: CSS Box Model
description: Learn how content, padding, borders, and margins control the size and spacing of every CSS element.
---

Every HTML element is displayed as a rectangular box. The **CSS box model** explains how the browser calculates that box's size and the space around it.

From the inside out, a box contains:

1. **Content** — text, images, or other child elements.
2. **Padding** — space between the content and border.
3. **Border** — a line surrounding the padding and content.
4. **Margin** — transparent space outside the border.

```css
.card {
  width: 300px;
  padding: 24px;
  border: 2px solid #2563eb;
  margin: 20px;
}
```

## Content area

The content area holds an element's text, image, or child elements. By default, `width` and `height` set the dimensions of this area only.

```css
.article {
  width: 640px;
  min-height: 300px;
}
```

Avoid fixed heights for text-heavy elements because content may overflow when the text grows or wraps.

## Padding

Padding creates space inside the border. The element's background is visible through its padding.

```css
.notice {
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 12px;
  padding-left: 20px;
}
```

The shorthand property can set all four sides:

```css
/* All sides */
padding: 16px;

/* Vertical | horizontal */
padding: 12px 24px;

/* Top | horizontal | bottom */
padding: 8px 16px 24px;

/* Top | right | bottom | left */
padding: 8px 12px 16px 20px;
```

Padding cannot use negative values.

## Border

A border appears between padding and margin. It requires a width, style, and color to be visible.

```css
.card {
  border-width: 2px;
  border-style: solid;
  border-color: #cbd5e1;
}
```

The same rule can be written with shorthand:

```css
.card {
  border: 2px solid #cbd5e1;
  border-radius: 12px;
}
```

Individual sides can have different borders:

```css
.quote {
  border-left: 4px solid #7c3aed;
  padding-left: 16px;
}
```

## Margin

Margin creates transparent space outside the border. It separates an element from neighboring elements.

```css
.section {
  margin-top: 48px;
  margin-bottom: 48px;
}
```

Margin shorthand follows the same one-to-four-value order as padding:

```css
.card {
  margin: 16px 24px;
}
```

Unlike padding, margins can be negative, but negative values should be used carefully because they can make elements overlap.

## Centering with auto margins

A block element with a defined width or `max-width` can be centered horizontally with automatic left and right margins.

```css
.container {
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
}
```

`auto` does not vertically center a normal block element.

## Default box sizing

The default `box-sizing` value is `content-box`. In this mode, padding and borders are added outside the declared width.

```css
.box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```

The visible width is:

```text
300px content + 40px padding + 10px border = 350px
```

Margins are outside that 350-pixel box and affect the space it occupies in the layout.

## Border-box sizing

With `border-box`, the declared width and height include the content, padding, and border.

```css
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
```

The visible width remains `300px`. The browser reduces the content area to make room for padding and borders.

A common project-wide reset is:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

:::tip
`border-box` usually makes responsive layouts easier because an element does not grow beyond its declared width when padding or borders are added.
:::

## Margin collapsing

Vertical margins of normal block elements can collapse. Instead of adding together, the larger margin may be used.

```css
h2 {
  margin-bottom: 24px;
}

p {
  margin-top: 16px;
}
```

The space between these elements may be `24px`, not `40px`. Horizontal margins do not collapse, and margins inside flex or grid layouts do not collapse.

## Width constraints

Use `min-width`, `max-width`, `min-height`, and `max-height` to control how a box can grow or shrink.

```css
.article {
  width: 100%;
  max-width: 70ch;
  min-height: 200px;
}
```

`max-width` is especially useful for responsive containers because it allows the element to shrink on small screens while limiting its size on larger screens.

## Overflow

When content is larger than its box, `overflow` controls what happens.

```css
.code-example {
  max-width: 100%;
  overflow-x: auto;
}
```

Common values include:

| Value | Behavior |
| --- | --- |
| `visible` | Content can render outside the box. |
| `hidden` | Extra content is clipped. |
| `scroll` | Scrollbars are always provided. |
| `auto` | Scrollbars appear when needed. |

## Inspecting the box model

Browser developer tools show the computed content, padding, border, and margin for an element.

1. Right-click an element and select **Inspect**.
2. Open the **Computed** or **Layout** panel.
3. Find the box model diagram.
4. Hover over each region to highlight it on the page.

This is often the fastest way to debug unexpected sizing or spacing.

## Complete example

```html
<article class="product-card">
  <h2>Wireless Keyboard</h2>
  <p>Compact, comfortable, and easy to carry.</p>
  <button>Buy now</button>
</article>
```

```css
.product-card {
  box-sizing: border-box;
  width: 100%;
  max-width: 360px;
  margin: 24px auto;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background-color: white;
}

.product-card h2 {
  margin-top: 0;
}
```

## Common mistakes

- Forgetting that padding and borders increase a `content-box` element's visible size.
- Using fixed heights for content that can grow.
- Expecting vertical margins always to add together.
- Trying to center an element with `margin: auto` without giving it an available width.
- Hiding overflowing content without checking whether important text becomes inaccessible.

## Key points

- Every element has content, padding, border, and margin areas.
- Padding is inside the border; margin is outside it.
- `border-box` includes padding and borders in the declared dimensions.
- Vertical margins can collapse in normal block layout.
- Width constraints and overflow rules help boxes adapt to their content.

## Next topic

Continue with **CSS Units and Sizing** to learn how pixels, percentages, viewport units, and relative units control element dimensions.
