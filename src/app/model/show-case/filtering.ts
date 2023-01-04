import { filter, find, first } from 'rxjs';
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

export const FIND: ShowCase<[number], number | undefined> = {
  label: 'find',
  operatorText: 'x$.pipe(find(x => x % 2 === 0))',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(find((x) => x % 2 === 0)),
};

export const FIND_WITH_PREDICATE_THAT_FAILS: ShowCase<
  [number],
  number | undefined
> = {
  label: 'find with predicate that fails',
  operatorText: 'x$.pipe(find(x => x > 5))',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(find((x) => x > 5)),
};

export const FIRST: ShowCase<[number], number> = {
  label: 'first',
  operatorText: 'x$.pipe(first())',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(first()),
};

export const FIRST_WITH_PREDICATE_THAT_SUCCEEDS: ShowCase<[number], number> = {
  label: 'first with predicate that succeeds',
  operatorText: 'x$.pipe(first(x => x % 2 === 0))',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(first((x) => x % 2 === 0)),
};

export const FIRST_WITH_PREDICATE_THAT_FAILS: ShowCase<[number], number> = {
  label: 'first with predicate that fails',
  operatorText: 'x$.pipe(first(x => x > 5))',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(first((x) => x > 5)),
};

export const FIRST_WITH_PREDICATE_THAT_FAILS_AND_FALLBACK_VALUE: ShowCase<
  [number],
  number
> = {
  label: 'first with predicate that fails and fallback value',
  operatorText: 'x$.pipe(first(x => x > 5, 10))',
  graphs: [
    {
      end: 80,
      marbles: [
        { time: 10, value: 1 },
        { time: 20, value: 2 },
        { time: 55, value: 3 },
        { time: 65, value: 4 },
        { time: 75, value: 5 },
      ],
    },
  ],
  operator: (graphs$) => graphs$[0].pipe(first((x) => x > 5, 10)),
};

export const SHOW_CASES_FILTERING = {
  filter: FILTER,
  find: [FIND, FIND_WITH_PREDICATE_THAT_FAILS],
  first: [
    FIRST,
    FIRST_WITH_PREDICATE_THAT_SUCCEEDS,
    FIRST_WITH_PREDICATE_THAT_FAILS,
    FIRST_WITH_PREDICATE_THAT_FAILS_AND_FALLBACK_VALUE,
  ],
};
