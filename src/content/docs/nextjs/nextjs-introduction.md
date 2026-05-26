---
title: Introduction to Next.js
description: Learn about Next.js, the React framework for building full-stack web applications.
---

# Introduction to Next.js

Next.js is a flexible **React framework** created by Vercel that gives you building blocks to create fast, full-stack web applications. 

Under the hood, Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

---

## Why Next.js?

While you can build web applications with raw React, it is primarily a client-side library for building user interfaces. To build a production-ready application, you need to solve complex problems like:

- **Routing:** Setting up navigation between pages.
- **Data Fetching:** Fetching data from an API or database efficiently.
- **Rendering:** Rendering content on the server to improve performance and Search Engine Optimization (SEO).
- **Optimization:** Optimizing images, fonts, and scripts for faster page loads.
- **Compilation/Bundling:** Compiling modern JavaScript/TypeScript and bundling code for browsers.

Next.js provides built-in solutions for all of these problems out of the box, allowing you to focus on writing your application logic.

---

## Key Features of Next.js

Next.js includes several features designed to help you build high-performance web applications:

### 1. File-System Routing
Next.js uses a directory-based routing system. When you add a file to the `app` directory (when using the modern App Router), it automatically becomes available as a route.
- Defining a route for `/about` is as simple as creating `app/about/page.js`.

### 2. Rendering Strategies
Next.js supports multiple rendering methods on a per-page basis:
- **Server-Side Rendering (SSR):** Content is generated on the server for each request.
- **Static Site Generation (SSG):** Pages are pre-rendered at build time, offering blazing-fast load times.
- **Incremental Static Regeneration (ISR):** Statically generated pages can be updated in the background without rebuilding the entire site.
- **Client-Side Rendering (CSR):** Traditional React-style rendering in the browser.

### 3. Server Components (RSC)
Next.js uses **React Server Components** by default. Server Components fetch data and render on the server, resulting in smaller JavaScript bundles sent to the client, faster page loads, and better performance.

### 4. Data Fetching
Next.js extends the standard `fetch` API to allow for easy caching, revalidation, and data fetching directly in your Server Components.

### 5. Built-in Optimizations
Next.js includes specialized components that optimize key resources:
- `<Image />`: Automatically resizes, optimizes, and lazy-loads images.
- `<Link />`: Prefetches code for linked pages in the background for instant transitions.
- `next/font`: Automatically optimizes and hosts Google Fonts locally with zero layout shift.

---

## App Router vs. Pages Router

Next.js has two different routing systems:

| Feature | App Router (Recommended) | Pages Router (Legacy) |
| :--- | :--- | :--- |
| **Directory** | Starts in `/app` | Starts in `/pages` |
| **Default Component Type** | React Server Components (RSC) | Client Components |
| **Routing Model** | Folder-based routing (folders define paths, `page.js` defines UI) | File-based routing (files define paths directly) |
| **Layouts** | Built-in nested layout support (`layout.js`) | Custom layout wrapper required |
| **Data Fetching** | Standard `async/await` in Server Components | Specialized APIs (`getStaticProps`, `getServerSideProps`) |

> [!NOTE]
> For all new applications, Vercel recommends using the **App Router** as it leverages modern React features like Server Components and Streaming.

---

## Prerequisites

Before starting your Next.js journey, you should have a solid foundation in:
1. **HTML & CSS:** Semantic tags and basic styling.
2. **Modern JavaScript (ES6+):** Arrow functions, destructuring, modules, and asynchronous programming (`async`/`await`).
3. **React Basics:** JSX, components, props, and fundamental hooks like `useState` and `useEffect`.

---

## Next Steps

Now that you understand what Next.js is and how it helps you build full-stack React applications, let's learn how to set up your first project and understand its file structure in the next guide!
