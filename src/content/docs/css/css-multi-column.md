---
title: CSS Multi-column Layout
description: Flow text across responsive columns and control gaps and content breaks.
---

Multi-column layout flows one continuous piece of content down a column and then into the next. It suits short editorial passages and reference lists. Grid and Flexbox are usually better for arranging independent interface components.

## Create responsive columns

```html
<article class="article-columns">
  <p>First paragraph of your article...</p>
  <p>Second paragraph of your article...</p>
  <p>Third paragraph of your article...</p>
</article>
```

```css
.article-columns {
  column-width: 18rem;
  column-gap: 2rem;
}
```

The browser chooses how many columns fit. `column-width` is a preferred width; actual columns can be wider or narrower depending on the available space.

## Limit the column count

```css
.article-columns {
  columns: 18rem 3;
  column-gap: 2rem;
}
```

The `columns` shorthand combines `column-width` and `column-count`. Here the layout uses at most three columns and can use fewer when space is limited.

## Add a divider

```css
.article-columns {
  column-rule: 1px solid #9ca3af;
}
```

The rule is drawn in the gap between columns. It does not allocate extra space, so provide a sufficient `column-gap`.

## Keep small blocks together

```css
.article-columns figure {
  break-inside: avoid-column;
  margin: 0 0 1rem;
}

.article-columns img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

This discourages a column break inside a figure. A block that cannot fit in a column may still need to break; avoid oversized content and test with realistic text and images.

## Span a heading across columns

```css
.article-columns h2 {
  column-span: all;
}
```

A spanning heading interrupts the column flow and occupies the available width. Content continues in columns below it.

## Check reading order

Content flows down columns in document order. Keep passages short enough that readers do not repeatedly scroll down and back up to reach the next column. Test narrow screens, zoom, and longer translations. Avoid a fixed container height unless overflow is deliberately handled, since extra columns can extend horizontally.

## Further reading

See [MDN: Multiple-column layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Multiple-column_Layout) and [handling content breaks](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout/Handling_content_breaks).
