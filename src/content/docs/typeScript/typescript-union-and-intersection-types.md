---
title: Union and Intersection Types in TypeScript
description: Master union and intersection types in TypeScript. Learn type narrowing, discriminated unions, and practical use cases for combining types.
---

Welcome! Union and intersection types are powerful features that let you combine types in flexible ways. This guide will show you how to use them effectively! 🚀

## Union Types

Union types allow a value to be **one of several types**.

### Basic Union Syntax

Use the `|` (pipe) operator to create union types:

```typescript
type ID = string | number;

let userId: ID = "user-123"; // ✅ Ok
userId = 456; // ✅ Ok
// userId = true; // ❌ Error: boolean is not assignable
```

### Common Use Cases

```typescript
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending"; // ✅ Ok
// orderStatus = "cancelled"; // ❌ Error: Not in union

type ResponseData = string | null;

let response: ResponseData = "Success";
response = null; // ✅ Ok
```

### Union with Multiple Types

```typescript
type MixedValue = string | number | boolean;

let value: MixedValue = "hello";
value = 42;
value = true; // All valid!
```

---

## Type Narrowing

When working with unions, TypeScript needs to know which specific type you're using. This is called **type narrowing**.

### Using `typeof`

```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript knows it's a string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's a number
  }
}

printValue("hello"); // "HELLO"
printValue(3.14159); // "3.14"
```

### Using `instanceof`

```typescript
function process(input: Date | string) {
  if (input instanceof Date) {
    console.log(input.getFullYear()); // TypeScript knows it's a Date
  } else {
    console.log(input.toUpperCase()); // TypeScript knows it's a string
  }
}
```

### Using `in` Operator

```typescript
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}
```

---

## Discriminated Unions

Discriminated unions use a **common property** to distinguish between types. This is a powerful pattern!

### Basic Example

```typescript
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log("Data:", response.data); // TypeScript knows it's SuccessResponse
  } else {
    console.log("Error:", response.message); // TypeScript knows it's ErrorResponse
  }
}
```

### Advanced Discriminated Union

```typescript
type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

let circle: Circle = { kind: "circle", radius: 5 };
console.log(calculateArea(circle)); // 78.54
```

---

## Intersection Types

Intersection types combine **multiple types into one**. The result has all properties from all types.

### Basic Intersection Syntax

Use the `&` (ampersand) operator:

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type Staff = Person & Employee;

let staff: Staff = {
  name: "Alice",
  age: 30,
  employeeId: "E123",
  department: "Engineering"
};
```

### Combining Interfaces

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type User = HasName & HasAge;

let user: User = {
  name: "Bob",
  age: 25
};
```

### Intersection with Functions

```typescript
type Logger = {
  log: (message: string) => void;
};

type Formatter = {
  format: (data: any) => string;
};

type LoggerWithFormatter = Logger & Formatter;

let consoleLogger: LoggerWithFormatter = {
  log: (msg) => console.log(msg),
  format: (data) => JSON.stringify(data)
};
```

---

## Union vs Intersection

Understanding the difference is crucial:

| Feature | Union (`|`) | Intersection (`&`) |
|---------|-------------|-------------------|
| **Meaning** | Value can be **one of** the types | Value must have **all** properties |
| **Properties** | Only common properties accessible | All properties from all types |
| **Use Case** | Value could be different types | Combining multiple behaviors |

### Union Example

```typescript
type A = { name: string };
type B = { age: number };

type UnionType = A | B;

let value1: UnionType = { name: "Alice" }; // ✅ Ok (only A)
let value2: UnionType = { age: 25 }; // ✅ Ok (only B)
let value3: UnionType = { name: "Bob", age: 30 }; // ✅ Ok (both)
```

### Intersection Example

```typescript
type A = { name: string };
type B = { age: number };

type IntersectionType = A & B;

let value: IntersectionType = { name: "Alice", age: 25 }; // ✅ Must have both
// let invalid: IntersectionType = { name: "Bob" }; // ❌ Error: missing 'age'
```

---

## Practical Examples

### Form State Management

```typescript
type IdleState = { status: "idle" };
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: any };
type ErrorState = { status: "error"; error: string };

type FormState = IdleState | LoadingState | SuccessState | ErrorState;

function renderForm(state: FormState) {
  switch (state.status) {
    case "idle":
      return "Ready to submit";
    case "loading":
      return "Submitting...";
    case "success":
      return `Success: ${state.data}`;
    case "error":
      return `Error: ${state.error}`;
  }
}
```

### API Request/Response

```typescript
type BaseRequest = {
  timestamp: number;
  userId: string;
};

type PostData = {
  method: "POST";
  body: string;
};

type GetData = {
  method: "GET";
  params: Record<string, string>;
};

type ApiRequest = BaseRequest & (PostData | GetData);

let postRequest: ApiRequest = {
  timestamp: Date.now(),
  userId: "123",
  method: "POST",
  body: JSON.stringify({ name: "Alice" })
};
```

### User Permissions

```typescript
type ReadPermission = { canRead: true };
type WritePermission = { canWrite: true };
type DeletePermission = { canDelete: true };

type AdminUser = ReadPermission & WritePermission & DeletePermission;
type EditorUser = ReadPermission & WritePermission;
type ViewerUser = ReadPermission;

let admin: AdminUser = {
  canRead: true,
  canWrite: true,
  canDelete: true
};
```

---

## Key Takeaways

- **Union types** (`|`) represent a value that can be one of several types
- **Intersection types** (`&`) combine multiple types into one
- Use **type narrowing** (`typeof`, `instanceof`, `in`) to work with unions safely
- **Discriminated unions** use a common property (like `status` or `kind`) for type narrowing
- Unions are for "either/or" scenarios, intersections for "all together" scenarios
- These patterns enable flexible, type-safe code

---

## 💡 Conclusion

Union and intersection types are fundamental to writing expressive TypeScript code. Mastering them will help you model complex data structures and create robust type-safe applications!

Happy coding with TypeScript! 🎉
