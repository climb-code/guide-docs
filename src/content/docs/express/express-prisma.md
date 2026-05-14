---
title: Express.js with SQL (Prisma ORM)
description: Learn how to connect your Express.js application to SQL databases like PostgreSQL or MySQL using the Prisma ORM.
---

While MongoDB is popular for its flexibility, many enterprise applications require the strong consistency and relational capabilities of SQL databases (like PostgreSQL, MySQL, or SQLite). **Prisma** is a modern Next-generation ORM that makes working with SQL databases in Express.js easy and type-safe.

In this guide, we'll set up Prisma with Express and perform basic CRUD operations.

---

## Why Use Prisma?

- **Type Safety**: Automatically generates TypeScript types based on your database schema.
- **Auto-generated Migrations**: Easily manage changes to your database structure.
- **Intuitive API**: Write queries in plain JavaScript/TypeScript that feel natural.
- **Prisma Studio**: A built-in GUI to view and edit your data.

---

## Getting Started

### 1. Installation

First, install the Prisma CLI as a development dependency:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 2. Initialize Prisma

Initialize Prisma in your project. This creates a `prisma` folder with a `schema.prisma` file.

```bash
npx prisma init
```

By default, it sets up SQLite (great for learning). You can change the `provider` in `schema.prisma` to `postgresql` or `mysql` later.

---

## Defining Your Schema

Open `prisma/schema.prisma` and define your data model.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

After defining your schema, run a migration to create the database tables:

```bash
npx prisma migrate dev --name init
```

---

## Using Prisma in Express

Create a single instance of the Prisma Client and use it in your routes.

**prismaClient.js**:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
```

**routes/users.js**:
```javascript
const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true } // Fetch related posts
  });
  res.json(users);
});

// Create a user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email }
  });
  res.json(user);
});

module.exports = router;
```

---

## Key Takeaways

- **Prisma** is a powerful ORM for SQL databases in Node.js.
- The **schema.prisma** file is the single source of truth for your database structure.
- **Prisma Client** provides a type-safe API for querying data.
- **Migrations** ensure your database stays in sync with your code.

Using Prisma with Express.js brings the power of relational databases to your backend with a modern, developer-friendly experience!
