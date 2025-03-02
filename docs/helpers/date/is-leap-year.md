# **Leap Year Checker Library**

This library provides an easy-to-use method for determining whether a year, `Date` instance, or
timestamp is a leap year. It extends the native JavaScript `Date` constructor and prototype with the
`isLeapYear` function, and also offers a standalone function for use in your code.

## Overview

The isLeapYear function evaluates whether a given year is a leap year. The function accepts either:

* A `Date` object
* A `number` representing the year, or
* A **timestamp** (number representing milliseconds since the Unix epoch)
  The function will return a boolean indicating whether the year is a leap year or not.
  Additionally,
  the function handles BCE years (before 1 AD), invalid years, and out-of-range timestamps.

The function will return a boolean indicating whether the year is a leap year or not. Additionally,
the function handles **BCE years** (before 1 AD), **invalid years**, and out-of-range timestamps.

## **Features**

- **Leap Year Detection**: Identify leap years based on the Gregorian calendar rules.
- **Extends `Date`**: The `isLeapYear` method is available directly from the `Date` constructor and
  its prototype.
- **Standalone Function**: The `isLeapYear` function can also be used independently.
- **Support for Timestamps**: Accepts timestamps (milliseconds since Unix epoch) as input.

---

## **Installation**

To install this library, use your preferred package manager:

### **Using npm**

```bash
npm install @ialopezg/commonjs
```

Using yarn

### **Using npm**

```bash
yarn add @ialopezg/commonjs
```

---

## API Documentation

### `Date.isLeapYear(input: Date | number): boolean`

#### Parameters

* `input`: **Date** | **number**
  * **Date**: A valid `Date` object.
  * **number**: Can be a number representing:
    * A **valid year** between 1 and 9999.
    * A **Unix timestamp** representing the number of milliseconds since the Unix epoch (
      `January 1, 1970`).

  > **Note**: If the number represents a **negative year (BCE)** or a **timestamp that falls outside
  the valid range**, the function returns `false`.

#### Return Value

* Returns `true` if the year is a **leap year**.
* Returns `false` in the following cases:
  * **Invalid year**: Any value outside the valid year range or an invalid `Date` object.
  * **BCE years**: Any year before 1 AD.
  * **Years greater than or equal to 10000.**
  * **Invalid timestamps**: If the timestamp represents an invalid date.

##### Leap Year Calculation

A year is considered a leap year if:

1. It is divisible by 4, but not divisible by 100, unless:
2. It is divisible by 400.

#### Throws

* The function will throw a TypeError if:
  * The input is neither a valid `Date` object nor a valid year or timestamp.
  * The input results in an **invalid** `Date` **instance**.

### `Date.prototype.isLeapYear(): boolean`

#### Returns

* A boolean indicating whether the provided year is a leap year (`true` for leap years, `false` for
  non-leap years).

#### Throws

* `TypeError`: If the input is not a valid Date, timestamp, or year number.

#### Examples

```ts
const date = new Date(2024, 0, 1);
console.log(date.isLeapYear()); // true

const date2 = new Date(1900, 0, 1);
console.log(date2.isLeapYear()); // false
```

## Standalone `isLeapYear` Function

### `isLeapYear(input: Date | number): boolean`

This function can be called independently without modifying the `Date` object. It works the same way
as the `Date.isLeapYear()` method.

#### Parameters

* `input` (Date | number):
  * A `Date` instance.
  * A timestamp (number).
  * A year (number).

#### Returns

* A boolean indicating whether the provided year is a leap year (`true` for leap years, `false` for
  non-leap years).

#### Throws

* `TypeError`: If the input is not a valid Date, timestamp, or year number.

#### Examples

```ts
import { isLeapYear } from '@ialopezg/commonjs';

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(1900)); // false
console.log(isLeapYear(new Date(2024, 0, 1))); // true
console.log(isLeapYear(1704067200000)); // true (Timestamp for 2024-01-01)
```

## Example Usage

### Example 1: Valid Year

```ts
console.log(isLeapYear(2024));  // true (2024 is a leap year)
```

### Example 2: Invalid Year

```ts
console.log(isLeapYear(10000));  // false (10000 is out of range)
console.log(isLeapYear(0));      // false (0 is not a valid year)
```

### Example 3: BCE Year (Before Common Era)

```ts
console.log(isLeapYear(-500));   // false (BCE years are considered invalid)
```

### Example 4: Valid Date Object

```ts
console.log(isLeapYear(new Date(2024, 0, 1))); // true (2024 is a leap year)
```

### Example 5: Timestamp (Unix Epoch)

```ts
console.log(isLeapYear(1704085200000)); // true (2024-01-01, a leap year)
console.log(isLeapYear(NaN));     // throws TypeError
console.log(isLeapYear("invalid")); // throws TypeError
console.log(isLeapYear(10000));  // false (Invalid Unix epoch year)
```

---

## Notes

* **BCE years (before 1 AD)** are not considered valid for leap year calculations, and the function
  will return false for such years.
* **Years greater than or equal to 10000** are considered out of range and will return false.
* **Timestamps** (milliseconds since the Unix epoch) will be parsed, and if the timestamp is within
  a valid range (1970 to 9999 AD), the year will be extracted and checked for leap year status.

---

## Contributing

If you would like to contribute to this project, please fork the repository, make changes, and
submit a pull request. We welcome bug fixes, feature requests, and improvements.

1. Steps to Contribute
2. Fork the repository.
3. Create a new branch (`git checkout -b feature/your-feature`).
4. Make your changes.
5. Run the test suite to ensure everything is working (`npm test`).
6. Commit your changes (`git commit -am 'Add new feature'`).
7. Push to the branch (`git push origin feature/your-feature`).
8. Submit a pull request.

---

## License

This library is open-source and available under the [MIT License](../../../LICENSE).
