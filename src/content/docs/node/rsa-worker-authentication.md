---
title: RSA Worker Authentication Guide
description: Complete guide for implementing RSA-based authentication between Cloudflare Workers and Express servers
---


This guide demonstrates how to implement secure RSA-based authentication between a Cloudflare Worker and an Express.js server. This authentication mechanism ensures that only authorized workers can communicate with your server endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Implementation](#implementation)
- [Security Features](#security-features)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Overview

This authentication system uses **RSA digital signatures** to verify requests between a Cloudflare Worker (client) and an Express server (backend). The worker signs each request with a private key, and the server verifies the signature using the corresponding public key.

### Key Benefits

- **Secure Authentication**: Uses RSA-2048 encryption
- **Replay Attack Protection**: Timestamp validation prevents request replay
- **Stateless**: No session management required
- **Worker-Specific**: Each worker can have its own identity

## Architecture

```
┌─────────────────────┐          ┌─────────────────────┐
│  Cloudflare Worker  │          │   Express Server    │
│                     │          │                     │
│  1. Create payload  │          │                     │
│  2. Sign with       │          │                     │
│     Private Key     │          │                     │
│  3. Send request    │──────────>│  4. Verify with     │
│     with signature  │          │     Public Key      │
│                     │          │  5. Process if valid│
└─────────────────────┘          └─────────────────────┘
```

## Setup Instructions

### Step 1: Generate RSA Key Pair

Use OpenSSL to generate a private/public key pair:

```bash
# Generate private key (2048-bit RSA)
openssl genrsa -out worker-private.pem 2048

# Extract public key from private key
openssl rsa -in worker-private.pem -pubout -out worker-public.pem
```

This creates two files:
- `worker-private.pem` - Keep this **secret** (for the Worker)
- `worker-public.pem` - Share this with your server (for verification)

### Step 2: Configure Environment Variables

#### For Cloudflare Worker:

Add to your Worker's environment variables:

```bash
WORKER_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----"
```

> **Note**: Replace with the actual contents of `worker-private.pem`

#### For Express Server:

Add to your `.env` file:

```bash
WORKER_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...
-----END PUBLIC KEY-----"
```

> **Note**: Replace with the actual contents of `worker-public.pem`

## Implementation

### Worker Side: Signing Requests

Create a helper file for signing requests in your Cloudflare Worker:

**`helpers/worker-rsa-auth.js`**

```javascript
export async function signWorkerRequestRSA(payload, env) {
  const timestamp = Date.now();
  const nonce = crypto.randomUUID();
  const dataToSign = `${timestamp}.${nonce}.${JSON.stringify(payload)}`;
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.WORKER_PRIVATE_KEY),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(dataToSign)
  );
  console.log("Signature Buffer:", signatureBuffer);
  const signature = btoa(
    String.fromCharCode(...new Uint8Array(signatureBuffer))
  );
  return {
    "x-worker-id": "email-worker",
    "x-timestamp": timestamp.toString(),
    "x-nonce": nonce,
    "x-signature": signature,
    "x-sign-algo": "RSA-SHA256",
  };
}
// PEM → ArrayBuffer
function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}
```

#### How to Use in Your Worker:

```javascript
import { signWorkerRequestRSA } from './helpers/worker-rsa-auth.js';

export default {
  async fetch(request, env) {
    const payload = {
      email: "user@example.com",
      action: "send-welcome"
    };
    
    // Sign the request
    const authHeaders = await signWorkerRequestRSA(payload, env);
    
    // Make authenticated request to your server
    const response = await fetch('https://your-server.com/api/worker/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify(payload)
    });
    
    return response;
  }
};
```

### Server Side: Verifying Signatures

Create middleware for your Express application:

**`middleware/workerRSAAuthMiddleware.ts`**

```typescript
import crypto from "node:crypto";
import { NextFunction, Request, Response } from "express";
import { getWorkerPublicKey } from "../helpers/environment";
import logger from "../utils/logger";

const WORKER_PUBLIC_KEY = getWorkerPublicKey();

export function workerRSAAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const workerId = req.headers["x-worker-id"];
        const timestamp = Number(req.headers["x-timestamp"]);
        const nonce = req.headers["x-nonce"];
        const signature = req.headers["x-signature"];

        if (!workerId || !timestamp || !nonce || !signature) {
            return res.status(401).json({ error: "Missing worker auth headers" });
        }

        // ⏱️ Replay attack protection (5 minutes)
        if (Math.abs(Date.now() - timestamp) > 5 * 60 * 1000) {
            return res.status(401).json({ error: "Request expired" });
        }

        if (!WORKER_PUBLIC_KEY) {
            throw new Error("WORKER_PUBLIC_KEY not configured");
        }

        const dataToVerify = `${timestamp}.${nonce}.${JSON.stringify(req.body)}`;
        const isValid = crypto.verify(
            "RSA-SHA256",
            Buffer.from(dataToVerify),
            WORKER_PUBLIC_KEY,
            Buffer.from(signature as string, "base64")
        );

        if (!isValid) {
            return res.status(401).json({ error: "Invalid RSA signature" });
        }

        // Optional context
        (req as any).worker = {
            id: workerId, // informational only
            type: "internal",
        };

        next();
    } catch (err) {
        logger.error("RSA worker authentication failed:", err);
        return res.status(401).json({ error: "Worker authentication failed" });
    }
}
```

#### How to Use in Your Express Routes:

```typescript
import express from 'express';
import { workerRSAAuthMiddleware } from './middleware/workerRSAAuthMiddleware';

const app = express();

app.use(express.json()); // Required for req.body

// Protected route - only accessible by authenticated workers
app.post('/api/worker/email', workerRSAAuthMiddleware, (req, res) => {
    const { email, action } = req.body;
    console.log(`Worker ${req.worker.id} requested ${action} for ${email}`);
    
    // Your business logic here
    res.json({ success: true, message: 'Email sent' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## Security Features

### 1. **Digital Signature Verification**
Each request is signed with the worker's private key and verified using the public key on the server.

### 2. **Replay Attack Protection**
The timestamp validation ensures requests older than 5 minutes are rejected:

```typescript
if (Math.abs(Date.now() - timestamp) > 5 * 60 * 1000) {
    return res.status(401).json({ error: "Request expired" });
}
```

### 3. **Nonce for Uniqueness**
Each request includes a unique identifier (UUID) to prevent duplicate submissions.

### 4. **Signature Algorithm**
Uses `RSASSA-PKCS1-v1_5` with `SHA-256` hashing for robust cryptographic security.

## Testing

### Manual Testing with cURL

To test the endpoint manually, you'll need to generate a valid signature. Here's an example test script:

```javascript
// test-worker-auth.js
import crypto from 'crypto';
import fs from 'fs';

const privateKey = fs.readFileSync('worker-private.pem', 'utf8');
const timestamp = Date.now();
const nonce = crypto.randomUUID();
const payload = { email: 'test@example.com', action: 'test' };

const dataToSign = `${timestamp}.${nonce}.${JSON.stringify(payload)}`;
const signature = crypto.sign('RSA-SHA256', Buffer.from(dataToSign), privateKey);

console.log({
    'x-worker-id': 'email-worker',
    'x-timestamp': timestamp,
    'x-nonce': nonce,
    'x-signature': signature.toString('base64')
});
```

Run the script and use the output headers with cURL:

```bash
curl -X POST https://your-server.com/api/worker/email \
  -H "Content-Type: application/json" \
  -H "x-worker-id: email-worker" \
  -H "x-timestamp: 1703086845123" \
  -H "x-nonce: 550e8400-e29b-41d4-a716-446655440000" \
  -H "x-signature: BASE64_SIGNATURE_HERE" \
  -d '{"email":"test@example.com","action":"test"}'
```

## Troubleshooting

### Common Issues

#### 1. **"Invalid RSA signature" Error**

**Possible Causes:**
- Private/public key mismatch
- Incorrect data formatting
- Body parser not configured on Express

**Solution:**
```typescript
// Ensure body parser is used BEFORE the middleware
app.use(express.json());
app.post('/api/worker/email', workerRSAAuthMiddleware, handler);
```

#### 2. **"Request expired" Error**

**Cause:** The timestamp is older than 5 minutes.

**Solution:** Ensure both worker and server have synchronized clocks. For Cloudflare Workers, `Date.now()` should be accurate.

#### 3. **"WORKER_PUBLIC_KEY not configured" Error**

**Solution:**
```typescript
// helpers/environment.ts
export function getWorkerPublicKey(): string {
    const key = process.env.WORKER_PUBLIC_KEY;
    if (!key) {
        throw new Error('WORKER_PUBLIC_KEY environment variable not set');
    }
    return key;
}
```

#### 4. **PEM Format Issues**

Ensure your PEM keys include proper headers and newlines:

```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASC...
...
-----END PRIVATE KEY-----
```

## Best Practices

1. **Key Rotation**: Regularly rotate your RSA keys (e.g., every 90 days)
2. **Key Storage**: Never commit private keys to version control
3. **Environment Separation**: Use different keys for development/staging/production
4. **Logging**: Log authentication failures for security monitoring
5. **Rate Limiting**: Add rate limiting to prevent brute force attempts

## Additional Resources

- [RSA Cryptography](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [Cloudflare Workers Web Crypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)

---

**Need Help?** If you encounter any issues, check the troubleshooting section above or review your server logs for detailed error messages.
