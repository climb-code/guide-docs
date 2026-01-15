---
title: "Swift Advanced Operators - Custom and Overloaded Operators"
description: "Master Swift advanced operators including operator overloading, custom operators, precedence, and associativity with practical examples"
---

Welcome to Swift Advanced Operators! Beyond the basic operators, Swift allows you to define custom operators and overload existing ones to work with your custom types. This powerful feature lets you write expressive, elegant code that feels natural. In this guide, we'll explore how to create and use advanced operators effectively.

## What are Advanced Operators?

Advanced operators let you:
- **Overload** existing operators for custom types
- **Create** entirely new custom operators
- **Define** precedence and associativity
- **Write** expressive, mathematical code

**Why Use Advanced Operators?**
- ✅ **Expressiveness** - Natural, readable syntax
- ✅ **Mathematics** - Elegant mathematical operations
- ✅ **DSLs** - Domain-specific languages
- ✅ **Convenience** - Intuitive APIs

**Operator Types:**
- Prefix (`-x`)
- Infix (`x + y`)
- Postfix (`x++`)

## Operator Overloading

Override existing operators to work with your custom types.

### Basic Arithmetic Operators

```swift
struct Vector2D {
    var x: Double
    var y: Double
}

// Addition operator
extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}

let vector1 = Vector2D(x: 3.0, y: 1.0)
let vector2 = Vector2D(x: 2.0, y: 4.0)
let sum = vector1 + vector2
print("Sum: (\(sum.x), \(sum.y))")  // Sum: (5.0, 5.0)

// Subtraction operator
extension Vector2D {
    static func - (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x - right.x, y: left.y - right.y)
    }
}

let difference = vector2 - vector1
print("Difference: (\(difference.x), \(difference.y))")  // Difference: (-1.0, 3.0)

// Multiplication by scalar
extension Vector2D {
    static func * (vector: Vector2D, scalar: Double) -> Vector2D {
        return Vector2D(x: vector.x * scalar, y: vector.y * scalar)
    }
}

let scaled = vector1 * 3.0
print("Scaled: (\(scaled.x), \(scaled.y))")  // Scaled: (9.0, 3.0)
```

### Comparison Operators

```swift
extension Vector2D: Equatable {
    static func == (left: Vector2D, right: Vector2D) -> Bool {
        return left.x == right.x && left.y == right.y
    }
}

let v1 = Vector2D(x: 1.0, y: 2.0)
let v2 = Vector2D(x: 1.0, y: 2.0)
let v3 = Vector2D(x: 3.0, y: 4.0)

print(v1 == v2)  // true
print(v1 == v3)  // false

// Not equal is automatically provided
print(v1 != v3)  // true
```

### Prefix and Postfix Operators

```swift
extension Vector2D {
    // Prefix - (negation)
    static prefix func - (vector: Vector2D) -> Vector2D {
        return Vector2D(x: -vector.x, y: -vector.y)
    }
}

let vector = Vector2D(x: 3.0, y: -4.0)
let negated = -vector
print("Negated: (\(negated.x), \(negated.y))")  // Negated: (-3.0, 4.0)

// Prefix ++ (increment)
extension Vector2D {
    static prefix func ++ (vector: inout Vector2D) -> Vector2D {
        vector.x += 1
        vector.y += 1
        return vector
    }
}

var mutableVector = Vector2D(x: 1.0, y: 2.0)
let incremented = ++mutableVector
print("Incremented: (\(incremented.x), \(incremented.y))")  // (2.0, 3.0)
```

### Compound Assignment Operators

```swift
extension Vector2D {
    static func += (left: inout Vector2D, right: Vector2D) {
        left = left + right
    }
    
    static func -= (left: inout Vector2D, right: Vector2D) {
        left = left - right
    }
    
    static func *= (left: inout Vector2D, scalar: Double) {
        left = left * scalar
    }
}

var vector = Vector2D(x: 1.0, y: 2.0)
vector += Vector2D(x: 3.0, y: 4.0)
print("After +=: (\(vector.x), \(vector.y))")  // (4.0, 6.0)

vector *= 2.0
print("After *=: (\(vector.x), \(vector.y))")  // (8.0, 12.0)
```

## Custom Operators

Create entirely new operators with custom symbols.

### Declaring Custom Operators

```swift
// Infix operator for dot product
infix operator •: MultiplicationPrecedence

extension Vector2D {
    static func • (left: Vector2D, right: Vector2D) -> Double {
        return left.x * right.x + left.y * right.y
    }
}

let v1 = Vector2D(x: 3.0, y: 4.0)
let v2 = Vector2D(x: 2.0, y: 1.0)
let dotProduct = v1 • v2
print("Dot product: \(dotProduct)")  // 10.0

// Cross product operator
infix operator ×: MultiplicationPrecedence

extension Vector2D {
    static func × (left: Vector2D, right: Vector2D) -> Double {
        return left.x * right.y - left.y * right.x
    }
}

let crossProduct = v1 × v2
print("Cross product: \(crossProduct)")  // -5.0
```

### Power Operator

```swift
infix operator **: MultiplicationPrecedence

extension Int {
    static func ** (base: Int, power: Int) -> Int {
        return Int(pow(Double(base), Double(power)))
    }
}

extension Double {
    static func ** (base: Double, power: Double) -> Double {
        return pow(base, power)
    }
}

let result1 = 2 ** 3
print("2^3 = \(result1)")  // 8

let result2 = 2.0 ** 0.5
print("2^0.5 = \(result2)")  // 1.414...
```

### Range Operator

```swift
infix operator ..<>: RangeFormationPrecedence

extension Int {
    static func ..<> (start: Int, end: Int) -> [Int] {
        return Array(start..<end)
    }
}

let range = 1 ..<> 5
print(range)  // [1, 2, 3, 4]
```

## Precedence and Associativity

Control how operators group and evaluate.

### Precedence Groups

```swift
precedencegroup ExponentiationPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator ^^: ExponentiationPrecedence

extension Double {
    static func ^^ (base: Double, exponent: Double) -> Double {
        return pow(base, exponent)
    }
}

// Right associative: evaluates 2 ^^ (3 ^^ 2)
let result = 2.0 ^^ 3.0 ^^ 2.0
print(result)  // 512.0 (2^9, not 8^2)
```

### Custom Precedence Example

```swift
precedencegroup ConditionalPrecedence {
    lowerThan: NilCoalescingPrecedence
    associativity: right
}

infix operator ??: ConditionalPrecedence

func ?? <T>(condition: Bool, values: (T, T)) -> T {
    return condition ? values.0 : values.1
}

let value = true ?? ("yes", "no")
print(value)  // "yes"
```

## Practical Examples

### Example 1: Matrix Operations

```swift
struct Matrix {
    var rows: Int
    var columns: Int
    var grid: [Double]
    
    init(rows: Int, columns: Int, defaultValue: Double = 0.0) {
        self.rows = rows
        self.columns = columns
        self.grid = Array(repeating: defaultValue, count: rows * columns)
    }
    
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column))
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column))
            grid[(row * columns) + column] = newValue
        }
    }
}

// Matrix addition
extension Matrix {
    static func + (left: Matrix, right: Matrix) -> Matrix {
        guard left.rows == right.rows && left.columns == right.columns else {
            fatalError("Matrix dimensions must match")
        }
        
        var result = Matrix(rows: left.rows, columns: left.columns)
        for i in 0..<left.rows {
            for j in 0..<left.columns {
                result[i, j] = left[i, j] + right[i, j]
            }
        }
        return result
    }
}

// Matrix multiplication
extension Matrix {
    static func * (left: Matrix, right: Matrix) -> Matrix {
        guard left.columns == right.rows else {
            fatalError("Cannot multiply: left.columns must equal right.rows")
        }
        
        var result = Matrix(rows: left.rows, columns: right.columns)
        for i in 0..<left.rows {
            for j in 0..<right.columns {
                var sum = 0.0
                for k in 0..<left.columns {
                    sum += left[i, k] * right[k, j]
                }
                result[i, j] = sum
            }
        }
        return result
    }
}

var matrix1 = Matrix(rows: 2, columns: 2)
matrix1[0, 0] = 1
matrix1[0, 1] = 2
matrix1[1, 0] = 3
matrix1[1, 1] = 4

var matrix2 = Matrix(rows: 2, columns: 2)
matrix2[0, 0] = 2
matrix2[0, 1] = 0
matrix2[1, 0] = 1
matrix2[1, 1] = 2

let sum = matrix1 + matrix2
print("Sum[0,0]: \(sum[0, 0])")  // 3

let product = matrix1 * matrix2
print("Product[0,0]: \(product[0, 0])")  // 4
```

### Example 2: Complex Numbers

```swift
struct Complex {
    var real: Double
    var imaginary: Double
    
    var description: String {
        if imaginary >= 0 {
            return "\(real) + \(imaginary)i"
        } else {
            return "\(real) - \(abs(imaginary))i"
        }
    }
}

extension Complex {
    static func + (left: Complex, right: Complex) -> Complex {
        return Complex(real: left.real + right.real,
                      imaginary: left.imaginary + right.imaginary)
    }
    
    static func - (left: Complex, right: Complex) -> Complex {
        return Complex(real: left.real - right.real,
                      imaginary: left.imaginary - right.imaginary)
    }
    
    static func * (left: Complex, right: Complex) -> Complex {
        let real = left.real * right.real - left.imaginary * right.imaginary
        let imaginary = left.real * right.imaginary + left.imaginary * right.real
        return Complex(real: real, imaginary: imaginary)
    }
}

let c1 = Complex(real: 3, imaginary: 4)
let c2 = Complex(real: 1, imaginary: 2)

let sum = c1 + c2
print(sum.description)  // 4.0 + 6.0i

let product = c1 * c2
print(product.description)  // -5.0 + 10.0i
```

### Example 3: Measurement Units

```swift
struct Distance {
    var meters: Double
    
    var kilometers: Double {
        return meters / 1000
    }
    
    var miles: Double {
        return meters / 1609.34
    }
}

extension Distance {
    static func + (left: Distance, right: Distance) -> Distance {
        return Distance(meters: left.meters + right.meters)
    }
    
    static func - (left: Distance, right: Distance) -> Distance {
        return Distance(meters: left.meters - right.meters)
    }
    
    static func * (distance: Distance, scalar: Double) -> Distance {
        return Distance(meters: distance.meters * scalar)
    }
    
    static func / (distance: Distance, scalar: Double) -> Distance {
        return Distance(meters: distance.meters / scalar)
    }
}

extension Distance: Comparable {
    static func < (left: Distance, right: Distance) -> Bool {
        return left.meters < right.meters
    }
}

let d1 = Distance(meters: 1000)
let d2 = Distance(meters: 500)

let total = d1 + d2
print("Total: \(total.kilometers) km")  // 1.5 km

let longer = d1 > d2
print("d1 > d2: \(longer)")  // true
```

### Example 4: Functional Composition

```swift
infix operator >>>: AdditionPrecedence

func >>> <A, B, C>(f: @escaping (A) -> B, g: @escaping (B) -> C) -> (A) -> C {
    return { a in g(f(a)) }
}

let addOne = { (x: Int) -> Int in x + 1 }
let double = { (x: Int) -> Int in x * 2 }
let square = { (x: Int) -> Int in x * x }

let combined = addOne >>> double >>> square
let result = combined(3)
print(result)  // ((3 + 1) * 2)^2 = 64
```

### Example 5: String Concatenation with Separator

```swift
infix operator <+>: AdditionPrecedence

extension String {
    static func <+> (left: String, right: String) -> String {
        return left + " " + right
    }
}

let greeting = "Hello" <+> "World"
print(greeting)  // "Hello World"

let sentence = "Swift" <+> "is" <+> "awesome"
print(sentence)  // "Swift is awesome"
```

## Best Practices

### 1. Use Operators Sparingly

```swift
// ✅ Good - clear and intuitive
extension Vector {
    static func + (left: Vector, right: Vector) -> Vector { }
}

// ❌ Bad - obscure meaning
infix operator ⚡
extension Vector {
    static func ⚡ (left: Vector, right: Vector) -> Vector { }
}
```

### 2. Match Expected Behavior

```swift
// ✅ Good - behaves  like standard +
extension Point {
    static func + (left: Point, right: Point) -> Point {
        return Point(x: left.x + right.x, y: left.y + right.y)
    }
}

// ❌ Bad - unexpected behavior
extension Point {
    static func + (left: Point, right: Point) -> Point {
        return Point(x: left.x * right.x, y: left.y * right.y)  // This should be *
    }
}
```

### 3. Document Custom Operators

```swift
/// Calculates the dot product of two vectors
/// - Returns: Scalar value representing the dot product
infix operator •: MultiplicationPrecedence

extension Vector {
    static func • (left: Vector, right: Vector) -> Double {
        return left.x * right.x + left.y * right.y
    }
}
```

### 4. Choose Appropriate Precedence

```swift
// ✅ Good - proper precedence
precedencegroup PowerPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator **: PowerPrecedence
```

### 5. Avoid Overusing Custom Operators

```swift
// ✅ Better - use methods for complex operations
extension Array {
    func chunked(into size: Int) -> [[Element]] {
        // Implementation
        return []
    }
}

// ❌ Avoid - unclear custom operator
infix operator ÷÷
extension Array {
    static func ÷÷ (array: Array, size: Int) -> [[Element]] {
        // Same implementation
        return []
    }
}
```

## Summary

Advanced operators enable expressive, elegant code:

**Operator Overloading** 🔧
- Override for custom types
- Arithmetic, comparison, compound
- Prefix, infix, postfix

**Custom Operators** ⚡
- Create new operators
- Define symbols
- Mathematical operations

**Precedence** 📊
- Control evaluation order
- Define precedence groups
- Left/right associativity

**Best Practices** ⭐
- Use sparingly
- Match expected behavior
- Document well
- Choose clear symbols

## Practice Exercises

1. Create a Fraction struct with arithmetic operators
2. Implement a Money type with currency operations
3. Build a Temperature type with unit conversions
4. Create operators for set operations
5. Implement matrix operations
6. Build a physics calculation library

---

**Master advanced operators to write elegant, expressive code!** ✨

*Remember: With great power comes great responsibility - use operators wisely!*
