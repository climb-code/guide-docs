---
title: "CSS Interview Question: Scroll Anchoring"
description: One CSS interview question and answer about scroll anchoring and the overflow-anchor property.
---

## What is CSS scroll anchoring, and when would you use `overflow-anchor: none`?

Scroll anchoring is the browser behavior that adjusts a scroll position when content above the visible area changes, helping keep the same content in view. It is usually helpful and works automatically.

I would use `overflow-anchor: none` only when I can reproduce a conflict between browser adjustments and an interface that manages its own scroll position, such as a virtualized log. I would scope it to that scroll area and test the experience with the target browsers, because disabling anchoring broadly can make content jump unexpectedly.

Read more in the [CSS Scroll Anchoring guide](/css/css-scroll-anchoring).
