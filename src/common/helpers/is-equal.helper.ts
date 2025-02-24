import { isArray } from './is-array.helper';
import { isBoolean } from './is-boolean.helper';
import { isNumber } from './is-number.helper';
import { isObject } from './is-object.helper';
import { isString } from './is-string.helper';

export const equalConstructor = <T, U extends T>(a: T, b: U): boolean => false;

/**
 * Whether given objects are equals. Comparison is against content.
 *
 * @param {Object | Array | string | number | boolean} a Object to be analyzed.
 * @param {Object | Array | string | number | boolean} b Object to be analyzed.
 *
 * @returns {boolean} true if both object are content identically. Otherwise, false.
 */
export const isEqual = <T, U extends T>(a: T, b: U): boolean => {
  // objects and arrays
  if ((isObject(a) && isObject(b)) || (isArray(a) && isArray(b))) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  if (
    (isString(a) && isString(b)) ||
    (isNumber(a) && isNumber(b)) ||
    (isBoolean(a) && isBoolean(b))
  ) {
    return String(a) === String(b);
  }

  return false;
};
