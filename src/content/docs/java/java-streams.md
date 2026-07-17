---
title: Streams API in Java
description: Learn about the Java Streams API — creating streams, intermediate operations like filter and map, terminal operations like collect and reduce, and processing data in a functional style.
---

The **Streams API** (Java 8) lets you process collections of data in a **declarative, functional style** — you describe *what* you want, not *how* to loop for it. A stream is a **pipeline of operations** over a data source.

```java
import java.util.List;

List<String> names = List.of("Saurabh", "Amit", "Priya", "Anil", "Rahul");

// Old way — loop and collect manually
// New way — one readable pipeline
List<String> result = names.stream()
        .filter(name -> name.startsWith("A"))
        .map(String::toUpperCase)
        .sorted()
        .toList();

System.out.println(result);   // [AMIT, ANIL]
```

> A stream does **not store data** and does **not modify its source** — it flows data from the source through the pipeline and produces a result.

---

## Anatomy of a Stream Pipeline

Every stream pipeline has three parts:

1. **Source** — where the data comes from: `list.stream()`, `Stream.of(...)`, `Arrays.stream(arr)`
2. **Intermediate operations** — transform the stream, return a new stream: `filter`, `map`, `sorted`
3. **Terminal operation** — produces a result and ends the stream: `collect`, `forEach`, `count`, `reduce`

```java
long count = names.stream()          // 1. source
        .filter(n -> n.length() > 4) // 2. intermediate
        .count();                    // 3. terminal
```

Intermediate operations are **lazy** — nothing runs until a terminal operation is called.

---

## Creating Streams

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

List<Integer> list = List.of(1, 2, 3);
Stream<Integer> s1 = list.stream();          // from a collection

Stream<String> s2 = Stream.of("a", "b");     // from values

int[] nums = {1, 2, 3};
IntStream s3 = Arrays.stream(nums);          // from an array

IntStream s4 = IntStream.rangeClosed(1, 5);  // 1, 2, 3, 4, 5
```

---

## Common Intermediate Operations

### filter — keep matching elements

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

List<Integer> evens = numbers.stream()
        .filter(n -> n % 2 == 0)
        .toList();
System.out.println(evens);        // [2, 4, 6, 8]
```

### map — transform each element

```java
List<String> names = List.of("saurabh", "amit", "priya");

List<Integer> lengths = names.stream()
        .map(String::length)
        .toList();
System.out.println(lengths);      // [7, 4, 5]
```

### sorted, distinct, limit, skip

```java
List<Integer> nums = List.of(5, 3, 8, 3, 1, 8, 9, 2);

List<Integer> result = nums.stream()
        .distinct()               // remove duplicates → 5, 3, 8, 1, 9, 2
        .sorted()                 // ascending        → 1, 2, 3, 5, 8, 9
        .limit(4)                 // first 4          → 1, 2, 3, 5
        .toList();
System.out.println(result);       // [1, 2, 3, 5]
```

---

## Common Terminal Operations

### collect / toList — gather results

```java
import java.util.stream.Collectors;

List<String> upper = names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());   // or just .toList() (Java 16+)
```

### forEach — act on each element

```java
names.stream()
        .map(String::toUpperCase)
        .forEach(System.out::println);
```

### count, anyMatch, allMatch

```java
long count = numbers.stream().filter(n -> n > 3).count();   // 5

boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0); // true
boolean allPositive = numbers.stream().allMatch(n -> n > 0);  // true
```

### reduce — combine into a single value

```java
int sum = numbers.stream()
        .reduce(0, (a, b) -> a + b);     // 36

int max = numbers.stream()
        .reduce(Integer.MIN_VALUE, Integer::max);
```

---

## Collectors — Grouping and Joining

`Collectors` provides powerful ways to gather stream results:

```java
import java.util.Map;
import java.util.stream.Collectors;

List<String> names = List.of("Saurabh", "Amit", "Priya", "Anil", "Rahul");

// joining — concatenate into one String
String joined = names.stream().collect(Collectors.joining(", "));
System.out.println(joined);   // Saurabh, Amit, Priya, Anil, Rahul

// groupingBy — group into a Map
Map<Integer, List<String>> byLength = names.stream()
        .collect(Collectors.groupingBy(String::length));
System.out.println(byLength); // {4=[Amit, Anil], 5=[Priya, Rahul], 7=[Saurabh]}

// partitioningBy — split by a condition
Map<Boolean, List<String>> partitioned = names.stream()
        .collect(Collectors.partitioningBy(n -> n.startsWith("A")));
System.out.println(partitioned); // {false=[Saurabh, Priya, Rahul], true=[Amit, Anil]}
```

---

## Primitive Streams

For numbers, use `IntStream`, `LongStream`, and `DoubleStream` — they avoid boxing and add math helpers:

```java
import java.util.stream.IntStream;

int sum = IntStream.rangeClosed(1, 100).sum();          // 5050
double avg = IntStream.of(4, 8, 6).average().orElse(0); // 6.0
int max = IntStream.of(4, 8, 6).max().orElse(0);        // 8

// mapToInt — convert an object stream to an IntStream
int totalChars = names.stream()
        .mapToInt(String::length)
        .sum();
```

---

## A Realistic Example

```java
record Student(String name, int marks, String city) {}

List<Student> students = List.of(
    new Student("Saurabh", 85, "Pune"),
    new Student("Amit", 72, "Mumbai"),
    new Student("Priya", 91, "Pune"),
    new Student("Rahul", 64, "Delhi")
);

// Names of Pune students scoring above 80, sorted by marks (highest first)
List<String> toppers = students.stream()
        .filter(s -> s.city().equals("Pune"))
        .filter(s -> s.marks() > 80)
        .sorted((a, b) -> b.marks() - a.marks())
        .map(Student::name)
        .toList();

System.out.println(toppers);   // [Priya, Saurabh]
```

---

## Streams vs Loops

| Aspect        | Stream                          | Loop                         |
| ------------- | ------------------------------- | ---------------------------- |
| Style         | Declarative — *what* to do      | Imperative — *how* to do it  |
| Readability   | Great for filter/map/collect chains | Better for complex branching |
| Reusability   | One-time use — cannot be reused | N/A                          |
| Source safety | Never modifies the source       | Can modify anything          |

> A stream can be **consumed only once** — calling a terminal operation twice on the same stream throws `IllegalStateException`.

---

## Key Points

- A stream is a **pipeline**: source → intermediate operations → terminal operation.
- Intermediate operations (`filter`, `map`, `sorted`) are **lazy**; terminal operations (`collect`, `forEach`, `reduce`) trigger execution.
- Streams **never modify** the source collection and can be used **only once**.
- Use `Collectors` for grouping, partitioning, and joining results.
- Prefer **primitive streams** (`IntStream`) for heavy numeric work.
- Streams build directly on **lambda expressions** from the previous topic.
