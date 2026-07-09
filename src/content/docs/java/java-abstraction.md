---
title: Abstraction in Java
description: Learn about Abstraction in Java, how to use abstract classes and abstract methods to hide implementation details and expose only essential features.
---

**Abstraction** is one of the four fundamental concepts of Object-Oriented Programming (OOP), alongside inheritance, polymorphism, and encapsulation.

Abstraction is the process of hiding the internal implementation details and showing only the essential features of an object. It lets you focus on **what** an object does instead of **how** it does it. For example, when you press the brake pedal of a car, you don't need to know how the braking system works internally — you only need to know that pressing it stops the car.

---

## How to Achieve Abstraction

In Java, abstraction is achieved in two ways:

1. **Abstract classes** (0 to 100% abstraction)
2. **Interfaces** (100% abstraction)

This guide focuses on abstract classes and abstract methods.

---

## Abstract Class

An abstract class is a class declared with the `abstract` keyword. It can have both abstract methods (without a body) and concrete methods (with a body).

Key rules of an abstract class:

1. It **cannot be instantiated** — you cannot create an object of an abstract class directly.
2. It can have constructors, fields, and regular methods.
3. If a class contains at least one abstract method, the class **must** be declared abstract.
4. A subclass that extends an abstract class must implement all its abstract methods, or be declared abstract itself.

---

## Abstract Method

An abstract method is a method that is declared without an implementation (no method body). The body is provided by the subclass.

```java
abstract void draw(); // no body, ends with a semicolon
```

---

## Example of Abstraction

```java
// Abstract class
abstract class Shape {
    String name;

    Shape(String name) {
        this.name = name;
    }

    // Abstract method (no body) - subclasses MUST implement this
    abstract double area();

    // Concrete method - shared by all subclasses
    public void display() {
        System.out.println(name + " has area: " + area());
    }
}

class Circle extends Shape {
    double radius;

    Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    double length, width;

    Rectangle(double length, double width) {
        super("Rectangle");
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}
```

Now, let's use these classes:

```java
public class Main {
    public static void main(String[] args) {
        // Shape s = new Shape("Generic"); // ERROR: Shape is abstract; cannot be instantiated

        Shape circle = new Circle(5);
        Shape rectangle = new Rectangle(4, 6);

        circle.display();    // Output: Circle has area: 78.53981633974483
        rectangle.display(); // Output: Rectangle has area: 24.0
    }
}
```

---

## Abstract Class vs Concrete Class

| Feature | Abstract Class | Concrete Class |
|---|---|---|
| Instantiation | Cannot be instantiated | Can be instantiated |
| Abstract methods | Can have them | Cannot have them |
| Keyword | Declared with `abstract` | No special keyword |
| Purpose | Serves as a base/template | Represents a complete implementation |

---

## Benefits of Abstraction

1. **Reduces Complexity:** Users interact with a simple interface without worrying about internal details.
2. **Improves Maintainability:** Implementation can change without affecting code that depends on the abstraction.
3. **Enforces a Contract:** Subclasses are forced to implement the essential behavior defined by abstract methods.
4. **Promotes Code Reuse:** Common behavior lives in the abstract class, while specific behavior lives in subclasses.

---

## Key Takeaways

- Abstraction hides *how* something works and exposes only *what* it does.
- An abstract class cannot be instantiated and may contain both abstract and concrete methods.
- A subclass must implement all abstract methods of its parent, or itself be declared abstract.
- Use an abstract class when related classes share common code; use an interface when unrelated classes share only a contract.
