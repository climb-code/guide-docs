---
title: API Versioning in Express.js
description: Learn how to design and implement API versioning in Express.js using URL paths, custom headers, and query parameters.
---

API versioning is the practice of managing changes to an API and ensuring that those changes do not break existing client integrations. As your backend services evolve, versioning allows you to introduce new features or change behaviors while maintaining backward compatibility for older clients.

---

## Why Version an API?

When you change an API's contract (e.g., renaming fields, changing response formats, or deleting endpoints), any client relying on the old contract will break. 

Versioning helps:
- Prevent downtime or errors for older client applications.
- Allow frontend and backend teams to develop independently.
- Provide a smooth migration path for developers to adopt newer versions.

---

## Versioning Strategies

There are three primary strategies for versioning RESTful APIs in Express.js:

| Strategy | Example | Cacheability | URL Cleanliness |
| :--- | :--- | :--- | :--- |
| **URL Path** | `/api/v1/users` | **Excellent** (Unique URLs) | Simple but verbose |
| **Custom Header** | `X-API-Version: 2` | **Requires Vary Header** | Clean URLs |
| **Query Parameter** | `/api/users?version=2` | **Good** | Less semantic |

---

## 1. URL Path-Based Versioning (Recommended)

This is the most common and standard way of versioning APIs. The version number is embedded directly in the path.

### Project Structure
To keep your project organized, separate your route folders by version:

```text
src/
├── routes/
│   ├── v1/
│   │   └── users.js
│   └── v2/
│       └── users.js
└── app.js
```

### Route Definitions
Define the route handler for version 1 (`src/routes/v1/users.js`):

```javascript
// src/routes/v1/users.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    version: 'v1',
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

export default router;
```

Define the updated handler for version 2 (`src/routes/v2/users.js`) with structured name objects:

```javascript
// src/routes/v2/users.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    version: 'v2',
    users: [
      { id: 1, firstName: 'Alice', lastName: 'Smith' },
      { id: 2, firstName: 'Bob', lastName: 'Jones' }
    ]
  });
});

export default router;
```

### Wiring Up Routers
In your main application file, mount the routers onto their respective versioned paths:

```javascript
// src/app.js
import express from 'express';
import v1UsersRouter from './routes/v1/users.js';
import v2UsersRouter from './routes/v2/users.js';

const app = express();

app.use(express.json());

// Mount routers to versioned paths
app.use('/api/v1/users', v1UsersRouter);
app.use('/api/v2/users', v2UsersRouter);

app.listen(3000, () => {
  console.log('API Server running on port 3000');
});
```

---

## 2. Custom Header-Based Versioning

In this approach, clients request a specific version by sending an HTTP header (e.g., `X-API-Version` or `Accept`).

### Dynamic Routing Middleware
You can write custom middleware to dynamically route requests based on the header value:

```javascript
import express from 'express';
import v1UsersRouter from './routes/v1/users.js';
import v2UsersRouter from './routes/v2/users.js';

const app = express();

// Middleware to dynamically select the router version
const apiVersioningMiddleware = (req, res, next) => {
  const version = req.headers['x-api-version'] || '1';

  // Attach version to req object for logging or downstream use
  req.apiVersion = version;

  if (version === '1') {
    return v1UsersRouter(req, res, next);
  } else if (version === '2') {
    return v2UsersRouter(req, res, next);
  } else {
    res.status(400).json({ error: `Unsupported API version: ${version}` });
  }
};

// Mount the versioning middleware to a single unversioned endpoint
app.use('/api/users', apiVersioningMiddleware);
```

> [!IMPORTANT]
> When using header-based versioning, make sure to set the `Vary: X-API-Version` HTTP header in your responses. This tells intermediate caches (like CDNs) to store different copies of the response depending on the version header requested.

---

## 3. Query Parameter-Based Versioning

This strategy reads the version from a query string parameter, such as `?v=2` or `?version=2`.

```javascript
app.get('/api/users', (req, res, next) => {
  const version = req.query.version || '1';

  if (version === '1') {
    res.json({ version: 'v1', data: 'V1 User List' });
  } else if (version === '2') {
    res.json({ version: 'v2', data: 'V2 User List' });
  } else {
    res.status(400).json({ error: 'Invalid API version specified' });
  }
});
```

---

## Best Practices for API Versioning

1. **Keep Version Numbers Simple**: Use major numbers (like `v1`, `v2`) instead of granular SemVer numbers (like `v1.2.3`) in URLs. Minor patches should not introduce breaking changes and therefore don't need a new URL.
2. **Set a Default Version**: If a client makes a request without specifying a version (especially in header or query systems), default to the oldest active version to avoid breaking them, or return a client error directing them to specify one.
3. **Deprecate Gracefully**: When phasing out an old API version, communicate deprecation to clients using headers like `Sunset` and standard deprecation notices in your documentation:
   ```javascript
   app.use('/api/v1', (req, res, next) => {
     res.setHeader('Sunset', 'Wed, 11 Nov 2026 23:59:59 GMT');
     res.setHeader('Deprecation', 'true');
     next();
   });
   ```
4. **Document Each Version**: Keep your API docs (e.g., Swagger or OpenAPI specifications) updated for every active version so clients know exactly what each version supports.
