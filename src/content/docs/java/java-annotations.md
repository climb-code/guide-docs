---
title: Annotations in Java
description: Learn what Java annotations are, how built-in annotations work, how to create custom annotations, and where annotations are used in real projects.
---

**Annotations** are metadata added to Java code. They do not directly change the normal logic of a program, but they give extra information to the compiler, tools, frameworks, or runtime.

Annotations start with `@`.

```java
@Override
public String toString() {
    return "Student object";
}
```

Here, `@Override` tells the compiler that this method should override a method from a parent class.

---

## Why Use Annotations?

Annotations help Java code become more expressive and tool-friendly.

Common uses:

- Ask the compiler to check something
- Mark old code as deprecated
- Reduce configuration in frameworks
- Describe tests, routes, database entities, or validations
- Generate code or documentation using tools

Frameworks like Spring, JUnit, Hibernate, and Jakarta EE use annotations heavily.

---

## Built-in Java Annotations

Java provides several built-in annotations.

| Annotation | Purpose |
| ---------- | ------- |
| `@Override` | Confirms that a method overrides a parent method |
| `@Deprecated` | Marks code as old or not recommended |
| `@SuppressWarnings` | Tells the compiler to hide specific warnings |
| `@FunctionalInterface` | Ensures an interface has exactly one abstract method |
| `@SafeVarargs` | Suppresses warnings for safe generic varargs usage |

---

## @Override

Use `@Override` when a method is intended to override a method from a parent class or interface.

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}
```

If the method name or parameters are wrong, the compiler will catch the mistake.

```java
class Dog extends Animal {
    @Override
    void sounds() {
        System.out.println("Bark");
    }
}
```

This causes a compile-time error because `sounds()` does not override `sound()`.

---

## @Deprecated

Use `@Deprecated` when code still exists but should no longer be used.

```java
class Calculator {
    @Deprecated
    int addOld(int a, int b) {
        return a + b;
    }

    int add(int a, int b) {
        return a + b;
    }
}
```

When another developer uses `addOld()`, the compiler or IDE can show a warning.

You can also provide more detail:

```java
@Deprecated(since = "2.0", forRemoval = true)
void oldMethod() {
    System.out.println("Use newMethod() instead.");
}
```

---

## @SuppressWarnings

Use `@SuppressWarnings` when you intentionally want to hide a compiler warning.

```java
@SuppressWarnings("unchecked")
public void printItems() {
    List list = new ArrayList();
    list.add("Java");
}
```

Use this carefully. It should not be used to hide warnings that should actually be fixed.

---

## @FunctionalInterface

Use `@FunctionalInterface` to confirm that an interface has exactly one abstract method.

```java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}
```

This is useful when writing interfaces meant for lambda expressions.

```java
Greeting greeting = name -> System.out.println("Hello " + name);
greeting.sayHello("Priya");
```

---

## Creating a Custom Annotation

Use `@interface` to create a custom annotation.

```java
public @interface Author {
    String name();
    String date();
}
```

Use it like this:

```java
@Author(name = "Saurabh", date = "2026-07-28")
class JavaGuide {
    void show() {
        System.out.println("Annotations guide");
    }
}
```

The values inside an annotation are called **elements**.

---

## Default Values

Annotation elements can have default values.

```java
public @interface Version {
    int value() default 1;
}
```

Now the annotation can be used with or without a value.

```java
@Version
class FirstGuide {}

@Version(2)
class SecondGuide {}
```

When an annotation has only one element named `value`, Java lets you pass the value directly.

---

## Meta-Annotations

Annotations that describe other annotations are called **meta-annotations**.

| Meta-Annotation | Purpose |
| --------------- | ------- |
| `@Target` | Defines where an annotation can be used |
| `@Retention` | Defines how long an annotation is kept |
| `@Documented` | Includes the annotation in generated documentation |
| `@Inherited` | Allows subclasses to inherit the annotation |
| `@Repeatable` | Allows the same annotation to be used more than once |

---

## @Target

`@Target` controls where an annotation is allowed.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
public @interface RunOnce {
}
```

Now `@RunOnce` can only be used on methods.

Common targets:

- `ElementType.TYPE` - class, interface, or enum
- `ElementType.FIELD` - field
- `ElementType.METHOD` - method
- `ElementType.PARAMETER` - method parameter
- `ElementType.CONSTRUCTOR` - constructor

---

## @Retention

`@Retention` controls how long an annotation is available.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface TaskInfo {
    String value();
}
```

Retention policies:

| Policy | Meaning |
| ------ | ------- |
| `SOURCE` | Available only in source code, removed during compilation |
| `CLASS` | Stored in the `.class` file but usually not available at runtime |
| `RUNTIME` | Available at runtime using reflection |

Use `RUNTIME` when a framework or program needs to inspect the annotation while the application is running.

---

## Reading Annotations with Reflection

Runtime annotations can be read using reflection.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@interface Route {
    String path();
}

@Route(path = "/users")
class UserController {
}

public class Main {
    public static void main(String[] args) {
        Class<UserController> clazz = UserController.class;

        if (clazz.isAnnotationPresent(Route.class)) {
            Route route = clazz.getAnnotation(Route.class);
            System.out.println(route.path());
        }
    }
}
```

Output:

```text
/users
```

This is the same basic idea used by many Java frameworks.

---

## Real-World Examples

### JUnit

```java
@Test
void shouldAddTwoNumbers() {
    assertEquals(4, 2 + 2);
}
```

`@Test` marks a method as a test case.

### Spring

```java
@RestController
class UserController {
    @GetMapping("/users")
    List<String> getUsers() {
        return List.of("Amit", "Priya");
    }
}
```

Spring reads these annotations to create web routes.

### Hibernate

```java
@Entity
class Student {
    @Id
    private Long id;
}
```

Hibernate reads these annotations to map Java classes to database tables.

---

## Best Practices

- Use built-in annotations like `@Override` consistently.
- Keep custom annotations simple and focused.
- Choose `@Retention(RetentionPolicy.RUNTIME)` only when runtime access is needed.
- Use `@Target` to prevent annotations from being used in the wrong place.
- Do not overuse annotations when normal Java code is clearer.

---

## Key Points

- Annotations provide metadata for code.
- Built-in annotations help the compiler and developers catch issues.
- Custom annotations are created using `@interface`.
- Meta-annotations like `@Target` and `@Retention` control annotation behavior.
- Runtime annotations can be inspected using reflection.
