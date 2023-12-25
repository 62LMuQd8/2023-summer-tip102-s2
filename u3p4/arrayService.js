export class ArrayService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Find-Minimum-in-Rotated-Sorted-Array
    //
    // things to watch out for in this problem:
    // 1. this problem may seem complicated at first, but the trick here is to see that
    //    the smallest value in the array is either to the left or right of the midpoint
    //    depending on whether the largest number in the array has rotated past the midpoint,
    //    and finding where is the smallest value in the subarrays is the same as the big array
    // 2. the values in the array are unique, so values that left and right pointers point to are different,
    //    except when left and right pointers meet, then they point to the same number,
    //    this impacts how we write the conditional for the while loop and how we pick subarrays
    //
    static findMin(nums) {
        // left pointer begins at start of array
        let l = 0
        // right pointer begins at end of array
        let r = nums.length - 1;

        // the code is biased to move in the left direction of array
        // unless it encounters a large enough value at m that acts as a floor

        // if the problem statement asked to find the max value,
        // we need to keep track of whether midpoint is in the first ascending subarray or second ascending subarray
        // in general, the big steps to keep in mind are:
        // 1. if the midpoint is in the second ascending subarray, then the code should move to the left
        // 2. if the midpoint is in the first ascending subarray, then the code should move to the right
        // 3. if the array is not rotated, the max is at the end of array on the righthand side
        // finally subarrays should be handled like the big array
        // and we should look into more conditions (like pointers l, r, m)

        // we move left and right pointers closer and closer to each other and stop when they meet
        // note: the reason why we choose this condition over l <= r
        // is b/c of the logical choice(s) we make in the code below
        while (l < r) {
            // get the midpoint
            let m = Math.trunc((l + r) / 2);

            // we do not check whether nums array is rotated
            // b/c the code below collapses to the lefthand side of array
            // which is exactly where the min value is in case nums array is not rotated

            // if the value at the midpoint is greater than the end of subarray
            if (nums[m] > nums[r]) {
                // then we know all values to left of midpoint must not contain smallest value,
                // and values to the left of midpoint (and excluding the midpoint)
                // contain the smallest value of the array
                l = m + 1
            } else {
                // otherwise, the value at the midpoint is less than the end of subarray
                // and the smallest value must be to the left of the midpoint (and including the midpoint)
                // note: value at the midpoint cannot equal to the end of the subarray
                // b/c this means that there are duplicates in the array (which is scoped out per problem statement)
                // except when the left and right pointers are pointing to the same number
                //
                // in this case (l = r), the if else code block will always take the else path
                // causing the code to get stuck in the while loop
                //
                // to fix this, we can exit the while loop when the left and right pointers meet
                // and return the value at either the left or right pointers (they both point to the same number)
                //
                // another way to fix is to:
                //
                // 1. flip the sign of the if condition
                // 2. and swap the l and r statements in the if else code block
                //
                // and decide when to exit the while loop,
                //
                // 1. if we exit the while loop when l and r meet, then we return the value
                //    that either l or r points to (they point to the same number),
                //    m may not point to the correct value
                // 2. if we exit the while loop after l and r meet, then return the value where m points to;
                //    l and r may not point to the correct value
                r = m
            }
        }

        return nums[r];
    }
}