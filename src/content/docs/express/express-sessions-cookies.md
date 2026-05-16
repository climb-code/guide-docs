---
title: Sessions and Cookies in Express.js
description: Learn how to manage state, sessions, and cookies in Express.js applications.
---

HTTP is a stateless protocol, meaning each request is independent of the others. To maintain state across multiple requests (like keeping a user logged in), we use sessions and cookies.

## Cookies in Express.js

Cookies are small pieces of data stored on the client's browser.

### Setting Cookies

Express provides a built-in `res.cookie()` method to set cookies.

```javascript
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', { 
    maxAge: 900000, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production' 
  });
  res.send('Cookie has been set');
});
```

### Reading Cookies

To read cookies in Express, you need the `cookie-parser` middleware.

```bash
npm install cookie-parser
```

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Welcome back, ${username}`);
});
```

## Sessions in Express.js

Sessions store data on the server and use a cookie (containing a session ID) to associate the client with their server-side data.

### Installation

```bash
npm install express-session
```

### Basic Usage

```javascript
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'your_secret_key', // Used to sign the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 60000 // 1 minute
  }
}));

app.get('/views', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You have visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send('Welcome to this page for the first time!');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Using cookies and sessions allows you to build personalized, stateful applications in Express.js.
