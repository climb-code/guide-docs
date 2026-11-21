---
title: CSS Scroll-State Queries
description: Style elements based on scrollable, scrolled, snapped, and sticky states with CSS container queries.
---

Scroll-state queries let CSS respond to a container's relationship with scrolling. They are useful for changing the contents of a sticky header, highlighting a snapped carousel item, or revealing a scroll hint without a JavaScript scroll handler. Unlike scroll-driven animations, which map progress to an animation timeline, scroll-state queries apply styles when a state matches.

## Query a sticky header

Declare the sticky element as a scroll-state query container. A container query applies styles to descendants of the container, so put the visual changes on an inner element:

```html
<header class="site-header">
  <div class="site-header__content">
    <a href="/">Field Notes</a>
  </div>
</header>
```

```css
.site-header {
  position: sticky;
  inset-block-start: 0;
  container-type: scroll-state;
  container-name: site-header;
}

.site-header__content {
  padding: 1rem;
  background: white;
  transition: box-shadow 180ms ease;
}

@container site-header scroll-state(stuck: top) {
  .site-header__content {
    box-shadow: 0 2px 8px rgb(0 0 0 / 18%);
  }
}
```

The `stuck: top` condition matches while the header is stuck to the top edge of its scroll container. Keep the base header style useful on its own; the shadow is an enhancement.

## Understand the available states

Scroll-state queries use `scroll-state()` inside an `@container` rule:

| State | Example | What it checks |
| --- | --- | --- |
| `stuck` | `scroll-state(stuck: top)` | Whether a sticky query container is stuck to an edge. |
| `snapped` | `scroll-state(snapped: y)` | Whether an element is snapped to an ancestor scroll-snap container on an axis. |
| `scrollable` | `scroll-state(scrollable: bottom)` | Whether a scroll container has more content in a direction. |
| `scrolled` | `scroll-state(scrolled: block-end)` | The most recent direction a scroll container moved. |

For example, a hint can appear only when a panel has more content below:

```css
.details-panel {
  overflow: auto;
  container-type: scroll-state;
  container-name: details;
}

.scroll-hint {
  opacity: 0;
}

@container details scroll-state(scrollable: bottom) {
  .scroll-hint {
    opacity: 1;
  }
}
```

The query describes a state, not a continuous scroll position. Use a scroll-driven animation timeline when an effect should progress continuously with the scroll position.

## Keep a fallback

Scroll-state queries are a newer part of container queries, and support can vary across browser versions. Keep essential content visible without them, and use a feature query when an enhancement should only be enabled where recognized:

```css
.site-header__content {
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%);
}

@supports (container-type: scroll-state) {
  @container site-header scroll-state(stuck: top) {
    .site-header__content {
      box-shadow: 0 2px 8px rgb(0 0 0 / 18%);
    }
  }
}
```

Check the current compatibility data for the browsers your project supports. Also test nested scroll containers and sticky elements in their actual layout; a sticky element needs a suitable scroll ancestor and inset to become stuck.

## Key points

- Set `container-type: scroll-state` on the element whose scroll state should be queried.
- `@container` rules style descendants of the query container, not the container itself.
- Use `stuck`, `snapped`, `scrollable`, or `scrolled` for state changes.
- Keep default styles useful and treat unsupported queries as an enhancement.
- Choose scroll-driven animations for continuous progress effects instead of state changes.
