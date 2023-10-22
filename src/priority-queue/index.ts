import { BinaryMinHeap } from './binaryMinHeap'; 

const main = () => {
  const heap = new BinaryMinHeap();
  heap.startHeap(10);

  heap.insert("A", 3);
  heap.insert("B", 1);
  heap.insert("C", 5);

  console.log("Initial minimum element:", heap.findMin());  // Should output the node with item "B" and value 1

  heap.changePriority("A", 0);

  console.log("Minimum element after changing priority:", heap.findMin());  // Should output the node with item "A" and value 0

  const minElement = heap.extractMin();
  console.log("Extracted minimum element:", minElement);  // Should output the node with item "A" and value 0

  console.log("Minimum element after extraction:", heap.findMin());  // Should output the node with item "B" and value 1
};

main();
