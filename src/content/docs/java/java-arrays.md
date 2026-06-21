---
title: Arrays in Java
description: Learn how to declare, initialize, access, and iterate over single-dimensional and multi-dimensional arrays in Java.
---

An **array** is a container object that holds a fixed number of values of a **single type**. The length of an array is established when the array is created, and after creation, its length is fixed (cannot grow or shrink dynamically).

Each item in an array is called an **element**, and each element is accessed by its numerical index. Array indexing in Java starts at **`0`**.

---

## 1. Single-Dimensional Arrays

### Declaring and Initializing Arrays
There are a few ways to declare and initialize arrays in Java:

```java
// Method 1: Declaration followed by allocation
int[] numbers = new int[5]; // Creates an array of size 5, default values are 0

// Method 2: Declare and initialize with values directly
int[] ages = {18, 20, 25, 30, 40};

// Method 3: Using the new keyword with values
String[] fruits = new String[]{"Apple", "Banana", "Orange"};
```

### Accessing and Modifying Elements
You can access and update elements using their index enclosed in square brackets `[]`.

```java
int[] numbers = {10, 20, 30, 40};

// Accessing elements
System.out.println("First element: " + numbers[0]); // Output: 10
System.out.println("Third element: " + numbers[2]); // Output: 30

// Modifying elements
numbers[1] = 50; // Changes 20 to 50
System.out.println("Updated second element: " + numbers[1]); // Output: 50
```

### Finding Array Length
You can find the number of elements in an array using the `.length` property.

```java
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
System.out.println("Number of cars: " + cars.length); // Output: 4
```

---

## 2. Iterating Through Arrays

To process or display all elements in an array, you can loop through them.

### Using a Standard `for` Loop
```java
int[] marks = {95, 80, 89, 92, 85};

for (int i = 0; i < marks.length; i++) {
    System.out.println("Mark at index " + i + ": " + marks[i]);
}
```

### Using an Enhanced `for-each` Loop
If you do not need to keep track of the indices, the enhanced `for` loop is cleaner and more readable.

```java
String[] colors = {"Red", "Green", "Blue"};

for (String color : colors) {
    System.out.println("Color: " + color);
}
```

---

## 3. Multi-Dimensional Arrays

A multi-dimensional array is an array of arrays. The most common multi-dimensional array is the **two-dimensional array** (often thought of as a table/matrix with rows and columns).

### Declaring and Initializing a 2D Array
```java
// Method 1: Specify size [rows][columns]
int[][] matrix = new int[3][4]; // 3 rows and 4 columns

// Method 2: Initialize with values directly
int[][] coordinates = {
    {1, 2, 3}, // Row 0
    {4, 5, 6}, // Row 1
    {7, 8, 9}  // Row 2
};
```

### Accessing Elements in a 2D Array
Specify both the row index and the column index:

```java
int[][] coordinates = {
    {1, 2, 3},
    {4, 5, 6}
};

System.out.println(coordinates[0][1]); // Row 0, Column 1 -> Output: 2
System.out.println(coordinates[1][2]); // Row 1, Column 2 -> Output: 6
```

### Iterating over a 2D Array
To loop through a 2D array, you must use nested loops:

```java
int[][] coordinates = {
    {1, 2},
    {3, 4}
};

for (int i = 0; i < coordinates.length; i++) { // Loop through rows
    for (int j = 0; j < coordinates[i].length; j++) { // Loop through columns
        System.out.print(coordinates[i][j] + " ");
    }
    System.out.println(); // New line after each row
}
// Output:
// 1 2
// 3 4
```

---

## Common Pitfall: `ArrayIndexOutOfBoundsException`

If you try to access an index that is negative, or greater than or equal to the array's length, Java will throw an `ArrayIndexOutOfBoundsException`.

```java
int[] numbers = {1, 2, 3};

// ❌ Throws ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
System.out.println(numbers[3]); 
```

> [!WARNING]
> Remember that the last valid index in any array is always `length - 1`.

---

### Next Steps ➡️
Now that you can store lists of data in arrays, the next step is to dive into **Object-Oriented Programming (OOP) in Java**, starting with **Classes and Objects**.
