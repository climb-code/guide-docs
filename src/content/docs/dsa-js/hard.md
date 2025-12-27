---
title: JavaScript Hard Questions
description: Hard-Level JavaScript DSA Questions
---

# 1. Trapping Rain Water

## Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

### Example 1

#### Input:

```javascript
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
```

#### Output:

```javascript
6;
```

#### Explanation:

The above elevation map (black section) is represented by array `[0,1,0,2,1,0,1,3,2,1,2,1]`. In this case, **6 units** of rain water (blue section) are being trapped.

### Example 2

#### Input:

```javascript
height = [4, 2, 0, 3, 2, 5];
```

#### Output:

```javascript
9;
```

### Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Understanding the Problem (Simple Explanation)

Think of this problem like a container with walls of different heights. When it rains, water gets trapped between the walls. 

### The Big Idea 💡

**Water can only be trapped if there are walls on BOTH sides!**

Imagine you're at position `i`:
- Look to your **left** → Find the tallest wall (maxLeft)
- Look to your **right** → Find the tallest wall (maxRight)
- Water level at your position = **shorter of the two walls** (because water flows over the shorter wall)
- Water trapped = **water level - current height**

### Simple Example

```
Heights: [3, 0, 2, 0, 4]

Position 1 (height=0):
  - Tallest wall on left = 3
  - Tallest wall on right = 4
  - Water level = min(3, 4) = 3
  - Water trapped = 3 - 0 = 3 units ✅

Position 3 (height=0):
  - Tallest wall on left = 3
  - Tallest wall on right = 4
  - Water level = min(3, 4) = 3
  - Water trapped = 3 - 0 = 3 units ✅

Total water = 3 + 3 = 6 units!
```

### Visual Representation

```
     4 ┃           ██
     3 ┃  ██  ▓▓  ▓▓  ██     ▓▓ = trapped water
     2 ┃  ██  ▓▓  ██  ██     ██ = walls/heights
     1 ┃  ██  ▓▓  ██  ██
     0 ┃__██__▓▓__██__▓▓__██
        [3,  0,  2,  0,  4]
```

## Solution Approach

The key insight is that the amount of water trapped at any position depends on the **maximum height to its left** and the **maximum height to its right**. The water level at position `i` will be:

```
water[i] = min(maxLeft[i], maxRight[i]) - height[i]
```

If this value is positive, water can be trapped at that position.

### Algorithm Steps

1. **Create two arrays:**
   - `left[]` - stores the maximum height seen so far from the left
   - `right[]` - stores the maximum height seen so far from the right
2. **Fill the left array:**
   - Iterate from left to right, keeping track of the maximum height encountered
3. **Fill the right array:**
   - Iterate from right to left, keeping track of the maximum height encountered
4. **Calculate trapped water:**
   - For each position, water trapped = `min(left[i], right[i]) - height[i]`

## Implementation

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  console.log("Input height array:", height);

  let left = new Array(height.length);
  let right = new Array(height.length);

  let maxLeft = height[0];
  let maxRight = height[height.length - 1];

  left[0] = maxLeft;
  right[right.length - 1] = maxRight;

  console.log("Initial maxLeft:", maxLeft);
  console.log("Initial maxRight:", maxRight);
  console.log("Left array start:", left);
  console.log("Right array start:", right);

  // Build left max array
  for (let i = 1; i < height.length; i++) {
    maxLeft = Math.max(height[i], maxLeft);
    left[i] = maxLeft;

    console.log(
      `Left pass i=${i} | height=${height[i]} | maxLeft=${maxLeft} | left=`,
      left
    );
  }

  // Build right max array
  for (let i = height.length - 2; i >= 0; i--) {
    maxRight = Math.max(height[i], maxRight);
    right[i] = maxRight;

    console.log(
      `Right pass i=${i} | height=${height[i]} | maxRight=${maxRight} | right=`,
      right
    );
  }

  console.log("Final Left Max Array:", left);
  console.log("Final Right Max Array:", right);

  let ans = 0;

  // Calculate trapped water
  for (let i = 0; i < height.length; i++) {
    const waterAtIndex = Math.min(left[i], right[i]) - height[i];
    ans += waterAtIndex;

    console.log(
      `Index ${i} | min(left,right)=${Math.min(left[i], right[i])} | height=${height[i]} | water=${waterAtIndex} | total=${ans}`
    );
  }

  console.log("Total trapped water:", ans);
  return ans;
};

// Example usage
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // Output: 6
console.log(trap([4, 2, 0, 3, 2, 5])); // Output: 9
```

## Detailed Walkthrough

Let's trace through Example 1: `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`

### Step 1: Build left array

```javascript
i:       0  1  2  3  4  5  6  7  8  9  10 11
height:  0  1  0  2  1  0  1  3  2  1  2  1
left:    0  1  1  2  2  2  2  3  3  3  3  3
```

### Step 2: Build right array

```javascript
i:       0  1  2  3  4  5  6  7  8  9  10 11
height:  0  1  0  2  1  0  1  3  2  1  2  1
right:   3  3  3  3  3  3  3  3  2  2  2  1
```

### Step 3: Calculate trapped water

```javascript
i:       0  1  2  3  4  5  6  7  8  9  10 11
min:     0  1  1  2  2  2  2  3  2  2  2  1
height:  0  1  0  2  1  0  1  3  2  1  2  1
water:   0  0  1  0  1  2  1  0  0  1  0  0
```

**Total water trapped = 0 + 0 + 1 + 0 + 1 + 2 + 1 + 0 + 0 + 1 + 0 + 0 = 6**

## Complexity Analysis

### Time Complexity

- **O(n)** → We make three separate passes through the array:
  1. Building the left array: O(n)
  2. Building the right array: O(n)
  3. Calculating trapped water: O(n)
- Total: O(n) + O(n) + O(n) = **O(n)**

### Space Complexity

- **O(n)** → We use two additional arrays (`left` and `right`), each of size `n`

## Optimized Approach (Two Pointers)

We can solve this problem using **O(1) space** by using two pointers instead of two arrays:

```javascript
var trapOptimized = function (height) {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
};

// Example usage
console.log(trapOptimized([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // Output: 6
console.log(trapOptimized([4, 2, 0, 3, 2, 5])); // Output: 9
```

### Optimized Complexity

| Metric           | Complexity |
| ---------------- | ---------- |
| Time Complexity  | O(n)       |
| Space Complexity | O(1)       |

## Key Takeaways

✅ The problem uses the concept of **prefix and suffix maximum**  
✅ Water at any position depends on the **minimum of left max and right max**  
✅ Can be solved with **O(n) time** and **O(n) space** using arrays  
✅ Can be optimized to **O(1) space** using the two-pointer technique  
✅ This is a classic **LeetCode Hard** problem (#42)

This problem teaches important concepts like array traversal, prefix/suffix arrays, and two-pointer optimization! 💧🚀
