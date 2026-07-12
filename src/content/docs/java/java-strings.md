---
title: Strings in Java
description: Learn about Strings in Java, string immutability, common String methods, string comparison, and the difference between String, StringBuilder, and StringBuffer.
---

A **String** in Java is a sequence of characters. Unlike primitive types (`int`, `char`, `boolean`), `String` is a **class**, so every string is an object.

```java
String name = "Saurabh";                  // string literal (recommended)
String city = new String("Mumbai");       // using new keyword
```

---

## String Pool and Immutability

Java stores string literals in a special memory area called the **String Pool** (inside the heap). If two literals have the same value, they share the same object.

```java
String a = "hello";
String b = "hello";      // points to the SAME object in the pool

String c = new String("hello");  // creates a NEW object in the heap
```

Strings in Java are **immutable** — once created, their value cannot be changed. Any operation that "modifies" a string actually creates a **new** string object.

```java
String s = "Java";
s.concat(" Rocks");      // creates a new string, s is unchanged
System.out.println(s);   // Java

s = s.concat(" Rocks");  // reassign to capture the new string
System.out.println(s);   // Java Rocks
```

**Why are Strings immutable?**
- **Security** — strings are used for file paths, URLs, and credentials.
- **Thread safety** — multiple threads can share a string without synchronization.
- **String Pool** — sharing is only safe because values can never change.

---

## Common String Methods

```java
String s = "Hello World";

s.length();               // 11
s.charAt(0);              // 'H'
s.indexOf("World");       // 6
s.contains("World");      // true
s.startsWith("Hello");    // true
s.endsWith("World");      // true

s.toUpperCase();          // "HELLO WORLD"
s.toLowerCase();          // "hello world"
s.trim();                 // removes leading/trailing spaces
s.replace('l', 'p');      // "Heppo Worpd"

s.substring(6);           // "World"
s.substring(0, 5);        // "Hello"  (end index is exclusive)

s.split(" ");             // ["Hello", "World"]
String.join("-", "a", "b", "c");   // "a-b-c"
```

---

## String Comparison

Never compare strings with `==` — it compares **references**, not values. Use `equals()`.

```java
String a = "hello";
String b = new String("hello");

System.out.println(a == b);              // false (different objects)
System.out.println(a.equals(b));         // true  (same value)
System.out.println(a.equalsIgnoreCase("HELLO"));  // true

a.compareTo(b);   // 0 if equal, negative/positive for lexicographic order
```

| Comparison | What it checks |
|---|---|
| `==` | Same object in memory (reference) |
| `equals()` | Same character sequence (value) |
| `equalsIgnoreCase()` | Same value, ignoring case |
| `compareTo()` | Lexicographic (dictionary) order |

---

## String Concatenation

```java
String first = "Hello";
String second = "World";

String result = first + " " + second;        // using + operator
String result2 = first.concat(" ").concat(second);  // using concat()

// With other types, + converts them to string
String info = "Age: " + 25;      // "Age: 25"
```

Concatenating strings inside a loop is slow, because each `+` creates a new object. Use `StringBuilder` instead.

---

## StringBuilder and StringBuffer

`StringBuilder` is a **mutable** sequence of characters — it modifies the same object instead of creating new ones.

```java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");      // Hello World
sb.insert(5, ",");        // Hello, World
sb.replace(0, 5, "Hi");   // Hi, World
sb.delete(2, 3);          // Hi World
sb.reverse();             // dlroW iH

String result = sb.toString();   // convert back to String
```

### String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---|---|---|---|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes (synchronized) |
| Performance | Slow for many changes | Fastest | Slower than StringBuilder |
| Use when | Value rarely changes | Heavy modification, single thread | Heavy modification, multiple threads |

```java
// Bad: creates a new String object on every iteration
String s = "";
for (int i = 0; i < 1000; i++) {
    s += i;
}

// Good: modifies the same StringBuilder object
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

---

## Useful Conversions

```java
// Number to String
String s1 = String.valueOf(42);       // "42"
String s2 = Integer.toString(42);     // "42"

// String to number
int n = Integer.parseInt("42");       // 42
double d = Double.parseDouble("3.14");  // 3.14

// String to char array and back
char[] chars = "hello".toCharArray();
String s3 = new String(chars);
```

---

## String Formatting

```java
String name = "Saurabh";
int age = 25;

String msg = String.format("My name is %s and I am %d years old", name, age);
System.out.printf("Name: %s, Age: %d%n", name, age);

// Text blocks (Java 15+) for multi-line strings
String html = """
    <html>
        <body>Hello</body>
    </html>
    """;
```

| Format specifier | Meaning |
|---|---|
| `%s` | String |
| `%d` | Integer |
| `%f` | Floating point (`%.2f` → 2 decimal places) |
| `%c` | Character |
| `%b` | Boolean |
| `%n` | New line |

---

## Summary

- A `String` is an object holding a sequence of characters, stored in the **String Pool** when created as a literal.
- Strings are **immutable** — every modification creates a new object.
- Compare values with `equals()`, never with `==`.
- Use `StringBuilder` for heavy string modification (or `StringBuffer` when thread safety is needed).
- `String.format()` and text blocks help build formatted and multi-line strings.
