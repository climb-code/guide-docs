---
title: Switch Expressions in Java
description: Learn modern Java switch expressions, arrow labels, yield, multiple case labels, and exhaustive switching.
---

Modern Java `switch` can be used as an **expression**: it evaluates to a value. It also provides arrow labels that avoid accidental fall-through.

Switch expressions became a standard feature in Java 14.

---

## Traditional `switch`

Traditional `switch` statements usually need `break` to prevent one case from continuing into the next.

```java
String dayType;

switch (day) {
    case SATURDAY:
    case SUNDAY:
        dayType = "Weekend";
        break;
    default:
        dayType = "Weekday";
}
```

This works, but assigning a result in every branch can become repetitive.

---

## Arrow-Style Switch Expression

Use `->` and assign the result directly.

```java
String dayType = switch (day) {
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Weekday";
};

System.out.println(dayType);
```

The semicolon after the closing brace ends the assignment. Arrow cases do not fall through, so no `break` is needed.

---

## Multiple Labels

Put labels separated by commas when they share the same result.

```java
int daysInMonth = switch (month) {
    case APRIL, JUNE, SEPTEMBER, NOVEMBER -> 30;
    case FEBRUARY -> 28;
    default -> 31;
};
```

For real calendar code, use `YearMonth.lengthOfMonth()` because February can have 29 days.

---

## Blocks and `yield`

When a case needs more than one statement, use a block and return the expression's value with `yield`.

```java
String shippingMessage = switch (status) {
    case "PAID" -> "Preparing your order";
    case "SHIPPED" -> {
        String trackingUrl = "https://example.com/track";
        yield "Track your package: " + trackingUrl;
    }
    case "DELIVERED" -> "Order delivered";
    default -> "Unknown order status";
};
```

`yield` is specific to a switch expression. It returns a value from that case block.

---

## Exhaustive Cases

A switch expression must produce a result for every possible input. For enums, list every constant or include `default`.

```java
enum TrafficLight { RED, YELLOW, GREEN }

String action = switch (light) {
    case RED -> "Stop";
    case YELLOW -> "Slow down";
    case GREEN -> "Go";
};
```

No `default` is required because all enum constants are covered. If a new constant is added later, the compiler will point out the switch expressions that need updating.

---

## Statement or Expression?

Use a switch **statement** when each case performs actions. Use a switch **expression** when the purpose is to calculate one value.

```java
switch (command) {
    case "start" -> service.start();
    case "stop" -> service.stop();
    default -> System.out.println("Unknown command");
}
```

Prefer the arrow form for new code unless you specifically need the older fall-through behaviour.

---

### Next Steps ➡️

Combine switch expressions with **Sealed Classes** when your application models a known set of types.
