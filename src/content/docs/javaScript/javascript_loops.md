---
title: JavaScript Loops
description: Learn about different types of loops in JavaScript
---

Loops are used to execute a block of code continuously until a specific condition is met. They are useful for automating repetitive tasks, such as iterating over arrays or processing data.

## Types of Loops

JavaScript supports several types of loops:
- `for` loop
- `while` loop
- `do...while` loop
- `for...in` loop
- `for...of` loop

### For Loop

The `for` loop is the most commonly used loop. It repeats a block of code a specified number of times.

**Syntax:**

```javascript
for (initialization; condition; increment/decrement) {
  // code to be executed
}
```

**Example:**

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Iteration number: " + i);
}
```

### While Loop

The `while` loop executes a block of code as long as a specified condition is true.

**Syntax:**

```javascript
while (condition) {
  // code to be executed
}
```

**Example:**

```javascript
let i = 0;
while (i < 5) {
  console.log("Count: " + i);
  i++;
}
```

### Do...While Loop

The `do...while` loop is similar to the `while` loop, but it guarantees that the code block is executed at least once before checking the condition.

**Syntax:**

```javascript
do {
  // code to be executed
} while (condition);
```

**Example:**

```javascript
let i = 0;
do {
  console.log("Count: " + i);
  i++;
} while (i < 5);
```

### For...In Loop

The `for...in` loop iterates over the properties of an object.

**Syntax:**

```javascript
for (key in object) {
  // code to be executed
}
```

**Example:**

```javascript
const person = { fname: "John", lname: "Doe", age: 25 };
for (let x in person) {
  console.log(person[x]);
}
```

### For...Of Loop

The `for...of` loop iterates over the values of an iterable object (like an array, string, map, or set).

**Syntax:**

```javascript
for (variable of iterable) {
  // code to be executed
}
```

**Example:**

```javascript
const cars = ["BMW", "Volvo", "Mini"];
for (let x of cars) {
  console.log(x);
}
```

## Break and Continue

### Break

The `break` statement "jumps out" of a loop.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    break;
  }
  console.log("The number is " + i);
}
```

### Continue

The `continue` statement breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  console.log("The number is " + i);
}
```
