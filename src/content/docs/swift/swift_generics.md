---
title: "Swift Generics - Writing Flexible, Reusable Code"
description: "Master Swift generics including generic functions, generic types, type constraints, and associated types with practical examples"
---

Welcome to Swift Generics! Generics are one of Swift's most powerful features, allowing you to write flexible, reusable functions and types that can work with any type. In this guide, we'll explore how to use generics to write clean, type-safe, and efficient code.

## What Are Generics?

Generics enable you to write code that works with any type, while still maintaining type safety. Instead of writing separate functions for each type, you write one generic function.

**Why Use Generics?**
- ✅ **Code Reusability** - Write once, use with many types
- ✅ **Type Safety** - Compile-time type checking
- ✅ **Flexibility** - Work with any type
- ✅ **Performance** - No runtime overhead
- ✅ **Clean Code** - Avoid duplication

**Example Problem Without Generics:**
```swift
// ❌ Duplicated code for each type
func swapInts(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

func swapStrings(_ a: inout String, _ b: inout String) {
    let temp = a
    a = b
    b = temp
}

// Need to write this for every type!
```

## Generic Functions

### Basic Generic Function

```swift
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

var x = 5
var y = 10
swap(&x, &y)
print("x: \(x), y: \(y)")  // x: 10, y: 5

var name1 = "Alice"
var name2 = "Bob"
swap(&name1, &name2)
print("name1: \(name1), name2: \(name2)")  // name1: Bob, name2: Alice
```

### Generic Function with Return Value

```swift
func makeArray<T>(repeating item: T, count: Int) -> [T] {
    var result: [T] = []
    for _ in 0..<count {
        result.append(item)
    }
    return result
}

let integers = makeArray(repeating: 5, count: 3)
print(integers)  // [5, 5, 5]

let strings = makeArray(repeating: "Hello", count: 2)
print(strings)  // ["Hello", "Hello"]
```

### Multiple Type Parameters

```swift
func printPair<T, U>(_ first: T, _ second: U) {
    print("First: \(first), Second: \(second)")
}

printPair(42, "Answer")  // First: 42, Second: Answer
printPair(3.14, true)    // First: 3.14, Second: true
```

### Generic Function with Dictionary

```swift
func makeDictionary<Key: Hashable, Value>(keys: [Key], values: [Value]) -> [Key: Value] {
    var dict: [Key: Value] = [:]
    for (index, key) in keys.enumerated() {
        if index < values.count {
            dict[key] = values[index]
        }
    }
    return dict
}

let dict = makeDictionary(keys: ["a", "b", "c"], values: [1, 2, 3])
print(dict)  // ["a": 1, "b": 2, "c": 3]
```

## Generic Types

### Generic Stack

```swift
struct Stack<Element> {
    private var items: [Element] = []
    
    var isEmpty: Bool {
        return items.isEmpty
    }
    
    var count: Int {
        return items.count
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
}

var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
intStack.push(3)
print(intStack.pop() ?? 0)  // 3

var stringStack = Stack<String>()
stringStack.push("Hello")
stringStack.push("World")
print(stringStack.peek() ?? "")  // World
```

### Generic Pair

```swift
struct Pair<T, U> {
    var first: T
    var second: U
    
    init(_ first: T, _ second: U) {
        self.first = first
        self.second = second
    }
    
    func swapped() -> Pair<U, T> {
        return Pair<U, T>(second, first)
    }
}

let pair = Pair(42, "Answer")
print("\(pair.first): \(pair.second)")  // 42: Answer

let swapped = pair.swapped()
print("\(swapped.first): \(swapped.second)")  // Answer: 42
```

### Generic Wrapper

```swift
struct Box<T> {
    var value: T
    
    func map<U>(_ transform: (T) -> U) -> Box<U> {
        return Box<U>(value: transform(value))
    }
}

let intBox = Box(value: 42)
let stringBox = intBox.map { String($0) }
print(stringBox.value)  // "42"

let doubled = intBox.map { $0 * 2 }
print(doubled.value)  // 84
```

## Type Constraints

Restrict generic types to types that conform to specific protocols or inherit from specific classes.

### Basic Type Constraint

```swift
func findIndex<T: Equatable>(of item: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == item {
            return index
        }
    }
    return nil
}

let numbers = [1, 2, 3, 4, 5]
if let index = findIndex(of: 3, in: numbers) {
    print("Found at index \(index)")  // Found at index 2
}

let names = ["Alice", "Bob", "Charlie"]
if let index = findIndex(of: "Bob", in: names) {
    print("Found at index \(index)")  // Found at index 1
}
```

### Multiple Constraints

```swift
func compare<T: Comparable & CustomStringConvertible>(_ a: T, _ b: T) {
    if a < b {
        print("\(a) is less than \(b)")
    } else if a > b {
        print("\(a) is greater than \(b)")
    } else {
        print("\(a) equals \(b)")
    }
}

compare(5, 10)  // 5 is less than 10
compare("apple", "banana")  // apple is less than banana
```

### Constrained Generic Type

```swift
struct SortedArray<Element: Comparable> {
    private var items: [Element] = []
    
    var count: Int {
        return items.count
    }
    
    mutating func insert(_ item: Element) {
        if let index = items.firstIndex(where: { $0 > item }) {
            items.insert(item, at: index)
        } else {
            items.append(item)
        }
    }
    
    func get(at index: Int) -> Element? {
        return items.indices.contains(index) ? items[index] : nil
    }
    
    var all: [Element] {
        return items
    }
}

var sortedNumbers = SortedArray<Int>()
sortedNumbers.insert(5)
sortedNumbers.insert(2)
sortedNumbers.insert(8)
sortedNumbers.insert(1)
print(sortedNumbers.all)  // [1, 2, 5, 8]
```

## Associated Types in Protocols

Protocols can have associated types as placeholders for types.

### Container Protocol

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    // typealias Item = Int (inferred)
    private var items: [Int] = []
    
    var count: Int {
        return items.count
    }
    
    mutating func append(_ item: Int) {
        items.append(item)
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
struct GenericStack<Element>: Container {
    private var items: [Element] = []
    
    var count: Int {
        return items.count
    }
    
    mutating func append(_ item: Element) {
        items.append(item)
    }
    
    subscript(i: Int) -> Element {
        return items[i]
    }
}

var stringStack = GenericStack<String>()
stringStack.append("Hello")
stringStack.append("World")
print(stringStack[1])  // World
```

### Where Clauses

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

func allItemsMatch<C1: Container, C2: Container>(_ container1: C1, _ container2: C2) -> Bool
    where C1.Item == C2.Item, C1.Item: Equatable {
    
    guard container1.count == container2.count else {
        return false
    }
    
    for i in 0..<container1.count {
        if container1[i] != container2[i] {
            return false
        }
    }
    
    return true
}
```

## Practical Examples

### Example 1: Generic Result Type

```swift
enum Result<Success, Failure: Error> {
    case success(Success)
    case failure(Failure)
    
    func map<NewSuccess>(_ transform: (Success) -> NewSuccess) -> Result<NewSuccess, Failure> {
        switch self {
        case .success(let value):
            return .success(transform(value))
        case .failure(let error):
            return .failure(error)
        }
    }
}

enum NetworkError: Error {
    case noConnection
    case timeout
}

func fetchData() -> Result<String, NetworkError> {
    return .success("User data")
}

let result = fetchData()
let transformed = result.map { $0.uppercased() }

switch transformed {
case .success(let data):
    print(data)  // USER DATA
case .failure(let error):
    print("Error: \(error)")
}
```

### Example 2: Generic Queue

```swift
struct Queue<Element> {
    private var items: [Element] = []
    
    var isEmpty: Bool {
        return items.isEmpty
    }
    
    var count: Int {
        return items.count
    }
    
    var front: Element? {
        return items.first
    }
    
    mutating func enqueue(_ item: Element) {
        items.append(item)
    }
    
    mutating func dequeue() -> Element? {
        return isEmpty ? nil : items.removeFirst()
    }
}

var queue = Queue<String>()
queue.enqueue("First")
queue.enqueue("Second")
queue.enqueue("Third")

while let item = queue.dequeue() {
    print(item)
}
// Output:
// First
// Second
// Third
```

### Example 3: Generic Cache

```swift
class Cache<Key: Hashable, Value> {
    private var storage: [Key: Value] = [:]
    
    func get(_ key: Key) -> Value? {
        return storage[key]
    }
    
    func set(_ key: Key, value: Value) {
        storage[key] = value
    }
    
    func remove(_ key: Key) {
        storage.removeValue(forKey: key)
    }
    
    func clear() {
        storage.removeAll()
    }
    
    var count: Int {
        return storage.count
    }
}

let userCache = Cache<String, String>()
userCache.set("user1", value: "Alice")
userCache.set("user2", value: "Bob")

if let user = userCache.get("user1") {
    print("Found: \(user)")  // Found: Alice
}

print("Cache size: \(userCache.count)")  // Cache size: 2
```

### Example 4: Generic Tree

```swift
class TreeNode<T> {
    var value: T
    var children: [TreeNode<T>] = []
    
    init(_ value: T) {
        self.value = value
    }
    
    func addChild(_ child: TreeNode<T>) {
        children.append(child)
    }
    
    func traverse(visit: (T) -> Void) {
        visit(value)
        children.forEach { $0.traverse(visit: visit) }
    }
}

let root = TreeNode(1)
let child1 = TreeNode(2)
let child2 = TreeNode(3)
let grandchild = TreeNode(4)

root.addChild(child1)
root.addChild(child2)
child1.addChild(grandchild)

print("Tree traversal:")
root.traverse { print($0) }
// Output:
// 1
// 2
// 4
// 3
```

### Example 5: Generic Repository Pattern

```swift
protocol Entity {
    var id: String { get }
}

class Repository<T: Entity> {
    private var items: [String: T] = [:]
    
    func save(_ item: T) {
        items[item.id] = item
    }
    
    func find(by id: String) -> T? {
        return items[id]
    }
    
    func findAll() -> [T] {
        return Array(items.values)
    }
    
    func delete(by id: String) {
        items.removeValue(forKey: id)
    }
    
    var count: Int {
        return items.count
    }
}

struct User: Entity {
    let id: String
    var name: String
    var email: String
}

struct Product: Entity {
    let id: String
    var name: String
    var price: Double
}

let userRepo = Repository<User>()
userRepo.save(User(id: "1", name: "Alice", email: "alice@email.com"))
userRepo.save(User(id: "2", name: "Bob", email: "bob@email.com"))

if let user = userRepo.find(by: "1") {
    print("Found user: \(user.name)")  // Found user: Alice
}

let productRepo = Repository<Product>()
productRepo.save(Product(id: "P1", name: "iPhone", price: 999.99))
print("Products: \(productRepo.count)")  // Products: 1
```

### Example 6: Generic Optional Extensions

```swift
extension Optional {
    func unwrap(or defaultValue: Wrapped) -> Wrapped {
        return self ?? defaultValue
    }
    
    func map<U>(_ transform: (Wrapped) throws -> U) rethrows -> U? {
        guard let value = self else { return nil }
        return try transform(value)
    }
}

let optional: Int? = nil
print(optional.unwrap(or: 42))  // 42

let value: Int? = 10
let doubled = value.map { $0 * 2 }
print(doubled ?? 0)  // 20
```

## Generic Extensions

Extend generic types with additional functionality:

```swift
extension Stack where Element: Equatable {
    func contains(_ item: Element) -> Bool {
        return items.contains(item)
    }
}

extension Stack where Element: Comparable {
    func max() -> Element? {
        return items.max()
    }
    
    func min() -> Element? {
        return items.min()
    }
}

var numberStack = Stack<Int>()
numberStack.push(5)
numberStack.push(2)
numberStack.push(8)

print(numberStack.contains(5))  // true
print(numberStack.max() ?? 0)   // 8
```

## Best Practices

### 1. Use Meaningful Type Parameter Names

```swift
// ✅ Good - descriptive names
struct Dictionary<Key: Hashable, Value> { }
struct Result<Success, Failure: Error> { }

// ❌ Less clear
struct Dictionary<A: Hashable, B> { }
struct Result<T, E: Error> { }
```

### 2. Apply Constraints When Needed

```swift
// ✅ Good - constrained to Comparable
func findMax<T: Comparable>(_ array: [T]) -> T? {
    return array.max()
}

// ❌ Too generic - won't work
// func findMax<T>(_ array: [T]) -> T? {
//     return array.max()  // Error: T doesn't conform to Comparable
// }
```

### 3. Use Where Clauses for Complex Constraints

```swift
// ✅ Good - readable
func process<T>(_ items: [T]) where T: Codable & Equatable {
    // Process items
}

// ❌ Less readable
func process<T: Codable & Equatable>(_ items: [T]) {
    // Process items
}
```

### 4. Prefer Protocols Over Concrete Types

```swift
// ✅ Good - flexible
func save<T: Encodable>(_ item: T) {
    // Can save any Encodable type
}

// ❌ Too specific
func save(_ item: User) {
    // Only works with User
}
```

## Summary

Generics enable powerful, flexible code:

**Generic Functions** 🔧
- Work with any type
- Type-safe at compile time
- Eliminate code duplication

**Generic Types** 📦
- Stack, Queue, Cache, etc.
- Reusable data structures
- Type parameters

**Type Constraints** 🔒
- Restrict to specific protocols
- Multiple constraints with &
- Where clauses for clarity

**Associated Types** 🎯
- Generic protocols
- Placeholder types
- Flexible protocol design

**Benefits** ⭐
- Code reuse
- Type safety
- Performance
- Flexibility

## Next Steps

**Congratulations!** 🎉 You've completed a comprehensive journey through Swift's core features!

**What's next:**
- Practice building generic data structures
- Explore Swift Standard Library generics
- Build real-world projects using these concepts
- Dive into advanced Swift topics (async/await, actors, etc.)

## Practice Exercises

1. Create a generic `LinkedList<T>` data structure
2. Build a generic `priorityQueue<T: Comparable>`
3. Implement a generic `Either<Left, Right>` type
4. Create a generic caching system with expiration
5. Build a type-safe network client using generics
6. Implement a generic validation framework

---

**Master generics to write powerful, reusable Swift code!** 🚀

*Remember: Generics = flexibility + type safety!*
