---
title: Node.js Router
description: A guide to routing in Node.js
---

# Node.js Router

In Node.js web applications, routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

## Basic Routing with Express

While you can implement routing with the built-in `http` module, it's very common to use a framework like **Express** to handle routing because it provides a simpler and more robust set of features.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Respond with 'Hello World!' on the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Respond to POST request on the root route
app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Creating Modular Routes with `express.Router`

As your application grows, defining all routes in a single file becomes unmanageable. You can use the `express.Router` class to create modular, mountable route handlers. A `Router` instance is often referred to as a "mini-app".

### Example: Users Router

Create a router file named `users.js`:

```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// Define the home page route
router.get('/', (req, res) => {
  res.send('Users home page');
});

// Define the about route
router.get('/about', (req, res) => {
  res.send('About users');
});

module.exports = router;
```

Load the router module in your main application:

```javascript
const express = require('express');
const app = express();
const users = require('./users');

// Mount the router on the /users path
app.use('/users', users);
```

Now, the application handles requests to `/users` and `/users/about` by delegating them to the `users` router module.
