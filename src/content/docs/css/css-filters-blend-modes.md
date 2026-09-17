---
title: CSS Filters and Blend Modes
description: Create image effects, color overlays, and layered visual treatments with CSS filters and blend modes.
---

CSS filters change how an element is rendered without editing the original image. Blend modes control how an element's colors interact with the content behind it. Together, they can create useful image treatments, hover effects, and overlays directly in CSS.

## Apply a filter

Use the `filter` property with one or more filter functions.

```css
.profile-image {
  filter: grayscale(100%);
}
```

The image becomes grayscale, but its source file remains unchanged.

## Common filter functions

CSS includes several filter functions for different effects:

| Function | Purpose | Example |
| --- | --- | --- |
| `blur()` | Blurs the element | `blur(4px)` |
| `brightness()` | Adjusts brightness | `brightness(120%)` |
| `contrast()` | Adjusts contrast | `contrast(140%)` |
| `grayscale()` | Removes color | `grayscale(100%)` |
| `hue-rotate()` | Rotates colors | `hue-rotate(90deg)` |
| `invert()` | Inverts colors | `invert(100%)` |
| `opacity()` | Adjusts transparency | `opacity(70%)` |
| `saturate()` | Adjusts color intensity | `saturate(160%)` |
| `sepia()` | Adds a warm, aged tone | `sepia(80%)` |
| `drop-shadow()` | Adds a shadow around visible content | `drop-shadow(0 4px 8px #0008)` |

Most functions accept percentages. A value of `100%` usually represents the original appearance, although functions such as `grayscale()` and `sepia()` use `0%` for no effect.

## Combine multiple filters

Write filter functions in a space-separated list. They are applied from left to right, so their order can affect the result.

```css
.thumbnail {
  filter: grayscale(100%) contrast(120%) brightness(90%);
}
```

Keep combinations intentional. Too many filters can make an image difficult to read and may increase rendering work.

## Animate a filter on hover

Filters can be transitioned to create smooth interactions.

```css
.gallery-image {
  filter: grayscale(100%);
  transition: filter 250ms ease;
}

.gallery-image:hover {
  filter: grayscale(0%) saturate(115%);
}
```

The browser interpolates between compatible filter values during the transition.

## Use `drop-shadow()` for transparent images

Unlike `box-shadow`, `drop-shadow()` follows the visible shape of an image, including transparent areas.

```css
.product-icon {
  filter: drop-shadow(0 0.5rem 0.75rem rgb(15 23 42 / 35%));
}
```

This works well for transparent PNG files, SVG graphics, and irregular shapes.

## Filter the background with `backdrop-filter`

`backdrop-filter` changes the content visible behind an element. The element needs a transparent or semi-transparent background for the effect to be visible.

```css
.glass-panel {
  backdrop-filter: blur(12px);
  background: rgb(255 255 255 / 65%);
  border: 1px solid rgb(255 255 255 / 40%);
}
```

This pattern creates a glass-like surface. Always provide enough background color so the content remains readable when the filter is unavailable or expensive to render.

## Blend an element with its background

The `mix-blend-mode` property controls how an entire element blends with the content behind it.

```css
.hero-title {
  color: white;
  mix-blend-mode: difference;
}
```

The `difference` mode compares the foreground and background colors, producing high contrast in many situations. Its final appearance depends on everything behind the element.

Common blend modes include:

- `multiply` creates a darker result.
- `screen` creates a lighter result.
- `overlay` combines contrast from `multiply` and `screen`.
- `difference` displays the difference between the colors.
- `color` applies the hue and saturation of the foreground.

## Blend background layers

Use `background-blend-mode` when an element has multiple backgrounds.

```css
.hero {
  background-image:
    linear-gradient(#2563eb, #7c3aed),
    url("/images/team.jpg");
  background-blend-mode: multiply;
  background-position: center;
  background-size: cover;
}
```

The gradient blends with the image to create a consistent color treatment.

## Isolate blending

A blended child can sometimes interact with content outside its component. Create a new stacking context with `isolation: isolate` to keep the effect contained.

```css
.hero-card {
  isolation: isolate;
  position: relative;
}

.hero-card__overlay {
  background: #2563eb;
  inset: 0;
  mix-blend-mode: multiply;
  position: absolute;
}
```

## Accessibility and performance

Filters and blend modes can reduce text contrast or make interfaces harder to understand. Check the final result against different backgrounds, and avoid relying on a visual effect as the only way to communicate information.

Large blurred areas and animated filters can also be expensive to render. Apply them to small regions, animate them sparingly, and test on lower-powered devices.

## Key takeaways

- Use `filter` to change an element's rendered appearance without modifying its source.
- Combine filter functions carefully because order can change the result.
- Use `backdrop-filter` for content behind a translucent element.
- Use `mix-blend-mode` for elements and `background-blend-mode` for background layers.
- Preserve contrast, include sensible fallbacks, and avoid expensive effects on large areas.
