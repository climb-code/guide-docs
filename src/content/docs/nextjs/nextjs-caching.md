---
title: Caching in Next.js
description: Learn how the Next.js App Router implements various caching mechanisms (Request Memoization, Data Cache, Full Route Cache, and Router Cache) to optimize performance.
---

Next.js features a multi-layered caching system designed to optimize performance and reduce loading times. By default, Next.js caches as much as possible to ensure fast page delivery and minimize external API calls.

To build fast and predictable Next.js applications, it is essential to understand the four primary caching mechanisms:

1. **Request Memoization** (React-level)
2. **Data Cache** (Next.js-level, Server-side)
3. **Full Route Cache** (Next.js-level, Server-side)
4. **Router Cache** (Next.js-level, Client-side)

---

## Caching Mechanisms Overview

| Cache | What it caches | Where it lives | Scope | Lifetime |
| :--- | :--- | :--- | :--- | :--- |
| **Request Memoization** | Return values of `fetch` | Server | Per-Request | Single request lifecycle |
| **Data Cache** | Fetched data / API responses | Server | Persistent (Shared) | Persistent (until revalidated) |
| **Full Route Cache** | Rendered HTML and RSC payload | Server | Persistent (Shared) | Persistent (until revalidated) |
| **Router Cache** | Rendered segments/pages | Client (Browser) | Per-User Session | Temporary / Page Refresh |

---

## 1. Request Memoization

**Request Memoization** is a React feature (not Next.js specific) that dedupes `fetch` requests within the same render tree. 

If you need to fetch the same data in multiple components (e.g., in a layout and a nested page), you do not need to fetch the data at a parent component and pass it down as props. Instead, you can call `fetch` in both places with no performance penalty.

```tsx
// Example: Both components call the same API endpoint.
// React will execute the network request once and reuse the result.

async function UserProfile() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return <div>{user.name}</div>;
}

async function UserNavigation() {
  const res = await fetch('https://api.example.com/user'); // Memoized!
  const user = await res.json();
  return <nav>{user.name}'s Dashboard</nav>;
}
```

- **How to opt-out:** Use an `AbortController` or use non-`GET` HTTP methods (only `GET` fetches are memoized).

---

## 2. Data Cache

The **Data Cache** is a persistent, server-side cache that stores the data returned by `fetch` calls across incoming requests and deployment lifecycles.

Whenever a server-side `fetch` is executed, Next.js checks the Data Cache. If a cached version is found, it is returned instantly. Otherwise, the request is made to the origin server, and the result is cached.

### Controlling the Data Cache

You can control caching behavior using the `cache` option in `fetch`:

```tsx
// 1. Force Cache (Default): Cache the data indefinitely
fetch('https://api.example.com/products', { cache: 'force-cache' });

// 2. No Cache: Fetch fresh data on every request (opts out of Data Cache)
fetch('https://api.example.com/products', { cache: 'no-store' });

// 3. Time-based Revalidation: Cache the data, but revalidate after 60 seconds
fetch('https://api.example.com/products', { next: { revalidate: 60 } });
```

---

## 3. Full Route Cache

The **Full Route Cache** stores the compiled HTML and **React Server Component (RSC) Payload** of routes on the server. This cache applies only to **Statically Rendered** routes.

At build time (or during Incremental Static Regeneration), Next.js pre-renders routes and saves them in the Full Route Cache. When a user requests a static page, the pre-rendered HTML and payload are served directly.

### Dynamic Rendering (Opting Out)
A route will automatically bypass the Full Route Cache and render dynamically on every request if you use:
- **Dynamic Functions:** `cookies()`, `headers()`, or search parameters (`searchParams`).
- **No-store fetches:** Fetch requests with `{ cache: 'no-store' }`.
- **Dynamic configuration:** `export const dynamic = 'force-dynamic'`.

---

## 4. Router Cache

The **Router Cache** is a client-side (in-memory) cache that stores pre-rendered page segments in the browser as the user navigates. 

When a user visits a page or when a `<Link>` component enters the viewport, Next.js prefetches the page segment and stores it in the Router Cache. This makes subsequent transitions between pages feel instantaneous.

### Lifetime of Router Cache:
- **Automatic Invalidation:** The cache is cleared on page refresh.
- **Session Duration:** Prefetched routes are stored for **5 minutes** (for dynamic pages) or **30 seconds** (for static pages).
- **Manual Invalidation:** You can force a refresh of the Router Cache by calling `router.refresh()` or by using Server Actions that call `revalidatePath` or `revalidateTag`.

---

## Best Practices

1. **Leverage Request Memoization:** Don't hesitate to call the same `fetch` endpoint in multiple components. React will optimize it for you.
2. **Use Time-based Revalidation for Dynamic Content:** If data changes frequently but doesn't need to be real-time, cache it with a short revalidation window (e.g., `revalidate: 30`).
3. **Use On-Demand Revalidation for User Actions:** When a user modifies data (e.g., creating a comment), invoke a Server Action that calls `revalidatePath('/post/[id]')` to clear the cache instantly.
4. **Be Mindful of Dynamic Functions:** Accessing `cookies()` at the layout level will make all child pages render dynamically. If you only need cookies in specific components, read them as deep in the component tree as possible.
