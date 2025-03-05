import './number.helper';
import {
  adjustDate,
  humanize,
  isDST,
  isLeapYear,
  relativeTime,
  timeDiff,
  TimeUnit,
} from './date';

/**
 * Adds the specified number of time units to a given date.
 * @param {TimeUnit} timeUnit - The unit of time to add (e.g., 'days', 'months').
 * @param {number} increment - The number of units to add (positive number).
 * @returns {Date} - The new date after the addition.
 */
function add(this: Date, timeUnit: TimeUnit, increment: number): Date {
  return adjustDate(this, timeUnit, increment);
}

/**
 * Subtracts the specified number of time units from a given date.
 * @param {TimeUnit} timeUnit - The unit of time to subtract (e.g., 'days', 'months').
 * @param {number} increment - The number of units to subtract (positive number).
 * @returns {Date} - The new date after the subtraction.
 */
function subtract(this: Date, timeUnit: TimeUnit, increment: number): Date {
  return adjustDate(this, timeUnit, -increment); // Subtract by using negative increment
}

Object.defineProperty(Date, 'add', {
  value: (
    date: Date | string | number,
    timeUnit: TimeUnit,
    increment: number,
  ): Date => {
    return adjustDate(date, timeUnit, increment);
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

Date.humanize = function (date: Date | number, format: string): string {
  return humanize.call(Date, date, format);
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

Object.defineProperty(Date, 'subtract', {
  value: (
    date: Date | string | number,
    timeUnit: TimeUnit,
    increment: number,
  ): Date => {
    return adjustDate(date, timeUnit, -increment); // Subtract by using negative increment
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

Date.timeDiff = timeDiff;

Object.defineProperty(Date.prototype, 'add', {
  value: add,
  writable: true,
  configurable: true,
  enumerable: false,
});

Date.prototype.isDST = function () {
  return isDST.call(Date, this);
};

Date.prototype.humanize = function (this: Date, format: string): string {
  return humanize.call(Date, this, format);
};

Date.prototype.isLeapYear = function (): boolean {
  return isLeapYear.call(Date, this);
};

Date.prototype.relativeTime = function (): string {
  return relativeTime(this);
};

Object.defineProperty(Date.prototype, 'subtract', {
  value: subtract,
  writable: true,
  configurable: true,
  enumerable: false,
});

Date.prototype.timeDiff = function (this: Date, to?: Date | number): number {
  return timeDiff(this, to);
};
