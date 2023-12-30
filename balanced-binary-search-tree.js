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
}
