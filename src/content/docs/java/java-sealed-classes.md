---
title: Sealed Classes in Java
description: Learn how Java sealed classes control inheritance with permits, final, sealed, and non-sealed subclasses.
---

A **sealed class** restricts which classes can extend it. It is useful when a type has a fixed set of valid variations, such as payment methods, API results, or shapes.

Sealed classes became a standard feature in Java 17.

---

## Why Restrict Inheritance?

A normal class can be extended by any class that has access to it. That flexibility is not always desirable: an unexpected subclass can break the assumptions in your code.

Use a sealed class when the valid subclasses are known and should stay limited.

```java
public sealed class Payment
        permits CardPayment, UpiPayment, CashPayment {
}
```

Only the three listed classes may extend `Payment`.

---

## Rules for Permitted Subclasses

Every direct subclass of a sealed class must declare one of these modifiers:

| Modifier | Meaning |
| --- | --- |
| `final` | Nobody can extend this subclass. |
| `sealed` | Its own subclasses are restricted too. |
| `non-sealed` | It reopens inheritance below this class. |

```java
public final class CardPayment extends Payment {
}

public sealed class UpiPayment extends Payment
        permits PhonePePayment, GooglePayPayment {
}

public non-sealed class CashPayment extends Payment {
}
```

`CardPayment` ends the hierarchy. `UpiPayment` remains controlled, while any class can extend `CashPayment`.

---

## Sealed Interfaces

Interfaces can be sealed as well. This works especially well for modelling a small set of states or events.

```java
public sealed interface LoginResult
        permits LoginSuccess, InvalidPassword, LockedAccount {
}

public record LoginSuccess(String username) implements LoginResult { }

public record InvalidPassword() implements LoginResult { }

public record LockedAccount(int retryAfterMinutes) implements LoginResult { }
```

Records are implicitly `final`, so they naturally fit as implementations of a sealed interface.

---

## `permits` Can Sometimes Be Omitted

When every permitted class is declared in the same source file, Java can infer the list.

```java
sealed interface Notification { }

final class EmailNotification implements Notification { }
final class SmsNotification implements Notification { }
```

For clearer public APIs, explicitly writing `permits` is often easier to read.

---

## Benefits

- Makes a domain model more explicit.
- Prevents unsupported subclasses.
- Lets the compiler help when handling every known case.
- Works well with records and modern `switch` expressions.

Do not use sealed classes simply to make every hierarchy rigid. Prefer them when the set of valid kinds is intentionally finite.

---

### Next Steps ➡️

Continue to **Switch Expressions** to see how a fixed type hierarchy can be handled clearly with modern `switch` syntax.
