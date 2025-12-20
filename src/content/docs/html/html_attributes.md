---
title: HTML Attributes
description: Learn about HTML attributes - how to add extra information to elements, global attributes, event attributes, and data attributes for custom functionality.
---


Attributes provide additional information about HTML elements. They modify the behavior or appearance of elements and are always specified in the opening tag.

## Attribute Syntax

```html
<element attribute="value">Content</element>
```

**Rules:**
- Always in the opening tag
- Name-value pairs: `name="value"`
- Values should be quoted (double or single)
- Multiple attributes separated by spaces

```html
<img src="photo.jpg" alt="Description" width="300" height="200">
```

## Global Attributes

Global attributes can be used on any HTML element.

### The `id` Attribute

Specifies a **unique identifier** for an element:

```html
<div id="header">Header content</div>
<p id="intro">Introduction paragraph</p>
```

**Rules:**
- Must be unique on the page
- Cannot contain spaces
- Case-sensitive
- Used for:  - CSS styling: `#header { }`
  - JavaScript: `document.getElementById('header')`
  - Anchor links: `<a href="#header">Jump to header</a>`

```html
<!-- ✅ Good IDs -->
<div id="main-content"></div>
<section id="about_us"></section>
<article id="post123"></article>

<!-- ❌ Bad IDs -->
<div id="main content"></div>  <!-- No spaces -->
<div id="123post"></div>        <!-- Don't start with number -->
```

### The `class` Attribute

Specifies one or more class names for styling or JavaScript:

```html
<p class="highlight">Highlighted text</p>
<div class="container centered">Content</div>
```

**Multiple classes:**
```html
<p class="text-large bold blue">Text with three classes</p>
```

**Difference between ID and Class:**
```html
<!-- ID - unique, use once -->
<header id="main-header">Header</header>

<!-- Class - reusable, use many times -->
<p class="highlight">Paragraph 1</p>
<p class="highlight">Paragraph 2</p>
<p class="highlight">Paragraph 3</p>
```

### The `style` Attribute

Adds inline CSS styling:

```html
<p style="color: blue; font-size: 18px;">Blue text</p>
<div style="background-color: yellow; padding: 20px;">Yellow box</div>
```

**Note:** Inline styles have highest priority but are **not recommended** for maintenance. Use external CSS instead.

### The `title` Attribute

Provides additional information (tooltip on hover):

```html
<p title="This is a tooltip">Hover over me</p>
<abbr title="HyperText Markup Language">HTML</abbr>
<img src="icon.jpg" alt="Icon" title="Click to enlarge">
```

### The `hidden` Attribute

Hides an element:

```html
<div hidden>This content is hidden</div>
<p hidden>Secret message</p>
```

**Better than `style="display: none"`** for semantic hiding.

### The `lang` Attribute

Specifies the language of content:

```html
<html lang="en">              <!-- Page in English -->
<p lang="es">Hola mundo</p>   <!-- Paragraph in Spanish -->
<p lang="fr">Bonjour</p>      <!-- Paragraph in French -->
```

### The `dir` Attribute

Specifies text direction:

```html
<p dir="ltr">Left to right (default)</p>
<p dir="rtl">Right to left (Arabic, Hebrew)</p>
<p dir="auto">Auto-detect direction</p>
```

### The `contenteditable` Attribute

Makes content editable:

```html
<div contenteditable="true">You can edit this text</div>
<p contenteditable="false">You cannot edit this</p>
```

### The `tabindex` Attribute

Controls tab order for keyboard navigation:

```html
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
<button tabindex="3">Third</button>
<button tabindex="-1">Not in tab order</button>
<button tabindex="0">Natural tab order</button>
```

### The `data-*` Attributes

Custom data attributes for storing extra information:

```html
<div data-user-id="12345" data-role="admin" data-status="active">
    User information
</div>

<button data-action="delete" data-item-id="42">Delete</button>

<article 
    data-author="John Doe" 
    data-published="2024-01-15" 
    data-category="technology">
    Article content
</article>
```

**Access in JavaScript:**
```html
<button id="myBtn" data-product-id="123" data-price="29.99">
    Buy Now
</button>

<script>
    const btn = document.getElementById('myBtn');
    console.log(btn.dataset.productId);  // "123"
    console.log(btn.dataset.price);      // "29.99"
</script>
```

### The `draggable` Attribute

Makes element draggable:

```html
<img src="photo.jpg" draggable="true" alt="Draggable image">
<div draggable="true">Drag me</div>
```

### The `spellcheck` Attribute

Enables/disables spell checking:

```html
<textarea spellcheck="true">Text with spell check</textarea>
<input type= "text" spellcheck="false">
```

### The `translate` Attribute

Specifies whether content should be translated:

```html
<p translate="no">Do not translate this</p>
<p translate="yes">Translate this</p>
```

## Element-Specific Attributes

Different elements have their own specific attributes.

### Link Attributes (`<a>`)

```html
<!-- Basic link -->
<a href="https://example.com">Link text</a>

<!-- Open in new tab -->
<a href="page.html" target="_blank">Opens new tab</a>

<!-- Relationship -->
<a href="page.html" rel="nofollow">No follow link</a>

<!-- Download file -->
<a href="file.pdf" download>Download PDF</a>
<a href="image.jpg" download="my-image.jpg">Download with custom name</a>

<!-- Email and phone -->
<a href="mailto:email@example.com">Send email</a>
<a href="tel:+1234567890">Call us</a>
```

**Target values:**
```html
<a href="#" target="_blank">New window/tab</a>
<a href="#" target="_self">Same frame (default)</a>
<a href="#" target="_parent">Parent frame</a>
<a href="#" target="_top">Full window</a>
```

### Image Attributes (`<img>`)

```html
<img 
    src="photo.jpg"              <!-- Source (required) -->
    alt="Description"            <!-- Alternative text (required) -->
    width="400"                  <!-- Width in pixels -->
    height="300"                 <!-- Height in pixels -->
    loading="lazy"               <!-- Lazy loading -->
    title="Tooltip text"
>
```

**Responsive images:**
```html
<img 
    src="small.jpg"
    srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
    alt="Responsive image"
>
```

### Form Element Attributes

```html
<!-- Input -->
<input 
    type="text"
    name="username"
    id="username"
    value="default value"
    placeholder="Enter username"
    required
    disabled
    readonly
    maxlength="50"
    minlength="3"
    pattern="[A-Za-z]{3,}"
    autocomplete="on"
>

<!-- Select -->
<select name="country" id="country" required multiple size="5">
    <option value="us" selected>United States</option>
    <option value="uk">United Kingdom</option>
</select>

<!-- Textarea -->
<textarea 
    name="message"
    rows="5"
    cols="40"
    placeholder="Enter message"
    maxlength="500"
    required
></textarea>

<!-- Button -->
<button type="submit" disabled>Submit</button>
<button type="reset">Reset</button>
<button type="button">Custom</button>
```

### Form Attributes (`<form>`)

```html
<form 
    action="/submit"              <!-- Where to send data -->
    method="POST"                 <!-- GET or POST -->
    enctype="multipart/form-data" <!-- For file uploads -->
    target="_blank"               <!-- Where to display response -->
    novalidate                    <!-- Disable HTML5 validation -->
    autocomplete="off"            <!-- Disable autocomplete -->
>
    <!-- Form fields -->
</form>
```

###  Table Attributes

```html
<table border="1">
    <tr>
        <th colspan="2">Spans 2 columns</th>
    </tr>
    <tr>
        <td rowspan="2">Spans 2 rows</td>
        <td>Cell</td>
    </tr>
    <tr>
        <td>Cell</td>
    </tr>
</table>
```

### Video/Audio Attributes

```html
<video 
    src="video.mp4"
    width="640"
    height="360"
    controls                    <!-- Show controls -->
    autoplay                    <!-- Auto play -->
    loop                        <!-- Loop playback -->
    muted                       <!-- Muted by default -->
    poster="thumbnail.jpg"      <!-- Thumbnail image -->
    preload="auto"             <!-- auto, metadata, none -->
>
    Your browser doesn't support video.
</video>

<audio 
    src="audio.mp3"
    controls
    autoplay
    loop
    preload="metadata"
>
    Your browser doesn't support audio.
</audio>
```

### iframe Attributes

```html
<iframe 
    src="https://example.com"
    width="800"
    height="600"
    title="Embedded page"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
    allow="camera; microphone"
>
</iframe>
```

## Boolean Attributes

Some attributes don't need values (their presence means true):

```html
<!-- These are equivalent -->
<input type="checkbox" checked>
<input type="checkbox" checked="checked">
<input type="checkbox" checked="">

<!-- Other boolean attributes -->
<input disabled>
<input readonly>
<input required>
<input autofocus>
<input multiple>
<video autoplay>
<video controls>
<video loop>
<video muted>
<script async>
<script defer>
<details open>
```

## Event Attributes

Attributes that trigger JavaScript when events occur:

```html
<!-- Click events -->
<button onclick="alert('Clicked!')">Click me</button>

<!-- Mouse events -->
<div 
    onmouseover="console.log('Mouse over')"
    onmouseout="console.log('Mouse out')"
    onmousemove="console.log('Mouse moving')"
>
    Hover over me
</div>

<!-- Keyboard events -->
<input 
    type="text"
    onkeydown="console.log('Key down')"
    onkeyup="console.log('Key up')"
    onkeypress="console.log('Key pressed')"
>

<!-- Form events -->
<form onsubmit="return validateForm()">
    <input type="text" onchange="console.log('Changed')">
    <input type="text" oninput="console.log('Input')">
    <input type="text" onfocus="console.log('Focused')">
    <input type="text" onblur="console.log('Blurred')">
    <button type="submit">Submit</button>
</form>

<!-- Window events -->
<body 
    onload="console.log('Page loaded')"
    onresize="console.log('Window resized')"
    onscroll="console.log('Page scrolled')"
>
```

**Note:** Use JavaScript event listeners instead of inline event attributes for better practice.

## ARIA Attributes (Accessibility)

Attributes for improving accessibility:

```html
<!-- Landmark roles -->
<nav role="navigation" aria-label="Main navigation">
    <a href="/">Home</a>
</nav>

<!-- States and properties -->
<button aria-pressed="false">Toggle</button>
<div aria-hidden="true">Hidden from screen readers</div>
<input type="text" aria-required="true" aria-label="Username">

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
    Status updates appear here
</div>

<!-- Descriptions -->
<button aria-describedby="help-text">Save</button>
<div id="help-text">Click to save your changes</div>
```

## Best Practices

1. **Always quote attribute values**: Use `"value"` not just `value`
2. **Use lowercase**: `<div class="container">` not `<DIV CLASS="container">`
3. **Required alt text**: Always include `alt` for images
4. **Meaningful IDs**: Use descriptive, unique IDs
5. **Reusable classes**: Use classes for styling multiple elements
6. **Avoid inline styles**: Use external CSS instead
7. **Data attributes**: Use for custom data, not styling
8. **Boolean attributes**: Presence = true, absence = false
9. **Accessibility**: Include ARIA attributes when needed
10. **Validate**: Check HTML for proper attribute usage

## Common Mistakes

```html
<!-- ❌ Unquoted attributes -->
<div class=container></div>

<!-- ✅ Quoted attributes -->
<div class="container"></div>

<!-- ❌ Duplicate IDs -->
<div id="main"></div>
<div id="main"></div>  <!-- ID must be unique! -->

<!-- ❌ Missing alt attribute -->
<img src="photo.jpg">

<!-- ✅ Include alt -->
<img src="photo.jpg" alt="Description">

<!-- ❌ Wrong boolean attribute -->
<input disabled="false">  <!-- Still disabled! -->

<!-- ✅ Correct boolean usage -->
<input disabled>     <!-- Disabled -->
<input>              <!-- Not disabled -->

<!-- ❌ Spaces in ID -->
<div id="my header">

<!-- ✅ Use hyphen or underscore -->
<div id="my-header">
```

## Practical Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Card</title>
</head>
<body>
    <article 
        class="product-card featured"
        id="product-123"
        data-product-id="123"
        data-category="electronics"
        data-price="499.99"
        itemscope
        itemtype="https://schema.org/Product"
    >
        <img 
            src="laptop.jpg"
            alt="Silver laptop computer"
            width="400"
            height="300"
            loading="lazy"
            title="Click to view larger image"
        >
        
        <h2 itemprop="name">Ultra Laptop Pro</h2>
        
        <p class="description" itemprop="description">
            High-performance laptop for professionals
        </p>
        
        <span class="price" itemprop="price" content="499.99">
            $499.99
        </span>
        
        <form action="/cart/add" method="POST">
            <input 
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                max="10"
                value="1"
                required
                aria-label="Quantity"
            >
            
            <button 
                type="submit"
                class="btn-primary"
                onclick="return confirm('Add to cart?')"
                aria-label="Add to cart"
            >
                Add to Cart
            </button>
        </form>
    </article>
</body>
</html>
```

## Summary

- Attributes provide additional information about elements
- Global attributes work on any element (id, class, style, title, etc.)
- Element-specific attributes depend on the element type
- Boolean attributes don't need values
- Data attributes store custom information
- ARIA attributes improve accessibility
- Always quote attribute values and use lowercase

Understanding attributes is crucial for creating functional, accessible, and maintainable HTML!
