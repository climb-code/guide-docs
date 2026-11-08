---
title: CSS Hyphenation
description: Control how browsers break words across lines with CSS hyphenation properties.
---

Hyphenation lets a browser break a word at an appropriate syllable when it reaches the end of a line. It can improve text flow in narrow columns, but good results depend on the language and the browser's available dictionaries.

## Enable automatic hyphenation

Set the content language and opt in to automatic hyphenation:

```html
<article lang="en">
  <p class="intro">A paragraph with long words can wrap more evenly in a narrow column.</p>
</article>
```

```css
.intro {
  hyphens: auto;
}
```

The `lang` attribute gives the browser the language rules to use. Without language information, automatic hyphenation may not work or may use unsuitable rules.

## Choose a hyphenation mode

The `hyphens` property accepts three values:

```css
.prose {
  hyphens: manual;
}

.prose--automatic {
  hyphens: auto;
}

.product-code {
  hyphens: none;
}
```

- `manual` (the initial value) permits breaks only at explicit soft hyphens (`&shy;`) or other language-specific break points.
- `auto` allows the browser to insert breaks based on language rules.
- `none` prevents hyphenation opportunities within words.

## Adjust where breaks can happen

Use the minimum character properties to avoid awkward breaks near the start or end of a word:

```css
.article-copy {
  hyphens: auto;
  hyphenate-limit-chars: 7 3 3;
}
```

The three numbers set the minimum total word length, characters before a hyphen, and characters after it. Support varies, so treat this property as a refinement rather than a requirement for readable wrapping.

## Use soft hyphens selectively

For a word that needs a known break point, insert a soft hyphen (`&shy;`). It stays invisible unless the browser breaks the word there:

```html
<p>inter&shy;operability</p>
```

Use soft hyphens sparingly in content that may be searched, copied, or translated, since they add invisible characters to the text.

## Key points

- Set the correct `lang` attribute before relying on `hyphens: auto`.
- `manual` allows authored break points, while `auto` uses language dictionaries.
- Use minimum character limits to reduce short, awkward fragments where supported.
- Check hyphenation at the actual font size and column width used by the page.
