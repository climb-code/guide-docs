---
title: CSS Overflow
description: Control how content behaves when it exceeds its container using CSS overflow properties.
---

When content is larger than its container, CSS decides what happens to the extra content. The `overflow` property and its related properties give you precise control over scrollbars, clipping, and text truncation.

## The overflow property

`overflow` is a shorthand for `overflow-x` and `overflow-y`. It accepts four values.

| Value | Behaviour |
| --- | --- |
| `visible` | Content overflows the box and remains visible (default). |
| `hidden` | Content is clipped at the box edge. No scrollbar appears. |
| `scroll` | Always shows scrollbars, even if content fits. |
| `auto` | Shows scrollbars only when content overflows. |

```css
.card {
  height: 12rem;
  overflow: hidden;
}
```

Content taller than `12rem` is silently clipped.

## Scroll on one axis only

Use `overflow-x` and `overflow-y` to control each axis independently.

```css
.code-block {
  overflow-x: auto;
  overflow-y: hidden;
}
```

Long code lines scroll horizontally while vertical overflow is clipped.

## Clip without creating a block formatting context

`overflow: clip` clips content but does not create a scroll container, so it avoids the side effects that `hidden` introduces (such as establishing a new block formatting context).

```css
.wrapper {
  overflow: clip;
}
```

You can also offset the clipping boundary with `overflow-clip-margin`.

```css
.wrapper {
  overflow: clip;
  overflow-clip-margin: 1rem;
}
```

Content is allowed to paint up to `1rem` outside the box before being clipped.

## Truncate text with ellipsis

Combine `overflow: hidden`, `white-space: nowrap`, and `text-overflow: ellipsis` to truncate a single line of text.

```css
.label {
  max-width: 20ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

For multiple lines, use `-webkit-line-clamp` with a `display` of `-webkit-box`.

```css
.excerpt {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
}
```

Three lines of text are shown with an ellipsis on the last line.

## scrollbar-gutter

Setting `overflow: auto` can cause layout shifts when scrollbars appear or disappear. Reserve space for the scrollbar in advance with `scrollbar-gutter`.

```css
.panel {
  overflow: auto;
  scrollbar-gutter: stable;
}
```

`stable` reserves gutter space on both sides when `scrollbar-gutter: stable both-edges` is used, keeping the content centred.

## Custom scrollbar styling

Scrollbar appearance can be adjusted with `scrollbar-width` and `scrollbar-color`.

```css
.sidebar {
  overflow-y: auto;
  scrollbar-color: #6b7280 transparent;
  scrollbar-width: thin;
}
```

`scrollbar-width` accepts `auto`, `thin`, or `none`. `scrollbar-color` sets the thumb and track colours.

## Overflow and block formatting contexts

Setting `overflow` to any value other than `visible` on a block element creates a new block formatting context. This has practical consequences.

- The element contains floats (no clearfix needed).
- Margins do not collapse through the element.

```css
.container {
  overflow: hidden; /* contains inner floats */
}
```

## Accessibility considerations

- Avoid `overflow: hidden` on containers with focusable children. Keyboard focus can move to a clipped element, making it invisible and confusing for keyboard users.
- If you must clip, ensure the clipped area is purely decorative or always visible to assistive technology.
- Auto-scrolling regions should have a meaningful label so screen readers can announce the scrollable area.

## Key takeaways

- `overflow: auto` adds scrollbars only when needed; `overflow: scroll` always shows them.
- `overflow: clip` clips without creating a scroll container or block formatting context side-effects.
- `text-overflow: ellipsis` requires `overflow: hidden` and `white-space: nowrap` to work.
- `scrollbar-gutter: stable` prevents layout shifts caused by appearing scrollbars.
