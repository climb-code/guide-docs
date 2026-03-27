---
title: Caching with Redis
description: Optimizing Node.js APIs by implementing Redis for in-memory caching.
---

# Caching with Redis

Caching is a strategy to improve performance by storing frequently accessed data in a fast, temporary storage layer (like memory) rather than fetching it from a slower database or external API on every request.

[Redis](https://redis.io/) is the most popular in-memory data store used for caching with Node.js.

## Why Use Caching?
- Drastically reduces database load.
- Decreases response times (from hundreds of milliseconds to under 10ms).
- Reduces costs on external API usage.

## 1. Setting up Redis in Node.js

Install the official Redis client:
```bash
npm install redis
```

### Connecting to Redis
```javascript
import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
```

## 2. Basic Caching Implementation

Here is an example caching the result of a slow database query or external API call.

```javascript
import express from 'express';
// ... redis client connection setup here ...

const app = express();

app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  // 1. Check if the data is in the cache
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    console.log("Serving from Cache");
    return res.json(JSON.parse(cachedData));
  }

  // 2. If not in cache, fetch from Database
  console.log("Serving from Database");
  const user = await database.findUserById(userId); // Simulated DB call

  if (!user) return res.status(404).send("Not found");

  // 3. Store the result in Redis for future requests (Expires in 3600 seconds)
  await client.setEx(cacheKey, 3600, JSON.stringify(user));

  res.json(user);
});
```

> [!TIP]
> Always set an expiration (TTL - Time to Live) on your cached data using `setEx`. If you don't, your Redis memory will eventually fill up with stale data.
