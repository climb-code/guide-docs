---
title: Garbage Collection in Java
description: Learn how Java garbage collection reclaims unused memory, what makes an object eligible for collection, and how to write memory-friendly Java programs.
---

Java automatically manages most memory through the **garbage collector (GC)**. When an object is no longer reachable by your program, the GC can reclaim its heap memory and make that space available for new objects.

This means Java has no `free()` or `delete` keyword for ordinary objects. It does **not** mean memory can never run out: objects that are still reachable, even accidentally, continue using memory.

---

## Heap Memory and Object Reachability

Objects created with `new` normally live on the heap.

```java
String message = new String("Hello");
```

The local variable `message` refers to the `String` object. As long as a path exists from a **GC root** to that object, it is reachable and cannot be collected.

Common GC roots include:

- Local variables in active methods
- Static fields
- Live threads and their stacks
- References held by native code

```java
String message = new String("Hello");
message = null; // The object may now be eligible for garbage collection.
```

Setting a variable to `null` does not run the collector immediately. It simply removes one reference.

---

## When Does Garbage Collection Run?

The JVM decides when to collect memory. It commonly runs when allocation pressure increases, but the exact timing depends on the JVM, collector, heap size, and application workload.

```java
System.gc(); // Requests a collection; it does not guarantee one.
```

Avoid using `System.gc()` in normal application code. Forced or requested collections can pause work and usually hide a memory-design issue instead of solving it.

---

## Generational Garbage Collection

Most Java applications create many short-lived objects. Modern JVMs take advantage of that pattern by separating the heap into generations.

| Area | Typical contents | Collection behavior |
| --- | --- | --- |
| Young generation | Newly created objects | Collected frequently and quickly |
| Old generation | Objects that survive for longer | Collected less often, usually with more work |

For example, temporary strings created while processing a request usually die young. A cache stored in a static field may live long enough to move into the old generation.

You normally do not manage generations directly; choosing sensible object lifetimes and avoiding unnecessary retention is more important.

---

## Objects Can Reference Each Other

Java's collector follows reachability, not reference counts. Therefore, it can reclaim objects that refer to each other when nothing reachable refers to either one.

```java
class Person {
    Person friend;
}

Person first = new Person();
Person second = new Person();
first.friend = second;
second.friend = first;

first = null;
second = null;
// Both Person objects are eligible for collection.
```

The circular references do not create a memory leak by themselves.

---

## Memory Leaks in Java

Java can still leak memory when code keeps references to objects that are no longer useful.

```java
import java.util.ArrayList;
import java.util.List;

class Cache {
    private static final List<byte[]> items = new ArrayList<>();

    static void addItem() {
        items.add(new byte[1024 * 1024]); // Kept until explicitly removed.
    }
}
```

Because `items` is static, every array remains reachable for the lifetime of the application. This is appropriate only when the cache has a clear size or expiration policy.

Common causes of Java memory leaks include:

- Collections that grow without removing old entries
- Static fields holding outdated data
- Listeners or callbacks that are never unregistered
- Thread-local values that are never cleared in long-lived thread pools
- Caches without size limits or expiry

---

## Closing Resources Is Different

Garbage collection reclaims memory, but it is not a prompt way to release files, sockets, database connections, or other operating-system resources.

Use try-with-resources for anything that implements `AutoCloseable`.

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException exception) {
    System.out.println("Could not read the file: " + exception.getMessage());
}
```

`reader.close()` is called automatically when the block finishes, even if an exception occurs.

---

## Practical Guidelines

1. Keep object lifetimes as short as practical.
2. Remove entries from collections and caches when they are no longer needed.
3. Prefer bounded or expiring caches for long-running services.
4. Close external resources with try-with-resources.
5. Profile memory before tuning the garbage collector.
6. Do not rely on `finalize()`; it is deprecated and unreliable for resource cleanup.

The best GC optimization is usually a clear ownership model: know who retains an object, how long it is needed, and when that reference should disappear.
