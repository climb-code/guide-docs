---
title: CSS Functions
description: Use CSS functions to calculate values, create responsive sizes, work with colors, and reuse custom properties.
---

CSS functions take one or more values and return a value that a CSS property can use. They make styles more flexible by allowing the browser to calculate sizes, select values, transform elements, and build colors at runtime.

A function is written with a name followed by parentheses:

```css
.example {
  width: calc(100% - 2rem);
}
```

## Perform calculations with `calc()`

`calc()` combines values even when they use different units. Put spaces around the `+` and `-` operators so the expression is parsed correctly.

```css
.main-content {
  min-height: calc(100vh - 4rem);
  width: calc(100% - 2rem);
}
```

This is useful when a layout depends on both relative and fixed measurements.

## Set responsive limits with `min()`, `max()`, and `clamp()`

`min()` chooses the smallest value, while `max()` chooses the largest.

```css
.card {
  width: min(100%, 42rem);
  padding-inline: max(1rem, 4vw);
}
```

`clamp()` keeps a fluid value between a minimum and maximum. It accepts three arguments: minimum, preferred, and maximum.

```css
h1 {
  font-size: clamp(2rem, 5vw, 4.5rem);
}
```

The heading grows with the viewport but never becomes smaller than `2rem` or larger than `4.5rem`.

## Reuse values with `var()`

`var()` reads a custom property. Its optional second argument is used when the requested property is missing or invalid.

```css
:root {
  --brand-color: #2563eb;
}

.button {
  background-color: var(--button-color, var(--brand-color));
  color: white;
}
```

Here, `--button-color` can customize an individual button. Otherwise, the nested `var()` falls back to the brand color.

## Create colors with CSS functions

Color functions make colors easier to understand and adjust.

```css
.notice {
  background: rgb(219 234 254 / 70%);
  border-color: hsl(217 91% 60%);
}
```

Modern color syntax can include an alpha value after `/`. The alpha controls transparency.

The `color-mix()` function blends two colors in a chosen color space:

```css
.button:hover {
  background: color-mix(in srgb, #2563eb 80%, white);
}
```

## Apply transforms with functions

The `transform` property uses functions such as `translate()`, `rotate()`, `scale()`, and `skew()`.

```css
.card:hover {
  transform: translateY(-0.25rem) scale(1.02);
}
```

Multiple transform functions are applied from right to left, so changing their order can change the result.

## Reference files with `url()`

`url()` points to an external resource such as an image or font file.

```css
.hero {
  background-image: url("/images/hero-pattern.svg");
}
```

Relative paths are resolved from the stylesheet's location. Root-relative paths begin at the website root.

## Repeat patterns with layout functions

CSS Grid commonly uses `repeat()`, `minmax()`, and `fit-content()` to describe flexible tracks.

```css
.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
```

This creates as many columns as will fit, while preventing a column from becoming narrower than `14rem`.

## Nest functions carefully

Functions can be combined when each inner function returns a value accepted by the outer one.

```css
.panel {
  width: min(100%, calc(70rem - 4vw));
  padding: clamp(1rem, calc(0.5rem + 2vw), 3rem);
}
```

Keep deeply nested expressions readable. A custom property can give a repeated or complex expression a meaningful name.

## Key takeaways

- Use `calc()` to combine values and units.
- Use `min()`, `max()`, and `clamp()` to create responsive limits.
- Use `var()` to read custom properties and provide fallback values.
- Color, transform, URL, and Grid functions produce specialized CSS values.
- Functions can be nested, but clear expressions are easier to maintain.
