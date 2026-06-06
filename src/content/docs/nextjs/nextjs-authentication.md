---
title: Authentication in Next.js
description: Learn how to implement secure authentication, protect routes with Middleware, and manage user sessions in Next.js App Router applications.
---

Authentication is a fundamental aspect of full-stack web applications. In Next.js, authentication is designed around the boundary between the server and the client, allowing you to secure UI segments, Route Handlers, and Server Actions.

---

## 1. Authentication Models in Next.js

When implementing authentication in the Next.js App Router, you can choose between two main strategies:

1. **Session-based (Database Sessions)**: A session ID is stored in a secure cookie, and the full session data is stored in a database on the server. On every request, the server queries the database to validate the session.
2. **Token-based (JWT Sessions)**: User data is encoded into a signed JSON Web Token (JWT) and stored in a secure, HTTP-only cookie. The server validates the token cryptographically without needing database lookups.

### Server vs. Client Authentication Check
- **Server-side**: Validate authentication state inside Server Components, Layouts, Route Handlers, and Server Actions. This is highly secure and prevents layout flashes.
- **Client-side**: Read the session state to update interactive components (e.g., hiding/showing a profile dropdown or login button).

---

## 2. Setting Up Auth.js (NextAuth.js)

[Auth.js](https://authjs.dev/) (formerly NextAuth.js) is the industry standard for authentication in Next.js applications. It supports multiple authentication strategies (OAuth, Credentials, Passwordless) and integrates seamlessly with database adapters.

### A. Installation

Install Auth.js and its peer dependencies in your Next.js project:

```bash
npm install next-auth@beta
```

### B. Configuration

Create the configuration file in the root or `src/` directory.

```ts
// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Custom authentication logic (e.g., querying your database)
        const user = { id: "1", name: "Jane Doe", email: "jane@example.com" };
        
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to a custom login page
  },
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
```

### C. Route Handler Setup

To handle the authentication requests (like `/api/auth/signin`, `/api/auth/signout`), export the `GET` and `POST` handlers in your API directory.

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

---

## 3. Securing Routes with Middleware

Next.js Middleware allows you to run code before a request is completed. You can intercept requests and redirect unauthenticated users away from protected pages (like `/dashboard` or `/settings`).

Create a `middleware.ts` file in the root of your project:

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const nextUrl = request.nextUrl;

  const isProfilePage = nextUrl.pathname.startsWith("/profile");
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  if ((isProfilePage || isDashboardPage) && !session) {
    // Redirect to login page if user is not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Config to specify which paths this Middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

---

## 4. Server-Side Session Checks

You can fetch user session details on the server to conditionally render UI, restrict mutations, or personalize views.

### A. In Server Components and Layouts

Use the `auth()` helper to retrieve the session securely on the server without client-side requests:

```tsx
// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // Guarding the page server-side (fallback for middleware config gaps)
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back, <span className="font-semibold">{session.user?.name}</span>!
      </p>
    </div>
  );
}
```

### B. Securing Server Actions

Server Actions are open POST endpoints. You **must** validate the session inside each Server Action to prevent unauthorized users from performing operations:

```ts
// app/actions.ts
"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateBio(formData: FormData) {
  const session = await auth();

  // 1. Authorization Check
  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  const bio = formData.get("bio") as string;

  try {
    // 2. Perform the update securely using session.user.id
    await db.user.update({
      where: { id: session.user.id },
      data: { bio },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Database update failed" };
  }
}
```

### C. Securing Route Handlers

When building custom API endpoints, ensure you perform session checks directly at the handler level:

```ts
// app/api/user/settings/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch data belonging specifically to the user session
  const userSettings = await fetchSettingsForUser(session.user.id);
  
  return NextResponse.json(userSettings);
}
```

---

## 5. Client-Side Authentication State

To access the user session in Client Components, wrap your application in the `SessionProvider` context, and use the `useSession` hook.

### A. Register SessionProvider

Create a custom wrapper component to pass session down to Client Components:

```tsx
// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Import this provider inside your Root Layout:

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### B. Using the `useSession` Hook

In interactive Client Components, fetch the session client-side to dynamically show navigation changes:

```tsx
// components/Navbar.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <nav className="p-4 border-b">Loading...</nav>;
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white">
      <Link href="/" className="font-bold text-lg">My App</Link>
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Signed in as {session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
```

---

## 6. Authentication Best Practices in Next.js

1. **Keep Session Tokens Secure**: Use HTTP-only, secure, and `SameSite=Lax` cookie attributes to prevent Cross-Site Scripting (XSS) and mitigate Cross-Site Request Forgery (CSRF). Auth.js configures this automatically in production.
2. **Authorize Everywhere**: Never assume the user is authorized because they passed the Middleware. Always verify the session credentials directly within Route Handlers and Server Actions.
3. **Handle Token Expiration**: Set reasonable expiration times on JWTs (e.g., 30 days) and implement refresh token rotation strategies if long-lived sessions are required.
4. **Use Environment Variables**: Always load client IDs, client secrets, and authentication secrets (`AUTH_SECRET`) via environment variables. Avoid committing credentials to Git.
5. **Prefer Server-Side Checks**: Check sessions in Server Components (using `auth()`) to render views immediately on the server, minimizing layout shifts and avoiding blank/loading skeletons.
