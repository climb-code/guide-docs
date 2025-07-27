---
title: JavaScript Arrays 
description: Arrays in JavaScript are one of the most commonly used data structures. They let you store ordered collections like lists of numbers, names, or objects. Whether you're manipulating data, filtering results, or looping through values — arrays are everywhere in JavaScript development.
---


Arrays in JavaScript are one of the most commonly used data structures. They let you store ordered collections like lists of numbers, names, or objects. Whether you're manipulating data, filtering results, or looping through values — arrays are everywhere in JavaScript development.


---

## 📌 What is an Array?

In JavaScript, an array is a list-like object used to store multiple values in a single variable. These values are stored in a specific order, and each has an index starting from 0.

```js
const fruits = ['apple', 'banana', 'mango'];
```

---

## 📥 Creating Arrays

```js
const empty = []; // An empty array
const numbers = [1, 2, 3];
const mix = ['hello', 42, true];
const fromString = Array.from('hey'); // ['h', 'e', 'y']
const fixedSize = Array(3).fill(0); // [0, 0, 0]
```

---

## 🔧 Basic Operations

| Method          | Description           |
| --------------- | --------------------- |
| `.length`       | Total number of items |
| `.push(val)`    | Adds item to end      |
| `.pop()`        | Removes last item     |
| `.unshift(val)` | Adds item to start    |
| `.shift()`      | Removes first item    |

```js
const a = [1, 2];
a.push(3);      // [1, 2, 3]
a.pop();        // [1, 2]
a.unshift(0);   // [0, 1, 2]
a.shift();      // [1, 2]
```

---

## 🛠️ Mutating Methods (Modify the original array)

### `.splice(start, deleteCount, ...items)`

Add or remove elements at any position.

```js
let arr = [1, 2, 3, 4];
arr.splice(1, 2, 9, 9); // [1, 9, 9, 4]
```

### `.sort([compareFn])`

Sorts items in place. By default, sorts as strings unless a compare function is provided.

```js
// Basic sort (converts to strings)
[10, 1, 3].sort();           // [1, 10, 3]

// Numeric sort using compare function
[10, 1, 3].sort((a, b) => a - b); // [1, 3, 10]

// Sort objects
const users = [{name: 'Bob'}, {name: 'Alice'}];
users.sort((a, b) => a.name.localeCompare(b.name));
```

### `.reverse()`

Reverses the array order in-place.

---

## 🚫 Non-Mutating Methods (Return new arrays)

### `.slice(start, end)`

Returns a part of the array without changing it.

```js
let items = [0, 1, 2, 3];
items.slice(1, 3); // [1, 2]
```

### `.concat(arr2)`

Combines two or more arrays into a new one.

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// Combine two arrays
const combined = arr1.concat(arr2); // [1, 2, 3, 4]

// Combine multiple arrays
const multiCombined = arr1.concat(arr2, arr3); // [1, 2, 3, 4, 5, 6]

// Can also concat values directly
const withValues = arr1.concat(3, 4); // [1, 2, 3, 4]
```

### `.join(separator)`

Turns the array into a string.

```js
['a', 'b', 'c'].join('-'); // "a-b-c"
```

---

## 🔁 Higher-Order Functions

These methods accept functions as arguments and are often used in modern JavaScript.

### `.map()`

Transforms every item in an array.

```js
[1, 2, 3].map(x => x * 2); // [2, 4, 6]
```

### `.filter()`

Keeps only the items that match a condition.

```js
[1, 2, 3].filter(x => x > 1); // [2, 3]
```

### `.reduce(callback, initialValue)`

Combines all elements into a single value. Very powerful for complex transformations.

```js
// Simple sum
[1, 2, 3].reduce((sum, val) => sum + val, 0); // 6

// Complex example: Calculate total from cart
const cart = [{ price: 100 }, { price: 200 }];
const total = cart.reduce((sum, item) => sum + item.price, 0); // 300

// Group items by a property
const items = [
  {category: 'A', value: 1},
  {category: 'B', value: 2},
  {category: 'A', value: 3}
];
const grouped = items.reduce((acc, item) => {
  (acc[item.category] = acc[item.category] || []).push(item);
  return acc;
}, {});
```

### `.forEach()`

Runs a function for every item (no return).

```js
[1, 2, 3].forEach(console.log);
```

---

## 🔍 Searching and Filtering

### `.find()`

Returns the **first** item that matches a condition.

```js
[1, 2, 3].find(x => x > 1); // 2
```

### `.findIndex()`

Like `.find()`, but returns the index instead of the item.

```js
const numbers = [10, 20, 30, 40];
const index = numbers.findIndex(num => num > 25); // 2 (index of 30)

const fruits = ['apple', 'banana', 'mango'];
const notFound = fruits.findIndex(fruit => fruit === 'orange'); // -1 (not found)
```

### `.includes(val)`

Checks if a value exists in the array.

```js
const pets = ['cat', 'dog', 'bird'];
console.log(pets.includes('cat')); // true
console.log(pets.includes('fish')); // false

// Can also specify starting position
console.log(pets.includes('dog', 2)); // false (starts searching from index 2)
```

### `.some()`

Returns `true` if **any** item matches.

```js
const ages = [15, 20, 25, 30];
// Check if any age is over 21
const hasAdult = ages.some(age => age >= 21); // true

const prices = [10, 20, 30];
// Check if any price is negative
const hasNegative = prices.some(price => price < 0); // false

const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];
// Check if any user is active
const hasActiveUser = users.some(user => user.active); // true
```

### `.every()`

Returns `true` only if **all** items match.

```js
const scores = [85, 90, 95];
// Check if all scores are passing (>= 70)
const allPassing = scores.every(score => score >= 70); // true

const numbers = [2, 4, 6, 7, 8];
// Check if all numbers are even
const allEven = numbers.every(num => num % 2 === 0); // false

const tasks = [
  { done: true },
  { done: true },
  { done: true }
];
// Check if all tasks are completed
const allCompleted = tasks.every(task => task.done); // true
```

---

## 🎯 Utility Tricks

### Remove Duplicates

```js
const unique = [...new Set([1, 2, 2, 3])];
```

### Flatten Arrays

```js
[1, [2, 3], [4, [5]]].flat(2); // [1, 2, 3, 4, 5]
```

### Chunk an Array

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
```

---

## ⚠️ Common Pitfalls

* `sort()` sorts as strings unless you pass a function.
* `splice()` changes the original array.
* Comparing arrays using `==` or `===` won't work: `[1] === [1]` is `false` (different memory refs).
* Sparse arrays like `[,,]` behave unexpectedly with `.map()`.

---

## ✅ Best Practices

* Always check `Array.isArray()` if you're unsure.
* Prefer `.map`, `.filter`, `.reduce` over loops for cleaner code.
* Don't mutate arrays unless necessary — use `.slice()` and spread (`...`) instead.
* Avoid using `forEach` when you need to return something — use `.map()` or `.reduce()` instead.

---

## 📚 Resources

* [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JavaScript.info](https://javascript.info/array)
* [30 Seconds of Code](https://www.30secondsofcode.org/js/p/array/)

---

