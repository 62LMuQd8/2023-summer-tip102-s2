// read CodePath's explanation: https://guides.codepath.org/compsci/Container-With-Most-Water

export class ArrayService {
    // dynamic programming approach
    // exact solution for each subarray (see cache)
    // note: without caching, time complexity is O(n^3),
    //       with caching, time complexity is O(n^2)
    //       (pair each height with every other height)
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
    // typically greedy algorithms are meant for computing approximations, are quick to implement,
    // and returns answer in a reasonable amount of time
    //
    // correct greedy algorithms are optimal solutions, and an optimization over dynamic programming,
    // where instead of looking at every possible combination (DP), greedy makes smart choices on
    // which subproblems to solve in order to reach a globally optimal solution
    //
    // proving that a greedy algorithm, or designing an algorithm in general, requires a background in math and science
    //
    // read CodePath description on greedy algorithms: https://github.com/codepath/compsci_guides/wiki/Greedy-Algorithms
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

        // optimal substructure property
        // keep shrinking the height array in the same way until only one height remains
        while (l < r) {
            // get width
            let w = r - l;
            // get height
            let h = Math.min(height[l], height[r]);
            // calculate area
            // note: we start with left and right pointers as far apart as possible to maximize width
            //
            //       why do we start at max width?
            //
            //       we can start at any width (part of analysis, not part of problem statement)
            //       but then we may need to restart algorithm from scratch and redesign into a
            //       nongreedy algorithm (or modify current implmentation to a different greedy
            //       implementation)
            //
            //       starting at any width (or any criterion that is not max width) may lead to
            //       an alternative way of solving this problem; however, the alternative way of
            //       solving this problem (compare to greedy implementation described in this function)
            //       may not have the same qualities as the implementation described in this function
            //       (the implementation described in this function belongs to a class of algorithms
            //       that quickly and efficiently solves certain types of problems, and therefore,
            //       the implementation described in this function is a quick and efficient solution
            //       to this problem; an alternative implementation may not belong to the same
            //       class as the implementation described in this function, so therefore, there are
            //       no guarantees to whether the alternative way of solving this problem is a quick
            //       and efficient solution; and in general, even if the implementation described
            //       in this function does not belong to a class, we can informally assume that
            //       any two or more implementations have different sets of qualities)
            //
            //       for any pair of heights, we want to maximize the width in order to maximize the area,
            //       so we start with max width and then figure out how to maximize the heights while
            //       minimizing the change in width with a greedy implementation
            //
            //       to say this in another way:
            //
            //       max area = max height * max width
            //
            //       option 1: we know the width (max width for example),
            //                 we have an initial area to maximize,
            //                 we need to optimize height
            //
            //       option 2: we know the height (max height for example),
            //                 we have an initial area to maximize,
            //                 we need to optimize width
            //
            //       option 3: any combination of option 1 and 2
            //                 where we start neither at max width or max height
            //
            //       all options should reach the same max area,
            //       but which option better fits a greedy algorithm?
            //
            //       1. the max element of a collection is the element that is greater than or equal to
            //          any other element in the collection
            //
            //       2. then by definition, there can be only one solution to this problem
            //
            //       3. from dynamic programming (brute force) we know that the max area of the collection
            //          of areas formed by pairing every height with every other height is one area and
            //          is the solution to this problem
            //
            //       4. so to verify the correctness of each option, we can compare the solution
            //          of the algorithm with the solution from dynamic programming
            //
            //       5. for option 2, knowing the pair of highest heights of the whole interval
            //          is like removing the heights between the pair of highest heights
            //          (b/c areas formed between the pair of highest heights are bounded
            //          by the highest heights and smaller widths, so these areas can never be an area
            //          greater than the area formed by the pair of highest heights at the ends of the
            //          subarray)
            //
            //       6. if we ignore the heights between the pair of highest heights,
            //          we are left with more or less the same problem from the start:
            //          what is the max area bounded by two heights and the x-axis?
            //
            //       7. from here, the max area can be found:
            //          a) either entirely to the left of the left highest height
            //          b) or entirely to the right of the right highest height
            //          c) or the max area encloses the positions of the pair of highest heights
            //
            //       8. we can try to continue to find a working algorithm from here (option 2),
            //          or we can go back and look at other options to solve this problem
            //          since we appear to be stuck (heights of the max area can be found
            //          in either one or two subarrays, so we must look in both subarrays;
            //          from where we are now, it looks like dynamic programming can be used
            //          to solve this subproblem, but maybe there is a way to reduce the number
            //          of height combinations; let us backtrack for now, and see if other
            //          options are more profitable)
            //
            //       9. option 3 is similar to option 2: instead of removing heights between
            //          the pair of highest heights, we start at a custom width and look at
            //          the heights before the left highest height, the heights after the right
            //          highest heights, the heights between the left and right highest heights
            //          (since widths are custom selected at the start of the problem,
            //          it is possible that we start with two lowest heights for example,
            //          and so, we would need to look at the heights between the two starting heights),
            //          and the heights in both left and right subarrays formed by the initial heights
            //
            //      10. dynamic programming can be used here to find the max area,
            //          but maybe there is a way to reduce the number of height combinations;
            //          let us backtrack for now, and see if other options are more profitable
            //
            //      11. with option 1, when we start the problem at max width:
            //          a) the only way to increase the area is to decrease the width
            //          b) to improve the area optimization,
            //             i) maximize the heights on either side
            //            ii) minimize the change in width
            //
            //      12. based on these observations, we may be able to transform the problem into
            //          chained subproblems (each subproblem is a subarray from the previous subproblem)
            //          through greedy selection, and this would greatly improve the time complexity
            //          (compare to dynamic programming)
            let area = w * h;
            // update max area tracker
            max = Math.max(max, area);

            // greedy choice property
            // if height at l is less than height at r
            if (height[l] < height[r]) {
                // we move left pointer over 1 unit, for the following reasons:
                //
                // 1. width must decrease by 1 unit (at minimum) on either side
                //
                // 2. area is bounded by the lower height at l or r
                //
                // 3. if we move the pointer on the side that has the higher height:
                //
                //    a) then the area is bounded by the lower height as width constantly decreases
                //
                //    b) when do we decide to move the pointer on the side that has the higher height?
                //
                //    b) when do we decide to move the pointer on the side that has the lower height?
                //
                //    c) to answer these questions, let's go through a few cases of what can happen
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
                //    k) from these examples, we can answer questions b) and c): we are better off moving
                //       the pointer on the side that has the lower height in order to maximize the heights
                //       used in area calculation (width constantly decreases no matter what,
                //       so let's be smart about which pointer we choose to move to maximize height
                //       and consequently area)
                //
                //    l) and these examples show:
                //
                //       i) greedy choice property - the problem can be solved by choosing the choice
                //          that looks the best at the moment, i.e. moving the pointer on the side
                //          that has the lower height in order to maximize area for the whole array
                //
                //      ii) optimal substructure property - the optimal solution to the problem
                //          contains or is derived from the optimal solutions to the subproblems,
                //          i.e. after moving the pointer, we continue to move the pointer on the side
                //          that has the lower height in order to maximize area for the subarray (subproblem)
                //
                //    m) these two properties are what make this algorithm greedy
                //
                // 4. note: in this example height = [3,2,10,5]
                //
                //          the area between intervals 3 and 5 is 9 units^2
                //
                //          then we move the left pointer (from 3 to 2)
                //          and we get the area between intervals 2 and 5, which is 4 units^2
                //
                //          however, if we had moved the right pointer first (from 5 to 10),
                //          then we would have gotten the area between intervals 3 and 10, which is 6 units^2
                //
                //          the goal of the algorithm is to find the max area between 2 heights and x-axis
                //
                //          if along the way of the algorithm we would have obtained
                //          a larger area but less than the max area if we would have decided differently
                //          (not greedily), then the area is not a must have for optimal solution
                //          (remember that we are looking for max area over the whole array,
                //          and not the max area for each subarray of the same width)
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
                // so we are better off moving both left and right pointers in by 1 unit
                l++;
                r--;
                continue;
            }
        }

        return max;
    }
}