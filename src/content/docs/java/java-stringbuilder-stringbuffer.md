---
title: StringBuilder and StringBuffer in Java
description: Learn why Java strings are immutable and how StringBuilder and StringBuffer let you build and modify text efficiently, with methods, performance comparisons and practical examples.
---

Java `String` objects are **immutable**. Once created, the characters inside a string can never change. Every operation that looks like it edits a string actually creates a brand new one.

```java
String s = "Hello";
s = s + " World";     // this did not edit "Hello"
```

What really happened: `"Hello"` still exists untouched, a new object `"Hello World"` was created, and `s` was pointed at it. The old object is now garbage.

For one or two operations this costs nothing. Inside a loop it becomes a real problem.

```java
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;      // creates 10000 throwaway String objects
}
```

`StringBuilder` and `StringBuffer` exist to fix exactly this.

---

## What They Are

Both classes hold a **mutable** sequence of characters. You modify the same underlying buffer instead of allocating a new object each time.

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
System.out.println(sb);      // Hello World
```

No new object was created. The same `sb` grew.

The loop from above, rewritten:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);            // one object, reused
}
String result = sb.toString();
```

---

## StringBuilder vs StringBuffer

The two classes have **identical methods**. The only difference is thread safety.

| Feature       | `StringBuilder`         | `StringBuffer`             |
| ------------- | ----------------------- | -------------------------- |
| Mutable       | Yes                     | Yes                        |
| Thread safe   | No                      | Yes - methods are synchronized |
| Speed         | Faster                  | Slower, due to locking     |
| Introduced in | Java 5                  | Java 1.0                   |
| Use when      | Single thread (almost always) | A buffer is genuinely shared across threads |

**Use `StringBuilder` by default.** Reach for `StringBuffer` only when several threads truly share one buffer - which is rare, because sharing a mutable buffer is usually a design worth rethinking anyway.

---

## Creating One

```java
StringBuilder empty = new StringBuilder();              // capacity 16
StringBuilder withText = new StringBuilder("Java");     // starts with "Java"
StringBuilder sized = new StringBuilder(500);           // capacity 500, empty
```

If you know roughly how much text you will build, pass a capacity. It avoids repeated internal resizing.

---

## Core Methods

### append

Adds to the end. It is overloaded for every primitive type and for objects.

```java
StringBuilder sb = new StringBuilder();
sb.append("Score: ");
sb.append(42);
sb.append(' ');
sb.append(true);
System.out.println(sb);      // Score: 42 true
```

`append` returns the same builder, so calls can be chained:

```java
StringBuilder sb = new StringBuilder()
        .append("Name: ").append("Asha")
        .append(", Age: ").append(28);
```

### insert

Adds text at a given index.

```java
StringBuilder sb = new StringBuilder("Hello World");
sb.insert(5, ",");
System.out.println(sb);      // Hello, World
```

### delete and deleteCharAt

```java
StringBuilder sb = new StringBuilder("Hello, World");
sb.delete(5, 7);             // removes index 5 up to but not including 7
System.out.println(sb);      // HelloWorld

sb.deleteCharAt(0);
System.out.println(sb);      // elloWorld
```

### replace

```java
StringBuilder sb = new StringBuilder("I like Python");
sb.replace(7, 13, "Java");
System.out.println(sb);      // I like Java
```

### reverse

```java
StringBuilder sb = new StringBuilder("racecar");
System.out.println(sb.reverse());    // racecar
```

This makes palindrome checks a one-liner:

```java
static boolean isPalindrome(String text) {
    String clean = text.toLowerCase().replaceAll("[^a-z0-9]", "");
    return clean.equals(new StringBuilder(clean).reverse().toString());
}
```

### setCharAt and charAt

```java
StringBuilder sb = new StringBuilder("java");
sb.setCharAt(0, 'J');
System.out.println(sb);              // Java
System.out.println(sb.charAt(2));    // v
```

### length, capacity and setLength

```java
StringBuilder sb = new StringBuilder("Hello");
System.out.println(sb.length());     // 5  - characters actually stored
System.out.println(sb.capacity());   // 21 - room currently allocated

sb.setLength(0);                     // clears the builder for reuse
```

`setLength(0)` is the idiomatic way to empty a builder without allocating a new one.

### indexOf and substring

```java
StringBuilder sb = new StringBuilder("hello world");
System.out.println(sb.indexOf("world"));    // 6
System.out.println(sb.substring(6));        // world  (returns a String)
```

### toString

Converts the buffer into an ordinary immutable `String`.

```java
String finished = sb.toString();
```

---

## How Capacity Grows

A `StringBuilder` keeps an internal `char` array. The default capacity is 16. When it fills up, Java allocates a bigger array - roughly **double the old capacity plus two** - and copies everything across.

```java
StringBuilder sb = new StringBuilder();
System.out.println(sb.capacity());   // 16

sb.append("This string is longer than sixteen characters");
System.out.println(sb.capacity());   // grown automatically
```

Growing is handled for you, but each growth is a copy. Presizing the builder avoids that work when you already know the target size.

---

## Performance in Practice

Concatenating 100,000 pieces of text:

| Approach                | Objects created | Relative time |
| ----------------------- | --------------- | ------------- |
| `String` with `+=`      | ~100,000        | Very slow     |
| `StringBuffer`          | 1               | Fast          |
| `StringBuilder`         | 1               | Fastest       |

The `String` version is quadratic: each `+=` copies every character accumulated so far. The builder versions are linear.

```java
long start = System.currentTimeMillis();

StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append("x");
}

System.out.println(System.currentTimeMillis() - start + " ms");
```

---

## When Plain Concatenation Is Fine

The compiler is smarter than the rule "never use `+`" suggests. A single expression is optimised into a builder automatically:

```java
String message = "Hello, " + name + "! You are " + age + " years old.";
```

This compiles to efficient code already. There is no benefit to rewriting it by hand.

The problem is only **repeated concatenation across separate statements**, especially in a loop - the compiler cannot merge those, so a fresh builder is created on every iteration.

Rule of thumb:

- One expression, fixed number of pieces → use `+`, it is more readable.
- A loop or an unknown number of pieces → use `StringBuilder`.

---

## Practical Example: Building a CSV Row

```java
public static String toCsvRow(List<String> fields) {
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < fields.size(); i++) {
        if (i > 0) {
            sb.append(',');
        }
        sb.append(fields.get(i));
    }

    return sb.toString();
}
```

```java
System.out.println(toCsvRow(List.of("id", "name", "email")));
// id,name,email
```

---

## Practical Example: Reusing One Builder

```java
StringBuilder sb = new StringBuilder(64);

for (String user : users) {
    sb.setLength(0);                    // reset, no new allocation
    sb.append("User: ").append(user).append(" | active");
    System.out.println(sb);
}
```

---

## Common Mistakes

**Comparing builders with `equals`.** `StringBuilder` does not override `equals`, so it compares references, not contents.

```java
StringBuilder a = new StringBuilder("hi");
StringBuilder b = new StringBuilder("hi");

System.out.println(a.equals(b));                       // false
System.out.println(a.toString().equals(b.toString())); // true
```

**Calling `toString()` inside a loop.** That recreates the immutable string every iteration and defeats the purpose. Convert once, at the end.

**Using a `StringBuilder` as a map key or in a `HashSet`.** It has no meaningful `hashCode`, and it is mutable - convert to `String` first.

**Confusing `length()` with `capacity()`.** `length()` is how much text you have, `capacity()` is how much room is allocated.

---

## Summary

- `String` is immutable, so every modification allocates a new object.
- `StringBuilder` and `StringBuffer` hold mutable character buffers and share the same API.
- `StringBuilder` is not synchronized and is the right default; `StringBuffer` is synchronized for shared-buffer cases.
- Key methods: `append`, `insert`, `delete`, `replace`, `reverse`, `setLength`, `toString`.
- Presize the builder when you know the final length to avoid repeated array copies.
- Plain `+` is fine in a single expression - switch to a builder for loops and repeated concatenation.
