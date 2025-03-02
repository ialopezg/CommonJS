/**
 * Determines if a given year or `Date` instance represents a leap year.
 *
 * This function can be used in two ways:
 * 1. As a standalone function: Pass a `Date` instance or a number representing the year.
 * 2. As a method on `Date.prototype`: Called directly on a `Date` instance.
 *
 * A leap year occurs:
 * - Every year that is evenly divisible by 4
 * - Except years that are evenly divisible by 100, unless they are also divisible by 400
 *
 * @param {Date | number} input - A `Date` instance or a number representing the year
 * @returns {boolean} `true` if the year is a leap year, otherwise `false`
 * @throws {TypeError} If the input is not a valid `Date`, timestamp, or year number.
 *
 * @example
 * console.log(isLeapYear(2024)); // true
 * console.log(isLeapYear(new Date(2024, 0, 1))); // true
 * console.log(new Date(1900, 0, 1).isLeapYear()); // false
 */
export function isLeapYear(input: Date | number): boolean {
  let year: number;

  if (typeof input === "number") {
    // Return false for BCE years (negative numbers)
    if (input < 1) {
      return false;
    }

    // If the number is within the range for a year (1-9999), treat it as a year
    if (input >= 1 && input <= 9999) {
      year = input;
    } else {
      // If the number is greater than or equal to 10000, check if it's a valid Unix epoch year
      const dateFromTimestamp = new Date(input);
      const timestampYear = dateFromTimestamp.getFullYear();

      // If year from timestamp is a valid Unix year (1970 to 9999), treat it as a timestamp
      if (timestampYear >= 1970 && timestampYear <= 9999 && !isNaN(dateFromTimestamp.getTime())) {
        year = timestampYear;
      } else {
        throw new TypeError("Invalid year or timestamp.");
      }
    }
  } else if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      throw new TypeError("Invalid Date instance.");
    }
    year = input.getFullYear();
  } else {
    throw new TypeError("Input must be a Date object, timestamp, or valid year.");
  }

  // Return false for out-of-bound years (years >= 10000)
  if (year >= 10000) {
    return false;
  }

  // Check if the year is a leap year
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
