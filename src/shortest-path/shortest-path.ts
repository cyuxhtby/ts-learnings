type Edge = {
    to: number, // destination node of edge
    weight: number // weight of edge
}

const dijkstra = (graph: Edge[][], start: number, end: number): number[] => {
    const n = graph.length; // amount of nodes 
    const dist = Array(n).fill(Number.MAX_VALUE); // array to hold the distance between nodes, all set to a default of infinity
    const visited = Array(n).fill(false); // memory of which nodes have been visited
    dist[start] = 0; // Start has a distance of zero 

    // visit all nodes and update vistited and distance
    for(let i = 0; i < n; i++){
        let u = -1; // node to process next
        for (let j = 0; j < n; j++){
            // set the next unvisited node with the shortest distance as the next one to process
            if (!visited[j] && (u === -1 || dist[j] < dist[u])){
                u = j;
            }
            // check if the next node to process is currently unreachable
            if (dist[u] === Number.MAX_VALUE){
                break;
            }

            visited[u] = true;

            // updates the distances for visited nodes
            for (const {to, weight} of graph[u]){
                dist[to] = Math.min(dist[to], dist[u] + weight);
            }
        }
    }

    return dist;
}