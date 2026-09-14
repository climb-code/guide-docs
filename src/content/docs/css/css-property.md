---
title: CSS @property
description: Define typed, inheritable, and animatable CSS custom properties with the @property at-rule.
---

Custom properties, also called CSS variables, are flexible values that begin with `--`. The `@property` at-rule gives a custom property more structure: you can define its type, whether it inherits, and its initial value.

This is especially helpful when a custom property must animate smoothly or should reject invalid values.

## Define a typed property

Use `@property` with a name, `syntax`, `inherits`, and `initial-value`.

```css
@property --accent-color {
  syntax: "<color>";
  inherits: true;
  initial-value: #2563eb;
}
```

The `syntax` descriptor tells the browser which kind of value the property accepts. Common values include `<color>`, `<length>`, `<number>`, `<percentage>`, and `<angle>`.

```css
.button {
  --accent-color: #7c3aed;
  background: var(--accent-color);
}
```

## Control inheritance

Normal custom properties inherit from a parent. Set `inherits: false` when each element should begin with its own initial value instead.

```css
@property --card-scale {
  syntax: "<number>";
  inherits: false;
  initial-value: 1;
}

.card {
  transform: scale(var(--card-scale));
}
```

With `inherits: false`, setting `--card-scale` on a parent does not change child cards automatically.

## Animate a custom property

Untyped custom properties often animate as a discrete jump. A typed property can interpolate when the value type supports it.

```css
@property --glow-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #60a5fa;
}

.status-dot {
  --glow-color: #22c55e;
  background: var(--glow-color);
  box-shadow: 0 0 0 var(--glow-color);
  transition: --glow-color 200ms ease;
}

.status-dot.is-busy {
  --glow-color: #f59e0b;
}
```

The browser now knows it should blend between two color values during the transition.

## Animate a numeric value

Typed number and angle properties are useful in generated visuals and transforms.

```css
@property --rotation {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.loader {
  transform: rotate(var(--rotation));
  transition: --rotation 500ms ease;
}

.loader.is-active {
  --rotation: 360deg;
}
```

## Invalid values fall back safely

The declared syntax prevents incompatible values from being applied.

```css
@property --panel-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

.panel {
  gap: var(--panel-gap);
  --panel-gap: blue; /* Invalid, so the initial value is used. */
}
```

## When to use `@property`

Use it for custom properties that benefit from validation, predictable inheritance, or animation. For simple theme values such as `--brand-color` that only provide a reusable value, a regular custom property is usually enough.

## Key takeaways

- `@property` gives a custom property a type, inheritance behavior, and initial value.
- Typed custom properties can animate smoothly between compatible values.
- Set `inherits: false` for values that should remain local to each element.
- Keep ordinary custom properties for simple reusable tokens; add `@property` when its extra behavior matters.
