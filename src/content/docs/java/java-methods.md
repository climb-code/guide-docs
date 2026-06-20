---
title: Methods in Java
description: Learn how to declare, define, and call methods (functions) in Java, pass parameters, return values, and understand method overloading.
---

A **method** (also known as a function) is a block of code that only runs when it is called. Methods are used to perform certain actions, and they help organize code into reusable, modular pieces.

By using methods, you write code once and use it many times, which follows the **DRY (Don't Repeat Yourself)** principle.

---

## 1. Declaring a Method

A method must be declared within a class. It is defined with a name, parameters, return type, and body.

**Syntax:**
```java
accessModifier returnType methodName(parameterList) {
    // method body (code to execute)
    return value; // (optional, depending on returnType)
}
```

**Example:**
```java
public class Example {
    // Declaring a method that adds two numbers
    public static int addNumbers(int a, int b) {
        return a + b;
    }
}
```

### Components of a Method:
- **Access Modifier:** Defines the visibility of the method (e.g., `public`, `private`, `protected`).
- **Return Type:** The data type of the value returned by the method. If the method does not return any value, use `void`.
- **Method Name:** The name used to call the method (usually written in `camelCase`).
- **Parameter List:** Input variables passed to the method (comma-separated). If no inputs are needed, leave the parentheses empty `()`.
- **Method Body:** The block of code enclosed in curly braces `{}` that executes when the method is called.

---

## 2. Calling a Method

To execute a method, you need to "call" (or invoke) it. If the method is `static`, it can be called directly within static methods (like the `main` method) of the same class without creating an object.

**Example:**
```java
public class Main {
    // Declaring a method
    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        // Calling the method
        greetUser("Saurabh"); // Output: Hello, Saurabh!
        greetUser("Amit");    // Output: Hello, Amit!
    }
}
```

---

## 3. Parameters and Return Values

### Parameters vs. Arguments
- **Parameter:** The variable listed in the method's definition.
- **Argument:** The actual value passed to the method when it is called.

### Returning Values
If you specify a return type other than `void`, you must use the `return` keyword inside the method to return a value matching that data type.

```java
public class Main {
    public static int calculateSquare(int number) {
        return number * number;
    }

    public static void main(String[] args) {
        int result = calculateSquare(5);
        System.out.println("Square of 5 is: " + result); // Output: 25
    }
}
```

---

## 4. Method Overloading

In Java, multiple methods can have the **same name** as long as they have **different parameter lists** (different number of parameters, different types, or different order of parameters). This is known as **Method Overloading**.

> [!NOTE]
> Method overloading is a form of compile-time (static) polymorphism.

**Example:**
```java
public class MathOperations {
    // Method to add two integers
    public static int add(int a, int b) {
        return a + b;
    }

    // Overloaded method to add three integers
    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    // Overloaded method to add two double values
    public static double add(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(5, 10));         // Calls first method -> Output: 15
        System.out.println(add(5, 10, 15));     // Calls second method -> Output: 30
        System.out.println(add(5.5, 4.5));       // Calls third method -> Output: 10.0
    }
}
```

---

## Best Practices

1. **Descriptive Names:** Use verbs for method names that describe what they do (e.g., `calculateTotal`, `fetchData`, `isValid`).
2. **Single Responsibility:** A method should do one thing and do it well. If a method does multiple things, break it down into smaller helper methods.
3. **Minimize Parameters:** Try to keep the number of parameters to a minimum (ideally 3 or fewer) to make the method easier to call and test.

---

### Next Steps ➡️
Now that you can modularize your code using methods, the next topic will cover **Arrays in Java** to store collections of data.
