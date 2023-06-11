export class RecentCounter {
  constructor() {
    this.counter = 0;
    this.requests = [];
    this.windowStartTime = 0;
    this.windowEndTime = 0;
  }

  ping(t) {
    this.requests.push(t);
    this.windowEndTime = t;
    this.windowStartTime = t - 3000;
    let numberOfRequests = 0;
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i] >= this.windowStartTime &&
         this.requests[i] <= this.windowEndTime) {
        numberOfRequests++;
      }
    }
    return numberOfRequests;
  }
}