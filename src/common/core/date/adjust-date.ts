export type TimeUnit =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

/**
 * Parses the input into a valid Date object.
 * @param {Date | string | number} input - The input to be parsed into a Date object.
 * @returns {Date} - A valid Date object.
 * @throws {Error} - Throws error if input is invalid.
 */
function parseDate(input: Date | string | number): Date {
  if (input instanceof Date) {
    return new Date(input); // If it's already a Date object, return a new copy
  }
  if (typeof input === 'string') {
    const parsedDate = new Date(input);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date string: ${input}`);
    }
    return parsedDate; // Parse the date string
  }
  if (typeof input === 'number') {
    return new Date(input); // Treat as timestamp (number)
  }

  throw new Error('Invalid input type. Must be a Date, string, or number.');
}

/**
 * Adjusts the date by a specified time unit and increment.
 *
 * @param {Date | string | number} date - The base date to adjust.
 * @param {TimeUnit} [timeUnit='days'] - The unit of time to adjust (e.g., 'days', 'months').
 * @param {number} increment - The amount to adjust the date (positive for add, negative for subtracting).
 *
 * @returns {Date} - The adjusted date.
 */
export function adjustDate(
  date: Date | string | number,
  timeUnit: TimeUnit = 'days',
  increment: number,
): Date {
  const parsedDate = parseDate(date); // Parse the input into a Date object
  const adjustedDate = new Date(parsedDate); // Create a new Date to avoid mutating the original

  switch (timeUnit) {
    case 'seconds':
      adjustedDate.setSeconds(adjustedDate.getSeconds() + increment);
      break;
    case 'minutes':
      adjustedDate.setMinutes(adjustedDate.getMinutes() + increment);
      break;
    case 'hours':
      adjustedDate.setHours(adjustedDate.getHours() + increment);
      break;
    case 'days':
      adjustedDate.setDate(adjustedDate.getDate() + increment);
      break;
    case 'weeks':
      adjustedDate.setDate(adjustedDate.getDate() + increment * 7); // 1 week = 7 days
      break;
    case 'months':
      adjustedDate.setMonth(adjustedDate.getMonth() + increment);
      break;
    case 'years':
      adjustedDate.setFullYear(adjustedDate.getFullYear() + increment);
      break;
    default:
      throw new Error(`Invalid time unit: ${timeUnit}`);
  }

  return adjustedDate;
}
