export interface AbstractMarble {
  time: number;
}
export interface MarbleWithValue<T> extends AbstractMarble {
  value: T;
}

export interface MarbleWithError extends AbstractMarble {
  error: Error;
}

export type Marble<T> = MarbleWithValue<T> | MarbleWithError;

export const isMarbleWithValue = (
  marble: AbstractMarble
): marble is MarbleWithValue<unknown> => 'value' in marble;

export const isMarbleWithError = (
  marble: AbstractMarble
): marble is MarbleWithValue<unknown> => 'error' in marble;
