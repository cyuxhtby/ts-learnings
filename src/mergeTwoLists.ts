// Leetcode: Merge Two Sorted Lists

// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.

// Provided definition for singly-linked list.
 class ListNode {
     val: number
     next: ListNode | null
     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
 }


function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // create dummy node to start the list
    const dummy: ListNode | null = new ListNode();
    // create current pointer to add new nodes
    let current = dummy;
    while (list1 && list2){
        if(list1.val < list2.val){
        current.next = new ListNode(list1.val);
        list1 = list1.next;
        }else{
        current.next = new ListNode(list2.val);
        list2 = list2.next;
        }
    current = current.next;
    }
    // take care of last nodes
    if(list1){
        current.next = list1;
    }if(list2){
        current.next = list2;
    }    
    // return head of new list omitting null node
    return dummy.next;

};