---
title: CSS Print Styles
description: Make pages readable on paper and in browser-generated PDFs with print media queries.
---

Print styles adapt a web page for paper or a browser's Save as PDF option. Hide unnecessary controls, simplify colors, and let useful content fill the page.

## Add a print media query

Keep print overrides after the screen styles so that equally specific rules can override them.

```css
@media print {
  body {
    margin: 0;
    color: #000;
    background: #fff;
    font-size: 12pt;
  }

  nav,
  .site-footer,
  .print-button {
    display: none;
  }

  main {
    width: auto;
    max-width: none;
    margin: 0;
    padding: 0;
  }
}
```

Hide elements that are unnecessary for the printed document. Keep headings, author details, and other information readers need to understand the content.

## Set page margins

`@page` describes the printed page box. Physical units are useful when specifying paper margins.

```css
@page {
  margin: 15mm;
}
```

The browser's print settings can affect the final output. Check the preview with your intended paper size, orientation, and scale.

## Control page breaks

Avoid splitting short cards and keep headings with the following content:

```css
@media print {
  .summary-card,
  figure {
    break-inside: avoid;
  }

  h2,
  h3 {
    break-after: avoid;
  }

  .new-page {
    break-before: page;
  }

  p {
    orphans: 3;
    widows: 3;
  }
}
```

`orphans` and `widows` request minimum line counts before and after a page break. Break avoidance is a preference: an element taller than a page may still need to split. Support and pagination behavior vary, so inspect the actual print preview.

## Preserve links and wide content

Printed links cannot be clicked on paper. Show destinations for selected external links and allow code to wrap:

```css
@media print {
  a[href^="https://"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    overflow-wrap: anywhere;
  }

  pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}
```

For image links or long tracking URLs, scope the link rule to the article text or place a short, meaningful destination in the HTML instead.

## Common mistakes

- Depending on background colors to communicate essential information; users can disable background printing.
- Leaving fixed headers or fixed-height scrolling containers in the printed layout.
- Preventing breaks on large sections that cannot fit on one page.
- Checking only the screen layout instead of print preview and an exported PDF.

## Related topics

- [CSS Responsive Design](/css/css-responsive-design/)
- [CSS Typography](/css/css-typography/)
- [CSS Overflow](/css/css-overflow/)
