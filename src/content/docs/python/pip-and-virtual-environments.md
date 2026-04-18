---
title: Pip and Virtual Environments
description: Learn how to manage Python packages using pip and isolate project dependencies with virtual environments.
---

Managing external libraries and keeping project dependencies isolated is crucial for stable Python development.

---

## What is Pip?

**Pip** is the standard package manager for Python. It allows you to install and manage additional libraries and dependencies that are not part of the Python standard library.

### Basic Commands

- **Install a package**:
  ```bash
  pip install camelcase
  ```
- **Uninstall a package**:
  ```bash
  pip uninstall camelcase
  ```
- **List installed packages**:
  ```bash
  pip list
  ```

---

## Virtual Environments

A **Virtual Environment** is a self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.

Using a virtual environment prevents version conflicts between different projects.

### Creating a Virtual Environment

Python comes with a built-in module called `venv` to create virtual environments.

```bash
# Windows
python -m venv myenv

# macOS / Linux
python3 -m venv myenv
```

### Activating the Environment

Once created, you must "activate" it to start using its isolated Python and Pip.

- **Windows**:
  ```bash
  myenv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  source myenv/bin/activate
  ```

After activation, your terminal prompt will usually show the name of the environment in parentheses.

### Deactivating

To stop using the virtual environment, simply run:
```bash
deactivate
```

---

## Using `requirements.txt`

It is common practice to list all project dependencies in a file named `requirements.txt`.

- **Generate the file**:
  ```bash
  pip freeze > requirements.txt
  ```
- **Install from the file**:
  ```bash
  pip install -r requirements.txt
  ```
