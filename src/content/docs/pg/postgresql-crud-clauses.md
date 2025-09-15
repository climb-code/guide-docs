---
title: "PostgreSQL Basics (CRUD + Clauses)"
description: "A simple guide to PostgreSQL CRUD operations and important SQL clauses with examples."
---

This guide explains the **fundamentals of PostgreSQL**, focusing on **CRUD operations** and the most important **SQL clauses**.  
It’s written in **simple language** with examples you can try right away.

---

### 🟦 CRUD Operations

CRUD stands for **Create, Read, Update, Delete** — the four main operations you perform on data.

---

###### 1. Create → `INSERT`

Add new records into a table.

```sql
INSERT INTO employee (id, name, salary, department)
VALUES (1, 'Saurabh', 50000, 'IT');
````

---

##### 2. Read → `SELECT`

Retrieve records from a table.

```sql
SELECT * FROM employee;
```

✅ Shows all rows and columns.

```sql
SELECT name, salary FROM employee;
```

✅ Shows only selected columns.

---

##### 3. Update → `UPDATE`

Modify existing records.

```sql
UPDATE employee
SET salary = 60000
WHERE id = 1;
```

---

##### 4. Delete → `DELETE`

Remove records from a table.

```sql
DELETE FROM employee
WHERE id = 1;
```

⚠️ To remove **all rows but keep the table**:

```sql
DELETE FROM employee;
```

⚠️ To remove the **table itself**:

```sql
DROP TABLE employee;
```

---

### 🟩 Important SQL Clauses in PostgreSQL

Clauses help filter, group, or sort data when querying.

---

##### 🔹 WHERE

Filter rows based on a condition.

```sql
SELECT * FROM employee
WHERE salary > 40000;
```

---

##### 🔹 ORDER BY

Sort results.

```sql
SELECT * FROM employee
ORDER BY salary DESC;
```

---

##### 🔹 GROUP BY

Group rows for aggregation.

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employee
GROUP BY department;
```

---

##### 🔹 HAVING

Apply conditions **after grouping**.

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employee
GROUP BY department
HAVING AVG(salary) > 50000;
```

---

##### 🔹 LIMIT / OFFSET

Restrict rows returned.

```sql
SELECT * FROM employee
LIMIT 5;
```

```sql
SELECT * FROM employee
ORDER BY id
LIMIT 5 OFFSET 5;
```

---

##### 🔹 LIKE

Search for patterns inside text.

```sql
SELECT * FROM employee
WHERE name LIKE 'S%';
```

✅ Finds names starting with **S** (e.g., *Saurabh, Sneha*).

```sql
SELECT * FROM employee
WHERE name LIKE '%a%';
```

✅ Finds names containing the letter **a**.

---

##### 🔹 DISTINCT

Return unique values only.

```sql
SELECT DISTINCT department FROM employee;
```

✅ Lists each department once, even if many employees belong to it.

---

### ✅ Quick Summary

| Operation  | Keyword  | Example                                        |
| ---------- | -------- | ---------------------------------------------- |
| **Create** | `INSERT` | `INSERT INTO employee (...) VALUES (...);`     |
| **Read**   | `SELECT` | `SELECT * FROM employee;`                      |
| **Update** | `UPDATE` | `UPDATE employee SET salary=... WHERE id=...;` |
| **Delete** | `DELETE` | `DELETE FROM employee WHERE id=...;`           |

| Clause     | Purpose                  | Example                               |
| ---------- | ------------------------ | ------------------------------------- |
| `WHERE`    | Filter rows              | `salary > 40000`                      |
| `ORDER BY` | Sort results             | `ORDER BY salary DESC`                |
| `GROUP BY` | Group rows               | `GROUP BY department`                 |
| `HAVING`   | Condition after grouping | `HAVING AVG(salary) > 50000`          |
| `LIMIT`    | Restrict rows            | `LIMIT 5`                             |
| `LIKE`     | Pattern search           | `name LIKE 'S%'`                      |
| `DISTINCT` | Unique values only       | `SELECT DISTINCT department FROM ...` |




