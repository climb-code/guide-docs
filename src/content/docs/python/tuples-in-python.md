---
title: Tuples in Python
description: A comprehensive guide to working with tuples in Python, covering creation, indexing, slicing, unpacking, and common methods.
---

Tuples are another versatile data structure in Python, similar to lists but with one key difference: they are **immutable**. This means once a tuple is created, its elements cannot be changed.

## Creating Tuples

Tuples are created by placing items inside parentheses `()`, separated by commas. You can also create a tuple without parentheses (called tuple packing).

```python
# Tuple with parentheses
fruits = ("apple", "banana", "cherry")

# Tuple without parentheses (tuple packing)
colors = "red", "green", "blue"

# Single-item tuple (note the trailing comma)
single = ("apple",) 

# Empty tuple
empty = ()
```

## Accessing Elements

Accessing elements in a tuple is identical to lists, using zero-based indexing.

```python
fruits = ("apple", "banana", "cherry")
print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: cherry
```

## Tuple Slicing

Slicing works the same way as it does for lists and strings.

```python
numbers = (0, 1, 2, 3, 4, 5)
print(numbers[1:4])  # Output: (1, 2, 3)
```

## Tuple Unpacking

You can extract the values of a tuple into multiple variables.

```python
fruits = ("apple", "banana", "cherry")
(green, yellow, red) = fruits

print(green)  # Output: apple
print(yellow) # Output: banana
print(red)    # Output: cherry
```

## Tuple Methods

Since tuples are immutable, they only have two built-in methods.

| Method | Description |
| :--- | :--- |
| `count(item)` | Returns the number of times a value occurs in a tuple |
| `index(item)` | Searches for a specific value and returns its first position |

```python
numbers = (1, 2, 3, 2, 4)
print(numbers.count(2)) # Output: 2
print(numbers.index(3)) # Output: 2
```

## Tuples vs. Lists

| Feature | Tuple | List |
| :--- | :--- | :--- |
| **Mutability** | Immutable (cannot change) | Mutable (can change) |
| **Syntax** | Parentheses `()` | Square brackets `[]` |
| **Performance** | Faster than lists | Slower than tuples |
| **Use Case** | Fixed collections of data | Data that needs to be modified |
