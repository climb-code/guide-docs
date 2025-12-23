---
title: HTML Forms
description: Master HTML forms - learn how to create forms, use input types, validate user input, and handle form submissions for interactive web applications.
---


Forms are essential for user interaction, allowing users to submit data to web servers. Learn how to create accessible, user-friendly forms.

## Basic Form Structure

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <button type="submit">Submit</button>
</form>
```

## Form Element

The `<form>` element wraps all form controls:

```html
<form 
    action="/submit"              <!-- Where to send data -->
    method="POST"                 <!-- GET or POST -->
    enctype="multipart/form-data" <!-- For file uploads -->
    autocomplete="on"             <!-- Enable autocomplete -->
    novalidate                    <!-- Disable HTML5 validation -->
>
    <!-- Form fields -->
</form>
```

### Form Attributes

**`action`** - URL to send form data:
```html
<form action="/submit">
<form action="https://example.com/api/contact">
```

**`method`** - HTTP method:
```html
<form method="GET">   <!-- Data in URL -->
<form method="POST">  <!-- Data in request body -->
```

**`enctype`** - How to encode form data:
```html
<!-- Default (URL encoded) -->
<form enctype="application/x-www-form-urlencoded">

<!-- For file uploads -->
<form enctype="multipart/form-data">

<!-- Plain text (rarely used) -->
<form enctype="text/plain">
```

## Input Types

### Text Input

```html
<!-- Basic text -->
<input type="text" name="username" placeholder="Enter username">

<!-- Email -->
<input type="email" name="email" placeholder="user@example.com">

<!-- Password -->
<input type="password" name="password">

<!-- Search -->
<input type="search" name="search" placeholder="Search...">

<!-- URL -->
<input type="url" name="website" placeholder="https://example.com">

<!-- Tel -->
<input type="tel" name="phone" placeholder="123-456-7890">
```

### Number and Range

```html
<!-- Number -->
<input type="number" name="age" min="18" max="100" step="1">

<!-- Range slider -->
<input type="range" name="volume" min="0" max="100" step="5" value="50">
```

### Date and Time

```html
<!-- Date -->
<input type="date" name="birthday">

<!-- Time -->
<input type="time" name="appointment">

<!-- DateTime local -->
<input type="datetime-local" name="meeting">

<!-- Month -->
<input type="month" name="expiry">

<!-- Week -->
<input type="week" name="week">
```

### Checkboxes and Radio Buttons

```html
<!-- Checkbox -->
<input type="checkbox" id="subscribe" name="subscribe" value="yes">
<label for="subscribe">Subscribe to newsletter</label>

<!-- Multiple checkboxes -->
<fieldset>
    <legend>Select your interests:</legend>
    <input type="checkbox" id="html" name="interests" value="html">
    <label for="html">HTML</label>
    
    <input type="checkbox" id="css" name="interests" value="css">
    <label for="css">CSS</label>
    
    <input type="checkbox" id="js" name="interests" value="javascript">
    <label for="js">JavaScript</label>
</fieldset>

<!-- Radio buttons (only one can be selected) -->
<fieldset>
    <legend>Choose your plan:</legend>
    <input type="radio" id="free" name="plan" value="free">
    <label for="free">Free</label>
    
    <input type="radio" id="pro" name="plan" value="pro">
    <label for="pro">Pro</label>
    
    <input type="radio" id="enterprise" name="plan" value="enterprise">
    <label for="enterprise">Enterprise</label>
</fieldset>
```

### File Upload

```html
<!-- Single file -->
<input type="file" name="document">

<!-- Multiple files -->
<input type="file" name="photos" multiple>

<!-- Accept specific file types -->
<input type="file" name="image" accept="image/*">
<input type="file" name="pdf" accept=".pdf">
<input type="file" name="docs" accept=".doc,.docx,.pdf">
```

### Color and Hidden

```html
<!-- Color picker -->
<input type="color" name="favorite-color" value="#ff0000">

<!-- Hidden field -->
<input type="hidden" name="user-id" value="12345">
```

## Labels

Always associate labels with inputs for accessibility:

```html
<!-- Method 1: Using 'for' attribute -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Method 2: Wrapping input -->
<label>
    Email:
    <input type="email" name="email">
</label>
```

## Textarea

For multi-line text input:

```html
<label for="message">Message:</label>
<textarea 
    id="message"
    name="message"
    rows="5"
    cols="40"
    placeholder="Enter your message"
    maxlength="500"
></textarea>
```

## Select Dropdown

```html
<!-- Basic select -->
<label for="country">Country:</label>
<select id="country" name="country">
    <option value="">--Please choose--</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
</select>

<!-- With selected option -->
<select name="language">
    <option value="en" selected>English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
</select>

<!-- Option groups -->
<select name="food">
    <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
    </optgroup>
    <optgroup label="Vegetables">
        <option value="carrot">Carrot</option>
        <option value="broccoli">Broccoli</option>
    </optgroup>
</select>

<!-- Multiple selection -->
<select name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="python">Python</option>
</select>
```

## Buttons

```html
<!-- Submit button -->
<button type="submit">Submit Form</button>

<!-- Reset button -->
<button type="reset">Reset Form</button>

<!-- Regular button (for JavaScript) -->
<button type="button">Click Me</button>

<!-- Input submit button -->
<input type="submit" value="Submit">

<!-- Input reset button -->
<input type="reset" value="Reset">

<!-- Input button -->
<input type="button" value="Click">
```

## Fieldset and Legend

Group related form fields:

```html
<form>
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="fname">First Name:</label>
        <input type="text" id="fname" name="firstname">
        
        <label for="lname">Last Name:</label>
        <input type="text" id="lname" name="lastname">
    </fieldset>
    
    <fieldset>
        <legend>Contact Information</legend>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone">
    </fieldset>
</form>
```

## Input Attributes

### Required Validation

```html
<input type="text" name="username" required>
<input type="email" name="email" required>
```

### Pattern Validation

```html
<!-- Phone number pattern -->
<input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
       placeholder="123-456-7890">

<!-- Username pattern -->
<input type="text" name="username" pattern="[A-Za-z0-9]{5,}" 
       title="Username must be at least 5 alphanumeric characters">
```

### Min, Max, and Length

```html
<!-- Text length -->
<input type="text" name="username" minlength="3" maxlength="20">

<!-- Number range -->
<input type="number" name="age" min="18" max="100">

<!-- Date range -->
<input type="date" name="appointment" min="2024-01-01" max="2024-12-31">
```

### Readonly and Disabled

```html
<!-- Readonly (can't edit, but submits) -->
<input type="text" name="username" value="john_doe" readonly>

<!-- Disabled (can't edit, doesn't submit) -->
<input type="text" name="email" value="old@example.com" disabled>
```

### Placeholder and Value

```html
<!-- Placeholder (hint text) -->
<input type="text" name="search" placeholder="Search...">

<!-- Default value -->
<input type="text" name="country" value="USA">
```

### Autocomplete

```html
<!-- Enable autocomplete -->
<input type="email" name="email" autocomplete="email">

<!-- Disable autocomplete -->
<input type="password" name="password" autocomplete="off">

<!-- Common autocomplete values -->
<input type="text" name="name" autocomplete="name">
<input type="text" name="fname" autocomplete="given-name">
<input type="text" name="lname" autocomplete="family-name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="address" autocomplete="street-address">
<input type="text" name="city" autocomplete="address-level2">
<input type="text" name="zip" autocomplete="postal-code">
<input type="text" name="country" autocomplete="country">
<input type="text" name="cc-number" autocomplete="cc-number">
```

### Autofocus

```html
<!-- Focus this field on page load -->
<input type="text" name="search" autofocus>
```

## HTML5 Form Validation

```html
<form>
    <!-- Required field -->
    <input type="text" name="username" required>
    
    <!-- Email validation -->
    <input type="email" name="email" required>
    
    <!-- Minimum length -->
    <input type="password" name="password" minlength="8" required>
    
    <!-- Pattern matching -->
    <input type="text" name="zipcode" pattern="[0-9]{5}" 
           title="5-digit zip code">
    
    <!-- Number range -->
    <input type="number" name="age" min="18" max="100" required>
    
    <button type="submit">Submit</button>
</form>
```

### Custom Validation Messages

```html
<input 
    type="email" 
    name="email" 
    required
    oninvalid="this.setCustomValidity('Please enter a valid email')"
    oninput="this.setCustomValidity('')"
>
```

## Practical Form Examples

### Contact Form

```html
<form action="/contact" method="POST">
    <h2>Contact Us</h2>
    
   <div>
        <label for="name">Name: *</label>
        <input type="text" id="name" name="name" required>
    </div>
    
    <div>
        <label for="email">Email: *</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject">
    </div>
    
    <div>
        <label for="message">Message: *</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <button type="submit">Send Message</button>
</form>
```

### Registration Form

```html
<form action="/register" method="POST">
    <h2>Create Account</h2>
    
    <fieldset>
        <legend>Account Information</legend>
        
        <label for="username">Username: *</label>
        <input type="text" id="username" name="username" 
               minlength="3" maxlength="20" required>
        
        <label for="email">Email: *</label>
        <input type="email" id="email" name="email" required>
        
        <label for="password">Password: *</label>
        <input type="password" id="password" name="password" 
               minlength="8" required>
        
        <label for="confirm-password">Confirm Password: *</label>
        <input type="password" id="confirm-password" name="confirm_password" 
               minlength="8" required>
    </fieldset>
    
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname">
        
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname">
        
        <label for="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday">
    </fieldset>
    
    <div>
        <input type="checkbox" id="terms" name="terms" required>
        <label for="terms">I agree to the Terms and Conditions *</label>
    </div>
    
    <div>
        <input type="checkbox" id="newsletter" name="newsletter">
        <label for="newsletter">Subscribe to newsletter</label>
    </div>
    
    <button type="submit">Create Account</button>
</form>
```

### Survey Form

```html
<form action="/survey" method="POST">
    <h2>Customer Satisfaction Survey</h2>
    
    <fieldset>
        <legend>How satisfied are you with our service?</legend>
        <input type="radio" id="very-satisfied" name="satisfaction" value="5">
        <label for="very-satisfied">Very Satisfied</label>
        
        <input type="radio" id="satisfied" name="satisfaction" value="4">
        <label for="satisfied">Satisfied</label>
        
        <input type="radio" id="neutral" name="satisfaction" value="3">
        <label for="neutral">Neutral</label>
        
        <input type="radio" id="dissatisfied" name="satisfaction" value="2">
        <label for="dissatisfied">Dissatisfied</label>
        
        <input type="radio" id="very-dissatisfied" name="satisfaction" value="1">
        <label for="very-dissatisfied">Very Dissatisfied</label>
    </fieldset>
    
    <fieldset>
        <legend>Which features do you use? (Select all that apply)</legend>
        <input type="checkbox" id="feature1" name="features" value="dashboard">
        <label for="feature1">Dashboard</label>
        
        <input type="checkbox" id="feature2" name="features" value="reports">
        <label for="feature2">Reports</label>
        
        <input type="checkbox" id="feature3" name="features" value="analytics">
        <label for="feature3">Analytics</label>
    </fieldset>
    
    <label for="comments">Additional Comments:</label>
    <textarea id="comments" name="comments" rows="4"></textarea>
    
    <button type="submit">Submit Survey</button>
</form>
```

### File Upload Form

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
    <h2>Upload Documents</h2>
    
    <label for="profile-pic">Profile Picture:</label>
    <input type="file" id="profile-pic" name="profile_pic" 
           accept="image/*">
    
    <label for="resume">Resume (PDF only):</label>
    <input type="file" id="resume" name="resume" 
           accept=".pdf" required>
    
    <label for="documents">Supporting Documents:</label>
    <input type="file" id="documents" name="documents" 
           multiple accept=".pdf,.doc,.docx">
    
    <button type="submit">Upload Files</button>
</form>
```

## Accessibility Best Practices

```html
<form>
    <!-- Always use labels -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    
    <!-- Required fields indication -->
    <label for="email">Email: <span aria-label="required">*</span></label>
    <input type="email" id="email" name="email" required>
    
    <!-- Helpful descriptions -->
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" 
           aria-describedby="password-help">
    <small id="password-help">Must be at least 8 characters</small>
    
    <!-- Grouping with fieldset -->
    <fieldset>
        <legend>Contact Preferences</legend>
        <input type="checkbox" id="email-pref" name="contact" value="email">
        <label for="email-pref">Email</label>
        
        <input type="checkbox" id="phone-pref" name="contact" value="phone">
        <label for="phone-pref">Phone</label>
    </fieldset>
    
    <!-- ARIA labels for icon buttons -->
    <button type="submit" aria-label="Submit form">
        <svg><!-- icon --></svg>
    </button>
</form>
```

## Best Practices

1. **Always use labels**: Associate every input with a label
2. **Mark required fields**: Use `required` attribute and visual indicator
3. **Provide helpful hints**: Use placeholder and description text
4. **Validate on client and server**: Don't rely solely on HTML5 validation
5. **Use appropriate input types**: Helps with mobile keyboards and validation
6. **Group related fields**: Use fieldset and legend
7. **Indicate errors clearly**: Show what went wrong and how to fix it
8. **Enable autocomplete**: Makes forms faster to fill
9. **Test keyboard navigation**: Ensure tab order makes sense
10. **Keep forms simple**: Only ask for necessary information

## Common Mistakes

```html
<!-- ❌ Missing labels -->
<input type="text" name="username">

<!-- ❌ Wrong method for sensitive data -->
<form action="/login" method="GET">
    <input type="password" name="password">
</form>

<!-- ❌ Missing name attribute (won't submit) -->
<input type="text" id="username">

<!-- ❌ Missing enctype for file upload -->
<form action="/upload" method="POST">
    <input type="file" name="document">
</form>

<!-- ✅ Correct approach -->
<form action="/upload" method="POST" enctype="multipart/form-data">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="document">Document:</label>
    <input type="file" id="document" name="document">
    
    <button type="submit">Submit</button>
</form>
```

## Summary

- Forms collect user input via `<form>` element
- Use appropriate input types for better UX
- Always associate labels with inputs
- Use HTML5 validation attributes (required, pattern, min/max)
- Group related fields with fieldset and legend
- Make forms accessible with proper labels and ARIA
- Use POST method for sensitive data
- Include `enctype="multipart/form-data"` for file uploads
- Test forms thoroughly for usability and accessibility

Forms are crucial for user interaction - create them thoughtfully for the best user experience!
