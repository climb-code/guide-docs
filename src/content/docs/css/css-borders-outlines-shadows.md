---
title: CSS Borders, Outlines and Shadows
description: Style component edges, keyboard focus indicators, and elevation with borders, outlines, rounded corners, and box shadows.
---

Borders define an element's edge, outlines highlight it without taking up layout space, and shadows add visual depth. Choose the property that matches the purpose of the decoration.

## Key properties

| Property | Purpose | Example |
| --- | --- | --- |
| `border` | Set border width, style, and color | `1px solid #cbd5e1` |
| `border-radius` | Round corners | `12px` |
| `outline` | Draw a line without changing layout size | `3px solid #2563eb` |
| `outline-offset` | Separate an outline from the edge | `3px` |
| `box-shadow` | Add outer or inset shadows | `0 4px 12px rgb(0 0 0 / 0.15)` |

## Build a card with a border and shadow

```html
<article class="card">
  <h2>Learning CSS</h2>
  <p>Use a subtle border and shadow to group related content.</p>
</article>
```

```css
.card {
  box-sizing: border-box;
  max-width: 24rem;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background: white;
  color: #0f172a;
  box-shadow: 0 4px 12px rgb(15 23 42 / 0.12);
}
```

Borders occupy space in the box model. With `box-sizing: border-box`, a declared width includes padding and borders. Shadows do not occupy layout space, so nearby content does not move to make room for them.

Setting a border color and width alone is insufficient: the default border style is `none`. Include a style such as `solid`, `dashed`, or `dotted`.

## Keep keyboard focus visible

An outline is useful for focus because it does not change an element's dimensions.

```html
<button class="button" type="button">Save changes</button>
```

```css
.button {
  padding: 0.625rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  background: #1e40af;
  color: white;
  font: inherit;
}

.button:focus-visible {
  outline: 3px solid #1e40af;
  outline-offset: 3px;
}
```

`:focus-visible` applies when the browser determines a focus indicator is needed, including typical keyboard navigation. Keep the browser's default focus styling unless you provide a visible replacement. Choose an outline color that stands out against the surrounding background.

## Read box-shadow syntax

```css
.panel {
  box-shadow: 0 8px 20px 2px rgb(15 23 42 / 0.15);
}
```

The lengths specify horizontal offset, vertical offset, blur radius, and spread radius, in that order. Blur and spread are optional. A negative spread makes the shadow smaller; the blur radius cannot be negative.

Use commas for multiple shadows, or `inset` for an inner shadow:

```css
.input {
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.1);
}

.floating-panel {
  box-shadow:
    0 2px 4px rgb(0 0 0 / 0.08),
    0 12px 24px rgb(0 0 0 / 0.12);
}
```

## Rounded corners and child content

`border-radius` rounds an element's border and background, but does not automatically clip its children. An image inside a card can use matching top corner radii:

```css
.card > img {
  display: block;
  width: 100%;
  border-start-start-radius: 0.75rem;
  border-start-end-radius: 0.75rem;
}
```

Use `overflow: hidden` when clipping all overflowing content is intentional. It can also clip descendant focus indicators and popovers, so check interactive components before applying it.

## Common mistakes

- Adding a border on hover that changes the component's size. Reserve its space with a transparent border in the default state.
- Removing focus outlines without providing a visible replacement.
- Expecting shadows to create space between neighboring elements. Use margin or layout `gap` for spacing.
- Using a shadow as the only visible boundary. Keep a border when the boundary must remain clear without shadows.
- Assuming rounded corners automatically clip child images.

## Related topics

- [CSS Box Model](/css/css-box-model/)
- [CSS Colors and Backgrounds](/css/css-colors-backgrounds/)
- [CSS Accessibility](/css/css-accessibility/)
- [CSS Overflow](/css/css-overflow/)
