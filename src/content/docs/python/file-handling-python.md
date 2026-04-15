---
title: File Handling in Python
description: Learn how to read from and write to files in Python using built-in functions.
---

File handling is an important part of any web or desktop application. Python has several functions for creating, reading, updating, and deleting files.

---

## The `open()` Function

The key function for working with files in Python is the `open()` function. It takes two parameters: **filename** and **mode**.

```python
f = open("demofile.txt", "r")
```

### File Modes

- `"r"` - **Read**: Default value. Opens a file for reading, error if the file does not exist.
- `"a"` - **Append**: Opens a file for appending, creates the file if it does not exist.
- `"w"` - **Write**: Opens a file for writing, creates the file if it does not exist.
- `"x"` - **Create**: Creates the specified file, returns an error if the file exists.
- `"t"` - **Text**: Default value. Text mode.
- `"b"` - **Binary**: Binary mode (e.g. images).

---

## Reading a File

To read the content of a file, we use the `read()` method.

```python
f = open("demofile.txt", "r")
print(f.read())
f.close()
```

### Reading Parts of the File

- `read(5)`: Returns the first 5 characters.
- `readline()`: Returns one line.
- `readlines()`: Returns a list containing each line in the file.

---

## Closing Files

It is good practice to always close the file when you are done with it.

```python
f = open("demofile.txt", "r")
# perform operations
f.close()
```

---

## The `with` Statement (Recommended)

The recommended way to handle files is using the `with` statement. It automatically closes the file for you, even if an exception is raised.

```python
with open("demofile.txt", "r") as f:
    content = f.read()
    print(content)
# File is automatically closed here
```

---

## Writing to a File

To write to an existing file, you must add a parameter to the `open()` function:
- `"a"`: Append - will append to the end of the file.
- `"w"`: Write - will overwrite any existing content.

```python
with open("demofile.txt", "a") as f:
    f.write("Now the file has more content!")
```

---

## Deleting a File

To delete a file, you must import the `os` module and use its `os.remove()` function.

```python
import os

if os.path.exists("demofile.txt"):
    os.remove("demofile.txt")
else:
    print("The file does not exist")
```
