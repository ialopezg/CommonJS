
# Time Elapsed Library

A simple utility to calculate the human-readable difference between two dates. This library includes extensions for `Date` and `DateConstructor` along with a standalone `timeElapsed` function.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Date Extensions](#date-extensions)
  - [Standalone Function](#standalone-function)
- [Configuration](#configuration)
- [Examples](#examples)

## Installation

You can install the library via npm or yarn.

```bash
npm install '@ialopezg/commonjs';
```

or

```bash
yarn add '@ialopezg/commonjs';
```

## Usage

### Date Extensions

The `Date` and `DateConstructor` are extended with the `timeElapsed` method, which allows you to call `timeElapsed` directly on any `Date` instance.

```typescript
const date = new Date();
console.log(date.timeElapsed(new Date(Date.now() - 3600 * 1000))); // "1 hour"
```

### Standalone Function

The standalone `timeElapsed` function can be used to calculate the time difference between two dates without needing to extend `Date`.

```typescript
import { timeElapsed } from 'time-elapsed';

const timeDiff = timeElapsed(new Date(Date.now() - 3600 * 1000)); // "1 hour"
console.log(timeDiff);
```

### Parameters for `timeElapsed`

Both the `timeElapsed` method on `Date` and the standalone function share the same parameters.

#### `timeElapsed(from: Date | string | number, to?: Date | string | number, maxLevels: number = 2)`

- **from**: The starting point to calculate the time difference from. Can be a `Date`, `string`, or `number` (timestamp).
- **to**: Optional. The target date to calculate the time difference to. Defaults to the current date if not provided.
- **maxLevels**: Optional. A number to limit the output to a certain number of time units. The default is `2`, which means the result will include up to 2 time units. Set to `0` for unlimited levels (all available time units will be shown).

### Return Value

The function returns a string representing the time difference between `from` and `to`, formatted in a human-readable way. The result includes the appropriate singular or plural units, depending on the difference, and it will only include non-zero time units unless restricted by `maxLevels`.

## Configuration

- `maxLevels`: The number of time units to include in the result (default is `2`). Set to `0` to include all available units. For example:
  - `"1 year, 6 months, 15 days, 12 hours, 30 minutes and 30 seconds"`
  - With `maxLevels = 2`, it will return: `"1 year and 6 months"`

## Examples

### Example 1: Basic Usage
```typescript
const diff = timeElapsed(new Date(Date.now() - 3600 * 1000)); // "1 hour"
console.log(diff);
```

### Example 2: With `maxLevels`
```typescript
const diff = timeElapsed(new Date(Date.now() - 3600 * 1000), 1); // "1 hour"
console.log(diff);
```

### Example 3: Unlimited Levels (`maxLevels = 0`)
```typescript
const diff = timeElapsed(new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000), 0); // "3 years"
console.log(diff);
```

### Example 4: Using the `Date` extension
```typescript
const date = new Date();
console.log(date.timeElapsed(new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000))); // "3 years"
```

