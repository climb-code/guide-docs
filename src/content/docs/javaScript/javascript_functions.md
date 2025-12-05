---
title: Functions in JavaScript
description: Learn about Functions in JavaScript
---


A **function** is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it).

<img src="/images/function_diagram.png" alt="Function Machine Diagram" width="400"/>

## Why use Functions?

*   **Reusability:** You can define the code once and use it many times.
*   **Abstraction:** You can use the code many times with different arguments, to produce different results.

## Function Declaration

A function definition (also called a function declaration, or function statement) consists of the `function` keyword, followed by:

1.  The name of the function.
2.  A list of parameters to the function, enclosed in parentheses and separated by commas.
3.  The JavaScript statements that define the function, enclosed in curly brackets, `{ ... }`.

**Syntax:**

```js
function functionName(parameter1, parameter2) {
  // code to be executed
}
```

**Example:**

```js
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alice"); // Output: Hello, Alice!
```

## Function Expression

A function can also be defined using an expression. A function expression can be stored in a variable:

```js
const square = function(number) {
  return number * number;
};

console.log(square(4)); // Output: 16
```

## Arrow Functions

Arrow functions were introduced in ES6. They allow us to write shorter function syntax:

```js
const add = (a, b) => {
  return a + b;
};

console.log(add(5, 3)); // Output: 8
```

If the function has only one statement, and the statement returns a value, you can remove the brackets and the `return` keyword:

```js
const multiply = (a, b) => a * b;

console.log(multiply(5, 3)); // Output: 15
```

## Parameters and Arguments

*   **Parameters** are the names listed in the function's definition.
*   **Arguments** are the real values passed to the function.

```js
function sum(x, y) { // x and y are parameters
  return x + y;
}

let result = sum(10, 20); // 10 and 20 are arguments
```

## The Return Statement

When JavaScript reaches a `return` statement, the function will stop executing. If the function was invoked from a statement, JavaScript will "return" to execute the code after the invoking statement.

Functions often compute a return value. The return value is "returned" back to the "caller":

```js
function myFunction(a, b) {
  return a * b;
}

let x = myFunction(4, 3); // x will be 12
```

**Happy Coding!**
