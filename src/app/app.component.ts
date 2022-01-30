import { Component } from '@angular/core';
import { QueensPuzzle } from './queens-puzzle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'queens-puzzle';
  queensPuzzle: QueensPuzzle = new QueensPuzzle(4);

  constructor() {
  }
}
