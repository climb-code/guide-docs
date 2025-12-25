---
title: "Fetch API in JavaScript"
description: "Learn how to make HTTP requests using the Fetch API in JavaScript"
---

The Fetch API provides a modern, promise-based way to make HTTP requests in JavaScript. It's a powerful replacement for the older `XMLHttpRequest` and makes working with APIs much simpler.

## What is the Fetch API?

Fetch is a built-in JavaScript function for making network requests. It returns a Promise that resolves to the Response object representing the response to the request.

### Basic Syntax

```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Making GET Requests

GET requests are used to retrieve data from a server.

### Simple GET Request

```javascript
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
```

### With Async/Await

```javascript
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchUsers();
```

### Checking Response Status

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
```

## Making POST Requests

POST requests are used to send data to a server.

### Basic POST Request

```javascript
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### POST with Async/Await

```javascript
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('User created:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Usage
createUser({
  name: 'Alice',
  email: 'alice@example.com'
});
```

## Other HTTP Methods

### PUT Request (Update)

```javascript
async function updateUser(userId, updates) {
  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
}

updateUser(123, { name: 'John Updated', age: 31 });
```

### PATCH Request (Partial Update)

```javascript
async function patchUser(userId, updates) {
  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
}

patchUser(123, { age: 32 });
```

### DELETE Request

```javascript
async function deleteUser(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

deleteUser(123);
```

## Request Headers

### Setting Headers

```javascript
fetch('https://api.example.com/data', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here',
    'Custom-Header': 'value'
  }
});
```

### Using Headers Object

```javascript
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token123');

fetch('https://api.example.com/data', {
  headers: headers
});
```

## Response Methods

### response.json()

Parses the response body as JSON.

```javascript
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

### response.text()

Returns the response body as text.

```javascript
const response = await fetch('https://api.example.com/data');
const text = await response.text();
console.log(text);
```

### response.blob()

Returns the response body as a Blob (for files/images).

```javascript
const response = await fetch('https://api.example.com/image.jpg');
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);
document.querySelector('#img').src = imageUrl;
```

### response.formData()

Returns the response body as FormData.

```javascript
const response = await fetch('https://api.example.com/form');
const formData = await response.formData();
```

## Response Properties

```javascript
const response = await fetch('https://api.example.com/data');

console.log(response.ok);        // true if status 200-299
console.log(response.status);    // 200, 404, 500, etc.
console.log(response.statusText); // "OK", "Not Found", etc.
console.log(response.headers);   // Headers object
console.log(response.url);       // Final URL
```

## Error Handling

### Comprehensive Error Handling

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      console.error('Network error:', error);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}
```

### Custom Error Handler

```javascript
class FetchError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new FetchError(
        errorData.message || 'Request failed',
        response.status
      );
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(`Error ${error.status}: ${error.message}`);
    } else {
      console.error('Network error:', error);
    }
    throw error;
  }
}
```

## Real-World Examples

### 1. API Service Class

```javascript
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  get(endpoint) {
    return this.request(endpoint);
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Usage
const api = new ApiService('https://api.example.com');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });
```

### 2. Loading Indicator

```javascript
async function fetchDataWithLoading(url) {
  const loader = document.querySelector('#loader');
  const content = document.querySelector('#content');
  
  try {
    loader.style.display = 'block';
    content.style.display = 'none';
    
    const response = await fetch(url);
    const data = await response.json();
    
    content.textContent = JSON.stringify(data, null, 2);
    content.style.display = 'block';
  } catch (error) {
    content.textContent = 'Error loading data';
    content.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
}
```

### 3. Request with Timeout

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Fetch error:', error);
    }
    throw error;
  }
}

// Usage
fetchWithTimeout('https://api.example.com/data', 3000);
```

### 4. Retry Logic

```javascript
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      
      console.log(`Retry ${i + 1} failed, waiting ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
fetchWithRetry('https://api.example.com/data', 3, 2000);
```

### 5. Parallel Requests

```javascript
async function fetchMultiple() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users').then(r => r.json()),
      fetch('https://api.example.com/posts').then(r => r.json()),
      fetch('https://api.example.com/comments').then(r => r.json())
    ]);
    
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

### 6. File Upload

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);
  
  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData
      // Note: Don't set Content-Type header, browser will set it with boundary
    });
    
    const data = await response.json();
    console.log('Upload successful:', data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// Usage
const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadFile(file);
  }
});
```

## Abort Controller

Cancel fetch requests using AbortController.

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// Cancel the request
controller.abort();
```

### Practical Example: Cancel Previous Requests

```javascript
let currentController = null;

async function searchUsers(query) {
  // Cancel previous request
  if (currentController) {
    currentController.abort();
  }
  
  // Create new controller
  currentController = new AbortController();
  
  try {
    const response = await fetch(
      `https://api.example.com/search?q=${query}`,
      { signal: currentController.signal }
    );
    const data = await response.json();
    console.log('Search results:', data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Search error:', error);
    }
  }
}

// Only the last search will complete
searchUsers('john');
searchUsers('jane'); // Cancels previous
```

## CORS (Cross-Origin Resource Sharing)

### Understanding CORS

```javascript
// This will fail if CORS is not enabled on the server
fetch('https://another-domain.com/api/data')
  .then(response => response.json())
  .catch(error => {
    console.error('CORS error:', error);
  });
```

### Credentials and CORS

```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  credentials: 'include', // Include cookies
  mode: 'cors'           // CORS mode
});
```

## Best Practices

1. **Always handle errors**
   ```javascript
   fetch(url)
     .then(response => {
       if (!response.ok) throw new Error('HTTP error');
       return response.json();
     })
     .catch(error => console.error(error));
   ```

2. **Use async/await for readability**
   ```javascript
   async function getData() {
     const response = await fetch(url);
     return await response.json();
   }
   ```

3. **Check response.ok before parsing**
   ```javascript
   if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
   ```

4. **Set appropriate headers**
   ```javascript
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer token'
   }
   ```

5. **Use AbortController for cancellation**
   ```javascript
   const controller = new AbortController();
   fetch(url, { signal: controller.signal });
   ```

## Summary

- **Fetch API** provides a modern way to make HTTP requests
- Returns **Promises**, works great with **async/await**
- Supports all **HTTP methods** (GET, POST, PUT, DELETE, etc.)
- Use **response.ok** to check for successful responses
- **Always handle errors** properly
- Use **AbortController** to cancel requests
- **Headers** can be set for authentication and content type
- Multiple response formats: **json(), text(), blob(), formData()**
