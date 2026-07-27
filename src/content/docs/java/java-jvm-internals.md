---
title: JVM Internals in Java
description: Learn how the Java Virtual Machine runs Java programs, including bytecode, class loading, memory areas, stack, heap, garbage collection, and JIT compilation.
---

The **JVM** stands for **Java Virtual Machine**. It is the runtime engine that executes compiled Java bytecode and makes Java platform independent.

When you run a Java program, the source code does not run directly. It goes through this flow:

```text
Java source code (.java)
        |
        v
Java compiler (javac)
        |
        v
Bytecode (.class)
        |
        v
JVM
        |
        v
Machine code for the current operating system
```

This is why Java is called **write once, run anywhere**: the same `.class` file can run on any machine that has a compatible JVM.

---

## Main Parts of the JVM

The JVM has three major responsibilities:

1. **Class loading** - loads `.class` files into memory
2. **Runtime memory management** - stores objects, method calls, variables, and metadata
3. **Execution** - interprets bytecode and compiles hot code into native machine code

---

## Class Loader

The **class loader** loads Java classes when they are needed.

Class loading happens in three main steps:

| Step | Meaning |
| ---- | ------- |
| Loading | Reads the `.class` file into memory |
| Linking | Verifies bytecode and prepares static fields |
| Initialization | Runs static initializers and assigns static values |

Example:

```java
public class Main {
    static int count = 10;

    static {
        System.out.println("Class initialized");
    }

    public static void main(String[] args) {
        System.out.println(count);
    }
}
```

The static block runs when the class is initialized.

---

## Runtime Memory Areas

The JVM divides memory into different areas.

| Memory Area | Stores |
| ----------- | ------ |
| Heap | Objects and instance variables |
| Stack | Method calls and local variables |
| Method Area | Class metadata and static information |
| Program Counter Register | Address of the current instruction for each thread |
| Native Method Stack | Native method execution details |

---

## Heap Memory

The **heap** stores objects created with `new`.

```java
Student student = new Student("Amit");
```

Here, the `Student` object is stored in the heap. The variable `student` is a reference that points to that object.

Heap memory is shared by all threads in the application.

---

## Stack Memory

The **stack** stores method calls, local variables, and references.

```java
public static void main(String[] args) {
    int age = 21;
    String name = "Priya";
    printName(name);
}

static void printName(String value) {
    System.out.println(value);
}
```

When `main()` calls `printName()`, the JVM creates a new stack frame for `printName()`. When the method finishes, that frame is removed.

Each thread has its own stack.

---

## Stack vs Heap

| Feature | Stack | Heap |
| ------- | ----- | ---- |
| Stores | Method calls and local variables | Objects |
| Scope | Per thread | Shared across threads |
| Speed | Very fast | Slightly slower |
| Managed by | JVM automatically when methods start/end | Garbage collector |
| Error example | `StackOverflowError` | `OutOfMemoryError` |

---

## Garbage Collection

Java automatically removes objects that are no longer reachable. This process is called **garbage collection**.

```java
Student s1 = new Student("Amit");
s1 = null;
```

After `s1 = null`, the object may become eligible for garbage collection if no other reference points to it.

Garbage collection helps prevent common memory leaks, but it does not mean memory problems are impossible. If an application keeps unnecessary references alive, those objects cannot be collected.

---

## Execution Engine

The **execution engine** runs bytecode. It has two important parts:

- **Interpreter** - reads and executes bytecode line by line
- **JIT compiler** - compiles frequently used bytecode into native machine code

JIT stands for **Just-In-Time**. It improves performance by optimizing code that runs many times.

---

## JIT Compilation Example

```java
for (int i = 0; i < 1_000_000; i++) {
    calculateTotal(i);
}
```

If `calculateTotal()` runs many times, the JVM may treat it as hot code and optimize it using the JIT compiler.

This is one reason long-running Java applications can become faster after warm-up.

---

## Common JVM Errors

### StackOverflowError

Usually caused by very deep or infinite recursion.

```java
static void callAgain() {
    callAgain();
}
```

### OutOfMemoryError

Usually caused when the heap cannot allocate more objects.

```java
List<byte[]> data = new ArrayList<>();

while (true) {
    data.add(new byte[1024 * 1024]);
}
```

---

## JVM, JRE, and JDK

| Term | Meaning |
| ---- | ------- |
| JVM | Runs Java bytecode |
| JRE | JVM plus libraries needed to run Java applications |
| JDK | JRE plus development tools like `javac` |

For development, install the **JDK**. For only running Java programs, a runtime is enough.

---

## Best Practices

- Avoid unnecessary object creation in tight loops.
- Close resources such as files, sockets, and database connections.
- Prefer clear code first; let the JVM optimize common cases.
- Use profiling tools before guessing about memory or performance issues.
- Learn stack traces because they show how methods were called.

---

## Key Points

- The JVM runs Java bytecode on the current operating system.
- Heap stores objects; stack stores method calls and local variables.
- Each thread has its own stack, but all threads share the heap.
- Garbage collection removes unreachable objects.
- The JIT compiler improves performance by optimizing frequently executed code.
