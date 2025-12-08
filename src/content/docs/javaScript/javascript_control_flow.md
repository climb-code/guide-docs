---
title: Control Flow in JavaScript
description: Learn about conditional statements in JavaScript
---

Control flow is the order in which the computer executes statements in a script. Code is run in order from the first line in the file to the last line, unless the computer runs across the (extremely frequent) structures that change the control flow, such as conditionals and loops.

## Conditional Statements

Conditional statements are used to perform different actions based on different conditions.

### if Statement

Use the `if` statement to specify a block of JavaScript code to be executed if a condition is true.

```javascript
let hour = 10;
if (hour < 18) {
  console.log("Good day");
}
```

### else Statement

Use the `else` statement to specify a block of code to be executed if the condition is false.

```javascript
let hour = 20;
if (hour < 18) {
  console.log("Good day");
} else {
  console.log("Good evening");
}
```

### else if Statement

Use the `else if` statement to specify a new condition if the first condition is false.

```javascript
let time = 22;
if (time < 10) {
  console.log("Good morning");
} else if (time < 20) {
  console.log("Good day");
} else {
  console.log("Good evening");
}
```

## Switch Statement

The `switch` statement is used to perform different actions based on different conditions. Use the switch statement to select one of many code blocks to be executed.

```javascript
let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
}
console.log("Today is " + day);
```

## Ternary Operator

The ternary operator is the only JavaScript operator that takes three operands. This operator is frequently used as a shortcut for the if statement.

```javascript
// Syntax: condition ? exprIfTrue : exprIfFalse

let age = 20;
let canVote = (age >= 18) ? "Yes" : "No";
console.log(canVote); // Output: Yes
```
