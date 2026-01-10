---
title: "Swift Error Handling - Managing Errors Gracefully"
description: "Master Swift error handling including throwing functions, do-catch statements, try variants, and converting errors to optionals"
---

Welcome to Swift Error Handling! Error handling is the process of responding to and recovering from error conditions in your program. Swift provides first-class support for throwing, catching, propagating, and manipulating recoverable errors at runtime. In this guide, we'll explore how to handle errors elegantly and make your code more robust.

## What is Error Handling?

Error handling allows you to determine the cause of a failure and propagate it to another part of your program. When a function encounters an error, it can "throw" an error, which you can then "catch" and handle appropriately.

**Why Use Error Handling?**
- ✅ **Graceful Failures** - Handle errors without crashing
- ✅ **Clear Communication** - Express what went wrong
- ✅ **Propagation** - Pass errors up the call stack
- ✅ **Recovery** - Attempt alternative solutions
- ✅ **User Experience** - Show meaningful error messages

**Swift's Approach:**
- Compile-time safety with `throws` keyword
- Type-safe errors with `Error` protocol
- Multiple ways to handle: `do-catch`, `try?`, `try!`
- Clean, readable syntax

## Representing Errors

Errors are represented by types that conform to the `Error` protocol.

### Basic Error Enum

```swift
enum FileError: Error {
    case fileNotFound
    case permissionDenied
    case diskFull
}

enum NetworkError: Error {
    case noConnection
    case timeout
    case serverError(code: Int)
}

enum ValidationError: Error {
    case emptyField
    case invalidFormat
    case tooShort(minimum: Int)
    case tooLong(maximum: Int)
}
```

### Error with Associated Values

```swift
enum LoginError: Error {
    case invalidCredentials
    case accountLocked(until: Date)
    case tooManyAttempts(retry: Int)
    case networkError(String)
}
```

### Error with Custom Messages

```swift
enum DataError: Error {
    case invalidData
    case corruptedFile
    case unsupportedFormat
    
    var localizedDescription: String {
        switch self {
        case .invalidData:
            return "The data is invalid or malformed"
        case .corruptedFile:
            return "The file appears to be corrupted"
        case .unsupportedFormat:
            return "This file format is not supported"
        }
    }
}
```

## Throwing Functions

Functions that can fail are marked with the `throws` keyword.

### Basic Throwing Function

```swift
func divide(_ a: Int, by b: Int) throws -> Int {
    guard b != 0 else {
        throw NSError(domain: "MathError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Division by zero"])
    }
    return a / b
}

// To call a throwing function, use try
do {
    let result = try divide(10, by: 2)
    print("Result: \(result)")  // Result: 5
} catch {
    print("Error: \(error)")
}
```

### Throwing Function with Custom Error

```swift
enum MathError: Error {
    case divisionByZero
    case negativeSqrt
}

func sqrt(_ number: Double) throws -> Double {
    guard number >= 0 else {
        throw MathError.negativeSqrt
    }
    return number.squareRoot()
}

do {
    let result = try sqrt(16)
    print("Square root: \(result)")  // Square root: 4.0
} catch MathError.negativeSqrt {
    print("Cannot calculate square root of negative number")
} catch {
    print("Unknown error: \(error)")
}
```

### Multiple Throwing Points

```swift
enum ValidationError: Error {
    case emptyString
    case tooShort
    case noUppercase
}

func validatePassword(_ password: String) throws {
    guard !password.isEmpty else {
        throw ValidationError.emptyString
    }
    
    guard password.count >= 8 else {
        throw ValidationError.tooShort
    }
    
    guard password.contains(where: { $0.isUppercase }) else {
        throw ValidationError.noUppercase
    }
    
    print("✅ Password is valid")
}

do {
    try validatePassword("Pass123")
    print("Password accepted")
} catch ValidationError.emptyString {
    print("❌ Password cannot be empty")
} catch ValidationError.tooShort {
    print("❌ Password must be at least 8 characters")
} catch ValidationError.noUppercase {
    print("❌ Password must contain uppercase letter")
} catch {
    print("❌ Unknown error")
}
```

## Do-Catch Statements

The `do-catch` statement handles errors by running a block of code.

### Basic Do-Catch

```swift
enum FileError: Error {
    case notFound
    case permissionDenied
}

func readFile(_ name: String) throws -> String {
    if name.isEmpty {
        throw FileError.notFound
    }
    return "File contents"
}

do {
    let contents = try readFile("data.txt")
    print(contents)
} catch {
    print("Failed to read file: \(error)")
}
```

### Multiple Catch Blocks

```swift
enum NetworkError: Error {
    case noConnection
    case timeout
    case serverError(code: Int)
}

func fetchData() throws -> String {
    // Simulate network error
    throw NetworkError.timeout
}

do {
    let data = try fetchData()
    print("Data: \(data)")
} catch NetworkError.noConnection {
    print("❌ No internet connection")
} catch NetworkError.timeout {
    print("⏱️ Request timed out")
} catch NetworkError.serverError(let code) {
    print("🔴 Server error: \(code)")
} catch {
    print("❓ Unknown error: \(error)")
}
```

### Pattern Matching in Catch

```swift
enum AppError: Error {
    case configuration
    case network(String)
    case database(code: Int)
}

func performOperation() throws {
    throw AppError.network("Connection lost")
}

do {
    try performOperation()
} catch AppError.configuration {
    print("Configuration error")
} catch AppError.network(let message) {
    print("Network error: \(message)")
} catch AppError.database(let code) where code == 404 {
    print("Resource not found")
} catch AppError.database(let code) {
    print("Database error: \(code)")
} catch {
    print("Other error")
}
```

## Try Variants

Swift provides different ways to handle errors with `try`.

### try? - Converting to Optional

Convert errors to `nil`:

```swift
func loadImage(_ name: String) throws -> String {
    guard !name.isEmpty else {
        throw FileError.notFound
    }
    return "🖼️ Image: \(name)"
}

// Returns nil if error occurs
let image1 = try? loadImage("photo.jpg")
print(image1 ?? "No image")  // 🖼️ Image: photo.jpg

let image2 = try? loadImage("")
print(image2 ?? "No image")  // No image
```

### try! - Force Try

Use when you're absolutely certain an error won't occur:

```swift
func loadResource() throws -> String {
    return "Resource loaded"
}

// ⚠️ Crashes if error occurs!
let resource = try! loadResource()
print(resource)  // Resource loaded

// ❌ Only use when you're 100% certain it won't fail
```

### When to Use Each

```swift
// ✅ Use do-catch for detailed error handling
do {
    let data = try fetchData()
    process(data)
} catch NetworkError.timeout {
    retry()
} catch NetworkError.noConnection {
    showOfflineMode()
} catch {
    showError(error)
}

// ✅ Use try? when you don't care about the specific error
if let data = try? fetchData() {
    process(data)
} else {
    useDefaultData()
}

// ⚠️ Use try! only when failure is impossible
let bundleResource = try! loadBundledResource()
```

## Propagating Errors

Functions can propagate errors to their callers.

### Basic Propagation

```swift
enum DataError: Error {
    case invalid
    case corrupted
}

func loadData() throws -> String {
    throw DataError.invalid
}

func processData() throws -> String {
    let data = try loadData()  // Propagates error
    return data.uppercased()
}

do {
    let result = try processData()
    print(result)
} catch {
    print("Error in processing: \(error)")
}
// Output: Error in processing: invalid
```

### Rethrowing Functions

Functions that take throwing closures:

```swift
func execute(_ closure: () throws -> Void) rethrows {
    try closure()
}

func riskyOperation() throws {
    throw NSError(domain: "Error", code: 1)
}

do {
    try execute {
        try riskyOperation()
    }
} catch {
    print("Caught error: \(error)")
}
```

## Defer Statements

Ensure code runs before leaving scope:

```swift
func processFile(_ filename: String) throws {
    print("Opening file...")
    
    defer {
        print("Closing file...")
    }
    
    print("Processing file...")
    
    if filename.isEmpty {
        throw FileError.notFound
    }
    
    print("File processed successfully")
}

do {
    try processFile("data.txt")
} catch {
    print("Error: \(error)")
}
// Output:
// Opening file...
// Processing file...
// File processed successfully
// Closing file...
```

### Multiple Defer Statements

They execute in reverse order (LIFO):

```swift
func cleanup() {
    defer { print("1. First defer") }
    defer { print("2. Second defer") }
    defer { print("3. Third defer") }
    print("4. Function body")
}

cleanup()
// Output:
// 4. Function body
// 3. Third defer
// 2. Second defer
// 1. First defer
```

## Practical Examples

### Example 1: User Authentication

```swift
enum AuthError: Error {
    case invalidEmail
    case weakPassword
    case userExists
    case networkError
}

struct User {
    let email: String
    let password: String
}

class AuthService {
    private var users: [String: String] = [:]
    
    func register(email: String, password: String) throws -> User {
        // Validate email
        guard email.contains("@") && email.contains(".") else {
            throw AuthError.invalidEmail
        }
        
        // Validate password
        guard password.count >= 8 else {
            throw AuthError.weakPassword
        }
        
        // Check if user exists
        guard users[email] == nil else {
            throw AuthError.userExists
        }
        
        // Create user
        users[email] = password
        return User(email: email, password: password)
    }
    
    func login(email: String, password: String) throws -> User {
        guard let storedPassword = users[email] else {
            throw AuthError.invalidEmail
        }
        
        guard storedPassword == password else {
            throw AuthError.weakPassword
        }
        
        return User(email: email, password: password)
    }
}

let auth = AuthService()

// Register
do {
    let user = try auth.register(email: "alice@example.com", password: "SecurePass123")
    print("✅ Registered: \(user.email)")
} catch AuthError.invalidEmail {
    print("❌ Invalid email format")
} catch AuthError.weakPassword {
    print("❌ Password must be at least 8 characters")
} catch AuthError.userExists {
    print("❌ User already exists")
} catch {
    print("❌ Registration failed: \(error)")
}

// Login
do {
    let user = try auth.login(email: "alice@example.com", password: "SecurePass123")
    print("✅ Logged in: \(user.email)")
} catch {
    print("❌ Login failed")
}
```

### Example 2: File Operations

```swift
enum FileError: Error {
    case notFound
    case permissionDenied
    case corrupted
    case diskFull
}

class FileManager {
    func read(file: String) throws -> String {
        guard !file.isEmpty else {
            throw FileError.notFound
        }
        
        // Simulate file reading
        return "File contents: \(file)"
    }
    
    func write(file: String, content: String) throws {
        guard !file.isEmpty else {
            throw FileError.notFound
        }
        
        guard content.count < 1000 else {
            throw FileError.diskFull
        }
        
        print("✅ Written \(content.count) bytes to \(file)")
    }
    
    func delete(file: String) throws {
        guard !file.isEmpty else {
            throw FileError.notFound
        }
        
        print("🗑️ Deleted \(file)")
    }
}

let fm = FileManager()

do {
    let content = try fm.read(file: "data.txt")
    print(content)
    
    try fm.write(file: "output.txt", content: "Hello, World!")
    try fm.delete(file: "temp.txt")
} catch FileError.notFound {
    print("File not found")
} catch FileError.permissionDenied {
    print("Permission denied")
} catch FileError.diskFull {
    print("Disk is full")
} catch {
    print("File operation failed: \(error)")
}
```

### Example 3: Network Request

```swift
enum NetworkError: Error {
    case invalidURL
    case noConnection
    case timeout
    case serverError(code: Int)
    case invalidResponse
}

struct APIClient {
    func fetch(url: String) throws -> String {
        // Validate URL
        guard !url.isEmpty else {
            throw NetworkError.invalidURL
        }
        
        // Simulate network request
        let statusCode = 200
        
        guard statusCode == 200 else {
            throw NetworkError.serverError(code: statusCode)
        }
        
        return "{ \"data\": \"response\" }"
    }
    
    func fetchWithRetry(url: String, maxRetries: Int = 3) throws -> String {
        var lastError: NetworkError?
        
        for attempt in 1...maxRetries {
            do {
                return try fetch(url: url)
            } catch let error as NetworkError {
                lastError = error
                print("Attempt \(attempt) failed: \(error)")
                
                if attempt < maxRetries {
                    print("Retrying...")
                }
            }
        }
        
        throw lastError ?? NetworkError.invalidResponse
    }
}

let client = APIClient()

do {
    let response = try client.fetchWithRetry(url: "https://api.example.com/data")
    print("Response: \(response)")
} catch NetworkError.invalidURL {
    print("Invalid URL")
} catch NetworkError.noConnection {
    print("No internet connection")
} catch NetworkError.timeout {
    print("Request timed out")
} catch NetworkError.serverError(let code) {
    print("Server error: \(code)")
} catch {
    print("Request failed: \(error)")
}
```

### Example 4: JSON Parsing

```swift
enum JSONError: Error {
    case invalidData
    case missingKey(String)
    case typeMismatch(expected: String, got: String)
}

struct JSONParser {
    func parse(_ json: [String: Any]) throws -> User {
        guard let id = json["id"] as? String else {
            throw JSONError.missingKey("id")
        }
        
        guard let name = json["name"] as? String else {
            throw JSONError.missingKey("name")
        }
        
        guard let age = json["age"] as? Int else {
            if json["age"] != nil {
                throw JSONError.typeMismatch(expected: "Int", got: type(of: json["age"]!))
            }
            throw JSONError.missingKey("age")
        }
        
        return User(id: id, name: name, age: age)
    }
}

struct User {
    let id: String
    let name: String
    let age: Int
}

let parser = JSONParser()

let validJSON: [String: Any] = [
    "id": "123",
    "name": "Alice",
    "age": 25
]

do {
    let user = try parser.parse(validJSON)
    print("✅ Parsed user: \(user.name), age \(user.age)")
} catch JSONError.missingKey(let key) {
    print("❌ Missing required key: \(key)")
} catch JSONError.typeMismatch(let expected, let got) {
    print("❌ Type mismatch: expected \(expected), got \(got)")
} catch {
    print("❌ Parsing failed: \(error)")
}
```

### Example 5: Database Operations

```swift
enum DatabaseError: Error {
    case connectionFailed
    case queryFailed(String)
    case recordNotFound
    case duplicateRecord
}

class Database {
    private var records: [String: [String: Any]] = [:]
    
    func connect() throws {
        // Simulate connection
        print("📡 Connected to database")
    }
    
    func insert(id: String, data: [String: Any]) throws {
        guard records[id] == nil else {
            throw DatabaseError.duplicateRecord
        }
        
        records[id] = data
        print("✅ Inserted record: \(id)")
    }
    
    func find(id: String) throws -> [String: Any] {
        guard let record = records[id] else {
            throw DatabaseError.recordNotFound
        }
        
        return record
    }
    
    func update(id: String, data: [String: Any]) throws {
        guard records[id] != nil else {
            throw DatabaseError.recordNotFound
        }
        
        records[id] = data
        print("✅ Updated record: \(id)")
    }
    
    func delete(id: String) throws {
        guard records[id] != nil else {
            throw DatabaseError.recordNotFound
        }
        
        records.removeValue(forKey: id)
        print("🗑️ Deleted record: \(id)")
    }
}

let db = Database()

do {
    try db.connect()
    try db.insert(id: "1", data: ["name": "Alice", "age": 25])
    
    let record = try db.find(id: "1")
    print("Found: \(record)")
    
    try db.update(id: "1", data: ["name": "Alice", "age": 26])
    try db.delete(id: "1")
    
} catch DatabaseError.connectionFailed {
    print("Failed to connect to database")
} catch DatabaseError.recordNotFound {
    print("Record not found")
} catch DatabaseError.duplicateRecord {
    print("Record already exists")
} catch DatabaseError.queryFailed(let query) {
    print("Query failed: \(query)")
} catch {
    print("Database error: \(error)")
}
```

## Best Practices

### 1. Use Descriptive Error Types

```swift
// ✅ Good - descriptive
enum ValidationError: Error {
    case emptyEmail
    case invalidEmailFormat
    case passwordTooShort
}

// ❌ Bad - vague
enum Error {
    case error1
    case error2
}
```

### 2. Provide Error Context

```swift
// ✅ Good - provides context
enum DataError: Error {
    case invalidFormat(expected: String, got: String)
    case sizeLimitExceeded(limit: Int, actual: Int)
}

// ❌ Bad - no context
enum DataError: Error {
    case invalid
    case tooLarge
}
```

### 3. Use try? for Optional Results

```swift
// ✅ Good for optional results
let data = try? loadData()
if let data = data {
    process(data)
}

// ❌ Overusing do-catch
do {
    let data = try loadData()
    process(data)
} catch {
    // Ignore
}
```

### 4. Clean Up with defer

```swift
// ✅ Always clean up
func processFile() throws {
    let file = openFile()
    defer { closeFile(file) }
    
    try processContents(file)
}
```

### 5. Don't Silence Errors

```swift
// ❌ Silencing errors
_ = try? riskyOperation()

// ✅ Handle or propagate
if let result = try? riskyOperation() {
    process(result)
} else {
    handleFailure()
}
```

## Summary

Error handling makes your code robust and user-friendly:

**Error Types** 🎯
- Conform to Error protocol
- Use enums for error cases
- Add associated values for context

**Throwing Functions** 🚀
- Mark with `throws` keyword
- Use `throw` to raise errors
- Propagate errors up the stack

**Handling Errors** 🛡️
- `do-catch` for detailed handling
- `try?` for optional results
- `try!` when absolutely safe
- Pattern matching in catch

**Defer** 🧹
- Always executes before leaving scope
- Perfect for cleanup
- Executes in reverse order (LIFO)

**Best Practices** ⭐
- Descriptive error types
- Provide context
- Clean up resources
- Don't silence errors

## Next Steps

**Coming up next:**
- Topic 21: Type Casting
- Checking and casting types
- Any and AnyObject
- Type checking with `is`
- Downcasting with `as?` and `as!`

## Practice Exercises

1. Create a form validation system with multiple error types
2. Build a file system wrapper with proper error handling
3. Implement a network client with retry logic
4. Create a calculator that handles division by zero and overflow
5. Build a user registration system with validation
6. Implement a data parser with detailed error messages

---

**Master error handling to build robust, reliable apps!** 🛡️

*Remember: Good error handling is about helping users understand and recover from failures!*
