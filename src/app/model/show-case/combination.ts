import { combineLatest, map } from 'rxjs';
import { ShowCase } from './show-case';

export const COMBINE_LATEST: ShowCase<[string, string], string> = {
  label: 'CombineLatest',
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

export const SHOW_CASES_COMBINATION = {
  combineLatest: COMBINE_LATEST,
};
