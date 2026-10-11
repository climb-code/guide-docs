---
title: CSS Feature Queries
description: Use @supports to enhance a working baseline with supported CSS declarations and selectors.
---

Feature queries apply a group of CSS rules when the browser supports a specified declaration or selector. Write a usable baseline first, then add an enhancement inside `@supports`.

## Start with a working layout

```html
<section class="cards" aria-label="CSS lessons">
  <article class="card"><h2>Selectors</h2><p>Target elements.</p></article>
  <article class="card"><h2>Layout</h2><p>Arrange content.</p></article>
  <article class="card"><h2>Colors</h2><p>Style surfaces.</p></article>
</section>
```

```css
.card {
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
}

.card + .card {
  margin-top: 1rem;
}

@supports (display: grid) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: 1rem;
  }

  .card + .card {
    margin-top: 0;
  }
}
```

The baseline stacks cards with margin between them. The enhancement uses grid and replaces that margin with `gap`. Test a property and value together: parentheses around `(display: grid)` are required.

## Combine conditions

| Operator | Meaning | Example |
| --- | --- | --- |
| `and` | Every condition must pass | `(display: grid) and (position: sticky)` |
| `or` | At least one condition must pass | `(display: grid) or (display: flex)` |
| `not` | Negates the following condition | `not (display: grid)` |

```css
@supports (display: grid) and (position: sticky) {
  .contents {
    position: sticky;
    top: 1rem;
  }
}

@supports not (display: grid) {
  .cards {
    max-width: 40rem;
    margin-inline: auto;
  }
}
```

When mixing `and` and `or`, group the conditions explicitly:

```css
@supports ((display: grid) or (display: flex)) and (position: sticky) {
  .contents {
    position: sticky;
    top: 1rem;
  }
}
```

A browser that does not understand `@supports` skips the entire rule, including a `not` query. Put essential fallback styles outside feature queries.

## Check selector support

Use `selector()` to check whether a selector is supported before applying an enhancement that depends on it.

```css
.field {
  padding: 0.75rem;
  border: 2px solid #64748b;
}

@supports selector(:has(*)) {
  .field:has(input:focus-visible) {
    border-color: #1d4ed8;
    background: #eff6ff;
  }
}
```

Here `.field` is a wrapper containing an input. Its baseline border remains visible, and the enhancement highlights the wrapper during keyboard focus. Keep the input's own focus indicator visible too.

## Feature queries and media queries

`@supports` checks CSS capabilities. `@media` checks conditions such as viewport width or a user's motion preference. They can be nested when both are relevant.

```css
@supports (display: grid) {
  @media (min-width: 60rem) {
    .page-layout {
      display: grid;
      grid-template-columns: 16rem minmax(0, 1fr);
      gap: 2rem;
    }
  }
}
```

## Understand what a query proves

A positive feature query indicates support for the tested CSS syntax. It does not guarantee bug-free rendering or that an element meets the layout conditions needed for a feature to work. Test the resulting page in your target browsers.

Not every new declaration needs a feature query: browsers normally ignore unsupported declarations. Use `@supports` when several rules need to change together or when the enhancement must undo baseline spacing or layout.

## Common mistakes

- Putting the only usable layout inside a feature query.
- Treating a successful query as a browser-version check.
- Forgetting to reset baseline margins when introducing grid `gap`.
- Mixing `and` and `or` without grouping their conditions.
- Assuming a query tests visual correctness or accessibility.

## Related topics

- [CSS Grid](/css/css-grid/)
- [Responsive Web Design](/css/css-responsive-design/)
- [CSS Pseudo-classes and Pseudo-elements](/css/css-pseudo-classes-elements/)
- [CSS Accessibility](/css/css-accessibility/)

## References

- [W3C CSS Conditional Rules: @supports](https://www.w3.org/TR/css-conditional-3/#at-supports)
- [W3C CSS Conditional Rules: selector()](https://www.w3.org/TR/css-conditional-4/#supports-selector-fn)
