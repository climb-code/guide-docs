---
title: Static and Final Keywords in Java
description: Learn how the static and final keywords work in Java - static fields, methods, blocks and nested classes, plus final variables, methods and classes with practical examples.
---

Two of the most common modifiers in Java are `static` and `final`. They answer two different questions:

- `static` asks **who owns this member** - the class itself, or each object?
- `final` asks **can this be changed** - once set, is it locked?

They are unrelated keywords, but they appear together so often (`static final`) that it helps to learn them side by side.

---

## The `static` Keyword

A `static` member belongs to the **class**, not to any single object. There is exactly one copy of it, shared by every instance.

```java
class Counter {
    static int totalCreated = 0;   // one copy, shared
    int id;                        // one copy per object

    Counter() {
        totalCreated++;
        id = totalCreated;
    }
}
```

```java
Counter a = new Counter();
Counter b = new Counter();
Counter c = new Counter();

System.out.println(a.id);                  // 1
System.out.println(c.id);                  // 3
System.out.println(Counter.totalCreated);  // 3
```

Each object got its own `id`, but all three shared the same `totalCreated`.

### Accessing static members

Always access a static member through the class name, not through an object.

```java
Counter.totalCreated;   // clear and correct
a.totalCreated;         // works, but misleading - avoid this
```

---

## Static Methods

A static method can be called without creating an object.

```java
class MathUtils {
    static int square(int n) {
        return n * n;
    }
}

int result = MathUtils.square(5);   // 25, no object needed
```

This is why utility classes such as `Math`, `Arrays` and `Collections` are full of static methods. You never write `new Math()`.

### The rule static methods must follow

A static method runs without any object, so there is no `this`. That means it **cannot touch instance fields or instance methods directly**.

```java
class Example {
    int instanceValue = 10;
    static int staticValue = 20;

    static void show() {
        System.out.println(staticValue);     // fine
        // System.out.println(instanceValue); // compile error
    }
}
```

To use instance data from a static method, pass an object in:

```java
static void show(Example e) {
    System.out.println(e.instanceValue);   // fine
}
```

The reverse is always allowed - an instance method can freely read static members.

---

## Static Blocks

A static block runs **once**, when the class is first loaded, before any object exists. It is used to set up static data that needs more than a single expression.

```java
class Config {
    static Map<String, String> defaults;

    static {
        defaults = new HashMap<>();
        defaults.put("host", "localhost");
        defaults.put("port", "8080");
        System.out.println("Config loaded");
    }
}
```

`"Config loaded"` prints exactly once, no matter how many times you use `Config`.

### Order of execution

```java
class Demo {
    static { System.out.println("1. static block"); }
    { System.out.println("2. instance block"); }
    Demo() { System.out.println("3. constructor"); }

    public static void main(String[] args) {
        new Demo();
        new Demo();
    }
}
```

Output:

```
1. static block
2. instance block
3. constructor
2. instance block
3. constructor
```

The static block ran once. The instance block and constructor ran per object.

---

## Static Nested Classes

A nested class marked `static` does not need an instance of the outer class.

```java
class Outer {
    static class Nested {
        void greet() { System.out.println("Hello"); }
    }
}

Outer.Nested n = new Outer.Nested();   // no Outer instance required
```

Without `static`, you would need an `Outer` object first. Prefer static nested classes unless the inner class genuinely needs access to the outer object's fields.

---

## The `final` Keyword

`final` means **assign once, never reassign**. It applies to variables, methods and classes, with a different meaning in each place.

### Final variables

```java
final int maxUsers = 100;
// maxUsers = 200;   // compile error
```

A final field may be left unassigned at declaration if the constructor assigns it - this is called a *blank final*.

```java
class User {
    final String username;

    User(String username) {
        this.username = username;   // assigned exactly once
    }
}
```

### Final does not mean immutable

This is the single most misunderstood point about `final`. It locks the **reference**, not the object it points to.

```java
final List<String> names = new ArrayList<>();

names.add("Asha");     // allowed - the list contents changed
names.add("Ravi");     // allowed

// names = new ArrayList<>();   // compile error - the reference is locked
```

For a truly unchangeable list, use `List.of(...)` or wrap it with `Collections.unmodifiableList(...)`.

---

## Final Methods

A final method cannot be overridden by a subclass.

```java
class Payment {
    final void logTransaction() {
        // security-critical, must not change
    }
}

class CardPayment extends Payment {
    // void logTransaction() { }   // compile error
}
```

Use this when overriding would break an invariant the base class depends on.

---

## Final Classes

A final class cannot be extended at all.

```java
final class Constants { }

// class MyConstants extends Constants { }   // compile error
```

`String`, `Integer` and the other wrapper classes are final. That is deliberate - it guarantees nobody can subclass `String` and change how equality or hashing behaves.

---

## Putting Them Together: `static final` Constants

The combination `static final` is the standard way to declare a constant in Java: one shared copy, never reassigned.

```java
class AppConfig {
    static final int MAX_RETRIES = 3;
    static final String BASE_URL = "https://api.example.com";
    static final double TAX_RATE = 0.18;
}
```

By convention constants use `UPPER_SNAKE_CASE`. Access them through the class:

```java
for (int i = 0; i < AppConfig.MAX_RETRIES; i++) {
    // retry logic
}
```

If a constant needs a few lines to build, assign it in a static block:

```java
class Registry {
    static final Set<String> ALLOWED;

    static {
        Set<String> temp = new HashSet<>();
        temp.add("admin");
        temp.add("editor");
        ALLOWED = Collections.unmodifiableSet(temp);
    }
}
```

---

## Quick Comparison

| Aspect          | `static`                             | `final`                              |
| --------------- | ------------------------------------ | ------------------------------------ |
| Question it answers | Who owns this member?            | Can this be changed?                 |
| On a variable   | One shared copy for the whole class  | Can be assigned only once            |
| On a method     | Callable without an object           | Cannot be overridden                 |
| On a class      | Only valid for nested classes        | Cannot be extended                   |
| On a block      | Runs once at class load              | Not applicable                       |

---

## Common Mistakes

**Using an instance field inside `main`.** `main` is static, so it has no `this`.

```java
public class App {
    int count = 5;

    public static void main(String[] args) {
        // System.out.println(count);   // compile error
        App app = new App();
        System.out.println(app.count);  // correct
    }
}
```

**Expecting `final` to freeze an object.** As shown above, a final collection can still be modified.

**Making everything static.** Static state is shared across the whole program, which makes code harder to test and unsafe when several threads touch it. Reach for static only for genuine constants and stateless utility methods.

**Forgetting that a static field survives every object.** If one object updates a static counter, every other object sees the new value immediately.

---

## Summary

- `static` binds a member to the class, so it is shared and needs no object.
- Static methods cannot use instance fields or `this` directly.
- Static blocks run once, when the class is first loaded.
- `final` allows exactly one assignment - for variables, it locks the reference, not the object.
- `final` methods cannot be overridden and `final` classes cannot be extended.
- `static final` in `UPPER_SNAKE_CASE` is the idiomatic way to declare constants.
