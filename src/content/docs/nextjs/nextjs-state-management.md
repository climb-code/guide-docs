---
title: State Management in Next.js
description: Learn how to manage component state, leverage URL search parameters, share server data, and configure global state managers like Zustand in the App Router.
---

Managing state in the Next.js App Router requires understanding the **Server-Client component boundary**. Because React Server Components (RSC) are executed entirely on the server and are stateless, typical React state hooks like `useState` or `useReducer` can only be used inside Client Components.

---

## 1. The Server-Client State Boundary

To manage state effectively, Next.js applications are divided into two distinct zones:

- **Server Component Zone**: Stateless. Receives requests, fetches data directly from databases or APIs, and renders static markup.
- **Client Component Zone**: Stateful. Handles interactivity (button clicks, form inputs, toggles, hooks). Registered using the `"use client"` directive.

---

## 2. URL Search Parameters as State

One of the most powerful state management tools in Next.js is the browser's URL query string. Representing state in the URL (e.g., `/products?color=blue&page=2`) has several benefits:
- **Shareable**: Users can copy-paste the URL, and another user will see the exact same view state.
- **SEO Friendly**: Search engine indexers can crawl paginated or filtered pages.
- **Refresh Proof**: Page reloads do not wipe out the UI state.

### A. Reading Search Params on the Server
Server Component pages receive `searchParams` directly as a prop, allowing you to fetch filtered data server-side:

```tsx
// app/products/page.tsx
import { fetchProducts } from "@/lib/db";

interface PageProps {
  searchParams: { page?: string; search?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  
  const products = await fetchProducts({ page, search });

  return (
    <div>
      <h1>Product Catalog</h1>
      {/* Render products */}
    </div>
  );
}
```

### B. Updating Search Params on the Client
To update search parameters without reloading the page, use the `usePathname` and `useRouter` hooks:

```tsx
// components/SearchInput.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    // Perform navigation to update the page query string
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search") || ""}
      className="p-2 border rounded"
    />
  );
}
```

---

## 3. Sharing Server State with Client Components

To initialize client state using data fetched on the server, fetch the data inside a Server Component and pass it down as a prop:

```tsx
// app/profile/page.tsx (Server Component)
import { fetchUserProfile } from "@/lib/api";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  // Fetch initial profile data on the server
  const profile = await fetchUserProfile();

  // Pass it as a prop to initialize client state
  return <ProfileForm initialData={profile} />;
}
```

The Client Component uses the passed prop as the initial state value:

```tsx
// components/ProfileForm.tsx (Client Component)
"use client";

import { useState } from "react";

interface UserProfile {
  name: string;
  bio: string;
}

export default function ProfileForm({ initialData }: { initialData: UserProfile }) {
  const [profile, setProfile] = useState(initialData);

  return (
    <form>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
    </form>
  );
}
```

---

## 4. React Context in the App Router

React Context can be used to share state among nested Client Components. Since Context Providers rely on React hooks, they must be configured as Client Components.

### A. Create a Context Provider

```tsx
// context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
```

### B. Wrap the Context at Layout Level

You can safely wrap Server Component subtrees inside Client Component Context Providers:

```tsx
// app/[lang]/layout.tsx (Server Component)
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* Server components inside children render normally on the server */}
      {children}
    </ThemeProvider>
  );
}
```

---

## 5. Global State Management (Zustand)

Using a global store (like [Zustand](https://github.com/pmndrs/zustand)) in SSR applications carries a critical risk: **Cross-Request Data Leakage**.

> [!CAUTION]
> If you define a global store as a global singleton (which is standard in single-page apps), that singleton instance is shared across all incoming requests on the Node.js server. If User A logs in and saves their email to the store, User B's server request might read that same store instance, leaking User A's private data!

### Safe Zustand Setup (Per-Request Stores)

To prevent leakage, create a store factory function and wrap it in a React Context Provider so a new store is instantiated uniquely for each request:

### A. Create the Store and Provider

```ts
// providers/CounterStoreProvider.tsx
"use client";

import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
}

type CounterStore = ReturnType<typeof createCounterStore>;

const createCounterStore = (initProps?: Partial<CounterState>) => {
  return createStore<CounterState>((set) => ({
    count: initProps?.count ?? 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }));
};

const CounterStoreContext = createContext<CounterStore | null>(null);

export function CounterStoreProvider({
  children,
  initialCount,
}: {
  children: React.ReactNode;
  initialCount: number;
}) {
  // Use useRef to ensure store is created only once per client mount
  const storeRef = useRef<CounterStore>();
  if (!storeRef.current) {
    storeRef.current = createCounterStore({ count: initialCount });
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
}

export function useCounterStore<T>(selector: (state: CounterState) => T): T {
  const store = useContext(CounterStoreContext);
  if (!store) throw new Error("useCounterStore must be used within CounterStoreProvider");
  return useStore(store, selector);
}
```

### B. Render and Hydrate the Store

Seed the store with data fetched server-side:

```tsx
// app/counter/page.tsx (Server Component)
import { CounterStoreProvider } from "@/providers/CounterStoreProvider";
import CounterDisplay from "@/components/CounterDisplay";

export default async function CounterPage() {
  // Fetch initial state from database
  const dbCount = 10; 

  return (
    <CounterStoreProvider initialCount={dbCount}>
      <CounterDisplay />
    </CounterStoreProvider>
  );
}
```

And consumer components read from the hook:

```tsx
// components/CounterDisplay.tsx (Client Component)
"use client";

import { useCounterStore } from "@/providers/CounterStoreProvider";

export default function CounterDisplay() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

## 6. State Management Best Practices

1. **Prefer URL Parameters**: Always prefer URL queries for filtering, sorting, or pagination states. This maximizes SEO crawlability and ensures page loads reflect correct search listings.
2. **Keep State Local**: Do not lift state higher than necessary. Avoid global store managers if state is only used by a single form or toggle component.
3. **Prevent SSR Rehydration Mismatches**: Ensure components that rely on browser-only state (like `localStorage` or `window.innerWidth`) are wrapped inside a `useEffect` hook, or disabled from SSR using Next.js `dynamic(() => ..., { ssr: false })`.
4. **Beware Server Singletons**: Ensure any global store, connection pool, or module-scoped state variable is instantiated per-request or properly isolated to avoid request-level resource leakage.
