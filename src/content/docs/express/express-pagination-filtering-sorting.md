---
title: Pagination, Filtering, and Sorting in Express.js
description: Master API optimization techniques by implementing pagination, filtering, and sorting in your Express.js REST APIs.
---

When building REST APIs that expose collections of resources (e.g., users, products, or logs), returning all records at once is highly inefficient. As datasets grow, large responses can overload your database, degrade network performance, and crash client applications.

To build production-ready APIs, you must implement three key patterns: **Filtering**, **Sorting**, and **Pagination**.

---

## The Big Picture

A typical query using these features looks like this:

```http
GET /api/products?category=electronics&price[gte]=100&sort=-createdAt&page=2&limit=20
```

This request specifies:
- **Filtering**: Only products in the "electronics" category with a price greater than or equal to $100.
- **Sorting**: Sorted by creation date in descending order (newest first).
- **Pagination**: The second page of results, limiting the response to 20 items.

---

## 1. Filtering

Filtering allows clients to restrict the results based on specific attributes.

### Exact Match Filtering
In Express, query parameters are parsed into `req.query` automatically. For simple matches, you can pass them directly to your database queries:

```javascript
// GET /api/products?category=electronics&brand=Apple
app.get('/api/products', async (req, res) => {
  try {
    const filter = {};
    
    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.brand = req.query.brand;

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Advanced Filtering (Operators)
For range queries (e.g., price greater than 100), Express parses bracket syntax (like `?price[gte]=100`) into a nested object:
`req.query.price` becomes `{ gte: '100' }`.

To integrate this with MongoDB/Mongoose, you can convert these operator keys (e.g., `gte`, `gt`, `lte`, `lt`) into MongoDB operators (e.g., `$gte`, `$gt`, `$lte`, `$lt`):

```javascript
// GET /api/products?price[gte]=100&price[lte]=500
app.get('/api/products', async (req, res) => {
  try {
    // 1. Copy query object
    let queryStr = JSON.stringify(req.query);

    // 2. Replace gte/gt/lte/lt with $gte/$gt/$lte/$lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    const filter = JSON.parse(queryStr);
    
    // 3. Remove pagination and sorting fields from filter
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(field => delete filter[field]);

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 2. Sorting

Sorting defines the order of the returned items. In REST API conventions, prepending a minus sign (`-`) to a field is commonly used to indicate descending order (e.g., `-price`), while the absence of it indicates ascending order (e.g., `price`).

### Mongoose Implementation
In Mongoose, you can chain the `.sort()` method, which accepts a space-separated string of fields (e.g., `sort('price -createdAt')`):

```javascript
// GET /api/products?sort=-price,createdAt
app.get('/api/products', async (req, res) => {
  try {
    let query = Product.find();

    if (req.query.sort) {
      // Convert 'price,-createdAt' to 'price -createdAt'
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // Default fallback sort
      query = query.sort('-createdAt');
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 3. Pagination

Pagination divides the large dataset into smaller, manageable chunks (pages). There are two primary strategies for pagination.

### Strategy Comparison

| Feature | Offset-Based Pagination | Cursor-Based Pagination |
| :--- | :--- | :--- |
| **API Parameter** | `page` & `limit` | `cursor` (usually encoded ID) & `limit` |
| **UX Suitability** | Great for traditional grids (Page 1, 2, 3...) | Perfect for infinite scroll / feeds |
| **Performance** | Degrading performance on large offsets (`SKIP`) | Constant time (`O(1)`) performance |
| **Data Consistency**| Vulnerable to duplicates/skips on active updates | Highly consistent |

---

### A. Offset-Based Pagination (Limit & Skip)

This strategy calculates the offset based on `page` and `limit` parameters.

```javascript
// GET /api/products?page=3&limit=10
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = Product.find().skip(skip).limit(limit);
    const products = await query;

    // Get total items for metadata
    const totalItems = await Product.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

> [!CAUTION]
> **Performance Gotcha**: Under the hood, databases must read all records from the beginning up to the skip offset before discarding them. Using a very large skip (e.g. `.skip(1000000)`) causes severe performance bottlenecks.

---

### B. Cursor-Based Pagination (Keyset Pagination)

Instead of skipping a number of records, cursor pagination works by requesting the next page relative to a specific item (the cursor). 

```javascript
// GET /api/products?limit=10&cursor=65c26b5d9bcf6b8f1025a16d
app.get('/api/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const cursor = req.query.cursor;

    const filter = {};
    if (cursor) {
      // Assuming sorting by ID descending, select items smaller than the cursor ID
      filter._id = { $lt: cursor };
    }

    // Fetch one extra item to check if there is a next page
    const products = await Product.find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1);

    const hasNextPage = products.length > limit;
    if (hasNextPage) {
      products.pop(); // Remove the extra item
    }

    const nextCursor = products.length > 0 ? products[products.length - 1]._id : null;

    res.json({
      pagination: {
        nextCursor,
        hasNextPage,
        limit
      },
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Complete Unified API Route Example

Here is a unified example implementing **Advanced Filtering, Sorting, and Offset Pagination** together inside an Express route:

```javascript
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    // 1. Clone query parameters for filtering
    const queryObj = { ...req.query };
    
    // Excluding special parameters used for execution
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // 2. Format query operators for MongoDB
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));

    // 3. Implement Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort
    }

    // 4. Implement Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    // Crucial: Enforce maximum limits to protect resources
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    query = query.skip(skip).limit(safeLimit);

    // 5. Execute queries in parallel
    const [results, totalCount] = await Promise.all([
      query,
      Product.countDocuments(JSON.parse(queryStr)) // Count matching records only
    ]);

    const totalPages = Math.ceil(totalCount / safeLimit);

    res.json({
      success: true,
      metadata: {
        totalCount,
        totalPages,
        currentPage: page,
        limit: safeLimit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
});

export default router;
```

---

## Best Practices

1. **Enforce Maximum Limits**: Always override requested limits to prevent clients from requesting massive payloads (e.g. `?limit=1000000`). Apply `Math.min(limit, MAX_LIMIT)`.
2. **Database Indexes**: Index the fields that are frequently used in filtering and sorting (e.g., `Product.index({ category: 1, price: -1 })`). Without proper indexing, sorting is extremely expensive.
3. **Select Specific Fields**: Support field limiting (e.g. `?fields=name,price`) to reduce response payloads:
   ```javascript
   if (req.query.fields) {
     const fields = req.query.fields.split(',').join(' ');
     query = query.select(fields);
   }
   ```
4. **Separate Matching Counts**: When using offset pagination, run `countDocuments` with the filtered query object, not the full collection size, so the total count is accurate.
