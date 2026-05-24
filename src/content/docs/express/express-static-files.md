---
title: Serving Static Files in Express
description: Learn how to serve static assets such as images, CSS, and JavaScript files using the express.static middleware.
---

# Serving Static Files in Express

To serve static files such as images, CSS files, and JavaScript files, Express.js provides a built-in middleware function: `express.static`.

Understanding how to serve static assets is crucial for building complete web applications where frontend assets need to be delivered to the client.

## The `express.static` Middleware

The `express.static` middleware function is the only built-in middleware in Express. It has the following signature:

```javascript
express.static(root, [options])
```

- **`root`**: Specifies the root directory from which to serve static assets.
- **`options`**: (Optional) An object containing configuration options (like setting headers, maxAge, etc.).

## 1. Basic Usage

To start serving files, pass the name of the directory that contains the static assets to the `express.static` middleware.

For example, if you have a folder named `public` at the root of your project:

```javascript
import express from 'express';
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Now, you can load the files that are in the `public` directory:

```text
http://localhost:3000/images/logo.png
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
```

> [!NOTE]
> Express looks up the files relative to the static directory, so the name of the static directory is **not** part of the URL.

## 2. Using an Absolute Path

The path that you provide to the `express.static` function is relative to the directory from where you launch your `node` process. If you run the Express app from another directory, it is safer to use the absolute path of the directory you want to serve:

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name when using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files using absolute path
app.use(express.static(path.join(__dirname, 'public')));
```

## 3. Creating a Virtual Path Prefix

To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by `express.static`, specify a mount path for the middleware function, as shown below:

```javascript
// Files will be accessible under the /static prefix
app.use('/static', express.static(path.join(__dirname, 'public')));
```

Now, you can load the files that are in the `public` directory from the `/static` path prefix:

```text
http://localhost:3000/static/images/logo.png
http://localhost:3000/static/css/style.css
```

## 4. Serving Multiple Directories

To serve static files from multiple directories, call the `express.static` middleware function multiple times:

```javascript
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));
```

Express looks up the files in the order in which you define the middleware functions.

## Best Practices

> [!IMPORTANT]
> - **Security**: Do not put sensitive files (like configuration files, environment variables, or server code) inside your static directory.
> - **Performance**: For production applications, it is highly recommended to use a reverse proxy like **Nginx** or a **Content Delivery Network (CDN)** to serve static files instead of relying on Node.js, as they are optimized for static asset delivery.
> - **Caching**: Use the `maxAge` option to leverage browser caching for better performance:
>   ```javascript
>   app.use(express.static('public', {
>     maxAge: '1d' // Cache files for 1 day
>   }));
>   ```
