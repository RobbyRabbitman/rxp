export const camelToSnake = (string: string, joinBy = '_') =>
  string.replace(/([a-z])([A-Z])/g, `$1${joinBy}$2`).toLowerCase();
