---
title: Strings in Python
description: A comprehensive guide to working with strings in Python, covering literals, indexing, slicing, and common methods.
---

Strings are one of the most commonly used data types in Python. A string is a sequence of characters enclosed in quotes.

## Creating Strings

You can create strings using single (`'`), double (`"`), or triple (`'''` or `"""`) quotes.

```python
# Single and double quotes
name = 'Python'
message = "Hello, World!"

# Triple quotes for multi-line strings
multi_line = """This is a
multi-line string."""
```

## String Indexing

Each character in a string has an index, starting from `0`.

```python
language = "Python"
print(language[0])  # Output: P
print(language[-1]) # Output: n (last character)
```

## String Slicing

Slicing allows you to get a sub-string from a string.

Syntax: `string[start:end:step]`

```python
text = "Hello, Python"
print(text[0:5])   # Output: Hello
print(text[7:])    # Output: Python
print(text[::-1])  # Output: nohtyP ,olleH (reversed)
```

## Common String Methods

Python provides many built-in methods to manipulate strings.

| Method | Description |
| :--- | :--- |
| `upper()` | Converts string to uppercase |
| `lower()` | Converts string to lowercase |
| `strip()` | Removes whitespace from both ends |
| `replace(old, new)` | Replaces a substring with another |
| `split(separator)` | Splits string into a list |

```python
phrase = "  Python is fun!  "
print(phrase.strip().upper()) # Output: PYTHON IS FUN!
```

## String Formatting (f-strings)

Introduced in Python 3.6, f-strings are a concise way to embed expressions inside string literals.

```python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
# Output: My name is Alice and I am 25 years old.
```
