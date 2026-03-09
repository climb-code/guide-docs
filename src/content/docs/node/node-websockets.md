---
title: WebSockets & Real-time Communication
description: Learn how to implement real-time, bi-directional communication in Node.js using Socket.io.
---

# WebSockets & Real-time Communication

WebSockets provide a persistent connection between a client and a server that both parties can use to start sending data at any time. This is essential for features like chat applications, live notifications, and real-time dashboards.

## 1. Why WebSockets?
Unlike HTTP, which is request-response based, WebSockets allow for:
- **Full-Duplex Communication**: Both server and client can send messages simultaneously.
- **Low Latency**: Once the connection is established, data can flow without the overhead of HTTP headers for every message.

## 2. Using Socket.io
[Socket.io](https://socket.io/) is the most popular library for WebSockets in Node.js. It provides a simple API and fallback options for older browsers.

### Installation
```bash
npm install socket.io
```

### Basic Server Setup (with Express)
```javascript
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    io.emit('chat message', msg); // Broadcast to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
```

## 3. Client-Side Implementation
```javascript
const socket = io(); // Connects to the server

// Sending a message
socket.emit('chat message', 'Hello Server!');

// Receiving a message
socket.on('chat message', (msg) => {
  console.log('New message: ' + msg);
});
```

> [!TIP]
> Use **Rooms** in Socket.io to group users together (e.g., chat rooms, specific notification channels).
