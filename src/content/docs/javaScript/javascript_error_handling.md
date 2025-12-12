---
title: Error Handling in JavaScript
description: Learn how to handle errors gracefully using try...catch, throw, and finally.
---

Imagine you're driving a car. 

In an ideal world, the road is always smooth, the traffic lights are always green, and your car never breaks down. But in the real world, potholes exist, engines stall, and sometimes you get a flat tire.

If you don't have a plan for these problems (like a spare tire or a roadside assistance number), you're stranded. The journey ends abruptly.

**Error Handling** is that roadside assistance plan for your code. Instead of your entire application crashing (the car breaking down on the highway) when something unexpected happens, you catch the problem, handle it gracefully, and keep the application running (or at least tell the user what went wrong).

## The Crash (Uncaught Errors)

When JavaScript encounters an error it doesn't know how to handle, it "throws" an exception and stops execution immediately.

```js
console.log("Start of the trip");

// This function doesn't exist!
driveToMars(); 

console.log("End of the trip"); 
```

**Output:**
1. "Start of the trip"
2. ❌ Uncaught ReferenceError: driveToMars is not defined

Notice that "End of the trip" never prints. The program crashed. In a web app, this might mean a button stops working or the entire page goes blank.

## The Safety Net: `try...catch`

To prevent the crash, we wrap risky code in a `try` block. If something breaks, execution immediately jumps to the `catch` block.

```js
try {
  // 1. Attempt risky code
  console.log("Attempting to drive to Mars...");
  driveToMars(); 
  console.log("Arrived at Mars!"); // This line is skipped
  
} catch (error) {
  // 2. Handle the error here
  console.log("Oops! Could not drive to Mars.");
  console.log("Reason:", error.message);
}

console.log("Trip continues back on Earth...");
```

**Output:**
1. "Attempting to drive to Mars..."
2. "Oops! Could not drive to Mars."
3. "Reason: driveToMars is not defined"
4. "Trip continues back on Earth..."

The app didn't crash! It acknowledged the failure and kept going. This is **graceful degradation**.

## The `Error` Object

When an error is caught, the `catch(error)` block receives an Error object. This object usually has two main properties:
1. **`name`**: The type of error (e.g., `ReferenceError`, `TypeError`).
2. **`message`**: A description of what went wrong.

You can also access `error.stack` to see the "stack trace"—a trail of breadcrumbs showing exactly where the error happened in your code (very useful for debugging!).

## Throwing Your Own Errors (`throw`)

Sometimes, the code isn't technically "broken" by JavaScript rules, but it's broken by *your* logic rules. You can manually `throw` an error to stop execution and jump to the catch block.

Imagine a specialized ATM that only accepts positive numbers.

```js
function withdrawCash(amount) {
  if (amount < 0) {
    throw new Error("Cannot withdraw a negative amount!");
  }
  if (amount > 1000) {
    throw new Error("Daily limit exceeded.");
  }
  return `Withdrew $${amount}`;
}

try {
  const result = withdrawCash(-50);
  console.log(result);
  
} catch (err) {
  console.error("Transaction Failed:", err.message);
}
```

**Output:**
- "Transaction Failed: Cannot withdraw a negative amount!"

## The `finally` Block

There is a third, optional block called `finally`. Code inside `finally` runs **no matter what**—whether there was an error or not.

It's perfect for cleanup tasks, like turning off a "Loading..." spinner.

```js
function fetchData() {
  console.log("🔵 Spinner ON");
  
  try {
    // Simulate fetching data
    console.log("Fetching data...");
    throw new Error("Server is down!"); // Pretend it failed
    
  } catch (err) {
    console.log("❌ Error handled:", err.message);
    
  } finally {
    // This runs success OR fail
    console.log("⚪ Spinner OFF"); 
  }
}

fetchData();
```

**Output:**
1. "🔵 Spinner ON"
2. "Fetching data..."
3. "❌ Error handled: Server is down!"
4. "⚪ Spinner OFF"

Even though there was an error, the spinner was correctly turned off.

## Summary

| Keyword | Purpose | Analogy |
| :--- | :--- | :--- |
| **`try`** | Wraps the code that might explode. | Driving the car. |
| **`catch`** | Executed if an error occurs in the try block. | Roadside assistance arriving. |
| **`throw`** | Manually triggers an error. | Pulling the emergency brake. |
| **`finally`** | Executed after try/catch, regardless of the outcome. | Cleaning the car after the trip. |

Robust error handling is what separates fragile student projects from professional, resilient software. Always account for the "what ifs"!
