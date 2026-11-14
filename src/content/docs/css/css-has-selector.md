---
title: CSS :has() Selector
description: Select elements based on the other elements they contain or are followed by.
---

The relational pseudo-class `:has()` matches an element when its relative selector argument matches. It lets CSS style a parent or sibling based on what appears inside or next to it.

```css
/* A card that contains a featured badge */
.card:has(.badge--featured) {
  border-color: rebeccapurple;
}
```

In this example, the `.card` receives the border only when it contains an element with the `badge--featured` class.

## Select a parent based on a child

Use `:has()` to style a form field when it contains an invalid control, or a list item when it contains a link.

```css
.field:has(input:invalid) {
  border-color: crimson;
}

li:has(> a) {
  font-weight: 600;
}
```

The argument can include a combinator such as `>` to require a direct child. Without it, the selector can match a descendant at any depth.

## Check for a following sibling

The argument may begin with a combinator. This lets an element respond to a matching sibling that follows it.

```css
/* Add space after a heading only when a paragraph follows it */
h2:has(+ p) {
  margin-bottom: 0.25rem;
}
```

Here `+ p` means the next sibling must be a paragraph. Use `~ p` to match when any later sibling is a paragraph.

## Combine conditions

You can place a selector list inside `:has()`. The outer element matches when at least one of those selectors matches.

```css
.form:has(input:invalid, select:invalid) {
  outline: 2px solid crimson;
}
```

Multiple `:has()` conditions can require more than one relationship:

```css
.card:has(img):has(.caption) {
  display: grid;
}
```

This card must contain both an image and a caption.

## Use it for progressive enhancement

When a browser does not support a selector, an unsupported rule is ignored. If the enhanced styling is optional, keep a working base style and add the enhancement inside a feature query.

```css
.field {
  border: 1px solid #94a3b8;
}

@supports selector(.field:has(input)) {
  .field:has(input:focus-visible) {
    border-color: royalblue;
  }
}
```

Check browser support for the browsers your project needs before relying on `:has()` for essential behavior. It only changes presentation; use HTML validation and JavaScript when behavior or data validation is required.

## Keep selectors understandable

Prefer a clear, narrowly scoped selector, especially in large documents. Deep or broad relational selectors can be harder to maintain and may require the browser to check many elements when the DOM changes.

```css
/* Clear: check a specific component */
.checkout-form:has(input:invalid) {
  border-color: crimson;
}

/* Usually harder to reason about: check nearly any element */
body:has(.error) main section article {
  opacity: 0.7;
}
```

## Key points

- `:has()` matches an element based on a relative selector inside its parentheses.
- It can inspect descendants, direct children, and following siblings.
- Multiple conditions can be combined to express component states.
- Keep the selector scoped and verify browser support for your audience.
- Use HTML and JavaScript for behavior that CSS cannot provide.
