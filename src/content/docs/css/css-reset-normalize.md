---
title: CSS Reset and Normalize
description: Understand browser defaults and choose a small CSS reset or normalization strategy.
---

Browsers provide default styles for headings, lists, buttons, and other elements. These defaults are useful, but they can introduce spacing and typography differences in a project.

## Reset vs normalize

| Approach | Purpose | Tradeoff |
| --- | --- | --- |
| Reset | Remove selected defaults so you can define your own styles | You must restore useful spacing and visual cues |
| Normalize | Preserve useful defaults while correcting browser differences | Defaults still need project-specific styling |

You do not need both by default. Start with a small baseline and add rules when your design needs them. If your project already includes a reset or normalization stylesheet, review it before adding another.

## A small project reset

Place these rules before component styles:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

button,
input,
select,
textarea {
  font: inherit;
}
```

`border-box` includes padding and borders in the declared width. Removing the body margin lets your layout control page spacing. The media rules prevent oversized images and videos from overflowing their container. Form controls inherit the surrounding font.

These media defaults are starting points: a cropped image component can override them with an explicit height and `object-fit`.

## Restore intentional component spacing

Avoid removing margins from every element unless you also define replacement styles. Scope changes to the components that need them:

```html
<article class="card">
  <h2>Learn CSS</h2>
  <p>Build a responsive layout with a clear spacing system.</p>
  <a href="/css/css-box-model/">Read the box model guide</a>
</article>
```

```css
.card {
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}

.card h2,
.card p {
  margin: 0;
}

.card > * + * {
  margin-block-start: 1rem;
}
```

The reset creates a baseline; the component defines the final design. Keep list markers, link cues, and keyboard focus indicators unless you provide suitable replacements.

## Common mistakes

- Copying a large reset without understanding the rules.
- Removing all outlines and making keyboard focus invisible.
- Removing list markers globally when they communicate meaningful structure.
- Loading a reset after component styles and overriding the intended design.
- Assuming a reset makes every browser render a page identically.

## Related topics

- [CSS Box Model](/css/css-box-model/)
- [CSS Cascade and Specificity](/css/css-cascade-specificity/)
- [CSS Accessibility](/css/css-accessibility/)
