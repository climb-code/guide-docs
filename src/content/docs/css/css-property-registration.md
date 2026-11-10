---
title: CSS Custom Property Registration
description: Register CSS custom properties with @property to define their syntax, inheritance, and initial value.
---

CSS custom properties declared with `--name` are flexible, but browsers treat their values as untyped token streams. The `@property` at-rule registers a custom property with a defined syntax, inheritance behavior, and initial value. This lets the browser validate values and interpolate compatible values during transitions and animations.

## Register a property

Use a dashed custom property name and provide the `syntax` and `inherits` descriptors. For typed syntaxes, also provide an `initial-value`:

```css
@property --card-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

.card {
  gap: var(--card-gap);
}
```

The browser checks assignments against the registered syntax. A value such as `large` is not a valid `<length>`, so it is not accepted for `--card-gap`.

## Understand the descriptors

| Descriptor | Purpose |
| --- | --- |
| `syntax` | Describes the allowed value type, such as `<length>`, `<color>`, or `<number>`. Use `"*"` to accept any token sequence. |
| `inherits` | Set to `true` to inherit the value from a parent, or `false` to keep the property local to each element. |
| `initial-value` | Supplies the registered property's starting value. It is required for typed syntaxes and must be computationally independent. |

## Animate a registered property

Unregistered custom properties do not interpolate as typed values. Register a color to let CSS transition between colors:

```css
@property --button-color {
  syntax: "<color>";
  inherits: false;
  initial-value: steelblue;
}

.button {
  background-color: var(--button-color);
  transition: --button-color 200ms ease;
}

.button:hover {
  --button-color: tomato;
}
```

The registered custom property changes as a color, so the transition can interpolate between its starting and ending colors.

## Choose whether the value inherits

Set `inherits: true` when descendants should receive a value from an ancestor, as with a theme token. Use `false` when each element should start from the declared initial value unless it has its own assignment.

```css
@property --theme-accent {
  syntax: "<color>";
  inherits: true;
  initial-value: rebeccapurple;
}

.dark-theme {
  --theme-accent: lightseagreen;
}

.link {
  color: var(--theme-accent);
}
```

## When to use `@property`

- Register a custom property when you need the browser to understand its value type.
- Use a typed property when its value should transition or animate smoothly.
- Choose `inherits` deliberately; registration changes the property's inheritance behavior from the usual behavior of unregistered custom properties.
- Keep a fallback in `var()` when a declaration should remain useful if a custom property has no usable value.

## Key takeaways

- `@property` gives a custom property a syntax, inheritance setting, and initial value.
- Typed registrations allow the browser to validate values and interpolate them in animations.
- The `syntax` and `inherits` descriptors are required. Typed syntaxes also need an initial value.

For compatibility details and syntax options, see [MDN's `@property` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40property).
