---
title: HTML Web APIs
description: Learn about browser APIs accessible through HTML including Web Storage, Geolocation, Drag and Drop, and other modern web platform features.
---

HTML integrates with various Web APIs that extend functionality through JavaScript. Learn about commonly used browser APIs.

## Web Storage API

Store data in the browser.

### localStorage

Persistent storage with no expiration:

```html
<script>
  // Store data
  localStorage.setItem('username', 'john_doe');
  localStorage.setItem('theme', 'dark');
  
  // Retrieve data
  const username = localStorage.getItem('username');
  console.log(username); // "john_doe"
  
  // Remove item
  localStorage.removeItem('theme');
  
  // Clear all
  localStorage.clear();
  
  // Check if key exists
  if (localStorage.getItem('username')) {
    console.log('User exists');
  }
</script>
```

### sessionStorage

Temporary storage (cleared when tab closes):

```html
<script>
  // Store for session
  sessionStorage.setItem('tempData', 'value');
  
  // Retrieve
  const data = sessionStorage.getItem('tempData');
  
  // Clear session storage
  sessionStorage.clear();
</script>
```

### Practical Example

```html
<div>
  <input type="text" id="name" placeholder="Enter your name">
  <button onclick="saveName()">Save</button>
  <button onclick="loadName()">Load</button>
  <p id="output"></p>
</div>

<script>
  function saveName() {
    const name = document.getElementById('name').value;
    localStorage.setItem('savedName', name);
    alert('Name saved!');
  }
  
  function loadName() {
    const name = localStorage.getItem('savedName');
    document.getElementById('output').textContent = name || 'No name saved';
  }
  
  // Auto-load on page load
  window.addEventListener('load', loadName);
</script>
```

## Geolocation API

Access user's location (requires permission):

```html
<button onclick="getLocation()">Get My Location</button>
<div id="location"></div>

<script>
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert('Geolocation not supported');
    }
  }
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('location').innerHTML = 
      `Latitude: ${lat}<br>Longitude: ${lon}`;
  }
  
  function showError(error) {
    const messages = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Timeout'
    };
    alert(messages[error.code] || 'Unknown error');
  }
</script>
```

### Watch Position

Track location changes:

```html
<script>
  let watchId;
  
  function startTracking() {
    watchId = navigator.geolocation.watchPosition(
      position => {
        console.log('New position:', position.coords);
      },
      error => console.error(error),
      { enableHighAccuracy: true }
    );
  }
  
  function stopTracking() {
    navigator.geolocation.clearWatch(watchId);
  }
</script>
```

## Drag and Drop API

Enable drag and drop functionality:

```html
<style>
  .draggable {
    padding: 20px;
    margin: 10px;
    background: #e3f2fd;
    cursor: move;
  }
  .dropzone {
    min-height: 100px;
    border: 2px dashed #ccc;
    padding: 20px;
    margin: 10px;
  }
  .dropzone.over {
    border-color: #4CAF50;
    background: #f1f8f4;
  }
</style>

<div class="draggable" draggable="true" ondragstart="drag(event)" id="item1">
  Drag me!
</div>

<div class="dropzone" 
     ondrop="drop(event)" 
     ondragover="allowDrop(event)"
     ondragenter="dragEnter(event)"
     ondragleave="dragLeave(event)">
  Drop here
</div>

<script>
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllowed = "move";
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function dragEnter(event) {
    event.target.classList.add('over');
  }
  
  function dragLeave(event) {
    event.target.classList.remove('over');
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const element = document.getElementById(data);
    event.target.appendChild(element);
    event.target.classList.remove('over');
  }
</script>
```

## History API

Manipulate browser history:

```html
<button onclick="goBack()">Back</button>
<button onclick="goForward()">Forward</button>
<button onclick="addToHistory()">Add State</button>

<script>
  // Navigate history
  function goBack() {
    window.history.back();
  }
  
  function goForward() {
    window.history.forward();
  }
  
  // Add state to history
  function addToHistory() {
    const state = { page: 1 };
    const title = 'Page 1';
    const url = '/page1';
    history.pushState(state, title, url);
  }
  
  // Replace current state
  function replaceState() {
    history.replaceState({ page: 2 }, 'Page 2', '/page2');
  }
  
  // Listen for popstate (back/forward)
  window.addEventListener('popstate', function(event) {
    console.log('State:', event.state);
  });
</script>
```

## Clipboard API

Copy and paste functionality:

```html
<input type="text" id="copyInput" value="Copy this text">
<button onclick="copyText()">Copy</button>
<button onclick="pasteText()">Paste</button>
<div id="pasteOutput"></div>

<script>
  async function copyText() {
    const text = document.getElementById('copyInput').value;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  async function pasteText() {
    try {
      const text = await navigator.clipboard.readText();
      document.getElementById('pasteOutput').textContent = text;
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  }
</script>
```

## Notification API

Show browser notifications:

```html
<button onclick="requestPermission()">Enable Notifications</button>
<button onclick="showNotification()">Show Notification</button>

<script>
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('Notifications enabled!');
    }
  }
  
  function showNotification() {
    if (Notification.permission === 'granted') {
      new Notification('Hello!', {
        body: 'This is a notification',
        icon: '/icon.png',
        badge: '/badge.png',
        tag: 'unique-id',
        requireInteraction: false
      });
    } else {
      alert('Please enable notifications first');
    }
  }
</script>
```

## Fullscreen API

Toggle fullscreen mode:

```html
<button onclick="openFullscreen()">Go Fullscreen</button>
<button onclick="closeFullscreen()">Exit Fullscreen</button>

<script>
  function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
  
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  
  // Check fullscreen state
  document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
      console.log('Entered fullscreen');
    } else {
      console.log('Exited fullscreen');
    }
  });
</script>
```

## Intersection Observer API

Detect when elements enter viewport:

```html
<style>
  .lazy-section {
    min-height: 500px;
    margin: 20px 0;
    padding: 20px;
    background: #f5f5f5;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .lazy-section.visible {
    opacity: 1;
  }
</style>

<div class="lazy-section">Section 1</div>
<div class="lazy-section">Section 2</div>
<div class="lazy-section">Section 3</div>

<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );
  
  document.querySelectorAll('.lazy-section').forEach(section => {
    observer.observe(section);
  });
</script>
```

## Media Devices API

Access camera and microphone:

```html
<video id="video" width="640" height="480" autoplay></video>
<button onclick="startCamera()">Start Camera</button>
<button onclick="stopCamera()">Stop Camera</button>

<script>
  let stream;
  
  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      document.getElementById('video').srcObject = stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }
  
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }
</script>
```

## Battery Status API

Check battery level:

```html
<div id="battery"></div>

<script>
  navigator.getBattery().then(battery => {
    function updateBatteryStatus() {
      const level = Math.round(battery.level * 100);
      const charging = battery.charging ? 'Charging' : 'Not charging';
      document.getElementById('battery').innerHTML = `
        Battery: ${level}%<br>
        Status: ${charging}
      `;
    }
    
    updateBatteryStatus();
    
    battery.addEventListener('levelchange', updateBatteryStatus);
    battery.addEventListener('chargingchange', updateBatteryStatus);
  });
</script>
```

## Page Visibility API

Detect if page is visible:

```html
<script>
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      console.log('Page is hidden');
      // Pause video, stop animations, etc.
    } else {
      console.log('Page is visible');
      // Resume activities
    }
  });
</script>
```

## Practical Examples

### Dark Mode with localStorage

```html
<button onclick="toggleDarkMode()">Toggle Dark Mode</button>

<script>
  // Load saved preference
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
  }
</script>
```

### Lazy Loading Images with Intersection Observer

```html
<img data-src="image1.jpg" alt="Image 1" class="lazy">
<img data-src="image2.jpg" alt="Image 2" class="lazy">

<script>
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('.lazy').forEach(img => {
    imageObserver.observe(img);
  });
</script>
```

### Copy to Clipboard Button

```html
<code id="code-block">npm install package-name</code>
<button onclick="copyCode()">Copy Code</button>

<script>
  async function copyCode() {
    const code = document.getElementById('code-block').textContent;
    try {
      await navigator.clipboard.writeText(code);
      alert('Copied!');
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Copied!');
    }
  }
</script>
```

## Best Practices

1. **Check browser support**: Always feature-detect before using APIs
2. **Handle permissions**: Request permissions gracefully
3. **Provide fallbacks**: Support browsers without the API
4. **Respect user privacy**: Only request what you need
5. **Handle errors**: Wrap API calls in try-catch
6. **Clean up**: Remove event listeners and stop streams
7. **Store minimal data**: Don't abuse localStorage
8. **Secure storage**: Don't store sensitive data in localStorage

## Common Mistakes

```html
<!-- ❌ Not checking support -->
<script>
  localStorage.setItem('key', 'value'); // May fail
</script>

<!-- ✅ Check support -->
<script>
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('key', 'value');
  }
</script>

<!-- ❌ Not handling errors -->
<script>
  navigator.geolocation.getCurrentPosition(success);
</script>

<!-- ✅ Handle errors -->
<script>
  navigator.geolocation.getCurrentPosition(
    success,
    error => console.error('Geolocation error:', error)
  );
</script>

<!-- ❌ Storing objects without stringify -->
<script>
  localStorage.setItem('user', {name: 'John'}); // Stores "[object Object]"
</script>

<!-- ✅ Stringify objects -->
<script>
  localStorage.setItem('user', JSON.stringify({name: 'John'}));
  const user = JSON.parse(localStorage.getItem('user'));
</script>
```

## Browser Support Check

```html
<script>
  // Check for specific API support
  const hasLocalStorage = typeof Storage !== 'undefined';
  const hasGeolocation = 'geolocation' in navigator;
  const hasNotifications = 'Notification' in window;
  const hasClipboard = 'clipboard' in navigator;
  
  console.log('Features:', {
    localStorage: hasLocalStorage,
    geolocation: hasGeolocation,
    notifications: hasNotifications,
    clipboard: hasClipboard
  });
</script>
```

## Summary

- **Web Storage API**: Store data with `localStorage` and `sessionStorage`
- **Geolocation API**: Access user location with permission
- **Drag and Drop API**: Enable drag and drop interactions
- **History API**: Manipulate browser history for SPAs
- **Clipboard API**: Copy and paste programmatically
- **Notification API**: Show desktop notifications
- **Fullscreen API**: Toggle fullscreen mode
- **Intersection Observer**: Detect element visibility
- **Media Devices API**: Access camera and microphone
- **Battery Status API**: Check battery information
- **Page Visibility API**: Detect page visibility
- Always check browser support and handle errors
- Request permissions responsibly
- Provide fallbacks for older browsers

Web APIs extend HTML with powerful browser features accessible through JavaScript!
