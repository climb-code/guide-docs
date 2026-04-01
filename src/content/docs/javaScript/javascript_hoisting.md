---
title: Hoisting in JavaScript
description: Understand how JavaScript hoists variable and function declarations to the top of their scope.
---

**Hoisting** is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compile phase, before the code has been executed.

In simpler terms, you can use a variable or call a function before it is declared in your code.

---

## 🏗️ How Hoisting Works

When the JavaScript engine executes your code, it creates a **Global Execution Context**. This happens in two phases:

1.  **Creation Phase:** The engine scans the code for variable and function declarations and allocates memory for them.
2.  **Execution Phase:** The engine executes the code line by line.

---

## 📦 Variable Hoisting

The behavior of hoisting depends on how the variable is declared (`var`, `let`, or `const`).

### 1. Hoisting with `var`

Variables declared with `var` are hoisted to the top of their function or global scope and initialized with `undefined`.

```js
console.log(myVar); // Output: undefined
var myVar = 10;
console.log(myVar); // Output: 10
```

> [!NOTE]
> Only the **declaration** is hoisted, not the **initialization**.

### 2. Hoisting with `let` and `const`

Variables declared with `let` and `const` are also hoisted, but they are **not initialized**. They reside in a "Temporal Dead Zone" (TDZ) from the start of the block until the declaration is encountered.

```js
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;

console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 30;
```

---

## 📞 Function Hoisting

Function declarations are hoisted completely, meaning you can call a function before it is defined.

### 1. Function Declarations

```js
greet(); // Output: Hello, World!

function greet() {
  console.log("Hello, World!");
}
```

### 2. Function Expressions

Function expressions (including arrow functions) are **not hoisted** in the same way. Their behavior depends on whether they are declared with `var`, `let`, or `const`.

```js
sayHi(); // TypeError: sayHi is not a function (if using var)
// OR ReferenceError (if using let/const)

var sayHi = function() {
  console.log("Hi!");
};
```

---

## 💡 Key Takeaways

1.  **Function declarations** are fully hoisted.
2.  **`var` variables** are hoisted and initialized as `undefined`.
3.  **`let` and `const` variables** are hoisted but stay in the **Temporal Dead Zone** until initialized.
4.  To avoid confusion and bugs, it is **best practice** to declare variables and functions at the top of their scope.

---

**Happy Coding!**
