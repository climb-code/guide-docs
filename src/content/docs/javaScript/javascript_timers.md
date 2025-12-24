---
title: "Timers in JavaScript"
description: "Learn about timing functions in JavaScript including setTimeout, setInterval, clearTimeout, and clearInterval"
---

JavaScript provides timing functions that allow you to execute code after a delay or at regular intervals. These functions are essential for creating animations, scheduling tasks, and managing asynchronous operations.

## setTimeout()

The `setTimeout()` function executes a piece of code or a function once after a specified delay (in milliseconds).

### Basic Syntax

```javascript
setTimeout(function, delay, arg1, arg2, ...)
```

- **function**: The function to execute
- **delay**: Time to wait before execution (in milliseconds)
- **arg1, arg2, ...**: Optional arguments to pass to the function

### Simple Example

```javascript
console.log("Start");

setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Output:
// Start
// End
// This runs after 2 seconds (after 2-second delay)
```

### With Arrow Function

```javascript
setTimeout(() => {
  console.log("Hello after 1 second!");
}, 1000);
```

### Passing Arguments

```javascript
function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}

setTimeout(greet, 1500, "Alice", "Hello");
// Output after 1.5 seconds: Hello, Alice!
```

### Using a Reference

```javascript
function showMessage() {
  console.log("Message displayed!");
}

// Pass function reference (without parentheses)
setTimeout(showMessage, 1000);
```

## clearTimeout()

The `clearTimeout()` function cancels a timeout that was previously set with `setTimeout()`.

```javascript
const timeoutId = setTimeout(() => {
  console.log("This will never run");
}, 3000);

// Cancel the timeout
clearTimeout(timeoutId);
console.log("Timeout cancelled");
```

### Practical Example: Cancellable Delay

```javascript
let timeoutId;

function showNotification(message) {
  console.log(message);
}

function scheduleNotification(message, delay) {
  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    showNotification(message);
  }, delay);
}

scheduleNotification("First message", 2000);
scheduleNotification("Second message", 1000); // Cancels first, shows this one

// Output after 1 second: Second message
```

## setInterval()

The `setInterval()` function repeatedly executes code at a specified interval.

### Basic Syntax

```javascript
setInterval(function, interval, arg1, arg2, ...)
```

- **function**: The function to execute repeatedly
- **interval**: Time between executions (in milliseconds)

### Simple Example

```javascript
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
}, 1000);

// Output every second:
// Count: 1
// Count: 2
// Count: 3
// ... (continues indefinitely)
```

### Countdown Timer

```javascript
let timeLeft = 10;

const countdown = setInterval(() => {
  console.log(timeLeft);
  timeLeft--;
  
  if (timeLeft < 0) {
    clearInterval(countdown);
    console.log("Time's up!");
  }
}, 1000);

// Output:
// 10
// 9
// 8
// ... (down to 0)
// Time's up!
```

## clearInterval()

The `clearInterval()` function stops an interval that was set with `setInterval()`.

```javascript
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(count);
  
  if (count === 5) {
    clearInterval(intervalId);
    console.log("Interval stopped");
  }
}, 1000);

// Output:
// 1
// 2
// 3
// 4
// 5
// Interval stopped
```

## Real-World Examples

### 1. Debounce Function

Delays execution until after the user stops performing an action.

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search as user types
const searchInput = document.querySelector("#search");

const performSearch = debounce((event) => {
  console.log("Searching for:", event.target.value);
  // API call would go here
}, 500);

searchInput.addEventListener("input", performSearch);
// Search only happens 500ms after user stops typing
```

### 2. Digital Clock

```javascript
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timeString = `${hours}:${minutes}:${seconds}`;
  console.log(timeString);
  
  // Update DOM element
  // document.querySelector("#clock").textContent = timeString;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to show immediately
```

### 3. Auto-Save Feature

```javascript
class TextEditor {
  constructor() {
    this.content = "";
    this.saveTimeoutId = null;
  }
  
  updateContent(newContent) {
    this.content = newContent;
    this.scheduleSave();
  }
  
  scheduleSave() {
    // Clear previous save timer
    if (this.saveTimeoutId) {
      clearTimeout(this.saveTimeoutId);
    }
    
    // Schedule new save after 2 seconds of inactivity
    this.saveTimeoutId = setTimeout(() => {
      this.save();
    }, 2000);
  }
  
  save() {
    console.log("Auto-saving content:", this.content);
    // Actual save logic here
  }
}

const editor = new TextEditor();
editor.updateContent("Hello");
editor.updateContent("Hello World"); // Previous save cancelled
// Saves "Hello World" after 2 seconds of no changes
```

### 4. Polling for Updates

```javascript
function pollForUpdates() {
  console.log("Checking for updates...");
  
  // Simulate API call
  fetch("/api/updates")
    .then(response => response.json())
    .then(data => {
      console.log("Update received:", data);
    })
    .catch(error => {
      console.error("Error fetching updates:", error);
    });
}

// Poll every 5 seconds
const pollingInterval = setInterval(pollForUpdates, 5000);

// Stop polling after 1 minute
setTimeout(() => {
  clearInterval(pollingInterval);
  console.log("Stopped polling");
}, 60000);
```

### 5. Animation Loop

```javascript
let position = 0;
const element = document.querySelector("#box");

const animationInterval = setInterval(() => {
  position += 5;
  element.style.left = position + "px";
  
  // Stop when element reaches 300px
  if (position >= 300) {
    clearInterval(animationInterval);
  }
}, 50); // Update every 50ms for smooth animation
```

### 6. Notification System

```javascript
class NotificationManager {
  constructor() {
    this.notifications = [];
  }
  
  show(message, duration = 3000) {
    const notification = {
      id: Date.now(),
      message: message
    };
    
    this.notifications.push(notification);
    console.log(`📢 ${message}`);
    
    // Auto-remove after duration
    setTimeout(() => {
      this.remove(notification.id);
    }, duration);
  }
  
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    console.log("Notification removed");
  }
}

const notifier = new NotificationManager();
notifier.show("Welcome!", 2000);
notifier.show("You have 3 new messages", 5000);
```

## setTimeout vs setInterval

### setTimeout for Repeated Execution

```javascript
// Using setTimeout recursively
function repeatWithTimeout() {
  console.log("Repeating task");
  
  setTimeout(repeatWithTimeout, 1000);
}

repeatWithTimeout();
```

**Advantages:**
- Guarantees delay between executions
- Can conditionally stop or change interval
- More control over execution flow

### setInterval Example

```javascript
// Using setInterval
const intervalId = setInterval(() => {
  console.log("Repeating task");
}, 1000);

// Must manually stop
// clearInterval(intervalId);
```

**Use setInterval when:**
- You need simple, consistent intervals
- The task duration is predictable and short

**Use recursive setTimeout when:**
- Task duration varies
- You need guaranteed delay between executions
- You want more control over the loop

## Common Pitfalls

### 1. Minimum Delay

```javascript
// Browsers enforce minimum delays (usually 4ms)
setTimeout(() => {
  console.log("This won't run instantly");
}, 0);

console.log("This runs first");

// Output:
// This runs first
// This won't run instantly
```

### 2. `this` Context

```javascript
const obj = {
  name: "Test",
  greet: function() {
    setTimeout(function() {
      console.log(this.name); // undefined - lost context
    }, 1000);
    
    // Solution: Use arrow function
    setTimeout(() => {
      console.log(this.name); // Test - preserved context
    }, 1000);
  }
};
```

### 3. Memory Leaks

```javascript
// Bad: Creates memory leak if not cleared
function startTimer() {
  setInterval(() => {
    console.log("Running...");
  }, 1000);
}

// Good: Store reference and clear when done
let timerId;

function startTimer() {
  timerId = setInterval(() => {
    console.log("Running...");
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}
```

### 4. Loop Variables

```javascript
// Wrong: All timeouts log 5
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 5, 5, 5, 5, 5
  }, 1000);
}

// Solution 1: Use let (block scope)
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2, 3, 4
  }, 1000);
}

// Solution 2: Use IIFE
for (var i = 0; i < 5; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}
```

## Best Practices

1. **Always store timer IDs for cleanup**
   ```javascript
   const timerId = setTimeout(() => {}, 1000);
   // Store timerId for later cleanup
   ```

2. **Clear timers when no longer needed**
   ```javascript
   // In React
   useEffect(() => {
     const timer = setInterval(() => {}, 1000);
     return () => clearInterval(timer); // Cleanup
   }, []);
   ```

3. **Use arrow functions to preserve `this`**
   ```javascript
   setTimeout(() => {
     this.doSomething();
   }, 1000);
   ```

4. **Consider using `requestAnimationFrame` for animations**
   ```javascript
   // Better for animations than setInterval
   function animate() {
     // Animation logic
     requestAnimationFrame(animate);
   }
   animate();
   ```

## Summary

- **setTimeout()** executes code once after a delay
- **setInterval()** executes code repeatedly at intervals
- **clearTimeout()** and **clearInterval()** cancel timers
- Delays are in **milliseconds** (1000ms = 1 second)
- Always **store timer IDs** for proper cleanup
- Use **arrow functions** to preserve `this` context
- Be aware of **minimum delay** enforcement in browsers
- **Clear timers** to prevent memory leaks
