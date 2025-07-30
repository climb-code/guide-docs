---
title: JavaScript Interview Questions
description: Common interview questions JS
---

### 1. What is JavaScript?

JavaScript is synchronous single-threaded  high-level, dynamic, interpreted programming language that conforms to the ECMAScript specification. It is primarily used for creating interactive and dynamic content on websites but is also widely used in server-side development with platforms like Node.js.

#### Key Characteristics

* **Single-threaded**:
  JavaScript operates in a single-threaded environment, meaning it executes one command at a time in a single sequence. This is managed by the **JavaScript event loop**, which allows it to handle tasks like UI rendering and event handling without blocking the main thread.

* **Synchronous and Asynchronous Execution**:
  By default, JavaScript executes code synchronously—one line at a time, in order. However, it supports **asynchronous programming** using **callbacks**, **Promises**, and `async/await`, which allows it to perform non-blocking operations like fetching data from an API or reading files in the background.

* **Interpreted Language**:
  JavaScript code is executed line-by-line by the JavaScript engine (such as V8 in Chrome) without the need for a separate compilation step.

* **Dynamically Typed**:
  Variables are not bound to any specific data type. The type is determined at runtime, and a variable can hold different types of values during execution.

* **Prototype-based Object Orientation**:
  JavaScript uses **prototypes** instead of classical inheritance. Objects can inherit properties and methods from other objects.

* **First-class Functions**:
  Functions in JavaScript are first-class citizens, meaning they can be stored in variables, passed as arguments to other functions, and returned from functions.

* **Event-driven**:
  JavaScript follows an event-driven model, especially in the browser environment. It listens for user interactions (clicks, inputs, etc.) and executes corresponding functions (event handlers) when events occur.

#### Common Use Cases

* Client-side scripting for dynamic web pages
* Server-side development with Node.js
* Mobile app development (e.g., React Native)
* Desktop applications (e.g., Electron)
* Game development
* IoT devices and more

---

Let me know if you'd like this broken down into even more technical depth (e.g., memory management, garbage collection, or how the event loop works), or if you need a separate glossary of the key terms.



### 2. What are the different data types in JavaScript?

JavaScript has 8 basic data types:

1. **Primitive Data Types**:
   - **Number**: Represents both integer and floating-point numbers (e.g., `42` or `3.14`)
   - **String**: Represents textual data (e.g., `"Hello"` or `'World'`)
   - **Boolean**: Represents logical values (`true` or `false`)
   - **Undefined**: Represents an uninitialized variable (`undefined`)
   - **Null**: Represents an intentional absence of any object value (`null`)
   - **Symbol**: Represents a unique identifier (e.g., `Symbol('description')`)
   - **BigInt**: Represents integers with arbitrary precision (e.g., `9007199254740991n`)

2. **Non-Primitive Data Type**:
   - **Object**: Represents a collection of key-value pairs
     - Regular objects: `{}`
     - Arrays: `[]`
     - Functions: `function(){}`
     - Date: `new Date()`

#### Example:

```javascript
// Primitive types
let number = 42;
let string = "Hello";
let boolean = true;
let undefinedVar;
let nullVar = null;
let symbol = Symbol('description');
let bigInt = 9007199254740991n;

// Object type
let object = {name: "John", age: 30};
let array = [1, 2, 3];
```

### 3. What is Hoisting in JavaScript?

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their respective scopes during the compilation phase, before the code is executed.

#### Key Points about Hoisting:

1. **Variable Hoisting**:
   - Only declarations are hoisted, not initializations
   - `var` declarations are hoisted and initialized with `undefined`
   - `let` and `const` declarations are hoisted but not initialized (temporal dead zone)

2. **Function Hoisting**:
   - Function declarations are completely hoisted with their body
   - Function expressions are not hoisted

#### Examples:

```javascript
// Variable hoisting
console.log(x); // Output: undefined
var x = 5;

// The above code is interpreted as:
var x;
console.log(x);
x = 5;

// Function hoisting
sayHello(); // Works: "Hello!"
function sayHello() {
    console.log("Hello!");
}

// Function expression - doesn't work
sayGoodbye(); // Error: sayGoodbye is not a function
var sayGoodbye = function() {
    console.log("Goodbye!");
};
```

#### Best Practices:
- Always declare variables at the top of their scope
- Use `let` and `const` instead of `var` to avoid hoisting-related issues
- Declare functions before using them
