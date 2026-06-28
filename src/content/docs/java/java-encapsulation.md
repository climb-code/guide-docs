---
title: Encapsulation in Java
description: Learn about Encapsulation in Java, how to declare variables as private, and write getter and setter methods to control access.
---

**Encapsulation** is one of the four fundamental concepts of Object-Oriented Programming (OOP), alongside inheritance, polymorphism, and abstraction. 

Encapsulation is the mechanism of wrapping code (methods) and data (variables) together as a single unit. In encapsulation, the variables of a class are hidden from other classes and can only be accessed through the methods of their current class. Therefore, it is also known as **data hiding**.

---

## How to Implement Encapsulation

To achieve encapsulation in Java:
1. Declare the variables of a class as `private`.
2. Provide public `getter` and `setter` methods to modify and view the variables' values.

---

## Example of Encapsulation

Let's look at a class where the field `name` is encapsulated.

```java
class Person {
    // 1. Private field (cannot be accessed directly from outside this class)
    private String name;
    private int age;

    // 2. Getter method for name
    public String getName() {
        return name;
    }

    // Setter method for name
    public void setName(String newName) {
        this.name = newName;
    }

    // Getter method for age
    public int getAge() {
        return age;
    }

    // Setter method for age with validation
    public void setAge(int newAge) {
        if (newAge >= 0) {
            this.age = newAge;
        } else {
            System.out.println("Age cannot be negative.");
        }
    }
}
```

Now, let's see how we access and modify these fields from another class:

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        // person.name = "John"; // ERROR: name has private access in Person

        // Setting values using setter methods
        person.setName("John Doe");
        person.setAge(25);

        // Getting values using getter methods
        System.out.println("Name: " + person.getName()); // Output: Name: John Doe
        System.out.println("Age: " + person.getAge());   // Output: Age: 25
    }
}
```

---

## Benefits of Encapsulation

1. **Control Over Data:** You can decide which fields are read-only (by providing only a getter), write-only (by providing only a setter), or both.
2. **Data Validation:** You can validate data before storing it (e.g., checking if `age` is positive inside `setAge()`).
3. **Flexibility and Maintainability:** You can change the internal implementation of a class without breaking the code of other classes that use it.
4. **Security:** It keeps the critical data of an object safe from unintended external modification.
