---
title: Modules and Packages in Python
description: Learn how to organize your Python code using modules and packages, and how to use built-in functions to extend your programs.
---

As your program grows, you may want to split your code into multiple files for easier maintenance. Python allows you to do this using **Modules** and **Packages**.

---

## What is a Module?

A module is simply a file containing Python code (functions, classes, variables). You can use any Python file as a module by importing it into another file.

### Example

Let's say you have a file named `mymodule.py`:

```python
def greeting(name):
    print(f"Hello, {name}!")

person1 = {
    "name": "John",
    "age": 36,
    "country": "Norway"
}
```

---

## Using the `import` Statement

To use a module, you use the `import` statement.

```python
import mymodule

mymodule.greeting("Alice")
print(mymodule.person1["age"])
```

### Renaming a Module

You can create an alias when you import a module by using the `as` keyword:

```python
import mymodule as mx

mx.greeting("Alice")
```

---

## The `from...import` Statement

You can choose to import only parts from a module by using the `from` keyword.

```python
from mymodule import person1

print(person1["country"])
```

---

## Built-in Modules

Python comes with a set of built-in modules, which you can import whenever you like.

```python
import platform

x = platform.system()
print(x) # Output: e.g., 'Windows', 'Darwin', 'Linux'
```

Common built-in modules include: `os`, `sys`, `math`, `random`, `datetime`, and `json`.

---

## The `dir()` Function

The `dir()` function is a built-in function that lists all the function names (or variable names) in a module.

```python
import math

print(dir(math))
```

---

## What is a Package?

A **Package** is a way of organizing related modules into a directory hierarchy. In simple terms, a package is a folder that contains multiple module files and a special file named `__init__.py`.

The `__init__.py` file can be empty, but it tells Python that this directory should be treated as a package.

### Structure Example
```text
my_package/
    ├── __init__.py
    ├── module1.py
    └── module2.py
```

To import from a package:
```python
from my_package import module1
```
