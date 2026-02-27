---
title: 🐙 Intro to Docker Compose
description: Learn how Docker Compose lets you manage multi-container applications with a single file and a single command.
---

So far we've been running containers one at a time with `docker run`. That works fine for a single app — but real-world apps are rarely just one container.

Think about a typical Node.js app:

* 🟢 **Node.js API** — your backend server
* 🐬 **MySQL or PostgreSQL** — your database
* 🔴 **Redis** — for caching or sessions

You'd need to start each container separately, set up networking between them, manage environment variables for each... it gets messy fast.

**Docker Compose** solves this.

---

### 🐙 What is Docker Compose?

Docker Compose is a tool that lets you **define and run multiple containers as a single application** using one configuration file — `docker-compose.yml`.

Instead of running three separate `docker run` commands with long flags, you write everything once in a YAML file and then run:

```bash
docker compose up
```

That's it. All your containers start together, talk to each other, and behave like one cohesive app.

---

### 🗂️ The `docker-compose.yml` File

Everything is defined in a file called `docker-compose.yml` at the root of your project.

Here's a simple example with a Node.js API and a PostgreSQL database:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
```

**What's happening here:**

* `services` → defines each container (called a **service**)
* `api` → builds from your local `Dockerfile` and maps port 4000
* `db` → pulls the official PostgreSQL image from Docker Hub
* `depends_on` → ensures the `db` container starts before `api`
* Both services are on the **same network** by default, so `api` can reach `db` by using the hostname `db`

---

### 🚀 Key Commands

| Command | What it does |
|---|---|
| `docker compose up` | Start all services |
| `docker compose up -d` | Start in detached (background) mode |
| `docker compose down` | Stop and remove containers |
| `docker compose logs` | View logs from all services |
| `docker compose ps` | List running services |
| `docker compose build` | Rebuild images |

---

### 🔌 How Containers Talk to Each Other

When you run `docker compose up`, Docker automatically creates a **shared network** for all your services.

Each service can reach the other using its **service name as the hostname**.

So if your Node.js app needs to connect to Postgres, the connection string is:

```
postgres://user:password@db:5432/mydb
```

Notice `db` — that's the service name from `docker-compose.yml`, not `localhost`. Docker handles the DNS resolution internally.

---

### ✅ Why Use Docker Compose?

* **One command** to start your entire app stack
* **No manual networking** — services talk to each other by name
* **Consistent environments** — same setup on every machine
* **Easy to share** — just share the `docker-compose.yml` and anyone can run your app

---

### 🧠 Mental Model

Think of `docker-compose.yml` as the **blueprint for your entire app** — it describes every piece (API, database, cache) and how they connect. Docker Compose reads that blueprint and brings the whole thing to life with a single command.
