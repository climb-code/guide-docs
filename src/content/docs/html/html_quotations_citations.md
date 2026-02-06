---
title: HTML Quotations and Citations
description: Learn how to properly mark up quotations, citations, abbreviations, addresses, and code snippets using semantic HTML elements.
---

HTML provides semantic elements for marking up quotations, citations, definitions, and other special text types to convey meaning and improve accessibility.

## Quotations

### Blockquote

For longer, block-level quotations:

```html
<blockquote>
  <p>The only way to do great work is to love what you do.</p>
</blockquote>
```

### Blockquote with Citation

```html
<blockquote cite="https://example.com/speech">
  <p>Stay hungry, stay foolish.</p>
  <footer>— Steve Jobs, Stanford Commencement Speech</footer>
</blockquote>
```

### Styled Blockquote

```html
<style>
  blockquote {
    margin: 20px 0;
    padding: 15px 20px;
    border-left: 4px solid #4CAF50;
    background: #f9f9f9;
    font-style: italic;
  }
  blockquote footer {
    margin-top: 10px;
    font-style: normal;
    font-size: 0.9em;
    color: #666;
  }
</style>

<blockquote>
  <p>Innovation distinguishes between a leader and a follower.</p>
  <footer>— Steve Jobs</footer>
</blockquote>
```

### Inline Quote

The `<q>` element for short inline quotations:

```html
<p>As Einstein said, <q>Imagination is more important than knowledge.</q></p>

<!-- With citation source -->
<p>
  The motto <q cite="https://example.com">Think Different</q> 
  defined Apple's brand.
</p>
```

**Note:** Browsers automatically add quotation marks to `<q>` elements.

### Nested Quotes

```html
<p>
  She said, <q>He told me, <q>This is important</q>, and I agreed.</q>
</p>

<blockquote>
  <p>Outer quote with <q>inner quote</q> inside.</p>
</blockquote>
```

## Citations

### Cite Element

Mark the title of creative works:

```html
<!-- Book -->
<p>My favorite book is <cite>To Kill a Mockingbird</cite>.</p>

<!-- Movie -->
<p>Have you watched <cite>The Shawshank Redemption</cite>?</p>

<!-- Song -->
<p>I love the song <cite>Bohemian Rhapsody</cite> by Queen.</p>

<!-- Article -->
<p>Read the article <cite>Understanding CSS Grid</cite> for more info.</p>

<!-- Website -->
<p>Visit <cite>MDN Web Docs</cite> for web development resources.</p>
```

### Cite with Blockquote

```html
<figure>
  <blockquote>
    <p>The future belongs to those who believe in the beauty of their dreams.</p>
  </blockquote>
  <figcaption>
    — Eleanor Roosevelt, <cite>You Learn by Living</cite>
  </figcaption>
</figure>
```

### cite Attribute

Provide source URL:

```html
<blockquote cite="https://www.example.com/article">
  <p>This is a quotation from an article.</p>
</blockquote>

<q cite="https://www.example.com/book">Short quote with source.</q>
```

**Note:** The `cite` attribute is not displayed by browsers but helps with SEO and accessibility.

## Abbreviations and Acronyms

### abbr Element

Define abbreviations with full text:

```html
<!-- Technology -->
<p><abbr title="HyperText Markup Language">HTML</abbr> is awesome!</p>
<p><abbr title="Cascading Style Sheets">CSS</abbr> for styling.</p>
<p><abbr title="JavaScript">JS</abbr> adds interactivity.</p>

<!-- Organizations -->
<p><abbr title="World Wide Web Consortium">W3C</abbr> sets web standards.</p>
<p><abbr title="National Aeronautics and Space Administration">NASA</abbr></p>

<!-- Common abbreviations -->
<p>Est. <abbr title="estimated">est.</abbr> 2024</p>
<p><abbr title="circa">c.</abbr> 1990</p>
```

### Styled Abbreviations

```html
<style>
  abbr {
    cursor: help;
    text-decoration: underline dotted;
  }
  abbr:hover {
    color: #4CAF50;
  }
</style>

<p>
  <abbr title="Application Programming Interface">API</abbr> stands for 
  Application Programming Interface.
</p>
```

## Definitions

### dfn Element

Mark the defining instance of a term:

```html
<p>
  <dfn>HTML</dfn> (HyperText Markup Language) is the standard markup 
  language for creating web pages.
</p>

<p>
  A <dfn id="responsive-design">responsive design</dfn> adapts to 
  different screen sizes.
</p>

<!-- With abbreviation -->
<p>
  <dfn><abbr title="Cascading Style Sheets">CSS</abbr></dfn> is used 
  for styling web pages.
</p>
```

### Definition List

```html
<dl>
  <dt><dfn>HTML</dfn></dt>
  <dd>HyperText Markup Language - the structure of web pages</dd>
  
  <dt><dfn>CSS</dfn></dt>
  <dd>Cascading Style Sheets - the styling of web pages</dd>
  
  <dt><dfn>JavaScript</dfn></dt>
  <dd>Programming language for web interactivity</dd>
</dl>
```

## Address Information

### address Element

Contact information:

```html
<address>
  Written by <a href="mailto:john@example.com">John Doe</a><br>
  Visit us at: 123 Main Street<br>
  City, State 12345<br>
  Phone: (555) 123-4567
</address>
```

### Article Author

```html
<article>
  <h2>Understanding Semantic HTML</h2>
  <p>Article content here...</p>
  
  <footer>
    <address>
      By <a href="mailto:author@example.com">Jane Smith</a><br>
      Published: January 15, 2024
    </address>
  </footer>
</article>
```

### Company Contact

```html
<footer>
  <address>
    <strong>TechCorp Inc.</strong><br>
    456 Innovation Drive<br>
    Tech City, TC 67890<br>
    Email: <a href="mailto:info@techcorp.com">info@techcorp.com</a><br>
    Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a>
  </address>
</footer>
```

## Code and Computer Output

### code Element

Inline code snippets:

```html
<p>Use the <code>console.log()</code> function to debug.</p>

<p>The <code>&lt;div&gt;</code> element is a container.</p>

<p>Press <code>Ctrl + C</code> to copy.</p>
```

### pre Element

Preserve formatting for code blocks:

```html
<pre>
function greet(name) {
  return `Hello, ${name}!`;
}
</pre>

<pre>
{
  "name": "John",
  "age": 30
}
</pre>
```

### code with pre

```html
<pre><code>
function fibonacci(n) {
  if (n &lt;= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
</code></pre>
```

### kbd Element

Keyboard input:

```html
<p>Press <kbd>Enter</kbd> to submit.</p>

<p>Use <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>

<p>Type <kbd>cd /home</kbd> to change directory.</p>
```

### samp Element

Sample computer output:

```html
<p>The program returned: <samp>Error: File not found</samp></p>

<p>Console output: <samp>200 OK</samp></p>
```

### var Element

Mathematical variables:

```html
<p>The formula is <var>a</var>² + <var>b</var>² = <var>c</var>²</p>

<p>Calculate <var>x</var> + <var>y</var> = <var>z</var></p>
```

## Practical Examples

### Blog Post with Citations

```html
<article>
  <h1>The Impact of AI on Society</h1>
  
  <p>
    As mentioned in <cite>The Age of AI</cite>, artificial intelligence 
    is transforming every aspect of our lives.
  </p>
  
  <blockquote cite="https://example.com/ai-future">
    <p>
      AI will be the most important technology of the 21st century.
    </p>
    <footer>
      — Dr. Jane Smith, <cite>Future of Technology Conference</cite>
    </footer>
  </blockquote>
  
  <p>
    The term <dfn>Machine Learning</dfn> refers to algorithms that 
    improve through experience.
  </p>
  
  <footer>
    <address>
      Written by <a href="mailto:author@blog.com">John Doe</a>
    </address>
  </footer>
</article>
```

### Technical Documentation

```html
<section>
  <h2>Getting Started</h2>
  
  <p>
    To install, use <abbr title="Node Package Manager">npm</abbr>:
  </p>
  
  <pre><code>npm install package-name</code></pre>
  
  <p>
    Then import it in your code:
  </p>
  
  <pre><code>
import Package from 'package-name';
  </code></pre>
  
  <p>
    Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop the development server.
  </p>
  
  <p>
    If successful, you'll see: <samp>Server running on port 3000</samp>
  </p>
</section>
```

### Academic Paper Reference

```html
<article>
  <h1>Climate Change Research</h1>
  
  <p>
    According to the study published in 
    <cite>Nature Climate Change</cite>:
  </p>
  
  <blockquote cite="https://nature.com/climate-study">
    <p>
      Global temperatures have risen by 1.5°C since pre-industrial times.
    </p>
  </blockquote>
  
  <p>
    The <dfn><abbr title="Intergovernmental Panel on Climate Change">IPCC</abbr></dfn> 
    defines climate change as long-term shifts in temperatures and weather patterns.
  </p>
</article>
```

### Recipe with Measurements

```html
<article>
  <h1>Chocolate Chip Cookies</h1>
  
  <p>From <cite>The Joy of Baking</cite> cookbook:</p>
  
  <h2>Ingredients</h2>
  <ul>
    <li><var>2</var> cups flour</li>
    <li><var>1</var> cup sugar</li>
    <li><var>½</var> cup butter</li>
  </ul>
  
  <blockquote>
    <p>The secret to perfect cookies is patience and quality ingredients.</p>
    <footer>— Chef Julia, <cite>Baking Mastery</cite></footer>
  </blockquote>
</article>
```

### Contact Page

```html
<main>
  <h1>Contact Us</h1>
  
  <p>As <q>We'd love to hear from you!</q></p>
  
  <section>
    <h2>Office Address</h2>
    <address>
      <strong>TechStart Inc.</strong><br>
      789 Innovation Boulevard<br>
      Suite 100<br>
      San Francisco, CA 94102<br>
      United States
    </address>
  </section>
  
  <section>
    <h2>Get in Touch</h2>
    <address>
      Email: <a href="mailto:hello@techstart.com">hello@techstart.com</a><br>
      Phone: <a href="tel:+14155551234">+1 (415) 555-1234</a><br>
      Office Hours: Monday - Friday, 9 <abbr title="ante meridiem">AM</abbr> 
      - 5 <abbr title="post meridiem">PM</abbr> <abbr title="Pacific Standard Time">PST</abbr>
    </address>
  </section>
</main>
```

## Best Practices

1. **Use semantic elements**: Choose the right element for the content type
2. **Provide context**: Use `cite` attribute for sources
3. **Add title to abbreviations**: Always include the full form
4. **Style appropriately**: Ensure citations are visually distinct
5. **Be consistent**: Use the same pattern throughout your site
6. **Accessibility first**: Semantic elements help screen readers
7. **Don't overuse**: Only mark actual quotations and citations

## Common Mistakes

```html
<!-- ❌ Using <i> or <em> for titles -->
<p>I read <i>The Great Gatsby</i></p>

<!-- ✅ Use <cite> for titles -->
<p>I read <cite>The Great Gatsby</cite></p>

<!-- ❌ Using quotes without semantic markup -->
<p>"Innovation distinguishes leaders" - Steve Jobs</p>

<!-- ✅ Use proper quote elements -->
<p><q>Innovation distinguishes leaders</q> — Steve Jobs</p>

<!-- ❌ Missing title on abbreviation -->
<abbr>HTML</abbr>

<!-- ✅ Include title -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- ❌ Using <address> for any address -->
<address>Our office: 123 Main St</address>

<!-- ✅ Use for contact info -->
<address>
  Contact: <a href="mailto:info@example.com">info@example.com</a><br>
  Office: 123 Main St
</address>
```

## Summary

- **`<blockquote>`** for block quotations
- **`<q>`** for inline quotations
- **`<cite>`** for titles of creative works
- **`cite` attribute** for source URLs
- **`<abbr>`** for abbreviations with title
- **`<dfn>`** for term definitions
- **`<address>`** for contact information
- **`<code>`** for code snippets
- **`<pre>`** to preserve formatting
- **`<kbd>`** for keyboard input
- **`<samp>`** for computer output
- **`<var>`** for variables
- Use semantic HTML for better accessibility and SEO
- Always provide context with attributes
- Style elements to distinguish them visually

Semantic markup improves content meaning, accessibility, and SEO!
