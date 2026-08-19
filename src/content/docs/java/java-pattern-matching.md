---
title: Pattern Matching in Java
description: Learn how to use pattern matching in modern Java, including instanceof patterns, switch pattern matching, record patterns, and guarded patterns.
---

**Pattern matching** allows you to test whether an object has a specific type or structure and extract its components into variables in a single, safe step. It eliminates repetitive type checks and manual casts.

Pattern matching features were progressively introduced and standardized across modern Java versions (Java 16, Java 17, and Java 21 LTS).

---

## Pattern Matching with `instanceof`

Before Java 16, checking an object's type and accessing its members required two separate operations: a type check followed by an explicit type cast.

### Traditional Approach (Before Java 16)

```java
public void printLength(Object obj) {
    if (obj instanceof String) {
        String s = (String) obj; // Manual cast required
        System.out.println("String length: " + s.length());
    }
}
```

### Modern Approach (Java 16+)

With pattern matching for `instanceof`, you declare a **pattern variable** directly in the `instanceof` condition:

```java
public void printLength(Object obj) {
    if (obj instanceof String s) {
        // 's' is automatically cast and available in this block
        System.out.println("String length: " + s.length());
    }
}
```

### Flow Scoping

Pattern variables use **flow scoping**: the variable is only in scope where the compiler proves the condition is true.

```java
public void process(Object obj) {
    // Valid: 's' is in scope because the condition short-circuits
    if (obj instanceof String s && !s.isEmpty()) {
        System.out.println("Non-empty string: " + s.toUpperCase());
    }

    // Invalid: 's' cannot be used here because the condition was inverted
    // if (!(obj instanceof String s)) {
    //     System.out.println(s); // Compilation error!
    // }
}
```

If you invert the check and exit early, the pattern variable stays in scope for the rest of the method:

```java
public void handleObject(Object obj) {
    if (!(obj instanceof String s)) {
        return; // Exit early
    }

    // 's' is safely in scope here!
    System.out.println("Processed string: " + s.toLowerCase());
}
```

---

## Pattern Matching for `switch` (Java 21+)

Standardized in Java 21, pattern matching extends `switch` statements and expressions to match against data types, not just primitive constants or strings.

```java
public String formatValue(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("Integer: %,d", i);
        case Long l    -> String.format("Long: %,d L", l);
        case Double d  -> String.format("Double: %.2f", d);
        case String s  -> "String: \"" + s + "\"";
        case null      -> "Null value";
        default        -> "Unknown object: " + obj.toString();
    };
}
```

### Handling `null` in `switch`

Traditionally, passing `null` to a `switch` threw a `NullPointerException`. Modern `switch` allows explicit `case null` handling:

```java
public void check(Object obj) {
    switch (obj) {
        case null -> System.out.println("Received null!");
        case String s -> System.out.println("String of length: " + s.length());
        default -> System.out.println("Other object");
    }
}
```

You can also combine `null` with a default-like branch:

```java
switch (obj) {
    case null, default -> System.out.println("Invalid or unhandled input");
    case String s -> System.out.println("Valid: " + s);
}
```

---

## Guarded Patterns with `when`

When you need an extra condition beyond just the type, use the `when` clause (guarded pattern):

```java
public String evaluateScore(Object score) {
    return switch (score) {
        case Integer i when i >= 90 -> "Grade A (" + i + ")";
        case Integer i when i >= 75 -> "Grade B (" + i + ")";
        case Integer i when i >= 50 -> "Grade C (" + i + ")";
        case Integer i              -> "Fail (" + i + ")";
        case String s when s.equalsIgnoreCase("exempt") -> "Exempted";
        case String s               -> "Custom status: " + s;
        case null                   -> "No score recorded";
        default                     -> "Invalid type";
    };
}
```

:::note
The order of cases matters. Put more specific guarded cases (`case Integer i when i >= 90`) before broader cases (`case Integer i`), or the compiler will report an error for unreachable code.
:::

---

## Record Patterns (Java 21+)

**Record patterns** allow you to deconstruct a `record` into its individual components directly during a type check.

Suppose you have these records:

```java
public record Point(int x, int y) {}
public record Circle(Point center, double radius) {}
public record Rectangle(Point topLeft, Point bottomRight) {}
```

### Deconstructing with `instanceof`

Instead of checking `obj instanceof Point p` and then calling `p.x()` and `p.y()`, you can deconstruct the fields directly:

```java
public void printPoint(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        System.out.println("Point coordinates: x=" + x + ", y=" + y);
    }
}
```

### Nested Record Patterns

You can nest record patterns to match and extract deep values in one go:

```java
public void printCircleCenter(Object shape) {
    if (shape instanceof Circle(Point(int x, int y), double r)) {
        System.out.println("Circle center at (" + x + ", " + y + ") with radius " + r);
    }
}
```

### Record Patterns in `switch`

Record patterns work seamlessly within `switch` expressions:

```java
public double calculateArea(Object shape) {
    return switch (shape) {
        case Circle(Point c, double r) -> Math.PI * r * r;
        case Rectangle(Point(int x1, int y1), Point(int x2, int y2)) -> {
            int width = Math.abs(x2 - x1);
            int height = Math.abs(y2 - y1);
            yield (double) width * height;
        }
        case null -> 0.0;
        default -> throw new IllegalArgumentException("Unsupported shape: " + shape);
    };
}
```

---

## Pattern Matching with Sealed Hierarchies

Combining pattern matching with **sealed classes and interfaces** allows the compiler to verify **exhaustiveness**. When every permitted subclass is handled, no `default` branch is required:

```java
public sealed interface PaymentMethod permits CreditCard, Upi, BankTransfer {}

public record CreditCard(String cardNumber, String expiry) implements PaymentMethod {}
public record Upi(String vpaId) implements PaymentMethod {}
public record BankTransfer(String iban, String swiftCode) implements PaymentMethod {}
```

```java
public String processPayment(PaymentMethod payment) {
    return switch (payment) {
        case CreditCard(var card, var exp) -> "Processing Card ending in " + card.substring(card.length() - 4);
        case Upi(var vpa)                  -> "Requesting payment from UPI ID: " + vpa;
        case BankTransfer(var iban, var s) -> "Initiating Wire Transfer to " + iban;
        // No 'default' case needed! Compiler guarantees all cases are covered.
    };
}
```

If you add a new subclass `CryptoPayment` to `PaymentMethod` later, the compiler will immediately raise an error on any `switch` expression that is missing the new case, preventing silent bugs.

---

## Summary of Pattern Matching Features

| Feature | Java Version | Primary Purpose |
| --- | --- | --- |
| `instanceof` Pattern Matching | Java 16 | Eliminates boilerplate type casts after `if (obj instanceof T)` |
| `switch` Pattern Matching | Java 21 | Type-based branching and cleaner dispatch logic |
| Guarded Patterns (`when`) | Java 21 | Adds boolean expressions to refine case matching |
| `null` in `switch` | Java 21 | Explicitly handles null values inside switch branches |
| Record Patterns | Java 21 | Deconstructs records into individual components directly |
| Exhaustive Sealed Switch | Java 21 | Compiler-verified coverage of all permitted hierarchy types |

---

### Next Steps ➡️

- Explore **Switch Expressions** to review the modern arrow syntax and `yield`.
- Review **Records** and **Sealed Classes** to build clean, exhaustive domain models.
