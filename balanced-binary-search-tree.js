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
}
