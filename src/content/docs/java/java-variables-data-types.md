---
title: Java Variables and Data Types
description: Learn how to declare variables, understand primitive and non-primitive data types, and use basic operators in Java.
---

Variables are the fundamental building blocks of any program. In Java, a variable is a container that holds data which can be changed during the execution of the program.

## Declaring and Initializing Variables

In Java, every variable must be declared with a specific **data type**. This tells the compiler how much memory to allocate and what kind of data can be stored.

**Syntax:**
```java
dataType variableName = value;
```

**Example:**
```java
int age = 25;
String name = "Saurabh";
double salary = 50000.50;
```

---

## Data Types in Java

Java is a **statically-typed** language, meaning all variables must be declared before they can be used. Data types are divided into two groups:

### 1. Primitive Data Types
These are predefined by the language and named by a reserved keyword. There are 8 primitive data types:

| Type | Size | Description |
| :--- | :--- | :--- |
| `byte` | 1 byte | Stores whole numbers from -128 to 127 |
| `short` | 2 bytes | Stores whole numbers from -32,768 to 32,767 |
| `int` | 4 bytes | Stores whole numbers from -2,147,483,648 to 2,147,483,647 |
| `long` | 8 bytes | Stores whole numbers for very large ranges (suffix with `L`) |
| `float` | 4 bytes | Stores fractional numbers (suffix with `f`) |
| `double` | 8 bytes | Stores fractional numbers (more precision than float) |
| `boolean` | 1 bit | Stores `true` or `false` |
| `char` | 2 bytes | Stores a single character/ASCII value (enclosed in `' '`) |

### 2. Non-Primitive (Reference) Data Types
These are created by the programmer and are not predefined by Java (except for `String`). Examples include:
- **Strings:** A sequence of characters. `String greeting = "Hello";`
- **Arrays:** Collections of data of the same type.
- **Classes & Interfaces.**

---

## Type Casting

Type casting is when you assign a value of one primitive data type to another type.

### Widening Casting (Implicit)
Converting a smaller type to a larger type size. This happens automatically.
`byte` -> `short` -> `char` -> `int` -> `long` -> `float` -> `double`

```java
int myInt = 9;
double myDouble = myInt; // Automatic casting: int to double
```

### Narrowing Casting (Explicit)
Converting a larger type to a smaller size type. This must be done manually.
`double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`

```java
double myDouble = 9.78d;
int myInt = (int) myDouble; // Manual casting: double to int
```

---

## Java Operators

Operators are used to perform operations on variables and values.

### 1. Arithmetic Operators
| Operator | Name | Example |
| :--- | :--- | :--- |
| `+` | Addition | `x + y` |
| `-` | Subtraction | `x - y` |
| `*` | Multiplication | `x * y` |
| `/` | Division | `x / y` |
| `%` | Modulus | `x % y` (Returns division remainder) |
| `++` | Increment | `++x` |
| `--` | Decrement | `--x` |

### 2. Relational (Comparison) Operators
Used to compare two values, returning a boolean.
- `==` (Equal to)
- `!=` (Not equal)
- `>` (Greater than)
- `<` (Less than)
- `>=` (Greater than or equal)
- `<=` (Less than or equal)

### 3. Logical Operators
Used to determine the logic between variables or values.
- `&&` (Logical and)
- `||` (Logical or)
- `!` (Logical not)

---

### Next Steps
Now that you understand variables and data types, the next topic will cover **Control Flow: If-Else, Switch, and Loops**.
