---
title: CSS Positioning
description: Learn how static, relative, absolute, fixed, and sticky positioning place elements and create stacking contexts.
---

CSS positioning controls where an element appears and how its position relates to the normal document flow, its containing block, or the viewport.

```css
.element {
  position: relative;
  top: 1rem;
  left: 1rem;
}
```

The `position` property works with inset properties: `top`, `right`, `bottom`, and `left`.

## Static positioning

`static` is the default position for most elements. The element follows the normal document flow.

```css
.article {
  position: static;
}
```

Inset properties and `z-index` do not normally move a statically positioned element.

## Relative positioning

A relatively positioned element keeps its original space in the document flow but can be visually offset.

```css
.label {
  position: relative;
  top: 4px;
  left: 8px;
}
```

Surrounding elements behave as if the label had not moved. Relative positioning is also commonly used to establish a containing block for an absolutely positioned child.

```css
.card {
  position: relative;
}
```

## Absolute positioning

An absolutely positioned element is removed from the normal flow, so it no longer reserves its original layout space.

```css
.card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
```

It is positioned relative to its nearest ancestor that establishes a positioning containing block. A positioned ancestor—one whose `position` is not `static`—commonly provides that reference.

```html
<article class="card">
  <span class="card-badge">New</span>
  <h2>CSS Course</h2>
</article>
```

```css
.card {
  position: relative;
  padding: 2rem;
}

.card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
```

If no suitable ancestor exists, positioning is based on the initial containing block.

## Fixed positioning

A fixed element is removed from normal flow and usually positioned relative to the viewport. It remains in the same visible location while the page scrolls.

```css
.help-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
}
```

Fixed positioning is useful for floating controls, but the element must not cover important content on small screens.

Some ancestor properties, including certain transforms, can cause a fixed element to use that ancestor as its containing block instead of the viewport.

## Sticky positioning

A sticky element behaves like a relatively positioned element until a scroll threshold is reached. It then stays at the specified inset within its scrolling container.

```css
.section-heading {
  position: sticky;
  top: 0;
  background-color: white;
}
```

At least one inset, such as `top`, is needed for the sticky behavior to be visible.

Sticky positioning can fail to appear when:

- The element has no room to move inside its containing block.
- An ancestor creates a scrolling area with `overflow`.
- The required inset value is missing.
- The sticky element is as tall as or taller than its container.

## Inset shorthand

The logical `inset` shorthand sets `top`, `right`, `bottom`, and `left`.

```css
.overlay {
  position: absolute;
  inset: 0;
}
```

This stretches the overlay to all four edges of its containing block.

Logical inset properties adapt to writing direction:

```css
.close-button {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
```

## Centering an absolute element

An element can be centered with inset positioning and a transform:

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

The inset values place the element's top-left corner at the center. The transform shifts it back by half of its own width and height.

For many ordinary layouts, flexbox or grid provides simpler centering:

```css
.modal-layer {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
}
```

## Stacking and z-index

When elements overlap, `z-index` helps control which appears on top.

```css
.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-layer {
  position: fixed;
  inset: 0;
  z-index: 100;
}
```

A larger `z-index` only wins within the relevant stacking context. An element cannot escape its parent's stacking context just by using a very large number.

## Stacking contexts

A stacking context is an independent group of layered elements. It can be created by several conditions, including:

- A positioned element with a `z-index` other than `auto`.
- An element with `opacity` below `1`.
- An element with `transform`, `filter`, or certain other visual properties.
- A flex or grid item with a non-auto `z-index`.

```css
.panel {
  position: relative;
  z-index: 1;
}
```

When `z-index` seems ineffective, inspect the ancestors for stacking contexts.

## Overlapping content safely

Absolutely or fixed-positioned elements do not reserve normal flow space. The rest of the layout may appear beneath them.

```css
body {
  padding-top: 4rem;
}

.fixed-header {
  position: fixed;
  inset: 0 0 auto;
  height: 4rem;
}
```

Here, body padding makes room for the fixed header. Prefer sticky positioning when the element should reserve its normal space before it begins sticking.

## Complete example

```html
<div class="profile-card">
  <span class="status">Online</span>
  <h2>Asha Sharma</h2>
  <p>Frontend developer</p>
</div>
```

```css
.profile-card {
  position: relative;
  max-width: 22rem;
  padding: 2rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
}

.status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  color: #166534;
  background-color: #dcfce7;
}
```

## Positioning and accessibility

- Keep focused controls visible and unobstructed.
- Check zoomed and small-screen layouts for overlapping content.
- Preserve a logical DOM order even when elements are visually repositioned.
- Avoid fixed elements that occupy too much of the viewport.
- Make close buttons and floating controls reachable with a keyboard.

## Common mistakes

- Forgetting to position the parent of an absolute child.
- Expecting `top` or `left` to move a static element.
- Using absolute positioning for an entire layout instead of flexbox or grid.
- Adding a huge `z-index` without checking parent stacking contexts.
- Creating a sticky element without a `top`, `bottom`, or other inset.
- Allowing fixed elements to cover content on smaller screens.

## Key points

- Static elements follow normal flow.
- Relative elements keep their space and can anchor absolute children.
- Absolute and fixed elements are removed from normal flow.
- Sticky elements switch behavior at a scroll threshold.
- Inset properties determine offsets, while `z-index` manages layers within stacking contexts.
- Use positioning for intentional overlays and anchored controls, not as a replacement for normal layout.

## Next topic

Continue with **CSS Flexbox** to learn how to align and distribute items in one-dimensional layouts.
