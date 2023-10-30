import {BinaryMinHeap} from "./priority-queue"

type Edge = {
    to: number, // destination node of edge
    weight: number // weight of edge
}

class Graph {
    private nodes: Map<number, Edge[]>;

    constructor(){
        this.nodes = new Map();
    }

    addNode(node: number){
        if(!this.nodes.has(node)){
            this.nodes.set(node, []);
        }
    }

    addEdge(from: number, to: number, weight: number){
        this.addNode(from);
        this.addNode(to);
        this.nodes.get(from)!.push({to, weight});
    }

    getNeighbors(node: number): Edge[] {
        return this.nodes.get(node) || [];
    }

    getNodeCount(): number {
        return this.nodes.size;
    }

    removeEdge(from: number, to: number) {
        const edges = this.nodes.get(from);
        if (edges) {
          const index = edges.findIndex(edge => edge.to === to);
          if (index !== -1) {
            edges.splice(index, 1);
          }
        }
    }

}


const dijkstra = (graph: Graph, start: number): { dist: number[], prev: number[] } => {
    const n = graph.getNodeCount(); // amount of nodes 
    const dist = Array(n).fill(Number.MAX_VALUE); 
    const prev = Array(n).fill(-1)
    const pq = new BinaryMinHeap(); // to hold the ordered distances between nodes

    pq.insert(start, 0); // first node with a distance of zero from itself
    
    dist[start] = 0; // Start has a distance of zero 

    while(!pq.isEmpty()) { // loop through all nodes
        const {item: u, value: distU} = pq.extractMin(); // node,distance pair of shortest path to current node

        // Skip this node if it has an outdated distance value
        if (distU !== dist[u]) continue;

        // update distances of visited neighbor nodes relative to current
        for(const {to, weight} of graph.getNeighbors(u)){
            if(dist[u] + weight < dist[to]) {
                dist[to] = dist[u] + weight;
                pq.insert(to, dist[to]);
                prev[to] = u;
            }
        }
    }

    return {dist, prev};
}

const findAlmostShortestPath = (graph: Graph, start: number, end: number): number => {
    // First run of Dijkstra to find the initial shortest paths
    const {dist, prev} = dijkstra(graph, start);

    // If the initial distance is still infinity, there is no path
    if (dist[end] === Number.MAX_VALUE) {
        console.log('No path found from', start, 'to', end);
        return -1;
    }

    // Reconstruct all shortest paths from start to end
    let paths = findAllShortestPaths(prev, end);

    // Remove all edges of all shortest paths found
    paths.forEach(path => {
        for (let i = 0; i < path.length - 1; i++) {
            graph.removeEdge(path[i], path[i + 1]);
        }
    });

    // Second run of Dijkstra to find the almost shortest path
    const almostShortest = dijkstra(graph, start);

    // Return the length of the almost shortest path or -1 if no path exists
    return almostShortest.dist[end] === Number.MAX_VALUE ? -1 : almostShortest.dist[end];
};

const findAllShortestPaths = (prev: number[], end: number, path: number[] = []): number[][] => {
    if (end === -1) {
        return [path];
    }
    return findAllShortestPaths(prev, prev[end], [end, ...path]);
};

const input = 
`4 5
0 2
0 1 1
0 3 5
1 2 2
1 3 1
3 2 1
0 0`;

const [nodeEdgeLine, pathLine, ...edgeLines] = input.split('\n');
const [numNodes, numEdges] = nodeEdgeLine.split(' ').map(Number);
const [start, end] = pathLine.split(' ').map(Number);

const graph = new Graph();

edgeLines.forEach(line => {
    const [from, to, weight] = line.split(' ').map(Number);
    graph.addEdge(from, to, weight);
});

const almostShortestPathLength = findAlmostShortestPath(graph, start, end);
if (almostShortestPathLength !== -1) {
    console.log(almostShortestPathLength);
} else {
    console.log("-1");
}


