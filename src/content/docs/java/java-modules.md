---
title: Java Modules
description: Learn the Java Platform Module System, module-info.java, requires, exports, and how modules create clear application boundaries.
---

The **Java Platform Module System** (JPMS) lets an application declare the code it needs and the packages it makes available to other code. It was introduced in Java 9.

A module is a named group of packages and resources. Its rules live in a `module-info.java` file.

---

## Why Use Modules?

Without modules, any public class on the classpath can be used by other code. Modules make dependencies and public API boundaries explicit.

Benefits include:

- Clearer dependencies between parts of an application.
- Strong encapsulation: public classes in unexported packages stay internal.
- Smaller runtime images with `jlink`.
- Earlier errors when a required dependency is missing.

---

## A Basic Module Descriptor

Suppose the code is organised like this:

```text
src/
└── com.example.greetings/
    ├── module-info.java
    └── com/example/greetings/Greeter.java
```

The descriptor gives the module a name and exports its public package.

```java
module com.example.greetings {
    exports com.example.greetings;
}
```

Classes outside the module can use `com.example.greetings.Greeter`, but not classes in packages that are not exported.

---

## Requiring Another Module

Add `requires` when your module uses code from another module.

```java
module com.example.app {
    requires com.example.greetings;
}
```

For example, `requires java.sql;` is needed before using JDBC classes in a named module.

```java
module com.example.orders {
    requires java.sql;
    requires com.example.greetings;
}
```

---

## `exports` Controls the Public API

`exports` is package-level, not class-level. Keep implementation classes in a package that you do not export.

```java
module com.example.orders {
    exports com.example.orders.api;
}
```

Here, callers can use the public API package but cannot directly use classes in `com.example.orders.internal`.

You can expose a package only to selected modules.

```java
module com.example.orders {
    exports com.example.orders.api to com.example.web;
}
```

---

## Opening Packages for Reflection

Some libraries use reflection to read private fields or construct objects. `opens` grants reflective access without exporting normal compile-time access.

```java
module com.example.app {
    requires spring.context;
    opens com.example.app.model to spring.core;
}
```

Use `opens` only when a framework requires it. Broadly opening all packages weakens module encapsulation.

---

## Classpath vs. Module Path

Traditional Java applications use the **classpath**. Modular applications place named modules on the **module path**.

You can migrate gradually: code on the classpath becomes part of the unnamed module and can still use named modules that export their packages. For a small application, the classpath is often simpler; modules become more valuable as an application or library grows.

---

### Next Steps ➡️

Use modules to define boundaries in larger applications, then explore **JVM Internals** to understand how Java loads and runs that code.
