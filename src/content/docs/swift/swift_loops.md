---
title: "Swift Loops - Repeating Actions Efficiently"
description: "Master Swift loops including for-in, while, and repeat-while loops with practical examples and loop control statements"
---

Welcome to Swift Loops! Loops are one of the most powerful features in programming—they allow you to repeat actions efficiently without writing the same code over and over. In this guide, we'll explore all the different types of loops in Swift and learn when to use each one.

## What Are Loops?

Loops are control flow structures that repeat a block of code multiple times. Instead of writing:

```swift
print("Hello 1")
print("Hello 2")
print("Hello 3")
print("Hello 4")
print("Hello 5")
```

You can write:

```swift
for number in 1...5 {
    print("Hello \(number)")
}
```

Much cleaner, right? Loops save you time, reduce errors, and make your code more maintainable.

## For-In Loops

The `for-in` loop is the most commonly used loop in Swift. It iterates over sequences like arrays, ranges, dictionaries, and strings.

### Basic For-In Loop with Ranges

```swift
// Loop from 1 to 5 (inclusive)
for number in 1...5 {
    print(number)
}
// Output: 1, 2, 3, 4, 5

// Loop from 1 to 4 (5 is excluded)
for number in 1..<5 {
    print(number)
}
// Output: 1, 2, 3, 4
```

### Counting Backwards

```swift
// Count down from 5 to 1
for number in (1...5).reversed() {
    print(number)
}
// Output: 5, 4, 3, 2, 1

// Countdown
for count in (1...10).reversed() {
    if count == 1 {
        print("🚀 Blast off!")
    } else {
        print(count)
    }
}
```

### Using Stride for Custom Steps

```swift
// Count by 2s
for number in stride(from: 0, to: 10, by: 2) {
    print(number)
}
// Output: 0, 2, 4, 6, 8

// Count by 5s from 0 to 50 (inclusive)
for number in stride(from: 0, through: 50, by: 5) {
    print(number)
}
// Output: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50

// Count backwards by 3s
for number in stride(from: 20, through: 0, by: -3) {
    print(number)
}
// Output: 20, 17, 14, 11, 8, 5, 2
```

### Looping Over Arrays

```swift
let fruits = ["Apple", "Banana", "Cherry", "Mango"]

// Simple iteration
for fruit in fruits {
    print("I like \(fruit)s")
}
// Output:
// I like Apples
// I like Bananas
// I like Cherries
// I like Mangos

// With index using enumerated()
for (index, fruit) in fruits.enumerated() {
    print("\(index + 1). \(fruit)")
}
// Output:
// 1. Apple
// 2. Banana
// 3. Cherry
// 4. Mango
```

### Looping Over Dictionaries

```swift
let studentGrades = [
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
]

// Loop over key-value pairs
for (student, grade) in studentGrades {
    print("\(student) scored \(grade)")
}
// Output (order may vary):
// Alice scored 95
// Bob scored 87
// Charlie scored 92

// Loop over keys only
for student in studentGrades.keys {
    print(student)
}

// Loop over values only
for grade in studentGrades.values {
    print("Grade: \(grade)")
}

// Sorted by keys
for (student, grade) in studentGrades.sorted(by: { $0.key < $1.key }) {
    print("\(student): \(grade)")
}
// Output (alphabetical):
// Alice: 95
// Bob: 87
// Charlie: 92
```

### Looping Over Strings

```swift
let message = "Hello"

// Loop over characters
for character in message {
    print(character)
}
// Output: H, e, l, l, o

// With index
for (index, character) in message.enumerated() {
    print("Character \(index): \(character)")
}
```

### Underscore for Unused Values

If you don't need the loop variable, use an underscore:

```swift
// Print "Hello" 5 times
for _ in 1...5 {
    print("Hello!")
}

// Generate random numbers without using the loop variable
for _ in 1...3 {
    let random = Int.random(in: 1...100)
    print("Random number: \(random)")
}
```

### Nested For Loops

```swift
// Multiplication table
for i in 1...5 {
    for j in 1...5 {
        print("\(i) × \(j) = \(i * j)")
    }
    print("---")
}

// Create a grid pattern
for row in 1...3 {
    for col in 1...4 {
        print("(\(row),\(col))", terminator: " ")
    }
    print()  // New line
}
// Output:
// (1,1) (1,2) (1,3) (1,4)
// (2,1) (2,2) (2,3) (2,4)
// (3,1) (3,2) (3,3) (3,4)
```

## While Loops

While loops continue executing as long as a condition is true. They're perfect when you don't know how many iterations you'll need in advance.

### Basic While Loop

```swift
var count = 1

while count <= 5 {
    print("Count: \(count)")
    count += 1
}
// Output: Count: 1, Count: 2, Count: 3, Count: 4, Count: 5
```

### While Loop with User Input Simulation

```swift
var attempts = 0
var password = ""
let correctPassword = "secret123"

while password != correctPassword && attempts < 3 {
    attempts += 1
    print("Attempt \(attempts): Enter password")
    // In real app, you'd get user input here
    password = attempts == 2 ? "secret123" : "wrong"
}

if password == correctPassword {
    print("✅ Access granted!")
} else {
    print("❌ Too many failed attempts")
}
```

### While Loop for Game Logic

```swift
var health = 100
var round = 0

while health > 0 {
    round += 1
    let damage = Int.random(in: 10...30)
    health -= damage
    
    print("Round \(round): Took \(damage) damage. Health: \(max(health, 0))")
    
    if health <= 0 {
        print("💀 Game Over!")
    }
}
```

### Infinite Loop with Break

```swift
var sum = 0
var number = 1

while true {
    sum += number
    number += 1
    
    if sum >= 100 {
        print("Sum reached \(sum)")
        break
    }
}
```

## Repeat-While Loops

Repeat-while loops are similar to while loops, but they check the condition AFTER executing the code block. This means they always execute at least once.

### Basic Repeat-While

```swift
var count = 1

repeat {
    print("Count: \(count)")
    count += 1
} while count <= 5
// Output: Count: 1, Count: 2, Count: 3, Count: 4, Count: 5
```

### Key Difference: Runs At Least Once

```swift
// While loop - may not run at all
var x = 10
while x < 5 {
    print("This will never print")
    x += 1
}
// No output

// Repeat-while - always runs at least once
var y = 10
repeat {
    print("This prints once: \(y)")
    y += 1
} while y < 5
// Output: This prints once: 10
```

### Menu System Example

```swift
var choice = 0
var menuActive = true

repeat {
    print("""
    
    --- Menu ---
    1. Start Game
    2. Settings
    3. Exit
    Choose an option:
    """)
    
    // Simulate user choice
    choice = Int.random(in: 1...3)
    print("Selected: \(choice)")
    
    switch choice {
    case 1:
        print("🎮 Starting game...")
    case 2:
        print("⚙️ Opening settings...")
    case 3:
        print("👋 Goodbye!")
        menuActive = false
    default:
        print("❌ Invalid choice")
    }
} while menuActive
```

### Input Validation

```swift
var age = 0

repeat {
    // Simulate getting age input
    age = Int.random(in: -5...120)
    print("Entered age: \(age)")
    
    if age < 0 || age > 120 {
        print("❌ Please enter a valid age (0-120)")
    }
} while age < 0 || age > 120

print("✅ Valid age: \(age)")
```

## Loop Control: Break and Continue

Break and continue give you fine control over loop execution.

### Break - Exit the Loop

The `break` statement immediately exits the loop:

```swift
// Find first even number
let numbers = [1, 3, 5, 8, 9, 10, 11]

for number in numbers {
    if number % 2 == 0 {
        print("Found first even number: \(number)")
        break
    }
}
// Output: Found first even number: 8

// Search for a name
let names = ["Alice", "Bob", "Charlie", "David"]
let searchName = "Charlie"

for name in names {
    if name == searchName {
        print("✅ Found \(searchName)!")
        break
    }
    print("Checking \(name)...")
}
// Output:
// Checking Alice...
// Checking Bob...
// ✅ Found Charlie!
```

### Continue - Skip to Next Iteration

The `continue` statement skips the rest of the current iteration and moves to the next one:

```swift
// Print only odd numbers
for number in 1...10 {
    if number % 2 == 0 {
        continue  // Skip even numbers
    }
    print(number)
}
// Output: 1, 3, 5, 7, 9

// Process valid items only
let scores = [85, -1, 92, 105, 78, -5, 88]

for score in scores {
    if score < 0 || score > 100 {
        print("Skipping invalid score: \(score)")
        continue
    }
    print("Valid score: \(score)")
}
// Output:
// Valid score: 85
// Skipping invalid score: -1
// Valid score: 92
// Skipping invalid score: 105
// Valid score: 78
// Skipping invalid score: -5
// Valid score: 88
```

### Break in Nested Loops

Break only exits the innermost loop:

```swift
// Find first match in 2D grid
let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

var found = false

for row in grid {
    for number in row {
        if number == 5 {
            print("Found 5!")
            found = true
            break  // Only breaks inner loop
        }
    }
    if found {
        break  // Break outer loop
    }
}
```

### Labeled Statements

Use labels to break out of outer loops:

```swift
outerLoop: for i in 1...3 {
    for j in 1...3 {
        if i == 2 && j == 2 {
            print("Breaking out of both loops at (\(i),\(j))")
            break outerLoop
        }
        print("(\(i),\(j))")
    }
}
// Output:
// (1,1)
// (1,2)
// (1,3)
// (2,1)
// Breaking out of both loops at (2,2)
```

## Practical Examples

### Example 1: Sum Calculator

```swift
let numbers = [5, 10, 15, 20, 25]
var sum = 0

for number in numbers {
    sum += number
}

print("Sum: \(sum)")  // Output: Sum: 75

// Calculate average
let average = Double(sum) / Double(numbers.count)
print("Average: \(average)")  // Output: Average: 15.0
```

### Example 2: Factorial Calculator

```swift
func factorial(of n: Int) -> Int {
    guard n >= 0 else { return 0 }
    
    var result = 1
    for i in 1...n {
        result *= i
    }
    return result
}

print("5! = \(factorial(of: 5))")  // Output: 5! = 120
print("10! = \(factorial(of: 10))")  // Output: 10! = 3628800
```

### Example 3: Fibonacci Sequence

```swift
func fibonacci(count: Int) -> [Int] {
    guard count > 0 else { return [] }
    
    var sequence = [0, 1]
    
    if count <= 2 {
        return Array(sequence.prefix(count))
    }
    
    for _ in 2..<count {
        let next = sequence[sequence.count - 1] + sequence[sequence.count - 2]
        sequence.append(next)
    }
    
    return sequence
}

print(fibonacci(count: 10))
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Example 4: Prime Number Checker

```swift
func isPrime(_ number: Int) -> Bool {
    guard number > 1 else { return false }
    guard number > 3 else { return true }
    
    if number % 2 == 0 || number % 3 == 0 {
        return false
    }
    
    var i = 5
    while i * i <= number {
        if number % i == 0 || number % (i + 2) == 0 {
            return false
        }
        i += 6
    }
    
    return true
}

// Find all primes up to 50
var primes: [Int] = []
for number in 2...50 {
    if isPrime(number) {
        primes.append(number)
    }
}

print("Primes up to 50: \(primes)")
// Output: Primes up to 50: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

### Example 5: Pattern Printing

```swift
// Right triangle
print("Right Triangle:")
for i in 1...5 {
    for _ in 1...i {
        print("*", terminator: "")
    }
    print()
}
// Output:
// *
// **
// ***
// ****
// *****

// Pyramid
print("\nPyramid:")
let height = 5
for i in 1...height {
    // Print spaces
    for _ in 1...(height - i) {
        print(" ", terminator: "")
    }
    // Print stars
    for _ in 1...(2 * i - 1) {
        print("*", terminator: "")
    }
    print()
}
// Output:
//     *
//    ***
//   *****
//  *******
// *********
```

### Example 6: Shopping Cart Total

```swift
struct Product {
    let name: String
    let price: Double
    let quantity: Int
}

let cart = [
    Product(name: "iPhone", price: 999.99, quantity: 1),
    Product(name: "AirPods", price: 179.99, quantity: 2),
    Product(name: "Case", price: 29.99, quantity: 1)
]

var total = 0.0

print("Shopping Cart:")
print("---")

for product in cart {
    let itemTotal = product.price * Double(product.quantity)
    total += itemTotal
    print("\(product.name) × \(product.quantity): $\(itemTotal)")
}

print("---")
print("Total: $\(total)")

// Output:
// Shopping Cart:
// ---
// iPhone × 1: $999.99
// AirPods × 2: $359.98
// Case × 1: $29.99
// ---
// Total: $1389.96
```

### Example 7: Password Strength Checker

```swift
func checkPasswordStrength(_ password: String) -> String {
    var score = 0
    
    // Check length
    if password.count >= 8 {
        score += 1
    }
    if password.count >= 12 {
        score += 1
    }
    
    // Check for different character types
    var hasUpper = false
    var hasLower = false
    var hasDigit = false
    var hasSpecial = false
    
    for character in password {
        if character.isUppercase { hasUpper = true }
        if character.isLowercase { hasLower = true }
        if character.isNumber { hasDigit = true }
        if !character.isLetter && !character.isNumber { hasSpecial = true }
    }
    
    if hasUpper { score += 1 }
    if hasLower { score += 1 }
    if hasDigit { score += 1 }
    if hasSpecial { score += 1 }
    
    switch score {
    case 0...2: return "❌ Weak"
    case 3...4: return "⚠️ Medium"
    case 5...6: return "✅ Strong"
    default: return "🔒 Very Strong"
    }
}

print(checkPasswordStrength("abc"))  // ❌ Weak
print(checkPasswordStrength("Password123"))  // ⚠️ Medium
print(checkPasswordStrength("P@ssw0rd123!"))  // 🔒 Very Strong
```

### Example 8: Array Search and Filter

```swift
let numbers = [3, 7, 12, 5, 18, 9, 14, 22, 6]

// Find all even numbers
var evenNumbers: [Int] = []
for number in numbers {
    if number % 2 == 0 {
        evenNumbers.append(number)
    }
}
print("Even numbers: \(evenNumbers)")  // [12, 18, 14, 22, 6]

// Find numbers greater than 10
var largeNumbers: [Int] = []
for number in numbers {
    if number > 10 {
        largeNumbers.append(number)
    }
}
print("Numbers > 10: \(largeNumbers)")  // [12, 18, 14, 22]

// Count numbers in range
var count = 0
for number in numbers {
    if number >= 5 && number <= 15 {
        count += 1
    }
}
print("Numbers between 5-15: \(count)")  // 5
```

## When to Use Each Loop Type

### Use For-In When:
✅ You know the number of iterations  
✅ Iterating over a collection (array, dictionary, range)  
✅ You need the index or value from the collection  
✅ Most common loop type - use by default  

**Examples**: Processing array items, counting in ranges, iterating dictionaries

### Use While When:
✅ The number of iterations is unknown  
✅ You're waiting for a condition to be met  
✅ Condition needs to be checked before first iteration  
✅ Implementing game loops or event loops  

**Examples**: User input validation, game loops, waiting for events

### Use Repeat-While When:
✅ Code must execute at least once  
✅ Validation happens after the action  
✅ Menu systems and prompts  

**Examples**: Menu systems, input prompts, retry logic

## Best Practices

### 1. Choose the Right Loop Type

```swift
// ✅ Use for-in for known iterations
for i in 1...10 {
    print(i)
}

// ❌ Don't use while for simple counting
var i = 1
while i <= 10 {
    print(i)
    i += 1
}
```

### 2. Use Meaningful Variable Names

```swift
// ❌ Poor naming
for i in names {
    print(i)
}

// ✅ Clear naming
for name in names {
    print(name)
}
```

### 3. Avoid Infinite Loops

```swift
// ❌ Dangerous - infinite loop
// while true {
//     print("This never stops!")
// }

// ✅ Safe - has exit condition
var count = 0
while count < 10 {
    print(count)
    count += 1
}
```

### 4. Use Underscore for Unused Variables

```swift
// ❌ Unused variable warning
for index in 1...5 {
    print("Hello")
}

// ✅ Clean with underscore
for _ in 1...5 {
    print("Hello")
}
```

### 5. Keep Loop Bodies Simple

```swift
// ❌ Complex loop body
for number in numbers {
    if number > 0 {
        if number % 2 == 0 {
            if number < 100 {
                // Do something
            }
        }
    }
}

// ✅ Use guard or continue for early exit
for number in numbers {
    guard number > 0, number % 2 == 0, number < 100 else {
        continue
    }
    // Do something
}
```

## Common Mistakes to Avoid

### 1. Modifying Collection While Iterating

```swift
var numbers = [1, 2, 3, 4, 5]

// ❌ Don't modify while iterating
// for number in numbers {
//     numbers.append(number * 2)  // Crash or unexpected behavior!
// }

// ✅ Create a new array
var doubled: [Int] = []
for number in numbers {
    doubled.append(number * 2)
}
```

### 2. Off-by-One Errors

```swift
let items = ["A", "B", "C"]

// ❌ Index out of bounds
// for i in 0...items.count {
//     print(items[i])  // Crash on last iteration!
// }

// ✅ Correct range
for i in 0..<items.count {
    print(items[i])
}

// ✅ Better - use for-in directly
for item in items {
    print(item)
}
```

### 3. Forgetting to Update Loop Condition

```swift
// ❌ Infinite loop - forgot to increment
// var i = 0
// while i < 10 {
//     print(i)
//     // Forgot: i += 1
// }

// ✅ Proper update
var i = 0
while i < 10 {
    print(i)
    i += 1
}
```

### 4. Unnecessary Nested Loops

```swift
let numbers = [1, 2, 3, 4, 5]

// ❌ Inefficient O(n²)
var doubles: [Int] = []
for number in numbers {
    for _ in 1...1 {
        doubles.append(number * 2)
    }
}

// ✅ Simple O(n)
var betterDoubles: [Int] = []
for number in numbers {
    betterDoubles.append(number * 2)
}
```

## Performance Tips

### 1. Use Ranges Instead of Arrays When Possible

```swift
// ⚠️ Creates an array in memory
let numbers = Array(1...1000000)
for number in numbers {
    // Process
}

// ✅ Uses lazy evaluation
for number in 1...1000000 {
    // Process
}
```

### 2. Break Early When Found

```swift
let numbers = [1, 3, 5, 7, 9, 2, 4, 6, 8]

// ⚠️ Continues even after finding
var foundEven = false
for number in numbers {
    if number % 2 == 0 {
        foundEven = true
    }
}

// ✅ Exits immediately
for number in numbers {
    if number % 2 == 0 {
        print("Found even: \(number)")
        break
    }
}
```

## Summary

Loops are essential for efficient programming. Here's what we covered:

**For-In Loops** 🔄
- Most common loop type
- Iterate over ranges, arrays, dictionaries
- Use enumerated() for indices
- Use stride() for custom steps

**While Loops** ⏳
- Condition checked before execution
- Unknown number of iterations
- Great for event-driven logic

**Repeat-While Loops** 🔁
- Executes at least once
- Condition checked after execution
- Perfect for menus and input validation

**Loop Control** 🎮
- **break**: Exit the loop immediately
- **continue**: Skip to next iteration
- Use labels for nested loops

## Next Steps

Congratulations! You've mastered loops in Swift! 🎉

**Tomorrow, we'll explore:**
- Topic 9: Functions
- Function declaration and calling
- Parameters and return values
- Argument labels
- Variadic parameters

## Practice Exercises

Try these to reinforce your learning:

1. Write a loop that prints the multiplication table for any number
2. Create a function that finds the largest number in an array using a loop
3. Build a guessing game using while loops
4. Generate a pyramid pattern using nested for loops
5. Write a loop that reverses a string manually
6. Calculate the sum of all even numbers from 1 to 100
7. Create a function that checks if a number is prime using loops

---

**Master loops and you'll write efficient, powerful code!** 🚀

*Remember: Choose the right loop for the job, and your code will be both clean and performant.*
