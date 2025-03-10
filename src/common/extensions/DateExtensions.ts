// src/extensions/DateExtensions.ts

import { humanizeTimeDiff, timeElapsed } from '../core/date';
import {
  adjustDate,
  humanize,
  isDST,
  isLeapYear,
  relativeTime,
  timeDiff,
  TimeUnit,
} from '../helpers/date';

declare global {
  interface Date {
    /**
     * Adds the specified number of time units to the date.
     *
     * @param {TimeUnit} timeUnit - The unit of time to add. Can be one of:
     *   'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'.
     * @param {number} increment - The number of units to add. Must be a positive number.
     * @returns {Date} - A new Date object with the adjusted time.
     *
     * @example
     * const newDate = new Date().add('days', 5); // Adds 5 days to the current date
     * const futureDate = new Date().add('months', 2); // Adds 2 months
     */
    add: (timeUnit: TimeUnit, increment: number) => Date;

    /**
     * Formats this date according to the provided format string.
     * Supported tokens:
     *  - YYYY: full year
     *  - MM: month (01-12)
     *  - DD: day of the month (01-31)
     *  - HH: hour (00-23)
     *  - mm: minute (00-59)
     *  - ss: second (00-59)
     *
     * @param {string} format - The format string.
     * @returns {string} The formatted date string.
     *
     * @example
     * const date = new Date('2025-02-19T09:30:00');
     * console.log(date.format('YYYY-MM-DD HH:mm:ss')); // "2025-02-19 09:30:00"
     */
    humanize(format: string): string;

    /**
     * Returns a human-readable time difference (without "ago" or "in") for this date instance,
     * compared to the current time.
     *
     * @returns A string such as "5 minutes" or "about an hour".
     *
     * @example
     * const date = new Date(Date.now() - 5 * 60 * 1000);
     * console.log(date.humanizeTimeDiff());
     * // Output: "5 minutes"
     */
    humanizeTimeDiff(): string;

    /**
     * Checks if the current `Date` object is in Daylight Saving Time (DST).
     *
     * @returns {boolean} - Returns true if the current date is in DST, otherwise false.
     *
     * @example
     * const date = new Date();
     * console.log(date.isDST()); // true or false based on DST status of the current date
     */
    isDST(): boolean;

    /**
     * Determines whether a given year is a leap year.
     *
     * This function can accept a `Date` object, a valid year (number), or a timestamp.
     * If the input is invalid (such as BCE years or out-of-range years), the function will return `false`.
     * The function will return a `TypeError` for invalid inputs.
     *
     * @returns `true` if the input year is a leap year, otherwise `false`.
     *
     * @throws `TypeError` if the input is invalid.
     *  - Invalid `Date` object.
     *  - Invalid year (e.g., negative or greater than 9999).
     *  - Invalid timestamp.
     *
     * @example
     * const date = new Date(2024, 0, 1);
     * console.log(date.isLeapYear()); // true
     */
    isLeapYear(): boolean;

    /**
     * Returns a human-readable relative time string for this date instance.
     *
     * @returns A string such as "5 minutes ago" or "in 2 days".
     *
     * @example
     * const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
     * console.log(date.humanizeRelativeTime());
     * // Output: "in 2 days"
     */
    relativeTime(): string;

    /**
     * Subtracts the specified number of time units from the date.
     *
     * @param {TimeUnit} timeUnit - The unit of time to subtract. Can be one of:
     *   'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'.
     * @param {number} increment - The number of units to subtract. Must be a positive number.
     * @returns {Date} - A new Date object with the adjusted time.
     *
     * @example
     * const newDate = new Date().subtract('days', 3); // Subtracts 3 days from the current date
     * const pastDate = new Date().subtract('weeks', 1); // Subtracts 1 week
     */
    subtract: (timeUnit: TimeUnit, increment: number) => Date;

    /**
     * Computes the time difference (in milliseconds) between this date and another date or timestamp.
     * @param {Date | number} [to=new Date()] - The end date or timestamp. Defaults to the current time.
     * @returns {number} The time difference in milliseconds.
     *
     * @example
     * const now = new Date();
     * const future = new Date(now.getTime() + 60_000);
     * console.log(now.timeDiff(future)); // -60_000
     */
    timeDiff(to?: Date | number): number;

    /**
     * Calculates the time difference between the current instance of Date and a given date.
     *
     * @param {Date | string | number} to - The target date to calculate the time difference from the current instance.
     * @param {number} [maxLevels=2] - Optional flag to restrict the output to n levels of time units. Set to `0` for unlimited levels.
     * @returns {string} The human-readable time difference between the current date and the given date.
     *
     * @example
     * const date = new Date();
     * console.log(date.timeElapsed(new Date(Date.now() - 3600 * 1000))); // "1 hour"
     */
    timeElapsed(to?: Date | string | number, maxLevels?: number): string;
  }

  interface DateConstructor {
    /**
     * Adds the specified number of time units to the current date.
     *
     * @param {TimeUnit} timeUnit - The unit of time to add. Can be one of:
     *   'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'.
     * @param {number} increment - The number of units to add. Must be a positive number.
     * @returns {Date} - A new Date object with the adjusted time.
     *
     * @example
     * const futureDate = Date.add('days', 5); // Adds 5 days to the current date
     * const newDate = Date.add('months', 2); // Adds 2 months to the current date
     */
    add: (
      date: Date | string | number,
      timeUnit: TimeUnit,
      increment: number,
    ) => Date;

    /**
     * Formats a given date (or timestamp) according to the specified format string.
     *
     * @param {Date | number} date - The date or timestamp to format.
     * @param {string} format - The format string.
     * @returns {string} The formatted date string.
     *
     * @example
     * console.log(Date.format(new Date('2025-02-19T09:30:00'), 'YYYY-MM-DD HH:mm:ss'));
     * // "2025-02-19 09:30:00"
     */
    humanize(date: Date | number, format: string): string;

    /**
     * Returns a human-readable time difference (without "ago" or "in") for the given date or timestamp,
     * compared to the current time. If no argument is provided, the current time is used.
     *
     * @param from - A Date object or timestamp.
     * @returns A string such as "5 minutes" or "about an hour".
     *
     * @example
     * console.log(Date.humanizeTimeDiff(Date.now() - 60 * 1000));
     * // Output: "about a minute"
     */
    humanizeTimeDiff(from?: Date | number): string;

    /**
     * Checks if the provided `Date` object is in Daylight Saving Time (DST).
     *
     * @param {Date} date - The Date object to check.
     * @returns {boolean} - Returns true if the provided date is in DST, otherwise false.
     *
     * @example
     * const date = new Date();
     * console.log(Date.isDST(date)); // true or false based on DST status of the provided date
     */
    isDST(date: Date): boolean;

    /**
     * Determines if a given year, `Date` instance, or timestamp represents a leap year.
     *
     * @param {Date | number} input - A `Date` instance, a timestamp (number), or a year number.
     * @returns {boolean} `true` if the year is a leap year, otherwise `false`
     * @throws {TypeError} If the input is not a valid `Date`, timestamp, or year number.
     *
     * @example
     * console.log(Date.isLeapYear(2024)); // true
     * console.log(Date.isLeapYear(new Date(2024, 0, 1))); // true
     * console.log(Date.isLeapYear(1704067200000)); // true (Timestamp for 2024-01-01)
     */
    isLeapYear(input: Date | number): boolean;

    /**
     * Returns a human-readable relative time string for the given date or timestamp.
     * If no argument is provided, the current time is used.
     *
     * @param from - A Date object or timestamp.
     * @returns A string such as "5 minutes ago" or "in 2 days".
     *
     * @example
     * const twoDaysAhead = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
     * console.log(Date.humanizeRelativeTime(twoDaysAhead));
     * // Output: "in 2 days"
     *
     * @example
     * console.log(Date.humanizeRelativeTime(Date.now() - 60 * 1000));
     * // Output: "about a minute ago"
     */
    relativeTime(from?: Date | number): string;

    /**
     * Subtracts the specified number of time units from the current date.
     *
     * @param {TimeUnit} timeUnit - The unit of time to subtract. Can be one of:
     *   'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'.
     * @param {number} increment - The number of units to subtract. Must be a positive number.
     * @returns {Date} - A new Date object with the adjusted time.
     *
     * @example
     * const pastDate = Date.subtract('days', 3); // Subtracts 3 days from the current date
     * const newDate = Date.subtract('weeks', 1); // Subtracts 1 week from the current date
     */
    subtract: (
      date: Date | string | number,
      timeUnit: TimeUnit,
      increment: number,
    ) => Date;

    /**
     * Calculates the time difference in milliseconds between two dates or timestamps.
     *
     * @param {Date | number} from - The start date or timestamp.
     * @param {Date | number} [to=new Date()] - The end date or timestamp. Defaults to now.
     * @returns {number} The time difference in milliseconds.
     *
     * @example
     * console.log(Date.timeDiff(new Date(), new Date(Date.now() + 60000))); // 60000
     */
    timeDiff(from: Date | number, to?: Date | number): number;

    /**
     * Calculates the time difference between the given date and the current date.
     *
     * @param {Date | string | number} from - The starting point to calculate the time difference from.
     * @param {Date | string | number} [to] - Optional target date to calculate the time difference. Defaults to the current date.
     * @param {number} [maxLevels=2] - Optional flag to restrict the output to n levels of time units. Set to `0` for unlimited levels.
     * @returns {string} The human-readable time difference between the provided `from` and `to` dates.
     *
     * @example
     * console.log(Date.timeElapsed(new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000))); // "3 years"
     */
    timeElapsed(
      from: Date | string | number,
      to?: Date | string | number,
      maxLevels?: number,
    ): string;
  }
}

Date.add = function (date: Date, timeUnit: TimeUnit, increment: number) {
  return adjustDate(date, timeUnit, increment);
};

Date.humanize = function (date: Date | number, format: string): string {
  return humanize.call(Date, date, format);
};

Date.humanizeTimeDiff = function (from?: Date | number): string {
  return humanizeTimeDiff(from);
};

Date.isDST = function (date: Date | string | number) {
  return isDST(date);
};

Date.isLeapYear = function (input: Date | number) {
  return isLeapYear(input);
};

Date.relativeTime = function (from?: Date | number): string {
  const target = from instanceof Date ? from : new Date(from ?? Date.now());
  return relativeTime(target);
};

Date.subtract = function (date: Date, timeUnit: TimeUnit, increment: number) {
  return adjustDate(date, timeUnit, -increment);
};

Date.timeDiff = timeDiff;

Date.timeElapsed = timeElapsed;

Date.prototype.add = function (timeUnit: TimeUnit, increment: number) {
  return adjustDate(this, timeUnit, increment);
};

Date.prototype.humanize = function (this: Date, format: string): string {
  return humanize.call(Date, this, format);
};

Date.prototype.humanizeTimeDiff = function (): string {
  return humanizeTimeDiff(Date.now(), this);
};

Date.prototype.isDST = function () {
  return isDST.call(Date, this);
};

Date.prototype.isLeapYear = function (): boolean {
  return isLeapYear.call(Date, this);
};

Date.prototype.relativeTime = function (): string {
  return relativeTime(this);
};

Date.prototype.subtract = function (timeUnit: TimeUnit, increment: number) {
  return adjustDate(this, timeUnit, -increment);
};

Date.prototype.timeDiff = function (this: Date, to?: Date | number): number {
  return timeDiff(this, to);
};

Date.prototype.timeElapsed = function () {
  return timeElapsed(this);
};
