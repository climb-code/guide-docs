---
title: Next.js Server and Client Components Interview Questions
description: Interview questions and answers about React Server Components and Client Components in the Next.js App Router.
---

## 1. What are Server Components and Client Components in Next.js?

**Answer:** In the Next.js App Router, components are Server Components by default. A Server Component runs on the server and is useful for fetching data, accessing server-only resources, and rendering content without shipping that component's JavaScript to the browser.

A Client Component is used for interactive UI that needs browser APIs, event handlers, or React state and effects. Add the `'use client'` directive at the top of its file to mark the client boundary. On the initial page load, Client Components can also be rendered to HTML on the server; their JavaScript then runs in the browser to make them interactive.

## 2. When should you use a Server Component, and when should you use a Client Component?

**Answer:** I use a Server Component by default, especially for pages that fetch data, read from a database, or use private environment variables. This keeps server-only code out of the browser bundle and avoids sending unnecessary JavaScript to the client.

I use a Client Component for interactions such as opening a menu, responding to a click, managing input state, or using browser APIs like `localStorage`. I keep the client boundary as close as possible to the interactive part of the UI so the rest of the page can remain server-rendered.

## 3. Can a Server Component be used inside a Client Component?

**Answer:** A Client Component should not import a Server Component directly, because the imported module would enter the client component graph. Instead, a Server Component can render the Server Component and pass its output to a Client Component through a prop such as `children`. The Client Component can then control where that already-rendered content appears without turning the Server Component into client code.

Props passed from a Server Component to a Client Component must be serializable. For example, pass plain data rather than a database connection or a function defined on the server.

For more detail, see the [Server and Client Components guide](/nextjs/nextjs-rendering).
