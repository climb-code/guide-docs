---
title: "Callbacks in JavaScript"
description: "Learn about callback functions in JavaScript, how they work, and common patterns"
---

A callback is a function passed as an argument to another function, which is then invoked inside the outer function to complete some kind of routine or action. Callbacks are a fundamental concept in JavaScript and are essential for asynchronous programming.

## What is a Callback?

A callback function is a function that is passed to another function as a parameter and executed later.

### Simple Example

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);
// Output:
// Hello, Alice
// Goodbye!
```

## Why Use Callbacks?

Callbacks are used to:

1. **Handle asynchronous operations** - Execute code after an operation completes
2. **Create reusable code** - Pass different behaviors to the same function
3. **Event handling** - Respond to user interactions
4. **Control execution flow** - Manage when code runs

## Synchronous Callbacks

Synchronous callbacks are executed immediately within the function.

```javascript
// Array methods use callbacks
const numbers = [1, 2, 3, 4, 5];

// forEach callback
numbers.forEach(function(number) {
  console.log(number * 2);
});
// Output: 2, 4, 6, 8, 10

// map callback
const doubled = numbers.map(function(number) {
  return number * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter callback
const evens = numbers.filter(function(number) {
  return number % 2 === 0;
});
console.log(evens); // [2, 4]
```

### Custom Synchronous Callback

```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}

// Define different operations
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

console.log(calculate(5, 3, add));      // 8
console.log(calculate(5, 3, multiply)); // 15

// Using arrow functions
console.log(calculate(10, 2, (a, b) => a - b)); // 8
```

## Asynchronous Callbacks

Asynchronous callbacks are executed after a certain event occurs or a task completes.

### setTimeout Example

```javascript
console.log("Start");

setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Output:
// Start
// End
// This runs after 2 seconds
```

### Event Listeners

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function() {
  console.log("Button was clicked!");
});

// Arrow function syntax
button.addEventListener("click", () => {
  console.log("Button clicked again!");
});
```

### Reading Files (Node.js)

```javascript
const fs = require("fs");

fs.readFile("data.txt", "utf8", function(error, data) {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  console.log("File contents:", data);
});

console.log("Reading file...");
// Output: "Reading file..." appears first
// Then file contents appear when reading is complete
```

## Callback Patterns

### 1. Error-First Callbacks (Node.js Convention)

```javascript
function fetchData(callback) {
  // Simulate API call
  setTimeout(() => {
    const error = null;
    const data = { id: 1, name: "John" };
    
    // First parameter is error, second is result
    callback(error, data);
  }, 1000);
}

fetchData(function(error, data) {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Data received:", data);
});
```

### 2. Success/Failure Callbacks

```javascript
function loadImage(url, onSuccess, onError) {
  const img = new Image();
  
  img.onload = function() {
    onSuccess(img);
  };
  
  img.onerror = function() {
    onError(new Error("Failed to load image"));
  };
  
  img.src = url;
}

loadImage(
  "photo.jpg",
  function(img) {
    console.log("Image loaded successfully");
    document.body.appendChild(img);
  },
  function(error) {
    console.error("Error loading image:", error.message);
  }
);
```

### 3. Callback with Context

```javascript
function processArray(arr, callback, context) {
  for (let i = 0; i < arr.length; i++) {
    callback.call(context, arr[i], i);
  }
}

const multiplier = {
  factor: 2,
  multiply: function(num) {
    return num * this.factor;
  }
};

const numbers = [1, 2, 3, 4];

processArray(numbers, function(num, index) {
  console.log(`${index}: ${this.multiply(num)}`);
}, multiplier);
// Output: 0: 2, 1: 4, 2: 6, 3: 8
```

## Higher-Order Functions

Functions that accept callbacks are called higher-order functions.

```javascript
// Custom higher-order function
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, function(i) {
  console.log(`Iteration ${i}`);
});
// Output:
// Iteration 0
// Iteration 1
// Iteration 2

// More complex example
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Callback Hell (Pyramid of Doom)

When callbacks are nested too deeply, code becomes hard to read and maintain.

```javascript
// Callback hell example
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetMoreData(c, function(d) {
        getFinalData(d, function(finalData) {
          console.log(finalData);
        });
      });
    });
  });
});
```

### Solutions to Callback Hell

1. **Named Functions**
   ```javascript
   function handleA(a) {
     getMoreData(a, handleB);
   }
   
   function handleB(b) {
     getEvenMoreData(b, handleC);
   }
   
   function handleC(c) {
     console.log(c);
   }
   
   getData(handleA);
   ```

2. **Promises (Modern Approach)**
   ```javascript
   getData()
     .then(a => getMoreData(a))
     .then(b => getEvenMoreData(b))
     .then(c => console.log(c))
     .catch(error => console.error(error));
   ```

3. **Async/Await (Even Better)**
   ```javascript
   async function processData() {
     try {
       const a = await getData();
       const b = await getMoreData(a);
       const c = await getEvenMoreData(b);
       console.log(c);
     } catch (error) {
       console.error(error);
     }
   }
   ```

## Real-World Examples

### 1. Array Sorting with Custom Comparator

```javascript
const users = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

// Sort by age
users.sort(function(a, b) {
  return a.age - b.age;
});

console.log(users);
// [{ name: "Alice", age: 25 }, { name: "John", age: 30 }, { name: "Bob", age: 35 }]

// Sort by name
users.sort((a, b) => a.name.localeCompare(b.name));
```

### 2. Custom Event System

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(data);
      });
    }
  }
}

const emitter = new EventEmitter();

emitter.on("userLogin", function(user) {
  console.log(`${user.name} logged in`);
});

emitter.on("userLogin", function(user) {
  console.log(`Welcome back, ${user.name}!`);
});

emitter.emit("userLogin", { name: "Alice" });
// Output:
// Alice logged in
// Welcome back, Alice!
```

### 3. Data Processing Pipeline

```javascript
function pipeline(value, ...functions) {
  return functions.reduce((result, fn) => fn(result), value);
}

const double = n => n * 2;
const addTen = n => n + 10;
const square = n => n * n;

const result = pipeline(5, double, addTen, square);
console.log(result); // 400
// (5 * 2 = 10) → (10 + 10 = 20) → (20 * 20 = 400)
```

## Best Practices

1. **Keep callbacks simple**
   ```javascript
   // Good: Clear and focused
   numbers.forEach(num => console.log(num));
   
   // Avoid: Too much logic in callback
   numbers.forEach(num => {
     // Many lines of complex logic
   });
   ```

2. **Handle errors properly**
   ```javascript
   function fetchData(callback) {
     try {
       // ... operation
       callback(null, data);
     } catch (error) {
       callback(error);
     }
   }
   ```

3. **Use arrow functions for short callbacks**
   ```javascript
   // Concise
   [1, 2, 3].map(n => n * 2);
   
   // More verbose
   [1, 2, 3].map(function(n) {
     return n * 2;
   });
   ```

4. **Don't forget `this` context**
   ```javascript
   const obj = {
     value: 42,
     getValue: function() {
       // Wrong: loses 'this' context
       setTimeout(function() {
         console.log(this.value); // undefined
       }, 100);
       
       // Correct: arrow function preserves 'this'
       setTimeout(() => {
         console.log(this.value); // 42
       }, 100);
     }
   };
   ```

## Summary

- **Callbacks** are functions passed as arguments to other functions
- They enable **asynchronous programming** and code reusability
- **Synchronous callbacks** execute immediately (e.g., array methods)
- **Asynchronous callbacks** execute after events or operations complete
- **Callback hell** can be avoided using named functions, Promises, or async/await
- Understanding callbacks is essential for mastering JavaScript
