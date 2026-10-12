---
title: CSS Scroll-driven Animations
description: Connect CSS keyframe animations to scrolling with scroll(), view(), and animation-range while preserving accessible fallbacks.
---

Scroll-driven animations connect keyframe progress to scrolling. A reading indicator can grow as the reader moves down a page, while a card can fade in as it enters the visible area. Scrolling backward reverses the animation's progress.

## Choose a timeline

Set `animation-timeline` to control what advances an animation:

| Value | Progress follows |
| --- | --- |
| `auto` | The default time-based document timeline |
| `scroll(root block)` | The root scroll container's position along the block axis |
| `scroll(nearest inline)` | The nearest ancestor scroll container's position along the inline axis |
| `view()` | The element's passage through its nearest ancestor scroll container |

Declare `animation-timeline` **after** the `animation` shorthand, which resets the timeline to `auto`. See the [MDN animation-timeline reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).

## Build a page progress indicator

Add a decorative bar and enough article content to make the page scroll:

```html
<div class="reading-progress" aria-hidden="true"></div>
<main>
  <article>
    <h1>A guide to CSS animations</h1>
    <!-- Add the full article content here. -->
  </article>
</main>
```

```css
.reading-progress {
  display: none;
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  block-size: 0.25rem;
  background: #2563eb;
  transform-origin: left center;
  z-index: 100;
}

@keyframes reading-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll(root block)) {
    .reading-progress {
      display: block;
      animation: reading-progress 1ms linear both;
      animation-timeline: scroll(root block);
    }
  }
}
```

The bar tracks the entire document's scrollable distance. It needs overflow to have a useful timeline. The `1ms` duration supports implementations that require a nonzero duration; scrolling still determines progress. This example grows from the left, so use `transform-origin: right center` for a right-to-left reading indicator. [WebKit's scroll-driven animations guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) explains scroll timelines and practical examples.

## Reveal a card as it enters

Use `view()` when progress should follow an individual element's visibility:

```html
<article class="reveal-card">
  <h2>Learn CSS Grid</h2>
  <p>Build flexible layouts with rows and columns.</p>
  <a href="/css/css-grid">Read the Grid guide</a>
</article>
```

```css
.reveal-card {
  opacity: 1;
  transform: none;
}

@keyframes reveal-card {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) and
            (animation-range: entry 0% entry 100%) {
    .reveal-card {
      animation: reveal-card 1ms linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 100%;
    }

    .reveal-card:focus-within {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
}
```

`animation-range` limits the effect to the `entry` portion of the view timeline. A card shorter than the scrollport finishes revealing when it is fully inside. `both` holds the initial state before that range and the final state afterward. A focused link makes the card immediately visible. See the [MDN animation-range reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range).

## Keep the fallback usable

The examples enable motion only inside feature queries and when the user has no reduced-motion preference. Unsupported browsers show the card normally and omit the decorative bar. Never make access to essential content depend on an animation.

Browser support differs across these properties. Check the [animation-timeline compatibility table](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline#browser_compatibility) and test your target browsers, nested scroll containers, keyboard navigation, and reduced-motion settings.

## Practice

Place several cards below a long introduction. Scroll down and back up, then enable reduced motion in your system or browser tools. Confirm that every card remains readable and its link stays usable.

## Key takeaways

- Use `scroll()` for scroll-position progress and `view()` for element visibility.
- Put timeline and range declarations after the `animation` shorthand.
- Limit a reveal with `animation-range` and retain a visible fallback.
- Respect reduced motion and ensure focused content remains visible.
