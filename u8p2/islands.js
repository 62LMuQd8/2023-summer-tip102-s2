export class Islands {
  static getMaxIslandAreaDFS(grid) {
    // get dimensions of (m x n) 2d array
    // https://en.wikipedia.org/wiki/Matrix_(mathematics)
    const maxNumRows = grid.length;
    const maxNumCols = grid[0].length
    // default maxIslandArea is zero because no islands visited yet
    let maxIslandArea = 0;
    // iterate through each element in the 2d array
    // row first, column second
    for (let rowIndex = 0; rowIndex < maxNumRows; rowIndex++) {
      for (let colIndex = 0; colIndex < maxNumCols; colIndex++) {
        // if the current location is land
        if (Number.parseInt(grid[rowIndex][colIndex]) === 1) {
          // get maxIslandArea by comparing current maxIslandArea with area of current island
          maxIslandArea = Math.max(maxIslandArea, getArea(rowIndex, colIndex))
        }
      }
    }
    // how recursion function knows when to stop exploring:
    // when all steps in island are visited
    function getArea(rowIndex, colIndex) {
      // if current step is valid: not off grid, and is land
      if ((rowIndex >= 0 && rowIndex < maxNumRows)
          && (colIndex >= 0 && colIndex < maxNumCols)
          && Number.parseInt(grid[rowIndex][colIndex]) === 1) {
        // mark current step as visited
        grid[rowIndex][colIndex] = 'x';
        // area of the island is the area of the current step
        // plus the area of the steps in the 4 directions:
        // west, north, east, south
        return 1 + getArea(rowIndex, colIndex - 1) + getArea(rowIndex - 1, colIndex)
          + getArea(rowIndex, colIndex + 1) + getArea(rowIndex + 1, colIndex);
      }
      // if current step is not valid, area of the step is 0
      return 0;
    }
    // return max island area
    return maxIslandArea;
  }

  static getNumberOfIslandsBFS(grid) {
    // get dimensions of (m x n) 2d array
    const maxNumRows = grid.length;
    const maxNumCols = grid[0].length
    // space to keep track of unvisited directions
    const unvisitedDirections = [];
    // default maxIslandArea is zero because no islands visited yet
    let maxIslandArea = 0;
    // iterate through each element in the 2d array
    // row first, column second
    for (let rowIndex = 0; rowIndex < maxNumRows; rowIndex++) {
      for (let colIndex = 0; colIndex < maxNumCols; colIndex++) {
        // if the current location is land
        if (Number.parseInt(grid[rowIndex][colIndex]) === 1) {
          // get maxIslandArea by comparing current maxIslandArea with area of current island
          maxIslandArea = Math.max(maxIslandArea, getArea(rowIndex, colIndex))
        }
      }
    }
    // note: BFS can be written as a recursive function;
    // however, a queue must still be used by the function
    // to keep track of directions; due to this observation,
    // it is better to write BFS iteratively, e.g. queue
    // with while loop, than recursively (recursion primarily
    // serves as a looping mechanism here that requires add. space)
    function getArea(rowIndex, colIndex) {
      // area starts at 1 because starting location is valid
      // see code above that calls getArea function
      let area = 1;
      // mark starting location as visited
      grid[rowIndex][colIndex] = 'x';
      // add all possible directions to visit next to queue
      updateDirections(rowIndex, colIndex);
      // while there are still directions to visit
      while(unvisitedDirections.length > 0) {
        // get a direction from queue
        let direction = unvisitedDirections.shift();
        // if direction is valid: not off grid, and is land,
        // and has not be visited
        if ((direction.rowIndex >= 0 && direction.rowIndex < maxNumRows)
            && (direction.colIndex >= 0 && direction.colIndex < maxNumCols)
            && Number.parseInt(grid[direction.rowIndex][direction.colIndex]) === 1) {
          // visit new location in the direction by updating area
          area++;
          // and marking new location as visited
          grid[direction.rowIndex][direction.colIndex] = 'x';
          // add all possible directions from new location to end of queue
          // (to visit in the future)
          updateDirections(direction.rowIndex, direction.colIndex);
        }
      }
      // return area of island
      return area;
    }
    // helper function to add new directions to end of queue
    function updateDirections(rowIndex, colIndex) {
      // add all possible steps to visit from current location to end of array;
      // one for each direction: west, north, east, south;
      // diagonals are not valid;
      // (steps will be visited after all directions in previous level are visited)
      unvisitedDirections.push(
        {
          'rowIndex': rowIndex,
          'colIndex': colIndex - 1
        },
        {
          'rowIndex': rowIndex - 1,
          'colIndex': colIndex
        },
        {
          'rowIndex': rowIndex,
          'colIndex': colIndex + 1
        },
        {
          'rowIndex': rowIndex + 1,
          'colIndex': colIndex
        }
      );
    }
    // return max island area
    return maxIslandArea;
  }
}