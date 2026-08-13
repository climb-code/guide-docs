---
title: Functional Interfaces in Java
description: Learn how Java functional interfaces work, how to create them, and how to use Java's built-in Function, Predicate, Consumer, and Supplier interfaces.
---

A **functional interface** is an interface with exactly one abstract method. It provides the target type for a lambda expression or a method reference, making it possible to pass behavior as a value.

Functional interfaces are central to modern Java programming, especially when using lambda expressions, the Streams API, and asynchronous callbacks.

---

## The `@FunctionalInterface` Annotation

Use `@FunctionalInterface` to document your intent and ask the compiler to verify that the interface has only one abstract method.

```java
@FunctionalInterface
interface Formatter {
    String format(String value);
}
```

The annotation is recommended, but not required. An interface is functional as long as it has one abstract method.

Default and static methods do not count as abstract methods, so they can be added safely.

```java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);

    default void sayGoodbye(String name) {
        System.out.println("Goodbye, " + name);
    }

    static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
```

---

## Using a Lambda Expression

Create an implementation without writing a separate class.

```java
Formatter uppercase = value -> value.toUpperCase();

System.out.println(uppercase.format("java")); // JAVA
```

For a lambda with more than one statement, use braces and an explicit `return` when the method returns a value.

```java
Formatter excited = value -> {
    String trimmed = value.trim();
    return trimmed + "!";
};

System.out.println(excited.format("Hello ")); // Hello!
```

---

## Built-in Functional Interfaces

Java provides common functional interfaces in the `java.util.function` package.

| Interface | Abstract method | Purpose |
| --- | --- | --- |
| `Predicate<T>` | `boolean test(T value)` | Tests a condition |
| `Function<T, R>` | `R apply(T value)` | Transforms a value |
| `Consumer<T>` | `void accept(T value)` | Performs an action without returning a value |
| `Supplier<T>` | `T get()` | Produces a value without receiving one |

### `Predicate<T>`

Use a predicate when you need a true-or-false test.

```java
import java.util.function.Predicate;

Predicate<Integer> isEven = number -> number % 2 == 0;

System.out.println(isEven.test(12)); // true
System.out.println(isEven.test(7));  // false
```

Predicates can be combined with `and`, `or`, and `negate`.

```java
Predicate<String> hasText = value -> !value.isBlank();
Predicate<String> isShort = value -> value.length() <= 10;

Predicate<String> validName = hasText.and(isShort);
System.out.println(validName.test("Asha")); // true
```

### `Function<T, R>`

Use a function to convert an input type into a result type.

```java
import java.util.function.Function;

Function<String, Integer> nameLength = name -> name.length();

System.out.println(nameLength.apply("Priya")); // 5
```

Use `andThen` to compose transformations.

```java
Function<String, String> trim = value -> value.trim();
Function<String, String> uppercase = value -> value.toUpperCase();

Function<String, String> cleanName = trim.andThen(uppercase);
System.out.println(cleanName.apply("  amit  ")); // AMIT
```

### `Consumer<T>`

Use a consumer when the operation has a side effect, such as printing, logging, or saving data.

```java
import java.util.List;
import java.util.function.Consumer;

Consumer<String> printName = name -> System.out.println("Hello, " + name);

List.of("Asha", "Ravi", "Meera").forEach(printName);
```

### `Supplier<T>`

Use a supplier when you need to generate or retrieve a value on demand.

```java
import java.time.LocalDateTime;
import java.util.function.Supplier;

Supplier<LocalDateTime> currentTime = () -> LocalDateTime.now();

System.out.println(currentTime.get());
```

---

## Method References

When a lambda only calls an existing method, a method reference can be shorter and clearer.

```java
import java.util.List;
import java.util.function.Function;

Function<String, Integer> length = String::length;
System.out.println(length.apply("Java")); // 4

List.of("one", "two", "three").forEach(System.out::println);
```

Common forms are:

- `ClassName::staticMethod` for static methods
- `object::instanceMethod` for a method on a particular object
- `ClassName::instanceMethod` for a method on the lambda parameter
- `ClassName::new` for constructor references

---

## Choosing the Right Interface

Prefer Java's built-in interfaces when their names match your intent. They work naturally with streams and other Java APIs.

Create a custom functional interface when the operation has domain-specific meaning or needs a more descriptive method name.

```java
@FunctionalInterface
interface PriceCalculator {
    double calculate(double basePrice);
}

PriceCalculator withTax = price -> price * 1.18;
System.out.println(withTax.calculate(1000)); // 1180.0
```

Keep lambdas focused on small, readable behavior. If a lambda becomes complex, move the logic into a named method and use a method reference instead.

---

### Next Steps ➡️

Functional interfaces make lambda expressions practical. Continue to the **Streams API** to use them for filtering, mapping, and processing collections.
