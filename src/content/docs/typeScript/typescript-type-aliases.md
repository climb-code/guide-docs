---
title: TypeScript Type Aliases
description: Learn how to create and use type aliases in TypeScript. Understand the differences between type aliases and interfaces, and when to use each.
---

Welcome! Type aliases are a powerful feature in TypeScript that let you create custom names for types. This guide will show you how to use them effectively! 🚀

## What Are Type Aliases?

Type aliases allow you to create a **new name** for any type. They make your code more readable and maintainable.

### Basic Syntax

```typescript
type AliasName = ExistingType;
```

### Simple Example

```typescript
type UserID = string;
type Age = number;

let id: UserID = "user-123";
let userAge: Age = 25;
```

---

## Creating Type Aliases

### For Primitive Types

```typescript
type Username = string;
type Score = number;
type IsActive = boolean;

let name: Username = "Alice";
let points: Score = 100;
let active: IsActive = true;
```

### For Object Types

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

let user: User = {
  id: "123",
  name: "Alice",
  email: "alice@example.com",
  age: 25
};
```

### For Union Types

```typescript
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

let orderStatus: Status = "pending";
let userId: ID = 123; // or "user-123"
```

### For Function Types

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};
```

---

## Complex Type Aliases

### Nested Objects

```typescript
type Address = {
  street: string;
  city: string;
  zipCode: string;
};

type Employee = {
  id: number;
  name: string;
  address: Address;
  department: string;
};

let employee: Employee = {
  id: 1,
  name: "Bob",
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  },
  department: "Engineering"
};
```

### Arrays and Tuples

```typescript
type StringArray = string[];
type NumberTuple = [number, number];
type MixedArray = (string | number)[];

let names: StringArray = ["Alice", "Bob"];
let coordinates: NumberTuple = [10, 20];
let mixed: MixedArray = [1, "hello", 2, "world"];
```

---

## Generic Type Aliases

Type aliases can accept generic parameters:

```typescript
type Container<T> = {
  value: T;
  id: string;
};

let stringContainer: Container<string> = {
  value: "Hello",
  id: "str-1"
};

let numberContainer: Container<number> = {
  value: 42,
  id: "num-1"
};
```

### Generic Function Type

```typescript
type Transformer<T, U> = (input: T) => U;

let stringToNumber: Transformer<string, number> = (str) => {
  return parseInt(str);
};

let result = stringToNumber("123"); // 123
```

---

## Type Aliases vs Interfaces

Both type aliases and interfaces can define object shapes, but they have key differences:

### Similarities

```typescript
// Type alias
type UserType = {
  name: string;
  age: number;
};

// Interface
interface UserInterface {
  name: string;
  age: number;
}

// Both work the same
let user1: UserType = { name: "Alice", age: 25 };
let user2: UserInterface = { name: "Bob", age: 30 };
```

### Key Differences

#### 1. Declaration Merging

Interfaces can be merged, type aliases cannot:

```typescript
// ✅ Ok: Interfaces merge
interface User {
  name: string;
}

interface User {
  age: number;
}

let user: User = { name: "Alice", age: 25 };

// ❌ Error: Type aliases don't merge
type Person = { name: string };
// type Person = { age: number }; // Duplicate identifier error
```

#### 2. Union and Intersection Types

Type aliases can represent unions and intersections:

```typescript
// ✅ Ok: Type aliases
type Status = "success" | "error" | "pending";
type Result = string | number;

// ❌ Cannot do this with interfaces directly
```

#### 3. Primitive Types

Type aliases can alias primitives:

```typescript
// ✅ Ok: Type aliases
type ID = string | number;
type Age = number;

// ❌ Interfaces cannot alias primitives
```

#### 4. Tuples

Type aliases work better with tuples:

```typescript
// ✅ Ok: Type aliases
type Coordinate = [number, number];

// ⚠️ Interfaces can do it but it's awkward
interface CoordinateInterface {
  0: number;
  1: number;
  length: 2;
}
```

---

## When to Use Type Aliases

Use **type aliases** when:

- Creating union or intersection types
- Defining tuples
- Aliasing primitive types
- Working with complex type transformations
- You need mapped or conditional types (covered in advanced topics)

```typescript
// Union type
type Result = "success" | "error";

// Tuple
type Point = [number, number];

// Complex transformation
type ReadonlyUser<T> = {
  readonly [K in keyof T]: T[K];
};
```

---

## When to Use Interfaces

Use **interfaces** when:

- Defining object shapes, especially for classes
- You need declaration merging
- Defining public API contracts
- Object-oriented programming patterns

```typescript
// Object shape
interface User {
  name: string;
  age: number;
}

// Can be implemented by classes
class Employee implements User {
  constructor(public name: string, public age: number) {}
}
```

---

## Practical Examples

### API Response Type

```typescript
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: string | null;
};

type UserData = {
  id: string;
  name: string;
};

let response: ApiResponse<UserData> = {
  success: true,
  data: { id: "123", name: "Alice" },
  error: null
};
```

### Event Handlers

```typescript
type EventHandler = (event: Event) => void;
type ClickHandler = (event: MouseEvent) => void;
type KeyHandler = (event: KeyboardEvent) => void;

const handleClick: ClickHandler = (e) => {
  console.log("Clicked!", e.clientX, e.clientY);
};
```

---

## Key Takeaways

- Type aliases create new names for types using the `type` keyword
- They work with primitives, objects, unions, intersections, and more
- Type aliases can be generic with type parameters
- Interfaces are better for object shapes and declaration merging
- Type aliases are better for unions, tuples, and type transformations
- Choose based on your use case - both are powerful tools!

---

## 💡 Conclusion

Type aliases make your TypeScript code more expressive and maintainable. Understanding when to use type aliases versus interfaces will help you write cleaner, more professional code!

Happy coding with TypeScript! 🎉
