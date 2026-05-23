---
title: HTTPS and SSL Configuration in Express.js
description: Learn how to configure your Express.js application to serve traffic over secure HTTPS using SSL/TLS certificates.
---

# HTTPS and SSL Configuration in Express.js

Serving your application over HTTPS (Hypertext Transfer Protocol Secure) encrypts the communication between the client and the server, protecting sensitive data such as passwords, personal details, and credit card numbers from eavesdropping or modification.

In this guide, you will learn how to configure an Express.js server to run on HTTPS using SSL/TLS certificates.

---

## How HTTPS Works with Express

By default, Express applications run on the unencrypted HTTP protocol. To enable HTTPS, you must wrap your Express application using Node.js's built-in `https` module and provide an SSL certificate and private key.

## 1. Generating a Self-Signed Certificate (For Local Testing)

For local development and testing, you can generate a free self-signed certificate using **OpenSSL**. 

Open your terminal and run the following command to generate a private key (`key.pem`) and certificate (`cert.pem`):

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes
```

- `-x509`: Specifies a self-signed certificate.
- `-newkey rsa:4096`: Generates a new 4096-bit RSA key.
- `-nodes`: Creates a key without a passphrase.
- `-days 365`: Sets the certificate validity to 1 year.

Place the generated `key.pem` and `cert.pem` in a secure directory in your project root (e.g., `./config/ssl/`).

> [!WARNING]
> Self-signed certificates are only for development. Web browsers will display a security warning (e.g., "Your connection is not private") because the certificate is not signed by a trusted Certificate Authority (CA).

## 2. Configuring the HTTPS Server

Once you have your private key and certificate, you can import them using the Node.js `fs` module and configure your server:

```javascript
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ES Modules directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read SSL certificates
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'config', 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'config', 'ssl', 'cert.pem'))
};

// 2. Define a basic route
app.get('/', (req, res) => {
  res.send('Hello over secure HTTPS!');
});

// 3. Create and start the HTTPS server
const HTTPS_PORT = 443;
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Secure HTTPS server running on https://localhost:${HTTPS_PORT}`);
});
```

> [!IMPORTANT]
> The default port for HTTPS is `443`. Port numbers below `1024` are privileged ports on Unix-like operating systems (Mac, Linux) and might require administrator privileges (e.g., running the app with `sudo node index.js`).

## 3. Redirecting HTTP to HTTPS

To ensure all clients use a secure connection, you can run a parallel HTTP server on port `80` that redirects all incoming traffic to the HTTPS server on port `443`:

```javascript
import http from 'http';

// Redirect all HTTP requests to HTTPS
const httpApp = express();
httpApp.use((req, res) => {
  res.redirect(`https://${req.hostname}${req.url}`);
});

// Start HTTP server for redirection
const HTTP_PORT = 80;
http.createServer(httpApp).listen(HTTP_PORT, () => {
  console.log(`HTTP server running on port ${HTTP_PORT} (redirecting to HTTPS)`);
});
```

## Best Practices for Production

> [!IMPORTANT]
> - **Production Certificates**: Always use a trusted Certificate Authority (CA) in production. You can get free certificates using [Let's Encrypt](https://letsencrypt.org/) and automate their renewal with **Certbot**.
> - **Reverse Proxy Offloading**: In standard production architectures, it is best practice to offload SSL handling to a reverse proxy (like **Nginx**, **HAProxy**, or **Cloudflare**) instead of handling it directly inside Node.js. This reduces load on your Express app.
> - **HSTS (HTTP Strict Transport Security)**: Enable HSTS headers using the `helmet` middleware to force browsers to always connect via HTTPS:
>   ```javascript
>   import helmet from 'helmet';
>   app.use(helmet.hsts({
>     maxAge: 31536000, // 1 year in seconds
>     includeSubDomains: true,
>     preload: true
>   }));
>   ```
