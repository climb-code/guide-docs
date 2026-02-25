---
title: Node.js Modules System
description: Understanding CommonJS and ES Modules in Node.js.
---

# Node.js Modules System

In Node.js, every file is treated as a module. This allows you to organize your code into small, reusable pieces.

## CommonJS (CJS)
This is the traditional way Node.js handles modules.

```javascript
// Exporting
module.exports = { sayHello: () => console.log("Hello!") };

// Importing
const myModule = require("./myModule");
myModule.sayHello();
```

## ES Modules (ESM)
The modern JavaScript standard.

```javascript
// Exporting
export const sayHello = () => console.log("Hello!");

// Importing
import { sayHello } from "./myModule.js";
sayHello();
```

> [!TIP]
> Use `.mjs` extension or set `"type": "module"` in `package.json` to use ES Modules by default.
