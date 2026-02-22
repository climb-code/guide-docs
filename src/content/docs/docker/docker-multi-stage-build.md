---
title: 🐳 Multi-Stage Docker Builds
description: Learn how to create smaller, production-ready Docker images using multi-stage builds for your Node.js Express app.
---

So far you've been using a **single-stage** Dockerfile — one big image that includes everything: dev tools, all of npm, and your source code. That's fine for learning, but in production you want your image to be **lean and fast**. That's where **multi-stage builds** come in. 🚀

---

### 📦 Single-Stage vs Multi-Stage

Think of it like packing for a trip:

* 🧳 **Single-stage**: You pack your entire house — clothes, furniture, tools — into one suitcase. It works, but it's huge.
* 🎒 **Multi-stage**: You only pack what you actually need for the trip. Everything else stays home.

| | Single-Stage | Multi-Stage |
|---|---|---|
| Image size | ❌ Large (includes dev tools) | ✅ Small (only what runs the app) |
| Build speed | Slower on CI/CD | Faster deploys |
| Security | More attack surface | Minimal surface area |
| Best for | Development & learning | Production 🚀 |

---

### 🔍 Your Current (Single-Stage) Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

CMD ["node", "index.js"]
```

This installs **all** packages (including any dev dependencies) and ships them in the final image. Works — but not ideal for production.

---

### 🚀 The Multi-Stage `Dockerfile`

```dockerfile
# ── Stage 1: Builder ──────────────────────────────────────────
# This stage installs dependencies and does any build work.
# It will NOT be included in the final image.
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install ALL dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .


# ── Stage 2: Production ───────────────────────────────────────
# This is the lean final image — only what's needed to RUN the app.
FROM node:22-alpine AS production

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./

# Set the port
ENV PORT=3000

# Start the app
CMD ["node", "index.js"]
```

---

### 🔑 Key Things to Understand

* **`AS builder`** → Names the first stage. You can call it anything.
* **`FROM node:22-alpine AS production`** → Starts a brand new, clean image.
* **`COPY --from=builder`** → Pulls specific files from the builder stage into the final image. Everything else (the build tools, temp files, etc.) is left behind.
* The final image **only contains** `package.json`, `node_modules`, and `index.js` — nothing more.

---

### 🛠️ Build & Run (Same Commands!)

Multi-stage builds are transparent — you use the exact same commands:

**Build:**
```bash
docker build -t express-app .
```

**Run:**
```bash
docker run -p 4000:3000 --rm express-app
```

Open: 👉 **[http://localhost:4000](http://localhost:4000)** 🎉

> Docker automatically handles the stages behind the scenes. You only get the final production image tagged as `express-app`.

---

### 📏 See the Size Difference

After building, check your image size:

```bash
docker images express-app
```

Compare your old single-stage image vs the new multi-stage one — the difference can be significant once your app grows and has more dependencies.

---

### ✅ Quick Summary

| Step | What it does |
|---|---|
| `FROM ... AS builder` | Stage 1 — installs everything, does build work |
| `FROM ... AS production` | Stage 2 — fresh, clean image |
| `COPY --from=builder` | Copies only what's needed from Stage 1 |
| `docker build -t express-app .` | Builds just like before |
| `docker run -p 4000:3000 express-app` | Runs the lean production image |

Multi-stage builds are the standard way to ship Node.js apps in production. Small image = faster deploys, less storage, and fewer security risks. 🔐
