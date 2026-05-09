---
title: Security Best Practices in Express.js
description: Essential security practices to protect your Express.js applications from common vulnerabilities like XSS, CSRF, and SQL Injection.
---

Security is a critical aspect of web development. As an Express.js developer, you are responsible for ensuring that your application is resilient against common attacks.

In this guide, we'll cover essential security measures, including using **Helmet**, managing **CORS**, and implementing **Rate Limiting**.

---

## 1. Use Helmet to Secure HTTP Headers

[Helmet](https://helmetjs.github.io/) is a middleware that helps secure your Express apps by setting various HTTP headers. It’s a "quick win" that provides protection against several well-known web vulnerabilities.

### Installation
```bash
npm install helmet
```

### Usage
```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// Use Helmet middleware
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Secure Hello World');
});
```

Helmet sets headers like `Content-Security-Policy`, `X-Frame-Options` (to prevent clickjacking), and `X-Content-Type-Options`.

---

## 2. Implement Rate Limiting

Rate limiting prevents "brute-force" attacks and Denial of Service (DoS) by limiting the number of requests a client can make in a given timeframe.

### Installation
```bash
npm install express-rate-limit
```

### Usage
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiter to all requests
app.use(limiter);
```

---

## 3. Configure CORS (Cross-Origin Resource Sharing)

If your API is accessed by a frontend on a different domain, you must configure CORS properly. Avoid using `*` (allow all) in production.

### Installation
```bash
npm install cors
```

### Usage
```javascript
const cors = require('cors');

const corsOptions = {
  origin: 'https://your-trusted-frontend.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 4. Protect Against Injection

Always validate and sanitize user input to prevent SQL Injection or NoSQL Injection.
- Use **parameterized queries** or **ORMs/ODMs** like Mongoose (which sanitizes queries by default).
- Never trust user input. Use libraries like `express-validator` or `zod`.

---

## 5. Other Essential Practices

- **Use HTTPS**: Always serve your application over TLS (HTTPS).
- **Environment Variables**: Never hardcode secrets (API keys, DB URIs) in your code. Use `.env` files.
- **Hide Server Info**: Express sets the `X-Powered-By: Express` header by default. Helmet removes this, but you can also do it manually:
  ```javascript
  app.disable('x-powered-by');
  ```
- **Dependency Audits**: Regularly run `npm audit` to check for vulnerabilities in your dependencies.

---

## Key Takeaways

- **Helmet** is essential for setting secure HTTP headers.
- **Rate limiting** protects against brute-force and DoS attacks.
- **CORS** should be restricted to trusted origins.
- **Sanitization** is the best defense against injection attacks.
- Security is a continuous process, not a one-time task.

By following these practices, you significantly reduce the attack surface of your Express.js application!
