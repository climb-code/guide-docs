---
title: Dictionaries in Python
description: A comprehensive guide to working with dictionaries (key-value pairs) in Python, covering creation, manipulation, and methods.
---

Dictionaries are one of the most powerful and widely used data structures in Python. A dictionary is an **unordered, mutable** collection of items stored as **key-value pairs**.

## Creating Dictionaries

Dictionaries are created using curly braces `{}` with keys and values separated by colons `:`.

```python
# A simple dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Empty dictionary
empty_dict = {}

# Dictionary with mixed value types
data = {
    "colors": ["red", "blue"],
    "is_active": True,
    "count": 10
}
```

## Accessing and Modifying Values

You can access a value by referring to its key name, inside square brackets.

```python
person = {"name": "Alice", "age": 25}

# Accessing
print(person["name"])  # Output: Alice

# Modifying
person["age"] = 26

# Adding a new key-value pair
person["email"] = "alice@example.com"
```

## Common Dictionary Methods

Python provides several built-in methods for working with dictionaries.

| Method | Description |
| :--- | :--- |
| `get(key)` | Returns the value of the specified key; returns `None` if key doesn't exist |
| `keys()` | Returns a list of all keys in the dictionary |
| `values()` | Returns a list of all values in the dictionary |
| `items()` | Returns a list of tuples for each key-value pair |
| `update({key: value})` | Updates the dictionary with the specified key-value pairs |
| `pop(key)` | Removes the element with the specified key |
| `clear()` | Removes all elements from the dictionary |

```python
car = {"brand": "Ford", "model": "Mustang", "year": 1964}

print(car.get("brand")) # Output: Ford
print(car.keys())       # Output: dict_keys(['brand', 'model', 'year'])
```

## Looping Through a Dictionary

You can loop through a dictionary using a `for` loop.

```python
person = {"name": "Alice", "age": 25}

# Loop through keys
for key in person:
    print(key)

# Loop through values
for val in person.values():
    print(val)

# Loop through both (items)
for key, value in person.items():
    print(f"{key}: {value}")
```

## Nested Dictionaries

A dictionary can also contain other dictionaries.

```python
users = {
    "user1": {"name": "Alice", "age": 25},
    "user2": {"name": "Bob", "age": 30}
}

print(users["user1"]["name"]) # Output: Alice
```
