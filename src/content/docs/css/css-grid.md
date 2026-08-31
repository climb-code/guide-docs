---
title: CSS Grid
description: Learn how to build two-dimensional layouts with CSS Grid, including tracks, placement, alignment, and responsive patterns.
---

CSS Grid is a two-dimensional layout system. It lets you control both rows and columns, making it well suited to page layouts, card collections, dashboards, and galleries.

```css
.layout {
  display: grid;
}
```

The element with `display: grid` is the **grid container**. Its direct children become **grid items**.

## Create columns and rows

Use `grid-template-columns` and `grid-template-rows` to define grid tracks.

```css
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}
```

The `fr` unit represents a fraction of the available space. In this example, the three columns have equal widths.

```css
.page {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 2rem;
}
```

Here, the sidebar has a fixed width and the main content uses the remaining space.

## Repeat columns

`repeat()` makes repeated tracks easier to read and maintain.

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
```

This is equivalent to writing `1fr` four times.

## Gap

Use `gap` to add spacing between rows and columns.

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1rem;
  column-gap: 1.5rem;
}
```

Unlike margins on individual items, `gap` does not create unwanted space around the outside of the grid.

## Place items with grid lines

Grid lines are numbered from the start of the grid. Use them to choose where an item begins and ends.

```css
.featured {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

The featured item spans from column line 1 to line 3, so it occupies two columns.

You can use `span` when only the number of tracks matters:

```css
.wide-card {
  grid-column: span 2;
}
```

## Named grid areas

Named areas make larger page layouts easy to understand.

```css
.site-layout {
  display: grid;
  grid-template-columns: 14rem 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 1rem;
}

header { grid-area: header; }
aside { grid-area: sidebar; }
main { grid-area: main; }
footer { grid-area: footer; }
```

Each quoted row describes the placement of areas in that row.

## Automatic placement

Grid places items into the next available cell by default. `grid-auto-flow` changes that behavior.

```css
.masonry-like-layout {
  display: grid;
  grid-auto-flow: dense;
}
```

Avoid relying on `dense` placement when visual order must match keyboard and screen-reader order, because it can move later items into earlier visual gaps.

## Align items and the grid

`justify-items` and `align-items` align content inside each grid cell.

```css
.icons {
  display: grid;
  place-items: center;
}
```

`place-items` is shorthand for `align-items` and `justify-items`.

Use `justify-content`, `align-content`, or `place-content` to position the whole grid inside its container when there is unused space.

```css
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 3rem);
  place-content: center;
}
```

## Responsive grids

Combine `repeat()`, `auto-fit`, and `minmax()` to create columns that adapt without a media query.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}
```

Each card is at least `16rem` wide. The browser adds as many columns as fit and expands them to share remaining space.

Use `auto-fill` when you want to preserve empty tracks; use `auto-fit` when existing tracks should stretch to fill the row.

## Page layout example

```html
<div class="page">
  <header>Guide Docs</header>
  <aside>Navigation</aside>
  <main>Article content</main>
</div>
```

```css
.page {
  display: grid;
  grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
  grid-template-areas:
    "header header"
    "sidebar content";
  gap: 1.5rem;
}

.page > header { grid-area: header; }
.page > aside { grid-area: sidebar; }
.page > main { grid-area: content; }

@media (max-width: 48rem) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "content";
  }
}
```

`minmax(0, 1fr)` allows the main content column to shrink below its intrinsic size, which helps prevent overflowing content from widening the layout.

## Common mistakes

- Expecting nested elements to become grid items; only direct children of the grid container are grid items.
- Using fixed column widths that overflow smaller screens.
- Confusing grid lines with grid columns—the line numbers surround each column.
- Using visual reordering in a way that breaks the logical reading order.
- Forgetting to test layouts with long text and narrow viewports.

## Key points

- Grid controls rows and columns at the same time.
- Use `fr`, `repeat()`, and `minmax()` for flexible track sizes.
- `gap` adds reliable space between tracks.
- Grid lines and named areas provide precise placement.
- `auto-fit` with `minmax()` is a practical responsive-card pattern.

## Next topic

Continue with **Responsive Web Design** to learn how layouts adapt to screens, user preferences, and different devices.
