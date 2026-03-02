---
title: Node.js Event Emitter
description: Learning how to handle events in Node.js.
---

# Event Emitter

Node.js is event-driven. Many of its built-in modules inherit from the `EventEmitter` class.

## Basic Example

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listen for an event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit (trigger) the event
myEmitter.emit('greet', 'Developer');
```

Events are used for things like HTTP requests, file streams, and more.
