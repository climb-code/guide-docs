---

title: "PostgreSQL String Functions"    
description: "PostgreSQL gives us many functions to **work with text**. We can **join, split, search, replace, trim, and format strings** easily using these."

---

PostgreSQL gives us many functions to **work with text**.
We can **join, split, search, replace, trim, and format strings** easily using these.

This guide covers the most common ones with **examples**.

---

## 📝 Setup Example Table

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  city VARCHAR(50)
);

INSERT INTO students (name, city) VALUES
('Saurabh Jaykar', 'Nagpur'),
('Anita Sharma', 'Mumbai'),
('Rahul Kumar', 'Delhi'),
('Priya Singh', 'Pune');
```

✅ Table:

| id | name           | city   |
| -- | -------------- | ------ |
| 1  | Saurabh Jaykar | Nagpur |
| 2  | Anita Sharma   | Mumbai |
| 3  | Rahul Kumar    | Delhi  |
| 4  | Priya Singh    | Pune   |

---

## 🔤 1. Upper & Lower Case

```sql
SELECT UPPER(name) AS upper_name, LOWER(city) AS lower_city FROM students;
```

✅ Output:

| upper\_name    | lower\_city |
| -------------- | ----------- |
| SAURABH JAYKAR | nagpur      |
| ANITA SHARMA   | mumbai      |
| RAHUL KUMAR    | delhi       |
| PRIYA SINGH    | pune        |

---

## ✂️ 2. Length of String

```sql
SELECT name, LENGTH(name) AS name_length FROM students;
```

✅ Output:

| name           | name\_length |
| -------------- | ------------ |
| Saurabh Jaykar | 14           |
| Anita Sharma   | 12           |
| Rahul Kumar    | 11           |
| Priya Singh    | 11           |

---

## 🔍 3. Find Position of Substring

```sql
SELECT POSITION('a' IN name) AS pos_a, name FROM students;
```

✅ Output:

| pos\_a | name           |
| ------ | -------------- |
| 2      | Saurabh Jaykar |
| 2      | Anita Sharma   |
| 2      | Rahul Kumar    |
| 3      | Priya Singh    |

---

## 🪓 4. Substring

```sql
SELECT SUBSTRING(name FROM 1 FOR 5) AS short_name, name FROM students;
```

✅ Output:

| short\_name | name           |
| ----------- | -------------- |
| Saurab      | Saurabh Jaykar |
| Anita       | Anita Sharma   |
| Rahul       | Rahul Kumar    |
| Priya       | Priya Singh    |

---

## 🔗 5. Concatenation

```sql
SELECT name || ' from ' || city AS intro FROM students;
```

✅ Output:

| intro                      |
| -------------------------- |
| Saurabh Jaykar from Nagpur |
| Anita Sharma from Mumbai   |
| Rahul Kumar from Delhi     |
| Priya Singh from Pune      |

---

## ✏️ 6. Replace Text

```sql
SELECT REPLACE(city, 'i', '*') AS new_city FROM students;
```

✅ Output:

| new\_city |
| --------- |
| Nagpur    |
| Mumba\*   |
| Delh\*    |
| Pune      |

---

## 🧹 7. Trim Spaces

```sql
SELECT TRIM('   hello world   ') AS trimmed;
```

✅ Output:

| trimmed     |
| ----------- |
| hello world |

---

## 🔄 8. Reverse String

```sql
SELECT REVERSE(name) AS rev_name FROM students;
```

✅ Output:

| rev\_name      |
| -------------- |
| rakyaJ hbaruaS |
| amrahS atinA   |
| ramuK luhaR    |
| hgniS ayirP    |

---

## ⬅️ 9. Left Part of String

```sql
SELECT LEFT(name, 5) AS left_name, name FROM students;
```

✅ Output:

| left\_name | name           |
| ---------- | -------------- |
| Saurab     | Saurabh Jaykar |
| Anita      | Anita Sharma   |
| Rahul      | Rahul Kumar    |
| Priya      | Priya Singh    |

---

## ➡️ 10. Right Part of String

```sql
SELECT RIGHT(name, 5) AS right_name, name FROM students;
```

✅ Output:

| right\_name | name           |
| ----------- | -------------- |
| Jaykar      | Saurabh Jaykar |
| Sharma      | Anita Sharma   |
| Kumar       | Rahul Kumar    |
| Singh       | Priya Singh    |

---

## 📋 Cheat-Sheet Table

| Function      | Example                              | Result      |           |   |            |             |
| ------------- | ------------------------------------ | ----------- | --------- | - | ---------- | ----------- |
| `UPPER()`     | `UPPER('hello')`                     | HELLO       |           |   |            |             |
| `LOWER()`     | `LOWER('HELLO')`                     | hello       |           |   |            |             |
| `LENGTH()`    | `LENGTH('India')`                    | 5           |           |   |            |             |
| `POSITION()`  | `POSITION('a' IN 'Ravi')`            | 2           |           |   |            |             |
| `SUBSTRING()` | `SUBSTRING('Postgres' FROM 1 FOR 4)` | Post        |           |   |            |             |
| \`            |                                      | \` (concat) | \`'Hello' |   | ' World'\` | Hello World |
| `REPLACE()`   | `REPLACE('banana','na','*')`         | ba\*\*      |           |   |            |             |
| `TRIM()`      | `TRIM('   SQL   ')`                  | SQL         |           |   |            |             |
| `REVERSE()`   | `REVERSE('abc')`                     | cba         |           |   |            |             |

---
