---
title: Conditional Types in TypeScript
description: Master conditional types in TypeScript. Learn the conditional type syntax, infer keyword, distributive behavior, and how to build advanced utility types.
---

Welcome! Conditional types are one of TypeScript's most powerful advanced features. They allow you to create types that depend on conditions. Let's explore them! 🚀

## What Are Conditional Types?

Conditional types select one of two possible types based on a condition, similar to the ternary operator in JavaScript.

### Basic Syntax

```typescript
T extends U ? X : Y
```

**Meaning**: If type `T` extends (is assignable to) type `U`, the result is `X`, otherwise it's `Y`.

### Simple Example

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<"hello">; // true
```

---

## Basic Conditional Types

### Checking Type Compatibility

```typescript
type IsNumber<T> = T extends number ? "yes" : "no";

type Test1 = IsNumber<42>;      // "yes"
type Test2 = IsNumber<"hello">; // "no"
type Test3 = IsNumber<boolean>; // "no"
```

### Extracting Types

```typescript
type ArrayElementType<T> = T extends Array<infer E> ? E : T;

type Num = ArrayElementType<number[]>;     // number
type Str = ArrayElementType<string[]>;     // string
type NotArray = ArrayElementType<boolean>; // boolean
```

---

## The `infer` Keyword

The `infer` keyword allows you to **extract** types from within a conditional type.

### Basic Inference

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func1 = () => string;
type Func2 = () => number;
type Func3 = (x: number) => boolean;

type R1 = GetReturnType<Func1>; // string
type R2 = GetReturnType<Func2>; // number
type R3 = GetReturnType<Func3>; // boolean
```

### Inferring Function Parameters

```typescript
type GetFirstParameter<T> = T extends (first: infer F, ...args: any[]) => any
  ? F
  : never;

type Func = (name: string, age: number) => void;
type First = GetFirstParameter<Func>; // string
```

### Inferring from Promises

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type AsyncString = UnwrapPromise<Promise<string>>; // string
type SyncNumber = UnwrapPromise<number>;           // number
```

---

## Distributive Conditional Types

When a conditional type is applied to a **union type**, it distributes over each member.

### Basic Distribution

```typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// Expands to: ToArray<string> | ToArray<number>
// Result: string[] | number[]
```

### Filtering Types from Unions

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Example = NonNullable<string | number | null | undefined>;
// Result: string | number
```

### Excluding Types

```typescript
type Exclude<T, U> = T extends U ? never : T;

type Numbers = 1 | 2 | 3 | 4;
type Odd = Exclude<Numbers, 2 | 4>; // 1 | 3
```

---

## Building Utility Types

### Custom `Omit` Type

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = MyOmit<User, "password">;
// Result: { id: string; name: string; email: string; }
```

### Custom `Pick` Type

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserCredentials = MyPick<User, "email" | "password">;
// Result: { email: string; password: string; }
```

### Extract Async Function Return Types

```typescript
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

async function fetchUser() {
  return { id: 1, name: "Alice" };
}

type UserData = AsyncReturnType<typeof fetchUser>;
// Result: { id: number; name: string; }
```

---

## Nested Conditional Types

You can nest conditional types for more complex logic:

```typescript
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T1 = TypeName<string>;    // "string"
type T2 = TypeName<42>;        // "number"
type T3 = TypeName<true>;      // "boolean"
type T4 = TypeName<() => void>; // "function"
```

---

## Practical Examples

### Form Field Types

```typescript
type FieldValue<T> = T extends "text" | "email"
  ? string
  : T extends "number"
  ? number
  : T extends "checkbox"
  ? boolean
  : never;

type TextValue = FieldValue<"text">;     // string
type NumberValue = FieldValue<"number">; // number
type CheckValue = FieldValue<"checkbox">; // boolean
```

### API Response Types

```typescript
type ApiResponse<T extends "success" | "error"> = T extends "success"
  ? { status: "success"; data: any }
  : { status: "error"; message: string };

type SuccessResponse = ApiResponse<"success">;
// Result: { status: "success"; data: any; }

type ErrorResponse = ApiResponse<"error">;
// Result: { status: "error"; message: string; }
```

### Deep Readonly

```typescript
type DeepReadonly<T> = T extends any[]
  ? ReadonlyArray<DeepReadonly<T[number]>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface Config {
  server: {
    port: number;
    host: string;
  };
  features: string[];
}

type ReadonlyConfig = DeepReadonly<Config>;
// All nested properties are readonly
```

---

## Advanced Patterns

### Extract Object Keys by Value Type

```typescript
type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Person {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

type StringKeys = KeysOfType<Person, string>; // "name" | "email"
type NumberKeys = KeysOfType<Person, number>; // "age"
```

### Function Overload Types

```typescript
type OverloadedFunction = {
  (x: string): string;
  (x: number): number;
};

type GetOverloadReturnType<T, Args> = T extends {
  (args: Args): infer R;
}
  ? R
  : never;

type StringReturn = GetOverloadReturnType<OverloadedFunction, string>; // string
type NumberReturn = GetOverloadReturnType<OverloadedFunction, number>; // number
```

---

## Common Built-in Conditional Types

TypeScript includes several built-in conditional utility types:

### `Exclude<T, U>`

```typescript
type T = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
```

### `Extract<T, U>`

```typescript
type T = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

### `NonNullable<T>`

```typescript
type T = NonNullable<string | number | undefined>; // string | number
```

### `ReturnType<T>`

```typescript
function getUser() {
  return { id: 1, name: "Alice" };
}

type User = ReturnType<typeof getUser>;
// Result: { id: number; name: string; }
```

### `Parameters<T>`

```typescript
function createUser(name: string, age: number) {
  return { name, age };
}

type Params = Parameters<typeof createUser>; // [string, number]
```

---

## When to Use Conditional Types

### ✅ Use Conditional Types When:

- Creating generic utility types
- Extracting types from complex structures
- Type transformations based on conditions
- Building type-safe APIs with dynamic behavior

### ⚠️ Avoid Overusing:

- Don't make types too complex and unreadable
- Simple cases often don't need conditional types
- Consider if a union type or function overload is simpler

---

## Key Takeaways

- Conditional types use `T extends U ? X : Y` syntax
- The `infer` keyword extracts types within conditions
- Conditional types distribute over union types
- They're the foundation of many utility types
- Use them to create flexible, reusable type utilities
- Keep conditional types readable and well-documented

---

## 💡 Conclusion

Conditional types unlock advanced type-level programming in TypeScript. While they can be complex, mastering them allows you to build incredibly powerful and type-safe abstractions!

Happy coding with TypeScript! 🎉
