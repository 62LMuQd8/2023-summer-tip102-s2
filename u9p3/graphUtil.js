export class GraphUtil {
    static findDFS(n, edges, source, destination) {
      // get adjacency list for undirected graph
      const adjList = GraphUtil.adjacencyList(edges);
      // create visited array to avoid cycles
      const visited = Array(n).fill(0);
      // flag to indicate whether path exists
      let ans = false;
      // call dfs with starting location and target location
      dfs(source, destination);
      // each call to dfs adds function to stack
      // code will continue to traverse along main path
      // or branch (after backtracking or after a function ends/returns)
      function dfs(curr, target) {
        // mark node as visited
        visited[curr] = 1;
        // if node is destination node, set indicator flag
        if (curr === target) ans = true;
        let iterable = adjList.get(curr);
        // check each adjacent nodes
        for (const node of iterable ? iterable : []) {
          // visit adjacent node if not visited yet
          if (!visited[node]) dfs(node, target);
        }
      }
      // return answer (whether there is path from source to destination)
      return ans;
    }
    static findBFS(n, edges, source, destination) {
      // get adjacency list for undirected graph
      const adjList = GraphUtil.adjacencyList(edges);
      // create visited array to avoid cycles
      const visited = Array(n).fill(0);
      // create queue for bfs traversal
      const queue = [];
      // flag to indicate whether path exists
      let ans = false;
      // call bfs with starting location and target location
      bfs(source, destination);
      function bfs(curr, target) {
        // mark node as visited
        visited[curr] = 1;
        // if node is destination node, set indicator flag
        if (curr === target) ans = true;
        let iterable = adjList.get(curr);
        // add adjacent nodes to end of queue
        if (iterable !== undefined) queue.push(...adjList.get(curr));
        // while there are nodes in the queue
        while (queue.length > 0) {
          // get node from queue
          let node = queue.shift();
          // if node has not been visited yet
          if (!visited[node]) {
            // visit node
            visited[node] = 1;
            // if node is destination node, set indicator flag
            if (node === target) ans = true;
            iterable = adjList.get(node);
            // add adjacent nodes to end of queue
            if (iterable !== undefined) queue.push(...adjList.get(node));
          }
        }
      }
      // return answer (whether there is path from source to destination)
      return ans;
    }
    // function builds adjacency list for undirected graph,
    // this means that (i, j) and (j, i) represent the same edge,
    // and should be reflected in list accordingly:
    // for node i in map, the set value should contain node j
    // because (i, j) are adjacent; for node j in map, the set value
    // should contain node i because (j, i) are adjacent
    static adjacencyList(edges) {
      // adjacency list is a map
      const adjList = new Map();
      // for each edge (i, j)
      for (const edge of edges) {
        // if node i exists in map
        if (adjList.has(edge[0])) {
          // add node j to set
          adjList.get(edge[0]).add(edge[1]);
        } else {
          // else create set at node i,
          // with initial value of node j in set
          adjList.set(edge[0], new Set([edge[1]]));
        }
        // if node j exists in map
        if (adjList.has(edge[1])) {
          // add node i to set
          adjList.get(edge[1]).add(edge[0]);
        } else {
          // else create set node j,
          // with inital value of node i in set
          adjList.set(edge[1], new Set([edge[0]]));
        }
      }
      // return adjacency list
      return adjList;
    }
  }