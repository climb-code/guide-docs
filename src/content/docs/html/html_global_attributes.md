---
title: HTML Global Attributes
description: Learn about HTML global attributes that can be used on any element - including data attributes, contenteditable, draggable, hidden, and more.
---

Global attributes are attributes that can be used on any HTML element. They provide universal functionality across all elements.

## Common Global Attributes

### id Attribute

Unique identifier for an element:

```html
<div id="header">Header content</div>
<p id="intro">Introduction paragraph</p>

<script>
  const header = document.getElementById('header');
</script>
```

**Rules:**
- Must be unique within the page
- Case-sensitive
- Cannot contain spaces
- Should start with a letter

### class Attribute

Assigns one or more classes for styling and JavaScript:

```html
<!-- Single class -->
<div class="container">Content</div>

<!-- Multiple classes -->
<button class="btn btn-primary btn-large">Click me</button>

<!-- CSS -->
<style>
  .container { max-width: 1200px; }
  .btn { padding: 10px; }
  .btn-primary { background: blue; }
</style>
```

### style Attribute

Inline CSS styling:

```html
<p style="color: red; font-size: 18px;">Styled text</p>
<div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
  Styled container
</div>
```

**Note:** Prefer external CSS or `<style>` tags over inline styles.

### title Attribute

Tooltip text shown on hover:

```html
<abbr title="HyperText Markup Language">HTML</abbr>

<button title="Click to submit the form">Submit</button>

<img src="photo.jpg" alt="Sunset" title="Beautiful sunset at the beach">
```

## Data Attributes

Custom attributes for storing extra information:

### Basic Syntax

```html
<div data-user-id="12345" data-role="admin">User info</div>

<article data-category="technology" data-author="Jane Doe">
  Article content
</article>

<button data-action="delete" data-confirm="true">Delete</button>
```

### Accessing with JavaScript

```html
<div id="user" data-user-id="12345" data-name="John Doe">User</div>

<script>
  const user = document.getElementById('user');
  
  // Using dataset
  console.log(user.dataset.userId);    // "12345"
  console.log(user.dataset.name);      // "John Doe"
  
  // Using getAttribute
  console.log(user.getAttribute('data-user-id')); // "12345"
  
  // Setting values
  user.dataset.role = 'admin';
  user.setAttribute('data-active', 'true');
</script>
```

### Practical Example

```html
<div class="product-card" 
     data-product-id="SKU123" 
     data-price="29.99" 
     data-category="electronics">
  <h3>Wireless Mouse</h3>
  <button class="add-to-cart">Add to Cart</button>
</div>

<script>
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const productId = card.dataset.productId;
      const price = card.dataset.price;
      console.log(`Adding product ${productId} - $${price}`);
    });
  });
</script>
```

## Editable Content

### contenteditable

Makes elements editable:

```html
<!-- Basic editable div -->
<div contenteditable="true">
  You can edit this text!
</div>

<!-- Editable heading -->
<h1 contenteditable="true">Click to edit this heading</h1>

<!-- Not editable -->
<div contenteditable="false">
  This cannot be edited
</div>

<!-- Editable with styling -->
<div contenteditable="true" 
     style="border: 1px solid #ccc; padding: 10px; min-height: 100px;">
  Start typing here...
</div>
```

### Practical Example

```html
<style>
  .editor {
    border: 2px solid #ddd;
    padding: 15px;
    min-height: 200px;
    border-radius: 4px;
  }
  .editor:focus {
    border-color: #4CAF50;
    outline: none;
  }
</style>

<div class="editor" contenteditable="true" spellcheck="true">
  <h2>My Document</h2>
  <p>Start writing your content here...</p>
</div>

<button onclick="saveContent()">Save</button>

<script>
  function saveContent() {
    const editor = document.querySelector('.editor');
    const content = editor.innerHTML;
    console.log('Saved:', content);
  }
</script>
```

## Drag and Drop

### draggable

Enable drag and drop:

```html
<style>
  .draggable {
    padding: 10px;
    margin: 5px;
    background: #e3f2fd;
    cursor: move;
  }
  .drop-zone {
    min-height: 100px;
    border: 2px dashed #ccc;
    padding: 20px;
    margin: 10px 0;
  }
  .drop-zone.drag-over {
    border-color: #4CAF50;
    background: #f1f8f4;
  }
</style>

<!-- Draggable items -->
<div class="draggable" draggable="true" ondragstart="drag(event)" id="item1">
  Drag me!
</div>
<div class="draggable" draggable="true" ondragstart="drag(event)" id="item2">
  Drag me too!
</div>

<!-- Drop zone -->
<div class="drop-zone" 
     ondrop="drop(event)" 
     ondragover="allowDrop(event)"
     ondragenter="dragEnter(event)"
     ondragleave="dragLeave(event)">
  Drop items here
</div>

<script>
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function dragEnter(event) {
    event.target.classList.add('drag-over');
  }
  
  function dragLeave(event) {
    event.target.classList.remove('drag-over');
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const element = document.getElementById(data);
    event.target.appendChild(element);
    event.target.classList.remove('drag-over');
  }
</script>
```

## Visibility and Interaction

### hidden

Hide elements:

```html
<!-- Hidden element -->
<div hidden>This content is hidden</div>

<!-- Toggle visibility -->
<button onclick="toggleContent()">Toggle Content</button>
<div id="content" hidden>Hidden content that can be toggled</div>

<script>
  function toggleContent() {
    const content = document.getElementById('content');
    content.hidden = !content.hidden;
  }
</script>
```

**Note:** `hidden` is different from `display: none` - it's semantic, indicating the content is not yet or no longer relevant.

### tabindex

Control tab order and focusability:

```html
<!-- Natural tab order -->
<input type="text" placeholder="First (tab 0)">
<input type="text" placeholder="Second (tab 0)">

<!-- Custom tab order -->
<input type="text" tabindex="3" placeholder="Third">
<input type="text" tabindex="1" placeholder="First">
<input type="text" tabindex="2" placeholder="Second">

<!-- Enable focus on non-interactive elements -->
<div tabindex="0" onclick="alert('Clicked')">Focusable div</div>

<!-- Remove from tab order -->
<button tabindex="-1">Not in tab order</button>
```

### accesskey

Keyboard shortcuts:

```html
<button accesskey="s">Save (Alt+S or Control+Alt+S)</button>
<a href="#content" accesskey="c">Skip to content (Alt+C)</a>

<!-- Form shortcuts -->
<label>
  <u>N</u>ame: <input type="text" accesskey="n">
</label>
```

## Language and Direction

### lang

Specify language:

```html
<html lang="en">
  <body>
    <p>This is in English.</p>
    
    <p lang="es">Esto está en español.</p>
    
    <p lang="fr">Ceci est en français.</p>
    
    <blockquote lang="de">
      Dies ist auf Deutsch.
    </blockquote>
  </body>
</html>
```

### dir

Text direction:

```html
<!-- Left to right (default) -->
<p dir="ltr">This text flows left to right.</p>

<!-- Right to left -->
<p dir="rtl">هذا النص يتدفق من اليمين إلى اليسار</p>

<!-- Auto-detect direction -->
<p dir="auto">Automatic direction detection</p>
```

## Text Behavior

### spellcheck

Enable/disable spell checking:

```html
<!-- Enable spellcheck -->
<textarea spellcheck="true">Type here with spellcheck enabled</textarea>

<!-- Disable spellcheck -->
<input type="text" spellcheck="false" placeholder="No spellcheck">

<!-- Code editor (no spellcheck) -->
<div contenteditable="true" spellcheck="false">
  function hello() {
    console.log("No spellcheck for code");
  }
</div>
```

### translate

Control translation:

```html
<!-- Allow translation -->
<p translate="yes">This content can be translated.</p>

<!-- Prevent translation -->
<p translate="no">
  Brand names like <span>TechCorp™</span> should not be translated.
</p>

<!-- Product names, code, etc. -->
<code translate="no">console.log('Hello');</code>
```

## ARIA Attributes

Accessibility attributes (global):

```html
<!-- Label -->
<button aria-label="Close dialog">×</button>

<!-- Description -->
<input type="text" 
       aria-describedby="password-help"
       placeholder="Password">
<small id="password-help">Must be at least 8 characters</small>

<!-- Hidden from screen readers -->
<span aria-hidden="true">🎉</span>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  Status updates appear here
</div>

<!-- Expanded state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<div id="menu" hidden>Menu items</div>
```

## Other Useful Global Attributes

### autocapitalize

Control auto-capitalization on mobile:

```html
<!-- No auto-capitalization -->
<input type="text" autocapitalize="off" placeholder="email@example.com">

<!-- Capitalize sentences -->
<textarea autocapitalize="sentences">Type your message</textarea>

<!-- Capitalize words -->
<input type="text" autocapitalize="words" placeholder="Full Name">

<!-- Capitalize characters -->
<input type="text" autocapitalize="characters" placeholder="INITIALS">
```

### enterkeyhint

Customize enter key on virtual keyboards:

```html
<!-- Show "Search" on enter key -->
<input type="search" enterkeyhint="search">

<!-- Show "Done" -->
<input type="text" enterkeyhint="done">

<!-- Show "Go" -->
<input type="url" enterkeyhint="go">

<!-- Show "Send" -->
<textarea enterkeyhint="send"></textarea>

<!-- Other values: enter, next, previous -->
```

### inputmode

Optimize virtual keyboard type:

```html
<!-- Numeric keyboard -->
<input type="text" inputmode="numeric" placeholder="Phone number">

<!-- Decimal keyboard -->
<input type="text" inputmode="decimal" placeholder="Price">

<!-- Email keyboard -->
<input type="text" inputmode="email" placeholder="Email">

<!-- URL keyboard -->
<input type="text" inputmode="url" placeholder="Website">

<!-- Other values: none, text, tel, search -->
```

## Practical Examples

### Todo List with Data Attributes

```html
<style>
  .todo-item { padding: 10px; margin: 5px 0; border: 1px solid #ddd; }
  .todo-item[data-status="completed"] { opacity: 0.6; text-decoration: line-through; }
</style>

<div id="todo-list">
  <div class="todo-item" data-id="1" data-status="pending" data-priority="high">
    <input type="checkbox" onchange="toggleTodo(this)">
    <span>Complete project</span>
  </div>
  <div class="todo-item" data-id="2" data-status="completed" data-priority="low">
    <input type="checkbox" checked onchange="toggleTodo(this)">
    <span>Buy groceries</span>
  </div>
</div>

<script>
  function toggleTodo(checkbox) {
    const item = checkbox.closest('.todo-item');
    item.dataset.status = checkbox.checked ? 'completed' : 'pending';
  }
</script>
```

### Editable Profile Card

```html
<div class="profile-card">
  <h2 contenteditable="true" spellcheck="false">John Doe</h2>
  <p contenteditable="true" 
     data-placeholder="Add a bio..."
     spellcheck="true">
    Web developer and designer
  </p>
  <button onclick="saveProfile()">Save Changes</button>
</div>
```

### Accessible Modal Dialog

```html
<button onclick="openModal()" 
        aria-haspopup="dialog" 
        aria-expanded="false"
        id="modal-trigger">
  Open Settings
</button>

<div id="modal" 
     role="dialog" 
     aria-labelledby="modal-title"
     aria-modal="true"
     hidden>
  <h2 id="modal-title">Settings</h2>
  <div contenteditable="true">Edit settings...</div>
  <button onclick="closeModal()" aria-label="Close dialog">Close</button>
</div>
```

## Best Practices

1. **Use semantic HTML first**: Don't rely solely on global attributes
2. **Keep IDs unique**: Never duplicate IDs on a page
3. **Use data-* for custom data**: Don't create non-standard attributes
4. **Make content accessible**: Use ARIA attributes appropriately
5. **Minimize inline styles**: Prefer CSS classes
6. **Be consistent**: Use consistent naming conventions
7. **Validate attributes**: Use only valid attribute values
8. **Test thoroughly**: Ensure attributes work across browsers

## Common Mistakes

```html
<!-- ❌ Duplicate IDs -->
<div id="box">First</div>
<div id="box">Second</div>

<!-- ❌ Invalid data attribute name -->
<div data-User-ID="123">Invalid</div>

<!-- ❌ Spaces in ID -->
<div id="my box">Invalid ID</div>

<!-- ❌ Non-standard attributes -->
<div custom-attr="value">Invalid</div>

<!-- ✅ Correct approach -->
<div id="box-1">First</div>
<div id="box-2">Second</div>
<div data-user-id="123">Valid</div>
<div data-custom-attr="value">Valid</div>
```

## Summary

- **Global attributes** work on any HTML element
- **id** provides unique identification
- **class** enables styling and JavaScript selection
- **data-*** stores custom data
- **contenteditable** makes elements editable
- **draggable** enables drag and drop
- **hidden** hides content semantically
- **tabindex** controls keyboard navigation
- **lang** and **dir** handle language and direction
- **spellcheck** and **translate** control text behavior
- **ARIA attributes** improve accessibility
- Use global attributes to enhance functionality
- Always validate and test your implementations

Global attributes provide powerful functionality across all HTML elements!
