# Date Helper

The Date Helper module extends the native `Date` object in JavaScript/TypeScript by adding useful
methods for formatting dates, calculating time differences, and generating human-readable time
representations.

## Installation

```sh
npm install @ialopezg/commonjs
```

## Usage

### Humanize

Formats dates according to the provided format string.

#### Instance Method

```ts
import '@ialopezg/common';

const date = new Date('2025-02-19T09:30:00');
console.log(date.humanize('Y-M-D H:m:s')); // "2025-02-19 09:30:00"
```

#### Static Method

```ts
import '@ialopezg/common';

console.log(Date.humanize(new Date('2025-02-19T09:30:00'), 'Y/m/d')); // "2025/02/19"
```

```ts
import { humanize } from '@ialopezg/common';

console.log(humanize(new Date('2025-02-19T09:30:00'), 'Y/m/d')); // "2025/02/19"
```

#### Supported Format Tokens

<table>
  <thead>
    <tr>
    <th>Function</th>
    <th>Input</th>
    <th>Output</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="5">Month</th>
      <td>M</td>
      <td>1, 2, ..., 11, 12</td>
      <td>Get the month</td>
    </tr>
    <tr>
      <td>Mo</td>
      <td>1st, 2nd, ..., 11th, 12th</td>
      <td>Get the month with its ordinal representation</td>
    </tr>
    <tr>
      <td>MM</td>
      <td>01, 02, ..., 11, 12</td>
      <td>Get the month with leading zero</td>
    </tr>
    <tr>
      <td>MMM</td>
      <td>Jan, Feb, ..., Nov, Dec</td>
      <td>Get the month name</td>
    </tr>
    <tr>
      <td>MMMM</td>
      <td>January, February, ..., November, December</td>
      <td>Get the shorthand month name</td>
    </tr>
    <tr>
      <th rowspan="3">Day of Month</th>
      <td>D</td>
      <td>1, 2, ..., 30, 31</td>
      <td>Get the month</td>
    </tr>
    <tr>
      <td>Do</td>
      <td>1st, 2nd, ..., 30th, 31st</td>
      <td>Get the day of the month with its ordinal representation</td>
    </tr>
    <tr>
      <td>DD</td>
      <td>01, 02, ..., 30, 31</td>
      <td>Get the day of the month with leading zero</td>
    </tr>
    <tr>
      <th rowspan="3">Day of Year</th>
      <td>DDD</td>
      <td>1, 2, ..., 364, 365</td>
      <td>Get the day of year</td>
    </tr>
    <tr>
      <td>DDDo</td>
      <td>1st, 2nd, ..., 364th, 365th</td>
      <td>Get the day of year with its ordinal representation</td>
    </tr>
    <tr>
      <td>DDDD</td>
      <td>001, 002, ..., 364, 36</td>
      <td>Get the day of year with leading zero</td>
    </tr>
    <tr>
      <th rowspan="4">Weekday</th>
      <td>d</td>
      <td>0, 1, ..., 5, 6</td>
      <td>Get the weekday</td>
    </tr>
    <tr>
      <td>do</td>
      <td>0th, 1st, ..., 5th, 6th</td>
      <td>Get the weekday with its ordinal representation</td>
    </tr>
    <tr>
      <td>ddd</td>
      <td>Sun, Mon, ..., Fri, Sat</td>
      <td>Get the shorthand month name</td>
    </tr>
    <tr>
      <td>dddd</td>
      <td>Sunday, Monday, ..., Friday, Saturday</td>
      <td>Get the weekday with its ordinal representation</td>
    </tr>
    <tr>
      <th rowspan="3">Week of Year</th>
      <td>w</td>
      <td>1, 2, ..., 51, 52</td>
      <td>Get the weekday</td>
    </tr>
    <tr>
      <td>wo</td>
      <td>1st, 2nd, ..., 51st, 52nd</td>
      <td>Get the weekday with its ordinal representation</td>
    </tr>
    <tr>
      <td>ww</td>
      <td>00, 01, ..., 51, 52</td>
      <td>Get the weekday with leading zero</td>
    </tr>
    <tr>
      <th rowspan="2">Year</th>
      <td>YY</td>
      <td>70, 71, ..., 29, 30</td>
      <td>Get the shorthand year</td>
    </tr>
    <tr>
      <td>YYYY</td>
      <td>1970, 1971, ..., 2029, 2030</td>
      <td>Get the year</td>
    </tr>
    <tr>
      <th rowspan="2">Time</th>
      <td>A</td>
      <td>AM, PM</td>
      <td>Get the ante or post meridian uppercased</td>
    </tr>
    <tr>
      <td>a</td>
      <td>am, pm</td>
      <td>Get the ante or post meridian lowercased</td>
    </tr>
    <tr>
      <th rowspan="4">Hours</th>
      <td>H</td>
      <td>0, 1, ..., 22, 23</td>
      <td>Get the hours, 24-hours format</td>
    </tr>
    <tr>
      <td>HH</td>
      <td>00, 01, ..., 22, 23</td>
      <td>Get the hours, 12-hours format, with leading zero and ordinal representation</td>
    </tr>
    <tr>
      <td>h</td>
      <td>0, 1, ..., 11, 12</td>
      <td>Get the hours, in 12-hours format</td>
    </tr>
    <tr>
      <td>hh</td>
      <td>00, 01, ..., 11, 12</td>
      <td>Get the hours, 12-hours format, with leading zero</td>
    </tr>
    <tr>
      <th rowspan="2">Minutes</th>
      <td>m</td>
      <td>0, 1, ..., 58, 59</td>
      <td>Get the minutes</td>
    </tr>
    <tr>
      <td>mm</td>
      <td>00, 01, ..., 58, 59</td>
      <td>Get the minutes with leading zero and ordinal representation</td>
    </tr>
    <tr>
      <th rowspan="2">Seconds</th>
      <td>s</td>
      <td>0, 1, ..., 58, 59</td>
      <td>Get the seconds</td>
    </tr>
    <tr>
      <td>ss</td>
      <td>00, 01, ..., 58, 59</td>
      <td>Get the seconds with leading zero and ordinal representation</td>
    </tr>
  </tbody>
</table>

---

### Time Difference Calculation

Computes the time difference (in milliseconds) between this date and another date or timestamp.

#### Instance Method

```ts
import '@ialopezg/common';

const now = new Date();
const future = new Date(now.getTime() + 60000);
console.log(now.timeDiff(future)); // -60000
```

#### Static Method

```ts
import '@ialopezg/common';

console.log(Date.timeDiff(new Date(), new Date(Date.now() + 60000))); // will produce 60000
```

#### Calling the function

```ts
import { timeDiff } from '@ialopezg/common';

console.log(timeDiff(new Date(), new Date(Date.now() + 60000))); // will produce 60000
```

---

### Human-Readable Time Difference

Computes a human-readable time difference (without "ago" or "in") for this date instance, compared
to the current time.

#### Instance Method

```ts
import '@ialopezg/common';

const date = new Date(Date.now() - 5 * 60 * 1000);
console.log(date.humanizeTimeDiff()); // "5 minutes"
```

#### Static Method

```ts
import '@ialopezg/common';

console.log(Date.humanizeTimeDiff(Date.now() - 60 * 1000)); // "about a minute"
```

#### Calling the function

```ts
import { humanizeTimeDiff } from '@ialopezg/common';

console.log(humanizeTimeDiff(Date.now() - 60 * 1000)); // "about a minute"
```

---

### Human-Readable Relative Time

Computes a human-readable relative time string for this date instance.

#### Instance Method

```ts
import '@ialopezg/common';

const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
console.log(date.relativeTime()); // "in 2 days"
```

#### Static Method

```ts
import '@ialopezg/common';

console.log(Date.relativeTime(Date.now() - 60 * 1000)); // "about a minute ago"
```

#### Calling the function

```ts
import { relativeTime } from '@ialopezg/common';

console.log(relativeTime(Date.now() - 60 * 1000)); // "about a minute"
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
