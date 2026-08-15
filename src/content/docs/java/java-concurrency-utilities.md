---
title: Concurrency Utilities in Java
description: Learn how ExecutorService, futures, locks, and concurrent collections help build safer Java programs that run tasks in parallel.
---

The `java.util.concurrent` package provides higher-level tools for concurrent programs. Prefer these utilities over manually creating and coordinating `Thread` objects for most application code.

---

## Run Tasks with an ExecutorService

An `ExecutorService` manages a pool of workers. Submit tasks to it instead of deciding yourself when every thread starts and stops.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

try (ExecutorService executor = Executors.newFixedThreadPool(4)) {
    for (int id = 1; id <= 10; id++) {
        int taskId = id;
        executor.submit(() -> {
            System.out.println("Processing task " + taskId);
        });
    }
}
```

The fixed pool runs at most four tasks at once. Closing the executor prevents new submissions and waits for submitted work to finish.

---

## Get a Result with Future

Use a `Callable` when a task returns a value. `submit()` returns a `Future` that represents the eventual result.

```java
import java.util.concurrent.Future;

try (ExecutorService executor = Executors.newFixedThreadPool(2)) {
    Future<Integer> total = executor.submit(() -> 21 + 21);

    // get() waits only if the result is not ready yet.
    System.out.println(total.get()); // 42
}
```

`get()` can throw `ExecutionException` when the task failed and `InterruptedException` when the waiting thread is interrupted. Handle both deliberately.

---

## Compose Work with CompletableFuture

`CompletableFuture` is useful when a later operation depends on an earlier asynchronous result.

```java
import java.util.concurrent.CompletableFuture;

CompletableFuture<String> greeting = CompletableFuture
        .supplyAsync(() -> "guide docs")
        .thenApply(String::toUpperCase)
        .thenApply(name -> "Welcome to " + name);

System.out.println(greeting.join());
```

Prefer `thenCompose()` when the next step itself returns a `CompletableFuture`, and use `handle()` or `exceptionally()` to provide failure handling.

---

## Protect Shared State

If multiple tasks modify the same value, an ordinary increment is not safe.

```java
count++; // read, add, and write are separate operations
```

For a simple counter, use `AtomicInteger`:

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger count = new AtomicInteger();

executor.submit(count::incrementAndGet);
executor.submit(count::incrementAndGet);
```

For multiple related operations, use a `ReentrantLock` with a `finally` block so the lock is always released.

```java
import java.util.concurrent.locks.ReentrantLock;

ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    // Read or update shared state.
} finally {
    lock.unlock();
}
```

---

## Use Concurrent Collections

Collections such as `HashMap` and `ArrayList` are not safe for simultaneous modification. Use a collection designed for the required access pattern.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

ConcurrentMap<String, Integer> visits = new ConcurrentHashMap<>();
visits.merge("/java", 1, Integer::sum);
```

Useful choices include:

| Utility | Good use case |
| --- | --- |
| `ConcurrentHashMap` | Shared lookup or cache with frequent reads and updates. |
| `BlockingQueue` | Producer-consumer work queues. |
| `CountDownLatch` | Wait until a fixed number of tasks complete. |
| `Semaphore` | Limit simultaneous access to a resource. |

---

## Choose the Right Limit

- For CPU-intensive work, use a bounded pool roughly aligned with available processors.
- For many I/O-bound tasks, consider virtual threads rather than increasing a platform-thread pool without limit.
- Keep locks small and never hold one while making a slow remote call.
- Make shutdown part of the design so background tasks do not keep an application alive unexpectedly.

### Next Steps ➡️

Review **Virtual Threads** for a lightweight way to run large numbers of blocking I/O tasks.
