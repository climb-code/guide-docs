---
title: Database Integration & ORMs in Next.js
description: Learn how to connect Next.js App Router applications to relational and document databases using Prisma, manage connection pools, and run queries in Server Components.
---

Next.js is a full-stack framework, meaning your React Server Components (RSC) and Server Actions can connect to and query databases directly on the server. This eliminates the need for a separate API server layer, resulting in faster latency and simpler architectures.

---

## 1. Direct Server-Side Access

Because React Server Components (RSC) execute exclusively on the server, you can import and run database client libraries directly inside your component files.

```tsx
// app/users/page.tsx
import { db } from "@/lib/db"; // Import your database client

export default async function UsersPage() {
  // Directly query the database on the server
  const users = await db.user.findMany();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Users List</h1>
      <ul className="mt-4 list-disc pl-5">
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 2. Managing Connection Pooling in Serverless/Edge Environments

Next.js projects are often deployed to serverless environments (like Vercel). In serverless architectures, backend servers are initialized and destroyed dynamically. 
If your database client is initialized on every function instantiation, it can quickly exhaust the database's maximum allowed connections (connection pool exhaustion).

### The Global Singleton Client Solution

To prevent creating multiple connection pools during hot-reloads in development or scaling in production, instantiate your database client as a global singleton.

#### Example: Prisma Client Singleton

```ts
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// In development, hot-reloads would re-run this file. 
// Attaching the client to the global scope preserves the connection pool.
export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
```

---

## 3. Writing Mutations inside Server Actions

Server Actions provide a secure, seamless bridge to modify database records directly from client-side interactive elements (like forms) using standard async server functions.

```ts
// app/actions.ts
"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export async function createPost(prevState: any, formData: FormData) {
  // Validate request parameters on the server
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Write directly to the database
    await db.post.create({
      data: validatedFields.data,
    });

    // Revalidate the route cache to fetch fresh data on the client
    revalidatePath("/posts");
    
    return { success: true, message: "Post created successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to create post. Please try again." };
  }
}
```

---

## 4. Database Caching and Revalidation

By default, Next.js caches data fetches to optimize speeds. However, database client calls (like `db.user.findMany()`) are not cached by the default `fetch` cache mechanism.

### Cache Database Queries with `unstable_cache`

You can manually cache database results and assign them tags for dynamic purging:

```ts
// lib/queries.ts
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getCachedPosts = unstable_cache(
  async () => {
    return await db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["posts-list"], // Cache key
  { revalidate: 3600, tags: ["posts"] } // Revalidate tags
);
```

### Purging Database Cache on Mutation

When a write operation occurs (e.g., creating or updating a post in a Server Action), purge the cached query using `revalidateTag`:

```ts
// app/actions.ts
"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function updatePostTitle(id: string, newTitle: string) {
  await db.post.update({
    where: { id },
    data: { title: newTitle },
  });

  // Purge the cached database query
  revalidateTag("posts");
}
```

---

## 5. Security Best Practices

1. **Keep Secrets Secret**: Never prefix database credentials, server URLs, or private keys with `NEXT_PUBLIC_`. Keep them strictly as backend-only environment variables (e.g., `DATABASE_URL`).
2. **Always Authorize on Mutations**: Next.js Server Actions are public HTTP endpoints. Always check the user's session credentials (`auth()`) before executing write operations.
3. **Use Connection Poolers**: In highly distributed serverless environments, connect your database client using a transaction-mode connection pooler like **PgBouncer** or serverless database proxies (e.g., Prisma Accelerate, Neon Connection Pooling) to absorb sudden spikes in server instances.
4. **Clean up Resources**: If starting background node scripts, ensure you close connections using hooks like `process.on('SIGTERM', () => db.$disconnect())` to avoid database leaks.
