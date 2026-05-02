---
title: Error Handling in Express.js
description: Learn how to handle errors in Express.js, including custom error-handling middleware, handling asynchronous errors, and best practices.
---

Error handling is a critical part of any web application. Express.js comes with a built-in error handler that takes care of any errors that might be encountered in the app. However, as your application grows, you'll need to implement custom error-handling logic to provide better feedback to users and manage logs.

---

## Default Error Handling

By default, Express comes with a built-in error handler that is added to the end of the middleware function stack. If you pass an error to `next()` and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace (in development) or just the status code.

```javascript
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!"); // Express will catch this and send a 500
});
```

---

## Custom Error-Handling Middleware

You define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: `(err, req, res, next)`.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});
```

> [!IMPORTANT]
> Error-handling middleware must be defined **last**, after all other `app.use()` and route calls.

---

## Handling Asynchronous Errors

For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the `next()` function, where Express will catch and process them.

### 1. Using Promises/Callbacks
```javascript
app.get("/user/:id", (req, res, next) => {
  getUserById(req.params.id, (err, user) => {
    if (err) {
      return next(err); // Pass error to Express
    }
    res.json(user);
  });
});
```

### 2. Using Async/Await
In Express 4, you must wrap your code in `try...catch` blocks to pass errors to `next()`.

```javascript
app.get("/data", async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err); // Essential for async errors!
  }
});
```

> [!TIP]
> From **Express 5** onwards, route handlers and middleware that return a Promise will call `next(value)` automatically when they reject or throw an error.

---

## The `next()` Function

- `next()`: Move to the next middleware.
- `next("route")`: Move to the next route (only works in `app.METHOD()` or `router.METHOD()`).
- `next(err)`: Skip all remaining non-error-handling middleware and go straight to the error-handling middleware.

---

## Best Practices

| Strategy | Rationale |
| :--- | :--- |
| **Always use `next(err)`** | Ensures async errors are caught and don't hang the request. |
| **Centralized Handling** | Use one or two dedicated middleware for all error responses. |
| **Environment Checks** | Never leak sensitive stack traces in production. |
| **Custom Error Classes** | Create classes like `ApiError` to include status codes. |

---

## Example: Custom Error Class

```javascript
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.get("/profile", (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Please log in first"));
  }
  res.send(req.user.profile);
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    status: "error",
    message: err.message,
  });
});
```

With these patterns, you can ensure your application handles edge cases gracefully and remains reliable for your users.
