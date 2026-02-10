---
title: Mapped Types in TypeScript
description: Master mapped types in TypeScript. Learn how to transform existing types, use key remapping, template literal types, and understand how utility types work internally.
---

Welcome! Mapped types allow you to create new types by transforming properties of existing types. They're incredibly powerful! Let's dive in! 🚀

## What Are Mapped Types?

Mapped types transform each property of an existing type into a new property. Think of them as a `map()` function for types.

### Basic Syntax

```typescript
type MappedType<T> = {
  [K in keyof T]: NewType;
};
```

**Meaning**: For each key `K` in type `T`, create a new property with type `NewType`.

---

## Basic Mapped Types

### Making All Properties Optional

```typescript
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: string;
  name: string;
  email: string;
}

type PartialUser = MyPartial<User>;
// Result: { id?: string; name?: string; email?: string; }
```

### Making All Properties Required

```typescript
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = MyRequired<Config>;
// Result: { host: string; port: number; }
```

**Note**: The `-?` removes the optional modifier.

### Making All Properties Readonly

```typescript
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Settings {
  theme: string;
  language: string;
}

type ReadonlySettings = MyReadonly<Settings>;
// Result: { readonly theme: string; readonly language: string; }
```

---

## Removing Modifiers

### Removing `readonly`

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface LockedUser {
  readonly id: string;
  readonly name: string;
}

type MutableUser = Mutable<LockedUser>;
// Result: { id: string; name: string; }
```

### Modifier Combinations

```typescript
type MutableRequired<T> = {
  -readonly [K in keyof T]-?: T[K];
};

interface MaybeReadonly {
  readonly id?: string;
  readonly name?: string;
}

type FullyMutable = MutableRequired<MaybeReadonly>;
// Result: { id: string; name: string; }
```

---

## Key Remapping with `as`

The `as` clause allows you to rename or filter keys while mapping.

### Renaming Keys

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// Result: { getName: () => string; getAge: () => number; }
```

### Filtering Keys

```typescript
type RemoveId<T> = {
  [K in keyof T as K extends "id" ? never : K]: T[K];
};

interface Product {
  id: string;
  name: string;
  price: number;
}

type ProductWithoutId = RemoveId<Product>;
// Result: { name: string; price: number; }
```

### Filtering by Property Type

```typescript
type StringPropertiesOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Person {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

type PersonStrings = StringPropertiesOnly<Person>;
// Result: { name: string; email: string; }
```

---

## Template Literal Types in Mapped Types

Combine template literals with mapped types for powerful transformations.

### Event Handlers

```typescript
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (
    value: T[K]
  ) => void;
};

interface FormData {
  username: string;
  email: string;
  age: number;
}

type FormHandlers = EventHandlers<FormData>;
// Result: {
//   onUsernameChange: (value: string) => void;
//   onEmailChange: (value: string) => void;
//   onAgeChange: (value: number) => void;
// }
```

### Pluralization

```typescript
type Pluralize<T> = {
  [K in keyof T as `${string & K}s`]: T[K][];
};

interface Item {
  product: string;
  category: string;
}

type Items = Pluralize<Item>;
// Result: { products: string[]; categories: string[]; }
```

---

## Conditional Types with Mapped Types

Combine mapped types with conditional logic:

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] extends object ? Nullable<T[K]> : T[K] | null;
};

interface Config {
  server: {
    host: string;
    port: number;
  };
  timeout: number;
}

type NullableConfig = Nullable<Config>;
// Result: {
//   server: { host: string | null; port: number | null; };
//   timeout: number | null;
// }
```

---

## How Utility Types Work Internally

Understanding mapped types helps you see how built-in utility types work.

### `Partial<T>`

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

### `Required<T>`

```typescript
type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

### `Readonly<T>`

```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

### `Pick<T, K>`

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### `Omit<T, K>`

```typescript
type Omit<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

### `Record<K, T>`

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

---

## Advanced Patterns

### Deep Partial

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

type PartialNestedConfig = DeepPartial<NestedConfig>;
// All nested properties are optional
```

### Type-safe Property Paths

```typescript
type PropertyPaths<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? PropertyPaths<T[K], `${Prefix}${string & K}.`> | `${Prefix}${string & K}`
    : `${Prefix}${string & K}`;
}[keyof T];

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    theme: string;
  };
}

type UserPaths = PropertyPaths<User>;
// Result: "profile" | "profile.name" | "profile.age" | "settings" | "settings.theme"
```

---

## Practical Examples

### Form State Management

```typescript
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string | null;
    touched: boolean;
  };
};

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormState = FormState<LoginForm>;
// Result: {
//   email: { value: string; error: string | null; touched: boolean; };
//   password: { value: string; error: string | null; touched: boolean; };
// }
```

### API Response Wrappers

```typescript
type AsyncData<T> = {
  [K in keyof T]: {
    data: T[K] | null;
    loading: boolean;
    error: Error | null;
  };
};

interface UserData {
  profile: { name: string; email: string };
  posts: Array<{ title: string; content: string }>;
}

type AsyncUserData = AsyncData<UserData>;
// Each property is wrapped with loading state
```

### Validation Schema

```typescript
type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

const validationRules: ValidationRules<SignupForm> = {
  username: { required: true, minLength: 3, maxLength: 20 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 8 }
};
```

---

## Key Takeaways

- Mapped types transform properties of existing types
- Use `[K in keyof T]` to iterate over type keys
- Add/remove modifiers with `?`, `readonly`, `-?`, `-readonly`
- Key remapping with `as` allows filtering and renaming
- Template literal types enable dynamic key transformations
- Mapped types power many built-in utility types
- Combine with conditional types for complex transformations

---

## 💡 Conclusion

Mapped types are one of TypeScript's most powerful features for type transformations. Understanding them deeply will help you create sophisticated, reusable type utilities and better understand how TypeScript's built-in types work!

Happy coding with TypeScript! 🎉
