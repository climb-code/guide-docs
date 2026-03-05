---
title: Error Handling
description: Professional strategies for managing errors and preventing crashes.
---

# Error Handling

Proper error handling is what separates a beginner script from a professional application.

## 1. Try / Catch (Sync & Async)
The most basic way to handle errors in synchronous code or with `async/await`.

```javascript
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error("Failed to parse JSON:", error.message);
}
```

## 2. Global Uncaught Exceptions
As a last resort, you can catch errors that weren't caught anywhere else to log them before the app crashes.

```javascript
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // mandatory (as per Node docs)
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

## 3. Centralized Error Middleware (Express)
In Express, always use a dedicated error-handling middleware at the end of your `app.js`.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

> [!TIP]
> Use custom error classes to provide more context about what went wrong (e.g., `ValidationError`, `AuthError`).
