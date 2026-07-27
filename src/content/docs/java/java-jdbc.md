---
title: JDBC in Java
description: Learn how Java connects to relational databases using JDBC, DriverManager, Connection, Statement, PreparedStatement, and ResultSet.
---

**JDBC** stands for **Java Database Connectivity**. It is the standard Java API used to connect a Java application with relational databases such as MySQL, PostgreSQL, Oracle, and SQL Server.

With JDBC, a Java program can:

- Open a database connection
- Run SQL queries
- Insert, update, and delete records
- Read query results
- Handle database errors

---

## JDBC Architecture

JDBC works as a bridge between Java code and the database driver.

```text
Java Application
      |
      v
JDBC API
      |
      v
JDBC Driver
      |
      v
Database
```

The **JDBC driver** is database specific. For example, MySQL needs the MySQL Connector/J driver, while PostgreSQL needs the PostgreSQL JDBC driver.

---

## Common JDBC Classes

| Class / Interface | Purpose |
| ----------------- | ------- |
| `DriverManager` | Finds and opens a database connection |
| `Connection` | Represents an active connection to the database |
| `Statement` | Runs simple SQL queries |
| `PreparedStatement` | Runs parameterized SQL queries safely |
| `ResultSet` | Stores rows returned by a `SELECT` query |
| `SQLException` | Handles database-related errors |

---

## Connecting to a Database

Example connection URL for MySQL:

```java
String url = "jdbc:mysql://localhost:3306/school";
String username = "root";
String password = "password";
```

Open the connection using `DriverManager.getConnection()`.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/school";
        String username = "root";
        String password = "password";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            System.out.println("Database connected successfully.");
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}
```

The `try-with-resources` block closes the connection automatically.

---

## Reading Data with SELECT

Use `PreparedStatement` and `ResultSet` to read rows from a table.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String sql = "SELECT id, name, marks FROM students WHERE marks >= ?";

        try (
                Connection connection = DriverManager.getConnection(
                        "jdbc:mysql://localhost:3306/school",
                        "root",
                        "password"
                );
                PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, 75);

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    int marks = resultSet.getInt("marks");

                    System.out.println(id + " - " + name + " - " + marks);
                }
            }
        } catch (SQLException e) {
            System.out.println("Query failed: " + e.getMessage());
        }
    }
}
```

`resultSet.next()` moves to the next row and returns `false` when no rows are left.

---

## Inserting Data

Use `executeUpdate()` for `INSERT`, `UPDATE`, and `DELETE`.

```java
String sql = "INSERT INTO students (name, marks) VALUES (?, ?)";

try (
        Connection connection = DriverManager.getConnection(url, username, password);
        PreparedStatement statement = connection.prepareStatement(sql)
) {
    statement.setString(1, "Priya");
    statement.setInt(2, 88);

    int rows = statement.executeUpdate();
    System.out.println(rows + " row inserted.");
} catch (SQLException e) {
    System.out.println("Insert failed: " + e.getMessage());
}
```

The `?` placeholders are filled using setter methods like `setString()`, `setInt()`, and `setDouble()`.

---

## Updating Data

```java
String sql = "UPDATE students SET marks = ? WHERE id = ?";

try (
        Connection connection = DriverManager.getConnection(url, username, password);
        PreparedStatement statement = connection.prepareStatement(sql)
) {
    statement.setInt(1, 92);
    statement.setInt(2, 1);

    int rows = statement.executeUpdate();
    System.out.println(rows + " row updated.");
} catch (SQLException e) {
    System.out.println("Update failed: " + e.getMessage());
}
```

---

## Deleting Data

```java
String sql = "DELETE FROM students WHERE id = ?";

try (
        Connection connection = DriverManager.getConnection(url, username, password);
        PreparedStatement statement = connection.prepareStatement(sql)
) {
    statement.setInt(1, 3);

    int rows = statement.executeUpdate();
    System.out.println(rows + " row deleted.");
} catch (SQLException e) {
    System.out.println("Delete failed: " + e.getMessage());
}
```

---

## Statement vs PreparedStatement

| Feature | `Statement` | `PreparedStatement` |
| ------- | ----------- | ------------------- |
| SQL values | Added directly into the query string | Passed through placeholders |
| Security | Risky with user input | Safer against SQL injection |
| Reuse | Less efficient for repeated queries | Better for repeated queries |
| Recommended | Only for simple fixed queries | Yes, for most real applications |

Prefer `PreparedStatement` whenever values come from users, forms, APIs, or files.

---

## Transactions

A transaction groups multiple database operations so they either all succeed or all fail.

```java
try (Connection connection = DriverManager.getConnection(url, username, password)) {
    connection.setAutoCommit(false);

    try (
            PreparedStatement debit = connection.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?"
            );
            PreparedStatement credit = connection.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?"
            )
    ) {
        debit.setDouble(1, 500);
        debit.setInt(2, 1);
        debit.executeUpdate();

        credit.setDouble(1, 500);
        credit.setInt(2, 2);
        credit.executeUpdate();

        connection.commit();
        System.out.println("Transaction completed.");
    } catch (SQLException e) {
        connection.rollback();
        System.out.println("Transaction rolled back.");
    }
} catch (SQLException e) {
    System.out.println("Database error: " + e.getMessage());
}
```

Transactions are important for banking, orders, inventory, and any workflow where partial updates would create incorrect data.

---

## Best Practices

- Use `PreparedStatement` instead of building SQL with string concatenation.
- Close `Connection`, `PreparedStatement`, and `ResultSet` using try-with-resources.
- Keep database credentials outside source code in environment variables or config files.
- Use transactions for multiple related updates.
- In larger applications, use a connection pool instead of opening a new connection for every request.

---

## Key Points

- JDBC is Java's standard API for relational database access.
- `Connection` represents a live database connection.
- `PreparedStatement` is safer and cleaner than `Statement`.
- `ResultSet` is used to read rows from `SELECT` queries.
- Transactions help keep related database operations consistent.
