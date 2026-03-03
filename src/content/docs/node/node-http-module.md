---
title: HTTP Module
description: Build a simple web server using Node.js built-in HTTP module.
---

# HTTP Module

The `http` module allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). It can be used to create a web server.

## Create a Simple Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page');
  } else if (req.url === '/about') {
    res.end('Here is our short history');
  } else {
    res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href="/">back home</a>
    `);
  }
});

server.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
```

## How it works:
- `http.createServer()` takes a callback function with `req` (request) and `res` (response) objects.
- `req.url` lets you handle different routes.
- `res.end()` sends the final content back to the browser.

> [!NOTE]
> While the built-in `http` module is powerful, most developers use **Express.js** for more complex web applications as it simplifies routing and middleware.
