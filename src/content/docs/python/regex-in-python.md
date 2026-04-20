---
title: RegEx in Python
description: Learn how to use Regular Expressions in Python using the built-in re module.
---

A Regular Expression (RegEx) is a sequence of characters that forms a search pattern. It can be used to check if a string contains the specified search pattern.

---

## The `re` Module

Python has a built-in package called `re`, which can be used to work with Regular Expressions.

```python
import re

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)

if x:
  print("YES! We have a match!")
else:
  print("No match")
```

---

## RegEx Functions

The `re` module offers a set of functions that allows us to search a string for a match:

- **`findall()`**: Returns a list containing all matches.
- **`search()`**: Returns a Match object if there is a match anywhere in the string.
- **`split()`**: Returns a list where the string has been split at each match.
- **`sub()`**: Replaces one or many matches with a string.

### Example: `findall()`

```python
import re

txt = "The rain in Spain"
x = re.findall("ai", txt)
print(x) # Output: ['ai', 'ai']
```

---

## Metacharacters

Metacharacters are characters with a special meaning:

| Character | Description | Example |
| :--- | :--- | :--- |
| `[]` | A set of characters | `"[a-m]"` |
| `\` | Signals a special sequence | `"\d"` |
| `.` | Any character (except newline character) | `"he..o"` |
| `^` | Starts with | `"^hello"` |
| `$` | Ends with | `"planet$"` |
| `*` | Zero or more occurrences | `"he.*o"` |
| `+` | One or more occurrences | `"he.+o"` |
| `?` | Zero or one occurrences | `"he.?o"` |
| `{}` | Exactly the specified number of occurrences | `"he.{2}o"` |
| `\|` | Either or | `"falls\|stays"` |

---

## Special Sequences

A special sequence is a `\` followed by one of the characters in the list below, and has a special meaning:

| Character | Description | Example |
| :--- | :--- | :--- |
| `\d` | Returns a match where the string contains digits (numbers from 0-9) | `"\d"` |
| `\D` | Returns a match where the string DOES NOT contain digits | `"\D"` |
| `\s` | Returns a match where the string contains a white space character | `"\s"` |
| `\S` | Returns a match where the string DOES NOT contain a white space character | `"\S"` |
| `\w` | Returns a match where the string contains any word characters | `"\w"` |
| `\W` | Returns a match where the string DOES NOT contain any word characters | `"\W"` |

---

## The `sub()` Function

The `sub()` function replaces the matches with the text of your choice:

```python
import re

txt = "The rain in Spain"
# Replace every white-space character with the number 9:
x = re.sub("\s", "9", txt)
print(x) # Output: The9rain9in9Spain
```
