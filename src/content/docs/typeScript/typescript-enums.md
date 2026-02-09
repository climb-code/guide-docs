---
title: Enums in TypeScript
description: Master enums in TypeScript. Learn about numeric enums, string enums, heterogeneous enums, const enums, and when to use enums vs literal types.
---

Welcome! Enums (short for "enumerations") allow you to define a set of named constants. This guide will show you how to use them effectively! 🚀

## What Are Enums?

Enums allow you to define a collection of related values that can be referred to by name. They make your code more readable and self-documenting.

### Basic Syntax

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let playerDirection: Direction = Direction.Up;
console.log(playerDirection); // 0
```

---

## Numeric Enums

By default, enums are **numeric** and start counting from `0`.

### Auto-incrementing Values

```typescript
enum Status {
  Pending,   // 0
  Approved,  // 1
  Rejected   // 2
}

console.log(Status.Pending);  // 0
console.log(Status.Approved); // 1
console.log(Status.Rejected); // 2
```

### Custom Starting Value

```typescript
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}

console.log(HttpStatus.OK);         // 200
console.log(HttpStatus.NotFound);   // 404
```

### Partially Initialized

```typescript
enum Level {
  Low = 1,
  Medium,    // 2 (auto-incremented)
  High,      // 3 (auto-incremented)
  Critical = 10,
  Emergency  // 11 (auto-incremented)
}

console.log(Level.Medium);    // 2
console.log(Level.Emergency); // 11
```

---

## String Enums

String enums provide more meaningful runtime values and better debugging experience.

### Basic String Enum

```typescript
enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
  Debug = "DEBUG"
}

console.log(LogLevel.Info);    // "INFO"
console.log(LogLevel.Error);   // "ERROR"
```

### Practical Example

```typescript
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
  Guest = "GUEST"
}

function checkPermission(role: UserRole) {
  if (role === UserRole.Admin) {
    console.log("Full access granted");
  } else if (role === UserRole.Editor) {
    console.log("Edit access granted");
  } else {
    console.log("Read-only access");
  }
}

checkPermission(UserRole.Admin);
```

---

## Heterogeneous Enums

You can mix string and number values, though this is rarely recommended.

```typescript
enum Mixed {
  No = 0,
  Yes = "YES"
}

console.log(Mixed.No);  // 0
console.log(Mixed.Yes); // "YES"
```

**Note**: Heterogeneous enums can be confusing. Stick to either numeric or string enums for clarity.

---

## Reverse Mappings

Numeric enums have **reverse mappings** - you can get the name from the value.

```typescript
enum Color {
  Red,    // 0
  Green,  // 1
  Blue    // 2
}

console.log(Color.Red);      // 0
console.log(Color[0]);       // "Red" (reverse mapping)
console.log(Color[1]);       // "Green"
```

**String enums do NOT have reverse mappings**:

```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

console.log(Status.Active);     // "ACTIVE"
console.log(Status["ACTIVE"]);  // undefined (no reverse mapping)
```

---

## Computed and Constant Members

Enums can have computed values:

```typescript
enum FileAccess {
  None = 0,
  Read = 1 << 0,      // 1
  Write = 1 << 1,     // 2
  ReadWrite = Read | Write,  // 3
  Execute = 1 << 2    // 4
}

console.log(FileAccess.Read);      // 1
console.log(FileAccess.Write);     // 2
console.log(FileAccess.ReadWrite); // 3
console.log(FileAccess.Execute);   // 4
```

---

## Const Enums

Const enums are **completely removed** during compilation for better performance.

### Regular Enum (Runtime Code)

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir = Direction.Up;

// Compiles to:
// var Direction;
// (function (Direction) {
//     Direction[Direction["Up"] = 0] = "Up";
//     Direction[Direction["Down"] = 1] = "Down";
//     ...
// })(Direction || (Direction = {}));
// var dir = Direction.Up;
```

### Const Enum (Inlined)

```typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir = Direction.Up;

// Compiles to:
// var dir = 0; // Value is inlined!
```

### Benefits of Const Enums

- **Smaller bundle size** - no runtime enum object
- **Better performance** - values are inlined
- **Use when** - you don't need reverse mappings or runtime enum objects

```typescript
const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

function makeRequest(method: HttpMethod) {
  console.log(`Making ${method} request`);
}

makeRequest(HttpMethod.GET); // Inlined as: makeRequest("GET")
```

---

## Enums vs Literal Types

You can often use **union of literal types** instead of enums.

### Using Enum

```typescript
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

function updateStatus(status: Status) {
  console.log(status);
}

updateStatus(Status.Pending);
```

### Using Literal Types

```typescript
type Status = "PENDING" | "APPROVED" | "REJECTED";

function updateStatus(status: Status) {
  console.log(status);
}

updateStatus("PENDING");
```

### Comparison

| Feature | Enums | Literal Types |
|---------|-------|---------------|
| **Namespace** | Yes (`Status.Pending`) | No (just `"PENDING"`) |
| **Runtime object** | Yes (numeric enums) | No |
| **Auto-complete** | Yes | Yes |
| **Reverse mapping** | Yes (numeric only) | No |
| **Compile size** | Larger (unless const enum) | Smaller |
| **Use case** | Need namespace or reverse mapping | Simpler, lightweight |

---

## When to Use Enums

### ✅ Use Enums When:

- You need a **namespace** for related constants
- You want **reverse mappings** (numeric enums)
- You're working with **flags/bitmasks**
- You need **better IDE support** with autocomplete

```typescript
enum Permission {
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  Execute = 1 << 2  // 4
}

let userPermission = Permission.Read | Permission.Write; // 3
```

### ✅ Use Literal Types When:

- You want a **lightweight** solution
- You don't need reverse mappings
- You prefer **plain values** over namespaced constants
- You want to avoid runtime code

```typescript
type Theme = "light" | "dark" | "auto";
let currentTheme: Theme = "dark";
```

---

## Practical Examples

### API Response Status

```typescript
enum ApiStatus {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR"
}

interface ApiState {
  status: ApiStatus;
  data: any;
  error: string | null;
}

let state: ApiState = {
  status: ApiStatus.Loading,
  data: null,
  error: null
};
```

### Game Directions

```typescript
enum Direction {
  North = 0,
  East = 90,
  South = 180,
  West = 270
}

function move(direction: Direction) {
  console.log(`Moving ${Direction[direction]} at ${direction} degrees`);
}

move(Direction.North); // "Moving North at 0 degrees"
```

### Feature Flags

```typescript
const enum FeatureFlags {
  DarkMode = "dark_mode",
  BetaFeatures = "beta_features",
  Analytics = "analytics",
  Notifications = "notifications"
}

function isFeatureEnabled(flag: FeatureFlags): boolean {
  // Check if feature is enabled
  return true;
}

if (isFeatureEnabled(FeatureFlags.DarkMode)) {
  console.log("Dark mode is on");
}
```

---

## Key Takeaways

- Enums define a set of named constants
- **Numeric enums** auto-increment and support reverse mappings
- **String enums** are more debuggable and don't have reverse mappings
- **Const enums** are inlined at compile time for better performance
- Use **enums** when you need namespaces or reverse mappings
- Use **literal types** for lightweight, simple use cases
- Avoid mixing string and number values (heterogeneous enums)

---

## 💡 Conclusion

Enums are a powerful tool for defining named constants in TypeScript. Understanding when to use enums versus literal types will help you write cleaner, more maintainable code!

Happy coding with TypeScript! 🎉
