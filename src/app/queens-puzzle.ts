import { Observable, Subject } from 'rxjs';
import { PuzzleMessage, PuzzleMessageType, QueenPozition } from './puzzle-message';

export class QueensPuzzle {
  subject = new Subject<PuzzleMessage>();
  private solutionFound = false;

  constructor(private n: number) {
  }

  getObservable(): Observable<PuzzleMessage> {
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
      this.notifyPartialSolution(solution);
      let valid = this.isValidPartialSolution(solution, k);

      if (valid) {
        if (k === this.n) {
          console.log('Solution found:', solution);
          solutionsCount++;
          this.notifySolution(solution);
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
        this.notifyConflictingQueens(
          { row: k, column: solution[k] },
          { row: j, column: solution[j] }
        );
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
      this.notifySolution(solution);
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
    this.subject.next(
      {
        type: PuzzleMessageType.PARTIAL_SOLUTION,
        solution: solution.slice(0)
      }
    );
  }

  private notifySolution(solution: number[]) {
    this.subject.next(
      {
        type: PuzzleMessageType.FINAL_SOLUTION,
        solution: solution.slice(0)
      }
    );
  }

  private notifyConflictingQueens(queen1Poz: QueenPozition, queen2Poz: QueenPozition) {
    this.subject.next(
      {
        type: PuzzleMessageType.CONFLICTING_QUEENS,
        queen1Poz,
        queen2Poz
      }
    );
  }
}
