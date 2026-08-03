---
title: Nested and Inner Classes in Java
description: Learn static nested classes, inner classes, local classes, and anonymous classes in Java, and understand when each type should be used.
---

Java allows you to define a class inside another class. Such a class is called a **nested class**. Nested classes help you keep helper types close to the class that uses them, instead of creating separate files for small helpers.

---

## Why Nested Classes?

Nested classes are useful when:

1. A class is only meaningful inside another class.
2. You want to group code that logically belongs together.
3. You want a helper type without exposing it to the whole package.
4. You need short, one-time implementations of an interface.

---

## Types of Nested Classes

| Type | Declared as | Needs outer object |
|---|---|---|
| Static nested class | `static class` inside a class | No |
| Inner class | non-static class inside a class | Yes |
| Local class | class inside a method | Yes, if method is non-static |
| Anonymous class | class created without a name | Depends on context |

---

## Static Nested Class

A **static nested class** is a class marked with `static` inside another class. It does not need an object of the outer class.

```java
public class Laptop {
    static class Processor {
        void show() {
            System.out.println("Processor of laptop");
        }
    }

    public static void main(String[] args) {
        Laptop.Processor processor = new Laptop.Processor();
        processor.show();
    }
}
```

A static nested class:

- Can be created without an outer class object
- Can access only static members of the outer class
- Behaves almost like a normal top-level class

---

## Inner Class

An **inner class** is a non-static class inside another class. It is tied to an object of the outer class.

```java
public class Car {
    private String model = "Swift";

    class Engine {
        void start() {
            System.out.println("Starting engine of " + model);
        }
    }

    public static void main(String[] args) {
        Car car = new Car();
        Car.Engine engine = car.new Engine();
        engine.start();
    }
}
```

Notice the syntax `car.new Engine()`. An inner class object always belongs to an outer class object.

An inner class:

- Can access all members of the outer class, including `private` ones
- Cannot declare static members (except constants)
- Requires an outer object to be created

---

## Accessing the Outer Class

Inside an inner class, you can refer to the outer object using `OuterClass.this`.

```java
public class Outer {
    private String name = "Outer name";

    class Inner {
        private String name = "Inner name";

        void print() {
            System.out.println(name);
            System.out.println(this.name);
            System.out.println(Outer.this.name);
        }
    }
}
```

This is helpful when the inner class and outer class have fields with the same name.

---

## Local Class

A **local class** is declared inside a method, constructor, or block.

```java
public class Report {
    public void generate() {
        class Formatter {
            String format(String text) {
                return "[" + text + "]";
            }
        }

        Formatter formatter = new Formatter();
        System.out.println(formatter.format("Monthly report"));
    }

    public static void main(String[] args) {
        new Report().generate();
    }
}
```

A local class is visible only inside the block where it is declared. It can use local variables of that method, but those variables must be **final** or **effectively final** (never reassigned).

---

## Anonymous Class

An **anonymous class** is a class without a name, created and used in a single expression. It is commonly used to implement an interface or extend a class quickly.

```java
interface Greeting {
    void sayHello();
}

public class Main {
    public static void main(String[] args) {
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("Hello from anonymous class");
            }
        };

        greeting.sayHello();
    }
}
```

Anonymous classes are often used for event handlers, comparators, and small callbacks.

---

## Anonymous Class with Comparator

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Rohit");
        names.add("Amit");
        names.add("Saurabh");

        Collections.sort(names, new Comparator<String>() {
            @Override
            public int compare(String first, String second) {
                return first.compareTo(second);
            }
        });

        System.out.println(names);
    }
}
```

---

## Anonymous Class vs Lambda

If the interface has only one abstract method, a lambda expression is shorter.

```java
Collections.sort(names, (first, second) -> first.compareTo(second));
```

Use a lambda when the interface is a functional interface. Use an anonymous class when you need multiple methods or extra fields.

---

## Common Mistakes

1. Trying to create an inner class object without an outer object.
2. Declaring static members inside a non-static inner class.
3. Changing a local variable used inside a local or anonymous class.
4. Making nested classes too large, which makes the outer file hard to read.

---

## Best Practices

1. Prefer a **static nested class** unless you really need access to the outer object.
2. Keep nested classes small and focused.
3. Use anonymous classes only for short implementations.
4. Move a nested class to its own file once it grows or is needed elsewhere.
5. Use lambdas instead of anonymous classes for functional interfaces.

---

## Quick Summary

| Concept | Meaning |
|---|---|
| Static nested class | Nested class that does not need an outer object |
| Inner class | Non-static nested class bound to an outer object |
| Local class | Class declared inside a method or block |
| Anonymous class | Unnamed class created in a single expression |
| `Outer.this` | Reference to the outer class object |

---

### Next Steps

After nested and inner classes, continue with **Enums** to learn how Java represents a fixed set of related constants in a type-safe way.
