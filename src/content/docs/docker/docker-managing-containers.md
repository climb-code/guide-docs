---
title: Managing Containers
description: Learn how to run, stop, and remove Docker containers with essential CLI commands.
---

Managing containers is one of the most common tasks you'll perform in Docker. This guide covers how to run, list, stop, and remove containers, along with some powerful flags to customize their behavior. 🚀

## 1. Running Containers

The `docker run` command is used to create and start a new container from an image.

### Basic Run
```bash
docker run <image_name>
```

### Advanced Run Flags
- **Detached Mode (`-d`)**: Runs the container in the background.
  ```bash
  docker run -d <image_name>
  ```
- **Naming a Container (`--name`)**: Assigns a specific name to your container.
  ```bash
  docker run --name my-container <image_name>
  ```
- **Port Mapping (`-p`)**: Maps a host port to a container port.
  ```bash
  docker run -p 8080:80 <image_name>
  ```
- **Volume Mounting (`-v`)**: Syncs a local directory with a container directory.
  ```bash
  docker run -v $(pwd):/app <image_name>
  ```
- **Interactive Shell (`-it`)**: Runs the container and opens an interactive terminal.
  ```bash
  docker run -it <image_name> sh
  ```

## 2. Monitoring & Logs

- **List Running Containers**:
  ```bash
  docker ps
  ```
- **List All Containers (including stopped)**:
  ```bash
  docker ps -a
  ```
- **View Container Logs**:
  ```bash
  docker logs <container_id_or_name>
  ```
- **Attach to a Running Container**:
  ```bash
  docker attach <container_id_or_name>
  ```

## 3. Stopping & Starting

- **Stop a Container**:
  ```bash
  docker stop <container_id_or_name>
  ```
- **Start a Stopped Container**:
  ```bash
  docker start <container_id_or_name>
  ```
- **Kill a Container (force stop)**:
  ```bash
  docker kill <container_id_or_name>
  ```

## 4. Removing Containers

- **Remove a Stopped Container**:
  ```bash
  docker rm <container_id_or_name>
  ```
- **Force Remove a Running Container**:
  ```bash
  docker rm -f <container_id_or_name>
  ```
- **Remove All Stopped Containers**:
  ```bash
  docker container prune
  ```

## 5. File Operations

- **Copy Files**: Copy files/folders between a container and the local filesystem.
  ```bash
  docker cp <container_id>:/path/to/file ./
  ```

---

### Pro Tip: Clean Up Everything 🧹
To stop all running containers at once, you can use:
```bash
docker stop $(docker ps -q)
```
And to remove all stopped containers, use `docker container prune`!
