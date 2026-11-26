---
title: CSS Font Palettes
description: Choose and customize built-in color palettes in color fonts with font-palette and @font-palette-values.
---

Some fonts contain multicolored glyphs, such as emoji or display lettering. If a color font includes palettes, CSS can select one or define a named palette with `font-palette` and `@font-palette-values`.

## Select a palette from the font

Use `font-palette` to choose a palette provided by the font. The `light` and `dark` keywords request palettes intended for those background types when the font provides them.

```css
.brand-mark {
  font-family: "Festival Color", sans-serif;
  font-palette: light;
}

@media (prefers-color-scheme: dark) {
  .brand-mark {
    font-palette: dark;
  }
}
```

The font needs to contain color glyphs and the requested palette. A regular monochrome font cannot gain multicolored glyphs from this property alone.

## Define a named palette

Use `@font-palette-values` to associate a custom palette with a named font. `base-palette` selects the starting palette from the font, and `override-colors` replaces specific zero-based palette entries.

```css
@font-palette-values --festival-warm {
  font-family: "Festival Color";
  base-palette: 0;
  override-colors:
    0 #7c2d12,
    1 #f59e0b,
    2 #1e3a8a;
}

.brand-mark {
  font-family: "Festival Color", sans-serif;
  font-palette: --festival-warm;
}
```

Palette indexes depend on the font. Choose overrides from the font's palette data and test the glyphs that the page actually renders.

## Combine with the font shorthand

`font-palette` is independent of the `font` shorthand. Set the shorthand first, then set the palette separately:

```css
.brand-mark {
  font: 700 2rem "Festival Color", sans-serif;
  font-palette: --festival-warm;
}
```

The palette name must be defined and the selected font must match the family in the `@font-palette-values` rule.

## Preserve contrast and fallback behavior

Color fonts are decorative in many interfaces. Keep important words readable if the font or palette does not load, and check contrast against the actual background. A color palette does not guarantee accessible contrast.

```css
.brand-mark {
  font-family: "Festival Color", sans-serif;
  color: #172554;
  font-palette: --festival-warm;
}
```

If the custom palette is unsupported, the browser can still display the font using its default palette or fallback font. Treat palette changes as visual enhancement rather than as the only way to convey meaning.

## Key points

- `font-palette` selects a palette available in a color font.
- `@font-palette-values` creates a named palette based on that font's palette entries.
- `base-palette` and `override-colors` depend on palette data in the actual font.
- Palette selection cannot turn an ordinary monochrome font into a color font.
- Check contrast and provide a useful font fallback.

## Further reading

See the [CSS Fonts Module Level 4](https://drafts.csswg.org/css-fonts-4/#font-palette-prop) for palette selection and custom palette rules.
