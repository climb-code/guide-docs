---
title: Security Best Practices
description: Essential tips to keep your Node.js applications secure.
---

# Security Best Practices

Security should never be an afterthought. Here are the top practices for securing your Node.js apps.

## 1. Use Helmet
Helmet helps secure your Express apps by setting various HTTP headers.
```bash
npm install helmet
```
```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 2. Environment Variables
Never hardcode secrets (API keys, passwords) in your code. Use `.env` files.
```javascript
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
```

## 3. Prevent SQL Injection & NoSQL Injection
Always use parameterized queries or ODMs/ORMs like Mongoose or Sequelize.
```javascript
// BAD
const query = `SELECT * FROM users WHERE id = ${req.body.id}`;

// GOOD
const query = { text: 'SELECT * FROM users WHERE id = $1', values: [req.body.id] };
```

## 4. Rate Limiting
Prevent Brute Force and DoS attacks by limiting the number of requests a user can make.
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

> [!CAUTION]
> Always run `npm audit` regularly to check for vulnerabilities in your dependencies.
