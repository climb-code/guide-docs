---
title: "Swift Functions - Reusable Code Blocks"
description: "Master Swift functions including declarations, parameters, return values, argument labels, variadic parameters, and inout parameters"
---

Welcome to Swift Functions! Functions are the building blocks of well-organized code. They let you package up reusable chunks of functionality, making your code cleaner, more maintainable, and easier to understand. In this guide, we'll explore everything you need to know about functions in Swift.

## What Are Functions?

Functions are self-contained blocks of code that perform a specific task. Think of them as little machines that:
- Take in inputs (parameters)
- Do some work
- Optionally return a result

Instead of writing the same code multiple times, you write it once in a function and call it whenever needed.

**Why Use Functions?**
- ✅ **Reusability** - Write once, use many times
- ✅ **Organization** - Break complex problems into smaller pieces
- ✅ **Readability** - Give meaningful names to code blocks
- ✅ **Maintenance** - Fix bugs in one place
- ✅ **Testing** - Easy to test individual pieces

## Basic Function Declaration

### Functions Without Parameters or Return Values

The simplest function takes no inputs and returns nothing:

```swift
func sayHello() {
    print("Hello, World!")
}

// Call the function
sayHello()
// Output: Hello, World!

func greetUser() {
    print("Welcome to Swift!")
    print("Let's learn functions!")
}

greetUser()
// Output:
// Welcome to Swift!
// Let's learn functions!
```

### Functions With Parameters

Parameters let you pass data into functions:

```swift
func greet(name: String) {
    print("Hello, \(name)!")
}

greet(name: "Alice")
// Output: Hello, Alice!

func introduce(name: String, age: Int) {
    print("My name is \(name) and I'm \(age) years old.")
}

introduce(name: "Bob", age: 25)
// Output: My name is Bob and I'm 25 years old.
```

### Functions With Return Values

Use `->` to specify what type a function returns:

```swift
func add(a: Int, b: Int) -> Int {
    return a + b
}

let sum = add(a: 5, b: 3)
print("Sum: \(sum)")
// Output: Sum: 8

func multiply(x: Double, y: Double) -> Double {
    return x * y
}

let result = multiply(x: 4.5, y: 2.0)
print("Result: \(result)")
// Output: Result: 9.0
```

### Implicit Return

For single-expression functions, you can omit `return`:

```swift
func square(_ number: Int) -> Int {
    number * number  // No 'return' keyword needed
}

print(square(5))  // Output: 25

func isEven(_ number: Int) -> Bool {
    number % 2 == 0
}

print(isEven(4))  // Output: true
print(isEven(7))  // Output: false
```

## Parameters and Return Values

### Multiple Parameters

Functions can have as many parameters as needed:

```swift
func calculateArea(length: Double, width: Double) -> Double {
    return length * width
}

let area = calculateArea(length: 10.0, width: 5.0)
print("Area: \(area)")  // Output: Area: 50.0

func displayInfo(name: String, age: Int, city: String, country: String) {
    print("\(name), \(age) years old")
    print("Location: \(city), \(country)")
}

displayInfo(name: "Alice", age: 30, city: "New York", country: "USA")
```

### Returning Multiple Values with Tuples

Use tuples to return multiple values:

```swift
func getMinMax(numbers: [Int]) -> (min: Int, max: Int)? {
    guard !numbers.isEmpty else { return nil }
    
    var currentMin = numbers[0]
    var currentMax = numbers[0]
    
    for number in numbers {
        if number < currentMin {
            currentMin = number
        }
        if number > currentMax {
            currentMax = number
        }
    }
    
    return (currentMin, currentMax)
}

if let bounds = getMinMax(numbers: [5, 2, 9, 1, 7]) {
    print("Min: \(bounds.min), Max: \(bounds.max)")
    // Output: Min: 1, Max: 9
}

// Another example
func parseFullName(_ fullName: String) -> (firstName: String, lastName: String) {
    let components = fullName.split(separator: " ")
    let firstName = String(components[0])
    let lastName = components.count > 1 ? String(components[1]) : ""
    return (firstName, lastName)
}

let name = parseFullName("John Doe")
print("First: \(name.firstName), Last: \(name.lastName)")
// Output: First: John, Last: Doe
```

### Optional Return Values

Functions can return optional values:

```swift
func findStudent(id: Int) -> String? {
    let students = [
        1: "Alice",
        2: "Bob",
        3: "Charlie"
    ]
    return students[id]
}

if let student = findStudent(id: 2) {
    print("Found: \(student)")
} else {
    print("Student not found")
}
// Output: Found: Bob

func divide(_ a: Double, by b: Double) -> Double? {
    guard b != 0 else { return nil }
    return a / b
}

if let result = divide(10, by: 2) {
    print("Result: \(result)")  // Output: Result: 5.0
}

if let result = divide(10, by: 0) {
    print("Result: \(result)")
} else {
    print("Cannot divide by zero")  // This executes
}
```

## Argument Labels

Swift has a powerful feature called argument labels that make function calls more readable.

### External and Internal Parameter Names

```swift
// External name: 'for' (used when calling)
// Internal name: 'person' (used inside function)
func greet(for person: String) {
    print("Hello, \(person)!")
}

greet(for: "Alice")
// Output: Hello, Alice!

func sendMessage(to recipient: String, from sender: String) {
    print("Message from \(sender) to \(recipient)")
}

sendMessage(to: "Bob", from: "Alice")
// Output: Message from Alice to Bob
```

### Omitting Argument Labels with Underscore

Use `_` to omit the argument label:

```swift
func greet(_ name: String) {
    print("Hello, \(name)!")
}

greet("Alice")  // No label needed
// Output: Hello, Alice!

func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

let sum = add(5, 3)  // No labels
print(sum)  // Output: 8

// Mix labeled and unlabeled
func printMessage(_ message: String, times count: Int) {
    for _ in 1...count {
        print(message)
    }
}

printMessage("Hello", times: 3)
```

### Default Parameter Values

Provide default values for parameters:

```swift
func greet(name: String = "Guest", greeting: String = "Hello") {
    print("\(greeting), \(name)!")
}

greet()  // Output: Hello, Guest!
greet(name: "Alice")  // Output: Hello, Alice!
greet(greeting: "Hi")  // Output: Hi, Guest!
greet(name: "Bob", greeting: "Hey")  // Output: Hey, Bob!

func createUser(username: String, age: Int = 18, country: String = "USA") {
    print("User: \(username), Age: \(age), Country: \(country)")
}

createUser(username: "alice")
// Output: User: alice, Age: 18, Country: USA

createUser(username: "bob", age: 25)
// Output: User: bob, Age: 25, Country: USA

createUser(username: "charlie", age: 30, country: "UK")
// Output: User: charlie, Age: 30, Country: UK
```

## Variadic Parameters

Variadic parameters accept zero or more values of a specified type:

```swift
func calculateAverage(_ numbers: Double...) -> Double {
    guard !numbers.isEmpty else { return 0 }
    
    let sum = numbers.reduce(0, +)
    return sum / Double(numbers.count)
}

print(calculateAverage(1, 2, 3, 4, 5))  // Output: 3.0
print(calculateAverage(10.5, 20.5, 30.0))  // Output: 20.333...
print(calculateAverage())  // Output: 0.0

func printNames(_ names: String...) {
    for (index, name) in names.enumerated() {
        print("\(index + 1). \(name)")
    }
}

printNames("Alice", "Bob", "Charlie")
// Output:
// 1. Alice
// 2. Bob
// 3. Charlie

func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}

print(sum(1, 2, 3, 4, 5))  // Output: 15
```

**Important Rules:**
- A function can have only ONE variadic parameter
- Variadic parameters must come after regular parameters
- The variadic parameter is treated as an array inside the function

```swift
// ✅ Correct
func example(name: String, scores: Int...) { }

// ❌ Error - variadic parameter must come last
// func example(scores: Int..., name: String) { }
```

## Inout Parameters

By default, function parameters are constants (immutable). Use `inout` to modify variables passed to a function:

### Basic Inout Parameters

```swift
func double(_ number: inout Int) {
    number *= 2
}

var value = 5
double(&value)  // Note the & symbol
print(value)  // Output: 10

func increment(_ number: inout Int, by amount: Int = 1) {
    number += amount
}

var score = 100
increment(&score)  // Increment by 1 (default)
print(score)  // Output: 101

increment(&score, by: 5)
print(score)  // Output: 106
```

### Swapping Values

```swift
func swap(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

var x = 10
var y = 20
print("Before: x=\(x), y=\(y)")  // Before: x=10, y=20

swap(&x, &y)
print("After: x=\(x), y=\(y)")  // After: x=20, y=10

// Swift has a built-in swap function
var p = 100
var q = 200
Swift.swap(&p, &q)
print("p=\(p), q=\(q)")  // p=200, q=100
```

### Modifying Arrays

```swift
func append(_ element: Int, to array: inout [Int]) {
    array.append(element)
}

var numbers = [1, 2, 3]
append(4, to: &numbers)
print(numbers)  // Output: [1, 2, 3, 4]

func removeNegatives(from numbers: inout [Int]) {
    numbers = numbers.filter { $0 >= 0 }
}

var values = [5, -2, 8, -1, 3]
removeNegatives(from: &values)
print(values)  // Output: [5, 8, 3]
```

**Important Notes:**
- You must pass a variable (not a constant or literal)
- Use `&` when passing the variable
- Cannot pass inout parameters to functions with default values
- Cannot use inout with variadic parameters

```swift
// ❌ Error - cannot pass constant
// let constant = 5
// double(&constant)

// ❌ Error - cannot pass literal
// double(&10)
```

## Function Types

Every function has a specific type based on its parameters and return value:

### Using Functions as Types

```swift
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

func multiply(_ a: Int, _ b: Int) -> Int {
    return a * b
}

// Function type: (Int, Int) -> Int
var mathOperation: (Int, Int) -> Int = add

print(mathOperation(5, 3))  // Output: 8

mathOperation = multiply
print(mathOperation(5, 3))  // Output: 15
```

### Functions as Parameters

```swift
func performOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

let sum = performOperation(10, 5, operation: add)
print("Sum: \(sum)")  // Output: Sum: 15

let product = performOperation(10, 5, operation: multiply)
print("Product: \(product)")  // Output: Product: 50
```

### Functions as Return Values

```swift
func chooseOperation(isMultiply: Bool) -> (Int, Int) -> Int {
    return isMultiply ? multiply : add
}

let operation = chooseOperation(isMultiply: true)
print(operation(4, 5))  // Output: 20

let anotherOperation = chooseOperation(isMultiply: false)
print(anotherOperation(4, 5))  // Output: 9
```

## Nested Functions

Functions can be defined inside other functions:

```swift
func calculate(operation: String, a: Int, b: Int) -> Int? {
    func add() -> Int {
        return a + b
    }
    
    func subtract() -> Int {
        return a - b
    }
    
    func multiply() -> Int {
        return a * b
    }
    
    func divide() -> Int? {
        return b != 0 ? a / b : nil
    }
    
    switch operation {
    case "+": return add()
    case "-": return subtract()
    case "*": return multiply()
    case "/": return divide()
    default: return nil
    }
}

print(calculate(operation: "+", a: 10, b: 5) ?? 0)  // Output: 15
print(calculate(operation: "*", a: 10, b: 5) ?? 0)  // Output: 50
```

## Practical Examples

### Example 1: Temperature Converter

```swift
func convertTemperature(value: Double, from: String, to: String) -> Double? {
    func celsiusToFahrenheit(_ celsius: Double) -> Double {
        return celsius * 9/5 + 32
    }
    
    func fahrenheitToCelsius(_ fahrenheit: Double) -> Double {
        return (fahrenheit - 32) * 5/9
    }
    
    func celsiusToKelvin(_ celsius: Double) -> Double {
        return celsius + 273.15
    }
    
    func kelvinToCelsius(_ kelvin: Double) -> Double {
        return kelvin - 273.15
    }
    
    switch (from.lowercased(), to.lowercased()) {
    case ("c", "f"): return celsiusToFahrenheit(value)
    case ("f", "c"): return fahrenheitToCelsius(value)
    case ("c", "k"): return celsiusToKelvin(value)
    case ("k", "c"): return kelvinToCelsius(value)
    case ("f", "k"): return celsiusToKelvin(fahrenheitToCelsius(value))
    case ("k", "f"): return celsiusToFahrenheit(kelvinToCelsius(value))
    case _ where from.lowercased() == to.lowercased(): return value
    default: return nil
    }
}

if let result = convertTemperature(value: 25, from: "C", to: "F") {
    print("25°C = \(result)°F")  // Output: 25°C = 77.0°F
}
```

### Example 2: Grade Calculator

```swift
func calculateGrade(scores: Double...) -> (average: Double, grade: String, passed: Bool) {
    guard !scores.isEmpty else {
        return (0, "N/A", false)
    }
    
    let average = scores.reduce(0, +) / Double(scores.count)
    
    let grade: String
    switch average {
    case 90...100: grade = "A"
    case 80..<90: grade = "B"
    case 70..<80: grade = "C"
    case 60..<70: grade = "D"
    default: grade = "F"
    }
    
    let passed = average >= 60
    
    return (average, grade, passed)
}

let result = calculateGrade(scores: 85, 92, 78, 88)
print("Average: \(result.average)")
print("Grade: \(result.grade)")
print("Passed: \(result.passed)")
// Output:
// Average: 85.75
// Grade: B
// Passed: true
```

### Example 3: Validation Functions

```swift
func validateEmail(_ email: String) -> Bool {
    let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
    let predicate = NSPredicate(format:"SELF MATCHES %@", emailRegex)
    return predicate.evaluate(with: email)
}

func validatePassword(_ password: String) -> (isValid: Bool, message: String) {
    guard password.count >= 8 else {
        return (false, "Password must be at least 8 characters")
    }
    
    let hasUppercase = password.contains(where: { $0.isUppercase })
    let hasLowercase = password.contains(where: { $0.isLowercase })
    let hasDigit = password.contains(where: { $0.isNumber })
    
    guard hasUppercase && hasLowercase && hasDigit else {
        return (false, "Password must contain uppercase, lowercase, and numbers")
    }
    
    return (true, "Password is valid")
}

let emailValid = validateEmail("test@example.com")
print("Email valid: \(emailValid)")  // Output: Email valid: true

let passwordCheck = validatePassword("Pass123")
print(passwordCheck.message)
// Output: Password is valid
```

### Example 4: Array Utilities

```swift
func filterEvenNumbers(_ numbers: [Int]) -> [Int] {
    numbers.filter { $0 % 2 == 0 }
}

func sumArray(_ numbers: [Int]) -> Int {
    numbers.reduce(0, +)
}

func findMax(in numbers: [Int]) -> Int? {
    numbers.max()
}

func removeDuplicates<T: Hashable>(from array: [T]) -> [T] {
    Array(Set(array))
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print("Even numbers: \(filterEvenNumbers(numbers))")
// Output: Even numbers: [2, 4, 6, 8, 10]

print("Sum: \(sumArray(numbers))")
// Output: Sum: 55

if let max = findMax(in: numbers) {
    print("Max: \(max)")  // Output: Max: 10
}

let duplicates = [1, 2, 2, 3, 3, 3, 4, 5]
print("Unique: \(removeDuplicates(from: duplicates))")
// Output will vary in order: [1, 2, 3, 4, 5]
```

### Example 5: Shopping Cart Calculator

```swift
func calculateTotal(items: [(name: String, price: Double, quantity: Int)], 
                   discount: Double = 0, 
                   taxRate: Double = 0.08) -> (subtotal: Double, tax: Double, total: Double) {
    let subtotal = items.reduce(0) { $0 + ($1.price * Double($1.quantity)) }
    let discountedSubtotal = subtotal * (1 - discount)
    let tax = discountedSubtotal * taxRate
    let total = discountedSubtotal + tax
    
    return (discountedSubtotal, tax, total)
}

let cart = [
    (name: "iPhone", price: 999.99, quantity: 1),
    (name: "AirPods", price: 179.99, quantity: 2),
    (name: "Case", price: 29.99, quantity: 1)
]

let bill = calculateTotal(items: cart, discount: 0.10)
print("Subtotal: $\(String(format: "%.2f", bill.subtotal))")
print("Tax: $\(String(format: "%.2f", bill.tax))")
print("Total: $\(String(format: "%.2f", bill.total))")
// Output:
// Subtotal: $1259.95
// Tax: $100.80
// Total: $1360.75
```

### Example 6: String Utilities

```swift
func capitalize(words text: String) -> String {
    text.split(separator: " ")
        .map { $0.prefix(1).uppercased() + $0.dropFirst().lowercased() }
        .joined(separator: " ")
}

func reverse(_ text: String) -> String {
    String(text.reversed())
}

func isPalindrome(_ text: String) -> Bool {
    let cleaned = text.lowercased().filter { $0.isLetter }
    return cleaned == String(cleaned.reversed())
}

func countVowels(in text: String) -> Int {
    let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
    return text.lowercased().filter { vowels.contains($0) }.count
}

print(capitalize(words: "hello world"))  // Output: Hello World
print(reverse("Swift"))  // Output: tfiwS
print(isPalindrome("racecar"))  // Output: true
print(countVowels(in: "Hello World"))  // Output: 3
```

## Best Practices

### 1. Use Descriptive Names

```swift
// ❌ Poor naming
func calc(_ x: Int, _ y: Int) -> Int {
    return x + y
}

// ✅ Clear naming
func calculateSum(of firstNumber: Int, and secondNumber: Int) -> Int {
    return firstNumber + secondNumber
}
```

### 2. Keep Functions Focused

```swift
// ❌ Function doing too much
func processUser() {
    // validate input
    // save to database
    // send email
    // update UI
    // log activity
}

// ✅ Single responsibility
func validateUser() -> Bool { /* ... */ }
func saveUser() { /* ... */ }
func sendWelcomeEmail() { /* ... */ }
func updateUserInterface() { /* ... */ }
func logUserActivity() { /* ... */ }
```

### 3. Use Default Parameters Wisely

```swift
// ✅ Good use of defaults
func fetchData(from url: String, 
               timeout: TimeInterval = 30, 
               retries: Int = 3) {
    // Implementation
}

// Easy to call with defaults
fetchData(from: "https://api.example.com")

// Can override when needed
fetchData(from: "https://api.example.com", timeout: 60, retries: 5)
```

### 4. Return Early for Invalid Cases

```swift
// ✅ Guard for early exits
func processOrder(items: [String], total: Double) -> Bool {
    guard !items.isEmpty else {
        print("No items in order")
        return false
    }
    
    guard total > 0 else {
        print("Invalid total")
        return false
    }
    
    // Process order
    return true
}
```

### 5. Use Appropriate Return Types

```swift
// ✅ Return optional for possible nil
func findUser(by id: Int) -> User? {
    // Might not find user
}

// ✅ Return tuple for multiple values
func getUserInfo() -> (name: String, age: Int) {
    return ("Alice", 25)
}

// ✅ Return Result type for operations that can fail
func loadData() -> Result<Data, Error> {
    // Return success or failure
}
```

## Common Mistakes to Avoid

### 1. Modifying Inout Parameters Incorrectly

```swift
// ❌ Wrong - no & symbol
var number = 5
// double(number)  // Error

// ✅ Correct
double(&number)
```

### 2. Too Many Parameters

```swift
// ❌ Too many parameters
func createUser(name: String, age: Int, email: String, 
                phone: String, address: String, city: String, 
                state: String, zip: String) { }

// ✅ Better - use a struct
struct UserInfo {
    let name: String
    let age: Int
    let email: String
    let phone: String
    let address: Address
}

struct Address {
    let street: String
    let city: String
    let state: String
    let zip: String
}

func createUser(_ info: UserInfo) { }
```

### 3. Not Handling Optional Returns

```swift
// ❌ Force unwrapping
let user = findUser(by: 5)!  // Crashes if nil

// ✅ Safe unwrapping
if let user = findUser(by: 5) {
    print(user)
}
```

## Summary

Functions are essential for writing clean, maintainable Swift code. Here's what we covered:

**Basic Functions** 📦
- Declaration and calling
- Parameters and return values
- Single-expression implicit returns

**Argument Labels** 🏷️
- External and internal names
- Omitting labels with underscore
- Default parameter values

**Variadic Parameters** 📊
- Accept multiple values
- Treated as arrays
- Only one per function

**Inout Parameters** ↔️
- Modify variables passed to functions
- Use `&` when passing
- Cannot pass constants or literals

**Advanced Concepts** 🚀
- Functions as types
- Functions as parameters/return values
- Nested functions

## Next Steps

Congratulations on mastering functions! 🎉

**Next, we'll explore:**
- Topic 10: Closures
- Closure syntax and expressions
- Trailing closures
- Capturing values
- Escaping and non-escaping closures

## Practice Exercises

Try these to sharpen your skills:

1. Write a function that calculates BMI (Body Mass Index)
2. Create a function that finds all prime numbers up to a given number
3. Build a calculator function that takes an operator and two numbers
4. Write a function that validates credit card numbers (Luhn algorithm)
5. Create a function that converts Roman numerals to integers
6. Build a password generator function with customizable parameters
7. Write a function that formats currency based on locale

---

**Master functions and you'll write modular, reusable code!** 🎯

*Remember: A good function does one thing well. Keep them focused and well-named.*
