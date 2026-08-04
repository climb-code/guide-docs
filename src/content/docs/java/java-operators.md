---
title: Operators in Java
description: Learn all Java operators - arithmetic, assignment, relational, logical, bitwise, shift, ternary and instanceof - with examples, precedence rules and common pitfalls.
---

An **operator** is a symbol that performs an operation on one or more values. The values an operator works on are called **operands**.

```java
int sum = 10 + 5; // + is the operator, 10 and 5 are the operands
```

Java groups its operators into a few families, and this page walks through each one.

---

## Types of Operators

| Category | Operators |
|---|---|
| Arithmetic | `+` `-` `*` `/` `%` |
| Unary | `+` `-` `++` `--` `!` |
| Assignment | `=` `+=` `-=` `*=` `/=` `%=` |
| Relational | `==` `!=` `>` `<` `>=` `<=` |
| Logical | `&&` `\|\|` `!` |
| Bitwise | `&` `\|` `^` `~` |
| Shift | `<<` `>>` `>>>` |
| Ternary | `? :` |
| Type comparison | `instanceof` |

---

## Arithmetic Operators

These perform basic mathematics.

```java
public class Main {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println(a + b); // 22
        System.out.println(a - b); // 12
        System.out.println(a * b); // 85
        System.out.println(a / b); // 3
        System.out.println(a % b); // 2
    }
}
```

Two points worth remembering:

1. Division between two `int` values gives an `int`. The decimal part is dropped, not rounded, so `17 / 5` is `3`.
2. The modulus operator `%` returns the remainder and works on floating point numbers too.

```java
System.out.println(17 / 5);       // 3
System.out.println(17 / 5.0);     // 3.4
System.out.println((double) 17 / 5); // 3.4
System.out.println(-17 % 5);      // -2 (sign follows the left operand)
```

Dividing an integer by zero throws `ArithmeticException`, but dividing a `double` by zero gives `Infinity` or `NaN`.

```java
System.out.println(10.0 / 0);  // Infinity
System.out.println(0.0 / 0);   // NaN
// System.out.println(10 / 0); // ArithmeticException
```

---

## The `+` Operator with Strings

When one operand is a `String`, `+` joins text instead of adding numbers.

```java
System.out.println("Total: " + 10 + 5); // Total: 105
System.out.println("Total: " + (10 + 5)); // Total: 15
```

Java evaluates left to right, so in the first line `"Total: " + 10` already produced a string.

---

## Unary Operators

A unary operator works on a single operand.

```java
int number = 10;

System.out.println(-number); // -10
System.out.println(++number); // 11
System.out.println(--number); // 10

boolean isReady = false;
System.out.println(!isReady); // true
```

### Prefix vs Postfix

`++` and `--` behave differently depending on where they are placed.

```java
int a = 5;
System.out.println(a++); // prints 5, then a becomes 6
System.out.println(a);   // 6

int b = 5;
System.out.println(++b); // b becomes 6, then prints 6
```

| Form | Meaning |
|---|---|
| `a++` | Use the current value, then increase it |
| `++a` | Increase first, then use the new value |

The difference only matters when the value is used in the same expression.

---

## Assignment Operators

`=` stores a value in a variable. The compound forms combine an operation with assignment.

```java
int total = 10;

total += 5;  // total = total + 5  -> 15
total -= 3;  // 12
total *= 2;  // 24
total /= 4;  // 6
total %= 4;  // 2
```

Compound operators perform an implicit cast, which plain arithmetic does not.

```java
byte value = 10;
value += 5;          // fine, cast happens automatically
// value = value + 5; // compile error, int cannot be assigned to byte
```

---

## Relational Operators

These compare two values and always produce a `boolean`.

```java
int a = 10;
int b = 20;

System.out.println(a == b); // false
System.out.println(a != b); // true
System.out.println(a > b);  // false
System.out.println(a < b);  // true
System.out.println(a >= 10); // true
System.out.println(b <= 15); // false
```

### `==` with Objects

For objects, `==` compares references, not contents. Use `equals()` to compare values.

```java
String first = new String("java");
String second = new String("java");

System.out.println(first == second);      // false, different objects
System.out.println(first.equals(second)); // true, same text
```

---

## Logical Operators

Logical operators combine boolean expressions.

| Operator | Name | Result |
|---|---|---|
| `&&` | AND | `true` only if both sides are true |
| `\|\|` | OR | `true` if at least one side is true |
| `!` | NOT | Reverses the value |

```java
int age = 22;
boolean hasLicence = true;

System.out.println(age >= 18 && hasLicence); // true
System.out.println(age < 18 || hasLicence);  // true
System.out.println(!hasLicence);             // false
```

### Short-Circuit Evaluation

`&&` skips the right side when the left side is already `false`, and `||` skips it when the left side is already `true`. This is often used to guard against errors.

```java
String name = null;

if (name != null && name.length() > 3) {
    System.out.println("Valid name");
}
```

Here `name.length()` is never called, so there is no `NullPointerException`.

The single character forms `&` and `|` also work on booleans, but they always evaluate both sides.

---

## Bitwise Operators

Bitwise operators work on the individual bits of integer types.

| Operator | Name | Description |
|---|---|---|
| `&` | AND | Bit is 1 if both bits are 1 |
| `\|` | OR | Bit is 1 if either bit is 1 |
| `^` | XOR | Bit is 1 if the bits are different |
| `~` | Complement | Flips every bit |

```java
int a = 5;  // 0101
int b = 3;  // 0011

System.out.println(a & b); // 1  -> 0001
System.out.println(a | b); // 7  -> 0111
System.out.println(a ^ b); // 6  -> 0110
System.out.println(~a);    // -6
```

A common use is checking whether a number is even.

```java
int number = 42;
System.out.println((number & 1) == 0); // true means even
```

---

## Shift Operators

Shift operators move bits left or right.

| Operator | Name | Description |
|---|---|---|
| `<<` | Left shift | Shifts bits left, fills with 0 |
| `>>` | Signed right shift | Shifts bits right, keeps the sign |
| `>>>` | Unsigned right shift | Shifts bits right, fills with 0 |

```java
int number = 8;   // 00001000

System.out.println(number << 1); // 16, same as number * 2
System.out.println(number >> 1); // 4,  same as number / 2

int negative = -8;
System.out.println(negative >> 1);  // -4
System.out.println(negative >>> 1); // 2147483644
```

Left shifting by `n` multiplies by 2ⁿ, and signed right shifting divides by 2ⁿ.

---

## Ternary Operator

The ternary operator is a short form of `if-else` that returns a value.

```java
condition ? valueIfTrue : valueIfFalse
```

```java
int marks = 72;
String result = marks >= 40 ? "Pass" : "Fail";
System.out.println(result); // Pass
```

It is best for simple choices. Nested ternaries become hard to read, so prefer `if-else` there.

```java
int a = 15;
int b = 25;
int max = a > b ? a : b;
System.out.println(max); // 25
```

---

## The `instanceof` Operator

`instanceof` checks whether an object is of a given type and returns a `boolean`.

```java
Object value = "Hello Java";

if (value instanceof String) {
    String text = (String) value;
    System.out.println(text.length());
}
```

Since Java 16, pattern matching lets you declare the variable in the same statement.

```java
Object value = "Hello Java";

if (value instanceof String text) {
    System.out.println(text.length()); // no manual cast needed
}
```

---

## Operator Precedence

Precedence decides which operator runs first when an expression has several of them.

| Level | Operators | Associativity |
|---|---|---|
| 1 | `++` `--` (postfix) | Left to right |
| 2 | `++` `--` (prefix) `+` `-` (unary) `!` `~` | Right to left |
| 3 | `*` `/` `%` | Left to right |
| 4 | `+` `-` | Left to right |
| 5 | `<<` `>>` `>>>` | Left to right |
| 6 | `<` `<=` `>` `>=` `instanceof` | Left to right |
| 7 | `==` `!=` | Left to right |
| 8 | `&` `^` `\|` | Left to right |
| 9 | `&&` then `\|\|` | Left to right |
| 10 | `? :` | Right to left |
| 11 | `=` `+=` `-=` `*=` `/=` `%=` | Right to left |

```java
int result = 10 + 5 * 2;   // 20, not 30
int forced = (10 + 5) * 2; // 30
```

When in doubt, add brackets. They cost nothing and make the intent obvious.

---

## Common Mistakes

1. Using `=` instead of `==` inside a condition.
2. Expecting `10 / 3` to give `3.33` when both operands are integers.
3. Comparing strings or objects with `==` instead of `equals()`.
4. Mixing `&` and `&&` and losing short-circuit protection.
5. Relying on `a++ + ++a` style expressions, which are confusing to read.

```java
double average = 10 / 3;        // 3.0, division happened first
double correct = 10 / 3.0;      // 3.333...
```

---

## Best Practices

1. Use brackets to make precedence clear instead of memorising the table.
2. Prefer `&&` and `||` over `&` and `|` for boolean logic.
3. Keep ternary expressions to a single condition.
4. Use `equals()` for objects and `==` only for primitives and reference checks.
5. Avoid changing the same variable more than once in one expression.

---

## Quick Summary

| Operator group | Purpose |
|---|---|
| Arithmetic | Basic maths on numbers |
| Unary | Works on one operand, including `++` and `--` |
| Assignment | Stores a value, optionally with an operation |
| Relational | Compares values and returns a boolean |
| Logical | Combines conditions with short-circuit behaviour |
| Bitwise and shift | Works directly on bits |
| Ternary | Compact `if-else` that returns a value |
| `instanceof` | Checks the type of an object |

---

### Next Steps

Now that you can build expressions, the next topic is **Control Flow: If-Else, Switch, and the Ternary Operator**, where these conditions decide which code runs.
