import { filter } from 'rxjs';
import { ShowCase } from './show-case';

export const FILTER: ShowCase<[number], number> = {
  label: 'filter',
  operatorText: 'x$.pipe(filter(x => x % 2 === 0))',
  graphs: [
    {
      end: 100,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(filter((x) => x % 2 === 0)),
};

export const SHOW_CASES_FILTERING = {
  filter: FILTER,
};
