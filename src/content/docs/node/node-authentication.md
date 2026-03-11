---
title: Authentication in Node.js
description: Implementing secure authentication using JWT and Passport.js.
---

# Authentication in Node.js

Authentication is the process of verifying who a user is. In modern Node.js applications, JSON Web Tokens (JWT) are commonly used for stateless authentication.

## 1. JWT (JSON Web Tokens)
JWTs allow you to securely transmit information between parties as a JSON object.

### Basic Workflow
1. User logs in with credentials.
2. Server verifies credentials and signs a JWT.
3. Server sends the JWT back to the client.
4. Client sends the JWT in the `Authorization` header for subsequent requests.

### Implementation Example
```javascript
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-very-secret-key';

// Signing a token
const token = jwt.sign({ id: 123, username: 'dev' }, SECRET_KEY, { expiresIn: '1h' });

// Verifying a token
try {
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log(decoded.username); // 'dev'
} catch (err) {
  console.log('Invalid token');
}
```

## 2. Passport.js
[Passport](http://www.passportjs.org/) is an authentication middleware for Node.js. It is extremely flexible and supports "strategies" like Local, Google, GitHub, etc.

### Using Passport-Local
```javascript
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

## 3. Session vs. Token-based Auth
- **Sessions**: Server-side storage. Good for web apps where the server can manage state.
- **Tokens (JWT)**: Stateless. Good for APIs and mobile apps as the server doesn't need to store session data.

> [!CAUTION]
> Never store sensitive information like passwords in plain text. Always hash them using libraries like `bcrypt` before saving to your database.
