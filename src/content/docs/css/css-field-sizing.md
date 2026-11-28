---
title: CSS Field Sizing
description: Let text inputs and textareas size themselves to their content with field-sizing: content.
---

Form controls normally start with a browser-defined size. `field-sizing: content` lets certain controls grow or shrink to fit their content, which can reduce extra empty space in short fields.

## Size a text input to its content

Apply `field-sizing: content` to a text field when its width should follow the entered value rather than a fixed intrinsic size.

```css
.tag-input {
  field-sizing: content;
  min-inline-size: 8ch;
  max-inline-size: 100%;
}
```

The minimum and maximum sizes keep the control usable when it is empty or when its value becomes long. The placeholder can also affect the field's initial content size.

## Let a textarea grow with its text

For a textarea, content-based sizing can adjust the block size as lines are added. Add limits so a long message does not take over the whole page.

```css
.comment-box {
  field-sizing: content;
  min-block-size: 5lh;
  max-block-size: 20lh;
  overflow-y: auto;
  resize: vertical;
}
```

The user can still resize the control where the browser and `resize` value allow it. The maximum size and scrolling behavior provide a clear boundary for lengthy content.

## Keep a conventional fallback

Use normal dimensions as the baseline, then enable content sizing where supported. The form remains usable if the browser ignores the enhancement.

```css
.search-input {
  box-sizing: border-box;
  width: 100%;
  max-width: 28rem;
}

@supports (field-sizing: content) {
  .search-input {
    width: auto;
    field-sizing: content;
    min-inline-size: 10ch;
    max-inline-size: min(100%, 28rem);
  }
}
```

Content-based sizing does not replace labels, instructions, or validation. Keep controls large enough to see and operate, and check how long values behave in a narrow layout.

## Key points

- `field-sizing: content` lets supported form controls size in response to their content.
- Use minimum and maximum sizes to keep fields usable and prevent excessive growth.
- A `textarea` can grow with its lines while still scrolling at a chosen limit.
- Keep a normal-size fallback and test long values, placeholders, and narrow layouts.

## Further reading

See the [CSS Form Control Styling Module](https://drafts.csswg.org/css-forms/#field-sizing) for the `field-sizing` property.
