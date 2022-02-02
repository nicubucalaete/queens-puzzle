import { ChangeDetectorRef, Component } from '@angular/core';
import { QueensPuzzle } from './queens-puzzle';

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
    // TODO find a better way fro delaying every value
    let initialTimeout = 700;
    let times = 1;
    queensPuzzle.getObservable().subscribe((solution => {
      times++;
      setTimeout(() => {
        this.solution = solution;
        this.cdr.detectChanges();
        console.log('solution:', solution);
      }, initialTimeout * times);
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
