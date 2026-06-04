---
title: Next.js Optimizations
description: Learn how to optimize images, fonts, scripts, and search engine optimization (SEO) metadata in Next.js.
---

Next.js includes built-in components and APIs designed to automate standard web performance and search engine optimization (SEO) tasks out of the box.

---

## 1. Image Optimization

The standard HTML `<img>` tag is prone to issues like layout shifts, slow loading times, and poor file size compression. Next.js solves these issues with the **`<Image>`** component (`next/image`), which extends the HTML `<img>` element with automated optimization.

### Key Benefits:
- **Size Optimization**: Automatically serves correctly-sized images for each device using modern formats like WebP or AVIF.
- **Visual Stability**: Automatically prevents **Cumulative Layout Shift (CLS)** by requiring width and height attributes or placeholders.
- **Lazy Loading**: Images are only loaded as they enter the browser viewport.
- **Asset Flexibility**: Supports on-demand image resizing, even for external servers.

### Example: Local Image
For local images, import the file directly. Next.js automatically calculates the width, height, and blur placeholder:

```tsx
import Image from 'next/image';
import profilePic from '../public/me.png';

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="Author profile picture"
      placeholder="blur" // Optional: Show a blurred placeholder while loading
    />
  );
}
```

### Example: Remote Image
For remote images, specify the width, height, and configure acceptable domains in `next.config.js`:

```tsx
// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="https://example.com/hero.jpg"
      alt="Hero background"
      width={800}
      height={400}
      priority // Optional: Prioritize loading this image if it is above the fold
    />
  );
}
```

---

## 2. Font Optimization

**`next/font`** automatically optimizes fonts (including Google Fonts) and removes external network requests for improved privacy and performance.

### Key Benefits:
- **Zero Layout Shifts**: Uses size-adjust fallback fonts automatically.
- **Pre-downloading**: Downloads font files at build time and hosts them locally inside the deployment bundle.
- **Self-Hosting**: No network requests are sent to Google Fonts from the user's browser.

### Example: Google Font Setup
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

// Instantiate the font with desired configurations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Fallback font is swapped immediately when loaded
  variable: '--font-inter', // Custom CSS variable name
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

---

## 3. Script Optimization

The standard `<script>` tag blocks rendering if placed in the `<head>` or requires manual attributes to defer execution. The Next.js **`<Script>`** component (`next/script`) allows you to load third-party scripts anywhere inside your components and tune their loading behavior.

### Script Loading Strategies:
- **`beforeInteractive`**: Load the script before any Next.js code and before page hydration (use for critical libraries like bot detection).
- **`afterInteractive`** (Default): Load the script after the page is hydrated (use for analytics, tag managers).
- **`lazyOnload`**: Load the script during idle time (use for chat support widgets, advertisements).
- **`worker`**: (Experimental) Load the script inside a Web Worker.

### Example: Third-Party Analytics
```tsx
import Script from 'next/script';

export default function Dashboard() {
  return (
    <>
      <Script
        src="https://example.com/analytics.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Analytics script loaded successfully!');
        }}
      />
      <div>Dashboard Content</div>
    </>
  );
}
```

---

## 4. Metadata API (SEO)

Next.js provides a unified Metadata API to improve your application's SEO and sharing preview cards. You can configure metadata inside any Server Component page or layout.

### A. Static Metadata
Export a `metadata` object from a `page.tsx` or `layout.tsx` file. Next.js will automatically inject it into the page's HTML `<head>`.

```tsx
// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Guide Docs',
  description: 'Learn more about the team behind Guide Docs.',
  openGraph: {
    title: 'About Us | Guide Docs',
    description: 'Learn more about the team behind Guide Docs.',
    images: ['/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

### B. Dynamic Metadata
When metadata depends on dynamic data (like product details or route parameters), export a `generateMetadata` function.

```tsx
// app/products/[id]/page.tsx
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product data to set dynamic title
  const product = await fetch(`https://api.example.com/products/${params.id}`).then((res) => res.json());

  return {
    title: `${product.title} | Store`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  return <h1>Viewing Product {params.id}</h1>;
}
```
