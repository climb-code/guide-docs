---
title: Multithreading and Concurrency in Java
description: Learn about multithreading in Java — creating threads with Thread and Runnable, the thread lifecycle, sleep and join, synchronization, ExecutorService, and Callable with Future.
---

**Multithreading** lets a program do **multiple things at the same time**. Each *thread* is an independent path of execution inside the same program — while one thread downloads a file, another can keep the UI responsive or process data.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName()); // main
    }
}
```

> Every Java program already has at least **one thread** — the `main` thread. Multithreading is about starting *more* of them.

---

## Why Multithreading?

- **Responsiveness** — a long task (file download, DB query) doesn't freeze the whole program.
- **Better CPU usage** — modern CPUs have multiple cores; threads let you use them all.
- **Parallel work** — process independent tasks (e.g., resize 100 images) at the same time.

---

## Creating Threads

### 1. Extending `Thread`

```java
class DownloadTask extends Thread {
    @Override
    public void run() {
        System.out.println("Downloading in: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        DownloadTask t = new DownloadTask();
        t.start();   // starts a NEW thread and calls run()
    }
}
```

### 2. Implementing `Runnable` (preferred)

```java
class DownloadTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Downloading in: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Thread t = new Thread(new DownloadTask());
        t.start();
    }
}
```

With a **lambda** (since `Runnable` is a functional interface):

```java
Thread t = new Thread(() -> System.out.println("Running: " + Thread.currentThread().getName()));
t.start();
```

> Prefer `Runnable` over extending `Thread` — Java has single inheritance, so extending `Thread` wastes your only superclass slot, and `Runnable` separates *the task* from *the thread that runs it*.

### `start()` vs `run()`

```java
t.run();    // ❌ runs on the CURRENT thread — just a normal method call
t.start();  // ✅ creates a new thread, which then calls run()
```

Calling `start()` twice on the same thread throws `IllegalThreadStateException`.

---

## Thread Lifecycle

A thread moves through these states (`Thread.State`):

| State | Meaning |
|---|---|
| `NEW` | Created but `start()` not called yet |
| `RUNNABLE` | Running or ready to run |
| `BLOCKED` | Waiting to enter a `synchronized` block |
| `WAITING` | Waiting indefinitely (`join()`, `wait()`) |
| `TIMED_WAITING` | Waiting with a timeout (`sleep(1000)`) |
| `TERMINATED` | `run()` finished |

```java
Thread t = new Thread(() -> {});
System.out.println(t.getState()); // NEW
t.start();
System.out.println(t.getState()); // RUNNABLE
```

---

## sleep() and join()

### `Thread.sleep(millis)` — pause the current thread

```java
System.out.println("Order placed...");
Thread.sleep(2000);   // pause 2 seconds (throws InterruptedException)
System.out.println("Order confirmed!");
```

### `join()` — wait for another thread to finish

```java
Thread worker = new Thread(() -> {
    for (int i = 1; i <= 3; i++) {
        System.out.println("Processing step " + i);
    }
});

worker.start();
worker.join();   // main waits here until worker is done
System.out.println("All steps finished");
```

Without `join()`, `"All steps finished"` could print **before** the worker completes.

---

## The Problem: Race Conditions

When two threads modify **shared data** at the same time, results become unpredictable:

```java
class Counter {
    int count = 0;

    void increment() {
        count++;   // NOT atomic: read → add → write
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread t1 = new Thread(() -> { for (int i = 0; i < 10000; i++) counter.increment(); });
        Thread t2 = new Thread(() -> { for (int i = 0; i < 10000; i++) counter.increment(); });

        t1.start(); t2.start();
        t1.join();  t2.join();

        System.out.println(counter.count); // expected 20000 — often prints LESS!
    }
}
```

Both threads read the same value, increment it, and overwrite each other's update. This is a **race condition**.

---

## Synchronization

The `synchronized` keyword ensures **only one thread at a time** can run a block/method on the same object:

```java
class Counter {
    private int count = 0;

    synchronized void increment() {   // one thread at a time
        count++;
    }

    synchronized int getCount() {
        return count;
    }
}
```

Now the output is reliably `20000`.

### Synchronized block (finer control)

```java
void increment() {
    // ...non-critical work...
    synchronized (this) {
        count++;              // only this part is locked
    }
}
```

### Atomic classes — lock-free alternative

For simple counters, `java.util.concurrent.atomic` is faster than locking:

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();   // atomic, thread-safe, no synchronized needed
```

> **Deadlock warning:** if thread A holds lock 1 and waits for lock 2, while thread B holds lock 2 and waits for lock 1 — both wait forever. Always acquire multiple locks in the **same order**.

---

## ExecutorService — Thread Pools

Creating a `Thread` per task is expensive. A **thread pool** reuses a fixed set of threads:

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            executor.submit(() ->
                System.out.println("Task " + taskId + " on " + Thread.currentThread().getName()));
        }

        executor.shutdown();   // stop accepting new tasks, finish running ones
    }
}
```

```
Task 1 on pool-1-thread-1
Task 2 on pool-1-thread-2
Task 3 on pool-1-thread-3
Task 4 on pool-1-thread-1
Task 5 on pool-1-thread-2
```

Common factory methods:

| Method | Use case |
|---|---|
| `newFixedThreadPool(n)` | Fixed number of threads — most common |
| `newCachedThreadPool()` | Grows/shrinks as needed — many short tasks |
| `newSingleThreadExecutor()` | Tasks run one-by-one, in order |
| `newScheduledThreadPool(n)` | Run tasks after a delay or periodically |

> Always call `shutdown()` — otherwise the pool's threads keep the JVM alive.

---

## Callable and Future — Getting a Result Back

`Runnable` returns nothing. **`Callable<V>`** returns a value (and can throw checked exceptions). Submitting one gives you a **`Future<V>`** — a handle to the result:

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Callable<Integer> priceTask = () -> {
            Thread.sleep(1000);        // simulate API call
            return 4999;
        };

        Future<Integer> future = executor.submit(priceTask);

        System.out.println("Doing other work...");
        Integer price = future.get();  // blocks until result is ready
        System.out.println("Price: " + price);

        executor.shutdown();
    }
}
```

Useful `Future` methods: `get()` (wait for result), `get(2, TimeUnit.SECONDS)` (wait with timeout), `isDone()`, `cancel(true)`.

---

## Runnable vs Callable

| | `Runnable` | `Callable<V>` |
|---|---|---|
| Method | `void run()` | `V call()` |
| Returns a value | ❌ No | ✅ Yes |
| Throws checked exceptions | ❌ No | ✅ Yes |
| Used with | `Thread`, executors | Executors only |

---

## Quick Reference

| Concept | Tool |
|---|---|
| Run a task on a new thread | `new Thread(runnable).start()` |
| Pause current thread | `Thread.sleep(ms)` |
| Wait for a thread | `thread.join()` |
| Protect shared data | `synchronized`, `AtomicInteger` |
| Reuse threads | `ExecutorService` / thread pools |
| Get a result from a task | `Callable` + `Future` |

---

## Common Mistakes

```java
// ❌ Calling run() instead of start() — no new thread created
t.run();

// ❌ Forgetting join() — main finishes before workers
t.start();
System.out.println("done"); // may print too early

// ❌ Unsynchronized shared mutable state — race condition
count++;

// ❌ Forgetting shutdown() — JVM never exits
executor.submit(task);

// ✅ Correct pattern
ExecutorService executor = Executors.newFixedThreadPool(2);
Future<Integer> f = executor.submit(() -> compute());
Integer result = f.get();
executor.shutdown();
```

---

## Summary

- A **thread** is an independent path of execution; every program starts with the `main` thread.
- Create threads with **`Runnable`** (preferred) and always use **`start()`**, never `run()`.
- **`sleep()`** pauses the current thread; **`join()`** waits for another to finish.
- Shared mutable data needs **`synchronized`** or **atomic classes** to avoid race conditions.
- Use **`ExecutorService`** thread pools instead of raw threads, and **`Callable` + `Future`** when you need a result back.
