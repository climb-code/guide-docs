---
title: CSS Overscroll Behavior
description: Control scroll chaining and overscroll effects with the CSS overscroll-behavior properties.
---

When a scrollable area reaches its boundary, the browser may pass the scroll gesture to an ancestor. This is called **scroll chaining**. The `overscroll-behavior` properties let you control what happens at that boundary.

## The three values

- `auto` allows the browser's default overscroll behavior, including scroll chaining.
- `contain` prevents scroll chaining at the boundary while keeping local overscroll effects where supported.
- `none` prevents scroll chaining and suppresses local overscroll effects.

For example, a chat panel can keep wheel or touch scrolling inside itself instead of scrolling the page behind it:

```css
.chat-messages {
  overflow-y: auto;
  overscroll-behavior-y: contain;
}
```

## Shorthand and axis-specific properties

`overscroll-behavior` is a shorthand for the x and y axes. Provide one value to use it on both axes, or two values for x and y:

```css
.modal-content {
  overflow: auto;
  overscroll-behavior: contain;
}

.horizontal-gallery {
  overflow-x: auto;
  overscroll-behavior-x: contain;
}
```

You can also use `overscroll-behavior-x` and `overscroll-behavior-y` individually when only one direction needs control.

## Common uses

### Keep a modal's scroll inside the modal

```css
.modal-body {
  max-height: 80vh;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}
```

This helps prevent reaching the end of the modal from unexpectedly scrolling the page underneath it.

### Stop all boundary effects

```css
.reader {
  overflow-y: auto;
  overscroll-behavior-y: none;
}
```

Use `none` when the local bounce or glow effect should also be suppressed. Platform behavior can vary, so check the interaction on the devices your site supports.

## Important details

- The property affects scroll containers; apply it to the element that owns the scrolling area.
- It does not create a scroll container. The element still needs scrollable overflow, such as `overflow: auto` or `overflow: scroll`.
- Prefer `contain` when you only need to stop scroll chaining and want to keep the browser's local overscroll feedback.
- Avoid disabling expected browser gestures without a clear interaction reason, especially on touch devices.
