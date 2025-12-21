---
title: HTML Links
description: Master HTML links and navigation - learn how to create hyperlinks, anchor links, email and phone links, and implement accessible navigation patterns.
---


Links are the foundation of the web, allowing users to navigate between pages and resources. The `<a>` (anchor) element creates hyperlinks in HTML.

## Basic Link Syntax

```html
<a href="URL">Link Text</a>
```

**Example:**
```html
<a href="https://www.example.com">Visit Example</a>
```

## Types of Links

### Absolute URLs

Full web addresses including protocol:

```html
<a href="https://www.google.com">Google</a>
<a href="http://example.com">Example Site</a>
<a href="https://github.com/username/repo">GitHub Repo</a>
```

### Relative URLs

Paths relative to the current page:

```html
<!-- Same directory -->
<a href="about.html">About</a>

<!-- Subdirectory -->
<a href="pages/contact.html">Contact</a>

<!-- Parent directory -->
<a href="../index.html">Home</a>

<!-- Root directory -->
<a href="/home">Home</a>
```

**Directory structure example:**
```
website/
├── index.html
├── about.html
└── pages/
    ├── contact.html
    └── services.html
```

```html
<!-- From index.html -->
<a href="about.html">About</a>
<a href="pages/contact.html">Contact</a>

<!-- From pages/contact.html -->
<a href="../index.html">Home</a>
<a href="services.html">Services</a>
```

## Link Targets

The `target` attribute specifies where to open the link:

```html
<!-- Open in same tab/window (default) -->
<a href="page.html" target="_self">Same Tab</a>

<!-- Open in new tab/window -->
<a href="https://example.com" target="_blank">New Tab</a>

<!-- Open in parent frame -->
<a href="page.html" target="_parent">Parent Frame</a>

<!-- Open in full window -->
<a href="page.html" target="_top">Full Window</a>

<!-- Open in named frame/window -->
<a href="page.html" target="myFrame">Named Frame</a>
```

**Security note for `target="_blank"`:**
```html
<!-- ❌ Security risk -->
<a href="https://external.com" target="_blank">External Link</a>

<!-- ✅ Secure (prevents tabnabbing) -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Link
</a>
```

## Anchor Links (Same Page)

Link to specific sections on the same page:

```html
<!-- Navigation links -->
<nav>
    <a href="#section1">Section 1</a>
    <a href="#section2">Section 2</a>
    <a href="#section3">Section 3</a>
</nav>

<!-- Target sections -->
<h2 id="section1">Section 1</h2>
<p>Content for section 1...</p>

<h2 id="section2">Section 2</h2>
<p>Content for section 2...</p>

<h2 id="section3">Section 3</h2>
<p>Content for section 3...</p>

<!-- Back to top link -->
<a href="#top">Back to Top</a>
```

## Email Links

```html
<!-- Basic email link -->
<a href="mailto:email@example.com">Send Email</a>

<!-- With subject -->
<a href="mailto:support@example.com?subject=Help Request">
    Contact Support
</a>

<!-- With subject and body -->
<a href="mailto:info@example.com?subject=Inquiry&body=Hello, I would like to know...">
    Send Inquiry
</a>

<!-- Multiple recipients -->
<a href="mailto:first@example.com,second@example.com">
    Email Both
</a>

<!-- CC and BCC -->
<a href="mailto:primary@example.com?cc=copy@example.com&bcc=hidden@example.com">
    Email with CC/BCC
</a>
```

## Phone Links

```html
<!-- Basic phone link -->
<a href="tel:+1234567890">Call Us: (123) 456-7890</a>

<!-- International format -->
<a href="tel:+441234567890">Call UK: +44 123 456 7890</a>

<!-- SMS link -->
<a href="sms:+1234567890">Send SMS</a>

<!-- SMS with body (not widely supported) -->
<a href="sms:+1234567890?body=Hello there!">Send SMS</a>
```

## Download Links

```html
<!-- Basic download -->
<a href="document.pdf" download>Download PDF</a>

<!-- Download with custom filename -->
<a href="report-2024.pdf" download="Annual-Report.pdf">
    Download Annual Report
</a>

<!-- Download image -->
<a href="photo.jpg" download="vacation-photo.jpg">
    Download Photo
</a>
```

## Link Relationships (`rel` attribute)

```html
<!-- External link (SEO) -->
<a href="https://external.com" rel="external">External Site</a>

<!-- No follow (don't pass SEO value) -->
<a href="https://untrusted.com" rel="nofollow">Untrusted Link</a>

<!-- Sponsored/paid link -->
<a href="https://sponsor.com" rel="sponsored">Our Sponsor</a>

<!-- User-generated content -->
<a href="https://user-link.com" rel="ugc">User Link</a>

<!-- Security for external links -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
    Secure External Link
</a>

<!-- Previous/Next in series -->
<a href="page1.html" rel="prev">Previous</a>
<a href="page3.html" rel="next">Next</a>

<!-- Alternate version -->
<a href="page-es.html" rel="alternate" hreflang="es">Español</a>
```

## Styled Links with Images

```html
<!-- Link with image -->
<a href="products.html">
    <img src="shop-icon.png" alt="Shop">
    Go to Shop
</a>

<!-- Image-only link -->
<a href="home.html">
    <img src="logo.png" alt="Company Logo - Home">
</a>

<!-- Button-style link -->
<a href="signup.html" class="button">Sign Up Now</a>
```

## Navigation Patterns

### Header Navigation

```html
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
</header>
```

### Breadcrumb Navigation

```html
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/products/electronics">Electronics</a></li>
        <li aria-current="page">Laptops</li>
    </ol>
</nav>
```

### Pagination

```html
<nav aria-label="Pagination">
    <a href="?page=1" rel="prev">← Previous</a>
    <a href="?page=1">1</a>
    <a href="?page=2" aria-current="page">2</a>
    <a href="?page=3">3</a>
    <a href="?page=3" rel="next">Next →</a>
</nav>
```

### Footer Navigation

```html
<footer>
    <nav aria-label="Footer Navigation">
        <h3>Company</h3>
        <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
        </ul>
        
        <h3>Support</h3>
        <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
        </ul>
        
        <h3>Legal</h3>
        <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
        </ul>
    </nav>
</footer>
```

## Accessibility Best Practices

### Descriptive Link Text

```html
<!-- ❌ Bad: Vague link text -->
<a href="article.html">Click here</a>
<a href="more.html">Read more</a>
<a href="info.html">Link</a>

<!-- ✅ Good: Descriptive link text -->
<a href="article.html">Read the full article about HTML links</a>
<a href="guide.html">Complete beginner's guide to web development</a>
<a href="pricing.html">View pricing plans</a>
```

### Screen Reader Friendly

```html
<!-- Add context with aria-label -->
<a href="contact.html" aria-label="Contact us via email or phone">
    Contact
</a>

<!-- Indicate external links -->
<a href="https://external.com" target="_blank">
    External Resource
    <span class="sr-only">(opens in new window)</span>
</a>

<!-- File type indication -->
<a href="report.pdf">
    Annual Report
    <span class="sr-only">(PDF, 2MB)</span>
</a>
```

### Skip Links

```html
<body>
    <!-- Skip to main content (for keyboard users) -->
    <a href="#main-content" class="skip-link">
        Skip to main content
    </a>
    
    <header>
        <!-- Header content -->
    </header>
    
    <main id="main-content">
        <!-- Main content -->
    </main>
</body>
```

## Practical Examples

### Complete Navigation System

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Navigation Example</title>
</head>
<body>
    <!-- Skip link -->
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <!-- Main header -->
    <header>
        <a href="/">
            <img src="logo.png" alt="Company Name - Home">
        </a>
        
        <!-- Primary navigation -->
        <nav aria-label="Main Navigation">
            <ul>
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        
        <!-- User navigation -->
        <nav aria-label="User Navigation">
            <a href="/login">Login</a>
            <a href="/signup" class="button">Sign Up</a>
        </nav>
    </header>
    
    <!-- Main content -->
    <main id="main">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li aria-current="page">Article Title</li>
            </ol>
        </nav>
        
        <article>
            <h1>Article Title</h1>
            <p>Article content...</p>
            
            <!-- Table of contents -->
            <nav aria-label="Table of Contents">
                <h2>Contents</h2>
                <ul>
                    <li><a href="#intro">Introduction</a></li>
                    <li><a href="#main-points">Main Points</a></li>
                    <li><a href="#conclusion">Conclusion</a></li>
                </ul>
            </nav>
            
            <section id="intro">
                <h2>Introduction</h2>
                <p>Introduction content...</p>
            </section>
            
            <!-- More sections -->
            
            <!-- Related links -->
            <aside>
                <h3>Related Articles</h3>
                <ul>
                    <li><a href="/blog/article1">First Related Article</a></li>
                    <li><a href="/blog/article2">Second Related Article</a></li>
                </ul>
            </aside>
        </article>
    </main>
    
    <!-- Footer -->
    <footer>
        <nav aria-label="Footer Navigation">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
            </ul>
        </nav>
        
        <!-- Social links -->
        <nav aria-label="Social Media">
            <a href="https://twitter.com/company" target="_blank" rel="noopener noreferrer">
                Twitter
            </a>
            <a href="https://facebook.com/company" target="_blank" rel="noopener noreferrer">
                Facebook
            </a>
        </nav>
        
        <!-- Contact links -->
        <address>
            <a href="mailto:info@example.com">Email Us</a>
            <a href="tel:+1234567890">Call: (123) 456-7890</a>
        </address>
    </footer>
</body>
</html>
```

## Best Practices

1. **Descriptive link text**: Avoid "click here" or "read more"
2. **Security for external links**: Use `rel="noopener noreferrer"` with `target="_blank"`
3. **Keyboard accessible**: Ensure all links work with Tab key
4. **Visual feedback**: Style `:hover`, `:focus`, `:active` states
5. **Skip links**: Add skip navigation for keyboard users
6. **Meaningful URLs**: Use readable, SEO-friendly URLs
7. **Relative vs absolute**: Use relative for internal, absolute for external
8. **Link color contrast**: Ensure sufficient contrast for accessibility
9. **Underline links**: Make links visually distinct
10. **Test all links**: Verify links work before publishing

## Common Mistakes

```html
<!-- ❌ Empty link text -->
<a href="page.html"></a>

<!-- ❌ Generic link text -->
<a href="article.html">Click here</a>

<!-- ❌ JavaScript void links -->
<a href="javascript:void(0)">Link</a>

<!-- ❌ Missing href -->
<a>This isn't a real link</a>

<!-- ❌ Insecure target blank -->
<a href="https://external.com" target="_blank">External</a>

<!-- ✅ Correct approach -->
<a href="article.html">Read the complete HTML guide</a>
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Resource
</a>
```

## Summary

- Use `<a>` element to create links
- `href` attribute specifies the destination
- Use descriptive link text for accessibility and SEO
- `target="_blank"` for new tabs (with security attributes)
- Anchor links navigate within the same page
- `mailto:` and `tel:` for email and phone links
- `rel` attribute defines link relationships
- Follow accessibility best practices
- Test and validate all links

Links are the backbone of web navigation - use them wisely to create excellent user experiences!
