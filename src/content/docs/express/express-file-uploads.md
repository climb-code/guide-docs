---
title: File Uploads in Express.js
description: Learn how to handle file uploads in Express.js using the Multer middleware.
---

Handling file uploads (like images, PDFs, or videos) is a common requirement for many web applications. In the Express.js ecosystem, **Multer** is the standard middleware used for handling `multipart/form-data`, which is primarily used for uploading files.

In this guide, we'll cover how to install, configure, and use Multer to handle single and multiple file uploads.

---

## What is Multer?

Multer is a Node.js middleware for handling `multipart/form-data`. It adds a `body` object and a `file` (or `files`) object to the `request` object. The `body` object contains the values of the text fields of the form, and the `file` object contains the files uploaded via the form.

---

## Getting Started

First, install Multer via npm:

```bash
npm install multer
```

### Basic Setup

Here’s a simple example of how to set up Multer to store uploaded files in a local folder.

```javascript
const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Single file upload route
app.post('/upload-profile', upload.single('profile_pic'), (req, res) => {
  // req.file is the `profile_pic` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.send('File uploaded successfully!');
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

---

## Uploading Multiple Files

To upload multiple files, you can use `upload.array()` for multiple files with the same field name, or `upload.fields()` for multiple files with different field names.

### Using `upload.array()`

```javascript
app.post('/upload-photos', upload.array('photos', 12), (req, res) => {
  // req.files is array of `photos` files
  console.log(req.files);
  res.send('Photos uploaded!');
});
```

---

## File Validation and Filtering

You can limit file sizes and filter file types (e.g., only allowing images) using the `fileFilter` option.

```javascript
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});
```

---

## Key Takeaways

- **Multer** is the go-to middleware for `multipart/form-data`.
- Use **diskStorage** for fine-grained control over file destinations and naming.
- `upload.single()` is for one file, `upload.array()` for many files under one name.
- Always implement **file size limits** and **type filtering** for security and performance.

Now you can easily integrate file upload functionality into your Express.js applications!
