import {
  map,
  Observable,
  reduce,
  takeUntil,
  timer,
  VirtualTimeScheduler,
} from 'rxjs';
import { Marble } from './marble';

export interface MarbleGraph<T> {
  end?: number;
  marbles: Marble<T>[];
}

export type MarbleGraphInputTuple<T> = {
  [K in keyof T]: MarbleGraph<T[K]>;
};

export const fromMarbleGraph = <T>(
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

export const fromMarbleGraphs = <T extends readonly unknown[]>(
  graphs: [...MarbleGraphInputTuple<T>],
  scheduler: VirtualTimeScheduler
) => graphs.map((graph) => fromMarbleGraph(graph, scheduler));

export type ReduceGraphsOperator<I extends readonly unknown[], O> = (
  marbles$: [
    ...{
      [K in keyof I]: Observable<Marble<I[K]>>;
    }
  ]
) => Observable<Omit<Marble<O>, 'time'>>;

export const reduceGraphs = <I extends readonly unknown[], O>(
  graphs: [...MarbleGraphInputTuple<I>],
  operator: ReduceGraphsOperator<I, O>,
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
