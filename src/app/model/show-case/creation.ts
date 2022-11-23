import { interval } from 'rxjs';
import { ShowCase } from './show-case';

export const INTERVAL: ShowCase<[], number> = {
  label: 'delay',
  operatorText: `interval(10)`,
  graphs: [],
  operator: (_, scheduler) => interval(10, scheduler),
};

export const SHOW_CASES_CREATION = {
  interval: INTERVAL,
};
