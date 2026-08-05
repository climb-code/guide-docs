---
title: Wrapper Classes and Autoboxing in Java
description: Learn Java wrapper classes - Integer, Double, Character and friends - along with autoboxing, unboxing, caching, parsing and the pitfalls of comparing boxed values.
---

Java has two kinds of types: **primitives** like `int` and `double`, and **objects** like `String`. Primitives are fast and lightweight, but they are not objects, so they cannot be stored in collections or used with generics.

A **wrapper class** solves this. It wraps a primitive value inside an object.

```java
int number = 42;              // primitive
Integer boxed = 42;           // wrapper object holding the same value
```

---

## The Eight Wrapper Classes

Every primitive type has one matching wrapper in `java.lang`, so no import is needed.

| Primitive | Wrapper class | Size    |
| --------- | ------------- | ------- |
| `byte`    | `Byte`        | 8 bit   |
| `short`   | `Short`       | 16 bit  |
| `int`     | `Integer`     | 32 bit  |
| `long`    | `Long`        | 64 bit  |
| `float`   | `Float`       | 32 bit  |
| `double`  | `Double`      | 64 bit  |
| `char`    | `Character`   | 16 bit  |
| `boolean` | `Boolean`     | 1 bit   |

Note the two names that do not simply add a capital letter: `int` becomes `Integer` and `char` becomes `Character`.

---

## Why Wrapper Classes Exist

1. **Collections and generics only accept objects.** You cannot write `List<int>`.
2. **They can be `null`.** A primitive `int` is always `0` by default, but an `Integer` can say "no value yet".
3. **They carry useful methods and constants**, such as parsing text and reporting minimum and maximum values.

```java
List<Integer> scores = new ArrayList<>();
scores.add(90);      // int is boxed into Integer automatically
scores.add(75);

System.out.println(scores); // [90, 75]
```

```java
Integer missing = null;   // allowed
// int broken = null;     // compile error
```

---

## Autoboxing and Unboxing

**Autoboxing** is the compiler turning a primitive into its wrapper. **Unboxing** is the reverse.

```java
Integer boxed = 10;      // autoboxing:  Integer.valueOf(10)
int unboxed = boxed;     // unboxing:    boxed.intValue()
```

It happens in method calls and arithmetic too.

```java
Integer a = 5;
Integer b = 7;

int sum = a + b;         // both unboxed, added, result 12
Integer total = a + b;   // added, then the result is boxed again
```

### Unboxing a `null` Throws

This is the most common wrapper bug. Unboxing calls a method on the object, so a `null` wrapper throws `NullPointerException`.

```java
Map<String, Integer> stock = new HashMap<>();

int count = stock.get("pens"); // NullPointerException, the key is missing
```

Guard against it before unboxing:

```java
Integer value = stock.get("pens");
int count = (value != null) ? value : 0;

// or in one line
int safe = stock.getOrDefault("pens", 0);
```

---

## Comparing Wrapper Objects

`==` compares **references** for objects, not values. Use `equals()` instead.

```java
Integer x = 1000;
Integer y = 1000;

System.out.println(x == y);      // false, two different objects
System.out.println(x.equals(y)); // true
```

### The Integer Cache Surprise

Java caches boxed integers from `-128` to `127`, so small values reuse the same object and `==` appears to work.

```java
Integer a = 100;
Integer b = 100;
System.out.println(a == b); // true, both come from the cache

Integer c = 200;
Integer d = 200;
System.out.println(c == d); // false, outside the cache range
```

The rule is simple: **never use `==` on wrapper objects.** Compare with `equals()`, or unbox one side first.

```java
System.out.println(c.intValue() == d.intValue()); // true
```

---

## Converting Between Types

### String to Primitive

Each numeric wrapper has a `parseXxx()` method that returns a primitive.

```java
int age = Integer.parseInt("30");
double price = Double.parseDouble("19.99");
boolean flag = Boolean.parseBoolean("true");
long big = Long.parseLong("9000000000");
```

Text that is not a valid number throws `NumberFormatException`, so parse user input inside a `try` block.

```java
try {
    int value = Integer.parseInt("12a");
} catch (NumberFormatException e) {
    System.out.println("Not a number: " + e.getMessage());
}
```

### String to Wrapper

`valueOf()` does the same job but returns the wrapper object and uses the cache.

```java
Integer boxed = Integer.valueOf("30");
Integer fromInt = Integer.valueOf(30);
```

Prefer `valueOf()` over the deprecated `new Integer(30)` constructor, which always creates a fresh object.

### Primitive to String

```java
int number = 255;

String a = String.valueOf(number);
String b = Integer.toString(number);
String c = number + "";        // works, but least readable
```

---

## Useful Methods and Constants

```java
System.out.println(Integer.MAX_VALUE);   // 2147483647
System.out.println(Integer.MIN_VALUE);   // -2147483648
System.out.println(Double.MAX_VALUE);    // 1.7976931348623157E308

System.out.println(Integer.compare(5, 9));   // -1
System.out.println(Integer.sum(5, 9));       // 14
System.out.println(Integer.max(5, 9));       // 9

System.out.println(Integer.toBinaryString(10)); // 1010
System.out.println(Integer.toHexString(255));   // ff
```

`Character` is handy for validating text one letter at a time.

```java
System.out.println(Character.isDigit('7'));      // true
System.out.println(Character.isLetter('a'));     // true
System.out.println(Character.isUpperCase('a'));  // false
System.out.println(Character.toUpperCase('a'));  // A
System.out.println(Character.isWhitespace(' ')); // true
```

```java
String input = "abc123";
long digits = input.chars().filter(Character::isDigit).count();
System.out.println(digits); // 3
```

---

## Wrappers Are Immutable

A wrapper object never changes its value. Any operation creates a new object.

```java
Integer count = 10;
Integer other = count;

count = count + 5;          // a new Integer is created

System.out.println(count);  // 15
System.out.println(other);  // 10, untouched
```

This also means wrappers are safe to share between threads.

---

## The Cost of Boxing

Boxing allocates an object, so a tight loop over wrappers is far slower than the same loop over primitives.

```java
// slow: every iteration boxes and unboxes
Long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i;
}

// fast: pure primitive arithmetic
long fastSum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    fastSum += i;
}
```

For streams, the primitive variants avoid boxing entirely.

```java
int total = IntStream.rangeClosed(1, 100).sum(); // no Integer objects created
```

---

## Common Mistakes

1. Comparing wrappers with `==` and being fooled by the `-128` to `127` cache.
2. Unboxing a `null` returned from a `Map` or a database column.
3. Using wrappers in hot loops where primitives would do.
4. Calling `new Integer(5)` instead of `Integer.valueOf(5)`.
5. Forgetting that `Integer.parseInt()` throws on empty or malformed text.

---

## Best Practices

1. Use primitives by default, and wrappers only when an object is required.
2. Compare wrapper values with `equals()` or by unboxing explicitly.
3. Use `getOrDefault()` or a null check before unboxing map values.
4. Prefer `parseInt()` when you need a primitive and `valueOf()` when you need an object.
5. Reach for `IntStream`, `LongStream`, and `DoubleStream` to keep numeric pipelines unboxed.

---

## Quick Summary

| Concept        | Meaning                                             |
| -------------- | --------------------------------------------------- |
| Wrapper class  | An object that holds a primitive value               |
| Autoboxing     | Primitive converted to wrapper automatically         |
| Unboxing       | Wrapper converted back to primitive                  |
| Integer cache  | Values `-128` to `127` reuse the same object         |
| `parseXxx()`   | Text to primitive                                    |
| `valueOf()`    | Text or primitive to wrapper object                  |

---

### Next Steps

Wrapper classes are what let primitives live inside generics, so the next topic is the **Collections Framework**, where `List<Integer>` and `Map<String, Integer>` put them to work.
