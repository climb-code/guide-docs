---
title: Iterators and Generators in Python
description: Learn about iterators, the iterator protocol, and how to create memory-efficient generators in Python.
---

Python provides powerful tools for working with sequences of data efficiently. **Iterators** and **Generators** are two key concepts that allow you to traverse data without loading everything into memory at once.

---

## Python Iterators

An iterator is an object that contains a countable number of values and can be iterated upon, meaning you can traverse through all the values.

### The Iterator Protocol

In Python, an iterator is an object which implements the iterator protocol, which consists of the methods `__iter__()` and `__next__()`.

```python
mytuple = ("apple", "banana", "cherry")
myit = iter(mytuple)

print(next(myit)) # Output: apple
print(next(myit)) # Output: banana
```

### Creating an Iterator

To create an object/class as an iterator, you have to implement the methods `__iter__()` and `__next__()` to your object.

```python
class MyNumbers:
  def __iter__(self):
    self.a = 1
    return self

  def __next__(self):
    if self.a <= 5:
      x = self.a
      self.a += 1
      return x
    else:
      raise StopIteration

myclass = MyNumbers()
myiter = iter(myclass)

for x in myiter:
  print(x)
```

---

## Python Generators

Generators are a simple way of creating iterators. A generator is a function that returns an object (iterator) which we can iterate over (one value at a time).

### The `yield` Keyword

Generators use the `yield` statement instead of `return`. When called, it returns an object but does not start execution immediately.

```python
def my_generator():
    yield 1
    yield 2
    yield 3

gen = my_generator()
print(next(gen)) # Output: 1
print(next(gen)) # Output: 2
```

### Why Use Generators?

1. **Memory Efficiency**: Generators produce items one at a time and only when required. This is much more memory-efficient than returning a full list.
2. **Infinite Streams**: Generators are excellent for representing infinite streams of data.
3. **Pipelining**: They can be used to pipeline a series of operations.

### Example: Fibonacci Sequence

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)
```
---

## Key Differences

| Feature | Iterator | Generator |
| :--- | :--- | :--- |
| **Implementation** | Class with `__iter__` and `__next__` | Function with `yield` |
| **State Management** | Done manually | Handled automatically by Python |
| **Complexity** | More boilerplate code | Concise and easy to read |
| **Performance** | Good for custom logic | Excellent for large datasets |
