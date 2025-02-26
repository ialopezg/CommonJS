import './string.helper';

declare global {
  interface Number {
    /**
     * Returns the ordinal suffix for the number (e.g., 1st, 2nd, 3rd, 4th).
     *
     * @example
     * (1).getOrdinal(); // "1st"
     * (2).getOrdinal(); // "2nd"
     *
     * @returns {string} The number with its ordinal suffix.
     */
    getOrdinal(): string;

    /**
     * Pads a number or string with a specified character to a given length.
     * The default length is 2 characters if not provided.
     *
     * @param {string} [padChar='0'] - The character used for padding (must be a non-empty string). Default is '0'.
     * @param {number} [length=2] - The target length of the padded string. Default is 2.
     * @param {'left' | 'right'} [position='left'] - The position where the padding should be added ('left' or 'right'). Default is 'left'.
     *
     * @returns {string} The padded string.
     *
     * @throws {TypeError} If the `length` is not a non-negative number.
     * @throws {Error} If the `padChar` is not a single character or is empty.
     *
     * @example
     * padWithChar(42, '0'); // "42" (no padding needed)
     * padWithChar(5, '0', 3); // "005"
     * padWithChar('abc', '*', 7, 'left'); // "***abc"
     * padWithChar(5, ' ', 3, 'right'); // "  5"
     */
    padWithChar: (
      padChar?: string,
      length?: number,
      position?: 'left' | 'right',
    ) => string;
  }

  interface NumberConstructor {
    /**
     * Returns the ordinal suffix for a number.
     *
     * @param {number} value - The number to format.
     * @returns {string} The number with its ordinal suffix.
     *
     * @example
     * Number.getOrdinal(3); // "3rd"
     */
    getOrdinal(value: number): string;

    /**
     * Pads a number as a string with a specified character to a given length.
     * @param {number} value - The number to be padded.
     * @param {string} [padChar='0'] - The character to use for padding.
     * @param {number} [length=2] - The desired total length of the resulting string.
     * @param {'left' | 'right'} [position='left'] - Whether to pad on the left or right side.
     * @returns {string} The padded string representation of the number.
     * @throws {Error} If the provided length is negative.
     * @example
     * Number.padWithChar(42, '0', 5, 'left'); // "00042"
     * Number.padWithChar(7, '*', 4, 'right'); // "7***"
     */
    padWithChar(
      value: number,
      padChar?: string,
      length?: number,
      position?: 'left' | 'right',
    ): string;
  }
}

/**
 * Returns the ordinal suffix for a number (e.g., 1st, 2nd, 3rd, 4th).
 *
 * @param {number} value - The number to format.
 * @returns {string} The number with its ordinal suffix.
 *
 * @example
 * (1).getOrdinal(); // "1st"
 * Number.getOrdinal(2); // "2nd"
 */
const getOrdinal = (value: number): string => {
  if (value % 100 >= 11 && value % 100 <= 13) {
    return `${value}th`;
  }

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

if (typeof Number.prototype.getOrdinal === 'undefined') {
  Number.prototype.getOrdinal = function(): string {
    return getOrdinal(this);
  };
}
if (typeof Number.getOrdinal === 'undefined') {
  Number.getOrdinal = function (): string {
    return getOrdinal(this);
  };
}
Number.getOrdinal = getOrdinal;

if (typeof Number.prototype.padWithChar === 'undefined') {
  Number.prototype.padWithChar = function (
    padChar: string = '0',
    length: number = 2,
    position: 'left' | 'right',
  ): string {
    return String(this).padWithChar(padChar, length, position);
  };
}
if (typeof Number.padWithChar === 'undefined') {
  Number.padWithChar = function (
    value: number,
    padChar: string = '0',
    length: number = 2,
    position: 'left' | 'right' = 'left',
  ): string {
    return String(value).padWithChar(padChar, length, position);
  };
}
