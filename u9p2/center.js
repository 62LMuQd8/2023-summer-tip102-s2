// https://www.geeksforgeeks.org/check-star-graph/
export class Center {
    // edges is a set/list of edges that complete a star
    // a star is defined as a center node with n - 1 edges,
    // where n is the number of nodes
    static find(edges) {
      // create adjacency matrix
      let n = edges.length + 1;
      const adjMatrix = Array.from(Array(n), () => Array(n).fill(0));
      // update adjacency matrix for each edge in set/list
      // note: graph is undirected, this means that (i, j) and (j, i)
      // represent the same edge, and should be marked in matrix accordingly;
      // matrix is zero-based, nodes is one-based
      for (const edge of edges) {
        adjMatrix[edge[0] - 1][edge[1] - 1] = 1;
        adjMatrix[edge[1] - 1][edge[0] - 1] = 1;
      }
      // for each node (represented by column),
      // check its number of edges (1 represents an edge),
      // node with n - 1 edges is center node
      for (let i = 0; i < n; i++) {
        let column = adjMatrix.map((row) => row[i]);
        let sum = column.reduce((total, value) => total + value, 0);
        if (sum === edges.length) return i + 1;
      }
      // something unexpected happened, return -1
      return  -1;
    }
  }