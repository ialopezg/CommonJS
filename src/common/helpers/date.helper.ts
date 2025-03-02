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
    M: () => currentMonth + 1,
    Mo: () => (currentMonth + 1).getOrdinal(),
    MM: () => (currentMonth + 1).padWithChar('0', 2),
    MMM: () => months[currentMonth].slice(0, 3),
    MMMM: () => months[currentMonth],

    /* ===== DAY OF MONTH ===== */
    D: () => currentDate,
    Do: () => currentDate.getOrdinal(),
    DD: () => currentDate.padWithChar('0', 2),

    /* ===== DAY OF YEAR ===== */
    DDD: () => {
      const from = new Date(currentYear, 0, 1);
      const to = new Date(currentYear, currentMonth, currentDate);

      return (computeTimeDiff(from, to) / 864e5 + 1.5) | 0;
    },
    DDDo: () => options.DDD().getOrdinal(),
    DDDD: () => options.DDD().padWithChar('0', 3),

    /* ===== WEEKDAY ===== */
    d: () => currentDay,
    do: () => currentDay.getOrdinal(),
    dd: () => currentDay.padWithChar('0', 2),
    ddd: () => weekdays[currentDay].slice(0, 3),
    dddd: () => weekdays[currentDay],

    /* ===== WEEK OF YEAR ===== */
    w: () => {
      const to = new Date(
        currentYear,
        currentMonth,
        currentDate - currentDay + 5,
      );
      const from = new Date(to.getFullYear(), 0, 4);

      return (computeTimeDiff(from, to) / 864e5 / 7 + 1.5) | 0;
    },
    wo: () => options.w().getOrdinal(),
    ww: () => options.w().padWithChar('0', 2),

    /* ===== YEAR ===== */
    YY: () => String(currentYear).slice(-2),
    YYYY: () => currentYear,

    /* ===== TIME ===== */
    A: () => (currentHours > 11 ? 'PM' : 'AM'),
    a: () => (currentHours > 11 ? 'pm' : 'am'),

    /* ===== HOURS ===== */
    H: () => currentHours,
    HH: () => currentHours.padWithChar('0', 2),
    h: () => currentHours % 12 || 12,
    hh: () => options.h().padWithChar('0', 2),

    /* ===== MINUTES ===== */
    m: () => currentMinutes,
    mm: () => currentMinutes.padWithChar('0', 2),

    /* ===== SECONDS ===== */
    s: () => currentSeconds,
    ss: () => currentSeconds.padWithChar('0', 2),
  };

  return format.replace(
    /Mo|MM?M?M?|Do|DDDo|DD?D?D?|do|dd?d?d?|w[o|w]?|YYYY|YY|[aA]|hh?|HH?|mm?|ss?/g,
    (token) => options[token](),
  );
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
    s: 'less than a minute',
    m: 'about a minute',
    mm: '%d minutes',
    h: 'about an hour',
    hh: 'about %d hours',
    d: 'a day',
    dd: '%d days',
    M: 'about a month',
    MM: '%d months',
    y: 'about a year',
    yy: '%d years',
  };

  if (seconds < 45) return options.s;
  if (seconds < 90) return options.m;
  if (minutes < 45)
    return options.mm.replace('%d', String(Math.floor(minutes)));
  if (minutes < 90) return options.h;
  if (hours < 24) return options.hh.replace('%d', String(Math.floor(hours)));
  if (hours < 48) return options.d;
  if (days < 30) return options.dd.replace('%d', String(Math.floor(days)));
  if (days < 60) return options.M;
  if (days < 350)
    return options.MM.replace('%d', String(Math.floor(days / 30)));
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
