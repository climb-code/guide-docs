---
title: Authentication & Authorization in Express.js
description: Learn how to implement secure authentication and authorization in your Express.js applications using bcrypt and JSON Web Tokens (JWT).
---

Building secure applications requires a solid understanding of how to identify users and control what they can access. This involves two distinct but related processes: **Authentication** and **Authorization**.

---

## Authentication vs. Authorization

| Concept                    | Definition                                                 | Question it Answers                  |
| :------------------------- | :--------------------------------------------------------- | :----------------------------------- |
| **Authentication (AuthN)** | The process of verifying who a user is (e.g., login).      | "Are you who you say you are?"       |
| **Authorization (AuthZ)**  | The process of verifying what a user has permission to do. | "Do you have permission to do this?" |

---

## 1. Password Hashing with Bcrypt

Never store plain-text passwords in your database. If your database is compromised, all user accounts will be exposed. Instead, use a hashing library like `bcrypt` to store a cryptographically secure hash of the password.

### Installation

```bash
npm install bcrypt
```

### Usage

```javascript
import bcrypt from "bcrypt";

const password = "mysecretpassword";
const saltRounds = 10;

// Hashing a password during registration
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verifying a password during login
const isMatch = await bcrypt.compare(password, hashedPassword);
console.log(isMatch); // true
```

---

## 2. JSON Web Tokens (JWT)

**JWT** is an open standard for securely transmitting information between parties as a JSON object. In Express, it's commonly used for stateless authentication.

### Installation

```bash
npm install jsonwebtoken
```

### Implementing Login

When a user logs in successfully, you generate a token and send it back to them.

```javascript
import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate Token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ token });
});
```

---

## 3. Protecting Routes (Authorization Middleware)

To protect routes, you create a middleware that verifies the JWT provided in the request headers (usually the `Authorization` header).

```javascript
// middleware/auth.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Usage in routes
app.get("/profile", protect, (req, res) => {
  res.json({ message: `Welcome User ${req.user.userId}` });
});
```

---

## 4. Role-Based Access Control (RBAC)

Once authenticated, you can restrict access based on user roles (e.g., `admin`, `user`).

```javascript
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};

// Only admins can access this route
app.delete("/users/:id", protect, authorize("admin"), (req, res) => {
  // Delete logic...
});
```

---

## Best Practices

| Tip                            | Rationale                                                                               |
| :----------------------------- | :-------------------------------------------------------------------------------------- |
| **Use HTTPS**                  | Tokens sent over HTTP can be intercepted via man-in-the-middle attacks.                 |
| **Short Expiration**           | Set short expiration times for tokens (e.g., 15m - 1h) and use refresh tokens.          |
| **Environment Secrets**        | Always store your `JWT_SECRET` in a `.env` file and never commit it.                    |
| **Don't store sensitive info** | Never put passwords or sensitive data in the JWT payload (it's encoded, not encrypted). |

---

> [!IMPORTANT]
> Always use a strong, unique secret for your JWTs. A weak secret can be easily brute-forced, allowing attackers to forge tokens.

> [!TIP]
> Consider using libraries like **Passport.js** for more complex authentication needs, such as OAuth (Google, GitHub login) or session-based auth.

Now that you've secured your application, you should look into **MVC Architecture** to organize your code as it grows!
