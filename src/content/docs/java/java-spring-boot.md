---
title: Spring Boot Overview & REST APIs
description: Learn the fundamentals of Spring Boot, Dependency Injection, key annotations, and how to build production-ready REST APIs in Java.
---

**Spring Boot** is the most popular Java framework for creating standalone, production-ready applications and RESTful Web Services quickly with minimal configuration.

It builds on top of the **Spring Framework** by eliminating complex XML configurations through **auto-configuration** and embedded web servers like Tomcat.

---

## Core Concepts

### 1. Inversion of Control (IoC) & Dependency Injection (DI)

- **Inversion of Control (IoC)**: Instead of your code manually instantiating classes with `new`, the Spring container manages the lifecycle and instantiation of your objects (called **Beans**).
- **Dependency Injection (DI)**: The framework automatically supplies dependent objects to a class when it is created.

```java
// Without Spring (Manual instantiation)
Car car = new Car(new Engine());

// With Spring (Dependency Injection)
@Service
public class CarService {
    private final Engine engine;

    @Autowired // Spring injects the Engine instance automatically
    public CarService(Engine engine) {
        this.engine = engine;
    }
}
```

---

## Key Spring Boot Annotations

| Annotation | Description |
|---|---|
| `@SpringBootApplication` | Entry point annotation combining `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan` |
| `@RestController` | Marks a class as a REST controller where methods return domain objects as JSON |
| `@RequestMapping` | Maps HTTP requests to handler methods or controller classes |
| `@GetMapping` | Shortcut for `@RequestMapping(method = RequestMethod.GET)` |
| `@PostMapping` | Shortcut for `@RequestMapping(method = RequestMethod.POST)` |
| `@PutMapping` | Shortcut for `@RequestMapping(method = RequestMethod.PUT)` |
| `@DeleteMapping` | Shortcut for `@RequestMapping(method = RequestMethod.DELETE)` |
| `@RequestBody` | Binds the incoming HTTP request body (JSON) to a Java object |
| `@PathVariable` | Extracts values from URL URI path segments (`/users/{id}`) |
| `@RequestParam` | Extracts query parameters from the URL (`/users?role=admin`) |
| `@Service` | Marks a class as a business logic layer component |
| `@Repository` | Marks a data access class (DAO) interacting with database |
| `@Autowired` | Automatically injects a Spring-managed bean |

---

## Creating a Spring Boot REST API

Here is a complete, real-world example of building a User Management REST API with Spring Boot.

### 1. Model / DTO Class

```java
package com.example.demo.model;

public class User {
    private Long id;
    private String name;
    private String email;

    public User() {}

    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

---

### 2. Service Layer (Business Logic)

```java
package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final List<User> users = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public UserService() {
        users.add(new User(counter.incrementAndGet(), "Amit Sharma", "amit@example.com"));
        users.add(new User(counter.incrementAndGet(), "Priya Singh", "priya@example.com"));
    }

    public List<User> getAllUsers() {
        return users;
    }

    public Optional<User> getUserById(Long id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    public User createUser(User user) {
        user.setId(counter.incrementAndGet());
        users.add(user);
        return user;
    }

    public boolean deleteUser(Long id) {
        return users.removeIf(user -> user.getId().equals(id));
    }
}
```

---

### 3. Controller Layer (REST Endpoints)

```java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    // Constructor Injection (Best Practice)
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/v1/users - Fetch all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET /api/v1/users/{id} - Fetch user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/v1/users - Create new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // DELETE /api/v1/users/{id} - Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

---

### 4. Main Application Class

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

## Application Configuration

Spring Boot uses `src/main/resources/application.properties` (or `application.yml`) to configure application parameters:

```properties
# Server port configuration
server.port=8080

# Application name
spring.application.name=user-service

# Logging level
logging.level.org.springframework.web=INFO
```

---

## Spring Boot Architecture

```
Client (HTTP Request)
       │
       ▼
   Controller Layer (@RestController)
       │
       ▼
    Service Layer (@Service - Business Logic)
       │
       ▼
  Repository Layer (@Repository - Database / Spring Data JPA)
       │
       ▼
    Database (PostgreSQL / MySQL)
```

---

## Best Practices for Spring Boot REST APIs

1. **Use Constructor Injection**: Prefer constructor injection over field injection (`@Autowired` on fields) for better testability and immutability.
2. **Use ResponseEntity**: Always return `ResponseEntity<T>` to explicitly set HTTP status codes (`200 OK`, `201 Created`, `404 Not Found`, etc.).
3. **Use DTOs (Data Transfer Objects)**: Separate database entities from API response payloads to protect internal models.
4. **Handle Exceptions Globally**: Use `@RestControllerAdvice` and `@ExceptionHandler` for clean, centralized error handling.
5. **API Versioning**: Prefix API paths with versions (e.g., `/api/v1/users`) for seamless API evolutions.

---

## Summary

- **Spring Boot** simplifies Java web application development with auto-configuration and embedded servers.
- **Dependency Injection (DI)** manages component lifecycles automatically.
- `@RestController` maps HTTP endpoints (`GET`, `POST`, `PUT`, `DELETE`) to Java methods.
- Use layered architecture (**Controller -> Service -> Repository**) for maintainable applications.
