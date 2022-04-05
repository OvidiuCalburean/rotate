export default class CircularLinkedList {
  constructor(elementsArray = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (elementsArray && elementsArray.length > 0) {
      for (const x of elementsArray) {
        this.push(x);
      }
    }
  }

  push(element) {
    const nextNode = new Node(element);

    let current = this.tail;
    this.tail = nextNode;

    if (this.head == null) {
      this.head = nextNode;
    } else {
      current.next = nextNode;
      nextNode.previous = current;
    }
    this.head.previous = this.tail;
    nextNode.next = this.head;
    this.size++;
  }

  pop() {
    if (this.size === 0) {
      return;
    }

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let currentTail = this.tail;
      this.tail = currentTail.previous;
      this.tail.next = this.head;
    }

    this.size--;
  }

  rotate() {
    if (this.size < 2) {
      return;
    }

    let currentHead = this.head;
    this.head = currentHead.next;
    this.tail = currentHead;
    return this;
  }

  replaceTail(element) {
    this.pop();
    this.push(element);
    return this;
  }

  //Making the Linked list iterable
  *[Symbol.iterator]() {
    let index = 0;
    let currentNode = this.head;
    while (currentNode && index < this.size) {
      yield currentNode.element;
      currentNode = currentNode.next;
      index++;
    }
  }
}

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}
