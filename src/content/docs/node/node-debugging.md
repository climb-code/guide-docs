---
title: Debugging & Diagnostics
description: Tools and techniques for finding bugs and performance bottlenecks in Node.js.
---

# Debugging & Diagnostics

Debugging is the process of identifying and resolving issues within your code. Node.js provides several built-in tools and third-party libraries to help you diagnose problems.

## 1. Using `console.log` (The Basics)
While simple, `console.log` is often the first tool developers use. However, for production or complex apps, consider structured logging.

### Better Logging with Winston
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ],
});

logger.info('Application started');
logger.error('An unexpected error occurred');
```

## 2. The Node.js Debugger
Node.js has a built-in command-line debugger. You can start it by running:
```bash
node inspect app.js
```

### Chrome DevTools
You can use the Chrome DevTools to debug Node.js by running:
```bash
node --inspect app.js
```
Then open `chrome://inspect` in your browser.

## 3. Debugging in VS Code
VS Code provides an excellent built-in debugger for Node.js.
1. Go to the **Run and Debug** view.
2. Click **Create a launch.json file**.
3. Select **Node.js**.

Example `launch.json` configuration:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

## 4. Performance Diagnostics
- **`process.memoryUsage()`**: Monitor heap usage.
- **`node --prof`**: Create a V8 profile for CPU analysis.
- **Clinic.js**: A powerful suite of tools to diagnose performance bottlenecks (IO, CPU, Event Loop).

> [!TIP]
> Use the `debug` module for conditional logging that can be enabled via the `DEBUG` environment variable.
