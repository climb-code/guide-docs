---
title : "JS Variable Deep Dive"
description : "Deep dive into JavaScript variable concepts: Shadowing, Hoisting, and the Temporal Dead Zone (TDZ)."
---

While basic variable declaration involves `var`, `let`, and `const`, there are several advanced concepts that determine how JavaScript handles these variables under the hood.

---

## 🏗️ Hoisting

**Hoisting** is JavaScript's default behavior of moving declarations to the top of the current scope (to the top of the current script or the current function).

### `var` Hoisting
Variables defined with `var` are hoisted to the top and initialized with `undefined`.

```js
console.log(x); // Output: undefined
var x = 5;
```

### `let` and `const` Hoisting
Variables defined with `let` and `const` are also hoisted to the top of the block, but they are **not initialized**. 

---

## 🚪 Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** is the period between the start of the block and the actual declaration of the variable. Accessing the variable in this zone results in a `ReferenceError`.

```js
{
  // Start of TDZ for 'myVar'
  console.log(myVar); // ❌ ReferenceError: Cannot access 'myVar' before initialization
  
  let myVar = "Hello"; // End of TDZ
  console.log(myVar); // ✅ "Hello"
}
```

> [!TIP]
> TDZ helps catch bugs by ensuring variables are only used after they are explicitly declared.

---

## 👤 Variable Shadowing

**Variable Shadowing** occurs when a variable declared within a certain scope (like a block or function) has the same name as a variable in an outer scope. The inner variable "shadows" or hides the outer one.

```js
let count = 10; // Outer variable

if (true) {
  let count = 20; // Shadows the outer 'count'
  console.log(count); // Output: 20
}

console.log(count); // Output: 10
```

### Illegal Shadowing
You cannot shadow a `let` variable with a `var` variable in the same block scope.

```js
let x = 10;
{
  var x = 20; // ❌ SyntaxError: Identifier 'x' has already been declared
}
```

---

## 📊 Summary Comparison

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Hoisting** | Hoisted & initialized as `undefined` | Hoisted but uninitialized | Hoisted but uninitialized |
| **TDZ** | No | Yes | Yes |
| **Shadowing** | Allowed | Allowed | Allowed |
| **Re-declaration** | Allowed | No | No |

---

**Happy Coding!**