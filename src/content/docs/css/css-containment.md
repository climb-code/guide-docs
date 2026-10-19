---
title: CSS Containment
description: Isolate parts of a page with contain and content-visibility to help browsers limit layout and rendering work.
---

CSS containment lets you describe how an element's subtree relates to the rest of the page. The browser can use those boundaries to limit some layout, style, and painting work. Containment also changes layout behavior, so apply it to components whose boundaries are well understood.

## Choose a containment type

Use the `contain` property to enable one or more kinds of containment:

| Value | What it limits |
| --- | --- |
| `size` | The element's size can be determined without laying out its contents. Provide a size or intrinsic placeholder when needed. |
| `inline-size` | The inline size can be determined without measuring the contents. |
| `layout` | The element's internal layout is independent of the rest of the page. |
| `style` | Certain effects, such as counters and quotes, are scoped to the element's subtree. |
| `paint` | Descendants are painted within the element's box and do not paint outside it. |

The `content` keyword enables layout, paint, and style containment without size containment. `strict` enables size, layout, paint, and style containment. These shortcuts can change positioning and overflow behavior, so choose individual values when you need more control. See the [MDN `contain` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain).

```css
.article-card {
  contain: content;
}
```

## Give size containment a placeholder

With size containment, the element's contents no longer determine its size. Set an explicit size or provide an intrinsic placeholder with `contain-intrinsic-size`:

```css
.article-section {
  contain: size layout paint;
  contain-intrinsic-size: auto 30rem;
}
```

The `auto 30rem` value provides a fallback size before the element's contents have been rendered, and allows a remembered size to be used after rendering. Pick a placeholder close to the section's expected size to reduce layout shifts. The [MDN `contain-intrinsic-size` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size) describes the supported forms.

## Defer off-screen rendering with content-visibility

For long pages made of independent sections, `content-visibility: auto` lets the browser skip much of an off-screen section's rendering work until it is near the viewport.

```css
.long-article > section {
  content-visibility: auto;
  contain-intrinsic-size: auto 28rem;
}
```

The intrinsic size reserves space while a section's contents are skipped, helping keep the scrollbar and scroll position stable. The contents remain in the document and can still be found by search or assistive technology; avoid using this property as a way to hide content. Read [MDN's containment guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Using) for more detail.

## Use containment carefully

- Start with a component that has clear boundaries, such as an article section or card.
- Avoid `contain: size` unless you provide the dimensions the layout needs.
- Remember that paint containment clips painting at the element's box.
- Check positioned descendants, sticky elements, shadows, and overflowing content after adding containment.
- Compare real page performance; containment is not a guarantee that every page will become faster.
- Test keyboard navigation, find-in-page, and assistive technology with skipped off-screen sections.

## Key takeaways

- `contain` declares which effects of a subtree can be isolated.
- `content-visibility: auto` can defer off-screen rendering while keeping content in the document.
- `contain-intrinsic-size` reserves approximate space while size or content is skipped.
- Containment changes layout and painting behavior, so verify the component's boundaries.
