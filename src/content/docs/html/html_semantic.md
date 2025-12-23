---
title: Semantic HTML
description: Learn semantic HTML elements that add meaning to your web pages - improve SEO, accessibility, and code maintainability with proper semantic markup.
---


Semantic HTML uses elements that clearly describe their meaning and purpose. This improves SEO, accessibility, and code readability.

## What is Semantic HTML?

**Semantic** = meaningful

Semantic elements clearly describe their content to both browsers and developers.

```html
<!-- ❌ Non-semantic (unclear purpose) -->
<div class="header">
    <div class="nav">Navigation</div>
</div>
<div class="main">
    <div class="article">Content</div>
</div>
<div class="footer">Footer</div>

<!-- ✅ Semantic (clear purpose) -->
<header>
    <nav>Navigation</nav>
</header>
<main>
    <article>Content</article>
</main>
<footer>Footer</footer>
```

## Why Use Semantic HTML?

1. **Better SEO**: Search engines understand content better
2. **Accessibility**: Screen readers navigate more easily
3. **Readability**: Code is self-documenting
4. **Maintenance**: Easier to update and modify
5. **Consistency**: Standard elements across the web

## Document Structure Elements

### `<header>`

Introductory content or navigation:

```html
<!-- Page header -->
<header>
    <img src="logo.png" alt="Company Logo">
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>

<!-- Article header -->
<article>
    <header>
        <h2>Article Title</h2>
        <p>By John Doe - January 15, 2024</p>
    </header>
    <p>Article content...</p>
</article>
```

### `<nav>`

Navigation links:

```html
<!-- Main navigation -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<!-- Secondary navigation -->
<nav aria-label="Breadcrumb">
    <a href="/">Home</a> &gt;
    <a href="/products">Products</a> &gt;
    <span>Laptops</span>
</nav>
```

### `<main>`

Main content of the document (only one per page):

```html
<body>
    <header>Page header</header>
    
    <main>
        <!-- Main page content goes here -->
        <h1>Page Title</h1>
        <p>Main content...</p>
    </main>
    
    <footer>Page footer</footer>
</body>
```

### `<article>`

Self-contained, independently distributable content:

```html
<!-- Blog post -->
<article>
    <h2>Blog Post Title</h2>
    <p>Published on <time>2024-01-15</time></p>
    <p>Blog post content...</p>
</article>

<!-- News article -->
<article>
    <h2>Breaking News</h2>
    <p>News content...</p>
</article>

<!-- Product listing -->
<article>
    <h3>Product Name</h3>
    <p>Product description...</p>
    <p>Price: $99</p>
</article>
```

### `<section>`

Thematic grouping of content:

```html
<article>
    <h1>Complete HTML Guide</h1>
    
    <section>
        <h2>Introduction</h2>
        <p>Introduction content...</p>
    </section>
    
    <section>
        <h2>Getting Started</h2>
        <p>Tutorial content...</p>
    </section>
    
    <section>
        <h2>Advanced Topics</h2>
        <p>Advanced content...</p>
    </section>
</article>
```

### `<aside>`

Sidebar or tangentially related content:

```html
<main>
    <article>
        <h1>Main Article</h1>
        <p>Article content...</p>
    </article>
    
    <aside>
        <h3>Related Articles</h3>
        <ul>
            <li><a href="#">Related 1</a></li>
            <li><a href="#">Related 2</a></li>
        </ul>
    </aside>
</main>
```

### `<footer>`

Footer for a page or section:

```html
<!-- Page footer -->
<footer>
    <p>&copy; 2024 Company Name</p>
    <nav>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
    </nav>
</footer>

<!-- Article footer -->
<article>
    <h2>Article Title</h2>
    <p>Content...</p>
    <footer>
        <p>Author: John Doe</p>
        <p>Tags: HTML, Tutorial</p>
    </footer>
</article>
```

## Content Sectioning

### `<h1>` to `<h6>`

Heading hierarchy:

```html
<article>
    <h1>Main Title</h1>
    
    <h2>Section 1</h2>
    <p>Content...</p>
    
    <h3>Subsection 1.1</h3>
    <p>Content...</p>
    
    <h3>Subsection 1.2</h3>
    <p>Content...</p>
    
    <h2>Section 2</h2>
    <p>Content...</p>
</article>
```

### `<address>`

Contact information:

```html
<footer>
    <address>
        <p>Contact us:</p>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
        <p>Address: 123 Main St, City, State 12345</p>
    </address>
</footer>
```

## Text Semantics

### `<mark>`

Highlighted text:

```html
<p>Search results for <mark>HTML</mark> tutorial</p>
```

### `<time>`

Date and time:

```html
<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
<p>Event at <time datetime="14:30">2:30 PM</time></p>
<p>Born in the <time datetime="1990s">nineties</time></p>
```

### `<figure>` and `<figcaption>`

Media with caption:

```html
<figure>
    <img src="chart.jpg" alt="Sales chart">
    <figcaption>Figure 1: Quarterly sales performance</figcaption>
</figure>

<figure>
    <pre><code>
function greet() {
    console.log("Hello!");
}
    </code></pre>
    <figcaption>Example: Simple JavaScript function</figcaption>
</figure>
```

### `<details>` and `<summary>`

Collapsible content:

```html
<details>
    <summary>Click to expand</summary>
    <p>Hidden content that appears when expanded...</p>
</details>

<!-- FAQ example -->
<details>
    <summary>What is HTML?</summary>
    <p>HTML stands for HyperText Markup Language...</p>
</details>

<details>
    <summary>What is CSS?</summary>
    <p>CSS stands for Cascading Style Sheets...</p>
</details>
```

### `<dialog>`

Modal or dialog box:

```html
<dialog id="myDialog">
    <h2>Dialog Title</h2>
    <p>Dialog content...</p>
    <button onclick="document.getElementById('myDialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">Open Dialog</button>
```

## Complete Semantic Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <!-- Page Header -->
    <header>
        <img src="logo.png" alt="Site Logo">
        <nav aria-label="Main Navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- Main Content -->
    <main>
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb">
            <a href="/">Home</a> &gt;
            <a href="/blog">Blog</a> &gt;
            <span>Article Title</span>
        </nav>
        
        <!-- Main Article -->
        <article>
            <header>
                <h1>Understanding Semantic HTML</h1>
                <p>
                    By <span>John Doe</span> on 
                    <time datetime="2024-01-15">January 15, 2024</time>
                </p>
            </header>
            
            <section>
                <h2>Introduction</h2>
                <p>Semantic HTML is important because...</p>
            </section>
            
            <section>
                <h2>Main Concepts</h2>
                <p>The key semantic elements include...</p>
                
                <figure>
                    <img src="diagram.jpg" alt="HTML structure diagram">
                    <figcaption>Figure 1: Semantic HTML structure</figcaption>
                </figure>
            </section>
            
            <section>
                <h2>Best Practices</h2>
                <p>When using semantic HTML...</p>
            </section>
            
            <footer>
                <p>Tags: <a href="/tags/html">HTML</a>, <a href="/tags/semantics">Semantics</a></p>
                <p>Share this article</p>
            </footer>
        </article>
        
        <!-- Sidebar -->
        <aside>
            <section>
                <h3>Related Articles</h3>
                <ul>
                    <li><a href="#">HTML Basics</a></li>
                    <li><a href="#">Accessibility Guide</a></li>
                    <li><a href="#">SEO Tips</a></li>
                </ul>
            </section>
            
            <section>
                <h3>Categories</h3>
                <nav aria-label="Categories">
                    <ul>
                        <li><a href="/category/html">HTML</a></li>
                        <li><a href="/category/css">CSS</a></li>
                        <li><a href="/category/javascript">JavaScript</a></li>
                    </ul>
                </nav>
            </section>
        </aside>
    </main>
    
    <!-- Page Footer -->
    <footer>
        <section>
            <h3>About Us</h3>
            <p>We provide quality web development tutorials...</p>
        </section>
        
        <section>
            <h3>Quick Links</h3>
            <nav aria-label="Footer Navigation">
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/sitemap">Sitemap</a></li>
                </ul>
            </nav>
        </section>
        
        <address>
            <p>Contact: <a href="mailto:info@example.com">info@example.com</a></p>
        </address>
        
        <p>&copy; 2024 Example Site. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Semantic vs Non-Semantic

```html
<!-- ❌ Non-semantic -->
<div id="header">
    <div id="nav">
        <div class="link"><a href="/">Home</a></div>
        <div class="link"><a href="/about">About</a></div>
    </div>
</div>
<div id="main">
    <div class="post">
        <div class="post-title">Title</div>
        <div class="post-content">Content</div>
    </div>
</div>
<div id="sidebar">
    <div class="widget">Widget</div>
</div>
<div id="footer">
    <div class="copyright">Copyright 2024</div>
</div>

<!-- ✅ Semantic -->
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>
<main>
    <article>
        <h1>Title</h1>
        <p>Content</p>
    </article>
</main>
<aside>
    <section>Widget</section>
</aside>
<footer>
    <p>Copyright 2024</p>
</footer>
```

## Best Practices

1. **Use semantic elements**: Choose meaningful tags over `<div>` and `<span>`
2. **One `<main>` per page**: Only one main content area
3. **One `<h1>` per page**: Use for the main page title
4. **Proper heading hierarchy**: Don't skip levels
5. **Use `<article>` for independent content**: Blog posts, news articles
6. **Use `<section>` for thematic groups**: Related content
7. **Use `<aside>` for tangential content**: Sidebars, related links
8. **Add ARIA labels**: Improve accessibility for screen readers
9. **Validate your HTML**: Ensure proper structure
10. **Think about meaning, not appearance**: Use CSS for styling

## Common Mistakes

```html
<!-- ❌ Multiple <main> elements -->
<main>Content 1</main>
<main>Content 2</main>

<!-- ❌ <div> overuse -->
<div class="container">
    <div class="wrapper">
        <div class="content">Text</div>
    </div>
</div>

<!-- ❌ Using semantic elements for styling only -->
<article class="red-box">This isn't really an article</article>

<!-- ✅ Correct approach -->
<main>
    <article>
        <h2>Article Title</h2>
        <p>Content...</p>
    </article>
</main>
```

## Accessibility Benefits

```html
<!-- Screen readers can navigate by landmarks -->
<header>           <!-- landmark: banner -->
<nav>              <!-- landmark: navigation -->
<main>             <!-- landmark: main -->
<aside>            <!-- landmark: complementary -->
<footer>           <!-- landmark: contentinfo -->

<!-- Better navigation for assistive technology -->
<nav aria-label="Main menu">
    <ul>
        <li><a href="/">Home</a></li>
    </ul>
</nav>

<nav aria-label="Breadcrumb">
    <a href="/">Home</a>
</nav>
```

## Summary

- Semantic HTML uses meaningful elements
- Improves SEO, accessibility, and code readability
- Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Choose semantic elements over `<div>` and `<span>` when possible
- One `<main>` and one `<h1>` per page
- Proper heading hierarchy is crucial
- Think about meaning, not just appearance
- Semantic HTML is standard practice in modern web development

Semantic HTML creates better websites for everyone - users, developers, and search engines!
