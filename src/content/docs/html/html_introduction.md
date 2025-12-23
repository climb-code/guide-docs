---
title: Introduction to HTML
description: Learn the basics of HTML - the foundation of web development. Understand what HTML is, its history, and why it's essential for creating web pages.
---


HTML (HyperText Markup Language) is the standard markup language for creating web pages. It's the foundation of web development and describes the structure and content of web pages.

## What is HTML?

HTML stands for **HyperText Markup Language**:

- **HyperText**: Refers to text that contains links to other texts
- **Markup**: Refers to tags used to define elements within a document
- **Language**: A set of rules and syntax for creating web documents

HTML is not a programming language - it's a markup language that tells web browsers how to structure and display content.

## A Brief History of HTML

```
1991 - HTML 1.0: Tim Berners-Lee creates the first version
1995 - HTML 2.0: The first standard version
1997 - HTML 3.2: Added tables, applets, text flow
1999 - HTML 4.01: Improved accessibility and styling
2014 - HTML5: Modern features, multimedia, semantic elements
2021 - HTML Living Standard: Continuously updated by WHATWG
```

## Why Learn HTML?

1. **Foundation of the Web**: Every website uses HTML
2. **Easy to Learn**: Simple syntax and structure
3. **Universal**: Works on all browsers and devices
4. **Career Essential**: Required for web development jobs
5. **Gateway to Other Technologies**: Foundation for CSS, JavaScript, and frameworks

## How HTML Works

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
```

**What happens:**
1. You write HTML code in a text file with `.html` extension
2. Browser reads the file
3. Browser interprets the HTML tags
4. Content is displayed on the screen

## Basic HTML Structure

Every HTML document has a basic structure:

```html
<!DOCTYPE html>           <!-- Declares HTML5 document -->
<html lang="en">         <!-- Root element -->
<head>                   <!-- Document metadata -->
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>                   <!-- Visible content -->
    <!-- Your content goes here -->
</body>
</html>
```

## HTML Elements

HTML uses **elements** to mark up content. An element consists of:

```html
<tagname>Content goes here</tagname>
```

**Parts of an HTML element:**
- **Opening tag**: `<tagname>`
- **Content**: The content between tags
- **Closing tag**: `</tagname>`

### Common HTML Elements

```html
<!-- Heading -->
<h1>This is a heading</h1>

<!-- Paragraph -->
<p>This is a paragraph.</p>

<!-- Link -->
<a href="https://example.com">Click here</a>

<!-- Image -->
<img src="image.jpg" alt="Description">

<!-- List -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

## Self-Closing Tags

Some elements don't have content and close themselves:

```html
<br>        <!-- Line break -->
<hr>        <!-- Horizontal rule -->
<img src="photo.jpg" alt="Photo">
<input type="text">
<meta charset="UTF-8">
```

## HTML Attributes

Attributes provide additional information about elements:

```html
<element attribute="value">Content</element>
```

**Common attributes:**

```html
<!-- href for links -->
<a href="https://google.com">Google</a>

<!-- src for images -->
<img src="logo.png" alt="Company Logo">

<!-- class for styling -->
<div class="container">Content</div>

<!-- id for unique identification -->
<p id="intro">Introduction text</p>

<!-- style for inline CSS -->
<h1 style="color: blue;">Blue Heading</h1>
```

## Your First HTML Page

Let's create a simple but complete web page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Personal Page</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>Hello! I'm learning HTML and building my first website.</p>
        </section>
        
        <section id="contact">
            <h2>Contact</h2>
            <p>Email: hello@example.com</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>
```

## HTML Comments

Comments are ignored by browsers but help you document your code:

```html
<!-- This is a comment -->

<!-- 
    Multi-line comment
    Can span multiple lines
-->

<p>This is visible</p> <!-- This comment is not visible -->
```

## Case Sensitivity

HTML is **not case-sensitive**, but use lowercase for consistency:

```html
<!-- All valid, but use lowercase -->
<P>Paragraph</P>
<p>Paragraph</p>
<P>Paragraph</p>

<!-- Best practice: -->
<p>Paragraph</p>
```

## Nesting Elements

Elements can be nested inside other elements:

```html
<div>
    <h2>Section Title</h2>
    <p>This is a <strong>paragraph</strong> with <em>nested</em> elements.</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>
```

**Important**: Proper nesting order matters!

```html
<!-- Correct -->
<p>This is <strong>bold text</strong></p>

<!-- Wrong -->
<p>This is <strong>bold text</p></strong>
```

## Block vs Inline Elements

**Block elements**: Start on a new line and take full width
```html
<div>Block element</div>
<h1>Block element</h1>
<p>Block element</p>
<ul>Block element</ul>
```

**Inline elements**: Don't start on a new line, only take needed space
```html
<span>Inline element</span>
<a href="#">Inline element</a>
<strong>Inline element</strong>
<em>Inline element</em>
```

## Development Tools

### Text Editors
- **VS Code** (recommended)
- Sublime Text
- Atom
- Notepad++

### Browsers for Testing
- Chrome (with DevTools)
- Firefox (with Developer Tools)
- Safari
- Edge

### Opening DevTools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

## Best Practices

1. **Always include DOCTYPE**: `<!DOCTYPE html>`
2. **Use lowercase tags**: `<div>` not `<DIV>`
3. **Close all tags**: Even optional ones for consistency
4. **Indent properly**: Makes code readable
5. **Use semantic HTML**: Use meaningful tags
6. **Add alt text to images**: For accessibility
7. **Validate your HTML**: Use W3C validator

## Common Mistakes to Avoid

```html
<!-- Missing closing tags -->
<p>Paragraph
<div>Content

<!-- Incorrect nesting -->
<p>Text <strong>bold</p></strong>

<!-- Missing DOCTYPE -->
<html>
<body>Content</body>
</html>

<!-- Not closing self-closing tags in XHTML -->
<img src="photo.jpg">  <!-- HTML5 OK -->
<img src="photo.jpg"/> <!-- XHTML style -->
```

## Testing Your HTML

1. **Save the file**: Save as `index.html`
2. **Open in browser**: Double-click the file or right-click → Open with browser
3. **View the result**: See your page rendered
4. **Inspect**: Right-click → Inspect Element to see the structure

## What's Next?

Now that you understand the basics of HTML, you'll learn:
- Document structure in detail
- Text formatting and headings
- Links and navigation
- Images and media
- Forms and user input
- Semantic HTML and accessibility
- HTML5 features

## Summary

- HTML is the markup language for creating web pages
- It uses tags to structure content
- Elements can have attributes for additional information
- HTML documents have a standard structure
- Browsers interpret HTML and display the content
- HTML is easy to learn and essential for web development

Start practicing by creating simple HTML pages, and gradually build more complex structures as you learn more elements and techniques!
