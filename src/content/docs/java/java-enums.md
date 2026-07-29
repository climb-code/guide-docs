---
title: Enums in Java
description: Learn how Java enums define fixed sets of constants, add fields and methods, work with values and valueOf, and use enums in switch statements.
---

An **enum** is a special Java type for a fixed set of related constants. Use an enum when a value should be one of a known, limited set of choices.

For example, the days of the week are a fixed set of values.

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
    FRIDAY, SATURDAY, SUNDAY
}
```

---

## Why Use Enums?

Enums make code clearer and safer than using strings or numbers for fixed choices.

```java
String status = "ACTIVE";
```

The string can contain a typo or an unexpected value. An enum restricts the value to valid choices.

```java
enum Status {
    ACTIVE, INACTIVE, SUSPENDED
}

Status status = Status.ACTIVE;
```

---

## Using Enum Values

Refer to an enum value with the enum type followed by a dot.

```java
enum Size {
    SMALL, MEDIUM, LARGE
}

public class Main {
    public static void main(String[] args) {
        Size selectedSize = Size.MEDIUM;

        System.out.println(selectedSize); // MEDIUM
    }
}
```

---

## values() and valueOf()

Every enum provides useful built-in methods.

`values()` returns all constants in declaration order.

```java
for (Size size : Size.values()) {
    System.out.println(size);
}
```

`valueOf()` converts the exact name of a constant into an enum value.

```java
Size size = Size.valueOf("LARGE");

System.out.println(size); // LARGE
```

If the name does not match a constant, `valueOf()` throws `IllegalArgumentException`.

---

## Enums with switch

Enums work naturally with `switch` statements.

```java
enum OrderStatus {
    NEW, PAID, SHIPPED, DELIVERED
}

OrderStatus status = OrderStatus.SHIPPED;

switch (status) {
    case NEW:
        System.out.println("Order created");
        break;
    case PAID:
        System.out.println("Payment received");
        break;
    case SHIPPED:
        System.out.println("Order is on the way");
        break;
    case DELIVERED:
        System.out.println("Order delivered");
        break;
}
```

---

## Enums Can Have Fields and Methods

An enum can contain fields, constructors, and methods. This is useful when each constant needs extra data.

```java
enum Plan {
    FREE(0),
    BASIC(299),
    PREMIUM(799);

    private final int monthlyPrice;

    Plan(int monthlyPrice) {
        this.monthlyPrice = monthlyPrice;
    }

    int getMonthlyPrice() {
        return monthlyPrice;
    }
}

public class Main {
    public static void main(String[] args) {
        Plan plan = Plan.BASIC;

        System.out.println(plan.getMonthlyPrice()); // 299
    }
}
```

Enum constructors are implicitly private. You cannot create enum values with `new`.

---

## Comparing Enums

Compare enum values with `==`.

```java
Status currentStatus = Status.ACTIVE;

if (currentStatus == Status.ACTIVE) {
    System.out.println("Account is active");
}
```

`==` is safe because each enum constant is a single shared object.

---

## A Practical Example

```java
enum AccessLevel {
    GUEST, MEMBER, ADMIN
}

public class AccessService {
    static boolean canDeleteUsers(AccessLevel level) {
        return level == AccessLevel.ADMIN;
    }

    public static void main(String[] args) {
        AccessLevel userLevel = AccessLevel.MEMBER;

        System.out.println(canDeleteUsers(userLevel)); // false
    }
}
```

The method accepts only a valid access level, so invalid strings such as `"ADMNI"` cannot slip into the program.

---

## When to Use Enums

Enums are a good fit for:

- Status values, such as pending or completed
- User roles and access levels
- Days, months, directions, and sizes
- Fixed application settings or categories
- Options used in `switch` statements

Use a regular class when the set of possible values is created dynamically at runtime.
