---
title: CSS User Interaction
description: Use cursor, user-select, pointer-events, and touch-action to shape pointer and touch interactions accessibly.
---

CSS includes properties that influence how people interact with content using a mouse, trackpad, pen, or touchscreen. Use them to communicate available actions and support custom gestures, while keeping keyboard access and browser zoom available.

## Show an appropriate cursor

The `cursor` property can hint at the action available on an element. Use `pointer` for an interactive control and more specific values for actions such as resizing or dragging:

```css
button {
  cursor: pointer;
}

.resize-handle {
  cursor: col-resize;
}

.draggable-card {
  cursor: grab;
}

.draggable-card:active {
  cursor: grabbing;
}
```

A cursor is only a visual hint. Use a real `<button>` or link for interactive controls so they also work with a keyboard and assistive technology. Don't use `cursor: not-allowed` alone to indicate that an action is unavailable; disable the control in HTML and explain the state when needed.

## Control text selection

`user-select` controls whether users can select text. Most content should remain selectable, especially text people may want to copy. A narrow use for `none` is preventing accidental selection of a small drag handle while it is being used:

```css
.drag-handle {
  user-select: none;
  cursor: grab;
}
```

Avoid applying `user-select: none` to an entire page, article, or control label. It can make copying and reading harder. Keep form fields selectable and editable.

## Manage pointer targeting

`pointer-events: none` makes an element's box transparent to pointer hit testing, allowing the pointer to target content underneath it:

```css
.decorative-overlay {
  pointer-events: none;
}
```

This does not remove the element from keyboard navigation. A focusable element with `pointer-events: none` can still receive focus with the Tab key, so don't use this property as a substitute for disabling a control or hiding it accessibly.

## Set touch gesture behavior

By default, the browser handles touchscreen panning and pinch zoom. `touch-action` lets a component declare which gestures the browser may handle before pointer event listeners run:

```css
/* Let the browser scroll vertically and zoom while a chart handles horizontal drags. */
.interactive-chart {
  touch-action: pan-y pinch-zoom;
}
```

Use the narrowest rule that supports the interaction. Setting `touch-action: none` can prevent users from scrolling or zooming over that region, which is especially disruptive for large canvases and maps. If a custom gesture takes over, ensure the same action is available to keyboard users.

## Quick reference

| Property | Common use | Keep in mind |
| --- | --- | --- |
| `cursor` | Communicate a pointer action | It does not make an element interactive. |
| `user-select` | Prevent accidental selection on a drag handle | Keep useful content selectable. |
| `pointer-events` | Let pointer input pass through a decorative layer | Keyboard focus is unaffected. |
| `touch-action` | Declare which touch gestures the browser handles | Preserve scrolling and pinch zoom where possible. |

## Key takeaways

- Use semantic HTML for controls; cursor styling is only a hint.
- Keep page content selectable and use `user-select: none` sparingly.
- `pointer-events: none` changes pointer targeting, not keyboard focus.
- Preserve browser scrolling and zoom when designing touch gestures.

For property details, see MDN's [`cursor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor), [`user-select`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/user-select), [`pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events), and [`touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action) references.
