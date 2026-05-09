---
title: Template Engines in Express.js
description: Learn how to use template engines like EJS, Pug, and Handlebars to create dynamic HTML pages in Express.js.
---

Template engines allow you to create dynamic HTML content by injecting data into predefined templates. Instead of sending static HTML files, your server can "render" a view based on the data provided at runtime.

In this guide, we'll explore how to set up and use template engines in Express, with a focus on **EJS (Embedded JavaScript)**, one of the most popular choices.

---

## What is a Template Engine?

A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easy to design an HTML page while still being able to display dynamic data.

Some popular template engines for Express include:
- **EJS**: Uses plain JavaScript within HTML tags.
- **Pug (formerly Jade)**: Uses a simplified, indentation-based syntax.
- **Handlebars**: Uses a clean, logic-less syntax with "mustache" tags.

---

## Setting Up a Template Engine

To use a template engine in Express, you need to:
1. Install the engine via npm.
2. Tell Express which engine to use.
3. Specify where the template files are located (usually a `views` folder).

### Example: Setting Up EJS

First, install EJS:
```bash
npm install ejs
```

Then, configure your Express app:
```javascript
const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Specify the directory where templates are stored
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  // Data to pass to the template
  const userData = {
    name: 'Saurabh',
    role: 'Developer'
  };

  // Render the 'index.ejs' file and pass the data
  res.render('index', { user: userData });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Creating a Template (EJS)

In your `views` directory, create a file named `index.ejs`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Express EJS Template</title>
</head>
<body>
    <h1>Welcome, <%= user.name %>!</h1>
    <p>Your current role is: <%= user.role %></p>

    <% if (user.role === 'Admin') { %>
        <button>Go to Admin Panel</button>
    <% } %>
</body>
</html>
```

### EJS Syntax Basics:
- `<%= ... %>`: Outputs the value of a variable (escapes HTML).
- `<%- ... %>`: Outputs the raw value (useful for rendering HTML strings).
- `<% ... %>`: Used for control flow (if/else, loops) without outputting text.

---

## Why Use Template Engines?

1. **Dynamic Content**: Easily display data from databases or APIs.
2. **Reusability**: Use partials (templates within templates) for headers, footers, and sidebars.
3. **Separation of Concerns**: Keep your HTML structure separate from your server-side logic.

---

## Key Takeaways

- Express supports many template engines through the `view engine` setting.
- Use `app.set('views', 'path')` to define your template directory.
- Use `res.render('filename', data)` to compile a template and send the result.
- Template engines are essential for building traditional server-side rendered (SSR) web applications.

Now you can start building dynamic web pages with Express.js!
