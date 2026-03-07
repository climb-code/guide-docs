---
title: Databases & Performance
description: Connecting to databases and optimizing your Node.js application.
---

# Databases & Performance

## 1. Working with Databases
Node.js works perfectly with both SQL and NoSQL databases.

### SQL (PostgreSQL/MySQL)
Use drivers like `pg` or ORMs like `Sequelize` / `Prisma`.
```javascript
const { Pool } = require('pg');
const pool = new Pool();
const result = await pool.query('SELECT * FROM users');
```

### NoSQL (MongoDB)
Use `Mongoose` for a structured schema approach.
```javascript
const mongoose = require('mongoose');
const User = mongoose.model('User', { name: String });
const users = await User.find();
```

## 2. Performance Optimization
- **Clustering**: Scale your app to use all CPU cores.
- **Caching**: Use Redis to store frequently accessed data.
- **Compression**: Use Gzip compression for responses.

```javascript
const compression = require('compression');
app.use(compression());
```

> [!TIP]
> Use `PM2` in production to manage your Node.js processes and keep them alive.
