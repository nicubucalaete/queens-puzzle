export class QueensPuzzle {

  constructor(private n: number) {
  }

  backtrackingIterative() {
    // solution[k] = i - queen is on the row k and column i
    let solution: number[] = [];

    let solutionsCount = 0;
    let k = 1;
    solution[k] = 0;

    while (k > 0) {
      this.generateNewPossibleSolution(solution, k);
      let valid = this.isValidPartialSolution(solution, k);

      if (valid) {
        if (k === this.n) {
          console.log('Solution found:', solution);
          solutionsCount++;
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

    console.log('Found solutions found: ', solutionsCount);
  }

  private isValidPartialSolution(solution: number[], k: number) {
    let valid = solution[k] <= this.n;
    for (let j = 1; j < k; j++) {
      if ((solution[k] === solution[j]) || (Math.abs(k - j) === Math.abs(solution[k] - solution[j]))) {
        valid = false;
        break;
      }
    }
    return valid;
  }

  private generateNewPossibleSolution(solution: number[], k: number) {
    solution[k] = solution[k] + 1;
  }

  backtrackingRecursive() {

  }
}
