---
title: 🛠️ Hands-On — Setting Up a Multi-Service App with docker-compose.yml
description: A practical, step-by-step walkthrough to set up a Node.js API with PostgreSQL using docker-compose.yml from scratch.
---

Let's build and run a real multi-service app from scratch using Docker Compose. We'll set up a **Node.js Express API** that connects to a **PostgreSQL** database — fully containerized and running with one command.

---

### 📁 Step 1 — Create the Project Structure

```bash
mkdir compose-demo && cd compose-demo
mkdir backend
```

Your folder should look like this:

```
compose-demo/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

### 📝 Step 2 — Create the Express App

**`backend/package.json`**

```json
{
  "name": "compose-demo-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "pg": "^8.13.1"
  }
}
```

**`backend/index.js`**

```js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS time');
    res.json({ message: 'Hello from Docker Compose! 🐙', time: result.rows[0].time });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
```

---

### 🐳 Step 3 — Create the Backend Dockerfile

**`backend/Dockerfile`**

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

### 🐙 Step 4 — Write the `docker-compose.yml`

Create `docker-compose.yml` at the **project root** (not inside `backend/`):

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/demodb
    depends_on:
      - db
    restart: on-failure

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: demodb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

**Breaking it down:**

| Key | Explanation |
|---|---|
| `build: ./backend` | Build image from `backend/Dockerfile` |
| `ports: "4000:4000"` | Expose the API on your machine's port 4000 |
| `DATABASE_URL` | Points to `db` (the service name) — Docker resolves it automatically |
| `depends_on: db` | Start `db` before `backend` |
| `restart: on-failure` | Restart backend if it crashes (useful if DB isn't ready yet) |
| `restart: always` (db) | Always restart Postgres if it ever goes down |
| `POSTGRES_USER` | Sets the default database username |
| `image: postgres:16-alpine` | Use the official Postgres image — no Dockerfile needed |
| `volumes: pgdata` | Persist DB data in a named volume |

---

### 🚀 Step 5 — Start Everything

```bash
docker compose up --build
```

Watch the logs — you'll see both `db` and `backend` start up. Once ready, open:

👉 **[http://localhost:4000](http://localhost:4000)**

You should see:

```json
{
  "message": "Hello from Docker Compose! 🐙",
  "time": "2026-02-27T08:00:00.000Z"
}
```

> If the backend crashes on first start (because Postgres isn't ready yet), `restart: on-failure` will automatically bring it back up once the DB is available.

---

### 🔍 Step 6 — Useful Commands While Running

Open a new terminal and try these:

```bash
# See what's running
docker compose ps

# View live logs for a specific service
docker compose logs -f backend

# Get a shell inside the backend container
docker compose exec backend sh

# Get a psql shell inside the database
docker compose exec db psql -U postgres -d demodb
```

---

### 🛑 Step 7 — Shut It Down

```bash
# Stop containers (data is preserved in the volume)
docker compose down

# Stop AND delete the database volume (clean slate)
docker compose down -v
```

---

### ✅ What You Built

| Layer | Technology | Access |
|---|---|---|
| API | Node.js + Express | `http://localhost:4000` |
| Database | PostgreSQL 16 | `localhost:5432` (from your machine) |
| Internal connection | `pg` via `DATABASE_URL` | `db:5432` (inside Docker network) |

You now have a fully containerized multi-service app that starts with a single command. 🎉
