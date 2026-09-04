---
title: CSS Cascade and Specificity
description: Learn how CSS resolves competing rules using origin, importance, specificity, and source order.
---

The **cascade** is the set of rules CSS uses when more than one declaration applies to the same element. Understanding it helps you fix styles without reaching for `!important`.

```css
p {
  color: slategray;
}

.notice {
  color: rebeccapurple;
}
```

For a paragraph with `class="notice"`, the text is `rebeccapurple` because the class selector is more specific than the element selector.

## How the cascade chooses a declaration

When declarations conflict, the browser considers them in this order:

1. **Origin and importance** — browser, user, and author styles have different priority; `!important` changes that priority.
2. **Specificity** — the more specific selector wins when the competing rules have the same origin and importance.
3. **Source order** — if specificity is tied, the declaration written later wins.

Declarations on an element with the `style` attribute generally override normal rules in a stylesheet. Prefer stylesheet classes for maintainable application styles.

## Specificity

Specificity can be thought of as a three-part score:

| Selector type | Score contribution |
| --- | --- |
| ID selector, such as `#profile` | `1-0-0` |
| Class, attribute, or pseudo-class, such as `.card`, `[open]`, `:hover` | `0-1-0` |
| Type selector or pseudo-element, such as `button`, `::before` | `0-0-1` |

Compare each column from left to right. One ID beats any number of classes; one class beats any number of type selectors.

```css
button {                 /* 0-0-1 */
  color: black;
}

.toolbar button {        /* 0-1-1 */
  color: navy;
}

#account .toolbar button { /* 1-1-1 */
  color: teal;
}
```

Avoid treating specificity as a number to make as large as possible. Low, predictable specificity is easier to override.

## Source order

When two matching selectors have equal specificity, the last declaration wins.

```css
.button {
  background: #e2e8f0;
}

.button {
  background: #2563eb;
}
```

The button has a blue background because the second rule appears later.

## Inheritance and keywords

Some properties, including `color` and `font-family`, inherit from a parent by default. Others, including `margin` and `border`, do not.

```css
.article {
  color: #1f2937;
  font-family: Georgia, serif;
}

.article a {
  color: inherit;
}
```

Useful cascade keywords include:

- `inherit` — use the parent’s computed value.
- `initial` — use the property’s initial value from the CSS specification.
- `unset` — inherit an inheriting property; otherwise use its initial value.
- `revert` — roll the value back to a lower-priority origin, often the browser default.

## The `!important` escape hatch

`!important` makes a declaration outrank normal declarations in the same origin. It can make later changes surprisingly difficult, so reserve it for narrowly scoped utility overrides or third-party styles you cannot change.

```css
/* Avoid as a default styling strategy. */
.is-hidden {
  display: none !important;
}
```

Before using it, try a clearer class, a better stylesheet order, or a selector with only the specificity needed for the component.

## Practical pattern

Use a single component class and modifier classes instead of deeply nested selectors.

```html
<button class="button button--primary">Save</button>
```

```css
.button {
  border: 1px solid transparent;
  border-radius: 0.375rem;
  padding: 0.5rem 0.875rem;
}

.button--primary {
  background: #2563eb;
  color: white;
}
```

This keeps rules easy to read, reuse, and override as the stylesheet grows.
