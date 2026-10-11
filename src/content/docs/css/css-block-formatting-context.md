---
title: CSS Block Formatting Context
description: Contain floats and control margin collapsing with a block formatting context and display flow-root.
---

A block formatting context (BFC) is a region of block layout with its own rules for arranging blocks and floats. It helps explain why a background sometimes fails to surround a floated image or why a child's margin appears outside its parent.

## Contain a floated image

Floats let text wrap around an image. A normal block's automatic height can exclude its floated children, so a short caption may leave the image hanging below the background.

```html
<article class="summary">
  <img class="thumbnail" src="/images/css-guide.jpg"
       alt="Cover of the CSS layout guide" width="128" height="128" />
  <h2>CSS layout guide</h2>
  <p>Learn how blocks and floats interact.</p>
</article>
```

```css
.summary {
  display: flow-root;
  padding: 1rem;
  background: #e0f2fe;
}

.thumbnail {
  float: left;
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin: 0 1rem 0.5rem 0;
}
```

Provide your own image at the example path. `flow-root` gives the article a new BFC, and its automatic height includes the floated image's extent. The paragraph still wraps around the image inside the article.

For an ordinary image-and-text row that does not need text wrapping, consider flexbox or grid instead.

## Control parent and child margins

In normal block flow, a first child's top margin can collapse with its parent's margin when nothing separates them. Establishing a BFC prevents that collapse across the parent's boundary.

```html
<section class="panel">
  <h2>Layout notes</h2>
  <p>Spacing stays inside this panel.</p>
</section>
```

```css
.panel {
  display: flow-root;
  background: #f1f5f9;
}

.panel h2 {
  margin: 1.5rem 0 1rem;
}

.panel p {
  margin: 1rem 0;
}
```

The heading's top margin stays inside the panel. The heading's bottom margin and paragraph's top margin can still collapse with each other. A BFC does not disable all margin collapsing among descendants.

## Common ways to establish a BFC

| Declaration or element | Practical consequence |
| --- | --- |
| `display: flow-root` | Keeps block flow and explicitly starts a BFC |
| `float: left` or `float: right` | Floats the box and establishes a BFC for its contents |
| `position: absolute` or `position: fixed` | Removes the box from normal flow and establishes a BFC |
| `display: inline-block` | Creates an inline-level box with a BFC inside |
| `overflow: auto` or `overflow: hidden` on a block | Establishes a BFC, with scrolling or clipping behavior |

Flex and grid containers establish their own formatting contexts. Use them when you want flex or grid layout, rather than changing layout solely to contain a float.

## Why prefer flow-root over hidden overflow?

Older float-containment techniques often use `overflow: hidden`. That can also hide content extending outside the box, including shadows and focus outlines.

```css
.article-section {
  display: flow-root;
}
```

`flow-root` expresses the containment requirement without adding overflow clipping. `overflow: clip` alone does not create a BFC; combine it with `flow-root` if you deliberately need both behaviors.

## Common mistakes

- Expecting `display: block` alone to contain floated children.
- Using a BFC to fix `z-index`. Stacking contexts control painting order and are a different concept.
- Assuming `flow-root` contains absolutely positioned children in its automatic height.
- Applying hidden overflow without checking keyboard focus and content clipping.

## Related topics

- [CSS Display](/css/css-display/)
- [CSS Margin Collapsing](/css/css-margin-collapsing/)
- [CSS Overflow](/css/css-overflow/)
- [CSS Flexbox](/css/css-flexbox/)

## References

- [W3C CSS Display: flow-root](https://www.w3.org/TR/css-display-3/#valdef-display-flow-root)
- [W3C CSS 2: block formatting contexts](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
