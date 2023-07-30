export class Town {
    // n is number of town folks
    // trust is array of trust pairs (i, j),
    // where person i trusts person j
    // trust is also an edge set/list
    static find(n, trust) {
      // create adjacency matrix
      const adjMatrix = Array.from(Array(n), () => Array(n).fill(0));
      // update adjacency matrix for each edge in set/list
      for (const pair of trust) {
        adjMatrix[pair[0] - 1][pair[1] - 1] = 1;
      }
      // condition 1: judge trusts nobody
      // check if there is row with all zeros
      // note: matrix is zero-based, town folks is one-based
      let qualifierIndex;
      for (const row of adjMatrix) {
        if (row.every(x => x === 0))
          qualifierIndex = adjMatrix.indexOf(row);
      }
      // if matrix does not contain a row with all zeros
      // judge does not exist, therefore return -1
      if (qualifierIndex === undefined) return -1;
      // condition 2: everyone trusts judge
      // column representing qualifier from previous step
      // should have n - 1 town folks who trust qualifier
      let column = adjMatrix.map((row) => row[qualifierIndex]);
      let sum = column.reduce((total, value) => total + value, 0);
      // return qualifier (who is judge) b/c everyone trusts qualifier,
      // and qualifier trusts no one (not even themselves)
      if (sum === n - 1) return qualifierIndex + 1;
      // return -1 in case not exactly n - 1 town folks trust qualifier
      return -1;
    }
  }