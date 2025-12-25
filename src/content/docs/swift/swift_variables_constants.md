---
title: "Variables and Constants in Swift"
description: "Master variables and constants in Swift - learn when to use var vs let, type inference, type annotations, and naming conventions"
---

In Swift, storing and managing data is one of the most fundamental concepts you'll use in every program. Swift provides two ways to store values: **variables** (which can change) and **constants** (which cannot change). Understanding when to use each one is crucial for writing safe, efficient Swift code.

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:
- The difference between variables (`var`) and constants (`let`)
- How to declare variables and constants
- Type inference and type annotations
- Swift naming conventions and best practices
- When to use variables vs constants

## 📦 Constants with `let`

A **constant** is a value that you set once and cannot change later. In Swift, you declare constants using the `let` keyword.

### Basic Syntax

```swift
let constantName = value
```

### Example: Creating Constants

```swift
let pi = 3.14159
let appName = "My Swift App"
let maxUsers = 100
let isEnabled = true

print(pi)        // Output: 3.14159
print(appName)   // Output: My Swift App
```

### Constants Cannot Be Changed

Once you assign a value to a constant, you cannot change it:

```swift
let userName = "Alice"
userName = "Bob"  // ❌ Error: Cannot assign to value: 'userName' is a 'let' constant
```

This is actually a **feature**, not a limitation! It prevents accidental changes and makes your code safer.

### Why Use Constants?

✅ **Safety** - Prevents accidental value changes  
✅ **Intent** - Makes it clear the value shouldn't change  
✅ **Performance** - Compiler can optimize better  
✅ **Readability** - Others know this value is fixed  

> [!TIP]
> Swift developers prefer `let` by default. Use `let` whenever possible, and only use `var` when you know the value needs to change.

## 🔄 Variables with `var`

A **variable** is a value that can change over time. You declare variables using the `var` keyword.

### Basic Syntax

```swift
var variableName = value
```

### Example: Creating Variables

```swift
var score = 0
var playerName = "Player 1"
var isGameOver = false
var temperature = 25.5

print(score)  // Output: 0
```

### Variables Can Be Changed

Unlike constants, you can modify variables after creating them:

```swift
var score = 0
print("Initial score: \(score)")  // Output: Initial score: 0

score = 10
print("New score: \(score)")      // Output: New score: 10

score = score + 5
print("Updated score: \(score)")  // Output: Updated score: 15
```

### Real-World Example: Counter

```swift
var pageViews = 0

// User visits page
pageViews = pageViews + 1
print("Page views: \(pageViews)")  // Output: Page views: 1

// Another visit
pageViews = pageViews + 1
print("Page views: \(pageViews)")  // Output: Page views: 2

// Using shorthand
pageViews += 1
print("Page views: \(pageViews)")  // Output: Page views: 3
```

## 🆚 `var` vs `let`: When to Use Which?

This is one of the most important decisions you'll make when writing Swift code.

### Use `let` (Constants) When:

✅ The value will **never change**  
✅ You're storing **configuration values**  
✅ You're storing **mathematical constants**  
✅ You're storing **user input** that won't be modified  
✅ When in doubt, **start with `let`**  

### Use `var` (Variables) When:

✅ The value **needs to change** over time  
✅ You're building **counters** or **accumulators**  
✅ You're storing **state** that updates  
✅ You're working with **user-modifiable data**  

### Comparison Table

| Aspect | `let` (Constant) | `var` (Variable) |
|--------|------------------|------------------|
| Can change value | ❌ No | ✅ Yes |
| Memory efficiency | Higher | Standard |
| Thread safety | Safer | Requires care |
| Compiler optimization | Better | Standard |
| Best practice | Use by default | Use when needed |

### Example: Good Practices

```swift
// Good: Use let for values that don't change
let birthYear = 1990
let companyName = "Apple Inc."
let daysInWeek = 7

// Good: Use var for values that do change
var currentYear = 2024
var age = currentYear - birthYear  // This will be updated
var userScore = 0                   // Will increase during game
```

### Example: Common Mistake

```swift
// ❌ Bad: Using var when let would work
var pi = 3.14159        // This never changes, should be let
var appVersion = "1.0"  // This doesn't change in runtime, should be let

// ✅ Good: Use let instead
let pi = 3.14159
let appVersion = "1.0"
```

## 🏷️ Type Inference

Swift is a **statically typed** language, meaning every variable and constant has a specific type. However, Swift can often figure out the type automatically - this is called **type inference**.

### How Type Inference Works

When you assign a value, Swift infers the type:

```swift
let age = 25              // Swift infers: Int
let price = 19.99         // Swift infers: Double
let name = "Alice"        // Swift infers: String
let isActive = true       // Swift infers: Bool
let items = [1, 2, 3]     // Swift infers: Array<Int>
```

### Type Inference Examples

```swift
// Integer
let score = 100
// Swift knows: score is of type Int

// Double (decimal numbers)
let temperature = 36.6
// Swift knows: temperature is of type Double

// String
let greeting = "Hello"
// Swift knows: greeting is of type String

// Boolean
let isLoggedIn = false
// Swift knows: isLoggedIn is of type Bool
```

### Benefits of Type Inference

✅ **Less code to write** - No need to specify types explicitly  
✅ **Cleaner syntax** - Code is more readable  
✅ **Type safety** - Still get all the benefits of static typing  
✅ **Flexibility** - Can still specify types when needed  

## 📝 Type Annotations

Sometimes you want to explicitly specify the type of a variable or constant. This is done using **type annotations**.

### Syntax

```swift
let constantName: Type = value
var variableName: Type = value
```

### When to Use Type Annotations

1. **When the type isn't obvious**
2. **When you want a specific number type**
3. **When declaring without initial value**
4. **For clarity and documentation**

### Example: Explicit Type Annotations

```swift
// Explicitly specify types
let userName: String = "Alice"
let userAge: Int = 25
let accountBalance: Double = 1000.50
let isPremium: Bool = false

// These are equivalent to:
let userName = "Alice"        // Swift infers String
let userAge = 25              // Swift infers Int
let accountBalance = 1000.50  // Swift infers Double
let isPremium = false         // Swift infers Bool
```

### Example: When Type Annotations Are Needed

#### 1. Declaring Without Initial Value

```swift
// You must specify type if no initial value
var username: String
var age: Int
var score: Double

// Later, assign values
username = "John"
age = 30
score = 95.5
```

#### 2. Choosing Specific Number Types

```swift
// Without annotation, Swift chooses Int for whole numbers
let count = 10           // Inferred as Int

// But you might want a different type
let count: UInt8 = 10    // Unsigned 8-bit integer
let count: Int64 = 10    // 64-bit integer
```

#### 3. Working with Floating-Point Numbers

```swift
// Swift defaults to Double for decimal numbers
let price = 9.99         // Inferred as Double

// But you might want Float
let price: Float = 9.99  // Explicitly Float (less precision, less memory)
```

### Example: Type Annotations for Clarity

```swift
// Without annotation - works but not clear
let radius = 5.0
let area = 3.14159 * radius * radius

// With annotation - more clear and explicit
let radius: Double = 5.0
let pi: Double = 3.14159
let area: Double = pi * radius * radius
```

## 🎨 Type Safety in Action

Swift won't let you mix types incorrectly:

```swift
var age = 25              // Int
var message = "Hello"     // String

age = 30                  // ✅ OK: Int to Int
message = "Hi"            // ✅ OK: String to String

age = "thirty"            // ❌ Error: Cannot assign String to Int
message = 42              // ❌ Error: Cannot assign Int to String
```

### Converting Between Types

If you need to convert types, you must do it explicitly:

```swift
let ageString = "25"
let ageInt = Int(ageString)  // Convert String to Int

let score = 100
let scoreDouble = Double(score)  // Convert Int to Double

let pi = 3.14159
let piInt = Int(pi)  // Convert Double to Int (becomes 3)
```

## 📐 Naming Conventions

Swift has specific conventions for naming variables and constants.

### Rules (Must Follow)

1. **Start with letter or underscore** - Cannot start with number
2. **Can contain letters, numbers, underscores** - No spaces or special characters
3. **Case sensitive** - `userName` and `username` are different
4. **Cannot use Swift keywords** - Unless wrapped in backticks

### Conventions (Should Follow)

1. **Use camelCase** - First word lowercase, subsequent words capitalized
2. **Be descriptive** - Names should explain what they store
3. **Avoid abbreviations** - Unless commonly known (URL, ID)
4. **Use singular for single values** - `userName` not `userNames`
5. **Use plural for collections** - `items` not `item` for arrays

### ✅ Good Naming Examples

```swift
// Variables - camelCase, descriptive
var firstName = "John"
var lastName = "Doe"
var userAge = 25
var isLoggedIn = false
var accountBalance = 1500.50
var itemCount = 10

// Constants - same naming as variables
let maxLoginAttempts = 3
let apiEndpoint = "https://api.example.com"
let defaultTimeout = 30
```

### ❌ Bad Naming Examples

```swift
// Too short, not descriptive
var a = 25
var x = "John"
var b = true

// Using abbreviations unnecessarily
var usrNm = "Alice"
var acctBal = 1000

// Starting with number (won't compile)
var 1stPlace = "Gold"  // ❌ Error

// Using spaces (won't compile)
var user name = "Bob"  // ❌ Error
```

### Special Cases

```swift
// Using Swift keywords as names (not recommended)
var `class` = "Math"       // Backticks allow keywords
var `let` = "constant"     // But don't do this!

// Using underscores for unused values
let _ = "ignored value"    // Common in pattern matching

// Constants for math/physics (can use uppercase)
let PI = 3.14159          // OK for well-known constants
let SPEED_OF_LIGHT = 299792458
```

### Boolean Naming

For boolean values, use `is`, `has`, `should`, or `can` prefixes:

```swift
var isActive = true
var hasPermission = false
var shouldRefresh = true
var canEdit = false
var didFinishLoading = true
```

## 🎓 Practical Examples

Let's look at real-world examples combining what we've learned.

### Example 1: User Profile

```swift
// Constants - values that don't change
let userID = "12345"
let email = "alice@example.com"
let dateOfBirth = "1995-05-15"
let accountType = "Premium"

// Variables - values that can change
var displayName = "Alice"
var profilePicture = "default.jpg"
var followerCount = 0
var isOnline = false

// Updating variables
displayName = "Alice Smith"
followerCount = 150
isOnline = true

print("User: \(displayName)")
print("Followers: \(followerCount)")
print("Online: \(isOnline)")
```

**Output:**
```
User: Alice Smith
Followers: 150
Online: true
```

### Example 2: Shopping Cart

```swift
// Product details (constants)
let productName = "Laptop"
let productPrice: Double = 999.99
let taxRate: Double = 0.08

// Cart state (variables)
var quantity = 1
var subtotal = productPrice * Double(quantity)
var tax = subtotal * taxRate
var total = subtotal + tax

print("Product: \(productName)")
print("Quantity: \(quantity)")
print("Subtotal: $\(subtotal)")
print("Tax: $\(tax)")
print("Total: $\(total)")

// User adds another item
quantity = 2
subtotal = productPrice * Double(quantity)
tax = subtotal * taxRate
total = subtotal + tax

print("\nUpdated Cart:")
print("Quantity: \(quantity)")
print("Total: $\(total)")
```

**Output:**
```
Product: Laptop
Quantity: 1
Subtotal: $999.99
Tax: $79.9992
Total: $1079.9892

Updated Cart:
Quantity: 2
Total: $2159.9784
```

### Example 3: Game Score System

```swift
// Game configuration (constants)
let playerName = "Hero"
let maxHealth = 100
let startingLevel = 1

// Game state (variables)
var currentHealth = maxHealth
var currentLevel = startingLevel
var score = 0
var coinsCollected = 0

print("=== Game Started ===")
print("Player: \(playerName)")
print("Health: \(currentHealth)/\(maxHealth)")
print("Level: \(currentLevel)")

// Player takes damage
currentHealth -= 20
print("\n💥 Took damage! Health: \(currentHealth)")

// Player collects coins
coinsCollected += 10
score += 100
print("💰 Collected coins! Total: \(coinsCollected)")
print("⭐ Score: \(score)")

// Player levels up
currentLevel += 1
currentHealth = maxHealth  // Health restored
print("\n🎉 Level Up! Now level \(currentLevel)")
print("Health restored to: \(currentHealth)")
```

**Output:**
```
=== Game Started ===
Player: Hero
Health: 100/100
Level: 1

💥 Took damage! Health: 80
💰 Collected coins! Total: 10
⭐ Score: 100

🎉 Level Up! Now level 2
Health restored to: 100
```

## 🏋️ Practice Exercises

### Exercise 1: Personal Information

Create constants and variables for personal information:

```swift
// Your solution here
// Create constants for: name, birthYear
// Create variables for: age, city, occupation
// Print all values
```

**Solution:**

```swift
// Constants (won't change)
let name = "Sarah"
let birthYear = 1995

// Variables (can change)
var age = 29
var city = "San Francisco"
var occupation = "iOS Developer"

print("Name: \(name)")
print("Birth Year: \(birthYear)")
print("Age: \(age)")
print("City: \(city)")
print("Occupation: \(occupation)")

// Update variables
age = 30
city = "Seattle"
print("\nUpdated Info:")
print("Age: \(age)")
print("City: \(city)")
```

### Exercise 2: Temperature Converter

Create a converter that stores temperatures with proper use of constants and variables:

```swift
// Your solution here
// Store a Celsius temperature as a constant
// Calculate and store Fahrenheit as a variable
// Use type annotations
```

**Solution:**

```swift
let celsius: Double = 25.0
var fahrenheit: Double = (celsius * 9/5) + 32

print("\(celsius)°C is equal to \(fahrenheit)°F")

// Try another temperature
let anotherCelsius: Double = 0.0
fahrenheit = (anotherCelsius * 9/5) + 32
print("\(anotherCelsius)°C is equal to \(fahrenheit)°F")
```

### Exercise 3: BMI Calculator

Calculate Body Mass Index using constants and variables:

```swift
// Your solution here
// Create constants for: name, height (in meters), weight (in kg)
// Calculate BMI as a variable
// Formula: BMI = weight / (height * height)
```

**Solution:**

```swift
let personName = "Alex"
let heightInMeters: Double = 1.75
let weightInKg: Double = 70.0

var bmi = weightInKg / (heightInMeters * heightInMeters)

print("Name: \(personName)")
print("Height: \(heightInMeters)m")
print("Weight: \(weightInKg)kg")
print("BMI: \(bmi)")
```

**Output:**
```
Name: Alex
Height: 1.75m
Weight: 70.0kg
BMI: 22.857142857142858
```

## 🔍 Common Mistakes and How to Avoid Them

### Mistake 1: Using `var` When `let` Would Work

```swift
// ❌ Bad
var pi = 3.14159
var appName = "MyApp"

// ✅ Good
let pi = 3.14159
let appName = "MyApp"
```

### Mistake 2: Trying to Change Constants

```swift
let score = 100
score = 200  // ❌ Error: Cannot assign to value: 'score' is a 'let' constant

// Solution: Use var if you need to change it
var score = 100
score = 200  // ✅ OK
```

### Mistake 3: Forgetting Type Annotations When Needed

```swift
// ❌ Error: Type annotation missing in pattern
var username
username = "Alice"

// ✅ Good
var username: String
username = "Alice"

// Or even better: initialize immediately
var username = "Alice"
```

### Mistake 4: Mixing Types

```swift
var age = 25
age = "twenty-five"  // ❌ Error: Cannot assign String to Int

// Solution: Keep types consistent
var age = 25
age = 26  // ✅ OK
```

## 💡 Key Takeaways

✅ Use `let` for constants (values that don't change)  
✅ Use `var` for variables (values that can change)  
✅ **Prefer `let` by default** - only use `var` when needed  
✅ Swift infers types automatically (type inference)  
✅ You can explicitly specify types (type annotations)  
✅ Use camelCase naming convention  
✅ Make names descriptive and meaningful  
✅ Swift is type-safe - can't mix different types  

## 🚀 Next Steps

Now that you understand variables and constants, you're ready to learn about:

**Next lesson: Data Types in Swift**
- Basic types: Int, Double, Float, Bool, String
- Type safety and type inference in depth
- Type conversion
- Working with tuples

## 📚 Quick Reference

```swift
// Constants
let constantName = value
let name: Type = value

// Variables
var variableName = value
var name: Type = value

// Type annotations
var age: Int = 25
var price: Double = 19.99
var name: String = "John"
var isActive: Bool = true

// Type inference
let age = 25              // Int
let price = 19.99         // Double
let name = "John"         // String
let isActive = true       // Bool
```

---

**Practice makes perfect!** Try creating your own examples with constants and variables. Experiment with different types and see what works. The more you practice, the more natural it will become! 🎯
