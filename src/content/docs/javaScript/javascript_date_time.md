---
title : "JavaScript Date & Time: In-Depth Guide"
description: "Mastering date and time in JavaScript is essential for handling user input, timestamps, scheduling, logging, and more. This guide covers native JavaScript Date object, formatting, manipulation, parsing, and popular libraries."
---

## 📅 Introduction

Mastering date and time in JavaScript is essential for handling user input, timestamps, scheduling, logging, and more. This guide covers native JavaScript `Date` object, formatting, manipulation, parsing, and popular libraries.

## ⚡ Creating Dates

```js
// Current date/time
const now = new Date();

// Specific date (YYYY-MM-DDTHH:MM:SSZ)
const date1 = new Date("2025-07-26T13:00:00Z");

// Year, month (0-indexed), day, hour, minute, second
const date2 = new Date(2025, 6, 26, 13, 0, 0);

// From timestamp
const timestamp = Date.now(); // ms since 1970
const date3 = new Date(timestamp);
```

## 🔄 Date Components (Get/Set)

```js
const d = new Date();

// Getters
d.getFullYear(); // 2025
d.getMonth(); // 0-11
d.getDate(); // 1-31
d.getDay(); // 0 (Sun) to 6 (Sat)
d.getHours(), d.getMinutes(), d.getSeconds();
d.getTime(); // timestamp in ms

// Setters
d.setFullYear(2030);
d.setMonth(11);
d.setDate(31);
d.setHours(23, 59, 59);
```

## 📝 Date Formats

```js
new Date().toString();      // Full local string
new Date().toISOString();   // ISO format
new Date().toUTCString();   // UTC time
new Date().toDateString();  // "Sat Jul 26 2025"
new Date().toLocaleDateString(); // Based on locale
```

## 📥 Parsing Dates

```js
Date.parse("2025-07-26"); // returns timestamp
new Date("July 26, 2025 13:00"); // OK
new Date("07/26/2025"); // may vary by browser (avoid this!)
```

✅ **Best Practice**: Prefer ISO format (`YYYY-MM-DD`)

## ⚖️ Date Math (Add/Subtract)

```js
const now = new Date();

// Add 5 days
const future = new Date(now);
future.setDate(now.getDate() + 5);

// Subtract 2 hours
const past = new Date(now);
past.setHours(now.getHours() - 2);

// Milliseconds difference
const diff = future - now; // in ms
const diffDays = diff / (1000 * 60 * 60 * 24);
```

## 🔍 Comparing Dates

```js
const a = new Date("2025-01-01");
const b = new Date("2025-12-31");

console.log(a < b); // true
console.log(a.getTime() === b.getTime()); // false
```

## 🌍 Working with Timezones

JavaScript `Date` objects are timezone-aware (local time) but store internally in UTC.

```js
new Date().getTimezoneOffset(); // Difference in minutes from UTC
```

Use `toLocaleString()` for timezone conversions:

```js
new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
```

## 📋 Date Formatting Options

```js
const now = new Date();
now.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
```

## 🌐 Internationalization (`Intl`)

Use `Intl.DateTimeFormat` for powerful formatting:

```js
const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "short",
});
formatter.format(new Date());
```

## 🛠️ Using Libraries

### 1. **date-fns**

```bash
npm install date-fns
```

```js
import { format, addDays, parseISO } from "date-fns";

format(new Date(), "yyyy-MM-dd"); // 2025-07-26
addDays(new Date(), 5);
```

### 2. **dayjs**

```bash
npm install dayjs
```

```js
import dayjs from "dayjs";

dayjs().add(1, 'week').format("YYYY-MM-DD");
```

### 3. **luxon** (for timezone and locale handling)

```js
import { DateTime } from "luxon";

DateTime.now().setZone("Asia/Kolkata").toLocaleString(DateTime.DATETIME_MED);
```

## ⚠️ Common Pitfalls

* `Month` is **0-indexed** (January is 0)
* `Date.parse()` can behave inconsistently across browsers
* Avoid relying on locale-specific formats (`MM/DD/YYYY`)
* Timezone differences can cause unexpected date shifts

## ✅ Best Practices

* Use **ISO format** for storage and comparison
* Use `toLocaleString()` or `Intl.DateTimeFormat` for UI
* Prefer libraries like `date-fns` or `dayjs` for manipulation
* Convert all times to UTC for consistent backend storage
* Validate user input dates properly before parsing

## 📚 Resources

* [MDN Web Docs - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [date-fns Docs](https://date-fns.org/)
* [Day.js Docs](https://day.js.org/)
* [Luxon Docs](https://moment.github.io/luxon/)

## 💻 Example Playground

```js
const event = new Date("2025-12-31T23:59:59");
console.log("Event Date:", event.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
```

> **Tip**: When in doubt, always log `date.toISOString()` to debug what the actual UTC time is.

