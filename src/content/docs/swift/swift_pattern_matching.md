---
title: "Swift Pattern Matching - Powerful Conditional Logic"
description: "Master Swift pattern matching with switch statements, if-case, for-case, and advanced patterns for elegant conditional code"
---

Welcome to Swift Pattern Matching! Pattern matching is one of Swift's most powerful features, allowing you to write elegant, expressive conditional logic. From simple value matching to complex destructuring, pattern matching makes your code cleaner and more maintainable. In this guide, we'll explore all the ways to use patterns in Swift.

## What is Pattern Matching?

Pattern matching allows you to check values against patterns and extract data in a single operation. It's much more powerful than simple equality checks.

**Why Use Pattern Matching?**
- ✅ **Expressiveness** - Clear, readable conditions
- ✅ **Safety** - Compiler-checked exhaustiveness
- ✅ **Convenience** - Extract and bind values easily
- ✅ **Power** - Handle complex conditions elegantly

**Where Patterns Are Used:**
- `switch` statements
- `if case` statements
- `guard case` statements
- `for case` loops
- `while case` loops

## Switch Statement Patterns

The most common use of pattern matching.

### Value Matching

```swift
let number = 42

switch number {
case 0:
    print("Zero")
case 1...10:
    print("Between 1 and 10")
case 42:
    print("The answer!")
default:
    print("Some other number")
}
// Output: The answer!
```

### Range Patterns

```swift
let score = 85

switch score {
case 0..<60:
    print("F")
case 60..<70:
    print("D")
case 70..<80:
    print("C")
case 80..<90:
    print("B")
case 90...100:
    print("A")
default:
    print("Invalid score")
}
// Output: B
```

### Tuple Patterns

```swift
let point = (2, 3)

switch point {
case (0, 0):
    print("Origin")
case (_, 0):
    print("On x-axis")
case (0, _):
    print("On y-axis")
case (-2...2, -2...2):
    print("Inside 4x4 box")
case (let x, let y) where x == y:
    print("On diagonal: (\(x), \(y))")
case (let x, let y):
    print("Somewhere at (\(x), \(y))")
}
// Output: Inside 4x4 box
```

### Enum Patterns

```swift
enum NetworkResponse {
    case success(data: String)
    case failure(error: String)
    case loading
}

let response = NetworkResponse.success(data: "User data")

switch response {
case .success(let data):
    print("Got data: \(data)")
case .failure(let error):
    print("Error: \(error)")
case .loading:
    print("Loading...")
}
// Output: Got data: User data
```

### Optional Patterns

```swift
let optionalValue: Int? = 42

switch optionalValue {
case nil:
    print("No value")
case let value?:
    print("Has value: \(value)")
}
// Output: Has value: 42

// Or more explicitly
switch optionalValue {
case .none:
    print("No value")
case .some(let value):
    print("Has value: \(value)")
}
```

## Value Binding Patterns

Extract and bind values from patterns.

### Let and Var Binding

```swift
let coordinates = (x: 10, y: 20, z: 30)

switch coordinates {
case let (x, y, z) where z > 0:
    print("Above ground: (\(x), \(y), \(z))")
case let (x, y, z) where z < 0:
    print("Below ground: (\(x), \(y), \(z))")
default:
    print("At ground level")
}
```

### Enum with Associated Values

```swift
enum Result<T, E> {
    case success(T)
    case failure(E)
}

let result: Result<String, String> = .success("Data loaded")

switch result {
case .success(let data):
    print("Success: \(data)")
case .failure(let error):
    print("Error: \(error)")
}
```

## Where Clauses

Add additional conditions to patterns.

### Basic Where Clause

```swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers where number % 2 == 0 {
    print(number)
}
// Output: 2, 4, 6, 8, 10
```

### Where with Switch

```swift
let age = 25

switch age {
case let x where x < 13:
    print("Child: \(x)")
case let x where x < 20:
    print("Teenager: \(x)")
case let x where x < 65:
    print("Adult: \(x)")
default:
    print("Senior")
}
// Output: Adult: 25
```

### Complex Where Conditions

```swift
enum Temperature {
    case celsius(Double)
    case fahrenheit(Double)
}

let temp = Temperature.celsius(25)

switch temp {
case .celsius(let value) where value > 30:
    print("Hot: \(value)°C")
case .celsius(let value) where value < 10:
    print("Cold: \(value)°C")
case .celsius(let value):
    print("Moderate: \(value)°C")
case .fahrenheit(let value) where value > 86:
    print("Hot: \(value)°F")
case .fahrenheit(let value):
    print("Other temperature")
}
```

## If Case Pattern Matching

Use patterns in if statements.

### Basic If Case

```swift
enum LoginState {
    case loggedOut
    case loggedIn(username: String)
}

let state = LoginState.loggedIn(username: "alice")

if case .loggedIn(let username) = state {
    print("Welcome, \(username)!")
}
// Output: Welcome, alice!
```

### If Case with Where

```swift
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    if case let n = number where n % 2 == 0 {
        print("\(n) is even")
    }
}
```

### Multiple Conditions

```swift
enum UserStatus {
    case active(lastSeen: Date)
    case inactive
    case banned(reason: String)
}

let status = UserStatus.active(lastSeen: Date())

if case .active(let lastSeen) = status,
   lastSeen.timeIntervalSinceNow > -3600 {
    print("User recently active")
}
```

## Guard Case Pattern Matching

Use patterns in guard statements for early exit.

### Basic Guard Case

```swift
enum APIResponse {
    case success(data: [String: Any])
    case error(message: String)
}

func processResponse(_ response: APIResponse) {
    guard case .success(let data) = response else {
        print("Not a success response")
        return
    }
    
    print("Processing data: \(data)")
}

processResponse(.success(data: ["key": "value"]))
```

### Guard with Where

```swift
func processUser(age: Int?) {
    guard let userAge = age, userAge >= 18 else {
        print("User must be 18 or older")
        return
    }
    
    print("User is \(userAge) years old")
}

processUser(age: 25)
```

##  For-Case Pattern Matching

Filter elements in loops.

### Filtering Enums

```swift
enum Media {
    case book(title: String)
    case movie(title: String)
    case song(title: String)
}

let library: [Media] = [
    .book(title: "1984"),
    .movie(title: "Inception"),
    .book(title: "Dune"),
    .song(title: "Bohemian Rhapsody")
]

// Only iterate over books
for case .book(let title) in library {
    print("Book: \(title)")
}
// Output:
// Book: 1984
// Book: Dune
```

### Filtering Optionals

```swift
let numbers: [Int?] = [1, nil, 3, nil, 5]

for case let number? in numbers {
    print(number)
}
// Output: 1, 3, 5
```

### Filtering with Ranges

```swift
let values = [1, 5, 10, 15, 20, 25]

for case 10...20 in values {
    print("Found value in range")
}
```

## Type Casting Patterns

Match based on types.

### Is Pattern

```swift
class Animal { }
class Dog: Animal { }
class Cat: Animal { }

let animals: [Animal] = [Dog(), Cat(), Dog(), Animal()]

for animal in animals {
    switch animal {
    case is Dog:
        print("Found a dog")
    case is Cat:
        print("Found a cat")
    default:
        print("Found some animal")
    }
}
```

### As Pattern

```swift
protocol Drawable {
    func draw()
}

class Circle: Drawable {
    func draw() { print("Drawing circle") }
}

class Square: Drawable {
    func draw() { print("Drawing square") }
}

let shapes: [Drawable] = [Circle(), Square(), Circle()]

for case let circle as Circle in shapes {
    print("Found a circle")
    circle.draw()
}
```

## Expression Patterns

Use expressions that evaluate to true/false.

### Using ~= Operator

```swift
let age = 25

switch age {
case 0..<18:
    print("Minor")
case 18...65:
    print("Adult")
default:
    print("Senior")
}

// Custom pattern matching
struct DivisibleBy {
    let divisor: Int
    
    static func ~= (pattern: DivisibleBy, value: Int) -> Bool {
        return value % pattern.divisor == 0
    }
}

let number = 15

switch number {
case DivisibleBy(divisor: 3):
    print("\(number) is divisible by 3")
case DivisibleBy(divisor: 5):
    print("\(number) is divisible by 5")
default:
    print("Not divisible by 3 or 5")
}
// Output: 15 is divisible by 3
```

## Practical Examples

### Example 1: JSON Parsing

```swift
enum JSON {
    case null
    case bool(Bool)
    case number(Double)
    case string(String)
    case array([JSON])
    case object([String: JSON])
}

func parseJSON(_ json: JSON) {
    switch json {
    case .null:
        print("Null value")
        
    case .bool(let value):
        print("Boolean: \(value)")
        
    case .number(let value):
        print("Number: \(value)")
        
    case .string(let value):
        print("String: \(value)")
        
    case .array(let items):
        print("Array with \(items.count) items")
        for item in items {
            parseJSON(item)
        }
        
    case .object(let dict):
        print("Object with \(dict.count) keys")
        for (key, value) in dict {
            print("  \(key):")
            parseJSON(value)
        }
    }
}

let json: JSON = .object([
    "name": .string("Alice"),
    "age": .number(25),
    "active": .bool(true)
])

parseJSON(json)
```

### Example 2: State Machine

```swift
enum AppState {
    case idle
    case loading
    case loaded(data: String)
    case error(message: String)
}

class ViewModel {
    var state: AppState = .idle {
        didSet {
            handleStateChange()
        }
    }
    
    func handleStateChange() {
        switch state {
        case .idle:
            print("Ready to load")
            
        case .loading:
            print("Loading...")
            
        case .loaded(let data):
            print("Loaded: \(data)")
            
        case .error(let message):
            print("Error: \(message)")
        }
    }
    
    func loadData() {
        state = .loading
        
        // Simulate async loading
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.state = .loaded(data: "Sample data")
        }
    }
}

let viewModel = ViewModel()
viewModel.loadData()
```

### Example 3: Command Pattern

```swift
enum Command {
    case move(x: Int, y: Int)
    case rotate(degrees: Int)
    case scale(factor: Double)
    case undo
}

class Robot {
    var x = 0
    var y = 0
    var rotation = 0
    var size = 1.0
    
    func execute(_ command: Command) {
        switch command {
        case .move(let dx, let dy):
            x += dx
            y += dy
            print("Moved to (\(x), \(y))")
            
        case .rotate(let degrees):
            rotation += degrees
            rotation %= 360
            print("Rotated to \(rotation)°")
            
        case .scale(let factor):
            size *= factor
            print("Scaled to \(size)x")
            
        case .undo:
            print("Undo last command")
        }
    }
}

let robot = Robot()
robot.execute(.move(x: 10, y: 5))
robot.execute(.rotate(degrees: 90))
robot.execute(.scale(factor: 2.0))
```

### Example 4: Event Handling

```swift
enum UserEvent {
    case tap(x: Double, y: Double)
    case swipe(direction: Direction)
    case longPress(duration: Double)
    case pinch(scale: Double)
}

enum Direction {
    case left, right, up, down
}

func handleEvent(_ event: UserEvent) {
    switch event {
    case .tap(let x, let y) where x > 100 && y > 100:
        print("Tapped in bottom-right quadrant")
        
    case .tap(let x, let y):
        print("Tapped at (\(x), \(y))")
        
    case .swipe(.left):
        print("Swiped left - go back")
        
    case .swipe(.right):
        print("Swiped right - go forward")
        
    case .longPress(let duration) where duration > 2:
        print("Long press detected: \(duration)s")
        
    case .pinch(let scale) where scale > 1:
        print("Zooming in")
        
    case .pinch(let scale) where scale < 1:
        print("Zooming out")
        
    default:
        print("Other gesture")
    }
}

handleEvent(.tap(x: 150, y: 200))
handleEvent(.swipe(direction: .left))
```

## Best Practices

### 1. Use Exhaustive Switches

```swift
enum Status {
    case pending
    case approved
    case rejected
}

// ✅ Good - exhaustive
func handle(status: Status) {
    switch status {
    case .pending:
        print("Waiting")
    case .approved:
        print("Approved")
    case .rejected:
        print("Rejected")
    }
}

// ❌ Avoid default when enum is closed
func handle2(status: Status) {
    switch status {
    case .pending:
        print("Waiting")
    default:  // Hides future cases
        print("Other")
    }
}
```

### 2. Extract Complex Conditions

```swift
// ✅ Good - readable
case let user where user.isActive && user.age >= 18:
    handleAdultUser(user)

// ✅ Better - extracted
case let user where user.isEligible:
    handleAdultUser(user)
```

### 3. Use Guard for Early Exit

```swift
// ✅ Good
guard case .success(let data) = response else {
    return
}
processData(data)

// ❌ Less clear
if case .success(let data) = response {
    processData(data)
}
```

## Summary

Pattern matching enables elegant conditional logic:

**Switch Patterns** 🎯
- Value, range, tuple patterns
- Enum and optional patterns
- Where clauses

**If/Guard Case** ✅
- Single pattern matching
- Combined with where
- Early exit with guard

**For Case** 🔄
- Filter in loops
- Extract enum values
- Filter optionals

**Type Patterns** 🔍
- Is pattern for checking
- As pattern for casting
- Custom ~= operator

**Best Practices** ⭐
- Exhaustive switches
- Clear conditions
- Appropriate pattern choice

## Practice Exercises

1. Create a calculator using pattern matching
2. Build a state machine for a game
3. Implement JSON parsing with patterns
4. Create a command processor
5. Build an event handling system
6. Implement a validation system with patterns

---

**Master pattern matching to write elegant, expressive Swift code!** ✨

*Remember: Pattern matching makes complex conditions simple and safe!*
