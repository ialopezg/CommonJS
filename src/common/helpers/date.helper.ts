import './number.helper';

declare global {
  interface Date {
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
     * Computes the time difference (in milliseconds) between this date and another date or timestamp.
     * @param {Date | number} [to=new Date()] - The end date or timestamp. Defaults to the current time.
     * @returns {number} The time difference in milliseconds.
     *
     * @example
     * const now = new Date();
     * const future = new Date(now.getTime() + 60000);
     * console.log(now.timeDiff(future)); // -60000
     */
    timeDiff(to?: Date | number): number;
  }

  interface DateConstructor {
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
  }
}

/**
 * Computes a human-readable formatted date string from a Date instance.
 * This function is shared by both the Date constructor and Date.prototype.
 *
 * When used as a static method:
 *   Date.format(date, formatString)
 *   - `this` refers to the Date constructor, and the first argument is the date to format.
 *
 * When used as an instance method:
 *   date.format(formatString)
 *   - `this` is the Date instance to format.
 *
 * Supported tokens in the format string:
 *   - YYYY: full year (e.g., 2025)
 *   - MM: month (01-12)
 *   - DD: day of month (01-31)
 *   - HH: hours (00-23)
 *   - mm: minutes (00-59)
 *   - ss: seconds (00-59)
 *
 * @param {Date} date - Value to be analyzed.
 * @param {string} format - The format string.
 * @returns {string} The formatted date string.
 *
 * @example
 * // Using as an instance method:
 * const date = new Date('2025-02-19T09:30:00');
 * console.log(date.format('YYYY-MM-DD HH:mm:ss')); // "2025-02-19 09:30:00"
 *
 * @example
 * // Using as a static method:
 * console.log(Date.format(new Date('2025-02-19T09:30:00'), 'YYYY/MM/DD')); // "2025/02/19"
 */
export const humanize = (
  date: Date | typeof Date | number,
  format: string,
): string => {
  return computeFormat.call(Date, date, format);
};

const computeFormat = function (
  this: Date | typeof Date | number,
  format: string,
): string {
  let date: Date;
  // If called as an instance method (this is a Date) or if this is a number (timestamp)
  if (this instanceof Date) {
    date = this;
  } else {
    date = new Date(arguments[0] as Date | number);
    format = arguments[1] as string;
  }

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();
  const options = {
    /* ===== MONTH ===== */
    L: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal
        ? (currentMonth + 1).getOrdinal()
        : currentMonth + 1;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },
    l: (shorthand: boolean) =>
      shorthand ? months[currentMonth].slice(0, 3) : months[currentMonth],

    /* ===== DAY OF MONTH ===== */
    D: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal ? currentDate.getOrdinal() : currentDate;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },

    /* ===== DAY OF YEAR ===== */
    d: (ordinal: boolean, zerofill: boolean) => {
      const difference =
        (computeTimeDiff(
          new Date(currentYear, 0, 1),
          new Date(currentYear, currentMonth, currentDate),
        ) /
          864e5 +
          1.5) |
        0;
      const output = ordinal ? difference.getOrdinal() : difference;

      return zerofill ? output.padWithChar('0', ordinal ? 5 : 3) : output;
    },

    /* ===== WEEKDAY ===== */
    W: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal ? currentDay.getOrdinal() : currentDay;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },
    w: (shorthand: boolean) =>
      shorthand ? weekdays[currentDay].slice(0, 3) : weekdays[currentDay],

    /* ===== WEEK OF YEAR ===== */
    K: (ordinal: boolean, zerofill: boolean) => {
      const to = new Date(
        currentYear,
        currentMonth,
        currentDate - currentDay + 5,
      );
      const from = new Date(to.getFullYear(), 0, 4);
      const difference = (computeTimeDiff(from, to) / 864e5 / 7 + 1.5) | 0;
      const output = ordinal ? difference.getOrdinal() : difference;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },

    /* ===== YEAR ===== */
    Y: (shorthand: boolean) =>
      shorthand ? String(currentYear).slice(-2) : currentYear,

    /* ===== TIME ===== */
    A: () => (currentHours > 11 ? 'PM' : 'AM'),
    a: () => (currentHours > 11 ? 'pm' : 'am'),

    /* ===== HOURS ===== */
    H: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal ? currentHours.getOrdinal() : currentHours;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },
    h: (ordinal: boolean, zerofill: boolean) => {
      const result = currentHours % 12 || 12;
      const output = ordinal ? result.getOrdinal() : result;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },

    /* ===== MINUTES ===== */
    m: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal ? currentMinutes.getOrdinal() : currentMinutes;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },

    /* ===== SECONDS ===== */
    s: (ordinal: boolean, zerofill: boolean) => {
      const output = ordinal ? currentSeconds.getOrdinal() : currentSeconds;

      return zerofill ? output.padWithChar('0', ordinal ? 4 : 2) : output;
    },
  };

  const replaceFn = (input: string) => {
    const option = input.charAt(0);
    const param = parseInt(input.charAt(1), 10) || 0;

    return options[option] ? options[option](param & 1, param >> 1) : input;
  };

  return format.replace(/[a-z][0-9]?/gi, replaceFn);
};

const computeTimeDiff = (
  from: Date | number,
  to: Date | number = new Date(),
): number => {
  const fromTime = typeof from === 'number' ? from : from.getTime();
  const toTime = typeof to === 'number' ? to : to.getTime();

  return toTime - fromTime;
};

/**
 * Computes the time difference in milliseconds between two dates or timestamps.
 */
export const timeDiff = computeTimeDiff;

/**
 * Converts a time difference (in milliseconds) into a human-readable string.
 *
 * This function takes the absolute difference between two times and converts it into
 * a friendly string representation (for example, "5 minutes" or "about an hour").
 * It does not add any "ago" or "in" wording.
 *
 * @param milliseconds - The time difference in milliseconds. Can be positive or negative.
 * @returns A human-friendly string representing the time difference.
 *
 * @example
 * // For a 5-minute difference (300,000 ms):
 * console.log(humanizeTimeDiff(5 * 60 * 1000)); // "5 minutes"
 *
 * @example
 * // For an 1-minute difference (60,000 ms):
 * console.log(humanizeTimeDiff(60 * 1000)); // "about a minute"
 */
export const humanizeTimeDiff = function (milliseconds: number): string {
  const absDiff = Math.abs(milliseconds);
  const seconds = absDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  const options = {
    ss: 'less than a minute',
    m: 'about a minute',
    mm: '%d minutes',
    h: 'about an hour',
    hh: 'about %d hours',
    d: 'a day',
    dd: '%d days',
    n: 'about a month',
    nn: '%d months',
    y: 'about a year',
    yy: '%d years',
  };

  if (seconds < 45) return options.ss;
  if (seconds < 90) return options.m;
  if (minutes < 45)
    return options.mm.replace('%d', String(Math.floor(minutes)));
  if (minutes < 90) return options.h;
  if (hours < 24) return options.hh.replace('%d', String(Math.floor(hours)));
  if (hours < 48) return options.d;
  if (days < 30) return options.dd.replace('%d', String(Math.floor(days)));
  if (days < 60) return options.n;
  if (days < 350)
    return options.nn.replace('%d', String(Math.floor(days / 30)));
  if (years < 2) return options.y;
  return options.yy.replace('%d', String(Math.floor(years)));
};

/**
 * Returns a human-readable relative time difference string for a given target date.
 *
 * This function calculates the difference between the target date and the current time,
 * then converts that difference to a friendly string by calling `humanizeTimeDiff`.
 * It appends "ago" for past dates or prefixes with "in" for future dates.
 *
 * @param targetDate - The date to compare with the current time.
 * @returns A string such as "5 minutes ago" or "in 2 days".
 *
 * @example
 * const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
 * console.log(humanizeRelativeTimeImpl(fiveMinutesAgo));
 * // Output: "5 minutes ago"
 *
 * @example
 * const twoDaysAhead = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
 * console.log(humanizeRelativeTimeImpl(twoDaysAhead));
 * // Output: "in 2 days"
 */
function computeRelativeTime(targetDate: Date): string {
  const diff = Date.now() - targetDate.getTime();
  const base = humanizeTimeDiff(diff);
  return diff >= 0 ? `${base} ago` : `in ${base}`;
}

export const relativeTime = computeRelativeTime;

// Assign the shared functions to DateConstructor (static methods)
Date.humanize = function (date: Date | number, format: string): string {
  return computeFormat.call(Date, date, format);
};
Date.humanizeTimeDiff = function (from?: Date | number): string {
  const target = from instanceof Date ? from : new Date(from ?? Date.now());
  return humanizeTimeDiff(Date.now() - target.getTime());
};

Date.relativeTime = function (from?: Date | number): string {
  const target = from instanceof Date ? from : new Date(from ?? Date.now());
  return computeRelativeTime(target);
};
Date.timeDiff = computeTimeDiff;

// Assign the shared functions to Date.prototype (instance methods)
Date.prototype.humanizeTimeDiff = function (): string {
  return humanizeTimeDiff(Date.now() - this.getTime());
};
Date.prototype.relativeTime = function (): string {
  return computeRelativeTime(this);
};
Date.prototype.timeDiff = function (this: Date, to?: Date | number): number {
  return computeTimeDiff(this, to);
};
Date.prototype.humanize = function (this: Date, format: string): string {
  return computeFormat.call(this, format);
};
