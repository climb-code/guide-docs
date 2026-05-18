---
title: CORS in Express.js
description: Learn how to handle Cross-Origin Resource Sharing (CORS) in your Express.js applications to securely allow or restrict requests from different domains.
---

Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

When you are building an API with Express.js that will be consumed by a frontend application hosted on a different domain or port, you will encounter CORS errors if you do not explicitly configure your Express server to allow it.

## Using the `cors` Middleware

The easiest and most common way to handle CORS in Express is by using the official `cors` middleware package.

### Installation

```bash
npm install cors
```

### Basic Usage (Allow All Origins)

If you want to allow requests from *any* origin (often useful during development or for completely public APIs), you can use the middleware without any options.

```javascript
import express from 'express';
import cors from 'cors';

const app = express();

// Enable All CORS Requests
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'CORS is enabled for all origins!' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Restricting Origins (Recommended)

For production applications, it is highly recommended to restrict which domains can access your API. You can do this by passing an options object to the `cors` middleware.

```javascript
import express from 'express';
import cors from 'cors';

const app = express();

// Configure allowed origins
const corsOptions = {
  origin: 'https://my-frontend-app.com', // Only allow this domain
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply to all routes
app.use(cors(corsOptions));

app.get('/data', (req, res) => {
  res.json({ data: 'Secure data' });
});
```

### Allowing Multiple Origins

You can specify an array of allowed origins or use a function for dynamic origin checking.

```javascript
const allowedOrigins = ['http://localhost:3000', 'https://my-production-app.com'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
```

## Configuring Headers and Methods

You can also specify which HTTP methods and headers are allowed.

```javascript
const corsOptions = {
  origin: 'https://example.com',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));
```

By properly configuring CORS, you ensure that your API is accessible to the frontend applications that need it while protecting it from unauthorized cross-origin requests.
