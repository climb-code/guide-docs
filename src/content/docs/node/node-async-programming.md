---
title: Asynchronous Programming
description: Deep dive into Promises and Async/Await in Node.js.
---

# Asynchronous Programming

Node.js is asynchronous by nature, which means it doesn't wait for I/O operations (like reading a file or a database) to complete before moving to the next task.

## 1. Promises
A Promise represents the eventual completion (or failure) of an asynchronous operation.

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Something went wrong.");
  }
});

myPromise
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## 2. Async / Await
Introduced in ES2017, `async/await` is a cleaner way to write asynchronous code that looks and behaves like synchronous code.

```javascript
const fs = require('fs').promises;

const readFile = async () => {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

readFile();
```

## Why it matters
Asynchronous code prevents "blocking" the Event Loop, allowing Node.js to handle thousands of concurrent connections efficiently.

> [!IMPORTANT]
> Always use `try/catch` blocks when using `await` to handle errors properly.
