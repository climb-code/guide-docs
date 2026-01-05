---
title: "Swift Properties - Managing Values in Types"
description: "Master Swift properties including stored, computed, lazy, property observers, and type properties with practical examples"
---

Welcome to Swift Properties! Properties associate values with classes, structures, and enumerations. They're how you store and compute values within your custom types. In this guide, we'll explore all the different kinds of properties and how to use them effectively.

## What Are Properties?

Properties are values associated with a particular class, structure, or enumeration. There are two main categories:

**Stored Properties** - Store constant or variable values  
**Computed Properties** - Calculate values rather than storing them

Additionally, properties can be:
- **Lazy** - Initialized only when first accessed
- **Observed** - Execute code when values change
- **Type-level** - Belong to the type itself, not instances

## Stored Properties

Stored properties hold constant or variable values as part of an instance.

### Basic Stored Properties

```swift
struct Point {
    var x: Double
    var y: Double
}

var point = Point(x: 10.0, y: 20.0)
print("Point: (\(point.x), \(point.y))")  // (10.0, 20.0)

point.x = 15.0
print("Point: (\(point.x), \(point.y))")  // (15.0, 20.0)
```

### Constant Stored Properties

Use `let` for properties that shouldn't change:

```swift
struct User {
    let id: String          // Cannot change
    var name: String        // Can change
    var email: String       // Can change
}

var user = User(id: "123", name: "Alice", email: "alice@email.com")
user.name = "Alice Smith"  // ✅ OK
// user.id = "456"         // ❌ Error - cannot modify constant
```

### Default Values

Provide default values for properties:

```swift
struct Settings {
    var theme: String = "Light"
    var fontSize: Int = 14
    var notifications: Bool = true
}

let settings = Settings()
print(settings.theme)  // Light

let customSettings = Settings(theme: "Dark", fontSize: 16, notifications: false)
print(customSettings.theme)  // Dark
```

### Stored Properties in Classes

```swift
class BankAccount {
    let accountNumber: String       // Constant
    var balance: Double = 0.0       // Variable with default
    var owner: String
    
    init(accountNumber: String, owner: String) {
        self.accountNumber = accountNumber
        self.owner = owner
    }
}

let account = BankAccount(accountNumber: "12345", owner: "Alice")
account.balance = 1000.0
print("Balance: $\(account.balance)")
```

## Computed Properties

Computed properties don't store values—they provide a getter and optional setter to retrieve and set other properties.

### Read-Only Computed Properties

```swift
struct Rectangle {
    var width: Double
    var height: Double
    
    var area: Double {
        return width * height
    }
    
    var perimeter: Double {
        return 2 * (width + height)
    }
}

let rect = Rectangle(width: 10, height: 5)
print("Area: \(rect.area)")         // 50.0
print("Perimeter: \(rect.perimeter)") // 30.0
```

### Shorthand for Read-Only

Omit `get` and `return` for single-expression computed properties:

```swift
struct Circle {
    var radius: Double
    
    var diameter: Double {
        radius * 2
    }
    
    var area: Double {
        Double.pi * radius * radius
    }
}

let circle = Circle(radius: 5)
print(circle.diameter)  // 10.0
```

### Getter and Setter

```swift
struct Temperature {
    var celsius: Double
    
    var fahrenheit: Double {
        get {
            return celsius * 9/5 + 32
        }
        set {
            celsius = (newValue - 32) * 5/9
        }
    }
    
    var kelvin: Double {
        get {
            return celsius + 273.15
        }
        set {
            celsius = newValue - 273.15
        }
    }
}

var temp = Temperature(celsius: 0)
print("Celsius: \(temp.celsius)")        // 0.0
print("Fahrenheit: \(temp.fahrenheit)")  // 32.0
print("Kelvin: \(temp.kelvin)")          // 273.15

temp.fahrenheit = 212
print("Celsius: \(temp.celsius)")        // 100.0

temp.kelvin = 373.15
print("Celsius: \(temp.celsius)")        // 100.0
```

### Custom Setter Parameter Name

```swift
struct Percentage {
    var decimal: Double
    
    var percent: Double {
        get {
            return decimal * 100
        }
        set(newPercent) {  // Custom parameter name
            decimal = newPercent / 100
        }
    }
}

var score = Percentage(decimal: 0.85)
print(score.percent)  // 85.0

score.percent = 92
print(score.decimal)  // 0.92
```

## Property Observers

Property observers watch and respond to changes in property values.

### willSet and didSet

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            print("About to set totalSteps to \(newValue)")
        }
        didSet {
            print("Stepped from \(oldValue) to \(totalSteps)")
            if totalSteps > oldValue {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}

let counter = StepCounter()
counter.totalSteps = 100
// Output:
// About to set totalSteps to 100
// Stepped from 0 to 100
// Added 100 steps

counter.totalSteps = 250
// Output:
// About to set totalSteps to 250
// Stepped from 100 to 250
// Added 150 steps
```

### Custom Parameter Names

```swift
class Player {
    var score: Int = 0 {
        willSet(newScore) {
            print("Score will change to \(newScore)")
        }
        didSet(previousScore) {
            print("Score changed from \(previousScore) to \(score)")
        }
    }
}

let player = Player()
player.score = 100
// Output:
// Score will change to 100
// Score changed from 0 to 100
```

### Practical Example - Validation

```swift
class BankAccount {
    var balance: Double = 0 {
        didSet {
            if balance < 0 {
                print("⚠️ Warning: Overdrawn by $\(abs(balance))")
            } else if balance < 100 {
                print("⚠️ Low balance: $\(balance)")
            }
        }
    }
}

let account = BankAccount()
account.balance = 50    // ⚠️ Low balance: $50.0
account.balance = -25   // ⚠️ Warning: Overdrawn by $25.0
```

### Property Observers in Subclasses

```swift
class Vehicle {
    var speed: Double = 0 {
        didSet {
            print("Vehicle speed: \(speed) km/h")
        }
    }
}

class Car: Vehicle {
    override var speed: Double {
        didSet {
            if speed > 120 {
                print("⚠️ Speeding!")
            }
        }
    }
}

let car = Car()
car.speed = 100
// Vehicle speed: 100.0

car.speed = 150
// Vehicle speed: 150.0
// ⚠️ Speeding!
```

## Lazy Properties

Lazy properties aren't calculated until first accessed. Perfect for expensive computations!

### Basic Lazy Property

```swift
class DataImporter {
    var filename = "data.txt"
    
    init() {
        print("DataImporter initialized")
    }
}

class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    
    init() {
        print("DataManager initialized")
    }
}

let manager = DataManager()
// Output: DataManager initialized
// (importer NOT created yet)

print(manager.importer.filename)
// Output:
// DataImporter initialized
// data.txt
```

### Lazy with Closure

```swift
class ImageLoader {
    lazy var image: String = {
        print("Loading image...")
        return "🖼️ Image loaded"
    }()
    
    init() {
        print("ImageLoader created")
    }
}

let loader = ImageLoader()
// Output: ImageLoader created

print(loader.image)
// Output:
// Loading image...
// 🖼️ Image loaded

print(loader.image)
// Output: 🖼️ Image loaded (already loaded)
```

### Lazy Array Example

```swift
class Library {
    lazy var books: [String] = {
        print("Loading books from database...")
        return ["Swift Guide", "iOS Development", "Design Patterns"]
    }()
}

let library = Library()
print("Library created")
// (books not loaded yet)

print(library.books.count)
// Output:
// Loading books from database...
// 3
```

### Important Notes About Lazy

- Must be declared with `var` (not `let`)
- Not thread-safe (can be initialized multiple times in concurrent access)
- Only for stored properties
- Cannot have property observers

```swift
class Demo {
    // ✅ Valid
    lazy var data: [Int] = []
    
    // ❌ Error - lazy cannot be let
    // lazy let value = 10
    
    // ❌ Error - cannot have observers
    // lazy var count = 0 {
    //     didSet { }
    // }
}
```

## Type Properties

Type properties belong to the type itself, not any particular instance.

### Static Properties

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value"
    static var computedTypeProperty: Int {
        return 42
    }
}

print(SomeStructure.storedTypeProperty)    // Some value
print(SomeStructure.computedTypeProperty)  // 42

SomeStructure.storedTypeProperty = "New value"
print(SomeStructure.storedTypeProperty)    // New value
```

### Class Type Properties

Use `class` keyword in classes to allow overriding:

```swift
class SomeClass {
    static var storedTypeProperty = "Some value"
    
    class var computedTypeProperty: Int {
        return 27
    }
}

class SubClass: SomeClass {
    override class var computedTypeProperty: Int {
        return 100
    }
}

print(SomeClass.computedTypeProperty)   // 27
print(SubClass.computedTypeProperty)    // 100
```

### Practical Example - App Configuration

```swift
struct AppConfig {
    static let appName = "MyApp"
    static let version = "1.0.0"
    static var environment = "production"
    
    static var apiURL: String {
        switch environment {
        case "development":
            return "https://dev-api.example.com"
        case "staging":
            return "https://staging-api.example.com"
        default:
            return "https://api.example.com"
        }
    }
}

print(AppConfig.appName)     // MyApp
print(AppConfig.apiURL)      // https://api.example.com

AppConfig.environment = "development"
print(AppConfig.apiURL)      // https://dev-api.example.com
```

### Counter Example

```swift
class RequestCounter {
    static var totalRequests = 0
    
    static func incrementRequests() {
        totalRequests += 1
    }
    
    static func resetCount() {
        totalRequests = 0
    }
}

RequestCounter.incrementRequests()
RequestCounter.incrementRequests()
RequestCounter.incrementRequests()

print("Total requests: \(RequestCounter.totalRequests)")  // 3
```

## Property Wrappers

Property wrappers add a layer of separation between code that manages property storage and code that defines a property.

### Creating a Property Wrapper

```swift
@propertyWrapper
struct Capitalized {
    private var value: String = ""
    
    var wrappedValue: String {
        get { value }
        set { value = newValue.capitalized }
    }
    
    init(wrappedValue: String) {
        self.value = wrappedValue.capitalized
    }
}

struct User {
    @Capitalized var firstName: String
    @Capitalized var lastName: String
}

var user = User(firstName: "john", lastName: "doe")
print("\(user.firstName) \(user.lastName)")  // John Doe

user.firstName = "alice"
print(user.firstName)  // Alice
```

### Range-Limiting Wrapper

```swift
@propertyWrapper
struct Clamped {
    private var value: Int
    private var range: ClosedRange<Int>
    
    var wrappedValue: Int {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    
    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Game {
    @Clamped(0...100) var health: Int = 100
    @Clamped(1...10) var level: Int = 1
}

var game = Game()
game.health = 150  // Clamped to 100
print(game.health)  // 100

game.health = -20  // Clamped to 0
print(game.health)  // 0
```

## Practical Examples

### Example 1: User Profile

```swift
class UserProfile {
    var username: String {
        didSet {
            print("Username changed to: \(username)")
        }
    }
    
    var email: String {
        didSet {
            print("Email updated: \(email)")
        }
    }
    
    var fullName: String {
        get {
            return "\(firstName) \(lastName)"
        }
        set {
            let parts = newValue.split(separator: " ")
            firstName = String(parts[0])
            lastName = parts.count > 1 ? String(parts[1]) : ""
        }
    }
    
    private var firstName = ""
    private var lastName = ""
    
    init(username: String, email: String) {
        self.username = username
        self.email = email
    }
}

let profile = UserProfile(username: "alice", email: "alice@email.com")
profile.fullName = "Alice Smith"
print(profile.fullName)  // Alice Smith

profile.username = "alice_s"
// Output: Username changed to: alice_s
```

### Example 2: Temperature Monitor

```swift
class TemperatureMonitor {
    var currentTemperature: Double = 20.0 {
        didSet {
            checkTemperature()
        }
    }
    
    var temperatureInFahrenheit: Double {
        get {
            return currentTemperature * 9/5 + 32
        }
        set {
            currentTemperature = (newValue - 32) * 5/9
        }
    }
    
    private func checkTemperature() {
        if currentTemperature < 0 {
            print("❄️ Freezing!")
        } else if currentTemperature > 30 {
            print("🔥 Hot!")
        } else {
            print("☀️ Normal temperature")
        }
    }
}

let monitor = TemperatureMonitor()
monitor.currentTemperature = 35
// Output: 🔥 Hot!

monitor.temperatureInFahrenheit = 32
// Output: ❄️ Freezing!
```

### Example 3: Shopping Cart

```swift
class ShoppingCart {
    private var items: [(name: String, price: Double)] = []
    
    var itemCount: Int {
        return items.count
    }
    
    var subtotal: Double {
        return items.reduce(0) { $0 + $1.price }
    }
    
    var tax: Double {
        return subtotal * 0.08
    }
    
    var total: Double {
        return subtotal + tax
    }
    
    func addItem(name: String, price: Double) {
        items.append((name, price))
        print("Added \(name): $\(price)")
    }
    
    func clear() {
        items.removeAll()
        print("Cart cleared")
    }
}

let cart = ShoppingCart()
cart.addItem(name: "Book", price: 29.99)
cart.addItem(name: "Pen", price: 4.99)

print("Items: \(cart.itemCount)")
print("Subtotal: $\(cart.subtotal)")
print("Tax: $\(cart.tax)")
print("Total: $\(cart.total)")
```

## Best Practices

### 1. Use Computed Properties for Derived Values

```swift
// ✅ Good - computed property
struct Circle {
    var radius: Double
    var area: Double {
        Double.pi * radius * radius
    }
}

// ❌ Bad - storing derived value
struct BadCircle {
    var radius: Double
    var area: Double  // Will get out of sync
}
```

### 2. Use Lazy for Expensive Operations

```swift
// ✅ Good - loaded only when needed
class Report {
    lazy var data:  [String] = loadExpensiveData()
    
    func loadExpensiveData() -> [String] {
        // Expensive operation
        return []
    }
}
```

### 3. Use Property Observers for Side Effects

```swift
// ✅ Good - update UI when value changes
class ViewController {
    var title: String = "" {
        didSet {
            updateTitleLabel()
        }
    }
    
    func updateTitleLabel() {
        // Update UI
    }
}
```

### 4. Use Private for Internal State

```swift
class Counter {
    private var count = 0  // Hide implementation
    
    var value: Int {
        return count
    }
    
    func increment() {
        count += 1
    }
}
```

## Summary

Properties are essential for managing values in Swift types:

**Stored Properties** 📦
- Hold constant or variable values
- Can have default values
- Initialized during creation

**Computed Properties** 🧮
- Calculate values on-the-fly
- Have get and optional set
- Don't store values

**Property Observers** 👁️
- willSet (before change)
- didSet (after change)
- Great for validation and side effects

**Lazy Properties** ⏱️
- Initialized when first accessed
- Save resources
- Must be var

**Type Properties** 🏢
- Belong to type, not instances
- Use static keyword
- Shared across all instances

## Next Steps

**Next topic:**
- Topic 15: Methods
- Instance methods
- Type methods
- Mutating methods
- Self property

## Practice Exercises

1. Create a `Rectangle` with computed area and perimeter
2. Build a `BankAccount` with balance observers
3. Create a `LazyLoader` that defers expensive operations
4. Implement a `Settings` class with type properties
5. Build a property wrapper for trimming strings
6. Create a `Counter` with increment/decrement observers

---

**Master properties to build powerful, reactive types!** ⚡

*Remember: Choose the right property type for each situation!*
