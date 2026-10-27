---
title: CSS Text Wrapping
description: Control wrapping, long words, line length, and truncation without making text hard to read.
---

Text should wrap naturally as its container changes size. CSS provides tools for long URLs, code strings, headings, and other content that might otherwise overflow.

## Let ordinary text wrap

```css
.article {
  max-width: 68ch;
  margin-inline: auto;
  padding-inline: 1rem;
  line-height: 1.6;
}
```

The `ch` unit is based on the width of the `0` glyph in the current font. It can help limit line length, but the number of characters per line varies by font and language.

## Break long URLs and identifiers

```css
.user-content {
  overflow-wrap: anywhere;
}
```

`overflow-wrap: anywhere` allows an otherwise unbreakable string to wrap when needed. This is useful for user-provided URLs or identifiers inside narrow cards. It does not insert a visible hyphen.

Use `word-break: break-all` only when breaking a word at any character is acceptable; it can make prose difficult to read.

## Control white space

```css
.code-line {
  white-space: pre;
  overflow-x: auto;
}

.label {
  white-space: nowrap;
}
```

`white-space` controls how spaces and line breaks are handled. `pre` preserves spaces and newlines and prevents wrapping, so use it only in a region that can scroll or otherwise accommodate long lines. `nowrap` keeps text on one line and may cause overflow if its container is narrow.

## Limit line count carefully

```css
.card-summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

Line clamping can shorten previews, but clipped text is unavailable visually. Keep the full content accessible where it matters, such as on a detail page, and do not hide essential instructions behind a truncated preview.

## Ellipses for one-line labels

```css
.file-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

`text-overflow` only changes how overflowing inline content is indicated. The element also needs constrained space and overflow clipping. An ellipsis does not expose the hidden text by itself; ensure the full name remains available when needed.

## Common mistakes

- Applying `word-break: break-all` to normal paragraphs.
- Using `white-space: nowrap` without checking narrow viewports.
- Expecting `text-overflow` to work without overflow and a constrained inline size.
- Truncating text that contains the only copy of an instruction or label.

## Related topics

- [CSS Typography](/css/css-typography/)
- [CSS Overflow](/css/css-overflow/)
- [CSS Units and Sizing](/css/css-units-sizing/)
- [CSS Responsive Design](/css/css-responsive-design/)
