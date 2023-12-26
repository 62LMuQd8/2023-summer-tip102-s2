export class ArrayService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Merge-Intervals
    static mergeIntervals(intervals) {
        // if intervals array is not defined return null
        if (!intervals) return null;

        // merge result
        let mergedIntervals = [];

        // sort intervals based on ascending order of start times (unix epoch time)
        intervals.sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0);

        // for each interval
        for (const currInterval of intervals) {
            // if the current interval does not overlap with last interval
            if (mergedIntervals.length === 0 ||
                mergedIntervals[mergedIntervals.length - 1][1] < currInterval[0]) {
                // then add interval to merge result
                mergedIntervals.push(currInterval)
            } else {
                // else the current interval overlaps with the last interval
                // so we extend the end time of the last interval
                // (or keep the end time of the last interval the same
                // in case current interval is enclosed within the last interval)
                mergedIntervals[mergedIntervals.length - 1][1] =
                    Math.max(mergedIntervals[mergedIntervals.length - 1][1], currInterval[1])
            }
        }

        // return answer
        return mergedIntervals;
    }
}