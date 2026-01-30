---
title: HTML Meta Tags
description: Master HTML meta tags for SEO, social media, and browser behavior. Learn viewport settings, Open Graph, Twitter Cards, and more.
---

Meta tags provide metadata about HTML documents. They're placed in the `<head>` section and are crucial for SEO, social media sharing, and browser behavior.

## Basic Meta Tags

### Character Encoding

Essential for displaying special characters correctly:

```html
<meta charset="UTF-8">
```

**Common encodings:**
- `UTF-8`: Universal encoding (recommended)
- `ISO-8859-1`: Western European languages
- `UTF-16`: Unicode with 16-bit encoding

### Viewport (Mobile Responsive)

Critical for responsive web design:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Viewport attributes:**
```html
<!-- Standard responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Control zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

<!-- Disable zoom (not recommended) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Set specific width -->
<meta name="viewport" content="width=500">
```

## SEO Meta Tags

### Description

Appears in search results under the page title:

```html
<meta name="description" content="Learn HTML meta tags for SEO optimization. Complete guide with examples and best practices.">
```

**Best practices:**
- 150-160 characters maximum
- Include target keywords naturally
- Make it compelling for click-through
- Unique for each page
- Don't duplicate title content

### Keywords (Less Important Now)

```html
<meta name="keywords" content="HTML, meta tags, SEO, web development">
```

Note: Most search engines don't use this anymore, but some smaller engines might.

### Author

```html
<meta name="author" content="John Doe">
```

### Robots (Search Engine Instructions)

```html
<!-- Allow indexing and following links (default) -->
<meta name="robots" content="index, follow">

<!-- Prevent indexing this page -->
<meta name="robots" content="noindex, follow">

<!-- Index but don't follow links -->
<meta name="robots" content="index, nofollow">

<!-- Don't index and don't follow links -->
<meta name="robots" content="noindex, nofollow">

<!-- Don't show cached version -->
<meta name="robots" content="noarchive">

<!-- Don't show description in search results -->
<meta name="robots" content="nosnippet">

<!-- Don't include in image search -->
<meta name="robots" content="noimageindex">

<!-- Combined directives -->
<meta name="robots" content="noindex, nofollow, noarchive">
```

**Specific bots:**
```html
<!-- Google-specific -->
<meta name="googlebot" content="noindex">

<!-- Bing-specific -->
<meta name="bingbot" content="noindex">
```

### Language and Locale

```html
<!-- Page language -->
<meta http-equiv="content-language" content="en-US">

<!-- Or use html lang attribute (preferred) -->
<html lang="en-US">
```

## Open Graph (OG) Tags

Used by Facebook, LinkedIn, and other social platforms:

### Basic OG Tags

```html
<meta property="og:title" content="Your Awesome Article Title">
<meta property="og:description" content="A brief description of your content">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/article">
<meta property="og:type" content="website">
```

### Complete OG Implementation

```html
<!-- Basic Info -->
<meta property="og:title" content="Learn HTML Meta Tags - Complete Guide">
<meta property="og:description" content="Master HTML meta tags for better SEO and social media presence">
<meta property="og:url" content="https://example.com/html-meta-tags">
<meta property="og:site_name" content="Web Dev Tutorials">

<!-- Content Type -->
<meta property="og:type" content="article">
<!-- Other types: website, product, video.movie, music.song -->

<!-- Image -->
<meta property="og:image" content="https://example.com/meta-tags-preview.jpg">
<meta property="og:image:secure_url" content="https://example.com/meta-tags-preview.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="HTML Meta Tags Tutorial">

<!-- Locale -->
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="es_ES">
<meta property="og:locale:alternate" content="fr_FR">
```

**Recommended image sizes:**
- Facebook: 1200 x 630 pixels
- Minimum: 600 x 315 pixels
- Aspect ratio: 1.91:1

### Article-Specific OG Tags

```html
<meta property="og:type" content="article">
<meta property="article:published_time" content="2024-01-15T08:00:00+00:00">
<meta property="article:modified_time" content="2024-01-20T10:30:00+00:00">
<meta property="article:author" content="https://example.com/author/john">
<meta property="article:section" content="Technology">
<meta property="article:tag" content="HTML">
<meta property="article:tag" content="Web Development">
```

## Twitter Cards

Enhance how your content appears on Twitter:

### Summary Card

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@yourwebsite">
<meta name="twitter:creator" content="@authorhandle">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Description of your content">
<meta name="twitter:image" content="https://example.com/image.jpg">
<meta name="twitter:image:alt" content="Image description">
```

### Summary Card with Large Image

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yourwebsite">
<meta name="twitter:creator" content="@authorhandle">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Description of your content">
<meta name="twitter:image" content="https://example.com/large-image.jpg">
<meta name="twitter:image:alt" content="Descriptive alt text">
```

**Recommended image sizes:**
- Summary: 120 x 120 pixels (minimum)
- Large Image: 280 x 150 pixels (minimum), 1200 x 628 pixels (recommended)

### App Card

```html
<meta name="twitter:card" content="app">
<meta name="twitter:site" content="@yourapp">
<meta name="twitter:description" content="Download our app">
<meta name="twitter:app:name:iphone" content="App Name">
<meta name="twitter:app:id:iphone" content="123456789">
<meta name="twitter:app:name:ipad" content="App Name">
<meta name="twitter:app:id:ipad" content="123456789">
<meta name="twitter:app:name:googleplay" content="App Name">
<meta name="twitter:app:id:googleplay" content="com.example.app">
```

## HTTP-Equiv Meta Tags

### Refresh and Redirect

```html
<!-- Refresh page every 30 seconds -->
<meta http-equiv="refresh" content="30">

<!-- Redirect after 5 seconds -->
<meta http-equiv="refresh" content="5; url=https://example.com/new-page">
```

### Content Security Policy

```html
<!-- Basic CSP -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">

<!-- More restrictive -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://trusted.com; style-src 'self' 'unsafe-inline'">
```

### X-UA-Compatible (Internet Explorer)

```html
<!-- Force IE to use latest rendering engine -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

### Content-Type (Legacy)

```html
<!-- Modern way (charset attribute) -->
<meta charset="UTF-8">

<!-- Old way  (still works) -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

## Mobile and App Meta Tags

### Theme Color

```html
<!-- Browser theme color on mobile -->
<meta name="theme-color" content="#4285f4">

<!-- Media query support -->
<meta name="theme-color" content="#4285f4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)">
```

### Mobile Web App

```html
<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="App Name">

<!-- Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="App Name">
```

### Phone Number Format

```html
<!-- Disable auto-detection of phone numbers -->
<meta name="format-detection" content="telephone=no">

<!-- Android -->
<meta name="format-detection" content="email=no">
<meta name="format-detection" content="address=no">
```

## Other Useful Meta Tags

### Copyright

```html
<meta name="copyright" content="© 2024 Company Name">
```

### Rating

```html
<!-- Content rating -->
<meta name="rating" content="general">
<!-- Options: general, mature, restricted, 14 years, safe for kids -->
```

### Referrer Policy

```html
<meta name="referrer" content="no-referrer">
<!-- Options: no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url -->
```

### Generator

```html
<meta name="generator" content="WordPress 6.0">
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Essential Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <title>HTML Meta Tags Guide - Complete Tutorial 2024</title>
    <meta name="description" content="Master HTML meta tags for SEO, social media, and mobile optimization. Complete guide with examples and best practices.">
    <meta name="keywords" content="HTML, meta tags, SEO, Open Graph, Twitter Cards">
    <meta name="author" content="Guide Docs">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://example.com/html-meta-tags">
    <meta property="og:title" content="HTML Meta Tags Guide - Complete Tutorial">
    <meta property="og:description" content="Master HTML meta tags for SEO, social media, and mobile optimization.">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Guide Docs">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@guidedocs">
    <meta name="twitter:creator" content="@guidedocs">
    <meta name="twitter:title" content="HTML Meta Tags Guide - Complete Tutorial">
    <meta name="twitter:description" content="Master HTML meta tags for SEO, social media, and mobile optimization.">
    <meta name="twitter:image" content="https://example.com/twitter-image.jpg">
    <meta name="twitter:image:alt" content="HTML Meta Tags Tutorial">
    
    <!-- Mobile -->
    <meta name="theme-color" content="#4285f4">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Other -->
    <meta name="referrer" content="origin-when-cross-origin">
    <link rel="canonical" href="https://example.com/html-meta-tags">
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

## Testing Tools

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Metatags.io**: https://metatags.io/

## Best Practices

1. **Always include essential meta tags**: charset, viewport, title, description
2. **Write unique descriptions**: Different for each page
3. **Optimize for social sharing**: Include OG and Twitter Card tags
4. **Use proper image dimensions**: Follow recommended sizes
5. **Test before publishing**: Use validation tools
6. **Keep descriptions compelling**: Encourage clicks
7. **Update dynamically**: For SPAs and dynamic content
8. **Don't keyword stuff**: Write naturally
9. **Include locale information**: For international sites
10. **Monitor performance**: Track click-through rates

## Common Mistakes

```html
<!-- Missing essential tags -->
<head>
    <title>Page</title>
    <!-- Missing charset and viewport! -->
</head>

<!-- Duplicate meta tags -->
<meta name="description" content="First description">
<meta name="description" content="Second description"> <!-- Avoid! -->

<!-- Too long description -->
<meta name="description" content="This is way too long and will be truncated in search results because it exceeds the recommended 160 character limit...">

<!-- Missing OG image dimensions -->
<meta property="og:image" content="image.jpg"> <!-- Relative URL! -->
<meta property="og:image" content="https://example.com/image.jpg"> <!-- Better -->

<!-- Forgetting to update canonical URL -->
<link rel="canonical" href="https://example.com/old-url"> <!-- Wrong URL! -->
```

## Summary

- Meta tags provide metadata about your HTML document
- Essential tags: charset, viewport, title, description
- Open Graph tags improve social media sharing
- Twitter Cards enhance appearance on Twitter
- Use robots meta tag to control search engine behavior
- Test meta tags before publishing
- Keep descriptions under 160 characters
- Use absolute URLs for images
- Update meta tags for each page

Master meta tags to improve your website's discoverability, appearance in search results, and social media presence!
