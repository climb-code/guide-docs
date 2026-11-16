---
title: CSS Animation Composition
description: Combine multiple CSS animations on the same property with replace, add, and accumulate.
---

When multiple animations affect the same property on one element, CSS needs a rule for combining their values. The `animation-composition` property selects that rule for each animation.

## The default: replace

The default value is `replace`. Each animation supplies its own value for the property, replacing the value underneath it in the animation stack.

```css
@keyframes move-right {
  to {
    transform: translateX(2rem);
  }
}

@keyframes move-up {
  to {
    transform: translateY(-1rem);
  }
}

.card {
  animation: move-right 1s linear, move-up 1s linear;
}
```

Both animations target `transform`. With the default `replace` behavior, they do not combine into a diagonal movement; the later animation in the list takes precedence for that property.

## Add animation values together

Use `add` when an animation should contribute to the value already provided by the underlying style or another animation. For transform-like values, this can combine separate movement effects.

```css
.card {
  transform: rotate(-3deg);
  animation:
    move-right 1s linear infinite alternate,
    move-up 1s ease-in-out infinite alternate;
  animation-composition: add, add;
}
```

The comma-separated `animation-composition` values correspond by position to the animations in the `animation` list. The first `add` applies to `move-right`; the second applies to `move-up`.

The way values combine depends on the property. Not every CSS value type supports meaningful addition, so test the properties and keyframes used by your effect.

## Accumulate values

`accumulate` combines an effect with the underlying value using the property's accumulation behavior. For some value types, this behaves like addition; for others, it has distinct rules.

```css
@keyframes nudge {
  to {
    translate: 0.25rem 0;
  }
}

.notification {
  animation: nudge 300ms ease-in-out 3 alternate;
  animation-composition: accumulate;
}
```

Use `accumulate` when that property-specific behavior is what the effect needs. For common cases, `replace` or `add` is usually easier to predict.

## Set composition on individual keyframes

You can also set `animation-composition` inside an `@keyframes` rule. It applies to the declared animated properties from that keyframe until another keyframe changes their composition.

```css
@keyframes pulse-scale {
  from {
    scale: 1;
    animation-composition: add;
  }

  to {
    scale: 1.15;
  }
}
```

Setting composition on the element is often simpler when the same rule should apply throughout the animation. Use keyframe-level composition when the effect needs to change how a property combines at different points.

## Keep motion accessible

Composing animations can create more movement than either effect alone. Reduce or remove nonessential motion for users who request it.

```css
@media (prefers-reduced-motion: reduce) {
  .card,
  .notification {
    animation: none;
  }
}
```

Check support in the browsers your project targets. If composition is an enhancement, keep the base style usable when the property is unsupported.

## Key points

- `replace` is the default and lets an animation override the underlying animated value.
- `add` combines an animation's value with the underlying value when that value type supports it.
- `accumulate` uses the property's accumulation behavior.
- Comma-separated composition values match the corresponding animations by position.
- Keep motion purposeful, check target browser support, and respect reduced-motion preferences.
