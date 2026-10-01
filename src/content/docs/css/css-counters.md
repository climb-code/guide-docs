---
title: CSS Counters
description: Automatically number headings and steps with CSS counters.
---

CSS counters track numbers while the browser renders a document. Use them for decorative heading numbers or step labels that follow the order of the HTML.

## Number section headings

Create a named counter on the container, increment it on each heading, and display it with generated content.

```html
<article class="guide">
  <h2>Prepare the project</h2>
  <p>Create a folder for your files.</p>
  <h2>Add the stylesheet</h2>
  <p>Link your CSS from the HTML document.</p>
</article>
```

```css
.guide {
  counter-reset: section;
}

.guide h2 {
  counter-increment: section;
}

.guide h2::before {
  content: counter(section) ". ";
}
```

The headings display `1. Prepare the project` and `2. Add the stylesheet`. Each `.guide` creates its own counter scope.

## Start at another number

The default initial value is zero. Set an initial value when a section continues a previous sequence.

```css
.continued-guide {
  counter-reset: section 4;
}
```

With the same increment rule, the first heading displays `5`. Keep the counter name consistent between reset, increment, and display rules.

## Choose a numbering style

The second argument to `counter()` controls formatting.

```css
.guide h2::before {
  content: counter(section, upper-roman) ". ";
}
```

This produces Roman numerals such as `I`, `II`, and `III`. Decimal numbering is the default.

## Preserve meaningful structure

Use an HTML `<ol>` for a meaningful ordered sequence. Its built-in numbering usually needs only `list-style-type` for customization. CSS generated labels should supplement the document; put essential instructions and references in HTML because generated content may be exposed inconsistently by assistive technology.

## Common mistakes

- Resetting the counter on each heading, which restarts the sequence.
- Forgetting the increment rule, which leaves every label at the initial value.
- Using decorative numbering as the only way to communicate a required step order.

## Further reading

See [MDN: Using CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters).
