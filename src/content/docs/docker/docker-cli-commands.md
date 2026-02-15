---
title: Docker CLI Commands
description: A handy reference for the most common Docker commands you'll use every day.
---

Here is a simple list of the most common Docker commands to help you manage your containers and images. 💻

### 1. Working with Containers

- **Run a container**: starts a new container from an image.
  ```bash
  docker run <image_name>
  ```
- **List running containers**:
  ```bash
  docker ps
  ```
- **List ALL containers** (running and stopped):
  ```bash
  docker ps -a
  ```
- **Stop a running container**:
  ```bash
  docker stop <container_id>
  ```
- **Start a stopped container**:
  ```bash
  docker start <container_id>
  ```
- **Remove a container**:
  ```bash
  docker rm <container_id>
  ```

### 2. Working with Images

- **List all images** on your computer:
  ```bash
  docker images
  ```
- **Download (pull) an image** from Docker Hub:
  ```bash
  docker pull <image_name>
  ```
- **Remove an image**:
  ```bash
  docker rmi <image_name>
  ```

### 3. Cleaning Up

- **Remove all stopped containers, unused networks, and dangling images**:
  ```bash
  docker system prune
  ```

---

### Pro Tip
If you are ever stuck, you can always type `docker --help` or `docker <command> --help` to see what options are available! 💡
