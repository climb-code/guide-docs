---
title: Python Interview Questions
description: 40 source-backed Python interview questions for Indian hiring rounds, covering basic, intermediate, advanced, and coding topics.
---

These questions are selected from published interview experiences at Indian employers and an interview preparation question bank. Answers and examples are written for Python 3 and checked against official Python documentation.

Study Q1–18 for fundamentals, Q19–30 for functions and object behavior, and Q31–38 for advanced topics. Practice the coding questions in Q18, Q39, and Q40 by explaining edge cases and complexity before running the solution.

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

## Intermediate: functions and object behavior

### 19. What are list and dictionary comprehensions?

Comprehensions build collections from iterables, optionally filtering items. Keep expressions readable; use loops for complicated logic.

```python
squares = [n * n for n in range(5) if n % 2 == 0]
lookup = {n: n * n for n in range(3)}
assert squares == [0, 4, 16]
assert lookup == {0: 0, 1: 1, 2: 4}
```

Question source: [Infosys DSE/SP report][dsesp]. Answer reference: [Python data structures][structures].

### 20. What are `*args` and `**kwargs`?

In a function definition, `*args` collects positional arguments in a tuple; `**kwargs` collects keyword arguments in a dictionary. At a call site, `*` and `**` unpack arguments. The parameter names are conventions.

```python
def capture(*args, **kwargs):
    return args, kwargs

assert capture(7, 8, city="Pune") == ((7, 8), {"city": "Pune"})
```

Question source: [Interview question bank, Q17][bank]. Answer reference: [Python control flow][control].

### 21. How are arguments passed to functions?

Parameters bind to the supplied objects. Mutating a shared object is visible to the caller; rebinding the parameter is not. This is commonly called object sharing.

```python
def update(values):
    values.append(2)
    values = [99]

numbers = [1]
update(numbers)
assert numbers == [1, 2]
```

Question source: [Interview question bank, Q18][bank]. Answer reference: [Python programming FAQ][faq].

### 22. What is LEGB? How do `global` and `nonlocal` differ?

Ordinary function name lookup follows Local, Enclosing function, Global module, and Built-in scopes. `global` targets a module binding; `nonlocal` targets an existing binding in an enclosing function. Class bodies and comprehensions have additional scope rules.

Question source: [Interview question bank, Q20–21][bank]. Answer reference: [Python execution model][execution].

### 23. Is `(x for x in items)` a tuple comprehension?

It is a generator expression. Use `tuple(x for x in items)` to construct a tuple. Consuming a generator exhausts it.

```python
values = (n + 1 for n in range(3))
assert tuple(values) == (1, 2, 3)
assert tuple(values) == ()
```

Question source: [Interview question bank, Q33][bank]. Answer reference: [Python expressions][expressions].

### 24. How does exception handling work?

`try` contains the operation; `except` handles matching exceptions. `else` runs when the `try` suite finishes normally; `finally` runs on exit for cleanup. Catch specific exceptions and avoid returning from `finally`, which can suppress failures.

```python
def parse_number(text):
    try:
        return int(text)
    except ValueError:
        return None

assert parse_number("42") == 42
assert parse_number("invalid") is None
```

Question source: [TCS Chennai candidate report][tcs]. Answer reference: [Python errors and exceptions][errors].

### 25. What are modules and packages, and why use a main guard?

A module provides a namespace for code. A package organizes modules; regular packages contain `__init__.py`, while namespace packages may omit it. `if __name__ == "__main__":` runs entry-point logic when executed as the main module, rather than on ordinary import.

Question source: [Interview question bank, Q28–29][bank]. Answer reference: [Python modules][modules].

### 26. What do `map()`, `filter()`, and `reduce()` do?

`map()` transforms items; `filter()` selects them. Both return iterators. `functools.reduce()` accumulates a result. An initial value handles empty input when appropriate.

```python
from functools import reduce

assert list(map(abs, [-3, 2])) == [3, 2]
assert list(filter(lambda n: n > 0, [-3, 2])) == [2]
assert reduce(lambda total, n: total + n, [], 0) == 0
```

Question source: [Infosys experienced interview][infosys]. Answer references: [Built-in functions][functions] and [functools][functools].

### 27. How do assignment, shallow copy, and deep copy differ?

Assignment creates another binding. A shallow copy creates an outer container but shares nested objects. A deep copy recursively copies supported objects, tracking already copied objects to handle cycles. It does not guarantee a new copy of every object type.

```python
from copy import copy, deepcopy

original = [[4], [8]]
shallow = copy(original)
deep = deepcopy(original)
original[0].append(5)
assert shallow == [[4, 5], [8]]
assert deep == [[4], [8]]
assert shallow is not original
```

Question source: [Fynd Python engineer interview][fynd]. Answer reference: [Python copy module][copy].

### 28. What is the difference between an iterable and an iterator?

An iterable can provide an iterator through `iter()`. An iterator supplies values through `next()` until `StopIteration`; its `__iter__()` returns itself. A list can create fresh iterators, while an exhausted iterator stays exhausted.

```python
iterator = iter([10])
assert next(iterator) == 10
assert next(iterator, "done") == "done"
```

Question source: [Interview question bank, Q35][bank]. Answer reference: [Python classes: iterators][classes].

### 29. What are generators? How do `yield` and `return` differ?

A generator function returns a generator iterator when called. `yield` suspends execution and preserves its state. `return` ends it. Laziness helps avoid materializing all output, though retained state still consumes memory.

```python
def running_totals(values):
    total = 0
    for value in values:
        total += value
        yield total

assert list(running_totals([2, 5, 1])) == [2, 7, 8]
assert list(running_totals([])) == []
```

Question source: [WorkonGrid backend interview][workongrid]. Answer reference: [Python classes: generators][classes].

### 30. What is a decorator, and when is it applied?

A decorator receives the defined function and replaces its binding with the returned object. `@decorate` is equivalent to `function = decorate(function)` after definition. A wrapper can add behavior at call time; `functools.wraps` preserves metadata.

```python
from functools import wraps

def uppercase_result(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        return function(*args, **kwargs).upper()
    return wrapper

@uppercase_result
def greet(name):
    return f"Hello {name}"

assert greet("Asha") == "HELLO ASHA"
assert greet.__name__ == "greet"
```

Question source: [WorkonGrid backend interview][workongrid]. Answer references: [Function definitions][compound] and [functools][functools].

## Advanced: inheritance and runtime

### 31. How does multiple inheritance work, and what is MRO?

Python supports multiple base classes. The Method Resolution Order uses C3 linearization to determine attribute lookup across inheritance. Inspect `Class.__mro__` or `Class.mro()`. An inconsistent inheritance ordering raises `TypeError` at class creation.

Question source: [Infosys inheritance question][infosys] and [question bank, Q41][bank]. Answer reference: [Python classes][classes].

### 32. Does `super()` always call the direct parent?

`super()` delegates lookup to the next class in the MRO. Cooperative multiple inheritance needs compatible method signatures and consistent use of `super()`.

```python
class Base:
    def label(self):
        return "base"

class Right(Base):
    def label(self):
        return "right/" + super().label()

class Left(Base):
    def label(self):
        return "left/" + super().label()

class Combined(Left, Right):
    pass

assert Combined().label() == "left/right/base"
```

Question source: [Interview question bank, Q42][bank]. Answer reference: [super()][functions].

### 33. How do encapsulation and abstraction work in Python?

Encapsulation groups state and behavior. `_name` signals a non-public attribute by convention; `__name` triggers name mangling, not access security. Abstraction exposes an interface while hiding details. `ABC` and `@abstractmethod` can require implementations before instantiation.

Question source: [Infosys OOP candidate report][collections-report]. Answer references: [Python classes][classes] and [Abstract base classes][abc].

### 34. What are dunder methods?

Special methods connect objects to language operations. Examples include `__len__` for `len()`, `__iter__` for iteration, and `__add__` for addition. `__str__` serves readable display; `__repr__` serves an informative representation for debugging.

Question source: [Interview question bank, Q36][bank]. Answer reference: [Python data model][model].

### 35. What is the GIL, and does every Python build have it?

In a conventional CPython build, the Global Interpreter Lock permits one thread at a time to execute Python bytecode. I/O and some native extensions release it. Optional free-threaded CPython builds exist from Python 3.13; extensions can re-enable the GIL. Specify the runtime and build before discussing parallelism.

Question source: [Interview question bank, Q63][bank]. Answer references: [Threading and the GIL][threading] and [Free-threaded Python][free-threading].

### 36. When would you choose threads or processes?

Threads share process memory and often suit blocking I/O. Processes generally have separate memory and can parallelize CPU-heavy Python work in a GIL-enabled build. Consider startup, serialization, and communication costs. Shared mutable state needs synchronization; the GIL does not make compound operations safe.

Question source: [Interview question bank, Q64][bank]. Answer references: [threading][threading] and [multiprocessing][multiprocessing].

### 37. How does memory management work? What does `del` do?

CPython uses reference counting plus garbage collection for reference cycles. `del name` removes a binding; other references can keep the object alive. Reclaiming an object does not guarantee that process memory is immediately returned to the operating system. Use context managers for deterministic resource cleanup.

Question source: [Interview question bank, Q48][bank]. Answer references: [Python data model][model] and [Garbage collector][gc].

### 38. What do `async` and `await` do?

`async def` defines a coroutine function. Calling it creates a coroutine object; it must be awaited or scheduled to run. `await` can suspend the coroutine so other tasks can run. Blocking calls still block an event loop; CPU work does not automatically become parallel.

```python
import asyncio

async def double(number):
    await asyncio.sleep(0)
    return number * 2

async def main():
    return await asyncio.gather(double(3), double(5))

assert asyncio.run(main()) == [6, 10]
```

Question source: [Interview question bank, Q65][bank]. Answer reference: [asyncio tasks][asyncio].

## Coding: increasing difficulty

### 39. Print all prime numbers from 1 to N.

For each candidate, test divisors up to its square root. Numbers below 2 are not prime. This implementation takes O(N√N) time as an upper bound and O(p) result space for p primes. For large N, discuss a sieve instead.

```python
from math import isqrt

def primes_up_to(limit):
    return [
        candidate
        for candidate in range(2, limit + 1)
        if all(candidate % divisor for divisor in range(2, isqrt(candidate) + 1))
    ]

assert primes_up_to(1) == []
assert primes_up_to(2) == [2]
assert primes_up_to(10) == [2, 3, 5, 7]
assert primes_up_to(25) == [2, 3, 5, 7, 11, 13, 17, 19, 23]
```

Question source: [Infosys DSE/SP report][dsesp]. API reference: [math.isqrt()][math].

### 40. Find the maximum in every window of size k.

The Fynd report describes a problem similar to sliding-window maximum; the specification here uses fixed-size consecutive windows. Maintain a deque of indices with decreasing values. Remove expired indices from the front and dominated candidates from the back. Each index enters and leaves at most once: O(n) time and O(k) auxiliary space, excluding output.

```python
from collections import deque

def window_maximum(values, k):
    if not 1 <= k <= len(values):
        raise ValueError("k must be between 1 and the input length")
    candidates = deque()
    result = []
    for index, value in enumerate(values):
        while candidates and candidates[0] <= index - k:
            candidates.popleft()
        while candidates and values[candidates[-1]] <= value:
            candidates.pop()
        candidates.append(index)
        if index >= k - 1:
            result.append(values[candidates[0]])
    return result

assert window_maximum([4, 1, 3, 5, 2], 3) == [4, 5, 5]
assert window_maximum([2, 2, 2], 2) == [2, 2]
assert window_maximum([3, 2, 1], 1) == [3, 2, 1]
assert window_maximum([-3, -1, -2], 3) == [-1]
```

Question source: [Fynd Python engineer interview][fynd]. API reference: [collections.deque][deque].

## Interview evidence

Use the links beside each question to trace its selection. Source publication/update dates do not necessarily identify the interview date.

- [Infosys experienced interview (2023)][infosys]: language features, execution, sorting, lambda, functional helpers, classes, inheritance, and initialization.
- [Infosys pool-campus interview (2019 drive)][campus]: list methods, constructors, abstraction, and linear search.
- [Infosys candidate report (October 2026)][collections-report]: comparison of lists, tuples, and dictionaries.
- [Fynd junior Python engineer experience][fynd]: types, copying, identity, and a sliding-window coding problem.
- [Infosys DSE/SP account collection][dsesp]: comprehensions and printing primes, alongside broader CS and project questions.
- [TCS Chennai candidate report][tcs]: exception handling and project-specific Python use.
- [WorkonGrid backend intern experience][workongrid]: decorators, generators, and `yield` versus `return`.
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
[dsesp]: https://www.reddit.com/r/infosys/comments/1w84gm7/interview_experience_dsesp_oncampus_more_than_3/
[tcs]: https://www.reddit.com/r/TCS_India/comments/1sk24in/gave_interview_on_9th_april_tcs_chennai_no_updates/
[workongrid]: https://www.geeksforgeeks.org/interview-experiences/workongrid-interview-experience-for-backend-developer-intern/
[faq]: https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference
[execution]: https://docs.python.org/3/reference/executionmodel.html
[expressions]: https://docs.python.org/3/reference/expressions.html#generator-expressions
[errors]: https://docs.python.org/3/tutorial/errors.html
[functools]: https://docs.python.org/3/library/functools.html
[copy]: https://docs.python.org/3/library/copy.html
[compound]: https://docs.python.org/3/reference/compound_stmts.html#function-definitions
[abc]: https://docs.python.org/3/library/abc.html
[threading]: https://docs.python.org/3/library/threading.html#gil-and-performance-considerations
[free-threading]: https://docs.python.org/3/howto/free-threading-python.html
[multiprocessing]: https://docs.python.org/3/library/multiprocessing.html
[gc]: https://docs.python.org/3/library/gc.html
[asyncio]: https://docs.python.org/3/library/asyncio-task.html
[math]: https://docs.python.org/3/library/math.html#math.isqrt
[deque]: https://docs.python.org/3/library/collections.html#collections.deque
