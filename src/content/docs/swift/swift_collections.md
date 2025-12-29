---
title: "Swift Collections - Arrays, Dictionaries, and Sets"
description: "Master Swift collections including arrays, dictionaries, and sets with comprehensive examples and best practices"
---

Welcome to the world of Swift collections! Collections are one of the most fundamental and powerful features in Swift. They allow you to store, organize, and manipulate groups of related values efficiently. In this guide, we'll explore the three main collection types: Arrays, Dictionaries, and Sets.

## What Are Collections?

Collections in Swift are data structures that hold multiple values of the same type. Think of them as containers that help you organize and work with groups of related data. Swift provides three primary collection types:

- **Arrays** - Ordered collections of values
- **Dictionaries** - Unordered collections of key-value pairs
- **Sets** - Unordered collections of unique values

All three collection types are **generic**, meaning they can store any type of value, but once declared, they can only contain values of that specific type. This type safety helps prevent errors and makes your code more reliable.

## Arrays - Ordered Collections

Arrays are the most commonly used collection type. They store values in a specific order and allow duplicate values. Each element in an array has an integer index starting from 0.

### Creating Arrays

There are several ways to create arrays in Swift:

```swift
// Empty array
var emptyArray: [Int] = []
var anotherEmpty = [String]()

// Array with initial values
var numbers = [1, 2, 3, 4, 5]
var fruits = ["Apple", "Banana", "Cherry"]

// Array with repeated values
var fiveZeros = Array(repeating: 0, count: 5)
// Result: [0, 0, 0, 0, 0]

// Creating array with specific type annotation
var scores: [Double] = [98.5, 87.3, 92.0]
```

### Accessing Array Elements

```swift
var languages = ["Swift", "Python", "JavaScript", "Kotlin"]

// Access by index (remember: indices start at 0!)
let firstLanguage = languages[0]  // "Swift"
let thirdLanguage = languages[2]  // "JavaScript"

// Access first and last elements safely
let first = languages.first  // Optional: "Swift"
let last = languages.last    // Optional: "Kotlin"

// Get array count
print("We have \(languages.count) languages")  // 4

// Check if array is empty
if languages.isEmpty {
    print("No languages")
} else {
    print("We have languages!")
}
```

### Modifying Arrays

Arrays created with `var` are mutable, meaning you can change them:

```swift
var colors = ["Red", "Green", "Blue"]

// Append single element
colors.append("Yellow")
// colors is now ["Red", "Green", "Blue", "Yellow"]

// Append multiple elements
colors += ["Purple", "Orange"]
// colors is now ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"]

// Insert at specific index
colors.insert("Pink", at: 1)
// colors is now ["Red", "Pink", "Green", "Blue", "Yellow", "Purple", "Orange"]

// Remove elements
colors.remove(at: 2)  // Removes "Green"
colors.removeLast()   // Removes "Orange"
colors.removeFirst()  // Removes "Red"

// Replace element
colors[0] = "Crimson"

// Remove all elements
colors.removeAll()
```

### Iterating Over Arrays

```swift
let cities = ["Tokyo", "Paris", "New York", "London", "Dubai"]

// Simple iteration
for city in cities {
    print("City: \(city)")
}

// Iteration with indices
for (index, city) in cities.enumerated() {
    print("\(index + 1). \(city)")
}

// Output:
// 1. Tokyo
// 2. Paris
// 3. New York
// 4. London
// 5. Dubai
```

### Useful Array Methods

```swift
var numbers = [5, 2, 8, 1, 9, 3]

// Sorting
let sorted = numbers.sorted()                    // [1, 2, 3, 5, 8, 9]
let descending = numbers.sorted(by: >)          // [9, 8, 5, 3, 2, 1]
numbers.sort()  // Sorts in place

// Reversing
let reversed = numbers.reversed()

// Contains
let hasEight = numbers.contains(8)  // true

// Filter (get elements matching condition)
let evenNumbers = numbers.filter { $0 % 2 == 0 }  // [2, 8]

// Map (transform each element)
let doubled = numbers.map { $0 * 2 }  // [10, 4, 16, 2, 18, 6]

// Reduce (combine all elements)
let sum = numbers.reduce(0, +)  // 28

// First element matching condition
let firstLarge = numbers.first(where: { $0 > 5 })  // Optional: 8
```

### Array Slicing

```swift
let alphabet = ["A", "B", "C", "D", "E", "F"]

// Get a range of elements
let slice = alphabet[1...3]  // ["B", "C", "D"]
let prefix = alphabet[..<2]  // ["A", "B"]

// Convert slice back to array
let newArray = Array(slice)
```

## Dictionaries - Key-Value Pairs

Dictionaries store unordered collections of key-value associations. Each value is associated with a unique key, which acts as an identifier for that value.

### Creating Dictionaries

```swift
// Empty dictionary
var emptyDict: [String: Int] = [:]
var anotherEmpty = [String: String]()

// Dictionary with initial values
var countryCodes = [
    "US": "United States",
    "UK": "United Kingdom",
    "JP": "Japan",
    "FR": "France"
]

// Dictionary with type annotation
var studentGrades: [String: Double] = [
    "Alice": 95.5,
    "Bob": 87.3,
    "Charlie": 92.0
]
```

### Accessing Dictionary Values

```swift
var phoneBook = [
    "Alice": "555-1234",
    "Bob": "555-5678",
    "Charlie": "555-9012"
]

// Access by key (returns optional)
let aliceNumber = phoneBook["Alice"]  // Optional: "555-1234"
let davidNumber = phoneBook["David"]  // nil

// Safe access with default value
let defaultNumber = phoneBook["David", default: "No number"]

// Get count
print("We have \(phoneBook.count) contacts")

// Check if empty
if phoneBook.isEmpty {
    print("No contacts")
}
```

### Modifying Dictionaries

```swift
var scores = ["Player1": 100, "Player2": 150]

// Add or update value
scores["Player3"] = 200
scores["Player1"] = 120  // Updates existing value

// Update and return old value
let oldScore = scores.updateValue(180, forKey: "Player2")
// oldScore is Optional: 150

// Remove value
scores["Player1"] = nil
let removed = scores.removeValue(forKey: "Player2")

// Remove all
scores.removeAll()
```

### Iterating Over Dictionaries

```swift
let prices = [
    "Apple": 1.50,
    "Banana": 0.75,
    "Orange": 1.25,
    "Mango": 2.00
]

// Iterate over key-value pairs
for (fruit, price) in prices {
    print("\(fruit): $\(price)")
}

// Iterate over keys only
for fruit in prices.keys {
    print(fruit)
}

// Iterate over values only
for price in prices.values {
    print("$\(price)")
}

// Convert keys and values to arrays
let fruitsArray = Array(prices.keys)
let pricesArray = Array(prices.values)
```

### Useful Dictionary Methods

```swift
var inventory = [
    "Apples": 50,
    "Bananas": 30,
    "Oranges": 25
]

// Check if key exists
if inventory.keys.contains("Apples") {
    print("We have apples!")
}

// Filter dictionary
let lowStock = inventory.filter { $0.value < 40 }
// ["Bananas": 30, "Oranges": 25]

// Map values
let doubled = inventory.mapValues { $0 * 2 }
// ["Apples": 100, "Bananas": 60, "Oranges": 50]

// Merge dictionaries
var moreInventory = ["Grapes": 40, "Pears": 35]
inventory.merge(moreInventory) { current, new in current }
```

## Sets - Unique Values

Sets store unordered collections of unique values. If you try to add a duplicate value, it will be ignored. Sets are useful when order doesn't matter and you need to ensure uniqueness.

### Creating Sets

```swift
// Empty set
var emptySet: Set<String> = []
var anotherEmpty = Set<Int>()

// Set with initial values
var favoriteNumbers: Set = [7, 14, 21, 28]
var uniqueLetters: Set<Character> = ["A", "B", "C"]

// Creating set from array (removes duplicates)
let numbersArray = [1, 2, 2, 3, 3, 3, 4]
let numbersSet = Set(numbersArray)  // {1, 2, 3, 4}
```

### Basic Set Operations

```swift
var fruits: Set = ["Apple", "Banana", "Cherry"]

// Insert element
fruits.insert("Mango")

// Remove element
fruits.remove("Banana")
let removed = fruits.remove("Orange")  // nil (doesn't exist)

// Check if contains
let hasApple = fruits.contains("Apple")  // true

// Get count
print("We have \(fruits.count) fruits")

// Remove all
fruits.removeAll()
```

### Set Mathematical Operations

This is where Sets really shine! You can perform mathematical set operations:

```swift
let setA: Set = [1, 2, 3, 4, 5]
let setB: Set = [4, 5, 6, 7, 8]

// Union (all elements from both sets)
let union = setA.union(setB)
// {1, 2, 3, 4, 5, 6, 7, 8}

// Intersection (elements in both sets)
let intersection = setA.intersection(setB)
// {4, 5}

// Subtraction (elements in first set but not second)
let subtraction = setA.subtracting(setB)
// {1, 2, 3}

// Symmetric difference (elements in either set, but not both)
let symmetricDiff = setA.symmetricDifference(setB)
// {1, 2, 3, 6, 7, 8}
```

### Set Relationships

```swift
let mammals: Set = ["Dog", "Cat", "Elephant", "Lion"]
let pets: Set = ["Dog", "Cat", "Fish"]
let wildAnimals: Set = ["Elephant", "Lion", "Tiger"]

// Check if subset
let isPetsSubset = pets.isSubset(of: mammals)  // false (Fish is not in mammals)

// Check if superset
let isMammalsSuperset = mammals.isSuperset(of: pets)  // false

// Check if disjoint (no common elements)
let areDisjoint = pets.isDisjoint(with: wildAnimals)  // true

// Exact equality
let areEqual = mammals == pets  // false
```

### Iterating Over Sets

```swift
let colors: Set = ["Red", "Green", "Blue", "Yellow"]

// Simple iteration (order is not guaranteed!)
for color in colors {
    print(color)
}

// Sorted iteration
for color in colors.sorted() {
    print(color)  // Alphabetical order
}
```

## Choosing the Right Collection Type

Here's a quick guide to help you choose:

### Use Arrays When:
✅ Order matters  
✅ You need to access elements by index  
✅ Duplicate values are allowed  
✅ You need to maintain insertion order  

**Example**: List of tasks, playlist of songs, transaction history

### Use Dictionaries When:
✅ You need to look up values by a key  
✅ Order doesn't matter  
✅ Each key must be unique  
✅ You need fast lookups  

**Example**: User profiles, settings, translations, cache

### Use Sets When:
✅ Order doesn't matter  
✅ Each value must be unique  
✅ You need to perform set operations (union, intersection)  
✅ You need to check membership quickly  

**Example**: Unique tags, attendee list, permissions

## Common Collection Operations

### Checking if Empty

```swift
let array = [1, 2, 3]
let dict = ["key": "value"]
let set: Set = [1, 2, 3]

// All collections support isEmpty
if array.isEmpty {
    print("Array is empty")
}

// Better than checking count
if dict.count == 0 {  // ❌ Less efficient
    print("Empty")
}

if dict.isEmpty {  // ✅ Better
    print("Empty")
}
```

### Converting Between Collections

```swift
// Array to Set (removes duplicates)
let arrayWithDupes = [1, 2, 2, 3, 3, 3]
let uniqueSet = Set(arrayWithDupes)  // {1, 2, 3}

// Set to Array
let setToArray = Array(uniqueSet)  // [1, 2, 3] (order not guaranteed)

// Dictionary keys/values to Array
let dict = ["a": 1, "b": 2, "c": 3]
let keys = Array(dict.keys)      // ["a", "b", "c"]
let values = Array(dict.values)  // [1, 2, 3]
```

## Practical Examples

### Example 1: Shopping Cart

```swift
struct CartItem {
    let name: String
    let price: Double
}

var cart: [CartItem] = []

// Add items
cart.append(CartItem(name: "iPhone", price: 999.99))
cart.append(CartItem(name: "AirPods", price: 179.99))
cart.append(CartItem(name: "MacBook", price: 1499.99))

// Calculate total
let total = cart.reduce(0.0) { $0 + $1.price }
print("Total: $\(total)")  // $2679.97

// Find expensive items
let expensive = cart.filter { $0.price > 500 }
print("Expensive items: \(expensive.count)")
```

### Example 2: Student Grade Book

```swift
var gradeBook: [String: [Double]] = [:]

// Add student grades
gradeBook["Alice"] = [95.0, 87.5, 92.0, 88.5]
gradeBook["Bob"] = [78.0, 85.5, 90.0, 82.5]
gradeBook["Charlie"] = [92.0, 94.5, 89.0, 93.0]

// Calculate averages
for (student, grades) in gradeBook {
    let average = grades.reduce(0.0, +) / Double(grades.count)
    print("\(student)'s average: \(String(format: "%.2f", average))")
}

// Output:
// Alice's average: 90.75
// Bob's average: 84.00
// Charlie's average: 92.13
```

### Example 3: Social Media Tags

```swift
var post1Tags: Set = ["swift", "ios", "programming", "apple"]
var post2Tags: Set = ["swift", "android", "kotlin", "programming"]

// Common tags between posts
let commonTags = post1Tags.intersection(post2Tags)
print("Common tags: \(commonTags)")  // {"swift", "programming"}

// All unique tags
let allTags = post1Tags.union(post2Tags)
print("All tags: \(allTags)")

// Platform-specific tags
let iosOnlyTags = post1Tags.subtracting(post2Tags)
print("iOS-only tags: \(iosOnlyTags)")  // {"ios", "apple"}
```

### Example 4: Contact Manager

```swift
struct Contact {
    let name: String
    let phone: String
    let email: String
}

var contacts: [String: Contact] = [:]

// Add contacts
contacts["alice"] = Contact(name: "Alice Smith", phone: "555-1234", email: "alice@email.com")
contacts["bob"] = Contact(name: "Bob Jones", phone: "555-5678", email: "bob@email.com")

// Search by key
if let contact = contacts["alice"] {
    print("Found: \(contact.name)")
    print("Phone: \(contact.phone)")
}

// Get all contact names
let names = contacts.values.map { $0.name }
print("All contacts: \(names)")
```

## Immutable vs Mutable Collections

```swift
// Mutable (can be changed) - use var
var mutableArray = [1, 2, 3]
mutableArray.append(4)  // ✅ Works

var mutableDict = ["key": "value"]
mutableDict["key2"] = "value2"  // ✅ Works

// Immutable (cannot be changed) - use let
let immutableArray = [1, 2, 3]
// immutableArray.append(4)  // ❌ Error!

let immutableDict = ["key": "value"]
// immutableDict["key2"] = "value2"  // ❌ Error!
```

**Best Practice**: Use `let` by default for better performance and safety. Only use `var` when you know the collection will change.

## Performance Considerations

### Array Performance
- ✅ Fast access by index: O(1)
- ✅ Fast append at end: O(1) amortized
- ⚠️ Slow insert/remove at beginning: O(n)
- ⚠️ Slow search for value: O(n)

### Dictionary Performance
- ✅ Fast access by key: O(1) average
- ✅ Fast insert/update: O(1) average
- ✅ Fast remove: O(1) average
- ⚠️ Unordered (no index access)

### Set Performance
- ✅ Fast check if contains: O(1) average
- ✅ Fast insert: O(1) average
- ✅ Fast remove: O(1) average
- ✅ Fast set operations: generally efficient
- ⚠️ Unordered (no index access)

## Common Mistakes to Avoid

### 1. Index Out of Bounds

```swift
let numbers = [1, 2, 3]

// ❌ Dangerous
// let value = numbers[10]  // Crash!

// ✅ Safe
if numbers.indices.contains(10) {
    let value = numbers[10]
}

// ✅ Better - use safe methods
let value = numbers.first
let lastValue = numbers.last
```

### 2. Modifying Dictionary While Iterating

```swift
var scores = ["A": 100, "B": 80, "C": 90]

// ❌ Don't modify while iterating
// for (key, value) in scores {
//     if value < 85 {
//         scores.removeValue(forKey: key)  // Crash!
//     }
// }

// ✅ Create a list of keys to remove first
let keysToRemove = scores.filter { $0.value < 85 }.map { $0.key }
for key in keysToRemove {
    scores.removeValue(forKey: key)
}
```

### 3. Forgetting That Sets Are Unordered

```swift
let numbers: Set = [1, 2, 3, 4, 5]

// ❌ Wrong assumption - order is not guaranteed
for number in numbers {
    // Don't assume this will be in order!
}

// ✅ If you need order, sort it
for number in numbers.sorted() {
    print(number)  // Now in order
}
```

## Summary

Collections are essential tools in Swift programming. Here's what we covered:

**Arrays** 📋
- Ordered collections that allow duplicates
- Access elements by index
- Perfect for lists and sequences

**Dictionaries** 🗂️
- Key-value pairs for fast lookups
- Unordered but efficient
- Ideal for mappings and associations

**Sets** 🎯
- Unique, unordered values
- Mathematical operations
- Great for uniqueness and membership testing

## Next Steps

Now that you understand collections, you're ready to move forward! 

**Tomorrow, we'll explore:**
- Topic 7: Control Flow
- If-else statements
- Switch statements
- Guard statements
- Ternary conditional operator

## Practice Exercises

Try these to reinforce your learning:

1. Create an array of your favorite movies and sort them alphabetically
2. Build a dictionary that maps country names to their capitals
3. Use sets to find common friends between two people
4. Write a function that removes duplicates from an array using a Set
5. Create a shopping cart that uses a dictionary to track items and quantities

---

**Master collections and you've mastered one of the core building blocks of Swift!** 🎉

*Remember: Practice is key. Try creating different collections and experimenting with various methods to solidify your understanding.*
