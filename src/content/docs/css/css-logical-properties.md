---
title: CSS Logical Properties
description: Create layouts that adapt naturally to different writing directions and writing modes with CSS logical properties.
---

CSS logical properties describe an element's edges and dimensions in terms of the flow of text, rather than physical directions such as left, right, top, and bottom. They make components more reusable in right-to-left (RTL) languages and vertical writing modes.

## Physical versus logical directions

In a typical left-to-right page, `left` is the start of a line and `right` is the end. In an RTL page, that relationship reverses. Logical properties use names that keep their meaning in both cases.

| Physical property | Logical equivalent |
| --- | --- |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `width` | `inline-size` |
| `height` | `block-size` |

`inline` follows the direction text flows within a line. `block` follows the direction blocks stack on the page.

## Set spacing with logical shorthands

Use `margin-inline` and `padding-block` when a component needs matching space on each logical side.

```css
.card {
  margin-inline: auto;
  max-inline-size: 65ch;
  padding-block: 1.5rem;
  padding-inline: 1rem;
}
```

This centers the card in the inline direction, limits its readable line length, and preserves the intended spacing when the page direction changes.

## Align content at the start or end

`text-align: start` and `text-align: end` are often better defaults than `left` and `right`.

```css
.message {
  border-inline-start: 4px solid #2563eb;
  padding-inline-start: 1rem;
  text-align: start;
}
```

For a right-to-left language, the border and padding move to the right side automatically.

## Position elements logically

Logical inset properties work with positioned elements.

```css
.dialog {
  inset-block-start: 2rem;
  inset-inline-end: 2rem;
  position: fixed;
}
```

The dialog appears near the top-end corner: top-right in a left-to-right layout and top-left in a right-to-left layout.

## Use logical sizes for components

`inline-size` and `block-size` are especially useful for controls that must work in vertical writing modes.

```css
.search-input {
  block-size: 2.75rem;
  inline-size: min(100%, 32rem);
}
```

In the common horizontal writing mode, these behave like height and width. Their names still describe the component's intent if the writing mode changes.

## Handle borders and rounded corners

Logical border properties can target a flow-relative edge:

```css
.nav-link {
  border-block-end: 2px solid transparent;
}

.nav-link[aria-current="page"] {
  border-block-end-color: currentColor;
}
```

For corner radii, use properties such as `border-start-start-radius`. They refer to the corner at the start of both the block and inline directions.

## A practical migration approach

You do not need to replace every physical property at once. Start with shared components that include text alignment, horizontal spacing, directional borders, icons, or absolutely positioned controls. Prefer logical properties for new component CSS, then migrate older rules when you touch them.

## Key takeaways

- Use `inline` and `block` to express layout intent instead of physical screen edges.
- Logical properties adapt to RTL and vertical writing modes without duplicate CSS.
- `start` and `end` are safer defaults for text alignment, borders, spacing, and positioning.
- Apply logical properties first to reusable, direction-sensitive components.
