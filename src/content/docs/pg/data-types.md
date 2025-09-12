---
title: "PostgreSQL Data Types"
description: "A simple guide to PostgreSQL data types with examples."
---

PostgreSQL supports many data types to store different kinds of values.  
This guide explains the most commonly used ones in **simple language**, grouped by category.

---

## 🔢 Numeric Types

| Data Type                       | Example             | Description                                  |
| ------------------------------- | ------------------- | -------------------------------------------- |
| `SMALLINT`                      | 32767               | Small numbers (–32,768 to 32,767)            |
| `INTEGER` / `INT`               | 2147483647          | Regular whole numbers (–2B to 2B)            |
| `BIGINT`                        | 9223372036854775807 | Very large whole numbers                     |
| `DECIMAL(p,s)` / `NUMERIC(p,s)` | 123.45              | Exact precision numbers (good for money)     |
| `REAL`                          | 3.14                | Floating-point (approx, 6 digits precision)  |
| `DOUBLE PRECISION`              | 3.14159265359       | Floating-point (approx, 15 digits precision) |
| `SERIAL` / `BIGSERIAL`          | Auto 1, 2, 3…       | Auto-increment numbers                       |

---

## 📝 Character Types

PostgreSQL has several ways to store character (string) data:

| Data Type                             | Example                  | Description                                                                |
| ------------------------------------- | ------------------------ | -------------------------------------------------------------------------- |
| `CHAR(n)` / `CHARACTER(n)`            | `'A'`                    | Fixed length. Pads with spaces if shorter.                                 |
| `VARCHAR(n)` / `CHARACTER VARYING(n)` | `'Hello'`                | Variable length with a limit (`n`).                                        |
| `TEXT`                                | `'This is a long text…'` | Unlimited length. Most flexible.                                           |
| `NAME`                                | `'user_name'`            | Special type for identifiers. Max 63 characters (internal PostgreSQL use). |
| `BPCHAR`                              | `'X'`                    | Internal representation of `CHAR(n)`. Not usually used directly.           |
| `CITEXT` (extension)                  | `'Hello' = 'hello'`      | Case-insensitive text (requires `citext` extension).                       |

✅ **Tips**:

- Use `TEXT` for general-purpose strings.
- Use `VARCHAR(n)` only if you need to enforce a length limit.
- `CHAR(n)` is rarely recommended because it adds trailing spaces.
- `CITEXT` is great when you need **case-insensitive** comparisons.

---

## 📅 Date & Time Types

| Data Type     | Example                       | Description             |
| ------------- | ----------------------------- | ----------------------- |
| `DATE`        | `'2025-09-12'`                | Calendar date           |
| `TIME`        | `'14:30:00'`                  | Time of day             |
| `TIMESTAMP`   | `'2025-09-12 14:30:00'`       | Date + Time             |
| `TIMESTAMPTZ` | `'2025-09-12 14:30:00+05:30'` | Timestamp with timezone |
| `INTERVAL`    | `2 days 3 hours`              | Time span               |

---

## ✅ Boolean Type

| Data Type | Example                 | Description   |
| --------- | ----------------------- | ------------- |
| `BOOLEAN` | `TRUE`, `FALSE`, `NULL` | Yes/No values |

---

## 🎯 UUID

| Data Type | Example                                | Description                   |
| --------- | -------------------------------------- | ----------------------------- |
| `UUID`    | `550e8400-e29b-41d4-a716-446655440000` | Universally unique identifier |

---

## 🗂️ Arrays

| Data Type   | Example         | Description      |
| ----------- | --------------- | ---------------- |
| `INTEGER[]` | `{1,2,3}`       | Array of numbers |
| `TEXT[]`    | `{'a','b','c'}` | Array of text    |

---

## 🌍 JSON & JSONB

| Data Type | Example                | Description                      |
| --------- | ---------------------- | -------------------------------- |
| `JSON`    | `'{"name":"Saurabh"}'` | Text-based JSON                  |
| `JSONB`   | `'{"name":"Saurabh"}'` | Binary JSON (faster for queries) |

---

## 💰 Money Type

| Data Type | Example   | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| `MONEY`   | `$100.00` | Currency values (not recommended for high precision) |

---

## 📌 Special Types

| Data Type                 | Example                          | Description                |
| ------------------------- | -------------------------------- | -------------------------- |
| `BYTEA`                   | `\xDEADBEEF`                     | Binary data (e.g. files)   |
| `ENUM`                    | `'small'`, `'medium'`, `'large'` | Custom fixed set of values |
| `CIDR`, `INET`, `MACADDR` | `'192.168.0.1'`                  | Network addresses          |

---

## 🚀 Quick Tips

- Use `SERIAL` / `BIGSERIAL` for auto-increment IDs
- Prefer `TEXT` over `VARCHAR` unless you need length checks
- Use `NUMERIC` for money calculations (to avoid floating errors)
- Use `JSONB` instead of `JSON` for faster queries
- For case-insensitive strings → use `CITEXT` (extension)

---

## ✅ Example Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  profile JSONB
);
```

