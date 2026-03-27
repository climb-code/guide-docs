---
title: Rate Limiting
description: Securing Node.js APIs from brute-force and DDoS attacks using rate limiting.
---

# Rate Limiting & Throttling

Rate limiting restricts the number of requests a client (usually identified by their IP address) can make to your server within a specific time window. 

## Why is it important?
- Prevents Denial of Service (DDoS) attacks.
- Stops brute-force login attempts.
- Ensures fair usage for public APIs.
- Controls server costs.

## Implementation with `express-rate-limit`

The easiest way to add rate limiting in Express is using the `express-rate-limit` middleware.

### 1. Installation
```bash
npm install express-rate-limit
```

### 2. Global Rate Limiting
Apply a limit to all requests across your entire application.

```javascript
import express from 'express';
import { rateLimit } from 'express-rate-limit';

const app = express();

// Define the limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `windowMs`
  standardHeaders: 'draft-7', // Draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
```

### 3. Route-Specific Rate Limiting
Often, you want stricter limits on sensitive routes like login or password reset.

```javascript
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 5, // Limit each IP to 5 login requests per minute
  message: 'Too many login attempts, try again later.'
});

// Apply to a specific route
app.post('/auth/login', loginLimiter, (req, res) => {
  // Login logic here
});
```

> [!NOTE]
> By default, `express-rate-limit` stores request counts in memory. If you use clustered Node.js (via PM2) or multiple server instances, you should use an external store like Redis (`rate-limit-redis`) to share the limits across all your Node processes.
