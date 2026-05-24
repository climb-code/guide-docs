---
title: Getting Started with Express.js
description: Learn how to set up an Express.js project and create your first web server.
---

# Getting Started with Express.js

Before you can start building with Express.js, you'll need to make sure your environment is properly set up and you understand the basic process of creating an Express server.

## Prerequisites

To use Express, you must have Node.js installed on your system. 

> [!NOTE]
> If you haven't installed Node.js yet, head over to the [official Node.js website](https://nodejs.org/) to download and install it.

## 1. Initializing Your Project

First, create a new directory for your project and navigate into it using your terminal:

```bash
mkdir my-express-app
cd my-express-app
```

Next, initialize a new Node.js project. This command creates a `package.json` file which will keep track of your project's dependencies:

```bash
npm init -y
```

The `-y` flag automatically accepts all default options for the `package.json` file.

## 2. Installing Express

Now that your project is initialized, you can install Express.js via npm (Node Package Manager):

```bash
npm install express
```

This will download Express and add it as a dependency in your `package.json` file.

## 3. Creating Your First Server

Create a new file named `index.js` (or `app.js`) in your project directory. This will be the main entry point for your application.

Add the following code to `index.js` to create a basic web server:

```javascript
// 1. Import the express module
import express from 'express';

// 2. Create an instance of an Express application
const app = express();

// 3. Define the port number
const PORT = 3000;

// 4. Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Express.');
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});
```

> [!IMPORTANT]
> To use `import` syntax, make sure you add `"type": "module"` to your `package.json` file. Otherwise, you'll need to use `const express = require('express');` instead.

## 4. Running the Application

To start your newly created server, run the following command in your terminal:

```bash
node index.js
```

You should see the message `Server is running and listening on http://localhost:3000` logged in your console. 

Open your web browser and navigate to `http://localhost:3000`. You will see "Hello World! Welcome to Express." displayed on the page!
