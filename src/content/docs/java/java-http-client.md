---
title: HTTP Client in Java
description: Learn how to make synchronous and asynchronous HTTP requests with Java's built-in HttpClient.
---

Java 11 introduced `java.net.http.HttpClient`, a built-in API for calling HTTP services. It supports HTTP/1.1 and HTTP/2, request timeouts, headers, and both synchronous and asynchronous calls.

---

## Create a Client and a GET Request

Create one `HttpClient` and reuse it across requests. Build an `HttpRequest` with the target URL, then choose a body handler for the response.

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .build();

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.example.com/users"))
        .header("Accept", "application/json")
        .timeout(Duration.ofSeconds(15))
        .GET()
        .build();

HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.statusCode());
System.out.println(response.body());
```

`send()` blocks until the response arrives. `BodyHandlers.ofString()` decodes the response body as text.

---

## Check the Status Code

Do not assume every completed request succeeded. A request can return a valid HTTP response with a failure status such as `404` or `500`.

```java
if (response.statusCode() >= 200 && response.statusCode() < 300) {
    System.out.println("Request succeeded: " + response.body());
} else {
    throw new IllegalStateException(
            "Request failed with status " + response.statusCode());
}
```

---

## Send JSON with POST

Use `BodyPublishers.ofString()` for a text request body and set the `Content-Type` header.

```java
String json = """
        {"name":"Asha","role":"editor"}
        """;

HttpRequest createUser = HttpRequest.newBuilder()
        .uri(URI.create("https://api.example.com/users"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(json))
        .build();

HttpResponse<String> created = client.send(
        createUser, HttpResponse.BodyHandlers.ofString());
```

For production applications, serialize objects with a JSON library rather than constructing JSON strings by hand.

---

## Asynchronous Requests

`sendAsync()` returns a `CompletableFuture`, so your current thread can continue while the request is in progress.

```java
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
        .thenApply(HttpResponse::body)
        .thenAccept(System.out::println)
        .exceptionally(error -> {
            System.err.println("Request failed: " + error.getMessage());
            return null;
        });
```

Avoid calling `join()` immediately after `sendAsync()` unless you intentionally want to wait; otherwise the asynchronous benefit is lost.

---

## Download a File

The file body handler writes the response directly to a `Path`.

```java
import java.nio.file.Path;

HttpRequest download = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com/report.pdf"))
        .build();

HttpResponse<Path> file = client.send(
        download,
        HttpResponse.BodyHandlers.ofFile(Path.of("downloads/report.pdf")));

System.out.println("Saved to " + file.body());
```

Ensure the destination directory exists, and check the status code before treating the saved file as a valid download.

---

## Good Practices

- Reuse a single `HttpClient` instead of creating one for each request.
- Set connection and request timeouts.
- Validate status codes before parsing a response body.
- Never place API keys directly in source code; load them from secure configuration.
- Handle `IOException` and `InterruptedException` from synchronous requests. If interrupted, restore the interrupt flag with `Thread.currentThread().interrupt()`.

### Next Steps ➡️

Use **Virtual Threads** when an application needs to run many independent, blocking HTTP calls concurrently.
