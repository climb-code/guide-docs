---
title: Polymorphism in Java
description: Learn about Polymorphism in Java, the difference between Compile-time (Method Overloading) and Runtime (Method Overriding) Polymorphism, and how they are implemented.
---

**Polymorphism** is one of the core concepts of Object-Oriented Programming (OOP). The word "polymorphism" comes from two Greek words: *poly* (meaning many) and *morphs* (meaning forms). In programming, it refers to the ability of a variable, function, or object to take on multiple forms.

Specifically in Java, polymorphism allows us to perform a single action in different ways.

---

## Types of Polymorphism

In Java, polymorphism is divided into two main categories:
1. **Compile-time Polymorphism** (Static Binding / Method Overloading)
2. **Runtime Polymorphism** (Dynamic Binding / Method Overriding)

---

## 1. Compile-time Polymorphism (Method Overloading)

Compile-time polymorphism is resolved during the compilation of the program. Java achieves this through **Method Overloading**.

Method overloading occurs when a class has multiple methods with the same name, but different parameter lists (different number of parameters, different types of parameters, or different order of parameters).

### Example of Method Overloading:

```java
class MathOperations {
    // Overloaded method with 2 int parameters
    public int add(int a, int b) {
        return a + b;
    }

    // Overloaded method with 3 int parameters
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Overloaded method with 2 double parameters
    public double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        MathOperations math = new MathOperations();
        
        System.out.println(math.add(5, 10));         // Output: 15
        System.out.println(math.add(5, 10, 15));     // Output: 30
        System.out.println(math.add(5.5, 4.5));      // Output: 10.0
    }
}
```

> [!NOTE]
> Changing only the return type of a method does **not** overload the method. The parameter list must be different.

---

## 2. Runtime Polymorphism (Method Overriding)

Runtime polymorphism is resolved during runtime. Java achieves this through **Method Overriding** combined with **Upcasting**.

Method overriding occurs when a subclass provides a specific implementation for a method that is already defined in its superclass. 

### Upcasting
To trigger runtime polymorphism, we declare a reference variable of the superclass type but instantiate it using the subclass constructor.

**Syntax:**
```java
Parent obj = new Child();
```

### Example of Method Overriding:

```java
// Superclass
class Animal {
    public void makeSound() {
        System.out.println("The animal makes a sound");
    }
}

// Subclass 1
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("The dog barks: Woof Woof");
    }
}

// Subclass 2
class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("The cat meows: Meow Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal(); // Animal reference and object
        Animal myDog = new Dog();       // Animal reference but Dog object (Upcasting)
        Animal myCat = new Cat();       // Animal reference but Cat object (Upcasting)

        myAnimal.makeSound(); // Output: The animal makes a sound
        myDog.makeSound();    // Output: The dog barks: Woof Woof (Runtime Polymorphism)
        myCat.makeSound();    // Output: The cat meows: Meow Meow (Runtime Polymorphism)
    }
}
```

---

## Why Use Polymorphism?

1. **Flexibility and Extensibility:** You can write code that works with a parent class reference, and it will automatically work with any future subclass without modification.
2. **Code Cleanliness:** It allows a unified interface for a set of varied implementations (e.g., a single `draw()` method call rendering shapes, circles, or squares differently).
