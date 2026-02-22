---
title: 🐳 Dockerizing a Node.js Express App
description: A simple, no-nonsense guide to containerizing your Node.js Express app with Docker.
---

This guide walks you through **packaging your Node.js Express app into a Docker container** so it runs the same everywhere — your laptop, your teammate's machine, or any cloud server. 🚀

---

### 🔥 Key Terms (Quick Recap)

* **Image**: A blueprint for your app — like a recipe.
* **Container**: The actual running app built from that recipe.
* **Dockerfile**: The file that tells Docker how to build your image.
* **Port Mapping**: Connecting your machine's port to the container's port.

---

### 🚀 The Simple 3-Step Flow

1️⃣ **Your Express App Files**  
👇 *(You run: `docker build`)* <br>
2️⃣ **A Docker Image** (Your app, packed and ready) 📦  
👇 *(You run: `docker run`)* <br>
3️⃣ **A Running Server** → Hit it at `http://localhost:4000` 🎉

---

### 📁 1. Project File Structure

Here's what your project folder should look like:

```
express/
├── node_modules/       ← auto-generated, don't touch
├── Dockerfile          ← Docker instructions
├── .dockerignore       ← files to exclude from the image
├── index.js            ← your Express app
├── package-lock.json   ← auto-generated lockfile
└── package.json        ← app metadata & dependencies
```

#### `package.json`

```json
{
  "name": "express",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

---

### 📁 2. Create a `.dockerignore`

Keep the image lean. Create `.dockerignore` in your project root:

```bash
node_modules
.git
.gitignore
npm-debug.log
```

> This stops Docker from copying your local `node_modules` into the image — it'll install its own fresh copy instead.

---

### 🐳 3. Create the `Dockerfile`

Create a file named `Dockerfile` in your project root:

```dockerfile
# Use the lightweight Node.js 22 image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (this helps Docker cache layers)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app files
COPY . .

# Set a default port via environment variable
ENV PORT=3000

# Start the app
CMD ["node", "index.js"]
```

> **What does `ENV PORT=3000` do?**
> It sets a **default** environment variable inside the container.
> Your app reads it with `process.env.PORT` — just like a normal `.env` file, but baked into the image.

#### 💡 3 Ways to Pass Environment Variables

**① Baked into the Dockerfile (default)**
```dockerfile
ENV PORT=3000
```
The container always uses `3000` unless you override it.

---

**② Using a `.env` file (recommended for real projects)**

Create a `.env` file in your project root:
```bash
PORT=4000
DB_URL=mongodb://localhost:27017/mydb
SECRET_KEY=supersecret
```

Then pass it to `docker run`:
```bash
docker run -p 4000:4000 --env-file .env --rm express-app
```
* `--env-file .env` → Loads all variables from your `.env` file into the container.

> ⚠️ Add `.env` to your `.dockerignore` so it doesn't get copied into the image itself — just pass it at runtime.

---

**③ Inline with `-e` (quick one-off overrides)**
```bash
docker run -p 5000:5000 -e PORT=5000 --rm express-app
```

---

### 📝 4. Your `index.js`

Here's the basic Express app that runs inside the container:

```js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from a Docker container! 🐳');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
```

> The app reads `PORT` from the environment, so you can change it at runtime without touching the code.

---

### 🛠️ 4. Build the Docker Image

Run this in your project root:

```bash
docker build -t express-app .
```

**What this means:**

* `docker build` → Build an image from the Dockerfile
* `-t express-app` → Name (tag) the image `express-app`
* `.` → Use the current folder

---

### 🚀 5. Run the Container

```bash
docker run -p 4000:3000 --rm express-app
```

**What this means:**

* `-p 4000:3000` → Map your machine's port **4000** to the container's port **3000**
* `--rm` → Auto-delete the container when it stops (keeps things tidy)
* `express-app` → The image to run

Now open: 👉 **[http://localhost:4000](http://localhost:4000)** 🎉

---

### ⚙️ Override the Port at Runtime

Want to run on a different port? Pass the `PORT` environment variable:

```bash
docker run -p 5000:5000 -e PORT=5000 --rm express-app
```

* `-e PORT=5000` → Sets the `PORT` env variable inside the container
* `-p 5000:5000` → Maps your machine's 5000 to the container's 5000

---

### ✅ Quick Summary

1. Create `.dockerignore`
2. Create `Dockerfile`
3. Build image:
   ```bash
   docker build -t express-app .
   ```
4. Run container:
   ```bash
   docker run -p 4000:3000 --rm express-app
   ```
5. Open: **[http://localhost:4000](http://localhost:4000)** 🚀

---

### 📝 Notes

* Change the `-p` flag ports anytime — just keep `host:container` format.
* `--rm` is optional but great during development to avoid orphan containers piling up.
* For production, consider running with `-d` (detached mode) so it runs in the background:
  ```bash
  docker run -d -p 4000:3000 express-app
  ```
