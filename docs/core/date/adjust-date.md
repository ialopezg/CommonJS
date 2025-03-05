# AdjustDate Utilities

This documentation provides usage instructions for extending the `Date` object with `add` and `subtract` methods, and includes a standalone `adjustDate` function for adjusting dates by specific time units.

## Functions

### `adjustDate(date: Date | string | number, timeUnit: TimeUnit = 'days', increment: number): Date`

Adjust the provided date by a given time unit and increment.

#### Parameters:
- `date` (Date | string | number): The base date to adjust. It can be a `Date` object, a date string, or a timestamp (number).
- `timeUnit` (string): The unit of time to adjust (`'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'months'`, `'years'`). Default is `'days'`.
- `increment` (number): The number of units to adjust. Positive values add, negative values subtract.

#### Returns:
- `Date`: The adjusted `Date` object.

#### Example:
```typescript
adjustDate('2025-03-01T12:00:00', 'days', 5); // Adds 5 days
adjustDate(new Date(), 'months', -2); // Subtracts 2 months from the current date
```

---

### `add(timeUnit: TimeUnit, increment: number): Date`

Adds the specified number of time units to the current date.

#### Parameters:
- `timeUnit` (string): The unit of time to add (`'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'months'`, `'years'`).
- `increment` (number): The number of units to add (positive number).

#### Returns:
- `Date`: The new `Date` object after the addition.

#### Example:
```typescript
new Date().add('days', 5); // Adds 5 days to the current date
new Date().add('months', 2); // Adds 2 months to the current date
```

---

### `subtract(timeUnit: TimeUnit, increment: number): Date`

Subtracts the specified number of time units from the current date.

#### Parameters:
- `timeUnit` (string): The unit of time to subtract (`'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'months'`, `'years'`).
- `increment` (number): The number of units to subtract (positive number).

#### Returns:
- `Date`: The new `Date` object after the subtraction.

#### Example:
```typescript
new Date().subtract('days', 3); // Subtracts 3 days from the current date
new Date().subtract('weeks', 1); // Subtracts 1 week from the current date
```
