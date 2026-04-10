---
title: Loops in Python
description: Learn about for and while loops, and how to control loop execution in Python.
---

Loops are used to repeat a block of code multiple times. Python provides two main types of loops: `for` loops and `while` loops.

## The `for` Loop

A `for` loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).

### Iterating Over a List

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

### The `range()` Function

To loop through a set of code a specified number of times, we can use the `range()` function.

```python
# Iterates from 0 to 4
for i in range(5):
    print(i)
```

You can also specify a start value, an end value, and a step value:

```python
# Iterates from 2 to 10 with a step of 2
for i in range(2, 11, 2):
    print(i) # Output: 2, 4, 6, 8, 10
```

---

## The `while` Loop

The `while` loop executes a set of statements as long as a condition is true.

```python
count = 1
while count <= 5:
    print(count)
    count += 1
```

> [!IMPORTANT]
> Always ensure the condition in a `while` loop eventually becomes false; otherwise, you will create an **infinite loop**.

---

## Loop Control Statements

Python provides statements to change the execution from its normal sequence.

### The `break` Statement

The `break` statement is used to exit the loop prematurely.

```python
for i in range(10):
    if i == 5:
        break
    print(i) # Prints 0 to 4
```

### The `continue` Statement

The `continue` statement skips the current iteration and moves to the next one.

```python
for i in range(5):
    if i == 2:
        continue
    print(i) # Prints 0, 1, 3, 4
```

### The `pass` Statement

The `pass` statement is a null operation; it is used as a placeholder when a statement is required syntactically but no action is needed.

```python
for i in range(5):
    pass # Do nothing
```

---

## The `else` Clause in Loops

Python allows an `else` block after a `for` or `while` loop. The `else` block is executed only if the loop completes **normally** (i.e., it was not terminated by a `break`).

```python
for i in range(5):
    print(i)
else:
    print("Loop completed successfully!")
```
