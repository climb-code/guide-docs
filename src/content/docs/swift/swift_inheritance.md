---
title: "Swift Inheritance - Building Class Hierarchies"
description: "Master Swift inheritance including subclassing, overriding methods and properties, final keyword, and super keyword with practical examples"
---

Welcome to Swift Inheritance! Inheritance is a fundamental concept in object-oriented programming that allows classes to inherit characteristics from other classes. In this guide, we'll explore how to build class hierarchies, override behavior, and create powerful, reusable code.

## What is Inheritance?

Inheritance allows a class to inherit properties, methods, and characteristics from another class. The class that inherits is called a **subclass** (or child class), and the class it inherits from is called a **superclass** (or parent class).

**Key Points:**
- ✅ Only **classes** support inheritance (not structs or enums)
- ✅ Subclasses inherit all properties and methods
- ✅ Subclasses can override inherited behavior
- ✅ Use `final` to prevent overriding
- ✅ Use `super` to access parent implementation

**Why Use Inheritance?**
- 🎯 Code reuse - Don't repeat yourself
- 🎯 Logical hierarchies - Model real-world relationships
- 🎯 Polymorphism - Treat related objects uniformly
- 🎯 Extensibility - Build on existing functionality

## Defining a Base Class

A base class (or superclass) doesn't inherit from any other class.

### Simple Base Class

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    
    func makeNoise() {
        // Default implementation (does nothing)
    }
}

let someVehicle = Vehicle()
print("Vehicle: \(someVehicle.description)")
// Output: Vehicle: traveling at 0.0 miles per hour
```

### Base Class with Properties and Methods

```swift
class Animal {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func makeSound() {
        print("\(name) makes a sound")
    }
    
    func eat() {
        print("\(name) is eating")
    }
    
    func sleep() {
        print("\(name) is sleeping")
    }
}

let animal = Animal(name: "Generic Animal", age: 5)
animal.makeSound()  // Generic Animal makes a sound
```

## Subclassing

Create a subclass by placing the superclass name after the subclass name, separated by a colon.

### Basic Subclass

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}

let bicycle = Bicycle()
bicycle.hasBasket = true
bicycle.currentSpeed = 15.0

print("Bicycle: \(bicycle.description)")
// Output: Bicycle: traveling at 15.0 miles per hour
```

### Subclass with Additional Properties

```swift
class Dog: Animal {
    var breed: String
    
    init(name: String, age: Int, breed: String) {
        self.breed = breed
        super.init(name: name, age: age)
    }
}

let dog = Dog(name: "Buddy", age: 3, breed: "Golden Retriever")
dog.makeSound()  // Buddy makes a sound (inherited)
dog.eat()        // Buddy is eating (inherited)
```

### Multiple Levels of Inheritance

```swift
class Vehicle {
    var currentSpeed = 0.0
}

class Bicycle: Vehicle {
    var hasBasket = false
}

class Tandem: Bicycle {
    var currentNumberOfPassengers = 0
}

let tandem = Tandem()
tandem.hasBasket = true
tandem.currentNumberOfPassengers = 2
tandem.currentSpeed = 22.0

print("Tandem: \(tandem.description)")
```

## Overriding

Subclasses can provide their own implementation of inherited methods, properties, or subscripts.

### Overriding Methods

```swift
class Animal {
    func makeSound() {
        print("Some generic sound")
    }
}

class Dog: Animal {
    override func makeSound() {
        print("Woof! Woof!")
    }
}

class Cat: Animal {
    override func makeSound() {
        print("Meow!")
    }
}

let dog = Dog()
dog.makeSound()  // Woof! Woof!

let cat = Cat()
cat.makeSound()  // Meow!
```

### Overriding Properties

You can override inherited properties to provide custom getters and setters:

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
}

class Car: Vehicle {
    var gear = 1
    
    override var description: String {
        return super.description + " in gear \(gear)"
    }
}

let car = Car()
car.currentSpeed = 50.0
car.gear = 3
print(car.description)
// Output: traveling at 50.0 miles per hour in gear 3
```

### Overriding Property Observers

You can add property observers to inherited properties:

```swift
class AutomaticCar: Car {
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}

let automatic = AutomaticCar()
automatic.currentSpeed = 35.0
print("AutomaticCar: \(automatic.description)")
// Output: AutomaticCar: traveling at 35.0 miles per hour in gear 4
```

### Cannot Override Stored Properties Directly

```swift
class Vehicle {
    var wheels = 4
}

// ❌ Error - cannot override stored property
// class Bicycle: Vehicle {
//     override var wheels = 2
// }

// ✅ Correct - set in initializer
class Bicycle: Vehicle {
    override init() {
        super.init()
        wheels = 2
    }
}
```

## The super Keyword

Use `super` to access the superclass version of methods, properties, or subscripts.

### Calling Superclass Methods

```swift
class Vehicle {
    func describe() {
        print("This is a vehicle")
    }
}

class Car: Vehicle {
    override func describe() {
        super.describe()  // Call parent implementation
        print("Specifically, a car")
    }
}

let car = Car()
car.describe()
// Output:
// This is a vehicle
// Specifically, a car
```

### Accessing Superclass Properties

```swift
class Shape {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func area() -> Double {
        return 0
    }
}

class Rectangle: Shape {
    var width: Double
    var height: Double
    
    init(width: Double, height: Double) {
        self.width = width
        self.height = height
        super.init(name: "Rectangle")
    }
    
    override func area() -> Double {
        return width * height
    }
    
    func describe() {
        print("\(super.name) with area \(area())")
    }
}

let rect = Rectangle(width: 10, height: 5)
rect.describe()
// Output: Rectangle with area 50.0
```

### Super in Initializers

```swift
class Person {
    var name: String
    
    init(name: String) {
        self.name = name
        print("Person initialized: \(name)")
    }
}

class Student: Person {
    var studentID: String
    
    init(name: String, studentID: String) {
        self.studentID = studentID
        super.init(name: name)
        print("Student initialized with ID: \(studentID)")
    }
}

let student = Student(name: "Alice", studentID: "S12345")
// Output:
// Person initialized: Alice
// Student initialized with ID: S12345
```

## Preventing Overrides with final

Use `final` to prevent a class, method, or property from being overridden.

### Final Methods

```swift
class Vehicle {
    final func turnOn() {
        print("Vehicle turned on")
    }
    
    func drive() {
        print("Vehicle is driving")
    }
}

class Car: Vehicle {
    // ❌ Error - cannot override final method
    // override func turnOn() {
    //     print("Car turned on")
    // }
    
    // ✅ OK - can override non-final method
    override func drive() {
        print("Car is driving")
    }
}
```

### Final Properties

```swift
class Shape {
    final var numberOfSides: Int {
        return 0
    }
    
    var area: Double {
        return 0
    }
}

class Triangle: Shape {
    // ❌ Error - cannot override final property
    // override var numberOfSides: Int {
    //     return 3
    // }
    
    // ✅ OK
    override var area: Double {
        return 10.0
    }
}
```

### Final Classes

Prevent an entire class from being subclassed:

```swift
final class Singleton {
    static let shared = Singleton()
    private init() {}
    
    func doSomething() {
        print("Doing something")
    }
}

// ❌ Error - cannot subclass final class
// class ExtendedSingleton: Singleton {
// }
```

### When to Use final

Use `final` when:
- ✅ You want to prevent modification of critical functionality
- ✅ Performance is critical (compiler optimizations)
- ✅ The design doesn't allow for extension
- ✅ Security concerns (prevent unwanted subclassing)

```swift
final class SecurityManager {
    static let shared = SecurityManager()
    private init() {}
    
    final func validateAccess() -> Bool {
        // Critical security check - must not be overridden
        return true
    }
}
```

## Practical Examples

### Example 1: Employee Hierarchy

```swift
class Employee {
    var name: String
    var id: String
    var baseSalary: Double
    
    init(name: String, id: String, baseSalary: Double) {
        self.name = name
        self.id = id
        self.baseSalary = baseSalary
    }
    
    func calculateSalary() -> Double {
        return baseSalary
    }
    
    func workDay() {
        print("\(name) is working")
    }
}

class Manager: Employee {
    var bonus: Double
    
    init(name: String, id: String, baseSalary: Double, bonus: Double) {
        self.bonus = bonus
        super.init(name: name, id: id, baseSalary: baseSalary)
    }
    
    override func calculateSalary() -> Double {
        return super.calculateSalary() + bonus
    }
    
    func conductMeeting() {
        print("\(name) is conducting a meeting")
    }
}

class Developer: Employee {
    var programmingLanguages: [String]
    
    init(name: String, id: String, baseSalary: Double, languages: [String]) {
        self.programmingLanguages = languages
        super.init(name: name, id: id, baseSalary: baseSalary)
    }
    
    override func workDay() {
        super.workDay()
        print("\(name) is coding in \(programmingLanguages.joined(separator: ", "))")
    }
}

let manager = Manager(name: "Alice", id: "M001", baseSalary: 80000, bonus: 20000)
print("\(manager.name)'s salary: $\(manager.calculateSalary())")
// Output: Alice's salary: $100000.0

let dev = Developer(name: "Bob", id: "D001", baseSalary: 70000, languages: ["Swift", "Python"])
dev.workDay()
// Output:
// Bob is working
// Bob is coding in Swift, Python
```

### Example 2: Game Characters

```swift
class Character {
    var name: String
    var health: Int
    var maxHealth: Int
    
    init(name: String, health: Int) {
        self.name = name
        self.health = health
        self.maxHealth = health
    }
    
    func takeDamage(_ amount: Int) {
        health = max(0, health - amount)
        print("\(name) took \(amount) damage. Health: \(health)/\(maxHealth)")
    }
    
    func heal(_ amount: Int) {
        health = min(maxHealth, health + amount)
        print("\(name) healed \(amount). Health: \(health)/\(maxHealth)")
    }
    
    func attack() -> Int {
        return 10  // Base damage
    }
}

class Warrior: Character {
    var armor: Int
    
    init(name: String, health: Int, armor: Int) {
        self.armor = armor
        super.init(name: name, health: health)
    }
    
    override func takeDamage(_ amount: Int) {
        let reducedDamage = max(1, amount - armor)
        super.takeDamage(reducedDamage)
    }
    
    override func attack() -> Int {
        return 20  // Warriors hit harder
    }
    
    func shieldBlock() {
        print("\(name) blocked with shield!")
    }
}

class Mage: Character {
    var mana: Int
    
    init(name: String, health: Int, mana: Int) {
        self.mana = mana
        super.init(name: name, health: health)
    }
    
    override func attack() -> Int {
        if mana >= 10 {
            mana -= 10
            print("\(name) casts a spell!")
            return 30  // Spell damage
        }
        return super.attack()
    }
    
    func restoreMana(_ amount: Int) {
        mana += amount
        print("\(name) restored \(amount) mana. Mana: \(mana)")
    }
}

let warrior = Warrior(name: "Knight", health: 150, armor: 10)
warrior.takeDamage(25)  // Only 15 damage after armor

let mage = Mage(name: "Wizard", health: 100, mana: 50)
print("Mage damage: \(mage.attack())")  // Casts spell
```

### Example 3: Shape Hierarchy

```swift
class Shape {
    var color: String
    
    init(color: String) {
        self.color = color
    }
    
    func area() -> Double {
        fatalError("Subclass must override area()")
    }
    
    func describe() {
        print("\(color) shape with area \(area())")
    }
}

class Circle: Shape {
    var radius: Double
    
    init(color: String, radius: Double) {
        self.radius = radius
        super.init(color: color)
    }
    
    override func area() -> Double {
        return Double.pi * radius * radius
    }
}

class Rectangle: Shape {
    var width: Double
    var height: Double
    
    init(color: String, width: Double, height: Double) {
        self.width = width
        self.height = height
        super.init(color: color)
    }
    
    override func area() -> Double {
        return width * height
    }
}

class Square: Rectangle {
    init(color: String, side: Double) {
        super.init(color: color, width: side, height: side)
    }
    
    override func describe() {
        print("\(color) square with side \(width) and area \(area())")
    }
}

let circle = Circle(color: "Red", radius: 5)
circle.describe()  // Red shape with area 78.53981633974483

let square = Square(color: "Blue", side: 4)
square.describe()  // Blue square with side 4.0 and area 16.0
```

### Example 4: View Hierarchy (iOS-like)

```swift
class View {
    var frame: (x: Double, y: Double, width: Double, height: Double)
    var backgroundColor: String
    
    init(x: Double, y: Double, width: Double, height: Double, color: String) {
        self.frame = (x, y, width, height)
        self.backgroundColor = color
    }
    
    func draw() {
        print("Drawing view at (\(frame.x), \(frame.y))")
    }
    
    func handleTap() {
        print("View tapped")
    }
}

class Button: View {
    var title: String
    var action: (() -> Void)?
    
    init(x: Double, y: Double, width: Double, height: Double, title: String) {
        self.title = title
        super.init(x: x, y: y, width: width, height: height, color: "Blue")
    }
    
    override func draw() {
        super.draw()
        print("Drawing button with title: '\(title)'")
    }
    
    override func handleTap() {
        print("Button '\(title)' tapped")
        action?()
    }
}

class Label: View {
    var text: String
    
    init(x: Double, y: Double, width: Double, height: Double, text: String) {
        self.text = text
        super.init(x: x, y: y, width: width, height: height, color: "Clear")
    }
    
    override func draw() {
        super.draw()
        print("Drawing label with text: '\(text)'")
    }
}

let button = Button(x: 100, y: 200, width: 150, height: 50, title: "Click Me")
button.action = {
    print("Button action executed!")
}
button.draw()
button.handleTap()
```

### Example 5: Vehicle Fleet

```swift
class Vehicle {
    var make: String
    var model: String
    var year: Int
    var mileage: Double = 0
    
    init(make: String, model: String, year: Int) {
        self.make = make
        self.model = model
        self.year = year
    }
    
    func drive(miles: Double) {
        mileage += miles
        print("\(make) \(model) drove \(miles) miles")
    }
    
    func service() {
        print("Servicing \(make) \(model)")
    }
}

class ElectricVehicle: Vehicle {
    var batteryLevel: Double = 100.0
    var range: Double
    
    init(make: String, model: String, year: Int, range: Double) {
        self.range = range
        super.init(make: make, model: model, year: year)
    }
    
    override func drive(miles: Double) {
        let batteryUsed = (miles / range) * 100
        batteryLevel = max(0, batteryLevel - batteryUsed)
        super.drive(miles: miles)
        print("Battery level: \(batteryLevel)%")
    }
    
    func charge() {
        batteryLevel = 100
        print("\(make) \(model) fully charged")
    }
}

class Truck: Vehicle {
    var payloadCapacity: Double
    var currentLoad: Double = 0
    
    init(make: String, model: String, year: Int, capacity: Double) {
        self.payloadCapacity = capacity
        super.init(make: make, model: model, year: year)
    }
    
    func loadCargo(_ weight: Double) {
        if currentLoad + weight <= payloadCapacity {
            currentLoad += weight
            print("Loaded \(weight) lbs. Current load: \(currentLoad) lbs")
        } else {
            print("Cannot load - exceeds capacity!")
        }
    }
}

let tesla = ElectricVehicle(make: "Tesla", model: "Model 3", year: 2023, range: 350)
tesla.drive(miles: 100)
tesla.charge()

let truck = Truck(make: "Ford", model: "F-150", year: 2023, capacity: 3000)
truck.loadCargo(1500)
truck.drive(miles: 50)
```

## Type Checking and Casting

Check types and cast instances in class hierarchies:

### Type Checking with `is`

```swift
class Animal {}
class Dog: Animal {}
class Cat: Animal {}

let animals: [Animal] = [Dog(), Cat(), Dog(), Animal()]

var dogCount = 0
for animal in animals {
    if animal is Dog {
        dogCount += 1
    }
}

print("There are \(dogCount) dogs")  // 2
```

### Downcasting with `as?` and `as!`

```swift
for animal in animals {
    if let dog = animal as? Dog {
        print("Found a dog!")
    } else if let cat = animal as? Cat {
        print("Found a cat!")
    }
}
```

## Best Practices

### 1. Favor Composition Over Inheritance

```swift
// ❌ Overusing inheritance
class FlyingSwimmingAnimal: Animal { }

// ✅ Better - use protocols
protocol Flying {
    func fly()
}

protocol Swimming {
    func swim()
}

class Duck: Animal, Flying, Swimming {
    func fly() { print("Flying") }
    func swim() { print("Swimming") }
}
```

### 2. Use final for Performance

```swift
// ✅ Compiler can optimize
final class UtilityClass {
    static func helper() -> String {
        return "Helper"
    }
}
```

### 3. Call super When Overriding

```swift
class Base {
    func setup() {
        // Important setup
    }
}

class Derived: Base {
    override func setup() {
        super.setup()  // ✅ Don't forget!
        // Additional setup
    }
}
```

### 4. Keep Hierarchies Shallow

```swift
// ❌ Too deep
class A {}
class B: A {}
class C: B {}
class D: C {}
class E: D {}

// ✅ Better - shallow hierarchy
class Base {}
class TypeA: Base {}
class TypeB: Base {}
```

## Summary

Inheritance is a powerful feature for building class hierarchies:

**Subclassing** 🏗️
- Inherit properties and methods
- Add new functionality
- Only for classes

**Overriding** 🔄
- Customize inherited behavior
- Use `override` keyword
- Can override methods and properties

**super Keyword** ⬆️
- Access parent implementation
- Required in initializers
- Optional in methods

**final Keyword** 🔒
- Prevent overriding
- Can apply to methods, properties, or entire class
- Performance benefits

## Next Steps

**Next topic:**
- Topic 17: Protocols
- Protocol syntax
- Protocol requirements
- Protocol inheritance
- Protocol composition
- Protocol extensions

## Practice Exercises

1. Create an `Animal` hierarchy with `Dog`, `Cat`, and `Bird`
2. Build a `Document` class hierarchy with `TextDocument` and `SpreadsheetDocument`
3. Create a `UIControl` hierarchy similar to iOS frameworks
4. Implement a payment processor hierarchy (`CreditCard`, `DebitCard`, `PayPal`)
5. Build a game character hierarchy with different types
6. Create a shape drawing system with various shapes

---

**Master inheritance to build extensible, maintainable code!** 🎯

*Remember: Inheritance creates "is-a" relationships - use it wisely!*
