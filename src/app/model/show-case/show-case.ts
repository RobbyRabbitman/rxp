import { MarbleGraphInputTuple, ReduceGraphsOperator } from '../marble-graph';
import { SHOW_CASES_COMBINATION } from './combination';
import { SHOW_CASES_CONDITIONAL } from './conditional';
import { SHOW_CASES_CREATION } from './creation';
import { SHOW_CASES_ERROR_HANDLING } from './error-handling';
import { SHOW_CASES_FILTERING } from './filtering';
import { SHOW_CASES_TRANSFORMATION } from './transformation';
import { SHOW_CASES_UTILITY } from './utility';

export interface ShowCase<I extends readonly unknown[], O> {
  graphs: [...MarbleGraphInputTuple<I>];
  operator: ReduceGraphsOperator<I, O>;
  operatorText: string;
  label: string;
}

export const SHOW_CASES = {
  combination: SHOW_CASES_COMBINATION,
  conditional: SHOW_CASES_CONDITIONAL,
  creation: SHOW_CASES_CREATION,
  errorHandling: SHOW_CASES_ERROR_HANDLING,
  filtering: SHOW_CASES_FILTERING,
  transformation: SHOW_CASES_TRANSFORMATION,
  utility: SHOW_CASES_UTILITY,
};
