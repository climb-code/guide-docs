---
title: Node.js File System (FS)
description: How to read and write files using Node.js.
---

# File System (FS) Module

The `fs` module allows you to interact with the file system on your computer.

## Reading a File

```javascript
const fs = require('fs');

// Synchronous
const data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

// Asynchronous (Recommended)
fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

## Writing a File

```javascript
fs.writeFile('log.txt', 'Hello World!', (err) => {
  if (err) throw err;
  console.log('File saved!');
});
```

> [!IMPORTANT]
> Always handle errors in file operations to prevent your application from crashing.
