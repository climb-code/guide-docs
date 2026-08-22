---
title: CSS Selectors
description: Learn how to target HTML elements with element, class, ID, attribute, combinator, and pseudo-class selectors.
---

CSS selectors tell the browser which HTML elements should receive a set of styles.

```css
selector {
  property: value;
}
```

For example, this rule selects every paragraph:

```css
p {
  color: navy;
}
```

## Element selector

An element selector uses an HTML tag name. It applies the rule to every matching element.

```css
h1 {
  font-size: 2.5rem;
}

p {
  line-height: 1.6;
}
```

## Class selector

A class selector starts with a dot (`.`). Classes are reusable, so multiple elements can share the same class.

```html
<p class="highlight">Important information</p>
<span class="highlight">New</span>
```

```css
.highlight {
  background-color: gold;
  color: #222;
}
```

An element can also have more than one class:

```html
<button class="button button-primary">Save</button>
```

## ID selector

An ID selector starts with a hash (`#`). An ID should be unique on a page.

```html
<section id="contact">Contact details</section>
```

```css
#contact {
  padding: 2rem;
  background-color: #f3f4f6;
}
```

:::tip
Prefer classes for reusable styling. IDs are more specific and are commonly used for unique page sections, links, or JavaScript hooks.
:::

## Universal selector

The universal selector (`*`) matches every element.

```css
* {
  box-sizing: border-box;
}
```

It can also match every element inside a particular container:

```css
.card * {
  margin-top: 0;
}
```

## Grouping selectors

Separate selectors with commas when they should share the same declarations.

```css
h1,
h2,
h3 {
  font-family: Georgia, serif;
  color: #172554;
}
```

This avoids repeating the same styles for each heading.

## Attribute selectors

Attribute selectors target elements according to their attributes or attribute values.

```css
/* Every input with the required attribute */
input[required] {
  border-left: 4px solid orange;
}

/* Links that open in a new tab */
a[target="_blank"] {
  color: purple;
}

/* Links whose href begins with https */
a[href^="https"] {
  text-decoration-style: dotted;
}
```

Common attribute operators include:

| Selector | Meaning |
| --- | --- |
| `[attr]` | Has the attribute. |
| `[attr="value"]` | Has the exact value. |
| `[attr^="value"]` | Value starts with the text. |
| `[attr$="value"]` | Value ends with the text. |
| `[attr*="value"]` | Value contains the text. |

## Descendant and child selectors

A space selects matching descendants at any level:

```css
article p {
  color: #374151;
}
```

The child combinator (`>`) selects only direct children:

```css
nav > a {
  padding: 0.5rem 1rem;
}
```

Given this HTML, `nav > a` selects the first link but not the nested link:

```html
<nav>
  <a href="/">Home</a>
  <div>
    <a href="/about">About</a>
  </div>
</nav>
```

## Sibling selectors

The adjacent sibling combinator (`+`) selects the next matching sibling:

```css
h2 + p {
  font-size: 1.1rem;
}
```

The general sibling combinator (`~`) selects all later matching siblings:

```css
h2 ~ p {
  color: #4b5563;
}
```

## Pseudo-classes

Pseudo-classes select an element in a particular state.

```css
a:hover {
  color: crimson;
}

input:focus {
  outline: 3px solid skyblue;
}

li:first-child {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f8fafc;
}
```

## Pseudo-elements

Pseudo-elements style a specific part of an element. They usually use two colons (`::`).

```css
p::first-letter {
  font-size: 2rem;
  font-weight: bold;
}

.external-link::after {
  content: " ↗";
}
```

## Combining selectors

You can combine selectors to target elements more precisely.

```css
/* A paragraph that has the class note */
p.note {
  border-left: 4px solid royalblue;
}

/* A primary button while the pointer is over it */
.button.primary:hover {
  background-color: #1d4ed8;
}
```

Do not add a space between selectors when they must match the same element. `.button.primary` means one element has both classes, while `.button .primary` means a `.primary` element is inside a `.button` element.

## Specificity basics

When more than one rule matches an element, the browser uses specificity and source order to decide which declaration wins.

In general:

1. ID selectors are stronger than class, attribute, and pseudo-class selectors.
2. Class, attribute, and pseudo-class selectors are stronger than element selectors.
3. If specificity is equal, the rule written later wins.

```css
p {
  color: blue;
}

.message {
  color: green;
}

#success-message {
  color: purple;
}
```

For `<p id="success-message" class="message">Saved</p>`, the text is purple because the ID selector has the highest specificity.

## Common mistakes

- Writing `card` instead of `.card` for a class selector.
- Reusing the same ID on multiple elements.
- Adding an accidental space between combined class selectors.
- Creating selectors that are much more specific than necessary.
- Using `!important` as a regular fix for specificity problems.

## Key points

- Use element selectors for broad tag styles and class selectors for reusable styles.
- Use IDs for unique elements, not reusable design rules.
- Combinators describe relationships between elements.
- Pseudo-classes target states; pseudo-elements target parts of an element.
- Keep selectors short and easy to override.

## Next topic

Continue with **CSS Colors and Backgrounds** to learn how to style text, surfaces, images, and gradients.
