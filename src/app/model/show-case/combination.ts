import {
  combineLatest,
  combineLatestAll,
  concat,
  interval,
  map,
  take,
} from 'rxjs';
import { ShowCase } from './show-case';

export const COMBINE_LATEST_ALL: ShowCase<[string], string> = {
  label: 'combineLatestAll',
  operatorText: `x$.pipe(
    map((x) =>
      interval(10).pipe(
        map((inner) => x + inner),
        take(3)
      )
    ),
    combineLatestAll(),
    map(([a, b]) => a + b)
  ),`,
  graphs: [
    {
      end: 20,
      marbles: [
        { time: 5, value: 'a' },
        { time: 15, value: 'b' },
      ],
    },
  ],
  operator: (graphs$, scheduler) =>
    graphs$[0].pipe(
      map((outer) =>
        interval(10, scheduler).pipe(
          map((inner) => outer + inner),
          take(3)
        )
      ),
      combineLatestAll(),
      map(([a, b]) => a + b)
    ),
};

export const COMBINE_LATEST: ShowCase<[string, string], string> = {
  label: 'combineLatest',
  operatorText: `combineLatest([x$, y$]).pipe(map(([x, y]) => x + y))`,
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
  operator: (graphs$) =>
    combineLatest(graphs$).pipe(
      map((values) => values.reduce((sum, x) => sum + x, ''))
    ),
};

export const CONCAT: ShowCase<[number, string, string], string | number> = {
  label: 'concat',
  operatorText: `concat(x$, y$, z$)`,
  graphs: [
    {
      end: 30,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 25, value: 3 },
      ],
    },
    {
      end: 25,
      marbles: [
        { time: 0, value: 'a' },
        { time: 5, value: 'b' },
        { time: 10, value: 'c' },
      ],
    },
    {
      end: 40,
      marbles: [
        { time: 0, value: 'x' },
        { time: 15, value: 'y' },
        { time: 25, value: 'z' },
      ],
    },
  ],
  operator: (graphs$) => concat(...graphs$),
};

export const SHOW_CASES_COMBINATION = {
  combineLatestAll: COMBINE_LATEST_ALL,
  combineLatest: COMBINE_LATEST,
  concat: CONCAT,
};
