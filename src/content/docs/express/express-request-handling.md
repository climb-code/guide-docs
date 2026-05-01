---
title: Express.js Request Handling
description: Learn how to handle incoming requests and send responses in Express.js, including working with bodies, params, queries, and headers.
---

In Express.js, handling requests and responses is the core of your application logic. Every route handler receives a **Request** (`req`) and **Response** (`res`) object, which provide the methods and properties needed to process data and talk back to the client.

---

## The Request Object (`req`)

The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.

### 1. Request Body (`req.body`)

Contains key-value pairs of data submitted in the request body. By default, it is `undefined` and is populated when you use body-parsing middleware such as `express.json()` or `express.urlencoded()`.

```javascript
app.use(express.json()); // Middleware to parse JSON bodies

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  console.log(`Creating user: ${name} (${email})`);
  res.status(201).send("User created");
});
```

### 2. Route Parameters (`req.params`)

Used to capture values from the URL path. These are defined with a colon (`:`) in the route path.

```javascript
// URL: /users/42
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Fetching data for user ${userId}`);
});
```

### 3. Query Strings (`req.query`)

Contains the result of the parsed URL query string (everything after the `?`).

```javascript
// URL: /search?term=javascript&limit=10
app.get("/search", (req, res) => {
  const { term, limit } = req.query;
  res.send(`Searching for "${term}" with a limit of ${limit}`);
});
```

### 4. Headers (`req.headers` or `req.get()`)

You can access request headers to check things like `Content-Type`, `Authorization`, or custom headers.

```javascript
app.get("/admin", (req, res) => {
  const apiKey = req.get("x-api-key");
  if (!apiKey) {
    return res.status(401).send("API Key missing");
  }
  res.send("Welcome to the admin panel");
});
```

---

## The Response Object (`res`)

The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

### 1. Sending Content

- `res.send()`: Sends a basic response (string, object, or buffer).
- `res.json()`: Sends a JSON response. This is the preferred way for APIs.
- `res.end()`: Ends the response process without sending any data.

```javascript
app.get("/api/info", (req, res) => {
  res.json({
    version: "1.0.0",
    status: "online",
  });
});
```

### 2. Setting Status Codes

You can chain `.status()` before sending a response to set the HTTP status code.

```javascript
app.get("/not-found", (req, res) => {
  res.status(404).send("Page not found");
});
```

### 3. Redirecting

Use `res.redirect()` to send a client to a different URL.

```javascript
app.get("/old-path", (req, res) => {
  res.redirect(301, "/new-path"); // 301 is Permanent Redirect
});
```

### 4. Sending Files

- `res.sendFile()`: Sends a file at the given path.
- `res.download()`: Prompts the client to download a file.

```javascript
import path from "path";

app.get("/report", (req, res) => {
  const filePath = path.resolve("docs/report.pdf");
  res.download(filePath, "monthly-report.pdf");
});
```

---

## Common Response Methods Summary

| Method           | Description                       |
| :--------------- | :-------------------------------- |
| `res.download()` | Prompt a file to be downloaded.   |
| `res.end()`      | End the response process.         |
| `res.json()`     | Send a JSON response.             |
| `res.redirect()` | Redirect a request.               |
| `res.render()`   | Render a view template.           |
| `res.send()`     | Send a response of various types. |
| `res.sendFile()` | Send a file as an octet stream.   |
| `res.status()`   | Set the response status code.     |

---

> [!IMPORTANT]
> You can only send **one** response for each client request. If you attempt to call `res.send()` or `res.json()` multiple times in a single handler, you will encounter the "Headers already sent" error. Always use `return` to exit the handler after sending a response.

```javascript
app.get("/check", (req, res) => {
  if (condition) {
    return res.send("Condition met"); // Correct: returns and stops execution
  }
  res.send("Condition not met");
});
```

Now you have a solid understanding of how to manage data flow between the client and your Express.js server!
