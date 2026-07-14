---
title: Generics in Java
description: Learn about Java Generics — generic classes, generic methods, type parameters, bounded types, wildcards, and how generics provide compile-time type safety.
---

**Generics** let you write classes, interfaces, and methods that work with **any type**, while keeping **compile-time type safety**. You have already used them with collections — the `<String>` in `ArrayList<String>` is a generic type argument.

```java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Saurabh");
// names.add(42);            // compile error — only Strings allowed
String first = names.get(0); // no cast needed
```

---

## Why Generics?

Before generics, collections stored everything as `Object`, so mistakes were caught only at **runtime**:

```java
ArrayList list = new ArrayList();        // raw type (old style)
list.add("hello");
list.add(42);                            // allowed — compiles fine

String s = (String) list.get(1);         // 💥 ClassCastException at runtime
```

With generics, the compiler catches the same mistake **before the program runs**:

```java
ArrayList<String> list = new ArrayList<>();
list.add("hello");
// list.add(42);                         // ❌ compile error — caught early
```

**Benefits:**

- **Type safety** — wrong types are rejected at compile time.
- **No casting** — `get()` returns the declared type directly.
- **Reusability** — one class or method works for many types.

---

## Generic Classes

A generic class declares one or more **type parameters** in angle brackets. By convention single letters are used: `T` (type), `E` (element), `K` (key), `V` (value).

```java
class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
```

The type is chosen when the object is created:

```java
Box<String> nameBox = new Box<>();
nameBox.set("Saurabh");
String name = nameBox.get();     // no cast

Box<Integer> ageBox = new Box<>();
ageBox.set(25);
int age = ageBox.get();          // auto-unboxing
```

### Multiple Type Parameters

```java
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey()   { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> marks = new Pair<>("Math", 95);
System.out.println(marks.getKey() + " → " + marks.getValue()); // Math → 95
```

> **Note:** Generics work only with **reference types**. Use wrapper classes for primitives — `Box<Integer>`, not `Box<int>`.

---

## Generic Methods

A method can declare its own type parameter, written **before the return type**. The compiler infers the type from the arguments.

```java
class Utils {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static <T> T firstElement(T[] array) {
        return array[0];
    }
}

Integer[] numbers = {1, 2, 3};
String[] words = {"hello", "world"};

Utils.printArray(numbers);           // 1 2 3
Utils.printArray(words);             // hello world

String w = Utils.firstElement(words); // type inferred as String
```

---

## Bounded Type Parameters

Use `extends` to restrict which types are allowed. This also lets you **call methods** of the bound inside the class or method.

```java
// T must be Number or a subclass (Integer, Double, ...)
class Calculator<T extends Number> {
    private T a, b;

    public Calculator(T a, T b) {
        this.a = a;
        this.b = b;
    }

    public double sum() {
        return a.doubleValue() + b.doubleValue(); // Number methods available
    }
}

Calculator<Integer> intCalc = new Calculator<>(10, 20);
System.out.println(intCalc.sum());       // 30.0

Calculator<Double> dblCalc = new Calculator<>(1.5, 2.5);
System.out.println(dblCalc.sum());       // 4.0

// Calculator<String> bad = ...          // ❌ String is not a Number
```

A bound can also be an interface — for example, `<T extends Comparable<T>>` for anything that can be compared:

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

max(10, 20);          // 20
max("apple", "banana"); // banana
```

---

## Wildcards (`?`)

A wildcard means "some unknown type". It is used in **method parameters** when the exact type does not matter.

| Wildcard | Meaning | Use when |
|---|---|---|
| `<?>` | any type | you only read general info (e.g. `size()`) |
| `<? extends T>` | T or a subclass | you **read** values as T (producer) |
| `<? super T>` | T or a superclass | you **write** T values (consumer) |

```java
import java.util.List;

// accepts List<Integer>, List<Double>, List<Number>, ...
public static double total(List<? extends Number> list) {
    double sum = 0;
    for (Number n : list) {
        sum += n.doubleValue();
    }
    return sum;
}

// accepts List<Integer>, List<Number>, List<Object>
public static void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
```

> **Rule of thumb (PECS):** **P**roducer → `extends`, **C**onsumer → `super`. If a method both reads and writes, use an exact type parameter instead.

---

## Type Erasure

Generics exist only at **compile time**. The compiler checks the types, then **erases** them — at runtime `Box<String>` and `Box<Integer>` are the same class.

```java
Box<String> a = new Box<>();
Box<Integer> b = new Box<>();

System.out.println(a.getClass() == b.getClass()); // true
```

Because of erasure:

- You **cannot** do `new T()` or `new T[10]`.
- You **cannot** use `instanceof Box<String>` — only `instanceof Box<?>`.
- Overloads that differ only in type arguments are not allowed.

---

## Common Mistakes

```java
// ❌ Using raw types — loses all type safety
ArrayList list = new ArrayList();

// ✅ Always declare the type argument
ArrayList<String> list2 = new ArrayList<>();

// ❌ Primitives as type arguments
// Box<int> box = new Box<>();

// ✅ Use wrapper classes
Box<Integer> box = new Box<>();
```

---

## Summary

| Concept | Syntax | Purpose |
|---|---|---|
| Generic class | `class Box<T> { }` | one class, many types |
| Multiple parameters | `class Pair<K, V> { }` | e.g. key-value pairs |
| Generic method | `<T> T first(T[] arr)` | type inferred per call |
| Bounded type | `<T extends Number>` | restrict allowed types |
| Wildcard | `List<? extends Number>` | flexible method parameters |

Generics move type errors from **runtime to compile time** — the compiler becomes your first line of defense.
