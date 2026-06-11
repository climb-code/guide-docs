---
title: Linked List in JavaScript
description: A comprehensive guide to Singly and Doubly Linked Lists in JavaScript.
---

## What is a Linked List?

A **Linked List** is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (called a **Node**) contains:
1.  **Data**: The actual value stored in the node.
2.  **Next Pointer/Reference**: A link to the next node in the sequence.

### Why use Linked Lists?
- **Dynamic Size**: Unlike arrays, linked lists can easily grow or shrink without requiring expensive reallocation.
- **Efficient Insertions/Deletions**: Adding or removing elements at the beginning or middle is more efficient than in arrays because it only involves updating pointers.

---

## Types of Linked Lists

1.  **Singly Linked List**: Each node points only to the next node. Navigation is one-way (forward).
2.  **Doubly Linked List**: Each node points to both the next and the previous node. Navigation is two-way (forward and backward).

---

## 1. Singly Linked List Implementation

In a Singly Linked List, each node has a `data` property and a `next` pointer.

### 🧩 Node & LinkedList Class

```js
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
    }

    // Insert at the end of the list
    insertAtEnd(data) {
        const newNode = new Node(data)
        if (this.head === null) {
            this.head = newNode
        }
        else {
            let current = this.head
            while (current.next !== null) {
                current = current.next
            }
            current.next = newNode
        }
    }

    // Insert at the beginning of the list
    insertAtStart(data) {
        const newNode = new Node(data)
        newNode.next = this.head
        this.head = newNode
    }

    // Traverse and print all nodes
    travers() {
        if (this.head === null) {
            return
        }
        let current = this.head
        while (current !== null) {
            console.log(current.data)
            current = current.next
        }
    }

    // Delete a node by its value
    deleteByValue(value) {
        if (this.head === null) {
            return
        }
        let current = this.head
        if (current.data === value) {
            this.head = current.next
            return
        }
        let prev = null
        while (current.next !== null) {
            prev = current
            current = current.next
            if (current.data === value) {
                prev.next = current.next
                return
            }
        }
    }

    // Search for a specific value
    search(dataTosearch) {
        let current = this.head
        while (current !== null) {
            if (current.data === dataTosearch) {
                return true
            }
            current = current.next
        }
        return false
    }

    // Calculate the total number of nodes
    length() {
        let current = this.head
        let count = 0
        while (current !== null) {
            count++
            current = current.next
        }
        return count
    }

    // Add a node at a specific index
    addAt(index, data) {
        if (index < 0 || index > this.length()) {
            console.log("Invalid Index")
            return
        }

        const newNode = new Node(data)

        if (index === 0) {
            newNode.next = this.head
            this.head = newNode
            return
        }

        let current = this.head
        for (let i = 0; i < index - 1; i++) {
            current = current.next
        }
        newNode.next = current.next
        current.next = newNode
    }

    // Remove the first node
    removeTop() {
        if (this.head === null) {
            return
        }
        this.head = this.head.next
    }

    // Remove the last node
    removeLast() {
        if (this.head === null) {
            return
        }
        let current = this.head
        while (current.next.next !== null) {
            current = current.next
        }
        current.next = null
    }

    // Remove a node at a specific index
    removeAt(index) {
        if (index < 0 || index >= this.length()) {
            console.log("Invalid Index")
            return
        }
        if (index === 0) {
            this.removeTop()
            return
        }
        if (index === this.length() - 1) {
            this.removeLast()
            return
        }
        let current = this.head
        for (let i = 0; i < index - 1; i++) {
            current = current.next
        }
        if (current.next !== null) {
            current.next = current.next.next
        }
    }

    // Reverses a sub-list between indices m and n (0-based)
    reverseBetween(m, n) {
        // Example: If list is empty (null), there is nothing to reverse. Just stop here.
        if (!this.head) return null; 
        
        // Example: Create a fake node (0). If m = 0, this dummy node protects our original head.
        let dummy = new Node(0);  
        
        // Example: Connect dummy to list. Now list looks like: 0 -> 1 -> 2 -> 3 -> 4 -> 5
        dummy.next = this.head; 
        
        // Example: Sit 'before' pointer on dummy node (0) to start the journey.
        let before = dummy;  
        
        // STEP 1: Move 'before' pointer to the node just BEFORE the sub-list that needs reversal.
        // Example: Loop runs from i = 0 to 0 (since m = 1). 'before' moves from 0 to node 1.
        for (let i = 0; i < m; i++) {
            before = before.next;
        }

        // STEP 2: Setup pointers for the actual reversal process.
        // Example: 'current' starts at before.next, which is node 2 (the first node to reverse).
        let current = before.next;
        
        // Example: 'prev' is set to null because node 2 will become the last node and point to nothing for now.
        let prev = null;
        
        // Example: If m = 1 and n = 3, then 3 - 1 + 1 = 3. We need to reverse exactly 3 nodes (2, 3, and 4).
        let numElements = n - m + 1;
        
        // STEP 3: Loop through the sub-list and flip the arrows backwards.
        for (let i = 0; i < numElements; i++) {
            // Example: If current is 2, nextNode saves node 3 so we don't lose the rest of the list.
            let nextNode = current.next; 
            
            // Example: Break the forward arrow of node 2 and point it backward to 'prev' (null).
            current.next = prev; 
            
            // Example: Move 'prev' one step forward. 'prev' now stands on node 2.
            prev = current; 
            
            // Example: Move 'current' one step forward using our backup. 'current' now stands on node 3.
            current = nextNode; 
        }

        // STEP 4: Reconnect the reversed sub-list back to the main list (Patchwork).
        // Example: Node 2 (which is before.next) is now at the end of reversed part. 
        // We connect its next (.next.next) to 'current' (node 5). So, 2 points to 5.
        before.next.next = current;
        
        // Example: Connect 'before' (node 1) to 'prev' (node 4, which is the new head of reversed part).
        // Now list becomes: 1 -> 4 -> 3 -> 2 -> 5
        before.next = prev;
        
        // Example: Update the official head of the list. If dummy.next changed, this keeps it accurate.
        this.head = dummy.next;
    }
}
```

### 🚀 Example Usage & Console Output

```js
const list = new LinkedList()

list.insertAtEnd(10)   // List: 10
list.insertAtEnd(20)   // List: 10 -> 20
list.insertAtEnd(30)   // List: 10 -> 20 -> 30
list.insertAtStart(5)  // List: 5 -> 10 -> 20 -> 30

console.log("List traversal:")
list.travers() 
// Output:
// 5
// 10
// 20
// 30

console.log("Current Length:", list.length()) // Output: 4
console.log("Search for 10:", list.search(10)) // Output: true

list.addAt(2, 15) // List: 5 -> 10 -> 15 -> 20 -> 30
console.log("After adding 15 at index 2:")
list.travers()
// Output:
// 5
// 10
// 15
// 20
// 30
```

### 🔄 Reversing a Sub-list Between m and n

To reverse a portion of a Singly Linked List between 0-based indices `m` and `n` (inclusive), we use a multi-pointer strategy.

#### Step-by-Step Visualization

Let's trace `reverseBetween(1, 3)` on a list: `1 -> 2 -> 3 -> 4 -> 5` (Indices: `1` is index 0, `2` is index 1, `3` is index 2, `4` is index 3, `5` is index 4).

1. **Dummy Node & Setup**:
   - `dummy -> 1 -> 2 -> 3 -> 4 -> 5`
   - `before` starts on `dummy` (index -1).
2. **Move 'before' to position `m - 1`** (since `m = 1`):
   - Loop runs once, `before` moves to `before.next` (node `1` at index 0).
3. **Setup Reversal Pointers**:
   - `current` = node `2` (the start of the reversal sub-list).
   - `prev` = `null`.
   - `numElements` = `3 - 1 + 1` = `3` nodes (`2`, `3`, and `4`).
4. **Sub-list Reversal (Loop runs 3 times)**:
   - **Iteration 1**:
     - `nextNode` = node `3`.
     - Node `2` points backward to `prev` (`null`).
     - `prev` moves to node `2`.
     - `current` moves to node `3`.
   - **Iteration 2**:
     - `nextNode` = node `4`.
     - Node `3` points backward to `prev` (node `2`).
     - `prev` moves to node `3`.
     - `current` moves to node `4`.
   - **Iteration 3**:
     - `nextNode` = node `5`.
     - Node `4` points backward to `prev` (node `3`).
     - `prev` moves to node `4`.
     - `current` moves to node `5`.
5. **Reconnection**:
   - The tail of our reversed sub-list is node `2` (`before.next`).
   - We connect its next (`before.next.next`) to `current` (node `5`): `2.next = 5`.
   - We connect `before` (node `1`) to `prev` (node `4`): `1.next = 4`.
   - The list becomes: `1 -> 4 -> 3 -> 2 -> 5`.

#### Complexity
- **Time Complexity**: $O(N)$ since we scan the list to find the start index and then reverse a subset of nodes.
- **Space Complexity**: $O(1)$ auxiliary space as we modify the pointers in-place.

---

## 2. Doubly Linked List Implementation

A **Doubly Linked List** node contains three things: the `data`, a pointer to the `next` node, and a pointer to the `previous` node.

### 🧩 DoublyNode & DoublyLinkedList Class

```js
class DoublyNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add node to the end
    insertAtEnd(data) {
        const newNode = new DoublyNode(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    // Add node to the start
    insertAtStart(data) {
        const newNode = new DoublyNode(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // Forward Traversal
    traverseForward() {
        let current = this.head;
        let result = [];
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        console.log("Forward Traversal:", result.join(" <-> "));
    }

    // Backward Traversal
    traverseBackward() {
        let current = this.tail;
        let result = [];
        while (current) {
            result.push(current.data);
            current = current.prev;
        }
        console.log("Backward Traversal:", result.join(" <-> "));
    }

    // Delete node by value
    deleteByValue(value) {
        if (!this.head) return;

        let current = this.head;
        while (current && current.data !== value) {
            current = current.next;
        }

        if (!current) return; // Not found

        if (current === this.head) {
            this.head = current.next;
            if (this.head) this.head.prev = null;
            else this.tail = null;
        } else if (current === this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
    }
}
```

### 🚀 Doubly Example & Console Output

```js
const dList = new DoublyLinkedList();

dList.insertAtEnd(100);
dList.insertAtEnd(200);
dList.insertAtStart(50);

dList.traverseForward();  
// Output: Forward Traversal: 50 <-> 100 <-> 200

dList.traverseBackward(); 
// Output: Backward Traversal: 200 <-> 100 <-> 50

dList.deleteByValue(100);
console.log("After deleting 100:");
dList.traverseForward();  
// Output: Forward Traversal: 50 <-> 200
```
