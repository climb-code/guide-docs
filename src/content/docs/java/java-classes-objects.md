    ---

title: Classes and Objects in Java
description: Learn the fundamentals of Object-Oriented Programming (OOP) in Java by understanding classes, creating objects, and working with constructors.

---

Java is an **Object-Oriented Programming (OOP)** language. In OOP, programs are organized around "objects" rather than actions and logic.

To understand OOP, you must understand two core concepts: **Classes** and **Objects**.

---

## 1. What is a Class and an Object?

- **Class:** A blueprint, template, or prototype from which objects are created. It defines a set of properties (attributes) and behaviors (methods) that the objects will have. A class does not occupy memory.
- **Object:** An instance of a class. It is a physical entity that has state (attributes) and behavior (methods) and occupies memory.

### Real-world Analogy:

Think of a **Class** as a blueprint for a house. The blueprint itself is not a house, but it describes how to build one. An **Object** is the actual physical house built using that blueprint. You can build multiple houses (objects) from a single blueprint (class).

---

## 2. Creating a Class

In Java, a class is defined using the `class` keyword.

```java
// Defining the class
public class Car {
    // Attributes (Variables)
    String color;
    String brand;
    int maxSpeed;

    // Behavior (Method)
    public void displayDetails() {
        System.out.println("Brand: " + brand + ", Color: " + color + ", Max Speed: " + maxSpeed + " km/h");
    }
}
```

---

## 3. Creating and Using Objects

To create an object of a class, use the `new` keyword followed by the class name and parentheses. You can then access attributes and methods using the dot (`.`) operator.

```java
public class Main {
    public static void main(String[] args) {
        // Creating an object of class Car
        Car myCar = new Car();

        // Accessing and setting attributes
        myCar.brand = "Toyota";
        myCar.color = "Red";
        myCar.maxSpeed = 180;

        // Calling method
        myCar.displayDetails(); // Output: Brand: Toyota, Color: Red, Max Speed: 180 km/h
    }
}
```

---

## 4. Java Constructors

A **constructor** is a special method that is used to initialize newly created objects. It is called automatically when an object is instantiated.

### Key Rules for Constructors:

1. The constructor name **must match the class name** exactly.
2. It **must not have a return type** (not even `void`).

### Types of Constructors:

#### 1. Default Constructor (No-Argument)

If you do not write a constructor, Java automatically creates a default constructor that initializes attributes to their default values (e.g., `0` for numbers, `null` for objects).

```java
public class Car {
    String brand;

    // No-arg constructor
    public Car() {
        brand = "Unknown";
    }
}
```

#### 2. Parameterized Constructor

A constructor that accepts parameters. This allows you to pass initial values to object attributes at the time of creation.

```java
public class Car {
    String brand;
    String color;

    // Parameterized constructor
    public Car(String b, String c) {
        brand = b;
        color = c;
    }

    public void display() {
        System.out.println(brand + " is " + color);
    }

    public static void main(String[] args) {
        // Passing arguments to constructor
        Car car1 = new Car("Honda", "Black");
        Car car2 = new Car("Ford", "White");

        car1.display(); // Output: Honda is Black
        car2.display(); // Output: Ford is White
    }
}
```

---

## Summary: Class vs Object

| Feature              | Class                                | Object                        |
| :------------------- | :----------------------------------- | :---------------------------- |
| **Definition**       | Blueprint / Template                 | Instance of a class           |
| **Existence**        | Logical entity                       | Physical entity               |
| **Memory**           | Does not allocate memory on creation | Allocates memory when created |
| **Creation Keyword** | `class`                              | `new`                         |

---

### Next Steps ➡️

Now that you know how to create classes and objects, the next topic will cover **Constructors, `this` and `super` keywords** in more detail to master object initialization.
