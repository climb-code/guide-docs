---
title: PostgreSQL CASE Expression
description: Learn how to use the CASE expression in PostgreSQL to add conditional logic to your SQL queries, including syntax, examples, and practical use cases.
---


The **CASE expression** in PostgreSQL is used to add **conditional logic** inside SQL queries.
It works like an `if-else` statement:

* `WHEN condition THEN result` → if condition is true, return result.
* `ELSE result` → if none of the conditions are true, return this.

---

## 📝 Syntax

```sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  ELSE default_result
END
```

👉 You can use `CASE` in `SELECT`, `WHERE`, `ORDER BY`, and more.

---

## ✅ Example: Salary Categories

```sql
SELECT fname, salary,
CASE 
  WHEN salary >= 55000 THEN 'High'
  WHEN salary BETWEEN 48000 AND 55000 THEN 'Mid'
  ELSE 'Low'
END AS sal_cat
FROM employee;
```

### Sample Data (`employee` table)

| emp\_id | fname | salary |
| ------- | ----- | ------ |
| 1       | Raj   | 60000  |
| 2       | Sita  | 50000  |
| 3       | Amit  | 45000  |

### Result

| fname | salary | sal\_cat |
| ----- | ------ | -------- |
| Raj   | 60000  | High     |
| Sita  | 50000  | Mid      |
| Amit  | 45000  | Low      |

---

## 🎯 Example: Pass/Fail Check

```sql
SELECT fname, 
CASE
  WHEN marks >= 40 THEN 'Pass'
  ELSE 'Fail'
END AS result
FROM student;
```

👉 This checks student marks and labels them as `Pass` or `Fail`.

---

## 🔄 Example: Using CASE in ORDER BY

You can sort data with custom order:

```sql
SELECT fname, dept,
CASE 
  WHEN dept = 'HR' THEN 1
  WHEN dept = 'IT' THEN 2
  ELSE 3
END AS sort_order
FROM employee
ORDER BY sort_order;
```

✔ HR will come first, then IT, then others.

---

## 🧩 Nested CASE Example

You can also **nest CASE inside CASE** for complex rules:

```sql
SELECT fname, salary,
CASE 
  WHEN salary >= 55000 THEN 
    CASE 
      WHEN salary >= 70000 THEN 'Very High'
      ELSE 'High'
    END
  ELSE 'Low or Mid'
END AS salary_band
FROM employee;
```

---

## 📋 Quick Reference (Cheat Sheet)

| Usage Example                                                 | Purpose                   |
| ------------------------------------------------------------- | ------------------------- |
| `CASE WHEN salary >= 55000 THEN 'High' ELSE 'Low' END`        | Categorize salary         |
| `CASE WHEN marks >= 40 THEN 'Pass' ELSE 'Fail' END`           | Pass/Fail result          |
| `CASE WHEN dept='HR' THEN 1 WHEN dept='IT' THEN 2 ELSE 3 END` | Custom sort order         |
| Nested CASE                                                   | Handle complex conditions |

---

✅ With `CASE`, you can make your queries **smarter** by adding decision-making directly inside SQL.


