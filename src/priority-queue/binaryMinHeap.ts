import {HeapNode} from './heapNode'

export class BinaryMinHeap{
    private heap: HeapNode[];
    private size: number;
    private position: {[key: string]: number};

    constructor() {
        this.heap = [];
        this.size = 0;
        this.position = {};
    }

    startHeap(n: number): void {
        this.heap = new Array(n);
    }

    // Balance by moving up
    heapifyUp(index: number): void {
        while(index > 0) {
            const parentIndex = Math.floor((index - 1)/ 2);
            if(this.heap[index].value < this.heap[parentIndex].value){
                // Swap and update positions
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                this.position[this.heap[index].item] = index;
                this.position[this.heap[parentIndex].item] = parentIndex;
                index = parentIndex;
            }else {
                break;
            }
        }
    }

    // Balance by moving down  
    heapifyDown(index: number): void {
        while (2 * index + 1 < this.size) {
          let smallerChildIndex = 2 * index + 1;
          if (2 * index + 2 < this.size && this.heap[2 * index + 2].value < this.heap[smallerChildIndex].value) {
            smallerChildIndex = 2 * index + 2;
          }
          if (this.heap[index].value > this.heap[smallerChildIndex].value) {
            // Swap and update positions
            [this.heap[index], this.heap[smallerChildIndex]] = [this.heap[smallerChildIndex], this.heap[index]];
            this.position[this.heap[index].item] = index;
            this.position[this.heap[smallerChildIndex].item] = smallerChildIndex;
            index = smallerChildIndex;
          } else {
            break;
          }
        }
    }

    // Insert an item with a value into the heap
    insert(item: any, value: number): void {
        const newNode = new HeapNode(item, value);
        this.heap[this.size] = newNode;
        this.position[item] = this.size;
        this.size++;
        this.heapifyUp(this.size - 1);
    }

    findMin(): HeapNode {
        return this.heap[0];
    }

    delete(index: number): void {
        const lastElement = this.heap[this.size - 1];
        this.heap[index] = lastElement;
        this.position[lastElement.item] = index;
        this.size--;
        this.heapifyDown(index);
    }

    extractMin(): HeapNode {
        const min = this.heap[0];
        this.delete(0);
        return min;
    }

    changePriority(item: any, newPriority: number): void {
        const index = this.position[item];
        const oldPriority = this.heap[index].value;
        this.heap[index].value = newPriority;
        if (newPriority < oldPriority) {
          this.heapifyUp(index);
        } else {
          this.heapifyDown(index);
        }
    }

}