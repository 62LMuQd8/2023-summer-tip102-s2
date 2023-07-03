export class Product {
    // use this trick to get product without self:
    // let nums = [1, 2, 3, 4, 5]
    // ||---------||-----------------||-----------------||
    // || exclude ||      left       ||      right      ||
    // ||---------||-----------------||-----------------||
    // ||    1    ||                 ||  5 * 4 * 3 * 2  ||
    // ||---------||-----------------||-----------------||
    // ||    2    ||  1              ||  5 * 4 * 3      ||
    // ||---------||-----------------||-----------------||
    // ||    3    ||  1 * 2          ||  5 * 4          ||
    // ||---------||-----------------||-----------------||
    // ||    4    ||  1 * 2 * 3      ||  5              ||
    // ||---------||-----------------||-----------------||
    // ||    5    ||  1 * 2 * 3 * 4  ||                 ||
    // ||---------||-----------------||-----------------||
    // method is similar to deriving sum of a series:
    // https://www.mathsisfun.com/algebra/sequences-sums-arithmetic.html
    static solve(nums) {
      let ans = nums.map(x => 1);
      let [leftIndex, rightIndex] = [0, nums.length - 1];
      let [leftProduct, rightProduct] = [1, 1];
      while (leftIndex < nums.length - 1) {
        // get products for left and right, see sample table above
        // note: the current (left or right) product requires
        // the product of the previous iteration
        [leftProduct, rightProduct] =
          [leftProduct * nums[leftIndex], rightProduct * nums[rightIndex]];
        // multiples left and right products together, see sample table above
        // note: for the first and last entries of the answer array,
        // only one (left or right) product contributes to each entry
        [ans[leftIndex + 1], ans[rightIndex - 1]] =
          [ans[leftIndex + 1] * leftProduct, ans[rightIndex - 1] * rightProduct];
        [leftIndex, rightIndex] = [leftIndex + 1, rightIndex - 1];
      }
      Product.print(ans);
    }
  
    // helper function to validate solution
    static print(arr) {
      // Number.parseInt is used here to remove signed zeros from output
      let temp = arr.map(x => { return Number.parseInt(x) });
      console.log(temp);
    }
  }