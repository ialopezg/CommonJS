# Add to Date

This documentation explains how to extend the `Date` object with the `add` function for adjusting  
dates by specific time units.

## Function Overview

### `add(timeUnit: TimeUnit, increment: number): Date`

Extends the `Date` prototype to allow adding time units.

#### Parameters:

- **`timeUnit`** (`'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'`):  
  The unit of time to adjust. Case-sensitive.
- **`increment`** (`number`): The number of units to adjust the date by.
  - A **positive number** `adds` time.
  - A **negative number** `subtracts` time.

#### Returns:

- **`Date`**: A new `Date` object with the updated time.

## Time Units

Below are the available time units and their explicit meanings:

- **`'seconds'`** – Adds the specified number of seconds to the date.
- **`'minutes'`** – Adds the specified number of minutes to the date.
- **`'hours'`** – Adds the specified number of hours to the date.
- **`'days'`** – Adds the specified number of days to the date.
- **`'weeks'`** – Adds the specified number of weeks (7 days per week) to the date.
- **`'months'`** – Adds the specified number of months to the date, adjusting for varying month  
  lengths.
- **`'years'`** – Adds the specified number of years to the date, adjusting for leap years when  
  applicable.

## Usage Examples:

```typescript
// Add 5 days to the current date
const newDate = new Date().add('days', 5);

// Add 2 months to the current date
const futureDate = new Date().add('months', 2);

// Edge case: Adding 1 month to January 31
const februaryDate = new Date(2024, 0, 31).add('months', 1); // Handles overflow

// Subtract 10 days from the current date (past date example)
const pastDate = new Date().add('days', -10);

// Subtract 2 years from a specific date
const pastYearDate = new Date(2024, 5, 15).add('years', -2);

// Add 3 hours to the current time
const futureTime = new Date().add('hours', 3);

// Subtract 30 minutes from a specific time
const pastTime = new Date(2024, 5, 15, 14, 0).add('minutes', -30);
```

### Notes:

- When adding months, if the resulting day does not exist in the target month,
  it automatically adjusts (e.g., January 31 + 1 month → February 29 in a leap year).
- This function does **not** modify the original `Date` object but returns a new one.
