---
title: Readonly and Const Assertions in TypeScript
description: Learn how to create immutable data structures in TypeScript using readonly modifiers, ReadonlyArray, const assertions, and deep readonly patterns.
---

Welcome! Immutability is a key concept in writing predictable, bug-free code. This guide will show you how to use `readonly` and `const` assertions in TypeScript! 🚀

## The `readonly` Modifier

The `readonly` modifier prevents properties from being modified after initialization.

### Basic Usage

```typescript
interface User {
  readonly id: string;
  name: string;
  readonly createdAt: Date;
}

let user: User = {
  id: "123",
  name: "Alice",
  createdAt: new Date()
};

user.name = "Bob"; // ✅ Ok
// user.id = "456"; // ❌ Error: Cannot assign to 'id' because it is a read-only property
// user.createdAt = new Date(); // ❌ Error: Cannot assign to 'createdAt'
```

### With Classes

```typescript
class Product {
  readonly id: string;
  readonly createdAt: Date;
  price: number;

  constructor(id: string, price: number) {
    this.id = id;
    this.createdAt = new Date();
    this.price = price;
  }

  updatePrice(newPrice: number) {
    this.price = newPrice; // ✅ Ok
    // this.id = "new-id"; // ❌ Error: Cannot assign to readonly property
  }
}
```

### Parameter Properties

```typescript
class Person {
  constructor(
    public readonly name: string,
    public age: number
  ) {}
}

let person = new Person("Alice", 25);
console.log(person.name); // "Alice"
// person.name = "Bob"; // ❌ Error: Cannot assign to readonly property
person.age = 26; // ✅ Ok
```

---

## Readonly Arrays

### Using `readonly` Modifier

```typescript
let numbers: readonly number[] = [1, 2, 3, 4, 5];

console.log(numbers[0]); // ✅ Ok: Can read
console.log(numbers.length); // ✅ Ok: Can access properties

// ❌ Error: Cannot modify
// numbers.push(6);
// numbers.pop();
// numbers[0] = 10;

// ✅ Ok: Non-mutating methods
let doubled = numbers.map(n => n * 2);
let filtered = numbers.filter(n => n > 2);
```

### Using `ReadonlyArray<T>`

```typescript
let colors: ReadonlyArray<string> = ["red", "green", "blue"];

console.log(colors[0]); // ✅ Ok
// colors.push("yellow"); // ❌ Error: Property 'push' does not exist
// colors[0] = "purple"; // ❌ Error: Index signature is readonly

// ✅ Creating a new array is fine
let moreColors = [...colors, "yellow"];
```

### Converting Arrays

```typescript
let mutableArray = [1, 2, 3];
let readonlyArray: readonly number[] = mutableArray;

// readonlyArray.push(4); // ❌ Error
// But the original array can still be modified
mutableArray.push(4); // ✅ Ok
console.log(readonlyArray); // [1, 2, 3, 4]
```

---

## Const Assertions

The `as const` assertion makes values **deeply readonly** and infers literal types.

### Basic Const Assertion

```typescript
// Without as const
let status1 = "pending"; // Type: string

// With as const
let status2 = "pending" as const; // Type: "pending"

// status2 = "approved"; // ❌ Error: Cannot assign, it's the literal "pending"
```

### With Objects

```typescript
// Without as const
let user1 = {
  name: "Alice",
  role: "admin"
};
// Type: { name: string; role: string; }
user1.name = "Bob"; // ✅ Ok

// With as const
let user2 = {
  name: "Alice",
  role: "admin"
} as const;
// Type: { readonly name: "Alice"; readonly role: "admin"; }
// user2.name = "Bob"; // ❌ Error: Cannot assign to readonly property
```

### With Arrays

```typescript
// Without as const
let colors1 = ["red", "green", "blue"];
// Type: string[]
colors1.push("yellow"); // ✅ Ok

// With as const
let colors2 = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]
// colors2.push("yellow"); // ❌ Error
// Type is now a readonly tuple with literal types!
```

### With Nested Structures

```typescript
let config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  },
  endpoints: ["users", "posts", "comments"]
} as const;

// All properties are deeply readonly
// config.apiUrl = "new-url"; // ❌ Error
// config.headers["Content-Type"] = "text/html"; // ❌ Error
// config.endpoints.push("photos"); // ❌ Error
```

---

## When to Use Readonly

### Configuration Objects

```typescript
const AppConfig = {
  API_BASE_URL: "https://api.example.com",
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
  ENVIRONMENTS: ["development", "staging", "production"]
} as const;

// AppConfig.API_BASE_URL = "other"; // ❌ Error
```

### Enum-like Constants

```typescript
const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];
// Type: 200 | 201 | 400 | 401 | 404 | 500

function handleStatus(code: HttpStatusCode) {
  // code can only be one of the defined status codes
}
```

### Lookup Objects

```typescript
const UserRoles = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer"
} as const;

type UserRole = typeof UserRoles[keyof typeof UserRoles];
// Type: "admin" | "editor" | "viewer"

function checkPermission(role: UserRole) {
  if (role === UserRoles.ADMIN) {
    // TypeScript knows this is "admin"
  }
}
```

---

## Deep Readonly Types

For complex nested structures, you can create a deep readonly type:

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    host: string;
    name: string;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;

let config: ReadonlyConfig = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: {
      enabled: true,
      cert: "/path/to/cert"
    }
  },
  database: {
    host: "localhost",
    name: "mydb"
  }
};

// All deeply nested properties are readonly
// config.server.host = "newhost"; // ❌ Error
// config.server.ssl.enabled = false; // ❌ Error
```

---

## Readonly vs Const Assertion

| Feature | `readonly` | `as const` |
|---------|-----------|------------|
| **Scope** | Individual properties | Entire value |
| **Depth** | Shallow (one level) | Deep (all levels) |
| **Type inference** | Normal type inference | Literal type inference |
| **Use case** | Prevent property modification | Create immutable constants |

### Examples Comparison

```typescript
// readonly: Only prevents reassignment at one level
interface User {
  readonly info: {
    name: string;
  };
}

let user: User = { info: { name: "Alice" } };
// user.info = { name: "Bob" }; // ❌ Error
user.info.name = "Bob"; // ✅ Ok (nested property is mutable)

// as const: Deep immutability + literal types
let constUser = {
  info: {
    name: "Alice"
  }
} as const;

// constUser.info = { name: "Bob" }; // ❌ Error
// constUser.info.name = "Bob"; // ❌ Error (all levels are readonly)
```

---

## Practical Examples

### React Component Props

```typescript
interface ButtonProps {
  readonly label: string;
  readonly onClick: () => void;
  readonly variant?: "primary" | "secondary";
}

function Button(props: ButtonProps) {
  // props.label = "New Label"; // ❌ Error: Cannot modify props
  return `<button>${props.label}</button>`;
}
```

### Redux-like State

```typescript
interface AppState {
  readonly user: {
    readonly id: string;
    readonly name: string;
  };
  readonly isLoading: boolean;
}

function updateState(state: AppState, newName: string): AppState {
  // Must return new object, cannot mutate
  return {
    ...state,
    user: {
      ...state.user,
      name: newName
    }
  };
}
```

---

## Key Takeaways

- Use `readonly` modifier to prevent property reassignment
- `ReadonlyArray<T>` or `readonly T[]` prevents array mutations
- `as const` creates deeply immutable values with literal types
- Const assertions are perfect for configuration objects and constants
- Readonly properties promote immutability and prevent bugs
- Choose between `readonly` and `as const` based on your needs

---

## 💡 Conclusion

Immutability is a powerful concept that leads to more predictable code. Using `readonly` and `const` assertions in TypeScript helps you write safer, more maintainable applications!

Happy coding with TypeScript! 🎉
