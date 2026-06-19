---
title: Loops in Java
description: Learn how to execute code blocks repeatedly using for, while, do-while, and for-each loops in Java, and control them using break and continue.
---

Loops are used in programming to execute a block of code repeatedly as long as a specified condition remains `true`. They help reduce code duplication and make it easier to traverse data structures.

Java provides four main types of loops:
1. **`for` loop**
2. **`while` loop**
3. **`do-while` loop**
4. **`for-each` loop (Enhanced `for` loop)**

---

## 1. The `for` Loop

The `for` loop is ideal when you know in advance how many times the loop should run.

**Syntax:**
```java
for (initialization; condition; update) {
    // code block to be executed
}
```

**Example:**
```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Iteration: " + i);
}
```

- **Initialization:** Executes once before the loop starts.
- **Condition:** Evaluated before every iteration. If `true`, the loop body runs.
- **Update:** Executes after the loop body has run, usually incrementing or decrementing the loop control variable.

---

## 2. The `while` Loop

The `while` loop runs code as long as a specified condition evaluates to `true`. Use this when you do not know the exact number of iterations beforehand.

**Syntax:**
```java
while (condition) {
    // code block to be executed
    // increment/decrement or update condition
}
```

**Example:**
```java
int count = 1;
while (count <= 5) {
    System.out.println("Count: " + count);
    count++; // Critical: update statement to avoid infinite loop
}
```

---

## 3. The `do-while` Loop

The `do-while` loop is a variant of the `while` loop. The key difference is that it executes the code block **once** before checking if the condition is true. It then repeats the loop as long as the condition remains true.

**Syntax:**
```java
do {
    // code block to be executed
} while (condition);
```

**Example:**
```java
int number = 10;
do {
    System.out.println("Number is: " + number);
    number++;
} while (number < 5); // Condition is false, but code runs once
```

---

## 4. The Enhanced `for-each` Loop

The `for-each` loop is designed specifically to iterate through arrays or collections. It is cleaner and less error-prone because you don't have to manage loop indices.

**Syntax:**
```java
for (type variableName : arrayName) {
    // code block to be executed
}
```

**Example:**
```java
String[] programmingLanguages = {"Java", "Python", "JavaScript", "C++"};

for (String language : programmingLanguages) {
    System.out.println("Language: " + language);
}
```

---

## Loop Control Statements

Java provides two keyword statements to control the flow of loops: `break` and `continue`.

### 1. The `break` Statement
The `break` statement is used to jump out of/terminate a loop prematurely, regardless of whether the loop condition is met.

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break; // exits the loop when i is 5
    }
    System.out.println(i);
}
// Output: 1, 2, 3, 4
```

### 2. The `continue` Statement
The `continue` statement skips the current iteration and jumps directly to the next iteration of the loop (evaluating the loop update and condition).

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // skips the rest of the loop block for i = 3
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5
```

---

## Infinite Loops

An infinite loop occurs when a loop's condition never becomes `false`. This can crash your application or consume excessive CPU resources.

**Example of an Infinite Loop:**
```java
// ❌ Dangerous: This runs forever
while (true) {
    System.out.println("Infinite loop!");
}
```

> [!CAUTION]
> Always ensure that your loop has a clear exit condition (e.g., the loop variable is incremented/decremented properly, or a `break` statement is reached).

---

### Next Steps ➡️
Now that you can repeat tasks using loops, the next topic will cover **Methods (Functions)** to organize and reuse your Java code.
