---
title: CSS Margin Collapsing
description: Understand how vertical margins combine in normal block flow and how to control component spacing.
---

In normal block layout, some vertical margins collapse into a single margin. This explains why two stacked elements do not always have the sum of their margins between them.

## Adjacent block margins

When two positive vertical margins collapse, the larger margin wins:

```html
<p class="first">First paragraph</p>
<p class="second">Second paragraph</p>
```

```css
.first {
  margin: 0 0 24px;
}

.second {
  margin: 16px 0 0;
}
```

The space between these paragraphs is `24px`, rather than `40px`. Horizontal margins do not collapse. Margins of flex and grid items do not collapse either.

## Parent and child margins

A parent's top margin can collapse with its first in-flow child's top margin when no border, padding, inline content, or other separating condition prevents it. The child's margin may then appear outside the parent background.

```html
<section class="panel">
  <h2>CSS spacing</h2>
  <p>Keep spacing predictable.</p>
</section>
```

```css
.panel {
  background: #e0f2fe;
  display: flow-root;
}

.panel h2 {
  margin-block-start: 24px;
}
```

`display: flow-root` establishes a block formatting context, preventing margins from collapsing between the panel and its children. It does not stop adjacent child margins from collapsing with each other.

If you want intentional internal spacing, use padding instead:

```css
.panel {
  padding: 24px;
  background: #e0f2fe;
}

.panel h2 {
  margin-block-start: 0;
}
```

## Use gap for component stacks

Flexbox with `gap` gives repeated components consistent spacing without margin collapsing:

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stack > * {
  margin: 0;
}
```

## Negative margins and empty blocks

- If positive and negative margins collapse, combine the largest positive margin with the most negative margin. For example, `24px` and `-8px` produce `16px`.
- If all collapsed margins are negative, the most negative value wins.
- An empty block's top and bottom margins can collapse when no border, padding, content, height, or minimum height separates them.

Bottom margins can also collapse between parents and their last in-flow child when the relevant sizing and separation conditions allow it.

## Common mistakes

- Expecting stacked vertical margins to always add together.
- Using margin to create internal spacing when padding expresses the design better.
- Assuming `flow-root` prevents every kind of margin collapsing.
- Adding `overflow: hidden` only to fix margins, which can also clip content.

## Related topics

- [CSS Box Model](/css/css-box-model/)
- [CSS Display](/css/css-display/)
- [CSS Flexbox](/css/css-flexbox/)
