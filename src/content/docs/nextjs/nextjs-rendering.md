---
title: Server and Client Components
description: Master React Server Components (RSC) and Client Components in the Next.js App Router.
---

In the Next.js App Router, components are **Server Components by default**. This architecture allows you to build rich, interactive user interfaces while minimizing the amount of JavaScript sent to the client, leading to faster page loads and better user experiences.

To achieve this, Next.js splits components into two categories: **Server Components** and **Client Components**.

---

## 1. React Server Components (RSC)

Server Components are rendered exclusively on the server. They do not send any client-side JavaScript to the browser for rendering.

### Benefits:
- **Zero Client Bundle Size**: The component code remains on the server. Only the rendered HTML is sent to the browser, significantly reducing page weight.
- **Direct Backend Access**: You can interact with databases, access the file system, and read environment variables securely.
- **Improved Performance**: Data fetching can be performed directly on the server, which is closer to database sources, reducing latency.
- **SEO & Core Web Vitals**: Server Components generate HTML immediately, which is indexed by search engines and improves the First Contentful Paint (FCP).

### Example:
```tsx
// src/app/posts/page.tsx
// This is a Server Component by default
import { db } from '@/lib/db';

export default async function PostsPage() {
  // Directly query the database on the server
  const posts = await db.query('SELECT * FROM posts LIMIT 10');

  return (
    <main>
      <h1>Recent Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## 2. Client Components

Client Components allow you to add client-side interactivity to your application. They are pre-rendered on the server and hydrated (making them interactive by running JavaScript) in the browser.

To declare a component as a Client Component, add the **`'use client'`** directive at the very top of the file, before any imports.

### When to Use:
- When using interactive state hooks like `useState()`, `useReducer()`, or `useEffect()`.
- When using event listeners like `onClick()`, `onSubmit()`, or `onChange()`.
- When using browser-only APIs such as `window`, `document`, or `localStorage`.
- When using custom hooks that depend on client-side state or browser APIs.

### Example:
```tsx
// src/components/Counter.tsx
'use client'; // This directive marks it as a Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## 3. When to use Server vs. Client Components?

To determine whether a component should be a Server or Client Component, reference this simple decision table:

| What do you need to do? | Server Component | Client Component |
| :--- | :---: | :---: |
| Fetch data from the database or API | **Yes** | No |
| Access backend resources directly | **Yes** | No |
| Keep sensitive tokens & API keys secure | **Yes** | No |
| Keep the client bundle size small | **Yes** | No |
| Add interactivity and event listeners (`onClick`) | No | **Yes** |
| Use State and Lifecycle Hooks (`useState`, `useEffect`) | No | **Yes** |
| Use browser-only APIs (`window`, `localStorage`) | No | **Yes** |
| Use custom hooks that rely on client hooks | No | **Yes** |

---

## 4. Component Patterns and Interoperability

When building full-stack applications, Server and Client Components must work together. Here are the core patterns to follow:

### A. Keep Client Components at the Leaves
To optimize your application's performance, try to move Client Components to the leaves of your component tree.

For example, instead of making a whole layout client-side just because it has a search bar:
- Keep the layout/header as a **Server Component**.
- Create a standalone `<SearchBar />` component, mark it with `'use client'`, and import it into your header.

### B. Passing Server Components to Client Components (as Props)
You **cannot** import a Server Component directly into a Client Component. Doing so would turn the Server Component into a Client Component and cause it to send unnecessary JavaScript to the browser.

Instead, pass the Server Component as a child or a prop to the Client Component:

```tsx
// src/components/ClientWrapper.tsx
'use client';

import { useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Content</button>
      {isOpen && children} {/* The Server Component renders here */}
    </div>
  );
}
```

Now, inside a Server Component page:

```tsx
// src/app/page.tsx
import ClientWrapper from '@/components/ClientWrapper';
import ServerContentList from '@/components/ServerContentList'; // Server Component

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContentList /> {/* Passed as a child, remains a Server Component */}
    </ClientWrapper>
  );
}
```

### C. Serializing Props (Server to Client)
When passing props from a Server Component to a Client Component, the props **must be serializable**.
- **Allowed**: Strings, Numbers, Booleans, plain Objects, Arrays, and Null/Undefined.
- **Not Allowed**: Functions, Dates, Map/Set, or Complex Classes (these cannot be sent over the network as-is).

> [!WARNING]
> If you attempt to pass non-serializable data (like a raw Database Date object or a function callback) from a Server Component to a Client Component, Next.js will throw a serialization error. Convert dates to ISO strings before passing them!

---

## Next Steps

Now that you understand the boundary between Server and Client Components, let's explore how to handle **Data Fetching, Caching, and Revalidation** in Next.js to dynamically load your content!
