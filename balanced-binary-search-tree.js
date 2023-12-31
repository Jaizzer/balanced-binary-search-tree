class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        // Base case.
        if (array.length === 0) return null;

        // Get the midpoint.
        let midpoint = parseInt(array.length / 2);

        // Create Node.
        let root = new Node(array[midpoint]);

        // Set the left and right subtree.
        root.left = this.buildTree(array.slice(0, midpoint));
        root.right = this.buildTree(array.slice(midpoint + 1));

        return root;
    }

    insert(data, root = this.root) {
        if (root === null) {
            return new Node(data);
        }
        if (data < root.value) {
            root.left = this.insert(data, root.left);
        } else {
            root.right = this.insert(data, root.right);
        }
        return root;
    }

    delete(data) {
        // Find the node to delete and its parent node.
        let nodeToDelete = this.root;
        let parentOfNodeToDelete = nodeToDelete;
        let isLeftOfParent = false;
        while (nodeToDelete !== null) {
            if (data === nodeToDelete.value) {
                // Node to delete already found.
                break;
            } else if (data < nodeToDelete.value) {
                // The node is to the left of the tree.
                parentOfNodeToDelete = nodeToDelete;
                nodeToDelete = nodeToDelete.left;
                isLeftOfParent = true;
            } else {
                // The node is to the right of the tree.
                parentOfNodeToDelete = nodeToDelete;
                nodeToDelete = nodeToDelete.right;
                isLeftOfParent = false;
            }
        }

        // Return if node to delete does not exist in the tree.
        if (!nodeToDelete) {
            return;
        }

        // Base case: Node to delete is a leaf (does not contain any children nodes)
        if (!nodeToDelete.right && !nodeToDelete.left) {
            if (parentOfNodeToDelete === nodeToDelete) {
                // The node is root and leaf at the same time, which means the tree has only 1 node.
                this.root = null;
            } else if (isLeftOfParent) {
                // The leaf to delete is to the  left of its parent.
                parentOfNodeToDelete.left = null;
            } else {
                // The leaf to delete is to the right of its parent.
                parentOfNodeToDelete.right = null;
            }
            return;
        }

        // Replace node to delete by its inorder successor if it exists.
        let inorderSuccessor = nodeToDelete.right;
        while (inorderSuccessor) {
            if (inorderSuccessor.left === null) {
                // Use temp variable because the inorder successor's original value might get replaced during the next recursive call.
                let temp = inorderSuccessor.value;

                // Delete the the inorder successor node from its initial position before using it as a replacement to the node to delete.
                this.delete(inorderSuccessor.value);

                // Replace the node to delete by the inorder successor by reassigning the node's value.
                nodeToDelete.value = temp;

                return;
            }
            // Move further down the tree.
            inorderSuccessor = inorderSuccessor.left;
        }

        // Replace node to delete by its inorder predecessor if its inorder successor do not exists.
        let inorderPredecessor = nodeToDelete.left;
        while (inorderPredecessor) {
            if (inorderPredecessor.right === null) {
                // Use temp variable because the inorder predecessor's original value might get replaced during the next recursive call.
                let temp = inorderPredecessor.value;

                // Delete the the inorder predecessor node from its initial position before using it as a replacement to the node to delete.
                this.delete(inorderPredecessor.value);

                // Replace the node to delete by the inorder predecessor by reassigning the node's value.
                nodeToDelete.value = temp;

                return;
            }
            // Move further down the tree.
            inorderPredecessor = inorderPredecessor.right;
        }
    }

    find(data) {
        let currentNode = this.root;
        while (currentNode !== null) {
            if (data === currentNode.value) {
                return currentNode;
            } else if (data < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return null;
    }

    levelOrder(callback) {
        let queue = [this.root];
        let array = [];
        let queueIsEmpty = false;

        // Apply the callback function in a level order traversal using queue.
        while (!queueIsEmpty) {
            if (callback) {
                array.push(callback(queue[0]));
            } else {
                array.push(queue[0].value);
            }
            if (queue[0].left) {
                queue.push(queue[0].left);
            }
            if (queue[0].right) {
                queue.push(queue[0].right);
            }
            queue.shift();
            queueIsEmpty = queue.length === 0;
        }
        return array;
    }

    inOrder(callback, Node = this.root) {
        // Base case.
        if (Node === null) {
            return [];
        }
        // Traverse left
        let left = this.inOrder(callback, Node.left);

        // Apply callback function if it exists, else just get the value.
        let parent = callback ? callback(Node.value) : Node.value;

        // Traverse right.
        let right = this.inOrder(callback, Node.right);

        return [...left, parent, ...right];
    }

    preOrder(callback, Node = this.root) {
        // Base case.
        if (Node === null) {
            return [];
        }

        // Apply callback function if it exists, else just get the value.
        let parent = callback ? callback(Node.value) : Node.value;

        // Traverse left
        let left = this.preOrder(callback, Node.left);

        // Traverse right.
        let right = this.preOrder(callback, Node.right);

        return [parent, ...left, ...right];
    }

    postOrder(callback, Node = this.root) {
        // Base case.
        if (Node === null) {
            return [];
        }

        // Traverse left
        let left = this.postOrder(callback, Node.left);

        // Traverse right.
        let right = this.postOrder(callback, Node.right);

        // Apply callback function if it exists, else just get the value.
        let parent = callback ? callback(Node.value) : Node.value;

        return [...left, ...right, parent];
    }

    height(Node) {
        if (!Node) {
            // Use -1 instead of 0 to prevent overcounting.
            return -1;
        }
        const leftHeight = this.height(Node.left);
        const rightHeight = this.height(Node.right);

        // Always use the biger height.
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(Node) {
        let currentNode = this.root;
        let depth = 0;

        // Increase depth as we traverse the tree until Node is found.
        while (currentNode !== Node) {
            if (Node.value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
            depth++;
        }
        return depth;
    }

    isBalanced(Node = this.root) {
        // Base case: Null Node is balanced by default.
        if (!Node) {
            return true;
        }

        // Check if left subtree is balanced.
        const isLeftBalance = this.isBalanced(Node.left);

        // Check if right subtree is balanced
        const isRightBalance = this.isBalanced(Node.right);

        // Check if current tree is balanced only if both of its subtree is balanced.
        if (isLeftBalance && isRightBalance) {
            const leftHeight = this.height(Node.left);
            const rightHeight = this.height(Node.right);

            // The difference between the height of the left and right subtree should be at most 1 for the tree to be balanced.
            return Math.abs(leftHeight - rightHeight) <= 1;
        }
        return false;
    }

    rebalance() {
        // Balance only if the tree is unbalanced.
        if (!this.isBalanced()) {
            this.root = this.buildTree(this.inOrder());
        }
    }
}
