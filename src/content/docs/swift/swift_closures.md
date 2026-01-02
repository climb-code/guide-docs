---
title: "Swift Closures - Self-Contained Code Blocks"
description: "Master Swift closures including syntax, trailing closures, capturing values, and escaping vs non-escaping closures with practical examples"
---

Welcome to Swift Closures! Closures are one of Swift's most powerful features. They're self-contained blocks of functionality that you can pass around and use in your code. Think of them as anonymous functions that can capture and store references to variables and constants from their surrounding context. In this guide, we'll explore everything about closures in Swift.

## What Are Closures?

Closures are similar to functions, but with superpowers! They're self-contained blocks of code that can be:
- **Passed as arguments** to other functions
- **Returned from functions**
- **Stored in variables or properties**
- **Defined inline** without needing a name

**In fact, functions are actually special cases of closures!**

Closures come in three forms:
1. **Global functions** - functions with a name that don't capture any values
2. **Nested functions** - functions with a name that can capture values from their enclosing function
3. **Closure expressions** - unnamed closures written in lightweight syntax

## Closure Syntax

### Basic Closure Syntax

```swift
{ (parameters) -> ReturnType in
    // code
}
```

Let's see it in action:

```swift
// Simple closure that adds two numbers
let add = { (a: Int, b: Int) -> Int in
    return a + b
}

let result = add(5, 3)
print(result)  // Output: 8

// Closure that greets someone
let greet = { (name: String) -> String in
    return "Hello, \(name)!"
}

print(greet("Alice"))  // Output: Hello, Alice!
```

### Closures as Function Parameters

This is where closures really shine:

```swift
func performOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

// Pass a closure directly
let sum = performOperation(10, 5) { (a, b) in
    return a + b
}
print("Sum: \(sum)")  // Output: Sum: 15

let product = performOperation(10, 5) { (a, b) in
    return a * b
}
print("Product: \(product)")  // Output: Product: 50
```

## Closure Expression Syntax Shorthand

Swift provides several ways to write closures more concisely:

### 1. Inferring Type from Context

Swift can infer parameter and return types:

```swift
let numbers = [1, 2, 3, 4, 5]

// Explicit types
let doubled = numbers.map({ (number: Int) -> Int in
    return number * 2
})

// Type inference - Swift knows the types
let doubledShort = numbers.map({ number in
    return number * 2
})

print(doubledShort)  // Output: [2, 4, 6, 8, 10]
```

### 2. Implicit Returns from Single-Expression Closures

If the closure body contains only one expression, you can omit `return`:

```swift
let numbers = [1, 2, 3, 4, 5]

// With return keyword
let squared = numbers.map({ number in
    return number * number
})

// Implicit return
let squaredShort = numbers.map({ number in
    number * number
})

print(squaredShort)  // Output: [1, 4, 9, 16, 25]
```

### 3. Shorthand Argument Names

Swift provides shorthand argument names: `$0`, `$1`, `$2`, etc.

```swift
let numbers = [1, 2, 3, 4, 5]

// Using shorthand argument names
let tripled = numbers.map({ $0 * 3 })
print(tripled)  // Output: [3, 6, 9, 12, 15]

// With multiple parameters
let pairs = [(1, "one"), (2, "two"), (3, "three")]
let sorted = pairs.sorted(by: { $0.0 < $1.0 })
print(sorted)  // Output: [(1, "one"), (2, "two"), (3, "three")]
```

### 4. Operator Methods

For simple operations, you can pass operators directly:

```swift
let numbers = [5, 2, 8, 1, 9]

// Using closure
let sortedLong = numbers.sorted(by: { $0 < $1 })

// Using operator directly
let sortedShort = numbers.sorted(by: <)

print(sortedShort)  // Output: [1, 2, 5, 8, 9]

// More examples
let sum = [1, 2, 3, 4, 5].reduce(0, +)
print(sum)  // Output: 15
```

### Complete Evolution of Closure Syntax

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

// 1. Full syntax
var reversed = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})

// 2. Inferred types
reversed = names.sorted(by: { s1, s2 in
    return s1 > s2
})

// 3. Implicit return
reversed = names.sorted(by: { s1, s2 in s1 > s2 })

// 4. Shorthand argument names
reversed = names.sorted(by: { $0 > $1 })

// 5. Operator method
reversed = names.sorted(by: >)

print(reversed)  // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

## Trailing Closures

When a closure is the last parameter of a function, you can write it outside the parentheses:

### Basic Trailing Closure

```swift
func performTask(task: () -> Void) {
    print("Starting task...")
    task()
    print("Task completed!")
}

// Without trailing closure
performTask(task: {
    print("Working on task...")
})

// With trailing closure
performTask {
    print("Working on task...")
}

// Output:
// Starting task...
// Working on task...
// Task completed!
```

### Trailing Closures with Parameters

```swift
let numbers = [1, 2, 3, 4, 5]

// Without trailing closure
let evens = numbers.filter({ number in
    number % 2 == 0
})

// With trailing closure
let evensTrailing = numbers.filter { number in
    number % 2 == 0
}

// Even shorter
let evensShort = numbers.filter { $0 % 2 == 0 }

print(evensShort)  // Output: [2, 4]
```

### Multiple Trailing Closures

Swift 5.3+ allows multiple trailing closures:

```swift
func loadData(
    onStart: () -> Void,
    onSuccess: (String) -> Void,
    onFailure: (Error) -> Void
) {
    onStart()
    // Simulate loading
    let success = true
    if success {
        onSuccess("Data loaded!")
    } else {
        // onFailure(someError)
    }
}

// Multiple trailing closures
loadData {
    print("Loading started...")
} onSuccess: { data in
    print("Success: \(data)")
} onFailure: { error in
    print("Error: \(error)")
}

// Output:
// Loading started...
// Success: Data loaded!
```

## Capturing Values

Closures can capture constants and variables from their surrounding context:

### Basic Value Capturing

```swift
func makeIncrementer(incrementAmount: Int) -> () -> Int {
    var total = 0
    
    let incrementer: () -> Int = {
        total += incrementAmount
        return total
    }
    
    return incrementer
}

let incrementByTwo = makeIncrementer(incrementAmount: 2)

print(incrementByTwo())  // Output: 2
print(incrementByTwo())  // Output: 4
print(incrementByTwo())  // Output: 6

// Different instance with different captured values
let incrementByFive = makeIncrementer(incrementAmount: 5)
print(incrementByFive())  // Output: 5
print(incrementByFive())  // Output: 10

// Original incrementer still has its own captured values
print(incrementByTwo())  // Output: 8
```

### Capturing by Reference

Closures capture variables by reference, not by value:

```swift
var counter = 0

let incrementCounter = {
    counter += 1
    print("Counter: \(counter)")
}

incrementCounter()  // Output: Counter: 1
incrementCounter()  // Output: Counter: 2

counter = 10
incrementCounter()  // Output: Counter: 11
```

### Creating Multiple Closures that Share Captured Values

```swift
func makeCounterFunctions() -> (() -> Int, () -> Int, () -> Void) {
    var count = 0
    
    let increment = { () -> Int in
        count += 1
        return count
    }
    
    let decrement = { () -> Int in
        count -= 1
        return count
    }
    
    let reset = { () -> Void in
        count = 0
    }
    
    return (increment, decrement, reset)
}

let (inc, dec, reset) = makeCounterFunctions()

print(inc())  // Output: 1
print(inc())  // Output: 2
print(inc())  // Output: 3
print(dec())  // Output: 2
reset()
print(inc())  // Output: 1
```

## Escaping vs Non-Escaping Closures

### Non-Escaping Closures (Default)

By default, closures are non-escaping. They're executed before the function returns:

```swift
func performOperation(numbers: [Int], operation: (Int) -> Int) -> [Int] {
    return numbers.map(operation)
}

let numbers = [1, 2, 3, 4, 5]
let doubled = performOperation(numbers: numbers) { $0 * 2 }
print(doubled)  // Output: [2, 4, 6, 8, 10]
```

### Escaping Closures

Use `@escaping` when a closure might be executed after the function returns:

```swift
var completionHandlers: [() -> Void] = []

func addCompletionHandler(handler: @escaping () -> Void) {
    completionHandlers.append(handler)  // Stored for later execution
}

addCompletionHandler {
    print("Task 1 completed")
}

addCompletionHandler {
    print("Task 2 completed")
}

// Execute all stored closures
for handler in completionHandlers {
    handler()
}
// Output:
// Task 1 completed
// Task 2 completed
```

### Async Operations with Escaping Closures

```swift
func fetchData(completion: @escaping (String) -> Void) {
    print("Fetching data...")
    
    // Simulate async operation
    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
        completion("Data received!")
    }
    
    print("Function returned")
}

fetchData { result in
    print(result)
}

// Output:
// Fetching data...
// Function returned
// (2 seconds later)
// Data received!
```

### Common Use Cases for @escaping

```swift
class NetworkManager {
    var completionHandlers: [(Result<String, Error>) -> Void] = []
    
    func downloadData(url: String, completion: @escaping (Result<String, Error>) -> Void) {
        // Store completion handler
        completionHandlers.append(completion)
        
        // Simulate network request
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            let success = true
            if success {
                completion(.success("Downloaded data from \(url)"))
            } else {
                // completion(.failure(someError))
            }
        }
    }
}

let manager = NetworkManager()
manager.downloadData(url: "https://api.example.com") { result in
    switch result {
    case .success(let data):
        print("✅ \(data)")
    case .failure(let error):
        print("❌ Error: \(error)")
    }
}
```

## Autoclosures

`@autoclosure` creates a closure automatically from an expression:

```swift
var stack = [1, 2, 3, 4, 5]

// Without autoclosure
func executeClosureLater(closure: () -> Int) {
    print("Executing...")
    let value = closure()
    print("Value: \(value)")
}

executeClosureLater(closure: { stack.removeLast() })

// With autoclosure
func executeAutoClosureLater(closure: @autoclosure () -> Int) {
    print("Executing...")
    let value = closure()
    print("Value: \(value)")
}

executeAutoClosureLater(closure: stack.removeLast())
// The expression is automatically wrapped in a closure
```

### Common Use: Custom Assert

```swift
func customAssert(_ condition: @autoclosure () -> Bool, 
                  message: @autoclosure () -> String) {
    #if DEBUG
    if !condition() {
        print("Assertion failed: \(message())")
    }
    #endif
}

let age = 15
customAssert(age >= 18, message: "User must be at least 18")
// Only evaluates "age >= 18" and the message string if needed
```

## Practical Examples

### Example 1: Array Transformations

```swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Filter - get even numbers
let evens = numbers.filter { $0 % 2 == 0 }
print("Evens: \(evens)")  // [2, 4, 6, 8, 10]

// Map - square all numbers
let squared = numbers.map { $0 * $0 }
print("Squared: \(squared)")  // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Reduce - sum all numbers
let sum = numbers.reduce(0) { $0 + $1 }
print("Sum: \(sum)")  // 55

// Chaining operations
let result = numbers
    .filter { $0 % 2 == 0 }  // Get evens
    .map { $0 * $0 }         // Square them
    .reduce(0, +)            // Sum them
print("Result: \(result)")  // 220 (4+16+36+64+100)
```

### Example 2: Sorting with Closures

```swift
struct Person {
    let name: String
    let age: Int
}

let people = [
    Person(name: "Alice", age: 25),
    Person(name: "Bob", age: 30),
    Person(name: "Charlie", age: 20),
    Person(name: "Diana", age: 28)
]

// Sort by age
let byAge = people.sorted { $0.age < $1.age }
print("By age:")
byAge.forEach { print("\($0.name): \($0.age)") }

// Sort by name
let byName = people.sorted { $0.name < $1.name }
print("\nBy name:")
byName.forEach { print($0.name) }

// Output:
// By age:
// Charlie: 20
// Alice: 25
// Diana: 28
// Bob: 30
//
// By name:
// Alice
// Bob
// Charlie
// Diana
```

### Example 3: Custom Filter Function

```swift
func customFilter<T>(_ array: [T], condition: (T) -> Bool) -> [T] {
    var result: [T] = []
    for item in array {
        if condition(item) {
            result.append(item)
        }
    }
    return result
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let greaterThanFive = customFilter(numbers) { $0 > 5 }
print(greaterThanFive)  // [6, 7, 8, 9, 10]

let words = ["apple", "banana", "cherry", "date"]
let longWords = customFilter(words) { $0.count > 5 }
print(longWords)  // ["banana", "cherry"]
```

### Example 4: Delayed Execution

```swift
class TaskScheduler {
    private var tasks: [() -> Void] = []
    
    func schedule(task: @escaping () -> Void) {
        tasks.append(task)
    }
    
    func executeAll() {
        print("Executing \(tasks.count) tasks...")
        for task in tasks {
            task()
        }
        tasks.removeAll()
    }
}

let scheduler = TaskScheduler()

scheduler.schedule {
    print("Task 1: Sending email")
}

scheduler.schedule {
    print("Task 2: Updating database")
}

scheduler.schedule {
    print("Task 3: Generating report")
}

scheduler.executeAll()
// Output:
// Executing 3 tasks...
// Task 1: Sending email
// Task 2: Updating database
// Task 3: Generating report
```

### Example 5: Animation Completion Handlers

```swift
func animate(duration: Double, 
             animations: @escaping () -> Void,
             completion: @escaping (Bool) -> Void) {
    print("Starting animation (duration: \(duration)s)")
    animations()
    
    // Simulate animation completion
    DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
        completion(true)
    }
}

animate(duration: 2.0, animations: {
    print("Animating view...")
}, completion: { finished in
    if finished {
        print("Animation completed!")
    }
})
```

### Example 6: Retry Logic

```swift
func retry<T>(attempts: Int, 
              task: () throws -> T,
              onFailure: (Error) -> Void) rethrows -> T {
    var lastError: Error?
    
    for attempt in 1...attempts {
        do {
            print("Attempt \(attempt)...")
            return try task()
        } catch {
            lastError = error
            onFailure(error)
        }
    }
    
    throw lastError!
}

enum NetworkError: Error {
    case connectionFailed
}

var attemptCount = 0

do {
    let result = try retry(attempts: 3, task: {
        attemptCount += 1
        if attemptCount < 3 {
            throw NetworkError.connectionFailed
        }
        return "Success!"
    }, onFailure: { error in
        print("Failed: \(error)")
    })
    print("Result: \(result)")
} catch {
    print("All attempts failed")
}
```

### Example 7: Debouncing

```swift
class Debouncer {
    private var workItem: DispatchWorkItem?
    private let delay: TimeInterval
    
    init(delay: TimeInterval) {
        self.delay = delay
    }
    
    func debounce(action: @escaping () -> Void) {
        workItem?.cancel()
        
        workItem = DispatchWorkItem { action() }
        
        if let workItem = workItem {
            DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: workItem)
        }
    }
}

let searchDebouncer = Debouncer(delay: 0.5)

// Simulate rapid search queries
let queries = ["a", "ap", "app", "appl", "apple"]

for query in queries {
    searchDebouncer.debounce {
        print("Searching for: \(query)")
    }
}
// Only "apple" will be searched after 0.5 seconds delay
```

### Example 8: Callback Pattern

```swift
struct User {
    let id: Int
    let name: String
}

class UserService {
    func fetchUser(id: Int, completion: @escaping (Result<User, Error>) -> Void) {
        print("Fetching user \(id)...")
        
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            let user = User(id: id, name: "User \(id)")
            completion(.success(user))
        }
    }
    
    func fetchMultipleUsers(ids: [Int], 
                           completion: @escaping ([User]) -> Void) {
        var users: [User] = []
        let group = DispatchGroup()
        
        for id in ids {
            group.enter()
            fetchUser(id: id) { result in
                if case .success(let user) = result {
                    users.append(user)
                }
                group.leave()
            }
        }
        
        group.notify(queue: .main) {
            completion(users)
        }
    }
}

let service = UserService()
service.fetchMultipleUsers(ids: [1, 2, 3]) { users in
    print("Fetched \(users.count) users:")
    users.forEach { print("- \($0.name)") }
}
```

## Best Practices

### 1. Use Trailing Closures for Readability

```swift
// ❌ Less readable
numbers.map({ $0 * 2 }).filter({ $0 > 5 })

// ✅ More readable
numbers
    .map { $0 * 2 }
    .filter { $0 > 5 }
```

### 2. Be Explicit When Needed

```swift
// ✅ Clear what $0 and $1 represent
let sorted = people.sorted { $0.age < $1.age }

// ✅ Even clearer with named parameters
let sortedClear = people.sorted { person1, person2 in
    person1.age < person2.age
}
```

### 3. Avoid Retain Cycles with [weak self]

```swift
class ViewController {
    var name = "Main"
    
    func setupHandler() {
        // ❌ Creates retain cycle
        // someAsyncFunction {
        //     print(self.name)
        // }
        
        // ✅ Breaks retain cycle
        someAsyncFunction { [weak self] in
            guard let self = self else { return }
            print(self.name)
        }
    }
    
    func someAsyncFunction(completion: @escaping () -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            completion()
        }
    }
}
```

### 4. Use @escaping Only When Necessary

```swift
// ✅ Non-escaping by default
func process(items: [Int], transform: (Int) -> Int) -> [Int] {
    return items.map(transform)
}

// ✅ @escaping when stored or executed asynchronously
func scheduleTask(task: @escaping () -> Void) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
        task()
    }
}
```

### 5. Keep Closures Short

```swift
// ❌ Too complex
let result = numbers.map { number in
    let squared = number * number
    let tripled = squared * 3
    let formatted = String(tripled)
    return formatted
}

// ✅ Better - extract to function
func processNumber(_ number: Int) -> String {
    let squared = number * number
    let tripled = squared * 3
    return String(tripled)
}

let resultClear = numbers.map(processNumber)
```

## Common Mistakes to Avoid

### 1. Retain Cycles

```swift
// ❌ Retain cycle
class Manager {
    var closure: (() -> Void)?
    var name = "Manager"
    
    func setup() {
        closure = {
            print(self.name)  // Strong reference to self
        }
    }
}

// ✅ Use [weak self] or [unowned self]
class ManagerFixed {
    var closure: (() -> Void)?
    var name = "Manager"
    
    func setup() {
        closure = { [weak self] in
            print(self?.name ?? "Unknown")
        }
    }
}
```

### 2. Modifying Captured Values Unexpectedly

```swift
var index = 0
var closures: [() -> Int] = []

// ❌ All closures reference same variable
for _ in 1...3 {
    closures.append({ index })
    index += 1
}

closures.forEach { print($0()) }  // Prints: 3, 3, 3

// ✅ Capture value explicitly
index = 0
closures = []
for _ in 1...3 {
    let currentIndex = index
    closures.append({ currentIndex })
    index += 1
}

closures.forEach { print($0()) }  // Prints: 0, 1, 2
```

### 3. Not Handling Weak Self Properly

```swift
// ❌ Crashes if self is nil
class MyClass {
    func badExample() {
        doAsync { [weak self] in
            print(self!.description)  // Crash if self is nil
        }
    }
    
    // ✅ Safely unwrap
    func goodExample() {
        doAsync { [weak self] in
            guard let self = self else { return }
            print(self.description)
        }
    }
    
    func doAsync(completion: @escaping () -> Void) {
        DispatchQueue.main.async(execute: completion)
    }
    
    var description: String { "MyClass instance" }
}
```

## Summary

Closures are powerful tools in Swift programming. Here's what we covered:

**Closure Basics** 📦
- Self-contained blocks of functionality
- Can be passed as parameters
- Can capture and store values
- Three forms: global functions, nested functions, closure expressions

**Syntax Shortcuts** ✂️
- Type inference from context
- Implicit returns
- Shorthand argument names ($0, $1, ...)
- Operator methods

**Trailing Closures** 📝
- Cleaner syntax when closure is last parameter
- Multiple trailing closures in Swift 5.3+

**Capturing Values** 🎯
- Closures capture constants and variables
- Capture by reference, not value
- Shared state between closures

**Escaping Closures** 🚀
- Use `@escaping` for async operations
- Required when storing closures
- Common in completion handlers

**Memory Management** 🧠
- Use `[weak self]` to avoid retain cycles
- Use `[unowned self]` when self won't be nil
- Always handle optional self safely

## Next Steps

Congratulations on mastering closures! 🎉

**Next, we'll explore:**
- Topic 11: Optionals
- Understanding nil
- Optional binding (if let, guard let)
- Optional chaining
- Force unwrapping
- Implicitly unwrapped optionals

## Practice Exercises

Try these to sharpen your closure skills:

1. Create a custom `forEach` function using closures
2. Write a function that sorts an array using multiple criteria
3. Build a simple event handler system using closures
4. Create a timer that executes a closure every N seconds
5. Implement a custom validation system with closure-based rules
6. Build a pipeline of data transformations using map, filter, reduce
7. Create a logging system that accepts different log levels via closures

---

**Master closures and unlock Swift's functional programming power!** 🚀

*Remember: Closures are everywhere in Swift. Understanding them well will make you a better iOS developer.*
