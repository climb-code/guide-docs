---
title: Constructors, this, and super in Java
description: Learn how to overload constructors, use the 'this' keyword to refer to the current object, and use the 'super' keyword to interact with parent classes.
---

When building object-oriented programs in Java, initializing objects properly and managing relationships between parent (superclass) and child (subclass) classes are crucial. 

This guide covers **Constructor Overloading**, and how the **`this`** and **`super`** keywords are used to manage object state and hierarchy.

---

## 1. Constructor Overloading

Just like methods, constructors can also be overloaded in Java. **Constructor Overloading** is a technique of having more than one constructor with different parameter lists so that objects can be initialized in different ways.

**Example:**
```java
public class Employee {
    String name;
    int id;
    double salary;

    // 1. Constructor with one parameter
    public Employee(String name) {
        this.name = name;
        this.id = 0;
        this.salary = 0.0;
    }

    // 2. Overloaded constructor with three parameters
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
}
```

---

## 2. The `this` Keyword

In Java, **`this`** is a reference variable that refers to the **current object** (the instance of the class in which it is used).

Here are the most common use cases of the `this` keyword:

### A. To Resolve Naming Conflicts (Shadowing)
When instance variables (fields) and parameters of a method/constructor share the same name, Java instance variables are "shadowed". Use `this.variableName` to explicitly refer to the instance variable.

```java
public class User {
    String username; // Instance variable

    public User(String username) {
        // 'this.username' refers to the instance variable
        // 'username' refers to the constructor parameter
        this.username = username; 
    }
}
```

### B. To Invoke the Current Class Constructor (Constructor Chaining)
You can use `this()` to call another constructor within the same class. This helps avoid code duplication when you have multiple overloaded constructors.

> [!IMPORTANT]
> The call to `this()` **must be the first statement** in the constructor.

```java
public class Product {
    String name;
    double price;

    public Product() {
        // Calls the parameterized constructor below with default values
        this("Generic Product", 9.99); 
    }

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
```

---

## 3. The `super` Keyword

In Java, **`super`** is a reference variable used to refer to the **immediate parent class object**. 

Here are the primary use cases of the `super` keyword:

### A. To Invoke Parent Class Constructor
You can use `super()` to call the constructor of the parent class. If you don't explicitly call `super()`, the Java compiler automatically inserts a call to the parent class's no-argument constructor as the first line of the child constructor.

> [!IMPORTANT]
> The call to `super()` **must be the first statement** in the child constructor.

```java
// Parent Class
class Animal {
    String type;

    public Animal(String type) {
        this.type = type;
    }
}

// Child Class
class Dog extends Animal {
    String breed;

    public Dog(String type, String breed) {
        super(type); // Invoking parent class constructor
        this.breed = breed;
    }
}
```

### B. To Access Parent Class Variables and Methods
Use `super` when a subclass has instance variables or methods with the same name as the parent class, and you want to access the parent's member (method overriding/hiding).

```java
class Parent {
    void show() {
        System.out.println("Parent's show method");
    }
}

class Child extends Parent {
    @Override
    void show() {
        System.out.println("Child's show method");
    }

    void display() {
        show();        // Calls Child's show()
        super.show();  // Calls Parent's show()
    }
}
```

---

## Key Differences: `this` vs `super`

| Feature | `this` | `super` |
| :--- | :--- | :--- |
| **Refers to** | Current class instance | Parent class instance |
| **Constructor Call** | `this()` calls current class constructor | `super()` calls parent class constructor |
| **Usage Position** | `this()` must be the first statement in a constructor | `super()` must be the first statement in a constructor |
| **Availability** | Can be used in any non-static context | Can be used in any non-static context |

---

### Next Steps ➡️
Now that you know how to initialize and connect classes using constructors and hierarchy keywords, the next topic will cover **Inheritance in Java** to learn how to create reusable class hierarchies.
