---
title: Control Flow in Python
description: Learn about conditional statements like if, elif, and else in Python.
---

Control flow is the order in which the program's code executes. In Python, control flow is regulated by conditional statements, loops, and function calls.

## Conditional Statements

Conditional statements allow you to execute different blocks of code based on certain conditions.

### The `if` Statement

The `if` statement is used to test a condition. If the condition is `True`, the block of code inside the `if` statement is executed.

```python
age = 20
if age >= 18:
    print("You are eligible to vote.")
```

### The `else` Statement

The `else` statement is used to execute a block of code if the condition in the `if` statement is `False`.

```python
age = 15
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote yet.")
```

### The `elif` Statement

The `elif` (short for else if) statement allows you to check multiple conditions. If the condition for `if` is `False`, it checks the condition of the next `elif` block.

```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: D")
```

## Indentation in Python

Unlike many other programming languages that use curly braces `{}` to define blocks of code, Python uses **indentation** (whitespace at the beginning of a line).

```python
if True:
    print("This is indented")
    print("This is also part of the if block")
print("This is NOT part of the if block")
```

## Shorthand If (Ternary Operator)

If you have only one statement to execute, you can put it on the same line as the `if` statement. For `if-else`, Python supports a one-line syntax:

```python
# Syntax: value_if_true if condition else value_if_false
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)
```

## Logical Operators

You can combine multiple conditions using logical operators: `and`, `or`, and `not`.

```python
x = 10
y = 20

if x > 5 and y > 15:
    print("Both conditions are True")

if x > 15 or y > 15:
    print("At least one condition is True")
```
