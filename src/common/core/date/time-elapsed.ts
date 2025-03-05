import { getTimeUnits } from './get-time-units';

/**
 * Returns a human-readable string representing the time elapsed between two dates or from a single date to the current time.
 * Optionally limits the number of time units shown in the result.
 *
 * @param {Date | string | number} from - The starting point (a Date, timestamp, or string). If `to` is not provided, `from` will be compared to the current time.
 * @param {Date | string | number} [to] - The endpoint (a Date, timestamp, or string). Defaults to the current time if not provided.
 * @param {number} [maxLevels=2] - Optional flag to restrict the output to n levels of time units. Default to 2, which means only two levels will be displayed. Set to `0` for unlimited levels.
 *
 * @returns {string} A human-readable string representing the time difference, e.g., "1 year, 2 months, 3 days".
 *
 * @example
 * // Example 1: No limit, show all units
 * console.log(Date.timeElapsed(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)));
 * // Output: "1 year"
 *
 * @example
 * // Example 2: Limit to 2 units
 * console.log(Date.timeElapsed(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), undefined, 2));
 * // Output: "1 year"
 *
 * @example
 * // Example 3: Limit to 1 unit
 * console.log(Date.timeElapsed(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), undefined, 1));
 * // Output: "1 year"
 */
export function timeElapsed(
  from: Date | string | number,
  to?: Date | string | number,
  maxLevels: number = 2,
): string {
  const { parts, approx } = getTimeUnits(from, to);

  // If maxLevels is provided, limit the number of parts
  if (maxLevels > 0) {
    parts.length = Math.min(parts.length, maxLevels);
  }

  let result =
    parts.length === 1
      ? `${parts[0].count} ${parts[0].unit}`
      : parts
          .slice(0, -1)
          .map((p) => `${p.count} ${p.unit}`)
          .join(', ') +
        ' and ' +
        `${parts[parts.length - 1].count} ${parts[parts.length - 1].unit}`;

  return approx ? `About ${result}` : result;
}
