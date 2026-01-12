---
title: "Swift Access Control - Managing Code Visibility"
description: "Master Swift access control including private, fileprivate, internal, public, and open access levels with practical examples"
---

Welcome to Swift Access Control! Access control restricts access to parts of your code from code in other source files and modules. This lets you hide implementation details and specify a preferred interface for your code. In this guide, we'll explore how to use access control to write secure, modular, and maintainable code.

## What is Access Control?

Access control determines which parts of your code can be accessed from other parts. You can assign specific access levels to:
- Individual types (classes, structures, enumerations)
- Properties, methods, initializers, and subscripts
- Protocols and their requirements

**Why Use Access Control?**
- ✅ **Encapsulation** - Hide implementation details
- ✅ **Security** - Protect sensitive code
- ✅ **Modularity** - Create clear interfaces
- ✅ **Organization** - Structure large projects
- ✅ **API Design** - Define public contracts

**Swift's Access Levels (from most restrictive to least):**
1. **private** - Only accessible within the same declaration
2. **fileprivate** - Accessible within the same file
3. **internal** - Accessible within the same module (default)
4. **public** - Accessible from any module
5. **open** - Accessible and subclassable from any module

## Private Access

The most restrictive access level - only accessible within the same scope.

### Basic Private

```swift
class BankAccount {
    private var balance: Double = 0
    
    func deposit(_ amount: Double) {
        balance += amount
        print("Deposited $\(amount). Balance: $\(balance)")
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard amount <= balance else {
            print("Insufficient funds")
            return false
        }
        balance -= amount
        print("Withdrew $\(amount). Balance: $\(balance)")
        return true
    }
    
    // Private helper method
    private func logTransaction(_ type: String, amount: Double) {
        print("[\(type)] $\(amount)")
    }
}

let account = BankAccount()
account.deposit(100)
// account.balance // ❌ Error - balance is private
```

### Private Set

Allow reading but restrict writing:

```swift
class User {
    private(set) var id: String
    var name: String
    
    init(name: String) {
        self.id = UUID().uuidString
        self.name = name
    }
}

let user = User(name: "Alice")
print(user.id)  // ✅ Can read
// user.id = "new-id"  // ❌ Cannot write
user.name = "Alice Smith"  // ✅ Can write
```

### Private Extension

Extensions in the same file can access private members:

```swift
class Calculator {
    private var history: [String] = []
    
    func add(_ a: Int, _ b: Int) -> Int {
        recordOperation("add")
        return a + b
    }
    
    private func recordOperation(_ op: String) {
        history.append(op)
    }
}

extension Calculator {
    func showHistory() {
        // ✅ Can access private history
        print("History: \(history)")
    }
}

let calc = Calculator()
_ = calc.add(5, 3)
calc.showHistory()
```

## Fileprivate Access

Accessible anywhere in the same source file.

### When to Use Fileprivate

```swift
// File: UserManager.swift

fileprivate class UserValidator {
    static func isValid(email: String) -> Bool {
        return email.contains("@")
    }
}

class UserManager {
    func register(email: String) -> Bool {
        // ✅ Can access UserValidator (same file)
        guard UserValidator.isValid(email: email) else {
            return false
        }
        print("✅ User registered with email: \(email)")
        return true
    }
}

// In another file:
// UserValidator.isValid(...) // ❌ Error - not accessible
```

### Fileprivate vs Private

```swift
struct Point {
    private var x: Double
    private var y: Double
    
    init(x: Double, y: Double) {
        self.x = x
        self.y = y
    }
}

extension Point {
    // ❌ Cannot access private x, y here
    // func distanceFromOrigin() -> Double {
    //     return (x * x + y * y).squareRoot()
    // }
}

// Solution: use fileprivate
struct PointFixed {
    fileprivate var x: Double
    fileprivate var y: Double
}

extension PointFixed {
    // ✅ Can access fileprivate x, y
    func distanceFromOrigin() -> Double {
        return (x * x + y * y).squareRoot()
    }
}
```

## Internal Access

The default access level - accessible within the same module.

### Default Behavior

```swift
// These are all internal by default
class DataManager {
    var data: [String] = []
    
    func fetchData() {
        data = ["item1", "item2", "item3"]
    }
}

struct Config {
    var apiKey: String
    var baseURL: String
}
```

### Explicit Internal

```swift
internal class Logger {
    internal func log(_ message: String) {
        print("[LOG] \(message)")
    }
}

// Same as:
class Logger {
    func log(_ message: String) {
        print("[LOG] \(message)")
    }
}
```

## Public Access

Accessible from any module, but cannot be subclassed or overridden outside the module.

### Public API

```swift
public class NetworkClient {
    public var timeout: TimeInterval
    
    public init(timeout: TimeInterval = 30) {
        self.timeout = timeout
    }
    
    public func request(url: String) -> String {
        return "Response from \(url)"
    }
    
    // Internal helper not exposed
    internal func parseResponse(_ data: String) -> [String: Any] {
        return [:]
    }
}
```

### Public with Private Implementation

```swift
public class Cache<Key: Hashable, Value> {
    private var storage: [Key: Value] = [:]
    
    public init() {}
    
    public func get(_ key: Key) -> Value? {
        return storage[key]
    }
    
    public func set(_ key: Key, value: Value) {
        storage[key] = value
    }
    
    public var count: Int {
        return storage.count
    }
}
```

## Open Access

Most permissive - can be subclassed and overridden outside the module.

### Open Class

```swift
// In a framework
open class Vehicle {
    open var speed: Double = 0
    
    public init() {}
    
    open func accelerate() {
        speed += 10
    }
    
    // Can be overridden
    open func description() -> String {
        return "Vehicle moving at \(speed) km/h"
    }
}

// In app using the framework
class Car: Vehicle {  // ✅ Can subclass
    override func accelerate() {  // ✅ Can override
        speed += 20
    }
}
```

### Public vs Open

```swift
// Public - cannot be subclassed outside module
public class Sealed {
    public func method() {}
}

// Open - can be subclassed outside module
open class Extensible {
    open func method() {}
}
```

## Access Control Patterns

### Pattern 1: API Design

```swift
public class APIClient {
    // Public interface
    public static let shared = APIClient()
    
    // Private implementation
    private let baseURL: String
    private var headers: [String: String] = [:]
    
    // Private initializer
    private init() {
        self.baseURL = "https://api.example.com"
    }
    
    // Public methods
    public func get(_ endpoint: String) -> String {
        return makeRequest(endpoint: endpoint, method: "GET")
    }
    
    public func post(_ endpoint: String, data: [String: Any]) -> String {
        return makeRequest(endpoint: endpoint, method: "POST")
    }
    
    // Private helper
    private func makeRequest(endpoint: String, method: String) -> String {
        return "[\(method)] \(baseURL)/\(endpoint)"
    }
}

let response = APIClient.shared.get("users")
// APIClient() // ❌ Cannot create new instance
```

### Pattern 2: Builder Pattern

```swift
public class URLBuilder {
    private var scheme: String = "https"
    private var host: String = ""
    private var path: String = ""
    private var queryItems: [String: String] = [:]
    
    public init() {}
    
    public func setHost(_ host: String) -> URLBuilder {
        self.host = host
        return self
    }
    
    public func setPath(_ path: String) -> URLBuilder {
        self.path = path
        return self
    }
    
    public func addQuery(key: String, value: String) -> URLBuilder {
        queryItems[key] = value
        return self
    }
    
    public func build() -> String {
        var url = "\(scheme)://\(host)\(path)"
        if !queryItems.isEmpty {
            let query = queryItems.map { "\($0.key)=\($0.value)" }.joined(separator: "&")
            url += "?\(query)"
        }
        return url
    }
}

let url = URLBuilder()
    .setHost("api.example.com")
    .setPath("/users")
    .addQuery(key: "page", value: "1")
    .build()
print(url)
```

### Pattern 3: Dependency Injection

```swift
public protocol DataStore {
    func save(key: String, value: String)
    func load(key: String) -> String?
}

internal class UserDefaultsDataStore: DataStore {
    func save(key: String, value: String) {
        print("Saving \(key): \(value)")
    }
    
    func load(key: String) -> String? {
        return "Value for \(key)"
    }
}

public class DataManager {
    private let dataStore: DataStore
    
    public init(dataStore: DataStore) {
        self.dataStore = dataStore
    }
    
    public func saveUser(name: String) {
        dataStore.save(key: "user", value: name)
    }
}
```

## Practical Examples

### Example 1: Secure Credentials Manager

```swift
public class CredentialsManager {
    public static let shared = CredentialsManager()
    
    private var credentials: [String: String] = [:]
    private let encryptionKey = "secret-key"
    
    private init() {
        loadCredentials()
    }
    
    public func store(service: String, credentials: String) {
        let encrypted = encrypt(credentials)
        self.credentials[service] = encrypted
        saveCredentials()
    }
    
    public func retrieve(service: String) -> String? {
        guard let encrypted = credentials[service] else {
            return nil
        }
        return decrypt(encrypted)
    }
    
    private func encrypt(_ text: String) -> String {
        // Simple example - real encryption would be more complex
        return text + encryptionKey
    }
    
    private func decrypt(_ text: String) -> String {
        return text.replacingOccurrences(of: encryptionKey, with: "")
    }
    
    private func loadCredentials() {
        print("Loading credentials...")
    }
    
    private func saveCredentials() {
        print("Saving credentials...")
    }
}

CredentialsManager.shared.store(service: "api", credentials: "token123")
if let token = CredentialsManager.shared.retrieve(service: "api") {
    print("Token: \(token)")
}
```

### Example 2: Validation Framework

```swift
public protocol Validator {
    func validate(_ value: String) -> Bool
    func errorMessage() -> String
}

public class EmailValidator: Validator {
    private let pattern = "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    
    public init() {}
    
    public func validate(_ value: String) -> Bool {
        let predicate = NSPredicate(format: "SELF MATCHES %@", pattern)
        return predicate.evaluate(with: value)
    }
    
    public func errorMessage() -> String {
        return "Invalid email format"
    }
}

public class PasswordValidator: Validator {
    private let minLength: Int
    
    public init(minLength: Int = 8) {
        self.minLength = minLength
    }
    
    public func validate(_ value: String) -> Bool {
        return value.count >= minLength &&
               value.contains(where: { $0.isUppercase }) &&
               value.contains(where: { $0.isNumber })
    }
    
    public func errorMessage() -> String {
        return "Password must be at least \(minLength) characters and contain uppercase and numbers"
    }
}

public class FormValidator {
    private var validators: [String: [Validator]] = [:]
    
    public init() {}
    
    public func addValidator(for field: String, validator: Validator) {
        if validators[field] == nil {
            validators[field] = []
        }
        validators[field]?.append(validator)
    }
    
    public func validate(field: String, value: String) -> (Bool, String?) {
        guard let fieldValidators = validators[field] else {
            return (true, nil)
        }
        
        for validator in fieldValidators {
            if !validator.validate(value) {
                return (false, validator.errorMessage())
            }
        }
        
        return (true, nil)
    }
}

let formValidator = FormValidator()
formValidator.addValidator(for: "email", validator: EmailValidator())
formValidator.addValidator(for: "password", validator: PasswordValidator(minLength: 10))

let (emailValid, emailError) = formValidator.validate(field: "email", value: "test@example.com")
print(emailValid ? "✅ Email valid" : "❌ \(emailError!)")
```

### Example 3: Logger with Levels

```swift
public enum LogLevel: Int {
    case debug = 0
    case info = 1
    case warning = 2
    case error = 3
    
    fileprivate var prefix: String {
        switch self {
        case .debug: return "🔍 DEBUG"
        case .info: return "ℹ️ INFO"
        case .warning: return "⚠️ WARNING"
        case .error: return "❌ ERROR"
        }
    }
}

public class Logger {
    public static let shared = Logger()
    
    private var minLevel: LogLevel = .debug
    private var logHistory: [String] = []
    
    private init() {}
    
    public func setMinLevel(_ level: LogLevel) {
        minLevel = level
    }
    
    public func debug(_ message: String) {
        log(message, level: .debug)
    }
    
    public func info(_ message: String) {
        log(message, level: .info)
    }
    
    public func warning(_ message: String) {
        log(message, level: .warning)
    }
    
    public func error(_ message: String) {
        log(message, level: .error)
    }
    
    private func log(_ message: String, level: LogLevel) {
        guard level.rawValue >= minLevel.rawValue else { return }
        
        let logMessage = "\(level.prefix): \(message)"
        print(logMessage)
        logHistory.append(logMessage)
    }
    
    public func getHistory() -> [String] {
        return logHistory
    }
}

Logger.shared.setMinLevel(.info)
Logger.shared.debug("This won't appear")  // Below min level
Logger.shared.info("App started")
Logger.shared.warning("Low memory")
Logger.shared.error("Network failed")
```

## Best Practices

### 1. Use Least Privilege Principle

```swift
// ✅ Good - restrict access by default
public class Service {
    private var config: Config
    private var cache: Cache
    
    public func performTask() {
        // Public interface
    }
    
    private func helper() {
        // Internal implementation
    }
}

// ❌ Bad - everything public
public class Service {
    public var config: Config
    public var cache: Cache
    public func helper() {}
}
```

### 2. Design Clear APIs

```swift
// ✅ Good - clear public API
public class PaymentProcessor {
    public func process(amount: Double) -> Bool {
        guard validate(amount) else { return false }
        return charge(amount)
    }
    
    private func validate(_ amount: Double) -> Bool {
        return amount > 0
    }
    
    private func charge(_ amount: Double) -> Bool {
        return true
    }
}
```

### 3. Use private(set) for Controlled Mutation

```swift
// ✅ Good
public class Counter {
    private(set) var count = 0
    
    public func increment() {
        count += 1
    }
}

// Users can read but not write directly
let counter = Counter()
print(counter.count)  // ✅ Read
counter.increment()   // ✅ Controlled mutation
// counter.count = 100 // ❌ Cannot write
```

### 4. Group Related Access Levels

```swift
// ✅ Good - grouped access levels
public class DataManager {
    // MARK: - Public API
    public func fetchData() {}
    public func saveData() {}
    
    // MARK: - Internal Helpers
    internal func processData() {}
    
    // MARK: - Private Implementation
    private var cache: [String: Any] = [:]
    private func updateCache() {}
}
```

## Summary

Access control is essential for code organization:

**Access Levels** 🔒
- **private** - Same declaration only
- **fileprivate** - Same file
- **internal** - Same module (default)
- **public** - Any module (no subclassing)
- **open** - Any module (with subclassing)

**Key Concepts** 🎯
- Encapsulation hides implementation
- APIs define public interfaces
- Least privilege by default
- private(set) for read-only

**Best Practices** ⭐
- Restrict by default
- Clear public APIs
- Use private(set) appropriately
- Group by access level

## Next Steps

**Fantastic progress!** 🎉

**Coming next:**
- Memory Management (ARC)
- Automatic Reference Counting
- Strong, weak, and unowned references
- Reference cycles and how to break them

## Practice Exercises

1. Create a secure password manager class
2. Build a validation framework with clear API
3. Design a logging system with access control
4. Implement a data store with private storage
5. Create an API client with public interface
6. Build a configuration manager

---

**Master access control to write secure, maintainable code!** 🔐

*Remember: Make everything as private as possible, as public as necessary!*
