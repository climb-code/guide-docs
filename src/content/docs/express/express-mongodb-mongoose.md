---
title: Express.js with MongoDB and Mongoose
description: Learn how to connect your Express.js application to a MongoDB database using the Mongoose ODM.
---

Integrating a database is essential for building real-world applications that persist data. **MongoDB** is a popular NoSQL database, and **Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data.

---

## Getting Started

First, you need to install `mongoose` in your project:

```bash
npm install mongoose
```

---

## Connecting to MongoDB

You can connect to MongoDB using `mongoose.connect()`. It is common practice to store your connection string in an environment variable.

```javascript
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb://localhost:27017/my_database";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Defining a Schema and Model

A **Schema** defines the structure of the document, default values, validators, etc., while a **Model** provides an interface to the database for creating, querying, updating, and deleting records.

```javascript
// user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
```

---

## CRUD Operations

Once you have a model, you can perform CRUD (Create, Read, Update, Delete) operations.

### 1. Create (POST)

```javascript
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### 2. Read (GET)

```javascript
// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. Update (PUT/PATCH)

```javascript
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, // Returns the modified document
      runValidators: true // Ensures updates follow schema rules
    });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### 4. Delete (DELETE)

```javascript
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Best Practices

| Tip | Rationale |
| :--- | :--- |
| **Use Environment Variables** | Never hardcode your MongoDB URI; use `.env` files for security. |
| **Centralize Models** | Store your schemas in a dedicated `models/` directory. |
| **Validate Data** | Use Mongoose's built-in validation or libraries like `Joi` or `Zod`. |
| **Use Async/Await** | Mongoose operations are asynchronous; use `async/await` for cleaner code. |
| **Graceful Shutdown** | Close the Mongoose connection when the application stops. |

---

> [!TIP]
> Always wrap your database operations in `try...catch` blocks or use a middleware like `express-async-handler` to handle potential database errors gracefully.

Next, you might want to look into **MVC Architecture** to better organize your routes, controllers, and models!
