import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { applyOperatorToGraphs } from './types/marble-graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxp';
  constructor() {
    applyOperatorToGraphs(
      [
        {
          end: 50,
          marbles: [
            { time: 0, value: 1 },
            { time: 5, value: 2 },
            { time: 98, value: 3 },
            { time: 100, value: 4 },
          ],
        },
        {
          end: 102,
          marbles: [
            { time: 0, value: 'a' },
            { time: 11, value: 'b' },
            { time: 97, value: 'c' },
            { time: 100, value: 'd' },
          ],
        },
      ],
      (marbles$) =>
        combineLatest(marbles$).pipe(
          map((x) => ({
            value: x.reduce((a, b) => a + b.value, ''),
          }))
        )
    ).subscribe({
      next: (x) => console.log(x),
      complete: () => console.log('done'),
    });
    applyOperatorToGraphs(
      [
        {
          end: 70,
          marbles: [
            { time: 0, value: 1 },
            { time: 5, value: 2 },
            { time: 98, value: 3 },
            { time: 100, value: 4 },
          ],
        },
      ],
      (marbles$) =>
        marbles$[0].pipe(
          map((x) => ({
            value: x.value + 1,
          }))
        )
    ).subscribe({
      next: (x) => console.log(x),
      complete: () => console.log('done'),
    });
  }
}
