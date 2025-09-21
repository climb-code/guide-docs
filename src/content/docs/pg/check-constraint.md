---
title: "PostgreSQL CHECK Constraint"
description: "Learn how to use the CHECK constraint in PostgreSQL to enforce data integrity with practical examples."
---


The **CHECK constraint** in PostgreSQL is used to restrict the values that can be stored in a column.
It helps make sure your data always follows certain rules.

---

## 📝 Syntax

```sql
CREATE TABLE employees (
  emp_id SERIAL PRIMARY KEY,
  salary NUMERIC CHECK (salary > 0),   -- Salary must be positive
  age INT CHECK (age >= 18)            -- Age must be at least 18
);
```

👉 Here:

* `salary > 0` → prevents negative salary.
* `age >= 18` → makes sure age is at least 18.

---

## ✅ Example: Adding a CHECK Constraint

```sql
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  price NUMERIC CHECK (price >= 0),    -- Price can't be negative
  stock INT CHECK (stock >= 0)         -- Stock can't be negative
);
```

✔ This ensures **price and stock are never negative**.

---

## 🔄 Add CHECK to an Existing Table

```sql
ALTER TABLE employees
ADD CONSTRAINT chk_salary CHECK (salary > 0);
```

---

## 🗑️ Remove a CHECK Constraint

```sql
ALTER TABLE employees
DROP CONSTRAINT chk_salary;
```

---

## ❌ What Happens on Violation?

If you try to insert invalid data:

```sql
INSERT INTO employees (salary, age) VALUES (-100, 25);
-- ERROR: violates check constraint
```

⚡ PostgreSQL will stop the insert because it **breaks the rule**.

---

## 🧩 Multiple Conditions

You can combine conditions with `AND` / `OR`:

```sql
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  quantity INT CHECK (quantity > 0 AND quantity <= 100)  -- Quantity must be 1-100
);
```

✔ Quantity must always be **between 1 and 100**.

---

## 📱 Mobile Number Example (Regex)

You can check for a **10-digit mobile number**:

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  mobile VARCHAR(10) CHECK (mobile ~ '^[0-9]{10}$')
);
```

* `~` → regex match operator in PostgreSQL.
* `^[0-9]{10}$` → exactly **10 digits required**.

👉 Invalid insert:

```sql
INSERT INTO users (name, mobile) VALUES ('Saurabh', '98765');
-- ERROR: violates check constraint
```

👉 Valid insert:

```sql
INSERT INTO users (name, mobile) VALUES ('Saurabh', '9876543210');
```

---

## 📋 Quick Reference (Cheat Sheet)

| Constraint Example                         | Purpose                         |
| ------------------------------------------ | ------------------------------- |
| `CHECK (salary > 0)`                       | Salary must be positive         |
| `CHECK (age >= 18)`                        | Age must be at least 18         |
| `CHECK (price >= 0)`                       | Price cannot be negative        |
| `CHECK (quantity > 0 AND quantity <= 100)` | Quantity between 1 and 100      |
| `CHECK (mobile ~ '^[0-9]{10}$')`           | Mobile number must be 10 digits |

---



