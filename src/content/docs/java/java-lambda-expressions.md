---
title: Lambda Expressions in Java
description: Learn about Java Lambda Expressions — functional interfaces, lambda syntax, method references, and the built-in functional interfaces like Predicate, Function, and Consumer.
---

A **lambda expression** is a short block of code that takes parameters and returns a value — essentially an **anonymous function**. Lambdas were introduced in **Java 8** and let you pass behavior around as easily as data.

```java
// Before Java 8 — anonymous class
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running!");
    }
};

// With a lambda — same thing, one line
Runnable task2 = () -> System.out.println("Running!");
```

---

## Lambda Syntax

A lambda has three parts: **parameters**, the **arrow** `->`, and a **body**.

```java
(parameters) -> expression
(parameters) -> { statements; }
```

```java
() -> 42                            // no parameters
x -> x * 2                          // one parameter (parentheses optional)
(a, b) -> a + b                     // two parameters
(String s) -> s.length()            // explicit parameter type
(a, b) -> {                         // block body — needs return
    int sum = a + b;
    return sum;
}
```

**Rules:**

- Parameter types are usually **inferred** by the compiler.
- A single-expression body returns its value **automatically** — no `return` keyword.
- A block body `{ }` needs an explicit `return` (if the lambda returns something).

---

## Functional Interfaces

A lambda can only be used where a **functional interface** is expected — an interface with **exactly one abstract method** (SAM: Single Abstract Method).

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);   // exactly one abstract method
}

public class Main {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(3, 4));      // 7
        System.out.println(multiply.calculate(3, 4)); // 12
    }
}
```

The `@FunctionalInterface` annotation is optional but recommended — the compiler will **error out** if the interface accidentally gets a second abstract method.

---

## Built-in Functional Interfaces

Java ships with ready-made functional interfaces in `java.util.function`, so you rarely need to write your own:

| Interface        | Method        | Takes | Returns   | Use case                  |
| ---------------- | ------------- | ----- | --------- | ------------------------- |
| `Predicate<T>`   | `test(T)`     | `T`   | `boolean` | Filtering / conditions    |
| `Function<T, R>` | `apply(T)`    | `T`   | `R`       | Transforming values       |
| `Consumer<T>`    | `accept(T)`   | `T`   | `void`    | Doing something with a value |
| `Supplier<T>`    | `get()`       | —     | `T`       | Producing / lazy values   |
| `UnaryOperator<T>` | `apply(T)`  | `T`   | `T`       | Same-type transformation  |
| `BinaryOperator<T>` | `apply(T, T)` | `T, T` | `T`    | Combining two values      |

```java
import java.util.function.*;

Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Integer> length = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();

System.out.println(isEmpty.test(""));       // true
System.out.println(length.apply("Java"));   // 4
printer.accept("Hello Lambda!");            // Hello Lambda!
System.out.println(random.get());           // e.g. 0.7134...
```

---

## Lambdas with Collections

Lambdas shine when working with collections:

```java
import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>(List.of("Saurabh", "Amit", "Priya", "Rahul"));

// forEach — Consumer
names.forEach(name -> System.out.println(name));

// removeIf — Predicate
names.removeIf(name -> name.startsWith("A"));
System.out.println(names);                  // [Saurabh, Priya, Rahul]

// sort — Comparator
names.sort((a, b) -> a.compareTo(b));
System.out.println(names);                  // [Priya, Rahul, Saurabh]
```

---

## Method References

When a lambda **only calls an existing method**, you can shorten it further with a **method reference** using `::`.

| Type                          | Lambda                    | Method reference     |
| ----------------------------- | ------------------------- | -------------------- |
| Static method                 | `s -> Integer.parseInt(s)` | `Integer::parseInt` |
| Instance method (of object)   | `s -> System.out.println(s)` | `System.out::println` |
| Instance method (of parameter) | `s -> s.toUpperCase()`   | `String::toUpperCase` |
| Constructor                   | `() -> new ArrayList<>()` | `ArrayList::new`     |

```java
List<String> names = List.of("saurabh", "amit", "priya");

// Lambda version
names.forEach(name -> System.out.println(name));

// Method reference version — cleaner
names.forEach(System.out::println);
```

---

## Variable Capture

Lambdas can use variables from the enclosing scope, but those variables must be **final or effectively final** (never reassigned):

```java
int discount = 10;                          // effectively final

Function<Integer, Integer> applyDiscount = price -> price - discount; // ✅ ok

// discount = 20;                           // ❌ uncommenting this breaks the lambda
System.out.println(applyDiscount.apply(100)); // 90
```

---

## Lambda vs Anonymous Class

| Feature          | Lambda                        | Anonymous class              |
| ---------------- | ----------------------------- | ---------------------------- |
| Syntax           | Short, concise                | Verbose boilerplate          |
| Works with       | Functional interfaces only    | Any interface / abstract class |
| `this` refers to | Enclosing class               | The anonymous class itself   |
| State            | Cannot have fields            | Can have fields              |

---

## Key Points

- A lambda is an **anonymous function**: `(params) -> body`.
- Lambdas need a **functional interface** — one abstract method — as their target type.
- Prefer the **built-in interfaces** (`Predicate`, `Function`, `Consumer`, `Supplier`) over custom ones.
- Use **method references** (`::`) when the lambda just calls an existing method.
- Captured local variables must be **effectively final**.
- Lambdas are the foundation of the **Streams API** — covered in the next topic.
