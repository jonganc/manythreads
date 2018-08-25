import { History, Location } from 'history';
import { match } from 'react-router';

export type Optional<T extends {}> = { [key in keyof T]?: T[key] };

export interface PageProps {
  // history, location, match from react-router
  history: History;
  location: Location;
  match: match<any>;

  // also called pathContext
  pageContext: {};
}

/**
 * does an array have no undefined or null elements?
 */
export function hasNoUndefinedElements<T>(
  array: T[],
): array is Array<NonNullable<T>> {
  return array.filter(v => v == undefined).length === 0;
}

export type Omit<
  T extends {},
  K extends string | number | symbol
> = Pick<T, Exclude<keyof T, K>>;
