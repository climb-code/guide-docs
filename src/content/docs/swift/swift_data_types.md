---
title: "Data Types in Swift"
description: "Learn about Swift's fundamental data types including Int, Double, Float, Bool, String, type safety, type inference, type conversion, and tuples"
---

Welcome to the world of Swift data types! Understanding data types is crucial for writing effective Swift code. Swift is a type-safe language, which means it helps you catch errors at compile time rather than at runtime. Let's explore how Swift handles different types of data.

## What Are Data Types?

Data types define what kind of values a variable or constant can hold. They tell the compiler how to interpret and work with the data in your program. Swift provides several built-in data types for common scenarios.

## Basic Data Types in Swift

Swift provides several fundamental data types that you'll use frequently in your programs:

### 1. Int (Integer)

The `Int` type represents whole numbers (positive, negative, or zero) without any decimal points.

```swift
// Integer examples
let age = 25
let temperature = -5
let score = 0
let population = 1000000

print("Age: \(age)")          // Output: Age: 25
print("Temperature: \(temperature)")  // Output: Temperature: -5
```

#### Integer Sizes

Swift provides different integer sizes based on your needs:

```swift
// Signed integers (can be positive or negative)
let int8Value: Int8 = 127        // Range: -128 to 127
let int16Value: Int16 = 32767    // Range: -32,768 to 32,767
let int32Value: Int32 = 2147483647
let int64Value: Int64 = 9223372036854775807

// Unsigned integers (only positive)
let uint8Value: UInt8 = 255      // Range: 0 to 255
let uint16Value: UInt16 = 65535  // Range: 0 to 65,535
```

**Best Practice:** Unless you have a specific reason to use a sized integer, use `Int` which automatically uses the platform's native word size (32-bit on 32-bit platforms, 64-bit on 64-bit platforms).

### 2. Double

The `Double` type represents 64-bit floating-point numbers with decimal places. It has a precision of at least 15 decimal digits.

```swift
// Double examples
let pi = 3.14159265359
let price = 99.99
let temperature = 36.6

print("Pi value: \(pi)")        // Output: Pi value: 3.14159265359
print("Price: $\(price)")       // Output: Price: $99.99
```

### 3. Float

The `Float` type represents 32-bit floating-point numbers. It has a precision of at least 6 decimal digits.

```swift
// Float examples
let smallNumber: Float = 3.14
let percentage: Float = 85.5

print("Small number: \(smallNumber)")  // Output: Small number: 3.14
```

**When to use Float vs Double:**
- Use `Double` by default (it's Swift's preferred floating-point type)
- Use `Float` only when you specifically need 32-bit precision (e.g., working with large arrays where memory is a concern)

```swift
// Swift infers Double by default
let inferredDouble = 3.14        // This is a Double, not Float
let explicitFloat: Float = 3.14  // Must explicitly declare Float
```

### 4. Bool (Boolean)

The `Bool` type represents logical values - either `true` or `false`. Booleans are essential for control flow and decision-making in programs.

```swift
// Boolean examples
let isSwiftAwesome = true
let isRaining = false
let hasPermission = true

print("Is Swift awesome? \(isSwiftAwesome)")  // Output: Is Swift awesome? true

// Common use in conditionals
if isSwiftAwesome {
    print("Let's learn Swift!")
}

// Boolean operations
let isSunny = true
let isWarm = true
let perfectDay = isSunny && isWarm  // true (AND operation)

let isWeekend = false
let isHoliday = true
let dayOff = isWeekend || isHoliday  // true (OR operation)

let isWorking = true
let isFree = !isWorking  // false (NOT operation)
```

### 5. String

The `String` type represents text - a sequence of characters. Strings in Swift are powerful and feature-rich.

```swift
// String examples
let greeting = "Hello, Swift!"
let name = "Sarah"
let emptyString = ""

print(greeting)  // Output: Hello, Swift!

// Multi-line strings
let paragraph = """
Swift is a powerful and intuitive programming language.
It's designed to be safe, fast, and expressive.
Perfect for building amazing apps!
"""

print(paragraph)
```

#### String Operations

```swift
let firstName = "John"
let lastName = "Doe"

// String concatenation
let fullName = firstName + " " + lastName
print(fullName)  // Output: John Doe

// String interpolation (preferred method)
let message = "Hello, \(firstName) \(lastName)!"
print(message)  // Output: Hello, John Doe!

// String properties
let text = "Swift"
print(text.count)        // Output: 5 (number of characters)
print(text.isEmpty)      // Output: false
print(emptyString.isEmpty)  // Output: true

// String methods
let lowercase = "swift is awesome"
let uppercase = lowercase.uppercased()
print(uppercase)  // Output: SWIFT IS AWESOME

let mixed = "Hello World"
print(mixed.lowercased())  // Output: hello world
```

#### Character Type

Swift also has a `Character` type for single characters:

```swift
let letter: Character = "A"
let symbol: Character = "$"
let emoji: Character = "😊"

// Creating string from characters
let chars: [Character] = ["S", "w", "i", "f", "t"]
let word = String(chars)
print(word)  // Output: Swift
```

## Type Safety and Type Inference

Swift is a **type-safe** language, meaning it enforces type checking at compile time. This helps prevent errors before your code even runs.

### Type Safety

```swift
var message = "Hello"  // message is a String
message = "Goodbye"    // ✅ OK - still assigning a String

// message = 42        // ❌ Error! Cannot assign Int to String
```

This might seem restrictive, but it catches bugs early:

```swift
let age = 25
let nextAge = age + "1"  // ❌ Error! Cannot add String to Int
// This prevents accidental type mixing that could cause bugs
```

### Type Inference

Swift can automatically figure out the type of a variable or constant based on the value you assign to it. This is called **type inference**.

```swift
// Swift infers the types automatically
let number = 42              // Inferred as Int
let decimal = 3.14           // Inferred as Double
let text = "Hello"           // Inferred as String
let flag = true              // Inferred as Bool

// You can see the inferred type by option-clicking in Xcode
```

### Type Annotations

While type inference is convenient, you can explicitly specify types using **type annotations**:

```swift
// Explicit type annotations
let age: Int = 25
let price: Double = 19.99
let name: String = "Alice"
let isAvailable: Bool = true

// Sometimes type annotation is necessary
let temperature: Float = 98.6  // Without annotation, this would be Double
```

**When to use type annotations:**
1. When the initial value doesn't match the desired type
2. When you want to be explicit for code clarity
3. When declaring a variable without an initial value

```swift
// Variable without initial value (must have type annotation)
var username: String
username = "developer123"  // Assigned later

// Clarity over inference
let minTemperature: Double = 0  // Could be inferred as Int, but we want Double
```

## Type Conversion

Sometimes you need to convert values from one type to another. Swift doesn't perform implicit type conversions - you must be explicit.

### Converting Between Numeric Types

```swift
let integerValue = 42
let doubleValue = 3.14

// Cannot mix types directly
// let result = integerValue + doubleValue  // ❌ Error!

// Must convert explicitly
let result = Double(integerValue) + doubleValue
print(result)  // Output: 45.14

// Or convert the other way
let result2 = integerValue + Int(doubleValue)
print(result2)  // Output: 45 (truncates decimal)
```

### Integer to String Conversion

```swift
let number = 42
let numberString = String(number)
print("The answer is " + numberString)  // Output: The answer is 42

// Using string interpolation (preferred)
print("The answer is \(number)")  // Output: The answer is 42
```

### String to Integer Conversion

Converting from String to Int returns an **optional** because the conversion might fail:

```swift
let validNumber = "123"
let invalidNumber = "abc"

// These return optional Int (Int?)
let converted1 = Int(validNumber)    // Optional(123)
let converted2 = Int(invalidNumber)  // nil (conversion failed)

// Safe unwrapping
if let number = Int(validNumber) {
    print("Converted number: \(number)")  // Output: Converted number: 123
} else {
    print("Conversion failed")
}

if let number = Int(invalidNumber) {
    print("Converted number: \(number)")
} else {
    print("Conversion failed")  // Output: Conversion failed
}
```

### String to Double Conversion

```swift
let priceString = "19.99"
let invalidPrice = "nineteen dollars"

if let price = Double(priceString) {
    print("Price: $\(price)")  // Output: Price: $19.99
}

if let price = Double(invalidPrice) {
    print("Price: $\(price)")
} else {
    print("Invalid price format")  // Output: Invalid price format
}
```

### Boolean Conversion

```swift
// Converting Int to Bool isn't automatic in Swift
let zero = 0
let one = 1

// Must be explicit
let isZero = (zero == 0)     // true
let isOne = (one != 0)       // true

print("Zero is zero: \(isZero)")  // Output: Zero is zero: true
print("One is non-zero: \(isOne)") // Output: One is non-zero: true
```

## Tuples

Tuples group multiple values into a single compound value. The values in a tuple can be of any type and don't have to be the same type as each other.

### Basic Tuples

```swift
// Simple tuple
let httpError = (404, "Not Found")
print(httpError)  // Output: (404, "Not Found")

// Accessing tuple elements by index
print("Status code: \(httpError.0)")     // Output: Status code: 404
print("Description: \(httpError.1)")     // Output: Description: Not Found
```

### Named Tuple Elements

For better readability, you can name the elements in a tuple:

```swift
// Tuple with named elements
let httpResponse = (statusCode: 200, description: "OK")

// Access by name (much more readable)
print("Status: \(httpResponse.statusCode)")        // Output: Status: 200
print("Description: \(httpResponse.description)")  // Output: Description: OK
```

### Decomposing Tuples

You can break a tuple into individual constants or variables:

```swift
let person = (name: "Alice", age: 30, city: "New York")

// Decompose into separate constants
let (personName, personAge, personCity) = person
print("Name: \(personName)")    // Output: Name: Alice
print("Age: \(personAge)")      // Output: Age: 30
print("City: \(personCity)")    // Output: City: New York

// Ignore parts you don't need with underscore
let (name, _, city) = person
print("\(name) lives in \(city)")  // Output: Alice lives in New York
```

### Tuples with Different Types

```swift
// Tuple mixing different types
let product = (id: 101, name: "Laptop", price: 999.99, inStock: true)

print("Product #\(product.id)")         // Output: Product #101
print("Name: \(product.name)")          // Output: Name: Laptop
print("Price: $\(product.price)")       // Output: Price: $999.99
print("Available: \(product.inStock)")  // Output: Available: true
```

### Tuples as Return Values

Tuples are particularly useful for returning multiple values from functions:

```swift
func getMinMax(numbers: [Int]) -> (min: Int, max: Int) {
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

let values = [5, 2, 8, 1, 9, 3]
let result = getMinMax(numbers: values)

print("Minimum: \(result.min)")  // Output: Minimum: 1
print("Maximum: \(result.max)")  // Output: Maximum: 9
```

### Practical Tuple Examples

```swift
// Coordinate system
let point = (x: 10, y: 20)
print("Point is at (\(point.x), \(point.y))")  // Output: Point is at (10, 20)

// RGB color
let color = (red: 255, green: 100, blue: 50)
print("RGB: (\(color.red), \(color.green), \(color.blue))")

// User credentials
let credentials = (username: "john_doe", password: "secret123", isAdmin: false)

if credentials.isAdmin {
    print("Admin access granted to \(credentials.username)")
} else {
    print("User \(credentials.username) logged in")  // Output: User john_doe logged in
}
```

## Type Aliases

You can create alternative names for existing types using `typealias`. This is useful for making code more readable:

```swift
// Create a type alias
typealias AudioSample = UInt16

var maxAmplitude: AudioSample = 65535
print("Max amplitude: \(maxAmplitude)")

// More complex example
typealias Coordinate = (x: Int, y: Int)
typealias Distance = Double

let start: Coordinate = (x: 0, y: 0)
let end: Coordinate = (x: 3, y: 4)

// Calculate distance (Pythagorean theorem)
let distance: Distance = sqrt(pow(Double(end.x - start.x), 2) + pow(Double(end.y - start.y), 2))
print("Distance: \(distance)")  // Output: Distance: 5.0
```

## Checking Types

You can check the type of a value at runtime using type checking:

```swift
let mixedArray: [Any] = [42, "Hello", 3.14, true]

for item in mixedArray {
    if item is Int {
        print("\(item) is an Integer")
    } else if item is String {
        print("\(item) is a String")
    } else if item is Double {
        print("\(item) is a Double")
    } else if item is Bool {
        print("\(item) is a Boolean")
    }
}

// Output:
// 42 is an Integer
// Hello is a String
// 3.14 is a Double
// true is a Boolean
```

## Common Data Type Pitfalls and Best Practices

### ✅ Best Practices

1. **Use type inference when the type is obvious**
   ```swift
   let name = "Alice"        // Clear it's a String
   let count = 5             // Clear it's an Int
   ```

2. **Use type annotations when it adds clarity**
   ```swift
   let temperature: Double = 0   // Makes it clear we want Double, not Int
   let identifier: String        // Declaration without initialization
   ```

3. **Prefer Double over Float**
   ```swift
   let price = 19.99  // Double by default - preferred
   ```

4. **Use named tuples for better readability**
   ```swift
   let response = (code: 200, message: "OK")  // Better than (200, "OK")
   ```

### ❌ Common Mistakes

1. **Mixing types without conversion**
   ```swift
   let age = 25
   // let message = "Age: " + age  // ❌ Error!
   let message = "Age: \(age)"     // ✅ Correct
   ```

2. **Assuming automatic type conversion**
   ```swift
   let integer = 5
   let decimal = 2.5
   // let result = integer + decimal  // ❌ Error!
   let result = Double(integer) + decimal  // ✅ Correct
   ```

3. **Not handling optional conversions**
   ```swift
   let text = "123"
   // let number = Int(text)!  // ❌ Dangerous! Could crash
   if let number = Int(text) {  // ✅ Safe unwrapping
       print(number)
   }
   ```

## Practical Examples

### Example 1: Temperature Converter

```swift
func convertCelsiusToFahrenheit(celsius: Double) -> Double {
    return (celsius * 9.0/5.0) + 32.0
}

let celsiusTemp = 25.0
let fahrenheitTemp = convertCelsiusToFahrenheit(celsius: celsiusTemp)

print("\(celsiusTemp)°C is \(fahrenheitTemp)°F")
// Output: 25.0°C is 77.0°F
```

### Example 2: Shopping Cart Calculator

```swift
let itemName = "Laptop"
let itemPrice = 999.99
let quantity = 2
let taxRate = 0.08

let subtotal = itemPrice * Double(quantity)
let tax = subtotal * taxRate
let total = subtotal + tax

print("Item: \(itemName)")
print("Price: $\(itemPrice)")
print("Quantity: \(quantity)")
print("Subtotal: $\(subtotal)")
print("Tax: $\(tax)")
print("Total: $\(total)")

// Output:
// Item: Laptop
// Price: $999.99
// Quantity: 2
// Subtotal: $1999.98
// Tax: $159.9984
// Total: $2159.9784
```

### Example 3: User Profile

```swift
let userProfile = (
    username: "swift_developer",
    age: 28,
    isPremium: true,
    score: 95.5
)

print("=== User Profile ===")
print("Username: \(userProfile.username)")
print("Age: \(userProfile.age)")
print("Premium Member: \(userProfile.isPremium)")
print("Score: \(userProfile.score)")

// Check premium status
if userProfile.isPremium {
    print("Access granted to premium features!")
}

// Output:
// === User Profile ===
// Username: swift_developer
// Age: 28
// Premium Member: true
// Score: 95.5
// Access granted to premium features!
```

## Summary

In this chapter, you learned about:

- ✅ **Basic Data Types**: `Int`, `Double`, `Float`, `Bool`, and `String`
- ✅ **Type Safety**: Swift prevents type mismatches at compile time
- ✅ **Type Inference**: Swift automatically determines types when possible
- ✅ **Type Conversion**: Explicit conversion between different types
- ✅ **Tuples**: Grouping multiple values into compound values
- ✅ **Type Annotations**: Explicitly specifying types for clarity
- ✅ **Best Practices**: Writing clean, safe, and maintainable code

Understanding these fundamental data types is crucial as you continue your Swift journey. They form the building blocks for more complex data structures and applications.

## What's Next?

Now that you understand Swift's data types, you're ready to move on to:

**Topic 4: Operators**
- Arithmetic operations
- Comparison and logical operators
- Range operators
- And much more!

Keep practicing with different data types, and don't hesitate to experiment in Swift Playgrounds to solidify your understanding! 🚀

---

**Practice Exercise:**

Try creating a program that:
1. Stores information about a book (title, author, pages, price, is available)
2. Uses tuples to group related information
3. Performs type conversions (e.g., calculate discount price)
4. Prints a formatted summary

Happy coding! 💻
