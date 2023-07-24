export class Islands {
    static getNumberOfIslandsDFS(grid) {
      // get dimensions of (m x n) 2d array
      // https://en.wikipedia.org/wiki/Matrix_(mathematics)
      const maxNumRows = grid.length;
      const maxNumCols = grid[0].length
      let numberOfIslands = 0;
      // iterate through each element in the 2d array
      // row first, column second
      for (let rowIndex = 0; rowIndex < maxNumRows; rowIndex++) {
        for (let colIndex = 0; colIndex < maxNumCols; colIndex++) {
          // if the current location is land
          if (grid[rowIndex][colIndex] === '1') {
            // explore the island
            exploreIsland(rowIndex, colIndex);
            // increase number of visited islands
            numberOfIslands++;
          }
        }
      }
      // how recursion function knows when to stop exploring:
      // when all steps in island are visited
      function exploreIsland(rowIndex, colIndex) {
        // mark current location as visited
        grid[rowIndex][colIndex] = 'x';
        // get all possible next steps to visit
        // one for each direction: west, north, east, south
        // diagonals are not valid
        // (steps in one direction are visited fully
        // before steps in another direction are visited)
        let unvisitedDirections = [
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
        ];
        // for each unvisited direction from current location
        for (const direction of unvisitedDirections) {
          // if the direction is valid:
          // next step is not off grid, and is land
          if ((direction.rowIndex >= 0 && direction.rowIndex < maxNumRows)
             && (direction.colIndex >= 0 && direction.colIndex < maxNumCols)
             && grid[direction.rowIndex][direction.colIndex] === '1')
            // go to next step in this direction
            exploreIsland(direction.rowIndex, direction.colIndex);
        }
      }
      // return number of (visited) islands
      return numberOfIslands;
    }
  
    static getNumberOfIslandsBFS(grid) {
      // get dimensions of (m x n) 2d array
      const maxNumRows = grid.length;
      const maxNumCols = grid[0].length
      // space to keep track of unvisited directions
      const unvisitedDirections = [];
      let numberOfIslands = 0;
      // iterate through each element in the 2d array
      // row first, column second
      for (let rowIndex = 0; rowIndex < maxNumRows; rowIndex++) {
        for (let colIndex = 0; colIndex < maxNumCols; colIndex++) {
          // if the current location is land
          if (grid[rowIndex][colIndex] === '1') {
            // explore the island
            exploreIsland(rowIndex, colIndex);
            // increase number of visited islands
            numberOfIslands++;
          }
        }
      }
      // how recursion function knows when to stop exploring:
      // when all steps in island are visited
      function exploreIsland(rowIndex, colIndex) {
        // mark current location as visited
        grid[rowIndex][colIndex] = 'x';
        // add all possible steps to visit from current location to end of array
        // one for each direction: west, north, east, south
        // diagonals are not valid
        // (steps will be visited after all directions
        // in previous level are visited)
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
        // for each unvisited direction from current level
        while(unvisitedDirections.length > 0) {
          // get a direction at current level
          let direction = unvisitedDirections.shift();
          // if the direction is valid:
          // step in the direction is not off grid, and is land
          if ((direction.rowIndex >= 0 && direction.rowIndex < maxNumRows)
              && (direction.colIndex >= 0 && direction.colIndex < maxNumCols)
              && grid[direction.rowIndex][direction.colIndex] === '1') {
            // visit step in the direction
            exploreIsland(direction.rowIndex, direction.colIndex);
            break;
            }
        }
      }
      // return number of (visited) islands
      return numberOfIslands;
    }
  }