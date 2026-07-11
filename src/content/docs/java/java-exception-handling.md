---
title: Exception Handling in Java
description: Learn about Exception Handling in Java using try, catch, finally, throw, and throws, and the difference between checked and unchecked exceptions.
---

An **exception** is an unexpected event that occurs during the execution of a program and disrupts its normal flow — for example, dividing by zero, accessing an invalid array index, or opening a file that doesn't exist.

**Exception Handling** is the mechanism Java provides to handle these runtime errors gracefully, so the program can recover (or fail with a clear message) instead of crashing abruptly.

---

## Exception Hierarchy

All exceptions and errors inherit from the `Throwable` class:

```
Throwable
├── Error                (serious problems, e.g. OutOfMemoryError - don't handle these)
└── Exception
    ├── IOException          (checked)
    ├── SQLException         (checked)
    └── RuntimeException     (unchecked)
        ├── ArithmeticException
        ├── NullPointerException
        └── ArrayIndexOutOfBoundsException
```

---

## Checked vs Unchecked Exceptions

| Feature | Checked Exception | Unchecked Exception |
|---|---|---|
| Checked at | Compile time | Runtime |
| Parent class | `Exception` (excluding `RuntimeException`) | `RuntimeException` |
| Handling | Must be caught or declared with `throws` | Optional to handle |
| Examples | `IOException`, `SQLException` | `NullPointerException`, `ArithmeticException` |

---

## try-catch Block

Code that might throw an exception goes inside `try`; the handling logic goes inside `catch`.

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // throws ArithmeticException
            System.out.println("This line never runs");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        }
        System.out.println("Program continues normally...");
    }
}
```

Output:

```
Cannot divide by zero: / by zero
Program continues normally...
```

---

## Multiple catch Blocks

A `try` block can have multiple `catch` blocks. The **most specific** exception type must come first.

```java
try {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid array index!");
} catch (Exception e) {
    System.out.println("Something else went wrong!");
}
```

You can also catch multiple types in one block using `|`:

```java
catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
    System.out.println("Math or array error: " + e.getMessage());
}
```

---

## finally Block

The `finally` block **always executes**, whether an exception occurred or not. It is typically used for cleanup, like closing files or database connections.

```java
try {
    int result = 10 / 2;
    System.out.println("Result: " + result);
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("This always runs");
}
```

---

## throw and throws

- **`throw`** — used to explicitly throw an exception from inside a method.
- **`throws`** — used in a method signature to declare that the method might throw an exception.

```java
public class Main {
    // 'throws' declares that this method may throw an exception
    static void checkAge(int age) throws IllegalArgumentException {
        if (age < 18) {
            // 'throw' actually throws the exception
            throw new IllegalArgumentException("Age must be 18 or above");
        }
        System.out.println("Access granted");
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Denied: " + e.getMessage());
        }
    }
}
```

Output:

```
Denied: Age must be 18 or above
```

---

## Custom Exceptions

You can create your own exception by extending `Exception` (checked) or `RuntimeException` (unchecked).

```java
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance = 500;

    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Balance is " + balance + ", cannot withdraw " + amount);
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        try {
            account.withdraw(1000);
        } catch (InsufficientBalanceException e) {
            System.out.println("Transaction failed: " + e.getMessage());
        }
    }
}
```

---

## Best Practices

1. **Catch specific exceptions** instead of a generic `Exception` whenever possible.
2. **Never leave a catch block empty** — at minimum, log the exception.
3. **Use finally (or try-with-resources)** to release resources like files and connections.
4. **Throw early, catch late:** validate input as soon as possible, handle exceptions where you can actually act on them.
5. **Use meaningful messages** when throwing exceptions to make debugging easier.

---

## Key Takeaways

- Exceptions disrupt normal program flow; exception handling lets you recover gracefully.
- `try` wraps risky code, `catch` handles the failure, `finally` always runs.
- Checked exceptions must be handled or declared; unchecked exceptions are optional to handle.
- Use `throw` to raise an exception and `throws` to declare one in a method signature.
- Create custom exceptions for domain-specific error cases.
