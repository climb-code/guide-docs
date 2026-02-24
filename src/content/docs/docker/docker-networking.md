---
title: 🌐 Docker Networking
description: Understand how containers talk to each other and the outside world — container networking models, bridge, host, overlay networks, and common commands.
---

Containers don't run in complete isolation forever — at some point they need to talk to each other, or to the outside world. That's what Docker networking is all about. 🌐

---

### 🧠 How Does Container Networking Work?

When Docker runs a container, it creates a **virtual network interface** (`eth0`) inside that container. This interface connects to a **virtual ethernet pair** (`veth`) on the host, which then connects to the **docker0 bridge** — Docker's built-in internal network switch.

That bridge then connects to the host's real network interface (`eth0`), which reaches the internet.

![Container Networking Diagram](https://res.cloudinary.com/guideandgrow/image/upload/v1771817303/guide-docs/docker/295bf560-6d63-4a32-a970-3e4a01f7c40c.png)

**Reading the diagram:**
- Each container has its own `eth0` (virtual network card inside the container)
- `veth1` / `veth2` → virtual cables connecting containers to the host
- `docker0` → Docker's bridge, the internal switch that routes traffic between containers
- `eth0` (bottom) → the host machine's real network card, connecting to the internet

---

### 🗂️ Container Networking Models

Docker gives you different network **drivers** depending on how you want containers to communicate.

| Network Driver | What it does | Best for |
|---|---|---|
| **bridge** | Default. Containers on the same bridge can talk to each other. Isolated from host. | Most apps, development |
| **host** | Container shares the host's network directly. No isolation. | Performance-sensitive apps |
| **overlay** | Connects containers across multiple Docker hosts (machines). | Docker Swarm / multi-server setups |
| **none** | No network at all. Complete isolation. | Maximum security needs |

---

### 🌉 Bridge Network (Default)

When you run a container without specifying a network, it joins the default **bridge** network automatically.

```bash
docker run nginx
```

Containers on the same bridge network can communicate using their **container IP addresses**. However, containers on the **default** bridge cannot resolve each other by name — you need a **custom bridge** for that (covered below).

**Check which network a container is on:**
```bash
docker inspect <container-name>
```

---

### 🖥️ Host Network

With host networking, the container shares the host machine's network stack directly. There's no port mapping needed.

```bash
docker run --network host nginx
```

> The downside: no isolation. The container can see everything on the host network. Use carefully.

---

### ☁️ Overlay Network

Overlay networks connect containers running on **different machines** (different Docker hosts). This is mainly used with **Docker Swarm** for distributed applications.

```bash
docker network create --driver overlay my-overlay
```

---

### 🛠️ Common Container Networking Commands

![Docker Networking Commands](https://res.cloudinary.com/guideandgrow/image/upload/v1771817250/guide-docs/docker/Screenshot_2026-02-23_at_8.50.48_AM_zkcdl0.png)

Here's what each command does:

```bash
# List all networks on your machine
docker network ls

# Inspect a network (see which containers are on it, subnet, etc.)
docker network inspect <network-name>

# Create a new custom network
docker network create <network-name>

# Run a container on a specific network
docker run --network my-network <image>

# Connect a running container to a network
docker network connect my-network <container>

# Disconnect a container from a network
docker network disconnect my-network <container>

# Delete a network
docker network rm my-network
```

---

### 🔧 Create a Custom Network and Run Containers on It

This is where it gets powerful. Custom bridge networks let containers **talk to each other by name** (DNS resolution built in).

**Step 1 — Create the network:**
```bash
docker network create my-network
```

**Step 2 — Run containers on it:**
```bash
docker run -d --name app --network my-network node:22-alpine
docker run -d --name db --network my-network mongo
```

**Step 3 — Containers can now ping each other by name:**
```bash
# From inside the app container, you can reach the db by name
ping db
```

This works because Docker's built-in DNS resolves container names automatically on custom networks. On the **default** bridge, this doesn't work — you'd need to use IP addresses directly.

> 💡 **Best practice**: Always create a custom network for your apps instead of using the default bridge. It's cleaner and gives you name-based DNS for free.

---

### ✅ Quick Summary

| Task | Command |
|---|---|
| List networks | `docker network ls` |
| Inspect a network | `docker network inspect <name>` |
| Create a network | `docker network create <name>` |
| Run on a network | `docker run --network <name> <image>` |
| Connect to network | `docker network connect <name> <container>` |
| Disconnect from network | `docker network disconnect <name> <container>` |
| Delete a network | `docker network rm <name>` |

**The 3 drivers you'll use most:**
- `bridge` → default, isolated, one machine
- `host` → no isolation, shares host network
- `overlay` → multiple machines (Swarm)

---

### 📚 Further Reading

- [Docker Networking Overview](https://docs.docker.com/engine/network/) — Official Docker Docs
- [Bridge Network Driver](https://docs.docker.com/engine/network/drivers/bridge/) — How the default bridge works
- [Overlay Network Driver](https://docs.docker.com/engine/network/drivers/overlay/) — For multi-host setups
