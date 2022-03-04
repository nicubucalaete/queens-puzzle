import { ChangeDetectorRef, Component } from '@angular/core';
import { QueensPuzzle } from './queens-puzzle';
import { concatMap, delay, of } from 'rxjs';
import { PuzzleMessageType, QueenPozition } from './puzzle-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  queens: number = 4;
  delay: number = 500;
  private solution: number[] = [];
  private queen1Pos: QueenPozition | null = null;
  private queen2Pos: QueenPozition | null = null;
  private finalSolution = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  backtrackingIterative() {
    this.finalSolution = false;
    let queensPuzzle = new QueensPuzzle(this.queens);
    this.subscribeForSolutionNotification(queensPuzzle);
    queensPuzzle.backtrackingIterative();
  }

  backtrackingRecursive() {
    this.finalSolution = false;
    let queensPuzzle = new QueensPuzzle(this.queens);
    this.subscribeForSolutionNotification(queensPuzzle);
    queensPuzzle.backtrackingRecursive(1, []);
  }

  private subscribeForSolutionNotification(queensPuzzle: QueensPuzzle) {
    queensPuzzle.getObservable().pipe(
      concatMap(message => of(message).pipe(delay(this.delay)))
    ).subscribe((message => {
      if (message.type === PuzzleMessageType.PARTIAL_SOLUTION) {
        this.solution = message.solution!;
        this.queen1Pos = null;
        this.queen2Pos = null;
        console.log('Partial solution:', message.solution);
      } else if (message.type === PuzzleMessageType.CONFLICTING_QUEENS) {
        this.queen1Pos = message.queen1Poz!;
        this.queen2Pos = message.queen2Poz!;
        console.log('conflicting queens: ', message);
      } else if (message.type === PuzzleMessageType.FINAL_SOLUTION) {
        this.solution = message.solution!;
        this.finalSolution = true;
      }
      this.cdr.detectChanges();
    }));
    return queensPuzzle;
  }

  counter(i: number) {
    return new Array(i);
  }

  shouldShowQueen(row: number, column: number) {
    return this.solution[row + 1] === column + 1;
  }

  getQueenCssClass(row: number, column: number) {
    let cssClasses = `column column--${(row + column + 1) % 2 === 0 ? 'even' : 'odd'}`;
    if (this.isConflictingQueen(row, column, this.queen1Pos) || this.isConflictingQueen(row, column, this.queen2Pos)) {
      cssClasses += " column--conflicting";
    }
    if (this.finalSolution && this.shouldShowQueen(row, column)) {
      cssClasses += " column--solution";
    }
    return cssClasses;
  }

  private isConflictingQueen(row: number, column: number, queenPos: QueenPozition | null) {
    return (row + 1 === queenPos?.row) && (column + 1 === queenPos?.column);
  }
}
