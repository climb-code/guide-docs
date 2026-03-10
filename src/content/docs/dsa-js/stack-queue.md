---
title: Stack and Queue in JavaScript
description: Simple DSA guide for Stack and Queue with working JavaScript examples.
---

## Quick Intro

This quick note is for Arya, in simple English.

`Data Structure` means how we store data.  
`Algorithm` means steps to solve a problem.

In this page:
- `Stack` follows `LIFO` (Last In, First Out)
- `Queue` follows `FIFO` (First In, First Out)

## Queue in JavaScript (FIFO)

`queue.js`

```js
class Queue {
  #items = [];

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#items.shift();
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

`queue-demo.js`

```js
import Queue from "./queue.js";

const queueInstance = new Queue();

queueInstance.enqueue(2);
const item = queueInstance.dequeue();
console.log("dequeued item:", item);

queueInstance.enqueue(3);
const item2 = queueInstance.peek();
console.log("peeked item:", item2);

const item3 = queueInstance.isEmpty();
console.log("is empty:", item3);

const item4 = queueInstance.size();
console.log("size:", item4);

queueInstance.enqueue(4);
console.log("enqueued item:", 4);

const item6 = queueInstance.size();
console.log("size:", item6);

const item5 = queueInstance.printQueue();
console.log("print queue:", item5);
```

Expected output:

```txt
dequeued item: 2
peeked item: 3
is empty: false
size: 1
enqueued item: 4
size: 2
print queue: [ 3, 4 ]
```

Run:

```bash
node queue-demo.js
```

## Stack in JavaScript (LIFO)

`stack.js`

```js
class Stack {
  #items = [];

  push(element) {
    this.#items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#items.pop();
  }

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
