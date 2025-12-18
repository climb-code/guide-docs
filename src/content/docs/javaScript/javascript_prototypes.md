---
title: Prototypes and Inheritance in JavaScript
description: Master JavaScript Prototypes - understanding prototype chain, inheritance patterns, Object.create(), and how JavaScript's object model works under the hood
---

JavaScript is a **prototype-based language**, which means inheritance and object creation work differently than in classical object-oriented languages like Java or C++. Understanding prototypes is crucial to mastering JavaScript!

---

## 🧬 What is a Prototype?

Every JavaScript object has a special hidden property called `[[Prototype]]` (often accessed via `__proto__` or `Object.getPrototypeOf()`). This property is a reference to another object called its **prototype**.

```js
const person = {
  name: "Alice",
  age: 30
};

console.log(person.__proto__); // Object.prototype
console.log(Object.getPrototypeOf(person)); // Object.prototype (recommended way)
```

> [!IMPORTANT]
> When you try to access a property on an object, JavaScript first looks at the object itself. If it doesn't find it, it looks at the object's prototype, then the prototype's prototype, and so on. This is called the **prototype chain**.

---

## 🔗 The Prototype Chain

The prototype chain is how JavaScript implements inheritance. It's a series of links between objects.

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

const rabbit = {
  jumps: true
};

// Set animal as the prototype of rabbit
rabbit.__proto__ = animal;

console.log(rabbit.eats);  // true (found in prototype)
console.log(rabbit.jumps); // true (found in rabbit itself)
rabbit.walk();             // Animal walks (method from prototype)
```

### How Property Lookup Works

```js
const obj = {
  a: 1
};

// Prototype chain: obj -> Object.prototype -> null

console.log(obj.a);                    // 1 (found in obj)
console.log(obj.toString());           // [object Object] (found in Object.prototype)
console.log(obj.nonExistent);          // undefined (not found anywhere)
console.log(Object.getPrototypeOf(obj)); // Object.prototype
console.log(Object.getPrototypeOf(Object.prototype)); // null (end of chain)
```

---

## 🏗️ Constructor Functions and Prototypes

Before ES6 classes, constructor functions were the primary way to create objects with shared behavior.

```js
function Person(name, age) {
  // Instance properties (unique to each object)
  this.name = name;
  this.age = age;
}

// Shared methods (on the prototype)
Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}, ${this.age} years old`);
};

Person.prototype.birthday = function() {
  this.age++;
  console.log(`Happy birthday! Now ${this.age} years old`);
};

const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

alice.greet();    // Hello, I'm Alice, 30 years old
bob.greet();      // Hello, I'm Bob, 25 years old
alice.birthday(); // Happy birthday! Now 31 years old

// Both share the same method
console.log(alice.greet === bob.greet); // true
```

### Why Use Prototype for Methods?

```js
// ❌ Bad: Each instance gets its own copy
function PersonBad(name) {
  this.name = name;
  this.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const p1 = new PersonBad("Alice");
const p2 = new PersonBad("Bob");
console.log(p1.greet === p2.greet); // false (memory waste!)

// ✅ Good: All instances share one method
function PersonGood(name) {
  this.name = name;
}

PersonGood.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const p3 = new PersonGood("Alice");
const p4 = new PersonGood("Bob");
console.log(p3.greet === p4.greet); // true (efficient!)
```

---

## 🎯 Understanding `prototype` vs `__proto__`

This is one of the most confusing aspects of JavaScript!

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  console.log(`${this.name} says Woof!`);
};

const myDog = new Dog("Buddy");
```

### Key Differences

| Property | What is it? | On which objects? |
|----------|-------------|-------------------|
| `prototype` | An object that will become the `__proto__` of instances | Functions only |
| `__proto__` | Reference to the actual prototype object | All objects |

```js
// Function's prototype property
console.log(Dog.prototype); // { bark: function, constructor: Dog }

// Instance's __proto__ property
console.log(myDog.__proto__); // Same as Dog.prototype
console.log(myDog.__proto__ === Dog.prototype); // true

// The constructor property
console.log(Dog.prototype.constructor === Dog); // true
console.log(myDog.constructor === Dog); // true (inherited from prototype)
```

### Visual Representation

```
Dog (constructor function)
  └─ prototype: { bark: function, constructor: Dog }
                      ↑
                      |
                   __proto__
                      |
myDog (instance)
  └─ name: "Buddy"
  └─ __proto__ ─────┘
```

---

## 🎨 Object.create()

`Object.create()` is a modern way to set up prototype chains without constructor functions.

```js
const personPrototype = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
  introduce() {
    console.log(`My name is ${this.name} and I'm ${this.age}`);
  }
};

// Create object with personPrototype as prototype
const alice = Object.create(personPrototype);
alice.name = "Alice";
alice.age = 30;

alice.greet(); // Hello, I'm Alice

console.log(Object.getPrototypeOf(alice) === personPrototype); // true
```

### Object.create() vs Constructor Functions

```js
// Using Object.create()
const animal = {
  eat() {
    console.log("Eating...");
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log("Woof!");
};

// Using Constructor Function
function Animal() {}
Animal.prototype.eat = function() {
  console.log("Eating...");
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log("Woof!");
};
```

---

## 🔄 Inheritance Patterns

### Pattern 1: Prototypal Inheritance

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} says Woof!`);
};

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.eat();  // Buddy is eating (inherited from Animal)
myDog.bark(); // Buddy says Woof!

console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true
```

### Pattern 2: Object.create() Inheritance

```js
const animal = {
  init(name) {
    this.name = name;
    return this;
  },
  eat() {
    console.log(`${this.name} is eating`);
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log(`${this.name} says Woof!`);
};

const myDog = Object.create(dog).init("Buddy");
myDog.eat();  // Buddy is eating
myDog.bark(); // Buddy says Woof!
```

### Pattern 3: ES6 Classes (Syntactic Sugar)

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.eat();  // Buddy is eating
myDog.bark(); // Buddy says Woof!
```

> [!NOTE]
> ES6 classes are just syntactic sugar over prototypes! Under the hood, they use the same prototype-based inheritance.

---

## 🔍 Checking Prototypes

### instanceof Operator

```js
function Person() {}
const person = new Person();

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true (everything inherits from Object)

const arr = [];
console.log(arr instanceof Array);  // true
console.log(arr instanceof Object); // true
```

### isPrototypeOf() Method

```js
function Person() {}
const person = new Person();

console.log(Person.prototype.isPrototypeOf(person)); // true
console.log(Object.prototype.isPrototypeOf(person)); // true

const obj1 = { a: 1 };
const obj2 = Object.create(obj1);

console.log(obj1.isPrototypeOf(obj2)); // true
```

### hasOwnProperty() Method

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, ${this.name}`);
};

const alice = new Person("Alice");

console.log(alice.hasOwnProperty('name'));   // true (own property)
console.log(alice.hasOwnProperty('greet'));  // false (inherited)
console.log('greet' in alice);               // true (exists in chain)
```

---

## 🛠️ Modifying Prototypes

### Adding Methods to Built-in Prototypes

```js
// ⚠️ Generally not recommended, but possible
Array.prototype.last = function() {
  return this[this.length - 1];
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.last()); // 5

const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.last()); // orange
```

> [!CAUTION]
> Modifying built-in prototypes (like Array.prototype, Object.prototype) is generally considered bad practice as it can cause conflicts with other code or future JavaScript features!

### Safer Alternative: Extend Your Own Objects

```js
function MyArray() {
  this.items = [];
}

MyArray.prototype.add = function(item) {
  this.items.push(item);
};

MyArray.prototype.last = function() {
  return this.items[this.items.length - 1];
};

const myArr = new MyArray();
myArr.add(1);
myArr.add(2);
myArr.add(3);
console.log(myArr.last()); // 3
```

---

## 💡 Practical Examples

### Example 1: Creating a Shape Hierarchy

```js
function Shape(color) {
  this.color = color;
}

Shape.prototype.describe = function() {
  console.log(`A ${this.color} shape`);
};

function Circle(color, radius) {
  Shape.call(this, color);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function() {
  return Math.PI * this.radius ** 2;
};

Circle.prototype.describe = function() {
  console.log(`A ${this.color} circle with radius ${this.radius}`);
};

function Rectangle(color, width, height) {
  Shape.call(this, color);
  this.width = width;
  this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

Rectangle.prototype.describe = function() {
  console.log(`A ${this.color} rectangle ${this.width}x${this.height}`);
};

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

circle.describe();    // A red circle with radius 5
console.log(circle.area()); // 78.53981633974483

rectangle.describe(); // A blue rectangle 4x6
console.log(rectangle.area()); // 24
```

### Example 2: Plugin System

```js
function App(name) {
  this.name = name;
  this.plugins = [];
}

App.prototype.use = function(plugin) {
  this.plugins.push(plugin);
  plugin.init(this);
  return this;
};

App.prototype.run = function() {
  console.log(`${this.name} is running with ${this.plugins.length} plugins`);
};

// Plugin constructor
function Logger() {}

Logger.prototype.init = function(app) {
  console.log(`Logger plugin initialized for ${app.name}`);
};

function Analytics() {}

Analytics.prototype.init = function(app) {
  console.log(`Analytics plugin initialized for ${app.name}`);
};

const myApp = new App("MyApp");
myApp
  .use(new Logger())
  .use(new Analytics())
  .run();

// Logger plugin initialized for MyApp
// Analytics plugin initialized for MyApp
// MyApp is running with 2 plugins
```

---

## ⚙️ Advanced Concepts

### Prototype Pollution Attack

```js
// ⚠️ Security concern: Prototype pollution
const user = { name: "Alice" };

// Malicious code could modify Object.prototype
user.__proto__.isAdmin = true;

const attacker = { name: "Hacker" };
console.log(attacker.isAdmin); // true (inherited from polluted prototype!)

// ✅ Protection: Use Object.create(null)
const safeUser = Object.create(null);
safeUser.name = "Bob";
console.log(safeUser.__proto__); // undefined (no prototype chain!)
```

### Shadowing Properties

```js
const parent = {
  name: "Parent",
  greet() {
    console.log(`Hello from ${this.name}`);
  }
};

const child = Object.create(parent);
child.name = "Child"; // Shadows parent.name

console.log(child.name);        // Child (own property)
console.log(parent.name);       // Parent
delete child.name;
console.log(child.name);        // Parent (now from prototype)
```

### Method Overriding

```js
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.move = function() {
  console.log(`${this.type} is moving`);
};

function Car(brand) {
  Vehicle.call(this, "Car");
  this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Override parent method
Car.prototype.move = function() {
  console.log(`${this.brand} car is driving on the road`);
};

const myCar = new Car("Toyota");
myCar.move(); // Toyota car is driving on the road
```

---

## 🎭 Prototype vs Class

| Aspect | Prototypes | Classes |
|--------|-----------|---------|
| Syntax | Function-based | Class-based (ES6+) |
| Readability | More complex | Cleaner, more familiar |
| Hoisting | Functions are hoisted | Classes are NOT hoisted |
| Strict Mode | Optional | Always in strict mode |
| Underlying Mechanism | Direct | Syntactic sugar over prototypes |

```js
// Both are equivalent!

// Prototype style
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

// Class style
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

---

## ✅ Best Practices

1. **Prefer ES6 Classes for New Code**: They're cleaner and easier to understand.

```js
// ✅ Modern and clean
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
```

2. **Use Object.create() for Simple Inheritance**: When you don't need constructor functions.

```js
// ✅ Simple and effective
const parent = { greet() { console.log("Hello"); } };
const child = Object.create(parent);
```

3. **Don't Modify Built-in Prototypes**: Avoid extending native objects.

```js
// ❌ Bad
Array.prototype.myMethod = function() { /* ... */ };

// ✅ Good
class MyArray extends Array {
  myMethod() { /* ... */ }
}
```

4. **Use `Object.getPrototypeOf()` instead of `__proto__`**: It's the standard way.

```js
// ❌ Avoid
const proto = obj.__proto__;

// ✅ Prefer
const proto = Object.getPrototypeOf(obj);
```

5. **Set constructor property correctly**: When manually creating prototype chains.

```js
function Child() {}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // ✅ Don't forget this!
```

---

## 🎯 Real-World Example: Event Emitter

```js
function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
  return this;
};

EventEmitter.prototype.emit = function(event, ...args) {
  if (this.events[event]) {
    this.events[event].forEach(listener => listener(...args));
  }
  return this;
};

EventEmitter.prototype.off = function(event, listenerToRemove) {
  if (this.events[event]) {
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }
  return this;
};

// Usage
const emitter = new EventEmitter();

const onLogin = (user) => console.log(`${user} logged in`);
const onLogout = (user) => console.log(`${user} logged out`);

emitter
  .on('login', onLogin)
  .on('logout', onLogout)
  .on('login', (user) => console.log(`Welcome, ${user}!`));

emitter.emit('login', 'Alice');
// Alice logged in
// Welcome, Alice!

emitter.emit('logout', 'Alice');
// Alice logged out
```

---

## 📚 Summary

- Every JavaScript object has a prototype (`[[Prototype]]`)
- Prototypes enable inheritance through the **prototype chain**
- Constructor functions use `.prototype` to share methods
- `Object.create()` provides a cleaner way to set up prototypes
- ES6 classes are syntactic sugar over prototypes
- Understanding prototypes is key to mastering JavaScript's object model

---

## 🔗 Resources

- [MDN: Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript.info: Prototypal inheritance](https://javascript.info/prototype-inheritance)

---

**Happy Coding! Now you understand how JavaScript really works! 🚀**
