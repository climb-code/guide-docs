---
title: Events in JavaScript
description: Learn about Events in JavaScript
---

An **Event** is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

When an event occurs, you can "listen" to it and execute a function in response. This function is called an **Event Handler**.

## Common Events

Here are some of the most common events you'll encounter:

| Event | Description |
| :--- | :--- |
| `click` | When the mouse clicks on an element. |
| `mouseover` | When the mouse pointer comes over an element. |
| `mouseout` | When the mouse pointer moves out of an element. |
| `keydown` | When a keyboard key is pressed down. |
| `load` | When the browser has finished loading the page. |
| `submit` | When a form is submitted. |

## Handling Events

There are a few ways to assign a handler to an event.

### 1. HTML Attribute (Old School)

You can set a handler directly in HTML using an attribute like `onclick`.

```html
<button onclick="alert('Hello!')">Click Me</button>
```

> [!NOTE]
> This method is simple but not recommended for modern applications because it mixes HTML and JavaScript.

### 2. DOM Property

You can assign a function to a DOM element's event property.

```js
const btn = document.getElementById('myBtn');

btn.onclick = function() {
  alert('Button clicked!');
};
```

### 3. addEventListener (Recommended)

The modern standard is `addEventListener`. It allows you to add multiple handlers to the same event and keep your HTML clean.

**Syntax:**
```js
element.addEventListener(event, handler, [options]);
```

**Example:**
```js
const btn = document.getElementById('myBtn');

function handleClick() {
  console.log("Button was clicked!");
}

btn.addEventListener('click', handleClick);
```

## The Event Object

When an event happens, the browser creates an **event object**, puts details into it, and passes it as an argument to the handler.

```js
const btn = document.getElementById('myBtn');

btn.addEventListener('click', function(event) {
  // 'event' is the event object
  console.log("Event type: " + event.type); 
  console.log("Target element: " + event.target);
});
```

### Preventing Default Behavior

Some events have a default action. For example, clicking a "Submit" button on a form sends the data to the server. You can stop this with `event.preventDefault()`.

```js
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Stop the form from submitting
  console.log("Form submission prevented!");
});
```

**Happy Coding!**
