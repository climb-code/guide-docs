---
title: Testing Express.js Applications
description: Learn how to write unit and integration tests for your Express.js applications using Vitest and Supertest.
---

Testing is a fundamental part of building reliable and maintainable Express.js applications. By writing tests, you can ensure that your routes, middleware, and logic work as expected and prevent future regressions.

In this guide, we'll focus on **Integration Testing** using **Vitest** (a fast, modern test runner) and **Supertest** (a library for testing HTTP servers).

---

## Setting Up Your Testing Environment

To get started, you'll need to install `vitest` and `supertest`.

### Installation
```bash
npm install vitest supertest --save-dev
```

### Configure Package.json
Add a test script to your `package.json`:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

## Separating App from Server

For effective testing, it's a best practice to separate your Express `app` definition from the code that starts the server (`app.listen`). This allows you to import the `app` into your tests without actually starting a network server.

**app.js**:
```javascript
const express = require('express');
const app = express();

app.get('/api/greet', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

module.exports = app;
```

**server.js**:
```javascript
const app = require('./app');
app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Writing Your First Test

Create a file named `app.test.js`. We'll use Supertest to make requests to our Express app and Vitest to assert the results.

```javascript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('GET /api/greet', () => {
  it('should return a 200 status and a greeting message', async () => {
    const response = await request(app).get('/api/greet');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});
```

---

## Testing Middleware and Error Handling

You can also test how your app handles invalid inputs or errors.

```javascript
describe('Error Handling', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
  });
});
```

---

## Mocking Databases

When testing, you often want to avoid making real database calls. You can use Vitest's mocking capabilities to simulate database responses.

```javascript
import { vi } from 'vitest';
import User from './models/user';

vi.mock('./models/user');

describe('GET /api/users', () => {
  it('should return a list of users from the mock', async () => {
    User.find.mockResolvedValue([{ name: 'Saurabh' }]);
    
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Saurabh' }]);
  });
});
```

---

## Key Takeaways

- **Vitest** is a modern and fast alternative to Jest.
- **Supertest** allows you to test HTTP endpoints without running a live server.
- **Export your `app` instance** separately from your `listen()` call to make it testable.
- Use **Mocks** to isolate your tests from external dependencies like databases.

Testing ensures that your Express application remains robust as it grows!
