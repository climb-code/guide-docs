---
title: API Documentation with Swagger in Express.js
description: Learn how to document your Express.js REST APIs using Swagger and OpenAPI specifications.
---

Building a robust API is only half the battle; providing clear, interactive documentation for other developers is just as important. **Swagger** (part of the OpenAPI Initiative) is the industry standard for documenting RESTful APIs.

In this guide, we'll cover how to integrate Swagger into an Express.js application using `swagger-jsdoc` and `swagger-ui-express`.

---

## Why Use Swagger?

- **Interactive Documentation**: Developers can test API endpoints directly from the browser.
- **Standardization**: Uses the OpenAPI Specification (OAS), making your API compatible with many tools.
- **Better Collaboration**: Frontend and Backend teams can align on API contracts early in development.

---

## Getting Started

### Installation

You'll need two packages:
1. `swagger-ui-express`: Serves the Swagger UI from Express.
2. `swagger-jsdoc`: Generates OpenAPI definitions from JSDoc comments in your code.

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

## Configuration

Set up the Swagger definition and initialize the middleware in your main Express file (e.g., `app.js`).

```javascript
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (where your routes are)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## Documenting Your Routes

Use JSDoc comments above your route handlers to define the endpoint's behavior.

**routes/users.js**:
```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Returns an array of user objects.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Saurabh' }]);
});
```

---

## Accessing the Documentation

Once your server is running, navigate to `http://localhost:3000/api-docs` in your browser. You will see a beautiful, interactive dashboard listing all your documented routes.

---

## Key Takeaways

- **Swagger** provides a professional way to document and test APIs.
- **OpenAPI** is the underlying specification that Swagger follows.
- Use **JSDoc comments** to keep your documentation close to the actual code.
- Swagger UI makes it easy for consumers (like frontend developers) to understand your API without reading the source code.

Properly documented APIs are a hallmark of high-quality software development!
