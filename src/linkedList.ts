class MyNode {
    item: string;
    prev: MyNode | null;
    next: MyNode | null;

    constructor(item: string, prev = null, next = null) {
        this.item = item;
        this.prev = prev;
        this.next = next;

    }
}

class LinkedList {

    head: MyNode | null;
    tail: MyNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(item: string) {
        const newNode = new MyNode(item);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            if (this.tail) {
                this.tail.next = newNode;
            }
            this.tail = newNode;
        }
    }

    printList() {
        let current = this.head;
        if (current === null) {
            console.log("list is empty");
        } else {
            while (current) {
                console.log(current.item);
                current = current.next;
            }
        }
    }

}

