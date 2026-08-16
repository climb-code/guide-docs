---
title: Common Design Patterns in Java
description: Learn practical Java implementations of the builder, factory, strategy, and observer design patterns.
---

Design patterns are reusable ways to organize code around a recurring problem. They are not rules to apply everywhere; use one when it makes a design clearer, easier to extend, or less error-prone.

---

## Builder: Construct Complex Objects Clearly

Use a builder when an object has many optional values. It avoids long constructor calls where arguments are hard to read.

```java
public class UserProfile {
    private final String name;
    private final String city;
    private final boolean newsletterEnabled;

    private UserProfile(Builder builder) {
        this.name = builder.name;
        this.city = builder.city;
        this.newsletterEnabled = builder.newsletterEnabled;
    }

    public static class Builder {
        private final String name;
        private String city = "Unknown";
        private boolean newsletterEnabled;

        public Builder(String name) {
            this.name = name;
        }

        public Builder city(String city) {
            this.city = city;
            return this;
        }

        public Builder newsletterEnabled(boolean enabled) {
            this.newsletterEnabled = enabled;
            return this;
        }

        public UserProfile build() {
            return new UserProfile(this);
        }
    }
}

UserProfile profile = new UserProfile.Builder("Asha")
        .city("Pune")
        .newsletterEnabled(true)
        .build();
```

The fluent method calls make optional choices visible at the call site.

---

## Factory: Create the Right Implementation

Use a factory when calling code should request a capability without knowing the concrete class it receives.

```java
interface NotificationSender {
    void send(String message);
}

class EmailSender implements NotificationSender {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsSender implements NotificationSender {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class NotificationFactory {
    static NotificationSender create(String channel) {
        return switch (channel.toLowerCase()) {
            case "email" -> new EmailSender();
            case "sms" -> new SmsSender();
            default -> throw new IllegalArgumentException("Unknown channel: " + channel);
        };
    }
}

NotificationSender sender = NotificationFactory.create("email");
sender.send("Your report is ready");
```

Adding a new sender keeps the creation decision in one place.

---

## Strategy: Swap an Algorithm

The strategy pattern represents an interchangeable behavior with an interface. It removes large `if` or `switch` blocks from the code that uses the behavior.

```java
interface DiscountStrategy {
    double apply(double total);
}

class RegularDiscount implements DiscountStrategy {
    public double apply(double total) {
        return total;
    }
}

class FestivalDiscount implements DiscountStrategy {
    public double apply(double total) {
        return total * 0.80;
    }
}

class Checkout {
    private final DiscountStrategy discount;

    Checkout(DiscountStrategy discount) {
        this.discount = discount;
    }

    double finalPrice(double total) {
        return discount.apply(total);
    }
}

Checkout checkout = new Checkout(new FestivalDiscount());
System.out.println(checkout.finalPrice(1_000)); // 800.0
```

Lambdas work well for small strategies: `new Checkout(total -> total * 0.90)`.

---

## Observer: Notify Interested Code

Use observers when one event should notify several independent listeners. Java's `Consumer` interface keeps a simple observer implementation concise.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

class Order {
    private final List<Consumer<String>> listeners = new ArrayList<>();

    void onStatusChange(Consumer<String> listener) {
        listeners.add(listener);
    }

    void markShipped() {
        listeners.forEach(listener -> listener.accept("SHIPPED"));
    }
}

Order order = new Order();
order.onStatusChange(status -> System.out.println("Email: " + status));
order.onStatusChange(status -> System.out.println("Analytics: " + status));
order.markShipped();
```

In a concurrent application, use a thread-safe listener collection or define which thread is allowed to register and notify listeners.

---

## Select Patterns Carefully

| Pattern | Use it when | Avoid it when |
| --- | --- | --- |
| Builder | Object creation has many optional settings. | A constructor with two or three obvious arguments is enough. |
| Factory | The implementation depends on configuration or input. | Callers can directly instantiate one clear class. |
| Strategy | A behavior varies independently from its caller. | There is only one stable algorithm. |
| Observer | Several components react to one event. | Direct, ordered control flow is required. |

Start with straightforward code. Introduce a pattern when a concrete source of complexity appears, not merely because the pattern is available.

### Next Steps ➡️

Review **Interfaces** and **Lambda Expressions**—they are the language features used by many Java pattern implementations.
