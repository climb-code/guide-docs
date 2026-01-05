---
title: "Swift Methods - Adding Functionality to Types"
description: "Master Swift methods including instance methods, type methods, mutating methods, and the self property with practical examples"
---

Welcome to Swift Methods! Methods are functions that are associated with a particular type. They define the behavior and functionality of classes, structures, and enumerations. In this guide, we'll explore all types of methods and how to use them effectively.

## What Are Methods?

Methods are functions that belong to a specific type (class, struct, or enum). They provide functionality and can access the properties of their type.

**Types of Methods:**
- **Instance Methods** - Called on instances of a type
- **Type Methods** - Called on the type itself
- **Mutating Methods** - Modify value types (structs/enums)

## Instance Methods

Instance methods are functions that belong to instances of a class, structure, or enumeration.

### Basic Instance Methods

```swift
class Counter {
    var count = 0
    
    func increment() {
        count += 1
    }
    
    func increment(by amount: Int) {
        count += amount
    }
    
    func reset() {
        count = 0
    }
}

let counter = Counter()
counter.increment()
print(counter.count)  // 1

counter.increment(by: 5)
print(counter.count)  // 6

counter.reset()
print(counter.count)  // 0
```

### Methods with Parameters

```swift
struct Calculator {
    func add(_ a: Double, _ b: Double) -> Double {
        return a + b
    }
    
    func subtract(_ a: Double, from b: Double) -> Double {
        return b - a
    }
    
    func multiply(_ a: Double, by b: Double) -> Double {
        return a * b
    }
}

let calc = Calculator()
print(calc.add(5, 10))           // 15.0
print(calc.subtract(5, from: 10)) // 5.0
print(calc.multiply(5, by: 3))    // 15.0
```

### Methods with Return Values

```swift
class BankAccount {
    private var balance: Double = 0
    
    func deposit(_ amount: Double) -> Double {
        balance += amount
        return balance
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard amount <= balance else {
            return false
        }
        balance -= amount
        return true
    }
    
    func getBalance() -> Double {
        return balance
    }
}

let account = BankAccount()
let newBalance = account.deposit(100)
print("New balance: $\(newBalance)")  // $100.0

if account.withdraw(50) {
    print("Withdrawal successful")
    print("Balance: $\(account.getBalance())")  // $50.0
}
```

## The self Property

`self` refers to the current instance within an instance method.

### When to Use self

Usually optional, but required to disambiguate:

```swift
struct Point {
    var x: Double
    var y: Double
    
    func isToRightOf(x: Double) -> Bool {
        return self.x > x  // self.x is the property, x is the parameter
    }
    
    func distanceTo(point: Point) -> Double {
        let dx = self.x - point.x
        let dy = self.y - point.y
        return (dx * dx + dy * dy).squareRoot()
    }
}

let point1 = Point(x: 3, y: 4)
let point2 = Point(x: 0, y: 0)

print(point1.isToRightOf(x: 2))  // true
print(point1.distanceTo(point: point2))  // 5.0
```

### self in Closures

```swift
class ViewController {
    var name = "Main"
    
    func setupHandler() {
        someAsyncFunction { [weak self] in
            guard let self = self else { return }
            print(self.name)
        }
    }
    
    func someAsyncFunction(completion: @escaping () -> Void) {
        completion()
    }
}
```

## Mutating Methods

Structures and enumerations are value types. To modify properties, methods must be marked `mutating`.

### Basic Mutating Methods

```swift
struct Point {
    var x: Double
    var y: Double
    
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
    
    mutating func reset() {
        x = 0
        y = 0
    }
}

var point = Point(x: 10, y: 20)
print("Initial: (\(point.x), \(point.y))")  // (10.0, 20.0)

point.moveBy(x: 5, y: -10)
print("After move: (\(point.x), \(point.y))")  // (15.0, 10.0)

point.reset()
print("After reset: (\(point.x), \(point.y))")  // (0.0, 0.0)
```

### Assigning to self

Mutating methods can assign a completely new instance to `self`:

```swift
struct Point {
    var x: Double
    var y: Double
    
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}

var point = Point(x: 10, y: 20)
point.moveBy(x: 5, y: -10)
print("(\(point.x), \(point.y))")  // (15.0, 10.0)
```

### Mutating Enum Methods

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

### Cannot Call on Constants

```swift
struct Counter {
    var count = 0
    
    mutating func increment() {
        count += 1
    }
}

var mutableCounter = Counter()
mutableCounter.increment()  // ✅ OK

let immutableCounter = Counter()
// immutableCounter.increment()  // ❌ Error - cannot mutate let constant
```

## Type Methods

Type methods are called on the type itself, not on instances. Use `static` keyword.

### Static Methods

```swift
struct Math {
    static func square(_ number: Double) -> Double {
        return number * number
    }
    
    static func cube(_ number: Double) -> Double {
        return number * number * number
    }
    
    static  func add(_ a: Double, _ b: Double) -> Double {
        return a + b
    }
}

print(Math.square(5))      // 25.0
print(Math.cube(3))        // 27.0
print(Math.add(10, 20))    // 30.0
```

### Type Methods Accessing Type Properties

```swift
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1
    
    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel {
            highestUnlockedLevel = level
        }
    }
    
    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }
    
    mutating func advance(to level: Int) -> Bool {
        if LevelTracker.isUnlocked(level) {
            currentLevel = level
            return true
        }
        return false
    }
}

LevelTracker.unlock(5)
print("Highest level: \(LevelTracker.highestUnlockedLevel)")  // 5

var player = LevelTracker()
if player.advance(to: 3) {
    print("Advanced to level 3")
}
```

### Class Type Methods

In classes, use `class` keyword to allow overriding:

```swift
class Vehicle {
    class func description() -> String {
        return "A vehicle"
    }
}

class Car: Vehicle {
    override class func description() -> String {
        return "A car"
    }
}

print(Vehicle.description())  // A vehicle
print(Car.description())      // A car
```

### Factory Methods

Type methods are great for creating instances:

```swift
struct Color {
    var red: Double
    var green: Double
    var blue: Double
    
    static func black() -> Color {
        return Color(red: 0, green: 0, blue: 0)
    }
    
    static func white() -> Color {
        return Color(red: 1, green: 1, blue: 1)
    }
    
    static func red() -> Color {
        return Color(red: 1, green: 0, blue: 0)
    }
    
    static func custom(red: Double, green: Double, blue: Double) -> Color {
        return Color(red: red, green: green, blue: blue)
    }
}

let black = Color.black()
let customColor = Color.custom(red: 0.5, green: 0.5, blue: 0.8)
```

## Practical Examples

### Example 1: String Utilities

```swift
struct StringHelper {
    static func isPalindrome(_ text: String) -> Bool {
        let cleaned = text.lowercased().filter { $0.isLetter }
        return cleaned == String(cleaned.reversed())
    }
    
    static func wordCount(_ text: String) -> Int {
        return text.split(separator: " ").count
    }
    
    static func capitalize(_ text: String) -> String {
        return text.split(separator: " ")
            .map { $0.prefix(1).uppercased() + $0.dropFirst().lowercased() }
            .joined(separator: " ")
    }
}

print(StringHelper.isPalindrome("racecar"))  // true
print(StringHelper.wordCount("Hello World"))  // 2
print(StringHelper.capitalize("hello world"))  // Hello World
```

### Example 2: Temperature Converter

```swift
struct TemperatureConverter {
    var celsius: Double
    
    var fahrenheit: Double {
        return celsius * 9/5 + 32
    }
    
    var kelvin: Double {
        return celsius + 273.15
    }
    
    // Instance method
    func description() -> String {
        return String(format: "%.1f°C = %.1f°F = %.1fK", 
                     celsius, fahrenheit, kelvin)
    }
    
    // Type methods
    static func fromFahrenheit(_ temp: Double) -> TemperatureConverter {
        return TemperatureConverter(celsius: (temp - 32) * 5/9)
    }
    
    static func fromKelvin(_ temp: Double) -> TemperatureConverter {
        return TemperatureConverter(celsius: temp - 273.15)
    }
}

let temp1 = TemperatureConverter(celsius: 25)
print(temp1.description())

let temp2 = TemperatureConverter.fromFahrenheit(77)
print(temp2.description())
```

### Example 3: Player Character

```swift
class Player {
    var name: String
    private var health: Int
    private var maxHealth: Int
    var level: Int = 1
    
    init(name: String, health: Int) {
        self.name = name
        self.health = health
        self.maxHealth = health
    }
    
    func takeDamage(_ amount: Int) {
        health = max(0, health - amount)
        print("\(name) took \(amount) damage. Health: \(health)/\(maxHealth)")
        
        if health == 0 {
            die()
        }
    }
    
    func heal(_ amount: Int) {
        health = min(maxHealth, health + amount)
        print("\(name) healed \(amount). Health: \(health)/\(maxHealth)")
    }
    
    func levelUp() {
        level += 1
        maxHealth += 20
        health = maxHealth
        print("\(name) leveled up to \(level)! Max health: \(maxHealth)")
    }
    
    private func die() {
        print("\(name) has been defeated!")
    }
    
    func isAlive() -> Bool {
        return health > 0
    }
}

let hero = Player(name: "Warrior", health: 100)
hero.takeDamage(30)
hero.heal(20)
hero.levelUp()
```

### Example 4: Stack Data Structure

```swift
struct Stack<Element> {
    private var items: [Element] = []
    
    var count: Int {
        return items.count
    }
    
    var isEmpty: Bool {
        return items.isEmpty
    }
    
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element? {
        return items.popLast()
    }
    
    func peek() -> Element? {
        return items.last
    }
    
    mutating func clear() {
        items.removeAll()
    }
}

var stack = Stack<Int>()
stack.push(1)
stack.push(2)
stack.push(3)

print("Top: \(stack.peek() ?? 0)")  // 3
print("Popped: \(stack.pop() ?? 0)")  // 3
print("Count: \(stack.count)")  // 2
```

### Example 5: Validation Helper

```swift
class Validator {
    static func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return predicate.evaluate(with: email)
    }
    
    static func isValidPhone(_ phone: String) -> Bool {
        let cleaned = phone.filter { $0.isNumber }
        return cleaned.count == 10
    }
    
    static func isStrongPassword(_ password: String) -> Bool {
        guard password.count >= 8 else { return false }
        
        let hasUppercase = password.contains(where: { $0.isUppercase })
        let hasLowercase = password.contains(where: { $0.isLowercase })
        let hasNumber = password.contains(where: { $0.isNumber })
        
        return hasUppercase && hasLowercase && hasNumber
    }
}

print(Validator.isValidEmail("test@example.com"))  // true
print(Validator.isValidPhone("1234567890"))  // true
print(Validator.isStrongPassword("Pass123"))  // true
```

## Best Practices

### 1. Use Clear Method Names

```swift
// ✅ Good - descriptive names
func calculateTotal(for items: [Item]) -> Double { }
func sendEmail(to recipient: String) { }

// ❌ Bad - unclear
func calc(_ items: [Item]) -> Double { }
func send(_ to: String) { }
```

### 2. Keep Methods Focused

```swift
// ✅ Good - single responsibility
func validateEmail() -> Bool { }
func sendEmail() { }

// ❌ Bad - doing too much
func validateAndSendEmail() { }
```

### 3. Use Type Methods for Utilities

```swift
// ✅ Good - utility functions
struct DateHelper {
    static func formatDate(_ date: Date) -> String { }
    static func daysAgo(_ count: Int) -> Date { }
}

// ❌ Bad - doesn't need instance
class DateHelper {
    func formatDate(_ date: Date) -> String { }
}
```

### 4. Mark Mutating When Needed

```swift
struct Counter {
    var count = 0
    
    // ✅ Marked as mutating
    mutating func increment() {
        count += 1
    }
    
    // ✅ Not mutating - just returns value
    func doubled() -> Int {
        return count * 2
    }
}
```

### 5. Use Private for Helpers

```swift
class DataProcessor {
    func processData() {
        let cleaned = cleanData()
        validate(cleaned)
    }
    
    // ✅ Private helper methods
    private func cleanData() -> [String] {
        return []
    }
    
    private func validate(_ data: [String]) {
        // Validation logic
    }
}
```

## Summary

Methods define the behavior of your types:

**Instance Methods** 🎯
- Called on instances
- Access instance properties
- Define type behavior

**self Property** 🪞
- Refers to current instance
- Disambiguates properties
- Required in closures with [weak self]

**Mutating Methods** 🔄
- Modify value types
- Required for structs/enums
- Can replace self entirely

**Type Methods** 🏢
- Called on the type
- Use static keyword
- Great for factories and utilities

## Next Steps

Congratulations! You've completed the core intermediate topics! 🎉

**Next in the roadmap:**
- Topic 16: Inheritance
- Subclassing
- Overriding methods and properties
- Preventing overrides (final)
- Super keyword

## Practice Exercises

1. Create a `Calculator` class with various math methods
2. Build a `StringManipulator` with mutating methods
3. Implement a `Queue` with enqueue/dequeue methods
4. Create utility type methods for date formatting
5. Build a game character with attack/defend methods
6. Implement a `Validator` class with static validation methods

---

**Master methods to bring your types to life!** 🚀

*Remember: Methods define what your types can DO!*
