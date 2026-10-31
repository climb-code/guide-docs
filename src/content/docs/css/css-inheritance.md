---
title: CSS Inheritance
description: Understand which CSS properties inherit from parent elements and how to control inherited values.
---

CSS **inheritance** lets some property values flow from a parent element to its descendants. It can reduce repeated declarations and is especially useful for shared text styles.

```html
<section class="article">
  <h1>CSS inheritance</h1>
  <p>This paragraph inherits its text color.</p>
</section>
```

```css
.article {
  color: #243247;
  font-family: system-ui, sans-serif;
}
```

The heading and paragraph inherit `color` and `font-family` from `.article` unless another applicable rule sets those properties directly on them.

## Which properties inherit?

Inheritance is determined by each CSS property's definition. Many text-related properties inherit, including `color`, `font-family`, `font-size`, `font-style`, and `line-height`. Layout properties such as `margin`, `padding`, `border`, and `width` generally do not inherit.

You can check a property's documentation to see whether it inherits. Do not assume that every property passes from parent to child.

## Inheritance and the cascade

An inherited value is used only when the element has no value for that property from its own declarations or other applicable cascade rules. A direct declaration on a child takes precedence over the value it would inherit:

```css
.article {
  color: #243247;
}

.article a {
  color: royalblue;
}
```

The link uses `royalblue`, while other descendants can use the inherited `#243247` color.

## Controlling inheritance with CSS-wide keywords

CSS provides keywords to explicitly choose how a property gets its value:

| Keyword | Effect |
| --- | --- |
| `inherit` | Use the computed value from the parent, even for a normally non-inherited property. |
| `initial` | Use the property's initial value defined by CSS. |
| `unset` | Act like `inherit` for inherited properties and `initial` for other properties. |
| `revert` | Roll back the value to the one supplied by an earlier cascade origin or layer. |

For example, `border: inherit` makes an element use its parent's computed border, although borders do not normally inherit.

## The `all` property

The `all` shorthand applies a CSS-wide keyword to nearly all properties on an element:

```css
.widget {
  all: unset;
}
```

Use it carefully: it can reset many expected styles at once. The `direction` and `unicode-bidi` properties are not affected by `all`.

## Practical guidance

- Set shared typography and text color on a suitable parent to avoid repetition.
- Add an explicit child rule when a descendant needs a different value.
- Remember that inherited values are distinct from the cascade: inheritance supplies a value only when the child has no winning declaration of its own.
- Avoid broad resets unless you understand which properties they will change.
