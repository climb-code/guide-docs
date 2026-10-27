---
title: CSS Table Layout
description: Style HTML tables with borders, spacing, captions, alignment, and responsive overflow.
---

HTML tables are useful for data with clear rows and columns. Keep the table structure semantic, then use CSS to make relationships easy to scan.

## Build a readable data table

```html
<div class="table-scroll">
  <table class="comparison">
    <caption>Browser support overview</caption>
    <thead>
      <tr><th scope="col">Feature</th><th scope="col">Status</th><th scope="col">Notes</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Grid</th><td>Supported</td><td>Two-dimensional layout</td></tr>
      <tr><th scope="row">Flexbox</th><td>Supported</td><td>One-dimensional layout</td></tr>
    </tbody>
  </table>
</div>
```

```css
.table-scroll {
  max-width: 100%;
  overflow-x: auto;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
  text-align: start;
}

.comparison caption {
  padding-block: 0.75rem;
  font-weight: 700;
  text-align: start;
}

.comparison th,
.comparison td {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  text-align: start;
}

.comparison thead {
  background: #f1f5f9;
}
```

Use `<caption>` to identify the table and header cells with `scope` to associate headings with their columns or rows. `border-collapse: collapse` combines adjacent cell borders into shared lines.

## Separate borders and spacing

With `border-collapse: separate`, each cell has its own border. `border-spacing` sets the horizontal and vertical gaps between them:

```css
.spaced-table {
  border-collapse: separate;
  border-spacing: 0.5rem 0.25rem;
}
```

`border-spacing` has no effect when borders are collapsed. Choose the model that matches the design and keep it consistent.

## Align content and control column sizing

```css
.comparison th,
.comparison td {
  vertical-align: top;
}

.comparison th:first-child {
  width: 12rem;
}

.fixed-columns {
  width: 100%;
  table-layout: fixed;
}
```

The default `table-layout: auto` lets cell content influence column widths. `fixed` uses the table width and declared column widths to lay out columns more predictably; long content may wrap or overflow, so provide suitable widths and wrapping rules.

## Handle narrow screens

Wide data tables can remain tabular on small screens inside a horizontally scrollable wrapper. Keep the wrapper available to keyboard users and avoid hiding columns that contain essential information.

```css
.table-scroll {
  overflow-x: auto;
  overscroll-behavior-inline: contain;
}

.comparison th,
.comparison td {
  min-width: 8rem;
}
```

## Common mistakes

- Using tables to position page content instead of using grid or flexbox.
- Omitting captions and header cells that explain the data.
- Expecting `border-spacing` to work with collapsed borders.
- Forcing a wide table to fit by making text too small to read.

## Related topics

- [CSS Border, Outlines and Shadows](/css/css-borders-outlines-shadows/)
- [CSS Overflow](/css/css-overflow/)
- [CSS Logical Properties](/css/css-logical-properties/)
