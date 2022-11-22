import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { ShowCase } from './model/show-case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showCase: ShowCase<[string, string], string> = {
    label: 'CombineLatest',
    operatorText: `combineLatest([x, y]).pipe(map(([x, y]) => x + y))`,
    graphs: [
      {
        end: 100,
        marbles: [
          { time: 0, value: 'a' },
          { time: 50, value: 'b' },
          { time: 15, value: 'c' },
        ],
      },
      {
        end: 90,
        marbles: [
          { time: 5, value: '1' },
          { time: 75, value: '2' },
        ],
      },
    ],
    operator: (marbles$) =>
      combineLatest(marbles$).pipe(
        map((marbles) => ({
          value: marbles.reduce((sum, marble) => sum + marble.value, ''),
        }))
      ),
  };
}
