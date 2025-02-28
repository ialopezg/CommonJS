# Date Helper

The Date Helper module extends the native `Date` object in JavaScript/TypeScript by adding useful methods for formatting dates, calculating time differences, and generating human-readable time representations.

## Installation

```sh
npm install your-library-name
```

## Usage

### Formatting Dates

#### Instance Method
```ts
const date = new Date('2025-02-19T09:30:00');
console.log(date.format('Y-M-D H:m:s')); // "2025-02-19 09:30:00"
```

#### Static Method
```ts
console.log(Date.format(new Date('2025-02-19T09:30:00'), 'Y/m/d'));
// "2025/02/19"
```

#### Supported Format Tokens
- `j` - Day of the month (1, 2, ..., 30, 31)
- `d` - Date of the month leading zero (01, 02, ..., 30, 31)
- `S` - Ordinal day of the month (1st, 2nd, ..., 30th, 31st)
- `l` - Weekday name (Sunday, Monday, ..., Friday, Saturday)
- `D` - Weekday shorthand name (Sun, Mon, ..., Fri, Sat)
- `w` - Weekday number (0[Sun], 1[Mon], ..., 5[Fri], 6[Sat])
- `N` - Weekday number, starting from 1 (1[Sun], 2[Mon], ..., 6[Fri], 7[Sat])
- `z` - Day of the year (1, 2, ..., 364, 366)
- `W` - Week of the year (1, 2, ..., 51, 52)
- `n` - Month number (1, 2, ..., 11, 12)
- `m` - Month number leading zero (01, 02, ..., 11, 12)
- `M` - Month name (January, February, ..., November, December)
- `M` - Month name shorthand (Jan, Feb, ..., Nov, Dec)
- `t` - Days in month (31, 28/29, ..., 30, 31)
- `L` - Whether date is from a leap year (e.g., 1972, 1976, ..., 2024, 2028)
- `Y` - Full year (e.g., 1970, 1971, ..., 2029, 2030)
- `Y` - Year shorthand (e.g., 70, 71, ..., 29, 30)
- `a` - Ante or post meridian (am, pm)
- `A` - Ante or post meridian (AM, PM)
- `B` - Time difference between local and UTC time
- `g` - Hour, 12-hours format (1, 2, ..., 11, 12)
- `h` - Hour, 12-hours format leading zero (01, 02, ..., 11, 12)
- `G` - Hour, 24-hours format (0, 1, ..., 22, 23)
- `H` - Hour, 24-hours format leading zero (00, 01, ..., 22, 23)
- `i` - Minute (00, 01, ..., 58, 59)
- `s` - Second (00, 01, ..., 58, 59)
- `U` - Millisecond
- `I` - Whether date is DST observer
- `O` - Timezone offset to GMT (+0500)
- `P` - Timezone offset to GMT (+05:00)
- `Z` - Timezone offset to GMT in seconds

---

### Time Difference Calculation

#### Instance Method
```ts
const now = new Date();
const future = new Date(now.getTime() + 60000);
console.log(now.timeDiff(future)); // -60000
```

#### Static Method
```ts
console.log(Date.timeDiff(new Date(), new Date(Date.now() + 60000))); // 60000
```

---

### Human-Readable Time Difference

#### Instance Method
```ts
const date = new Date(Date.now() - 5 * 60 * 1000);
console.log(date.humanizeTimeDiff()); // "5 minutes"
```

#### Static Method
```ts
console.log(Date.humanizeTimeDiff(Date.now() - 60 * 1000));
// "about a minute"
```

---

### Human-Readable Relative Time

#### Instance Method
```ts
const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
console.log(date.relativeTime()); // "in 2 days"
```

#### Static Method
```ts
console.log(Date.relativeTime(Date.now() - 60 * 1000));
// "about a minute ago"
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
