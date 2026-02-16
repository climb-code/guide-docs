---
title: Install Docker on Linux
description: A simple guide to install Docker on Linux systems.
---

Installing Docker on Linux is usually done through the terminal. Don't worry, it's very straightforward! 🐧

### Step 1: Update your system

First, make sure your computer's list of software is up to date. Open your terminal and type:

```bash
sudo apt update
```

### Step 2: Install Docker

To install Docker, run this command:

```bash
sudo apt install docker.io -y
```

### Step 3: Start Docker

Now, make sure the Docker service is running:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Step 4: Verify the installation

Check if Docker is correctly installed by asking for its version:

```bash
docker --version
```

If you see a version number like `Docker version 24.0.5`, you are good to go! 🎉

---

### Tip for Linux Users
By default, you might need to use `sudo` before every docker command. To fix this and run docker without `sudo`, you can add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```
*(You will need to log out and log back in for this to work.)*
