---
title: "Working with JSON in Swift"
description: "Master JSON encoding and decoding in Swift using the Codable protocol"
---

JSON (JavaScript Object Notation) is the most common data format for exchanging information between servers and mobile apps. Swift makes working with JSON incredibly easy through the powerful **Codable** protocol. In this guide, you'll learn how to convert Swift objects to JSON and vice versa.

## What is Codable?

`Codable` is a type alias that combines two protocols:
- **`Encodable`** - Converts Swift objects to external representations (like JSON)
- **`Decodable`** - Converts external representations (like JSON) to Swift objects

```swift
typealias Codable = Encodable & Decodable
```

## Basic JSON Decoding

### Simple Example

Let's start with a basic example of decoding JSON into a Swift struct:

```swift
// JSON string
let jsonString = """
{
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com"
}
"""

// Define a Codable struct
struct User: Codable {
    let name: String
    let age: Int
    let email: String
}

// Convert JSON string to Data
let jsonData = jsonString.data(using: .utf8)!

// Decode JSON to User object
let decoder = JSONDecoder()
do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)   // Output: John Doe
    print(user.age)    // Output: 30
    print(user.email)  // Output: john@example.com
} catch {
    print("Error decoding JSON: \(error)")
}
```

### How It Works

1. **Define a struct** that conforms to `Codable`
2. **Match property names** to JSON keys (Swift does this automatically)
3. **Use JSONDecoder()** to convert JSON data to your struct
4. **Handle errors** with do-catch since decoding can fail

## Basic JSON Encoding

Converting Swift objects to JSON is just as easy:

```swift
struct User: Codable {
    let name: String
    let age: Int
    let email: String
}

let user = User(name: "Jane Smith", age: 25, email: "jane@example.com")

// Encode User object to JSON
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted // Makes JSON readable

do {
    let jsonData = try encoder.encode(user)
    if let jsonString = String(data: jsonData, encoding: .utf8) {
        print(jsonString)
    }
} catch {
    print("Error encoding JSON: \(error)")
}
```

**Output:**
```json
{
  "name" : "Jane Smith",
  "age" : 25,
  "email" : "jane@example.com"
}
```

## Custom Coding Keys

Sometimes JSON keys don't match Swift naming conventions (camelCase). Use `CodingKeys` to map between them:

```swift
let jsonString = """
{
    "full_name": "Alice Johnson",
    "user_age": 28,
    "email_address": "alice@example.com"
}
"""

struct User: Codable {
    let fullName: String
    let userAge: Int
    let emailAddress: String
    
    // Map Swift property names to JSON keys
    enum CodingKeys: String, CodingKey {
        case fullName = "full_name"
        case userAge = "user_age"
        case emailAddress = "email_address"
    }
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.fullName)      // Output: Alice Johnson
    print(user.userAge)       // Output: 28
    print(user.emailAddress)  // Output: alice@example.com
} catch {
    print("Error: \(error)")
}
```

## Working with Optional Values

JSON often contains optional fields. Handle them with Swift optionals:

```swift
let jsonString = """
{
    "name": "Bob Wilson",
    "age": 35,
    "phone": "+1-555-1234"
}
"""

struct User: Codable {
    let name: String
    let age: Int
    let email: String?     // Optional - might not be in JSON
    let phone: String?     // Optional - might not be in JSON
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)   // Output: Bob Wilson
    print(user.age)    // Output: 35
    print(user.email ?? "No email")   // Output: No email
    print(user.phone ?? "No phone")   // Output: +1-555-1234
} catch {
    print("Error: \(error)")
}
```

## Nested JSON Objects

Handle complex nested JSON structures:

```swift
let jsonString = """
{
    "name": "Charlie Brown",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
    }
}
"""

struct Address: Codable {
    let street: String
    let city: String
    let zipCode: String
}

struct User: Codable {
    let name: String
    let address: Address  // Nested object
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)               // Output: Charlie Brown
    print(user.address.street)     // Output: 123 Main St
    print(user.address.city)       // Output: New York
    print(user.address.zipCode)    // Output: 10001
} catch {
    print("Error: \(error)")
}
```

## Working with Arrays

Decode JSON arrays into Swift arrays:

```swift
let jsonString = """
[
    {
        "name": "Alice",
        "age": 28
    },
    {
        "name": "Bob",
        "age": 35
    },
    {
        "name": "Charlie",
        "age": 42
    }
]
"""

struct User: Codable {
    let name: String
    let age: Int
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let users = try decoder.decode([User].self, from: jsonData)
    for user in users {
        print("\(user.name) is \(user.age) years old")
    }
} catch {
    print("Error: \(error)")
}
```

**Output:**
```
Alice is 28 years old
Bob is 35 years old
Charlie is 42 years old
```

## Handling Dates

JSON doesn't have a native date format. Swift provides several strategies for handling dates:

### ISO 8601 Date Format

```swift
let jsonString = """
{
    "name": "David",
    "birthDate": "1990-05-15T10:30:00Z"
}
"""

struct User: Codable {
    let name: String
    let birthDate: Date
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601  // Set date format

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)       // Output: David
    print(user.birthDate)  // Output: Date object
} catch {
    print("Error: \(error)")
}
```

### Unix Timestamp

```swift
let jsonString = """
{
    "name": "Eve",
    "createdAt": 1609459200
}
"""

struct User: Codable {
    let name: String
    let createdAt: Date
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .secondsSince1970  // Unix timestamp

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)
    print(user.createdAt)
} catch {
    print("Error: \(error)")
}
```

### Custom Date Format

```swift
let jsonString = """
{
    "name": "Frank",
    "birthDate": "15/05/1990"
}
"""

struct User: Codable {
    let name: String
    let birthDate: Date
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

// Custom date formatter
let dateFormatter = DateFormatter()
dateFormatter.dateFormat = "dd/MM/yyyy"
decoder.dateDecodingStrategy = .formatted(dateFormatter)

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)
    print(user.birthDate)
} catch {
    print("Error: \(error)")
}
```

## Default Values

Provide default values for missing JSON fields:

```swift
let jsonString = """
{
    "name": "Grace"
}
"""

struct User: Codable {
    let name: String
    let age: Int
    let isActive: Bool
    
    // Custom initializer for defaults
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        name = try container.decode(String.self, forKey: .name)
        age = try container.decodeIfPresent(Int.self, forKey: .age) ?? 18
        isActive = try container.decodeIfPresent(Bool.self, forKey: .isActive) ?? true
    }
    
    enum CodingKeys: String, CodingKey {
        case name, age, isActive
    }
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)      // Output: Grace
    print(user.age)       // Output: 18 (default)
    print(user.isActive)  // Output: true (default)
} catch {
    print("Error: \(error)")
}
```

## Custom Encoding/Decoding

For complete control over JSON conversion, implement custom logic:

```swift
struct Temperature: Codable {
    let celsius: Double
    
    // Store as Fahrenheit in JSON
    init(celsius: Double) {
        self.celsius = celsius
    }
    
    // Custom encoding to Fahrenheit
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        let fahrenheit = celsius * 9/5 + 32
        try container.encode(fahrenheit)
    }
    
    // Custom decoding from Fahrenheit
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let fahrenheit = try container.decode(Double.self)
        celsius = (fahrenheit - 32) * 5/9
    }
}

// Encoding
let temp = Temperature(celsius: 25)
let encoder = JSONEncoder()
let jsonData = try! encoder.encode(temp)
print(String(data: jsonData, encoding: .utf8)!)  // Output: 77.0 (Fahrenheit)

// Decoding
let decoder = JSONDecoder()
let decodedTemp = try! decoder.decode(Temperature.self, from: jsonData)
print(decodedTemp.celsius)  // Output: 25.0
```

## Error Handling

Always handle potential decoding errors:

```swift
let jsonString = """
{
    "name": "Henry",
    "age": "invalid"
}
"""

struct User: Codable {
    let name: String
    let age: Int
}

let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user.name)
} catch DecodingError.typeMismatch(let type, let context) {
    print("Type mismatch for \(type): \(context.debugDescription)")
} catch DecodingError.keyNotFound(let key, let context) {
    print("Key '\(key)' not found: \(context.debugDescription)")
} catch DecodingError.valueNotFound(let type, let context) {
    print("Value of type \(type) not found: \(context.debugDescription)")
} catch DecodingError.dataCorrupted(let context) {
    print("Data corrupted: \(context.debugDescription)")
} catch {
    print("Unknown error: \(error)")
}
```

## Real-World Example: API Response

Here's a complete example simulating an API response:

```swift
let jsonString = """
{
    "status": "success",
    "data": {
        "users": [
            {
                "id": 1,
                "username": "john_doe",
                "email": "john@example.com",
                "profile": {
                    "age": 28,
                    "city": "New York"
                },
                "is_verified": true,
                "created_at": "2024-01-15T10:30:00Z"
            },
            {
                "id": 2,
                "username": "jane_smith",
                "email": "jane@example.com",
                "profile": {
                    "age": 32,
                    "city": "Los Angeles"
                },
                "is_verified": false,
                "created_at": "2024-02-20T14:45:00Z"
            }
        ]
    }
}
"""

// Models
struct Profile: Codable {
    let age: Int
    let city: String
}

struct User: Codable {
    let id: Int
    let username: String
    let email: String
    let profile: Profile
    let isVerified: Bool
    let createdAt: Date
    
    enum CodingKeys: String, CodingKey {
        case id, username, email, profile
        case isVerified = "is_verified"
        case createdAt = "created_at"
    }
}

struct UserData: Codable {
    let users: [User]
}

struct APIResponse: Codable {
    let status: String
    let data: UserData
}

// Decoding
let jsonData = jsonString.data(using: .utf8)!
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601

do {
    let response = try decoder.decode(APIResponse.self, from: jsonData)
    
    print("Status: \(response.status)")
    print("Total users: \(response.data.users.count)")
    
    for user in response.data.users {
        print("\nUser: \(user.username)")
        print("Email: \(user.email)")
        print("Age: \(user.profile.age)")
        print("City: \(user.profile.city)")
        print("Verified: \(user.isVerified)")
        print("Created: \(user.createdAt)")
    }
} catch {
    print("Error: \(error)")
}
```

**Output:**
```
Status: success
Total users: 2

User: john_doe
Email: john@example.com
Age: 28
City: New York
Verified: true
Created: 2024-01-15 10:30:00 +0000

User: jane_smith
Email: jane@example.com
Age: 32
City: Los Angeles
Verified: false
Created: 2024-02-20 14:45:00 +0000
```

## Working with JSONSerialization (Legacy)

While `Codable` is preferred, you might encounter older code using `JSONSerialization`:

```swift
let jsonString = """
{
    "name": "Isaac",
    "age": 40
}
"""

let jsonData = jsonString.data(using: .utf8)!

do {
    if let json = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any] {
        let name = json["name"] as? String
        let age = json["age"] as? Int
        
        print("Name: \(name ?? "Unknown")")
        print("Age: \(age ?? 0)")
    }
} catch {
    print("Error: \(error)")
}
```

**Note:** Use `Codable` for new projects. It's type-safe and requires less boilerplate code.

## Best Practices

### 1. Use Codable Over JSONSerialization
```swift
// ✅ Preferred - Type-safe and clean
struct User: Codable {
    let name: String
    let age: Int
}

// ❌ Avoid - Error-prone and verbose
if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
    let name = json["name"] as? String
}
```

### 2. Handle Optional Fields Properly
```swift
struct User: Codable {
    let name: String           // Required field
    let email: String?         // Optional field
    let age: Int               // Required field
    let phone: String?         // Optional field
}
```

### 3. Use Meaningful Error Messages
```swift
do {
    let user = try decoder.decode(User.self, from: jsonData)
    print(user)
} catch DecodingError.keyNotFound(let key, _) {
    print("Missing key: \(key.stringValue)")
} catch DecodingError.typeMismatch(_, let context) {
    print("Type mismatch: \(context.debugDescription)")
} catch {
    print("Decoding failed: \(error.localizedDescription)")
}
```

### 4. Create Reusable Decoders
```swift
extension JSONDecoder {
    static var apiDecoder: JSONDecoder {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return decoder
    }
}

// Usage
let user = try JSONDecoder.apiDecoder.decode(User.self, from: jsonData)
```

### 5. Test Your Codable Models
```swift
func testUserDecoding() {
    let json = """
    {
        "name": "Test User",
        "age": 25
    }
    """
    
    let data = json.data(using: .utf8)!
    let decoder = JSONDecoder()
    
    do {
        let user = try decoder.decode(User.self, from: data)
        assert(user.name == "Test User")
        assert(user.age == 25)
        print("✅ Test passed")
    } catch {
        print("❌ Test failed: \(error)")
    }
}

testUserDecoding()
```

## Common Pitfalls

### 1. Mismatched Property Names
```swift
// JSON has "user_name" but struct has "userName"
// Solution: Use CodingKeys

struct User: Codable {
    let userName: String
    
    enum CodingKeys: String, CodingKey {
        case userName = "user_name"
    }
}
```

### 2. Missing Required Fields
```swift
// If JSON doesn't have a required field, decoding fails
// Solution: Make the property optional or provide default value

struct User: Codable {
    let name: String
    let email: String?  // Optional - won't fail if missing
}
```

### 3. Type Mismatches
```swift
// JSON has "123" (String) but struct expects Int
// Solution: Custom decoding or fix the API

struct User: Codable {
    let age: Int
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        if let ageInt = try? container.decode(Int.self, forKey: .age) {
            age = ageInt
        } else if let ageString = try? container.decode(String.self, forKey: .age) {
            age = Int(ageString) ?? 0
        } else {
            age = 0
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case age
    }
}
```

## Summary

Working with JSON in Swift is streamlined thanks to the `Codable` protocol:

✅ **Automatic Conversion** - Swift handles most JSON conversions automatically  
✅ **Type Safety** - Compile-time checks prevent runtime errors  
✅ **Custom Mapping** - CodingKeys let you map between naming conventions  
✅ **Flexibility** - Custom encoding/decoding for complex scenarios  
✅ **Error Handling** - Comprehensive error types for debugging  

**Key Takeaways:**
- Use `Codable` for type-safe JSON handling
- Handle optional fields with Swift optionals
- Use `CodingKeys` for custom property mapping
- Implement custom init/encode for complex transformations
- Always handle decoding errors gracefully
- Test your Codable models with sample JSON

---

**Next Steps:** Now that you understand JSON handling, you're ready to learn about **Networking** where you'll use these skills to fetch and send data to real APIs! 🚀
