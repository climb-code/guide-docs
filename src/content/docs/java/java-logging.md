---
title: Logging in Java with SLF4J & Logback
description: Learn how to implement enterprise-grade logging in Java using SLF4J, Logback, log levels, parameterized logging, logback.xml configuration, and MDC.
---

**Logging** is the practice of recording runtime events, errors, performance metrics, and application state. In production environments, logs are often the only tool developers and operators have to diagnose issues, investigate security incidents, and monitor system health.

---

## Why Not `System.out.println`?

Using `System.out.println()` for application logging has major flaws:

| Problem | `System.out.println()` | Logging Framework (SLF4J / Logback) |
| --- | --- | --- |
| **Log Levels** | No distinction between info, debug, or error | Granular levels (`DEBUG`, `INFO`, `ERROR`, etc.) |
| **Performance** | Synchronous I/O blocks active threads | Asynchronous, buffered, high-throughput appenders |
| **Output Destinations** | Only writes to standard stdout | Console, files, rolling archives, remote servers |
| **Metadata** | Raw text without timestamps or thread names | Automatic timestamps, thread names, log level, class name |
| **Dynamic Control** | Cannot disable in production without code changes | Change log levels dynamically via configuration |

---

## Logging Architecture: Facade vs Implementation

The modern Java logging ecosystem separates the **API (Facade)** from the **Underlying Implementation**:

```text
Application Code
      |
      v
SLF4J (Simple Logging Facade for Java)  --> API / Interface
      |
      v
Logback / Log4j2 / java.util.logging    --> Implementation / Engine
```

- **SLF4J**: The universal logging interface. Your code only imports SLF4J classes (`org.slf4j.Logger`, `org.slf4j.LoggerFactory`), keeping your code independent of any specific logging library.
- **Logback**: The native, modern implementation designed by the creator of SLF4J and Log4j.

---

## Adding Dependencies

### Maven (`pom.xml`)

Adding `logback-classic` automatically brings in both the Logback implementation and the SLF4J API:

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.5.6</version>
</dependency>
```

### Gradle (`build.gradle`)

```groovy
dependencies {
    implementation 'ch.qos.logback:logback-classic:1.5.6'
}
```

---

## Writing Logs in Java

### 1. Initializing the Logger

Always declare the logger as `private static final` at the top of your class:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public void registerUser(String username, String email) {
        logger.info("Registering new user with username: {}", username);
        // registration logic
    }
}
```

### 2. Log Levels

Choose the appropriate log level based on the severity and purpose of the event:

| Level | When to Use | Example |
| --- | --- | --- |
| `TRACE` | Extremely fine-grained diagnostic details. | Entering method, raw byte dumps, loop counters |
| `DEBUG` | Useful developer information during debugging. | Calculated intermediate values, SQL queries |
| `INFO` | Major application lifecycle events and normal operations. | Server started, order #1042 processed, job completed |
| `WARN` | Potential problems that didn't break current flow. | Deprecated API used, high memory usage, slow query |
| `ERROR` | Failures or exceptions that prevented an action. | Database connection failure, payment failed |

```java
logger.trace("Entering calculateTax() with amount={}", amount);
logger.debug("Fetched user cache item with key={}", userId);
logger.info("User {} logged in successfully from IP {}", username, ipAddress);
logger.warn("Slow query detected: query took {} ms", duration);
logger.error("Failed to process payment for orderId: {}", orderId);
```

### 3. Parameterized Logging (Avoid String Concatenation)

Do **NOT** use `+` to concatenate strings in log messages:

```java
// BAD: Concatenation runs even if DEBUG is disabled, wasting CPU and memory!
logger.debug("User " + user.getId() + " details: " + user.getDetails());

// GOOD: SLF4J placeholders '{}' evaluate arguments ONLY if DEBUG is enabled
logger.debug("User {} details: {}", user.getId(), user.getDetails());
```

### 4. Logging Exceptions Properly

To log stack traces, pass the `Throwable` exception as the **last argument** without a `{}` placeholder:

```java
try {
    paymentGateway.charge(order.getAmount());
} catch (PaymentException e) {
    // Correct: Logs the message AND the entire stack trace
    logger.error("Payment failed for order ID: {}", order.getId(), e);
}
```

---

## Logback Configuration (`logback.xml`)

Place `logback.xml` inside `src/main/resources/`. Logback automatically discovers it upon startup.

```xml
<configuration>

    <!-- Define a property for log directory -->
    <property name="LOG_DIR" value="logs" />

    <!-- Console Appender -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- Daily Rolling File Appender with Size Limit -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_DIR}/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- Daily rollover with date pattern and index -->
            <fileNamePattern>${LOG_DIR}/app-%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!-- Max file size before rotating -->
            <maxFileSize>10MB</maxFileSize>
            <!-- Keep 30 days worth of history -->
            <maxHistory>30</maxHistory>
            <!-- Total size cap for all log files -->
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- Configure specific log level for your package -->
    <logger name="com.example" level="DEBUG" />

    <!-- Set root logger level and attach appenders -->
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE" />
    </root>

</configuration>
```

### Pattern Format Tokens

- `%d{yyyy-MM-dd HH:mm:ss.SSS}`: Timestamp with milliseconds.
- `[%thread]`: Name of the thread executing the code.
- `%-5level`: Log level padded to 5 characters (`INFO `, `ERROR`).
- `%logger{36}`: Shortened logger name (up to 36 chars).
- `%msg`: The log message.
- `%n`: System-independent newline.

---

## Contextual Logging with MDC (Mapped Diagnostic Context)

In multi-threaded web applications and microservices, requests run concurrently. **MDC** lets you attach contextual attributes (like a unique Request ID or User ID) to the current thread, and every log statement on that thread will automatically include it.

```java
import org.slf4j.MDC;

public class RequestInterceptor {
    public void handleRequest(String requestId, String userId) {
        try {
            // Attach context to thread local storage
            MDC.put("requestId", requestId);
            MDC.put("userId", userId);

            logger.info("Handling incoming HTTP request");
            // All subsequent service/database calls on this thread carry this context!
            
        } finally {
            // ALWAYS clean up to prevent memory leaks in thread pool environments
            MDC.clear();
        }
    }
}
```

Include `%X{requestId}` in your `logback.xml` pattern to print the request ID with every line:

```xml
<pattern>%d{HH:mm:ss} [%thread] [%X{requestId}] %-5level %logger - %msg%n</pattern>
```

---

## Production Best Practices

1. **Never Log Sensitive Data**: Avoid logging passwords, credit card numbers, auth tokens, or PII (Personally Identifiable Information).
2. **Use Guards for Heavy Computations**:
   ```java
   if (logger.isDebugEnabled()) {
       logger.debug("Complex dump: {}", expensiveComputation());
   }
   ```
3. **Always Clean Up MDC**: Wrap MDC usage in `try ... finally { MDC.clear(); }` so thread pool reuse doesn't leak old IDs.
4. **Use Structured Logging (JSON)**: For cloud setups (AWS CloudWatch, Datadog, ELK stack), use Logstash Logback Encoder to output JSON logs.

---

### Next Steps ➡️

- Explore **Java Build Tools (Maven & Gradle)** to manage dependencies and build configurations.
- Learn **Unit Testing with JUnit 5** to test application services and verify error logs.
