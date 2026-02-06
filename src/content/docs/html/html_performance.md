---
title: HTML Performance Optimization
description: Learn how to optimize HTML for better page load performance using resource hints, lazy loading, async/defer scripts, and preloading strategies.
---

Optimizing HTML is crucial for fast page loads and better user experience. Learn techniques to improve performance through efficient resource loading.

## Resource Hints

Resource hints help browsers optimize resource loading.

### preload

Load critical resources early:

```html
<head>
  <!-- Preload critical CSS -->
  <link rel="preload" href="styles.css" as="style">
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Preload hero image -->
  <link rel="preload" href="hero.jpg" as="image">
  
  <!-- Preload critical JavaScript -->
  <link rel="preload" href="app.js" as="script">
</head>
```

**When to use:** For resources needed immediately on page load.

### prefetch

Load resources for next navigation:

```html
<head>
  <!-- Prefetch next page resources -->
  <link rel="prefetch" href="next-page.html">
  <link rel="prefetch" href="next-page-styles.css">
  
  <!-- Prefetch likely user actions -->
  <link rel="prefetch" href="product-details.html">
  <link rel="prefetch" href="checkout.html">
</head>
```

**When to use:** For resources likely needed soon, but not immediately.

### preconnect

Establish early connections:

```html
<head>
  <!-- Connect to API server -->
  <link rel="preconnect" href="https://api.example.com">
  
  <!-- Connect to CDN -->
  <link rel="preconnect" href="https://cdn.example.com">
  
  <!-- Connect to analytics -->
  <link rel="preconnect" href="https://analytics.google.com">
  
  <!-- Connect to fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

**When to use:** For third-party domains you'll fetch resources from.

### dns-prefetch

Resolve DNS early:

```html
<head>
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="https://api.example.com">
  <link rel="dns-prefetch" href="https://cdn.cloudflare.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
</head>
```

**When to use:** Lighter alternative to `preconnect` for many third-party domains.

## Script Loading Strategies

### async Attribute

Load scripts asynchronously:

```html
<!-- Load and execute ASAP, without blocking -->
<script src="analytics.js" async></script>
<script src="ads.js" async></script>

<!-- Good for independent scripts -->
<script src="tracking.js" async></script>
```

**Behavior:**
- Downloads in parallel with page parsing
- Executes immediately when ready
- Doesn't block HTML parsing
- Execution order not guaranteed

**Use for:** Independent scripts like analytics, ads, social widgets.

### defer Attribute

Defer script execution:

```html
<!-- Execute after DOM is ready, in order -->
<script src="jquery.js" defer></script>
<script src="app.js" defer></script>
<script src="plugins.js" defer></script>
```

**Behavior:**
- Downloads in parallel with page parsing
- Executes after DOM is ready
- Maintains script order
- Executes before `DOMContentLoaded`

**Use for:** Scripts that need the DOM or have dependencies.

### Inline Scripts

```html
<!-- Blocking inline script -->
<script>
  // Runs immediately, blocks parsing
  console.log('Inline script');
</script>

<!-- Non-blocking placement -->
<body>
  <!-- Content here -->
  
  <!-- Scripts at end of body -->
  <script src="app.js"></script>
</body>
```

### Comparison Example

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Preload critical resources -->
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="critical.js" as="script">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  
  <!-- Critical CSS inline or linked -->
  <link rel="stylesheet" href="critical.css">
  
  <!-- Defer non-critical scripts -->
  <script src="app.js" defer></script>
  
  <!-- Async for independent scripts -->
  <script src="analytics.js" async></script>
</head>
<body>
  <!-- Content -->
</body>
</html>
```

## Lazy Loading

### Image Lazy Loading

```html
<!-- Native lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Load immediately (default) -->
<img src="hero.jpg" alt="Hero" loading="eager">

<!-- Hero images - load immediately -->
<img src="above-fold.jpg" alt="Above fold" loading="eager">

<!-- Below fold - lazy load -->
<img src="below-fold-1.jpg" alt="Content" loading="lazy">
<img src="below-fold-2.jpg" alt="Content" loading="lazy">
```

### iframe Lazy Loading

```html
<!-- Lazy load embedded content -->
<iframe src="video.html" loading="lazy" title="Video"></iframe>

<!-- Lazy load ads -->
<iframe src="ads.html" loading="lazy" title="Advertisement"></iframe>

<!-- Lazy load maps -->
<iframe 
  src="https://maps.google.com/embed?..."
  loading="lazy"
  title="Location map">
</iframe>
```

### Practical Example

```html
<article>
  <!-- Hero image - load immediately -->
  <img src="hero.jpg" alt="Article hero" loading="eager" width="1200" height="600">
  
  <p>Article content...</p>
  
  <!-- Content images - lazy load -->
  <img src="img1.jpg" alt="Content 1" loading="lazy" width="800" height="400">
  <img src="img2.jpg" alt="Content 2" loading="lazy" width="800" height="400">
  
  <!-- Embedded video - lazy load -->
  <iframe 
    src="https://youtube.com/embed/..."
    loading="lazy"
    width="560"
    height="315"
    title="Tutorial video">
  </iframe>
</article>
```

## Image Optimization

### Responsive Images

```html
<!-- srcset for different sizes -->
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="Responsive image"
  loading="lazy">
```

### Picture Element

```html
<!-- Different formats -->
<picture>
  <!-- WebP for modern browsers -->
  <source srcset="image.webp" type="image/webp">
  
  <!-- AVIF for newest browsers -->
  <source srcset="image.avif" type="image/avif">
  
  <!-- Fallback JPEG -->
  <img src="image.jpg" alt="Image" loading="lazy">
</picture>

<!-- Art direction - different crops -->
<picture>
  <!-- Mobile: portrait crop -->
  <source media="(max-width: 600px)" srcset="image-mobile.jpg">
  
  <!-- Tablet: square crop -->
  <source media="(max-width: 1000px)" srcset="image-tablet.jpg">
  
  <!-- Desktop: landscape crop -->
  <img src="image-desktop.jpg" alt="Artwork" loading="lazy">
</picture>
```

### Image Dimensions

Always specify dimensions to prevent layout shift:

```html
<!-- ✅ Good: Prevents layout shift -->
<img src="photo.jpg" alt="Photo" width="800" height="600" loading="lazy">

<!-- ❌ Bad: Causes layout shift -->
<img src="photo.jpg" alt="Photo" loading="lazy">

<!-- CSS aspect ratio -->
<style>
  .image-container {
    aspect-ratio: 16 / 9;
  }
</style>
<div class="image-container">
  <img src="image.jpg" alt="Image" loading="lazy">
</div>
```

## Critical CSS

### Inline Critical CSS

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Inline critical CSS for above-the-fold content -->
  <style>
    /* Critical styles only */
    body { margin: 0; font-family: sans-serif; }
    .header { background: #333; color: white; padding: 20px; }
    .hero { min-height: 400px; }
  </style>
  
  <!-- Preload full stylesheet -->
  <link rel="preload" href="styles.css" as="style">
  
  <!-- Load full stylesheet asynchronously -->
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
<body>
  <!-- Content -->
</body>
</html>
```

## Preloading Strategies

### Complete Performance Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Optimized Page</title>
  
  <!-- DNS prefetch for third-party domains -->
  <link rel="dns-prefetch" href="https://analytics.google.com">
  <link rel="dns-prefetch" href="https://cdn.example.com">
  
  <!-- Preconnect to critical third-party origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical resources -->
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="hero.jpg" as="image">
  
  <!-- Critical inline CSS -->
  <style>
    /* Inline critical above-fold styles */
  </style>
  
  <!-- Load full stylesheet -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- Defer non-critical scripts -->
  <script src="app.js" defer></script>
  
  <!-- Async independent scripts -->
  <script src="analytics.js" async></script>
  
  <!-- Prefetch next likely pages -->
  <link rel="prefetch" href="/products">
  <link rel="prefetch" href="/contact">
</head>
<body>
  <!-- Hero image - eager load -->
  <img src="hero.jpg" alt="Hero" loading="eager" width="1200" height="600">
  
  <!-- Below fold images - lazy load -->
  <img src="content.jpg" alt="Content" loading="lazy" width="800" height="400">
  
  <!-- Lazy load iframes -->
  <iframe src="map.html" loading="lazy" title="Map"></iframe>
</body>
</html>
```

## Font Loading

### Preload Fonts

```html
<head>
  <!-- Preload critical fonts -->
  <link rel="preload" 
        href="fonts/main.woff2" 
        as="font" 
        type="font/woff2" 
        crossorigin>
</head>
```

### Font Display

```html
<style>
  @font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2');
    /* Show fallback immediately, swap when loaded */
    font-display: swap;
    
    /* Other options:
       auto - browser default
       block - hide text briefly
       swap - show fallback immediately
       fallback - brief block, then swap
       optional - use only if cached
    */
  }
</style>
```

## Reducing HTML Size

### Minification

```html
<!-- ❌ Before minification -->
<div class="container">
    <h1>Welcome</h1>
    <p>This is a paragraph with lots of content.</p>
</div>

<!-- ✅ After minification -->
<div class="container"><h1>Welcome</h1><p>This is a paragraph with lots of content.</p></div>
```

### Remove Unnecessary Code

```html
<!-- ❌ Excessive whitespace and comments -->
<div>
    <!-- This is a comment -->
    <p>     Text with extra spaces     </p>
</div>

<!-- ✅ Cleaned up -->
<div><p>Text with extra spaces</p></div>
```

## Best Practices

### Performance Checklist

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ✅ Charset first -->
  <meta charset="UTF-8">
  
  <!-- ✅ Viewport for mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- ✅ Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  
  <!-- ✅ Preload critical resources -->
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="hero.jpg" as="image">
  
  <!-- ✅ Inline critical CSS -->
  <style>/* Critical styles */</style>
  
  <!-- ✅ Load stylesheet -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- ✅ Defer scripts -->
  <script src="app.js" defer></script>
</head>
<body>
  <!-- ✅ Specify image dimensions -->
  <img src="hero.jpg" alt="Hero" width="1200" height="600" loading="eager">
  
  <!-- ✅ Lazy load below-fold images -->
  <img src="content.jpg" alt="Content" width="800" height="400" loading="lazy">
  
  <!-- ✅ Lazy load iframes -->
  <iframe src="embed.html" loading="lazy" title="Embed"></iframe>
</body>
</html>
```

## Common Mistakes

```html
<!-- ❌ Not specifying image dimensions -->
<img src="photo.jpg" alt="Photo">

<!-- ✅ Specify dimensions -->
<img src="photo.jpg" alt="Photo" width="800" height="600">

<!-- ❌ Loading all scripts synchronously -->
<script src="heavy-library.js"></script>
<script src="app.js"></script>

<!-- ✅ Use defer or async -->
<script src="heavy-library.js" defer></script>
<script src="app.js" defer></script>

<!-- ❌ Not lazy loading below-fold images -->
<img src="image-at-bottom.jpg" alt="Content">

<!-- ✅ Lazy load below-fold content -->
<img src="image-at-bottom.jpg" alt="Content" loading="lazy">

<!-- ❌ Not preconnecting to external domains -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css">

<!-- ✅ Preconnect first -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css">
```

## Measuring Performance

### Performance APIs

```html
<script>
  // Measure page load time
  window.addEventListener('load', function() {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', pageLoadTime + 'ms');
  });
  
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({entryTypes: ['largest-contentful-paint']});
</script>
```

## Summary

- **Resource hints** optimize resource loading:
  - `preload` for critical resources
  - `prefetch` for next-page resources
  - `preconnect` for third-party domains
  - `dns-prefetch` for DNS resolution
- **Script strategies**:
  - Use `defer` for order-dependent scripts
  - Use `async` for independent scripts
  - Place scripts at end of body
- **Lazy loading**:
  - Use `loading="lazy"` for below-fold images/iframes
  - Use `loading="eager"` for critical above-fold content
- **Images**:
  - Always specify width and height
  - Use responsive images with `srcset`
  - Use modern formats (WebP, AVIF)
- **Critical CSS**:
  - Inline above-fold styles
  - Load full stylesheet asynchronously
- **Fonts**:
  - Preload critical fonts
  - Use `font-display: swap`
- **Minimize**:
  - Reduce HTML file size
  - Remove unnecessary code
- Measure performance with browser tools

Optimizing HTML improves page load speed and user experience significantly!
