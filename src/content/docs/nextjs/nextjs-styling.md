---
title: Styling in Next.js
description: Learn the different ways to style your Next.js applications, including CSS Modules, Global CSS, and Tailwind CSS.
---

Next.js supports multiple ways of styling your application out of the box, allowing you to choose the approach that best fits your workflow. From traditional global stylesheets to modular CSS and utility-first frameworks like Tailwind CSS, Next.js optimizes your styles for production.

---

## 1. Global CSS

Global styles are applied across your entire application. Because global styles can affect all elements on a page, they must be imported in the **Root Layout** (`app/layout.tsx`).

### How to use:
1. Create a global stylesheet (e.g., `src/app/globals.css`).
2. Import it inside your root layout file:

```tsx
// src/app/layout.tsx
import './globals.css'; // Import global CSS

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
     html>
  );
}
```

> [!WARNING]
> You cannot import global CSS files inside components other than `app/layout.tsx`. This restriction prevents unexpected styling conflicts across page navigations.

---

## 2. CSS Modules

CSS Modules locally scope CSS by automatically creating unique class names. This prevents class name collisions, allowing you to use the same class name in different files without conflicts.

### How to use:
CSS Modules use the naming convention **`[name].module.css`**.

1. Create a stylesheet for your component (e.g., `Button.module.css`):

```css
/* src/components/Button.module.css */
.button {
  padding: 0.75rem 1.5rem;
  background-color: hsl(220, 90%, 56%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: hsl(220, 90%, 46%);
}
```

2. Import the CSS module file as an object inside your component file:

```tsx
// src/components/Button.tsx
import styles from './Button.module.css';

export default function Button() {
  return (
    <button className={styles.button}>
      Click Me
    </button>
  );
}
```

When rendered, Next.js compiles the class name to something unique, like `Button_button__a1b2c`, which completely isolates the styles.

---

## 3. Tailwind CSS

Tailwind CSS is a utility-first CSS framework that integrates seamlessly with Next.js. If you selected Tailwind CSS during project initialization via `create-next-app`, it is already pre-configured.

### Setup and Directives:
Tailwind works by scanning your component files for utility classes and generating the corresponding CSS. To enable it, the Tailwind directives are added to the top of your global CSS file:

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The scan paths are defined in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

### Example Usage:
You can style components directly in your JSX using Tailwind's utility classes:

```tsx
// src/components/Card.tsx
export default function Card() {
  return (
    <div className="max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
        Tailwind Card
      </h2>
      <p className="mb-4 text-slate-600 dark:text-slate-400">
        This card is styled entirely using Tailwind utility classes.
      </p>
      <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
        Read More
      </button>
    </div>
  );
}
```

---

## 4. Sass & CSS-in-JS

### Sass:
Next.js has built-in support for Sass using both `.scss` and `.sass` extensions. It also supports Sass Modules via the `[name].module.scss` naming convention.

To use Sass, install the compiler package:
```bash
npm install -D sass
```

### CSS-in-JS:
You can use popular CSS-in-JS libraries like `styled-components`, `emotion`, or `styled-jsx`.

> [!IMPORTANT]
> Because Server Components are rendered on the server without executing runtime JavaScript, CSS-in-JS libraries that require runtime state or hydration must be placed inside **Client Components** (`'use client'`).

---

## 5. Styling Best Practices in Next.js

1. **Keep Client Components Small**: If a styling approach requires client-side JavaScript (such as some CSS-in-JS solutions or theme toggles), isolate it in a leaf-level Client Component to keep parent components as lightweight Server Components.
2. **Use Tailwind for Layouts**: Tailwind is highly recommended for building responsive grid layouts and rapid interfaces without leaving your markup files.
3. **Use CSS Modules for Custom Components**: For highly specific, complex, and reusable components (like calendars or rich-text editors), use CSS Modules to keep the styling logic separate and clean.
4. **Theme with HSL variables**: Define central theme colors as HSL variables in your `globals.css` file to easily implement dark-mode and custom color palettes across both Tailwind and vanilla CSS.
