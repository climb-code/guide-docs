---
title: Objects in JavaScript
description: Learn about Objects in JavaScript - creation, properties, methods, and best practices
---

Objects are one of the most fundamental data structures in JavaScript. They allow you to store collections of key-value pairs and represent real-world entities in your code.

---

## 📌 What is an Object?

An object is a collection of related data and/or functionality, stored as key-value pairs called **properties**. When a property holds a function, it's called a **method**.

```js
const person = {
  name: "Alice",
  age: 25,
  greet: function() {
    console.log("Hello!");
  }
};
```

---

## 📥 Creating Objects

### 1. Object Literal (Most Common)

```js
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023
};
```

### 2. Using `new Object()`

```js
const book = new Object();
book.title = "JavaScript Guide";
book.author = "John Doe";
```

### 3. Using Constructor Function

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const user = new Person("Bob", 30);
```

### 4. Using `Object.create()`

```js
const prototypeObj = {
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

const newObj = Object.create(prototypeObj);
newObj.name = "Charlie";
newObj.greet(); // Hello, Charlie
```

---

## 🔑 Accessing Properties

### Dot Notation

```js
const user = { name: "Alice", age: 25 };
console.log(user.name); // Alice
```

### Bracket Notation

```js
console.log(user["age"]); // 25

// Useful for dynamic keys
const key = "name";
console.log(user[key]); // Alice
```

---

## ✏️ Adding, Modifying, and Deleting Properties

```js
const obj = { a: 1 };

// Add
obj.b = 2;

// Modify
obj.a = 10;

// Delete
delete obj.b;

console.log(obj); // { a: 10 }
```

---

## 🔍 Checking Properties

### `in` Operator

```js
const car = { brand: "Honda" };
console.log("brand" in car); // true
console.log("model" in car); // false
```

### `hasOwnProperty()`

```js
console.log(car.hasOwnProperty("brand")); // true
```

---

## 🔁 Looping Through Objects

### `for...in` Loop

```js
const user = { name: "Alice", age: 25, city: "NYC" };

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### `Object.keys()`, `Object.values()`, `Object.entries()`

```js
const product = { name: "Laptop", price: 999 };

Object.keys(product);    // ["name", "price"]
Object.values(product);  // ["Laptop", 999]
Object.entries(product); // [["name", "Laptop"], ["price", 999]]
```

---

## 🛠️ Useful Object Methods

### `Object.assign()`

Copies properties from one or more source objects to a target object.

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2, c: 3 }
```

### `Object.freeze()`

Makes an object immutable (cannot add, modify, or delete properties).

```js
const config = { apiKey: "12345" };
Object.freeze(config);
config.apiKey = "67890"; // No effect
console.log(config.apiKey); // "12345"
```

### `Object.seal()`

Prevents adding or deleting properties but allows modification.

```js
const settings = { theme: "dark" };
Object.seal(settings);
settings.theme = "light"; // Works
settings.fontSize = 14;   // Ignored
delete settings.theme;    // Ignored
```

### `Object.isFrozen()` and `Object.isSealed()`

```js
Object.isFrozen(config);   // true
Object.isSealed(settings); // true
```

---

## 🎯 Object Destructuring

Extract properties into variables easily.

```js
const user = { name: "Alice", age: 25, city: "NYC" };

const { name, age } = user;
console.log(name); // Alice
console.log(age);  // 25

// With default values
const { country = "USA" } = user;
console.log(country); // USA

// Renaming
const { name: userName } = user;
console.log(userName); // Alice
```

---

## 📦 Nested Objects

Objects can contain other objects.

```js
const company = {
  name: "TechCorp",
  address: {
    city: "San Francisco",
    zip: "94102"
  }
};

console.log(company.address.city); // San Francisco

// Destructuring nested objects
const { address: { city } } = company;
console.log(city); // San Francisco
```

---

## 🔗 Object Shorthand (ES6+)

### Property Shorthand

```js
const name = "Alice";
const age = 25;

// Instead of { name: name, age: age }
const user = { name, age };
```

### Method Shorthand

```js
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};
```

### Computed Property Names

```js
const key = "dynamicKey";
const obj = {
  [key]: "value",
  [`${key}_2`]: "another value"
};
console.log(obj.dynamicKey); // "value"
```

---

## 🔄 Copying Objects

### Shallow Copy

```js
const original = { a: 1, b: { c: 2 } };

// Using spread operator
const copy1 = { ...original };

// Using Object.assign()
const copy2 = Object.assign({}, original);

// Note: Nested objects are still referenced!
copy1.b.c = 99;
console.log(original.b.c); // 99 (affected!)
```

### Deep Copy

```js
// Using JSON (simple but has limitations)
const deepCopy = JSON.parse(JSON.stringify(original));

// Using structuredClone (modern browsers)
const deepCopy2 = structuredClone(original);
```

---

## ⚠️ Common Pitfalls

1. **Reference vs Value:** Objects are passed by reference, not by value.

```js
const obj1 = { a: 1 };
const obj2 = obj1;
obj2.a = 100;
console.log(obj1.a); // 100 (both point to same object)
```

2. **Comparing Objects:** `===` compares references, not content.

```js
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false (different references)
```

3. **`typeof null`:** Returns `"object"` (historical bug).

```js
typeof null; // "object"
```

---

## ✅ Best Practices

- Use **object literals** for simple objects
- Use **destructuring** for cleaner code
- Use **`const`** for objects that shouldn't be reassigned
- Use **`Object.freeze()`** for truly immutable objects
- Be careful with **shallow copies** when dealing with nested objects
- Use **`Object.keys()`**, **`Object.values()`**, or **`Object.entries()`** for iteration

---

## 📚 Resources

- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Object Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [JavaScript.info: Objects](https://javascript.info/object)

---

**Happy Coding!**
