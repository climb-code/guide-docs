---
title: "Swift Control Flow - Making Decisions in Code"
description: "Master Swift control flow with if-else statements, switch statements, guard statements, and ternary operators with practical examples"
---

Welcome to Swift Control Flow! Control flow is how you direct the execution of your code based on conditions. Think of it as teaching your program to make decisions, just like you do in real life. In this guide, we'll explore how to make your Swift code smart and responsive using various control flow statements.

## What is Control Flow?

Control flow determines the order in which your code executes. Instead of running every line from top to bottom, control flow allows your program to:

- **Make decisions** based on conditions
- **Choose different paths** depending on values
- **Skip or execute** code blocks selectively
- **Handle different scenarios** elegantly

Swift provides several powerful control flow tools that make your code both readable and efficient.

## If-Else Statements

The `if` statement is the most fundamental control flow tool. It lets you execute code only when a certain condition is true.

### Basic If Statement

```swift
let temperature = 25

if temperature > 20 {
    print("It's a warm day!")
}
// Output: It's a warm day!
```

### If-Else Statement

When you want to handle both true and false cases:

```swift
let age = 16

if age >= 18 {
    print("You can vote!")
} else {
    print("You're too young to vote.")
}
// Output: You're too young to vote.
```

### If-Else If-Else Chain

Handle multiple conditions in sequence:

```swift
let score = 85

if score >= 90 {
    print("Grade: A - Excellent!")
} else if score >= 80 {
    print("Grade: B - Great job!")
} else if score >= 70 {
    print("Grade: C - Good work!")
} else if score >= 60 {
    print("Grade: D - Needs improvement")
} else {
    print("Grade: F - Study harder!")
}
// Output: Grade: B - Great job!
```

### Combining Conditions

Use logical operators to combine multiple conditions:

```swift
let username = "admin"
let password = "secret123"

// AND operator (&&) - both conditions must be true
if username == "admin" && password == "secret123" {
    print("Login successful!")
} else {
    print("Invalid credentials")
}
// Output: Login successful!

// OR operator (||) - at least one condition must be true
let dayOfWeek = "Saturday"

if dayOfWeek == "Saturday" || dayOfWeek == "Sunday" {
    print("It's the weekend! 🎉")
} else {
    print("It's a weekday")
}
// Output: It's the weekend! 🎉

// NOT operator (!) - inverts the condition
let isRaining = false

if !isRaining {
    print("Great weather for a walk!")
}
// Output: Great weather for a walk!
```

### Nested If Statements

You can nest if statements inside each other:

```swift
let hasTicket = true
let hasID = true
let age = 25

if hasTicket {
    if hasID {
        if age >= 18 {
            print("Welcome to the concert!")
        } else {
            print("Sorry, adults only")
        }
    } else {
        print("ID required")
    }
} else {
    print("Please purchase a ticket")
}
// Output: Welcome to the concert!
```

**Better approach using combined conditions:**

```swift
if hasTicket && hasID && age >= 18 {
    print("Welcome to the concert!")
} else if !hasTicket {
    print("Please purchase a ticket")
} else if !hasID {
    print("ID required")
} else {
    print("Sorry, adults only")
}
```

## Ternary Conditional Operator

The ternary operator is a shorthand for simple if-else statements. It's called "ternary" because it takes three operands.

### Syntax

```swift
condition ? valueIfTrue : valueIfFalse
```

### Basic Examples

```swift
let age = 20
let canVote = age >= 18 ? "Yes" : "No"
print("Can vote: \(canVote)")
// Output: Can vote: Yes

let temperature = 15
let weatherDescription = temperature > 20 ? "Warm" : "Cold"
print("Weather: \(weatherDescription)")
// Output: Weather: Cold

// Assign different values based on condition
let score = 85
let result = score >= 60 ? "Pass" : "Fail"
print(result)  // Output: Pass
```

### Practical Use Cases

```swift
// Setting display text
let itemCount = 1
let message = itemCount == 1 ? "1 item" : "\(itemCount) items"
print(message)  // Output: 1 item

// Pricing logic
let isMember = true
let price = isMember ? 9.99 : 14.99
print("Price: $\(price)")  // Output: Price: $9.99

// Status indicators
let isOnline = true
let status = isOnline ? "🟢 Online" : "🔴 Offline"
print(status)  // Output: 🟢 Online
```

### When to Use Ternary vs If-Else

**Use Ternary When:**
- ✅ Assigning one of two values to a variable
- ✅ The logic is simple and fits on one line
- ✅ It makes the code more concise and readable

**Use If-Else When:**
- ✅ You need to execute multiple statements
- ✅ The logic is complex or nested
- ✅ You need more than two outcomes

```swift
// ✅ Good use of ternary - simple and clear
let badge = points > 100 ? "Gold" : "Silver"

// ❌ Bad use of ternary - too complex
let badge = points > 100 ? (isPremium ? "Platinum" : "Gold") : (isActive ? "Silver" : "Bronze")

// ✅ Better as if-else
let badge: String
if points > 100 {
    badge = isPremium ? "Platinum" : "Gold"
} else {
    badge = isActive ? "Silver" : "Bronze"
}
```

## Switch Statements

Switch statements provide a clean way to handle multiple possible values. They're especially powerful in Swift and can do much more than in other languages!

### Basic Switch

```swift
let dayNumber = 3

switch dayNumber {
case 1:
    print("Monday")
case 2:
    print("Tuesday")
case 3:
    print("Wednesday")
case 4:
    print("Thursday")
case 5:
    print("Friday")
case 6:
    print("Saturday")
case 7:
    print("Sunday")
default:
    print("Invalid day")
}
// Output: Wednesday
```

### Important: No Fallthrough

Unlike many other languages, Swift doesn't fall through to the next case automatically:

```swift
let number = 1

switch number {
case 1:
    print("One")
    // Automatically breaks here - no fallthrough!
case 2:
    print("Two")
default:
    print("Other")
}
// Output: One
```

### Multiple Values per Case

Combine multiple values in a single case:

```swift
let character = "a"

switch character {
case "a", "e", "i", "o", "u":
    print("\(character) is a vowel")
case "b", "c", "d", "f", "g":
    print("\(character) is a consonant")
default:
    print("Unknown character")
}
// Output: a is a vowel
```

### Range Matching

Use ranges to match a range of values:

```swift
let score = 85

switch score {
case 0..<60:
    print("F - Keep studying!")
case 60..<70:
    print("D - You can do better")
case 70..<80:
    print("C - Good effort")
case 80..<90:
    print("B - Great work!")
case 90...100:
    print("A - Excellent!")
default:
    print("Invalid score")
}
// Output: B - Great work!
```

### Tuple Matching

Switch can work with tuples to match multiple values:

```swift
let coordinate = (x: 0, y: 0)

switch coordinate {
case (0, 0):
    print("Origin point")
case (_, 0):
    print("On the x-axis")
case (0, _):
    print("On the y-axis")
case (-2...2, -2...2):
    print("Inside the 2x2 box")
default:
    print("Outside the box")
}
// Output: Origin point
```

### Value Binding

Bind matched values to temporary variables:

```swift
let point = (x: 2, y: 0)

switch point {
case (0, 0):
    print("At origin")
case (let x, 0):
    print("On x-axis at x = \(x)")
case (0, let y):
    print("On y-axis at y = \(y)")
case let (x, y):
    print("At (\(x), \(y))")
}
// Output: On x-axis at x = 2
```

### Where Clauses

Add additional conditions to cases:

```swift
let temperature = 25
let isRaining = false

switch temperature {
case let temp where temp < 0:
    print("Freezing! \(temp)°C")
case let temp where temp < 15:
    print("Cold: \(temp)°C")
case let temp where temp < 25 && !isRaining:
    print("Perfect weather: \(temp)°C")
case let temp where temp < 25 && isRaining:
    print("Mild but rainy: \(temp)°C")
case let temp where temp >= 25:
    print("Hot: \(temp)°C")
default:
    print("Unknown")
}
// Output: Perfect weather: 25°C
```

### Switch with Enums

Switch works beautifully with enumerations:

```swift
enum Weather {
    case sunny
    case cloudy
    case rainy
    case snowy
}

let today = Weather.sunny

switch today {
case .sunny:
    print("☀️ Wear sunglasses!")
case .cloudy:
    print("☁️ Gray day")
case .rainy:
    print("🌧️ Bring an umbrella!")
case .snowy:
    print("❄️ Time for a snowman!")
}
// Output: ☀️ Wear sunglasses!
```

### Switch Must Be Exhaustive

Swift requires that switch statements handle all possible values:

```swift
let number = 5

// ❌ Error: Switch must be exhaustive
// switch number {
// case 1:
//     print("One")
// }

// ✅ Correct - handles all cases
switch number {
case 1:
    print("One")
default:
    print("Not one")
}
```

## Guard Statements

Guard statements are designed for early exits. They're perfect for validating conditions at the beginning of a function.

### Basic Guard

```swift
func greet(name: String?) {
    guard let unwrappedName = name else {
        print("No name provided")
        return
    }
    
    print("Hello, \(unwrappedName)!")
}

greet(name: "Alice")  // Output: Hello, Alice!
greet(name: nil)      // Output: No name provided
```

### Why Use Guard?

Guard statements improve code readability by handling error cases first:

```swift
// ❌ Without guard - nested and hard to read
func processOrder(item: String?, quantity: Int?, price: Double?) {
    if let item = item {
        if let quantity = quantity {
            if let price = price {
                if quantity > 0 && price > 0 {
                    let total = Double(quantity) * price
                    print("Order: \(quantity) × \(item) = $\(total)")
                } else {
                    print("Invalid quantity or price")
                }
            } else {
                print("Price missing")
            }
        } else {
            print("Quantity missing")
        }
    } else {
        print("Item missing")
    }
}

// ✅ With guard - clean and readable!
func processOrderBetter(item: String?, quantity: Int?, price: Double?) {
    guard let item = item else {
        print("Item missing")
        return
    }
    
    guard let quantity = quantity else {
        print("Quantity missing")
        return
    }
    
    guard let price = price else {
        print("Price missing")
        return
    }
    
    guard quantity > 0 && price > 0 else {
        print("Invalid quantity or price")
        return
    }
    
    let total = Double(quantity) * price
    print("Order: \(quantity) × \(item) = $\(total)")
}

processOrderBetter(item: "iPhone", quantity: 2, price: 999.99)
// Output: Order: 2 × iPhone = $1999.98
```

### Multiple Conditions in Guard

You can unwrap multiple optionals in one guard statement:

```swift
func createUser(username: String?, email: String?, age: Int?) {
    guard let username = username,
          let email = email,
          let age = age else {
        print("Missing required information")
        return
    }
    
    guard age >= 13 else {
        print("Must be at least 13 years old")
        return
    }
    
    print("User created: \(username) (\(email)), Age: \(age)")
}

createUser(username: "alice", email: "alice@email.com", age: 25)
// Output: User created: alice (alice@email.com), Age: 25

createUser(username: "bob", email: nil, age: 30)
// Output: Missing required information
```

### Guard vs If-Let

When to use each:

```swift
// Use IF-LET when you want to do something WITH the value
func printName(name: String?) {
    if let name = name {
        print("Name is: \(name)")
        // Continue working with name
    }
}

// Use GUARD when you want to exit early WITHOUT the value
func validateName(name: String?) -> Bool {
    guard let name = name else {
        return false
    }
    
    // name is available for rest of function
    return name.count >= 3
}
```

### Guard in Loops

Guard works great in loops to skip invalid items:

```swift
let numbers = [1, 2, -5, 4, -10, 6]

for number in numbers {
    guard number > 0 else {
        print("Skipping negative: \(number)")
        continue
    }
    
    print("Processing: \(number)")
}

// Output:
// Processing: 1
// Processing: 2
// Skipping negative: -5
// Processing: 4
// Skipping negative: -10
// Processing: 6
```

## Practical Examples

### Example 1: User Authentication

```swift
func authenticateUser(username: String?, password: String?) -> Bool {
    guard let username = username,
          let password = password else {
        print("❌ Username and password required")
        return false
    }
    
    guard !username.isEmpty && !password.isEmpty else {
        print("❌ Username and password cannot be empty")
        return false
    }
    
    guard username.count >= 3 else {
        print("❌ Username must be at least 3 characters")
        return false
    }
    
    guard password.count >= 8 else {
        print("❌ Password must be at least 8 characters")
        return false
    }
    
    // Simulate authentication
    if username == "admin" && password == "password123" {
        print("✅ Login successful!")
        return true
    } else {
        print("❌ Invalid credentials")
        return false
    }
}

authenticateUser(username: "admin", password: "password123")
// Output: ✅ Login successful!
```

### Example 2: Grade Calculator

```swift
func calculateGrade(score: Int) -> String {
    guard score >= 0 && score <= 100 else {
        return "Invalid score"
    }
    
    switch score {
    case 90...100:
        return "A - Outstanding! 🌟"
    case 80..<90:
        return "B - Excellent work! 🎉"
    case 70..<80:
        return "C - Good job! 👍"
    case 60..<70:
        return "D - Needs improvement 📚"
    default:
        return "F - Please study harder 📖"
    }
}

print(calculateGrade(score: 95))  // A - Outstanding! 🌟
print(calculateGrade(score: 75))  // C - Good job! 👍
print(calculateGrade(score: 105)) // Invalid score
```

### Example 3: Shipping Calculator

```swift
func calculateShipping(weight: Double?, destination: String?) -> Double? {
    guard let weight = weight,
          let destination = destination else {
        print("Missing weight or destination")
        return nil
    }
    
    guard weight > 0 else {
        print("Invalid weight")
        return nil
    }
    
    let baseRate: Double
    
    switch destination.lowercased() {
    case "local":
        baseRate = 5.0
    case "national":
        baseRate = 10.0
    case "international":
        baseRate = 20.0
    default:
        print("Unknown destination")
        return nil
    }
    
    let shippingCost = baseRate + (weight * 0.5)
    
    return shippingCost
}

if let cost = calculateShipping(weight: 2.5, destination: "national") {
    print("Shipping cost: $\(cost)")
}
// Output: Shipping cost: $11.25
```

### Example 4: Temperature Converter

```swift
enum TemperatureUnit {
    case celsius
    case fahrenheit
    case kelvin
}

func convertTemperature(value: Double, from: TemperatureUnit, to: TemperatureUnit) -> Double {
    // Same unit, no conversion needed
    guard from != to else {
        return value
    }
    
    var celsius: Double
    
    // Convert input to Celsius first
    switch from {
    case .celsius:
        celsius = value
    case .fahrenheit:
        celsius = (value - 32) * 5/9
    case .kelvin:
        celsius = value - 273.15
    }
    
    // Convert from Celsius to target unit
    switch to {
    case .celsius:
        return celsius
    case .fahrenheit:
        return celsius * 9/5 + 32
    case .kelvin:
        return celsius + 273.15
    }
}

let temp = convertTemperature(value: 25, from: .celsius, to: .fahrenheit)
print("\(temp)°F")  // Output: 77.0°F
```

## Best Practices

### 1. Use Guard for Early Returns

```swift
// ✅ Good - fail fast with guard
func process(data: String?) {
    guard let data = data else { return }
    // Process data
}

// ❌ Avoid - unnecessary nesting
func processData(data: String?) {
    if let data = data {
        // Process data
    }
}
```

### 2. Prefer Switch Over Multiple If-Else

```swift
// ❌ Harder to read
if value == 1 {
    print("One")
} else if value == 2 {
    print("Two")
} else if value == 3 {
    print("Three")
} else {
    print("Other")
}

// ✅ Cleaner with switch
switch value {
case 1: print("One")
case 2: print("Two")
case 3: print("Three")
default: print("Other")
}
```

### 3. Keep Ternary Operators Simple

```swift
// ✅ Simple and readable
let status = isActive ? "Active" : "Inactive"

// ❌ Too complex
let message = count > 10 ? (isPremium ? "Premium: Many items" : "Regular: Many items") : "Few items"

// ✅ Better as if-else
let message: String
if count > 10 {
    message = isPremium ? "Premium: Many items" : "Regular: Many items"
} else {
    message = "Few items"
}
```

### 4. Make Switch Statements Exhaustive

```swift
enum Status {
    case pending
    case approved
    case rejected
}

// ✅ Handles all cases explicitly
switch status {
case .pending: print("Pending")
case .approved: print("Approved")
case .rejected: print("Rejected")
}
```

## Common Mistakes to Avoid

### 1. Unnecessary Force Unwrapping

```swift
// ❌ Dangerous - can crash
func greet(name: String?) {
    if name != nil {
        print("Hello, \(name!)!")  // Force unwrap is risky!
    }
}

// ✅ Safe unwrapping
func greetSafe(name: String?) {
    guard let name = name else { return }
    print("Hello, \(name)!")
}
```

### 2. Not Using Guard Properly

```swift
// ❌ Guard without return/throw/break/continue
// guard condition else {
//     // Must exit the scope!
// }

// ✅ Proper guard usage
guard condition else {
    return  // or throw, break, continue
}
```

### 3. Complex Nested Conditions

```swift
// ❌ Hard to read
if condition1 {
    if condition2 {
        if condition3 {
            // Code
        }
    }
}

// ✅ Use guard or combine conditions
guard condition1, condition2, condition3 else { return }
// Code
```

## Summary

Control flow is essential for making your programs smart and responsive. Here's what we covered:

**If-Else Statements** 🔀
- Make decisions based on conditions
- Chain multiple if-else blocks
- Combine conditions with logical operators

**Ternary Operator** ❓
- Shorthand for simple if-else
- Great for simple value assignments
- Keep it simple and readable

**Switch Statements** 🎛️
- Handle multiple cases elegantly
- Pattern matching with ranges and tuples
- Must be exhaustive in Swift
- No automatic fallthrough

**Guard Statements** 🛡️
- Early exit for invalid conditions
- Unwrap optionals safely
- Keep code flat and readable
- Perfect for validation

## Next Steps

Now that you've mastered control flow, you're ready for the next topic!

**Tomorrow, we'll explore:**
- Topic 8: Loops
- For-in loops
- While loops
- Repeat-while loops
- Loop control (break, continue)

## Practice Exercises

Try these to reinforce your learning:

1. Write a function that determines if a year is a leap year using if-else
2. Create a switch statement that converts a number (1-12) to a month name
3. Use guard statements to validate user registration data
4. Build a simple calculator using switch for operations (+, -, *, /)
5. Create a grade calculator that uses both guard and switch statements

---

**Master control flow and you control your program's destiny!** 🚀

*Remember: Write code that reads like a story. Use the right control flow tool for each situation.*
