---
title: Advanced Routing (Parallel & Intercepting)
description: Master advanced routing patterns in Next.js, including Parallel Routes and Intercepting Routes for modals, dashboards, and complex layouts.
---

Next.js App Router provides advanced routing mechanisms—**Parallel Routes** and **Intercepting Routes**—designed to handle complex layout states like modals, side-by-side dashboard panels, and contextual transitions without losing application state.

---

## 1. Parallel Routes

Parallel Routing allows you to simultaneously or conditionally render one or more pages within the same layout. This is highly useful for highly dynamic sections of an app, such as dashboards and social feeds.

### A. Folder Structure (`@slot`)
Parallel routes are defined using named **slots**. Slots are created with the `@folder` syntax. 

For example, a dashboard with two parallel views (`@analytics` and `@team`) looks like this:

```text
dashboard/
├── @analytics/
│   └── page.tsx
├── @team/
│   └── page.tsx
├── layout.tsx
└── page.tsx
```

### B. Defining the Layout
Slots are passed directly to the corresponding layout as props. You can render them alongside the main `{children}` prop.

```tsx
// app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid">
      <div className="main-content">{children}</div>
      <div className="sidebar-panels">
        <section>{analytics}</section>
        <section>{team}</section>
      </div>
    </div>
  );
}
```

> [!NOTE]
> The `@slots` themselves are not part of the URL structure. A route of `app/dashboard/@analytics/page.tsx` is accessible simply at `/dashboard`.

---

## 2. Intercepting Routes

Intercepting routes allow you to load a route from another part of your application inside the current layout. This is commonly used to show a preview or a modal (e.g., viewing a photo in a feed) while keeping the background context intact.

### A. Convention Matching
Intercepting routes use the `(..)` convention, similar to relative paths `../`:
- **`(.)`** matches segments on the **same level**.
- **`(..)`** matches segments **one level above**.
- **`(..)(..)`** matches segments **two levels above**.
- **`(...)`** matches segments from the **root** `app` directory.

### B. Example: Photo Modal Feed
To intercept a photo detail page (`/photo/[id]`) when navigating from a gallery feed (`/`):

```text
app/
├── @modal/
│   ├── (.)photo/
│   │   └── [id]/
│   │       └── page.tsx
│   └── default.tsx
├── photo/
│   └── [id]/
│       └── page.tsx
├── layout.tsx
└── page.tsx
```

- When navigating to `/photo/123` from within the application (client-side transition), the intercepted page `app/@modal/(.)photo/[id]/page.tsx` renders in the `@modal` slot.
- If a user refreshes or visits `/photo/123` directly (hard reload), the full-page fallback `app/photo/[id]/page.tsx` renders instead.

---

## 3. Combining Parallel and Intercepting Routes

By combining these two features, you can create modals that support shareable URLs, preserve background context, and gracefully fall back to full pages when refreshed.

### Step 1: Define the Slot in the Root Layout
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal} {/* Render modal overlay here */}
      </body>
    </html>
  );
}
```

### Step 2: Define `default.tsx`
When Next.js cannot match a parallel slot's active state on reload, it looks for a `default.tsx` file to render a fallback. For overlays/modals, you should return `null` so nothing is shown by default.

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null;
}
```

### Step 3: Implement the Modal Component
Inside the intercepted page, wrap your content with a modal dialog.

```tsx
// app/@modal/(.)photo/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Photo Details</h2>
        <p>Displaying intercepted preview for Photo ID: {params.id}</p>
        <button onClick={() => router.back()}>Close Modal</button>
      </div>
    </div>
  );
}
```

---

## Summary comparison

| Feature | Primary Purpose | Folder Naming | URL Behaviour |
| :--- | :--- | :--- | :--- |
| **Parallel Routes** | Split a layout into multiple dynamic panels. | `@folder` | Does not affect the URL. |
| **Intercepting Routes** | Display contextual pages (e.g., modals) on client-side routes. | `(.)folder`, `(..)folder` | Retains page URL but renders intercepted UI. |
