import { Component } from '@angular/core';
import { QueensPuzzle } from './queens-puzzle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  queens: number = 4;

  backtrackingIterative() {
    console.log(this.queens);
    new QueensPuzzle(this.queens).backtrackingIterative();
  }
}
