---
title: HTML Canvas
description: Learn HTML5 Canvas for creating graphics, animations, and interactive content with JavaScript. Master drawing shapes, text, images, and more.
---

The HTML5 `<canvas>` element is used to draw graphics on the fly using JavaScript. It's a powerful tool for creating games, data visualizations, photo manipulation, and animations.

## Basic Canvas Setup

### Creating a Canvas

```html
<canvas id="myCanvas" width="800" height="600">
    Your browser does not support the canvas element.
</canvas>
```

**Important notes:**
- Always set `width` and `height` in HTML attributes (not CSS)
- CSS sizing can distort the canvas
- Fallback content appears if canvas isn't supported

### Getting the Context

```html
<canvas id="myCanvas" width="400" height="300"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Now you can draw!
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(10, 10, 100, 100);
</script>
```

## Drawing Rectangles

### Filled Rectangles

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// fillRect(x, y, width, height)
ctx.fillStyle = '#FF0000'; // Red
ctx.fillRect(50, 50, 150, 100);

ctx.fillStyle = 'rgba(0, 128, 255, 0.5)'; // Semi-transparent blue
ctx.fillRect(120, 80, 150, 100);
```

### Stroked Rectangles

```javascript
// strokeRect(x, y, width, height)
ctx.strokeStyle = '#00FF00';
ctx.lineWidth = 5;
ctx.strokeRect(50, 50, 150, 100);
```

### Clear Rectangle

```javascript
// clearRect(x, y, width, height)
ctx.clearRect(75, 75, 100, 50); // Erases rectangular area
```

## Drawing Paths

### Basic Line

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);    // Starting point
ctx.lineTo(200, 100);  // End point
ctx.stroke();          // Draw the line
```

### Multiple Lines

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.closePath();  // Connects last point to first
ctx.stroke();
```

### Filled Paths

```javascript
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(200, 150);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.fillStyle = '#FF6B6B';
ctx.fill();  // Fill the shape
```

## Drawing Circles and Arcs

### Complete Circle

```javascript
// arc(x, y, radius, startAngle, endAngle, counterclockwise)
ctx.beginPath();
ctx.arc(200, 150, 50, 0, 2 * Math.PI);
ctx.fillStyle = '#4ECDC4';
ctx.fill();
```

### Arc (Part of Circle)

```javascript
// Draw semi-circle
ctx.beginPath();
ctx.arc(200, 150, 50, 0, Math.PI, false);
ctx.strokeStyle = '#FF6B6B';
ctx.lineWidth = 3;
ctx.stroke();
```

### Pac-Man Example

```javascript
ctx.fillStyle = '#FFFF00';
ctx.beginPath();
ctx.arc(150, 150, 50, Math.PI * 0.25, Math.PI * 1.75);
ctx.lineTo(150, 150);
ctx.closePath();
ctx.fill();
```

## Bezier and Quadratic Curves

### Quadratic Curve

```javascript
ctx.beginPath();
ctx.moveTo(50, 100);
ctx.quadraticCurveTo(150, 50, 250, 100);
// quadraticCurveTo(controlX, controlY, endX, endY)
ctx.stroke();
```

### Bezier Curve

```javascript
ctx.beginPath();
ctx.moveTo(50, 100);
ctx.bezierCurveTo(100, 50, 200, 150, 250, 100);
// bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY)
ctx.stroke();
```

## Drawing Text

### Filled Text

```javascript
ctx.font = '30px Arial';
ctx.fillStyle = '#333';
ctx.fillText('Hello Canvas!', 50, 100);
// fillText(text, x, y, maxWidth)
```

### Stroked Text

```javascript
ctx.font = 'bold 40px Helvetica';
ctx.strokeStyle = '#FF6B6B';
ctx.lineWidth = 2;
ctx.strokeText('Outlined Text', 50, 150);
```

### Text Properties

```javascript
// Font
ctx.font = 'italic bold 24px Georgia';

// Alignment
ctx.textAlign = 'left';     // left, right, center, start, end
ctx.textBaseline = 'top';   // top, bottom, middle, alphabetic, hanging

// Measure text
const metrics = ctx.measureText('Hello');
console.log(metrics.width);  // Text width in pixels
```

## Working with Images

### Drawing an Image

```javascript
const img = new Image();
img.onload = function() {
    // drawImage(image, x, y)
    ctx.drawImage(img, 50, 50);
};
img.src = 'photo.jpg';
```

### Scaling Images

```javascript
img.onload = function() {
    // drawImage(image, x, y, width, height)
    ctx.drawImage(img, 50, 50, 200, 150);
};
```

### Cropping Images

```javascript
img.onload = function() {
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, 
        100, 50, 200, 150,  // Source rectangle
        50, 50, 200, 150    // Destination rectangle
    );
};
```

## Gradients

### Linear Gradient

```javascript
// createLinearGradient(x0, y0, x1, y1)
const gradient = ctx.createLinearGradient(0, 0, 400, 0);
gradient.addColorStop(0, '#FF6B6B');
gradient.addColorStop(0.5, '#4ECDC4');
gradient.addColorStop(1, '#45B7D1');

ctx.fillStyle = gradient;
ctx.fillRect(50, 50, 300, 200);
```

### Radial Gradient

```javascript
// createRadialGradient(x0, y0, r0, x1, y1, r1)
const radialGradient = ctx.createRadialGradient(200, 150, 20, 200, 150, 100);
radialGradient.addColorStop(0, '#FFFFFF');
radialGradient.addColorStop(1, '#FF6B6B');

ctx.fillStyle = radialGradient;
ctx.fillRect(0, 0, 400, 300);
```

## Patterns

```javascript
const img = new Image();
img.onload = function() {
    const pattern = ctx.createPattern(img, 'repeat');
    // repeat, repeat-x, repeat-y, no-repeat
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 400, 300);
};
img.src = 'pattern.png';
```

## Transformations

### Translate

```javascript
ctx.fillRect(0, 0, 100, 100);      // Original position
ctx.translate(150, 50);             // Move origin
ctx.fillRect(0, 0, 100, 100);      // Drawn at new origin
```

### Rotate

```javascript
ctx.save();                         // Save current state
ctx.translate(200, 150);            // Move to rotation point
ctx.rotate(Math.PI / 4);            // Rotate 45 degrees
ctx.fillRect(-50, -50, 100, 100);   // Draw centered
ctx.restore();                      // Restore state
```

### Scale

```javascript
ctx.scale(2, 2);                    // Scale 2x
ctx.fillRect(50, 50, 100, 100);     // Drawn at 2x size
```

### Transform Matrix

```javascript
// transform(a, b, c, d, e, f)
ctx.transform(1, 0.5, -0.5, 1, 100, 50);
ctx.fillRect(0, 0, 100, 100);
```

## Transparency and Composition

### Global Alpha

```javascript
ctx.globalAlpha = 0.5;              // 50% transparent
ctx.fillRect(50, 50, 100, 100);
ctx.globalAlpha = 1.0;              // Back to opaque
```

### Composite Operations

```javascript
ctx.fillStyle = '#FF6B6B';
ctx.fillRect(50, 50, 100, 100);

ctx.globalCompositeOperation = 'source-over'; // Default
// Other options: source-in, source-out, source-atop, destination-over, 
// destination-in, destination-out, destination-atop, lighter, copy, xor

ctx.fillStyle = '#4ECDC4';
ctx.fillRect(100, 75, 100, 100);
```

## Shadows

```javascript
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

ctx.fillStyle = '#4ECDC4';
ctx.fillRect(100, 100, 150, 100);
```

## Animation

### Basic Animation Loop

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = 0;

function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw
    ctx.fillStyle = '#4ECDC4';
    ctx.fillRect(x, 150, 50, 50);
    
    // Update
    x += 2;
    if (x > canvas.width) x = -50;
    
    // Loop
    requestAnimationFrame(animate);
}

animate();
```

### Bouncing Ball

```javascript
let x = 200, y = 150;
let dx = 2, dy = 2;
const radius = 20;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    
    // Bounce off walls
    if (x + dx > canvas.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - radius || y + dy < radius) {
        dy = -dy;
    }
    
    // Move ball
    x += dx;
    y += dy;
    
    requestAnimationFrame(animate);
}

animate();
```

## Mouse Interaction

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw circle at click position
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#4ECDC4';
    ctx.fill();
});

// Mouse move
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw while dragging
    if (e.buttons === 1) {  // Left mouse button pressed
        ctx.fillRect(x - 2, y - 2, 4, 4);
    }
});
```

## Pixel Manipulation

### Get Image Data

```javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // RGBA array

// Each pixel is 4 values: R, G, B, A
for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];
}
```

### Grayscale Filter

```javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;       // Red
    data[i + 1] = avg;   // Green
    data[i + 2] = avg;   // Blue
}

ctx.putImageData(imageData, 0, 0);
```

### Invert Colors

```javascript
for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];       // Red
    data[i + 1] = 255 - data[i + 1]; // Green
    data[i + 2] = 255 - data[i + 2]; // Blue
}

ctx.putImageData(imageData, 0, 0);
```

## Saving and Exporting

### Save as Image

```javascript
// Get data URL
const dataURL = canvas.toDataURL('image/png');

// Download image
const link = document.createElement('a');
link.download = 'canvas-image.png';
link.href = dataURL;
link.click();
```

### Different Formats

```javascript
// PNG (default, lossless)
const pngURL = canvas.toDataURL('image/png');

// JPEG (with quality)
const jpegURL = canvas.toDataURL('image/jpeg', 0.8); // 0.0 - 1.0

// WebP
const webpURL = canvas.toDataURL('image/webp', 0.9);
```

## Save and Restore State

```javascript
ctx.fillStyle = '#FF6B6B';
ctx.save();  // Save current state

ctx.fillStyle = '#4ECDC4';
ctx.fillRect(50, 50, 100, 100);

ctx.restore();  // Restore saved state
ctx.fillRect(200, 50, 100, 100);  // Uses '#FF6B6B'
```

## Best Practices

1. **Set canvas size in HTML**: Not CSS
2. **Clear before redrawing**: Use `clearRect()`
3. **Use requestAnimationFrame**: For smooth animations
4. **Save and restore state**: When using transformations
5. **Optimize drawing**: Only redraw what changed
6. **Handle high DPI displays**: Scale for retina screens
7. **Use offscreen canvas**: For complex scenes
8. **Batch draw calls**: Minimize state changes
9. **Cache complex shapes**: Draw once, reuse
10. **Consider WebGL**: For 3D or complex graphics

## High DPI Support

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

// Set actual size in memory
canvas.width = 800 * dpr;
canvas.height = 600 * dpr;

// Set display size
canvas.style.width = '800px';
canvas.style.height = '600px';

// Scale context
ctx.scale(dpr, dpr);
```

## Common Use Cases

- **Data visualization**: Charts, graphs
- **Games**: 2D games and sprites
- **Image editing**: Filters and effects
- **Animations**: Motion graphics
- **Drawing apps**: Paint and sketch tools
- **Generative art**: Procedural graphics
- **Physics simulations**: Particle systems

## Browser Support

Canvas is supported in all modern browsers:
- Chrome, Firefox, Safari, Edge: Full support
- IE9+: Partial support
- Always provide fallback content

## Summary

- Canvas provides powerful 2D drawing capabilities
- Use `getContext('2d')` to get drawing context
- Can draw shapes, text, images, and more
- Supports transformations, gradients, and patterns
- Great for animations using `requestAnimationFrame`
- Can manipulate pixels for effects
- Export canvas as image
- Set size in HTML attributes, not CSS

Start with simple shapes and gradually build complex graphics and animations!
