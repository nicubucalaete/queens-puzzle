export class QueensPuzzle {

  constructor(private n: number) {
  }

  backtrackingIterativ() {
    // solution[k] = i - queen is on the row k and column i
    let solution: number[] = [];

    let k = 1;
    solution[k] = 0;

    while (k > 0) {
      solution[k] = solution[k] + 1;

      let valid = solution[k] <= this.n;
      for (let j = 1; j < k; j++) {
        if ((solution[k] === solution[j]) || (Math.abs(k - j) === Math.abs(solution[k] - solution[j]))) {
          valid = false;
          break;
        }
      }

      if (valid) {
        if (k === this.n) {
          console.log('Solution found:', solution);
        } else {
          k++;
          solution[k] = 0;
        }
      } else {
        if (solution[k] > this.n) {
          solution.pop();
          k--;
        }
      }
    }
  }

  backtrackingRecursive() {

  }
}
