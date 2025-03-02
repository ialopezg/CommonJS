# CommonJS

> A collection of utility functions for handling strings, numbers, dates, objects, booleans, paths,
> and more.

[![npm version](https://img.shields.io/npm/v/@ialopezg/commonjs)](https://www.npmjs.com/package/@ialopezg/commonjs)
[![Coverage Status](https://coveralls.io/repos/github/ialopezg/CommonJS/badge.svg?branch=main)](https://coveralls.io/github/ialopezg/CommonJS?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
![license](https://img.shields.io/npm/l/@ialopezg/commonjs)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@ialopezg/commonjs)](https://bundlephobia.com/result?p=my-awesome-lib)

## Installation

```bash
npm install @ialopezg/commonjs
```

## Usage

```javascript
import '@ialopezg/commonjs';

// strings
const cardNumber = '1234-5678-9098-7654';
const part1 = (cardNumber.slice(0, 4) + '-').padWithChar('*', 9, 'right');
const part2 = ('-' + cardNumber.slice(-4)).padWithChar('*', 9, 'left');
console.log([part1, part2].join('-')); // Will produce 1234-****-****-7654

// numbers
console.log('41'.padWithChar('*', 4, 'right')); // will produce 42**
console.log((42).padWithChar('0', 4, 'left')); // will produce 0042

// dates
console.log(new Date(2010, 1, 14, 15, 25, 50, 125).humanize('w, l D1 Y, h:m2:s2 a')); // will procuce Monday, February 1st 2025, 3:30:00 pm
```

## Documentation

The library is organized into several helper modules. Click on the links below for detailed usage
and examples:

| Helper                           | Description                                                                                                                                 | Extension |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|:---------:|
| [Date](docs/helpers/date.md)     | Extends native Date and DateConstructor type with extra functionalities such as: `humanize`, `humanizeTimeDiff`, `relativeTime`, `timeDiff` |  &check;  |
| [Number](docs/helpers/number.md) | Extends native Number and NumberConstructor type with extra functionalities such as: `getOrdinal`, `padWithChar`                            |  &check;  |
| [String](docs/helpers/string.md) | Extends native string type with extra functionalities such as: `padWitchChar`                                                               |  &check;  |

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is under [MIT License](LICENSE).
