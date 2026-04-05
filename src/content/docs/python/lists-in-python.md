---
title: Lists in Python
description: A comprehensive guide to working with lists in Python, covering creation, indexing, slicing, and common methods.
---

Lists are one of the most powerful and versatile data structures in Python. A list is an ordered, mutable collection of items.

## Creating Lists

You can create lists by placing items inside square brackets `[]`, separated by commas.

```python
# List of integers
numbers = [1, 2, 3, 4, 5]

# List of mixed data types
mixed = [1, "Python", 3.14, True]

# Empty list
empty = []
```

## Accessing Elements

Each item in a list has an index, starting from `0`.

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: cherry (last item)
```

## List Slicing

Like strings, lists can be sliced to get a sub-list.

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])   # Output: [2, 3, 4]
print(numbers[:4])    # Output: [0, 1, 2, 3]
print(numbers[::2])   # Output: [0, 2, 4, 6, 8] (step of 2)
```

## Common List Methods

Python provides several methods for modifying lists.

| Method | Description |
| :--- | :--- |
| `append(item)` | Adds an item to the end of the list |
| `insert(index, item)` | Inserts an item at a specific index |
| `remove(item)` | Removes the first occurrence of an item |
| `pop(index)` | Removes and returns the item at the given index (default is last) |
| `sort()` | Sorts the list in place |
| `reverse()` | Reverses the order of the list in place |

```python
list = [3, 1, 4]
list.append(2)
list.sort()
print(list) # Output: [1, 2, 3, 4]
```

## List Comprehensions

List comprehensions provide a concise way to create lists.

```python
# Create a list of squares
squares = [x**2 for x in range(10)]
print(squares) # Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```
