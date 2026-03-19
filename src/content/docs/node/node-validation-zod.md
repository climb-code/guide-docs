---
title: Validation with Zod in Node.js
description: Using Zod for schema validation and type safety in your Node.js applications.
---

Validation is critical for ensuring that the data entering your application meets your expectations. Zod is a TypeScript-first schema declaration and validation library.

## Why Zod?
- **Zero dependencies**: Extremely lightweight.
- **TypeScript first**: Automatically infers types from your schemas.
- **Concise API**: Easy to read and write.
- **Works with JS**: Full support for JavaScript environments.

## Installation
```bash
npm install zod
```

## Basic Usage

```javascript
const { z } = require('zod');

// Define a schema
const UserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().optional(),
});

// Parse data
try {
  const result = UserSchema.parse({
    username: 'johndoe',
    email: 'john@example.com',
  });
  console.log('Valid data:', result);
} catch (e) {
  console.error('Validation failed:', e.errors);
}
```

## Using with Express Middleware
Zod is excellent for validating request bodies, query parameters, and headers.

```javascript
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    return res.status(400).json(e.errors);
  }
};

app.post('/user', validate(UserSchema), (req, res) => {
  res.send('User created');
});
```

## Features
- **Transformations**: Transform data while validating (e.g., trim strings).
- **Default values**: Provide defaults if a field is missing.
- **Custom Validations**: Implement complex logic with `refine()`.
- **Error Messages**: Customize error messages for better user experience.
