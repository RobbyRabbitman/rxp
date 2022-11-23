import { delay } from 'rxjs';
import { ShowCase } from './show-case';

export const DELAY: ShowCase<[number], number> = {
  label: 'delay',
  operatorText: `x$.pipe(delay(10))`,
  graphs: [
    {
      end: 100,
      marbles: [
        { time: 0, value: 1 },
        { time: 50, value: 2 },
        { time: 75, value: 3 },
      ],
    },
  ],
  operator: (graphs$, scheduler) => graphs$[0].pipe(delay(10, scheduler)),
};

export const SHOW_CASES_UTILITY = {
  delay: DELAY,
};
