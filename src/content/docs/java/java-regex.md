---
title: Regular Expressions in Java
description: Learn how to use regular expressions in Java with Pattern and Matcher, including metacharacters, quantifiers, groups, validation, and replacement.
---

A **regular expression** (regex) is a pattern used to search, match, and replace text. Java provides regex support through the `java.util.regex` package, mainly with the `Pattern` and `Matcher` classes.

---

## Why Regular Expressions?

Regular expressions are useful when you need to:

1. Validate input such as email, phone number, or PIN code
2. Search for text that follows a pattern
3. Split a string using a flexible separator
4. Replace parts of text that match a rule

---

## Quick Regex with String Methods

The `String` class already supports simple regex operations.

```java
public class Main {
    public static void main(String[] args) {
        String text = "Java is fun";

        System.out.println(text.matches("Java.*"));
        System.out.println(text.replaceAll("\\s+", "-"));

        String[] parts = "one,two,,three".split(",");
        System.out.println(parts.length);
    }
}
```

`matches()` checks the **entire** string, not just a part of it.

---

## Pattern and Matcher

For repeated use or more control, compile the pattern once.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher("Java is easy and java is powerful");

        while (matcher.find()) {
            System.out.println(matcher.group() + " at index " + matcher.start());
        }
    }
}
```

| Method | Meaning |
|---|---|
| `matches()` | Whole string must match the pattern |
| `find()` | Finds the next matching part |
| `group()` | Returns the matched text |
| `start()` / `end()` | Index positions of the match |

---

## Common Metacharacters

| Pattern | Matches |
|---|---|
| `.` | Any single character |
| `\d` | A digit `0-9` |
| `\D` | A non-digit |
| `\w` | Letter, digit, or underscore |
| `\W` | Any non-word character |
| `\s` | Whitespace |
| `\S` | Non-whitespace |
| `^` | Start of the text |
| `$` | End of the text |

In Java code, a backslash must be written twice, so `\d` becomes `"\\d"`.

---

## Quantifiers

| Pattern | Meaning |
|---|---|
| `*` | Zero or more times |
| `+` | One or more times |
| `?` | Zero or one time |
| `{n}` | Exactly n times |
| `{n,}` | n or more times |
| `{n,m}` | Between n and m times |

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("411001".matches("\\d{6}"));
        System.out.println("41100".matches("\\d{6}"));
    }
}
```

---

## Character Classes

Square brackets define a set of allowed characters.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("cat".matches("[cbr]at"));
        System.out.println("B".matches("[A-Z]"));
        System.out.println("7".matches("[^0-5]"));
    }
}
```

- `[abc]` - a, b, or c
- `[a-z]` - any lowercase letter
- `[^abc]` - any character except a, b, or c

---

## Validating Input

A common use of regex is validation.

```java
public class Validator {
    public static boolean isValidEmail(String email) {
        return email.matches("^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$");
    }

    public static boolean isValidMobile(String mobile) {
        return mobile.matches("^[6-9]\\d{9}$");
    }

    public static void main(String[] args) {
        System.out.println(isValidEmail("test@example.com"));
        System.out.println(isValidEmail("test@example"));
        System.out.println(isValidMobile("9876543210"));
        System.out.println(isValidMobile("1234567890"));
    }
}
```

Keep validation patterns simple and readable. Very strict patterns often reject valid real-world input.

---

## Groups

Parentheses create groups so you can extract parts of a match.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(\\d{2})-(\\d{2})-(\\d{4})");
        Matcher matcher = pattern.matcher("Date of joining: 15-08-2024");

        if (matcher.find()) {
            System.out.println("Day: " + matcher.group(1));
            System.out.println("Month: " + matcher.group(2));
            System.out.println("Year: " + matcher.group(3));
        }
    }
}
```

`group(0)` always returns the complete match.

---

## Named Groups

Names make patterns easier to read.

```java
Pattern pattern = Pattern.compile("(?<day>\\d{2})-(?<month>\\d{2})-(?<year>\\d{4})");
Matcher matcher = pattern.matcher("15-08-2024");

if (matcher.matches()) {
    System.out.println(matcher.group("year"));
}
```

---

## Replacing Text

```java
public class Main {
    public static void main(String[] args) {
        String text = "Order 101, Order 102, Order 103";

        System.out.println(text.replaceAll("\\d+", "#"));
        System.out.println(text.replaceFirst("\\d+", "#"));
    }
}
```

You can also reuse groups in the replacement using `$1`, `$2`, and so on.

```java
String date = "15-08-2024";
System.out.println(date.replaceAll("(\\d{2})-(\\d{2})-(\\d{4})", "$3/$2/$1"));
```

---

## Splitting Text

```java
public class Main {
    public static void main(String[] args) {
        String data = "apple, banana ,  cherry";
        String[] fruits = data.split("\\s*,\\s*");

        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}
```

---

## Useful Flags

| Flag | Meaning |
|---|---|
| `Pattern.CASE_INSENSITIVE` | Ignores letter case |
| `Pattern.MULTILINE` | `^` and `$` match each line |
| `Pattern.DOTALL` | `.` also matches newline |

```java
Pattern pattern = Pattern.compile("^error", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
```

---

## Best Practices

1. Compile a `Pattern` once and reuse it instead of calling `matches()` in a loop.
2. Store patterns in `static final` fields when they are used often.
3. Add comments for complex patterns, because regex is hard to read later.
4. Prefer simple string methods like `contains()` or `startsWith()` when regex is not needed.
5. Test patterns with both valid and invalid input.

---

## Quick Summary

| Concept | Meaning |
|---|---|
| `Pattern` | Compiled regular expression |
| `Matcher` | Applies a pattern to a text |
| `matches()` | Whole string must match |
| `find()` | Searches for the next match |
| Groups | Extract parts of a match |
| `replaceAll()` | Replaces every match |

---

### Next Steps

After regular expressions, continue with the **Date and Time API** to learn how modern Java handles dates, times, and formatting.
