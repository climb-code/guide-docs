---
title: HTML Accessibility
description: Learn HTML accessibility and ARIA. Create inclusive websites for all users. Master semantic HTML, ARIA roles, keyboard navigation, and screen reader support.
---

Web accessibility ensures that websites, tools, and technologies are designed and developed so that people with disabilities can use them effectively.

## Why Accessibility Matters

**Legal reasons:**
- ADA (Americans with Disabilities Act) compliance
- WCAG (Web Content Accessibility Guidelines) standards
- Section 508 compliance

**Business reasons:**
- Larger audience reach (15-20% of population has disabilities)
- Better SEO
- Improved usability for everyone
- Enhanced mobile experience

**Ethical reasons:**
- Equal access to information
- Inclusive design
- Social responsibility

## Types of Disabilities

1. **Visual**: Blindness, low vision, color blindness
2. **Auditory**: Deafness, hard of hearing
3. **Motor**: Limited fine motor control, paralysis
4. **Cognitive**: Learning disabilities, memory issues
5. **Seizure**: Photosensitive epilepsy

## Semantic HTML

Use proper HTML elements instead of generic `<div>` and `<span>`:

### Headers and Navigation

```html
<!-- Good: Semantic structure -->
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>Page Title</h1>
        <section>
            <h2>Section Title</h2>
            <p>Content...</p>
        </section>
    </article>
</main>

<footer>
    <p>&copy; 2024 Company</p>
</footer>

<!-- Bad: Non-semantic -->
<div class="header">
    <div class="nav">
        <div class="link"><a href="/">Home</a></div>
    </div>
</div>
```

### Landmarks

```html
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<aside>Sidebar</aside>
<footer>Footer content</footer>
```

## Headings Hierarchy

Proper heading structure helps screen readers navigate:

```html
<!-- Good: Proper hierarchy -->
<h1>Main Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
    <h3>Subsection 2.1</h3>

<!-- Bad: Skipping levels -->
<h1>Main Title</h1>
<h3>Subsection</h3> <!-- Skipped h2! -->
<h5>Details</h5>    <!-- Skipped h3 and h4! -->
```

**Best practices:**
- Only one `<h1>` per page
- Don't skip heading levels
- Don't use headings for styling (use CSS)
- Use headings to create document outline

## Images and Alt Text

### Alt Text

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased by 50% in Q4 2024">

<!-- Decorative image -->
<img src="decoration.png" alt="">

<!-- Functional image (link/button) -->
<a href="/search">
    <img src="search-icon.png" alt="Search">
</a>

<!-- Complex image -->
<figure>
    <img src="complex-chart.png" 
         alt="Bar chart showing quarterly sales data"
         longdesc="sales-data.html">
    <figcaption>
        Detailed sales data for 2024. Q1: $100k, Q2: $150k, Q3: $200k, Q4: $250k.
    </figcaption>
</figure>
```

**Alt text guidelines:**
- Be descriptive and concise
- Don't say "image of" or "picture of"
- For decorative images, use `alt=""`
- For complex images, provide detailed description
- Avoid redundancy with surrounding text

## Links and Buttons

### Descriptive Link Text

```html
<!-- Good: Descriptive -->
<a href="/report.pdf">Download the 2024 Annual Report (PDF, 2MB)</a>

<!-- Bad: Not descriptive -->
<a href="/report.pdf">Click here</a>

<!-- Good: Context clear -->
<h2>Our Services</h2>
<p>We offer consulting, training, and support.</p>
<a href="/services">Learn more about our services</a>

<!-- Bad: "Learn more" without context -->
<a href="/services">Learn more</a>
```

### Link vs Button

```html
<!-- Link: Navigation to different page/section -->
<a href="/contact">Contact Us</a>

<!-- Button: Action on current page -->
<button type="button" onclick="openModal()">Open Dialog</button>
<button type="submit">Submit Form</button>
```

### Skip Links

```html
<body>
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <header>
        <!-- Navigation -->
    </header>
    
    <main id="main">
        <!-- Main content -->
    </main>
</body>

<style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    }
    
    .skip-link:focus {
        top: 0;
    }
</style>
```

## Forms Accessibility

### Labels

```html
<!-- Explicit label (preferred) -->
<label for="username">Username:</label>
<input type="text" id="username" name="username">

<!-- Implicit label -->
<label>
    Username:
    <input type="text" name="username">
</label>

<!-- Multiple inputs need individual labels -->
<label for="firstName">First Name:</label>
<input type="text" id="firstName" name="firstName">

<label for="lastName">Last Name:</label>
<input type="text" id="lastName" name="lastName">
```

### Required Fields

```html
<label for="email">
    Email <span aria-label="required">*</span>
</label>
<input type="email" id="email" name="email" required aria-required="true">

<!-- Or -->
<label for="email">Email (required)</label>
<input type="email" id="email" name="email" required>
```

### Error Messages

```html
<label for="email">Email</label>
<input type="email" 
       id="email" 
       name="email" 
       aria-describedby="email-error"
       aria-invalid="true">
<span id="email-error" class="error" role="alert">
    Please enter a valid email address
</span>
```

### Fieldsets and Legends

```html
<fieldset>
    <legend>Contact Preferences</legend>
    
    <input type="radio" id="email" name="contact" value="email">
    <label for="email">Email</label>
    
    <input type="radio" id="phone" name="contact" value="phone">
    <label for="phone">Phone</label>
</fieldset>
```

## ARIA (Accessible Rich Internet Applications)

### ARIA Roles

```html
<!-- Navigation landmark -->
<div role="navigation">
    <ul>...</ul>
</div>

<!-- Better: Use semantic HTML -->
<nav>
    <ul>...</ul>
</nav>

<!-- Custom widgets need roles -->
<div role="tablist">
    <button role="tab" aria-selected="true">Tab 1</button>
    <button role="tab" aria-selected="false">Tab 2</button>
</div>

<div role="tabpanel">Tab 1 Content</div>
```

**Common roles:**
- `banner` - Site header
- `navigation` - Navigation menu
- `main` - Main content
- `complementary` - Sidebar
- `contentinfo` - Footer
- `search` - Search form
- `alert` - Alert message
- `dialog` - Modal dialog
- `button`, `tab`, `tabpanel`, `menu`, etc.

### ARIA States and Properties

#### aria-label

```html
<!-- Icon button without text -->
<button aria-label="Close dialog">
    ✕
</button>

<!-- Search form -->
<form role="search" aria-label="Site search">
    <input type="search" aria-label="Search query">
    <button type="submit">Search</button>
</form>
```

#### aria-labelledby

```html
<h2 id="dialog-title">Confirm Delete</h2>
<div role="dialog" aria-labelledby="dialog-title">
    <p>Are you sure you want to delete this item?</p>
    <button>Delete</button>
    <button>Cancel</button>
</div>
```

#### aria-describedby

```html
<label for="password">Password</label>
<input type="password" 
       id="password" 
       aria-describedby="password-hint">
<span id="password-hint">
    Password must be at least 8 characters long
</span>
```

#### aria-hidden

```html
<!-- Hide decorative icons from screen readers -->
<button>
    <span aria-hidden="true">★</span>
    Favorite
</button>

<!-- Hide duplicate content -->
<div aria-hidden="true">
    <!-- Decorative elements -->
</div>
```

#### aria-live

```html
<!-- Announce updates automatically -->
<div aria-live="polite">
    <!-- Updates announced when user is idle -->
</div>

<div aria-live="assertive" role="alert">
    <!-- Important updates announced immediately -->
</div>

<!-- Loading indicator -->
<div role="status" aria-live="polite" aria-atomic="true">
    Loading...
</div>
```

#### aria-expanded

```html
<button aria-expanded="false" aria-controls="menu">
    Menu
</button>

<ul id="menu" hidden>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>

<script>
    button.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        menu.hidden = expanded;
    });
</script>
```

## Keyboard Navigation

### Focusable Elements

```html
<!-- Naturally focusable -->
<a href="/page">Link</a>
<button>Button</button>
<input type="text">
<textarea></textarea>
<select></select>

<!-- Make div focusable (when necessary) -->
<div tabindex="0" role="button" onclick="handleClick()">
    Custom Button
</div>

<!-- Remove from tab order -->
<div tabindex="-1" id="alert">
    Error message
</div>
```

**tabindex values:**
- `0` - Natural tab order
- `-1` - Programmatically focusable, not in tab order
- `1+` - Explicit tab order (avoid!)

### Focus Styles

```css
/* Don't remove focus outline! */
button:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Modern approach */
button:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Remove for mouse users only */
button:focus:not(:focus-visible) {
    outline: none;
}
```

### Keyboard Event Handling

```html
<div role="button" tabindex="0" id="customButton">
    Click Me
</div>

<script>
    const button = document.getElementById('customButton');
    
    button.addEventListener('click', handleAction);
    
    button.addEventListener('keydown', function(e) {
        // Activate on Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAction();
        }
    });
    
    function handleAction() {
        console.log('Button activated!');
    }
</script>
```

## Color and Contrast

### Contrast Ratios

**WCAG requirements:**
- Normal text: 4.5:1 minimum (AA), 7:1 enhanced (AAA)
- Large text (18pt+): 3:1 minimum (AA), 4.5:1 enhanced (AAA)
- UI components: 3:1 minimum

```html
<!-- Good contrast -->
<p style="color: #333; background: #fff;">High contrast text</p>

<!-- Bad contrast -->
<p style="color: #ccc; background: #fff;">Low contrast text</p>
```

### Don't Rely on Color Alone

```html
<!-- Bad: Color only -->
<span style="color: red;">Error</span>
<span style="color: green;">Success</span>

<!-- Good: Color + icon + text -->
<span class="error">
    <span aria-hidden="true">❌</span>
    Error: Invalid input
</span>

<span class="success">
    <span aria-hidden="true">✓</span>
    Success: Saved
</span>
```

## Tables

### Accessible Data Tables

```html
<table>
    <caption>Employee Contact Information</caption>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>555-1234</td>
        </tr>
    </tbody>
</table>
```

### Complex Tables

```html
<table>
    <thead>
        <tr>
            <th id="name" scope="col">Name</th>
            <th id="q1" scope="col">Q1</th>
            <th id="q2" scope="col">Q2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th id="john" scope="row">John</th>
            <td headers="john q1">$100</td>
            <td headers="john q2">$150</td>
        </tr>
    </tbody>
</table>
```

## Multimedia

### Video Accessibility

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
    <track kind="descriptions" src="descriptions.vtt" srclang="en">
    Your browser doesn't support video.
</video>
```

### Audio Accessibility

```html
<audio controls>
    <source src="podcast.mp3" type="audio/mpeg">
    <track kind="captions" src="transcript.vtt" srclang="en">
</audio>

<!-- Or provide transcript -->
<audio controls src="podcast.mp3"></audio>
<details>
    <summary>View Transcript</summary>
    <p>Full text transcript...</p>
</details>
```

## Testing Accessibility

### Automated Tools

- **Lighthouse**: Built into Chrome DevTools
- **axe DevTools**: Browser extension
- **WAVE**: Web accessibility evaluation tool
- **Pa11y**: Command-line tool

### Manual Testing

1. **Keyboard navigation**: Navigate using only Tab, Enter, Space, Arrow keys
2. **Screen reader**: Test with NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)
3. **Zoom**: Test at 200% zoom
4. **Color**: Use browser color blindness simulators
5. **Contrast**: Check with contrast checkers

### Testing Checklist

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets standards
- [ ] Headings form proper hierarchy
- [ ] Semantic HTML used
- [ ] ARIA used correctly
- [ ] Links are descriptive
- [ ] Skip links present
- [ ] Forms have error messages
- [ ] Videos have captions
- [ ] Tables have proper headers

## Common Patterns

### Modal Dialog

```html
<button id="openModal">Open Dialog</button>

<div role="dialog" 
     aria-labelledby="dialogTitle" 
     aria-modal="true"
     hidden>
    <h2 id="dialogTitle">Dialog Title</h2>
    <p>Dialog content...</p>
    <button id="closeModal">Close</button>
</div>

<script>
    const modal = document.querySelector('[role="dialog"]');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    let lastFocus;
    
    openBtn.addEventListener('click', () => {
        lastFocus = document.activeElement;
        modal.hidden = false;
        closeBtn.focus();
        
        // Trap focus in modal
        modal.addEventListener('keydown', trapFocus);
    });
    
    closeBtn.addEventListener('click', () => {
        modal.hidden = true;
        lastFocus.focus();
    });
    
    function trapFocus(e) {
        // Implement focus trap logic
    }
</script>
```

### Accordion

```html
<div class="accordion">
    <h3>
        <button aria-expanded="false" aria-controls="panel1">
            Section 1
        </button>
    </h3>
    <div id="panel1" role="region" hidden>
        <p>Panel content...</p>
    </div>
</div>
```

## Best Practices

1. **Use semantic HTML** whenever possible
2. **Provide text alternatives** for non-text content
3. **Ensure keyboard accessibility** for all interactive elements
4. **Maintain sufficient color contrast**
5. **Create logical heading hierarchy**
6. **Label all form inputs**
7. **Use ARIA sparingly** - HTML first
8. **Test with real users** including those with disabilities
9. **Provide captions** for video content
10. **Don't disable zoom**

## Resources

- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

## Summary

- Accessibility benefits everyone, not just people with disabilities
- Use semantic HTML as foundation
- Provide text alternatives for images and media
- Ensure keyboard navigation works
- Use ARIA to enhance, not replace, HTML
- Test with automated tools and real users
- Follow WCAG guidelines for compliance
- Color and contrast are critical

Building accessible websites is not optional—it's essential for creating an inclusive web for all users!
