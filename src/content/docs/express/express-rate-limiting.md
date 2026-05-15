---
title: Rate Limiting in Express.js
description: Learn how to implement rate limiting in your Express.js applications to protect your APIs from abuse and DDoS attacks.
---

Rate limiting is a technique used to control the rate of traffic sent or received by a network. In Express.js applications, rate limiting helps prevent abuse, such as brute-force attacks or DDoS attacks, by limiting the number of requests a client can make within a specified time window.

## Using `express-rate-limit`

The most common way to implement rate limiting in Express is by using the `express-rate-limit` middleware.

### Installation

```bash
npm install express-rate-limit
```

### Basic Usage

```javascript
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

// Create the rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Applying Rate Limits to Specific Routes

You can also apply rate limiting to specific routes instead of the entire application.

```javascript
// Apply to a specific route
app.use('/api/', limiter);

// Create a stricter limiter for sensitive routes
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 login requests per hour
  message: 'Too many login attempts from this IP, please try again after an hour'
});

app.post('/login', loginLimiter, (req, res) => {
  // Handle login
});
```

By implementing rate limiting, you ensure that your Express.js application remains responsive and secure against excessive traffic.
