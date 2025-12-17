---
title: Closures in JavaScript
description: Master JavaScript Closures - understanding scope, practical examples, common patterns, and best practices
---

A closure is one of the most powerful and fundamental concepts in JavaScript. It's a function that remembers and has access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

---

## 🧠 What is a Closure?

A **closure** is created when a function is defined inside another function, and the inner function references variables from the outer function's scope.

```js
function outer() {
  const message = "Hello from outer!";
  
  function inner() {
    console.log(message); // Can access 'message'
  }
  
  return inner;
}

const myFunction = outer();
myFunction(); // Hello from outer!
```

> [!IMPORTANT]
> Even though `outer()` has finished executing, `inner()` still has access to `message`. This is a closure!

---

## 🔍 Understanding Lexical Scope

**Lexical scope** (also called static scope) means that the accessibility of variables is determined by the position of the variables inside nested scopes.

```js
const global = "I'm global";

function outerFunc() {
  const outer = "I'm outer";
  
  function middleFunc() {
    const middle = "I'm middle";
    
    function innerFunc() {
      const inner = "I'm inner";
      
      // Can access all variables from outer scopes
      console.log(global);  // ✅ Works
      console.log(outer);   // ✅ Works
      console.log(middle);  // ✅ Works
      console.log(inner);   // ✅ Works
    }
    
    innerFunc();
  }
  
  middleFunc();
}

outerFunc();
```

### Scope Chain

JavaScript looks for variables in this order:
1. **Local scope** (current function)
2. **Outer function scope** (parent function)
3. **Global scope** (window/global object)

```js
let a = "global";

function outer() {
  let b = "outer";
  
  function inner() {
    let c = "inner";
    console.log(a, b, c); // global outer inner
  }
  
  inner();
}

outer();
```

---

## ⚙️ How Closures Work

When a function is created, it gets a hidden `[[Environment]]` property that references the environment where it was created. This allows the function to "remember" variables from its birthplace.

```js
function makeCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate closure!)
console.log(counter1()); // 3
```

Each call to `makeCounter()` creates a **new closure** with its own independent `count` variable.

---

## 💼 Practical Use Cases

### 1. Data Privacy and Encapsulation

Closures allow you to create private variables that can't be accessed directly.

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private!
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500
myAccount.withdraw(200);
console.log(myAccount.getBalance()); // 1300

// Cannot access balance directly
console.log(myAccount.balance); // undefined
```

### 2. Function Factories

Create specialized functions based on parameters.

```js
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(quadruple(5));  // 20
```

### 3. Callback Functions

Closures are heavily used in callbacks and event handlers.

```js
function setupButtons() {
  const buttons = ['A', 'B', 'C'];
  
  buttons.forEach((button) => {
    const element = document.getElementById(`btn-${button}`);
    
    element?.addEventListener('click', function() {
      console.log(`Button ${button} was clicked!`);
      // 'button' is remembered via closure
    });
  });
}
```

### 4. Memoization (Caching)

Cache expensive function results.

```js
function memoize(fn) {
  const cache = {}; // Private cache
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Returning from cache');
      return cache[key];
    }
    
    console.log('Computing result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function slowSquare(n) {
  // Simulate slow operation
  for (let i = 0; i < 1000000000; i++) {}
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // Computing result -> 25
console.log(fastSquare(5)); // Returning from cache -> 25
```

---

## 🎨 Common Patterns

### Module Pattern

Create modules with private and public methods.

```js
const Calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private function
  function log(operation, value) {
    console.log(`${operation}: ${value}`);
  }
  
  // Public API
  return {
    add(num) {
      result += num;
      log('Added', num);
      return this;
    },
    subtract(num) {
      result -= num;
      log('Subtracted', num);
      return this;
    },
    multiply(num) {
      result *= num;
      log('Multiplied by', num);
      return this;
    },
    getResult() {
      return result;
    },
    reset() {
      result = 0;
      return this;
    }
  };
})();

Calculator.add(10).multiply(2).subtract(5);
console.log(Calculator.getResult()); // 15
```

### Once Function

Execute a function only once.

```js
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initializing...');
  return 'Initialized!';
});

console.log(initialize()); // Initializing... -> Initialized!
console.log(initialize()); // Initialized! (no log)
console.log(initialize()); // Initialized! (no log)
```

### Partial Application

Pre-fill function arguments.

```js
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
const sayGoodbye = partial(greet, 'Goodbye');

console.log(sayHello('Alice'));   // Hello, Alice!
console.log(sayGoodbye('Bob'));   // Goodbye, Bob!
```

---

## 🔁 Closures in Loops

### Common Pitfall

```js
// ❌ Problem: All functions reference the same 'i'
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints: 4, 4, 4
  }, 1000);
}
```

### Solution 1: Use `let` (Block Scope)

```js
// ✅ Each iteration has its own 'i'
for (let i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints: 1, 2, 3
  }, 1000);
}
```

### Solution 2: IIFE (Immediately Invoked Function Expression)

```js
// ✅ Create a closure for each iteration
for (var i = 1; i <= 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // Prints: 1, 2, 3
    }, 1000);
  })(i);
}
```

---

## 🧹 Memory Considerations

### Memory Leaks

Closures can cause memory leaks if not used carefully.

```js
// ⚠️ Potential memory leak
function attachEventListeners() {
  const hugeData = new Array(1000000).fill('data');
  
  document.getElementById('btn')?.addEventListener('click', function() {
    console.log('Button clicked');
    // 'hugeData' is kept in memory even though we don't use it!
  });
}
```

### Solution: Limit Closure Scope

```js
// ✅ Better: Only close over what you need
function attachEventListeners() {
  const hugeData = new Array(1000000).fill('data');
  const processedData = hugeData.length; // Extract only what you need
  
  document.getElementById('btn')?.addEventListener('click', function() {
    console.log('Button clicked');
    console.log('Data size:', processedData);
    // Only 'processedData' is kept in memory
  });
}
```

---

## ⚠️ Common Pitfalls

### 1. Accidental Global Variables

```js
function createCounter() {
  // ❌ Forgot 'let/const', creates global 'count'
  count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(count); // Accessible globally! (Bad)
```

### 2. Closure in Asynchronous Code

```js
// ❌ Problem
function loadUsers(ids) {
  for (var i = 0; i < ids.length; i++) {
    setTimeout(() => {
      console.log('Loading user:', ids[i]); // 'i' is always ids.length
    }, 1000);
  }
}

// ✅ Solution
function loadUsers(ids) {
  for (let i = 0; i < ids.length; i++) {
    setTimeout(() => {
      console.log('Loading user:', ids[i]);
    }, 1000);
  }
}
```

---

## ✅ Best Practices

1. **Use closures for data privacy**: Keep variables private that don't need to be exposed.

```js
// ✅ Good
function createUser(name) {
  const createdAt = Date.now();
  
  return {
    getName: () => name,
    getAge: () => Math.floor((Date.now() - createdAt) / 1000)
  };
}
```

2. **Be mindful of memory**: Don't unnecessarily close over large objects.

```js
// ❌ Bad
function process(largeArray) {
  return function() {
    return largeArray.length; // Keeps entire array in memory
  };
}

// ✅ Good
function process(largeArray) {
  const length = largeArray.length;
  return function() {
    return length; // Only keeps the number
  };
}
```

3. **Use `let` or `const` instead of `var`**: Avoid hoisting issues in loops.

4. **Document your closures**: Make it clear what variables are being closed over and why.

5. **Clean up event listeners**: Remove event listeners when they're no longer needed to prevent memory leaks.

```js
function setupListener() {
  const handler = () => console.log('clicked');
  const button = document.getElementById('btn');
  
  button?.addEventListener('click', handler);
  
  // Clean up when needed
  return () => button?.removeEventListener('click', handler);
}

const cleanup = setupListener();
// Later...
cleanup(); // Remove listener
```

---

## 🎯 Real-World Example: Debounce

Limit how often a function can be called (useful for search inputs, window resize, etc.).

```js
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const searchInput = document.getElementById('search');

const handleSearch = debounce((event) => {
  console.log('Searching for:', event.target.value);
  // Make API call
}, 500);

searchInput?.addEventListener('input', handleSearch);
// Only calls the function 500ms after user stops typing
```

---

## 📚 Resources

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Variable scope, closure](https://javascript.info/closure)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)

---

**Happy Coding!**
