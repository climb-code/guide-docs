---
title: Testing in Node.js
description: Learn how to test your Node.js applications and Express APIs using Jest and Supertest.
---

# Testing in Node.js

Testing is crucial for building reliable and maintainable applications. In Node.js, [Jest](https://jestjs.io/) is the most popular testing framework due to its simplicity and powerful features.

## 1. Setting Up Jest
First, install Jest and Supertest (for API testing):
```bash
npm install --save-dev jest supertest
```

Add a test script to your `package.json`:
```json
"scripts": {
  "test": "jest"
}
```

## 2. Unit Testing
Unit tests focus on individual functions or logic. Create a file named `sum.test.js`:

```javascript
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 3. Testing Express APIs with Supertest
Supertest allows you to test HTTP requests to your Express app without actually starting the server on a port.

```javascript
import request from 'supertest';
import express from 'express';

const app = express();
app.get('/user', (req, res) => {
  res.status(200).json({ name: 'john' });
});

describe('GET /user', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.name).toBe('john');
  });
});
```

## 4. Best Practices
- **Isolation**: Each test should be independent and not rely on the state of other tests.
- **Coverage**: Aim for high test coverage, but focus on critical business logic first.
- **Mocking**: Use `jest.mock()` to replace complex dependencies (like database calls) with simple mock functions.

> [!IMPORTANT]
> Always run your tests in a separate environment (e.g., `NODE_ENV=test`) to avoid accidental data mutation in development or production databases.
