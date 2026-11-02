---
title: CSS Debugging and DevTools
description: Diagnose CSS issues with browser DevTools, computed styles, layout overlays, and a repeatable troubleshooting workflow.
---

CSS debugging is the process of finding why a style does not produce the result you expect. Browser developer tools let you inspect the rendered page, see which rules apply, and test fixes without repeatedly editing and reloading your files.

## Open the browser developer tools

In most desktop browsers, right-click an element and choose **Inspect**. The Elements or Inspector panel shows the page's HTML and the CSS rules matched to the selected element. The Console can also report stylesheet loading errors and invalid CSS.

## Inspect matched and computed styles

The Styles panel lists declarations that match the selected element. Crossed-out declarations lost in the cascade, often because another declaration has higher specificity, appears later, or is in a higher-priority cascade layer.

The Computed panel shows the final value for each property after the cascade and inheritance have been resolved. Use it when a property looks correct in your source but the page renders differently. Expand a computed property to find the rule that supplied its value.

```css
button {
  color: white;
}

.toolbar button {
  color: navy;
}
```

For a button inside `.toolbar`, the second selector is more specific, so the computed text color is `navy`.

## Check box sizing and layout

Use the box model diagram to inspect content, padding, border, and margin. This helps explain unexpected element sizes and gaps. For layout problems, select the parent and enable the browser's Flexbox or Grid overlay. The overlay can show tracks, gaps, alignment, and item placement directly on the page.

Also inspect an element's `display`, `position`, `overflow`, and dimensions. A child that seems misplaced may be positioned relative to an unexpected ancestor, clipped by an overflow container, or participating in a different formatting context than expected.

## Test changes safely

You can toggle declarations, edit values, and add temporary rules in DevTools. These edits are temporary; copy a verified fix into the correct source stylesheet. Avoid solving every conflict by adding `!important` or a longer selector, since that can make later changes harder to reason about.

## A repeatable debugging workflow

1. Select the element that looks wrong in the Inspector.
2. Confirm the expected stylesheet loaded and the selector matches.
3. Check for syntax errors, inactive media queries, and crossed-out declarations.
4. Compare the matched rules with the computed property value.
5. Inspect the box model and relevant layout overlays.
6. Change one declaration at a time, then move the verified fix into your source CSS.

## Common causes

- A selector does not match the element or has a typo.
- A later, more specific, or higher-priority rule overrides the declaration.
- A media or container query condition is not currently true.
- The stylesheet failed to load because its path is incorrect.
- The property value is invalid or the property does not apply to that element's layout.
- The element is clipped, hidden, or covered by another element.

## Key points

- Inspect matched rules to understand the cascade and computed styles to find the final value.
- Use box model diagrams and Flexbox/Grid overlays to investigate layout.
- Treat DevTools edits as experiments, then copy the fix into the source stylesheet.
- Prefer fixing the underlying selector, cascade, or layout issue over accumulating overrides.
