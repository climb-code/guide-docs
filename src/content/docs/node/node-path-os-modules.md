---
title: Path & OS Modules
description: Understanding the built-in Path and OS modules in Node.js.
---

# Path & OS Modules

Node.js comes with built-in modules to help you interact with the file system and the operating system.

## 1. Path Module
The `path` module provides utilities for working with file and directory paths.

```javascript
const path = require('path');

// Join paths
const fullPath = path.join('/users', 'sj', 'documents', 'node.txt');
console.log(fullPath); // outputs: /users/sj/documents/node.txt (on Mac/Linux)

// Get file extension
console.log(path.extname('index.html')); // .html

// Get directory name
console.log(path.dirname(fullPath)); // /users/sj/documents
```

## 2. OS Module
The `os` module provides information about the computer's operating system.

```javascript
const os = require('os');

// Check system architecture
console.log(os.arch()); // e.g., x64 or arm64

// Check available memory (in bytes)
console.log(os.freemem()); 

// Get system uptime (in seconds)
console.log(os.uptime());

// Get user info
console.log(os.userInfo());
```

> [!IMPORTANT]
> The `path` module is essential for making your code cross-platform, as it handles the difference between `/` (Mac/Linux) and `\` (Windows) automatically.
