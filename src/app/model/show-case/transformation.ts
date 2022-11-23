import { map } from 'rxjs';
import { ShowCase } from './show-case';

export const MAP: ShowCase<[number], number> = {
  label: 'map',
  operatorText: 'x$.pipe(map(x => x + 1))',
  graphs: [
    {
      end: 100,
      marbles: [
        { time: 10, value: 1 },
        { time: 25, value: 2 },
        { time: 75, value: 3 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(map((x) => x + 1)),
};

export const SHOW_CASES_TRANSFORMATION = {
  map: MAP,
};
