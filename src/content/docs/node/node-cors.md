---
title: CORS in Node.js
description: Understanding Cross-Origin Resource Sharing (CORS) and configuring it in Express.
---

# CORS (Cross-Origin Resource Sharing)

## What is CORS?
CORS is a security feature implemented by browsers that prevents a malicious website from making requests to a different domain on behalf of the user. By default, browsers block cross-origin HTTP requests initiated from scripts (like `fetch` or `axios`).

## Why is it needed in Express?
If your frontend application (e.g., React on `http://localhost:5173`) tries to access your Express API (e.g., `http://localhost:3000`), the browser will block the request unless your API explicitly tells the browser that it's allowed.

## Setting up CORS in Express

The easiest way to configure CORS in Express is by using the `cors` package.

### 1. Install the package
```bash
npm install cors
```

### 2. Basic Configuration (Allow All)
```javascript
import express from 'express';
import cors from 'cors';

const app = express();

// This allows all domains to access your API (not recommended for production)
app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Success' });
});

app.listen(3000, () => console.log('Server running'));
```

### 3. Strict Configuration (Production Use)
```javascript
import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://my-frontend.com', // Only allow requests from this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies to be sent along with the request
};

app.use(cors(corsOptions));
```

> [!CAUTION]
> Using `app.use(cors())` without any configuration allows any external website to make requests to your API. Always restrict `origin` in production!
