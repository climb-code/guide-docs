---
title: Run Your First Container
description: Learn how to run your very first Docker container using the hello-world image.
---

Now that you have Docker installed, let's run something! The "Hello World" of Docker is a simple image that prints a message to your terminal. 🐳

### The Magic Command

Open your terminal and run this command:

```bash
docker run hello-world
```

### What just happened?

When you ran that command, Docker did four things:

1. **Check**: It looked on your computer for an image called `hello-world`.
2. **Download**: Since it was your first time, it didn't find it. So, it automatically went to the internet (Docker Hub) and downloaded it.
3. **Create**: It created a new container from that image.
4. **Run**: It ran the container, which printed a "Hello from Docker!" message to your screen.

### How to see running containers?

To see a list of containers that are currently running on your machine, use:

```bash
docker ps
```

To see ALL containers (even the ones that have finished running), use:

```bash
docker ps -a
```

---

### Key Takeaway
You don't need to manually download things. Just use `docker run`, and Docker handles the rest for you! ⚡
