import {
  combineLatest,
  combineLatestAll,
  concat,
  concatAll,
  from,
  map,
} from 'rxjs';
import { ShowCase } from './show-case';

export const COMBINE_LATEST_ALL: ShowCase<[string, string], string> = {
  label: 'combineLatestAll',
  operatorText: ` from([x$, y$]).pipe(
    combineLatestAll(),
    map(([x, y]) => x + y)
  )`,
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
    from(graphs$).pipe(
      combineLatestAll(),
      map(([x, y]) => x + y)
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
  operator: (graphs$) => combineLatest(graphs$).pipe(map(([x, y]) => x + y)),
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

export const CONCAT_ALL: ShowCase<[number, string, string], string | number> = {
  label: 'concatAll',
  operatorText: `from([x$, y$, z$]).pipe(concatAll())`,
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
  operator: (graphs$) => from(graphs$).pipe(concatAll()),
};

export const SHOW_CASES_COMBINATION = {
  combineLatest: COMBINE_LATEST,
  combineLatestAll: COMBINE_LATEST_ALL,
  concat: CONCAT,
  concatAll: CONCAT_ALL,
};
