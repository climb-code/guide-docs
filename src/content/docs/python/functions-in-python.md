---
title: Functions in Python
description: Learn how to define and use functions in Python, including parameters, return values, and different types of arguments.
---

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.

## Creating a Function

In Python, a function is defined using the `def` keyword.

```python
def my_function():
    print("Hello from a function")
```

## Calling a Function

To call a function, use the function name followed by parenthesis:

```python
def my_function():
    print("Hello from a function")

my_function() # Output: Hello from a function
```

## Arguments

Information can be passed into functions as arguments. Arguments are specified after the function name, inside the parentheses. You can add as many arguments as you want, just separate them with a comma.

```python
def greet(name):
    print("Hello, " + name)

greet("Alice")   # Output: Hello, Alice
greet("Bob")     # Output: Hello, Bob
```

> [!NOTE]
> Parameters are the variables listed inside the parentheses in the function definition. Arguments are the values sent to the function when it is called.

## Return Values

To let a function return a value, use the `return` statement:

```python
def square(x):
    return x * x

result = square(5)
print(result) # Output: 25
```

---

## Default Parameter Value

You can specify a default value for a parameter. if we call the function without an argument, it uses the default value:

```python
def greet(name="Guest"):
    print("Hello, " + name)

greet("Alice") # Output: Hello, Alice
greet()        # Output: Hello, Guest
```

## Keyword Arguments

You can also send arguments with the *key* = *value* syntax. This way the order of the arguments does not matter.

```python
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

describe_pet(pet_name="Whiskers", animal_type="cat")
# Output: I have a cat named Whiskers.
```

## Arbitrary Arguments (*args)

If you do not know how many arguments will be passed into your function, add a `*` before the parameter name. This way the function will receive a *tuple* of arguments.

```python
def list_fruits(*fruits):
    for fruit in fruits:
        print(fruit)

list_fruits("apple", "banana", "cherry")
```

## Arbitrary Keyword Arguments (**kwargs)

If you do not know how many keyword arguments will be passed into your function, add two asterisks: `**` before the parameter name. This way the function will receive a *dictionary* of arguments.

```python
def user_profile(**user_info):
    for key, value in user_info.items():
        print(f"{key}: {value}")

user_profile(first_name="John", last_name="Doe", occupation="Developer")
```

---

## The `pass` Statement

Function definitions cannot be empty, but if you for some reason have a function definition with no content, put in the `pass` statement to avoid getting an error.

```python
def future_function():
    pass
```
