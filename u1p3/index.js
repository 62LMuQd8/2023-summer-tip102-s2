// stack, queue, heap ?
// problem statement involves requests
// and requests are typically associated with queues

import { RecentCounter } from './recentCounter.js'
let recentCounter = new RecentCounter();
console.log(recentCounter.ping(1));
console.log(recentCounter.ping(100));
console.log(recentCounter.ping(3001));
console.log(recentCounter.ping(3002));