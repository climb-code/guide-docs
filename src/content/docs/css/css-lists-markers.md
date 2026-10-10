---
title: CSS Lists and Markers
description: Style ordered and unordered lists with list-style, marker positioning, and the ::marker pseudo-element.
---

HTML lists give related items a meaningful structure. CSS controls their bullets, numbering, indentation, and spacing without changing that structure.

## Choose the right list

Use `<ul>` when the order does not matter and `<ol>` when the sequence matters.

```html
<ul class="topics">
  <li>Selectors</li>
  <li>Layout</li>
  <li>Typography</li>
</ul>

<ol class="steps">
  <li>Create a stylesheet.</li>
  <li>Link it from your HTML document.</li>
  <li>Inspect the result in your browser.</li>
</ol>
```

```css
.topics {
  list-style-type: square;
  padding-inline-start: 1.5rem;
}

.steps {
  list-style-type: decimal;
  padding-inline-start: 2rem;
}

.topics li + li,
.steps li + li {
  margin-block-start: 0.5rem;
}
```

Logical padding follows the document's writing direction. Leave enough indentation for markers, especially when an ordered list contains two-digit numbers.

## Understand the list-style properties

| Property | Purpose | Example |
| --- | --- | --- |
| `list-style-type` | Choose bullets or numbering | `square`, `decimal`, `lower-alpha` |
| `list-style-position` | Place the marker outside or inside the content box | `outside` |
| `list-style-image` | Supply an image marker | `url("/images/bullet.svg")` |
| `list-style` | Set the three properties together | `square outside` |

List-style properties inherit, so setting them on the list normally styles its list items too. An image marker can use a `list-style-type` fallback if the image cannot load.

## Outside and inside markers

```css
.reading-list {
  list-style-position: outside;
  padding-inline-start: 1.5rem;
}

.compact-list {
  list-style-position: inside;
}
```

With `outside`, wrapped text aligns with the start of the item's text. With `inside`, the marker participates in the item's inline content, so wrapped lines start at the content box's edge. Test long items before choosing inside markers.

## Style markers separately

`::marker` selects the bullet or number generated for a list item.

```css
.topics li::marker {
  color: #1d4ed8;
  font-size: 1.125em;
}

.steps li::marker {
  color: #166534;
  font-weight: 700;
}
```

Markers support a limited set of properties, including color, font properties, and content. Do not expect padding, backgrounds, or border radius to style a marker like an ordinary element.

## Continue or reverse numbering in HTML

```html
<ol start="4">
  <li>Review the examples.</li>
  <li>Practice with your own page.</li>
</ol>

<ol reversed>
  <li>Final review</li>
  <li>Draft</li>
  <li>Outline</li>
</ol>
```

Use HTML attributes when the numbering is part of the document's meaning. CSS counters are useful when a design needs a separate custom numbering system.

## Common mistakes

- Typing bullet characters into paragraphs instead of using list elements.
- Removing indentation while leaving outside markers, which can make markers extend beyond the container.
- Applying `display: flex` directly to an item and expecting its native marker to remain. A native marker depends on list-item display.
- Using generated marker text as the only source of essential instructions.
- Assuming `::marker` accepts every CSS property.

## Related topics

- [CSS Counters](/css/css-counters/)
- [CSS Typography](/css/css-typography/)
- [CSS Logical Properties](/css/css-logical-properties/)
- [CSS Pseudo-classes and Pseudo-elements](/css/css-pseudo-classes-elements/)
