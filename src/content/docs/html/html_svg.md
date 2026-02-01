---
title: HTML SVG
description: Learn SVG (Scalable Vector Graphics) in HTML. Create scalable, resolution-independent graphics for web. Master shapes, paths, gradients, and animations.
---

SVG (Scalable Vector Graphics) is an XML-based markup language for creating vector graphics that scale perfectly at any size without losing quality.

## Why Use SVG?

**Advantages:**
- ✅ Scalable without quality loss
- ✅ Small file size for simple graphics
- ✅ Can be styled with CSS
- ✅ Can be animated
- ✅ Searchable and accessible
- ✅ Can be manipulated with JavaScript

**Best for:**
- Icons and logos
- Charts and graphs
- Illustrations
- Animations
- Responsive graphics

## Basic SVG Structure

### Inline SVG

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="50" fill="blue" />
</svg>
```

### SVG as Image

```html
<!-- External SVG file -->
<img src="logo.svg" alt="Company Logo" width="200">

<!-- In CSS -->
<style>
    .icon {
        background-image: url('icon.svg');
    }
</style>
```

### SVG in Object Tag

```html
<object data="graphic.svg" type="image/svg+xml" width="300" height="300">
    Fallback content if SVG is not supported
</object>
```

## SVG Viewport and ViewBox

### Viewport

```html
<!-- Sets the display size -->
<svg width="300" height="200">
    <!-- Content -->
</svg>
```

### ViewBox

```html
<!-- viewBox="minX minY width height" -->
<svg width="300" height="200" viewBox="0 0 100 100">
    <!-- Content scales to fit viewport -->
    <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
```

**ViewBox benefits:**
- Makes SVG responsive
- Defines coordinate system
- Enables scaling and cropping

## Basic Shapes

### Rectangle

```html
<svg width="300" height="200">
    <!-- rect: x, y, width, height -->
    <rect x="50" y="50" width="100" height="80" fill="skyblue" />
    
    <!-- Rounded corners -->
    <rect x="50" y="50" width="100" height="80" rx="10" ry="10" fill="coral" />
</svg>
```

### Circle

```html
<svg width="200" height="200">
    <!-- circle: cx, cy, r -->
    <circle cx="100" cy="100" r="50" fill="orange" />
    
    <!-- With stroke -->
    <circle cx="100" cy="100" r="50" fill="none" stroke="purple" stroke-width="4" />
</svg>
```

### Ellipse

```html
<svg width="300" height="200">
    <!-- ellipse: cx, cy, rx, ry -->
    <ellipse cx="150" cy="100" rx="100" ry="50" fill="lightgreen" />
</svg>
```

### Line

```html
<svg width="300" height="200">
    <!-- line: x1, y1, x2, y2 -->
    <line x1="50" y1="50" x2="250" y2="150" stroke="red" stroke-width="3" />
</svg>
```

### Polyline

```html
<svg width="300" height="200">
    <!-- polyline: points -->
    <polyline points="50,150 100,50 150,150 200,50 250,150" 
              fill="none" stroke="blue" stroke-width="2" />
</svg>
```

### Polygon

```html
<svg width="300" height="200">
    <!-- Triangle -->
    <polygon points="150,50 100,150 200,150" fill="coral" />
    
    <!-- Pentagon -->
    <polygon points="150,50 220,100 190,170 110,170 80,100" 
             fill="lightblue" stroke="navy" stroke-width="2" />
</svg>
```

## Paths

The `<path>` element is the most powerful SVG shape:

### Basic Path Commands

```html
<svg width="300" height="200">
    <path d="M 50 50 L 200 50 L 200 150 Z" 
          fill="lightcoral" stroke="black" stroke-width="2" />
</svg>
```

**Path commands:**
- `M x y` - Move to
- `L x y` - Line to
- `H x` - Horizontal line
- `V y` - Vertical line
- `Z` - Close path
- `C` - Cubic Bezier curve
- `Q` - Quadratic Bezier curve
- `A` - Arc

### Curves

```html
<svg width="300" height="200">
    <!-- Quadratic Bezier: Q controlX controlY endX endY -->
    <path d="M 50 150 Q 150 50 250 150" 
          fill="none" stroke="blue" stroke-width="2" />
    
    <!-- Cubic Bezier: C cp1X cp1Y cp2X cp2Y endX endY -->
    <path d="M 50 150 C 100 50 200 50 250 150" 
          fill="none" stroke="red" stroke-width="2" />
</svg>
```

### Arc

```html
<svg width="300" height="200">
    <!-- A rx ry rotation large-arc sweep x y -->
    <path d="M 50 100 A 50 50 0 0 1 150 100" 
          fill="none" stroke="purple" stroke-width="3" />
</svg>
```

## Text

### Basic Text

```html
<svg width="300" height="200">
    <text x="50" y="100" font-family="Arial" font-size="24" fill="navy">
        Hello SVG!
    </text>
</svg>
```

### Styled Text

```html
<svg width="300" height="200">
    <text x="50" y="100" 
          font-family="Arial" 
          font-size="36" 
          font-weight="bold"
          fill="url(#gradient)"
          stroke="black"
          stroke-width="1">
        Styled Text
    </text>
</svg>
```

### Text on Path

```html
<svg width="400" height="200">
    <defs>
        <path id="textPath" d="M 50 150 Q 200 50 350 150" />
    </defs>
    
    <path d="M 50 150 Q 200 50 350 150" 
          fill="none" stroke="lightgray" />
    
    <text font-size="20" fill="navy">
        <textPath href="#textPath">
            Text follows the curve!
        </textPath>
    </text>
</svg>
```

## Gradients

### Linear Gradient

```html
<svg width="300" height="200">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <rect x="50" y="50" width="200" height="100" fill="url(#grad1)" />
</svg>
```

### Radial Gradient

```html
<svg width="300" height="200">
    <defs>
        <radialGradient id="grad2">
            <stop offset="0%" style="stop-color:#fff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
        </radialGradient>
    </defs>
    
    <circle cx="150" cy="100" r="80" fill="url(#grad2)" />
</svg>
```

## Patterns

```html
<svg width="400" height="300">
    <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="#4ECDC4" />
        </pattern>
    </defs>
    
    <rect width="400" height="300" fill="url(#dots)" />
</svg>
```

## Transformations

### Transform Attribute

```html
<svg width="300" height="200">
    <!-- Translate -->
    <rect x="0" y="0" width="60" height="60" fill="blue" transform="translate(50, 50)" />
    
    <!-- Rotate: rotate(angle, centerX, centerY) -->
    <rect x="0" y="0" width="60" height="60" fill="red" transform="rotate(45, 100, 100)" />
    
    <!-- Scale -->
    <rect x="150" y="50" width="30" height="30" fill="green" transform="scale(2)" />
    
    <!-- Combined -->
    <rect x="0" y="0" width="50" height="50" fill="purple" 
          transform="translate(200, 100) rotate(30) scale(1.5)" />
</svg>
```

## Groups and Reusability

### Grouping with \`<g>\`

```html
<svg width="300" height="200">
    <g fill="blue" stroke="black" stroke-width="2">
        <circle cx="50" cy="100" r="30" />
        <circle cx="120" cy="100" r="30" />
        <circle cx="190" cy="100" r="30" />
    </g>
</svg>
```

### Reusing with \`<use>\`

```html
<svg width="300" height="200">
    <defs>
        <circle id="myCircle" r="20" fill="coral" />
    </defs>
    
    <use href="#myCircle" x="50" y="100" />
    <use href="#myCircle" x="120" y="100" />
    <use href="#myCircle" x="190" y="100" />
</svg>
```

### Symbol

```html
<svg width="400" height="200">
    <defs>
        <symbol id="icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </symbol>
    </defs>
    
    <use href="#icon" width="48" height="48" x="50" y="50" fill="blue" />
    <use href="#icon" width="64" height="64" x="150" y="50" fill="red" />
</svg>
```

## Filters and Effects

### Blur

```html
<svg width="300" height="200">
    <defs>
        <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
    </defs>
    
    <circle cx="150" cy="100" r="50" fill="blue" filter="url(#blur)" />
</svg>
```

### Drop Shadow

```html
<svg width="300" height="200">
    <defs>
        <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="4" dy="4" result="offsetblur"/>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    
    <rect x="50" y="50" width="100" height="80" fill="coral" filter="url(#shadow)" />
</svg>
```

## Clipping and Masking

### Clipping Path

```html
<svg width="300" height="200">
    <defs>
        <clipPath id="clip">
            <circle cx="150" cy="100" r="60" />
        </clipPath>
    </defs>
    
    <rect x="50" y="50" width="200" height="100" fill="coral" clip-path="url(#clip)" />
</svg>
```

## Animations

### CSS Animations

```html
<svg width="200" height="200">
    <style>
        .rotating {
            animation: rotate 3s linear infinite;
            transform-origin: center;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
    
    <rect x="75" y="75" width="50" height="50" fill="blue" class="rotating" />
</svg>
```

### SMIL Animations

```html
<svg width="300" height="200">
    <circle cx="50" cy="100" r="20" fill="blue">
        <animate attributeName="cx" from="50" to="250" dur="3s" repeatCount="indefinite" />
    </circle>
</svg>
```

### Animate Transform

```html
<svg width="200" height="200">
    <rect x="75" y="75" width="50" height="50" fill="coral">
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="3s"
            repeatCount="indefinite" />
    </rect>
</svg>
```

## Responsive SVG

### Preserving Aspect Ratio

```html
<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
```

**preserveAspectRatio values:**
- `none` - Stretch to fill
- `xMinYMin` - Align to top-left
- `xMidYMid` - Center (default)
- `xMaxYMax` - Align to bottom-right
- Add `meet` (fit inside) or `slice` (fill and crop)

### Full Width SVG

```html
<style>
    .responsive-svg {
        width: 100%;
        height: auto;
    }
</style>

<svg class="responsive-svg" viewBox="0 0 500 300">
    <rect width="500" height="300" fill="lightblue" />
</svg>
```

## JavaScript Manipulation

```html
<svg id="mySvg" width="300" height="200">
    <circle id="myCircle" cx="150" cy="100" r="50" fill="blue" />
</svg>

<script>
    const circle = document.getElementById('myCircle');
    
    // Change attributes
    circle.setAttribute('fill', 'red');
    circle.setAttribute('r', '60');
    
    // Get attributes
    const radius = circle.getAttribute('r');
    
    // Add event listener
    circle.addEventListener('click', function() {
        this.setAttribute('fill', 'green');
    });
    
    // Create new element
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '50');
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '80');
    rect.setAttribute('fill', 'purple');
    document.getElementById('mySvg').appendChild(rect);
</script>
```

## Icon System Example

```html
<svg style="display: none;">
    <symbol id="icon-heart" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </symbol>
    
    <symbol id="icon-star" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </symbol>
</svg>

<!-- Use icons -->
<svg width="48" height="48"><use href="#icon-heart" fill="red"/></svg>
<svg width="48" height="48"><use href="#icon-star" fill="gold"/></svg>
```

## Accessibility

```html
<svg role="img" aria-labelledby="title desc">
    <title id="title">Company Logo</title>
    <desc id="desc">A blue circle with company name</desc>
    
    <circle cx="50" cy="50" r="40" fill="blue" />
    <text x="50" y="55" text-anchor="middle" fill="white">ACME</text>
</svg>
```

## Best Practices

1. **Use viewBox** for responsive SVGs
2. **Optimize SVG files** with tools like SVGO
3. **Inline critical SVGs** for better performance
4. **Use symbols** for icon systems
5. **Add accessibility** with title and desc
6. **Minimize path complexity** for better performance
7. **Use CSS** for styling when possible
8. **Group related elements** with `<g>`
9. **Provide fallbacks** for older browsers
10. **Test on different devices** and browsers

## Tools for Creating SVG

- **Adobe Illustrator**: Professional vector editor
- **Figma**: Collaborative design tool
- **Inkscape**: Free, open-source editor
- **Sketch**: MacOS design tool
- **SVG-Edit**: Browser-based editor

## Browser Support

SVG is supported in all modern browsers:
- Chrome, Firefox, Safari, Edge: Full support
- IE9+: Partial support
- Mobile browsers: Excellent support

## Summary

- SVG creates scalable vector graphics
- XML-based, can be inline or external
- Perfect for icons, logos, and illustrations
- Can be styled with CSS and animated
- Responsive with viewBox
- Accessible and SEO-friendly
- Manipulatable with JavaScript
- Small file size for simple graphics

Master SVG to create beautiful, scalable graphics for modern web applications!
