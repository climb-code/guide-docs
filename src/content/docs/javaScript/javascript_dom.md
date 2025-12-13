---
title: DOM Manipulation in JavaScript
description: Learn how to interact with the HTML of a webpage using JavaScript
---

The **DOM** (Document Object Model) is the bridge between your JavaScript code and the HTML that shows up on the screen. It allows you to change text, styles, and attributes, or even add and remove elements dynamically.

---

## 🌳 What is the DOM?

Imagine your HTML document as a tree. The browser converts your HTML tags into a tree of objects that JavaScript can read and change.

- **Document**: The root of the tree (the whole page).
- **Nodes**: Every part of the document (elements, text, comments) is a node.

```js
console.log(document); // Shows the entire HTML structure
```

---

## 🎯 Selecting Elements

Before you can change an element, you need to find it.

### `getElementById`
The fastest way to select an element if it has an ID.

```html
<h1 id="title">Hello World</h1>
```

```js
const title = document.getElementById('title');
```

### `querySelector`
Selects the **first** element that matches a CSS selector (like class, ID, or tag).

```js
const btn = document.querySelector('.btn'); // Selects first element with class "btn"
const header = document.querySelector('header h1'); // Selects h1 inside header
```

### `querySelectorAll`
Selects **all** elements that match. Returns a NodeList (similar to an array).

```js
const items = document.querySelectorAll('li');
items.forEach(item => {
  console.log(item.textContent);
});
```

---

## ✏️ Changing Content

Once you have an element, you can change what's inside it.

### `textContent`
Gets or sets the text content. It ignores HTML tags.

```js
const title = document.querySelector('h1');
title.textContent = "Welcome to JavaScript!";
```

### `innerHTML`
Gets or sets the HTML inside an element. Be careful with this one—it can be a security risk if you use it with user input (XSS attacks).

```js
const container = document.querySelector('.container');
container.innerHTML = "<p>This is a <strong>new</strong> paragraph.</p>";
```

---

## 🎨 Changing Styles

You can change CSS styles directly using the `style` property.

```js
const box = document.querySelector('.box');

box.style.backgroundColor = 'blue';
box.style.color = 'white';
box.style.fontSize = '20px';
```

> [!NOTE]
> CSS properties in JavaScript use **camelCase**. So `background-color` becomes `backgroundColor`.

### Better Way: `classList`
Instead of changing styles one by one, it's often cleaner to add or remove CSS classes.

```js
box.classList.add('active');    // Add a class
box.classList.remove('active'); // Remove a class
box.classList.toggle('active'); // Add if missing, remove if present
```

---

## 🏗️ Creating and Adding Elements

You can build new parts of the page from scratch.

```js
// 1. Create the element
const newBtn = document.createElement('button');

// 2. adding styles and content
newBtn.textContent = "Click Me";
newBtn.classList.add('primary-btn');

// 3. Add it to the page
const container = document.querySelector('.container');
container.appendChild(newBtn); // Adds to the end of the container
```

### Removing Elements

```js
const oldItem = document.querySelector('.old-item');
oldItem.remove();
```

---

## 🚀 Interactive Example

Let's make a simple "To-Do" adder.

**HTML:**
```html
<input type="text" id="input" placeholder="Enter task...">
<button id="addBtn">Add</button>
<ul id="list"></ul>
```

**JavaScript:**
```js
const input = document.getElementById('input');
const btn = document.getElementById('addBtn');
const list = document.getElementById('list');

btn.addEventListener('click', function() {
  const text = input.value;
  
  if (text !== "") {
    // Create new list item
    const li = document.createElement('li');
    li.textContent = text;
    
    // Add to list
    list.appendChild(li);
    
    // Clear input
    input.value = "";
  }
});
```

---

## ✅ Best Practices

- **Cache selections**: If you use an element more than once, save it in a variable.
- **Use `classList`**: Prefer toggling classes over changing `style` directly for complex changes.
- **Minimize layout thrashing**: extensive DOM changes can slow down the page. Try to make changes in batches.

---

**Happy Coding!**
