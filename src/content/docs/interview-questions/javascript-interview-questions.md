---
title: JavaScript Interview Questions
description: Common interview questions JS
---

### 1. What is JavaScript?

JavaScript is synchronous single-threaded high-level, dynamic, interpreted programming language that conforms to the ECMAScript specification. It is primarily used for creating interactive and dynamic content on websites but is also widely used in server-side development with platforms like Node.js.

#### Key Characteristics

- **Single-threaded & Event Loop**: Executes one command at a time, using event loop for non-blocking operations
- **Execution Model**: Supports both synchronous (default) and asynchronous (via callbacks, Promises, async/await) code execution
- **Interpreted**: Executed directly by JS engine (e.g., V8) without compilation
- **Dynamic Typing**: Variables can hold any type, determined at runtime
- **Prototypal Inheritance**: Objects inherit directly from other objects via prototypes
- **First-class Functions**: Functions can be assigned, passed as arguments, and returned
- **Event-driven**: Handles user interactions through event listeners and callbacks

### 2. What are the different data types in JavaScript?

JavaScript has 8 basic data types:

1. **Primitive Data Types**:

   - **Number**: Represents both integer and floating-point numbers (e.g., `42` or `3.14`)
   - **String**: Represents textual data (e.g., `"Hello"` or `'World'`)
   - **Boolean**: Represents logical values (`true` or `false`)
   - **Undefined**: Represents an uninitialized variable (`undefined`)
   - **Null**: Represents an intentional absence of any object value (`null`)
   - **Symbol**: Represents a unique identifier (e.g., `Symbol('description')`)
   - **BigInt**: Represents integers with arbitrary precision (e.g., `9007199254740991n`)

2. **Non-Primitive Data Type**:
   - **Object**: Represents a collection of key-value pairs
     - Regular objects: `{}`
     - Arrays: `[]`
     - Functions: `function(){}`
     - Date: `new Date()`

#### Example:

```javascript
// Primitive types
let number = 42;
let string = "Hello";
let boolean = true;
let undefinedVar;
let nullVar = null;
let symbol = Symbol("description");
let bigInt = 9007199254740991n;

// Object type
let object = { name: "John", age: 30 };
let array = [1, 2, 3];
```

### 3. What is Hoisting in JavaScript?

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their respective scopes during the compilation phase, before the code is executed.

1. **Variable Hoisting**:

   - Only declarations are hoisted, not initializations
   - `var` declarations are hoisted and initialized with `undefined`
   - `let` and `const` declarations are hoisted but not initialized (temporal dead zone)

2. **Function Hoisting**:
   - Function declarations are completely hoisted with their body
   - Function expressions are not hoisted

#### Examples:

```javascript
// Variable hoisting
console.log(x); // Output: undefined
var x = 5;

// The above code is interpreted as:
var x;
console.log(x);
x = 5;

// Function hoisting
sayHello(); // Works: "Hello!"
function sayHello() {
  console.log("Hello!");
}

// Function expression - doesn't work
sayGoodbye(); // Error: sayGoodbye is not a function
var sayGoodbye = function () {
  console.log("Goodbye!");
};
```

#### Best Practices:

- Always declare variables at the top of their scope
- Use `let` and `const` instead of `var` to avoid hoisting-related issues
- Declare functions before using them

### 4. Explain Variable Scope in JavaScript. What are the different types of scope?

**Answer:**
Variable scope in JavaScript refers to the context in which variables are declared and can be accessed. There are three main types of scope:

1. **Global Scope**:

   - When is it global? Variables declared outside any function/block or without `var`/`let`/`const`
   - What's the access? Can be accessed from anywhere in the program
   - What's the risk? Can lead to naming conflicts and is considered bad practice

2. **Function/Local Scope**:

   - What creates it? Each function creates its own scope
   - What's the access? Variables are only accessible inside that function
   - Why use it? Provides encapsulation and prevents variable name collisions

3. **Block Scope** (ES6):
   - What creates it? `let` and `const` declarations inside blocks (if, for, while)
   - How is it different? `var` isn't block-scoped (only function-scoped)
   - Why use it? Better control over variable access and cleaner code

**Follow-up Question:** How would you demonstrate these different scopes in code?

**Answer with Example:**

```javascript
// Global scope
const globalVar = "I'm global";

function exampleFunction() {
  // Function scope
  const localVar = "I'm local";
  console.log(globalVar); // Accessible: "I'm global"
  console.log(localVar); // Accessible: "I'm local"

  if (true) {
    // Block scope
    let blockVar = "I'm block-scoped";
    var functionScopedVar = "I'm function-scoped";
    console.log(blockVar); // Accessible: "I'm block-scoped"
  }

  // console.log(blockVar);  // Error: blockVar is not defined
  console.log(functionScopedVar); // Accessible: "I'm function-scoped"
}

console.log(globalVar); // Accessible: "I'm global"
// console.log(localVar);  // Error: localVar is not defined
```

**Follow-up Question:** What are the best practices for variable scoping in JavaScript?

**Answer:**
Here are the key best practices:

1. Avoid global variables whenever possible - they can cause naming conflicts
2. Use `let` and `const` instead of `var` for better scope control
3. Keep variables in the smallest scope needed
4. Be mindful of closures when dealing with nested functions
5. Always declare variables with proper declarations (`let`, `const`, or `var`)

**Follow-up Question:** What problems can arise from improper variable scoping?

**Answer:**
Common issues include:

1. Name collisions in global scope
2. Memory leaks from unintended closures
3. Unexpected variable hoisting with `var`
4. Difficulty in debugging due to unclear variable access
5. Security vulnerabilities from exposed global variables

### 5. What is a Closure in JavaScript? How does it work?

**Answer:**
A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. In other words, a closure allows a function to "remember" and access variables from its outer scope even when the function is executed in a different scope.

**Key Points:**

1. Closures are created every time a function is created
2. They can access variables in their own scope, outer function's scope, and global scope
3. They help in data privacy through encapsulation
4. They maintain state between function calls

**Example with Explanation:**

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.getCount()); // Output: 0
console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.decrement()); // Output: 1
```

**Follow-up Question:** What are the practical use cases of closures?

**Answer:**
Common use cases include:

1. Data privacy (creating private variables/methods)
2. Function factories
3. Maintaining state in async operations
4. Partial application and currying
5. Event handlers and callbacks

### 6. What is Lexical Scope and Lexical Environment in JavaScript?

**Answer:**
A lexical environment in JavaScript is a data structure that stores variables and functions defined in the current scope, along with references to all outer scopes. It is also known as the **lexical scope**.

In JavaScript, a lexical environment is created when a function is defined, capturing its surrounding scope. Additionally, a new lexical environment is created each time the function is invoked, which holds the function’s local variables and parameters.

The lexical environment is used to resolve variable names. When the JavaScript interpreter encounters a variable name, it first searches for the variable in the lexical environment of the current scope. If the variable is not found in the current scope, the interpreter searches the lexical environment of the outer scope, and so on.

The interpreter continues searching the lexical environment until it finds the variable or it reaches the global scope. If the variable is not found anywhere in the lexical environment, the interpreter throws a ReferenceError exception.

**Here is an example of a lexical environment:**

```javascript
function outer() {
  var x = 10;
  function inner() {
    // The lexical environment of `inner()` contains the variable `x` from `outer()`.
    console.log(x);
  }
  inner();
}
outer();
```

When the outer() function is defined, its lexical environment is created, containing the variable x. When the inner() function is defined inside outer(), it creates its own lexical environment that references outer()'s environment. This allows inner() to access x even when outer() is called later. When outer() is invoked, an execution context is created that uses this already-existing environment to execute the function.

The lexical environment is an important concept in JavaScript because it helps to explain how closures work. Closures are functions that can access variables from their outer scopes, even after the outer scopes have returned.

Lexical environments can be tricky to understand at first, but they are essential in JavaScript. By understanding lexical environments, you can write more reliable and maintainable JavaScript code.

### 7. What are the key differences between let, const, and var?

**Answer:**
First, let's understand what each declaration means:

- `var`: The traditional way to declare variables in JavaScript. It's function-scoped and can be redeclared and updated.

  ```javascript
  var age = 25; // Declare and initialize
  var age = 26; // Can be redeclared
  ```

- `let`: Introduced in ES6 (ES2015). It's block-scoped and can be updated but not redeclared.

  ```javascript
  let count = 0; // Declare and initialize
  count = 1; // Can be updated
  ```

- `const`: Also introduced in ES6. It's block-scoped and maintains constant values. Cannot be updated or redeclared.
  ```javascript
  const PI = 3.14; // Must be initialized when declared
  // PI = 3.15;     // Error: Cannot be updated
  ```

Here's a quick comparison table:

| Feature         | var               | let               | const             |
| --------------- | ----------------- | ----------------- | ----------------- |
| Scope           | Function-scoped   | Block-scoped      | Block-scoped      |
| Redeclaration   | ✅ Allowed        | ❌ Not allowed    | ❌ Not allowed    |
| Reassignment    | ✅ Allowed        | ✅ Allowed        | ❌ Not allowed    |
| Hoisting        | ✅ With undefined | ❌ TDZ            | ❌ TDZ            |
| Global Property | ✅ Creates        | ❌ Doesn't create | ❌ Doesn't create |
| Must Initialize | ❌ Optional       | ❌ Optional       | ✅ Required       |

### 8. What is the Event Loop in JavaScript? How does it work?

**Answer:**
The event loop is a mechanism that handles asynchronous callbacks in JavaScript. JavaScript is single-threaded, so asynchronous operations (like setTimeout, fetch, etc.) are handled by the Web APIs, and their callbacks are pushed into the task queue once completed.

**Steps:**

1. Call stack runs synchronous code.
2. Asynchronous operations are sent to Web APIs.
3. Once ready, callbacks are queued in the task (or microtask) queue.
4. The event loop checks if the call stack is empty, then pushes tasks from the queue to the stack.

**Example:**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise
// Timeout
```

In this example:

1. `console.log("Start")` executes immediately (synchronous)
2. `setTimeout` callback is sent to Web APIs
3. `Promise` callback goes to microtask queue
4. `console.log("End")` executes immediately
5. `Promise` callback executes (microtasks have priority)
6. `setTimeout` callback executes last

### 9. What is the difference between == and === operators in JavaScript?

**Answer:**
The key difference is:

- `==` automatically converts different types to match before comparing (like converting string '5' to number 5)
- `===` compares exactly as is, without converting types

**Type Conversion Examples:**

```javascript
1 == "1"; // true (string '1' is converted to number 1)
1 == true; // true (true is converted to number 1)
0 == false; // true (false is converted to number 0)
null == undefined; // true (special case)
```

**Example:**

```javascript
"5" == 5; // true  (string '5' is converted to number 5)
"5" === 5; // false (no conversion, string and number are different)
```

### 10. What are Promises and async/await in JavaScript?

**Answer:**
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. Promises provide a cleaner way to handle asynchronous operations compared to callbacks.

**Promise has 3 States:**

1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed

**Basic Promise Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  if (/* operation successful */) {
    resolve(result);
  } else {
    reject(error);
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**async/await:**
async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code. It was introduced in ES2017 (ES8) and provides a more elegant way to work with Promises.

- `async`: Declares a function that returns a Promise
- `await`: Pauses execution until a Promise is resolved

**Example using async/await:**

```javascript
// Function that returns a Promise
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("data"), 1000);
  });
}

// Using async/await
async function fetchData() {
  try {
    const result = await getData();
    console.log(result); // 'data'
  } catch (error) {
    console.error(error);
  }
}
```

**Real-world Example:**

```javascript
// Fetching data from an API
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

### 11. What is the `this` keyword in JavaScript and how does it behave in different contexts?

**Answer:**
`this` is a special keyword that refers to the current execution context. Its value changes based on how and where a function is called.

**Key Contexts and Examples:**

1. **Global Scope:**

```javascript
console.log(this); // window (in browser)
```

2. **Object Methods:**

```javascript
const user = {
  name: "John",
  greet() {
    console.log(this.name); // 'John'
  },
};
```

3. **Regular Functions:**

```javascript
function test() {
  console.log(this);
}
test(); // window (non-strict) or undefined (strict)
```

4. **Arrow Functions:**

```javascript
const obj = {
  value: 42,
  getValue: () => {
    console.log(this.value); // undefined (inherits this from outer scope)
  },
};
```

5. **Event Handlers:**

```javascript
button.addEventListener("click", function () {
  console.log(this); // button element
});
```

### 12. What is Prototypal Inheritance in JavaScript?

**Answer:**
Prototypal inheritance is how JavaScript objects can inherit properties and methods from other objects. Each object has a hidden `[[Prototype]]` property that points to another object (its prototype). When you try to access a property, JavaScript first looks in the object itself, and if not found, it looks in its prototype.

**Basic Example:**

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, ${this.name}`;
};

const person = new Person("Alice");
console.log(person.sayHello()); // Output: "Hello, Alice"
```

**Example of Extending Built-in Prototype:**

```javascript
let username = "ChaiAurCode     ";

// Adding a new method to String prototype
String.prototype.trueLength = function () {
  console.log(`${this}`);
  console.log(`True length is: ${this.trim().length}`);
};

username.trueLength(); // Output: "ChaiAurCode     "
//         "True length is: 11"
```

**Modern Class Syntax (Same Thing):**

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}`;
  }
}

const person = new Person("Alice");
console.log(person.sayHello()); // Output: "Hello, Alice"
```

The class syntax is just syntactic sugar over prototypal inheritance, making it easier to read and write.

### 13. What are the differences between call, apply, and bind methods?

**Answer:**
These methods allow you to control what `this` refers to in a function. Here's how they differ:

| Method  | Purpose                                        | Syntax                           |
| ------- | ---------------------------------------------- | -------------------------------- |
| `call`  | Calls function with given `this` and arguments | `fn.call(thisArg, arg1, arg2)`   |
| `apply` | Same as call, but takes arguments as array     | `fn.apply(thisArg, [args])`      |
| `bind`  | Returns new function with bound `this`         | `const newFn = fn.bind(thisArg)` |

**Example:**

```javascript
const person = {
  name: "John",
  greet: function (message) {
    return `${message}, ${this.name}!`;
  },
};

// Using call
console.log(person.greet.call({ name: "Alice" }, "Hi")); // Output: "Hi, Alice!"

// Using apply
console.log(person.greet.apply({ name: "Bob" }, ["Hello"])); // Output: "Hello, Bob!"

// Using bind
const greetJane = person.greet.bind({ name: "Jane" });
console.log(greetJane("Hey")); // Output: "Hey, Jane!"
```

### 14. Explain Class Inheritance and super keyword in Modern ES JavaScript with an example?

**Answer:**
Class inheritance in modern ES JavaScript (introduced in ES6/ES2015) allows one class to extend another class's functionality. The `super` keyword is used to call the parent class's constructor and access its methods.

**Example:**

```javascript
class User {
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`USERNAME is ${this.username}`);
    }
}

class Teacher extends User {
    constructor(username, email, password){
        super(username)  // Call parent constructor
        this.email = email
        this.password = password
    }

    addCourse(){
        console.log(`A new course was added by ${this.username}`);
    }
}

const chai = new Teacher("chai", "chai@teacher.com", "123")
chai.logMe()  // Output: USERNAME is chai

const masalaChai = new User("masalaChai")
masalaChai.logMe()  // Output: USERNAME is masalaChai

console.log(chai instanceof User)  // true
```

### 15. What's the difference between Rest and Spread operators in JavaScript?

**Answer:**
While both use the same `...` syntax, they serve different purposes:

1. **Spread Operator**: Expands elements
   - Used to spread array elements or object properties
   - Used in array/object literals or function arguments

```javascript
// Array spread
const nums = [1, 2, 3];
const newNums = [...nums, 4, 5];  // [1, 2, 3, 4, 5]

// Object spread
const user = { name: 'John' };
const newUser = { ...user, age: 25 };  // { name: 'John', age: 25 }
```

2. **Rest Parameter**: Collects elements
   - Used in function parameters to collect remaining arguments
   - Must be the last parameter

```javascript
// Rest in function
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4));  // 10

// Rest in array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(rest);  // [3, 4, 5]
```

### 16. What is the difference between Shallow Copy and Deep Copy in JavaScript?

**Answer:**
In JavaScript, there are two ways to copy objects: shallow copy and deep copy. The main difference lies in how they handle nested objects.

1. **Shallow Copy**:
   - Only copies the first level properties
   - Nested objects are copied by reference
   - Changes to nested objects affect both copies

```javascript
// Shallow copy example
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };  // Using spread operator

shallowCopy.b.c = 10;
console.log(original.b.c);    // 10 (changed!)
console.log(shallowCopy.b.c); // 10
```

2. **Deep Copy**:
   - Copies all nested objects and arrays recursively
   - Creates completely independent copy
   - Changes to nested objects don't affect original

```javascript
// Deep copy using JSON
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 10;
console.log(original.b.c);  // 2 (unchanged)
console.log(deepCopy.b.c);  // 10

// Note: JSON.stringify has limitations:
// - Cannot copy functions
// - Cannot handle circular references
// - Loses undefined values
```

### 17. What are Object Property Descriptors in JavaScript and how do they work?

**Answer:**
Object Property Descriptors in JavaScript provide a way to define and control the behavior of object properties. Each property in an object can have specific attributes that determine how that property can be accessed, modified, or enumerated.

**Key Property Descriptor Attributes:**

1. **writable**: Determines if the property's value can be changed
2. **enumerable**: Controls if the property shows up in enumerations (like for...in loops)
3. **configurable**: Specifies if the property can be deleted or its descriptor can be modified
4. **value**: The actual value of the property
5. **get/set**: Accessor functions for the property

**Example:**

```javascript
// Getting property descriptor
const mathPi = Object.getOwnPropertyDescriptor(Math, "PI");
console.log(mathPi);
// Output:
// {
//   value: 3.141592653589793,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

// Creating an object with custom property descriptors
const product = {
    name: 'Laptop',
    price: 1000,
    isAvailable: true
};

// Modifying property descriptor
Object.defineProperty(product, 'name', {
    writable: false,      // Cannot change value
    enumerable: true,     // Will show up in loops
    configurable: false   // Cannot delete or modify descriptor
});

// Trying to modify (will fail silently or throw error in strict mode)
product.name = 'Desktop';  // Won't change
console.log(product.name); // Still 'Laptop'

// Enumerating properties
for (let [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`);
}
```

**Common Use Cases:**

1. **Creating Read-only Properties:**
```javascript
Object.defineProperty(user, 'id', {
    value: '12345',
    writable: false
});
```

2. **Making Properties Non-enumerable:**
```javascript
Object.defineProperty(object, 'privateData', {
    enumerable: false,
    value: 'sensitive'
});
```



**Interview Follow-up Questions:**

1. Why would you want to use property descriptors instead of regular object properties?
2. What happens when you try to modify a non-writable property?
3. How can property descriptors help in creating more secure and maintainable code?
4. What's the difference between configurable: false and writable: false?
