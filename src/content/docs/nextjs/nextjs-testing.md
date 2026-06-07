---
title: Testing Next.js Applications
description: Learn how to set up Vitest, React Testing Library, and Playwright to unit test, integration test, and E2E test your Next.js App Router applications.
---

Testing ensures that your Next.js application remains robust and reliable as features grow. In the App Router paradigm, testing is organized around the boundaries between Server and Client Components, API Route Handlers, and user journeys.

---

## 1. Testing Strategies in Next.js

A comprehensive testing strategy for Next.js balances three main testing styles:

1. **Unit Testing**: Tests individual functions, hooks, or pure components in isolation. Very fast to run.
2. **Integration Testing**: Tests how multiple components interact (e.g., a form submitting data to a parent component).
3. **End-to-End (E2E) Testing**: Tests the entire application running in a real headless browser context (e.g., validating authentication flows, DB updates, and router redirects).

---

## 2. Setting Up Vitest and React Testing Library

[Vitest](https://vitest.dev/) is a modern, fast unit-testing framework that works out-of-the-box with Next.js configurations. Together with [React Testing Library (RTL)](https://testing-library.com/), it is the recommended approach for unit and integration testing.

### A. Installation

Install the required dependencies:

```bash
npm install -g vitest
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### B. Configuration

Create a `vitest.config.ts` (or `vitest.config.js`) file in the root of your project:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

Create a setup file to extend Jest assertions for Jest-DOM (e.g., `.toBeInTheDocument()`):

```ts
// vitest.setup.ts
import "@testing-library/jest-dom";
```

Add test scripts to your `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

### C. Testing a Client Component

Here is how to test an interactive counter component:

```tsx
// components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

And its test file:

```tsx
// components/Counter.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter Component", () => {
  it("renders initial count and increments on click", async () => {
    render(<Counter />);

    const countText = screen.getByText("Count: 0");
    expect(countText).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /increment/i });
    await userEvent.click(button);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

---

## 3. Testing Server Components

React Server Components (RSC) run entirely on the server and are often asynchronous since they fetch data directly. 

### A. Testing Asynchronous Server Components

Because Server Components return a Promise when they fetch data, you can resolve them inside your tests using standard JavaScript `await`:

```tsx
// components/PostList.tsx
interface Post {
  id: number;
  title: string;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://api.example.com/posts");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function PostList() {
  const posts = await fetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

To test this component, mock the global `fetch` function and await the rendered component:

```tsx
// components/PostList.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "./PostList";

describe("PostList Server Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and renders list of posts", async () => {
    const mockPosts = [
      { id: 1, title: "Next.js Testing Guide" },
      { id: 2, title: "Mastering React Server Components" },
    ];

    // Mock global fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    // Resolve the async Server Component
    const PostListResolved = await PostList();
    render(PostListResolved);

    expect(screen.getByText("Next.js Testing Guide")).toBeInTheDocument();
    expect(screen.getByText("Mastering React Server Components")).toBeInTheDocument();
  });
});
```

---

## 4. Testing Server Actions and Route Handlers

Because Server Actions and Route Handlers are plain functions running on the server, you can test them directly in Node.js environments without rendering UI elements.

### A. Testing Server Actions

Testing a Server Action involves calling the action directly and asserting its output:

```ts
// app/actions.ts
"use server";

export async function validateEmail(email: string) {
  if (!email.includes("@")) {
    return { success: false, error: "Invalid email format" };
  }
  return { success: true };
}
```

```ts
// app/actions.test.ts
import { describe, it, expect } from "vitest";
import { validateEmail } from "./actions";

describe("validateEmail Server Action", () => {
  it("returns error for invalid email", async () => {
    const result = await validateEmail("invalid-email");
    expect(result).toEqual({ success: false, error: "Invalid email format" });
  });

  it("succeeds for valid email", async () => {
    const result = await validateEmail("test@example.com");
    expect(result).toEqual({ success: true });
  });
});
```

### B. Testing Route Handlers

To test Route Handlers (APIs), pass a mock `Request` object directly to the handler:

```ts
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Guest";
  return NextResponse.json({ message: `Hello, ${name}!` });
}
```

```ts
// app/api/hello/route.test.ts
import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/hello", () => {
  it("returns greeting with default name", async () => {
    const request = new Request("http://localhost:3000/api/hello");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "Hello, Guest!" });
  });

  it("returns greeting with custom name parameter", async () => {
    const request = new Request("http://localhost:3000/api/hello?name=Jane");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "Hello, Jane!" });
  });
});
```

---

## 5. End-to-End (E2E) Testing with Playwright

Playwright runs your tests in real browsers (Chromium, Firefox, WebKit) and is the most reliable way to test user journeys.

### A. Setup

Initialize Playwright in your Next.js repository:

```bash
npm init playwright@latest
```

Follow the prompts to add test folders, setup GitHub Actions, and download browsers.

### B. Writing an E2E Test

Here is a test that checks page navigation and verifies routing:

```ts
// e2e/navigation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("App Navigation", () => {
  test("should navigate to the dashboard from home page", async ({ page }) => {
    // Start from the home page
    await page.goto("http://localhost:3000/");

    // Find and click the link with text 'Go to Dashboard'
    await page.click("text=Go to Dashboard");

    // The new URL should include '/dashboard'
    await expect(page).toHaveURL("http://localhost:3000/dashboard");

    // The new page should contain an h1 element with 'Dashboard'
    await expect(page.locator("h1")).toContainText("Dashboard");
  });
});
```

Run your Playwright tests:

```bash
npx playwright test
```

---

## 6. Mocking Next.js APIs (Router, Navigation)

When unit-testing Client Components, they often use Next.js APIs (like `useRouter` or `usePathname`). You must mock these APIs to prevent runtime reference errors during tests.

### A. Mocking `next/navigation`

Use Vitest's `vi.mock()` to define stub functions for the router hooks:

```tsx
// components/ProfileButton.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileButton from "./ProfileButton";

// 1. Define the router push mock function
const mockPush = vi.fn();

// 2. Mock next/navigation module
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      prefetch: () => null,
    };
  },
  usePathname() {
    return "/settings";
  },
}));

describe("ProfileButton Component", () => {
  it("navigates to user profile on click", async () => {
    render(<ProfileButton />);

    const button = screen.getByRole("button", { name: /view profile/i });
    await userEvent.click(button);

    // Verify router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith("/profile");
  });
});
```

---

## 7. Testing Best Practices in Next.js

1. **Avoid Mocking Everything**: When integration-testing, allow subcomponents to render naturally rather than mocking them. This verifies they correctly pass props.
2. **Reset Mocks Between Tests**: Always run `vi.restoreAllMocks()` or `vi.clearAllMocks()` in `beforeEach` blocks to prevent side-effects from leakages.
3. **Run E2E Tests on Built Assets**: Run your E2E test suites against a production build (`npm run build && npm run start`) instead of the dev server to verify production routing and optimizations.
4. **Use Test IDs Sparingly**: Prefer querying elements by roles (like `getByRole('button', { name: /save/i })`) or text matching. Use custom test attributes (e.g., `data-testid`) only when standard selectors are unavailable.
