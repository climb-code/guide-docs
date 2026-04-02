---
title: Map and Set in JavaScript
description: A comprehensive guide to Map and Set objects in JavaScript, explaining their methods, use cases, and differences from Objects and Arrays.
---

JavaScript provides two specialized collection types: **Map** and **Set**. These collections offer unique features and performance characteristics compared to traditional Objects and Arrays.

## Map

A `Map` is a collection of keyed data items, similar to an `Object`. However, the main difference is that `Map` allows keys of **any type**, including functions, objects, and any primitive.

### Creating a Map

```javascript
const map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

console.log(map.get(1));    // 'num1'
console.log(map.get('1'));  // 'str1'
console.log(map.size);      // 3
```

### Key Methods

- `map.set(key, value)` – stores the value by the key.
- `map.get(key)` – returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` – returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` – removes the key/value pair by the key.
- `map.clear()` – removes everything from the map.
- `map.size` – returns the current element count.

### Iteration

- `map.keys()` – returns an iterable for keys.
- `map.values()` – returns an iterable for values.
- `map.entries()` – returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

```javascript
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // same as recipeMap.entries()
  console.log(entry); // ['cucumber', 500] (and so on)
}
```

---

## Set

A `Set` is a special type collection – "set of values" (without keys), where each value may occur **only once**.

### Creating a Set

```javascript
const set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
console.log(set.size); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete, then Mary)
}
```

### Key Methods

- `set.add(value)` – adds a value, returns the set itself.
- `set.delete(value)` – removes the value, returns `true` if value existed at the moment of the call, otherwise `false`.
- `set.has(value)` – returns `true` if the value exists, `false` otherwise.
- `set.clear()` – removes everything from the set.
- `set.size` – is the elements count.

### Iteration

We can loop over a set either with `for..of` or using `forEach`:

```javascript
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});
```

---

## Map vs Object

| Feature | Map | Object |
| :--- | :--- | :--- |
| **Key Types** | Any (Object, Function, Primitive) | String, Symbol |
| **Element Order** | Preserves insertion order | Generally preserves (but complex rules for integers) |
| **Size** | Easily obtained via `.size` | Must be determined manually |
| **Iteration** | Directly iterable | Not directly iterable (requires `Object.keys()`, etc.) |
| **Performance** | Better for frequent additions/removals | Optimized for small, fixed sets of properties |

## Set vs Array

- `Set` automatically handles uniqueness, while an `Array` allows duplicates.
- `Set` is highly optimized for checking if an element exists (`set.has(value)`) compared to `Array.includes()`.
