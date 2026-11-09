---
title: CSS Masks
description: Use CSS masks to control which parts of an element remain visible.
---

CSS masks use an image or gradient to control the visibility of an element. Opaque mask areas reveal the element, while transparent areas hide it. Masks are useful for fades, cutouts, and decorative shapes without changing the element's layout.

## Fade an element with a gradient

Apply a gradient mask to gradually fade the edge of an image or other element:

```css
.hero-image {
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent);
  mask-image: linear-gradient(to bottom, black 70%, transparent);
}
```

The standard `mask-image` property is paired with the WebKit-prefixed form for browsers that still need it. The black portion stays visible and the transparent end fades away.

## Use an image as a mask

An external image or SVG can define the visible shape:

```css
.avatar {
  mask-image: url("/images/circle-mask.svg");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
}
```

For predictable results, use an SVG or image with clear transparent and opaque areas. Check how the chosen asset scales at different element sizes.

## Choose how the mask combines

Use `mask-mode` to control whether the browser reads transparency or luminance from the mask image:

```css
.logo-cutout {
  mask-image: url("/images/logo-mask.png");
  mask-mode: alpha;
}
```

With `alpha`, transparency controls visibility. `luminance` uses brightness instead, where brighter mask pixels reveal more of the element.

## Keep content accessible

A mask changes appearance, not document semantics. Do not use it to hide essential text or controls from sighted users while leaving them available to assistive technology. Provide meaningful alternative text for images and keep interactive content visibly distinguishable.

## Key points

- Opaque mask regions reveal content; transparent regions hide it.
- Gradients make simple fades without extra markup.
- `mask-mode` selects alpha or luminance interpretation for image masks.
- A mask does not change layout or replace accessible content structure.
