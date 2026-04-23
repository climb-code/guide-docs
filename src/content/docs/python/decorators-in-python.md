---
title: Decorators in Python
description: Learn how to use decorators to modify the behavior of functions and classes in Python.
---

Decorators are one of the most powerful and useful features in Python. They allow you to "wrap" another function in order to extend its behavior without permanently modifying it.

---

## Functions as First-Class Objects

To understand decorators, you must first understand that in Python, functions are **first-class objects**. This means they can be passed around and used as arguments, just like strings or integers.

```python
def shout(text):
    return text.upper()

def whisper(text):
    return text.lower()

def greet(func):
    # Storing the function in a variable
    greeting = func("Hello, I am a function passed as an argument.")
    print(greeting)

greet(shout)
greet(whisper)
```

---

## What is a Decorator?

A decorator is a function that takes another function as an argument, defines an inner function that adds some behavior, and returns the inner function.

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

def say_hello():
    print("Hello!")

# Manual decoration
say_hello = my_decorator(say_hello)
say_hello()
```

---

## The `@` Syntax (Pie Syntax)

Python allows you to use the `@` symbol to wrap a function with a decorator more easily.

```python
def my_decorator(func):
    def wrapper():
        print("Before the call")
        func()
        print("After the call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

---

## Decorating Functions with Arguments

To decorate functions that take arguments, use `*args` and `**kwargs` in the wrapper function.

```python
def do_twice(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        func(*args, **kwargs)
    return wrapper

@do_twice
def greet(name):
    print(f"Hello {name}")

greet("Alice")
```

---

## Returning Values

If the decorated function returns a value, the wrapper function must also return that value.

```python
def do_twice(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        return func(*args, **kwargs)
    return wrapper

@do_twice
def return_greeting(name):
    print("Creating greeting")
    return f"Hi {name}"

hi_alice = return_greeting("Alice")
print(hi_alice)
```

---

## Common Use Cases

1. **Logging**: Keeping track of when a function was called.
2. **Timing**: Measuring how long a function takes to run.
3. **Authorization**: Checking if a user has permission to call a function.
4. **Caching**: Storing results of expensive function calls.
