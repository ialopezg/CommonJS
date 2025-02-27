import './number.helper';

declare global {
  interface Date {
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

    /**
     * Returns a human-readable relative time string for this date compared to now.
     * For example, "1 minute ago" or "in 2 hours".
     *
     * @param {Date | number} [from] - The starting date or timestamp. Defaults to now.
     * @returns {string} A relative time string.
     *
     * @example
     * console.log(new Date(Date.now() - 60000).timeAgo()); // "1 minute ago"
     */
    timeAgo(from?: Date | number): string;

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
    format(format: string): string;
  }

  interface DateConstructor {
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

    /**
     * Returns a human-readable relative time string for the given date or timestamp compared to now.
     *
     * @param {Date | number} [from] - The starting date or timestamp. Defaults to now.
     * @returns {string} A relative time string (e.g., "1 minute ago", "in 2 hours").
     *
     * @example
     * console.log(Date.timeAgo(new Date(Date.now() - 60000))); // "1 minute ago"
     */
    timeAgo(from?: Date | number): string;

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
    format(date: Date | number, format: string): string;
  }
}

/**
 * Computes a formatted date string from a Date instance.
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
const computeFormat = function (
  this: Date | typeof Date | number,
  format: string,
): string {
  let date: Date;
  // If called as an instance method (this is a Date) or if this is a number (timestamp)
  if (this instanceof Date) {
    date = this;
  } else {
    if (arguments.length > 1) {
      date = new Date(arguments[0] as Date | number);
      format = arguments[1] as string;
    }
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
  const replacements = {
    /* ===== DAY OF MONTH ===== */
    j: () => date.getDate(),
    d: () => date.getDate().padWithChar(),
    S: () => date.getDate().getOrdinal(),
    /* ===== DAY OF WEEK ===== */
    l: () => weekdays[date.getDay()],
    D: () => weekdays[date.getDay()].slice(0, 3),
    w: () => date.getDay(),
    N: () => date.getDay() || 7,
    /* ===== DAY OF YEAR ===== */
    z: () => {
      const a = new Date(
        replacements.Y(),
        replacements.n() - 1,
        replacements.j(),
      ).getTime();
      const b = new Date(replacements.Y(), 0, 1).getTime();

      return ((a - b) / 846e5 + 0.5) | 0;
    },
    /* ===== WEEK ===== */
    W: () => {
      const a = new Date(
        replacements.Y(),
        replacements.n() - 1,
        replacements.j(),
      ).getTime();
      const b = new Date(replacements.Y(), 0, 4).getTime();

      return (((a - b) / 846e5 / 7 + 1.5) | 0).padWithChar();
    },
    /* ===== MONTH ===== */
    n: () => date.getMonth() + 1,
    m: () => replacements.n().padWithChar(),
    F: () => months[replacements.n() - 1],
    M: () => replacements.F().slice(0, 3),
    t: () => new Date(replacements.Y(), replacements.n(), 0).getDate(),
    /* ===== YEAR ===== */
    L: () => new Date(replacements.Y(), 1, 29).getMonth() === 1 || false,
    Y: () => date.getFullYear(),
    y: () => String(replacements.Y()).slice(-2),
    /* ===== TIME ===== */
    a: () => (replacements.G() > 11 ? 'pm' : 'am'),
    A: () => replacements.a().toUpperCase(),
    B: () => {
      const hours = date.getUTCHours() * 3600;
      const minutes = date.getUTCMinutes() * 60;
      const seconds = date.getUTCSeconds();

      return String(
        ((hours + minutes + seconds + 3600) / 86.4) % 1e3 | 0,
      ).padWithChar('0', 3);
    },
    /* ===== HOURS ===== */
    g: () => replacements.G() % 12 || 12,
    h: () => replacements.g().padWithChar(),
    G: () => date.getHours(),
    H: () => replacements.G().padWithChar(),
    /* ===== MINUTES SECONDS MILLISECONDS ===== */
    i: () => date.getMinutes().padWithChar(),
    s: () => date.getSeconds().padWithChar(),
    U: () => (date.getTime() / 1000) | 0,
    /* ===== TIMEZONE ===== */
    I: () => {
      const year = replacements.Y();
      const offset = Math.max(
        new Date(year, 0, 1).getTimezoneOffset(),
        new Date(year, 0, 6).getTimezoneOffset(),
      );

      return date.getTimezoneOffset() < offset;
    },
    O: () => {
      const offset = date.getTimezoneOffset();

      return (
        (offset > 0 ? '-' : '+') +
        Math.abs((offset / 60) * 100).padWithChar('0', 4)
      );
    },
    P: () => {
      const offset = replacements.O();

      return offset.slice(0, 3) + ':' + offset.slice(-2);
    },
    Z: () => -date.getTimezoneOffset() * 60,
  };

  return format.replace(/[ABDFGHILMNOPSUWYZadghijlmnstwyz]/g, (token) =>
    replacements[token](),
  );
};

/**
 * Computes the time difference in milliseconds between two dates or timestamps.
 */
const computeTimeAgo = function (
  this: Date | typeof Date,
  from?: Date | number,
): string {
  const base = this instanceof Date ? this : new Date(from ?? new Date());
  const difference = computeTimeDiff(base as Date);
  const seconds = Math.abs(difference) / 1000;
  const minutes = seconds / 60;
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  const options = {
    future: 'in %d',
    past: '%d ago',
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
  const pattern = /%d/i;

  return (
    (seconds < 45 && options.ss.replace(pattern, String(seconds))) ||
    (seconds < 90 && options.m) ||
    (minutes < 45 && options.mm.replace(pattern, String(minutes))) ||
    (minutes < 90 && options.h) ||
    (hours < 24 && options.hh.replace(pattern, String(hours))) ||
    (hours < 48 && options.d) ||
    (days < 30 && options.dd.replace(pattern, String(days))) ||
    (days < 60 && options.n) ||
    (days < 350 && options.nn.replace(pattern, String(days))) ||
    (years < 2 && options.y) ||
    options.yy.replace(pattern, String(years))
  );
};

/**
 * Computes the time difference in milliseconds between two dates or timestamps.
 */
const computeTimeDiff = (
  from: Date | number,
  to: Date | number = new Date(),
): number => {
  const fromTime = typeof from === 'number' ? from : from.getTime();
  const toTime = typeof to === 'number' ? to : to.getTime();

  return toTime - fromTime;
};

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
 * // For a 5 minute difference (300,000 ms):
 * console.log(humanizeTimeDiff(5 * 60 * 1000)); // "5 minutes"
 *
 * @example
 * // For an 1 minute difference (60,000 ms):
 * console.log(humanizeTimeDiff(60 * 1000)); // "about a minute"
 */
const humanizeTimeDiff = function (milliseconds: number): string {
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

// Assign the shared functions to DateConstructor (static methods)
Date.format = function (date: Date | number, format: string): string {
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
Date.timeAgo = computeTimeAgo;
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
Date.prototype.timeAgo = computeTimeAgo;
Date.prototype.format = function (this: Date, format: string): string {
  return computeFormat.call(this, format);
};
