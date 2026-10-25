---
title: CSS Text Decoration
description: Control underlines, overlines, strike-throughs, decoration color, thickness, and offset.
---

Text decoration draws lines such as underlines and strike-throughs. The `text-decoration` shorthand combines line, style, color, and thickness.

## Style a link underline

```html
<a class="article-link" href="/css/css-typography/">Read the typography guide</a>
```

```css
.article-link {
  color: #1d4ed8;
  text-decoration-line: underline;
  text-decoration-color: currentColor;
  text-decoration-style: solid;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.article-link:hover {
  text-decoration-thickness: 0.14em;
}
```

An underline helps identify a link within prose. Keep links recognizable without relying only on color, and retain a visible keyboard focus indicator.

## Use the shorthand

```css
.warning {
  text-decoration: underline wavy #b91c1c 0.1em;
  text-underline-offset: 0.2em;
}

.completed {
  text-decoration: line-through;
}
```

The shorthand can set decoration line, style, color, and thickness. Use longhand properties when adjusting only one part makes the intent clearer.

## Underline position and skip ink

```css
.navigation-link {
  text-underline-offset: 0.25em;
  text-decoration-skip-ink: auto;
}
```

`text-underline-offset` moves an underline away from the text. `text-decoration-skip-ink` lets the browser avoid drawing through glyph shapes where practical. These properties affect appearance; check the result at different font sizes and with your chosen typeface.

## Decoration inheritance

An ancestor's text decoration is drawn across descendant text. Setting `text-decoration: none` on a child does not cancel a line drawn by the ancestor.

```css
.underlined {
  text-decoration: underline;
}

.underlined em {
  color: #7c3aed;
  /* The ancestor's underline still crosses this text. */
}
```

Apply decoration to the element whose text should receive the line, rather than underlining a large wrapper and trying to remove decoration from individual children.

## Common mistakes

- Removing link underlines without providing another clear visual cue.
- Using strike-through alone to indicate an important status.
- Expecting a child's `text-decoration: none` to remove its ancestor's decoration.
- Placing an underline too close to letters with long descenders.

## Related topics

- [CSS Typography](/css/css-typography/)
- [CSS Accessibility](/css/css-accessibility/)
- [CSS Pseudo-classes and Pseudo-elements](/css/css-pseudo-classes-elements/)
