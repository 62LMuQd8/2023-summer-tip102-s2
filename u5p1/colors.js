export class Colors {
    // colors must be arranged in this order:
    // [red, white, blue]
    //
    // red = 0
    // white = 1
    // blue = 2
    //
    // solution must be in place
    //
    // because the numbers of the colors are arranged
    // in ascending order we could use a textbook
    // sorting algorithm, e.g. insertion sort, quick sort, etc
    // https://www.geeksforgeeks.org/sorting-algorithms/
    //
    // however, we will implement a different solution
    // that traverses the array and uses the two pointer method
    // to help us keep track the correct positions of the first and third
    // colors (red and blue) because they must be ordered first and last
    static sort(nums) {
      let firstColorPosition = 0;
      let thirdColorPosition = nums.length - 1;
      let currentPosition = 0;
      // keep looping until all unsorted colors are in their correct positions
      while (currentPosition <= thirdColorPosition) {
        // if the current color is red
        if (nums[currentPosition] === 0) {
          // move current color to its correct (red) position
          [nums[firstColorPosition], nums[currentPosition]] =
            [nums[currentPosition], nums[firstColorPosition]];
          // move to the next correct (red) position
          // because current (red) position is correctly filled
          firstColorPosition++;
          // look at the next color
          currentPosition++;
          // note: some cases we should examine ---
          // where [f] is firstColorPosition, and [c] is currentPosition
          //
          //  f  c
          // [0, 0]
          // this is an invalid state
          // [f] should be pointing to where [c] is point
          // and not lagging behind [c]
          //
          //    f
          //    c
          // [0,0]
          // this is a valid state
          // [f] and [c] will both be incremeted to their next positions
          //
          //    f
          //    c
          // [0,1]
          // this is a valid state
          // only [c] will be incremeted to its next positions
          //
          //  f  c
          // [1, 0]
          // this is a valid state
          // the colors are swapped between [f] and [c]
          // and both points are incremented to their next positions
          //
          //     f     c
          // [0, 1, 1, 0]
          // this is a valid state
          // the colors are swapped between [f] and [c]
          // and both points are incremented to their next positions
          // notice that after [f] is incremented, it is still pointing to white color (1)
          //
          //           f     c
          // [0, 0, 1, 1, 1, 0]
          // this is an invalid state
          // [f] should be pointing to the first white color instead of the second
          //
          // we see from the cases above that firstColorPosition and currentPosition
          // always move in sync with one another, and point to the same color,
          // until a white color (1) is encountered, then currentPosition moves ahead
          // of firstColorPosition, and after the swap and incrementing positions,
          // firstColorPosition continues to point to the first white color of the subsequence
          //
          // this means that in either case we can safely increment the current pointer:
          //
          // 1. firstColorPosition and currentPosition are pointing to the same red color
          // 2. currentPosition is ahead of firstColorPosition because it has encountered
          //    a subsequence of white colors, and the swap just shifts the subsequence
          //    one element down the array (and after the swap, but before incrementing
          //    the pointers, the currentPointer is pointing to a white color)
        // if the current color is blue
        } else if (nums[currentPosition] === 2) {
          // move current color to its correct (blue) position
          [nums[thirdColorPosition], nums[currentPosition]] =
            [nums[currentPosition], nums[thirdColorPosition]];
          // move to next correct (blue) position
          thirdColorPosition--;
          // note: when encountering the color blue, they are bubbled down
          // and effectively moved out of the array because they are in
          // their correct positions, and the current (iterator) position is not changed
        } else {
          // look at the next color
          currentPosition++;
        }
      }
      // log output
      console.log(nums);
    }
  }