---
title: HTML Buttons
description: Learn how to create and style HTML buttons. Master button types, attributes, events, and best practices for interactive web elements.
---

Buttons are interactive elements that users can click to perform actions. HTML provides the `<button>` element and button-type inputs for creating clickable buttons.

## The Button Element

The `<button>` element creates a clickable button:

```html
<button>Click Me</button>
```

### Button vs Input Button

```html
<!-- Button element (preferred) -->
<button type="button">Click Me</button>

<!-- Input button -->
<input type="button" value="Click Me">
```

**Use `<button>` because:**
- Can contain HTML content (images, icons, text)
- More flexible styling
- Better accessibility
- Easier to work with JavaScript

## Button Types

The `type` attribute controls button behavior:

### 1. Submit Button (Default)

Submits a form:

```html
<form action="/submit" method="POST">
    <input type="text" name="username">
    <!-- Default type is "submit" -->
    <button>Submit Form</button>
    <button type="submit">Submit Form</button>
</form>
```

### 2. Reset Button

Resets form fields to default values:

```html
<form>
    <input type="text" name="username" value="">
    <input type="email" name="email" value="">
    
    <button type="reset">Clear Form</button>
</form>
```

### 3. Button Type

For JavaScript interactions (doesn't submit):

```html
<button type="button" onclick="alert('Hello!')">Click Me</button>
```

**Best practice**: Always specify `type="button"` for non-submit buttons to prevent accidental form submission.

## Button Attributes

### Disabled

Disables the button:

```html
<!-- Disabled button -->
<button disabled>Can't Click</button>

<!-- Enable/disable with JavaScript -->
<button id="myBtn">Click Me</button>
<script>
    document.getElementById('myBtn').disabled = true;
</script>
```

### Name and Value

Used for form submission:

```html
<form action="/vote" method="POST">
    <button type="submit" name="vote" value="yes">Vote Yes</button>
    <button type="submit" name="vote" value="no">Vote No</button>
</form>
```

### Autofocus

Automatically focuses button on page load:

```html
<button autofocus>Primary Action</button>
```

### Form Attributes

Override form settings:

```html
<form action="/default" method="POST" id="myForm">
    <input type="text" name="data">
    
    <!-- Normal submit -->
    <button type="submit">Submit to /default</button>
    
    <!-- Override action -->
    <button type="submit" formaction="/alternative">Submit to /alternative</button>
    
    <!-- Override method -->
    <button type="submit" formmethod="GET">Submit as GET</button>
    
    <!-- No validation -->
    <button type="submit" formnovalidate>Submit without validation</button>
</form>
```

## Button Content

Buttons can contain HTML elements:

### Text Buttons

```html
<button>Simple Text</button>
<button><strong>Bold</strong> and <em>Italic</em></button>
```

### Buttons with Icons

```html
<!-- Using Unicode/Emoji -->
<button>⭐ Star</button>
<button>🔍 Search</button>
<button>➡️ Next</button>

<!-- Using SVG -->
<button>
    <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
    </svg>
    Favorite
</button>

<!-- Using Font Awesome -->
<button>
    <i class="fa fa-heart"></i> Like
</button>
```

### Image Buttons

```html
<button type="button">
    <img src="icon.png" alt="Settings" width="20" height="20">
    Settings
</button>
```

## Button with JavaScript

### Click Events

```html
<!-- Inline event handler -->
<button onclick="handleClick()">Click Me</button>

<script>
    function handleClick() {
        alert('Button clicked!');
    }
</script>
```

```html
<!-- Event listener (preferred) -->
<button id="myButton">Click Me</button>

<script>
    const button = document.getElementById('myButton');
    
    button.addEventListener('click', function() {
        console.log('Button clicked!');
    });
</script>
```

### Prevent Default Behavior

```html
<form>
    <button type="submit" id="submitBtn">Submit</button>
</form>

<script>
    document.getElementById('submitBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        console.log('Custom validation...');
    });
</script>
```

### Dynamic Button States

```html
<button id="toggleBtn">Start</button>

<script>
    const btn = document.getElementById('toggleBtn');
    let isRunning = false;
    
    btn.addEventListener('click', function() {
        isRunning = !isRunning;
        this.textContent = isRunning ? 'Stop' : 'Start';
        this.disabled = false;
    });
</script>
```

## Styling Buttons

### Basic Styling

```html
<style>
    .custom-button {
        background-color: #4CAF50;
        color: white;
        padding: 12px 24px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .custom-button:hover {
        background-color: #45a049;
    }
    
    .custom-button:active {
        background-color: #3d8b40;
        transform: translateY(1px);
    }
    
    .custom-button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.6;
    }
</style>

<button class="custom-button">Styled Button</button>
<button class="custom-button" disabled>Disabled Button</button>
```

### Button Variants

```html
<style>
    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
    }
    
    .btn-primary {
        background-color: #007bff;
        color: white;
    }
    
    .btn-secondary {
        background-color: #6c757d;
        color: white;
    }
    
    .btn-success {
        background-color: #28a745;
        color: white;
    }
    
    .btn-danger {
        background-color: #dc3545;
        color: white;
    }
    
    .btn-outline {
        background-color: transparent;
        border: 2px solid #007bff;
        color: #007bff;
    }
    
    .btn-outline:hover {
        background-color: #007bff;
        color: white;
    }
</style>

<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-outline">Outline</button>
```

### Button Sizes

```html
<style>
    .btn-sm {
        padding: 6px 12px;
        font-size: 12px;
    }
    
    .btn-md {
        padding: 10px 20px;
        font-size: 14px;
    }
    
    .btn-lg {
        padding: 14px 28px;
        font-size: 18px;
    }
    
    .btn-block {
        display: block;
        width: 100%;
    }
</style>

<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-block">Full Width</button>
```

## Button Groups

```html
<style>
    .btn-group {
        display: inline-flex;
    }
    
    .btn-group button {
        padding: 10px 20px;
        border: 1px solid #ddd;
        background-color: white;
        cursor: pointer;
    }
    
    .btn-group button:not(:last-child) {
        border-right: none;
    }
    
    .btn-group button:first-child {
        border-radius: 4px 0 0 4px;
    }
    
    .btn-group button:last-child {
        border-radius: 0 4px 4px 0;
    }
    
    .btn-group button:hover {
        background-color: #f0f0f0;
    }
    
    .btn-group button.active {
        background-color: #007bff;
        color: white;
    }
</style>

<div class="btn-group">
    <button>Left</button>
    <button class="active">Center</button>
    <button>Right</button>
</div>
```

## Loading Buttons

### Spinner Button

```html
<style>
    .btn-loading {
        position: relative;
        pointer-events: none;
        color: transparent;
    }
    
    .btn-loading::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid white;
        border-top-color: transparent;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        animation: spinner 0.6s linear infinite;
    }
    
    @keyframes spinner {
        to { transform: rotate(360deg); }
    }
</style>

<button id="loadingBtn" class="btn btn-primary">Submit</button>

<script>
    document.getElementById('loadingBtn').addEventListener('click', function() {
        this.classList.add('btn-loading');
        
        // Simulate async operation
        setTimeout(() => {
            this.classList.remove('btn-loading');
        }, 2000);
    });
</script>
```

## Accessibility

### ARIA Labels

```html
<!-- Button with icon only -->
<button aria-label="Close dialog">
    ✕
</button>

<!-- Button with additional description -->
<button aria-describedby="delete-desc">
    Delete
</button>
<span id="delete-desc" hidden>This action cannot be undone</span>

<!-- Toggle button state -->
<button
    aria-pressed="false"
    onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'false' ? 'true' : 'false')">
    Toggle
</button>
```

### Keyboard Navigation

```html
<button>Tab to focus me</button>
<!-- Users can press Enter or Space to activate -->

<script>
    // Custom keyboard handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            // Handle button activation
        }
    });
</script>
```

### Focus Styles

```html
<style>
    button:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }
    
    /* Don't remove outline unless providing alternative */
    button:focus:not(:focus-visible) {
        outline: none;
    }
    
    button:focus-visible {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }
</style>
```

## Common Use Cases

### Confirmation Button

```html
<button onclick="confirmAction()">Delete Account</button>

<script>
    function confirmAction() {
        if (confirm('Are you sure you want to delete your account?')) {
            console.log('Account deleted');
        }
    }
</script>
```

### Counter Button

```html
<button id="counterBtn">Clicked 0 times</button>

<script>
    let count = 0;
    const btn = document.getElementById('counterBtn');
    
    btn.addEventListener('click', function() {
        count++;
        this.textContent = `Clicked ${count} times`;
    });
</script>
```

### Copy to Clipboard

```html
<button onclick="copyToClipboard()">Copy Code</button>

<script>
    function copyToClipboard() {
        const text = "Hello, World!";
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    }
</script>
```

### Download Button

```html
<button onclick="downloadFile()">Download File</button>

<script>
    function downloadFile() {
        const link = document.createElement('a');
        link.href = 'file.pdf';
        link.download = 'document.pdf';
        link.click();
    }
</script>
```

## Best Practices

1. **Always specify type**: Use `type="button"` for non-submit buttons
2. **Make buttons accessible**: Use proper ARIA labels and keyboard support
3. **Provide visual feedback**: Show hover, active, and disabled states
4. **Use descriptive text**: "Save Changes" instead of just "Submit"
5. **Disable during processing**: Prevent double-clicks on submit buttons
6. **Size appropriately**: Minimum 44x44px for touch targets (mobile)
7. **Use proper contrast**: Ensure text is readable against background
8. **Show loading state**: Indicate when async operations are in progress
9. **Don't use div/span as buttons**: Use semantic `<button>` element
10. **Test keyboard navigation**: Ensure buttons work with Tab and Enter/Space

## Common Mistakes

```html
<!-- Using div instead of button -->
<div onclick="doSomething()">Click Me</div> <!-- Bad -->
<button onclick="doSomething()">Click Me</button> <!-- Good -->

<!-- Missing type attribute -->
<form>
    <button onclick="validate()">Validate</button> <!-- Submits form! -->
    <button type="button" onclick="validate()">Validate</button> <!-- Correct -->
</form>

<!-- Nested interactive elements -->
<button>
    <a href="/page">Link</a> <!-- Invalid HTML! -->
</button>

<!-- No feedback for disabled state -->
<button disabled>Submit</button> <!-- User doesn't know why it's disabled -->
```

## Summary

- Use `<button>` element instead of `<input type="button">`
- Always specify `type` attribute (button, submit, or reset)
- Buttons can contain HTML content (text, icons, images)
- Use proper accessibility attributes (ARIA labels)
- Provide visual feedback for all states (hover, active, disabled)
- Make buttons keyboard-accessible
- Use semantic button elements for better accessibility
- Test on different devices and screen sizes

Buttons are fundamental to web interactivity. Master them to create better user experiences!
