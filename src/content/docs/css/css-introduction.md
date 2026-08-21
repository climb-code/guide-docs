---
title: Introduction to CSS
description: Learn what CSS is, its basic syntax, and the three ways to add styles to an HTML page.
---

CSS stands for **Cascading Style Sheets**. It is used to control how HTML content looks in the browser—such as colors, fonts, spacing, sizes, and page layout.

HTML gives a page its structure, while CSS gives it presentation and design.

```html
<h1>Welcome to my website</h1>
<p>This paragraph is created with HTML.</p>
```

```css
h1 {
  color: royalblue;
}

p {
  font-size: 18px;
}
```

## Why use CSS?

CSS helps us to:

- Make websites visually attractive.
- Apply the same design to multiple pages.
- Build responsive layouts for mobile, tablet, and desktop.
- Keep content (HTML) and presentation (CSS) separate.
- Change the design without rewriting the HTML structure.

## CSS syntax

A CSS rule has two main parts: a **selector** and a **declaration block**.

```css
selector {
  property: value;
}
```

Example:

```css
h1 {
  color: green;
  text-align: center;
}
```

| Part | Example | Purpose |
| --- | --- | --- |
| Selector | `h1` | Selects the HTML element to style. |
| Property | `color` | Defines what should change. |
| Value | `green` | Defines the new style. |
| Declaration | `color: green;` | One property-value pair. |

In the example, every `<h1>` element will have green, centered text.

## Your first CSS example

Create an `index.html` file and add this code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First CSS Page</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f7ff;
      }

      h1 {
        color: #2563eb;
      }

      p {
        color: #374151;
      }
    </style>
  </head>
  <body>
    <h1>Hello, CSS!</h1>
    <p>CSS makes this page easier to read and more attractive.</p>
  </body>
</html>
```

Open the file in a browser. The page will show a light background, a blue heading, and dark-gray paragraph text.

## Ways to add CSS

There are three common ways to apply CSS to HTML.

### 1. Inline CSS

Inline CSS is written directly inside an HTML element using the `style` attribute.

```html
<p style="color: tomato; font-size: 18px;">This is a styled paragraph.</p>
```

Use it only for quick experiments or very small one-off changes. It becomes hard to maintain when a project grows.

### 2. Internal CSS

Internal CSS is placed inside a `<style>` tag in the HTML document's `<head>`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      h2 {
        color: purple;
      }
    </style>
  </head>
  <body>
    <h2>Internal CSS example</h2>
  </body>
</html>
```

It works well for a single page or a small demo.

### 3. External CSS

External CSS is stored in a separate `.css` file. This is the recommended approach for most projects because the same stylesheet can be reused across many HTML pages.

First, create `styles.css`:

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
}

h1 {
  color: #0f766e;
}
```

Then connect it in `index.html`:

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

:::tip
Use external CSS for real projects. It keeps your code organized and lets you update a site's design from one place.
:::

## CSS comments

Comments help explain CSS code. Browsers ignore them.

```css
/* This styles the main page heading */
h1 {
  color: #1d4ed8;
}
```

## Common mistakes

- Forgetting the semicolon after a declaration, especially when another declaration follows.
- Writing a property outside the curly braces.
- Linking the wrong stylesheet path in `<link rel="stylesheet" href="...">`.
- Using inline CSS everywhere instead of a reusable external stylesheet.

## Key points

- CSS styles HTML elements.
- A CSS rule follows the format `selector { property: value; }`.
- CSS can be inline, internal, or external.
- External stylesheets are the best default for maintainable projects.

## Next topic

Continue with **CSS Selectors** to learn how CSS targets particular HTML elements.
