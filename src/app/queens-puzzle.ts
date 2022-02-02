import { Observable, Subject } from 'rxjs';

export class QueensPuzzle {
  subject = new Subject();
  private solutionFound = false;

  constructor(private n: number) {
  }

  getObservable(): Observable<any> {
    return this.subject;
  }

  backtrackingIterative() {
    // solution[k] = i - queen is on the row k and column i
    let solution: number[] = [];

    let solutionsCount = 0;
    let k = 1;
    solution[k] = 0;

    // while (k > 0) {
    while (solutionsCount === 0) {
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
        this.notifyPartialSolution(solution);
      } else {
        if (solution[k] > this.n) {
          solution.pop();
          k--;
        }
        this.notifyPartialSolution(solution);
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

  // solution[k] = i - queen is on the row k and column i
  backtrackingRecursive(k: number, solution: number[]) {
    if (this.solutionFound) {
      return;
    }
    if (k === this.n + 1) {
      console.log('Solution found:', solution);
      this.solutionFound = true;
    } else {
      for (let i = 1; i <= this.n && !this.solutionFound; i++) {
        solution[k] = i;

        this.notifyPartialSolution(solution);

        let valid = this.isValidPartialSolution(solution, k);

        if (valid) {
          this.backtrackingRecursive(k + 1, solution);
        } else {
          solution.pop();
        }
      }
    }
  }

  private notifyPartialSolution(solution: number[]) {
    this.subject.next(solution.slice(0));
  }
}
