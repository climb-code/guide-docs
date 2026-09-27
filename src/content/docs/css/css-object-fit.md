---
title: CSS Object Fit and Position
description: Resize and align images and videos without stretching them using object-fit and object-position.
---

Images often have different proportions from the cards or banners that contain them. `object-fit` controls how their content fits inside the element's box, while `object-position` controls its alignment.

## Define the image box

Give the image a size before choosing how its content should fit.

```css
.card-image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

Every image gets a consistent box. `cover` preserves the source proportions and crops anything outside that box.

## Choose a fitting mode

| Value | Behavior | Useful for |
| --- | --- | --- |
| `cover` | Fills the box, preserving proportions and cropping excess content | Thumbnails and banners |
| `contain` | Shows the entire image, preserving proportions with possible empty space | Product photos and logos |
| `fill` | Stretches content to fill the box; the default | Content where distortion is acceptable |
| `none` | Keeps the content at its natural size | Unscaled previews |
| `scale-down` | Chooses the smaller result of `none` and `contain` | Previews that should not enlarge small images |

## Keep the subject visible

The default alignment is centered. Move the visible area when a centered crop cuts off the important part of a photo.

```css
.portrait {
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
}

.banner {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  object-position: 70% 30%;
}
```

Try different positions with the actual source image. A crop that works on desktop may hide the subject in a narrower mobile box.

## Show a whole product image

Use `contain` when cropping would remove information the user needs.

```css
.product-image {
  width: 100%;
  height: 18rem;
  object-fit: contain;
  background: #f1f5f9;
}
```

Empty space is expected when the image and its box have different proportions.

## Use the same technique for video

```css
.video-preview {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background: black;
}
```

Choose `contain` to preserve the full video frame. Choose `cover` only when cropping is acceptable.

## Common mistakes

- Applying the rules to a wrapper instead of the image or video element.
- Expecting `object-fit` to resize the element's box; it controls the content inside it.
- Using `cover` for diagrams or screenshots where cropped text matters.
- Using `object-fit` for CSS background images; use `background-size` instead.

## Further reading

See the [MDN object-fit reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit) for fitting modes and examples.
