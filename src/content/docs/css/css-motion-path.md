---
title: CSS Motion Path
description: Move and rotate elements along a custom path with offset-path, offset-distance, and offset-rotate.
---

CSS Motion Path lets an element follow a line, curve, or shape. It is useful for decorative motion where a straight-line `transform` animation is not expressive enough.

## Define a path

Set `offset-path` to a CSS shape or an SVG path string. The element starts at the beginning of the path.

```css
.orbiting-dot {
  offset-path: path("M 0 80 C 40 0, 120 0, 160 80");
}
```

The path uses its own coordinate system. Give the moving element a stable containing block and check the path at the sizes where the component appears.

## Move along the path

`offset-distance` controls how far the element has traveled. A percentage measures progress along the path, so `100%` reaches its end.

```css
.orbiting-dot {
  offset-path: path("M 0 80 C 40 0, 120 0, 160 80");
  offset-distance: 0%;
  animation: travel 3s ease-in-out infinite alternate;
}

@keyframes travel {
  to {
    offset-distance: 100%;
  }
}
```

You can also use a CSS basic shape, such as `circle()`, for a loop around a component.

## Rotate with the path

`offset-rotate: auto` turns the element to follow the path's direction. Use a fixed angle when the element should keep its orientation, or add an angle to `auto` to adjust its direction.

```css
.airplane {
  offset-path: path("M 0 80 C 40 0, 120 0, 160 80");
  offset-rotate: auto;
}

.label-on-path {
  offset-rotate: 0deg;
}
```

## Choose the element's anchor point

By default, the element is positioned on the path using its transform origin. `offset-anchor` lets you choose a different point on the element to place on the path.

```css
.orbiting-dot {
  offset-anchor: center;
}
```

Centering a circular object on its path often creates a more natural orbit. For asymmetric shapes, test the anchor with the element's actual dimensions.

## Keep motion purposeful

Use motion paths for meaningful visual movement, and provide a reduced-motion alternative for nonessential animation.

```css
@media (prefers-reduced-motion: reduce) {
  .orbiting-dot {
    animation: none;
    offset-distance: 50%;
  }
}
```

Check support in the browsers your project targets. If the path is decorative, the content should remain understandable without the animation.

## Key points

- `offset-path` defines the route and `offset-distance` sets progress along it.
- `offset-rotate` can orient an element along the route.
- `offset-anchor` chooses which point of the element sits on the path.
- Test path coordinates and element size together.
- Respect reduced-motion preferences and keep essential information still available.

## Further reading

See the [CSS Motion Path Module](https://drafts.csswg.org/motion-1/) for the properties and path syntax.
