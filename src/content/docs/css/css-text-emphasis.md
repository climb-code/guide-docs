---
title: CSS Text Emphasis
description: Add typographic emphasis marks to text with text-emphasis-style, text-emphasis-color, and text-emphasis-position.
---

Text emphasis marks are small symbols placed beside characters to draw attention without changing the words. They are common in East Asian typography and can be styled with CSS.

## Choose an emphasis mark

Use `text-emphasis-style` to choose a built-in shape. The style can be `filled` or `open` and a shape such as `dot`, `circle`, `double-circle`, `triangle`, or `sesame`.

```css
.important-phrase {
  text-emphasis-style: filled sesame;
}
```

You can also supply a single character as the mark:

```css
.editorial-note {
  text-emphasis-style: "*";
}
```

## Set mark color and position

`text-emphasis-color` sets the mark color. `text-emphasis-position` places marks over or under the text and can choose a side in vertical writing modes.

```css
.important-phrase {
  text-emphasis-style: filled dot;
  text-emphasis-color: #b91c1c;
  text-emphasis-position: over right;
}
```

The initial position is `over right`. For horizontal text, the mark is placed over or under the characters; side placement matters especially in vertical text.

## Use the shorthand

The `text-emphasis` shorthand sets the mark style and color together. Position is separate and is not reset by the shorthand.

```css
.important-phrase {
  text-emphasis: filled circle #1d4ed8;
  text-emphasis-position: under;
}
```

Keep emphasis sparse so it remains meaningful. For ordinary Western-language paragraphs, bold weight, color, or a clear heading may be more familiar than placing a mark over every character.

## Keep meaning in the text

Emphasis marks are visual styling, not a substitute for semantic HTML or a textual explanation. Use them as supplemental emphasis and check that they do not collide with ruby annotations, underlines, or other marks.

```css
/* Keep emphasis limited to the phrase being highlighted. */
.glossary-term {
  text-emphasis: filled dot currentColor;
}
```

Choose a mark color that remains visible against the background and test the result with the actual script and writing mode.

## Key points

- `text-emphasis-style` selects a mark shape and whether it is filled or open.
- `text-emphasis-color` sets its color; the shorthand `text-emphasis` sets style and color.
- `text-emphasis-position` controls placement and is not reset by the shorthand.
- Use marks selectively and keep meaning available in the underlying text.
- Review the effect with the language, script, and writing mode of the content.

## Further reading

See the [CSS Text Decoration Module Level 3](https://drafts.csswg.org/css-text-decor-3/#text-emphasis-property) for the emphasis properties.
