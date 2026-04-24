---
title: JSON in Python
description: Learn how to parse JSON and convert Python objects to JSON strings using the built-in json module.
---

JSON (JavaScript Object Notation) is a popular data format used for representing structured data. It is common to transmit and receive data between a server and a web application in JSON format.

---

## The `json` Module

Python has a built-in package called `json`, which can be used to work with JSON data.

```python
import json
```

---

## Converting JSON to Python

If you have a JSON string, you can parse it by using the `json.loads()` method. The result will be a Python dictionary.

```python
import json

# some JSON:
x =  '{ "name":"John", "age":30, "city":"New York"}'

# parse x:
y = json.loads(x)

# the result is a Python dictionary:
print(y["age"]) # Output: 30
```

---

## Converting Python to JSON

If you have a Python object, you can convert it into a JSON string by using the `json.dumps()` method.

```python
import json

# a Python object (dict):
x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}

# convert into JSON:
y = json.dumps(x)

# the result is a JSON string:
print(y)
```

You can convert Python objects of the following types, into JSON strings:
- `dict`, `list`, `tuple`, `string`, `int`, `float`, `True`, `False`, `None`

---

## Formatting the Result

The example above prints a JSON string, but it is not very easy to read, with no indentations and line breaks.

The `json.dumps()` method has parameters to make it easier to read the result:

```python
import json

x = {
  "name": "John",
  "age": 30,
  "married": True,
  "pets": None,
  "cars": [
    {"model": "BMW 230", "mpg": 27.5},
    {"model": "Ford Edge", "mpg": 24.1}
  ]
}

# use four indents to make it easier to read the result:
print(json.dumps(x, indent=4))
```

You can also define the separators, default value is `(", ", ": ")`, which means using a comma and a space to separate each object, and a colon and a space to separate keys from values:

```python
# use . and a space to separate objects, and a = and a space to separate keys from values:
print(json.dumps(x, indent=4, separators=(". ", " = ")))
```

---

## Working with JSON Files

To read JSON data from a file, use `json.load()`. To write JSON data to a file, use `json.dump()`.

```python
import json

# Writing to a file
data = {"name": "Alice", "age": 25}
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)

# Reading from a file
with open("data.json", "r") as f:
    loaded_data = json.load(f)
    print(loaded_data)
```
