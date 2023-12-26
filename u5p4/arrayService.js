// read CodePath's explanation: https://guides.codepath.org/compsci/Container-With-Most-Water

export class ArrayService {
    // dynamic programming approach
    // exact solution for each subarray (see cache)
    static maxWaterRecursion(height) {
        // storing results of overlapping subproblems
        let cache = new Map();
        // start recursion
        return maxArea(0, height.length - 1);

        // let max = maxArea(0, height.length - 1);
        // console.log(cache);
        // return max;

        function maxArea(l, r) {
            // base case: l and r must be at least 1 unit apart
            if ((r - l) < 1) return 0;

            // create composite key
            let key = [l, r];
            // if max area previously calculated for subarray, return max area
            if(cache.has(key.toString())) return cache.get(key.toString());

            // get width (area is bounded by x-axis)
            let w = r - l;
            // get height (area is bounded by shortest height)
            let h = Math.min(height[l], height[r]);

            // calculate max area for subarray by finding max area between:
            // 1. current width
            // 2. removing 1 unit of width from left side
            // 3. removing 1 unit of width from right side
            // 4. removing 1 unit of width from left and right sides
            let max = Math.max(w * h, maxArea(l + 1, r), maxArea(l, r - 1), maxArea(l + 1, r - 1));

            // cache max area for subarray
            cache.set(key.toString(), max);

            // return max area for subarray
            return max;
        }
    }

    // greedy approximation: https://en.wikipedia.org/wiki/Greedy_algorithm
    // algorithms not designed for exact solution but for approximations
    //            are (or should be) quick to implement
    //            returns answer in resonable amount of time
    // sometimes greedy algorithms are also the optimal solution (read more in ref link)
    static maxWaterIterative(height) {
        // start at subarray with max width
        // which is when l is at start of array
        let l = 0;
        // r is at end of array
        let r = height.length - 1;
        // keep track of max area
        let max = 0;

        // keep calculating until l and r met (width of 0)
        while (l < r) {
            // get width
            let w = r - l;
            // get height
            let h = Math.min(height[l], height[r]);
            // calculate area
            let area = w * h;
            // update max area tracker
            max = Math.max(max, area);

            // if height at l is less than height at r
            if (height[l] < height[r]) {
                // we move left height over 1 unit
                // b/c width must decrease by 1 unit on either side
                // and area is limited by the min height of l and r,
                // if we decrement the side that has the larger height
                // then the area can never be more than the side with the lower height as the width constantly decreases
                // however if we decrement the side that has the smaller height
                // then the area may be smaller than the current area, but it also has the potential to bigger than current area
                // b/c the side with the larger height can match the side the smaller height so that the area can increase
                // therefore the locally optimal choice is to move the side that has the smaller side
                l++;
                continue;
            }
            // likewise if height at r is less than height at l
            if (height[l] > height[r]) {
                // we move right height over 1 unit
                r--;
                continue;
            }

            // finally if the height at l is equal to the height at r
            if (height[l] === height[r]) {
                // we move both left and right heights inward 1 unit
                // b/c the area cannot increase as width constantly decreases
                // so we take a chance on both l and r
                // to see if both heights increase enough to increase area as width constantly decreases
                l++;
                r--;
                continue;
            }
        }

        return max;
    }
}