---
title:  Numbers in JavaScript
description:   JavaScript provides robust support for working with numbers, including integers, floating-point values, and special numeric values like `NaN` and `Infinity`. This guide covers the basics and best practices for handling numbers in JavaScript.
---


**JavaScript handles numbers in a simple but powerful way.** Whether you're working with whole numbers, decimals, or special values like `NaN` and `Infinity`, this guide will help you understand how numbers work and how to use them effectively in your code.

---

## 📚 Table of Contents

* [Types of Numbers](#types-of-numbers)
* [Writing Numbers (Literals)](#writing-numbers-literals)
* [Useful Number Methods](#useful-number-methods)
* [Special Values: NaN, Infinity](#special-values-nan-infinity)
* [Converting Strings to Numbers](#converting-strings-to-numbers)
* [The Math Object](#the-math-object)
* [Precision Issues](#precision-issues)
* [Best Practices](#best-practices)

---

## 🧮 Types of Numbers

In JavaScript, all regular numbers—whether integers (like 10) or decimals (like 3.14)—are stored as the same type: a 64-bit floating-point number (based on the IEEE 754 standard).

```js
typeof 42;   // "number"
typeof 3.14; // "number"
```

### BigInt

For working with really large integers beyond the safe limit, use `BigInt` (introduced in ES2020):

```js
typeof 12345678901234567890n; // "bigint"
```

---

## 🔢 Writing Numbers (Literals)

You can write numbers in several formats:

* **Decimal:** `42`, `3.14`
* **Binary:** `0b1010` → 10
* **Octal:** `0o52` → 42
* **Hexadecimal:** `0x2A` → 42
* **Exponential Notation:** `1.5e4` → 15000

---

## 🛠️ Useful Number Methods

Here are some helpful methods built into JavaScript for working with numbers:

```js
Number.isNaN(value);       // Checks if value is NaN
Number.isFinite(value);    // Checks if value is a finite number
Number.parseInt(str, 10);  // Parses a string to an integer
Number.parseFloat(str);    // Parses a string to a float

let n = 12.3456;
n.toFixed(2);              // "12.35" – keeps 2 decimal places
n.toPrecision(4);          // "12.35" – total length of the number
```

---

## ⚠️ Special Values: NaN, Infinity

JavaScript also includes some special numeric values:

* `NaN` → "Not-a-Number", used when a calculation doesn’t make sense.
* `Infinity` and `-Infinity` → Result of dividing by zero or very large/small values.

Examples:

```js
0 / 0;   // NaN
1 / 0;   // Infinity
-1 / 0;  // -Infinity
```

---

## 🔄 Converting Strings to Numbers

You can turn strings into numbers using:

```js
Number("123");         // 123
parseInt("101", 2);    // 5 (binary to decimal)
parseFloat("3.14");    // 3.14
```

**Tip:** Prefer `parseInt` or `parseFloat` when parsing input strings.

---

## 🧠 The Math Object

JavaScript includes a built-in `Math` object with many useful functions:

```js
Math.round(4.7);      // 5
Math.floor(4.7);      // 4
Math.ceil(4.1);       // 5
Math.max(3, 9, 2);    // 9
Math.min(3, 9, 2);    // 2
Math.random();        // Random number between 0 and 1
Math.pow(2, 3);       // 8 (2^3)
Math.sqrt(16);        // 4
```

It also includes trigonometry, logarithms, and more.

---

## ⚖️ Precision Issues

Because JavaScript uses floating-point math, some results can be a bit off:

```js
0.1 + 0.2 === 0.3; // false 😬
```

To safely compare decimals, use a small tolerance value:

```js
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true ✅
```

---

## ✅ Best Practices

* Use `Number.isNaN()` and `Number.isFinite()` instead of the global `isNaN()` or `isFinite()` functions.
* Use `parseInt()` and `parseFloat()` for parsing user input.
* Watch out for floating-point rounding errors.
* Use `BigInt` when working with very large numbers that might lose precision.

---

### 💡 Final Thoughts

Numbers are everywhere in JavaScript—from calculations and user input to complex data structures. Knowing how to use them properly helps you write reliable and accurate code.

📖 **For more in-depth info, check out the [MDN docs on Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).**

