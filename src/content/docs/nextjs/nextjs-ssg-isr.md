---
title: SSG and ISR in Next.js
description: Learn how to implement Static Site Generation (SSG) and Incremental Static Regeneration (ISR) in the Next.js App Router.
---

Next.js provides powerful data rendering strategies to balance performance, dynamic capabilities, and SEO. The two primary static rendering techniques are **Static Site Generation (SSG)** and **Incremental Static Regeneration (ISR)**.

---

## 1. Static Site Generation (SSG)

With Static Site Generation, Next.js builds the HTML pages at **build time**. The pre-rendered HTML is then cached by a CDN, resulting in extremely fast page load times.

### A. Static Rendering by Default
In the App Router, data fetches that do not opt out of caching are statically rendered by default.

```tsx
// app/blog/page.tsx
interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function BlogPage() {
  // This fetch is cached (force-cache by default)
  const res = await fetch('https://api.example.com/posts');
  const posts: Post[] = await res.json();

  return (
    <main>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </main>
  );
}
```

### B. Dynamic Routes with SSG (`generateStaticParams`)
To statically generate pages with dynamic paths (e.g., `/blog/[slug]`), use the **`generateStaticParams`** function. This replaces `getStaticPaths` from the Pages Router.

```tsx
// app/blog/[id]/page.tsx
interface Post {
  id: string;
  title: string;
  content: string;
}

// Generate paths at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then((res) => res.json());

  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.id}`).then((res) => res.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## 2. Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) allows you to update static pages **after** you've built your site, without needing to rebuild the entire site.

### A. How ISR Works
1. **Build Time**: The page is statically generated and cached.
2. **Revalidation Period**: During this time, any user request receives the cached page.
3. **Trigger Revalidation**: The first request *after* the revalidation period triggers a background rebuild of the page.
4. **Update Cache**: Once successfully rebuilt, the cache is updated with the new page. Subsequent requests see the updated content.

### B. Implementation (Time-based Revalidation)
To implement ISR, add the `next: { revalidate: seconds }` option to your `fetch` request or export a `revalidate` configuration from the layout or page.

#### Method 1: Using Fetch Options
```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Revalidate this request at most every 60 seconds
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 },
  });
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      {/* Render products */}
    </div>
  );
}
```

#### Method 2: Page-level Segment Config
If you are using database clients or other APIs where `fetch` is not used directly, configure the segment revalidation directly:

```tsx
// app/gallery/page.tsx
import { db } from '@/lib/db';

// Revalidate the page at most every 10 minutes (600 seconds)
export const revalidate = 600;

export default async function GalleryPage() {
  const images = await db.select().from('images');

  return (
    <main>
      <h1>Gallery</h1>
      {/* Render images */}
    </main>
  );
}
```

---

## 3. On-Demand Revalidation

Sometimes, you want to update static content immediately instead of waiting for a timer to expire (e.g., when a user publishes a new CMS post). You can trigger on-demand revalidation using **`revalidatePath`** or **`revalidateTag`**.

### Example: Revalidating a Path in a Server Action
```tsx
// app/actions.ts
'use client';

import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  'use server';

  // Save post to database...
  await savePost(formData);

  // Instantly purge the cache and update the blog page
  revalidatePath('/blog');
}
```

---

## Summary of Rendering Decisions

| Rendering Strategy | Build Time (Static) | Run Time (Dynamic) | Updates |
| :--- | :--- | :--- | :--- |
| **SSG** | Yes | No | Requires a full site build |
| **ISR (Time-based)** | Yes | Background | Automatically updates after `X` seconds |
| **ISR (On-Demand)** | Yes | Background | Triggered immediately by Actions/APIs |
