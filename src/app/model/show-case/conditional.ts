import { every } from 'rxjs';
import { ShowCase } from './show-case';

export const EVERY: ShowCase<[number], boolean> = {
  label: 'every',
  operatorText: 'x$.pipe(every(x => x % 2 === 0))',
  graphs: [
    {
      end: 100,
      marbles: [
        { time: 10, value: 2 },
        { time: 20, value: 8 },
        { time: 55, value: 60 },
        { time: 65, value: 5 },
        { time: 75, value: 10 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(every((x) => x % 2 === 0)),
};

export const SHOW_CASES_CONDITIONAL = {
  every: EVERY,
};
