---
title: Express.js Basics
description: Introduction to Express, Middleware, and Routing.
---

# Express.js Basics

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## 1. Setting Up Express
First, install it via npm:
```bash
npm install express
```

## 2. Basic Server
```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 3. Routing
Routing refers to how an application’s endpoints (URIs) respond to client requests.
```javascript
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/users', (req, res) => {
  res.send('User created!');
});
```

## 4. Middleware
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next handler
};

app.use(logger); // Use middleware globally
```

> [!TIP]
> Use `express.json()` middleware to parse JSON bodies from incoming requests.
