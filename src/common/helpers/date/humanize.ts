import { humanizeTimeDiff } from '../../core/date';

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
    (token) => (options[token] ? options[token]() : token),
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
  const base = humanizeTimeDiff(targetDate);
  return diff >= 0 ? `${base} ago` : `in ${base}`;
}

export const relativeTime = computeRelativeTime;
