---
title: Middleware Pattern in Node.js
description: Understand the middleware pattern and how it's used in Express.js.
---

Middleware is a design pattern used in Node.js, most notably in Express.js, to handle requests and responses in a pipeline.

## What is Middleware?
Middleware functions are functions that have access to the `request` object (`req`), the `response` object (`res`), and the `next` function in the application’s request-response cycle.

## How it Works
When a request is received, it passes through a series of middleware functions. Each function can:
1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle.
4. Call the next middleware function in the stack.

## Basic Express Middleware

```javascript
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Don't forget to call next()!
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

## Types of Middleware
- **Application-level**: Bound to an instance of `app`.
- **Router-level**: Bound to an instance of `express.Router()`.
- **Error-handling**: Middleware specifically for catching errors (defined with 4 arguments: `err, req, res, next`).
- **Built-in**: Middleware provided by Express (e.g., `express.json()`).
- **Third-party**: Middleware created by the community (e.g., `cookie-parser`, `helmet`).

## Creating custom middleware
```javascript
const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/admin', checkAuth, (req, res) => {
  res.send('Welcome Admin');
});
```
