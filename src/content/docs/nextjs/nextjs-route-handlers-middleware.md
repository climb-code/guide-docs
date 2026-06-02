---
title: Route Handlers and Middleware
description: Learn how to create custom request handlers and intercept requests using Middleware in Next.js.
---

Next.js provides two key tools for handling custom server requirements: **Route Handlers** (to create API endpoints) and **Middleware** (to intercept and process requests before they complete).

---

## 1. Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web Requests and Responses APIs. They are the App Router equivalent of API Routes in the Pages Router.

Route Handlers are defined in a **`route.ts`** (or `route.js`) file inside the `app/` directory.

### Supported HTTP Methods
You can define handler functions for standard HTTP verbs: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`. If an unsupported method is called, Next.js will automatically return a `405 Method Not Allowed` response.

### Example: Simple GET Handler
```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  return NextResponse.json(users);
}
```

### Example: POST Handler with JSON Parsing
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name: body.name,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
```

> [!WARNING]
> A `route.ts` file cannot exist at the same path segment as a `page.tsx` file (e.g. `app/dashboard/route.ts` and `app/dashboard/page.tsx` will cause a conflict). Place API files in a dedicated subdirectory like `app/api/...`.

---

## 2. Request and Response Helpers

Next.js extends standard Web Request and Response APIs with custom helpers (`NextRequest` and `NextResponse`).

### A. Reading Query Parameters
```tsx
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q'); // e.g., /api/search?q=nextjs

  return NextResponse.json({ query });
}
```

### B. Accessing Cookies & Headers
You can inspect or set cookies and custom headers directly on the request/response:

```tsx
// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

export async function GET(request: NextRequest) {
  // Using the cookies/headers helpers from next/headers
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  const headerList = headers();
  const userAgent = headerList.get('user-agent');

  return NextResponse.json({ token, userAgent });
}
```

---

## 3. Middleware

Middleware runs **before** a request is completed. It allows you to intercept incoming requests and dynamically rewrite, redirect, modify headers, or verify session tokens.

Middleware is defined by creating a **`middleware.ts`** (or `middleware.js`) file in the **root** of your project (same level as `app` or `src`).

### Example: Authentication Guard Middleware
```tsx
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value;

  // Protect the dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### Matching Paths
The `config.matcher` property allows you to filter Middleware to run on specific paths:
- Supports single strings or arrays of paths.
- Supports regex syntax (e.g., `'/dashboard/:path*'` matches all subroutes of `/dashboard`).

Alternatively, you can use conditional statements within the `middleware` function to filter paths dynamically.

---

## 4. Middleware Responses

Middleware can respond in several ways:

1. **`NextResponse.next()`**: Allow the request to continue.
2. **`NextResponse.redirect()`**: Redirect the request to a different URL (changes the browser URL).
3. **`NextResponse.rewrite()`**: Rewrite the request to a different URL (keeps the browser URL unchanged, useful for A/B testing or localization).
4. **Header Manipulation**: Add or remove request/response headers.
   ```tsx
   const response = NextResponse.next();
   response.headers.set('x-custom-header', 'my-value');
   return response;
   ```
