---
title: HTML Images
description: Learn how to add and optimize images in HTML using the img tag, responsive images, image maps, figures, and accessibility best practices.
---


Images make web pages more engaging and informative. Learn how to properly add, optimize, and make images accessible.

## Basic Image Syntax

```html
<img src="image.jpg" alt="Description of image">
```

**Required attributes:**
- `src`: Path to the image file
- `alt`: Alternative text for accessibility

## Image Sources

### Relative Paths

```html
<!-- Same directory -->
<img src="logo.png" alt="Company logo">

<!-- Subdirectory -->
<img src="images/photo.jpg" alt="Photo">

<!-- Parent directory -->
<img src="../images/banner.jpg" alt="Banner">
```

### Absolute URLs

```html
<img src="https://example.com/images/photo.jpg" alt="Photo">
```

## Image Attributes

### Width and Height

```html
<!-- Pixels -->
<img src="photo.jpg" alt="Photo" width="400" height="300">

<!-- Percentage (better with CSS) -->
<img src="photo.jpg" alt="Photo" style="width:100%;height:auto;">
```

**Best practice:** Specify dimensions to prevent layout shift:

```html
<img src="photo.jpg" alt="Photo" width="800" height="600">
```

### Alt Text (Alternative Text)

**Critical for accessibility:**

```html
<!-- ✅ Good: Descriptive -->
<img src="dog.jpg" alt="Golden Retriever playing in the park">

<!-- ✅ Good: Logo -->
<img src="logo.png" alt="Company Name">

<!-- ✅ Good: Decorative (empty alt) -->
<img src="decorative-line.png" alt="">

<!-- ❌ Bad: Missing alt -->
<img src="photo.jpg">

<!-- ❌ Bad: Redundant -->
<img src="photo.jpg" alt="Image of a photo of a picture">

<!-- ❌ Bad: Filename -->
<img src="IMG_1234.jpg" alt="IMG_1234">
```

**Guidelines for alt text:**
- Describe the image content and function
- Keep it concise (< 125 characters)
- Don't start with "Image of" or "Picture of"
- Use empty alt (`alt=""`) for decorative images
- For complex images, use longer descriptions

### Title Attribute

Shows tooltip on hover:

```html
<img src="diagram.jpg" alt="System architecture" title="Click to enlarge">
```

### Loading Attribute

Lazy loading for better performance:

```html
<!-- Lazy load (below fold images) -->
<img src="photo.jpg" alt="Photo" loading="lazy">

<!-- Eager load (above fold images) -->
<img src="hero.jpg" alt="Hero image" loading="eager">
```

## Responsive Images

### Using `srcset` (Different Sizes)

```html
<img 
    src="small.jpg"
    srcset="small.jpg 400w,
            medium.jpg 800w,
            large.jpg 1200w"
    sizes="(max-width: 400px) 400px,
           (max-width: 800px) 800px,
           1200px"
    alt="Responsive image"
>
```

**Explanation:**
- `srcset`: List of image sources with their widths
- `sizes`: Media conditions and display sizes
- Browser chooses the best image automatically

### Using `srcset` (Different Resolutions)

```html
<img 
    src="photo.jpg"
    srcset="photo.jpg 1x,
            photo-2x.jpg 2x,
            photo-3x.jpg 3x"
    alt="High DPI image"
>
```

### Picture Element (Art Direction)

Different images for different screen sizes:

```html
<picture>
    <!-- Mobile -->
    <source media="(max-width: 600px)" srcset="mobile.jpg">
    
    <!-- Tablet -->
    <source media="(max-width: 1200px)" srcset="tablet.jpg">
    
    <!-- Desktop (fallback) -->
    <img src="desktop.jpg" alt="Responsive image">
</picture>
```

### WebP with Fallback

```html
<picture>
    <!-- Modern browsers -->
    <source srcset="image.webp" type="image/webp">
    
    <!-- Fallback for older browsers -->
    <img src="image.jpg" alt="Image">
</picture>
```

## Figure and Figcaption

Semantic grouping of images with captions:

```html
<figure>
    <img src="chart.jpg" alt="Sales data chart">
    <figcaption>Figure 1: Q4 2024 Sales Performance</figcaption>
</figure>
```

### Multiple Images in Figure

```html
<figure>
    <img src="photo1.jpg" alt="Photo 1">
    <img src="photo2.jpg" alt="Photo 2">
    <img src="photo3.jpg" alt="Photo 3">
    <figcaption>Gallery: Company Team Photos</figcaption>
</figure>
```

## Image Formats

### Common Formats

```html
<!-- JPEG - photos, complex colors -->
<img src="photo.jpg" alt="Photograph">

<!-- PNG - transparency, simple graphics -->
<img src="logo.png" alt="Logo">

<!-- GIF - simple animations -->
<img src="animation.gif" alt="Loading animation">

<!-- SVG - scalable vector graphics -->
<img src="icon.svg" alt="Icon">

<!-- WebP - modern, smaller files -->
<img src="photo.webp" alt="Modern image format">

<!-- AVIF - newest, best compression -->
<img src="photo.avif" alt="AVIF image">
```

### Format Comparison

| Format | Best For | Transparency | Animation |
|--------|----------|--------------|-----------|
| JPEG   | Photos   | No           | No        |
| PNG    | Graphics, logos | Yes   | No        |
| GIF    | Simple animations | Yes | Yes       |
| SVG    | Icons, logos | Yes      | Yes (CSS) |
| WebP   | Modern web | Yes         | Yes       |
| AVIF   | Best compression | Yes  | Yes       |

## Clickable Images (Image Links)

```html
<!-- Image as link -->
<a href="page.html">
    <img src="thumbnail.jpg" alt="Click to view full size">
</a>

<!-- Image link in new tab -->
<a href="full-size.jpg" target="_blank">
    <img src="thumbnail.jpg" alt="View full size image">
</a>
```

## Image Maps

Create clickable areas on an image:

```html
<img src="map.jpg" alt="Office locations" usemap="#locations">

<map name="locations">
    <area shape="rect" coords="0,0,100,100" href="newyork.html" alt="New York">
    <area shape="circle" coords="200,50,40" href="london.html" alt="London">
    <area shape="poly" coords="300,0,350,50,300,100" href="tokyo.html" alt="Tokyo">
</map>
```

**Shapes:**
- `rect`: Rectangle (x1,y1,x2,y2)
- `circle`: Circle (x,y,radius)
- `poly`: Polygon (x1,y1,x2,y2,x3,y3,...)

## Background Images (CSS)

While background images are typically set with CSS, here's an inline example:

```html
<div style="background-image: url('background.jpg'); 
            width: 100%; 
            height: 400px; 
            background-size: cover;
            background-position: center;">
    <h1>Content over background</h1>
</div>
```

## Image Optimization Best Practices

### File Size Optimization

```html
<!-- ✅ Optimized filename -->
<img src="product-laptop-pro-800w.jpg" alt="Laptop Pro">

<!-- ❌ Bad filename -->
<img src="IMG_20240115_142536_FINAL_v2_EDITED.jpg" alt="Laptop">
```

### Dimension Best Practices

```html
<!-- ✅ Always specify width/height -->
<img src="photo.jpg" alt="Photo" width="800" height="600">

<!-- ✅ Maintain aspect ratio -->
<img src="photo.jpg" alt="Photo" width="400" height="300">

<!-- ❌ Distorted (wrong aspect ratio) -->
<img src="photo.jpg" alt="Photo" width="400" height="400">
```

### Lazy Loading

```html
<!-- Above the fold - load immediately -->
<img src="hero.jpg" alt="Hero" loading="eager">

<!-- Below the fold - lazy load -->
<img src="gallery1.jpg" alt="Gallery 1" loading="lazy">
<img src="gallery2.jpg" alt="Gallery 2" loading="lazy">
<img src="gallery3.jpg" alt="Gallery 3" loading="lazy">
```

## Accessibility Best Practices

### Informative Images

```html
<img src="save-icon.png" alt="Save">
<img src="profile.jpg" alt="John Doe, CEO">
<img src="warning.png" alt="Warning: Low battery">
```

### Decorative Images

```html
<!-- Empty alt for decorative images -->
<img src="decorative-border.png" alt="">
<img src="spacer.gif" alt="">
```

### Complex Images

```html
<!-- Link to long description -->
<figure>
    <img src="complex-chart.jpg" alt="Sales data chart">
    <figcaption>
        Quarterly sales data showing 25% increase.
        <a href="chart-details.html">View detailed analysis</a>
    </figcaption>
</figure>

<!-- Or use aria-describedby -->
<img src="diagram.jpg" alt="System architecture" aria-describedby="diagram-desc">
<p id="diagram-desc">
    Detailed description of the system architecture...
</p>
```

### Images of Text

```html
<!-- ❌ Avoid images of text when possible -->
<img src="title-text.png" alt="Welcome to Our Site">

<!-- ✅ Use actual text with CSS styling -->
<h1>Welcome to Our Site</h1>
```

## Practical Examples

### Product Card

```html
<article class="product">
    <figure>
        <img 
            src="laptop-400w.jpg"
            srcset="laptop-400w.jpg 400w,
                    laptop-800w.jpg 800w"
            sizes="(max-width: 600px) 400px, 800px"
            alt="Ultra Laptop Pro - Silver"
            width="800"
            height="600"
            loading="lazy"
        >
        <figcaption>Ultra Laptop Pro</figcaption>
    </figure>
    
    <h2>Ultra Laptop Pro</h2>
    <p>$999</p>
</article>
```

### Image Gallery

```html
<section class="gallery">
    <h2>Photo Gallery</h2>
    
    <div class="gallery-grid">
        <figure>
            <a href="photo1-full.jpg" target="_blank">
                <img src="photo1-thumb.jpg" alt="Mountain landscape" loading="lazy">
            </a>
            <figcaption>Mountain Vista</figcaption>
        </figure>
        
        <figure>
            <a href="photo2-full.jpg" target="_blank">
                <img src="photo2-thumb.jpg" alt="Ocean sunset" loading="lazy">
            </a>
            <figcaption>Sunset Beach</figcaption>
        </figure>
        
        <figure>
            <a href="photo3-full.jpg" target="_blank">
                <img src="photo3-thumb.jpg" alt="Forest trail" loading="lazy">
            </a>
            <figcaption>Forest Path</figcaption>
        </figure>
    </div>
</section>
```

### Logo with Multiple Formats

```html
<picture>
    <!-- SVG for modern browsers -->
    <source srcset="logo.svg" type="image/svg+xml">
    
    <!-- WebP for supported browsers -->
    <source srcset="logo.webp" type="image/webp">
    
    <!-- PNG fallback -->
    <img src="logo.png" alt="Company Name" width="200" height="50">
</picture>
```

### Responsive Hero Image

```html
<header class="hero">
    <picture>
        <!-- Mobile -->
        <source 
            media="(max-width: 600px)"
            srcset="hero-mobile.jpg">
        
        <!-- Tablet -->
        <source 
            media="(max-width: 1200px)"
            srcset="hero-tablet.jpg">
        
        <!-- Desktop -->
        <img 
            src="hero-desktop.jpg"
            alt="Welcome to our website"
            width="1920"
            height="600"
            loading="eager"
        >
    </picture>
    
    <div class="hero-content">
        <h1>Welcome to Our Site</h1>
    </div>
</header>
```

## Common Mistakes

```html
<!-- ❌ Missing alt attribute -->
<img src="photo.jpg">

<!-- ❌ Using alt for SEO stuffing -->
<img src="product.jpg" alt="buy cheap laptop best price discount sale laptop computer">

<!-- ❌ Wrong file path -->
<img src="photo.jpg" alt="Photo">  <!-- File doesn't exist -->

<!-- ❌ Huge file size not optimized -->
<img src="10MB-photo.jpg" alt="Photo">

<!-- ❌ Forgetting width/height (layout shift) -->
<img src="photo.jpg" alt="Photo">

<!-- ✅ Correct approach -->
<img 
    src="optimized-photo.jpg"
    alt="Golden Retriever playing in park"
    width="800"
    height="600"
    loading="lazy"
>
```

## Summary

- Use `<img>` with `src` and `alt` attributes
- Always provide descriptive `alt` text
- Specify `width` and `height` to prevent layout shift
- Use `loading="lazy"` for below-fold images
- Use `srcset` and `<picture>` for responsive images
- Use `<figure>` and `<figcaption>` for semantic grouping
- Optimize image files for web (compress, correct format)
- Choose the right format (JPEG, PNG, SVG, WebP, AVIF)
- Make images accessible with proper alt text

Images are crucial for engaging web content - use them effectively and accessibly!
