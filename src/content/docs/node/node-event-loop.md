---
title: Node.js Event Loop
description: Understanding the heart of Node.js - how it handles asynchronous operations.
---

# Node.js Event Loop

The Event Loop is what allows Node.js to perform non-blocking I/O operations, despite JavaScript being single-threaded.

## How it Works
The Event Loop handles external events and converts them into callback invocations. It operates in several phases:

1.  **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2.  **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
3.  **Idle, Prepare**: Used only internally.
4.  **Poll**: Retrieves new I/O events; executes I/O related callbacks.
5.  **Check**: Executes `setImmediate()` callbacks.
6.  **Close Callbacks**: Executes close events, e.g., `socket.on('close', ...)`.

## Visualizing the Loop
Imagine a loop that constantly checks if there's any work to do:
- If a timer expires -> Run its callback.
- If a file finished reading -> Run its callback.
- If nothing is happening -> Wait for new events.

> [!IMPORTANT]
> **Don't Block the Event Loop!** Heavy computational tasks (like complex math or large JSON parsing) will stop the loop from processing other requests.

## `process.nextTick()` vs `setImmediate()`
- `process.nextTick()`: Fires **immediately** after the current operation, before the next phase of the event loop.
- `setImmediate()`: Fires on the **next iteration** of the event loop (Check phase).
