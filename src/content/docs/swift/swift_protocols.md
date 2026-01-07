---
title: "Swift Protocols - Defining Blueprints for Functionality"
description: "Master Swift protocols including syntax, requirements, inheritance, composition, and protocol extensions with practical examples"
---

Welcome to Swift Protocols! Protocols are one of Swift's most powerful features. They define a blueprint of methods, properties, and requirements that suit a particular task or piece of functionality. In this guide, we'll explore how protocols enable flexible, reusable, and testable code.

## What Are Protocols?

A protocol defines requirements that conforming types must implement. Think of protocols as contracts that types agree to fulfill.

**Key Concepts:**
- ✅ Define required methods and properties
- ✅ Can be adopted by classes, structs, and enums
- ✅ Enable polymorphism without inheritance
- ✅ Foundation of protocol-oriented programming
- ✅ Enable dependency injection and testing

**Why Use Protocols?**
- 🎯 **Abstraction** - Define what, not how
- 🎯 **Flexibility** - Multiple conformance (unlike inheritance)
- 🎯 **Testability** - Easy to mock and test
- 🎯 **Decoupling** - Reduce dependencies

## Protocol Syntax

### Defining a Protocol

```swift
protocol Identifiable {
    var id: String { get }
    func identify() -> String
}

struct User: Identifiable {
    var id: String
    var name: String
    
    func identify() -> String {
        return "User: \(name) (ID: \(id))"
    }
}

let user = User(id: "U123", name: "Alice")
print(user.identify())  // User: Alice (ID: U123)
```

### Property Requirements

Protocols can require properties with specific names and types:

```swift
protocol FullyNamed {
    var fullName: String { get }
}

struct Person: FullyNamed {
    var firstName: String
    var lastName: String
    
    var fullName: String {
        return "\(firstName) \(lastName)"
    }
}

class Starship: FullyNamed {
    var prefix: String?
    var name: String
    
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    
    var fullName: String {
        return (prefix != nil ? "\(prefix!) " : "") + name
    }
}

let person = Person(firstName: "John", lastName: "Doe")
print(person.fullName)  // John Doe

let ship = Starship(name: "Enterprise", prefix: "USS")
print(ship.fullName)  // USS Enterprise
```

### Method Requirements

```swift
protocol Drawable {
    func draw()
    func erase()
}

struct Circle: Drawable {
    var radius: Double
    
    func draw() {
        print("Drawing circle with radius \(radius)")
    }
    
    func erase() {
        print("Erasing circle")
    }
}

class Rectangle: Drawable {
    var width: Double
    var height: Double
    
    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }
    
    func draw() {
        print("Drawing rectangle \(width)x\(height)")
    }
    
    func erase() {
        print("Erasing rectangle")
    }
}

let circle = Circle(radius: 5)
circle.draw()  // Drawing circle with radius 5.0
```

### Mutating Method Requirements

For value types, mark methods that modify the instance:

```swift
protocol Togglable {
    mutating func toggle()
}

enum Switch: Togglable {
    case on, off
    
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
lightSwitch.toggle()
print(lightSwitch)  // on
```

### Initializer Requirements

```swift
protocol Initializable {
    init(name: String)
}

class Product: Initializable {
    var name: String
    
    required init(name: String) {
        self.name = name
    }
}

struct Service: Initializable {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}
```

## Protocol Inheritance

Protocols can inherit from other protocols:

```swift
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

protocol Person: Named, Aged {
    func greet()
}

struct Student: Person {
    var name: String
    var age: Int
    var studentID: String
    
    func greet() {
        print("Hi, I'm \(name), \(age) years old, student ID: \(studentID)")
    }
}

let student = Student(name: "Alice", age: 20, studentID: "S12345")
student.greet()
```

### Class-Only Protocols

Restrict protocol adoption to classes:

```swift
protocol SomeClassOnlyProtocol: AnyObject {
    func doSomething()
}

class MyClass: SomeClassOnlyProtocol {
    func doSomething() {
        print("Doing something")
    }
}

// ❌ Error - structs cannot conform to class-only protocols
// struct MyStruct: SomeClassOnlyProtocol {
// }
```

## Protocol Composition

Combine multiple protocols into a single requirement:

```swift
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}

struct Person: Named, Aged {
    var name: String
    var age: Int
}

let person = Person(name: "Alice", age: 25)
wishHappyBirthday(to: person)
// Happy birthday, Alice, you're 25!
```

### Combining Protocols and Classes

```swift
class Location {
    var latitude: Double
    var longitude: Double
    
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

protocol Named {
    var name: String { get }
}

func beginConcert(in location: Location & Named) {
    print("Starting concert at \(location.name)")
}

class City: Location, Named {
    var name: String
    
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}

let city = City(name: "New York", latitude: 40.7128, longitude: -74.0060)
beginConcert(in: city)
```

## Protocol Extensions

Add default implementations to protocols:

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

### Conditional Conformance

Add functionality based on conditions:

```swift
extension Array: Greetable where Element == String {
    var name: String {
        return joined(separator: ", ")
    }
}

let names = ["Alice", "Bob", "Charlie"]
names.greet()  // Hello, I'm Alice, Bob, Charlie
```

### Protocol Extension Constraints

```swift
protocol Container {
    associatedtype Item
    var items: [Item] { get }
}

extension Container where Item: Equatable {
    func contains(_ item: Item) -> Bool {
        return items.contains(item)
    }
}

struct IntContainer: Container {
    var items: [Int]
}

let container = IntContainer(items: [1, 2, 3, 4, 5])
print(container.contains(3))  // true
```

## Associated Types

Protocols can have placeholder types:

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    // Inferred: Item is Int
    private var items: [Int] = []
    
    mutating func append(_ item: Int) {
        items.append(item)
    }
    
    var count: Int {
        return items.count
    }
    
    subscript(i: Int) -> Int {
        return items[i]
    }
}

var stack = IntStack()
stack.append(10)
stack.append(20)
print(stack[0])  // 10
print(stack.count)  // 2
```

### Generic Container

```swift
struct Stack<Element>: Container {
    private var items: [Element] = []
    
    mutating func append(_ item: Element) {
        items.append(item)
    }
    
    var count: Int {
        return items.count
    }
    
    subscript(i: Int) -> Element {
        return items[i]
    }
}

var stringStack = Stack<String>()
stringStack.append("Hello")
stringStack.append("World")
print(stringStack[0])  // Hello
```

## Practical Examples

### Example 1: Data Source Protocol

```swift
protocol DataSource {
    func numberOfItems() -> Int
    func item(at index: Int) -> String
}

class ListView {
    var dataSource: DataSource?
    
    func display() {
        guard let dataSource = dataSource else {
            print("No data source")
            return
        }
        
        for i in 0..<dataSource.numberOfItems() {
            print("\(i + 1). \(dataSource.item(at: i))")
        }
    }
}

struct TodoList: DataSource {
    var todos: [String]
    
    func numberOfItems() -> Int {
        return todos.count
    }
    
    func item(at index: Int) -> String {
        return todos[index]
    }
}

let listView = ListView()
listView.dataSource = TodoList(todos: ["Buy groceries", "Clean house", "Study Swift"])
listView.display()
```

### Example 2: Validation Protocol

```swift
protocol Validatable {
    func validate() -> Bool
    func errorMessage() -> String
}

extension Validatable {
    func errorMessage() -> String {
        return "Validation failed"
    }
}

struct Email: Validatable {
    var address: String
    
    func validate() -> Bool {
        return address.contains("@") && address.contains(".")
    }
    
    func errorMessage() -> String {
        return "Invalid email format"
    }
}

struct Password: Validatable {
    var value: String
    
    func validate() -> Bool {
        return value.count >= 8
    }
    
    func errorMessage() -> String {
        return "Password must be at least 8 characters"
    }
}

let email = Email(address: "test@example.com")
let password = Password(value: "12345")

print(email.validate() ? "✅ Email valid" : "❌ \(email.errorMessage())")
print(password.validate() ? "✅ Password valid" : "❌ \(password.errorMessage())")
```

### Example 3: Codable-like Protocol

```swift
protocol JSONSerializable {
    func toJSON() -> [String: Any]
}

protocol JSONDeserializable {
    init?(json: [String: Any])
}

typealias JSONCodable = JSONSerializable & JSONDeserializable

struct User: JSONCodable {
    var id: String
    var name: String
    var email: String
    
    func toJSON() -> [String: Any] {
        return [
            "id": id,
            "name": name,
            "email": email
        ]
    }
    
    init?(json: [String: Any]) {
        guard let id = json["id"] as? String,
              let name = json["name"] as? String,
              let email = json["email"] as? String else {
            return nil
        }
        
        self.id = id
        self.name = name
        self.email = email
    }
    
    init(id: String, name: String, email: String) {
        self.id = id
        self.name = name
        self.email = email
    }
}

let user = User(id: "123", name: "Alice", email: "alice@email.com")
let json = user.toJSON()
print(json)

if let restored = User(json: json) {
    print("Restored: \(restored.name)")
}
```

### Example 4: Command Pattern

```swift
protocol Command {
    func execute()
    func undo()
}

class TextEditor {
    private var text = ""
    private var history: [Command] = []
    
    func executeCommand(_ command: Command) {
        command.execute()
        history.append(command)
    }
    
    func undo() {
        guard let lastCommand = history.popLast() else { return }
        lastCommand.undo()
    }
    
    func append(_ string: String) {
        text += string
    }
    
    func removeLast(_ count: Int) {
        text.removeLast(count)
    }
    
    func display() {
        print("Text: '\(text)'")
    }
}

class AppendCommand: Command {
    private weak var editor: TextEditor?
    private let textToAppend: String
    
    init(editor: TextEditor, text: String) {
        self.editor = editor
        self.textToAppend = text
    }
    
    func execute() {
        editor?.append(textToAppend)
    }
    
    func undo() {
        editor?.removeLast(textToAppend.count)
    }
}

let editor = TextEditor()
editor.executeCommand(AppendCommand(editor: editor, text: "Hello "))
editor.executeCommand(AppendCommand(editor: editor, text: "World"))
editor.display()  // Text: 'Hello World'

editor.undo()
editor.display()  // Text: 'Hello '
```

### Example 5: Repository Pattern

```swift
protocol Repository {
    associatedtype Entity
    func getAll() -> [Entity]
    func get(id: String) -> Entity?
    func save(_ entity: Entity)
    func delete(id: String)
}

struct User {
    let id: String
    var name: String
    var email: String
}

class UserRepository: Repository {
    private var users: [User] = []
    
    func getAll() -> [User] {
        return users
    }
    
    func get(id: String) -> User? {
        return users.first { $0.id == id }
    }
    
    func save(_ entity: User) {
        if let index = users.firstIndex(where: { $0.id == entity.id }) {
            users[index] = entity
        } else {
            users.append(entity)
        }
    }
    
    func delete(id: String) {
        users.removeAll { $0.id == id }
    }
}

let repo = UserRepository()
repo.save(User(id: "1", name: "Alice", email: "alice@email.com"))
repo.save(User(id: "2", name: "Bob", email: "bob@email.com"))

print("All users: \(repo.getAll().count)")
if let user = repo.get(id: "1") {
    print("Found: \(user.name)")
}
```

## Delegation Pattern

Protocols are perfect for delegation:

```swift
protocol TaskDelegate: AnyObject {
    func taskDidStart()
    func taskDidComplete(result: String)
    func taskDidFail(error: String)
}

class Task {
    weak var delegate: TaskDelegate?
    
    func run() {
        delegate?.taskDidStart()
        
        // Simulate work
        let success = true
        
        if success {
            delegate?.taskDidComplete(result: "Task completed successfully")
        } else {
            delegate?.taskDidFail(error: "Task failed")
        }
    }
}

class TaskManager: TaskDelegate {
    func taskDidStart() {
        print("Task started")
    }
    
    func taskDidComplete(result: String) {
        print("✅ \(result)")
    }
    
    func taskDidFail(error: String) {
        print("❌ \(error)")
    }
    
    func execute() {
        let task = Task()
        task.delegate = self
        task.run()
    }
}

let manager = TaskManager()
manager.execute()
```

## Best Practices

### 1. Prefer Protocols Over Inheritance

```swift
// ✅ Good - protocols
protocol Flying {
    func fly()
}

protocol Swimming {
    func swim()
}

struct Duck: Flying, Swimming {
    func fly() { print("Flying") }
    func swim() { print("Swimming") }
}

// ❌ Avoid - multiple inheritance not possible
// class Duck: FlyingAnimal, SwimmingAnimal { }
```

### 2. Use Protocol Extensions for Default Behavior

```swift
protocol Describable {
    var description: String { get }
}

extension Describable {
    func printDescription() {
        print(description)
    }
}
```

### 3. Name Protocols Appropriately

```swift
// ✅ Good naming
protocol Drawable { }      // -able suffix for capabilities
protocol DataSource { }    // Descriptive names
protocol Delegate { }      // Clear purpose

// ❌ Poor naming
protocol Thing { }
protocol Stuff { }
```

### 4. Use Weak Delegates

```swift
//✅ Prevent retain cycles
protocol MyDelegate: AnyObject {
    func didComplete()
}

class MyClass {
    weak var delegate: MyDelegate?
}
```

### 5. Keep Protocols Focused

```swift
// ✅ Single responsibility
protocol Readable {
    func read() -> String
}

protocol Writable {
    func write(_ data: String)
}

// ❌ Too many responsibilities
protocol DataHandler {
    func read() -> String
    func write(_ data: String)
    func delete()
    func validate() -> Bool
    func transform() -> String
}
```

## Summary

Protocols are fundamental to Swift's design:

**Protocol Basics** 📋
- Define requirements
- Can be adopted by any type
- Enable polymorphism

**Requirements** 📝
- Properties (get/set)
- Methods
- Initializers
- Mutating methods

**Inheritance** 🔗
- Protocols can inherit
- Multiple inheritance allowed
- Class-only protocols with AnyObject

**Composition** 🧩
- Combine multiple protocols
- Protocol & Class requirements
- Flexible type requirements

**Extensions** ⚡
- Default implementations
- Additional functionality
- Conditional conformance

**Associated Types** 🎯
- Generic protocols
- Type placeholders
- Powerful abstractions

## Next Steps

**Next topic:**
- Topic 18: Extensions
- Adding functionality to existing types
- Computed properties in extensions
- Protocol conformance through extensions

## Practice Exercises

1. Create a `Vehicle` protocol with speed and fuel requirements
2. Build a data persistence protocol with CRUD operations
3. Implement a notification system using protocols
4. Create a payment processor protocol hierarchy
5. Design a form validation system with protocols
6. Build a logger protocol with different implementations

---

**Master protocols to write flexible, testable code!** 🎯

*Remember: Protocols define capabilities, not implementations!*
