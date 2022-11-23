import { catchError, of } from 'rxjs';
import { ShowCase } from './show-case';

export const CATCH_ERROR: ShowCase<[number], number> = {
  label: 'catchError',
  operatorText: 'x$.pipe(catchError(() => of(-1)))',
  graphs: [
    {
      end: 100,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, error: '!' },
        { time: 70, value: 3 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(catchError(() => of(-1))),
};

export const SHOW_CASES_ERROR_HANDLING = {
  catchError: CATCH_ERROR,
};
