---
title: CSS Transitions and Animations
description: Learn how to create smooth CSS transitions and keyframe animations while respecting accessibility and user preferences.
---

CSS transitions and animations add motion to an interface. Use them to clarify changes in state, guide attention, and make interactions feel responsive—not simply as decoration.

## CSS transitions

A transition smoothly changes a property from its current value to a new value. Define it on the element's default state, then change the property in a different state such as `:hover` or `:focus-visible`.

```css
.button {
  background: #2563eb;
  color: white;
  transition: background-color 180ms ease, transform 180ms ease;
}

.button:hover,
.button:focus-visible {
  background: #1d4ed8;
  transform: translateY(-2px);
}
```

The transition shorthand is:

```css
transition: property duration timing-function delay;
```

For example:

```css
.card {
  transition: box-shadow 200ms ease-out 50ms;
}
```

## Choose properties carefully

For the smoothest animations, prefer properties that browsers can often animate without recalculating layout:

- `transform`
- `opacity`

Properties such as `width`, `height`, `top`, `left`, `margin`, and `padding` can trigger more expensive layout work. They are still useful when needed, but avoid changing many of them continuously in large lists.

```css
/* Usually efficient */
.menu {
  opacity: 0;
  transform: translateY(-0.5rem);
}

/* Can cause layout changes */
.menu {
  height: 0;
}
```

## Timing functions

The timing function controls the rate of change during a transition or animation.

| Value | Best for |
| --- | --- |
| `linear` | Constant-rate effects, such as a progress indicator. |
| `ease` | General-purpose movement; the browser default. |
| `ease-in` | Motion that accelerates as it begins. |
| `ease-out` | Motion that slows before it stops; useful for entering content. |
| `ease-in-out` | Motion that starts and ends gently. |
| `cubic-bezier()` | A custom motion curve. |

Use a duration that matches the action. Small hover feedback is often around 150–250 milliseconds; a larger panel entering the page may need slightly longer.

## Transition multiple properties

List each property explicitly so the motion stays intentional.

```css
.link {
  color: #334155;
  text-decoration-color: transparent;
  transition:
    color 150ms ease,
    text-decoration-color 150ms ease;
}

.link:hover {
  color: #2563eb;
  text-decoration-color: currentColor;
}
```

Avoid `transition: all`; it can animate unintended properties and make performance harder to reason about.

## Keyframe animations

Use `@keyframes` when an effect needs more than a start and end state, repeats, or begins independently of user interaction.

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notice {
  animation: fade-in 300ms ease-out both;
}
```

The animation shorthand is:

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

In the example, `both` applies the first keyframe before the animation starts and keeps the final keyframe after it ends.

## Control repetition and direction

```css
.loading-dot {
  animation: pulse 1s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { opacity: 0.35; }
  to { opacity: 1; }
}
```

`infinite` repeats the animation forever, and `alternate` makes every other cycle run in reverse. Reserve infinite motion for states that genuinely need ongoing feedback, such as loading.

## Pause an animation

Use `animation-play-state` to pause decorative movement when the user interacts with it.

```css
.logo {
  animation: spin 4s linear infinite;
}

.logo:hover {
  animation-play-state: paused;
}
```

For essential information, do not make a user rely on catching a moving or disappearing element.

## Respect reduced motion

Some people experience motion sensitivity. Honor their operating-system preference with `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

This keeps the interface functional while greatly reducing non-essential motion. If an animation communicates important progress or status, provide a clear non-animated alternative as well.

## Accessible focus feedback

Do not remove keyboard focus indicators just because a hover transition looks good.

```css
.button:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}
```

Apply hover and focus-visible styles together when both should receive the same visual feedback.

## Common mistakes

- Using `transition: all` instead of naming the intended properties.
- Animating layout-heavy properties when `transform` or `opacity` would work.
- Adding long or looping decorative motion without reduced-motion support.
- Hiding focus states from keyboard users.
- Using animation as the only way to communicate a status change.
- Making every element move, which competes with the page's content.

## Key points

- Transitions animate a change between states; keyframes define a sequence of states.
- Prefer `transform` and `opacity` for efficient visual motion.
- Define explicit properties, durations, and timing functions.
- Use motion to support feedback and comprehension.
- Always respect `prefers-reduced-motion` and preserve keyboard focus.

## Next topic

Continue with **CSS Variables** to learn how custom properties make themes and repeated values easier to maintain.
