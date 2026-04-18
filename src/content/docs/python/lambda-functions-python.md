---
title: Lambda Functions in Python
description: Learn how to use anonymous lambda functions in Python for concise and portable code.
---

A lambda function is a small anonymous function. A lambda function can take any number of arguments, but can only have **one expression**.

---

## Syntax

The syntax for a lambda function is:

```python
lambda arguments : expression
```

The expression is executed and the result is returned.

### Example

A lambda function that adds 10 to the number passed in as an argument:

```python
x = lambda a : a + 10
print(x(5)) # Output: 15
```

---

## Why Use Lambda Functions?

The power of lambda is better shown when you use them as an anonymous function inside another function.

Say you have a function definition that takes one argument, and that argument will be multiplied by an unknown number:

```python
def myfunc(n):
    return lambda a : a * n

mydoubler = myfunc(2)
mytripler = myfunc(3)

print(mydoubler(11)) # Output: 22
print(mytripler(11)) # Output: 33
```

---

## Practical Examples with Built-in Functions

Lambda functions are commonly used with built-in functions like `filter()`, `map()`, and `reduce()`.

### Using `filter()`

The `filter()` function takes a function and a list as arguments and returns a new list containing elements for which the function returns `True`.

```python
numbers = [1, 5, 4, 6, 8, 11, 3, 12]

# Filter out only the even numbers
new_list = list(filter(lambda x: (x % 2 == 0), numbers))

print(new_list) # Output: [4, 6, 8, 12]
```

### Using `map()`

The `map()` function takes a function and a list and returns a new list which contains items returned by that function for each item.

```python
numbers = [1, 2, 3, 4, 5]

# Double each number in the list
new_list = list(map(lambda x: x * 2, numbers))

print(new_list) # Output: [2, 4, 6, 8, 10]
```

### Using `reduce()`

The `reduce()` function (from `functools` module) performs a repetitive operation over the pairs of an iterable.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all numbers in the list
sum_result = reduce(lambda x, y: x + y, numbers)

print(sum_result) # Output: 15
```
---

## Key Characteristics

- They are **anonymous** (no name).
- They are **one-liners**.
- They are used for **short-term** purposes or functions passed as arguments.
- They cannot contain statements like `return`, `pass`, `assert`, or `raise`.
