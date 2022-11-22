import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  x = [
    {
      end: 30,
      marbles: [
        { time: 0, value: '1' },
        { time: 10, value: '2' },
        { time: 15, value: '3' },
      ],
    },
    {
      end: 15,
      marbles: [{ time: 5, value: '2' }],
    },
  ];
  o = (marbles$: any) =>
    combineLatest(marbles$).pipe(
      map((x: any) => ({
        value: x.reduce((sum: any, marble: any) => sum + marble.value, ''),
      }))
    );
}
