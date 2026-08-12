---
title: Reflection in Java
description: Learn how Java Reflection inspects and uses classes, fields, methods, and constructors at runtime, with practical examples and safety guidelines.
---

**Reflection** is a Java feature that lets a program inspect and use classes at runtime. With reflection, code can discover a class's fields, methods, constructors, and annotations even when those details were not known when the program was compiled.

Frameworks such as Spring, JUnit, and Hibernate use reflection to create objects, find annotations, and connect application code to configuration.

---

## Why Use Reflection?

Reflection is useful when code needs to work with many types in a generic way.

Common uses include:

- Dependency injection frameworks creating objects automatically
- Test frameworks locating methods marked with an annotation
- Object mappers reading fields to convert JSON or database data into objects
- Developer tools inspecting classes and their members

For normal application logic, prefer direct method calls. Reflection is more flexible, but it is harder to read and has less compile-time safety.

---

## Getting a Class Object

The `Class` object describes a Java type at runtime.

```java
class Student {
    private String name;
}

Class<Student> studentClass = Student.class;
System.out.println(studentClass.getName());
```

You can also get it from an object.

```java
Student student = new Student();
Class<?> type = student.getClass();

System.out.println(type.getSimpleName()); // Student
```

When the class name is available only as text, use `Class.forName()`.

```java
Class<?> type = Class.forName("com.example.Student");
```

`Class.forName()` throws `ClassNotFoundException` if the class is unavailable.

---

## Inspecting Fields and Methods

Use `getDeclaredFields()` and `getDeclaredMethods()` to see members declared directly in a class.

```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;

class Student {
    private String name;

    public void study() {
        System.out.println("Studying");
    }
}

Class<Student> type = Student.class;

for (Field field : type.getDeclaredFields()) {
    System.out.println(field.getName());
}

for (Method method : type.getDeclaredMethods()) {
    System.out.println(method.getName());
}
```

Output:

```text
name
study
```

`getFields()` and `getMethods()` return only public members, including inherited ones. The `getDeclared...()` variants include private members declared by that class, but do not include inherited members.

---

## Creating an Object with a Constructor

Reflection can call a constructor to create an object.

```java
import java.lang.reflect.Constructor;

class User {
    private final String name;

    User(String name) {
        this.name = name;
    }
}

Constructor<User> constructor = User.class.getDeclaredConstructor(String.class);
User user = constructor.newInstance("Amit");
```

Prefer `getDeclaredConstructor().newInstance()` over the older `Class.newInstance()`, which has been deprecated.

---

## Invoking a Method

Use a `Method` object to call a method dynamically.

```java
import java.lang.reflect.Method;

class Greeting {
    public String message(String name) {
        return "Hello, " + name;
    }
}

Greeting greeting = new Greeting();
Method method = Greeting.class.getMethod("message", String.class);

String result = (String) method.invoke(greeting, "Priya");
System.out.println(result); // Hello, Priya
```

`invoke()` returns `Object`, so cast the result when the method has a return value.

---

## Accessing Private Members

Private fields and methods are normally inaccessible. Reflection can request access with `setAccessible(true)`.

```java
import java.lang.reflect.Field;

class Account {
    private double balance = 500.0;
}

Account account = new Account();
Field balance = Account.class.getDeclaredField("balance");

balance.setAccessible(true);
System.out.println(balance.getDouble(account)); // 500.0
```

This should be used sparingly. It bypasses encapsulation and can fail when Java module boundaries forbid deep reflection.

---

## Reading Annotations

Reflection can check whether a class or method has an annotation.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@interface Audited {
}

@Audited
class PaymentService {
}

boolean audited = PaymentService.class.isAnnotationPresent(Audited.class);
System.out.println(audited); // true
```

The annotation must use `RetentionPolicy.RUNTIME`; otherwise reflection cannot see it at runtime.

---

## Important Exceptions

Reflection APIs can throw checked exceptions. Handle the specific exception where possible.

| Exception | When it happens |
| --------- | --------------- |
| `ClassNotFoundException` | A class name cannot be loaded |
| `NoSuchMethodException` | A requested constructor or method does not exist |
| `NoSuchFieldException` | A requested field does not exist |
| `IllegalAccessException` | Code cannot access the member |
| `InvocationTargetException` | The invoked method or constructor threw an exception |

---

## Best Practices

- Prefer normal Java APIs when the type is known at compile time.
- Keep reflective code in a small, well-tested boundary such as a framework adapter.
- Validate class names and inputs; never load arbitrary class names from untrusted users.
- Avoid changing private state unless there is a strong, documented reason.
- Cache reflection metadata in performance-sensitive code instead of looking it up repeatedly.

Reflection is powerful because it makes Java programs adaptable at runtime. Used carefully, it is ideal for libraries and frameworks; used everywhere, it can make an application fragile and difficult to maintain.
