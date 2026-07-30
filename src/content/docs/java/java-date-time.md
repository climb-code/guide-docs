---
title: Date and Time API in Java
description: Learn the modern java.time API with LocalDate, LocalTime, LocalDateTime, Instant, Duration, Period, ZonedDateTime and DateTimeFormatter.
---

Java 8 introduced the **java.time** package for working with dates and times. It replaced the older `Date` and `Calendar` classes, which were mutable and hard to use correctly.

Every type in `java.time` is immutable. Any method that looks like it changes a value actually returns a new object.

```java
import java.time.LocalDate;

LocalDate today = LocalDate.now();

System.out.println(today); // 2026-07-30
```

---

## LocalDate

`LocalDate` stores a date without a time or a time zone, such as a birthday or a due date.

```java
import java.time.LocalDate;
import java.time.Month;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate launchDay = LocalDate.of(2026, 3, 15);
        LocalDate readable = LocalDate.of(2026, Month.MARCH, 15);

        System.out.println(today);      // 2026-07-30
        System.out.println(launchDay);  // 2026-03-15
        System.out.println(readable);   // 2026-03-15
    }
}
```

Read individual parts of a date with getter methods.

```java
LocalDate date = LocalDate.of(2026, 3, 15);

System.out.println(date.getYear());       // 2026
System.out.println(date.getMonth());      // MARCH
System.out.println(date.getMonthValue()); // 3
System.out.println(date.getDayOfMonth()); // 15
System.out.println(date.getDayOfWeek());  // SUNDAY
```

Note that `getMonthValue()` returns 3 for March. Unlike the old `Calendar` class, months are not zero based.

---

## LocalTime and LocalDateTime

`LocalTime` stores a time of day without a date, such as a shop opening time.

```java
import java.time.LocalTime;

LocalTime openingTime = LocalTime.of(9, 30);
LocalTime withSeconds = LocalTime.of(9, 30, 45);

System.out.println(openingTime); // 09:30
System.out.println(withSeconds); // 09:30:45
```

`LocalDateTime` combines both a date and a time.

```java
import java.time.LocalDateTime;

LocalDateTime meeting = LocalDateTime.of(2026, 3, 15, 14, 0);

System.out.println(meeting); // 2026-03-15T14:00
```

A `LocalDateTime` still has no time zone. It represents a date and time as shown on a wall clock.

---

## Modifying Dates and Times

Because these types are immutable, methods such as `plusDays()` return a new value and leave the original unchanged.

```java
LocalDate today = LocalDate.of(2026, 3, 15);

LocalDate nextWeek = today.plusWeeks(1);
LocalDate lastMonth = today.minusMonths(1);
LocalDate nextYear = today.plusYears(1);

System.out.println(today);      // 2026-03-15
System.out.println(nextWeek);   // 2026-03-22
System.out.println(lastMonth);  // 2026-02-15
System.out.println(nextYear);   // 2027-03-15
```

Assign the result, otherwise the change is lost.

```java
LocalDate date = LocalDate.of(2026, 3, 15);

date.plusDays(10);             // result is discarded
System.out.println(date);      // 2026-03-15

date = date.plusDays(10);      // result is kept
System.out.println(date);      // 2026-03-25
```

The `with` methods replace one field of a date.

```java
LocalDate date = LocalDate.of(2026, 3, 15);

System.out.println(date.withYear(2030));      // 2030-03-15
System.out.println(date.withDayOfMonth(1));   // 2026-03-01
```

---

## Comparing Dates

Use `isBefore()`, `isAfter()` and `isEqual()` to compare values.

```java
LocalDate dueDate = LocalDate.of(2026, 3, 15);
LocalDate today = LocalDate.of(2026, 3, 20);

System.out.println(today.isAfter(dueDate));   // true
System.out.println(today.isBefore(dueDate));  // false
System.out.println(today.isEqual(dueDate));   // false
```

A small example that checks whether a payment is late.

```java
public class PaymentService {
    static boolean isOverdue(LocalDate dueDate) {
        return LocalDate.now().isAfter(dueDate);
    }
}
```

---

## Period and Duration

`Period` measures an amount of time in years, months and days.

```java
import java.time.Period;

LocalDate birthday = LocalDate.of(1997, 6, 12);
LocalDate today = LocalDate.of(2026, 7, 30);

Period age = Period.between(birthday, today);

System.out.println(age.getYears());  // 29
System.out.println(age.getMonths()); // 1
System.out.println(age.getDays());   // 18
```

`Duration` measures an amount of time in hours, minutes and seconds.

```java
import java.time.Duration;
import java.time.LocalTime;

LocalTime start = LocalTime.of(9, 30);
LocalTime end = LocalTime.of(17, 0);

Duration shift = Duration.between(start, end);

System.out.println(shift.toHours());    // 7
System.out.println(shift.toMinutes());  // 450
```

Use `Period` with dates and `Duration` with times.

---

## Instant and Time Zones

`Instant` represents a point on the timeline in UTC. It is the right type for timestamps, such as when a record was created.

```java
import java.time.Instant;

Instant now = Instant.now();

System.out.println(now); // 2026-07-30T09:15:30.123456Z
```

`ZonedDateTime` is a date and time with a time zone, which is needed when the same moment must be shown in different regions.

```java
import java.time.ZoneId;
import java.time.ZonedDateTime;

ZonedDateTime india = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
ZonedDateTime newYork = india.withZoneSameInstant(ZoneId.of("America/New_York"));

System.out.println(india);   // 2026-07-30T14:45:30+05:30[Asia/Kolkata]
System.out.println(newYork); // 2026-07-30T05:15:30-04:00[America/New_York]
```

`withZoneSameInstant()` keeps the same moment in time and changes only the zone used to display it.

---

## Formatting and Parsing

`DateTimeFormatter` converts between text and date objects.

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

LocalDate date = LocalDate.of(2026, 3, 15);

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

String formatted = date.format(formatter);

System.out.println(formatted); // 15/03/2026
```

Parsing turns text back into a date.

```java
LocalDate parsed = LocalDate.parse("15/03/2026", formatter);

System.out.println(parsed); // 2026-03-15
```

`parse()` without a formatter expects the ISO format `yyyy-MM-dd`.

```java
LocalDate isoDate = LocalDate.parse("2026-03-15");
```

Invalid text throws `DateTimeParseException`.

Common pattern letters:

| Pattern | Meaning        | Example |
| ------- | -------------- | ------- |
| `yyyy`  | Four digit year | 2026    |
| `MM`    | Month number    | 03      |
| `MMM`   | Short month name | Mar    |
| `dd`    | Day of month    | 15      |
| `HH`    | Hour, 24 hour   | 14      |
| `mm`    | Minutes         | 30      |
| `ss`    | Seconds         | 45      |

---

## A Practical Example

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class SubscriptionService {
    private static final DateTimeFormatter DISPLAY =
            DateTimeFormatter.ofPattern("dd MMM yyyy");

    static LocalDate renewalDate(LocalDate startDate) {
        return startDate.plusMonths(1);
    }

    static long daysLeft(LocalDate renewalDate) {
        return ChronoUnit.DAYS.between(LocalDate.now(), renewalDate);
    }

    public static void main(String[] args) {
        LocalDate start = LocalDate.of(2026, 7, 20);
        LocalDate renewal = renewalDate(start);

        System.out.println(renewal.format(DISPLAY)); // 20 Aug 2026
    }
}
```

---

## Choosing the Right Type

| Type            | Use it for                              |
| --------------- | --------------------------------------- |
| `LocalDate`     | A date only, such as a birthday          |
| `LocalTime`     | A time only, such as opening hours       |
| `LocalDateTime` | A date and time without a zone           |
| `ZonedDateTime` | A date and time in a specific zone       |
| `Instant`       | A machine timestamp in UTC               |
| `Period`        | A gap between dates in years and days    |
| `Duration`      | A gap between times in hours and seconds |

Prefer these classes over the older `java.util.Date` and `Calendar`, which are mutable and not thread safe.
