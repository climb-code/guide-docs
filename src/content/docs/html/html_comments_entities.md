---
title: HTML Comments and Entity Characters
description: Learn how to use HTML comments for code documentation and HTML entity characters for special symbols, reserved characters, and non-breaking spaces.
---

Comments and entity characters are essential tools in HTML that help you document your code and display special characters correctly.

## HTML Comments

Comments allow you to add notes in your HTML that won't be displayed in the browser. They're useful for documentation, debugging, and temporarily disabling code.

### Basic Comment Syntax

```html
<!-- This is a comment -->

<h1>Welcome</h1>
<!-- This heading introduces the page -->
```

### Multi-line Comments

```html
<!-- 
    This is a multi-line comment
    You can write as many lines as you need
    Great for longer explanations
-->

<section>
    <!-- 
        TODO: Add more content here
        - Feature list
        - Testimonials
        - Call to action
    -->
</section>
```

### Inline Comments

```html
<p>This is visible</p> <!-- This comment is on the same line -->

<div class="container"> <!-- Main wrapper -->
    <h1>Title</h1> <!-- Page heading -->
</div>
```

## Common Uses of Comments

### Documentation

```html
<!-- 
    Header Section
    Contains logo, navigation, and search bar
    Created: 2024-01-15
    Author: Dev Team
-->
<header>
    <nav><!-- Navigation menu --></nav>
</header>
```

### Section Markers

```html
<!-- ========== Header ========== -->
<header>
    <!-- Header content -->
</header>

<!-- ========== Main Content ========== -->
<main>
    <!-- Main content -->
</main>

<!-- ========== Footer ========== -->
<footer>
    <!-- Footer content -->
</footer>
```

### Temporarily Disabling Code

```html
<!-- 
<div class="old-banner">
    This content is temporarily disabled
</div>
-->

<div class="new-banner">
    This is the active content
</div>
```

### Development Notes

```html
<!-- FIXME: This form needs validation -->
<form>
    <input type="text" name="email">
</form>

<!-- TODO: Add image gallery here -->
<div class="gallery-placeholder"></div>

<!-- NOTE: This section requires authentication -->
<section class="members-only">
    <!-- Protected content -->
</section>
```

### Version Control

```html
<!-- 
    Version: 2.0
    Last Updated: 2024-01-15
    Changes:
    - Updated navigation structure
    - Added mobile menu
    - Improved accessibility
-->
```

## Conditional Comments (Legacy IE)

Conditional comments were used for older Internet Explorer browsers (now deprecated):

```html
<!-- For modern browsers, this is just a regular comment -->

<!--[if IE]>
    <p>This only shows in Internet Explorer</p>
<![endif]-->

<!--[if lt IE 9]>
    <script src="html5shiv.js"></script>
<![endif]-->
```

**Note**: Conditional comments are obsolete and not supported in modern browsers.

## HTML Entity Characters

Entity characters allow you to display reserved HTML characters and special symbols that would otherwise be interpreted as code.

### Why Use Entities?

```html
<!-- ❌ This won't display correctly -->
<p>Use <div> tags for containers</p>

<!-- ✅ Use entities instead -->
<p>Use &lt;div&gt; tags for containers</p>
```

### Reserved Character Entities

These characters have special meaning in HTML:

```html
<!-- Less than -->
&lt;    <!-- < -->

<!-- Greater than -->
&gt;    <!-- > -->

<!-- Ampersand -->
&amp;   <!-- & -->

<!-- Quotation mark -->
&quot;  <!-- " -->

<!-- Apostrophe -->
&apos;  <!-- ' -->
```

### Practical Example

```html
<p>To create a paragraph, use &lt;p&gt; and &lt;/p&gt; tags.</p>

<p>The formula is: 5 &lt; 10 &amp; 10 &gt; 5</p>

<p>She said &quot;Hello, World!&quot;</p>

<code>const name = &apos;John&apos;;</code>
```

### Space Entities

```html
<!-- Non-breaking space (won't collapse or break line) -->
&nbsp;

<!-- En space (width of 'n' character) -->
&ensp;

<!-- Em space (width of 'm' character) -->
&emsp;

<!-- Thin space -->
&thinsp;
```

**Example usage:**

```html
<!-- Regular spaces collapse to one -->
<p>Hello     World</p>
<!-- Displays: Hello World -->

<!-- Non-breaking spaces preserve spacing -->
<p>Hello&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;World</p>
<!-- Displays: Hello     World -->

<!-- Keep words together -->
<p>Phone:&nbsp;555-1234</p>
<!-- "555-1234" won't wrap to next line -->
```

### Common Symbol Entities

#### Currency Symbols

```html
&cent;   <!-- ¢ cent -->
&pound;  <!-- £ pound -->
&yen;    <!-- ¥ yen -->
&euro;   <!-- € euro -->
&dollar; <!-- $ dollar -->
```

#### Mathematical Symbols

```html
&plus;   <!-- + plus -->
&minus;  <!-- − minus -->
&times;  <!-- × multiplication -->
&divide; <!-- ÷ division -->
&equals; <!-- = equals -->
&ne;     <!-- ≠ not equal -->
&lt;     <!-- < less than -->
&gt;     <!-- > greater than -->
&le;     <!-- ≤ less than or equal -->
&ge;     <!-- ≥ greater than or equal -->
&plusmn; <!-- ± plus-minus -->
&frac12; <!-- ½ one half -->
&frac14; <!-- ¼ one quarter -->
&frac34; <!-- ¾ three quarters -->
```

#### Punctuation and Symbols

```html
&copy;   <!-- © copyright -->
&reg;    <!-- ® registered trademark -->
&trade;  <!-- ™ trademark -->
&deg;    <!-- ° degree -->
&para;   <!-- ¶ paragraph -->
&sect;   <!-- § section -->
&bull;   <!-- • bullet -->
&hellip; <!-- … ellipsis -->
&mdash;  <!-- — em dash -->
&ndash;  <!-- – en dash -->
&laquo;  <!-- « left angle quote -->
&raquo;  <!-- » right angle quote -->
&larr;   <!-- ← left arrow -->
&rarr;   <!-- → right arrow -->
&uarr;   <!-- ↑ up arrow -->
&darr;   <!-- ↓ down arrow -->
```

#### Accented Characters

```html
<!-- Lowercase -->
&agrave; <!-- à -->
&aacute; <!-- á -->
&acirc;  <!-- â -->
&atilde; <!-- ã -->
&auml;   <!-- ä -->
&aring;  <!-- å -->
&aelig;  <!-- æ -->
&ccedil; <!-- ç -->
&egrave; <!-- è -->
&eacute; <!-- é -->
&ntilde; <!-- ñ -->
&ouml;   <!-- ö -->
&uuml;   <!-- ü -->

<!-- Uppercase -->
&Agrave; <!-- À -->
&Aacute; <!-- Á -->
&Ntilde; <!-- Ñ -->
```

### Numeric Character References

You can also use numeric codes (decimal or hexadecimal):

```html
<!-- Decimal format -->
&#169;   <!-- © copyright -->
&#8364;  <!-- € euro -->
&#8482;  <!-- ™ trademark -->

<!-- Hexadecimal format -->
&#x00A9; <!-- © copyright -->
&#x20AC; <!-- € euro -->
&#x2122; <!-- ™ trademark -->

<!-- Common emojis -->
&#128512; <!-- 😀 grinning face -->
&#128077; <!-- 👍 thumbs up -->
&#10084;  <!-- ❤ heart -->
```

## Practical Examples

### Copyright Footer

```html
<footer>
    <p>&copy; 2024 Company Name. All rights reserved.</p>
    <p>Designed with &hearts; in San Francisco</p>
</footer>
```

### Product Pricing

```html
<div class="product">
    <h3>Premium Plan</h3>
    <p class="price">&euro;29.99/month</p>
    <p>Save 25&percnt; with annual billing</p>
</div>
```

### Mathematical Expressions

```html
<p>Temperature: 72&deg;F &plusmn; 2&deg;</p>
<p>Formula: a&sup2; + b&sup2; = c&sup2;</p>
<p>Result: 5 &times; 4 &divide; 2 = 10</p>
```

### Code Examples

```html
<article>
    <h2>Using the &lt;img&gt; Tag</h2>
    <p>The &lt;img&gt; tag requires a &quot;src&quot; attribute:</p>
    <code>
        &lt;img src=&quot;photo.jpg&quot; alt=&quot;Description&quot;&gt;
    </code>
</article>
```

### International Content

```html
<p>Caf&eacute; &bull; R&eacute;sum&eacute; &bull; Na&iuml;ve</p>
<p>Se&ntilde;or &bull; M&uuml;nchen &bull; &AElig;gir</p>
<blockquote>
    &laquo;C'est la vie&raquo; &mdash; French saying
</blockquote>
```

### Navigation with Arrows

```html
<nav>
    <a href="/prev">&larr; Previous</a>
    <a href="/next">Next &rarr;</a>
</nav>

<p>Scroll to top &uarr;</p>
<p>Download &darr;</p>
```

### Special Characters Table

```html
<table>
    <tr>
        <th>Symbol</th>
        <th>Entity</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>&copy;</td>
        <td>&amp;copy;</td>
        <td>Copyright</td>
    </tr>
    <tr>
        <td>&reg;</td>
        <td>&amp;reg;</td>
        <td>Registered</td>
    </tr>
    <tr>
        <td>&trade;</td>
        <td>&amp;trade;</td>
        <td>Trademark</td>
    </tr>
</table>
```

## Best Practices

### Comments

1. **Keep comments relevant**: Update or remove outdated comments
2. **Don't over-comment**: Only comment what needs explanation
3. **Use comments for structure**: Mark major sections
4. **Avoid sensitive information**: Comments are visible in source code
5. **Be professional**: Comments may be seen by others
6. **Use consistent format**: Maintain a commenting style

```html
<!-- ✅ Good: Helpful and clear -->
<!-- Navigation: Desktop version (hidden on mobile) -->
<nav class="desktop-nav">
    <!-- Menu items -->
</nav>

<!-- ❌ Bad: Obvious and redundant -->
<!-- This is a div -->
<div>
    <!-- This is a paragraph -->
    <p>Text here</p> <!-- End paragraph -->
</div> <!-- End div -->
```

### Entity Characters

1. **Always escape reserved characters**: When showing HTML in content
2. **Use entities for symbols**: Instead of copying special characters
3. **Consider UTF-8**: Modern sites can use actual characters
4. **Be consistent**: Use entities or UTF-8, not both randomly
5. **Test rendering**: Ensure entities display correctly

```html
<!-- ✅ Good: Clear and safe -->
<p>Use the &lt;strong&gt; tag for emphasis.</p>
<p>Price: &euro;99 &bull; Rating: 4&frac12; stars</p>

<!-- ⚠️ Acceptable with UTF-8: -->
<meta charset="UTF-8">
<p>Price: €99 • Rating: 4½ stars</p>

<!-- ❌ Bad: May not display correctly -->
<p>Use the <strong> tag for emphasis.</p>
<!-- This shows actual bold, not the code -->
```

## Common Mistakes

### Comments

```html
<!-- ❌ Nested comments (not supported) -->
<!-- This is <!-- a nested --> comment -->

<!-- ❌ Breaking HTML structure -->
<!-- <div> -->
    <p>Content</p>
<!-- </div> -->

<!-- ❌ Exposing sensitive data -->
<!-- Admin password: secret123 -->
<!-- API key: abc123xyz -->

<!-- ✅ Correct approach -->
<!-- Main container for hero section -->
<div class="hero">
    <p>Content</p>
</div>
```

### Entity Characters

```html
<!-- ❌ Forgetting to escape in code examples -->
<p>Use <div> tags</p>
<!-- Shows bold "div", not the text "<div>" -->

<!-- ❌ Double escaping -->
<p>&amp;lt;div&amp;gt;</p>
<!-- Shows: &lt;div&gt; instead of <div> -->

<!-- ❌ Incomplete entities -->
<p>&copy without semicolon</p>

<!-- ✅ Correct usage -->
<p>Use &lt;div&gt; tags</p>
<p>&copy; 2024</p>
```

## Quick Reference Table

| Character | Entity Name | Entity Number | Description |
|-----------|-------------|---------------|-------------|
| < | `&lt;` | `&#60;` | Less than |
| > | `&gt;` | `&#62;` | Greater than |
| & | `&amp;` | `&#38;` | Ampersand |
| " | `&quot;` | `&#34;` | Quotation mark |
| ' | `&apos;` | `&#39;` | Apostrophe |
| © | `&copy;` | `&#169;` | Copyright |
| ® | `&reg;` | `&#174;` | Registered |
| ™ | `&trade;` | `&#8482;` | Trademark |
| € | `&euro;` | `&#8364;` | Euro |
| £ | `&pound;` | `&#163;` | Pound |
| ° | `&deg;` | `&#176;` | Degree |
| • | `&bull;` | `&#8226;` | Bullet |
| … | `&hellip;` | `&#8230;` | Ellipsis |
| — | `&mdash;` | `&#8212;` | Em dash |
| – | `&ndash;` | `&#8211;` | En dash |
|   | `&nbsp;` | `&#160;` | Non-breaking space |

## Summary

- **Comments** help document code and are invisible to users
- Use `<!-- comment -->` syntax for single or multi-line comments
- Comments cannot be nested
- **Entity characters** display special symbols and reserved characters
- Always escape `<`, `>`, `&`, `"`, and `'` when showing HTML code
- Use `&nbsp;` for non-breaking spaces
- Common entities: `&copy;`, `&reg;`, `&trade;`, `&euro;`, `&deg;`
- Can use named entities (`&copy;`) or numeric codes (`&#169;`)
- UTF-8 encoding allows using actual characters instead of entities
- Keep comments professional and up-to-date
- Test entity rendering across browsers

Comments and entities are fundamental HTML features that improve code quality and ensure proper character display!
