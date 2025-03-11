# Adjust Date

This documentation provides details on the `adjustDate` function, which is used internally by the
`add` and `subtract` methods that extend the `Date` prototype. Unlike `add` and `subtract`,
`adjustDate` is a **standalone utility function** that allows adjusting dates without requiring a
`Date` object instance.

## Function Overview

### `adjustDate(date: Date | string | number, timeUnit: TimeUnit = 'days', increment: number): Date`

A utility function for adjusting dates by a specified time unit.

#### Parameters:

- **`date`** (`Date | string | number`):  
  The base date to adjust. It accepts:
  - A `Date` object
  - A date string (ISO format recommended)
  - A timestamp (milliseconds since the Unix epoch)

- **`timeUnit`** (`'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'`):  
  The unit of time to adjust. Default is `'days'`.

- **`increment`** (`number`):  
  The number of units to adjust.
  - **Positive values** → Move forward in time
  - **Negative values** → Move backward in time

#### Returns:

- **`Date`**: A new `Date` object with the adjusted time.# AdjustDate Utilities

This documentation provides usage instructions for extending the `Date` object with `add` and
`subtract` methods, and includes a standalone `adjustDate` function for adjusting dates by specific
time units.

## Functions

### `adjustDate(date: Date | string | number, timeUnit: TimeUnit = 'days', increment: number): Date`

Adjust the provided date by a given time unit and increment.

#### Parameters:

- **`date`** (`Date | string | number`): The base date to adjust. It can be a `Date` object, a date
  string, or a timestamp (number).
- **`timeUnit`** (`'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'`):  
  The unit of time to adjust. Default is `'days'`.
- **`increment`** (`number`): The number of units to adjust. A **positive number** adds time, while
  a **negative number** subtracts time.

#### Returns:

- **`Date`**: The adjusted `Date` object.

## Time Units

Below are the available time units and their explicit meanings:

- **`'seconds'`** – Adjusts the specified number of seconds.
- **`'minutes'`** – Adjusts the specified number of minutes.
- **`'hours'`** – Adjusts the specified number of hours.
- **`'days'`** – Adjusts the specified number of days.
- **`'weeks'`** – Adjusts the specified number of weeks (7 days per week).
- **`'months'`** – Adjusts the specified number of months, considering varying month lengths.
- **`'years'`** – Adjusts the specified number of years, accounting for leap years when applicable.

## Usage Examples

```typescript
// Adjust a date by adding 5 days
adjustDate('2025-03-01T12:00:00', 'days', 5);

// Adjust a date by subtracting 2 months
adjustDate(new Date(), 'months', -2);

// Adjust a timestamp by adding 10 hours
adjustDate(1710000000000, 'hours', 10);
```

## Notes:

- The `adjustDate` function is **not** an extension of `Date`, but it is internally used by the
  `add` and `subtract` methods.
- When adding months, if the resulting day does not exist in the target month, it automatically
  adjusts (e.g., January 31 + 1 month → February 29 in a leap year).
- Unlike `add` and `subtract`, which operate directly on `Date` instances, `adjustDate` provides a
  more flexible way to modify dates from various input types.
- This function does not modify the original Date object but instead returns a new one.
