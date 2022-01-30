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
    console.log(this.queens);
    let queensPuzzle = new QueensPuzzle(this.queens);
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
    queensPuzzle.backtrackingIterative();
  }

  counter(i: number) {
    return new Array(i);
  }

  shouldShowQueen(row: number, column: number) {
    return this.solution[row + 1] === column + 1;
  }
}
