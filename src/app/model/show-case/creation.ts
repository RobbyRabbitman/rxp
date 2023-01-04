import { interval, observeOn, throwError } from 'rxjs';
import { ShowCase } from './show-case';

export const INTERVAL: ShowCase<[], number> = {
  label: 'delay',
  operatorText: `interval(10)`,
  graphs: [],
  operator: (_, scheduler) => interval(10, scheduler),
};

export const THROW_ERROR: ShowCase<[], number> = {
  label: 'throw error',
  operatorText: `throwError(() => new Error('whoopsi'))`,
  graphs: [],
  operator: (_, scheduler) =>
    throwError(() => new Error('whoopsi')).pipe(observeOn(scheduler)),
};

export const SHOW_CASES_CREATION = {
  interval: INTERVAL,
  throwError: THROW_ERROR,
};
