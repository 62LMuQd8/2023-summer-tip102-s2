// https://www.geeksforgeeks.org/binary-search-in-javascript/
export class BinarySearch {
    static findIterative(arr, target) {
      let startIndex = 0;
      let endIndex = arr.length - 1;
      let targetIndex;
      // endIndex must be greater than or equal to startIndex (for valid arrays)
      // b/c endIndex === startIndex means an array of 1 element
      // OR endIndex less than startIndex is not a valid array
      // OR startIndex greater than endIndex is not a valid array
      while (startIndex <= endIndex) {
        // the middle index is the start index plus delta
        // with some arithmetic this can be also stated as (start + end) / 2
        let midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        if (arr[midIndex] === target) { targetIndex = midIndex; break;}
        if (arr[midIndex] > target) {
          endIndex = midIndex - 1;
        } else {
          startIndex = midIndex + 1;
        }
      }
      return targetIndex !== undefined ? targetIndex : -1;
    }
    static findRecursive(arr, target) {
      return BinarySearch.recursion(arr, target, 0, arr.length - 1);
    }
    // with each pass, the search space is reduced by half
    // until either target is found, or returns -1 for not found
    // end result is bubbled up with returns
    static recursion(arr, target, startIndex, endIndex) {
      if (startIndex > endIndex) return -1;
      let midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
      if (arr[midIndex] === target) return midIndex;
      if (arr[midIndex] > target) {
        return BinarySearch.recursion(arr, target, startIndex, midIndex - 1);
      } else {
        return BinarySearch.recursion(arr, target, midIndex + 1, endIndex);
      }
    }
  }