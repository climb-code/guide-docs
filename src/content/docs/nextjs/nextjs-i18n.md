---
title: Internationalization (i18n) in Next.js
description: Learn how to set up multi-language routing, implement middleware-based locale negotiation, and manage translation dictionaries in the Next.js App Router.
---

Internationalization (i18n) enables your application to support multiple languages and locales. In the Next.js App Router, i18n is implemented using **localized routing** (putting the locale as a dynamic route segment, e.g., `/en/dashboard` vs. `/es/dashboard`) and intercepting requests via **Middleware**.

---

## 1. Directory Structure for Localized Routing

To support dynamic locale routes, you wrap your root application pages inside a dynamic folder segment named `[lang]`.

```text
my-app/
├── dictionaries/
│   ├── en.json
│   └── es.json
├── src/
│   ├── middleware.ts
│   └── app/
│       └── [lang]/
│           ├── layout.tsx
│           ├── page.tsx
│           └── about/
│               └── page.tsx
```

By nesting your pages under `[lang]`, Next.js routes all paths (e.g., `/en`, `/es/about`) directly to the layout and pages within that segment, supplying the locale as a route param.

---

## 2. Locale Detection with Middleware

Next.js Middleware intercepts requests to decide which locale to redirect the user to if no locale is present in the URL (e.g., redirecting `/about` to `/en/about`).

We can use standard web headers (`Accept-Language`) and packages like `@formatjs/intl-localematcher` and `negotiator` to detect the user's preferred language.

### A. Installation

Install the language negotiation utilities:

```bash
npm install @formatjs/intl-localematcher negotiator
npm install --save-dev @types/negotiator
```

### B. Middleware Configuration

Create a `src/middleware.ts` file to match locales and perform redirects:

```ts
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "es", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already contains a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // No locale present -> Redirect
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring API routes, _next static files, and assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
```

---

## 3. Creating and Loading Dictionaries

Dictionaries are JSON files that map keys to translations. You load the appropriate dictionary server-side based on the current `[lang]` param.

### A. Define Translations

Create your JSON dictionaries in a root `dictionaries/` folder:

```json
// dictionaries/en.json
{
  "welcome": "Welcome to our application!",
  "description": "This page is internationalized."
}
```

```json
// dictionaries/es.json
{
  "welcome": "¡Bienvenido a nuestra aplicación!",
  "description": "Esta página está internacionalizada."
}
```

### B. Set Up the Dictionary Loader

Create a helper utility to lazy-load the appropriate JSON file:

```ts
// src/app/[lang]/dictionaries.ts
import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("../../../dictionaries/en.json").then((module) => module.default),
  es: () => import("../../../dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const loadDictionary = dictionaries[locale] || dictionaries.en;
  return loadDictionary();
};
```

> [!NOTE]
> We import `"server-only"` to ensure this dictionary loader only runs on the server, avoiding sending large JSON translation bundles to the client browser.

---

## 4. Applying Locales in Layouts and Pages

Within the `[lang]` folder, every layout and page receives the active `lang` segment inside the `params` prop.

### A. The Localized Root Layout

Use the `lang` parameter to set the HTML document language attribute dynamically:

```tsx
// src/app/[lang]/layout.tsx
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
```

### B. Rendering Localized Content in Pages

Fetch the dictionary server-side inside your page component:

```tsx
// src/app/[lang]/page.tsx
import { getDictionary } from "./dictionaries";

interface PageProps {
  params: { lang: string };
}

export default async function IndexPage({ params }: PageProps) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold">{dict.welcome}</h1>
      <p className="mt-4 text-gray-600">{dict.description}</p>
    </main>
  );
}
```

---

## 5. Changing Languages (Language Switcher)

To allow users to switch languages, you can create a Client Component that parses the current pathname, swaps the locale segment, and pushes the new path to the router.

```tsx
// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLang: string) => {
    if (!pathname) return;

    // Split path: e.g. "/en/about" -> ["", "en", "about"]
    const segments = pathname.split("/");
    segments[1] = newLang; // Replace the locale

    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="p-2 border rounded bg-white text-gray-800"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
```

---

## 6. Optimization: Static Translation Pre-rendering

By default, routes with dynamic parameters like `[lang]` are rendered dynamically at request time. If you know your supported languages in advance, you can compile them to static HTML pages at build time using `generateStaticParams`.

```tsx
// src/app/[lang]/page.tsx
import { getDictionary } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function Page({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);
  return <h1>{dict.welcome}</h1>;
}
```

This ensures Next.js performs **Static Site Generation (SSG)** for all language variants of the page, leading to instant load speeds.

---

## 7. Internationalization Best Practices

1. **Leverage SEO Metadata**: Always include alternative language references (`hreflang` tags) inside your page metadata to help search engines index different regional versions of your site.
2. **Handle Dynamic Content**: Keep structured layouts in your code and only place translateable text nodes in JSON dictionaries. Avoid placing structural HTML nodes inside translation files.
3. **Persist User Choice**: If a user manually changes their language, set a cookie (e.g., `NEXT_LOCALE=es`). In your Middleware, check for this cookie first before checking the `Accept-Language` header.
