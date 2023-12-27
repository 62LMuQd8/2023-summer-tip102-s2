// read CodePath's explanation: https://guides.codepath.org/compsci/Container-With-Most-Water

export class ArrayService {
    // dynamic programming approach
    // exact solution for each subarray (see cache)
    // note: without caching, time complexity is O(n^3),
    //       with caching, time complexity is O(n^2)
    //       can we do better?
    static maxWaterRecursion(height) {
        // storing results of overlapping subproblems
        let cache = new Map();
        // start recursion
        return maxArea(0, height.length - 1);

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

    // greedy algorithms: https://en.wikipedia.org/wiki/Greedy_algorithm
    //
    // typically greedy algorithms are meant for computing approximations, quick to implement,
    // and returns answer in resonable amount of time
    //
    // correct greedy algorithms are optimal solutions, and an optimization over dynamic programming,
    // where instead of looking at every possible combination (DP), greedy makes smart choices on
    // which subproblems to solve in order to reach a globally optimal solution
    //
    // proving that a greedy algorithm, or designing algorithms in general, requires a background in math and science
    //
    // read CodePath description of greedy algorithms: https://github.com/codepath/compsci_guides/wiki/Greedy-Algorithms
    //
    // additional context on greedy algorithms: https://web.stanford.edu/class/archive/cs/cs161/cs161.1166/lectures/lecture14.pdf
    //
    // example of a greedy algorithm: https://www.cs.ucdavis.edu/~bai/ECS122A/Notes/ActivitySelect.pdf
    //
    // time complexity of this approach is O(n), an improvement over DP (from polynomial time to linear time)
    static maxWaterIterative(height) {
        // start at subarray with max width
        // which is when l is at start of array
        let l = 0;
        // r is at end of array
        let r = height.length - 1;
        // keep track of max area
        let max = 0;

        // keep shrinking the height array in the same way until only one height remains (optimal substructure)
        while (l < r) {
            // get width
            let w = r - l;
            // get height
            let h = Math.min(height[l], height[r]);
            // calculate area
            // note: we start with left and right pointers as far apart as possible to maximize width
            //       max area = max height * max width (greedy choice property)
            let area = w * h;
            // update max area tracker
            max = Math.max(max, area);

            // if height at l is less than height at r
            if (height[l] < height[r]) {
                // we move left pointer over 1 unit, for the following reasons:
                //
                // 1. width must decrease by 1 unit (at minimum) on either side
                //
                // 2. area is limited by the lower height at l or r
                //
                // 3. if we move the pointer on the side that has the higher height:
                //
                //    a) then the area is bounded by the lower height as width constantly decreases
                //
                //    b) when do we decide to move the pointer on the side that has the higher height?
                //
                //    b) when do we decide to move the pointer on the side that has the lower height?
                //
                //    c) to be more clear, let's go through a few of cases of what can happen
                //       when we just move the pointer on the side that has the higher height:
                //
                //    d) if we encounter a height that is less than the higher height,
                //       the area is bounded by a smaller width and two heights less than the higher height
                //
                //    e) if we encounter a height that is equal to the higher height,
                //       the area is bounded by a smaller width and the same two heights
                //       we saw at the start of the search
                //
                //    f) if we encounter a height that is greater than the higher height,
                //       the area is bounded by a smaller width and the lower height
                //       (higher height matches lower height so that area is rectangle)
                //
                //    g) in all three cases (d - f), the new areas are less than or equal to
                //       the initial area when the two pointers where furthest apart
                //
                //    h) to optimize the heights in d), we could move the pointer
                //       on the side that has the lower height to where the pointer is in d)
                //       in the case that the new height is less than the higher height but greater than the lower height
                //       (and in the case that the new height is less than both the higher and lower heights,
                //       there is no advantage to prioritizing either side)
                //
                //    i) to optimize the heights in e), we could move the pointer
                //       on the side that has the lower height to where the pointer is in e),
                //       then the full heights on both sides can be utilized
                //
                //    j) similiarly, to optimize the heights in f), we could move the pointer,
                //       on the side that has the lower height to where the pointer is in f),
                //       so that we can utilize the full height of the higher height (from initial position)
                //
                //    k) from these examples, we see that we are better off moving the pointer
                //       on the side that has the lower height in order to maximize the heights
                //       used in area calculation (width constantly decreases no matter what,
                //       so that's be smart which pointer we choose to move to maximize height and area)
                //
                // 4. note: in this example height = [3,2,10,5]
                //
                //          the area between intervals 3 and 5 is 9 units^2
                //
                //          then we move the left pointer (from 3 to 2)
                //          and we get the area between intervals 2 and 5, which is 4 units^2
                //
                //          however, if we had moved the right pointer first (from 5 to 10),
                //          then we would have gotten the area between intervals 3 and 10 is 6 units^2
                //
                //          the goal of the algorithm is to find the max area between 2 heights and x-axis
                //
                //          if along the way of the algorithm we would have obtained
                //          a larger area but less than the max area if we would have decided differently
                //          (not greedily), then the area is not a must have for optimal solution
                //          (remember that we are looking for max area over the whole array,
                //          and not the max area for each subarray)
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
                // we move both left and right pointers in by 1 unit
                // b/c in current position, the full heights at left and right pointer
                // are used in the area calculation:
                // 1. if we only move one pointer and the next height is greater than
                //    or equal to the current height, the next area will be smaller than
                //    the current area because area is bounded by a smaller width
                //    but the height remains the same
                // 2. and if we the next height is less than the current height, the next area
                //    will be smaller than the current area because area is bounded by a smaller width
                //    and lower height
                // so we are better of moving both left and right pointers in by 1 unit
                l++;
                r--;
                continue;
            }
        }

        return max;
    }
}