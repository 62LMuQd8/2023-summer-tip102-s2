export class ArrayService {
    static search(nums, target) {
        // get max value of left subarray (or max value of array in case of no rotation)
        let max = findMax(nums);

        // search target
        let maxLeftHalf = binary(0, max);
        let maxRightHalf = binary(max + 1, nums.length - 1);

        // target not found on either half
        if (maxLeftHalf === null && maxRightHalf === null) return -1;

        // return answer (we use nullish coalescing operator)
        return (maxLeftHalf ?? 0) + (maxRightHalf ?? 0)

        // we return an index (index cannot be negative in JS)
        function binary(start, end) {
            // left pointer
            let l = start;
            // right pointer
            let r = end;

            // continue searching through remaining values
            while (l <= r) {
                // get midpoint
                let m = Math.trunc((l + r) / 2);

                // if value at m = target, we found target
                if (nums[m] === target) return m;

                // else keep searching
                // if value at m is greater than target
                if (nums[m] > target) {
                    // look at left half
                    r = m - 1;
                } else {
                    // else value at m is less than target
                    // look at right half
                    l = m + 1;
                }
            }

            // target not found
            return null;
        }

        // reuse code from u3p4
        // we return an index (index cannot be negative in JS)
        function findMax(nums) {
            // left pointer begins at start of array
            let l = 0;
            // right pointer begins at end of array
            let r = nums.length - 1;

            // max undefined for empty array
            if (nums.length === 0) return -1;

            // max is first value for single value array
            if (nums.length === 1) return 0;

            // no rotation, so return end of array
            if (nums[l] < nums[r]) return r;

            // keep searching until left and right pointers meet
            while (l < r) {
                // get midpoint
                let m = Math.trunc((l + r) / 2);

                // if rotated past or at midpoint
                if (nums[m] > nums[r]) {
                    // then smallest value is to the right of midpoint
                    l = m + 1
                } else {
                    // else smallest value is at least midpoint
                    r = m
                }
            }

            // max value is to left of smallest value
            return r - 1;
        }
    }

    // constraints:
    //
    // 1. if nums = [0,1,2,4,5,6,7],
    //                     ^
    //    then pivoted array at index 3 is [5,6,7,4,0,1,2] <--- (bug pivot implements this)
    //                                            ^
    //    rather than [4,5,6,7,0,1,2] (what problem statement asked)
    //                 ^
    // 2. pivot index k is (1 <= k < nums.length)
    //
    static findBugPivot(nums) {
        // ---------------------------------------------------------------------------------------------------------------------------------
        // odd number of elements in nums array
        // 
        // nums = [1, 2, 3, 4, 5, 6, 7]
        //                  m
        //
        // when pivot is 4, then array becomes: (l > m, r < m)
        //
        // nums = [5, 6, 7, 4, 1, 2, 3]
        //                  p
        //                  m
        //
        // when pivot is 2, then array becomes: (l < m, r < m)
        //
        // nums = [3, 4, 5, 6, 7, 2, 1]
        //                  m     p
        //
        // when pivot is 6, then array becomes: (l > m, r > m)
        //
        // nums = [7, 6, 1, 2, 3, 4, 5]
        //            p     m
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        //
        // even number of elements in nums array
        //
        // nums = [1, 2, 3, 4, 5, 6]
        //               m
        //
        // when pivot is 3, then array becomes: (l < m, r < m)
        //
        // nums = [4, 5, 6, 3, 1, 2]
        //               m  p
        //
        // when pivot is 2, then array becomes: (l < m, r < m)
        //
        // nums = [3, 4, 5, 6, 2, 1]
        //               m     p
        //
        // when pivot is 5, then array becomes: (l > m, r > m)
        //
        // nums = [6, 5, 1, 2, 3, 4]
        //            p  m
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        //
        // from the examples above, we see the following patterns:
        //
        // 1. in either case, when the pivot is past the midpoint,
        //    then values at l and r are greater than the value at m
        //    b/c the new midpoint will be within the left subarray (from before pivoting;
        //    all values in the left subarray are sorted in ascending order; and after pivoting
        //    we are looking at the end of the left subarray from before pivoting),
        //    and all values in the right subarray (from before pivoting) are larger than the new midpoint
        //
        // 2. in either case, when the pivot is before the midpoint,
        //    then values at l and r are less than the value at m
        //    b/c the new midpoint will be within the right subarray (from before pivoting;
        //    all values in the right subarray are sorted in ascending order; and after pivoting
        //    we are looking at the start of the right subarray from before pivoting),
        //    and all values in the left subarray (from before pivoting) are smaller than the new midpoint
        //
        // 3. when there are odd number of elements in nums array, and the pivot is the midpoint,
        //    the all values in the left subarray (from before pivoting) are less than new midpoint (same midpoint as before pivoting)
        //    and all values in the right subarray (from before pivoting) are greater than new midpoint,
        //    so after pivoting, the value at l is greater than the value at m and the value at r is less than the value at m
        // 
        // 4. however, when there are even number of elements in nums array, and the pivot is the midpoint,
        //    after pivoting, the new midpoint will be in the right subarray (from before pivoting)
        //    b/c there is no midpoint that evenly divides the left and subarray,
        //    which means that the values at l and r will be less than the value at m
        //    (all values in the left subarray from before pivoting are less than the values in the right subarray from before pivoting,
        //    values are sorted in ascending order in either subarrays; and the new midpoint is in the right subarray from before pivoting)
        //
        // 5. these details can be summarized by just looking at the pointers m and p after pivoting:
        //
        //    a) if the pivot p is after the midpoint m, then the condition is (l < m, r < m)
        //    b) if the pivot p is before the midpoint m, then the condition is (l > m, r > m)
        //    c) else the pivot p must be at the midpoint m, then the condition is (l > m, r < m)
        //    d) finally (following the pattern) if p does not exist, then the condition is (l < m, r > m)
        //
        // left pointer begins at start of nums array
        let l = 0;
        // right pointer begins at end of nums array
        let r = nums.length - 1;

        // following table shows the size of left and right subarrays
        // when roughly dividing in half the size of big array:
        //
        // array size of 12  --->  left subarray size of  6  and right subarray size of  7
        // array size of 11  --->  left subarray size of  6  and right subarray size of  6
        // array size of 10  --->  left subarray size of  5  and right subarray size of  6
        // array size of  9  --->  left subarray size of  5  and right subarray size of  5
        // array size of  8  --->  left subarray size of  4  and right subarray size of  5
        // array size of  7  --->  left subarray size of  4  and right subarray size of  4
        // array size of  6  --->  left subarray size of  3  and right subarray size of  4
        // array size of  5  --->  left subarray size of  3  and right subarray size of  3
        // array size of  4  --->  left subarray size of  2  and right subarray size of  3
        // array size of  3  --->  left subarray size of  2  and right subarray size of  2
        // array size of  2  --->  left subarray size of  1  and right subarray size of  2
        // array size of  1  --->  left subarray size of  1  and right subarray size of  1
        //
        // looking at the table, we see that when array is around size of 6
        // the subarrays begin to break down into base case starting at size of 3
        // (b/c of l and r pointers overlapping with m)
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        //
        // one element in nums array
        //
        // nums = [1]
        //         m
        //
        // the pivot cannot be 1 because of contraints
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        //
        // two elements in nums array
        //
        // nums = [1, 2]
        //         m
        //
        // when pivot is 2, then array becomes: (l = m, r < m)
        //
        // nums = [2, 1]
        //         p
        //         m
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        // three elements in nums array
        //
        // nums = [1, 2, 3]
        //            m
        //
        // when pivot is 2, then array becomes: (l > m, r < m)
        //
        // nums = [3, 2, 1]
        //            p
        //            m
        //
        // when pivot is 3, then array becomes: (l > m, r > m)
        //
        // nums = [3, 1, 2]
        //         p  m
        //
        // ---------------------------------------------------------------------------------------------------------------------------------
        //
        // from the examples above, we see the following patterns:
        //
        // 1. when nums array contains only 1 element, there can be no valid base case
        //    b/c per constraints, the first element in nums array cannot be used as a pivot
        //
        // 2. after pivoting a nums array with only 2 elements, there is no value to the left of the pivot,
        //    so we can temporarily ignore the condition (l = m) to see if doing so is profitable
        //
        // 3. when nums array contains 3 elements, there are two valid base cases, and in both cases,
        //    there is the condition (l > m), let us ignore this condition like we did in observation 2.
        //    (b/c the condition does not distinguish either base cases since the condition appears in both cases)
        //    and see if doing so is profitable
        //
        // 4. looking at what remains:
        //
        //    a) when (r < m), then the pivot is the midpoint:
        //
        //       this is an instance of the condition (l > m, r < m)
        //       let's account for this base case under this condition
        //
        //    b) when (r > m), then the pivot is the left pointer:
        //
        //       the remaining base cases break down into two element nums array,
        //       where the pivot is always the value where the left pointer is pointing to
        //
        // keep searching min 2 element array until answer is found (pivot for 1 element array is undefined)
        while (l < r) {
            // get midpoint
            let m = Math.trunc((l + r) / 2);

            // base case: pivot does not exist
            if (nums[l] < nums[m] && nums[r] > nums[m]) return -1;

            // base case: pivot is midpoint
            if (nums[l] > nums[m] && nums[r] < nums[m]) return m;

            // base case: in two element array, pivot is always left value
            if ((r - l) < 2) return l;

            // searching: if pivot is after midpoint
            if (nums[l] < nums[m] && nums[r] < nums[m]) {
                // then look at right subarray that includes the midpoint
                // in case the pivot is next to midpoint (there will be a value to the left of midpoint for comparison)
                l = m;
                continue;
            }

            // searching: if pivot is before midpoint
            if (nums[l] > nums[m] && nums[r] > nums[m]) {
                // then look at left subarray that includes the midpoint
                // in case the pivot is next to midpoint (there will be a value to the right of midpoint for comparison)
                r = m;
                continue;
            }
        }
        
        // empty or one element array (pivot undefined)
        return -1;
    }
}