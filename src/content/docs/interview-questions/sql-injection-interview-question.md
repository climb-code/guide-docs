---
title: SQL Injection Interview Question
description: A simple interview question and answer about SQL injection and how to prevent it.
---

## What is SQL injection, and how do you prevent it?

SQL injection happens when an app puts user input directly into an SQL query. An attacker may change what the query does and read or change data.

I prevent it by using parameterized queries. They keep the SQL command separate from the user's input, so the input is treated as data. I also give the app only the database permissions it needs. [OWASP SQL injection prevention guidance](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).

### Example you can explain in an interview

Imagine a page that looks up a user's profile by username. This code is unsafe because it joins the user's input into the SQL command:

```text
username = user_input
sql = "SELECT id FROM users WHERE username = '" + username + "'"
```

If someone enters `ana' OR '1'='1`, the app builds this query:

```sql
SELECT id FROM users WHERE username = 'ana' OR '1'='1'
```

The condition `'1'='1'` is always true, so the query may return rows that the app did not mean to show.

Use a parameterized query instead:

```text
sql = "SELECT id FROM users WHERE username = ?"
db.execute(sql, [username])
```

The database treats the username as a value, not as SQL code. The `?` placeholder can look different in different database libraries, but the important part is to bind the value separately instead of joining it into the query. In a real login, the app should also verify the password with a password-hashing library.
