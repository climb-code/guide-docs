---
title: Child Processes in Node.js
description: Learn how to manage child processes in Node.js using spawn, exec, execFile, and fork.
---

Node.js provides the `child_process` module to enable the creation of new processes, allowing your application to perform tasks outside the main event loop.

## Why use Child Processes?
- **Offload Heavy Tasks**: Run CPU-intensive operations in separate processes.
- **Run External Commands**: Execute scripts or system binaries.
- **Scalability**: Utilize multi-core systems by spawning multiple processes.

## Core Methods

### 1. `spawn()`
Launches a command in a new process. It's asynchronous and returns a stream. Use this for large amounts of data.

```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
```

### 2. `exec()`
Spawns a shell and runs a command within that shell. It buffers the output and returns it in a callback.

```javascript
const { exec } = require('child_process');

exec('ls -lh /usr', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
```

### 3. `execFile()`
Similar to `exec()` but does not spawn a shell, making it more efficient and secure for running executables.

### 4. `fork()`
A special case of `spawn()` that creates a new Node.js process with a communication channel (IPC) established between parent and child.

```javascript
// parent.js
const { fork } = require('child_process');
const child = fork('child.js');

child.on('message', (msg) => {
  console.log('Message from child', msg);
});

child.send({ hello: 'world' });
```

## Best Practices
- **Security**: Always sanitize inputs to prevent command injection.
- **Error Handling**: Listen for `error` and `exit` events.
- **Resource Management**: Properly close processes when they are no longer needed.
