import { Component } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  takeUntil,
  timer,
  VirtualTimeScheduler,
} from 'rxjs';

interface Marble<T> {
  time: number;
  value: T;
}
interface MarbleGraph<T> {
  end?: number;
  marbles: Marble<T>[];
}

const fromMarbleGraph = <T>(
  graph: MarbleGraph<T>,
  scheduler: VirtualTimeScheduler
) =>
  new Observable<Marble<T>>((observer) =>
    graph.marbles.forEach((marble) =>
      scheduler.schedule(() => observer.next(marble), marble.time)
    )
  ).pipe(
    takeUntil(
      timer(
        Math.min(scheduler.maxFrames, graph.end ?? scheduler.maxFrames),
        scheduler
      )
    )
  );

export type MarbleGraphInputTuple<T> = {
  [K in keyof T]: MarbleGraph<T[K]>;
};

const fromMarbleGraphs = <T extends readonly unknown[]>(
  graphs: [...MarbleGraphInputTuple<T>],
  scheduler: VirtualTimeScheduler
) => graphs.map((graph) => fromMarbleGraph(graph, scheduler));

const applyOperatorToGraphs = <I extends readonly unknown[], O>(
  graphs: [...MarbleGraphInputTuple<I>],
  operator: (
    marbles$: [
      ...{
        [K in keyof I]: Observable<Marble<I[K]>>;
      }
    ]
  ) => Observable<Omit<Marble<O>, 'time'>>
) =>
  new Observable<Marble<O> & { scheduler: VirtualTimeScheduler }>(
    (observer) => {
      const scheduler = new VirtualTimeScheduler();

      operator(fromMarbleGraphs(graphs, scheduler) as any) // hm
        .pipe(
          map((marble) => ({ ...marble, time: scheduler.now(), scheduler }))
        )
        .subscribe(observer);

      scheduler.flush();
      observer.complete();
    }
  );

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
          marbles: [
            { time: 0, value: 1 },
            { time: 5, value: 2 },
            { time: 98, value: 3 },
            { time: 100, value: 4 },
          ],
        },
        {
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
      next: (x) => console.log(x.time, x.value),
      complete: () => console.log('done'),
    });
    applyOperatorToGraphs(
      [
        {
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
      next: (x) => console.log(x.time, x.value),
      complete: () => console.log('done'),
    });
  }
}
