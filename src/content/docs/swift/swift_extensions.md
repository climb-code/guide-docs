---
title: "Swift Extensions - Extending Existing Types"
description: "Master Swift extensions to add functionality to existing types, including computed properties and protocol conformance"
---

Welcome to Swift Extensions! Extensions allow you to add new functionality to existing classes, structures, enumerations, or protocols. This powerful feature lets you extend types you didn't create, including built-in Swift types. In this guide, we'll explore how to use extensions to write clean, organized, and reusable code.

## What Are Extensions?

Extensions add new functionality to an existing type without modifying its original source code. They're similar to categories in Objective-C but more powerful.

**What Extensions Can Do:**
- ✅ Add computed properties (instance and type)
- ✅ Add instance and type methods
- ✅ Add initializers
- ✅ Add subscripts
- ✅ Add nested types
- ✅ Make types conform to protocols

**What Extensions Cannot Do:**
- ❌ Add stored properties
- ❌ Add property observers to existing properties
- ❌ Override existing functionality

## Basic Extension Syntax

### Extending Built-in Types

```swift
extension Int {
    var squared: Int {
        return self * self
    }
    
    func times(_ closure: () -> Void) {
        for _ in 0..<self {
            closure()
        }
    }
}

let number = 5
print(number.squared)  // 25

3.times {
    print("Hello!")
}
// Output:
// Hello!
// Hello!
// Hello!
```

### Extending Your Own Types

```swift
struct Point {
    var x: Double
    var y: Double
}

extension Point {
    func distanceFromOrigin() -> Double {
        return (x * x + y * y).squareRoot()
    }
    
    func distanceTo(_ other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return (dx * dx + dy * dy).squareRoot()
    }
}

let point1 = Point(x: 3, y: 4)
print(point1.distanceFromOrigin())  // 5.0

let point2 = Point(x: 0, y: 0)
print(point1.distanceTo(point2))  // 5.0
```

## Adding Computed Properties

Extensions can add computed properties but not stored properties:

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}

let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")
// Output: One inch is 0.0254 meters

let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")
// Output: Three feet is 0.914... meters
```

### Computed Type Properties

```swift
extension Int {
    static var random: Int {
        return Int.random(in: 0...100)
    }
}

print(Int.random)  // Random number 0-100
```

## Adding Methods

### Instance Methods

```swift
extension String {
    func removeWhitespace() -> String {
        return self.filter { !$0.isWhitespace }
    }
    
    func reversed() -> String {
        return String(self.reversed())
    }
    
    func capitalizeFirst() -> String {
        guard !isEmpty else { return self }
        return prefix(1).uppercased() + dropFirst()
    }
}

let text = "  Hello World  "
print(text.removeWhitespace())  // HelloWorld
print("Swift".reversed())  // tfiwS
print("swift".capitalizeFirst())  // Swift
```

### Mutating Methods

For value types, use `mutating` to modify the instance:

```swift
extension Int {
    mutating func square() {
        self = self * self
    }
}

var number = 5
number.square()
print(number)  // 25
```

### Type Methods

```swift
extension Double {
    static func random(in range: ClosedRange<Double>) -> Double {
        let randomValue = Double.random(in: 0...1)
        return range.lowerBound + randomValue * (range.upperBound - range.lowerBound)
    }
}

print(Double.random(in: 1.0...10.0))
```

## Adding Initializers

Extensions can add convenience initializers to classes and any initializers to structures:

```swift
struct Size {
    var width: Double
    var height: Double
}

extension Size {
    init(square side: Double) {
        self.init(width: side, height: side)
    }
    
    init(rect size: CGSize) {
        self.init(width: Double(size.width), height: Double(size.height))
    }
}

struct CGSize {
    var width: Float
    var height: Float
}

let square = Size(square: 10)
print("Square: \(square.width)x\(square.height)")
```

### Designated vs Convenience Initializers

For classes, extensions can only add convenience initializers:

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

extension Person {
    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
}

let person = Person(name: "Alice")
print("\(person.name), age: \(person.age)")
```

## Protocol Conformance

Extensions are perfect for adding protocol conformance:

```swift
protocol Describable {
    var description: String { get }
}

struct User {
    var name: String
    var email: String
}

extension User: Describable {
    var description: String {
        return "\(name) (\(email))"
    }
}

let user = User(name: "Alice", email: "alice@email.com")
print(user.description)
// Output: Alice (alice@email.com)
```

### Conditional Conformance

Add protocol conformance only when certain conditions are met:

```swift
extension Array: Describable where Element: Describable {
    var description: String {
        return map { $0.description }.joined(separator: ", ")
    }
}

let users = [
    User(name: "Alice", email: "alice@email.com"),
    User(name: "Bob", email: "bob@email.com")
]

print(users.description)
// Output: Alice (alice@email.com), Bob (bob@email.com)
```

## Organizing Code with Extensions

Use extensions to organize related functionality:

```swift
struct Circle {
    var radius: Double
}

// MARK: - Computed Properties
extension Circle {
    var diameter: Double {
        return radius * 2
    }
    
    var area: Double {
        return Double.pi * radius * radius
    }
    
    var circumference: Double {
        return 2 * Double.pi * radius
    }
}

// MARK: - Methods
extension Circle {
    func scaled(by factor: Double) -> Circle {
        return Circle(radius: radius * factor)
    }
    
    func contains(point: (Double, Double)) -> Bool {
        let distance = (point.0 * point.0 + point.1 * point.1).squareRoot()
        return distance <= radius
    }
}

// MARK: - Protocol Conformance
extension Circle: CustomStringConvertible {
    var description: String {
        return "Circle with radius \(radius)"
    }
}

let circle = Circle(radius: 5)
print(circle.area)  // 78.54...
print(circle)  // Circle with radius 5.0
```

## Practical Examples

### Example 1: String Utilities

```swift
extension String {
    var isValidEmail: Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return predicate.evaluate(with: self)
    }
    
    var isNumeric: Bool {
        return Double(self) != nil
    }
    
    func truncate(to length: Int, addEllipsis: Bool = true) -> String {
        if count <= length {
            return self
        }
        let truncated = prefix(length)
        return addEllipsis ? truncated + "..." : String(truncated)
    }
    
    func countOccurrences(of substring: String) -> Int {
        return components(separatedBy: substring).count - 1
    }
}

print("test@example.com".isValidEmail)  // true
print("12345".isNumeric)  // true

let longText = "This is a very long sentence"
print(longText.truncate(to: 10))  // This is a...

let text = "hello hello world"
print(text.countOccurrences(of: "hello"))  // 2
```

### Example 2: Array Utilities

```swift
extension Array where Element: Numeric {
    func sum() -> Element {
        return reduce(0, +)
    }
    
    func average() -> Double {
        guard !isEmpty else { return 0 }
        let total = reduce(0, +)
        return Double("\(total)")! / Double(count)
    }
}

extension Array where Element: Equatable {
    func removeDuplicates() -> [Element] {
        var result: [Element] = []
        for element in self {
            if !result.contains(element) {
                result.append(element)
            }
        }
        return result
    }
    
    mutating func removeAll(_ item: Element) {
        self = filter { $0 != item }
    }
}

let numbers = [1, 2, 3, 4, 5]
print(numbers.sum())  // 15
print(numbers.average())  // 3.0

let duplicates = [1, 2, 2, 3, 3, 3, 4]
print(duplicates.removeDuplicates())  // [1, 2, 3, 4]
```

### Example 3: Date Formatting

```swift
extension Date {
    func formatted(as format: String = "yyyy-MM-dd") -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = format
        return formatter.string(from: self)
    }
    
    var isToday: Bool {
        return Calendar.current.isDateInToday(self)
    }
    
    var isYesterday: Bool {
        return Calendar.current.isDateInYesterday(self)
    }
    
    func addDays(_ days: Int) -> Date {
        return Calendar.current.date(byAdding: .day, value: days, to: self) ?? self
    }
}

let today = Date()
print(today.formatted())
print(today.formatted(as: "MM/dd/yyyy"))
print(today.isToday)  // true

let tomorrow = today.addDays(1)
print(tomorrow.formatted())
```

### Example 4: Color Extensions

```swift
struct Color {
    var red: Double
    var green: Double
    var blue: Double
}

extension Color {
    // Named colors
    static var black: Color {
        return Color(red: 0, green: 0, blue: 0)
    }
    
    static var white: Color {
        return Color(red: 1, green: 1, blue: 1)
    }
    
    static var red: Color {
        return Color(red: 1, green: 0, blue: 0)
    }
    
    // Hex initializer
    init?(hex: String) {
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        guard hexSanitized.count == 6,
              let hexNumber = Int(hexSanitized, radix: 16) else {
            return nil
        }
        
        self.red = Double((hexNumber & 0xFF0000) >> 16) / 255.0
        self.green = Double((hexNumber & 0x00FF00) >> 8) / 255.0
        self.blue = Double(hexNumber & 0x0000FF) / 255.0
    }
    
    func lighter(by percentage: Double = 0.3) -> Color {
        return Color(
            red: min(red + percentage, 1.0),
            green: min(green + percentage, 1.0),
            blue: min(blue + percentage, 1.0)
        )
    }
}

let customColor = Color(hex: "#FF5733")
print(customColor ?? "Invalid")

let lightRed = Color.red.lighter()
print("Lighter red: \(lightRed.red), \(lightRed.green), \(lightRed.blue)")
```

### Example 5: Collection Extensions

```swift
extension Collection {
    var isNotEmpty: Bool {
        return !isEmpty
    }
    
    subscript(safe index: Index) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}

extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        guard let first = first else { return true }
        return allSatisfy { $0 == first }
    }
}

let numbers = [1, 2, 3, 4, 5]
print(numbers.isNotEmpty)  // true
print(numbers[safe: 10] ?? "Out of bounds")  // Out of bounds

let same = [1, 1, 1]
print(same.allEqual())  // true

let different = [1, 2, 3]
print(different.allEqual())  // false
```

## Protocol Extensions

Extend protocols to provide default implementations:

```swift
protocol Greetable {
    var name: String { get }
    func greet()
}

extension Greetable {
    func greet() {
        print("Hello, I'm \(name)")
    }
    
    func farewell() {
        print("Goodbye from \(name)")
    }
}

struct Person: Greetable {
    var name: String
}

let person = Person(name: "Alice")
person.greet()     // Hello, I'm Alice
person.farewell()  // Goodbye from Alice
```

### Extending Standard Library Protocols

```swift
extension Sequence where Element: Numeric {
    func sum() -> Element {
        return reduce(0, +)
    }
}

let array = [1, 2, 3, 4, 5]
print(array.sum())  // 15

let range = 1...10
print(range.sum())  // 55
```

## Nested Types in Extensions

```swift
struct Calculator {
    // Empty for now
}

extension Calculator {
    enum Operation {
        case add
        case subtract
        case multiply
        case divide
    }
    
    static func perform(_ operation: Operation, on a: Double, and b: Double) -> Double? {
        switch operation {
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
}

if let result = Calculator.perform(.add, on: 10, and: 5) {
    print("Result: \(result)")  // Result: 15.0
}
```

## Best Practices

### 1. Use Extensions for Organization

```swift
// ✅ Good - organized by functionality
class ViewController {
    // Core properties and methods
}

// MARK: - UITableViewDataSource
extension ViewController: UITableViewDataSource {
    // Table view data source methods
}

// MARK: - UITableViewDelegate
extension ViewController: UITableViewDelegate {
    // Table view delegate methods
}
```

### 2. Group Related Functionality

```swift
// ✅ Good - related methods together
extension Int {
    func squared() -> Int { self * self }
    func cubed() -> Int { self * self * self }
    func toPower(_ power: Int) -> Int {
        return (0..<power).reduce(1) { result, _ in result * self }
    }
}
```

### 3. Use Meaningful Names

```swift
// ✅ Good
extension String {
    var isValidEmail: Bool { }
    func trimmed() -> String { }
}

// ❌ Bad
extension String {
    var check: Bool { }
    func process() -> String { }
}
```

### 4. Avoid Overcomplicating

```swift
// ✅ Simple and clear
extension Array {
    func second() -> Element? {
        return count > 1 ? self[1] : nil
    }
}

// ❌ Too complex for an extension
extension Array {
    func complexAlgorithm() -> [Element] {
        // 100 lines of complex code
    }
}
```

## Common Mistakes to Avoid

### 1. Trying to Add Stored Properties

```swift
// ❌ Error - cannot add stored  properties
// extension String {
//     var customProperty: Int = 0
// }

// ✅ Use computed properties
extension String {
    var customValue: Int {
        return count * 2
    }
}
```

### 2. Overriding Existing Methods

```swift
// ❌ Cannot override in extension
// extension String {
//     override func uppercased() -> String {
//         return self
//     }
// }
```

### 3. Adding Too Much in One Extension

```swift
// ❌ Too many unrelated methods
extension String {
    func method1() { }
    func method2() { }
    // ... 50 more methods
}

// ✅ Split into multiple extensions
extension String {
    // Validation methods
}

extension String {
    // Formatting methods
}
```

## Summary

Extensions are powerful tools for organizing and extending code:

**Capabilities** ⚡
- Add computed properties
- Add methods (instance and type)
- Add initializers
- Add subscripts
- Add nested types
- Protocol conformance

**Benefits** 🎯
- Organize code by functionality
- Extend types you don't own
- Keep related code together
- Clean separation of concerns

**Limitations** ⚠️
- No stored properties
- No property observers
- Cannot override existing

**Best Uses** 🌟
- Protocol conformance
- Code organization
- Adding utility methods
- Default implementations

## Next Steps

**Next topic:**
- Topic 19: Generics
- Generic functions
- Generic types
- Type constraints
- Associated types

## Practice Exercises

1. Create String extensions for common validations (email, phone, URL)
2. Extend Array with statistical methods (median, mode, standard deviation)
3. Build Date extensions for common date operations
4. Create UIColor/Color extension for hex color support
5. Extend Dictionary with merge and filter methods
6. Build protocol extensions with default implementations

---

**Master extensions to write organized, reusable code!** 🚀

*Remember: Extensions are for adding, not changing existing behavior!*
