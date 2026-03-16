---
title: Clustering in Node.js
description: Learn how to scale Node.js applications across multi-core systems using the Cluster module.
---

Node.js runs in a single thread by default. To take advantage of multi-core systems, you can use the built-in `cluster` module to spawn worker processes that share the same server port.

## How it Works
The cluster module allows you to create worker processes that handle incoming requests. The master process manages the workers and distributes incoming connections using a round-robin strategy (except on Windows).

## Basic Example

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    // Optionally restart the worker
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## Benefits of Clustering
- **Performance**: Improved throughput on multi-core machines.
- **Availability**: If a worker crashes, other workers can continue to serve requests.
- **Zero-Downtime Reloads**: Workers can be restarted one by one.

## When to use Cluster vs. Worker Threads?
- **Cluster**: Use for scaling I/O heavy tasks (like HTTP servers) across multiple CPU cores. Each worker has its own memory.
- **Worker Threads**: Use for CPU-intensive tasks where memory sharing is beneficial.
