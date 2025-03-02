/**
 * Checks if the given date is in Daylight Saving Time (DST).
 * Supports Date objects, date strings, and timestamps.
 *
 * @param {Date | string | number} date - The date to check.
 * @returns {boolean} True if the date is in DST, otherwise false.
 * @throws {TypeError} If the input is not a valid date.
 */
export function isDST(date: Date | string | number): boolean {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    throw new TypeError('Invalid date input');
  }

  const year = date.getFullYear();
  const offset = Math.max(
    new Date(year, 0, 1).getTimezoneOffset(), // January offset
    new Date(year, 6, 1).getTimezoneOffset()  // July offset
  );

  return date.getTimezoneOffset() < offset;
}
