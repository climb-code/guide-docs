---
title: "Swift Memory Management - Understanding ARC"
description: "Master Swift's Automatic Reference Counting including strong, weak, and unowned references, and avoiding memory leaks"
---

Welcome to Swift Memory Management! Understanding how Swift manages memory is crucial for building efficient, reliable apps. Swift uses Automatic Reference Counting (ARC) to track and manage your app's memory usage. In this guide, we'll explore how ARC works and how to avoid common memory issues.

## What is ARC?

**Automatic Reference Counting (ARC)** automatically manages your app's memory by tracking how many references exist to each class instance. When an instance is no longer needed (zero references), ARC frees up its memory.

**Key Concepts:**
- ✅ **Automatic** - No manual memory management needed
- ✅ **Reference Counting** - Tracks number of references
- ✅ **Deterministic** - Memory freed immediately when unused
- ✅ **Zero-cost** - No runtime overhead (compile-time)

**Why Learn ARC?**
- 🎯 **Prevent Memory Leaks** - Avoid objects staying in memory
- 🎯 **Avoid Crashes** - Prevent accessing deallocated objects
- 🎯 **Optimize Performance** - Efficient memory usage
- 🎯 **Build Reliable Apps** - Stable, predictable behavior

**Important:** ARC only applies to **class instances** (reference types). Structs and enums are value types and don't use ARC.

## How ARC Works

### Reference Counting Basics

```swift
class Person {
    let name: String
    
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
}

var reference1: Person?
var reference2: Person?
var reference3: Person?

// Create instance - reference count = 1
reference1 = Person(name: "Alice")
// Output: Alice is being initialized

// reference count = 2
reference2 = reference1

// reference count = 3
reference3 = reference1

// reference count = 2
reference1 = nil

// reference count = 1
reference2 = nil

// reference count = 0 - instance is deallocated
reference3 = nil
// Output: Alice is being deinitialized
```

### Strong References (Default)

By default, all references are strong:

```swift
class Apartment {
    let number: Int
    
    init(number: Int) {
        self.number = number
        print("Apartment \(number) is initialized")
    }
    
    deinit {
        print("Apartment \(number) is deinitialized")
    }
}

var apt: Apartment?
apt = Apartment(number: 101)  // Reference count = 1
// Output: Apartment 101 is initialized

apt = nil  // Reference count = 0
// Output: Apartment 101 is deinitialized
```

## Strong Reference Cycles

When two objects hold strong references to each other, a **retain cycle** occurs, causing a memory leak.

### The Problem

```swift
class Person {
    let name: String
    var apartment: Apartment?
    
    init(name: String) {
        self.name = name
        print("\(name) is initialized")
    }
    
    deinit {
        print("\(name) is deinitialized")
    }
}

class Apartment {
    let unit: String
    var tenant: Person?
    
    init(unit: String) {
        self.unit = unit
        print("Apartment \(unit) is initialized")
    }
    
    deinit {
        print("Apartment \(unit) is deinitialized")
    }
}

var john: Person?
var unit4A: Apartment?

john = Person(name: "John")
unit4A = Apartment(unit: "4A")

// Create retain cycle
john!.apartment = unit4A  // Person -> Apartment
unit4A!.tenant = john     // Apartment -> Person

// Set to nil - but instances are NOT deallocated!
john = nil
unit4A = nil

// ❌ Neither deinit is called - MEMORY LEAK!
```

## Weak References

Weak references don't increase the reference count and automatically become `nil` when the instance is deallocated.

### Breaking Cycles with Weak

```swift
class Person {
    let name: String
    var apartment: Apartment?
    
    init(name: String) {
        self.name = name
        print("\(name) is initialized")
    }
    
    deinit {
        print("\(name) is deinitialized")
    }
}

class Apartment {
    let unit: String
    weak var tenant: Person?  // ✅ Weak reference
    
    init(unit: String) {
        self.unit = unit
        print("Apartment \(unit) is initialized")
    }
    
    deinit {
        print("Apartment \(unit) is deinitialized")
    }
}

var john: Person?
var unit4A: Apartment?

john = Person(name: "John")
unit4A = Apartment(unit: "4A")

john!.apartment = unit4A  // Strong: Person -> Apartment
unit4A!.tenant = john     // Weak: Apartment -> Person

john = nil
// Output: John is deinitialized (tenant becomes nil automatically)

unit4A = nil
// Output: Apartment 4A is deinitialized

// ✅ Both objects properly deallocated!
```

### Weak References are Always Optional

```swift
class Dog {
    let name: String
    weak var owner: Person?  // Must be optional
    
    init(name: String) {
        self.name = name
    }
}
```

## Unowned References

Unowned references are like weak references but are **never** optional. Use when you know the reference will never be `nil` during the instance's lifetime.

### When to Use Unowned

```swift
class Customer {
    let name: String
    var card: CreditCard?
    
    init(name: String) {
        self.name = name
        print("\(name) is initialized")
    }
    
    deinit {
        print("\(name) is deinitialized")
    }
}

class CreditCard {
    let number: String
    unowned let customer: Customer  // ✅ Unowned - never nil
    
    init(number: String, customer: Customer) {
        self.number = number
        self.customer = customer
        print("Card \(number) is initialized")
    }
    
    deinit {
        print("Card \(number) is deinitialized")
    }
}

var alice: Customer?
alice = Customer(name: "Alice")
alice!.card = CreditCard(number: "1234-5678-9012-3456", customer: alice!)

alice = nil
// Output:
// Alice is deinitialized
// Card 1234-5678-9012-3456 is deinitialized

// ✅ Both properly deallocated
```

### Weak vs Unowned

```swift
// ✅ Use weak when reference can be nil
class Parent {
    weak var delegate: Delegate?  // Might be nil
}

// ✅ Use unowned when reference is never nil
class Child {
    unowned let parent: Parent  // Always has a parent
    
    init(parent: Parent) {
        self.parent = parent
    }
}

// ❌ Dangerous - crashes if customer is deallocated
// class CreditCard {
//     unowned let customer: Customer
// }
// If customer dies first, accessing it crashes!
```

## Closures and Reference Cycles

Closures can create strong reference cycles when they capture `self`.

### The Problem

```swift
class ViewController {
    var name = "Main"
    var closure: (() -> Void)?
    
    init() {
        // ❌ Creates retain cycle
        closure = {
            print(self.name)  // Captures self strongly
        }
    }
    
    deinit {
        print("ViewController deinitialized")
    }
}

var vc: ViewController? = ViewController()
vc = nil
// ❌ deinit never called - MEMORY LEAK!
```

### Solution: Capture Lists

Use `[weak self]` or `[unowned self]`:

```swift
class ViewController {
    var name = "Main"
    var closure: (() -> Void)?
    
    init() {
        // ✅ Breaks cycle with weak self
        closure = { [weak self] in
            guard let self = self else { return }
            print(self.name)
        }
    }
    
    deinit {
        print("ViewController deinitialized")
    }
}

var vc: ViewController? = ViewController()
vc = nil
// Output: ViewController deinitialized ✅
```

### Weak Self Pattern

```swift
class DataManager {
    var name = "DataManager"
    
    func fetchData(completion: @escaping (String) -> Void) {
        // Simulate async operation
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
            guard let self = self else {
                print("DataManager was deallocated")
                return
            }
            completion("Data from \(self.name)")
        }
    }
    
    deinit {
        print("DataManager deinitialized")
    }
}

var manager: DataManager? = DataManager()
manager?.fetchData { data in
    print(data)
}
manager = nil
// Output: DataManager deinitialized (after 1 second)
```

### Unowned Self in Closures

```swift
class ImageLoader {
    let url: String
    
    init(url: String) {
        self.url = url
        print("ImageLoader initialized")
    }
    
    func load(completion: @escaping () -> Void) {
        // ✅ Use unowned when self will outlive the closure
        DispatchQueue.global().async { [unowned self] in
            print("Loading \(self.url)")
            completion()
        }
    }
    
    deinit {
        print("ImageLoader deinitialized")
    }
}
```

## Practical Examples

### Example 1: Delegate Pattern

```swift
protocol TaskDelegate: AnyObject {
    func taskDidComplete(_ task: Task)
    func taskDidFail(_ task: Task, error: String)
}

class Task {
    let name: String
    weak var delegate: TaskDelegate?  // ✅ Weak to avoid cycle
    
    init(name: String) {
        self.name = name
        print("Task '\(name)' created")
    }
    
    func execute() {
        print("Executing \(name)...")
        
        // Simulate work
        let success = true
        
        if success {
            delegate?.taskDidComplete(self)
        } else {
            delegate?.taskDidFail(self, error: "Failed")
        }
    }
    
    deinit {
        print("Task '\(name)' deinitialized")
    }
}

class TaskManager: TaskDelegate {
    var tasks: [Task] = []
    
    func addTask(_ task: Task) {
        task.delegate = self
        tasks.append(task)
    }
    
    func taskDidComplete(_ task: Task) {
        print("✅ Task completed: \(task.name)")
    }
    
    func taskDidFail(_ task: Task, error: String) {
        print("❌ Task failed: \(task.name) - \(error)")
    }
    
    deinit {
        print("TaskManager deinitialized")
    }
}

var manager: TaskManager? = TaskManager()
let task = Task(name: "Download")
manager?.addTask(task)
task.execute()

manager = nil
// ✅ Properly deallocated
```

### Example 2: Parent-Child Relationship

```swift
class TreeNode {
    let value: String
    weak var parent: TreeNode?  // ✅ Weak to avoid cycle
    var children: [TreeNode] = []
    
    init(value: String) {
        self.value = value
        print("Node '\(value)' created")
    }
    
    func addChild(_ child: TreeNode) {
        child.parent = self
        children.append(child)
    }
    
    deinit {
        print("Node '\(value)' deinitialized")
    }
}

var root: TreeNode? = TreeNode(value: "Root")
let child1 = TreeNode(value: "Child 1")
let child2 = TreeNode(value: "Child 2")

root?.addChild(child1)
root?.addChild(child2)

root = nil
// Output: All nodes properly deinitialized ✅
```

### Example 3: Timer with Closure

```swift
class TimerManager {
    var name = "TimerManager"
    var timer: Timer?
    
    func startTimer() {
        // ❌ BAD - creates retain cycle
        // timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
        //     print(self.name)
        // }
        
        // ✅ GOOD - weak self
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            guard let self = self else { return }
            print(self.name)
        }
    }
    
    func stopTimer() {
        timer?.invalidate()
        timer = nil
    }
    
    deinit {
        print("TimerManager deinitialized")
        stopTimer()
    }
}

var manager: TimerManager? = TimerManager()
manager?.startTimer()

// Stop timer before deallocating
manager?.stopTimer()
manager = nil
```

### Example 4: Network Layer

```swift
class NetworkRequest {
    let url: String
    var completion: ((Result<String, Error>) -> Void)?
    
    init(url: String) {
        self.url = url
        print("Request created for \(url)")
    }
    
    func execute() {
        // Simulate network request
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
            guard let self = self else { return }
            self.completion?(.success("Response from \(self.url)"))
        }
    }
    
    deinit {
        print("Request deinitialized")
    }
}

class APIClient {
    func fetchData(url: String, completion: @escaping (String) -> Void) {
        let request = NetworkRequest(url: url)
        
        request.completion = { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let data):
                completion(data)
            case .failure(let error):
                print("Error: \(error)")
            }
        }
        
        request.execute()
    }
    
    deinit {
        print("APIClient deinitialized")
    }
}
```

### Example 5: Cache with Cleanup

```swift
class Cache {
    private var storage: [String: AnyObject] = [:]
    
    func set(key: String, value: AnyObject) {
        storage[key] = value
    }
    
    func get(key: String) -> AnyObject? {
        return storage[key]
    }
    
    func clear() {
        storage.removeAll()
    }
    
    deinit {
        print("Cache deinitialized, clearing \(storage.count) items")
        clear()
    }
}

class CacheManager {
    private var cache = Cache()
    
    func cacheObject(_ object: AnyObject, forKey key: String) {
        cache.set(key: key, value: object)
    }
    
    deinit {
        print("CacheManager deinitialized")
    }
}
```

## Best Practices

### 1. Always Use Weak for Delegates

```swift
// ✅ Good
protocol SomeDelegate: AnyObject {
    func didUpdate()
}

class SomeClass {
    weak var delegate: SomeDelegate?
}

// ❌ Bad - creates retain cycle
class SomeClass {
    var delegate: SomeDelegate?
}
```

### 2. Use Capture Lists in Closures

```swift
// ✅ Good
button.onTap = { [weak self] in
    guard let self = self else { return }
    self.handleTap()
}

// ❌ Bad - retain cycle
button.onTap = {
    self.handleTap()
}
```

### 3. Choose Weak vs Unowned Carefully

```swift
// ✅ Weak - might be nil
class View {
    weak var delegate: ViewDelegate?
}

// ✅ Unowned - never nil during lifetime
class CreditCard {
    unowned let owner: Person
}

// ❌ Wrong - should be weak
class View {
    unowned var delegate: ViewDelegate  // Crashes if nil!
}
```

### 4. Break Cycles Explicitly

```swift
class Parent {
    var child: Child?
    
    func cleanup() {
        child = nil  // Break cycle
    }
    
    deinit {
        cleanup()
    }
}
```

## Common Patterns

### Pattern 1: Weak Self in Async Code

```swift
class DataLoader {
    func load(completion: @escaping (Data) -> Void) {
        URLSession.shared.dataTask(with: URL(string: "...")!) { [weak self] data, _, _ in
            guard let self = self else { return }
            guard let data = data else { return }
            completion(data)
        }.resume()
    }
}
```

### Pattern 2: Unowned for Child References

```swift
class Country {
    let name: String
    let capital: City
    
    init(name: String, capitalName: String) {
        self.name = name
        self.capital = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

### Pattern 3: Invalidate on Deinit

```swift
class ViewController {
    var timer: Timer?
    
    deinit {
        timer?.invalidate()
    }
}
```

## Summary

Memory management is crucial for app performance:

**ARC Basics** 🔄
- Automatic reference counting
- Tracks strong references
- Deallocates at zero references
- Only for class instances

**Reference Types** 🎯
- **Strong** (default) - increases count
- **Weak** - optional, doesn't increase count
- **Unowned** - non-optional, doesn't increase count

**Retain Cycles** ⚠️
- Occur with mutual strong references
- Cause memory leaks
- Break with weak or unowned

**Closures** 📦
- Capture self strongly by default
- Use [weak self] or [unowned self]
- Always use guard let with weak

**Best Practices** ⭐
- Delegates are always weak
- Use weak in closures
- Choose weak vs unowned carefully
- Clean up in deinit

## Practice Exercises

1. Identify and fix retain cycles in sample code
2. Build a view controller with proper memory management
3. Create a cache system that cleans up properly
4. Implement a network layer without memory leaks
5. Build a delegate pattern correctly
6. Create a timer manager with proper cleanup

---

**Master ARC to build memory-efficient apps!** 🚀

*Remember: When in doubt, use weak! It's safer than unowned.*
