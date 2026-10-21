---
title: CSS Intrinsic Size Interpolation
description: Transition between fixed sizes and intrinsic CSS sizes such as auto with interpolate-size and calc-size().
---

Intrinsic sizing keywords such as `auto`, `min-content`, and `max-content` describe sizes derived from content or layout. They traditionally do not interpolate with a fixed length such as `0px`. The inherited `interpolate-size` property opts into interpolation between an intrinsic size keyword and a `<length-percentage>` value.

## Opt into keyword interpolation

Set `interpolate-size: allow-keywords` on the page or on the element that needs the transition:

```css
:root {
  interpolate-size: allow-keywords;
}

.accordion__content {
  height: 0;
  overflow: clip;
  transition: height 250ms ease;
}

.accordion[open] .accordion__content {
  height: auto;
}
```

When the disclosure opens, the browser can interpolate from `0` to the content's `auto` height. Since the property inherits, setting it on `:root` enables the behavior throughout the page; set it on a smaller component when a narrower scope is preferable.

## Use `calc-size()` for a calculation

Use `calc-size()` when you need to calculate from an intrinsic size instead of using the keyword by itself. The `size` keyword in the calculation represents the chosen intrinsic size:

```css
.label {
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  transition: width 300ms ease;
}

.label:hover {
  width: calc-size(max-content, size + 1rem);
}
```

This expands to the label's content width plus `1rem`. `calc()` alone cannot perform arithmetic on an intrinsic keyword such as `max-content`.

## Keep a usable baseline

Browsers that do not support intrinsic-size interpolation still apply the underlying closed and open styles, but the transition may jump instead of animating. The page should remain understandable without the effect. You can also limit the opt-in to browsers that recognize the property:

```css
.accordion__content {
  height: 0;
  overflow: clip;
}

.accordion[open] .accordion__content {
  height: auto;
}

@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }

  .accordion__content {
    transition: height 250ms ease;
  }
}
```

Check current browser support for `interpolate-size` and `calc-size()` before relying on the animation in production. Keep the content available and avoid using size transitions as the only way to reveal important information.

## Common mistakes

- Expecting two different intrinsic keywords, such as `auto` and `min-content`, to interpolate with `interpolate-size`; the opt-in covers a length-percentage paired with an intrinsic keyword.
- Assuming a transition works without declaring a transition for the size property.
- Applying `overflow: hidden` without considering whether focus outlines or other visible content will be clipped.
- Enabling the feature globally without checking how existing transitions behave.
- Treating an animation as a substitute for a functional open/close interaction.

## Key takeaways

- `interpolate-size: allow-keywords` enables interpolation between a `<length-percentage>` and a compatible intrinsic size keyword.
- The property inherits, so a root-level opt-in affects descendants.
- `calc-size()` allows calculations based on an intrinsic size.
- Use a working non-animated state and check browser support.

## References

- [W3C CSS Values and Units Level 5: Calculating with intrinsic sizes](https://www.w3.org/TR/css-values-5/#calc-size)
- [W3C CSS Values and Units Level 5: Interpolating sizing keywords](https://www.w3.org/TR/css-values-5/#interpolate-size)
