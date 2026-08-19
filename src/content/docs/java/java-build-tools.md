---
title: Java Build Tools - Maven & Gradle
description: Learn how Maven and Gradle automate compilation, dependency management, testing, packaging, and plugin execution in Java projects.
---

In real-world Java development, applications rely on third-party libraries, test suites, and automated deployment processes. **Build tools** automate compiling source code, downloading external libraries, running tests, and packaging code into runnable artifacts (like JAR or WAR files).

The two dominant build systems in the Java ecosystem are **Apache Maven** and **Gradle**.

---

## Why Use a Build Tool?

Without a build tool, you would have to manually:
- Run `javac` for dozens or hundreds of `.java` files.
- Download `.jar` library dependencies manually and manage their classpath.
- Deal with transitive dependencies (when library A needs library B version 2.0, but library C needs version 1.5).
- Run unit tests and generate test reports.
- Package bytecode, resources, and configuration files into an executable `.jar`.

Build tools solve all these problems automatically with declarative configuration and dependency resolution.

---

## Standard Java Directory Structure

Both Maven and Gradle follow a standard project layout:

```text
my-project/
├── pom.xml (Maven) OR build.gradle (Gradle)
└── src/
    ├── main/
    │   ├── java/        # Application Java source code
    │   └── resources/   # Configuration files, templates, properties
    └── test/
        ├── java/        # Unit & integration test source code
        └── resources/   # Test-specific resources
```

Keeping this directory layout ensures tools, IDEs (IntelliJ, Eclipse, VS Code), and CI/CD pipelines work out of the box without custom folder configurations.

---

## Apache Maven

**Maven** uses an XML file named `pom.xml` (Project Object Model) and follows a philosophy of **convention over configuration**.

### Maven Coordinates (GAV)

Every Maven project and library is uniquely identified by three attributes known as **GAV**:
- `groupId`: Usually the reverse domain of the organization (e.g., `com.example`, `org.junit.jupiter`).
- `artifactId`: The unique name of the project or module (e.g., `user-service`, `junit-jupiter`).
- `version`: The current release version (e.g., `1.0.0`, `5.10.2`).

### Sample `pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>order-service</artifactId>
    <version>1.0.0</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Compile-time & Runtime dependency -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.11.0</version>
        </dependency>

        <!-- Test scope dependency -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

### Dependency Scopes in Maven

| Scope | Description | Included in Artifact? |
| --- | --- | --- |
| `compile` | Default scope. Available everywhere (compile, test, runtime). | Yes |
| `provided` | Needed for compilation, but expected to be provided by runtime (e.g., Servlet API). | No |
| `runtime` | Needed at runtime, not needed at compile time (e.g., JDBC driver implementations). | Yes |
| `test` | Only used for compiling and executing tests (e.g., JUnit, Mockito). | No |

### Maven Build Lifecycle

Maven executes builds through standard lifecycle phases:

```text
validate -> compile -> test -> package -> verify -> install -> deploy
```

Common Maven commands:

```sh
# Clean build artifacts (removes 'target/' directory)
mvn clean

# Compile application source code
mvn compile

# Execute unit tests
mvn test

# Package compiled code into a JAR inside 'target/'
mvn package

# Clean, test, package, and install to local ~/.m2 repository
mvn clean install

# Skip tests during packaging (useful for fast local builds)
mvn package -DskipTests
```

---

## Gradle

**Gradle** uses a flexible Domain-Specific Language (DSL) written in Groovy (`build.gradle`) or Kotlin (`build.gradle.kts`). It is designed for high performance, incremental builds, and multi-project flexibility.

### Gradle Wrapper (`./gradlew`)

The **Gradle Wrapper** is a script bundled inside your project that downloads and uses the exact version of Gradle needed. Always run `./gradlew` rather than a global `gradle` installation:

```sh
# On Linux/macOS
./gradlew build

# On Windows
gradlew.bat build
```

### Sample `build.gradle` (Groovy DSL)

```groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral() // Repository to download dependencies from
}

dependencies {
    // Standard application dependency
    implementation 'com.google.code.gson:gson:2.11.0'

    // Test dependencies
    testImplementation platform('org.junit:junit-bom:5.10.2')
    testImplementation 'org.junit.jupiter:junit-jupiter'
}

test {
    useJUnitPlatform()
}

application {
    mainClass = 'com.example.Main'
}
```

### Sample `build.gradle.kts` (Kotlin DSL)

Kotlin DSL offers type-safety, auto-completion, and refactoring support in modern IDEs:

```kotlin
plugins {
    java
    application
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation(platform("org.junit:junit-bom:5.10.2"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}
```

### Gradle Dependency Configurations

| Configuration | Usage |
| --- | --- |
| `implementation` | Required for compiling and running the project; internal dependencies not exposed to consumers. |
| `api` | Exposed to downstream consumers in library projects (requires `java-library` plugin). |
| `compileOnly` | Used only during compilation (e.g., Lombok annotations). |
| `runtimeOnly` | Required only at runtime (e.g., database drivers). |
| `testImplementation` | Used exclusively for compiling and running tests. |

### Common Gradle Commands

```sh
# Clean the 'build/' output directory
./gradlew clean

# Compile and run unit tests
./gradlew test

# Compile, test, and package the JAR
./gradlew build

# Run the application directly
./gradlew run

# View dependency tree to resolve conflicts
./gradlew dependencies
```

---

## Maven vs Gradle Comparison

| Feature | Apache Maven | Gradle |
| --- | --- | --- |
| **Configuration Format** | XML (`pom.xml`) | Groovy / Kotlin DSL (`build.gradle`) |
| **Philosophy** | Convention over Configuration, rigid lifecycle | High flexibility, task-based DAG |
| **Build Speed** | Standard | Very fast (build cache, daemon, incremental) |
| **Learning Curve** | Gentle (standardized structure everywhere) | Moderate to Steep (DSL scripts) |
| **Wrapper Support** | `mvnw` (Maven Wrapper) | `gradlew` (Standard standard Gradle Wrapper) |
| **Ecosystem Usage** | Dominant in enterprise & Spring Boot projects | Dominant in Android, Kotlin, and large monorepos |

---

## Best Practices

1. **Always commit the Wrapper**: Commit `mvnw`/`gradlew` and the `.mvn/` or `gradle/wrapper/` folders to Git so any developer or CI server can build without installing the tool manually.
2. **Never hardcode paths**: Use standard directories (`src/main/resources`, etc.) and system properties instead of absolute machine paths.
3. **Use Central Repositories**: Rely on `mavenCentral()` to ensure secure and versioned dependency downloads.
4. **Avoid Dependency Hell**: Regularly run `mvn dependency:tree` or `./gradlew dependencies` to detect version conflicts or outdated transitive libraries.

---

### Next Steps ➡️

- Learn **Unit Testing with JUnit 5** to write automated tests executed by Maven/Gradle.
- Learn **Logging in Java with SLF4J & Logback** to configure application logging dependencies.
