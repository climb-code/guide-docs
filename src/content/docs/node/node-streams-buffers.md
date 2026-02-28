---
title: Streams & Buffers
description: Handling large data efficiently with Streams and Buffers in Node.js.
---

# Streams & Buffers

When working with large files or network data, you don't want to load everything into memory at once. That's where Streams and Buffers come in.

## 1. Buffers
A Buffer is a way to handle binary data. It's essentially a fixed-size chunk of memory outside the V8 engine.

```javascript
// Create a buffer from a string
const buf = Buffer.from('Hello');

console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // Hello
console.log(buf[0]); // 72 (ASCII for 'H')
```

## 2. Streams
Streams allow you to read or write data piece by piece (chunks), rather than all at once.

### Reading with Streams
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('./large-file.txt', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('--- NEW CHUNK ---');
  console.log(chunk);
});
```

### Writing with Streams
```javascript
const writeStream = fs.createWriteStream('./output.txt');

writeStream.write('Hello from Stream!');
writeStream.end();
```

### Piping
Piping is a powerful way to connect a readable stream directly to a writable stream.
```javascript
readStream.pipe(writeStream);
```

> [!TIP]
> Use `.pipe()` whenever possible, as it manages the data flow (backpressure) for you automatically.
