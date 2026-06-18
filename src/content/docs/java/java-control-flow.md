---
title: Control Flow in Java
description: Learn how to control the execution flow of your Java programs using conditional statements like if-else, switch-case, and the ternary operator.
---

Control flow statements determine the order in which your code is executed. By default, Java code runs sequentially (line by line). However, using control flow statements, you can make decisions and run specific blocks of code based on conditions.

---

## 1. Conditional Statements (if-else)

Conditional statements allow your program to make decisions based on boolean expressions (conditions that evaluate to either `true` or `false`).

### The `if` Statement
The `if` statement executes a block of code only if the specified condition is `true`.

```java
int temperature = 30;

if (temperature > 25) {
    System.out.println("It's a hot day!");
}
```

### The `if-else` Statement
Use `else` to specify a block of code to run if the condition in the `if` statement is `false`.

```java
int age = 16;

if (age >= 18) {
    System.out.println("You are eligible to vote.");
} else {
    System.out.println("You are not eligible to vote yet.");
}
```

### The `if-else-if` Ladder
Use `else if` to specify a new condition to test if the first condition is `false`. You can chain multiple `else if` blocks together.

```java
int marks = 85;

if (marks >= 90) {
    System.out.println("Grade: A+");
} else if (marks >= 80) {
    System.out.println("Grade: A");
} else if (marks >= 70) {
    System.out.println("Grade: B");
} else {
    System.out.println("Grade: C/Pass");
}
```

### Nested `if` Statements
You can place an `if` statement inside another `if` statement to check multiple levels of conditions.

```java
int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("You are allowed to drive.");
    } else {
        System.out.println("You need a license to drive.");
    }
} else {
    System.out.println("You are too young to drive.");
}
```

---

## 2. Switch Statement

The `switch` statement selects one of many code blocks to be executed based on the value of an expression. It is often a cleaner alternative to a long `if-else-if` ladder when comparing a single variable against multiple constant values.

```java
int day = 3;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday"); // Output
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    default:
        System.out.println("Weekend!");
}
```

> [!IMPORTANT]
> **The `break` Keyword:** When Java reaches a `break` keyword, it breaks out of the switch block. If you omit `break`, execution will "fall through" to the next case, executing its code regardless of whether the condition matches, until a `break` or the end of the switch block is reached.

---

## 3. Ternary Operator (`? :`)

The ternary operator is a shorthand way of writing an `if-else` statement. It is called ternary because it takes three operands.

**Syntax:**
```java
variable = (condition) ? expressionTrue : expressionFalse;
```

**Example:**
```java
int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
System.out.println(status); // Outputs: Adult
```

---

## Best Practices & Common Pitfalls

### 1. Comparing Strings in Java
Never compare Strings using `==`. The `==` operator compares memory references (addresses), not the actual content of the strings. Always use the `.equals()` method.

```java
String str1 = new String("Hello");
String str2 = new String("Hello");

// ❌ WRONG (returns false because they are different objects in memory)
if (str1 == str2) { ... }

//  CORRECT (returns true because the content is identical)
if (str1.equals(str2)) { ... }
```

### 2. Missing `break` in Switch Cases
Always double-check that every `case` in a `switch` block has a `break` statement unless you are intentionally implementing fall-through behavior.

### 3. Keep Conditions Readable
Avoid writing overly complex conditions inside a single `if` statement. If a condition is too long, extract it into a descriptive boolean variable.

```java
// ❌ Hard to read
if (user.isAgeValid() && user.hasActiveSubscription() && !user.isBlocked() && (user.isAdmin() || user.hasPermission("WRITE"))) { ... }

//  Clean and readable
boolean canWrite = user.isAgeValid() && user.hasActiveSubscription() && !user.isBlocked() && (user.isAdmin() || user.hasPermission("WRITE"));
if (canWrite) { ... }
```

---

### Next Steps ➡️
Now that you know how to make decisions in Java, the next topic will cover how to repeat tasks using **Java Loops (Iteration)**.
