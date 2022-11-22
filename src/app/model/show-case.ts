import { MarbleGraphInputTuple, ReduceGraphsOperator } from './marble-graph';

export interface ShowCase<I extends readonly unknown[], O> {
  graphs: [...MarbleGraphInputTuple<I>];
  operator: ReduceGraphsOperator<I, O>;
  operatorText: string;
  label: string;
}
