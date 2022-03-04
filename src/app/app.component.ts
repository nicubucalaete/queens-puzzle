import { ChangeDetectorRef, Component } from '@angular/core';
import { QueensPuzzle } from './queens-puzzle';
import { concatMap, delay, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  queens: number = 4;
  private solution: number[] = [];

  constructor(private cdr: ChangeDetectorRef) {
  }

  backtrackingIterative() {
    let queensPuzzle = new QueensPuzzle(this.queens);
    this.subscribeForSolutionNotification(queensPuzzle);
    queensPuzzle.backtrackingIterative();
  }

  backtrackingRecursive() {
    let queensPuzzle = new QueensPuzzle(this.queens);
    this.subscribeForSolutionNotification(queensPuzzle);
    queensPuzzle.backtrackingRecursive(1, []);
  }

  private subscribeForSolutionNotification(queensPuzzle: QueensPuzzle) {
    queensPuzzle.getObservable().pipe(
      concatMap(item => of(item).pipe(delay(700)))
    ).subscribe((solution => {
      this.solution = solution;
      this.cdr.detectChanges();
      console.log('solution:', solution);
    }));
    return queensPuzzle;
  }

  counter(i: number) {
    return new Array(i);
  }

  shouldShowQueen(row: number, column: number) {
    return this.solution[row + 1] === column + 1;
  }
}
