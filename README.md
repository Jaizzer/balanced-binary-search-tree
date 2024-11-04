# Binary Search Tree (BST) Implementation

This project provides an implementation of a balanced Binary Search Tree (BST) in JavaScript. The code includes a `Tree` class to handle the BST and a `Node` class to define each node within the tree.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Class Structure](#class-structure)
  - [Node Class](#node-class)
  - [Tree Class](#tree-class)
- [Installation and Usage](#installation-and-usage)
- [Examples](#examples)
- [Methods](#methods)
  - [Tree Class Methods](#tree-class-methods)
  - [Traversal Methods](#traversal-methods)
- [License](#license)

## Introduction

This BST implementation allows for efficient insertion, deletion, searching, and traversal of elements. Additionally, the tree can rebalance itself to maintain optimal performance.

## Features

- **Node insertion and deletion**
- **Balancing of the tree**
- **Tree traversal (in-order, pre-order, post-order, level-order)**
- **Height, depth, and balance checking**
- **Automatic rebalancing**

## Class Structure

### Node Class

The `Node` class represents each node in the BST.

```javascript
class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
```


### Tree Class

The `Node` class represents each node in the BST.

```javascript
cclass Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    // Additional methods...
}
```

## Installation and Usage
1.	Clone the repository:
    ```
    git clone https://github.com/Jaizzer/balanced-binary-search-tree.git
    ```
2.	Include the Node and Tree classes in your JavaScript project.
3.	Initialize a new Tree instance with an array of values:
    ```javascript
    let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    ```
## Examples

### Inserting and Deleting a Node
```javascript
tree.insert(8);   // Inserts 8 into the tree
tree.delete(3);   // Deletes the node with value 3 from the tree
```

### Checking if the Tree is balanced
```javascript
tree.isBalanced();   // Returns true if the tree is balanced, false otherwise
```

### Rebalancing the Tree
```javascript
tree.rebalance();    // Rebalances the tree if it is unbalanced
```

## Methods

### Tree Class Methods

```javascript
buildTree(array) // Builds a balanced BST from a sorted array.
insert(data) // Inserts a new node into the BST.
delete(data) // Deletes a node from the BST.
find(data)  // Finds a node with the specified value.
isBalanced() // Checks if the tree is balanced.
rebalance() // Rebalances the tree if it is unbalanced.

```

### Traversal Methods

```javascript
inOrder(callback) // In-order traversal of the BST.
preOrder(callback) // Pre-order traversal of the BST.
postOrder(callback) // Post-order traversal of the BST.
levelOrder(callback) // Level-order traversal of the BST.
```
