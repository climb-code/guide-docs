---
title: Packages and Access Modifiers in Java
description: Learn how Java packages organize classes, how imports work, and how public, private, protected, and default access modifiers control visibility.
---

As Java projects grow, keeping every class in one folder becomes hard to manage. **Packages** help you group related classes, while **access modifiers** decide which classes, fields, constructors, and methods can be used from other parts of the program.

---

## What is a Package?

A **package** is a namespace that groups related Java classes and interfaces together.

For example, Java already provides built-in packages:

- `java.lang` - basic classes like `String`, `Math`, `System`
- `java.util` - utility classes like `ArrayList`, `HashMap`, `Scanner`
- `java.io` - file and input/output classes
- `java.time` - date and time classes

In real projects, packages make code easier to find, reuse, and maintain.

---

## Creating a Package

Use the `package` keyword at the top of a Java file.

```java
package com.guidedocs.school;

public class Student {
    public void display() {
        System.out.println("Student details");
    }
}
```

Important rules:

1. The package statement must be the first non-comment line in the file.
2. Package names are usually written in lowercase.
3. Folder structure should match the package name.

For the package `com.guidedocs.school`, the file path should look like this:

```text
com/guidedocs/school/Student.java
```

---

## Importing Classes

To use a class from another package, use the `import` keyword.

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Saurabh");

        System.out.println(names);
    }
}
```

You can also import all classes from a package:

```java
import java.util.*;
```

However, importing only the classes you need is usually clearer.

---

## Fully Qualified Class Name

Instead of importing, you can use the full package path with the class name.

```java
public class Main {
    public static void main(String[] args) {
        java.util.Scanner input = new java.util.Scanner(System.in);

        System.out.print("Enter name: ");
        String name = input.nextLine();

        System.out.println("Hello " + name);
    }
}
```

This is called using a **fully qualified class name**. It is useful when two packages have classes with the same name.

---

## What are Access Modifiers?

**Access modifiers** control visibility. They answer this question:

> From where can this class, variable, constructor, or method be accessed?

Java has four main access levels:

| Modifier | Same class | Same package | Subclass in another package | Anywhere |
|---|---|---|---|---|
| `private` | Yes | No | No | No |
| default (no keyword) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

---

## public

The `public` modifier makes something accessible from anywhere.

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

Use `public` for classes and methods that are meant to be used by other parts of your application.

---

## private

The `private` modifier allows access only inside the same class.

```java
public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

Here, `balance` cannot be changed directly from outside the class. This supports **encapsulation**.

---

## protected

The `protected` modifier allows access:

1. Inside the same class
2. Inside the same package
3. Inside subclasses, even if they are in another package

```java
class Animal {
    protected String name;

    protected void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    public void show() {
        name = "Bruno";
        eat();
    }
}
```

Use `protected` when child classes need access to parent class members.

---

## Default Access

If you do not write any access modifier, Java uses **default access**, also called **package-private** access.

```java
class Helper {
    void printMessage() {
        System.out.println("Package helper method");
    }
}
```

This class and method can be accessed only inside the same package.

---

## Class Access Modifiers

Top-level classes can only be:

- `public`
- default (no keyword)

Example:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Public class");
    }
}
```

A top-level class cannot be `private` or `protected`.

---

## Best Practices

1. Keep fields `private` and access them through methods when needed.
2. Use `public` only for classes and methods that should be used outside the class or package.
3. Use packages to group related code, such as `model`, `service`, `controller`, and `repository`.
4. Avoid putting too many unrelated classes in the same package.
5. Prefer clear package names like `com.company.project.feature`.

---

## Quick Summary

| Concept | Meaning |
|---|---|
| Package | Groups related classes and avoids name conflicts |
| `import` | Allows using classes from another package |
| Fully qualified name | Uses complete package path with class name |
| `public` | Accessible everywhere |
| `private` | Accessible only inside the same class |
| `protected` | Accessible in same package and subclasses |
| default | Accessible only inside the same package |

---

### Next Steps

After understanding packages and access modifiers, continue with **Constructors, `this`, and `super`** to learn how Java initializes objects and connects parent-child class behavior.
