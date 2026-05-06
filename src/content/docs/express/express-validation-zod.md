---
title: Validation with Zod in Express.js
description: Learn how to use Zod to validate incoming request data in your Express.js applications for better type safety and error handling.
---

When building APIs, you should never trust the data sent by the client. **Input validation** ensures that the data your application receives is in the correct format, type, and range before you process it.

**Zod** is a TypeScript-first schema declaration and validation library that is perfect for this task.

---

## Why Use Zod?

| Feature                | Benefit                                                                 |
| :--------------------- | :---------------------------------------------------------------------- |
| **Type Safety**        | Automatically generates TypeScript types from your schemas.             |
| **Declarative Syntax** | Easy to read and define complex data structures.                        |
| **Informative Errors** | Provides detailed error messages about which fields failed and why.      |
| **Zero Dependencies**  | Lightweight and works in any JavaScript environment.                    |

---

## 1. Installation

Install `zod` using npm or yarn:

```bash
npm install zod
```

---

## 2. Defining a Schema

A **Schema** is a blueprint that defines the structure and constraints of your data.

```javascript
// schemas/user.schema.js
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    age: z.number().min(18).optional(),
  }),
});
```

---

## 3. Creating Validation Middleware

To keep your controllers clean, it's best to handle validation in a reusable middleware.

```javascript
// middleware/validate.js
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errors: error.errors.map((err) => ({
        path: err.path[1],
        message: err.message,
      })),
    });
  }
};
```

---

## 4. Using Validation in Routes

Now, you can apply the validation middleware to any route before the controller logic executes.

```javascript
// routes/user.routes.js
import express from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), (req, res) => {
  // If we reach here, the data is valid!
  const { username, email } = req.body;
  res.status(201).json({ message: `User ${username} registered successfully!` });
});

export default router;
```

---

## 5. Integration with Global Error Handling

Instead of sending responses directly from the middleware, you can pass Zod errors to your global error handler for consistent formatting.

```javascript
// middleware/validate.js (Advanced)
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return next(result.error); // Pass the ZodError to Express error handler
  }

  next();
};
```

---

## Summary of Common Zod Methods

| Method           | Description                                      |
| :--------------- | :----------------------------------------------- |
| `.string()`      | Ensures the value is a string.                   |
| `.number()`      | Ensures the value is a number.                   |
| `.email()`       | Checks if the string is a valid email.           |
| `.min(n)`        | Minimum length for strings or value for numbers. |
| `.max(n)`        | Maximum length for strings or value for numbers. |
| `.optional()`    | Makes the field optional.                         |
| `.boolean()`     | Ensures the value is a boolean.                  |
| `.array(schema)` | Ensures the value is an array of a certain type. |

---

> [!TIP]
> You can use `z.infer<typeof schema>` to extract the TypeScript type from your Zod schema, providing full end-to-end type safety!

> [!IMPORTANT]
> Always place your validation middleware **before** your controllers. This prevents any business logic from running if the input data is invalid.

Now that your data is clean and safe, you can look into **REST API Best Practices** to build robust and scalable endpoints!
