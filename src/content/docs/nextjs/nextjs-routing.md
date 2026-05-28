---
title: Routing in Next.js
description: Understand routing, special files, layouts, and dynamic routes in the Next.js App Router.
---

Next.js uses a **folder-system router** built on top of React Server Components, known as the **App Router**. In this system, folders are used to define routes, and special files are used to define the UI for those routes.

---

## 1. Folder-Based Routing

In the App Router, every route is represented by one or more folders nested inside the `app/` directory.

- **Folders** are used to define the URL path.
- **Files** (specifically `page.tsx` or `page.js`) are used to create the publicly accessible UI for that path segment.

| URL Path | Folder Structure | Publicly Accessible? |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` | Yes (Root Page) |
| `/about` | `app/about/page.tsx` | Yes |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Yes |
| `/dashboard/analytics` | `app/dashboard/analytics/` (no page file) | No (404 error) |

---

## 2. Special Files

Next.js provides a set of special files to define the UI behavior for each route segment. These files must be named exactly as shown below:

| File Name | Purpose | React Concept |
| :--- | :--- | :--- |
| **`page.tsx`** | The unique UI of a route and makes the path publicly accessible. | Route Component |
| **`layout.tsx`** | Shared UI for a segment and its children. Preserves state and does not re-render. | Layout Wrapper |
| **`template.tsx`** | Similar to layout, but creates a new instance on navigation (re-renders). | Template Wrapper |
| **`loading.tsx`** | Loading UI for the segment and its nested children. | React Suspense |
| **`error.tsx`** | Error UI for the segment and its nested children. | React Error Boundary |
| **`not-found.tsx`** | UI to render when a resource or route is not found. | 404 Page |

---

## 3. Pages and Layouts

### Page (`page.tsx`)
A page represents the UI that is unique to a route.

```tsx
// app/blog/page.tsx
export default function BlogPage() {
  return (
    <section>
      <h1>Our Blog</h1>
      <p>Welcome to our blog page!</p>
    </section>
  );
}
```

### Layout (`layout.tsx`)
A layout is UI shared between multiple routes. When navigating between sibling routes, the layout preserves its state and does not re-render (e.g., maintaining scroll position or search inputs).

```tsx
// app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <a href="/dashboard">Overview</a>
        <a href="/dashboard/settings">Settings</a>
      </nav>
      <main className="dashboard-content">
        {children} {/* This is where nested pages or sub-layouts render */}
      </main>
    </div>
  );
}
```

> [!NOTE]
> The top-most layout is called the **Root Layout** (`app/layout.tsx`). It is mandatory for every Next.js application and must contain the `<html>` and `<body>` tags.

---

## 4. Dynamic Routes

When you don't know the exact segment names ahead of time (e.g., blog post slugs, product IDs), you can use **Dynamic Segments** by wrapping the folder name in square brackets: `[segmentName]`.

### Basic Dynamic Route: `[id]`
A folder named `app/posts/[id]` will match `/posts/1`, `/posts/hello`, etc. The parameter is passed to the page as `params`.

```tsx
// app/posts/[id]/page.tsx
interface PageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PageProps) {
  return <h1>Viewing Post ID: {params.id}</h1>;
}
```

### Catch-all Segments: `[...slug]`
Dynamic segments can be extended to **catch-all** subsequent segments by adding an ellipsis `...` inside the brackets. 
- Folder: `app/shop/[...slug]`
- Matches: `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/shirts`.
- `params.slug` will be an array of strings: `['clothes', 'tops', 'shirts']`.

### Optional Catch-all Segments: `[[...slug]]`
Catch-all segments can be made **optional** by wrapping the parameter in double square brackets.
- Folder: `app/shop/[[...slug]]`
- Matches: `/shop` (unlike regular catch-all, which requires at least one segment) as well as `/shop/clothes`, `/shop/clothes/tops`.
- For `/shop`, `params.slug` is `undefined`.

---

## 5. Navigation

There are three ways to navigate between routes in Next.js:

### A. The `<Link>` Component (Client-Side)
The `<Link>` component extends the HTML `<a>` tag to provide prefetching and client-side navigation.

```tsx
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
    </nav>
  );
}
```

### B. Programmatic Navigation with `useRouter` (Client Components Only)
To navigate programmatically inside a Client Component, use the `useRouter` hook from `next/navigation`.

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    // Perform authentication logic...
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>Log In</button>;
}
```

### C. Server-Side Redirects (`redirect`)
For Server Components, you cannot use client-side hooks. Use the `redirect` function from `next/navigation` instead.

```tsx
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome to your profile!</div>;
}
```

---

## 6. Route Groups

Sometimes you want to organize your folders without changing the URL structure. You can group related folders together inside a folder with parentheses: `(groupName)`.

For example, you might want to group marketing routes and dashboard routes:
- `app/(marketing)/about/page.tsx` becomes accessible at `/about`.
- `app/(dashboard)/settings/page.tsx` becomes accessible at `/settings`.

This is also useful for:
- Creating multiple root layouts (e.g., one layout for `(marketing)` and another for `(dashboard)`).
- Organizing code based on teams or features.
