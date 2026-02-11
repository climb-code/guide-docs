---
title: Advanced TypeScript Patterns
description: Master advanced TypeScript patterns including builder pattern, factory pattern, branded types, recursive types, and template literal types for building sophisticated applications.
---

Welcome! This guide covers advanced TypeScript patterns that will help you build more sophisticated, type-safe applications. Let's explore them! 🚀

## Builder Pattern with Types

The builder pattern creates complex objects step by step with full type safety.

### Basic Builder

```typescript
interface User {
  name: string;
  email: string;
  age?: number;
  role?: string;
}

class UserBuilder {
  private user: Partial<User> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  setRole(role: string): this {
    this.user.role = role;
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.email) {
      throw new Error("Name and email are required");
    }
    return this.user as User;
  }
}

// Usage
const user = new UserBuilder()
  .setName("Alice")
  .setEmail("alice@example.com")
  .setAge(25)
  .build();
```

### Type-safe Required Fields

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

class TypeSafeBuilder<T, R extends keyof T = never> {
  private data: Partial<T> = {};

  set<K extends keyof T>(
    key: K,
    value: T[K]
  ): TypeSafeBuilder<T, R | K> {
    this.data[key] = value;
    return this as any;
  }

  build(
    this: TypeSafeBuilder<T, RequiredKeys<T>>
  ): T {
    return this.data as T;
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

const product = new TypeSafeBuilder<Product>()
  .set("id", "123")
  .set("name", "Widget")
  .set("price", 29.99)
  .build(); // ✅ Ok

// const invalid = new TypeSafeBuilder<Product>()
//   .set("id", "123")
//   .build(); // ❌ Error: Missing required fields
```

---

## Factory Pattern with Generics

Create objects with type-safe factory functions.

### Simple Factory

```typescript
interface Animal {
  type: string;
  sound(): string;
}

class Dog implements Animal {
  type = "dog";
  sound() {
    return "Woof!";
  }
}

class Cat implements Animal {
  type = "cat";
  sound() {
    return "Meow!";
  }
}

class AnimalFactory {
  static create(type: "dog" | "cat"): Animal {
    switch (type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
    }
  }
}

const dog = AnimalFactory.create("dog");
console.log(dog.sound()); // "Woof!"
```

### Generic Factory

```typescript
type Constructor<T> = new (...args: any[]) => T;

class GenericFactory {
  static create<T>(ctor: Constructor<T>, ...args: any[]): T {
    return new ctor(...args);
  }
}

class User {
  constructor(public name: string, public email: string) {}
}

class Product {
  constructor(public id: string, public price: number) {}
}

const user = GenericFactory.create(User, "Alice", "alice@example.com");
const product = GenericFactory.create(Product, "123", 29.99);
```

---

## Branded Types (Nominal Typing)

Create distinct types from the same primitive type.

### Basic Branded Type

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

function getUser(userId: UserId): void {
  console.log(`Getting user: ${userId}`);
}

const userId = createUserId("user-123");
const productId = createProductId("product-456");

getUser(userId); // ✅ Ok
// getUser(productId); // ❌ Error: ProductId is not assignable to UserId
```

### Branded Primitive Types

```typescript
type PositiveNumber = Brand<number, "Positive">;
type Email = Brand<string, "Email">;
type UUID = Brand<string, "UUID">;

function createPositiveNumber(n: number): PositiveNumber {
  if (n <= 0) throw new Error("Number must be positive");
  return n as PositiveNumber;
}

function createEmail(email: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email");
  }
  return email as Email;
}

function sendEmail(to: Email, subject: string): void {
  console.log(`Sending email to ${to}: ${subject}`);
}

const email = createEmail("alice@example.com");
sendEmail(email, "Hello!"); // ✅ Ok
// sendEmail("invalid", "Hello!"); // ❌ Error
```

---

## Type-safe Event Emitters

Create event emitters with full type safety.

```typescript
type EventMap = Record<string, any>;

class TypedEventEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  off<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      this.listeners[event] = eventListeners.filter(l => l !== listener) as any;
    }
  }
}

// Usage
interface AppEvents {
  userLoggedIn: { userId: string; timestamp: number };
  userLoggedOut: { userId: string };
  dataReceived: { data: any[] };
}

const emitter = new TypedEventEmitter<AppEvents>();

emitter.on("userLoggedIn", (data) => {
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit("userLoggedIn", { userId: "123", timestamp: Date.now() });
// emitter.emit("userLoggedIn", { userId: "123" }); // ❌ Error: Missing timestamp
```

---

## Recursive Types

Create types that reference themselves.

### JSON Type

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const validJSON: JSONValue = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "coding"],
  address: {
    city: "New York",
    zipCode: 10001
  }
};
```

### Tree Structure

```typescript
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3 }
  ]
};

function traverse<T>(node: TreeNode<T>): void {
  console.log(node.value);
  node.children?.forEach(traverse);
}
```

### Deep Partial

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
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
    url: string;
  };
}

const partialConfig: DeepPartial<Config> = {
  server: {
    port: 3000 // Other nested fields are optional
  }
};
```

---

## Template Literal Types

Create string types with powerful transformations.

### String Manipulation

```typescript
type Uppercase<S extends string> = Intrinsic;
type Lowercase<S extends string> = Intrinsic;
type Capitalize<S extends string> = Intrinsic;
type Uncapitalize<S extends string> = Intrinsic;

type Greeting = "hello world";
type Loud = Uppercase<Greeting>;        // "HELLO WORLD"
type Quiet = Lowercase<Greeting>;       // "hello world"
type Capitalized = Capitalize<Greeting>; // "Hello world"
```

### Route Paths

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type API = "users" | "products" | "orders";

type Endpoint = `${HTTPMethod} /${API}`;
// Result: "GET /users" | "GET /products" | ... | "DELETE /orders"

type Routes<T extends string> = `/${T}` | `/${T}/:id`;
type UserRoutes = Routes<"users" | "products">;
// Result: "/users" | "/users/:id" | "/products" | "/products/:id"
```

### CSS Properties

```typescript
type CSSProperty =
  | "color"
  | "background-color"
  | "font-size"
  | "border-radius";

type CSSVar = `--${CSSProperty}`;
// Result: "--color" | "--background-color" | "--font-size" | "--border-radius"

type Theme = {
  [K in CSSVar]: string;
};

const theme: Theme = {
  "--color": "#333",
  "--background-color": "#fff",
  "--font-size": "16px",
  "--border-radius": "4px"
};
```

### Event Names

```typescript
type EventName = "click" | "focus" | "blur";
type Element = "button" | "input" | "form";

type ElementEvent = `${Element}:${EventName}`;
// Result: "button:click" | "button:focus" | ... | "form:blur"

interface EventHandlers {
  [K in ElementEvent]: (event: Event) => void;
}
```

---

## Type-safe State Machines

Implement state machines with TypeScript.

```typescript
type State = "idle" | "loading" | "success" | "error";

type Event =
  | { type: "FETCH" }
  | { type: "RESOLVE"; data: any }
  | { type: "REJECT"; error: string }
  | { type: "RESET" };

type StateTransitions = {
  idle: { FETCH: "loading" };
  loading: { RESOLVE: "success"; REJECT: "error" };
  success: { RESET: "idle" };
  error: { RESET: "idle"; FETCH: "loading" };
};

type ValidEvent<S extends State> = {
  [E in Event["type"]]: Extract<Event, { type: E }> extends infer Ev
    ? E extends keyof StateTransitions[S]
      ? Ev
      : never
    : never;
}[Event["type"]];

class StateMachine<S extends State = "idle"> {
  constructor(public state: S) {}

  transition<E extends ValidEvent<S>>(
    event: E
  ): StateMachine<StateTransitions[S][E["type"]]> {
    // Transition logic here
    return new StateMachine("loading" as any);
  }
}

const machine = new StateMachine("idle");
const loading = machine.transition({ type: "FETCH" });
const success = loading.transition({ type: "RESOLVE", data: {} });
// const invalid = machine.transition({ type: "RESOLVE", data: {} }); // ❌ Error
```

---

## Key Takeaways

- Builder pattern provides fluent, type-safe object construction
- Factory pattern with generics creates flexible object creation
- Branded types prevent mixing similar primitive types
- Type-safe event emitters ensure correct event/data pairing
- Recursive types model self-referential data structures
- Template literal types enable powerful string type manipulation
- State machines with types enforce valid state transitions

---

## 💡 Conclusion

Advanced TypeScript patterns unlock powerful abstractions and type safety. Start simple and gradually adopt these patterns as your applications grow in complexity!

Happy coding with TypeScript! 🎉
