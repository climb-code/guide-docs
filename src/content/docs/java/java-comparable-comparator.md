---
title: Comparable and Comparator in Java
description: Learn how to sort custom objects in Java using Comparable for natural ordering and Comparator for flexible, reusable sorting rules, including chained and reversed comparators.
---

Sorting numbers or strings is easy, because Java already knows how they order.

```java
List<Integer> numbers = new ArrayList<>(List.of(5, 2, 9, 1));
Collections.sort(numbers);
System.out.println(numbers);      // [1, 2, 5, 9]
```

But what about your own classes?

```java
class Employee {
    String name;
    int salary;
}
```

Should employees sort by name, or by salary? Java has no way to guess. You have to tell it, and there are two interfaces for that:

- **`Comparable`** - the class defines its own single, default ordering.
- **`Comparator`** - an ordering defined *outside* the class, so you can have as many as you like.

---

## Comparable: Natural Ordering

A class implements `Comparable<T>` and provides one method, `compareTo`.

```java
class Employee implements Comparable<Employee> {
    String name;
    int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.salary, other.salary);
    }

    @Override
    public String toString() {
        return name + " (" + salary + ")";
    }
}
```

Now sorting just works:

```java
List<Employee> staff = new ArrayList<>(List.of(
        new Employee("Asha", 90000),
        new Employee("Ravi", 65000),
        new Employee("Meera", 120000)
));

Collections.sort(staff);
System.out.println(staff);
// [Ravi (65000), Asha (90000), Meera (120000)]
```

### The contract of compareTo

`compareTo` returns an `int`, and only its **sign** matters:

| Return value | Meaning                          |
| ------------ | -------------------------------- |
| negative     | `this` comes before `other`      |
| zero         | they are considered equal in order |
| positive     | `this` comes after `other`       |

### Do not subtract to compare

A tempting shortcut:

```java
return this.salary - other.salary;    // risky
```

This overflows for large or negative values. `500000 - (-2000000000)` wraps around to a negative number and the sort silently breaks. Always use the built-in helpers:

```java
Integer.compare(a, b)
Long.compare(a, b)
Double.compare(a, b)
```

For strings, `String` is already `Comparable`, so delegate:

```java
return this.name.compareTo(other.name);   // alphabetical
```

---

## Comparator: Ordering From Outside

`Comparable` gives you exactly one ordering. When you need several - by name today, by salary tomorrow - use `Comparator`.

```java
Comparator<Employee> byName = new Comparator<Employee>() {
    @Override
    public int compare(Employee a, Employee b) {
        return a.name.compareTo(b.name);
    }
};

staff.sort(byName);
```

Since `Comparator` is a functional interface, a lambda is much shorter:

```java
staff.sort((a, b) -> a.name.compareTo(b.name));
```

And shorter still with `Comparator.comparing`, which takes a *key extractor*:

```java
staff.sort(Comparator.comparing(e -> e.name));
```

If you have getters, a method reference reads best:

```java
staff.sort(Comparator.comparing(Employee::getName));
```

---

## Building Comparators

### comparing and its primitive variants

```java
Comparator.comparing(Employee::getName)         // any Comparable key
Comparator.comparingInt(Employee::getSalary)    // avoids boxing
Comparator.comparingDouble(Product::getPrice)
Comparator.comparingLong(File::length)
```

Prefer the primitive variants for `int`, `long` and `double` keys - they skip the wrapper object allocation.

### reversed

```java
staff.sort(Comparator.comparingInt(Employee::getSalary).reversed());
// highest paid first
```

### thenComparing

Break ties with a second key, then a third, and so on.

```java
staff.sort(
    Comparator.comparingInt(Employee::getSalary).reversed()
              .thenComparing(Employee::getName)
);
```

Employees are ordered by salary descending; anyone on the same salary is then ordered alphabetically.

### Handling nulls

```java
Comparator<Employee> safe =
    Comparator.nullsFirst(Comparator.comparing(Employee::getName));
```

`nullsFirst` and `nullsLast` wrap another comparator and decide where `null` elements land instead of throwing a `NullPointerException`.

### naturalOrder and reverseOrder

```java
List<String> names = new ArrayList<>(List.of("Ravi", "Asha", "Meera"));

names.sort(Comparator.naturalOrder());   // [Asha, Meera, Ravi]
names.sort(Comparator.reverseOrder());   // [Ravi, Meera, Asha]
```

These use the type's own `compareTo`.

---

## Comparable vs Comparator

| Aspect            | `Comparable`                    | `Comparator`                        |
| ----------------- | ------------------------------- | ----------------------------------- |
| Package           | `java.lang`                     | `java.util`                         |
| Method            | `compareTo(T other)`            | `compare(T a, T b)`                 |
| Where the logic lives | Inside the class            | Outside the class                   |
| How many orderings| Exactly one                     | As many as you want                 |
| Modifies the class| Yes                             | No                                  |
| Best for          | The one obvious, natural order  | Alternative or situational orders   |

Use `Comparable` when there is an obvious default (an `Invoice` by date, a `Version` by number). Use `Comparator` for everything else - especially for classes you do not own and cannot modify.

---

## Where They Are Used

### Sorting collections and arrays

```java
Collections.sort(list);                  // uses Comparable
list.sort(comparator);                   // uses Comparator

Arrays.sort(array);                      // uses Comparable
Arrays.sort(array, comparator);          // uses Comparator
```

### Streams

```java
List<Employee> topThree = staff.stream()
        .sorted(Comparator.comparingInt(Employee::getSalary).reversed())
        .limit(3)
        .toList();

Optional<Employee> highestPaid = staff.stream()
        .max(Comparator.comparingInt(Employee::getSalary));
```

### Sorted collections

`TreeSet` and `TreeMap` keep elements ordered. They use `Comparable` by default, or a `Comparator` passed to the constructor.

```java
TreeSet<Employee> bySalary =
        new TreeSet<>(Comparator.comparingInt(Employee::getSalary));

TreeMap<String, Integer> caseInsensitive =
        new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
```

### Priority queues

```java
PriorityQueue<Employee> queue =
        new PriorityQueue<>(Comparator.comparingInt(Employee::getSalary).reversed());
```

The highest-paid employee is always at the head.

---

## Keeping compareTo Consistent With equals

The recommended rule is that `a.compareTo(b) == 0` should agree with `a.equals(b)`.

If they disagree, sorted collections behave in surprising ways. `TreeSet` decides duplicates using the **comparison**, not `equals`:

```java
TreeSet<Employee> set =
        new TreeSet<>(Comparator.comparingInt(Employee::getSalary));

set.add(new Employee("Asha", 90000));
set.add(new Employee("Ravi", 90000));

System.out.println(set.size());   // 1 - Ravi was treated as a duplicate
```

Two different people vanished into one entry because their salaries matched. Adding a tiebreaker fixes it:

```java
new TreeSet<>(Comparator.comparingInt(Employee::getSalary)
                        .thenComparing(Employee::getName));
```

---

## Worked Example

```java
record Product(String name, String category, double price, int stock) {}

List<Product> products = new ArrayList<>(List.of(
        new Product("Keyboard", "Tech", 49.99, 12),
        new Product("Mouse", "Tech", 24.99, 0),
        new Product("Desk", "Furniture", 249.99, 5),
        new Product("Chair", "Furniture", 149.99, 0)
));

// In stock first, then by category, then cheapest first
products.sort(
    Comparator.comparing((Product p) -> p.stock() == 0)
              .thenComparing(Product::category)
              .thenComparingDouble(Product::price)
);

products.forEach(System.out::println);
```

Output:

```
Product[name=Desk, category=Furniture, price=249.99, stock=5]
Product[name=Keyboard, category=Tech, price=49.99, stock=12]
Product[name=Chair, category=Furniture, price=149.99, stock=0]
Product[name=Mouse, category=Tech, price=24.99, stock=0]
```

`false` sorts before `true`, so items with stock come first.

---

## Common Mistakes

**Subtracting integers in `compareTo`.** Overflows silently. Use `Integer.compare`.

**An inconsistent comparator.** If your logic is not transitive, `Arrays.sort` throws `IllegalArgumentException: Comparison method violates its general contract!`

**Forgetting that `sorted()` and `sort()` differ.** `list.sort(...)` mutates the list in place; `stream().sorted(...)` produces a new sequence and leaves the original alone.

**Sorting an immutable list.** `List.of(...)` returns an unmodifiable list, so `sort` throws `UnsupportedOperationException`. Wrap it: `new ArrayList<>(List.of(...))`.

**Reversing at the wrong point.** `comparing(A).thenComparing(B).reversed()` reverses the *whole* ordering, including B. To reverse only the first key, write `comparing(A).reversed().thenComparing(B)`.

---

## Summary

- `Comparable` defines a class's single natural ordering via `compareTo`.
- `Comparator` defines orderings outside the class, so a type can have many.
- Return the *sign* of the comparison; use `Integer.compare` rather than subtraction.
- Build comparators declaratively with `comparing`, `thenComparing`, `reversed`, `nullsFirst`.
- They power `Collections.sort`, `Arrays.sort`, `stream().sorted()`, `TreeSet`, `TreeMap` and `PriorityQueue`.
- Keep `compareTo` consistent with `equals`, or sorted collections will drop entries you expected to keep.
