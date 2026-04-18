---
title: Date and Time in Python
description: Learn how to work with dates and times in Python using the built-in datetime module.
---

Working with dates and times is a common task in programming. Python's built-in `datetime` module provides classes for manipulating dates and times.

---

## The `datetime` Module

To use dates, you must first import the `datetime` module.

```python
import datetime

# Get current date and time
x = datetime.datetime.now()
print(x) # Output: e.g., 2026-04-19 12:30:45.123456
```

---

## Creating Date Objects

You can create a date object by passing the year, month, and day to the `datetime.datetime()` class.

```python
import datetime

x = datetime.datetime(2026, 4, 17)
print(x) # Output: 2026-04-17 00:00:00
```

---

## Formatting Dates (`strftime`)

The `strftime()` method (string format time) allows you to format date objects into readable strings. It uses format codes like `%Y` (Year), `%m` (Month), `%d` (Day), etc.

```python
import datetime

x = datetime.datetime.now()

print(x.strftime("%B")) # Output: e.g., 'April' (Full month name)
print(x.strftime("%Y")) # Output: e.g., '2026' (Full year)
print(x.strftime("%d-%m-%Y")) # Output: e.g., '19-04-2026'
```

---

## Parsing Dates (`strptime`)

If you have a date in string format, you can convert it into a `datetime` object using `strptime()` (string parse time).

```python
import datetime

date_string = "17 April, 2026"
date_object = datetime.datetime.strptime(date_string, "%d %B, %Y")

print(date_object) # Output: 2026-04-17 00:00:00
```

---

## Common Format Codes

| Code | Description | Example |
| :--- | :--- | :--- |
| `%a` | Weekday, short version | Wed |
| `%A` | Weekday, full version | Wednesday |
| `%w` | Weekday as a number 0-6 | 3 |
| `%d` | Day of month 01-31 | 17 |
| `%b` | Month name, short version | Apr |
| `%B` | Month name, full version | April |
| `%m` | Month as a number 01-12 | 04 |
| `%Y` | Year, full version | 2026 |
| `%H` | Hour 00-23 | 17 |
| `%M` | Minute 00-59 | 45 |
| `%S` | Second 00-59 | 08 |

---

## Practical Use: Backdating

In version control systems like Git, you can use these concepts to understand how commit dates are structured. While Git handles this automatically, understanding the underlying date formats helps when debugging history or generating reports.
