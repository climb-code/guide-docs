---
title: Routing in Express.js
description: Learn how to define and use routes in your Express.js application to handle various HTTP requests.
---

# Routing in Express.js

Routing refers to how an application's endpoints (URIs) respond to client requests. In Express, routing is managed primarily through the `app` object or via the `express.Router` class.

## Basic Routing

A route definition takes the following structure:

```javascript
app.METHOD(PATH, HANDLER)
```

- `app` is an instance of Express.
- `METHOD` is an HTTP request method (e.g., `get`, `post`, `put`, `delete`), in lowercase.
- `PATH` is the path on the server.
- `HANDLER` is the function executed when the route is matched.

### Common Route Methods

Here are examples of handling the most common HTTP methods:

```javascript
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

// PUT method route (usually to update existing data)
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

// DELETE method route
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

> [!TIP]
> Express supports methods that correspond to all HTTP request methods: `get`, `post`, `put`, `delete`, `patch`, `options`, `head`, and more. There is also a special routing method, `app.all()`, which handles all HTTP methods for a path.

## Route Parameters

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object.

```javascript
app.get('/users/:userId/books/:bookId', (req, res) => {
  // Access the parameters via req.params
  const { userId, bookId } = req.params;
  
  res.send(`User ID is: ${userId} and Book ID is: ${bookId}`);
});
```

For a URL like `http://localhost:3000/users/34/books/8989`, the output will be:
`User ID is: 34 and Book ID is: 8989`.

## Query Strings

Query strings are another way to pass data via the URL. They appear after a question mark (`?`) in the URL. In Express, you can access these using `req.query`.

```javascript
// URL: http://localhost:3000/search?keyword=express&page=2
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const page = req.query.page;
  
  res.send(`Searching for "${keyword}" on page ${page}`);
});
```

## Express Router

As your application grows, defining all your routes in a single file becomes unmanageable. To solve this, Express provides the `Router` class to create modular, mountable route handlers.

Create a router file (e.g., `birds.js`):

```javascript
import express from 'express';
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page');
});

// define the about route
router.get('/about', (req, res) => {
  res.send('About birds');
});

export default router;
```

Then, load the router module in your main app file (`index.js`):

```javascript
import express from 'express';
import birdsRouter from './birds.js'; // Import your router

const app = express();

// Mount the router at a specific path
app.use('/birds', birdsRouter);
```

Now, the application will handle requests to `/birds` and `/birds/about`, and call the time-logging middleware specific to that route.

> [!IMPORTANT]
> Using `express.Router` is a best practice for separating your API routes into distinct files (e.g., one router for users, one for products), making your code significantly cleaner and easier to maintain.
```
