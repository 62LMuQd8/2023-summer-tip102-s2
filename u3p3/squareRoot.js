export class SquareRoot {
    constructor () {
      this.ansRecursion = undefined;
    }
    getSquareRootRecursion(r) {
      // r for radicand
      this.recursion(r, 0, r);
      return this.ansRecursion
    }
    recursion(r, start, end) {
      // exit recursion b/c no remaining square roots to be checked
      if (start > end) return;
      let mid = start + Math.floor((end - start) / 2);
      // same as mid * mid === r, provided that mid is not 0
      // format used to avoid int overflow
      if ((r / mid === mid) || (mid === 0 && r === 0)) {
        // save mid as answer b/c exact square root detected
        this.ansRecursion = mid;
        return;
      }
      // same as mid * mid < r
      if (r / mid > mid) {
        // save the last integer square root because its square is less than r,
        // and last integer square root may not be the floored square root
        this.ansRecursion = mid;
        // look at right subarray
        return this.recursion(r, mid + 1, end);
      } else {
        // look at left subarray
        return this.recursion(r, start, mid - 1);
      }
    }
  
    getSquareRootIterative(r) {
      let start = 0;
      let end = r;
      let ans;
  
      // loop until no squared roots to be checked
      // or until start and end move past each other
      while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        if ((r / mid === mid) || (mid === 0 && r === 0)) {
          ans = mid;
          break
        }
        if (r / mid > mid) {
          ans = mid;
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
      return ans;
    }
  }