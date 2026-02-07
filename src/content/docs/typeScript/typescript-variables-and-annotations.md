---
title: TypeScript Variables and Type Annotations
description: Learn how to declare variables with type annotations in TypeScript. Understand type inference, any vs unknown, and the never and void types.
---

Welcome! In this guide, you'll learn how to declare variables in TypeScript and use type annotations to make your code safer and more predictable. Let's dive in! 🚀

## Variable Declarations

TypeScript uses the same variable declarations as JavaScript: `let`, `const`, and `var`.

### `let` - Block-scoped Variables

Use `let` for variables that can be reassigned:

```typescript
let count: number = 0;
count = 5; // ✅ Ok, can be reassigned
```

### `const` - Constants

Use `const` for values that won't change:

```typescript
const PI: number = 3.14159;
// PI = 3.14; // ❌ Error: Cannot reassign a constant
```

### `var` - Function-scoped Variables

Avoid using `var` in modern TypeScript (it's legacy syntax):

```typescript
var oldStyle: string = "Not recommended";
```

---

## Type Annotations

Type annotations explicitly tell TypeScript what type a variable should be.

### Basic Syntax

```typescript
let variableName: type = value;
```

### Examples

```typescript
let username: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;
let scores: number[] = [95, 87, 92];
```

---

## Type Inference

TypeScript can automatically infer types from values, so you don't always need explicit annotations:

```typescript
let message = "Hello, TypeScript!"; // Type inferred as string
let count = 42; // Type inferred as number
let isActive = true; // Type inferred as boolean
```

**Best Practice**: Use type inference when the type is obvious, and explicit annotations when you need clarity or want to enforce a specific type.

---

## The `any` Type

The `any` type disables type checking for a variable. It can hold any value:

```typescript
let data: any = "Hello";
data = 42; // ✅ Ok
data = true; // ✅ Ok
data = [1, 2, 3]; // ✅ Ok
```

**Warning**: Use `any` sparingly! It defeats the purpose of TypeScript's type safety.

### When to Use `any`

- Migrating JavaScript code to TypeScript gradually
- Working with dynamic data where the type is truly unknown
- Integrating with third-party libraries without type definitions

---

## The `unknown` Type

The `unknown` type is a safer alternative to `any`. You must check the type before using it:

```typescript
let input: unknown = "Hello";

// ❌ Error: Can't use without type checking
// console.log(input.toUpperCase());

// ✅ Ok: Check the type first
if (typeof input === "string") {
  console.log(input.toUpperCase()); // "HELLO"
}
```

**Best Practice**: Prefer `unknown` over `any` when the type is uncertain.

---

## The `void` Type

The `void` type is used for functions that don't return a value:

```typescript
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

function greet(): void {
  console.log("Hello!");
}
```

**Note**: Variables of type `void` can only be `undefined` or `null` (if `strictNullChecks` is off).

---

## The `never` Type

The `never` type represents values that never occur. It's used for:

### 1. Functions that never return

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // This function never exits
  }
}
```

### 2. Exhaustive type checking

```typescript
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return 3.14;
    case "square":
      return 4;
    default:
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck; // This ensures all cases are handled
  }
}
```

---

## Comparison Table

| Type | Description | Use Case |
|------|-------------|----------|
| `any` | Any type, no type checking | Migrating JS code, truly dynamic data |
| `unknown` | Any type, requires type checking | When type is uncertain but you want safety |
| `void` | No return value | Functions that don't return anything |
| `never` | Never occurs | Functions that throw errors or never return |

---

## Key Takeaways

- Use `let` for reassignable variables and `const` for constants
- Type annotations explicitly specify types: `let name: string = "Alice"`
- TypeScript can infer types automatically in many cases
- Prefer `unknown` over `any` for type safety
- Use `void` for functions without return values
- Use `never` for functions that never return or for exhaustive checks

---

## 💡 Conclusion

Understanding variable declarations and type annotations is the foundation of writing TypeScript. By mastering these concepts, you'll write safer, more maintainable code!

Happy coding with TypeScript! 🎉
