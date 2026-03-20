---
title: Process & Signals
description: Deep dive into the Node.js process object and handling system signals.
---

# Process & Signals

The `process` object in Node.js is a global object that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using `require()`.

## 1. Environment Variables (`process.env`)
The `process.env` property returns an object containing the user environment. It is commonly used to store configuration and secrets.

```javascript
console.log(process.env.NODE_ENV); // production or development
console.log(process.env.PORT); 
```

## 2. Command Line Arguments (`process.argv`)
The `process.argv` property returns an array containing the command-line arguments passed when the Node.js process was launched.

```javascript
// Run as: node app.js arg1 arg2
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

## 3. Process Events & Signals
The `process` object is an instance of `EventEmitter`. You can listen for various events or system signals.

### Exit Codes
You can exit a process manually using `process.exit(code)`. A code of `0` means success, while non-zero means failure.

```javascript
if (error) {
  process.exit(1);
}
```

### Handling Signals (SIGINT, SIGTERM)
Signals are sent to the process by the operating system.

- **SIGINT**: Sent when you press `Ctrl+C` in the terminal.
- **SIGTERM**: Sent by process managers (like PM2 or Docker) to request a graceful shutdown.

```javascript
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Cleaning up...');
  // Close database connections, stop server, etc.
  process.exit(0);
});
```

### Uncaught Exceptions & Rejections
It's crucial to handle errors that escape your normal try/catch blocks.

```javascript
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); 
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```

> [!WARNING]
> Using `uncaughtException` should be a last resort. It's often better to let the process crash and have a process manager (like PM2) restart it.
