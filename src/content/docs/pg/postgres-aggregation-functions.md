---

title: "PostgreSQL Aggregation Functions (Simple Guide)"    
description: "Aggregation functions in PostgreSQL are used to perform calculations on **multiple rows of data** and return a single result. They are very useful when summarizing data like totals, averages, counts, etc."

---

Aggregation functions in PostgreSQL are used to perform calculations on **multiple rows of data** and return a single result.
They are very useful when summarizing data like totals, averages, counts, etc.

We’ll use the following `employees` table for all examples 👇

## 🗂 Example Table: `employees`

| emp_id | fname  | lname  | email                                                       | dept      | salary   | hire_date  |
| ------ | ------ | ------ | ----------------------------------------------------------- | --------- | -------- | ---------- |
| 1      | Raj    | Sharma | [raj.sharma@example.com](mailto:raj.sharma@example.com)     | IT        | 50000.00 | 2020-01-15 |
| 2      | Priya  | Singh  | [priya.singh@example.com](mailto:priya.singh@example.com)   | HR        | 45000.00 | 2019-03-22 |
| 3      | Arjun  | Verma  | [arjun.verma@example.com](mailto:arjun.verma@example.com)   | IT        | 55000.00 | 2021-06-01 |
| 4      | Suman  | Patel  | [suman.patel@example.com](mailto:suman.patel@example.com)   | Finance   | 60000.00 | 2018-07-30 |
| 5      | Kavita | Rao    | [kavita.rao@example.com](mailto:kavita.rao@example.com)     | HR        | 47000.00 | 2020-11-10 |
| 6      | Amit   | Gupta  | [amit.gupta@example.com](mailto:amit.gupta@example.com)     | Marketing | 52000.00 | 2020-09-25 |
| 7      | Neha   | Desai  | [neha.desai@example.com](mailto:neha.desai@example.com)     | IT        | 48000.00 | 2019-05-18 |
| 8      | Rahul  | Kumar  | [rahul.kumar@example.com](mailto:rahul.kumar@example.com)   | IT        | 53000.00 | 2021-02-14 |
| 9      | Anjali | Mehta  | [anjali.mehta@example.com](mailto:anjali.mehta@example.com) | Finance   | 61000.00 | 2018-12-03 |
| 10     | Vijay  | Nair   | [vijay.nair@example.com](mailto:vijay.nair@example.com)     | Marketing | 50000.00 | 2020-04-19 |

---

## 🔢 Basic Aggregation Functions

### 1. COUNT()

```sql
SELECT COUNT(*) AS total_employees FROM employees;
```

| total_employees |
| --------------- |
| 10              |

```sql
SELECT COUNT(*) AS it_employees FROM employees WHERE dept = 'IT';
```

| it_employees |
| ------------ |
| 4            |

---

### 2. SUM()

```sql
SELECT SUM(salary) AS total_salary FROM employees;
```

| total_salary |
| ------------ |
| 521000.00    |

```sql
SELECT SUM(salary) AS hr_total_salary FROM employees WHERE dept = 'HR';
```

| hr_total_salary |
| --------------- |
| 92000.00        |

---

### 3. MIN()

```sql
SELECT MIN(salary) AS lowest_salary FROM employees;
```

| lowest_salary |
| ------------- |
| 45000.00      |

```sql
SELECT MIN(hire_date) AS first_hired FROM employees;
```

| first_hired |
| ----------- |
| 2018-07-30  |

---

### 4. MAX()

```sql
SELECT MAX(salary) AS highest_salary FROM employees;
```

| highest_salary |
| -------------- |
| 61000.00       |

```sql
SELECT MAX(hire_date) AS latest_hired FROM employees;
```

| latest_hired |
| ------------ |
| 2021-06-01   |

---

### 5. AVG()

```sql
SELECT AVG(salary) AS avg_salary FROM employees;
```

| avg_salary |
| ---------- |
| 52100.00   |

```sql
SELECT AVG(salary) AS finance_avg_salary FROM employees WHERE dept = 'Finance';
```

| finance_avg_salary |
| ------------------ |
| 60500.00           |

---

## 🧩 GROUP BY with Aggregations

```sql
SELECT dept, COUNT(*) AS total_employees
FROM employees
GROUP BY dept;
```

| dept      | total_employees |
| --------- | --------------- |
| IT        | 4               |
| HR        | 2               |
| Finance   | 2               |
| Marketing | 2               |

```sql
SELECT dept, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept;
```

| dept      | avg_salary |
| --------- | ---------- |
| IT        | 51500.00   |
| HR        | 46000.00   |
| Finance   | 60500.00   |
| Marketing | 51000.00   |

---

## 🎯 HAVING Clause

```sql
SELECT dept, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept
HAVING AVG(salary) > 50000;
```

| dept      | avg_salary |
| --------- | ---------- |
| IT        | 51500.00   |
| Finance   | 60500.00   |
| Marketing | 51000.00   |

---

## 🔥 Advanced Aggregation Functions

```sql
SELECT dept, STRING_AGG(fname, ', ') AS employees
FROM employees
GROUP BY dept;
```

| dept      | employees               |
| --------- | ----------------------- |
| IT        | Raj, Arjun, Neha, Rahul |
| HR        | Priya, Kavita           |
| Finance   | Suman, Anjali           |
| Marketing | Amit, Vijay             |

```sql
SELECT dept, ARRAY_AGG(email) AS emails
FROM employees
GROUP BY dept;
```

| dept      | emails                                                                                                                                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IT        | {[raj.sharma@example.com](mailto:raj.sharma@example.com), [arjun.verma@example.com](mailto:arjun.verma@example.com), [neha.desai@example.com](mailto:neha.desai@example.com), [rahul.kumar@example.com](mailto:rahul.kumar@example.com)} |
| HR        | {[priya.singh@example.com](mailto:priya.singh@example.com), [kavita.rao@example.com](mailto:kavita.rao@example.com)}                                                                                                                     |
| Finance   | {[suman.patel@example.com](mailto:suman.patel@example.com), [anjali.mehta@example.com](mailto:anjali.mehta@example.com)}                                                                                                                 |
| Marketing | {[amit.gupta@example.com](mailto:amit.gupta@example.com), [vijay.nair@example.com](mailto:vijay.nair@example.com)}                                                                                                                       |

```sql
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM employees;
```

| median_salary |
| ------------- |
| 51000.00      |

```sql
SELECT MODE() WITHIN GROUP (ORDER BY dept) AS common_dept
FROM employees;
```

| common_dept |
| ----------- |
| IT          |

```sql
SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY salary) AS p90_salary
FROM employees;
```

| p90_salary |
| ---------- |
| 60000.00   |




---

## 📝 Final Cheat-Sheet (Quick Reference)

| Function               | Purpose                           | Example Query                                                                |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| **COUNT()**            | Counts rows                       | `SELECT COUNT(*) FROM employees;`                                            |
| **SUM()**              | Adds values                       | `SELECT SUM(salary) FROM employees;`                                         |
| **MIN()**              | Smallest value                    | `SELECT MIN(salary) FROM employees;`                                         |
| **MAX()**              | Largest value                     | `SELECT MAX(salary) FROM employees;`                                         |
| **AVG()**              | Average value                     | `SELECT AVG(salary) FROM employees;`                                         |
| **GROUP BY**           | Group rows by column              | `SELECT dept, COUNT(*) FROM employees GROUP BY dept;`                        |
| **HAVING**             | Filter groups (after aggregation) | `... HAVING AVG(salary) > 50000;`                                            |
| **STRING\_AGG()**      | Join strings together             | `SELECT dept, STRING_AGG(fname, ', ') FROM employees GROUP BY dept;`         |
| **ARRAY\_AGG()**       | Collect values into an array      | `SELECT dept, ARRAY_AGG(email) FROM employees GROUP BY dept;`                |
| **PERCENTILE\_CONT()** | Find median/percentiles           | `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) FROM employees;` |
| **MODE()**             | Most frequent value               | `SELECT MODE() WITHIN GROUP (ORDER BY dept) FROM employees;`                 |

---

✅ With this **README + Cheat Sheet**, you have:

* Example table
* Step-by-step queries with results
* Advanced analytics functions
* Quick reference for revision



