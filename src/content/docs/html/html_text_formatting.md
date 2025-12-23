---
title: HTML Text Formatting
description: Learn how to format text in HTML using headings, paragraphs, line breaks, text formatting tags, and semantic text elements for proper document structure.
---

Text formatting is fundamental to creating readable and well-structured web content. HTML provides various elements for formatting and structuring text.

## Headings

HTML has six levels of headings, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>Main Heading - Level 1</h1>
<h2>Subheading - Level 2</h2>
<h3>Sub-subheading - Level 3</h3>
<h4>Level 4 Heading</h4>
<h5>Level 5 Heading</h5>
<h6>Level 6 Heading</h6>
```

###

 Heading Hierarchy

**Always follow proper hierarchy:**

```html
<!-- ✅ Correct hierarchy -->
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
    <h3>Subsection 2.1</h3>

<!-- ❌ Wrong (skipping levels) -->
<h1>Page Title</h1>
  <h4>This skips h2 and h3</h4>
```

**Best practices:**
- One `<h1>` per page (the main title)
- Don't skip heading levels
- Use headings for structure, not just styling
- Keep headings descriptive and concise

```html
<article>
    <h1>Complete Guide to HTML</h1>
    
    <h2>Introduction</h2>
    <p>HTML is the foundation...</p>
    
    <h2>Getting Started</h2>
    <p>To begin learning HTML...</p>
    
    <h3>Installing a Text Editor</h3>
    <p>You'll need a text editor...</p>
    
    <h3>Creating Your First File</h3>
    <p>Create a new file...</p>
</article>
```

## Paragraphs

The `<p>` tag defines a paragraph:

```html
<p>This is a paragraph of text.</p>
<p>This is another paragraph.</p>
```

**Browsers automatically:**
- Add space before and after paragraphs
- Ignore extra spaces and line breaks in your code

```html
<!-- This: -->
<p>This    has    extra    spaces
and line breaks
in the code.</p>

<!-- Renders as: -->
This has extra spaces and line breaks in the code.
```

## Line Breaks

### `<br>` - Line Break

Inserts a line break without starting a new paragraph:

```html
<p>
    First line<br>
    Second line<br>
    Third line
</p>
```

### `<hr>` - Horizontal Rule

Creates a thematic break (horizontal line):

```html
<p>Section one content.</p>
<hr>
<p>Section two content.</p>
```

## Text Emphasis and Importance

### Strong Importance - `<strong>`

Indicates strong importance (renders as bold):

```html
<p>This is <strong>very important</strong> text.</p>
```

### Emphasis - `<em>`

Indicates emphasis (renders as italic):

```html
<p>This is <em>emphasized</em> text.</p>
```

### Bold - `<b>`

Bold text without semantic importance:

```html
<p>Product name: <b>Ultra Laptop Pro</b></p>
```

### Italic - `<i>`

Italic text for technical terms, foreign words:

```html
<p>The term <i>carpe diem</i> means "seize the day".</p>
```

**When to use what:**
```html
<!-- Use <strong> for importance -->
<p><strong>Warning:</strong> Do not touch hot surface.</p>

<!-- Use <em> for emphasis -->
<p>You <em>must</em> complete this form.</p>

<!-- Use <b> for keywords (no importance) -->
<p>The <b>submit</b> button is at the bottom.</p>

<!-- Use <i> for technical/foreign terms -->
<p>The <i>et cetera</i> (etc.) abbreviation...</p>
```

## Additional Text Formatting

### Underline - `<u>`

```html
<p>This text is <u>underlined</u>.</p>
```

### Strikethrough - `<s>`

```html
<p>Original price: <s>$100</s> Now: $79.99</p>
```

### Mark/Highlight - `<mark>`

```html
<p>Search results for <mark>HTML</mark> tutorial.</p>
```

### Small Text - `<small>`

```html
<p>Price: $29.99 <small>(+ tax)</small></p>
<p>Copyright © 2024 <small>All rights reserved</small></p>
```

### Subscript - `<sub>`

```html
<p>Water formula: H<sub>2</sub>O</p>
<p>x<sub>1</sub> + x<sub>2</sub> = 10</p>
```

### Superscript - `<sup>`

```html
<p>E = mc<sup>2</sup></p>
<p>10<sup>3</sup> = 1000</p>
<p>Dated: March 1<sup>st</sup>, 2024</p>
```

### Deleted Text - `<del>`

Shows text that has been deleted:

```html
<p>Price: <del>$100</del> $79.99</p>
```

### Inserted Text - `<ins>`

Shows text that has been inserted:

```html
<p>Price: <del>$100</del> <ins>$79.99</ins></p>
```

## Code and Computer-Related Text

### Inline Code - `<code>`

```html
<p>Use the <code>console.log()</code> function to debug.</p>
<p>The <code>&lt;div&gt;</code> element is a container.</p>
```

### Keyboard Input - `<kbd>`

```html
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
<p>Save with <kbd>Cmd</kbd> + <kbd>S</kbd></p>
```

### Sample Output - `<samp>`

```html
<p>The program will display: <samp>Hello, World!</samp></p>
```

### Variable - `<var>`

```html
<p>The formula is <var>a</var> + <var>b</var> = <var>c</var></p>
```

### Preformatted Text - `<pre>`

Preserves spaces and line breaks:

```html
<pre>
function greet() {
    console.log("Hello!");
    return true;
}
</pre>
```

**Combined with `<code>` for code blocks:**

```html
<pre><code>
const name = "John";
const age = 30;
console.log(`${name} is ${age} years old`);
</code></pre>
```

## Quotations

### Blockquote - `<blockquote>`

For longer quotes:

```html
<blockquote cite="https://source-url.com">
    <p>
        The only way to do great work is to love what you do.
        If you haven't found it yet, keep looking.
    </p>
    <footer>— Steve Jobs</footer>
</blockquote>
```

### Inline Quote - `<q>`

For short inline quotes (browsers add quotation marks):

```html
<p>Einstein said, <q>Imagination is more important than knowledge.</q></p>
```

### Citation - `<cite>`

For citing works (books, articles, etc.):

```html
<p>My favorite book is <cite>The Great Gatsby</cite>.</p>
```

## Abbreviations and Definitions

### Abbreviation - `<abbr>`

```html
<p><abbr title="HyperText Markup Language">HTML</abbr> is easy to learn.</p>
<p><abbr title="Cascading Style Sheets">CSS</abbr> styles web pages.</p>
```

### Definition - `<dfn>`

Marks the defining instance of a term:

```html
<p><dfn>HTML</dfn> is the standard markup language for web pages.</p>
```

## Contact Information

### Address - `<address>`

For contact information:

```html
<address>
    Written by <a href="mailto:john@example.com">John Doe</a>.<br>
    Visit us at:<br>
    Example.com<br>
    Box 564, Disneyland<br>
    USA
</address>
```

## Time and Dates

### Time - `<time>`

```html
<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
<p>Event starts at <time datetime="14:30">2:30 PM</time>.</p>
<p>Born in <time datetime="1990">the nineties</time>.</p>
```

## Bidirectional Override

### `<bdo>` - Bidirectional Override

Overrides text direction:

```html
<p><bdo dir="rtl">This text will be right-to-left</bdo></p>
```

### `<bdi>` - Bidirectional Isolation

Isolates bidirectional text:

```html
<p>User <bdi>إيان</bdi> scored 90 points.</p>
```

## Ruby Annotations

For East Asian typography:

```html
<ruby>
    漢 <rt>kan</rt>
    字 <rt>ji</rt>
</ruby>
```

## Practical Examples

### Blog Post Formatting

```html
<article>
    <header>
        <h1>Understanding HTML Text Formatting</h1>
        <p><time datetime="2024-01-15">January 15, 2024</time> by <strong>John Doe</strong></p>
    </header>
    
    <p>
        <strong>HTML text formatting</strong> is essential for creating 
        <em>readable</em> and <em>accessible</em> web content.
    </p>
    
    <h2>Key Concepts</h2>
    
    <p>
        According to the <abbr title="World Wide Web Consortium">W3C</abbr>,
        proper text formatting improves both <acronym title="Search Engine Optimization">SEO</acronym>
        and user experience.
    </p>
    
    <blockquote cite="https://w3.org">
        <p>The power of the Web is in its universality.</p>
        <footer>— Tim Berners-Lee, W3C Director</footer>
    </blockquote>
    
    <h3>Code Example</h3>
    
    <p>Use the <code>&lt;p&gt;</code> element for paragraphs:</p>
    
    <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>
    
    <p><small>Last updated: March 2024</small></p>
</article>
```

### Product Description

```html
<div class="product">
    <h2>Ultra Laptop Pro</h2>
    
    <p class="price">
        <s>$999</s> <strong>$799</strong>
        <small>(Save $200!)</small>
    </p>
    
    <p>
        The <b>Ultra Laptop Pro</b> features:
    </p>
    
    <ul>
        <li><strong>16GB RAM</strong> for multitasking</li>
        <li><em>Fastest</em> processor in its class</li>
        <li>Battery life: <mark>up to 12 hours</mark></li>
    </ul>
    
    <p><small>*Terms and conditions apply</small></p>
</div>
```

### Technical Documentation

```html
<section>
    <h2>Installation Instructions</h2>
    
    <p>To install the package, run:</p>
    
    <pre><code>npm install my-package</code></pre>
    
    <p>
        Then import it in your code using
        <code>import Package from 'my-package';</code>
    </p>
    
    <p>
        Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
        to open the command palette.
    </p>
    
    <p>
        The variable <var>x</var> represents the user input.
    </p>
    
    <p>
        <strong>Note:</strong> This requires <abbr title="Node.js">Node</abbr>
        version 14 or higher.
    </p>
</section>
```

## Best Practices

1. **Use semantic elements**: Choose tags based on meaning, not appearance
2. **One `<h1>` per page**: Use it for the main page title
3. **Follow heading hierarchy**: Don't skip levels
4. **Use `<strong>` vs `<b>`**: `<strong>` for importance, `<b>` for styling
5. **Use `<em>` vs `<i>`**: `<em>` for emphasis, `<i>` for technical terms
6. **Add `title` to `<abbr>`**: Provide full form in title attribute
7. **Use `<code>` for code**: Makes code stand out and semantic
8. **Proper quotes**: Use `<blockquote>` for long quotes, `<q>` for inline
9. **Accessible text**: Ensure good contrast and readable font sizes
10. **Don't use formatting for structure**: Use CSS for visual styling

## Common Mistakes

```html
<!-- ❌ Using headings for size, not structure -->
<h3>Big Text</h3>
<p>Some content</p>
<h3>Another Big Text</h3>

<!-- ✅ Use proper hierarchy -->
<h2>Section Title</h2>
<p>Some content</p>
<h2>Another Section</h2>

<!-- ❌ Multiple h1 tags -->
<h1>First Title</h1>
<h1>Second Title</h1>

<!-- ✅ One h1, rest are h2-h6 -->
<h1>Page Title</h1>
<h2>Section 1</h2>
<h2>Section 2</h2>

<!-- ❌ Using <br> for spacing -->
<p>Paragraph</ <br><br><br>
<p>Another paragraph</p>

<!-- ✅ Use CSS for spacing -->
<p>Paragraph</p>
<p style="margin-top: 20px;">Another paragraph</p>

<!-- ❌ Empty paragraphs for space -->
<p>Text</p>
<p></p>
<p></p>
<p>More text</p>

<!-- ✅ Use CSS margins -->
<p>Text</p>
<p style="margin-top: 40px;">More text</p>
```

## Summary

- Use headings (`<h1>`-`<h6>`) for structure and hierarchy
- Paragraphs (`<p>`) organize text content
- `<strong>` for importance, `<em>` for emphasis
- `<code>`, `<kbd>`, `<samp>` for computer-related text
- `<blockquote>` for quotes, `<abbr>` for abbreviations
- Choose semantic elements over purely visual ones
- Follow proper heading hierarchy
- Use formatting to enhance readability and meaning

Proper text formatting creates accessible, SEO-friendly, and user-friendly web content!
