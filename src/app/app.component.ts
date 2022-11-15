import { Component } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  reduce,
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
  ) => Observable<Omit<Marble<O>, 'time'>>,
  scheduler = new VirtualTimeScheduler()
) =>
  new Observable<Marble<O> & { scheduler: VirtualTimeScheduler }>(
    (observer) => {
      operator(fromMarbleGraphs(graphs, scheduler) as any) // hm
        .pipe(
          map((marble) => ({ ...marble, time: scheduler.now(), scheduler }))
        )
        .subscribe(observer);

      scheduler.flush();
      observer.complete();
    }
  ).pipe(
    reduce(
      (graph, marble) => {
        graph.marbles.push(marble);
        return graph;
      },
      { marbles: [] } as MarbleGraph<O>
    ),
    map((graph) => {
      graph.end = scheduler.now();
      return graph;
    })
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
