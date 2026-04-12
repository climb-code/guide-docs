---
title: Exception Handling in Python
description: Learn how to handle errors and exceptions gracefully in Python using try, except, and finally blocks.
---

Even if a statement or expression is syntactically correct, it may cause an error when an attempt is made to execute it. Errors detected during execution are called **exceptions**.

---

## The `try...except` Block

The `try` block lets you test a block of code for errors. The `except` block lets you handle the error.

```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(result)
except ValueError:
    print("Invalid Input! Please enter a numeric value.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

---

## Handling Multiple Exceptions

You can handle multiple exceptions in a single `except` block using a tuple.

```python
try:
    # Some code
    pass
except (ValueError, ZeroDivisionError) as e:
    print(f"An error occurred: {e}")
```

---

## The `else` Clause

You can use the `else` keyword to define a block of code to be executed if no errors were raised.

```python
try:
    print("Hello")
except:
    print("Something went wrong")
else:
    print("Nothing went wrong")
```

---

## The `finally` Clause

The `finally` block, if specified, will be executed regardless if the try block raises an error or not. This is often used for clean-up actions like closing files or network connections.

```python
try:
    f = open("demofile.txt")
    try:
        f.write("Lorum Ipsum")
    except:
        print("Something went wrong when writing to the file")
    finally:
        f.close()
except:
    print("Something went wrong when opening the file")
```

---

## Raising an Exception

As a Python developer, you can choose to throw an exception if a condition occurs. To throw (or raise) an exception, use the `raise` keyword.

```python
x = -1

if x < 0:
    raise Exception("Sorry, no numbers below zero")
```

---

## Custom Exceptions

You can create your own exception classes by inheriting from the built-in `Exception` class.

```python
class MyError(Exception):
    def __init__(self, message):
        self.message = message

try:
    raise MyError("This is a custom error")
except MyError as e:
    print(e.message)
```
