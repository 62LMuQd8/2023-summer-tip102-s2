// read CodePath's explanation: https://guides.codepath.org/compsci/Number-of-Students-Unable-to-Eat-Lunch
export class Lunch {
    // students is queue
    // lunches is stack
    static parseStudents(s, l) {
      // redefine arrays to easily work with in Javascript
      let students = s;
      let lunches = l.reverse();
      // keep track of the number of students who are unable to eat
      // each time a student returns to end of queue, a student is unable to eat
      let numStudentsUnableToEat = 0;
      // keep looping until all remaining students are unable to eat lunch
      // this happens when numStudentsUnableToEat === students.length
      while (numStudentsUnableToEat < students.length) {
        // when student lunch preference and lunch available matches
        if (students[0] === lunches[lunches.length - 1]) {
          // then remove lunch from stack, student from queue
          lunches.pop();
          students.shift();
          // and reset number of students unable to eat
          // b/c we are in effect looking at new students and new lunches
          numStudentsUnableToEat = 0;
  
        // otherwise student returns to end of queue
        // and number of students unable to eat is incremented
        } else {
          students.push(students.shift());
          numStudentsUnableToEat++;
        }
      }
      // return number of students unable to eat lunch
      return numStudentsUnableToEat;
    }
  }