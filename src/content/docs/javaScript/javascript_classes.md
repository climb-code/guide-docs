---
title: Classes in JavaScript
description: Learn about Classes in JavaScript - syntax, inheritance, static methods, and best practices
---

Classes in JavaScript are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are unique to classes.

---

## �️ The Old Way vs The New Way

### Constructor Functions (Pre-ES6)

Before ES6 classes, we used **constructor functions** and the `prototype` to create objects and implement inheritance.

```js
// Old Way: Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to prototype
Person.prototype.greet = function() {
  console.log("Hello, I'm " + this.name);
};

const john = new Person("John", 30);
john.greet(); // Hello, I'm John
```

### ES6 Classes (Modern Way)

```js
// New Way: ES6 Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const john = new Person("John", 30);
john.greet(); // Hello, I'm John
```

> [!IMPORTANT]
> **Under the hood, classes are just syntactic sugar over constructor functions.** They still use prototypes, but provide a cleaner, more intuitive syntax.

---

## 🎯 Understanding `this` Binding

### The Problem with `this` in Constructor Functions

In the old way, `this` could easily be lost when passing methods around:

```js
function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function() {
  this.count++;
  console.log(this.count);
};

const counter = new Counter();
counter.increment(); // 1

// Problem: losing 'this' context
const increment = counter.increment;
increment(); // Error: Cannot read property 'count' of undefined
```

### Solutions with `call`, `bind`, and `apply`

#### Using `call()`

`call()` invokes a function with a specific `this` value.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hi, I'm " + this.name);
};

const person1 = new Person("Alice");
const person2 = { name: "Bob" };

// Using call to change 'this' context
person1.greet.call(person2); // Hi, I'm Bob
```

#### Using `apply()`

`apply()` is similar to `call()` but accepts arguments as an array.

```js
function Sum(a, b) {
  this.result = a + b;
}

const obj = {};
Sum.apply(obj, [5, 10]);
console.log(obj.result); // 15
```

#### Using `bind()`

`bind()` creates a new function with a fixed `this` value.

```js
function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function() {
  this.count++;
  console.log(this.count);
};

const counter = new Counter();

// bind() creates a new function with fixed 'this'
const increment = counter.increment.bind(counter);
increment(); // 1
increment(); // 2
```

### `this` in ES6 Classes

Classes have the same `this` binding issues, but arrow functions provide a solution:

```js
class Counter {
  constructor() {
    this.count = 0;
  }
  
  // Regular method - 'this' can be lost
  increment() {
    this.count++;
    console.log(this.count);
  }
  
  // Arrow function - 'this' is lexically bound
  incrementArrow = () => {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();

// Problem with regular method
const increment1 = counter.increment;
// increment1(); // Error!

// Arrow function maintains 'this'
const increment2 = counter.incrementArrow;
increment2(); // 1 - Works!
```

---

## 🧬 Inheritance: Old vs New

### Old Way: Using `call()` and Prototype Chain

```js
// Parent constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound.');
};

// Child constructor
function Dog(name, breed) {
  // Call parent constructor with 'this'
  Animal.call(this, name);
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add child method
Dog.prototype.bark = function() {
  console.log(this.name + ' barks!');
};

const dog = new Dog('Buddy', 'Golden Retriever');
dog.speak(); // Buddy makes a sound.
dog.bark();  // Buddy barks!
```

### New Way: Using `extends` and `super`

```js
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Child class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls parent constructor
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks!`);
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
dog.speak(); // Buddy makes a sound.
dog.bark();  // Buddy barks!
```

---

## 🔍 Key Differences

| Feature | Constructor Functions | ES6 Classes |
|---------|----------------------|-------------|
| **Syntax** | Function-based | Class-based |
| **Methods** | Added to `.prototype` | Defined inside class body |
| **Inheritance** | Manual prototype chain setup | `extends` keyword |
| **Parent Constructor** | `ParentConstructor.call(this)` | `super()` |
| **Hoisting** | Function hoisted | Not hoisted |
| **Strict Mode** | Optional | Always strict mode |
| **`new` Required** | Optional (but wrong) | Mandatory (throws error) |

### Example: Calling Without `new`

```js
// Constructor function - doesn't enforce 'new'
function OldPerson(name) {
  this.name = name;
}

const p1 = OldPerson("Alice"); // No error, but buggy
// 'this' refers to global object!

// Class - enforces 'new'
class NewPerson {
  constructor(name) {
    this.name = name;
  }
}

// const p2 = NewPerson("Alice"); // TypeError: Class constructor cannot be invoked without 'new'
const p2 = new NewPerson("Alice"); // Correct way
```

---

## �📌 Usage

Use `class` keyword to create a class. Always add a `constructor()` method.

### Syntax

```js
class ClassName {
  constructor() { ... }
}
```

### Example

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const myPerson = new Person("John", 30);
```

---

## 🏗️ Class Methods

Class methods are defined inside the class body.

```js
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  
  age() {
    const date = new Date();
    return date.getFullYear() - this.year;
  }
}

const myCar = new Car("Ford", 2014);
console.log("My car is " + myCar.age() + " years old.");
```

---

## 🧬 Inheritance

To create a class inheritance, use the `extends` keyword.

A class created with a class inheritance inherits all the methods from another class:

```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

const myCar = new Model("Ford", "Mustang");
console.log(myCar.show());
```

> [!NOTE]
> The `super()` method refers to the parent class. By calling the `super()` method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods.

---

## ⚡ Static Methods

Static methods are defined on the class itself. You cannot call a `static` method on an object, only on an object class.

```js
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

const myCar = new Car("Ford");

// You can call 'hello()' on the Car Class:
console.log(Car.hello());

// But NOT on a Car Object:
// console.log(myCar.hello()); // this will raise an error.
```

---

## 🔒 Getters and Setters

Classes also allow you to use getters and setters.

It can be smart to use getters and setters for your properties, especially if you want to do something special with the value before returning them, or before you set them.

To add getters and setters in the class, use the `get` and `set` keywords.

```js
class Person {
  constructor(name) {
    this._name = name;
  }
  
  get name() {
    return this._name.toUpperCase();
  }
  
  set name(x) {
    this._name = x;
  }
}

const myPerson = new Person("John");
console.log(myPerson.name); // JOHN
myPerson.name = "Doe";
console.log(myPerson.name); // DOE
```

---

## ⚠️ Hoisting

Unlike functions, and other JavaScript declarations, class declarations are not hoisted. That means that you must declare a class before you can use it.

```js
// You cannot use the class yet.
// const myCar = new Car("Ford"); // ReferenceError

class Car {
  constructor(brand) {
    this.carname = brand;
  }
}

// Now you can use the class:
const myCar = new Car("Ford");
```

---

## ✅ Best Practices

- Use **PascalCase** for class names.
- Always include a **constructor**.
- Use **methods** to encapsulate behavior.
- Use **inheritance** (`extends`) to reuse code.
- Use **arrow functions** for methods that need to preserve `this` context.
- Prefer **ES6 classes** over constructor functions for better readability.
- Use `super()` before accessing `this` in a child class constructor.
- Be aware that classes are **not hoisted** - declare before use.

---

## 📚 Resources

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JavaScript.info: Classes](https://javascript.info/classes)

---

**Happy Coding!**
