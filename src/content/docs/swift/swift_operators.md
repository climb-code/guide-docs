---
title: "Operators in Swift"
description: "Master Swift operators including arithmetic, comparison, logical, range, and nil-coalescing operators with practical examples"
---

Welcome to Swift Operators! Operators are special symbols that perform operations on values and variables. They're the building blocks for calculations, comparisons, and logical decisions in your programs. Swift provides a rich set of operators that make your code both powerful and expressive.

## What Are Operators?

Operators are symbols that tell the compiler to perform specific operations on one or more operands (values or variables). Swift supports many types of operators, from simple arithmetic to complex logical operations.

### Types of Operators

Swift operators can be categorized by the number of operands they work with:

- **Unary operators** - Work with a single operand (e.g., `-a`, `!b`)
- **Binary operators** - Work with two operands (e.g., `a + b`, `a > b`)
- **Ternary operator** - Works with three operands (Swift has one: `a ? b : c`)

## Arithmetic Operators

Arithmetic operators perform mathematical operations on numeric values. These are the operators you'll use most frequently for calculations.

### Addition (+)

The addition operator adds two values together:

```swift
let sum = 5 + 3
print(sum)  // Output: 8

let price1 = 19.99
let price2 = 29.99
let total = price1 + price2
print(total)  // Output: 49.98

// String concatenation also uses +
let firstName = "John"
let lastName = "Doe"
let fullName = firstName + " " + lastName
print(fullName)  // Output: John Doe
```

### Subtraction (-)

The subtraction operator subtracts the right operand from the left operand:

```swift
let difference = 10 - 4
print(difference)  // Output: 6

let temperature = 25.5
let drop = 5.3
let newTemperature = temperature - drop
print(newTemperature)  // Output: 20.2

// Negative numbers
let balance = 100
let withdrawal = 150
let result = balance - withdrawal
print(result)  // Output: -50
```

### Multiplication (*)

The multiplication operator multiplies two values:

```swift
let product = 6 * 7
print(product)  // Output: 42

let price = 15.99
let quantity = 3
let totalCost = price * Double(quantity)
print(totalCost)  // Output: 47.97

// Calculate area
let length = 10.5
let width = 8.0
let area = length * width
print("Area: \(area) square meters")  // Output: Area: 84.0 square meters
```

### Division (/)

The division operator divides the left operand by the right operand:

```swift
let quotient = 20 / 4
print(quotient)  // Output: 5

// Decimal division
let result = 10.0 / 3.0
print(result)  // Output: 3.333333333333333

// Integer division truncates the decimal
let integerDivision = 10 / 3
print(integerDivision)  // Output: 3 (not 3.333...)

// Mix types by converting
let mixed = Double(10) / 3.0
print(mixed)  // Output: 3.333333333333333
```

⚠️ **Important:** Division by zero will cause a runtime error!

```swift
// let error = 10 / 0  // ❌ Runtime error!
```

### Remainder (%)

The remainder operator (also called modulo) returns the remainder of division:

```swift
let remainder = 10 % 3
print(remainder)  // Output: 1 (10 = 3 * 3 + 1)

let evenCheck = 8 % 2
print(evenCheck)  // Output: 0 (8 is divisible by 2)

let oddCheck = 7 % 2
print(oddCheck)  // Output: 1 (7 is odd)
```

**Practical use cases:**

```swift
// Check if a number is even or odd
let number = 15
if number % 2 == 0 {
    print("\(number) is even")
} else {
    print("\(number) is odd")  // Output: 15 is odd
}

// Get last digit of a number
let value = 12345
let lastDigit = value % 10
print("Last digit: \(lastDigit)")  // Output: Last digit: 5

// Cycle through array indices
let items = ["Apple", "Banana", "Orange"]
for i in 0..<10 {
    let index = i % items.count
    print(items[index])
}
// Output: Apple, Banana, Orange, Apple, Banana, Orange, Apple, Banana, Orange, Apple
```

### Unary Minus (-)

The unary minus operator negates a numeric value:

```swift
let positive = 42
let negative = -positive
print(negative)  // Output: -42

let temperature = -5
let opposite = -temperature
print(opposite)  // Output: 5
```

### Unary Plus (+)

The unary plus operator simply returns the value unchanged:

```swift
let value = 6
let result = +value
print(result)  // Output: 6

// It's rarely used but can improve readability
let positive = +10
let negative = -10
```

## Compound Assignment Operators

Swift provides shortcuts that combine an arithmetic operation with assignment:

```swift
var score = 100

// Addition assignment
score += 50        // Same as: score = score + 50
print(score)       // Output: 150

// Subtraction assignment
score -= 30        // Same as: score = score - 30
print(score)       // Output: 120

// Multiplication assignment
score *= 2         // Same as: score = score * 2
print(score)       // Output: 240

// Division assignment
score /= 4         // Same as: score = score / 4
print(score)       // Output: 60

// Remainder assignment
score %= 7         // Same as: score = score % 7
print(score)       // Output: 4
```

**Practical example:**

```swift
var bankBalance = 1000.0
print("Starting balance: $\(bankBalance)")

bankBalance += 500.0    // Deposit
print("After deposit: $\(bankBalance)")     // Output: After deposit: $1500.0

bankBalance -= 250.0    // Withdrawal
print("After withdrawal: $\(bankBalance)")  // Output: After withdrawal: $1250.0

bankBalance *= 1.05     // 5% interest
print("After interest: $\(bankBalance)")    // Output: After interest: $1312.5
```

## Comparison Operators

Comparison operators compare two values and return a Boolean result (`true` or `false`).

### Equal to (==)

Checks if two values are equal:

```swift
let a = 5
let b = 5
let c = 10

print(a == b)  // Output: true
print(a == c)  // Output: false

// Works with strings
let name1 = "Swift"
let name2 = "Swift"
let name3 = "Python"

print(name1 == name2)  // Output: true
print(name1 == name3)  // Output: false
```

### Not equal to (!=)

Checks if two values are not equal:

```swift
let x = 7
let y = 3

print(x != y)  // Output: true
print(x != 7)  // Output: false

// Practical use
let password = "secret123"
let userInput = "password"

if password != userInput {
    print("Incorrect password!")  // Output: Incorrect password!
}
```

### Greater than (>)

Checks if the left value is greater than the right value:

```swift
let score = 85
let passingGrade = 60

print(score > passingGrade)  // Output: true

if score > 90 {
    print("Excellent!")
} else if score > passingGrade {
    print("You passed!")  // Output: You passed!
} else {
    print("Try again")
}
```

### Less than (<)

Checks if the left value is less than the right value:

```swift
let age = 16
let minimumAge = 18

print(age < minimumAge)  // Output: true

if age < minimumAge {
    print("Access denied")  // Output: Access denied
}
```

### Greater than or equal to (>=)

Checks if the left value is greater than or equal to the right value:

```swift
let score = 70
let passingScore = 70

print(score >= passingScore)  // Output: true

if score >= passingScore {
    print("Congratulations! You passed!")  // Output: Congratulations! You passed!
}
```

### Less than or equal to (<=)

Checks if the left value is less than or equal to the right value:

```swift
let temperature = 25
let maxComfort = 25

print(temperature <= maxComfort)  // Output: true

if temperature <= 0 {
    print("Freezing!")
} else if temperature <= maxComfort {
    print("Comfortable temperature")  // Output: Comfortable temperature
}
```

## Logical Operators

Logical operators work with Boolean values and are essential for creating complex conditions.

### Logical NOT (!)

The NOT operator inverts a Boolean value:

```swift
let isSunny = true
let isRaining = !isSunny
print(isRaining)  // Output: false

let isLoggedIn = false
let needsLogin = !isLoggedIn
print(needsLogin)  // Output: true

// Double negation
let value = true
print(!!value)  // Output: true (same as original)
```

**Practical example:**

```swift
let hasPermission = false

if !hasPermission {
    print("Access denied!")  // Output: Access denied!
}

let isValid = true
if !isValid {
    print("Invalid input")
} else {
    print("Input is valid")  // Output: Input is valid
}
```

### Logical AND (&&)

The AND operator returns `true` only if both operands are `true`:

```swift
let isAdult = true
let hasLicense = true

// Both must be true
let canDrive = isAdult && hasLicense
print(canDrive)  // Output: true

let isWeekend = false
let hasFreetime = true
let canGoOut = isWeekend && hasFreetime
print(canGoOut)  // Output: false (isWeekend is false)
```

**Truth table for AND:**

```swift
print(true && true)    // Output: true
print(true && false)   // Output: false
print(false && true)   // Output: false
print(false && false)  // Output: false
```

**Practical example:**

```swift
let age = 25
let hasTicket = true
let hasID = true

// Multiple conditions with AND
if age >= 18 && hasTicket && hasID {
    print("Welcome to the concert!")  // Output: Welcome to the concert!
} else {
    print("Entry denied")
}

// Short-circuit evaluation
let username = "admin"
let password = "secret"

if username == "admin" && password == "secret" {
    print("Login successful!")  // Output: Login successful!
}
```

### Logical OR (||)

The OR operator returns `true` if at least one operand is `true`:

```swift
let isWeekend = true
let isHoliday = false

let isDayOff = isWeekend || isHoliday
print(isDayOff)  // Output: true (at least one is true)

let hasCoupon = false
let isPremiumMember = false
let getsDiscount = hasCoupon || isPremiumMember
print(getsDiscount)  // Output: false (both are false)
```

**Truth table for OR:**

```swift
print(true || true)    // Output: true
print(true || false)   // Output: true
print(false || true)   // Output: true
print(false || false)  // Output: false
```

**Practical example:**

```swift
let temperature = 35
let weatherAlert = "storm"

// Either condition triggers warning
if temperature > 30 || weatherAlert == "storm" {
    print("Weather warning!")  // Output: Weather warning!
}

// Payment methods
let hasCreditCard = false
let hasPayPal = true
let hasCash = true

if hasCreditCard || hasPayPal || hasCash {
    print("Payment method available")  // Output: Payment method available
}
```

### Combining Logical Operators

You can combine multiple logical operators to create complex conditions:

```swift
let age = 20
let hasParentalConsent = false
let isStudent = true
let hasID = true

// Complex condition
if (age >= 18 || hasParentalConsent) && hasID {
    print("Can enter")  // Output: Can enter
}

// Multiple conditions
let score = 85
let attendance = 95
let hasExtraCredit = true

if (score >= 80 && attendance >= 90) || hasExtraCredit {
    print("Grade: A")  // Output: Grade: A
}
```

**Order of operations:**

```swift
// NOT (!) has highest precedence, then AND (&&), then OR (||)
let result1 = true || false && false
print(result1)  // Output: true (evaluated as: true || (false && false))

// Use parentheses for clarity
let result2 = (true || false) && false
print(result2)  // Output: false
```

## Range Operators

Range operators create sequences of values, which are particularly useful with loops and collections.

### Closed Range Operator (...)

The closed range operator includes both the start and end values:

```swift
// Creates a range from 1 to 5 (inclusive)
let closedRange = 1...5

// Using in a for loop
for number in 1...5 {
    print(number)
}
// Output: 1, 2, 3, 4, 5

// With different values
for i in 10...15 {
    print("Counting: \(i)")
}
// Output: Counting: 10, 11, 12, 13, 14, 15
```

**Practical examples:**

```swift
// Print multiplication table
let num = 7
for i in 1...10 {
    print("\(num) × \(i) = \(num * i)")
}
// Output: 7 × 1 = 7, 7 × 2 = 14, ... 7 × 10 = 70

// Temperature range check
let currentTemp = 25
let comfortRange = 20...28

if comfortRange.contains(currentTemp) {
    print("Temperature is comfortable")  // Output: Temperature is comfortable
}

// Array slicing
let numbers = [10, 20, 30, 40, 50, 60]
let subset = numbers[2...4]
print(subset)  // Output: [30, 40, 50]
```

### Half-Open Range Operator (..<)

The half-open range operator includes the start value but excludes the end value:

```swift
// Creates a range from 1 to 4 (5 is excluded)
let halfOpenRange = 1..<5

for number in 1..<5 {
    print(number)
}
// Output: 1, 2, 3, 4

// Perfect for array indices
let fruits = ["Apple", "Banana", "Orange", "Grape"]
for i in 0..<fruits.count {
    print("Fruit \(i + 1): \(fruits[i])")
}
// Output:
// Fruit 1: Apple
// Fruit 2: Banana
// Fruit 3: Orange
// Fruit 4: Grape
```

**Why use half-open range?**

```swift
let items = ["First", "Second", "Third", "Fourth", "Fifth"]

// Half-open range prevents index out of bounds
// items.count is 5, so valid indices are 0..<5 (0, 1, 2, 3, 4)
for index in 0..<items.count {
    print("\(index): \(items[index])")
}

// This would crash: 0...items.count (tries to access index 5)
// for index in 0...items.count {  // ❌ Error!
//     print(items[index])
// }
```

### One-Sided Ranges

Swift also supports one-sided ranges that continue to the end:

```swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// From index 5 to the end
let fromFive = numbers[5...]
print(fromFive)  // Output: [6, 7, 8, 9, 10]

// From start up to (but not including) index 5
let upToFive = numbers[..<5]
print(upToFive)  // Output: [1, 2, 3, 4, 5]

// From start up to (and including) index 5
let throughFive = numbers[...5]
print(throughFive)  // Output: [1, 2, 3, 4, 5, 6]
```

**Practical example:**

```swift
let grades = [65, 70, 85, 90, 95, 78, 88, 92]

// Get last 3 grades
let recentGrades = grades[5...]
print("Recent grades: \(Array(recentGrades))")  
// Output: Recent grades: [78, 88, 92]

// Get first half
let firstHalf = grades[..<4]
print("First half: \(Array(firstHalf))")  
// Output: First half: [65, 70, 85, 90]
```

### Range Comparison

```swift
// Check if value is in range
let score = 75
let passingRange = 60...100

if passingRange.contains(score) {
    print("Score is in passing range")  // Output: Score is in passing range
}

// Multiple range checks
let age = 25
switch age {
case 0...12:
    print("Child")
case 13...17:
    print("Teenager")
case 18...64:
    print("Adult")  // Output: Adult
case 65...:
    print("Senior")
default:
    print("Invalid age")
}
```

## Nil-Coalescing Operator (??)

The nil-coalescing operator provides a default value when unwrapping optionals. It's a shorthand for checking if an optional contains a value.

### Basic Usage

```swift
// Syntax: optionalValue ?? defaultValue

let optionalName: String? = nil
let greeting = "Hello, " + (optionalName ?? "Guest")
print(greeting)  // Output: Hello, Guest

// With a value present
let actualName: String? = "Alice"
let greeting2 = "Hello, " + (actualName ?? "Guest")
print(greeting2)  // Output: Hello, Alice
```

### How It Works

The nil-coalescing operator works like this:

```swift
// If optional has a value, use it; otherwise, use the default
let optional: Int? = nil
let result = optional ?? 0
// Equivalent to:
// let result = optional != nil ? optional! : 0

print(result)  // Output: 0

let optional2: Int? = 42
let result2 = optional2 ?? 0
print(result2)  // Output: 42
```

### Practical Examples

**User preferences:**

```swift
// User settings with defaults
let userTheme: String? = nil
let theme = userTheme ?? "light"
print("Current theme: \(theme)")  // Output: Current theme: light

let userName: String? = nil
let displayName = userName ?? "Anonymous"
print("Welcome, \(displayName)!")  // Output: Welcome, Anonymous!

// With actual values
let savedLanguage: String? = "English"
let language = savedLanguage ?? "Default"
print("Language: \(language)")  // Output: Language: English
```

**Configuration values:**

```swift
// API configuration
let customPort: Int? = nil
let port = customPort ?? 8080
print("Server running on port \(port)")  // Output: Server running on port 8080

let apiKey: String? = nil
let key = apiKey ?? "demo-api-key"
print("Using API key: \(key)")  // Output: Using API key: demo-api-key

// With timeout
let customTimeout: Double? = nil
let timeout = customTimeout ?? 30.0
print("Timeout: \(timeout) seconds")  // Output: Timeout: 30.0 seconds
```

**Form inputs:**

```swift
// Processing form data
let userAge: String? = ""
let age = userAge ?? "Not provided"
print("Age: \(age)")  // Output: Age: (empty string is not nil!)

// Convert and provide default
let ageString: String? = "25"
let ageValue = Int(ageString ?? "0") ?? 0
print("Age value: \(ageValue)")  // Output: Age value: 25

let invalidAge: String? = "abc"
let safeAge = Int(invalidAge ?? "0") ?? 18
print("Safe age: \(safeAge)")  // Output: Safe age: 18
```

### Chaining Nil-Coalescing Operators

You can chain multiple nil-coalescing operators:

```swift
let primary: String? = nil
let secondary: String? = nil
let tertiary: String? = "Fallback"

let result = primary ?? secondary ?? tertiary ?? "Default"
print(result)  // Output: Fallback

// Real-world example: configuration system
let userSetting: Int? = nil
let envSetting: Int? = nil
let defaultSetting: Int? = 100

let finalSetting = userSetting ?? envSetting ?? defaultSetting ?? 0
print("Setting value: \(finalSetting)")  // Output: Setting value: 100
```

### Comparison with Optional Binding

```swift
// Using optional binding (if let)
let optionalValue: String? = "Swift"

if let value = optionalValue {
    print("Value: \(value)")
} else {
    print("Value: Guest")
}
// Output: Value: Swift

// Using nil-coalescing (more concise for simple cases)
let value = optionalValue ?? "Guest"
print("Value: \(value)")
// Output: Value: Swift
```

**When to use which:**

```swift
// Use nil-coalescing for simple default values
let name = userName ?? "Anonymous"

// Use optional binding when you need to do more with the value
if let userName = userName {
    print("Hello, \(userName)!")
    print("Your account is active")
    // More operations with userName
} else {
    print("Please log in")
}
```

## Operator Precedence and Associativity

Understanding operator precedence helps you predict how expressions are evaluated:

### Precedence Levels

Operators with higher precedence are evaluated first:

```swift
let result = 2 + 3 * 4
print(result)  // Output: 14 (not 20, because * has higher precedence)

// Equivalent to:
let result2 = 2 + (3 * 4)
print(result2)  // Output: 14

// Use parentheses to change order
let result3 = (2 + 3) * 4
print(result3)  // Output: 20
```

### Common Precedence Order (highest to lowest)

1. Unary operators (`!`, `-`, `+`)
2. Multiplication, division, remainder (`*`, `/`, `%`)
3. Addition, subtraction (`+`, `-`)
4. Range operators (`...`, `..<`)
5. Comparison operators (`<`, `<=`, `>`, `>=`, `==`, `!=`)
6. Logical AND (`&&`)
7. Logical OR (`||`)
8. Nil-coalescing (`??`)
9. Ternary conditional (`? :`)
10. Assignment operators (`=`, `+=`, `-=`, etc.)

**Examples:**

```swift
// Arithmetic precedence
let calc1 = 10 + 5 * 2
print(calc1)  // Output: 20 (5 * 2 first, then + 10)

let calc2 = 10 / 2 + 3
print(calc2)  // Output: 8 (10 / 2 first, then + 3)

// Comparison and logical
let value = 5
let inRange = value > 0 && value < 10
print(inRange)  // Output: true

// Same as: (value > 0) && (value < 10)

// Mixed operators
let complex = 2 + 3 * 4 > 10 && true
print(complex)  // Output: true
// Evaluated as: ((2 + (3 * 4)) > 10) && true
//              (14 > 10) && true
//              true && true
//              true
```

### Best Practice: Use Parentheses

Even when you know the precedence, use parentheses for clarity:

```swift
// Less clear
let result = a + b * c - d / e

// More clear
let result2 = a + (b * c) - (d / e)

// Complex conditions
if age >= 18 && hasID || isVIP {  // Unclear intent
    print("Allowed")
}

// Better
if (age >= 18 && hasID) || isVIP {  // Clear: either (adult with ID) OR (VIP)
    print("Allowed")
}
```

## Practical Examples and Use Cases

### Example 1: Price Calculator with Discount

```swift
let originalPrice = 99.99
let discountPercentage = 15.0
let quantity = 3
let taxRate = 0.08

// Calculate subtotal
let subtotal = originalPrice * Double(quantity)
print("Subtotal: $\(subtotal)")  // Output: Subtotal: $299.97

// Apply discount
let discountAmount = subtotal * (discountPercentage / 100.0)
let afterDiscount = subtotal - discountAmount
print("After \(discountPercentage)% discount: $\(afterDiscount)")  
// Output: After 15.0% discount: $254.9745

// Add tax
let tax = afterDiscount * taxRate
let finalPrice = afterDiscount + tax
print("Tax: $\(tax)")  // Output: Tax: $20.39796
print("Final price: $\(finalPrice)")  // Output: Final price: $275.37246

// Format to 2 decimal places
let roundedPrice = round(finalPrice * 100) / 100
print("Total: $\(roundedPrice)")  // Output: Total: $275.37
```

### Example 2: Grade Calculator

```swift
let exam1 = 85.0
let exam2 = 92.0
let exam3 = 78.0
let attendance = 95.0

// Calculate average with weights
let examAverage = (exam1 + exam2 + exam3) / 3.0
let finalGrade = (examAverage * 0.8) + (attendance * 0.2)

print("Exam average: \(examAverage)")  // Output: Exam average: 85.0
print("Final grade: \(finalGrade)")     // Output: Final grade: 87.0

// Determine letter grade
let letterGrade: String
if finalGrade >= 90 {
    letterGrade = "A"
} else if finalGrade >= 80 {
    letterGrade = "B"
} else if finalGrade >= 70 {
    letterGrade = "C"
} else if finalGrade >= 60 {
    letterGrade = "D"
} else {
    letterGrade = "F"
}

print("Letter grade: \(letterGrade)")  // Output: Letter grade: B

// Check if passed
let hasPassed = finalGrade >= 60 && attendance >= 75
if hasPassed {
    print("Congratulations! You passed!")  // Output: Congratulations! You passed!
}
```

### Example 3: User Authentication System

```swift
// User input simulation
let username: String? = "admin"
let password: String? = "secure123"
let isEmailVerified: Bool = true
let isBanned: Bool = false
let loginAttempts: Int = 2
let maxAttempts: Int = 3

// Validation
let hasValidUsername = (username ?? "").count >= 3
let hasValidPassword = (password ?? "").count >= 8
let isAccountActive = !isBanned
let hasAttemptsLeft = loginAttempts < maxAttempts

// Check all conditions
if hasValidUsername && hasValidPassword && isEmailVerified && isAccountActive && hasAttemptsLeft {
    print("Login successful!")
    print("Welcome, \(username ?? "User")!")
} else {
    if !hasValidUsername {
        print("Invalid username")
    }
    if !hasValidPassword {
        print("Password too short")  // Output: Password too short
    }
    if !isEmailVerified {
        print("Please verify your email")
    }
    if isBanned {
        print("Account banned")
    }
    if !hasAttemptsLeft {
        print("Too many login attempts")
    }
}
```

### Example 4: Temperature Converter

```swift
let celsius: Double = 25.0

// Convert to Fahrenheit
let fahrenheit = (celsius * 9.0 / 5.0) + 32.0
print("\(celsius)°C = \(fahrenheit)°F")  
// Output: 25.0°C = 77.0°F

// Convert to Kelvin
let kelvin = celsius + 273.15
print("\(celsius)°C = \(kelvin)K")  
// Output: 25.0°C = 298.15K

// Temperature status
let status: String
if celsius <= 0 {
    status = "Freezing"
} else if celsius > 0 && celsius <= 15 {
    status = "Cold"
} else if celsius > 15 && celsius <= 25 {
    status = "Comfortable"
} else {
    status = "Hot"
}

print("Status: \(status)")  // Output: Status: Comfortable
```

## Common Pitfalls and Best Practices

### ✅ Best Practices

1. **Use meaningful variable names with operators**
   ```swift
   // Good
   let totalPrice = itemPrice + shippingCost
   
   // Avoid
   let t = p + s
   ```

2. **Use parentheses for clarity**
   ```swift
   // Good
   let result = (a + b) * (c - d)
   
   // Less clear
   let result = a + b * c - d
   ```

3. **Prefer nil-coalescing over force unwrapping**
   ```swift
   // Good
   let name = optionalName ?? "Guest"
   
   // Dangerous
   let name = optionalName!
   ```

4. **Use compound assignment operators**
   ```swift
   // Good
   count += 1
   
   // Verbose
   count = count + 1
   ```

### ❌ Common Mistakes

1. **Integer division truncation**
   ```swift
   let result = 5 / 2        // 2 (not 2.5!)
   let correct = 5.0 / 2.0   // 2.5
   ```

2. **Comparison operator confusion**
   ```swift
   let x = 5
   // if x = 10 {  // ❌ Assignment, not comparison!
   if x == 10 {    // ✅ Correct comparison
       print("x is 10")
   }
   ```

3. **Logical operator short-circuit**
   ```swift
   // Second condition not evaluated if first is false
   if false && expensiveFunction() {
       // expensiveFunction() is never called
   }
   ```

4. **Mixing types without conversion**
   ```swift
   let integer = 5
   let double = 2.5
   // let sum = integer + double  // ❌ Error!
   let sum = Double(integer) + double  // ✅ Correct
   ```

## Summary

In this chapter, you learned about:

- ✅ **Arithmetic Operators**: `+`, `-`, `*`, `/`, `%` for mathematical operations
- ✅ **Comparison Operators**: `==`, `!=`, `<`, `>`, `<=`, `>=` for comparing values
- ✅ **Logical Operators**: `&&`, `||`, `!` for Boolean logic
- ✅ **Range Operators**: `...` and `..<` for creating sequences
- ✅ **Nil-Coalescing Operator**: `??` for providing default values
- ✅ **Compound Assignment**: `+=`, `-=`, `*=`, `/=`, `%=` for shortcuts
- ✅ **Operator Precedence**: Understanding evaluation order
- ✅ **Best Practices**: Writing clear and maintainable code

Operators are fundamental to Swift programming. Understanding how to use them effectively will make your code more expressive and powerful.

## What's Next?

Now that you've mastered operators, you're ready to learn about:

**Topic 5: Strings and Characters**
- String creation and manipulation
- String interpolation
- Multi-line strings
- String methods and properties
- Character operations

Keep practicing with operators, and try combining them in different ways to solve problems! 🚀

---

**Practice Exercise:**

Try creating programs that:
1. Build a BMI calculator using arithmetic operators
2. Create an age verification system using comparison and logical operators
3. Slice an array using range operators
4. Handle user input with nil-coalescing operator

Happy coding! 💻
