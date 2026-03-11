---
title: Stack and Queue in JavaScript
description: Simple DSA guide for Stack and Queue with working JavaScript examples.
---

## Quick Intro

`Data Structure` means how we store data efficiently.  
`Algorithm` means steps to solve a problem.

In this page:
- `Stack`: Think of a stack of plates. You add to the top and take from the top.
- `Queue`: Think of a line at a movie theater. The first person in line is the first one served.

---

## 🏗️ Stack in JavaScript (LIFO)

A **Stack** follows the **LIFO** (Last In, First Out) principle. The last element added is the first one to be removed.

### Core Operations:
1. **Push**: Add an element to the top.
2. **Pop**: Remove the top element.
3. **Peek**: Look at the top element without removing it.
4. **IsEmpty**: Check if the stack is empty.

### 🧩 Implementation: `stack.js`

```js
class Stack {
  #items = [];

  // Add to top
  push(element) {
    this.#items.push(element);
  }

  // Remove from top
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#items.pop();
  }

  // See top element
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  clear() {
    this.#items = [];
  }
}

export default Stack;
```

---

## 🎟️ Queue in JavaScript (FIFO)

A **Queue** follows the **FIFO** (First In, First Out) principle. The first element added is the first one to be removed.

### Core Operations:
1. **Enqueue**: Add an element to the back.
2. **Dequeue**: Remove the front element.
3. **Peek**: Look at the front element.

### 🧩 Implementation: `queue.js`

```js
class Queue {
  #items = [];

  // Add to back
  enqueue(item) {
    this.#items.push(item);
  }

  // Remove from front
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#items.shift(); // shift() removes the first element
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#items[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  printQueue() {
    return [...this.#items];
  }
}

export default Queue;
```

`browser-history.js`

```js
import Stack from "./stack.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });
const browserHistory = new Stack();

while (true) {
  const userChoice = prompt(`Please select one of the following options:
1. Press 1 to add a new domain
2. Press 2 to see the current domain
3. Press 3 to go back
4. Press 4 to exit
`);

  const userChoiceNumber = Number(userChoice);

  switch (userChoiceNumber) {
    case 1: {
      const domain = prompt("Enter domain: ").trim();
      if (!domain) {
        console.log("Domain cannot be empty.");
        break;
      }
      browserHistory.push(domain);
      console.log(`Navigated to: ${domain}`);
      break;
    }

    case 2: {
      if (browserHistory.isEmpty()) {
        console.log("No current domain.");
        break;
      }
      console.log(`Current domain: ${browserHistory.peek()}`);
      break;
    }

    case 3: {
      if (browserHistory.size() < 2) {
        console.log("No previous domain found.");
        break;
      }
      browserHistory.pop();
      console.log(`Went back to: ${browserHistory.peek()}`);
      break;
    }

    case 4:
      console.log("Exiting browser...");
      process.exit(0);

    default:
      console.log("Invalid option. Please try again.");
  }
}
```

Install package once:

```bash
npm i prompt-sync
```

Run:

```bash
node browser-history.js
```
