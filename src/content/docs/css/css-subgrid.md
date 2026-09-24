---
title: CSS Subgrid
description: Let nested grid layouts inherit their parent grid tracks with CSS Subgrid.
---

CSS Subgrid lets a grid inside another grid use the parent grid's columns or rows. It solves a common layout problem: cards can have different amounts of content, but their titles, metadata, and actions still need to line up across the whole page.

## The alignment problem

Without subgrid, each card creates its own rows. A long title in one card does not affect the matching row in another card.

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}
```

This works for an individual card, but the rows are calculated independently. The action buttons may appear at different vertical positions.

## Inherit parent columns

First, define the track system on the outer grid. A nested component can span those columns and declare `subgrid` to reuse them.

```html
<section class="product-grid">
  <article class="product-card">
    <h2>Travel backpack</h2>
    <p>Lightweight carry-on storage.</p>
    <a href="/backpacks">View product</a>
  </article>
</section>
```

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.product-card {
  grid-column: span 4;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 4;
}

.product-card > * {
  grid-column: 1 / -1;
}
```

The card's children now align to the same inherited column lines as the parent grid. Note that a subgrid must span tracks in the parent grid; it has no independent track list in that direction.

## Align repeated card rows

Subgrid is especially useful when cards should share a title, description, and footer rhythm. Use a parent grid with explicit rows, then make each card span them:

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid;
}
```

Every card shares the same three row tracks. A tall description expands the parent track, which keeps the matching areas of sibling cards aligned.

## Subgrid one axis at a time

You can inherit columns, rows, or both:

```css
.component {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto auto;
}
```

Here the component inherits column tracks but owns its row sizes. This is often the most flexible choice: align a form or card to the page columns while allowing its internal content to determine height.

## Add gaps and named lines

A subgrid inherits the parent grid gaps in the subgridded direction. It can also add local line names for readability:

```css
.profile {
  display: grid;
  grid-template-columns: subgrid [avatar-start] 4rem [content-start] 1fr [content-end];
}

.profile__avatar {
  grid-column: avatar-start / content-start;
}

.profile__content {
  grid-column: content-start / content-end;
}
```

Use names that describe the component's purpose rather than relying on a parent grid's numeric line positions.

## Use a graceful fallback

When supporting older browsers, give the component a standalone layout first and enhance it in a feature query:

```css
.profile {
  display: grid;
  grid-template-columns: 4rem 1fr;
}

@supports (grid-template-columns: subgrid) {
  .profile {
    grid-template-columns: subgrid;
  }
}
```

The fallback remains a usable grid; subgrid only improves cross-component alignment where it is available.

## Key takeaways

- Use subgrid when nested components need to align to a parent grid.
- Declare `grid-template-columns: subgrid` or `grid-template-rows: subgrid` for the axis you want to inherit.
- The nested grid must span parent tracks in that same axis.
- Subgrid works well for aligned card sections, forms, and editorial layouts.
- Start with an independent grid as a fallback when needed.
