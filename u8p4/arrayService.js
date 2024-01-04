export class ArrayService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Rotting-Oranges
    static orangesTime(grid) {
        // we use a queue because figuring out the number of minutes elapsed is like BFS traversal
        // we want to know which fresh oranges are we able to reach from rotting oranges within each pass
        // in BFS we want to explore all nodes at one level before exploring all nodes at next level
        let queue = [];
        // keep track of total fresh oranges so that we know
        // if there are any fresh oranges remaining on grid after final time
        // b/c some fresh oranges are surrounded by empty squares (four directions, excluding diagonals)
        // or borders (fresh oranges at a corner with empty squares in nondiagonal directions)
        let freshOranges = 0;

        // go through grid and record location of rotting oranges and count fresh oranges
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                if (grid[r][c] === 2) queue.push([r, c]);
                if (grid[r][c] === 1) freshOranges++;
            }
        }

        // after visting the last fresh orange from a rotting orange
        // another rotting orange is placed at the end of the queue so that we can check
        // whether the new rotting orange is able to visit another fresh oranges
        // (but this last pass does not count towards number of minutes elapsed
        // if there are no more fresh oranges on the grid), so,
        // total minutes elapsed = number of passes through queue - 1
        let numberOfPasses = 0;
        let directionDeltas = [[-1,0], [0,1], [1,0], [0,-1]];

        // add a marker to denote the end of one pass through the grid
        // this marker at the beginning is needed even if
        // there are no fresh oranges initially on the grid
        // see above for reason why this is the case
        queue.push([]);

        // continue to check whether there are fresh oranges to visit from rotting oranges
        while (queue.length !== 0) {
            // get next rotting orange location
            let locationRO = queue.shift();

            // if location is of length zero
            // we know that this is a special location
            // that marks the end of one pass through the grid
            if (locationRO.length === 0) {
                // then add one pass to the total passes
                numberOfPasses++;
                // if there are more rotting oranges to check at the end of the current pass
                // then add a marker to the queue to denote where in the queue is the end of the next pass
                if (queue.length !== 0) queue.push([]);
            } else {
                // for each direction
                for (const d of directionDeltas) {
                    // add back deltas to current location to get new location in direction
                    let neighborRow = locationRO[0] + d[0];
                    let neighborCol = locationRO[1] + d[1];

                    // if new location in direction is not out of bounds (off grid)
                    if ((neighborRow >= 0 && neighborRow < grid.length) &&
                        (neighborCol >= 0 && neighborCol < grid[0].length)) {
                        // if new location in direction contains a fresh orange
                        if (grid[neighborRow][neighborCol] === 1) {
                            // then change fresh orange to rotting orange
                            grid[neighborRow][neighborCol] = 2;
                            // subtract one from fresh orange counter
                            freshOranges--;
                            // and add new rotting orange location to queue
                            queue.push([neighborRow, neighborCol]);
                        }
                    }
                }
            }
        }

        // return total minutes needed to change all fresh oranges and -1 if not all fresh oranges changed
        return freshOranges === 0 ? numberOfPasses - 1 : -1;
    }
}