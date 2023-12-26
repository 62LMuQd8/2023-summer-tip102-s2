// read CodePath's explanation: https://guides.codepath.org/compsci/First-Bad-Version
export class Version {
    constructor(badVersion) {
      this.badVersion = badVersion;
      this.badVersionExists = false;
    }
  
    isBadVersion(version) {
      // any version after the first bad version is also a bad version
      return this.badVersion <= version;
    }
  
    getFirstBadVersionRecursion(n) {
      // version array starts from 1 ... n
      let versions = Array.from(Array(n).keys(), key => key + 1);
      // array will be zero-indexed
      return this.findRecursion(versions, 0, versions.length - 1);
    }
  
    findRecursion(arr, startIndex, endIndex) {
      // base case - final recursion pass with 1 version remaining
      if (startIndex === endIndex) {
        // edge case - only 1 version to check, no recursion happened
        if (arr.length === 1) {
          console.log(`calling isBadVersion(${arr[endIndex]})`);
          return this.isBadVersion(arr[endIndex]) ? arr[endIndex] : -1;
        }
        // edge case - no bad version detected so far, check last version
        if (!this.badVersionExists) {
          console.log(`calling isBadVersion(${arr[endIndex]})`);
          return this.isBadVersion(arr[endIndex]) ? arr[endIndex] : -1;
        }
        // happy path - return first occuring bad version
        return arr[endIndex];
      }
      // since minIndex is startIndex plus delta, and delta is floored at 0
      // this gaurantees that endIndex can never be less than startIndex
      let midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
      console.log(`calling isBadVersion(${arr[midIndex]})`);
      if (this.isBadVersion(arr[midIndex])) {
        // need to keep track of this state due to edge case,
        // for example, the first bad version is the version at the mid index
        // on the first recusion pass
        // Javascript cannot "see" the versions like humans can with diagrams
        // so we must tell Javascript to check the array at various points
        // in order to determine which version is the first bad version
        this.badVersionExists = true;
        // bad version detected, look at left subarray
        // because we want 1st occurrence of bad version
        // we also include the current version when looking at left subarray
        // so that we will be able to return the current bad version
        // in case this is the only bad version in the entire array
        return this.findRecursion(arr, startIndex, midIndex);
      } else {
        // good version detected, look at right subarray
        // excluding the current good version
        // because we want 1st occurrence of bad version
        // this current version cannot be returned at the end of the recursion
        // so this version is excluded from the right subarray
        return this.findRecursion(arr, midIndex + 1, endIndex);
      }
    }
  
    getFirstBadVersionIterative(n) {
      // version array starts from 1 ... n
      let versions = Array.from(Array(n).keys(), key => key + 1);
      
      // array will be zero-indexed
      let startIndex = 0;
      let endIndex = versions.length - 1;
  
      // edge case - version array only as 1 version
      if (startIndex === endIndex) {
        console.log(`calling isBadVersion(${versions[endIndex]})`);
        return this.isBadVersion(versions[endIndex]) ? versions[endIndex] : -1;
      }
  
      // keep iterating until one version remains
      while (startIndex < endIndex) {
        
        let midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        
        console.log(`calling isBadVersion(${versions[midIndex]})`);
        
        if (this.isBadVersion(versions[midIndex])) {
          this.badVersionExists = true;
          endIndex = midIndex;
        } else {
          startIndex = midIndex + 1;
        }
      }
  
      // edge case - no bad versions detected so far, check last version
      if (!this.badVersionExists) {
        console.log(`calling isBadVersion(${versions[endIndex]})`);
        return this.isBadVersion(versions[endIndex]) ? versions[endIndex] : -1;
      }
  
      // happy path - return bad version
      return versions[endIndex];
    }
  }