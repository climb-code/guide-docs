---
title: Records in Java
description: Learn Java records, how they reduce boilerplate for data classes, compact constructors, validation, and when to use a record instead of a class.
---

A **record** is a special kind of class in Java used to hold data. It was introduced in Java 16 (previewed in Java 14) to remove the boilerplate code we usually write for simple data classes.

---

## The Problem Records Solve

A simple data class in Java needs a lot of repeated code.

```java
public class Student {
    private final String name;
    private final int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (!(object instanceof Student)) return false;
        Student other = (Student) object;
        return age == other.age && name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Student[name=" + name + ", age=" + age + "]";
    }
}
```

That is a lot of code just to store two values.

---

## The Same Class as a Record

```java
public record Student(String name, int age) { }
```

One line gives you the same behaviour.

---

## What a Record Generates

For `record Student(String name, int age)`, Java automatically creates:

| Generated member | Description |
|---|---|
| `private final String name` | Field for each component |
| `Student(String, int)` | Canonical constructor |
| `name()` and `age()` | Accessor methods |
| `equals()` | Compares all components |
| `hashCode()` | Based on all components |
| `toString()` | Readable text form |

Note that accessors are named `name()` and `age()`, not `getName()` and `getAge()`.

---

## Using a Record

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student("Saurabh", 22);

        System.out.println(student.name());
        System.out.println(student.age());
        System.out.println(student);

        Student duplicate = new Student("Saurabh", 22);
        System.out.println(student.equals(duplicate));
    }
}
```

Output:

```text
Saurabh
22
Student[name=Saurabh, age=22]
true
```

---

## Records are Immutable

All fields of a record are `final`. Once created, the values cannot be changed.

```java
Student student = new Student("Saurabh", 22);
// student.name = "Amit"; // not allowed
```

To change a value, create a new record object.

```java
Student updated = new Student(student.name(), 23);
```

---

## Compact Constructor and Validation

A **compact constructor** lets you validate or adjust values without writing the full constructor.

```java
public record Employee(String name, double salary) {
    public Employee {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        name = name.trim();
    }
}
```

There are no parameters and no `this.name = name;` line. Java assigns the fields for you at the end.

---

## Adding Methods

A record can have normal methods, static methods, and static fields.

```java
public record Rectangle(double width, double height) {
    public double area() {
        return width * height;
    }

    public static Rectangle square(double side) {
        return new Rectangle(side, side);
    }
}
```

```java
Rectangle rectangle = new Rectangle(4, 5);
System.out.println(rectangle.area());

Rectangle square = Rectangle.square(3);
System.out.println(square.area());
```

---

## Extra Constructors

You can add constructors that call the canonical one.

```java
public record Point(int x, int y) {
    public Point(int x) {
        this(x, 0);
    }
}
```

---

## Records and Interfaces

A record cannot extend a class, but it can implement interfaces.

```java
public record Circle(double radius) implements Comparable<Circle> {
    @Override
    public int compareTo(Circle other) {
        return Double.compare(this.radius, other.radius);
    }
}
```

---

## Rules and Limits

1. A record is implicitly `final` and cannot be extended.
2. A record cannot extend another class.
3. All components are `private final`.
4. You cannot add extra instance fields outside the component list.
5. You can add static fields and static methods.

---

## Record vs Class

| Point | Record | Normal class |
|---|---|---|
| Purpose | Carry data | Carry data and behaviour |
| Fields | Always final | Can be changed |
| Boilerplate | Generated | Written manually |
| Inheritance | Cannot extend a class | Can extend a class |
| Best for | DTOs, API responses, keys | Business logic, services |

---

## When to Use a Record

Use a record when:

- The object mainly holds values
- The values should not change after creation
- You want `equals`, `hashCode`, and `toString` for free

Common examples are DTOs, configuration values, coordinates, and results returned from a method.

Use a normal class when the object needs mutable state or complex behaviour.

---

## Returning Multiple Values

Records are a clean way to return more than one value from a method.

```java
public record Result(int sum, double average) { }

public class Calculator {
    public static Result analyse(int[] numbers) {
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        return new Result(sum, (double) sum / numbers.length);
    }

    public static void main(String[] args) {
        Result result = analyse(new int[] { 10, 20, 30 });
        System.out.println(result.sum() + " " + result.average());
    }
}
```

---

## Best Practices

1. Use records for data, not for classes with heavy logic.
2. Validate input inside a compact constructor.
3. Avoid storing mutable objects such as lists inside a record, or copy them before storing.
4. Keep the component list short and meaningful.
5. Use records as map keys, since `equals` and `hashCode` are already correct.

---

## Quick Summary

| Concept | Meaning |
|---|---|
| Record | Immutable data class with generated members |
| Component | Each value declared in the record header |
| Accessor | Method named after the component |
| Compact constructor | Short constructor used for validation |
| Immutability | Values cannot change after creation |

---

### Next Steps

After records, continue with **Exception Handling** to learn how Java reports and recovers from errors at runtime.
