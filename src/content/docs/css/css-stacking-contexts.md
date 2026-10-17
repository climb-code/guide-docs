---
title: CSS Stacking Contexts
description: Learn how stacking contexts isolate z-index layers and how to debug elements that appear behind other content.
---

A stacking context is a group of elements that the browser paints together as one layer in its parent context. An element with a large `z-index` cannot escape its stacking context to appear above content in a higher sibling context.

## Start with the painting order

Within one stacking context, the browser paints background and borders, positioned elements with a negative `z-index`, in-flow content, positioned elements at `z-index: auto` or `0`, and then positive `z-index` layers. The exact ordering also includes details such as floats and inline content, but the key rule is that nested contexts are treated atomically by their parent.

```css
.panel {
  position: relative;
  z-index: 1;
}

.tooltip {
  position: absolute;
  z-index: 9999;
}
```

If `.panel` is below a sibling context, `.tooltip` remains inside the lower `.panel` layer regardless of its large number.

## What creates a stacking context?

Common causes include:

- The root element (`html`).
- A positioned element with a `z-index` other than `auto`.
- A flex or grid item with a non-`auto` `z-index`.
- `position: fixed` or `position: sticky`.
- `opacity` below `1`, `transform` other than `none`, or `filter` other than `none`.
- `isolation: isolate`, `mix-blend-mode` other than `normal`, or `contain: paint`.
- A `will-change` value that names a property that would create a stacking context.

Several of these properties are useful for animation or compositing, but they also change layer behavior. A transform can make an element a containing block for positioned descendants as well.

## Diagnose a z-index problem

Inspect the element and walk up its ancestors. Look for stacking-context triggers, then compare the ancestor contexts that contain the competing elements.

```html
<div class="page">
  <section class="content">
    <div class="tooltip">Details</div>
  </section>
  <header class="site-header">Header</header>
</div>
```

```css
.content {
  position: relative;
  z-index: 1;
  transform: translateZ(0);
}

.tooltip {
  position: absolute;
  z-index: 100;
}

.site-header {
  position: relative;
  z-index: 2;
}
```

The transform creates a stacking context for `.content`. The tooltip is confined to it, so the header can paint above the entire content context. Fix the relevant ancestor's layer relationship, or render the overlay in a shared top-level layer.

## Use isolation intentionally

`isolation: isolate` creates a local stacking context without changing an element's position. It can make component-level layering easier to reason about:

```css
.card {
  position: relative;
  isolation: isolate;
}

.card__image,
.card__content {
  position: relative;
  z-index: 1;
}

.card__decoration {
  position: absolute;
  inset: 0;
  z-index: -1;
}
```

Keep layer values small and local. A short scale such as `0`, `1`, and `2` is easier to maintain than a collection of arbitrary large values.

## Practical guidelines

- Compare stacking contexts from the outside inward before changing `z-index` values.
- Avoid adding transforms or opacity solely as unexplained layering fixes.
- Use `isolation: isolate` when a component needs a self-contained layer group.
- Put dialogs, menus, and tooltips in a shared overlay layer when they must cross component boundaries.
- Check keyboard focus and clipping separately; `z-index` does not override `overflow: hidden` clipping.

## Key takeaways

- `z-index` is compared inside the current stacking context.
- A child cannot out-rank a higher sibling context by using a larger number.
- Transforms, opacity, positioned elements, and isolation can create contexts.
- Debug the ancestor contexts first, then adjust the layer structure.
