---
title: Getting Started & Setup
description: Learn how to set up a Next.js project and understand the directory structure of the App Router.
---

# Getting Started & Setup

Before you start building with Next.js, you'll need to set up your development environment, initialize a new project, and understand how Next.js organizes its files.

---

## Prerequisites

To build applications with Next.js, you need:
- **Node.js 18.17** or later installed on your local machine.
- A basic understanding of **React** (components, hooks, JSX).

> [!NOTE]
> You can check your Node.js version by running `node -v` in your terminal.

---

## 1. Initializing Your Project

The easiest and recommended way to start a new Next.js project is using the automated CLI tool: **`create-next-app`**.

Run the following command in your terminal:

```bash
npx create-next-app@latest my-next-app
```

During installation, you will be prompted with a series of questions. We recommend accepting the default values (using TypeScript and the App Router):

```text
Would you like to use TypeScript? › Yes
Would you like to use ESLint? › Yes
Would you like to use Tailwind CSS? › Yes
Would you like to use `src/` directory? › Yes
Would you like to use App Router? (recommended) › Yes
Would you like to customize the default import alias (@/*)? › No
```

### Prompt Details:
* **TypeScript:** Configures TypeScript out of the box with auto-generated configuration files.
* **Tailwind CSS:** Installs Tailwind CSS and configures its entry files automatically.
* **`src/` Directory:** Groups application code (like the `app/` folder) inside a nested `src/` directory to separate code from config files.
* **App Router:** Enables the modern directory-system routing that supports React Server Components.

---

## 2. Directory Structure Walkthrough

Once the setup is complete, navigate into your directory (`cd my-next-app`). You'll see the following folder layout:

```text
my-next-app/
├── node_modules/
├── public/                # Static assets (images, SVGs, favicon)
│   ├── next.svg
│   └── vercel.svg
├── src/
│   └── app/               # App Router folder (where pages & layouts go)
│       ├── layout.tsx     # Root Layout (applies to all pages)
│       ├── page.tsx       # Root Page (displays at http://localhost:3000)
│       └── globals.css    # Global CSS styles
├── next.config.mjs        # Next.js custom configuration
├── package.json           # Scripts and dependency versions
├── tsconfig.json          # TypeScript compiler configuration
└── tailwind.config.ts     # Tailwind CSS styling paths
```

### Key Files in `src/app/`:
1. **`layout.tsx` (Root Layout):** This file defines the global HTML structure (`<html>` and `<body>` tags). Any UI defined here (such as navbars or footers) remains shared across all pages of your site.
2. **`page.tsx` (Root Page):** This is the entry page of your application. The JSX returned here renders when a user visits the root URL (`/`).
3. **`globals.css`:** Contains global stylesheets, including Tailwind directives.

---

## 3. Running the Development Server

To start coding locally, run the development script defined in your `package.json`:

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**. You will see the default Next.js template page.

---

## 4. Making Your First Changes

Open the file `src/app/page.tsx` in your editor. Replace the default template code with a simple message:

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Hello World! Welcome to Next.js</h1>
      <p>My first Next.js App Router application is running.</p>
    </main>
  );
}
```

Save the file. The browser will instantly update without reloading the page, thanks to Next.js **Fast Refresh**.

---

## Next Steps

Now that you have your development environment up and running, let's explore how to create new pages, set up layouts, and navigate between them using the **Next.js App Router**.
