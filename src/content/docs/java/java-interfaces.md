---
title: Interfaces in Java
description: Learn about Interfaces in Java, how to define and implement them, default and static methods, and how interfaces enable multiple inheritance.
---

An **interface** in Java is a blueprint of a class. It defines a contract — a set of abstract methods that any implementing class must provide. Interfaces are the second way (after abstract classes) to achieve **abstraction** in Java.

Think of an interface like a remote control specification: it says every remote must have `powerOn()`, `powerOff()`, and `volumeUp()` buttons, but each TV brand implements those buttons in its own way.

---

## Declaring an Interface

An interface is declared using the `interface` keyword.

```java
interface Animal {
    void eat();   // implicitly public and abstract
    void sleep(); // implicitly public and abstract
}
```

Key rules of an interface:

1. Methods are implicitly `public` and `abstract` (unless `default`, `static`, or `private`).
2. Fields are implicitly `public`, `static`, and `final` (constants).
3. An interface **cannot be instantiated** directly.
4. A class uses the `implements` keyword to implement an interface.
5. A class can implement **multiple interfaces** — this is how Java supports multiple inheritance of type.

---

## Implementing an Interface

```java
interface Animal {
    void eat();
    void sleep();
}

class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("Dog eats bones");
    }

    @Override
    public void sleep() {
        System.out.println("Dog sleeps in a kennel");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog(); // interface reference, class object
        myDog.eat();   // Output: Dog eats bones
        myDog.sleep(); // Output: Dog sleeps in a kennel
    }
}
```

---

## Multiple Interfaces

A class can implement more than one interface, separated by commas.

```java
interface Printable {
    void print();
}

interface Showable {
    void show();
}

class Document implements Printable, Showable {
    @Override
    public void print() {
        System.out.println("Printing document...");
    }

    @Override
    public void show() {
        System.out.println("Showing document...");
    }
}
```

---

## Default and Static Methods (Java 8+)

Since Java 8, interfaces can have methods with a body:

- **`default` methods** — provide a default implementation that implementing classes inherit and may override.
- **`static` methods** — belong to the interface itself and are called using the interface name.

```java
interface Vehicle {
    void start();

    // Default method - inherited by implementing classes
    default void honk() {
        System.out.println("Beep beep!");
    }

    // Static method - called on the interface itself
    static int wheels() {
        return 4;
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starts with a key");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();                     // Output: Car starts with a key
        car.honk();                      // Output: Beep beep! (default method)
        System.out.println(Vehicle.wheels()); // Output: 4 (static method)
    }
}
```

---

## Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---|---|---|
| Keyword | `interface` / `implements` | `abstract` / `extends` |
| Multiple inheritance | A class can implement many interfaces | A class can extend only one abstract class |
| Fields | Only `public static final` constants | Any type of fields |
| Constructors | Not allowed | Allowed |
| Method types | Abstract, `default`, `static`, `private` | Abstract and concrete |
| When to use | Unrelated classes share a contract | Related classes share common code |

---

## Benefits of Interfaces

1. **Multiple Inheritance of Type:** A class can implement several interfaces, which is not possible with classes.
2. **Loose Coupling:** Code depends on the contract, not on a specific implementation.
3. **Polymorphism:** An interface reference can point to any implementing class's object.
4. **Testability:** Implementations can easily be swapped with mock versions in tests.

---

## Key Takeaways

- An interface defines *what* a class must do, not *how* it does it.
- All interface methods are implicitly `public abstract`, and fields are `public static final`.
- A class can implement multiple interfaces using `implements`.
- Since Java 8, interfaces can carry behavior via `default` and `static` methods.
