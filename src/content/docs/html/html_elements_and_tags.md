---
title: HTML Elements and Tags
description: Deep dive into HTML elements and tags - learn the difference between tags and elements, common HTML tags, block vs inline elements, and semantic markup.
---


HTML elements are the building blocks of web pages. Understanding elements, tags, and their proper usage is fundamental to creating well-structured HTML documents.

## What are HTML Tags?

Tags are markup indicators that define the beginning and end of an HTML element:

```html
<tagname>Content</tagname>
```

- **Opening tag**: `<tagname>`
- **Closing tag**: `</tagname>`
- **Content**: Everything between the tags

## Tags vs Elements

```html
<!-- The TAG -->
<p>

<!-- The ELEMENT (complete structure) -->
<p>This is a paragraph.</p>

<!-- Opening tag + Content + Closing tag = Element -->
```

**In simple terms:**
- **Tag**: The markup (`<p>` and `</p>`)
- **Element**: The complete structure including content

## Self-Closing (Void) Elements

Some elements don't have content and close themselves:

```html
<!-- Common void elements -->
<br>                <!-- Line break -->
<hr>                <!-- Horizontal rule -->
<img src="pic.jpg" alt="Picture">
<input type="text">
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
```

**Both syntaxes work in HTML5:**
```html
<br>    <!-- HTML5 style -->
<br/>   <!-- XHTML style (also valid) -->
```

## Block-Level Elements

Block elements start on a new line and take up the full width available:

```html
<!-- Structural -->
<div>Generic container</div>
<section>Thematic grouping</section>
<article>Independent content</article>
<aside>Sidebar content</aside>

<!-- Text content -->
<p>Paragraph</p>
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<blockquote>Quote</blockquote>
<pre>Preformatted text</pre>

<!-- Lists -->
<ul>Unordered list</ul>
<ol>Ordered list</ol>
<dl>Description list</dl>

<!-- Other -->
<form>Form</form>
<table>Table</table>
<header>Header</header>
<footer>Footer</footer>
<nav>Navigation</nav>
<main>Main content</main>
```

### Example: Block Elements

```html
<div>This is a div block</div>
<p>This is a paragraph block</p>
<div>This is another div block</div>

<!-- Each element starts on a new line -->
```

**Output:**
```
This is a div block
This is a paragraph block
This is another div block
```

## Inline Elements

Inline elements don't start on a new line and only take up as much width as needed:

```html
<!-- Text formatting -->
<span>Generic inline container</span>
<strong>Strong importance (bold)</strong>
<em>Emphasis (italic)</em>
<b>Bold text</b>
<i>Italic text</i>
<small>Smaller text</small>
<mark>Highlighted text</mark>

<!-- Links and references -->
<a href="#">Link</a>
<code>Code snippet</code>
<abbr>Abbreviation</abbr>
<cite>Citation</cite>

<!-- Form elements -->
<input type="text">
<button>Click</button>
<label>Label</label>
```

### Example: Inline Elements

```html
<p>This is <strong>bold</strong> and this is <em>italic</em> text.</p>
```

**Output:**
```
This is **bold** and this is *italic* text.
```

## Semantic vs Non-Semantic Elements

### Semantic Elements

Elements with meaningful names that describe their content:

```html
<!-- Semantic -->
<header>Page or section header</header>
<nav>Navigation links</nav>
<main>Main content</main>
<article>Independent content</article>
<section>Related content grouping</section>
<aside>Sidebar or tangential content</aside>
<footer>Page or section footer</footer>
<figure>Media with caption</figure>
<figcaption>Caption for figure</figcaption>
<time>Date/time</time>
<mark>Highlighted text</mark>
```

### Non-Semantic Elements

Generic containers with no specific meaning:

```html
<!-- Non-semantic -->
<div>Generic block container</div>
<span>Generic inline container</span>
```

### Why Use Semantic Elements?

```html
<!-- ❌ Non-semantic (unclear purpose) -->
<div class="header">
    <div class="nav">Navigation</div>
</div>
<div class="content">Main content</div>
<div class="footer">Footer</div>

<!-- ✅ Semantic (clear purpose) -->
<header>
    <nav>Navigation</nav>
</header>
<main>Main content</main>
<footer>Footer</footer>
```

**Benefits:**
1. **Better SEO**: Search engines understand content structure
2. **Accessibility**: Screen readers navigate better
3. **Code readability**: Easier for developers to understand
4. **Maintenance**: Clearer structure for updates

## Common HTML Elements Reference

### Text Content

```html
<!-- Headings (h1 most important, h6 least) -->
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<h4>Level 4 Heading</h4>
<h5>Level 5 Heading</h5>
<h6>Level 6 Heading</h6>

<!-- Paragraphs -->
<p>Regular paragraph text.</p>

<!-- Line breaks -->
<p>Line one<br>Line two</p>

<!-- Horizontal line -->
<hr>

<!-- Preformatted text (preserves spaces and line breaks) -->
<pre>
    Text with
        preserved formatting
</pre>

<!-- Blockquote -->
<blockquote cite="source-url">
    This is a quoted text from another source.
</blockquote>
```

### Text Formatting

```html
<!-- Importance/Bold -->
<strong>Strong importance</strong>
<b>Bold text (stylistic)</b>

<!-- Emphasis/Italic -->
<em>Emphasized text</em>
<i>Italic text (technical term, foreign word)</i>

<!-- Other formatting -->
<u>Underlined text</u>
<s>Strikethrough</s>
<small>Smaller text</small>
<mark>Highlighted text</mark>
<sub>Subscript</sub>
<sup>Superscript</sup>

<!-- Code and technical -->
<code>inline code</code>
<kbd>Keyboard input</kbd>
<samp>Sample output</samp>
<var>Variable</var>
```

### Lists

```html
<!-- Unordered list -->
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- Description list -->
<dl>
    <dt>Term 1</dt>
    <dd>Definition 1</dd>
    <dt>Term 2</dt>
    <dd>Definition 2</dd>
</dl>
```

### Links and References

```html
<!-- Basic link -->
<a href="https://example.com">Click here</a>

<!-- Open in new tab -->
<a href="https://example.com" target="_blank">External link</a>

<!-- Email link -->
<a href="mailto:email@example.com">Send email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call us</a>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>

<!-- Anchor (same page) -->
<a href="#section">Jump to section</a>
<h2 id="section">Section Title</h2>
```

### Containers and Structure

```html
<!-- Generic containers -->
<div>Block-level container</div>
<span>Inline container</span>

<!-- Semantic structure -->
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content area</main>
<section>Thematic section</section>
<article>Independent article</article>
<aside>Sidebar content</aside>
<footer>Footer content</footer>
```

### Media

```html
<!-- Image -->
<img src="photo.jpg" alt="Description">

<!-- Figure with caption -->
<figure>
    <img src="diagram.jpg" alt="Diagram">
    <figcaption>Figure 1: System architecture</figcaption>
</figure>

<!-- Audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
</audio>

<!-- Video -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
</video>
```

## Nesting Elements

Elements can contain other elements:

```html
<div class="container">
    <header>
        <h1>Website Title</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <article>
            <h2>Article Title</h2>
            <p>Article content with <strong>bold</strong> text.</p>
        </article>
    </main>
</div>
```

**Nesting rules:**
1. Always close tags in reverse order of opening
2. Block elements can contain inline elements
3. Block elements can usually contain other block elements
4. Inline elements should only contain other inline elements

## Proper Nesting Examples

```html
<!-- ✅ Correct nesting -->
<p>This is <strong>properly nested</strong> text.</p>

<div>
    <p>Paragraph inside div.</p>
</div>

<!-- ❌ Wrong nesting (tags overlap) -->
<p>This is <strong>improperly nested</p></strong>

<!-- ❌ Wrong (inline contains block) -->
<span>
    <div>This shouldn't be here</div>
</span>

<!-- ✅ Correct (block contains inline) -->
<div>
    <span>This is fine</span>
</div>
```

## Special Characters (Entities)

Some characters are reserved in HTML and need special codes:

```html
<!-- Common entities -->
&lt;      <!-- < (less than) -->
&gt;      <!-- > (greater than) -->
&amp;     <!-- & (ampersand) -->
&quot;    <!-- " (quotation mark) -->
&apos;    <!-- ' (apostrophe) -->
&nbsp;    <!-- Non-breaking space -->
&copy;    <!-- © (copyright) -->
&reg;     <!-- ® (registered) -->
&trade;   <!-- ™ (trademark) -->
```

### Example Usage

```html
<p>Use &lt;p&gt; for paragraphs.</p>
<!-- Output: Use <p> for paragraphs. -->

<p>AT&amp;T Corporation</p>
<!-- Output: AT&T Corporation -->

<p>Price: $10&nbsp;USD</p>
<!-- Output: Price: $10 USD (space won't break) -->
```

## Element Attributes

Elements can have attributes providing additional information:

```html
<element attribute="value">Content</element>
```

### Global Attributes (work on any element)

```html
<!-- ID (unique identifier) -->
<div id="main-content">Content</div>

<!-- Class (can be used multiple times) -->
<p class="highlight important">Text</p>

<!-- Style (inline CSS) -->
<p style="color: blue; font-size: 16px;">Blue text</p>

<!-- Title (tooltip on hover) -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Data attributes (custom data) -->
<div data-user-id="123" data-role="admin">User info</div>

<!-- Hidden (hide element) -->
<div hidden>This is hidden</div>

<!-- Content editable -->
<div contenteditable="true">Edit this text</div>
```

## Best Practices

1. **Use semantic elements**: Choose meaningful tags
2. **Proper nesting**: Close tags in correct order
3. **Lowercase tags**: Always use lowercase
4. **Quote attributes**: Even if not always required
5. **Alt text for images**: Always include descriptive alt
6. **Close all tags**: Even optional ones for clarity
7. **One h1 per page**: Use heading hierarchy properly
8. **Validate HTML**: Check for proper element usage

## Common Mistakes

```html
<!-- ❌ Missing closing tags -->
<p>Paragraph 1
<p>Paragraph 2

<!-- ❌ Uppercase tags -->
<DIV>Content</DIV>

<!-- ❌ Improper nesting -->
<p><div>Wrong</div></p>

<!-- ❌ Multiple spaces (rendered as single space) -->
<p>Multiple     spaces</p>

<!-- ✅ Use non-breaking spaces for multiple spaces -->
<p>Multiple&nbsp;&nbsp;&nbsp;&nbsp;spaces</p>

<!-- ❌ Using deprecated tags -->
<center>Centered text</center>  <!-- Use CSS instead -->
<font color="red">Red</font>     <!-- Use CSS instead -->
```

## Practical Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blog Post</title>
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
    
    <main>
        <article>
            <h2>Understanding HTML Elements</h2>
            <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
            
            <p>
                HTML elements are the <strong>building blocks</strong> of web pages.
                They define <em>structure</em> and <em>meaning</em>.
            </p>
            
            <figure>
                <img src="html-diagram.jpg" alt="HTML structure diagram">
                <figcaption>Figure 1: HTML structure</figcaption>
            </figure>
            
            <h3>Key Points</h3>
            <ul>
                <li>Use semantic elements</li>
                <li>Nest properly</li>
                <li>Always close tags</li>
            </ul>
            
            <blockquote>
                "The web is more a social creation than a technical one."
                <cite>- Tim Berners-Lee</cite>
            </blockquote>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2024 My Blog. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Summary

- HTML tags define elements
- Elements are the complete structure (opening tag + content + closing tag)
- Block elements start on new lines, inline elements don't
- Semantic elements have meaningful names
- Proper nesting is crucial
- Some elements are self-closing/void
- Use appropriate elements for better SEO and accessibility

Master these fundamental concepts, and you'll create well-structured, accessible HTML documents!
