---
title: CSS Intrinsic Sizing
description: Understand min-content, max-content, fit-content, and how intrinsic sizes affect flexible layouts.
---

Intrinsic sizing lets a layout use dimensions derived from an element's content. It is useful when text, images, or other content should determine a component's size without hard-coding every width.

## The intrinsic size keywords

The main keywords describe how much room content needs:

| Keyword | Sizing behavior |
| --- | --- |
| `min-content` | The smallest size the content can take without avoidable overflow. Text can wrap at its permitted break points. |
| `max-content` | The size the content would take without soft wrapping. |
| `fit-content` | Uses available space, but stays between the min-content and max-content sizes. |
| `auto` | Uses the sizing rules for the property and layout mode; it is not a synonym for `max-content`. |

For a long word with no break opportunities, `min-content` can still be wide. Use `overflow-wrap: anywhere` when breaking long strings is appropriate.

## Compare min-content and max-content

Use `min-content` to let a grid track shrink toward its smallest content size, and `max-content` to keep it on one line as far as possible.

```css
.labels {
  display: grid;
  grid-template-columns: max-content minmax(min-content, 1fr);
  gap: 0.75rem 1rem;
}

.labels dt {
  font-weight: 700;
}
```

The first column follows each term's unwrapped width. The second can grow to fill the remaining space while respecting its content minimum. In a narrow container, consider `minmax(0, 1fr)` if the track must be allowed to shrink below its min-content contribution.

## Use fit-content for bounded tracks

`fit-content` caps a content-sized dimension at a limit while allowing it to use less space when needed.

```css
.profile-card {
  inline-size: fit-content(24rem);
  max-inline-size: 100%;
  padding: 1rem;
}
```

The `fit-content()` function is especially useful for grid tracks:

```css
.profile-list {
  display: grid;
  grid-template-columns: fit-content(16rem) minmax(0, 1fr);
  gap: 1rem;
}
```

The track can use its content size up to the supplied limit, while still being constrained by the available space and its minimum contribution.

## Intrinsic sizing in flex and grid

Grid and flex items often have automatic minimum sizes influenced by their contents. A long URL, code sample, or unbreakable label can therefore make a track or item wider than expected.

```css
.main-column {
  min-inline-size: 0;
}

.main-column pre {
  max-inline-size: 100%;
  overflow: auto;
}
```

Setting `min-inline-size: 0` allows the column to shrink. Give overflowing content its own scrolling or wrapping behavior so it remains usable.

## Practical guidelines

- Prefer intrinsic keywords when content should set a natural size.
- Use `minmax()` when a grid track needs an explicit lower and upper bound.
- Check long words, URLs, images, and code blocks; they can determine min-content size.
- Use logical properties such as `inline-size` when the dimension follows writing direction.
- Test narrow containers as well as wide viewports.

## Key takeaways

- `min-content` is the smallest content-driven size, and `max-content` is the unwrapped size.
- `fit-content` lets content choose a size within available limits.
- Automatic minimum sizes can prevent grid and flex items from shrinking.
- `minmax(0, 1fr)` and `min-inline-size: 0` are useful when a layout needs to shrink below a content minimum.
