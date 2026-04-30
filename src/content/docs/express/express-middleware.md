---
title: Middleware in Express.js
description: Understand how middleware works in Express.js to process requests, manage routing flow, and handle errors.
---

Middleware functions are the backbone of Express.js applications. They act as a pipeline through which requests and responses pass, allowing you to execute code, modify request and response objects, and manage the flow of your application.

In this guide, we'll explore what middleware is, how to use built-in middleware, and how to create your own custom middleware functions.

---

## What is Middleware?

In Express, a middleware function is a function that has access to the **request object** (`req`), the **response object** (`res`), and the **next middleware function** in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it **must** call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

---

## Types of Middleware

Express application can use the following types of middleware:

1. **Application-level middleware**
2. **Router-level middleware**
3. **Error-handling middleware**
4. **Built-in middleware**
5. **Third-party middleware**

### 1. Application-level Middleware

Bind application-level middleware to an instance of the `app` object by using `app.use()` and `app.METHOD()`.

```javascript
const express = require('express');
const app = express();

// Middleware function without no mount path. Executed every time the app receives a request.
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass control to the next middleware function
});

// Middleware mounted on a specific path
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
```

### 2. Router-level Middleware

Router-level middleware works exactly like application-level middleware, except it is bound to an instance of `express.Router()`.

```javascript
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Define a route for this router
router.get('/profile', (req, res) => {
  res.send('User Profile');
});

module.exports = router;
```

### 3. Error-handling Middleware

Error-handling middleware always takes **four arguments**: `(err, req, res, next)`. You must provide four arguments to identify it as an error-handling middleware function, even if you don't use the `next` object.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
*Note: Error-handling middleware is typically defined last, after other `app.use()` and routes calls.*

### 4. Built-in Middleware

Express has several built-in middleware functions. The most commonly used ones are:

- `express.json()`: Parses incoming requests with JSON payloads.
- `express.urlencoded()`: Parses incoming requests with URL-encoded payloads.
- `express.static()`: Serves static assets such as HTML files, images, and so on.

```javascript
// Parse JSON payloads
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));
```

### 5. Third-party Middleware

You can use third-party middleware to add functionality to Express apps. For example, `morgan` for HTTP request logging or `cors` for enabling Cross-Origin Resource Sharing.

First, install it via npm:
```bash
npm install morgan
```

Then use it in your app:
```javascript
const morgan = require('morgan');

app.use(morgan('dev'));
```

---

## Writing Custom Middleware

Let's write a simple custom middleware that logs the HTTP method and URL of an incoming request.

```javascript
const express = require('express');
const app = express();

// Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Ensure the next middleware or route handler is called
};

// Use the middleware application-wide
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

## Key Takeaways

- Middleware functions are executed in the **order they are defined**.
- Always call `next()` if the middleware does not terminate the request.
- `app.use()` applies the middleware to all HTTP methods for the specified path.
- Middleware makes Express extremely extensible and modular by separating concerns like logging, authentication, and parsing.

Now that you understand middleware, you're ready to build robust, modular Express.js applications!
