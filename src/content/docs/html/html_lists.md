---
title: HTML Lists
description: Master HTML lists - learn how to create unordered lists, ordered lists, description lists, and nested lists for organizing content effectively.
---


Lists are used to group related items together. HTML provides three types of lists: unordered, ordered, and description lists.

## Unordered Lists

Unordered lists display items with bullets. Use `<ul>` for the list and `<li>` for each item:

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

**Output:**
- HTML
- CSS
- JavaScript

### Practical Examples

```html
<!-- Shopping list -->
<h3>Shopping List</h3>
<ul>
    <li>Milk</li>
    <li>Bread</li>
    <li>Eggs</li>
    <li>Butter</li>
</ul>

<!-- Features list -->
<h3>Product Features</h3>
<ul>
    <li>Fast performance</li>
    <li>Energy efficient</li>
    <li>2-year warranty</li>
    <li>Free shipping</li>
</ul>
```

## Ordered Lists

Ordered lists display items with numbers. Use `<ol>` for the list:

```html
<ol>
    <li>Open code editor</li>
    <li>Create new file</li>
    <li>Write HTML code</li>
    <li>Save and open in browser</li>
</ol>
```

**Output:**
1. Open code editor
2. Create new file
3. Write HTML code
4. Save and open in browser

### List Types

Change numbering style with `type` attribute:

```html
<!-- Numbers (default) -->
<ol type="1">
    <li>First</li>
    <li>Second</li>
</ol>

<!-- Uppercase letters -->
<ol type="A">
    <li>First</li>
    <li>Second</li>
</ol>

<!-- Lowercase letters -->
<ol type="a">
    <li>First</li>
    <li>Second</li>
</ol>

<!-- Uppercase Roman numerals -->
<ol type="I">
    <li>First</li>
    <li>Second</li>
</ol>

<!-- Lowercase Roman numerals -->
<ol type="i">
    <li>First</li>
    <li>Second</li>
</ol>
```

### Start Attribute

Start numbering from a specific number:

```html
<ol start="5">
    <li>Fifth item</li>
    <li>Sixth item</li>
    <li>Seventh item</li>
</ol>
```

**Output:**
5. Fifth item
6. Sixth item
7. Seventh item

### Reversed Attribute

Count down instead of up:

```html
<ol reversed>
    <li>Third</li>
    <li>Second</li>
    <li>First</li>
</ol>
```

**Output:**
3. Third
2. Second
1. First

## Description Lists

Description lists contain terms and their descriptions. Use `<dl>` for the list, `<dt>` for terms, and `<dd>` for descriptions:

```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language for web interactivity</dd>
</dl>
```

### Multiple Descriptions

One term can have multiple descriptions:

```html
<dl>
    <dt>Coffee</dt>
    <dd>A hot beverage</dd>
    <dd>Made from roasted coffee beans</dd>
    <dd>Contains caffeine</dd>
</dl>
```

### Multiple Terms

Multiple terms can share one description:

```html
<dl>
    <dt>HTML</dt>
    <dt>HyperText Markup Language</dt>
    <dd>The standard markup language for web pages</dd>
</dl>
```

### Practical Examples

```html
<!-- Glossary -->
<h3>Web Development Glossary</h3>
<dl>
    <dt>Frontend</dt>
    <dd>The client-side of web development</dd>
    
    <dt>Backend</dt>
    <dd>The server-side of web development</dd>
    
    <dt>API</dt>
    <dd>Application Programming Interface</dd>
</dl>

<!-- Product specifications -->
<h3>Technical Specifications</h3>
<dl>
    <dt>Processor</dt>
    <dd>Intel Core i7</dd>
    
    <dt>RAM</dt>
    <dd>16GB DDR4</dd>
    
    <dt>Storage</dt>
    <dd>512GB SSD</dd>
    
    <dt>Display</dt>
    <dd>15.6" Full HD</dd>
</dl>
```

## Nested Lists

Lists can contain other lists:

```html
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Python</li>
            <li>PHP</li>
        </ul>
    </li>
</ul>
```

### Multi-Level Nesting

```html
<ol>
    <li>Web Development
        <ol>
            <li>Frontend
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
            </li>
            <li>Backend
                <ul>
                    <li>Databases</li>
                    <li>Server Languages</li>
                    <li>APIs</li>
                </ul>
            </li>
        </ol>
    </li>
    <li>Mobile Development
        <ol>
            <li>iOS</li>
            <li>Android</li>
        </ol>
    </li>
</ol>
```

### Outline Structure

```html
<h1>Document Outline</h1>
<ol>
    <li>Introduction
        <ol type="a">
            <li>Background</li>
            <li>Purpose</li>
            <li>Scope</li>
        </ol>
    </li>
    <li>Main Content
        <ol type="a">
            <li>Chapter 1
                <ol type="i">
                    <li>Section 1.1</li>
                    <li>Section 1.2</li>
                </ol>
            </li>
            <li>Chapter 2
                <ol type="i">
                    <li>Section 2.1</li>
                    <li>Section 2.2</li>
                </ol>
            </li>
        </ol>
    </li>
    <li>Conclusion</li>
</ol>
```

## Lists with Rich Content

List items can contain any HTML element:

```html
<ul>
    <li>
        <h3>Premium Plan</h3>
        <p>Best for professionals</p>
        <ul>
            <li>Unlimited projects</li>
            <li>Priority support</li>
            <li>Advanced features</li>
        </ul>
        <p><strong>$29/month</strong></p>
    </li>
    
    <li>
        <h3>Basic Plan</h3>
        <p>Perfect for beginners</p>
        <ul>
            <li>5 projects</li>
            <li>Email support</li>
            <li>Basic features</li>
        </ul>
        <p><strong>$9/month</strong></p>
    </li>
</ul>
```

### Lists with Links

```html
<h3>Quick Links</h3>
<ul>
    <li><a href="/docs">Documentation</a></li>
    <li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/api">API Reference</a></li>
    <li><a href="/support">Support</a></li>
</ul>
```

### Lists with Images

```html
<h3>Team Members</h3>
<ul>
    <li>
        <img src="john.jpg" alt="John Doe" width="50">
        <strong>John Doe</strong> - CEO
    </li>
    <li>
        <img src="jane.jpg" alt="Jane Smith" width="50">
        <strong>Jane Smith</strong> - CTO
    </li>
</ul>
```

## Styling Lists (Basic)

While CSS should be used for styling, here are some inline examples:

```html
<!-- Remove bullets -->
<ul style="list-style-type: none;">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Square bullets -->
<ul style="list-style-type: square;">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Circle bullets -->
<ul style="list-style-type: circle;">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Custom image bullet -->
<ul style="list-style-image: url('bullet.png');">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

## Practical Examples

### Navigation Menu

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a>
            <ul>
                <li><a href="/about/team">Team</a></li>
                <li><a href="/about/history">History</a></li>
            </ul>
        </li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

### Recipe Instructions

```html
<article>
    <h2>Chocolate Chip Cookies</h2>
    
    <h3>Ingredients</h3>
    <ul>
        <li>2 cups all-purpose flour</li>
        <li>1 cup butter</li>
        <li>1 cup sugar</li>
        <li>2 eggs</li>
        <li>2 cups chocolate chips</li>
    </ul>
    
    <h3>Instructions</h3>
    <ol>
        <li>Preheat oven to 350°F</li>
        <li>Mix butter and sugar</li>
        <li>Add eggs and mix well</li>
        <li>Gradually add flour</li>
        <li>Fold in chocolate chips</li>
        <li>Bake for 12-15 minutes</li>
    </ol>
</article>
```

### FAQ Section

```html
<section>
    <h2>Frequently Asked Questions</h2>
    
    <dl>
        <dt>What is your return policy?</dt>
        <dd>We accept returns within 30 days of purchase.</dd>
        
        <dt>Do you ship internationally?</dt>
        <dd>Yes, we ship to over 50 countries worldwide.</dd>
        
        <dt>How long does shipping take?</dt>
        <dd>
            <ul>
                <li>Domestic: 3-5 business days</li>
                <li>International: 7-14 business days</li>
            </ul>
        </dd>
    </dl>
</section>
```

### Table of Contents

```html
<nav aria-label="Table of Contents">
    <h2>Contents</h2>
    <ol>
        <li><a href="#intro">Introduction</a></li>
        <li><a href="#basics">HTML Basics</a>
            <ol>
                <li><a href="#elements">Elements</a></li>
                <li><a href="#attributes">Attributes</a></li>
            </ol>
        </li>
        <li><a href="#advanced">Advanced Topics</a>
            <ol>
                <li><a href="#forms">Forms</a></li>
                <li><a href="#apis">APIs</a></li>
            </ol>
        </li>
        <li><a href="#conclusion">Conclusion</a></li>
    </ol>
</nav>
```

### Pricing Table

```html
<section>
    <h2>Pricing</h2>
    
    <ul>
        <li>
            <h3>Free</h3>
            <p>$0/month</p>
            <ul>
                <li>✓ 1 project</li>
                <li>✓ Community support</li>
                <li>✗ Advanced features</li>
                <li>✗ Priority support</li>
            </ul>
            <a href="/signup/free">Get Started</a>
        </li>
        
        <li>
            <h3>Pro</h3>
            <p>$19/month</p>
            <ul>
                <li>✓ 10 projects</li>
                <li>✓ Email support</li>
                <li>✓ Advanced features</li>
                <li>✗ Priority support</li>
            </ul>
            <a href="/signup/pro">Get Started</a>
        </li>
        
        <li>
            <h3>Enterprise</h3>
            <p>$99/month</p>
            <ul>
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced features</li>
                <li>✓ Custom integrations</li>
            </ul>
            <a href="/signup/enterprise">Contact Sales</a>
        </li>
    </ul>
</section>
```

## Best Practices

1. **Use semantic lists**: Choose the right list type for your content
2. **Keep items parallel**: Make list items grammatically similar
3. **Don't skip list containers**: Always use `<ul>`, `<ol>`, or `<dl>`
4. **Only `<li>` in lists**: List containers should only contain `<li>` elements
5. **Nest properly**: Close inner lists before closing outer `<li>`
6. **Use for navigation**: Lists are perfect for navigation menus
7. **Accessibility**: Lists help screen readers understand structure
8. **Don't misuse for layout**: Use CSS Grid/Flexbox for layout instead

## Common Mistakes

```html
<!-- ❌ List items without container -->
<li>Item 1</li>
<li>Item 2</li>

<!-- ✅ Correct -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- ❌ Wrong: Direct text in list container -->
<ul>
    Item 1
    Item 2
</ul>

<!-- ✅ Correct -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- ❌ Wrong nesting -->
<ul>
    <li>Item 1
        <li>Subitem</li>  <!-- Missing <ul> -->
    </li>
</ul>

<!-- ✅ Correct nesting -->
<ul>
    <li>Item 1
        <ul>
            <li>Subitem</li>
        </ul>
    </li>
</ul>

<!-- ❌ Mixing list types incorrectly -->
<ul>
    <ol>
        <li>Wrong</li>
    </ol>
</ul>

<!-- ✅ Correct -->
<ul>
    <li>Item
        <ol>
            <li>Nested ordered item</li>
        </ol>
    </li>
</ul>
```

## Accessibility Tips

```html
<!-- Add ARIA label for navigation lists -->
<nav aria-label="Main Navigation">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<!-- Mark current page -->
<ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>

<!-- Descriptive heading before list -->
<h2 id="features-heading">Key Features</h2>
<ul aria-labelledby="features-heading">
    <li>Feature 1</li>
    <li>Feature 2</li>
</ul>
```

## Summary

- **Unordered lists** (`<ul>`): For items without specific order
- **Ordered lists** (`<ol>`): For sequential or ranked items
- **Description lists** (`<dl>`): For term-definition pairs
- Lists can be nested for hierarchical content
- Always use proper list containers and items
- Lists improve document structure and accessibility
- Perfect for navigation, steps, features, and more

Lists are fundamental HTML elements that improve content organization, readability, and accessibility!
