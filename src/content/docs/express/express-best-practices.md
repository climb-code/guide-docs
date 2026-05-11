---
title: Express.js Best Practices & Performance
description: Optimize your Express.js applications for production with performance and reliability best practices.
---

Building an Express application is easy, but making it production-ready requires attention to performance, reliability, and security. In this guide, we'll explore best practices to ensure your application can handle high traffic and remain stable.

---

## 1. Use Compression

Gzip compression can significantly reduce the size of the response body, increasing the speed of your web app. Express has the `compression` middleware for this.

### Installation
```bash
npm install compression
```

### Usage
```javascript
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

---

## 2. Avoid Synchronous Functions

Node.js is single-threaded. If you use synchronous functions (like `fs.readFileSync`), you block the entire event loop, preventing the server from handling other requests.

**Bad (Blocking):**
```javascript
const data = fs.readFileSync('large-file.json'); // Blocks the event loop
```

**Good (Non-blocking):**
```javascript
fs.readFile('large-file.json', (err, data) => {
  // Handles result asynchronously
});
```

---

## 3. Use a Production Process Manager

In development, you might run your app with `node app.js`. In production, you should use a process manager like **PM2**. PM2 ensures your app restarts automatically if it crashes and allows you to run multiple instances (clustering).

### Installation
```bash
npm install pm2 -g
```

### Basic Commands
```bash
pm2 start app.js -i max  # Start app in cluster mode using all CPUs
pm2 status               # Check status of apps
pm2 logs                 # View real-time logs
```

---

## 4. Proper Logging

Don't use `console.log` in production. It’s synchronous and lacks features like log levels and rotation. Instead, use a logging library like **Winston** or **Morgan**.

- **Morgan**: For HTTP request logging.
- **Winston**: For general application logging (errors, info).

```javascript
const morgan = require('morgan');
app.use(morgan('combined')); // Standard Apache combined log output
```

---

## 5. Set NODE_ENV to production

Always ensure your environment variable `NODE_ENV` is set to `production`. Express and many other libraries use this flag to enable optimizations (like caching views and omitting error stacks).

```bash
export NODE_ENV=production
node app.js
```

---

## 6. Handle Exceptions Properly

Uncaught exceptions can crash your server. Use `try-catch` in async functions and define a global error handler.

```javascript
app.get('/data', async (req, res, next) => {
  try {
    const result = await someAsyncAction();
    res.json(result);
  } catch (err) {
    next(err); // Pass to global error handler
  }
});
```

---

## Key Takeaways

- **Compression** reduces payload size.
- **Asynchronous code** keeps the event loop free.
- **PM2** provides reliability and scaling.
- **Structured logging** helps with debugging in production.
- **NODE_ENV=production** is a mandatory setting for performance.

Applying these best practices will make your Express.js applications faster, more scalable, and more reliable!
