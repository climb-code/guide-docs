---
title: Worker Threads & Child Processes
description: Learn how to handle multi-threading and external scripts in Node.js.
---

# Worker Threads & Child Processes

Since Node.js is single-threaded, we use these modules to perform heavy tasks without blocking the main event loop.

## 1. Child Processes
Used to run shell commands or execute other files as separate processes.

```javascript
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
```

## 2. Worker Threads
Used for CPU-intensive JavaScript tasks (like image processing or data encryption). Unlike child processes, workers share memory.

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (msg) => console.log(`Worker said: ${msg}`));
  worker.postMessage('Start working!');
} else {
  parentPort.on('message', (msg) => {
    // Perform heavy task here
    parentPort.postMessage('Done!');
  });
}
```

> [!NOTE]
> Use **Child Processes** for system commands and **Worker Threads** for heavy JavaScript computation.
