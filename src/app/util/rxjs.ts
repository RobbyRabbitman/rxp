import { filter } from 'rxjs';
import { isNonNull } from './non-null';

export const filterNullish = filter(isNonNull);
