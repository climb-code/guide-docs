---
title: JavaScript Linked List Questions Guide
description: Advanced-Level JavaScript Data Structures and Algorithms Questions
---

## Overview

This guide covers the implementation and operations of different types of linked lists in JavaScript. It serves as a comprehensive reference for understanding and working with linked list data structures.

## Definition

A Linked list is a linear data structure where elements, called **nodes**, are not stored contiguously in memory. Instead, each node contains **data** and a **references** , or link, to the next node in the sequence,

## Types of Linked Lists

### 1. Singly Linked List

A singly linked list is a linear data structure where each element (node) contains a data field and a reference (link) to the next node in the sequence.

#### Core Operations

- **Push**: Add a new node at the end of the list
- **Pop**: Remove the last node from the list
- **Unshift**: Add a new node at the beginning of the list
- **Shift**: Remove the first node from the list
- **GetFirst**: Retrieve the first node
- **GetLast**: Retrieve the last node
- **Set**: Update the value of a node at a specific position
- **Insert**: Add a new node at a specific position
- **Size**: Get the total number of nodes
- **Clear**: Remove all nodes from the list

### 2. Doubly Linked List

A doubly linked list is an extension of the singly linked list where each node contains references to both the next and previous nodes.

#### Core Operations

- **Push**: Add a new node at the end of the list
- **Pop**: Remove the last node from the list
- **Unshift**: Add a new node at the beginning of the list
- **Shift**: Remove the first node from the list

### 3. Reverse Linked List

A specialized operation that reverses the order of nodes in a linked list.



## 1. Node + LinkedList Class (Singly)

### 🧩 Node Class

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

### 🛠 LinkedList Class

```js
class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) return undefined;
    let temp = this.head;
    let prev = this.head;
    while (temp.next) {
      prev = temp;
      temp = temp.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  unShift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return undefined;
    let temp = this.head;
    this.head = this.head.next;
    temp.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;
    return temp;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    let temp = this.head;
    while (temp && temp.next) {
      temp = temp.next;
    }
    return temp;
  }

  get(index) {
    let count = 0;
    let temp = this.head;
    while (temp) {
      if (count === index) return temp;
      temp = temp.next;
      count++;
    }
    return null;
  }

  set(index, value) {
    const found = this.get(index);
    if (found) {
      found.value = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index === 0) return this.unShift(value);
    if (index === this.length) return this.push(value);
    const newNode = new Node(value);
    const prev = this.get(index - 1);
    if (!prev) return false;
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
    return true;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

---

## 🧪 Example + Step-by-Step Breakdown

```js
const list = new LinkedList(10);
list.push(20);
list.push(30);
list.unshift(5);
list.pop();
list.shift();

console.log("First Node:", list.getFirst());
console.log("Last Node:", list.getLast());
console.log("Size:", list.size());
list.set(1, 100);
list.insert(1, 50);
list.clear();
```

---

### 🧠 Let’s Understand Step by Step

#### ✅ Step 1: `new LinkedList(10)`

- List: `10`
- Head = Tail = 10
- Length = 1

#### ✅ Step 2: `push(20)`

- List: `10 → 20`
- Tail is now 20
- Length = 2

#### ✅ Step 3: `push(30)`

- List: `10 → 20 → 30`
- Tail is now 30
- Length = 3

#### ✅ Step 4: `unshift(5)`

- List: `5 → 10 → 20 → 30`
- Head is now 5
- Length = 4

#### ✅ Step 5: `pop()`

- Removes 30
- List: `5 → 10 → 20`
- Tail is now 20
- Length = 3

#### ✅ Step 6: `shift()`

- Removes 5
- List: `10 → 20`
- Head is now 10
- Length = 2

#### ✅ Step 7: `getFirst()` → returns `10`

#### ✅ Step 8: `getLast()` → returns `20`

#### ✅ Step 9: `size()` → returns `2`

#### ✅ Step 10: `set(1, 100)`

- Updates index 1 (which is 20) to 100
- List: `10 → 100`

#### ✅ Step 11: `insert(1, 50)`

- Insert 50 at index 1
- List: `10 → 50 → 100`
- Length = 3

#### ✅ Step 12: `clear()`

- Empties the list
- List: empty
- Head = Tail = null
- Length = 0

---

## 2. Basic Singly Linked List (Alternative Implementation)

### 🧩 Class Implementation with Line-by-Line Comments

```js
class Node {
    constructor(data) {
        this.data = data; // Assign the value passed to the node
        this.next = null; // Initialize the next pointer to null
    }
}

class LinkedList {
    constructor() {
        this.head = null; // Initialize the linked list with an empty head
    }

    // Insert a new node at the end of the linked list
    insertAtEnd(data) {
        const newNode = new Node(data); // Create a new node with the given data
        if (this.head === null) {       // If the list is empty (head is null)
            this.head = newNode;        // Make the new node the head of the list
        } else {
            let current = this.head;    // Start traversing from the head
            while (current.next !== null) { // Loop until the last node is reached
                current = current.next; // Move to the next node
            }
            current.next = newNode;     // Link the last node to the new node
        }
    }

    // Traverse and print all elements in the linked list
    travers() {
        if (this.head === null) {       // If the list is empty, there is nothing to traverse
            return;                     // Exit the function
        }
        let current = this.head;        // Start traversing from the head
        while (current !== null) {      // Loop until the end of the list is reached
            console.log(current.data);  // Print the data of the current node
            current = current.next;     // Move to the next node
        }
    }

    // Delete the first node that contains the specified value
    deleteByValue(value) {
        if (this.head === null) {       // If the list is empty, nothing to delete
            return;                     // Exit the function
        }
        let current = this.head;        // Start at the head
        if (current.data === value) {   // If the head itself contains the value to delete
            this.head = current.next;   // Update the head to the next node
            return;                     // Exit the function
        }
        let prev = null;                // Keep track of the previous node
        while (current.next !== null) { // Loop as long as there is a next node
            prev = current;             // Store the current node as previous
            current = current.next;     // Move to the next node
            if (current.data === value) { // If the target value is found
                prev.next = current.next; // Skip the current node by linking previous to next
                return;                   // Exit after deletion
            }
        }
    }

    // Search for a specific value in the linked list
    search(dataTosearch) {
        let current = this.head;        // Start traversing from the head
        while (current !== null) {      // Loop through all nodes
            if (current.data === dataTosearch) { // If the value matches
                return true;            // Return true indicating value is found
            }
            current = current.next;     // Move to the next node
        }
        return false;                   // Return false if value is not found after full traversal
    }

    // Calculate the total number of nodes in the list
    length() {
        let current = this.head;        // Start at the head
        let count = 0;                  // Initialize a counter to 0
        while (current !== null) {      // Loop through the list
            count++;                    // Increment the counter for each node
            current = current.next;     // Move to the next node
        }
        return count;                   // Return the final count
    }
}
```

### 🧪 Example + Example Breakdown (Dry Run)

```js
const list = new LinkedList();
list.insertAtEnd(10);
list.insertAtEnd(20);
list.insertAtEnd(30);
list.travers();
// list.deleteByValue(20);
console.log(list.length());
console.log(list.search(10));
```

#### 🧠 Dry Run Principle (Step-by-Step Execution)

**Step 1: `const list = new LinkedList()`**
- A new empty `LinkedList` object is created.
- `this.head` is `null`.

**Step 2: `list.insertAtEnd(10)`**
- A `new Node(10)` is created (`data` = 10, `next` = null).
- Since `this.head` is `null`, `this.head` now points to this new Node(10).
- **List State:** `10 -> null`

**Step 3: `list.insertAtEnd(20)`**
- A `new Node(20)` is created.
- `this.head` is not null. Current pointer starts at `head` (which is node 10).
- `current.next` (which is null) is modified to point to the new Node(20).
- **List State:** `10 -> 20 -> null`

**Step 4: `list.insertAtEnd(30)`**
- A `new Node(30)` is created.
- Traversal starts from `head` (10) -> moves to (20). Since node 20's `next` is null, the loop stops.
- Node 20's `next` is set to point to Node 30.
- **List State:** `10 -> 20 -> 30 -> null`

**Step 5: `list.travers()`**
- Traversal starts from `head` (10).
- Output: `10` -> moves to next (20).
- Output: `20` -> moves to next (30).
- Output: `30` -> moves to next (null). Ends.
- **Console Output:** 
  ```
  10
  20
  30
  ```

**Step 6: `list.length()`**
- Starts a `count` at 0.
- Traverses node 10 (`count` = 1), moves to 20.
- Traverses node 20 (`count` = 2), moves to 30.
- Traverses node 30 (`count` = 3), moves to null. Ends.
- Returns `3`.
- **Console Output:** `3`

**Step 7: `list.search(10)`**
- Starts searching from the `head` (10).
- Checks if node 10's data matches 10. Yes, it does.
- Returns `true` immediately.
- **Console Output:** `true`
