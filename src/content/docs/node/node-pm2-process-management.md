---
title: Process Management with PM2
description: Starting, scaling, and managing Node.js applications in production using PM2.
---

# Process Management with PM2

While `node app.js` is fine for development, production environments require a process manager to keep the application running continuously, automatically restart it upon crashes, and manage logs. [PM2](https://pm2.keymetrics.io/) is the industry standard for this.

## 1. Installing PM2
Install PM2 globally so the command is available anywhere on your system:
```bash
npm install -g pm2
```

## 2. Basic Commands

### Starting an application
```bash
pm2 start app.js --name "my-node-api"
```

### Listing running apps
```bash
pm2 list
pm2 status
```

### Restarting / Stopping / Deleting
```bash
pm2 restart my-node-api
pm2 stop my-node-api
pm2 delete my-node-api
```

### Viewing Logs
To see real-time logs for your application:
```bash
pm2 logs my-node-api
```

## 3. Cluster Mode
Node.js is single-threaded. PM2 can automatically scale your application across all available CPU cores using Cluster Mode, maximizing performance.

```bash
pm2 start app.js -i max
```
*(The `-i max` flag tells PM2 to start as many instances as there are CPU cores).*

## 4. PM2 Ecosystem File
Instead of passing long command-line arguments, you can define a configuration file.

Generate a template:
```bash
pm2 init
```

Example `ecosystem.config.js`:
```javascript
module.exports = {
  apps : [{
    name   : "my-api",
    script : "./app.js",
    instances: "max",
    env_production: {
       NODE_ENV: "production",
       PORT: 8080
    }
  }]
}
```
Run with: `pm2 start ecosystem.config.js --env production`

## 5. Startup Script
To ensure PM2 automatically starts your Node apps when the server reboots:
```bash
pm2 startup
pm2 save
```
