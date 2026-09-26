---
title: CSS Anchor Positioning
description: Position popovers, tooltips, and other floating UI relative to an anchor element using CSS.
---

CSS Anchor Positioning lets a floating element describe where it belongs in relation to another element. It is useful for tooltips, menus, validation messages, and popovers that need to follow a trigger without manually measuring coordinates in JavaScript.

## Name the anchor

Give the element that another element should follow an `anchor-name`:

```html
<button class="help-button">What is this?</button>
<aside class="help-tip">Extra context appears here.</aside>
```

```css
.help-button {
  anchor-name: --help-button;
}
```

The custom identifier begins with `--`, like a CSS custom property. It names the button as an anchor; it does not create a variable.

## Position a floating element beside it

Make the related element positioned, then use `position-anchor` to select its anchor. The `anchor()` function resolves to one of the anchor's edges.

```css
.help-tip {
  position: absolute;
  position-anchor: --help-button;

  left: anchor(right);
  top: anchor(top);
  margin-left: 0.5rem;
}
```

In this example, the tip starts at the right edge of the button and aligns with its top edge. The browser keeps that relationship if the button moves because of responsive layout or changing content.

## Place a tooltip above or below

`position-area` is a concise way to choose an area around the anchor:

```css
.tooltip {
  position: absolute;
  position-anchor: --help-button;
  position-area: block-end center;
  margin-top: 0.5rem;
}
```

Logical values make this work in different writing directions:

| Value | Meaning |
| --- | --- |
| `block-start` | Above the anchor in the block direction |
| `block-end` | Below the anchor in the block direction |
| `inline-start` | Before the anchor in the inline direction |
| `inline-end` | After the anchor in the inline direction |

Combine a block and inline value, such as `block-start inline-end`, to use a corner.

## Try a fallback when space is limited

A tooltip placed beneath a button can run past the bottom of the viewport. `position-try-fallbacks` gives the browser an alternate placement to try.

```css
.tooltip {
  position: absolute;
  position-anchor: --help-button;
  position-area: block-end center;
  position-try-fallbacks: flip-block;
}
```

If there is not enough room at `block-end`, `flip-block` moves the tooltip to `block-start`. You can also define named `@position-try` rules when a fallback needs different spacing or dimensions.

## Use it with popovers

Anchor positioning pairs naturally with the Popover API:

```html
<button class="menu-trigger" popovertarget="account-menu">Account</button>

<div id="account-menu" class="account-menu" popover>
  <a href="/profile">Profile</a>
  <a href="/settings">Settings</a>
</div>
```

```css
.menu-trigger {
  anchor-name: --account-menu;
}

.account-menu {
  position: fixed;
  position-anchor: --account-menu;
  position-area: block-end span-inline-end;
  margin-top: 0.5rem;
}
```

`position: fixed` is useful for top-layer elements such as popovers because it keeps the menu positioned relative to the viewport while it follows the trigger.

## Plan for support and accessibility

Browser support for anchor positioning is still evolving. Keep the content usable without the enhanced placement, and test the layouts that matter to your users. A feature query can provide a simple fallback:

```css
.tooltip {
  display: none;
}

@supports (anchor-name: --test) {
  .tooltip {
    display: block;
  }
}
```

CSS handles visual placement only. Continue to manage keyboard focus, Escape-to-close behavior, labels, and ARIA relationships for menus and dialogs.

## Key takeaways

- Use `anchor-name` to identify the element that a floating UI should follow.
- Connect the floating element with `position-anchor`.
- Use `anchor()` for precise edges or `position-area` for common placements.
- Provide `position-try-fallbacks` when an initial placement does not fit.
- Keep interaction and accessibility behavior separate from CSS positioning.
