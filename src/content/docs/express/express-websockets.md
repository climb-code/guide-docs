---
title: WebSockets in Express.js with Socket.io
description: Learn how to implement real-time, bidirectional communication in your Express.js applications using Socket.io.
---

Standard HTTP requests follow a request-response pattern where the client initiates communication. However, for features like live chat, real-time notifications, or collaborative tools, you need **WebSockets**—a technology that allows for a persistent, bidirectional connection between the server and the client.

In this guide, we'll use **Socket.io**, the most popular library for WebSockets in the Node.js ecosystem, to build a real-time feature in an Express app.

---

## What is Socket.io?

Socket.io is a library that enables real-time, event-based communication. It consists of:
1. A **Server-side library** for Node.js.
2. A **Client-side library** for the browser.

It provides features like automatic reconnection, binary support, and "rooms" for grouping clients, which standard WebSockets don't provide out of the box.

---

## Setting Up Socket.io with Express

### Installation
```bash
npm install socket.io
```

### Server-side Implementation
To use Socket.io with Express, you need to use the native Node `http` module to create a server and pass it to both Express and Socket.io.

**server.js**:
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a custom event from the client
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## Client-side Implementation

In your `index.html`, you need to include the Socket.io client library.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.io Chat</title>
  </head>
  <body>
    <ul id="messages"></ul>
    <input id="input" autocomplete="off" /><button id="send">Send</button>

    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();

      const sendBtn = document.getElementById('send');
      const input = document.getElementById('input');
      const messages = document.getElementById('messages');

      sendBtn.addEventListener('click', () => {
        if (input.value) {
          // Emit event to the server
          socket.emit('chat message', input.value);
          input.value = '';
        }
      });

      // Listen for events from the server
      socket.on('chat message', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
      });
    </script>
  </body>
</html>
```

---

## Advanced Features

### 1. Rooms
Rooms allow you to send messages only to a specific group of clients.
```javascript
socket.join('room-1');
io.to('room-1').emit('exclusive event', 'Hello Room 1');
```

### 2. Namespaces
Namespaces allow you to split the logic of your application over a single shared connection.
```javascript
const adminNamespace = io.of('/admin');
adminNamespace.on('connection', (socket) => {
  // Logic for admin namespace
});
```

---

## Key Takeaways

- **WebSockets** provide a persistent, bidirectional connection.
- **Socket.io** simplifies WebSocket implementation with fallback support and extra features.
- You must wrap your Express app in a **native HTTP server** to use Socket.io.
- Use `io.emit()` to broadcast to everyone, and `socket.emit()` to send to a specific client.

Real-time communication opens up a world of possibilities for interactive web applications!
