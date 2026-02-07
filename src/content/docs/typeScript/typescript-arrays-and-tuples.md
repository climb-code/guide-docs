---
title: TypeScript Arrays and Tuples
description: Master arrays and tuples in TypeScript. Learn array type annotations, generic syntax, readonly arrays, tuple types, and advanced tuple features.
---

Welcome! Arrays and tuples are fundamental data structures in TypeScript. This guide will show you how to work with them effectively. Let's get started! 🚀

## Arrays in TypeScript

Arrays store multiple values of the same type in a single variable.

### Array Type Annotations

There are two ways to declare array types:

```typescript
// Method 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Method 2: Array<Type> (Generic syntax)
let scores: Array<number> = [95, 87, 92];
let colors: Array<string> = ["red", "green", "blue"];
```

**Both methods are equivalent** - choose the one you prefer!

### Array Operations

```typescript
let fruits: string[] = ["apple", "banana"];

// Adding elements
fruits.push("orange"); // ["apple", "banana", "orange"]

// Accessing elements
console.log(fruits[0]); // "apple"

// Array methods
fruits.map(fruit => fruit.toUpperCase()); // ["APPLE", "BANANA", "ORANGE"]
fruits.filter(fruit => fruit.length > 5); // ["banana", "orange"]
```

### Multi-dimensional Arrays

```typescript
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[0][1]); // 2
```

---

## Readonly Arrays

Readonly arrays prevent modifications after creation:

### Using `readonly` Modifier

```typescript
let numbers: readonly number[] = [1, 2, 3];

// ❌ Error: Cannot modify readonly array
// numbers.push(4);
// numbers[0] = 10;

// ✅ Ok: Can read values
console.log(numbers[0]); // 1
console.log(numbers.length); // 3
```

### Using `ReadonlyArray<T>` Generic

```typescript
let colors: ReadonlyArray<string> = ["red", "green", "blue"];

// ❌ Error: Cannot modify
// colors.push("yellow");

// ✅ Ok: Non-mutating methods work
let uppercaseColors = colors.map(c => c.toUpperCase());
```

**Best Practice**: Use readonly arrays when you want to prevent accidental modifications.

---

## Tuples in TypeScript

Tuples are **fixed-length arrays** where each element can have a different type.

### Basic Tuple Syntax

```typescript
let person: [string, number] = ["Alice", 25];

console.log(person[0]); // "Alice" (string)
console.log(person[1]); // 25 (number)
```

### Named Tuples

Named tuples make your code more readable:

```typescript
let user: [name: string, age: number, isActive: boolean] = [
  "Bob",
  30,
  true
];

console.log(user[0]); // "Bob"
```

### Accessing Tuple Elements

```typescript
let coordinate: [number, number] = [10, 20];

let [x, y] = coordinate; // Destructuring
console.log(x); // 10
console.log(y); // 20
```

---

## Optional Tuple Elements

You can make tuple elements optional using `?`:

```typescript
let response: [string, number?] = ["Success"];
// or
let response2: [string, number?] = ["Success", 200];

console.log(response[0]); // "Success"
console.log(response[1]); // undefined
```

**Note**: Optional elements must come at the end of the tuple.

---

## Rest Elements in Tuples

Use rest elements to capture remaining values:

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];

let data1: StringNumberBooleans = ["hello", 42];
let data2: StringNumberBooleans = ["world", 100, true, false, true];

console.log(data2[2]); // true
console.log(data2[3]); // false
```

### Rest Elements in the Middle

```typescript
type Complex = [string, ...number[], boolean];

let example: Complex = ["start", 1, 2, 3, 4, true];
```

---

## Readonly Tuples

Make tuples immutable with `readonly`:

```typescript
let point: readonly [number, number] = [10, 20];

// ❌ Error: Cannot modify
// point[0] = 5;
// point.push(30);

// ✅ Ok: Can read
console.log(point[0]); // 10
```

---

## Variadic Tuple Types

Variadic tuples allow you to work with generic tuple patterns:

```typescript
type Strings = [string, string];
type Numbers = [number, number];

type Combined = [...Strings, ...Numbers];
// Equivalent to: [string, string, number, number]

let data: Combined = ["hello", "world", 1, 2];
```

### Generic Variadic Tuples

```typescript
function concat<T extends unknown[], U extends unknown[]>(
  arr1: T,
  arr2: U
): [...T, ...U] {
  return [...arr1, ...arr2];
}

let result = concat([1, 2], ["a", "b"]);
// result: [number, number, string, string]
```

---

## When to Use Arrays vs Tuples

| Feature | Arrays | Tuples |
|---------|--------|--------|
| **Length** | Variable | Fixed |
| **Element Types** | Same type | Different types allowed |
| **Use Case** | List of similar items | Structured data with known positions |

### Arrays Example

```typescript
let scores: number[] = [95, 87, 92, 88]; // Can grow/shrink
```

### Tuples Example

```typescript
let user: [string, number] = ["Alice", 25]; // Always 2 elements
```

---

## Practical Examples

### API Response with Tuple

```typescript
type ApiResponse = [success: boolean, data: any, error: string | null];

let successResponse: ApiResponse = [true, { id: 1, name: "Alice" }, null];
let errorResponse: ApiResponse = [false, null, "Network error"];
```

### Coordinates System

```typescript
type Point2D = [x: number, y: number];
type Point3D = [x: number, y: number, z: number];

let point2D: Point2D = [10, 20];
let point3D: Point3D = [10, 20, 30];
```

---

## Key Takeaways

- Use `Type[]` or `Array<Type>` for arrays of the same type
- Use `readonly` to prevent array modifications
- Tuples have fixed length with specific types for each position
- Named tuples improve code readability
- Optional elements and rest elements add flexibility to tuples
- Choose arrays for variable-length lists, tuples for structured data

---

## 💡 Conclusion

Arrays and tuples are essential building blocks in TypeScript. Understanding when to use each will help you write more expressive and type-safe code!

Happy coding with TypeScript! 🎉
