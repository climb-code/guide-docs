---
title: REST API Design Best Practices
description: Key principles and conventions for building clean and predictable RESTful APIs.
---

# REST API Design Best Practices

Representational State Transfer (REST) provides a standard set of rules to build predictable web APIs. When building APIs in Node.js, adhering to these conventions makes your API much easier for frontend developers and other services to consume.

## 1. Use Nouns (Resources) instead of Verbs
The endpoint URL should represent the resource you are interacting with. Use the HTTP method to define the action.

**❌ Bad:**
- `GET /getAllUsers`
- `POST /updateUser/123`
- `POST /deleteUser/123`

**✅ Good:**
- `GET /users` (Retrieve all users)
- `POST /users` (Create a new user)
- `PUT /users/123` (Update user 123)
- `DELETE /users/123` (Delete user 123)

## 2. Pluralize Resource Names
Keep resource names plural for consistency.
- **✅ Good:** `/users/123`, `/products/456`
- **❌ Bad:** `/user/123`, `/product/456`

## 3. Nest Resources Logically
If a resource belongs to another resource, reflect this in the URL.
- `GET /users/123/orders` (Get all orders belonging to user 123)
- `GET /users/123/orders/456` (Get order 456 belonging to user 123)

## 4. Return Proper HTTP Status Codes
Don't always return `200 OK` if something failed or a new resource was created.

- **200 OK**: Successful `GET` or `PUT`.
- **201 Created**: Successful `POST` (resource created).
- **204 No Content**: Successful `DELETE` (no response body).
- **400 Bad Request**: Client sent invalid data (e.g., validation failed).
- **401 Unauthorized**: User is not authenticated.
- **403 Forbidden**: User is authenticated but lacks permissions.
- **404 Not Found**: Resource does not exist.
- **500 Internal Server Error**: Your Node.js code threw an unexpected error.

## 5. Implement Pagination, Filtering, and Sorting
When returning lists of data, never return the entire database. Use query parameters.

```
GET /products?category=electronics&sort=price:asc&page=2&limit=50
```

```javascript
app.get('/api/products', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category;
  
  // Database lookup logic...
});
```

## 6. Version your API
APIs change over time. Prevent breaking frontend applications by versioning your API URL right from the start.

- **✅ Good:** `https://api.myapp.com/v1/users`
- **✅ Good:** `https://myapp.com/api/v1/users`

If you introduce a breaking change later, you can create `v2` without disrupting `v1` users.
