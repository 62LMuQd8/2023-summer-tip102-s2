export class FoodService {
    static minRate(piles, h) {
      // bounds must be an integer
      // lowerBound is least number of bananas Koko can physically eat per hour
      // and rate must be greater than 0 b/c at 0 bananas/hour,
      // Koko will not be able to eat any pile
      // upperBound is the maximum bananas Koko can eat per hour
      // rate is the midpoint between lowerBound and upperBound
      // this problem is similar to u3p2 (First Bad Version)
      let [lowerBound, upperBound, rate, k] = [1, 50]
      // keep looping until lowerBound === upperBound
      // b/c the upperBound of left half can never be less than the lowerBound
      while (lowerBound < upperBound) {
        // get rate at midpoint
        rate = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
        // check if Koko can eat all bananas at this rate
        if (FoodService.isServiceCompleted(piles, h, rate)) {
          // if Koko can, record this rate
          k = rate;
          // look at left half, and include the current rate
          // so that final rate will at least include current (validated) rate
          upperBound = rate;
        } else {
          // look at right half, and exclude the current rate
          // b/c Koko can not eat all bananas in time at this rate
          lowerBound = rate + 1;
        }
      }
      // edge case - binary search never looked at left half
      // so k is undefined and should be set to the upperBound
      // which is the value when upperBound was initialized
      k = k ? k : upperBound;
      // validate rate before returning answer
      // b/c loop above exits just before the last midpoint
      return FoodService.isServiceCompleted(piles, h, k) ? k : -1;
    }
  
    // function that checks whether Koko
    // can eat all bananas in time at given rate
    static isServiceCompleted(piles, h, rate) {
      // actual number of hours for Koko to eat all piles of bananas
      let actualHours = 0;
      // for each pile of bananas
      for (const pile of piles) {
        // get actual number of hours to eat pile of bananas at given rate
        actualHours = actualHours + Math.ceil(pile / rate);
      }
      // is actual number of hours within time box
      return actualHours <= h;
    }
  }