---
title: "Swift Structures and Classes - Building Custom Types"
description: "Master Swift structures and classes including definitions, properties, methods, initializers, and understanding value vs reference types"
---

Welcome to Swift Structures and Classes! These are the building blocks for creating custom types in Swift. Both structures and classes allow you to encapsulate data and functionality into reusable, organized units. In this guide, we'll explore how to use both, understand their differences, and learn when to choose one over the other.

## What Are Structures and Classes?

Structures (structs) and classes are blueprints for creating custom types. They let you group related data and functionality together.

**Common Features (Both Have):**
- ✅ Properties to store values
- ✅ Methods to define functionality
- ✅ Initializers to set up initial state
- ✅ Subscripts for collection-style access
- ✅ Extensions to add functionality
- ✅ Protocol conformance

**Class-Only Features:**
- 🎯 Inheritance (classes can inherit from other classes)
- 🎯 Type casting to check and interpret types
- 🎯 Deinitializers to clean up resources
- 🎯 Reference counting (multiple references to same instance)

**Key Difference:**
- **Structs** are **value types** (copied when assigned)
- **Classes** are **reference types** (shared when assigned)

## Defining Structures

### Basic Structure

```swift
struct Person {
    var name: String
    var age: Int
}

// Create an instance
var person = Person(name: "Alice", age: 25)
print("\(person.name) is \(person.age) years old")
// Output: Alice is 25 years old

// Modify properties
person.age = 26
print("\(person.name) is now \(person.age)")
// Output: Alice is now 26
```

### Structure with Methods

```swift
struct Rectangle {
    var width: Double
    var height: Double
    
    func area() -> Double {
        return width * height
    }
    
    func perimeter() -> Double {
        return 2 * (width + height)
    }
}

let rect = Rectangle(width: 10, height: 5)
print("Area: \(rect.area())")         // Area: 50.0
print("Perimeter: \(rect.perimeter())") // Perimeter: 30.0
```

### Mutating Methods

Methods that modify struct properties must be marked as `mutating`:

```swift
struct Counter {
    var count = 0
    
    mutating func increment() {
        count += 1
    }
    
    mutating func increment(by amount: Int) {
        count += amount
    }
    
    mutating func reset() {
        count = 0
    }
}

var counter = Counter()
print(counter.count)  // 0

counter.increment()
print(counter.count)  // 1

counter.increment(by: 5)
print(counter.count)  // 6

counter.reset()
print(counter.count)  // 0
```

## Defining Classes

### Basic Class

```swift
class Vehicle {
    var brand: String
    var year: Int
    
    init(brand: String, year: Int) {
        self.brand = brand
        self.year = year
    }
    
    func describe() {
        print("\(year) \(brand)")
    }
}

let car = Vehicle(brand: "Toyota", year: 2022)
car.describe()  // Output: 2022 Toyota
```

### Class with Computed Properties

```swift
class Circle {
    var radius: Double
    
    var diameter: Double {
        return radius * 2
    }
    
    var area: Double {
        return Double.pi * radius * radius
    }
    
    var circumference: Double {
        return 2 * Double.pi * radius
    }
    
    init(radius: Double) {
        self.radius = radius
    }
}

let circle = Circle(radius: 5)
print("Radius: \(circle.radius)")           // 5.0
print("Diameter: \(circle.diameter)")       // 10.0
print("Area: \(circle.area)")               // ~78.54
print("Circumference: \(circle.circumference)") // ~31.42
```

## Properties

### Stored Properties

Store constant or variable values:

```swift
struct Point {
    var x: Double
    var y: Double
}

class Temperature {
    var celsius: Double
    let unit: String = "°C"  // Constant property
    
    init(celsius: Double) {
        self.celsius = celsius
    }
}

var point = Point(x: 10, y: 20)
print("Point: (\(point.x), \(point.y))")

let temp = Temperature(celsius: 25)
print("\(temp.celsius)\(temp.unit)")  // 25.0°C
```

### Computed Properties

Calculate values rather than storing them:

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
print("Area: \(rect.area)")  // 50.0
```

### Get and Set

Computed properties can have getters and setters:

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
}

var temp = Temperature(celsius: 0)
print("Celsius: \(temp.celsius)")      // 0.0
print("Fahrenheit: \(temp.fahrenheit)") // 32.0

temp.fahrenheit = 212
print("Celsius: \(temp.celsius)")      // 100.0
```

### Property Observers

Respond to changes in property values:

```swift
class BankAccount {
    var balance: Double = 0 {
        willSet {
            print("About to set balance to \(newValue)")
        }
        didSet {
            print("Balance changed from \(oldValue) to \(balance)")
            if balance < 0 {
                print("⚠️ Account overdrawn!")
            }
        }
    }
}

let account = BankAccount()
account.balance = 100
// Output:
// About to set balance to 100.0
// Balance changed from 0.0 to 100.0

account.balance = -50
// Output:
// About to set balance to -50.0
// Balance changed from 100.0 to -50.0
// ⚠️ Account overdrawn!
```

### Lazy Properties

Initialized only when first accessed:

```swift
class DataManager {
    lazy var data: [String] = {
        print("Loading data...")
        return ["Item 1", "Item 2", "Item 3"]
    }()
    
    init() {
        print("DataManager initialized")
    }
}

let manager = DataManager()
// Output: DataManager initialized

print("Accessing data...")
print(manager.data[0])
// Output:
// Accessing data...
// Loading data...
// Item 1

print(manager.data[1])
// Output: Item 2 (data already loaded)
```

### Type Properties

Belong to the type itself, not instances:

```swift
struct Math {
    static let pi = 3.14159
    static var computationCount = 0
    
    static func square(_ number: Double) -> Double {
        computationCount += 1
        return number * number
    }
}

print(Math.pi)  // 3.14159
print(Math.square(5))  // 25.0
print("Computations: \(Math.computationCount)")  // 1
```

## Methods

### Instance Methods

Operate on specific instances:

```swift
class Calculator {
    var result: Double = 0
    
    func add(_ value: Double) {
        result += value
    }
    
    func subtract(_ value: Double) {
        result -= value
    }
    
    func multiply(by value: Double) {
        result *= value
    }
    
    func clear() {
        result = 0
    }
}

let calc = Calculator()
calc.add(10)
calc.multiply(by: 5)
print(calc.result)  // 50.0
```

### Type Methods

Called on the type itself:

```swift
struct Converter {
    static func celsiusToFahrenheit(_ celsius: Double) -> Double {
        return celsius * 9/5 + 32
    }
    
    static func fahrenheitToCelsius(_ fahrenheit: Double) -> Double {
        return (fahrenheit - 32) * 5/9
    }
}

print(Converter.celsiusToFahrenheit(25))  // 77.0
print(Converter.fahrenheitToCelsius(77))  // 25.0
```

### Mutating Methods in Structs

```swift
struct Point {
    var x: Double
    var y: Double
    
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
    
    mutating func reset() {
        self = Point(x: 0, y: 0)
    }
}

var point = Point(x: 10, y: 20)
point.moveBy(x: 5, y: -10)
print("Point: (\(point.x), \(point.y))")  // (15.0, 10.0)
```

## Initializers

### Default Initializer

Structs get a memberwise initializer automatically:

```swift
struct User {
    var username: String
    var email: String
}

// Automatic memberwise initializer
let user = User(username: "alice", email: "alice@email.com")
```

### Custom Initializers

```swift
struct Temperature {
    var celsius: Double
    
    init(celsius: Double) {
        self.celsius = celsius
    }
    
    init(fahrenheit: Double) {
        self.celsius = (fahrenheit - 32) * 5/9
    }
    
    init(kelvin: Double) {
        self.celsius = kelvin - 273.15
    }
}

let temp1 = Temperature(celsius: 25)
let temp2 = Temperature(fahrenheit: 77)
let temp3 = Temperature(kelvin: 298.15)

print(temp1.celsius)  // 25.0
print(temp2.celsius)  // 25.0
print(temp3.celsius)  // 25.0
```

### Initializer Delegation

Initializers can call other initializers:

```swift
struct Rectangle {
    var width: Double
    var height: Double
    
    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }
    
    init(square side: Double) {
        self.init(width: side, height: side)
    }
}

let rect1 = Rectangle(width: 10, height: 5)
let rect2 = Rectangle(square: 10)  // 10x10 square
```

### Failable Initializers

Return `nil` if initialization fails:

```swift
struct ValidatedAge {
    var age: Int
    
    init?(age: Int) {
        guard age >= 0 && age <= 150 else {
            return nil
        }
        self.age = age
    }
}

if let validAge = ValidatedAge(age: 25) {
    print("Valid age: \(validAge.age)")
} else {
    print("Invalid age")
}
// Output: Valid age: 25

if let invalidAge = ValidatedAge(age: 200) {
    print("Valid age: \(invalidAge.age)")
} else {
    print("Invalid age")
}
// Output: Invalid age
```

### Class Initializers

Classes don't get automatic memberwise initializers:

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    // Convenience initializer
    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
}

let person1 = Person(name: "Alice", age: 25)
let person2 = Person(name: "Bob")  // age defaults to 0
```

## Value Types vs Reference Types

This is the KEY difference between structs and classes!

### Structs Are Value Types (Copied)

```swift
struct Point {
    var x: Int
    var y: Int
}

var point1 = Point(x: 10, y: 20)
var point2 = point1  // COPY is made

point2.x = 100

print("point1.x: \(point1.x)")  // 10 (unchanged)
print("point2.x: \(point2.x)")  // 100 (changed)
```

### Classes Are Reference Types (Shared)

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

let person1 = Person(name: "Alice", age: 25)
let person2 = person1  // SAME instance (reference)

person2.age = 30

print("person1.age: \(person1.age)")  // 30 (changed!)
print("person2.age: \(person2.age)")  // 30 (changed!)
```

### Identity Operators

Check if two references point to the same instance:

```swift
class Book {
    var title: String
    init(title: String) {
        self.title = title
    }
}

let book1 = Book(title: "Swift Guide")
let book2 = book1
let book3 = Book(title: "Swift Guide")

// Check if same instance
if book1 === book2 {
    print("book1 and book2 are the SAME instance")
}
// Output: book1 and book2 are the SAME instance

if book1 === book3 {
    print("Same instance")
} else {
    print("book1 and book3 are DIFFERENT instances")
}
// Output: book1 and book3 are DIFFERENT instances

// Not identical
if book1 !== book3 {
    print("Not the same instance")
}
```

## When to Use Struct vs Class

### Use Struct When:
✅ Modeling simple data values  
✅ You want value semantics (copying behavior)  
✅ The data will be used in multi-threaded code  
✅ You don't need inheritance  

**Examples**: Point, Size, Rectangle, Color, Coordinate

### Use Class When:
✅ You need inheritance  
✅ You need reference semantics (sharing behavior)  
✅ You need to deinitialize resources  
✅ Representing a single, shared resource  

**Examples**: ViewController, NetworkManager, Database, FileManager

## Practical Examples

### Example 1: User Profile (Struct)

```swift
struct UserProfile {
    var username: String
    var email: String
    var avatarURL: String?
    var followers: Int = 0
    
    var displayName: String {
        return "@\(username)"
    }
    
    mutating func follow() {
        followers += 1
    }
    
    mutating func updateEmail(_ newEmail: String) {
        email = newEmail
    }
}

var profile = UserProfile(username: "alice", email: "alice@email.com")
print(profile.displayName)  // @alice

profile.follow()
print("Followers: \(profile.followers)")  // 1
```

### Example 2: Bank Account (Class)

```swift
class BankAccount {
    let accountNumber: String
    private(set) var balance: Double
    var owner: String
    
    init(accountNumber: String, owner: String, initialBalance: Double = 0) {
        self.accountNumber = accountNumber
        self.owner = owner
        self.balance = initialBalance
    }
    
    func deposit(_ amount: Double) {
        guard amount > 0 else { return }
        balance += amount
        print("Deposited $\(amount). New balance: $\(balance)")
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard amount > 0 && amount <= balance else {
            print("Insufficient funds")
            return false
        }
        balance -= amount
        print("Withdrew $\(amount). New balance: $\(balance)")
        return true
    }
}

let account = BankAccount(accountNumber: "123456", owner: "Alice", initialBalance: 1000)
account.deposit(500)   // Deposited $500. New balance: $1500
account.withdraw(200)  // Withdrew $200. New balance: $1300
```

### Example 3: Task List (Mixed)

```swift
struct Task {
    var title: String
    var isCompleted: Bool = false
    var priority: Priority
    
    enum Priority: String {
        case low = "Low"
        case medium = "Medium"
        case high = "High"
    }
    
    mutating func complete() {
        isCompleted = true
    }
}

class TaskManager {
    private var tasks: [Task] = []
    
    func addTask(_ task: Task) {
        tasks.append(task)
        print("Added task: \(task.title)")
    }
    
    func completeTask(at index: Int) {
        guard tasks.indices.contains(index) else { return }
        tasks[index].complete()
        print("Completed: \(tasks[index].title)")
    }
    
    func listTasks() {
        for (index, task) in tasks.enumerated() {
            let status = task.isCompleted ? "✓" : "○"
            print("\(index + 1). \(status) \(task.title) [\(task.priority.rawValue)]")
        }
    }
}

let manager = TaskManager()
manager.addTask(Task(title: "Learn Swift", priority: .high))
manager.addTask(Task(title: "Build app", priority: .medium))
manager.listTasks()
// Output:
// 1. ○ Learn Swift [High]
// 2. ○ Build app [Medium]

manager.completeTask(at: 0)
manager.listTasks()
// Output:
// Completed: Learn Swift
// 1. ✓ Learn Swift [High]
// 2. ○ Build app [Medium]
```

### Example 4: Shopping Cart

```swift
struct Product {
    let id: String
    let name: String
    let price: Double
}

struct CartItem {
    let product: Product
    var quantity: Int
    
    var total: Double {
        return product.price * Double(quantity)
    }
}

class ShoppingCart {
    private var items: [CartItem] = []
    
    func addItem(_ product: Product, quantity: Int = 1) {
        if let index = items.firstIndex(where: { $0.product.id == product.id }) {
            items[index].quantity += quantity
        } else {
            items.append(CartItem(product: product, quantity: quantity))
        }
        print("Added \(quantity) × \(product.name)")
    }
    
    func removeItem(productId: String) {
        items.removeAll { $0.product.id == productId }
    }
    
    func total() -> Double {
        return items.reduce(0) { $0 + $1.total }
    }
    
    func checkout() {
        print("\n--- Receipt ---")
        for item in items {
            print("\(item.quantity) × \(item.product.name): $\(item.total)")
        }
        print("--------------")
        print("Total: $\(total())")
        items.removeAll()
    }
}

let cart = ShoppingCart()
cart.addItem(Product(id: "1", name: "iPhone", price: 999.99), quantity: 1)
cart.addItem(Product(id: "2", name: "AirPods", price: 179.99), quantity: 2)
cart.checkout()
```

### Example 5: Game Character

```swift
class Character {
    var name: String
    var health: Int
    var maxHealth: Int
    var level: Int = 1
    
    var isAlive: Bool {
        return health > 0
    }
    
    init(name: String, health: Int) {
        self.name = name
        self.health = health
        self.maxHealth = health
    }
    
    func takeDamage(_ amount: Int) {
        health = max(0, health - amount)
        print("\(name) took \(amount) damage. Health: \(health)/\(maxHealth)")
        
        if !isAlive {
            print("\(name) has been defeated!")
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
}

let hero = Character(name: "Warrior", health: 100)
hero.takeDamage(30)   // Warrior took 30 damage. Health: 70/100
hero.heal(20)         // Warrior healed 20. Health: 90/100
hero.levelUp()        // Warrior leveled up to 2! Max health: 120
```

## Best Practices

### 1. Prefer Structs by Default

```swift
// ✅ Use struct for simple data models
struct Settings {
    var theme: String
    var fontSize: Int
    var notifications: Bool
}

// ✅ Use class when you need reference semantics
class DatabaseConnection {
    // Shared resource
}
```

### 2. Use Private for Implementation Details

```swift
class Counter {
    private var count = 0  // Hidden from outside
    
    func increment() {
        count += 1
    }
    
    func getCount() -> Int {
        return count
    }
}
```

### 3. Use Computed Properties for Derived Values

```swift
struct Circle {
    var radius: Double
    
    // ✅ Computed property
    var area: Double {
        return Double.pi * radius * radius
    }
    
    // ❌ Don't store derived values
    // var area: Double
}
```

### 4. Initialize All Properties

```swift
// ✅ All properties initialized
struct Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

// ❌ Don't leave properties uninitialized
// class BadPerson {
//     var name: String  // Error!
// }
```

### 5. Use Lazy for Expensive Operations

```swift
class DataProcessor {
    lazy var expensiveData: [String] = {
        // Only computed when first accessed
        return loadExpensiveData()
    }()
    
    private func loadExpensiveData() -> [String] {
        // Expensive operation
        return ["Data"]
    }
}
```

## Common Mistakes to Avoid

### 1. Modifying Struct Without mutating

```swift
struct Point {
    var x: Int
    var y: Int
    
    // ❌ Error - needs mutating
    // func move() {
    //     x += 1
    // }
    
    // ✅ Correct
    mutating func move() {
        x += 1
    }
}
```

### 2. Unexpected Copying with Structs

```swift
struct Array<T> {
    // Copying can be expensive for large arrays
}

// ❌ Unnecessary copy
func process(_ array: [Int]) {
    // Creates a copy
}

// ✅ Use inout to avoid copy
func process(_ array: inout [Int]) {
    // Modifies original
}
```

### 3. Using Class When Struct Would Work

```swift
// ❌ Unnecessary class
class Point {
    var x: Int
    var y: Int
    
    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }
}

// ✅ Struct is better here
struct Point {
    var x: Int
    var y: Int
}
```

## Summary

Structures and classes are fundamental to Swift programming:

**Structures** 📦
- Value types (copied)
- No inheritance
- Memberwise initializer
- Thread-safe by default
- Prefer for simple data

**Classes** 🏛️
- Reference types (shared)
- Support inheritance
- Manual initializers required
- Reference counting
- Use for complex shared resources

**Properties** 🎯
- Stored (hold values)
- Computed (calculate values)
- Observers (willSet, didSet)
- Lazy (delayed initialization)
- Type properties (static)

**Methods** ⚙️
- Instance methods
- Type methods (static)
- Mutating (for structs)

**Initializers** 🚀
- Default and custom
- Memberwise (structs)
- Failable (return nil)
- Convenience initializers

## Next Steps

Congratulations on mastering structures and classes! 🎉

**Tomorrow, we'll explore:**
- Topic 14: Properties
- Stored properties
- Computed properties
- Property observers (willSet, didSet)
- Type properties (static)
- Lazy properties

## Practice Exercises

Try these to reinforce your learning:

1. Create a `Book` struct with computed properties for price with tax
2. Build a `Student` class with methods to add grades and calculate average
3. Create a `Stack` struct with push, pop, and peek methods
4. Implement a `Timer` class with start, stop, and reset functionality
5. Build a `Pizza` struct with size, toppings, and price calculation
6. Create a `Library` class that manages books (add, remove, search)
7. Implement a value vs reference type demonstration program

---

**Master structs and classes to build powerful, organized code!** 🏗️

*Remember: Use structs by default, classes when you need them!*
