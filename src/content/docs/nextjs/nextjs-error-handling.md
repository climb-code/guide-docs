---
title: Error Handling in Next.js
description: Learn how to handle runtime errors, handle page-not-found scenarios, and manage errors in Server Actions and Route Handlers in Next.js.
---

Next.js provides a robust, built-in error handling architecture using file-system conventions. By using dedicated error files—**`error.js`**, **`global-error.js`**, and **`not-found.js`**—you can gracefully handle runtime errors, render fallback UIs, and allow users to recover without crashing the entire application.

---

## 1. Handling Runtime Errors with `error.js`

The `error.js` file convention defines a React Error Boundary for a route segment and its nested children. 

Next.js automatically wraps your route components inside a React Error Boundary. When an error is thrown within a segment, the component hierarchy below the boundary is unmounted, and the fallback UI defined in `error.js` is rendered instead.

### Key Rules for `error.js`
- **Must be a Client Component**: Add the `'use client'` directive at the top of the file.
- **Receives two props**:
  1. `error`: An instance of the `Error` object (with a randomized `digest` property for security on server-side errors).
  2. `reset`: A function that attempts to re-render the error boundary's contents.

### Example: Segment-level Error Fallback
```tsx
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external error monitoring service (e.g. Sentry)
    console.error('Logged error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50">
      <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong!</h2>
      <p className="text-sm text-red-600 mb-4">
        {error.message || 'An unexpected error occurred in the dashboard.'}
      </p>
      <button
        onClick={() => reset()} // Attempt to recover by trying to re-render the segment
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
```

> [!NOTE]
> When an error is thrown in a Server Component, the `error` object passed to `error.js` will have its message stripped of sensitive details in production to prevent leaking server details. Instead, it will contain a generic message and a unique `digest` hash that matches server-side logs.

---

## 2. Handling Root Layout Errors with `global-error.js`

A standard `error.js` boundary does **not** catch errors thrown in the `layout.js` of the same route segment. This is because the layout wraps the error boundary component.

To handle errors in the root layout (`app/layout.tsx`), you must define a **`global-error.js`** in the root `app/` directory.

### Key Rules for `global-error.js`
- **Must be a Client Component**: Add `'use client'`.
- **Must define HTML tags**: Because it replaces the root layout when triggered, it must define its own `<html>` and `<body>` tags.
- It is only active in **production**. In development, the Next.js error overlay will be shown instead.

### Example: Global Error Fallback
```tsx
// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Critical System Error</h1>
          <p className="text-gray-600 mb-6">
            A global application error occurred. We have logged this event and are looking into it.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
```

---

## 3. Handling 404 / Page Not Found with `not-found.js`

The `not-found.js` file is used to render a custom UI when a segment does not exist, or when the `notFound()` function is invoked programmatically.

### Triggering Not Found Programmatically
You can invoke the `notFound()` function from `next/navigation` inside Server Components, Route Handlers, or Client Components to immediately trigger the closest `not-found.js` boundary.

### Example: Custom Not Found Page
```tsx
// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { id: string };
}

async function fetchPost(id: string) {
  const res = await fetch(`https://api.example.com/posts/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound(); // Triggers the nearest not-found.js boundary
  }

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

And the fallback component itself:
```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
```

---

## 4. Errors in Server Actions and Route Handlers

Because Server Actions and Route Handlers are server-side endpoints, errors occurring within them are handled differently from UI rendering errors.

### A. Handling Errors in Server Actions
Instead of letting an action throw and trigger an error boundary, you should use `try-catch` blocks and return structured objects containing success status and error messages back to the client.

```tsx
// app/actions.ts
'use server';

import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    username: formData.get('username'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Save user to database
    await saveUserToDatabase(validatedFields.data.username);
    return { success: true, message: 'User created successfully!' };
  } catch (error) {
    // Return a generic user-friendly message, log the actual error
    console.error(error);
    return { success: false, message: 'Database error. Please try again later.' };
  }
}
```

### B. Handling Errors in Route Handlers
Route Handlers should catch errors and return a JSON response with an appropriate HTTP status code (e.g., `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`).

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchExternalData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Route Handler Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

---

## 5. Summary of Best Practices

1. **Use Nested Boundaries**: Keep `error.js` boundaries as close to the source of failure as possible (e.g. at the nested dashboard level rather than the root) to keep other sections of the UI functional.
2. **Log to Monitoring Systems**: Always use your logging logic or services (like Sentry, LogRocket, Datadog) inside the `useEffect` hook of your `error.js` component.
3. **Handle Server Action Errors Gracefully**: Always wrap database/API updates in Server Actions with `try-catch` and return an error payload to be managed by `useActionState` or state on the frontend.
4. **Implement Global Recovery**: Always implement `global-error.js` in production to capture layout bugs, style breakages, or rendering issues that slip past normal route boundaries.
