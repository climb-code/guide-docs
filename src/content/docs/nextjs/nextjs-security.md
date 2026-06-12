---
title: Next.js Security Best Practices
description: Learn how to secure your Next.js applications, prevent server leaks, validate inputs, configure CSP headers, and mitigate XSS and CSRF risks.
---

Next.js combines server-side rendering, client-side interactivity, and API routing. This hybrid model requires robust security practices to protect sensitive server secrets, sanitize user inputs, secure cookies, and enforce secure communication headers.

---

## 1. Preventing Server Leakage (`server-only`)

In Next.js, it is easy to accidentally import a server-only module (such as database credentials or private API clients) into a Client Component. This results in sensitive code or environment variables leaking into the browser bundle.

To prevent this, use the `server-only` package, which turns accidental imports into build-time compile errors.

### A. Installation
```bash
npm install server-only
```

### B. Usage
Add `import 'server-only'` at the top of any file that contains database access, API keys, or private operations:

```ts
// lib/db-admin.ts
import "server-only";

import { PrismaClient } from "@prisma/client";

// This database client can now only be safely imported inside Server Components, 
// Server Actions, or Route Handlers. Importing it in a Client Component throws a build error.
export const dbAdmin = new PrismaClient();
```

---

## 2. Server Actions Input Validation

Next.js Server Actions are exposed HTTP POST endpoints behind the scenes. Anyone can trigger them with arbitrary payloads. You **must** validate inputs and authorize the user inside the action.

### Example: Validation and Authorization Check

```ts
// app/actions.ts
"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { db } from "@/lib/db";

const updateProfileSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  bio: z.string().max(160).optional(),
});

export async function updateProfile(formData: FormData) {
  // 1. Authorization check
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // 2. Input validation using Zod
  const validationResult = updateProfileSchema.safeParse({
    username: formData.get("username"),
    bio: formData.get("bio"),
  });

  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.flatten().fieldErrors };
  }

  const { username, bio } = validationResult.data;

  // 3. Database operation
  await db.user.update({
    where: { id: session.user.id },
    data: { username, bio },
  });

  return { success: true };
}
```

---

## 3. Cross-Site Scripting (XSS) Mitigation

React and Next.js automatically escape values rendered in JSX to prevent Cross-Site Scripting (XSS). For example, rendering `{userInput}` is secure by default.

### Dangerous Content Rendering
If you must render rich HTML using `dangerouslySetInnerHTML`, always sanitize the HTML string first to remove malicious scripts (e.g. `<script>` or `onload` attributes) using a library like `isomorphic-dompurify`.

```tsx
// components/RichTextRenderer.tsx
import DOMPurify from "isomorphic-dompurify";

export default function RichTextRenderer({ rawHtml }: { rawHtml: string }) {
  // Sanitize the HTML string to remove harmful scripts
  const cleanHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      className="prose"
    />
  );
}
```

---

## 4. Content Security Policy (CSP) Headers

A Content Security Policy (CSP) restricts the resources (such as JavaScript, CSS, Images, or Iframes) that the browser is allowed to load for a given page, mitigating XSS exploits.

### Implementing CSP in Middleware

You can configure CSP headers dynamically inside Next.js Middleware:

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a random cryptographic nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  
  // Define the CSP policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}
```

---

## 5. Cross-Site Request Forgery (CSRF) Protection

CSRF attacks trick a victim's browser into executing unwanted actions on a web application where they are currently authenticated.

- **Server Actions**: Next.js Server Actions automatically validate the HTTP `Origin` header against the host header to ensure requests originate from the same site. If they do not match, the request is rejected immediately.
- **Route Handlers (APIs)**: If you build custom API endpoints (`app/api/route.ts`), check request origin or require anti-CSRF token headers if the endpoint modifies server data.

---

## 6. Secure Cookie Configuration

When storing sessions, authentication tokens, or user configuration settings in cookies, configure strict attributes to protect them:

- **`HttpOnly`**: Blocks client-side scripts (JavaScript) from accessing the cookie (mitigates session hijacking via XSS).
- **`Secure`**: Enforces that the cookie is only sent over encrypted HTTPS connections.
- **`SameSite=Lax` or `Strict`**: Ensures cookies are not sent on cross-site requests, mitigating CSRF.

### Example: Setting a Secure Cookie

```ts
// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}
```
