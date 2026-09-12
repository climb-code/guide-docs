---
title: CSS Scoping
description: Keep component styles local with CSS @scope, including scope roots, limits, and fallback-friendly patterns.
---

CSS scoping limits a group of rules to a particular part of the page. It is useful when a component needs styles that should not affect similarly named elements elsewhere.

The `@scope` at-rule is native CSS. Unlike a class prefix such as `.card .title`, it explicitly declares where a group of rules starts and, optionally, where it stops.

## Create a basic scope

Put the scope root in parentheses, then write the rules that belong inside it:

```css
@scope (.product-card) {
  h2 {
    color: #0f172a;
    font-size: 1.25rem;
  }

  a {
    color: #2563eb;
  }
}
```

Those rules apply only to `h2` and `a` elements inside `.product-card`. The root itself is not matched unless you use `:scope`.

```css
@scope (.product-card) {
  :scope {
    border: 1px solid #cbd5e1;
    border-radius: 0.75rem;
    padding: 1rem;
  }
}
```

## Use it with component markup

```html
<article class="product-card">
  <h2>Notebook</h2>
  <p>A compact notebook for everyday notes.</p>
  <a href="/products/notebook">View product</a>
</article>

<section class="site-footer">
  <a href="/privacy">Privacy</a>
</section>
```

The link in `.product-card` receives the scoped color. The footer link does not.

## Stop a scope at a boundary

Add `to (...)` when a nested section should be excluded. The limit element and everything inside it are outside the scope.

```css
@scope (.article) to (.article-actions) {
  a {
    color: #0369a1;
  }
}
```

```html
<article class="article">
  <p>Read the <a href="/guide">full guide</a>.</p>

  <footer class="article-actions">
    <a href="/share">Share</a>
  </footer>
</article>
```

Only the link in the paragraph is matched by the scoped rule.

## Scope states and descendants

Use `:scope` as the component root when styling state. Use `&` when you want the same reference in nested CSS.

```css
@scope (.alert) {
  :scope {
    background: #eff6ff;
    border-left: 4px solid #2563eb;
  }

  :scope[data-variant="warning"] {
    background: #fffbeb;
    border-left-color: #d97706;
  }

  & .alert__title {
    font-weight: 700;
  }
}
```

`&` refers to the scope root in this context, so `& .alert__title` targets an `.alert__title` inside `.alert`.

## How scoped rules compete

Scoped rules still follow normal cascade rules: origin, importance, cascade layers, and specificity all matter. When otherwise-equal rules have the same origin and specificity, the rule with the *closest scope root* wins.

```css
@scope (.card) {
  .title {
    color: #334155;
  }
}

@scope (.featured-card) {
  .title {
    color: #7c3aed;
  }
}
```

For a `.title` inside an element with both classes, the `.featured-card` rule wins when that root is closer to the title.

## Prefer clear component boundaries

Scoping works best when the root is a meaningful component wrapper. It is not a replacement for every class name: semantic, reusable names such as `.alert__title` still make markup easier to understand.

For projects that must support browsers without `@scope`, keep a prefixed selector fallback or configure the CSS build tool to transform scoped rules:

```css
/* Fallback selector */
.product-card h2 {
  color: #0f172a;
}

/* Progressive enhancement */
@supports (selector(:scope)) {
  @scope (.product-card) {
    h2 {
      color: #0f172a;
    }
  }
}
```

Check the browsers your project supports before relying on `@scope` alone.

## Key takeaways

- `@scope (root)` limits a rule group to descendants of `root`.
- `:scope` targets the root element itself.
- `to (limit)` excludes a nested boundary and its descendants.
- A closer scope root resolves otherwise-equal scoped rules.
- Use meaningful component wrappers and provide a fallback when older-browser support is required.
