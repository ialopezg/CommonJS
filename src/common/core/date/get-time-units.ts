type TimeUnit = {
  token: string;
  singular: string;
  plural: string;
  value: number;
};

type TimeUnitResult = {
  count: number;
  unit: string;
};

/**
 * Calculates the difference between two dates (or date-like values) in terms of time units (years, months, days, hours, minutes, seconds).
 * The result includes an array of time unit counts and a flag indicating whether the result is approximate.
 *
 * @param {Date | string | number} from - The starting date, time, or timestamp to calculate the difference from.
 * @param {Date | string | number} [to] - The ending date, time, or timestamp to calculate the difference to. Defaults to the current date and time.
 *
 * @returns {{ parts: TimeUnitResult[], approx: boolean }} - The breakdown of time units and a flag indicating if the result is approximate.
 * - `parts`: An array of objects where each object contains the `count` (number of units) and the `unit` (time unit) such as 'years', 'months', etc.
 * - `approx`: A boolean indicating whether the calculation is approximate (true if there are fractional units left).
 *
 * @example
 * // Example usage
 * const result = getTimeUnits('2023-01-01', '2024-01-01');
 * console.log(result.parts); // [{ count: 1, unit: 'years' }]
 * console.log(result.approx); // false
 */
export function getTimeUnits(
  from: Date | string | number,
  to?: Date | string | number,
) {
  const fromDate = from instanceof Date ? from : new Date(from);
  const toDate = to ? (to instanceof Date ? to : new Date(to)) : new Date();
  const diffMs = Math.abs(toDate.getTime() - fromDate.getTime());

  const TIME_UNITS = [
    {
      token: 'y',
      singular: 'year',
      plural: 'years',
      value: 1000 * 60 * 60 * 24 * 365,
    },
    {
      token: 'm',
      singular: 'month',
      plural: 'months',
      value: 1000 * 60 * 60 * 24 * 30,
    },
    { token: 'd', singular: 'day', plural: 'days', value: 1000 * 60 * 60 * 24 },
    { token: 'h', singular: 'hour', plural: 'hours', value: 1000 * 60 * 60 },
    { token: 'm', singular: 'minute', plural: 'minutes', value: 1000 * 60 },
    { token: 's', singular: 'second', plural: 'seconds', value: 1000 },
  ];

  let remainingMs = diffMs;
  const parts = [];

  // Handle case where the difference is less than 60 seconds
  if (remainingMs < 60 * 1000) {
    parts.push({ count: remainingMs / 1000, unit: 'seconds' });
    return { parts, approx: false };
  }

  // Calculate time units based on the remaining milliseconds
  for (const { token, singular, plural, value } of TIME_UNITS) {
    const count = Math.floor(remainingMs / value);

    if (count > 0) {
      parts.push({ count, unit: count === 1 ? singular : plural });
      remainingMs -= count * value;
    }
  }

  return { parts, approx: false };
}
