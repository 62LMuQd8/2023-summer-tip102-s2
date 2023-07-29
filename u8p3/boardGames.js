export class BoardGames {
  static getNumberOfShips(grid) {
    const maxNumRows = grid.length;
    const maxNumCols = grid[0].length
    let numberOfShips = 0;
    for (let rowIndex = 0; rowIndex < maxNumRows; rowIndex++) {
      for (let colIndex = 0; colIndex < maxNumCols; colIndex++) {
        if(grid[rowIndex][colIndex] === 'X') {
          // we can use DFS or BFS to count ships
          // however, we will make use of problem statement's constraints
          // to simplify the code (by finding an invariant, and counting its occurrences,
          // https://en.wikipedia.org/wiki/Invariant_(mathematics)):
          // there are no adjacent ships, and ships are either 1 x k or k x 1
          // (this means that ships do not share borders ---
          // we can simplify the code by searching for either the front
          // or back of ships, but not both to avoid double counting ships)
          //
          // let's look at one side of the ship, let's say the front,
          // and let's say the ship is surrounded by water, and let's
          // say that the frame of reference for the
          // the front of the ship is defined by the left border and
          // the top border of the grid (and not by the ship ...
          // which means that the segment of the ship that is closest
          // to the left and top borders is the front of the ship,
          // by definition ... alternatively, we could define that
          // the front of the ship is with respect to the right and
          // bottom borders of the grid, and make different observations,
          // but the process of analysis remains the same):
          //
          // 1. when placing a 1 x k ship on the grid,
          //    the left cell of the front of the ship is always water,
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 1, 1, 1, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 1, 1, 1],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //   except when the front of the ship is adjacent
          //   to the grid's left border
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [1, 1, 1, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ]
          //
          // 2. when placing a k x 1 ship on the grid,
          //    the cell on top of the front of the ship is always water
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0]
          //           ],
          //    except when the front of the ship is adjacent
          //    to the grid's top border
          //           [
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 1, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ]
          //
          // 3. combining points number 1 and 2, we see that wherever the
          //    1 x k and k x 1 ships are placed on the grid, the cells
          //    to the left and to the top of the front of the ship are
          //    always water, except when the ships are placed along the
          //    left border and top border (and where the left and top
          //    borders intersect, the top left corner of the grid)
          //
          // 4. when placing a 1 x 1 ship (imagine this is a the front of a ship)
          //    at the top left corner of the grid,
          //           [
          //            [1, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //
          //           [
          //            [0, 1, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //
          //           [
          //            [0, 0, 0, 0, 0],
          //            [1, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //
          //           [
          //            [0, 0, 0, 0, 0],
          //            [0, 1, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0],
          //            [0, 0, 0, 0, 0]
          //           ],
          //
          //    we see that the front of the ship can only be placed
          //    in the following 4 ways:
          //
          //    a) at the top left corner of the grid,
          //       rowIndex = 0, colIndex = 0,
          //
          //    b) along the top border of the grid,
          //       rowIndex = 0, grid[rowIndex][colIndex - 1] = water,
          //
          //    c) along the left border of the grid,
          //       colIndex = 0, grid[rowIndex - 1][colIndex] = water,
          //
          //    d) somewhere away from the left and top borders,
          //       grid[rowIndex][colIndex - 1] = water,
          //       grid[rowIndex - 1][colIndex] = water,
          //
          //    the above 4 conditions can be re-written like this:
          //    (looks like distributive law / FOIL method)
          //
          //    (rowIndex = 0 || grid[rowIndex - 1][colIndex] = water) &&
          //    (colIndex = 0 || grid[rowIndex][colIndex - 1] = water)
          //
          //    above boolean logic can be used to check front of ships,
          //    similar steps can be followed to check back
          //    instead of front of ships

          if ((rowIndex === 0 || grid[rowIndex - 1][colIndex] === '.') &&
              (colIndex === 0 || grid[rowIndex][colIndex - 1] === '.'))
            numberOfShips++;
        }
      }
    }
    return numberOfShips;
  }
}