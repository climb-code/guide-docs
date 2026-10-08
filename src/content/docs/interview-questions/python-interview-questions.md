---
title: Python Interview Questions
description: Source-backed Python interview questions for Indian hiring rounds, starting with fundamentals and practical coding.
---

These questions are selected from published interview experiences at Indian employers and an interview preparation question bank. Answers and examples are written for Python 3 and checked against official Python documentation.

Company reports are candidate accounts, not official question banks or a measured ranking of the most frequent questions. The levels below describe the knowledge required, rather than a fixed company interview syllabus.

## Basic: language and collections

### 1. Why use Python, and what are its main features?

Python offers readable syntax, dynamic typing, automatic memory management, and a broad standard library. It supports procedural, object-oriented, and functional styles. Explain its use in your project, such as automation or backend development, along with relevant performance constraints.

Question source: [Infosys experienced interview][infosys]. Answer reference: [Python glossary][glossary].

### 2. Is Python compiled or interpreted?

In CPython, source is compiled to bytecode, which the interpreter executes. Imported modules can cache bytecode in `__pycache__`. Other implementations can behave differently; avoid claiming that Python always executes source one line at a time.

Question source: [Infosys experienced interview][infosys]. Answer reference: [Python modules][modules].

### 3. What does dynamically typed mean?

Objects have types; names can be rebound to objects of different types. Type annotations do not ordinarily enforce types at runtime.

```python
value = 12
value = "twelve"
assert isinstance(value, str)
```

Question source: [Interview question bank, Q3][bank]. Answer reference: [Python glossary][glossary].

### 4. Why is indentation required?

Indentation defines blocks, including function bodies and conditional branches. Use consistent indentation, conventionally four spaces. Mixing tabs and spaces can produce `TabError`.

Question source: [Interview question bank, Q2][bank]. Answer reference: [Python lexical analysis][lexical].

### 5. Which built-in data types should you know?

Know `int`, `float`, `complex`, `bool`, `str`, `list`, `tuple`, `range`, `dict`, `set`, `frozenset`, `bytes`, and `NoneType`. `None` represents absence; it differs from zero or an empty string.

Question source: [Fynd Python engineer interview][fynd]. Answer reference: [Built-in types][types].

### 6. How do lists and tuples differ?

A list is a mutable sequence; a tuple is an immutable sequence. Both preserve order and allow duplicates. A tuple can contain mutable objects and is hashable only when all its elements are hashable.

```python
record = ("Asha", [80])
record[1].append(90)
assert record == ("Asha", [80, 90])
```

Question source: [Infosys candidate report][collections-report]. Answer reference: [Built-in types][types].

### 7. How do sets and dictionaries differ?

A set stores unique hashable elements. A dictionary maps hashable keys to values and preserves insertion order. `{}` creates an empty dictionary; use `set()` for an empty set. Set iteration order is not guaranteed.

Question source: [Interview question bank, Q9][bank]. Answer reference: [Python data structures][structures].

### 8. What are mutable and immutable objects?

Mutable objects, such as lists, can change in place. Immutable objects, such as strings and integers, cannot. Reassigning a name changes its binding, not the previous object.

```python
first = [10]
second = first
second.append(20)
assert first == [10, 20]
```

Question source: [Interview question bank, Q5][bank]. Answer reference: [Python data model][model].

### 9. What is the difference between `==` and `is`?

`==` tests equality; `is` tests object identity. Prefer `value is None` for the singleton check. Do not rely on integer or string caching to compare values with `is`.

```python
left = [4]
right = [4]
assert left == right
assert left is not right
```

Question source: [Interview question bank, Q6][bank]. Answer reference: [Python data model][model].

### 10. How does slicing work?

`sequence[start:stop:step]` excludes `stop`. Negative indices count from the end. `text[::-1]` reverses a string; a zero step raises `ValueError`.

```python
text = "coding"
assert text[1:4] == "odi"
assert text[::-1] == "gnidoc"
```

Question source: [Interview question bank, Q30][bank]. Answer reference: [Python introduction][introduction].

### 11. How do `append()` and `extend()` differ?

`append()` adds one object; `extend()` adds each item from an iterable. Both modify the list and return `None`.

```python
items = [1]
items.append([2, 3])
assert items == [1, [2, 3]]
items = [1]
items.extend([2, 3])
assert items == [1, 2, 3]
```

Question source: [Infosys report on list methods][campus] and [question bank, Q24][bank]. Answer reference: [Python data structures][structures].

### 12. How do `remove()`, `pop()`, and `del` differ?

`remove(value)` deletes the first matching value. `pop(index)` removes and returns an item, defaulting to the last. `del` can delete an index, slice, or name. Missing values raise `ValueError`; invalid list indices raise `IndexError`.

Question source: [Interview question bank, Q25][bank]. Answer reference: [Python data structures][structures].

### 13. What do `break`, `continue`, and `pass` do?

`break` exits the nearest loop. `continue` starts its next iteration. `pass` performs no operation and can serve as a placeholder. A loop's `else` runs when the loop ends without `break`.

Question source: [Interview question bank, Q13][bank]. Answer reference: [Python control flow][control].

### 14. What is a lambda function?

A lambda creates a function from one expression. It can accept multiple parameters. Use `def` when the logic needs statements or clearer documentation.

```python
assert (lambda price, tax: price + tax)(100, 18) == 118
```

Question source: [Infosys experienced interview][infosys]. Answer reference: [Python control flow][control].

### 15. How would you sort a list? How do `sort()` and `sorted()` differ?

`list.sort()` changes the list and returns `None`. `sorted()` accepts an iterable and returns a new list. Both accept `key` and `reverse` and preserve the relative order of equal keys.

```python
scores = [40, 20, 30]
assert sorted(scores) == [20, 30, 40]
assert scores == [40, 20, 30]
assert scores.sort() is None
assert scores == [20, 30, 40]
```

Question source: [Infosys sorting question][infosys]. Answer reference: [Built-in functions][functions].

### 16. What are classes and objects?

A class defines behavior and attributes; an instance is an object created from that class. Instance attributes belong to each object. Mutable class attributes are shared unless shadowed by an instance attribute.

Question source: [Infosys experienced interview][infosys]. Answer reference: [Python classes][classes].

### 17. What do `__init__()` and `self` do?

`__init__()` initializes an instance after `__new__()` creates it. `self` is the conventional first parameter of an instance method and receives the instance; it is not a keyword.

```python
class Applicant:
    def __init__(self, name):
        self.name = name

assert Applicant("Asha").name == "Asha"
```

Question source: [Infosys constructor question][campus]. Answer reference: [Python data model][model].

### 18. Implement linear search.

Scan left to right and return the first matching index, or `-1` when absent. Time is O(n); extra space is O(1).

```python
def linear_search(values, target):
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1

assert linear_search([9, 3, 3], 3) == 1
assert linear_search([], 3) == -1
assert linear_search([9], 3) == -1
```

Question source: [Infosys pool-campus interview][campus]. API reference: [enumerate()][functions].

## Interview evidence

Use the links beside each question to trace its selection. Source publication/update dates do not necessarily identify the interview date.

- [Infosys experienced interview (2023)][infosys]: language features, execution, sorting, lambda, functional helpers, classes, inheritance, and initialization.
- [Infosys pool-campus interview (2019 drive)][campus]: list methods, constructors, abstraction, and linear search.
- [Infosys candidate report (October 2026)][collections-report]: comparison of lists, tuples, and dictionaries.
- [Fynd junior Python engineer experience][fynd]: types, copying, identity, and a sliding-window coding problem.
- [GeeksforGeeks question bank][bank]: broader preparation topics; it does not establish company-specific frequency.

[infosys]: https://www.geeksforgeeks.org/interview-experiences/infosys-interview-experience-2023-2/
[campus]: https://www.geeksforgeeks.org/interview-experiences/infosys-pool-campus-interview-experience/
[collections-report]: https://www.reddit.com/r/infosys/comments/1wwqy0y/infosys_interview_experience/
[fynd]: https://www.geeksforgeeks.org/interview-experiences/fynd-interview-experience-for-junior-python-engineer-1-years-experienced/
[bank]: https://www.geeksforgeeks.org/python/python-interview-questions/
[glossary]: https://docs.python.org/3/glossary.html
[lexical]: https://docs.python.org/3/reference/lexical_analysis.html#indentation
[types]: https://docs.python.org/3/library/stdtypes.html
[structures]: https://docs.python.org/3/tutorial/datastructures.html
[model]: https://docs.python.org/3/reference/datamodel.html
[introduction]: https://docs.python.org/3/tutorial/introduction.html
[control]: https://docs.python.org/3/tutorial/controlflow.html
[functions]: https://docs.python.org/3/library/functions.html
[classes]: https://docs.python.org/3/tutorial/classes.html
[modules]: https://docs.python.org/3/tutorial/modules.html
