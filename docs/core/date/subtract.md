# Subtract from Date

This documentation explains how to extend the `Date` object with the `subtract` method, and includes
a standalone `adjustDate` function to adjust dates by specific time units.

## Function Overview

### `subtract(timeUnit: TimeUnit, increment: number): Date`

Extends the `Date` prototype to allow for subtracting time units.

#### Parameters:

- **`timeUnit`** (`'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'`):  
  The unit of time to subtract. Case-sensitive.
- **`increment`** (`number`): The number of units to adjust the date by.
  - A **positive number** `subtracts` time.
  - A **negative number** `adds` time.

#### Returns:

- **`Date`**: A new `Date` object with the adjusted time.

## Time Units

Below are the available time units and their explicit meanings:

- **`'seconds'`** – Subtract the specified number of seconds from the date.
- **`'minutes'`** – Subtract the specified number of minutes from the date.
- **`'hours'`** – Subtract the specified number of hours from the date.
- **`'days'`** – Subtract the specified number of days from the date.
- **`'weeks'`** – Subtract the specified number of weeks (7 days per week) from the date.
- **`'months'`** – Subtract the specified number of months from the date, adjusting for varying
  month lengths.
- **`'years'`** – Subtract the specified number of years from the date, adjusting for leap years
  when applicable.

## Usage Examples:

```typescript
// Subtract 5 days from the current date
const newDate = new Date().subtract('days', 5);

// Subtract 2 months from the current date
const pastDate = new Date().subtract('months', 2);

// Edge case: Subtracting 1 month from February 29, 2024
// February 2024 is a leap year, so February 29 exists. 
// When subtracting 1 month, the function adjusts the date to January 29, 2024.
const februaryDate = new Date(2024, 1, 29).subtract('months', 1);


// Add 10 days to the current date (moving forward in time)
const futureDate = new Date().subtract('days', -10);

// Add 2 years to a specific date (moving forward in time)
const futureYearDate = new Date(2024, 5, 15).subtract('years', -2);

// Subtract 3 hours from the current time
const pastTime = new Date().subtract('hours', 3);

// Subtract 30 minutes from a specific time
const pastTimeWithMinutes = new Date(2024, 5, 15, 14, 0).subtract('minutes', 30);
```

### Notes:

- In the edge case where you subtract a month from February 29 (2024, a leap year), the function
  adjusts the date to January 29, 2024, as February does not have 29 days in non-leap years.
- This function does **not** modify the original `Date` object but returns a new one.
