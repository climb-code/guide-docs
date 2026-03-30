---
title: MVC Architecture in Node.js
description: A guide to understanding and implementing the Model-View-Controller (MVC) pattern in Node.js applications.
---

# MVC Architecture in Node.js

The Model-View-Controller (MVC) is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. It separates the internal representations of information from the ways information is presented to and accepted from the user.

## Core Components

1. **Model:** Represents the data and business logic of the application. Models are responsible for retrieving, storing, and updating data, often interacting with a database.
2. **View:** Represents the user interface and presentation logic. It dictates how the data is displayed to the user. In Node.js server-side rendered apps, this could be templates (EJS, Pug).
3. **Controller:** Acts as an interface between Model and View components to process all the business logic and incoming requests, manipulate data using the Model component and interact with the Views to render the final output.

## Implementing MVC with Express

When building an application using Express, applying the MVC pattern helps to keep your codebase organized.

### 1. The Model (Models)

The Model handles the data logic. For example, using Mongoose with MongoDB:

```javascript
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('User', userSchema);
```

### 2. The Controller (Controllers)

The Controller handles incoming requests and orchestrates the model and view.

```javascript
// controllers/userController.js
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### 3. The Routes (Router)

While not strictly part of the classic MVC acronym, routes map incoming HTTP requests to specific controller actions.

```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Map the GET request to the controller function
router.get('/', userController.getAllUsers);

module.exports = router;
```

### 4. Tying it together in App.js

```javascript
// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Mount the user routes
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

By separating concerns, MVC makes applications substantially easier to maintain, scale, and test.
