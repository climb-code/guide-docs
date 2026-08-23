---
title: CSS Colors and Backgrounds
description: Learn CSS color formats and how to create solid, transparent, image, and gradient backgrounds.
---

Colors and backgrounds help create contrast, hierarchy, and visual identity. CSS provides several ways to define colors and control how backgrounds appear.

## The color property

The `color` property sets an element's foreground color. For text elements, it changes the text color.

```css
body {
  color: #1f2937;
}

h1 {
  color: royalblue;
}
```

The value is inherited by child elements unless they define their own color.

## Named colors

CSS includes named colors such as `red`, `navy`, `tomato`, and `rebeccapurple`.

```css
.warning {
  color: darkorange;
}
```

Named colors are convenient for learning and quick examples. Hex, RGB, or HSL values usually give you more control in a design system.

## Hexadecimal colors

A hex color begins with `#` and contains red, green, and blue values.

```css
.card {
  color: #1e293b;
  background-color: #f8fafc;
}
```

The common format contains six digits: `#RRGGBB`. When each pair contains identical digits, it can be shortened to three digits.

```css
/* These values are equivalent */
color: #ffffff;
color: #fff;
```

Two extra digits can define transparency:

```css
background-color: #2563eb80;
```

Here, `80` is the alpha value, making the color partly transparent.

## RGB and RGBA colors

RGB defines the red, green, and blue channels with values from `0` to `255`.

```css
.success {
  color: rgb(22, 101, 52);
  background-color: rgb(220, 252, 231);
}
```

Add an alpha value from `0` (fully transparent) to `1` (fully opaque) for transparency.

```css
.overlay {
  background-color: rgba(15, 23, 42, 0.7);
}
```

Modern CSS also supports a slash for alpha:

```css
.overlay {
  background-color: rgb(15 23 42 / 70%);
}
```

## HSL and HSLA colors

HSL describes a color using hue, saturation, and lightness:

- **Hue** is an angle from `0` to `360` on the color wheel.
- **Saturation** controls color intensity.
- **Lightness** controls how dark or light the color is.

```css
.info {
  color: hsl(221 83% 35%);
  background-color: hsl(214 100% 97%);
}
```

Use a slash to add transparency:

```css
.soft-shadow {
  box-shadow: 0 8px 24px hsl(220 40% 10% / 20%);
}
```

HSL is useful when you want to create related lighter, darker, or less saturated colors.

## Current color

The `currentColor` keyword uses the computed value of the element's `color` property.

```css
.button {
  color: #2563eb;
  border: 2px solid currentColor;
}
```

If the text color changes, the border changes with it.

## Background color

Use `background-color` to fill the background of an element.

```css
.notice {
  color: #713f12;
  background-color: #fef3c7;
  padding: 1rem;
}
```

The default value is `transparent`, so the background behind the element can show through.

## Background images

Use `background-image` with `url()` to display an image behind an element.

```css
.hero {
  min-height: 24rem;
  background-image: url("/images/mountains.jpg");
}
```

A background image does not affect the element's size. Give the element enough width, height, or content for the image to be visible.

:::note
Use an HTML `<img>` element when the image is meaningful content. Use a CSS background image when it is mainly decorative.
:::

## Background repeat

Small background images repeat horizontally and vertically by default.

```css
.banner {
  background-image: url("/images/pattern.svg");
  background-repeat: no-repeat;
}
```

Useful values include:

| Value | Result |
| --- | --- |
| `repeat` | Repeats in both directions. |
| `repeat-x` | Repeats horizontally. |
| `repeat-y` | Repeats vertically. |
| `no-repeat` | Displays the image once. |

## Background size

The `background-size` property controls the displayed size of a background image.

```css
.hero {
  background-size: cover;
}
```

- `cover` fills the entire element and may crop part of the image.
- `contain` shows the complete image and may leave empty space.
- Lengths and percentages set an exact or relative size.

```css
.logo-panel {
  background-size: 160px auto;
}
```

## Background position

Use `background-position` to choose where the image appears.

```css
.hero {
  background-position: center;
}
```

You can combine keywords, lengths, or percentages:

```css
.profile-banner {
  background-position: right 2rem top 1rem;
}
```

## Background attachment

The `background-attachment` property controls whether a background scrolls with the page.

```css
.feature {
  background-attachment: fixed;
}
```

The common values are `scroll`, `fixed`, and `local`. Fixed backgrounds can behave differently or perform poorly on some mobile browsers, so test them before use.

## Gradients

CSS gradients are generated images, so they work as `background-image` values.

### Linear gradient

```css
.hero {
  background-image: linear-gradient(135deg, #2563eb, #7c3aed);
}
```

You can include more than two color stops:

```css
.sunset {
  background-image: linear-gradient(
    to right,
    #f97316 0%,
    #ec4899 50%,
    #7c3aed 100%
  );
}
```

### Radial gradient

```css
.spotlight {
  background-image: radial-gradient(circle, #fef08a, #f97316);
}
```

### Image overlay

Multiple backgrounds are separated by commas. The first layer appears on top.

```css
.hero {
  color: white;
  background-image:
    linear-gradient(rgb(15 23 42 / 65%), rgb(15 23 42 / 65%)),
    url("/images/city.jpg");
  background-position: center;
  background-size: cover;
}
```

The gradient darkens the image so light text is easier to read.

## Background shorthand

The `background` shorthand can set several background properties in one declaration.

```css
.hero {
  background: #0f172a url("/images/stars.svg") center / cover no-repeat;
}
```

The slash separates `background-position` from `background-size`. Shorthand is compact, but individual properties can be easier to understand while learning.

## Using CSS custom properties

Store repeated colors in custom properties to keep the design consistent.

```css
:root {
  --color-primary: #2563eb;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
}

body {
  color: var(--color-text);
  background-color: var(--color-surface);
}

.button {
  color: white;
  background-color: var(--color-primary);
}
```

Changing one custom property updates every place where it is used.

## Accessible color choices

Text must have enough contrast with its background to remain readable.

```css
/* Easier to read */
.message {
  color: #172554;
  background-color: #dbeafe;
}
```

Do not use color as the only way to communicate meaning. Add text, an icon, or another visual cue for errors and success messages.

## Common mistakes

- Forgetting `url()` around a background image path.
- Expecting a background image to define an element's height.
- Using `cover` when the entire image must remain visible.
- Placing text over a busy image without enough contrast.
- Using the `background` shorthand and unintentionally resetting an earlier background property.

## Key points

- CSS supports named, hex, RGB, and HSL colors.
- Alpha values add transparency.
- Background images can be positioned, sized, and repeated.
- Gradients can be used alone or layered over images.
- Reusable custom properties keep a color system consistent.
- Always check text and background contrast.

## Next topic

Continue with the **CSS Box Model** to learn how content, padding, borders, and margins determine an element's size and spacing.
