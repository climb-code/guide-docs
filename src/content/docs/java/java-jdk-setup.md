---
title: Java JDK and Environment Setup
description: Learn how to set up your Java development environment, understand the differences between JVM, JRE, and JDK, and configure your system variables.
---

Before you can start writing and running Java programs, you need to set up the **Java Development Kit (JDK)** on your machine. This guide will walk you through the essential components of the Java environment and the steps to get everything running.

## Understanding the Trio: JVM, JRE, and JDK

It is important to understand the three core components that make up the Java platform:

### 1. JVM (Java Virtual Machine)
The **JVM** is the heart of the "Write Once, Run Anywhere" philosophy. It is an abstract machine that provides the runtime environment in which Java bytecode is executed. It is platform-specific (there are different JVMs for Windows, Mac, and Linux), but it ensures the bytecode remains the same.

### 2. JRE (Java Runtime Environment)
The **JRE** is a software layer that runs on top of the operating system. It includes the JVM, core libraries, and other components required to **run** Java applications. If you only want to use Java apps, you only need the JRE.

### 3. JDK (Java Development Kit)
The **JDK** is a full-featured software development kit required to **develop** Java applications. It includes the JRE plus development tools like the compiler (`javac`), the archiver (`jar`), and documentation generators (`javadoc`).

> **Rule of Thumb:** As a developer, you always install the **JDK**.

---

## Installing the JDK

We recommend using a modern LTS (Long Term Support) version of Java, such as **Java 17** or **Java 21**.

### For Windows
1. Download the installer (x64 Installer) from the [Oracle Website](https://www.oracle.com/java/technologies/downloads/) or use [Adoptium](https://adoptium.net/).
2. Run the `.exe` file and follow the installation prompts.
3. Note the installation path (usually `C:\Program Files\Java\jdk-xx`).

### For macOS
1. Download the DMG installer (Arm64 for Apple Silicon, x64 for Intel).
2. Open the `.dmg` and run the package installer.
3. Alternatively, use Homebrew:
   ```bash
   brew install openjdk@21
   ```

### For Linux (Ubuntu/Debian)
Use the package manager:
```bash
sudo apt update
sudo apt install openjdk-21-jdk
```

---

## Configuring Environment Variables

To run Java commands from any terminal window, you need to configure your system's environment variables.

### 1. Setting `JAVA_HOME`
This variable points to the directory where the JDK is installed.
- **Windows:** Search for "Edit the system environment variables" > Environment Variables > New System Variable. Variable name: `JAVA_HOME`, Value: path to your JDK.
- **macOS/Linux:** Add the following to your `.zshrc` or `.bashrc`:
  ```bash
  export JAVA_HOME=$(/usr/libexec/java_home)
  export PATH=$JAVA_HOME/bin:$PATH
  ```

### 2. Updating the `PATH`
Ensure that the `%JAVA_HOME%\bin` (Windows) or `$JAVA_HOME/bin` (Unix) is added to your system's `PATH` variable.

---

## Verifying the Installation

Open a new terminal or command prompt and run the following commands:

### Check Java Runtime
```bash
java -version
```
*Expected output:* `java version "21.x.x" ...`

### Check Java Compiler
```bash
javac -version
```
*Expected output:* `javac 21.x.x`

---

## Writing Your First "Hello World"

1. Create a file named `Main.java`.
2. Paste the following code:
   ```java
   public class Main {
       public static void main(String[] args) {
           System.out.println("Hello, Java World!");
       }
   }
   ```
3. Compile the code:
   ```bash
   javac Main.java
   ```
4. Run the program:
   ```bash
   java Main
   ```

**Output:** `Hello, Java World!`

---

### Next Steps
Now that your environment is ready, we will dive into **Java Basics: Variables, Data Types, and Operators**.
