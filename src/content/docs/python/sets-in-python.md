---
title: Sets in Python
description: A comprehensive guide to working with sets in Python, covering creation, unique properties, and set operations like union and intersection.
---

A set is an **unordered** collection of items where every element is **unique** (no duplicates). Sets are mutable, but the elements within a set must be immutable (like strings, numbers, or tuples).

## Creating Sets

Sets are created by placing items inside curly braces `{}` separated by commas, or by using the `set()` constructor.

```python
# A set of fruits
fruits = {"apple", "banana", "cherry"}

# Creating a set from a list (removes duplicates)
numbers = set([1, 2, 2, 3, 4, 4, 5])
print(numbers) # Output: {1, 2, 3, 4, 5}

# Important: To create an empty set, you must use set(), not {}
empty_set = set()
```

## Adding and Removing Items

Sets are mutable, so you can add and remove items.

```python
fruits = {"apple", "banana"}

# Adding items
fruits.add("orange")

# Adding multiple items
fruits.update(["mango", "grape"])

# Removing items
fruits.remove("banana")  # Raises error if item not found
fruits.discard("cherry") # Does NOT raise error if item not found

# Removing and returning an arbitrary item
item = fruits.pop()
```

## Set Operations

One of the most powerful features of sets is the ability to perform mathematical set operations.

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Union (all elements from both)
print(set1 | set2) # Output: {1, 2, 3, 4, 5, 6}

# Intersection (only common elements)
print(set1 & set2) # Output: {3, 4}

# Difference (elements in set1 but not in set2)
print(set1 - set2) # Output: {1, 2}

# Symmetric Difference (elements in either set1 or set2, but not both)
print(set1 ^ set2) # Output: {1, 2, 5, 6}
```

## Common Set Methods

| Method | Description |
| :--- | :--- |
| `add()` | Adds an element to the set |
| `clear()` | Removes all elements from the set |
| `copy()` | Returns a copy of the set |
| `difference()` | Returns a set containing the difference between two or more sets |
| `intersection()` | Returns a set that is the intersection of two other sets |
| `isdisjoint()` | Returns whether two sets have an intersection or not |
| `issubset()` | Returns whether another set contains this set or not |
| `union()` | Return a set containing the union of sets |

## When to Use Sets
- When you need to keep track of a collection of items where order doesn't matter.
- When you need to ensure that every item in the collection is unique.
- When you need to perform mathematical set operations like intersections or unions.
