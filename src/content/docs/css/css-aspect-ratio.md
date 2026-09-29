---
title: CSS Aspect Ratio
description: Keep images, videos, and layout boxes proportional with the CSS aspect-ratio property.
---

The `aspect-ratio` property gives an element a preferred width-to-height ratio. It is useful for media frames, cards, and placeholders that should keep their shape as the available width changes.

## Set a preferred ratio

Write the ratio as `width / height`. The slash can be omitted when the second number is `1`.

```css
.video-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111827;
}

.square-tile {
  aspect-ratio: 1;
}
```

| Value | Shape | Example use |
| --- | --- | --- |
| `1` or `1 / 1` | Square | Avatar or product tile |
| `4 / 3` | Landscape | Photo card |
| `16 / 9` | Wide landscape | Video frame |
| `3 / 4` | Portrait | Poster |

## Make a responsive image card

Give the image a width and let the ratio calculate its height. `object-fit: cover` fills the resulting box without stretching the picture.

```html
<article class="card">
  <img src="/images/mountains.jpg" alt="Mountains at sunrise" />
  <h2>Weekend hikes</h2>
</article>
```

```css
.card img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

If the full picture must remain visible, use `object-fit: contain` instead. See [CSS Object Fit and Position](/css/css-object-fit/) for the difference.

## Reserve space while media loads

A ratio can prevent the page from jumping when an image or embed appears. Set the ratio on a wrapper when the embedded content needs to fill a predictable frame.

```html
<div class="embed-frame">
  <iframe src="https://example.com/embed" title="Example video"></iframe>
</div>
```

```css
.embed-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.embed-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
```

For an ordinary `<img>`, accurate HTML `width` and `height` attributes also let the browser reserve space before the image loads.

## Understand the sizing rule

`aspect-ratio` influences size when at least one dimension is automatic. If both `width` and `height` are fixed, those sizes take precedence.

```css
.ratio-works {
  width: 20rem;
  height: auto;
  aspect-ratio: 2 / 1;
}

.fixed-size {
  width: 20rem;
  height: 20rem;
  aspect-ratio: 2 / 1; /* The fixed dimensions still make a square. */
}
```

Content can also make a box taller than its preferred ratio. Do not force a fixed height on text cards just to preserve a shape; allow room for the text to grow.

## Common mistakes

- Treating `aspect-ratio` as an image crop setting. Use `object-fit` to control how image content fits inside its box.
- Setting both dimensions explicitly and expecting the ratio to override them.
- Forcing a ratio on text-heavy content that needs more height when text wraps.
- Using an inaccurate ratio for an image placeholder, which can still cause layout movement when the image loads.

## Further reading

See the [MDN aspect-ratio reference](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) for more sizing examples.
