---
title: CSS Starting Style
description: Use @starting-style to transition newly rendered elements from an explicit initial style.
---

CSS transitions normally compare an element's styles before and after an update. A newly inserted element has no previous rendered style to transition from, so it appears directly in its final state. The `@starting-style` at-rule supplies a starting style for that first rendered update.

## Animate an element as it appears

Declare the normal, visible style and its transition. Then put the initial style inside `@starting-style`:

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

@starting-style {
  .toast {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
```

When a `.toast` is first inserted and rendered, the browser can transition from the starting opacity and position to the regular `.toast` styles. If the element is already rendered and its styles later change, the ordinary before-change and after-change styles drive the transition.

## Use it with a state change

The final style can come from a state class. This example supports a newly inserted, already-open panel:

```css
.panel {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

@starting-style {
  .panel.is-open {
    opacity: 0;
    transform: translateY(0.75rem);
  }
}
```

The rule inside `@starting-style` is considered only when the element lacks a prior rendered style for that update. It does not replace the normal `.panel` styles or define an exit animation when the element is removed.

## Combine it with discrete display transitions

When an element changes between `display: none` and a visible display value, animating other properties may also require a discrete `display` transition. Use `allow-discrete` and a starting style for the entering state:

```css
.popover {
  display: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    display 180ms allow-discrete;
}

.popover.is-open {
  display: block;
  opacity: 1;
}

@starting-style {
  .popover.is-open {
    opacity: 0;
  }
}
```

The `display` value changes discretely rather than interpolating. The starting opacity gives the visible state a value to transition from. Check support for discrete transitions in the browsers you target, and retain a usable non-animated state.

## Respect reduced motion

Motion should be optional. Shorten or remove the transition when a user requests reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .toast,
  .panel,
  .popover {
    transition: none;
  }
}
```

## Common mistakes

- Putting the final style only inside `@starting-style`; regular rules must still define the after-change style.
- Expecting `@starting-style` to animate an element that is removed before the browser renders it.
- Assuming it automatically creates an exit transition. Removal and transitions from `display: none` need their own state and display-transition setup.
- Using a starting value that loses in the cascade to another applicable declaration. Starting-style declarations follow normal cascade rules.
- Forgetting to check browser support when relying on newer transition behavior.

## Key takeaways

- `@starting-style` supplies the initial style when an element has no previous rendered style.
- The browser transitions from that starting style to the element's regular style.
- It does not define the final style or automatically handle removal.
- Use `allow-discrete` when a `display` change must participate in a transition, and account for browser support and reduced motion.

## References

- [W3C CSS Transitions Level 2: Defining before-change style](https://www.w3.org/TR/css-transitions-2/#defining-before-change-style-the-starting-style-rule)
