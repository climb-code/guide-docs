---
title: Modules in JavaScript
description: Learn how to split your JavaScript code into separate files using Modules (Import/Export).
---

As your application grows, putting all your code in a single file becomes messy and hard to maintain. **Modules** allow you to break up your code into separate files, making it easier to organize, reuse, and debug.

ES6 (ECMAScript 2015) introduced a native module system to JavaScript using `import` and `export` statements.

## Why Use Modules?

1.  **Maintainability**: Easier to find and fix code in smaller files.
2.  **Reusability**: Write code once and import it into multiple parts of your app.
3.  **Namespace Safety**: Variables in a module are private by default, preventing them from polluting the global scope or clashing with other scripts.

## Exporting

To make functions, objects, or primitive values available to other files, you need to `export` them. There are two main types of exports: **Named Exports** and **Default Exports**.

### 1. Named Exports

You can have multiple named exports in a single file. When importing, you must use the exact same name (in curly braces).

**`mathUtils.js`**
```js
// Exporting individually
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

Or you can export them all at once at the bottom:

```js
const PI = 3.14159;
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

export { PI, add, subtract };
```

### 2. Default Exports

You can have only **one** default export per file. This is useful for a main class or a primary function.

**`User.js`**
```js
export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

## Importing

Once you've exported code, you can use `import` to bring it into another file.

### Importing Named Exports

Use curly braces `{}` and the exact names.

**`main.js`**
```js
import { PI, add } from './mathUtils.js';

console.log(PI); // 3.14159
console.log(add(5, 3)); // 8
```

### Importing Default Exports

You can name the import whatever you want (no curly braces).

**`main.js`**
```js
import UserProfile from './User.js'; // You can call it UserProfile or User or anything

const user = new UserProfile("Alice");
console.log(user.name);
```

### Importing Everything (Namespace Import)

If you want to import everything from a file as a single object:

```js
import * as MathTools from './mathUtils.js';

console.log(MathTools.PI);
console.log(MathTools.add(2, 2));
```

## Renaming Imports and Exports

You can use the `as` keyword to rename things if there's a naming conflict or for clarity.

**Exporting with alias:**
```js
export { add as sum };
```

**Importing with alias:**
```js
import { add as calculateSum } from './mathUtils.js';
```

## Running Modules in the Browser

To use modules in an HTML file, you must add `type="module"` to your script tag.

```html
<script type="module" src="main.js"></script>
```

> **Note**: Modules generally need to run on a server (local or remote) due to CORS policies. If you open the HTML file directly (`file://`), it might not work.

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **Named Export** | `export const name = ...` | Export multiple items. Import with `{}`. |
| **Default Export** | `export default ...` | Export one main item. Import without `{}`. |
| **Import** | `import { x } from './file.js'` | Bring code from another module. |
| **Alias** | `import { x as y } ...` | Rename an import. |

Modules are a fundamental part of modern JavaScript development, especially when using frameworks like React, Vue, or build tools like Vite and Webpack.
