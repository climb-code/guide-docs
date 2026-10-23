---
title: MCP Interview Questions and Answers
description: Practical Model Context Protocol interview questions covering architecture, tools, resources, prompts, transports, authorization, and security.
---

These questions cover the Model Context Protocol (MCP), an open protocol for connecting AI applications to external tools and context. The answers focus on stable concepts; exact capabilities and transport behavior can vary by protocol revision and client or SDK implementation. Check the linked specification when discussing version-specific details.

## Fundamentals

### 1. What is the Model Context Protocol (MCP)?

MCP is an open protocol that standardizes how an AI application connects to external data sources and capabilities. It defines how clients and servers discover and exchange context or invoke functions, so each integration does not need a separate custom interface.

Reference: [MCP specification overview][overview].

### 2. What are the main components in an MCP architecture?

An MCP **host** is the AI application the user interacts with. The host manages one or more **clients**, and each client maintains a connection to an **MCP server**. A server exposes capabilities such as tools, resources, or prompts. A server may run locally or remotely, depending on the supported transport and deployment.

Reference: [MCP architecture][architecture].

### 3. What is the difference between an MCP host, client, and server?

The host owns the user experience and coordinates model interactions. The client handles protocol communication with a particular server. The server implements and exposes capabilities, such as searching a knowledge base or creating an issue. A host can connect to several servers through separate clients.

Reference: [MCP architecture][architecture].

### 4. What are MCP tools, resources, and prompts?

- **Tools** are callable operations, such as querying a service or creating a record.
- **Resources** are data the application can retrieve or provide as context, such as a document or database record.
- **Prompts** are reusable prompt templates or workflows that a user or application can select.

They differ in purpose and control flow: tools perform operations, resources expose context, and prompts package reusable instructions.

Reference: [Server features overview][overview].

### 5. How does a client discover and call a tool?

The client asks the server for its available tools and their descriptions and input schemas. The model can use that information to select an appropriate tool and produce arguments. The client sends the tool call to the server, which validates and executes it, then returns a structured result or an error. A capable client should present consequential actions for user approval according to its policy.

Reference: [MCP tools][tools].

### 6. How are MCP tool inputs described?

Tools publish an input schema, commonly expressed with JSON Schema. The client can use it to validate arguments and help the model form a well-shaped request. Schema validation checks structure and types; the server must still validate business rules, permissions, and any untrusted values before acting.

Reference: [MCP tools][tools].

## Integration and design

### 7. How does MCP differ from a direct API integration?

A direct integration usually couples an application to a particular API and its conventions. MCP provides a shared protocol and capability-discovery model between the AI application and an integration server. The server may call one or more underlying APIs, while the host can use a consistent protocol client. MCP does not replace those APIs or remove the need to design their authorization and error handling.

### 8. What transports does MCP support?

MCP defines **stdio** for communication with a locally launched process and **Streamable HTTP** for communication with an HTTP server. The choice depends on deployment, security boundaries, and client support. Check the protocol revision and implementation documentation when discussing details such as sessions or authentication, because those can change between revisions.

Reference: [MCP transports][transports].

### 9. When would you expose a capability as a tool versus a resource?

Use a resource when the primary need is to make identifiable data available as context, such as a project document. Use a tool when the model needs to request an operation, such as searching with filters or updating a ticket. Some systems need both: a resource for reading a record and a tool for changing it.

Reference: [MCP server features][overview].

### 10. How would you design a good MCP tool?

Give it one clear purpose, a stable and descriptive name, a concise description that explains when to use it, and a precise input schema. Return useful, bounded results and actionable errors. Make side effects explicit, enforce authorization on the server, and consider idempotency and confirmation for high-impact operations.

### 11. How should an MCP server handle errors?

Return protocol-level errors for invalid requests or failed protocol operations, and clear tool results for errors that occur during a valid tool call, following the applicable specification and SDK. Avoid leaking secrets or internal stack traces. Include enough safe context for a client or user to understand whether retrying or changing the input may help.

## Security and operations

### 12. How does authorization work for a remote MCP server?

Authorization depends on the transport and protocol version. For HTTP-based deployments, MCP defines an OAuth-based authorization model. The client obtains a token for the protected resource and sends it to the server; the server validates the token and enforces scopes or permissions. A server should not accept a token intended for a different resource or forward it blindly to an upstream service.

Reference: [MCP authorization][authorization].

### 13. What are common security risks when using MCP?

Risks include granting a tool broader access than needed, executing a destructive action without user awareness, exposing secrets in logs or tool output, trusting malicious content returned by a server, and connecting to an untrusted server. Mitigate them with least-privilege credentials, server-side authorization, input validation, careful handling of tool results, trusted server configuration, and user confirmation for consequential actions.

Reference: [MCP security best practices][security].

### 14. How would you prevent prompt injection through MCP resources or tool results?

Treat returned content as untrusted data, even when it comes from a connected server. Keep data separate from system instructions, limit which tools can act on that data, validate any proposed action on the server, and require user confirmation where appropriate. Do not let instructions embedded in a document or tool result override the host's policy.

### 15. What should you monitor in a production MCP integration?

Track connection and tool-call success rates, latency, timeouts, validation failures, authorization denials, and upstream service errors. Log request identifiers and safe operational metadata, but redact credentials and sensitive content. Add timeouts and cancellation, bound result sizes, and define retry behavior carefully so retries do not duplicate side effects.

### 16. How would you debug a tool that appears in discovery but fails when called?

Check that the client and server agree on protocol version and capabilities, then compare the submitted arguments with the published schema. Inspect server-side validation and authorization, transport and upstream errors, and the returned protocol or tool error. Use sanitized logs or tracing to follow one request end to end, and reproduce with a minimal input.

## Interview practice

When answering design questions, describe the user task first, then explain which capability (tool, resource, or prompt) fits and why. Walk through discovery, authorization, validation, execution, and error handling. For a security question, name the trust boundary and explain which component enforces the control.

[overview]: https://modelcontextprotocol.io/specification/draft/server/index
[architecture]: https://modelcontextprotocol.io/docs/learn/architecture
[tools]: https://modelcontextprotocol.io/specification/draft/server/tools
[transports]: https://modelcontextprotocol.io/specification/draft/basic/transports
[authorization]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[security]: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
