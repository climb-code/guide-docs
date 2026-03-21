---
title: Crypto & Security
description: Using the built-in crypto module for hashing and encryption.
---

# Crypto & Security

Node.js provides a powerful built-in `crypto` module that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

## 1. Hashing (One-way)
Hashing is used to securely store passwords. You should never store passwords in plain text.

### Using `crypto.scrypt`
While `bcrypt` is a popular third-party library, Node.js has built-in support for `scrypt`.

```javascript
const crypto = require('crypto');

const password = 'myPassword123';
const salt = crypto.randomBytes(16).toString('hex');

crypto.scrypt(password, salt, 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex')); // Stored hash
});
```

## 2. Encryption & Decryption (Two-way)
Use encryption when you need to store data securely but also need to retrieve the original value later.

```javascript
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const hw = encrypt("Hello World!");
console.log(hw);
console.log(decrypt(hw));
```

## 3. Generating Random Tokens
For session IDs, password reset tokens, or API keys, use `crypto.randomBytes`.

```javascript
const token = crypto.randomBytes(32).toString('hex');
console.log(token);
```

> [!IMPORTANT]
> Always use a unique `salt` for each password hash to prevent rainbow table attacks.
