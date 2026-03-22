---
title: Graceful Shutdown
description: How to stop your Node.js application cleanly.
---

# Graceful Shutdown

A graceful shutdown is the process of stopping a Node.js application while ensuring that all currently active requests are completed, database connections are closed, and other resources are released properly.

## Why is it important?
- **Data Integrity**: Ensures database operations aren't interrupted mid-way.
- **User Experience**: Allows current users to finish their requests.
- **Reliability**: Reduces "zombie" processes or leaked resources in production environments like Docker or Kubernetes.

## Step-by-Step Implementation

### 1. Identify Termination Signals
Listen for `SIGTERM` (sent by orchestrators) and `SIGINT` (Ctrl+C).

### 2. Implementation Example
Here’s how you can implement a graceful shutdown in an Express app:

```javascript
const express = require('express');
const app = express();
const server = app.listen(3000);

// Example DB connection
const db = require('./db');

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    
    // Close DB connections
    db.close(() => {
	  console.log('Database connection closed.');
	  process.exit(0);
    });
  });

  // If server hasn't finished in 10s, force shutdown
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});
```

## Production Tips
- **Timeouts**: Always set a timeout (e.g., 10-30 seconds) to force quit if the cleanup takes too long.
- **Process Managers**: PM2 and Kubernetes handle these signals gracefully if your code is prepared for them.

> [!TIP]
> Use the `stoppable` npm package if you want more robust control over closing existing connections in your HTTP server.
