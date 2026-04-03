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
