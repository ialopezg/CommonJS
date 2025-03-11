# Date

A collection of functions for handling date manipulations.

## Available Utilities

The library is organized into several helper modules. Click on the links below for detailed usage
and examples:

| Helper                                                         | Extension | Description                                                                                       | 
|----------------------------------------------------------------|:---------:|---------------------------------------------------------------------------------------------------|
| [add](./add.md)                                                |  &check;  | Adds a specified time unit to a given date. e.g., days, months, years.                            |
| [adjustDate](./adjust-date.md)                                 |           | Modifies a date by a given time unit and increment, supporting both positive and negative values. |
| [humanize](humanize.md)                                        |  &check;  | Converts a date into a human-friendly string representation based on a format.                    |
| [humanizeTimeDiff](humanize.md#human-readable-time-difference) |  &check;  | Produces a human-readable string describing the time difference between two dates.                |
| [isDST](is-dst.md)                                             |  &check;  | Determines whether a given `Date` object falls within Daylight Saving Time (DST).                 |
| [isLeapYear](is-leap-year.md)                                  |  &check;  | Checks if a given year is a leap year.                                                            |
| [relativeTime](./humanize.md#human-readable-relative-time)     |  &check;  | Generates a human-friendly relative time string (e.g., *"5 minutes ago"*, *"in 2 days"*).         |
| [subtract](./subtract.md)                                      |  &check;  | Subtracts a specified time unit from a given date.  e.g., days, months, years.                    |
| [timeDiff](./humanize.md#time-difference-calculation)          |  &check;  | Computes the exact time difference between two dates, returning a structured representation.      |
| [timeElapsed](./time-elapsed.md)                               |  &check;  | Computes the elapsed time between two dates, returning a human-readable duration.                 |

### **Notes:**

- Each function has its own dedicated documentation. Click the corresponding **Helper** link for *
  *detailed explanations, examples, and edge cases**.
- **Leap year handling, month adjustments, and edge cases** (e.g., subtracting from February 29) are
  covered in their respective Markdown files.
- Functions such as `humanize`, `timeDiff`, and `relativeTime` **serve different formatting purposes
  **—check their docs for distinctions.
- The library ensures **non-destructive operations**—modifying a date always returns a **new `Date`
  object** instead of mutating the original.  
