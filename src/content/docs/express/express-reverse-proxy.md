---
title: Express.js behind Reverse Proxies
description: Learn how to configure your Express.js application correctly when deployed behind reverse proxies like Nginx, HAProxy, AWS ELB, or Cloudflare.
---

# Express.js behind Reverse Proxies

When deploying an Express.js application to production, it is standard practice to run it behind a reverse proxy (such as **Nginx**, **HAProxy**, **AWS Application Load Balancer (ALB)**, or **Cloudflare**). 

The reverse proxy handles incoming client requests, manages SSL/TLS termination, and forwards traffic to your Express application (often running on localhost or an internal port).

However, this setup introduces a major challenge: **the client's connection is terminated at the proxy**. As a result:
- `req.ip` returns the IP address of the reverse proxy (e.g., `127.0.0.1`), not the client.
- `req.protocol` returns `http` (the protocol between the proxy and Express), not `https`.
- `req.secure` returns `false` because the immediate connection to Express is not encrypted.

To resolve this, you must configure the `trust proxy` setting in Express.

---

## What is `trust proxy`?

The `trust proxy` setting tells Express to trust the headers set by the reverse proxy (most notably `X-Forwarded-For`, `X-Forwarded-Proto`, and `X-Forwarded-Host`).

When enabled, Express automatically parses these headers and updates the request object properties:
- **`req.ip`**: Populated with the client's original IP address from `X-Forwarded-For`.
- **`req.protocol`**: Populated with the original protocol (usually `https`) from `X-Forwarded-Proto`.
- **`req.secure`**: Set to `true` if the original request was HTTPS.

---

## Configuring `trust proxy`

You can enable and configure `trust proxy` in your Express application using `app.set()`:

```javascript
import express from 'express';
const app = express();

// Enable trust proxy
app.set('trust proxy', true); 
```

> [!WARNING]
> Setting `trust proxy` to `true` is convenient but **insecure** if your application can be accessed directly without going through the proxy. A client could spoof the `X-Forwarded-For` header to impersonate any IP address. Only use `true` if you are certain your server is firewalled to reject direct external traffic.

### Advanced Configuration Options

For production applications, it is best practice to configure `trust proxy` more precisely:

| Value Type | Example | Description |
| :--- | :--- | :--- |
| **Boolean** | `app.set('trust proxy', true)` | Trust all proxies. (Only use if firewalled). |
| **IP/Subnet** | `app.set('trust proxy', '127.0.0.1')` | Trust only specified IP addresses or subnets (CIDR notation, e.g., `'10.0.0.0/8'`). |
| **Array of IPs** | `app.set('trust proxy', ['127.0.0.1', '10.0.0.1'])` | Trust only the listed IP addresses. |
| **Number** | `app.set('trust proxy', 1)` | Trust the `n`th hop from the front-facing proxy server. |

#### Trusting a Single Proxy (e.g., Nginx on localhost)
If your Express app runs on the same server as Nginx:
```javascript
app.set('trust proxy', '127.0.0.1');
```

#### Trusting Hops (e.g., Cloudflare -> Nginx -> Express)
If there are multiple proxy layers (like Cloudflare routing to Nginx, which routes to your app), you can specify the number of hops to trust:
```javascript
// Trust the first proxy (e.g. Nginx) and the client IP behind it
app.set('trust proxy', 1);
```

---

## Why `trust proxy` is Critical

### 1. Correct IP Rate Limiting
If you use a rate limiter like `express-rate-limit`, it relies on `req.ip` by default to track client request counts. 
Without `trust proxy`, the rate limiter sees all requests originating from your reverse proxy's IP. **This will block all users** as soon as the aggregate request limit is exceeded!

```javascript
import rateLimit from 'express-rate-limit';

// Without 'trust proxy', req.ip is the proxy's IP (e.g., 127.0.0.1)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per window
});

app.use(limiter);
```

### 2. Secure Cookie Transmission
Modern browsers require cookies with the `Secure` attribute to be sent only over HTTPS connections. In Express, cookies configured with `secure: true` will not be sent if `req.secure` is `false`.
Without `trust proxy`, `req.secure` is `false` when deployed behind a proxy, causing login sessions to break.

```javascript
import session from 'express-session';

app.use(session({
  secret: 'your-secret',
  cookie: {
    secure: true, // Only send cookie over HTTPS
  }
}));
```

---

## Nginx Proxy Header Configuration

To make `trust proxy` work, the reverse proxy must actually pass the headers to Express. Here is a standard configuration snippet for Nginx:

```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # Forward original request headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Key Takeaways

- **Always configure `trust proxy`** when deploying Express.js apps behind Nginx, Cloudflare, or cloud load balancers.
- **`req.ip` and `req.secure`** depend on `trust proxy` to resolve the client's actual IP and protocol.
- **Rate limiting** and **secure session cookies** will fail or function incorrectly in production if `trust proxy` is missing.
- **Do not trust everything (`true`)** unless you are behind a secure firewall blocking direct traffic; specify the proxy IP or hop count instead to prevent IP spoofing.
