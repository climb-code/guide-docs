---
title: "Web Storage API in JavaScript"
description: "Learn about localStorage and sessionStorage for storing data in the browser"
---


The Web Storage API provides mechanisms for storing key-value pairs in a web browser. It includes two main storage objects: `localStorage` and `sessionStorage`. Both allow you to save data beyond a page refresh.

## What is Web Storage?

Web Storage allows web applications to store data locally within the user's browser. It's more secure and faster than cookies, and can store larger amounts of data.

### Key Features

- **Simple API**: Easy to use with `setItem()`, `getItem()`, `removeItem()`
- **Storage Limit**: Typically 5-10MB per domain (much more than cookies' 4KB)
- **Client-Side Only**: Data is never sent to the server
- **Synchronous**: Operations are blocking
- **String-Only**: Only stores strings (use JSON for objects)

## localStorage

`localStorage` stores data with **no expiration time**. Data persists even after the browser is closed and reopened.

### Basic Operations

#### Setting Items

```javascript
// Store a value
localStorage.setItem("username", "JohnDoe");
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "16");

// Alternative syntax (not recommended)
localStorage.username = "JohnDoe";
localStorage["theme"] = "dark";
```

#### Getting Items

```javascript
// Retrieve a value
const username = localStorage.getItem("username");
console.log(username); // "JohnDoe"

const theme = localStorage.getItem("theme");
console.log(theme); // "dark"

// Returns null if key doesn't exist
const email = localStorage.getItem("email");
console.log(email); // null
```

#### Removing Items

```javascript
// Remove a specific item
localStorage.removeItem("username");

// Clear all items
localStorage.clear();
```

#### Checking for Items

```javascript
// Check if key exists
if (localStorage.getItem("theme") !== null) {
  console.log("Theme preference saved");
}

// Get number of items
console.log(localStorage.length); // Number of stored items

// Get key by index
const firstKey = localStorage.key(0);
console.log(firstKey);
```

### Storing Objects and Arrays

Since Web Storage only stores strings, use `JSON.stringify()` and `JSON.parse()`.

```javascript
// Storing an object
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

localStorage.setItem("user", JSON.stringify(user));

// Retrieving an object
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "Alice"
console.log(storedUser.age);  // 25

// Storing an array
const todos = ["Buy milk", "Walk dog", "Code"];
localStorage.setItem("todos", JSON.stringify(todos));

// Retrieving an array
const storedTodos = JSON.parse(localStorage.getItem("todos"));
console.log(storedTodos[0]); // "Buy milk"
```

### Real-World localStorage Examples

#### 1. User Preferences

```javascript
class UserPreferences {
  static save(preferences) {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }
  
  static load() {
    const data = localStorage.getItem("preferences");
    return data ? JSON.parse(data) : {
      theme: "light",
      language: "en",
      fontSize: "medium"
    };
  }
  
  static update(key, value) {
    const prefs = this.load();
    prefs[key] = value;
    this.save(prefs);
  }
}

// Usage
UserPreferences.save({
  theme: "dark",
  language: "en",
  fontSize: "large"
});

const prefs = UserPreferences.load();
console.log(prefs.theme); // "dark"

UserPreferences.update("theme", "light");
```

#### 2. Shopping Cart

```javascript
class ShoppingCart {
  static addItem(item) {
    const cart = this.getCart();
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  static removeItem(itemId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  static getCart() {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  
  static clearCart() {
    localStorage.removeItem("cart");
  }
  
  static getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price, 0);
  }
}

// Usage
ShoppingCart.addItem({ id: 1, name: "Laptop", price: 999 });
ShoppingCart.addItem({ id: 2, name: "Mouse", price: 25 });

console.log(ShoppingCart.getCart());
console.log("Total:", ShoppingCart.getTotal()); // 1024
```

#### 3. Form Data Auto-Save

```javascript
const form = document.querySelector("#myForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

// Save form data on input
nameInput.addEventListener("input", (e) => {
  localStorage.setItem("formName", e.target.value);
});

emailInput.addEventListener("input", (e) => {
  localStorage.setItem("formEmail", e.target.value);
});

// Restore form data on page load
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("formName");
  const savedEmail = localStorage.getItem("formEmail");
  
  if (savedName) nameInput.value = savedName;
  if (savedEmail) emailInput.value = savedEmail;
});

// Clear saved data on successful submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Submit form...
  localStorage.removeItem("formName");
  localStorage.removeItem("formEmail");
});
```

## sessionStorage

`sessionStorage` is similar to `localStorage`, but data is **cleared when the page session ends** (when the tab or browser is closed).

### Basic Operations

The API is identical to `localStorage`:

```javascript
// Setting items
sessionStorage.setItem("sessionId", "abc123");
sessionStorage.setItem("tempData", "temporary");

// Getting items
const sessionId = sessionStorage.getItem("sessionId");
console.log(sessionId); // "abc123"

// Removing items
sessionStorage.removeItem("tempData");

// Clear all
sessionStorage.clear();
```

### sessionStorage Use Cases

#### 1. Multi-Step Form

```javascript
// Step 1
function saveStep1(data) {
  sessionStorage.setItem("formStep1", JSON.stringify(data));
}

// Step 2
function saveStep2(data) {
  sessionStorage.setItem("formStep2", JSON.stringify(data));
}

// Final submission
function submitForm() {
  const step1 = JSON.parse(sessionStorage.getItem("formStep1"));
  const step2 = JSON.parse(sessionStorage.getItem("formStep2"));
  
  const completeData = { ...step1, ...step2 };
  
  // Submit to server
  console.log("Submitting:", completeData);
  
  // Clear session data
  sessionStorage.clear();
}
```

#### 2. Temporary Authentication State

```javascript
class Session {
  static login(token) {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("loginTime", Date.now().toString());
  }
  
  static isLoggedIn() {
    return sessionStorage.getItem("authToken") !== null;
  }
  
  static getToken() {
    return sessionStorage.getItem("authToken");
  }
  
  static logout() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("loginTime");
  }
}

// Usage
Session.login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
console.log(Session.isLoggedIn()); // true
```

#### 3. Page State Management

```javascript
// Save scroll position
window.addEventListener("scroll", () => {
  sessionStorage.setItem("scrollPosition", window.scrollY.toString());
});

// Restore scroll position
window.addEventListener("load", () => {
  const scrollPos = sessionStorage.getItem("scrollPosition");
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
  }
});

// Save tab state
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    sessionStorage.setItem("activeTab", index.toString());
  });
});

// Restore active tab
const activeTab = sessionStorage.getItem("activeTab");
if (activeTab) {
  tabs[parseInt(activeTab)].click();
}
```

## localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| **Lifetime** | Persists until explicitly deleted | Cleared when tab/browser closes |
| **Scope** | Shared across all tabs/windows of same origin | Limited to the tab/window |
| **Use Case** | Long-term storage (preferences, cart) | Temporary data (session, form state)|
| **Size** | ~5-10MB | ~5-10MB |

### Example Comparing Both

```javascript
// localStorage - persists across sessions
localStorage.setItem("username", "john_doe");

// sessionStorage - only for current session
sessionStorage.setItem("sessionId", "temp_123");

// After closing and reopening browser:
console.log(localStorage.getItem("username"));   // "john_doe"
console.log(sessionStorage.getItem("sessionId")); // null
```

## Storage Events

Listen for storage changes in other tabs/windows:

```javascript
window.addEventListener("storage", (event) => {
  console.log("Storage changed!");
  console.log("Key:", event.key);
  console.log("Old Value:", event.oldValue);
  console.log("New Value:", event.newValue);
  console.log("URL:", event.url);
  console.log("Storage Area:", event.storageArea);
});

// Note: This event only fires in OTHER tabs/windows, not the one making the change
```

### Practical Example: Sync Tabs

```javascript
// Tab 1
localStorage.setItem("theme", "dark");

// Tab 2 (automatically detects the change)
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    applyTheme(event.newValue);
    console.log(`Theme changed to: ${event.newValue}`);
  }
});

function applyTheme(theme) {
  document.body.className = theme;
}
```

## Best Practices

### 1. Always Handle Errors

```javascript
function safelySetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error("Storage quota exceeded");
    } else {
      console.error("Error saving to localStorage:", error);
    }
    return false;
  }
}

function safelyGetItem(key, defaultValue = null) {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
}
```

### 2. Create a Storage Helper

```javascript
const storage = {
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Storage set error:", error);
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Storage get error:", error);
      return defaultValue;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  },
  
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  }
};

// Usage
storage.set("user", { name: "Alice", age: 25 });
const user = storage.get("user");
console.log(user.name); // "Alice"
```

### 3. Check Browser Support

```javascript
function isStorageAvailable(type) {
  try {
    const storage = window[type];
    const test = "__storage_test__";
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

if (isStorageAvailable("localStorage")) {
  // Use localStorage
} else {
  // Fallback to cookies or alternative
  console.warn("localStorage not available");
}
```

### 4. Set Expiration for localStorage

```javascript
const storageWithExpiry = {
  set(key, value, expiryInMinutes) {
    const item = {
      value: value,
      expiry: Date.now() + (expiryInMinutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    
    // Check if expired
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  }
};

// Usage
storageWithExpiry.set("tempData", { message: "Hello" }, 30); // Expires in 30 minutes
const data = storageWithExpiry.get("tempData");
```

## Security Considerations

1. **Never store sensitive data** (passwords, credit cards, etc.)
2. **Data is not encrypted** - anyone with browser access can read it
3. **Vulnerable to XSS attacks** - sanitize data before storing
4. **Same-origin policy applies** - only accessible from same domain

```javascript
// Bad - Never do this
localStorage.setItem("password", "myPassword123");
localStorage.setItem("creditCard", "1234-5678-9012-3456");

// Good - Store non-sensitive data only
localStorage.setItem("theme", "dark");
localStorage.setItem("language", "en");
```

## Summary

- **localStorage** stores data permanently until explicitly deleted
- **sessionStorage** stores data for the current session only
- Both use a simple **key-value** API
- Only **strings** can be stored (use JSON for objects/arrays)
- Storage limit is typically **5-10MB** per domain
- Use **error handling** to manage quota exceeded errors
- **Never store sensitive** information in Web Storage
- Listen to **storage events** to sync data across tabs
