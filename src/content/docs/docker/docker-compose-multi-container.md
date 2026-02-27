---
title: 🏗️ Dockerizing a Multi-Container App
description: Learn how to containerize a full-stack app with a React frontend, Node.js backend, and a PostgreSQL database — all running together with Docker Compose.
---

A real-world app usually has multiple moving parts working together. In this guide we'll containerize a full-stack app consisting of:

* ⚛️ **React (Vite)** — the frontend
* 🟢 **Node.js + Express** — the backend API
* 🐘 **PostgreSQL** — the database

Each piece runs in its own container. Docker Compose ties them all together.

---

### 🗂️ Project Structure

Here's what the project looks like before we add Docker files:

```
my-app/
├── frontend/          ← React Vite app
│   ├── src/
│   ├── index.html
│   └── package.json
├── backend/           ← Node.js Express API
│   ├── index.js
│   └── package.json
└── docker-compose.yml ← ties everything together
```

Each service (frontend, backend, database) gets its own `Dockerfile` inside its folder. PostgreSQL uses an **official image** — no Dockerfile needed for it.

---

### 🐳 Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4000
CMD ["node", "index.js"]
```

---

### ⚛️ Frontend Dockerfile (Multi-Stage)

Create `frontend/Dockerfile`:

```dockerfile
# ---- Stage 1: Build ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Vite outputs the production build to /app/dist

# ---- Stage 2: Serve ----
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Why two stages?**

| Stage | Base image | What it does |
|---|---|---|
| `builder` | `node:22-alpine` | Installs deps and runs `npm run build` → produces `/app/dist` |
| final | `nginx:alpine` | Copies only the built `/dist` files and serves them on port **80** |

> The final image has **no Node.js or source code** — just the static HTML/CSS/JS and Nginx. This makes it much smaller and safer for production.

---

### 🐙 The `docker-compose.yml`

Create `docker-compose.yml` at the **project root**:

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/mydb
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```

**Key things to notice:**

| Setting | What it does |
|---|---|
| `build: ./frontend` | Builds the image from `frontend/Dockerfile` |
| `depends_on: backend` | Frontend waits for backend to start first |
| `DATABASE_URL` | Backend connects to `db` by service name (not localhost) |
| `depends_on: db` | Backend waits for Postgres to start |
| `volumes: pgdata` | Database data persists even after containers are removed |
| `networks: app-network` | Attaches each service to the shared custom network |
| `driver: bridge` | Standard Docker bridge network — services can talk to each other by name |

---

### 🔌 How They All Talk to Each Other

Docker Compose puts all services on a **shared network**. Each service is reachable by its **service name**:

| From | To | Hostname used |
|---|---|---|
| Browser | Frontend | `http://localhost:80` (or just `http://localhost`) |
| Browser | Backend | `http://localhost:4000` |
| Frontend (inside Docker) | Backend | `http://backend:4000` |
| Backend | PostgreSQL | `postgres://...@db:5432/mydb` |

> **Important:** Inside the Docker network, services use each other's **service names**, not `localhost`.

---

### 🚀 Start the App

```bash
docker compose up --build
```

* `--build` → forces Docker to rebuild images (useful when you've changed code)

After a few seconds:
* ⚛️ Frontend: **[http://localhost](http://localhost)** (Nginx serving on port 80)
* 🟢 Backend API: **[http://localhost:4000](http://localhost:4000)**
* 🐘 PostgreSQL running silently in the background

---

### 🛑 Stop the App

```bash
docker compose down
```

This stops all containers. Your database data is safe thanks to the `pgdata` volume.

To also wipe the database volume:

```bash
docker compose down -v
```

---

### ✅ Quick Summary

* Each custom service (frontend, backend) gets its own `Dockerfile`
* Official services like PostgreSQL use `image:` — no Dockerfile needed
* `docker-compose.yml` at the project root connects them all
* Services talk to each other using their **service name** as the hostname
* `depends_on` controls startup order
* Named `volumes` keep your database data safe across restarts
