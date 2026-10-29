---
title: Next.js and CDN Cache Interview Question
description: An interview question and simple example explaining how Next.js deployments update browser and CDN caches.
---

## After deploying a new Next.js version, how do the browser and CDN get the new content?

### Sample answer

The browser does not receive a message saying that a new version was deployed. When a user opens or refreshes a page, the browser requests it again. The CDN checks its cache rules and either serves a cached response or asks the origin for a fresh one.

Next.js gives static files such as JavaScript and CSS under `/_next/static/` content-based file names. For example, one build might use `app.a1b2.js`, while the next uses `app.c3d4.js`. The new page refers to the new file name, so the browser downloads the new file. The old file can stay cached because the new page no longer points to it.

Pages and data have separate cache rules. For example, an App Router page can use time-based revalidation:

```js
export const revalidate = 60
```

Next.js can regenerate that page after it becomes stale. If a separate CDN also caches the page, it must respect the response's cache headers. For an immediate content update, the app can call `revalidatePath('/products')` and also purge the matching CDN cache if the CDN is holding its own copy.

So, a normal code deployment updates assets through new file names, while cached page or data content is updated according to its revalidation rules or an explicit purge. An already-open browser tab may need a refresh or navigation before it requests the new page.

References: [Next.js CDN caching guide](https://nextjs.org/docs/app/guides/cdn-caching), [Next.js ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration).
