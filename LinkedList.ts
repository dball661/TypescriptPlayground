interface INode<T> {
    next: GenericNode<T> | null
    prev: GenericNode<T> | null
    data: T
}

class GenericNode<T> implements INode<T> {
    public next: GenericNode<T> | null = null;
    public prev: GenericNode<T> | null = null;
    public data!: T
  }

  interface ILinkedList<T> {
    insertInBegin(data: T): GenericNode<T>;
    insertAtEnd(data: T): GenericNode<T>;
    deleteNode(node: GenericNode<T>): void;
    traverse(): T[];
    search(comparator: (data: T | null) => boolean): GenericNode<T> | null;
    node: GenericNode<T>
  }

class LinkedList<T> implements ILinkedList<T> {
    private head: GenericNode<T> | null = null
    private size: number = 0
    node: GenericNode<T>
    public get sizeOfList() {
        return this.size
    }
    constructor(node: INode<T>) {
        this.node = node
    }
  
    public insertAtEnd(data: T): GenericNode<T> {
      const node = this.node
      if (!this.head) {
        this.head = node;
      } else {
        const getLast = (node: GenericNode<T>): GenericNode<T> => {
          return node.next ? getLast(node.next) : node;
        };
  
        const lastNode = getLast(this.head);
        node.prev = lastNode;
        lastNode.next = node;
      }
      this.size++
      return node;
    }
  
    public insertInBegin(data: T): GenericNode<T> {
      const node = this.node
      if (!this.head) {
        this.head = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }
      this.size++
      return node;
    }
  
    public deleteNode(node: GenericNode<T>): void {
      if (!node.prev) {
        this.head = node.next;
      } else {
        const prevNode = node.prev;
        prevNode.next = node.next;
      }
      this.size--
    }
  
    public search(comparator: (data: T ) => boolean): GenericNode<T> | null {
      const checkNext = (node: GenericNode<T>): GenericNode<T> | null => {
        if (comparator(node.data)) {
          return node;
        }
        return node.next ? checkNext(node.next) : null;
      };
  
      return this.head ? checkNext(this.head) : null;
    }
  
    public traverse(): T[] {
      const array: T[] = [];
      if (!this.head) {
        return array;
      }
  
      const addToArray = (node: GenericNode<T>): T[] => {
        array.push(node.data);
        return node.next ? addToArray(node.next) : array;
      };
      return addToArray(this.head);
    }
  }
  
  interface Post {
    title: string;
  }
  const linkedList = new LinkedList<Post>(new GenericNode());
  
  linkedList.traverse() // [];
  
  linkedList.insertAtEnd({ title: "Post A" });
  linkedList.insertAtEnd({ title: "Post B" });
  linkedList.insertInBegin({ title: "Post C" });
  linkedList.insertInBegin({ title: "Post D" });

  console.log("lingkedList size ", linkedList.sizeOfList)
  
  linkedList.traverse() // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
  linkedList.search(({ title }) => title === "Post A") // Node { data: { title: "Post A" }, prev: Node, next: Node};

  console.log(linkedList)