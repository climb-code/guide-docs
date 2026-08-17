---
title: Virtual Threads in Java
description: Learn Java virtual threads, when to use them for concurrent I/O work, and how they differ from platform threads.
---

**Virtual threads** are lightweight threads managed by the Java runtime. They make it practical to use the familiar thread-per-task style for applications that spend much of their time waiting for network calls, files, or databases.

Virtual threads became a standard feature in Java 21.

---

## Platform Threads and Virtual Threads

A traditional, or **platform**, thread maps closely to an operating-system thread. They are useful, but creating a very large number of them consumes significant memory and scheduling resources.

A virtual thread is scheduled by the JVM on a smaller pool of platform threads. When a virtual thread blocks on supported I/O, the JVM can run another virtual thread instead.

| Best fit | Why |
| --- | --- |
| Many concurrent HTTP or database requests | Most tasks wait for I/O. |
| Background jobs that call external services | Each job can use straightforward blocking code. |
| CPU-heavy calculations | Usually no benefit; CPU cores remain the limit. |

---

## Starting a Virtual Thread

Use `Thread.startVirtualThread()` for one small task.

```java
Thread thread = Thread.startVirtualThread(() -> {
    System.out.println("Running on a virtual thread");
});

thread.join();
```

Like a normal thread, `join()` waits until the task is complete.

---

## Running Many Tasks with an Executor

For request-like tasks, use a virtual-thread-per-task executor. It creates a virtual thread for each submitted task.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int id = 1; id <= 1_000; id++) {
        int requestId = id;
        executor.submit(() -> {
            // Call an API, read a file, or query a database here.
            System.out.println("Handling request " + requestId);
        });
    }
}
```

The try-with-resources block closes the executor and waits for its submitted tasks to finish.

---

## Keep the Code Simple

Virtual threads support ordinary blocking code. You usually do not need to replace readable code with callback chains just to avoid blocking a thread.

```java
String body = httpClient.send(request, BodyHandlers.ofString()).body();
```

This is a good virtual-thread use case when many requests can be in flight. Still set connection timeouts and limit external resources—virtual threads do not make a database or remote API unlimited.

---

## Important Guidelines

- Use virtual threads for high-concurrency, I/O-bound work.
- Do not pool virtual threads; create one per task through the provided executor.
- Avoid holding a `synchronized` lock while doing slow I/O, because it can reduce scheduler flexibility.
- Keep CPU-bound work bounded with a fixed-size executor or other concurrency limit.
- Use normal monitoring and timeouts; lightweight threads can still overload downstream services.

Virtual threads improve scalability, not the speed of a single operation.

---

### Next Steps ➡️

Review **Multithreading and Concurrency** for locks, executors, and thread-safety fundamentals that still apply when using virtual threads.
