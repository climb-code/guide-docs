---
title: CSS View Transitions
description: Create smooth visual transitions between page or UI states with the View Transitions API and CSS pseudo-elements.
---

View transitions let the browser animate the visual change from one UI state to another. They are useful for small interactions such as changing a card layout, opening a detail view, or navigating between pages without manually recording an element's old and new position.

The browser takes a snapshot before and after an update, then exposes those snapshots to CSS as pseudo-elements.

## Start a transition

Wrap the DOM update in `document.startViewTransition()`:

```js
function showDetails(productId) {
  if (!document.startViewTransition) {
    renderProductDetails(productId);
    return;
  }

  document.startViewTransition(() => {
    renderProductDetails(productId);
  });
}
```

The callback changes the page. The browser captures the old state before the callback and the new state after it completes.

## Style the default animation

By default, the old snapshot fades out while the new one fades in. Customize those snapshots with `::view-transition-old()` and `::view-transition-new()`.

```css
::view-transition-old(root) {
  animation: 180ms ease-out both fade-out;
}

::view-transition-new(root) {
  animation: 240ms ease-in both fade-in;
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}
```

`root` represents the page-level transition. Keep durations short so an interaction still feels immediate.

## Name an element for a shared transition

Set the same `view-transition-name` on an element before and after its state changes. The browser then animates that individual element between its old and new snapshots.

```css
.product-image {
  view-transition-name: product-image;
}
```

```css
::view-transition-old(product-image),
::view-transition-new(product-image) {
  animation-duration: 300ms;
  animation-timing-function: ease;
}
```

For example, an image in a product grid can smoothly expand into the image on a product details screen. Only one rendered element may use a particular transition name at a time.

## Animate a layout state change

```html
<button id="toggle-layout">Change layout</button>
<section class="gallery" id="gallery">
  <!-- cards -->
</section>
```

```js
const button = document.querySelector('#toggle-layout');
const gallery = document.querySelector('#gallery');

button.addEventListener('click', () => {
  const update = () => gallery.classList.toggle('gallery--list');

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
});
```

```css
.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.gallery--list {
  grid-template-columns: 1fr;
}
```

The fallback still changes the layout in browsers that do not support the API; it simply does not animate it.

## Respect reduced-motion preferences

Do not force motion on people who request less animation:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 1ms;
  }
}
```

This keeps the state update working while making the visual effect effectively instant.

## Use transitions purposefully

View transitions are best for explaining a relationship between old and new states. Avoid applying them to every update: frequent text changes, typing, and rapid filtering are usually clearer without an animation.

Also make sure the DOM update in the transition callback is quick. Fetch data first, then start the transition when the new state is ready to render.

## Key takeaways

- Use `document.startViewTransition()` to wrap a DOM update.
- Style page-level snapshots with `::view-transition-old(root)` and `::view-transition-new(root)`.
- Give matching elements a `view-transition-name` for a shared-element animation.
- Keep an unanimated fallback for unsupported browsers.
- Respect `prefers-reduced-motion` and keep transitions brief.
