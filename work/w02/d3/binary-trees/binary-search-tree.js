class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    addLeftChild(value) {
        let left = new BinaryTreeNode(value);
        this.left = left;
        return left;
    }

    addRightChild(value) {
        let right = new BinaryTreeNode(value);
        this.right = right;
        return right;
    }

    doesValueExist(value) {
        // Write code here
    }

    min(root) {
        // Write code here
    }

    max(root) {
        // Write code here
    }
}

/*

bst is the Binary Search Tree shown below:

     4        Layer 0
   /   \
  2     7     Layer 1
 / \   / \
1   3 6   9   Layer 2

*/

const root = new BinaryTreeNode(4); // Layer 0

const two = root.addLeftChild(2);  // Layer 1 
const seven = root.addRightChild(7); // Layer 1

const one = two.addLeftChild(1); // Layer 2
const three = two.addRightChild(3); // Layer 2
const six = seven.addLeftChild(6); // Layer 2
const nine = seven.addRightChild(9); // Layer 2