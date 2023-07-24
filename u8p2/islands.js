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
      // how recursion function knows when to stop exploring:
      // when all steps in island are visited
      function getArea(rowIndex, colIndex) {
        // if current step is valid: not off grid, and is land
        if ((rowIndex >= 0 && rowIndex < maxNumRows)
            && (colIndex >= 0 && colIndex < maxNumCols)
            && Number.parseInt(grid[rowIndex][colIndex]) === 1) {
          // mark current step as visited
          grid[rowIndex][colIndex] = 'x';
          // add all possible steps to be visited to end of list:
          // west, north, east, south
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
          // if current step is valid: not off grid, or is land
          // get a direction at current level
          let direction = unvisitedDirections.shift();
          // island area is area of current step plus area of steps at all level
          return 1 + (direction !== undefined ?
            getArea(direction.rowIndex, direction.colIndex) : 0);
        }
        // if current step is not valid: off grid, or is water
        // get a direction at current level
        let direction = unvisitedDirections.shift();
        // island area is area of current step plus area of steps at all level
        return 0 + (direction !== undefined ?
            getArea(direction.rowIndex, direction.colIndex) : 0);
      }
      // return max island area
      return maxIslandArea;
    }
  }