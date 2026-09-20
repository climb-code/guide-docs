---
title: CSS Scroll Snap
description: Create controlled, snapping scroll experiences with CSS Scroll Snap.
---

CSS Scroll Snap lets you control where a scroll container stops after a user finishes scrolling. Instead of stopping at an arbitrary position, the viewport or container snaps to predefined alignment points on child elements. This is ideal for carousels, paginated sections, and any layout where predictable scroll positions improve usability.

## Set up a scroll snap container

Apply `scroll-snap-type` to the scrolling parent and `scroll-snap-align` to each child.

```css
.carousel {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

Every item fills the container and the scroll always settles at the start edge of the nearest item.

## Choose a snap axis

`scroll-snap-type` accepts `x`, `y`, or `both` to specify which axis snapping applies to.

```css
/* Vertical scroll snap for full-page sections */
.page-sections {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
}
```

## Mandatory vs proximity snapping

The second keyword in `scroll-snap-type` controls how eagerly snapping occurs.

| Value | Behaviour |
| --- | --- |
| `mandatory` | Always snaps, even if the user barely scrolled. Best when snap points cover the full container. |
| `proximity` | Snaps only when the scroll position is already close to a snap point. Safer for variable-height content. |

```css
.feed {
  scroll-snap-type: y proximity;
}
```

## Control snap alignment

`scroll-snap-align` can be `start`, `center`, or `end`.

```css
/* Center each slide in the viewport */
.slide {
  scroll-snap-align: center;
}
```

Use `center` for carousels where you want the active item visually centred, and `start` or `end` for paginated layouts.

## Stop snap at a specific child

`scroll-snap-stop` prevents the scroll from skipping over a snap point, even during a fast swipe.

```css
.important-slide {
  scroll-snap-stop: always;
}
```

The default value is `normal`, which allows the scroll to pass over snap points when momentum is high.

## Add padding to the container

`scroll-padding` adjusts where the snap position is calculated, useful when a sticky header covers part of the scroll area.

```css
.container {
  scroll-padding-top: 4rem;
  scroll-snap-type: y mandatory;
}
```

Similarly, `scroll-margin` on child elements shifts the snap point relative to the element itself.

```css
.section {
  scroll-margin-top: 4rem;
  scroll-snap-align: start;
}
```

## Smooth scrolling

Pair scroll snap with `scroll-behavior: smooth` for programmatic scrolling that animates instead of jumping.

```css
.container {
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}
```

## Accessibility

- Ensure every snapped section is reachable by keyboard. Scroll snap does not affect Tab order, so verify focus moves predictably through the content.
- Avoid `mandatory` snapping in layouts where content can overflow the snap area, as it may trap keyboard users.
- Provide visible navigation controls (arrows, dots) in addition to swipe for users who cannot perform touch gestures.

## Key takeaways

- Apply `scroll-snap-type` to the scroll container and `scroll-snap-align` to each child.
- Use `mandatory` when snap points cover the whole container, and `proximity` for variable-height content.
- `scroll-snap-stop: always` prevents fast swipes from skipping snap points.
- `scroll-padding` and `scroll-margin` compensate for sticky headers or offset requirements.
