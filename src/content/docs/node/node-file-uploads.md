---
title: File Uploads (Multer)
description: Handling multipart/form-data for file uploads in Express.
---

# File Uploads with Multer

Handling file uploads in Node.js requires parsing `multipart/form-data`. The most popular middleware for this is **Multer**.

## 1. Installation
```bash
npm install multer
```

## 2. Basic Setup
Multer adds a `file` or `files` object to the `request` object.

```javascript
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.send('File uploaded!');
});
```

## 3. Custom Storage Configuration
To control the filename and destination more precisely, use `diskStorage`.

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
```

## 4. File Filters and Limits
Always validate file types and sizes to avoid security risks.

```javascript
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed!'), false);
    }
  }
});
```

> [!CAUTION]
> Never use `dest` and `storage` together. Also, ensure the upload directory exists before starting the server.
