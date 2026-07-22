---
title: File Handling in Java
description: Learn how to create, read, write, append, and delete files in Java using java.io and java.nio.file APIs.
---

**File handling** means working with files from a Java program: creating files, reading text, writing data, appending new content, checking file information, and deleting files when needed.

Java provides two common APIs for file handling:

- `java.io` - older API with classes like `File`, `FileReader`, `FileWriter`, and `BufferedReader`
- `java.nio.file` - modern API with `Path`, `Paths`, and `Files`

For new code, prefer `java.nio.file` because it is cleaner and has many useful helper methods.

---

## Creating a File

Use `Files.createFile()` with a `Path`.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try {
            Files.createFile(path);
            System.out.println("File created: " + path.getFileName());
        } catch (IOException e) {
            System.out.println("Could not create file: " + e.getMessage());
        }
    }
}
```

If the file already exists, `createFile()` throws an exception. You can check first:

```java
if (!Files.exists(path)) {
    Files.createFile(path);
}
```

---

## Writing to a File

`Files.writeString()` is a simple way to write text into a file.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");
        String content = "Java file handling is useful.";

        try {
            Files.writeString(path, content);
            System.out.println("Data written successfully.");
        } catch (IOException e) {
            System.out.println("Write failed: " + e.getMessage());
        }
    }
}
```

By default, this replaces the existing content of the file.

---

## Appending to a File

To add new content without removing existing text, use `StandardOpenOption.APPEND`.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try {
            Files.writeString(
                    path,
                    "\nThis line was appended.",
                    StandardOpenOption.APPEND
            );
            System.out.println("Data appended successfully.");
        } catch (IOException e) {
            System.out.println("Append failed: " + e.getMessage());
        }
    }
}
```

If the file might not exist yet, combine options:

```java
Files.writeString(
        path,
        "First line\n",
        StandardOpenOption.CREATE,
        StandardOpenOption.APPEND
);
```

---

## Reading a Whole File

Use `Files.readString()` when the file is small enough to load fully into memory.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try {
            String content = Files.readString(path);
            System.out.println(content);
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

This is best for small text files such as config files, notes, and simple reports.

---

## Reading Line by Line

For larger files, read line by line using `Files.lines()`.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try (Stream<String> lines = Files.lines(path)) {
            lines.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

The `try (...)` syntax is called **try-with-resources**. It automatically closes the file resource when the block finishes.

---

## Using BufferedReader

`BufferedReader` is another common way to read text files efficiently.

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}
```

Use this style when working with older Java code or APIs that expect `java.io` classes.

---

## File Information

You can inspect a file before using it.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("notes.txt");

        System.out.println("Exists: " + Files.exists(path));
        System.out.println("Readable: " + Files.isReadable(path));
        System.out.println("Writable: " + Files.isWritable(path));
        System.out.println("Size: " + Files.size(path) + " bytes");
        System.out.println("File name: " + path.getFileName());
        System.out.println("Absolute path: " + path.toAbsolutePath());
    }
}
```

Useful methods:

| Method | Purpose |
|---|---|
| `Files.exists(path)` | Checks whether the file or folder exists |
| `Files.isRegularFile(path)` | Checks whether the path points to a normal file |
| `Files.isDirectory(path)` | Checks whether the path points to a folder |
| `Files.size(path)` | Returns file size in bytes |
| `path.toAbsolutePath()` | Converts a relative path into an absolute path |

---

## Deleting a File

Use `Files.delete()` if the file must exist, or `Files.deleteIfExists()` if it may or may not exist.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("notes.txt");

        try {
            boolean deleted = Files.deleteIfExists(path);
            System.out.println(deleted ? "File deleted." : "File not found.");
        } catch (IOException e) {
            System.out.println("Delete failed: " + e.getMessage());
        }
    }
}
```

---

## Common File Handling Mistakes

| Mistake | Better approach |
|---|---|
| Forgetting to close files | Use try-with-resources |
| Loading very large files with `readString()` | Read line by line |
| Ignoring exceptions | Handle `IOException` clearly |
| Hardcoding absolute paths | Use relative paths or config values |
| Replacing file content accidentally | Use `APPEND` when adding content |

---

## Quick Practice

Create a program that:

1. Creates a file named `students.txt`
2. Writes three student names into it
3. Reads and prints all names
4. Appends one more name
5. Prints the updated file content

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path path = Path.of("students.txt");

        try {
            Files.write(path, List.of("Amit", "Priya", "Rahul"));

            System.out.println("Original file:");
            Files.readAllLines(path).forEach(System.out::println);

            Files.writeString(
                    path,
                    "\nSaurabh",
                    StandardOpenOption.APPEND
            );

            System.out.println("\nUpdated file:");
            Files.readAllLines(path).forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("File operation failed: " + e.getMessage());
        }
    }
}
```

---

## Summary

- Java can create, read, write, append, and delete files.
- `Path` represents a file or folder location.
- `Files` provides modern helper methods for file operations.
- Use `try-with-resources` when working with streams, readers, or writers.
- Use line-by-line reading for large files.
