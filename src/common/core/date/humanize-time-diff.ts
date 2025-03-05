/**
 * Returns a human-readable time difference between two dates or timestamps.
 *
 * If the `to` parameter is not provided, it defaults to `Date.now()`, meaning the `from`
 * date will be compared with the current time.
 *
 * @param {Date | string | number} from - The starting date/time. Can be a `Date` object, a timestamp, or a date string.
 * @param {Date | string | number} [to=Date.now()] - The ending date/time. Defaults to `Date.now()`.
 * @returns {string} A human-friendly string representing the time difference.
 *
 * @example
 * console.log(Date.humanizeTimeDiff(new Date(Date.now() - 30000))); // "less than a minute"
 * console.log(Date.humanizeTimeDiff(Date.now() - 65000)); // "about a minute"
 * console.log(Date.humanizeTimeDiff(new Date('2025-03-01'), new Date('2025-03-04'))); // "3 days"
 */
export const humanizeTimeDiff = (
  from: Date | string | number,
  to: Date | string | number = Date.now(),
): string => {
  const fromDate = from instanceof Date ? from : new Date(from);
  const toDate = to instanceof Date ? to : new Date(to);
  const milliseconds = Math.abs(toDate.getTime() - fromDate.getTime());
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  const options = {
    s: 'just now',
    ss: 'less than a minute',
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

  if (seconds < 10) return options.s;
  if (seconds < 45) return options.ss;
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
