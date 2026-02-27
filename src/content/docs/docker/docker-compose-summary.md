---
title: 📋 Docker Compose — Summary
description: A concise recap of everything covered in the Docker Compose and multi-container section.
---

You've reached the end of the **Docker Compose & Multi-Container** section. Here's everything you've learned, condensed into a quick reference.

---

### 🐙 What is Docker Compose?

A tool that lets you **define and run multiple containers** as one application using a single `docker-compose.yml` file.

**One command to start everything:**
```bash
docker compose up
```

---

### 🗂️ The `docker-compose.yml` Structure

```yaml
services:
  service-name:
    build: ./path-to-dockerfile   # or use 'image:' for pre-built images
    ports:
      - "host:container"
    environment:
      - KEY=value
    depends_on:
      - other-service
    volumes:
      - named-volume:/path/in/container

volumes:
  named-volume:
```

---

### 🔑 Core Concepts at a Glance

| Concept | What it means |
|---|---|
| **Service** | One container defined in `docker-compose.yml` |
| **Network** | All services share a network automatically |
| **Service name as hostname** | Services reach each other by name (e.g. `db`, `backend`) |
| **`depends_on`** | Controls startup order |
| **Named volumes** | Persist data across container restarts/removals |
| **`build`** | Build image from a local `Dockerfile` |
| **`image`** | Pull a pre-built image from Docker Hub |

---

### 🚀 Essential Commands

| Command | What it does |
|---|---|
| `docker compose up` | Start all services |
| `docker compose up --build` | Rebuild images then start |
| `docker compose up -d` | Start in background (detached mode) |
| `docker compose down` | Stop and remove containers |
| `docker compose down -v` | Also remove named volumes |
| `docker compose ps` | List running services |
| `docker compose logs -f` | Follow live logs |
| `docker compose exec <svc> sh` | Open a shell in a service container |
| `docker compose build` | Rebuild images without starting |

---

### 🏗️ Multi-Container App Pattern

A typical full-stack setup:

```
Frontend (React)  →  Backend (Node.js)  →  Database (PostgreSQL)
     :80                  :4000                   :5432
```

* Each layer is its own **service** in `docker-compose.yml`
* They talk to each other using **service names** as hostnames
* You access them from your browser via the **mapped host ports**

---

### 💡 Tips to Remember

* Use `restart: on-failure` on your backend — the DB might not be ready immediately
* Add `.env` files and reference them with `env_file:` to keep secrets out of your YAML
* Use `volumes` to persist database data — without it, data is lost when the container stops
* `docker compose down -v` is a full clean reset — use with caution in production!

---

### 🎯 What's Next?

Now that you know Docker Compose, you're ready to explore:

* **Environment-specific configs** — using `.env` files with Compose
* **Docker Compose Watch** — hot reload for development
* **Production deployments** — deploying your Compose stack to a cloud server
