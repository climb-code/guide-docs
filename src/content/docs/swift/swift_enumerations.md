---
title: "Swift Enumerations - Type-Safe Value Groups"
description: "Master Swift enums including defining enums, associated values, raw values, and recursive enumerations with practical examples"
---

Welcome to Swift Enumerations! Enums (short for enumerations) are a powerful way to define a group of related values. They're type-safe, expressive, and much more capable in Swift than in most other languages. In this guide, we'll explore how to use enums to write cleaner, safer code.

## What Are Enumerations?

An enumeration defines a common type for a group of related values. Unlike simple constants, enums in Swift are first-class types with many powerful features.

**Why Use Enums?**
- ✅ **Type Safety** - Compiler prevents invalid values
- ✅ **Clarity** - Express intent clearly
- ✅ **Exhaustiveness** - Compiler ensures all cases are handled
- ✅ **Pattern Matching** - Works great with switch statements
- ✅ **Associated Values** - Store additional data with cases
- ✅ **Methods and Properties** - Add functionality to enums

## Defining Enums

### Basic Enum

```swift
enum CompassDirection {
    case north
    case south
    case east
    case west
}

var direction = CompassDirection.north
print(direction)  // north

// Change direction
direction = .south  // Shorter syntax when type is known
print(direction)  // south
```

### Multiple Cases on One Line

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

let homePlanet = Planet.earth
print(homePlanet)  // earth
```

### Using Enums with Switch

Enums and switch statements work perfectly together:

```swift
enum Weather {
    case sunny
    case cloudy
    case rainy
    case snowy
}

let today = Weather.sunny

switch today {
case .sunny:
    print("☀️ Wear sunglasses!")
case .cloudy:
    print("☁️ Gray day")
case .rainy:
    print("🌧️ Bring umbrella!")
case .snowy:
    print("❄️ Stay warm!")
}
// Output: ☀️ Wear sunglasses!
```

### Exhaustive Matching

Swift requires you to handle all cases:

```swift
enum TrafficLight {
    case red
    case yellow
    case green
}

let light = TrafficLight.red

// ✅ All cases handled
switch light {
case .red:
    print("Stop")
case .yellow:
    print("Slow down")
case .green:
    print("Go")
}

// Or use default for remaining cases
switch light {
case .red:
    print("Stop")
default:
    print("Proceed with caution")
}
```

## Associated Values

Associated values let you store additional data with each enum case. Each case can have different types of associated values.

### Basic Associated Values

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)
print(productBarcode)

productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
print(productBarcode)
```

### Extracting Associated Values

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

let product = Barcode.upc(8, 85909, 51226, 3)

switch product {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check)")
case .qrCode(let code):
    print("QR Code: \(code)")
}
// Output: UPC: 8, 85909, 51226, 3

// Shorter syntax - let outside parentheses
switch product {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check)")
case let .qrCode(code):
    print("QR Code: \(code)")
}
```

### Practical Associated Values Example

```swift
enum ServerResponse {
    case success(String, Int)  // message, statusCode
    case failure(String)        // error message
    case loading
}

func handleResponse(_ response: ServerResponse) {
    switch response {
    case .success(let message, let code):
        print("✅ Success (\(code)): \(message)")
    case .failure(let error):
        print("❌ Error: \(error)")
    case .loading:
        print("⏳ Loading...")
    }
}

handleResponse(.loading)  // ⏳ Loading...
handleResponse(.success("Data loaded", 200))  // ✅ Success (200): Data loaded
handleResponse(.failure("Network error"))  // ❌ Error: Network error
```

### Named Associated Values

Make associated values more readable with labels:

```swift
enum HTTPResponse {
    case success(data: String, statusCode: Int)
    case failure(error: String, statusCode: Int)
}

let response = HTTPResponse.success(data: "User data", statusCode: 200)

switch response {
case .success(let data, let statusCode):
    print("Success (\(statusCode)): \(data)")
case .failure(let error, let statusCode):
    print("Error (\(statusCode)): \(error)")
}
```

## Raw Values

Raw values are pre-populated constant values for enum cases. All cases must have the same type.

### String Raw Values

```swift
enum Planet: String {
    case mercury = "Mercury"
    case venus = "Venus"
    case earth = "Earth"
    case mars = "Mars"
}

let planet = Planet.earth
print(planet.rawValue)  // Earth

// Create enum from raw value (returns optional)
if let somePlanet = Planet(rawValue: "Mars") {
    print("Found planet: \(somePlanet)")
}
// Output: Found planet: mars
```

### Implicit String Raw Values

If you don't specify values, Swift uses the case name:

```swift
enum Direction: String {
    case north  // rawValue is "north"
    case south  // rawValue is "south"
    case east   // rawValue is "east"
    case west   // rawValue is "west"
}

print(Direction.north.rawValue)  // north
```

### Integer Raw Values

```swift
enum Month: Int {
    case january = 1
    case february = 2
    case march = 3
    case april = 4
    case may = 5
    case june = 6
    case july = 7
    case august = 8
    case september = 9
    case october = 10
    case november = 11
    case december = 12
}

let month = Month.march
print(month.rawValue)  // 3

if let someMonth = Month(rawValue: 12) {
    print("Month: \(someMonth)")  // Month: december
}
```

### Auto-Incrementing Integer Raw Values

```swift
enum Priority: Int {
    case low = 1     // 1
    case medium      // 2 (auto-incremented)
    case high        // 3
    case critical    // 4
}

print(Priority.medium.rawValue)    // 2
print(Priority.critical.rawValue)  // 4

// Start from 0
enum Level: Int {
    case beginner    // 0
    case intermediate // 1
    case advanced    // 2
    case expert      // 3
}

print(Level.beginner.rawValue)  // 0
```

### Character Raw Values

```swift
enum Grade: Character {
    case a = "A"
    case b = "B"
    case c = "C"
    case d = "D"
    case f = "F"
}

let myGrade = Grade.a
print("Grade: \(myGrade.rawValue)")  // Grade: A
```

## Methods and Properties

Enums can have methods, computed properties, and initializers:

### Methods in Enums

```swift
enum TrafficLight {
    case red
    case yellow
    case green
    
    func action() -> String {
        switch self {
        case .red:
            return "Stop"
        case .yellow:
            return "Slow down"
        case .green:
            return "Go"
        }
    }
    
    func duration() -> Int {
        switch self {
        case .red:
            return 30
        case .yellow:
            return 5
        case .green:
            return 40
        }
    }
}

let light = TrafficLight.red
print(light.action())     // Stop
print(light.duration())   // 30
```

### Computed Properties

```swift
enum Temperature {
    case celsius(Double)
    case fahrenheit(Double)
    case kelvin(Double)
    
    var celsius: Double {
        switch self {
        case .celsius(let value):
            return value
        case .fahrenheit(let value):
            return (value - 32) * 5/9
        case .kelvin(let value):
            return value - 273.15
        }
    }
    
    var fahrenheit: Double {
        return celsius * 9/5 + 32
    }
}

let temp = Temperature.fahrenheit(77)
print("Celsius: \(temp.celsius)")       // 25.0
print("Fahrenheit: \(temp.fahrenheit)") // 77.0
```

### Mutating Methods

```swift
enum Switch {
    case on
    case off
    
    mutating func toggle() {
        switch self {
        case .on:
            self = .off
        case .off:
            self = .on
        }
    }
}

var lightSwitch = Switch.off
print(lightSwitch)  // off

lightSwitch.toggle()
print(lightSwitch)  // on

lightSwitch.toggle()
print(lightSwitch)  // off
```

### Static Methods

```swift
enum MathOperation {
    case add
    case subtract
    case multiply
    case divide
    
    func calculate(_ a: Double, _ b: Double) -> Double? {
        switch self {
        case .add:
            return a + b
        case .subtract:
            return a - b
        case .multiply:
            return a * b
        case .divide:
            return b != 0 ? a / b : nil
        }
    }
    
    static func allOperations() -> [MathOperation] {
        return [.add, .subtract, .multiply, .divide]
    }
}

let result = MathOperation.add.calculate(10, 5)
print(result)  // Optional(15.0)

let operations = MathOperation.allOperations()
print(operations.count)  // 4
```

## Recursive Enumerations

Recursive enumerations have cases that reference the enum itself. Use `indirect` keyword.

### Basic Recursive Enum

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

// Represents: (5 + 4) * 2
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))

func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case .number(let value):
        return value
    case .addition(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiplication(let left, let right):
        return evaluate(left) * evaluate(right)
    }
}

print(evaluate(product))  // 18 ((5 + 4) * 2)
```

### Indirect on Specific Cases

```swift
enum BinaryTree<T> {
    case empty
    indirect case node(value: T, left: BinaryTree, right: BinaryTree)
}

let tree = BinaryTree.node(
    value: 5,
    left: .node(value: 3, left: .empty, right: .empty),
    right: .node(value: 7, left: .empty, right: .empty)
)

func count<T>(_ tree: BinaryTree<T>) -> Int {
    switch tree {
    case .empty:
        return 0
    case .node(_, let left, let right):
        return 1 + count(left) + count(right)
    }
}

print("Tree has \(count(tree)) nodes")  // Tree has 3 nodes
```

## CaseIterable Protocol

Make your enum iterable to access all cases:

```swift
enum Beverage: CaseIterable {
    case coffee
    case tea
    case juice
    case water
}

print("There are \(Beverage.allCases.count) beverages")
// Output: There are 4 beverages

for beverage in Beverage.allCases {
    print(beverage)
}
// Output:
// coffee
// tea
// juice
// water
```

### With Raw Values

```swift
enum Direction: String, CaseIterable {
    case north = "N"
    case south = "S"
    case east = "E"
    case west = "W"
}

for direction in Direction.allCases {
    print("\(direction): \(direction.rawValue)")
}
// Output:
// north: N
// south: S
// east: E
// west: W
```

## Practical Examples

### Example 1: Result Type

```swift
enum Result<T, E: Error> {
    case success(T)
    case failure(E)
}

enum NetworkError: Error {
    case badURL
    case noConnection
    case timeout
}

func fetchData() -> Result<String, NetworkError> {
    let success = true
    
    if success {
        return .success("User data loaded")
    } else {
        return .failure(.noConnection)
    }
}

let result = fetchData()

switch result {
case .success(let data):
    print("✅ \(data)")
case .failure(let error):
    print("❌ Error: \(error)")
}
// Output: ✅ User data loaded
```

### Example 2: Authentication State

```swift
enum AuthState {
    case unauthenticated
    case authenticated(user: String, token: String)
    case loading
    case error(String)
    
    var isAuthenticated: Bool {
        if case .authenticated = self {
            return true
        }
        return false
    }
    
    var username: String? {
        if case .authenticated(let user, _) = self {
            return user
        }
        return nil
    }
}

var authState = AuthState.loading
print(authState.isAuthenticated)  // false

authState = .authenticated(user: "alice", token: "abc123")
print(authState.isAuthenticated)  // true
print(authState.username ?? "Unknown")  // alice
```

### Example 3: Payment Method

```swift
enum PaymentMethod {
    case cash
    case creditCard(number: String, cvv: String)
    case debitCard(number: String, pin: String)
    case digitalWallet(provider: String, accountId: String)
    
    func process(amount: Double) -> String {
        switch self {
        case .cash:
            return "Processing $\(amount) cash payment"
        case .creditCard(let number, _):
            let masked = String(number.suffix(4))
            return "Processing $\(amount) on card ending in \(masked)"
        case .debitCard(let number, _):
            let masked = String(number.suffix(4))
            return "Processing $\(amount) on debit card ending in \(masked)"
        case .digitalWallet(let provider, _):
            return "Processing $\(amount) via \(provider)"
        }
    }
}

let payment = PaymentMethod.creditCard(number: "1234567890123456", cvv: "123")
print(payment.process(amount: 99.99))
// Output: Processing $99.99 on card ending in 3456

let wallet = PaymentMethod.digitalWallet(provider: "ApplePay", accountId: "user@email.com")
print(wallet.process(amount: 49.99))
// Output: Processing $49.99 via ApplePay
```

### Example 4: UI State

```swift
enum ViewState<T> {
    case idle
    case loading
    case loaded(T)
    case error(String)
    
    var isLoading: Bool {
        if case .loading = self {
            return true
        }
        return false
    }
    
    var data: T? {
        if case .loaded(let value) = self {
            return value
        }
        return nil
    }
}

struct User {
    let name: String
    let email: String
}

var state: ViewState<User> = .idle

state = .loading
print("Loading: \(state.isLoading)")  // Loading: true

state = .loaded(User(name: "Alice", email: "alice@email.com"))
if let user = state.data {
    print("User: \(user.name)")  // User: Alice
}
```

### Example 5: Media Type

```swift
enum Media {
    case image(url: String, width: Int, height: Int)
    case video(url: String, duration: Int)
    case audio(url: String, duration: Int)
    case document(url: String, pages: Int)
    
    var url: String {
        switch self {
        case .image(let url, _, _),
             .video(let url, _),
             .audio(let url, _),
             .document(let url, _):
            return url
        }
    }
    
    var description: String {
        switch self {
        case .image(_, let width, let height):
            return "Image (\(width)x\(height))"
        case .video(_, let duration):
            return "Video (\(duration)s)"
        case .audio(_, let duration):
            return "Audio (\(duration)s)"
        case .document(_, let pages):
            return "Document (\(pages) pages)"
        }
    }
}

let media = Media.video(url: "https://example.com/video.mp4", duration: 120)
print(media.description)  // Video (120s)
print(media.url)  // https://example.com/video.mp4
```

### Example 6: HTTP Method

```swift
enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
    case patch = "PATCH"
    
    var requiresBody: Bool {
        switch self {
        case .post, .put, .patch:
            return true
        case .get, .delete:
            return false
        }
    }
}

func makeRequest(method: HTTPMethod, body: String?) {
    print("Method: \(method.rawValue)")
    
    if method.requiresBody {
        guard let body = body else {
            print("⚠️ Body required for \(method.rawValue)")
            return
        }
        print("Body: \(body)")
    }
}

makeRequest(method: .get, body: nil)  // Method: GET
makeRequest(method: .post, body: "{ \"name\": \"Alice\" }")
// Method: POST
// Body: { "name": "Alice" }
```

### Example 7: Game Character

```swift
enum Character {
    case warrior(health: Int, attack: Int, defense: Int)
    case mage(health: Int, mana: Int, spellPower: Int)
    case archer(health: Int, arrows: Int, accuracy: Int)
    
    mutating func takeDamage(_ damage: Int) {
        switch self {
        case .warrior(var health, let attack, let defense):
            health = max(0, health - max(1, damage - defense))
            self = .warrior(health: health, attack: attack, defense: defense)
        case .mage(var health, let mana, let spellPower):
            health = max(0, health - damage)
            self = .mage(health: health, mana: mana, spellPower: spellPower)
        case .archer(var health, let arrows, let accuracy):
            health = max(0, health - damage)
            self = .archer(health: health, arrows: arrows, accuracy: accuracy)
        }
    }
    
    var health: Int {
        switch self {
        case .warrior(let health, _, _),
             .mage(let health, _, _),
             .archer(let health, _, _):
            return health
        }
    }
}

var hero = Character.warrior(health: 100, attack: 20, defense: 10)
print("Health: \(hero.health)")  // Health: 100

hero.takeDamage(15)
print("Health after damage: \(hero.health)")  // Health after damage: 95
```

## Best Practices

### 1. Use Enums for Fixed Sets of Values

```swift
// ✅ Good - predefined set of values
enum UserRole {
    case admin
    case moderator
    case user
    case guest
}

// ❌ Bad - use strings instead
let role = "admin"  // Can be any string, error-prone
```

### 2. Use Associated Values for Additional Data

```swift
// ✅ Good - associated values
enum Notification {
    case message(String, Date)
    case reminder(String, Date)
}

// ❌ Bad - separate properties
struct Notification {
    var type: String
    var message: String?
    var date: Date?
}
```

### 3. Add Methods for Common Operations

```swift
enum Size {
    case small
    case medium
    case large
    
    func price() -> Double {
        switch self {
        case .small: return 2.99
        case .medium: return 3.99
        case .large: return 4.99
        }
    }
}
```

### 4. Use CaseIterable When You Need All Cases

```swift
enum Theme: String, CaseIterable {
    case light
    case dark
    case auto
}

// Easy to create settings menu
for theme in Theme.allCases {
    print("Option: \(theme.rawValue)")
}
```

### 5. Prefer Enums Over Booleans for State

```swift
// ❌ Unclear
var isLoading: Bool
var hasError: Bool
var hasData: Bool

// ✅ Clear and exhaustive
enum State {
    case idle
    case loading
    case error
    case success
}
```

## Common Mistakes to Avoid

### 1. Mixing Raw Values and Associated Values

```swift
// ❌ Error - can't have both
// enum Invalid: String {
//     case success(String) = "success"
// }

// ✅ Choose one or the other
enum WithRaw: String {
    case success = "success"
}

enum WithAssociated {
    case success(String)
}
```

### 2. Not Handling All Cases in Switch

```swift
enum Status {
    case active
    case inactive
    case pending
}

// ❌ Error - not exhaustive
// switch status {
// case .active:
//     print("Active")
// }

// ✅ Handle all cases
switch status {
case .active:
    print("Active")
case .inactive:
    print("Inactive")
case .pending:
    print("Pending")
}
```

### 3. Force Unwrapping Raw Value Initialization

```swift
// ❌ Dangerous - crashes if invalid
// let month = Month(rawValue: 13)!

// ✅ Safe unwrapping
if let month = Month(rawValue: 3) {
    print("Valid month: \(month)")
}
```

## Summary

Enumerations are powerful types in Swift. Here's what we covered:

**Basic Enums** 📋
- Define related values
- Type-safe and exhaustive
- Work great with switch statements

**Associated Values** 📦
- Store different data with each case
- Extract values with pattern matching
- Make enums incredibly flexible

**Raw Values** 🔢
- Pre-populated constant values
- All cases must be same type
- Auto-increment for integers

**Methods & Properties** ⚙️
- Add functionality to enums
- Computed properties
- Mutating methods
- Static methods

**Recursive Enums** 🔄
- Cases reference the enum itself
- Use `indirect` keyword
- Perfect for tree structures

**CaseIterable** 📊
- Iterate over all cases
- Automatic with simple enums
- Great for menus and options

## Next Steps

Congratulations on mastering enumerations! 🎉

**Next, we'll explore:**
- Topic 13: Structures and Classes
- Defining structures and classes
- Properties (stored and computed)
- Methods (instance and type methods)
- Initializers
- Value types vs reference types

## Practice Exercises

Try these to master enums:

1. Create a `Weekday` enum with raw values
2. Build an enum for different network request types with associated values
3. Create a recursive enum for a file system (folders and files)
4. Implement a state machine using enums
5. Build an enum-based calculator with all operations
6. Create a game inventory system using enums
7. Design an enum for form validation with associated error messages

---

**Master enums and write expressive, type-safe code!** 🎯

*Remember: When you have a fixed set of related values, enums are your best friend!*
