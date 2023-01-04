import {
  catchError,
  map,
  Observable,
  of,
  reduce,
  takeUntil,
  timer,
  VirtualTimeScheduler,
} from 'rxjs';
import { isMarbleWithValue, Marble, MarbleWithValue } from './marble';

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
  new Observable<MarbleWithValue<T>>((observer) =>
    graph.marbles.forEach((marble) =>
      scheduler.schedule(
        () =>
          isMarbleWithValue(marble)
            ? observer.next(marble)
            : observer.error(marble.error),
        marble.time
      )
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
  graphs$: [
    ...{
      [K in keyof I]: Observable<I[K]>;
    }
  ],
  scheduler: VirtualTimeScheduler
) => Observable<O>;

export const reduceGraphs = <I extends readonly unknown[], O>(
  graphs: [...MarbleGraphInputTuple<I>],
  operator: ReduceGraphsOperator<I, O>,
  scheduler = new VirtualTimeScheduler(undefined, 100)
) =>
  new Observable<MarbleWithValue<O> & { scheduler: VirtualTimeScheduler }>(
    (observer) => {
      operator(
        fromMarbleGraphs(graphs, scheduler).map((graph) =>
          graph.pipe(map((marble) => marble.value))
        ) as any, // hm
        scheduler
      )
        .pipe(
          map((value) => ({ value, time: scheduler.now(), scheduler })),
          catchError((error) => of({ error, time: scheduler.now(), scheduler }))
        )
        .subscribe(observer as any); // hm

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
