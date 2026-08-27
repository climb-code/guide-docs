---
title: CSS Display
description: Learn how block, inline, inline-block, flex, grid, and hidden elements participate in CSS layout.
---

The `display` property controls how an element generates boxes and how those boxes participate in page layout.

```css
.element {
  display: block;
}
```

HTML elements have browser defaults, but CSS can change their display behavior.

## Block elements

A block element normally starts on a new line and expands to fill the available inline width.

Common block elements include `<div>`, `<section>`, `<article>`, `<p>`, and headings.

```css
.notice {
  display: block;
  width: 100%;
  padding: 1rem;
}
```

Width, height, padding, border, and margin work predictably on block boxes.

## Inline elements

An inline element flows within a line of text and only uses the space its content needs.

Common inline elements include `<span>`, `<a>`, `<strong>`, and `<em>`.

```css
.keyword {
  display: inline;
  color: #7c3aed;
}
```

Normal inline elements ignore `width` and `height`. Their top and bottom margins also do not move surrounding lines in the same way as block margins.

## Inline-block

`inline-block` flows alongside text like an inline element but accepts box dimensions like a block element.

```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: #dbeafe;
}
```

It is useful for badges, tags, and small buttons that should remain in the text flow.

## None

`display: none` removes an element and its descendants from the layout.

```css
.mobile-only {
  display: none;
}

@media (max-width: 48rem) {
  .mobile-only {
    display: block;
  }
}
```

The hidden element takes no space and is generally absent from the accessibility tree. Do not use it to hide content that assistive technology still needs to access.

## Display and visibility

`visibility: hidden` hides an element but preserves its layout space.

```css
.reserved-space {
  visibility: hidden;
}
```

| Rule | Visible? | Uses layout space? |
| --- | --- | --- |
| `display: none` | No | No |
| `visibility: hidden` | No | Yes |
| `opacity: 0` | No | Yes |

An element with `opacity: 0` can still receive pointer or keyboard interaction unless you manage that behavior separately.

## Flex display

`display: flex` turns an element into a flex container. Its direct children become flex items arranged in a row by default.

```css
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
```

Flexbox is designed for one-dimensional layout: arranging items mainly in a row or a column.

```css
.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

## Inline flex

`inline-flex` creates a flex container that participates in its parent layout as an inline-level box.

```css
.icon-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
```

Its children behave as flex items, while the container itself can sit within a line.

## Grid display

`display: grid` creates a grid container. It is useful for two-dimensional layouts with rows and columns.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
```

A responsive grid can create as many columns as fit:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}
```

## Inline grid

`inline-grid` gives the children grid behavior while the grid container itself participates as an inline-level box.

```css
.rating {
  display: inline-grid;
  grid-auto-flow: column;
  gap: 0.25rem;
}
```

## Flow root

`display: flow-root` creates a new block formatting context. One useful effect is containing floated children.

```css
.article-section {
  display: flow-root;
}

.article-section img {
  float: left;
  margin-right: 1rem;
}
```

Without containment, a parent with only floated children may not expand to their height.

## Contents

`display: contents` removes an element's own box while keeping its children in the layout.

```css
.wrapper {
  display: contents;
}
```

This can help children participate directly in an outer grid, but browser and accessibility behavior should be tested carefully before using it on meaningful semantic elements.

## List items

`display: list-item` creates a block box with a list marker.

```css
.custom-item {
  display: list-item;
  margin-left: 1.5rem;
}
```

Native `<ul>` and `<ol>` elements are usually the better choice because they preserve list semantics.

## Outer and inner display behavior

Modern display values describe two ideas:

- The **outer** display type controls how the element participates in its parent's layout.
- The **inner** display type controls how the element lays out its children.

For example, `inline-flex` means an inline outer box with a flex inner layout.

## Changing semantic elements

Changing `display` affects layout, not HTML meaning.

```css
nav a {
  display: block;
}
```

The anchor remains a link even though it now creates a block box. Choose HTML based on meaning and use CSS for presentation.

## Responsive display

Media queries can change layout mode as space changes.

```css
.dashboard {
  display: block;
}

@media (min-width: 48rem) {
  .dashboard {
    display: grid;
    grid-template-columns: 16rem 1fr;
    gap: 2rem;
  }
}
```

Start with a simple layout for small screens, then enhance it when more width is available.

## Complete example

```html
<section class="features">
  <article class="feature">Fast setup</article>
  <article class="feature">Responsive design</article>
  <article class="feature">Accessible content</article>
</section>
```

```css
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.feature {
  display: flex;
  align-items: center;
  min-height: 8rem;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}
```

The outer grid creates responsive columns, while each card uses flexbox to align its content.

## Common mistakes

- Setting width and height on a normal inline element and expecting them to apply.
- Using `display: none` for content that should remain available to screen readers.
- Choosing flexbox for a layout that needs strong row and column alignment.
- Adding wrapper elements only for layout when an existing semantic element can be styled.
- Assuming a CSS display value changes an element's HTML meaning.

## Key points

- Block boxes take available width; inline boxes flow with text.
- `inline-block` combines inline flow with block-like sizing.
- Flexbox handles one-dimensional layout; grid handles two-dimensional layout.
- `display: none` removes an element from layout.
- Display changes presentation without changing document semantics.

## Next topic

Continue with **CSS Positioning** to learn how static, relative, absolute, fixed, and sticky positioning place elements.
