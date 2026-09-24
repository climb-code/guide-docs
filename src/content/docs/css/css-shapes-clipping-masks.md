---
title: CSS Shapes, Clipping, and Masks
description: Shape images and layouts with clip-path, shape-outside, and CSS masks.
---

CSS can display an element through a geometric shape, fade parts of it away, or make text flow around a non-rectangular outline. These effects serve different purposes: `clip-path` controls what is visible, `mask-image` controls visibility with transparency, and `shape-outside` controls how nearby text wraps.

## Clip an element to a basic shape

`clip-path` hides everything outside a specified shape. The element still keeps its original layout box.

```css
.avatar {
  aspect-ratio: 1;
  clip-path: circle(50%);
  object-fit: cover;
  width: 8rem;
}
```

This displays a square image as a circle. `object-fit: cover` fills the square without stretching the image.

Other useful basic shapes include `ellipse()`, `inset()`, and `polygon()`.

```css
.badge {
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
```

The six points create a hexagon. Each coordinate is measured relative to the element's box.

## Round a clipped rectangle

Use `inset()` with `round` when you need an inset shape with rounded corners.

```css
.photo {
  clip-path: inset(5% 10% round 1rem);
}
```

The first percentages trim the top and bottom, while the second percentages trim the left and right. The `round` value rounds the resulting shape's corners.

## Wrap text around a shape

`shape-outside` changes the line wrapping around a floated element. It does not clip the element itself. Pair it with `clip-path` when the visible outline and text flow should match.

```css
.article-portrait {
  aspect-ratio: 1;
  clip-path: circle(50%);
  float: inline-start;
  margin-inline-end: 1.5rem;
  shape-outside: circle(50%);
  width: 10rem;
}
```

`shape-outside` requires a float and a defined size. Without the float, text continues to wrap around the usual rectangular box.

Add `shape-margin` to leave extra space between the shape and text:

```css
.article-portrait {
  shape-margin: 0.75rem;
}
```

## Fade an image with a mask

A mask uses its alpha channel to determine which parts of an element remain visible. A gradient makes a smooth fade that `clip-path` cannot create.

```css
.hero-image {
  mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
}
```

The opaque black portion remains visible, and the transparent portion fades out. The gradient colors are not painted onto the image; their opacity determines the mask.

## Use a radial mask

Radial gradients can fade the edges of an image while leaving its center visible.

```css
.spotlight {
  mask-image: radial-gradient(circle, black 45%, transparent 75%);
}
```

Masks can also use images, but gradients are convenient for simple fades because no extra asset is needed.

## Choose the right technique

| Goal | Use |
| --- | --- |
| Hide content outside a hard-edged shape | `clip-path` |
| Fade content gradually | `mask-image` |
| Make paragraph text follow a shape | `shape-outside` with a float |

For simple rounded rectangles, use `border-radius` instead of a clip or mask. It is easier to maintain and expresses the intent directly.

## Accessibility and practical limits

Clipping and masking change what users can see, but they do not rewrite the document's content. Avoid hiding essential text or controls behind an effect. Keep important parts of an image inside the visible area, provide meaningful alternative text when the image conveys information, and test the result at narrow widths.

Effects can also make outlines or focus indicators hard to see. If an interactive element is clipped, check its keyboard focus state and consider keeping the control itself rectangular while shaping a decorative child.

## Key takeaways

- `clip-path` creates a hard visible boundary without changing the layout box.
- `shape-outside` changes text wrapping only for floated elements.
- `mask-image` uses transparency to create soft fades and complex reveals.
- Use the simplest suitable property, and verify that content remains readable and accessible.
