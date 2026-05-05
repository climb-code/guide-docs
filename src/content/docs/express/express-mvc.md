---
title: MVC Architecture in Express.js
description: Learn how to organize your Express.js application using the Model-View-Controller (MVC) design pattern for better maintainability and scalability.
---

As your Express.js application grows, putting all your routes and logic in a single `app.js` file becomes unmanageable. The **Model-View-Controller (MVC)** pattern is a software architectural design that separates an application into three main logical components.

---

## What is MVC?

| Component      | Responsibility                                             | Express Implementation                    |
| :------------- | :--------------------------------------------------------- | :---------------------------------------- |
| **Model**      | Manages data logic and database interactions.              | Mongoose Schemas and Models.              |
| **View**       | Handles the presentation layer (UI).                       | Template engines (EJS) or JSON responses. |
| **Controller** | Processes requests, executes logic, and returns responses. | Functions that handle `(req, res)`.       |

---

## Recommended Folder Structure

A typical Express MVC project structure looks like this:

```text
project-root/
├── controllers/      # Route logic
├── models/           # Database schemas
├── routes/           # URL definitions
├── middleware/       # Custom middleware
├── config/           # Database & env config
└── app.js            # Entry point
```

---

## 1. The Model (Data)

The Model represents the data structure. It interacts with the database.

```javascript
// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model("User", userSchema);
```

---

## 2. The Controller (Logic)

The Controller contains the functions that handle the business logic for each route. It talks to the Model and sends data back to the View.

```javascript
// controllers/user.controller.js
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

---

## 3. The Routes (URLs)

Routes define the endpoints of your application and map them to specific controller functions.

```javascript
// routes/user.routes.js
import express from "express";
import { getAllUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
```

---

## 4. Connecting Everything in `app.js`

Finally, you import and use the routes in your main application file.

```javascript
// app.js
import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

// Use the routes
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## Benefits of MVC

| Benefit                    | Description                                                             |
| :------------------------- | :---------------------------------------------------------------------- |
| **Separation of Concerns** | Logic is isolated, making it easier to debug and test.                  |
| **Reusability**            | Models and Controllers can be reused across different parts of the app. |
| **Scalability**            | Multiple developers can work on different components simultaneously.    |
| **Maintainability**        | Finding and fixing code is faster because of the organized structure.   |

---

> [!TIP]
> While MVC is powerful, don't over-engineer small projects. For very simple APIs, a flatter structure might be more efficient.

> [!IMPORTANT]
> Always keep your controllers "thin." This means moving complex business logic into separate **Service** layers if your application logic becomes too complicated.

Now that you've organized your application, you should look into **Validation with Zod** to ensure the data coming into your controllers is clean and safe!
