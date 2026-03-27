---
title: Session Management & Cookies
description: Implementing traditional cookie-based sessions in Node.js applications.
---

# Session Management & Cookies

While JSON Web Tokens (JWT) are popular for modern APIs, traditional Session/Cookie-based authentication is still the standard approach for server-rendered web applications.

## How it works
1. The user logs in.
2. The server creates a "Session Object" in its memory/database with a unique Session ID.
3. The server sends the Session ID to the user's browser in an HTTP Cookie.
4. On subsequent requests, the browser automatically sends the cookie back, and the server looks up the Session ID to identify the user.

## Implementation with Express

We use `express-session` for session handling.

### 1. Installation
```bash
npm install express-session
```

### 2. Basic Configuration
```javascript
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'my-super-secret-key',     // Used to sign the session ID cookie
  resave: false,                     // Do not save session if unmodified
  saveUninitialized: false,          // Do not create session until something stored
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,     // 1 day
    secure: process.env.NODE_ENV === 'production', // true requires HTTPS
    httpOnly: true                   // Prevents client-side JS from reading the cookie
  }
}));
```

### 3. Using Sessions
Once configured, you can attach any data to the `req.session` object.

```javascript
// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '123') {
    req.session.userId = 'admin123'; // Store data in session
    res.send('Logged in successfully');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Protected Route
app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.send(`Welcome User ID: ${req.session.userId}`);
  } else {
    res.status(401).send('Please log in first');
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid'); // connect.sid is the default cookie name
    res.send('Logged out');
  });
});
```

> [!WARNING]
> By default, `express-session` stores sessions in Node.js memory (`MemoryStore`). This is strictly for development. In production, every time your server restarts, all users will be logged out. You must use an external session store like Redis (`connect-redis`) or a database (`connect-mongo` / `connect-pg-simple`) in production.
