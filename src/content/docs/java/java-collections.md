---
title: Collections Framework in Java
description: Learn about the Java Collections Framework — List, Set, Map, ArrayList, LinkedList, HashSet, HashMap, iteration techniques, and choosing the right collection.
---

The **Collections Framework** is a set of classes and interfaces for storing and manipulating groups of objects. Unlike arrays, collections can **grow and shrink dynamically** and come with ready-made methods for searching, sorting, and iteration.

```java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Saurabh");
names.add("Rahul");
System.out.println(names);   // [Saurabh, Rahul]
```

---

## Collection Hierarchy

The framework is built around a few core interfaces in `java.util`:

```
Iterable
   └── Collection
         ├── List   → ordered, allows duplicates      (ArrayList, LinkedList)
         ├── Set    → no duplicates                   (HashSet, LinkedHashSet, TreeSet)
         └── Queue  → process in order                (PriorityQueue, ArrayDeque)

Map (separate hierarchy) → key-value pairs            (HashMap, LinkedHashMap, TreeMap)
```

| Interface | Duplicates | Ordered | Example use |
|---|---|---|---|
| `List` | Yes | Yes (by index) | List of tasks, shopping cart items |
| `Set` | No | Depends on implementation | Unique usernames, tags |
| `Queue` | Yes | Yes (FIFO / priority) | Job scheduling, print queue |
| `Map` | Unique keys | Depends on implementation | userId → User, word → count |

---

## ArrayList

`ArrayList` is the most used collection — a resizable array.

```java
import java.util.ArrayList;

ArrayList<Integer> marks = new ArrayList<>();

marks.add(90);              // add at end
marks.add(85);
marks.add(1, 95);           // insert at index 1 → [90, 95, 85]

marks.get(0);               // 90        (access by index)
marks.set(0, 99);           // replace   → [99, 95, 85]
marks.remove(2);            // remove by index → [99, 95]

marks.size();               // 2
marks.contains(95);         // true
marks.isEmpty();            // false
marks.clear();              // remove everything
```

Collections store **objects**, not primitives — so use wrapper classes (`Integer`, `Double`, `Character`) instead of `int`, `double`, `char`. Java converts between them automatically (**autoboxing**).

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);          // autoboxing: int → Integer
int x = list.get(0);   // unboxing: Integer → int
```

---

## LinkedList

`LinkedList` stores elements as nodes linked to each other. It implements both `List` and `Queue`.

```java
import java.util.LinkedList;

LinkedList<String> queue = new LinkedList<>();

queue.add("A");
queue.addFirst("Start");    // add at beginning
queue.addLast("End");       // add at end

queue.getFirst();           // "Start"
queue.removeFirst();        // removes "Start"
```

### ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---|---|---|
| Internal structure | Resizable array | Doubly linked nodes |
| Access by index | Fast | Slow (walks the list) |
| Insert/remove at ends | Fast at end | Fast at both ends |
| Insert/remove in middle | Slow (shifts elements) | Fast once position is found |
| Use when | Mostly reading by index | Frequent add/remove at ends |

For most cases, **prefer `ArrayList`** — it is simpler and faster in practice.

---

## HashSet

A `Set` automatically rejects duplicates.

```java
import java.util.HashSet;

HashSet<String> tags = new HashSet<>();

tags.add("java");
tags.add("code");
tags.add("java");        // ignored — already present

System.out.println(tags.size());      // 2
System.out.println(tags.contains("java"));  // true
tags.remove("code");
```

`HashSet` does **not** keep insertion order. If order matters:

```java
LinkedHashSet<String> ordered = new LinkedHashSet<>();  // keeps insertion order
TreeSet<String> sorted = new TreeSet<>();               // keeps sorted order
```

---

## HashMap

A `Map` stores **key → value** pairs. Keys are unique; values can repeat.

```java
import java.util.HashMap;

HashMap<String, Integer> ages = new HashMap<>();

ages.put("Saurabh", 25);
ages.put("Rahul", 30);
ages.put("Saurabh", 26);      // same key → value is REPLACED

ages.get("Saurabh");          // 26
ages.get("Unknown");          // null (key not present)
ages.getOrDefault("Unknown", 0);   // 0 instead of null

ages.containsKey("Rahul");    // true
ages.containsValue(30);       // true
ages.remove("Rahul");
ages.size();                  // 1
```

A classic use case — counting occurrences:

```java
String[] words = {"apple", "banana", "apple", "mango", "apple"};
HashMap<String, Integer> count = new HashMap<>();

for (String word : words) {
    count.put(word, count.getOrDefault(word, 0) + 1);
}
System.out.println(count);   // {banana=1, apple=3, mango=1}
```

---

## Iterating Over Collections

```java
ArrayList<String> names = new ArrayList<>(List.of("A", "B", "C"));

// 1. for-each loop (most common)
for (String name : names) {
    System.out.println(name);
}

// 2. classic for loop (when you need the index)
for (int i = 0; i < names.size(); i++) {
    System.out.println(i + ": " + names.get(i));
}

// 3. forEach with lambda
names.forEach(name -> System.out.println(name));
```

Iterating a `Map`:

```java
HashMap<String, Integer> ages = new HashMap<>();
ages.put("Saurabh", 25);
ages.put("Rahul", 30);

for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " → " + entry.getValue());
}

ages.keySet();     // just the keys
ages.values();     // just the values
```

Never add or remove elements from a collection **while looping over it** with for-each — Java throws `ConcurrentModificationException`. Use `removeIf()` instead:

```java
ArrayList<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5));
nums.removeIf(n -> n % 2 == 0);    // [1, 3, 5]
```

---

## The Collections Utility Class

`Collections` (with an "s") is a helper class full of static methods:

```java
import java.util.Collections;

ArrayList<Integer> nums = new ArrayList<>(List.of(5, 1, 4, 2));

Collections.sort(nums);              // [1, 2, 4, 5]
Collections.reverse(nums);           // [5, 4, 2, 1]
Collections.max(nums);               // 5
Collections.min(nums);               // 1
Collections.shuffle(nums);           // random order
Collections.frequency(nums, 4);      // 1
```

---

## Choosing the Right Collection

| You need... | Use |
|---|---|
| An ordered list with index access | `ArrayList` |
| Frequent add/remove at both ends | `LinkedList` / `ArrayDeque` |
| Unique elements, order doesn't matter | `HashSet` |
| Unique elements, sorted | `TreeSet` |
| Key → value lookup | `HashMap` |
| Key → value lookup, sorted by key | `TreeMap` |

---

## Summary

- The Collections Framework provides **dynamic data structures**: `List`, `Set`, `Queue`, and `Map`.
- `ArrayList` is the go-to list; use wrapper classes (`Integer`, not `int`) with generics.
- `HashSet` stores unique elements; `HashMap` stores unique keys mapped to values.
- Iterate with for-each, `forEach()`, or `entrySet()` for maps — and use `removeIf()` to remove while iterating.
- The `Collections` utility class gives you `sort()`, `reverse()`, `max()`, `min()`, and more for free.
