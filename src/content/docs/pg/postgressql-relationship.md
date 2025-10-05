---
title: "PostgreSQL Relationships"
description: "PostgreSQL supports several types of relationships between tables. Here’s how to add each type"
---

# PostgreSQL Relationships Guide

This guide explains how **primary keys**, **foreign keys**, and different types of relationships work in PostgreSQL with practical SQL examples.

---

## 🔑 Primary Key

A **Primary Key** uniquely identifies each row in a table.  
It ensures that values are **unique** and **not null**.

### Example

```sql
CREATE TABLE employees (
  emp_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT
);
````

✔ `emp_id` is the primary key.
✔ No two employees can have the same `emp_id`.
✔ Every employee must have a value for `emp_id`.

---

## 🔗 Foreign Key

A **Foreign Key** is a column (or set of columns) in one table that **references the primary key** of another table.
It enforces **referential integrity** between related tables.

### Example

```sql
CREATE TABLE departments (
  dept_id SERIAL PRIMARY KEY,
  dept_name TEXT NOT NULL
);

CREATE TABLE employees (
  emp_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dept_id INTEGER REFERENCES departments(dept_id)
);
```

✔ `dept_id` in `employees` references `dept_id` in `departments`.
✔ Prevents assigning an employee to a department that does not exist.

---

## 1. One-to-One Relationship

Each row in **Table A** relates to one row in **Table B**.
Example: Each user has one profile.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  bio TEXT
);
```

✅ `profiles.user_id` references `users.id` and is marked as **UNIQUE**, enforcing one profile per user.

---

## 2. One-to-Many Relationship

One row in **Table A** relates to many rows in **Table B**.
Example: An author can write many books.

```sql
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES authors(id),
  title TEXT
);
```

✅ Many books can reference the same `author_id`, but each book belongs to **one author**.

---

## 3. Many-to-Many Relationship

Rows in **Table A** relate to many rows in **Table B**, and vice versa.
We use a **join table** for this relationship.
Example: Students can enroll in many courses, and courses can have many students.

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT
);

CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

✅ The `enrollments` table connects `students` and `courses` using a **composite primary key**.

---

# 📌 Summary

* **Primary Key** → Uniquely identifies each record.
* **Foreign Key** → Links one table’s column to another table’s primary key.
* **One-to-One** → A user has one profile.
* **One-to-Many** → An author has many books.
* **Many-to-Many** → Students enroll in many courses, and courses have many students.

---
