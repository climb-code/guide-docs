---
title: HTML Embedded Content
description: Learn how to embed external content in HTML using iframes, embed, and object elements for videos, maps, social media, and third-party content.
---

Embedded content allows you to include external resources like YouTube videos, Google Maps, and social media posts directly in your web pages.

## iframes

The `<iframe>` (inline frame) embeds another HTML page within the current page.

### Basic iframe

```html
<iframe src="https://example.com"></iframe>
```

### iframe with Attributes

```html
<iframe 
    src="https://example.com"
    width="800"
    height="600"
    title="Example Website"
    loading="lazy"
></iframe>
```

## iframe Attributes

### Width and Height

```html
<!-- Pixels -->
<iframe src="page.html" width="800" height="600"></iframe>

<!-- Percentage (with CSS) -->
<iframe src="page.html" style="width:100%;height:400px;"></iframe>
```

### Title (Accessibility)

```html
<!-- Always include title for screen readers -->
<iframe 
    src="https://example.com"
    title="Description of embedded content"
></iframe>
```

### Loading

```html
<!-- Lazy load iframe (below the fold) -->
<iframe src="content.html" loading="lazy"></iframe>

<!-- Load immediately (above the fold) -->
<iframe src="content.html" loading="eager"></iframe>
```

### Sandbox

Restrict what the iframe can do:

```html
<!-- Very restrictive (default sandbox) -->
<iframe src="untrusted.html" sandbox></iframe>

<!-- Allow specific features -->
<iframe 
    src="external.html"
    sandbox="allow-scripts allow-same-origin"
></iframe>
```

**Sandbox values:**
- `allow-forms` - Allow form submission
- `allow-scripts` - Allow JavaScript
- `allow-same-origin` - Treat as same origin
- `allow-popups` - Allow popups
- `allow-modals` - Allow modals
- `allow-top-navigation` - Allow navigation of top frame

### Allow (Permissions Policy)

Control browser features:

```html
<iframe 
    src="map.html"
    allow="geolocation; microphone; camera"
></iframe>
```

### Referrer Policy

```html
<iframe 
    src="external.html"
    referrerpolicy="no-referrer"
></iframe>
```

## Embedding YouTube Videos

### Basic YouTube Embed

```html
<iframe 
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>
```

### YouTube with Parameters

```html
<!-- Autoplay, muted, no controls -->
<iframe 
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=0"
    title="YouTube video"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
></iframe>
```

**Common YouTube parameters:**
- `autoplay=1` - Auto play video
- `mute=1` - Mute audio
- `controls=0` - Hide controls
- `loop=1` - Loop video
- `start=30` - Start at 30 seconds
- `end=60` - End at 60 seconds

### Responsive YouTube Embed

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="YouTube video"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allowfullscreen
    ></iframe>
</div>
```

## Embedding Google Maps

### Basic Map Embed

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=..."
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
></iframe>
```

### Responsive Map

```html
<div style="position: relative; padding-bottom: 75%; height: 0;">
    <iframe 
        src="https://www.google.com/maps/embed?pb=..."
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
        allowfullscreen
        loading="lazy"
    ></iframe>
</div>
```

## Embedding Social Media

### Twitter Timeline

```html
<iframe 
    src="https://twitter.com/TwitterDev"
    width="400"
    height="600"
    title="Twitter Timeline"
></iframe>
```

### Facebook Page Plugin

```html
<iframe 
    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook"
    width="340"
    height="500"
    style="border:none;overflow:hidden"
    scrolling="no"
    frameborder="0"
    allowfullscreen="true"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
></iframe>
```

### Instagram Embed

```html
<iframe 
    src="https://www.instagram.com/p/POST_ID/embed"
    width="400"
    height="480"
    frameborder="0"
    scrolling="no"
    allowtransparency="true"
></iframe>
```

## Embed Element

The `<embed>` element embeds external content (use iframe instead when possible):

```html
<!-- PDF -->
<embed 
    src="document.pdf"
    type="application/pdf"
    width="800"
    height="600"
>

<!-- SVG -->
<embed 
    src="diagram.svg"
    type="image/svg+xml"
    width="400"
    height="300"
>

<!-- Flash (deprecated) -->
<embed 
    src="animation.swf"
    type="application/x-shockwave-flash"
    width="400"
    height="300"
>
```

## Object Element

The `<object>` element embeds external resources with fallback:

```html
<!-- PDF with fallback -->
<object 
    data="document.pdf"
    type="application/pdf"
    width="800"
    height="600"
>
    <p>
        Your browser doesn't support PDFs.
        <a href="document.pdf">Download the PDF</a>.
    </p>
</object>

<!-- Image with fallback -->
<object 
    data="image.svg"
    type="image/svg+xml"
    width="400"
    height="300"
>
    <img src="fallback.png" alt="Fallback image">
</object>
```

## Practical Examples

### Video Section with YouTube

```html
<section class="video-section">
    <h2>Watch Our Tutorial</h2>
    
    <div class="responsive-video">
        <iframe 
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Tutorial Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
        ></iframe>
    </div>
    
    <p>Learn the basics of web development in this comprehensive tutorial.</p>
</section>
```

### Contact Page with Map

```html
<section class="contact-section">
    <h2>Visit Our Office</h2>
    
    <div class="map-container">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Office Location Map"
        ></iframe>
    </div>
    
    <address>
        <p>123 Main Street</p>
        <p>City, State 12345</p>
        <p>Phone: (123) 456-7890</p>
    </address>
</section>
```

### Code Playground Embed

```html
<article>
    <h2>Try It Yourself</h2>
    <p>Edit the code below and see the results:</p>
    
    <iframe 
        src="https://codepen.io/pen/embed/..."
        width="100%"
        height="400"
        title="Code Example"
        frameborder="0"
        loading="lazy"
        allowfullscreen
    ></iframe>
</article>
```

### PDF Document Viewer

```html
<section>
    <h2>Annual Report 2024</h2>
    
    <object 
        data="annual-report-2024.pdf"
        type="application/pdf"
        width="100%"
        height="800"
    >
        <p>
            Unable to display PDF.
            <a href="annual-report-2024.pdf">Download PDF</a> instead.
        </p>
    </object>
</section>
```

### Social Media Feed

```html
<aside class="social-sidebar">
    <h3>Follow Us</h3>
    
    <!-- Twitter Timeline -->
    <div class="social-embed">
        <iframe 
            src="https://twitter.com/TwitterDev"
            width="300"
            height="400"
            title="Twitter Feed"
            frameborder="0"
        ></iframe>
    </div>
    
    <!-- Facebook Page -->
    <div class="social-embed">
        <iframe 
            src="https://www.facebook.com/plugins/page.php?href=..."
            width="300"
            height="400"
            title="Facebook Page"
            frameborder="0"
        ></iframe>
    </div>
</aside>
```

### Embedded Calendar

```html
<section>
    <h2>Event Calendar</h2>
    
    <iframe 
        src="https://calendar.google.com/calendar/embed?src=..."
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
        title="Event Calendar"
    ></iframe>
</section>
```

## Security Best Practices

### Use Sandbox

```html
<!-- Restrict untrusted content -->
<iframe 
    src="user-generated-content.html"
    sandbox="allow-scripts allow-same-origin"
    title="User Content"
></iframe>
```

### Validate Sources

```html
<!-- ✅ Good: HTTPS only -->
<iframe src="https://trusted-site.com"></iframe>

<!-- ❌ Bad: HTTP (insecure) -->
<iframe src="http://untrusted-site.com"></iframe>
```

### Content Security Policy

```html
<!-- Set CSP headers on your server -->
<iframe 
    src="external.html"
    csp="default-src 'self'"
></iframe>
```

### X-Frame-Options

Prevent your site from being embedded:

```html
<!-- In HTTP headers (server-side) -->
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
X-Frame-Options: ALLOW-FROM https://trusted-site.com
```

## Accessibility

### Always Include Title

```html
<!-- ✅ Good - descriptive title -->
<iframe 
    src="map.html"
    title="Interactive map showing our office location"
></iframe>

<!-- ❌ Bad - missing title -->
<iframe src="map.html"></iframe>
```

### Provide Alternatives

```html
<iframe src="video.html" title="Tutorial video">
    <p>
        Your browser doesn't support iframes.
        <a href="video.html">Watch video in new window</a> or
        <a href="transcript.html">read transcript</a>.
    </p>
</iframe>
```

### Skip Links

```html
<!-- Allow users to skip embedded content -->
<a href="#main-content">Skip to main content</a>

<iframe src="ads.html" title="Advertisement"></iframe>

<main id="main-content">
    <!-- Main content -->
</main>
```

## Performance Tips

### Lazy Load Iframes

```html
<!-- Load when scrolled into view -->
<iframe 
    src="heavy-content.html"
    loading="lazy"
    title="Additional Content"
></iframe>
```

### Use Facades

Load lightweight poster until user clicks:

```html
<!-- Show image initially -->
<div class="youtube-facade" onclick="loadVideo(this)">
    <img src="video-thumbnail.jpg" alt="Video thumbnail">
    <button>Play Video</button>
</div>

<script>
function loadVideo(element) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    element.replaceWith(iframe);
}
</script>
```

### Limit iframe Size

```html
<!-- Specify reasonable dimensions -->
<iframe 
    src="widget.html"
    width="400"
    height="300"
    title="Widget"
></iframe>
```

## Best Practices

1. **Always include title attribute**: For accessibility
2. **Use HTTPS sources**: Ensure secure connections
3. **Implement sandbox**: For untrusted content
4. **Lazy load when possible**: Improve page load performance
5. **Provide fallback content**: For unsupported browsers
6. **Validate embed sources**: Only embed from trusted sites
7. **Use responsive techniques**: Make embeds mobile-friendly
8. ** Set appropriate dimensions**: Prevent layout issues
9. **Consider privacy**: Some embeds track users
10. **Test across browsers**: Ensure compatibility

## Common Mistakes

```html
<!-- ❌ No title attribute -->
<iframe src="map.html"></iframe>

<!-- ❌ Insecure HTTP -->
<iframe src="http://example.com"></iframe>

<!-- ❌ No dimensions -->
<iframe src="content.html"></iframe>

<!-- ❌ Missing fallback -->
<iframe src="video.html"></iframe>

<!-- ✅ Correct approach -->
<iframe 
    src="https://example.com"
    width="800"
    height="600"
    title="Descriptive title for embedded content"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
>
    <p>
        Your browser doesn't support iframes.
        <a href="https://example.com">Visit the page directly</a>.
    </p>
</iframe>
```

## Summary

- Use `<iframe>` to embed external content
- Always include `title` attribute for accessibility
- Use `sandbox` to restrict untrusted content
- Implement `loading="lazy"` for performance
- Provide fallback content for unsupported browsers
- Use HTTPS sources only
- Make embeds responsive for mobile
- Common uses: YouTube, Google Maps, social media
- Consider privacy implications of third-party embeds
- Test thoroughly across browsers and devices

Embedded content enhances functionality but use it responsibly for security, performance, and accessibility!
