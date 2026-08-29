---
title: CSS Flexbox
description: Learn how to align, distribute, wrap, and reorder items with CSS Flexible Box Layout.
---

CSS Flexbox is a one-dimensional layout system. It arranges items in a row or column and makes alignment, spacing, and flexible sizing easier.

```css
.container {
  display: flex;
}
```

The element with `display: flex` is the **flex container**. Its direct children become **flex items**.

## Main axis and cross axis

Flexbox works along two axes:

- The **main axis** follows `flex-direction`.
- The **cross axis** runs perpendicular to the main axis.

With the default `flex-direction: row`, the main axis is horizontal and the cross axis is vertical.

## Flex direction

`flex-direction` controls the direction in which items are placed.

```css
.container {
  display: flex;
  flex-direction: row;
}
```

Available values are:

| Value | Behavior |
| --- | --- |
| `row` | Places items along the inline direction. |
| `row-reverse` | Reverses the row visually. |
| `column` | Places items from top to bottom in horizontal writing. |
| `column-reverse` | Reverses the column visually. |

Reversing items only changes their visual order. Keyboard and screen-reader order still follows the HTML, so keep the DOM order logical.

## Justify content

`justify-content` aligns and distributes items along the main axis.

```css
.navigation {
  display: flex;
  justify-content: space-between;
}
```

Common values include `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, and `space-evenly`.

```css
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
```

## Align items

`align-items` controls the alignment of items along the cross axis.

```css
.navigation {
  display: flex;
  align-items: center;
}
```

Useful values include `stretch`, `flex-start`, `center`, `flex-end`, and `baseline`.

`stretch` is the default. It stretches auto-sized items across the container's cross axis.

## Gap

The `gap` property adds consistent space between flex items without adding unwanted space around the container edges.

```css
.button-group {
  display: flex;
  gap: 0.75rem;
}
```

You can define row and column gaps separately:

```css
.tags {
  row-gap: 0.5rem;
  column-gap: 1rem;
}
```

## Wrapping items

Flex items stay on one line by default and may shrink to fit. Enable wrapping when items should move onto additional lines.

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

The `flex-flow` shorthand combines direction and wrapping:

```css
.cards {
  display: flex;
  flex-flow: row wrap;
}
```

## Align content

`align-content` distributes multiple flex lines along the cross axis. It only has a visible effect when wrapping creates extra lines and the container has extra cross-axis space.

```css
.gallery {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  min-height: 30rem;
}
```

For alignment within a single line, use `align-items` instead.

## Flex grow

`flex-grow` controls how an item uses available space. The default value is `0`.

```css
.main-content {
  flex-grow: 1;
}
```

If multiple items grow, their values define a ratio:

```css
.primary {
  flex-grow: 2;
}

.secondary {
  flex-grow: 1;
}
```

The primary item receives twice as much of the remaining space as the secondary item.

## Flex shrink

`flex-shrink` controls how an item becomes smaller when there is not enough space. Its default value is `1`.

```css
.logo {
  flex-shrink: 0;
}
```

Disabling shrinking can cause overflow, so use it only when an item must preserve its size.

## Flex basis

`flex-basis` sets an item's initial main-axis size before free space is distributed.

```css
.sidebar {
  flex-basis: 18rem;
}
```

In a row, it behaves similarly to an initial width. In a column, it behaves similarly to an initial height.

## Flex shorthand

The `flex` shorthand combines grow, shrink, and basis.

```css
.content {
  flex: 1 1 30rem;
}
```

This means:

- `flex-grow: 1`
- `flex-shrink: 1`
- `flex-basis: 30rem`

Common patterns include:

```css
.fluid-item {
  flex: 1;
}

.fixed-item {
  flex: 0 0 12rem;
}
```

## Align self

`align-self` overrides `align-items` for one flex item.

```css
.featured-card {
  align-self: stretch;
}
```

## Order

`order` changes the visual position of a flex item. All items have `order: 0` by default.

```css
.featured {
  order: -1;
}
```

:::caution
Do not use `order` to fix an illogical HTML structure. Visual order can differ from keyboard focus and screen-reader reading order.
:::

## Centering with Flexbox

Flexbox can center content on both axes.

```css
.empty-state {
  display: flex;
  min-height: 20rem;
  align-items: center;
  justify-content: center;
}
```

## Responsive navigation example

```html
<nav class="nav">
  <a class="logo" href="/">Guide Docs</a>
  <div class="nav-links">
    <a href="/html">HTML</a>
    <a href="/css">CSS</a>
    <a href="/javascript">JavaScript</a>
  </div>
</nav>
```

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 40rem) {
  .nav {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

## Flexible card layout

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 16rem;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}
```

Each card starts with a basis of `16rem`, can grow to fill available space, and wraps when the row becomes too narrow.

## Common mistakes

- Applying flex properties to an element that is not a direct child of the flex container.
- Confusing the main axis with the horizontal axis after using `flex-direction: column`.
- Using `align-content` when there is only one flex line.
- Setting `flex-shrink: 0` on many items and causing horizontal overflow.
- Reordering content visually while leaving an illogical keyboard order.
- Using margins between every item instead of the container's `gap` property.

## Key points

- Flexbox arranges direct children along one main axis.
- `justify-content` works on the main axis; `align-items` works on the cross axis.
- `gap` creates consistent space between items.
- `flex-grow`, `flex-shrink`, and `flex-basis` control flexible sizing.
- Wrapping helps a flex layout adapt to limited space.
- Preserve meaningful DOM order for accessibility.

## Next topic

Continue with **CSS Grid** to learn how to create two-dimensional layouts with rows and columns.
