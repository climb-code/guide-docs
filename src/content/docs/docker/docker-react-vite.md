---
title: 🐳 Dockerizing React Vite App
description: A simple and comprehensive guide to running your React Vite application inside a Docker container.
---

This guide shows you **what Docker is**, **why it’s useful**, and **exactly how to run your Vite app in Docker** step by step.

---

### 🔥 Key Docker Terms

* **Image**: A blueprint for your container.
* **Container**: A running instance of an image.
* **Dockerfile**: A text file with instructions to build an image.
* **Port Mapping**: Connecting your computer’s port to the container’s port.

---

### 🚀 The Simple 3-Step Docker Flow

1️⃣ **Your Code Files** 
👇 *(You run: `docker build`)* <br>
2️⃣ **A Docker Image** (Packed, ready-to-run app) 📦
👇 *(You run: `docker run`)* <br>
3️⃣ **A Running Website** → Open at `http://localhost:3000`

---

### 🚢 The “Shipping Container” Analogy

If Docker sounds confusing, think of it like this:

* 📂 **Code Files** = Loose items in your house
* 📦 **Docker Image** = A packed shipping container (everything included)
* 🐳 **Docker Engine** = The ship that carries the container anywhere

**Why Docker?**
Without Docker, you move things one by one and fight with setup issues.
With Docker, you ship one container and it runs **the same everywhere** — your laptop, your teammate’s PC, or a server.

---

###  📁 1. Create a `.dockerignore` (Important!)

This keeps your image small and builds fast.

Create a file named `.dockerignore` in your project root:

```bash
node_modules
dist
.git
.gitignore
npm-debug.log
```

---

### 🐳 2. Create the `Dockerfile`

Create a file named `Dockerfile` in your project root:

```dockerfile
# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port Vite runs on
EXPOSE 3000

# Start the Vite dev server
CMD ["npm", "run", "dev"]
```

> ⚠️ This setup runs Vite in **development mode**.
> For production, you should build the app and serve it with Nginx or a Node server.

---

### ⚙️ 3. Configure Vite (Very Important)

By default, Vite only listens to `localhost`, which won’t work inside Docker.

Update your `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Required for Docker
    port: 3000,
  },
  plugins: [react()],
})
```

---

### 🛠️ 4. Build the Docker Image

Run this in your project root:

```bash
docker build -t vite-app .
```

**What this means:**

* `docker build` → Build an image
* `-t vite-app` → Name (tag) the image `vite-app`
* `.` → Use the current folder (where Dockerfile is)

---

### 🚀 5. Run the Container

```bash
docker run -p 3000:3000 vite-app
```

**What this means:**

* `docker run` → Start a container
* `-p 3000:3000` → Map port 3000 (your PC) to port 3000 (container)
* `vite-app` → The image name

Now open: 👉 **[http://localhost:3000](http://localhost:3000)** 🎉

---

### 📝 Notes

* If your Vite app uses a different port, update:

  * `EXPOSE` in `Dockerfile`
  * `-p` in `docker run`
  * `port` in `vite.config.js`
* This setup is **best for development**.
* For production, use:

  * `npm run build`
  * Serve with **Nginx** or a **Node server**

---

### ✅ Quick Summary

1. Create `.dockerignore`
2. Create `Dockerfile`
3. Set `host: '0.0.0.0'` in `vite.config.js`
4. Build image:

   ```bash
   docker build -t app-name .
   ```
5. Run container:

   ```bash
   docker run -p 3000:3000 app-name
   ```
6. Open: **[http://localhost:3000](http://localhost:3000)** 🚀

---
