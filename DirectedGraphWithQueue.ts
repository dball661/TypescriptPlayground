interface IQueue<T> {
    add(item: T): void;
    remove(): T | undefined;
    size(): number;
  }

export class Node<T> {
    data: T;
    adjacent: Node<T>[];
    comparator: (a: T, b: T) => number;
  
    constructor(data: T, comparator: (a: T, b: T) => number) {
      this.data = data;
      this.adjacent = [];
      this.comparator = comparator;
    }
  
    addAdjacent(node: Node<T>): void {
      this.adjacent.push(node);
    }
  
    removeAdjacent(data: T): Node<T> | null {
      const index = this.adjacent.findIndex(
        (node) => this.comparator(node.data, data) === 0
      );
  
      if (index > -1) {
        return this.adjacent.splice(index, 1)[0];
      }
  
      return null;
    }
  }


  class Queue<T> implements IQueue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
    public get isEmpty() {
      if (this.size() === 0) return true
      return false
    }
  
    add(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
    remove(): T | undefined  {
      return this.storage.shift();
    }
    size(): number {
      return this.storage.length;
    }
  }
  
  
  class Graph<T> {
    nodes: Map<T, Node<T>> = new Map();
    comparator: (a: T, b: T) => number;
  
    constructor(comparator: (a: T, b: T) => number) {
      this.comparator = comparator;
    }
  
    /**
     * Add a new node if it was not added before
     *
     * @param {T} data
     * @returns {Node<T>}
     */
    addNode(data: T): Node<T> {
      let node = this.nodes.get(data);
  
      if (node) return node;
  
      node = new Node(data, this.comparator);
      this.nodes.set(data, node);
  
      return node;
    }
  
    /**
     * Remove a node, also remove it from other nodes adjacency list
     *
     * @param {T} data
     * @returns {Node<T> | null}
     */
    removeNode(data: T): Node<T> | null {
      const nodeToRemove = this.nodes.get(data);
  
      if (!nodeToRemove) return null;
  
      this.nodes.forEach((node) => {
        node.removeAdjacent(nodeToRemove.data);
      });
  
      this.nodes.delete(data);
  
      return nodeToRemove;
    }
  
    /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    addEdge(source: T, destination: T): void {
      const sourceNode = this.addNode(source);
      const destinationNode = this.addNode(destination);
  
      sourceNode.addAdjacent(destinationNode);
    }
  
    /**
     * Remove an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    removeEdge(source: T, destination: T): void {
      const sourceNode = this.nodes.get(source);
      const destinationNode = this.nodes.get(destination);
  
      if (sourceNode && destinationNode) {
        sourceNode.removeAdjacent(destination);
      }
    }
  
    /**
     * Depth-first search
     *
     * @param {T} data
     * @param {Map<T, boolean>} visited
     * @returns
     */
    private depthFirstSearchAux(node: Node<T>, visited: Map<T, boolean>): void {
      if (!node) return;
  
      visited.set(node.data, true);
  
      console.log(node.data);
  
      node.adjacent.forEach((item) => {
        if (!visited.has(item.data)) {
          this.depthFirstSearchAux(item, visited);
        }
      });
    }
  
    depthFirstSearch() {
      const visited: Map<T, boolean> = new Map();
      this.nodes.forEach((node) => {
        if (!visited.has(node.data)) {
          this.depthFirstSearchAux(node, visited);
        }
      });
    }
  
    /**
     * Breadth-first search
     *
     * @param {T} data
     * @returns
     */
    private breadthFirstSearchAux(node: Node<T> | undefined, visited: Map<T, boolean>): void {
      const queue: Queue<Node<T>> = new Queue();
  
      if (!node) return;
  
      queue.add(node);
      visited.set(node.data, true);
  
      while (!queue.isEmpty) {
        node = queue.remove();
  
        if (!node) continue;
  
        console.log(node.data);
  
        node.adjacent.forEach((item) => {
          if (!visited.has(item.data)) {
            visited.set(item.data, true);
            queue.add(item);
          }
        });
      }
    }
  
    breadthFirstSearch() {
      const visited: Map<T, boolean> = new Map();
      this.nodes.forEach((node) => {
        if (!visited.has(node.data)) {
          this.breadthFirstSearchAux(node, visited);
        }
      });
    }
  }
  
  function comparator(a: number, b: number) {
    if (a < b) return -1;
  
    if (a > b) return 1;
  
    return 0;
  }
  
  const graph = new Graph(comparator);
  graph.addNode(1)
  graph.addNode(2)
  graph.addNode(3)
  graph.addNode(4)
  graph.addNode(5)
  graph.addNode(6)
  graph.addEdge(1, 2)
  graph.addEdge(1, 5)
  graph.addEdge(1, 6)
  graph.addEdge(2, 4)
  graph.addEdge(2, 5)
  graph.addEdge(3, 2)

  graph.depthFirstSearch()
  graph.breadthFirstSearch()

  console.log("list ", graph.removeNode(1))

  console.log("graph ", graph.nodes)