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
