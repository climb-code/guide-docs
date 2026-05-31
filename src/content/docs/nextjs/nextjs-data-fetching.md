---
title: Data Fetching and Caching
description: Learn how to fetch data, configure caching, and revalidate content in Next.js.
---

Next.js builds on top of React Server Components by extending the native web **`fetch` API**. This extension gives you control over the caching and revalidation behaviors of individual fetch requests directly from the server.

---

## 1. Fetching Data on the Server

In Next.js, it is recommended to fetch data on the server using React Server Components. This allows you to fetch data before sending any HTML to the client, improving page load speeds and overall performance.

To fetch data, declare your component as an `async` function and use `await` with the standard `fetch` API:

```tsx
// src/app/users/page.tsx
interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  // Fetch data directly in the Server Component
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();

  return (
    <main>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## 2. Caching Strategies

By default, Next.js caches the return values of `fetch` requests on the server for optimal performance. You can customize the caching behavior of each request using the `cache` option.

### A. Force Cache (Static Data)
This is the default option. Next.js fetches the data once at build time (or on the first request in development) and caches it indefinitely. This is equivalent to **Static Site Generation (SSG)**.

```tsx
// Cached indefinitely (Default behavior)
const res = await fetch('https://api.example.com/products', {
  cache: 'force-cache',
});
```

### B. No Store (Dynamic Data)
Use `no-store` to bypass the cache. This forces Next.js to fetch the data fresh on every single request. This is equivalent to **Server-Side Rendering (SSR)**.

```tsx
// Fetched fresh on every request
const res = await fetch('https://api.example.com/exchange-rates', {
  cache: 'no-store',
});
```

---

## 3. Revalidating Cached Data

Revalidation is the process of clearing the cache and fetching the latest data. Next.js supports two types of revalidation:

### A. Time-Based Revalidation
Automatically revalidate cached data after a set number of seconds. This behaves like **Incremental Static Regeneration (ISR)**.

```tsx
// Revalidate this request every 60 seconds (1 minute)
const res = await fetch('https://api.example.com/blog/posts', {
  next: { revalidate: 60 },
});
```

### B. On-Demand Revalidation
Revalidate data manually in response to an event (like a form submission or a webhook). This is done using tags or paths:

1. **Tag-based Revalidation**: Add a tag to your fetch request:
   ```tsx
   const res = await fetch('https://api.example.com/posts', {
     next: { tags: ['posts-list'] },
   });
   ```
2. **Trigger Revalidation**: Call `revalidateTag` in a Server Action or Route Handler to clear that cache:
   ```tsx
   import { revalidateTag } from 'next/cache';

   async function handleNewPost() {
     'use server';
     // Clear the cache for the 'posts-list' tag on-demand
     revalidateTag('posts-list');
   }
   ```

---

## 4. Streaming and Loading UI

When fetching data dynamically, pages can sometimes take time to load. Next.js allows you to stream HTML from the server and show a loading fallback.

### A. Route-Level Loading (`loading.tsx`)
Create a `loading.tsx` file inside a route folder. Next.js will automatically wrap the folder's `page.tsx` with a React `<Suspense>` boundary and display the loading component while data is fetching.

```tsx
// src/app/users/loading.tsx
export default function Loading() {
  return <div className="spinner">Loading users data...</div>;
}
```

### B. Component-Level Loading (`<Suspense>`)
For more fine-grained loading, you can wrap specific components in `<Suspense>` yourself:

```tsx
// src/app/dashboard/page.tsx
import { Suspense } from 'react';
import AnalyticsData from '@/components/AnalyticsData';
import RecentOrders from '@/components/RecentOrders';

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      
      {/* Analytics streams separately from Orders */}
      <Suspense fallback={<p>Loading Analytics...</p>}>
        <AnalyticsData />
      </Suspense>

      <Suspense fallback={<p>Loading Orders...</p>}>
        <RecentOrders />
      </Suspense>
    </main>
  );
}
```

---

## 5. Server Actions (Data Mutations)

While `fetch` is used for retrieving data, **Server Actions** are used to mutate data (create, update, delete) on the server. They can be invoked directly from HTML forms or interactive Client Components.

To create a Server Action, add the **`'use server'`** directive at the top of the function body (or at the top of a dedicated actions file).

```tsx
// src/app/posts/create/page.tsx
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function NewPostPage() {
  // Define the Server Action
  async function createPost(formData: FormData) {
    'use server';

    const title = formData.get('title');
    const content = formData.get('content');

    // Save to database
    await db.insert({ title, content });

    // Refresh the cached posts page immediately
    revalidatePath('/posts');

    // Redirect user back to the list
    redirect('/posts');
  }

  return (
    <form action={createPost}>
      <label>
        Post Title:
        <input type="text" name="title" required />
      </label>
      <label>
        Content:
        <textarea name="content" required />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
}
```

---

## Next Steps

Now that you have mastered Next.js routing, components, and data fetching, you have all the fundamental building blocks to build highly optimized full-stack web applications with Next.js!
