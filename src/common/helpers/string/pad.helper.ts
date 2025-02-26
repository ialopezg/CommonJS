/**
 * Pads the current string with zeros (multiple times, if needed) until the resulting string reaches
 * the given length. The padding is applied from the start or end of the current string.
 *
 * @param {string|number} value
 * @param {number} threshold Optional. The length of the resulting string once the current string
 * has been padded. If the value is less than string length, then string is returned as-is.
 * @param {string} direction Optional. Padding direction. Accepted values: LEFT | RIGHT.
 * @param {string} pad Optional.
 *
 * @returns {string} The padded string.
 *
 * @deprecated Use {@link padWithChar} instead.
 * This function will be removed in future versions.
 */
export const pad = (
  value: unknown,
  threshold?: number,
  direction: 'left' | 'right' = 'left',
  pad: string = '0',
): string => {
  const str = String(value);
  const length = str.length;

  if (length >= threshold) {
    return str;
  }

  if (direction === 'left') {
    return Array(threshold - length + 1).join(pad) + str;
  }

  return str + Array(threshold - length + 1).join(pad);
};

/**
 * @deprecated Use {@link padWithChar} instead.
 * This function will be removed in future versions.
 */
export const zeroise = (
  value: string | number,
  threshold: number,
  direction: 'left' | 'right' = 'left',
) => padWithChar(value, '0', threshold, direction);

/**
 * @deprecated Use {@link padWithChar} instead.
 * This function will be removed in future versions.
 */
export const padLeft = (value: string | number, threshold: number) =>
  padWithChar(value, '0', threshold, 'left');

/**
 * @deprecated Use {@link padWithChar} instead.
 * This function will be removed in future versions.
 */
export const padRight = (value: string | number, threshold: number) =>
  padWithChar(value, '0', threshold, 'right');

/**
 * Pads a number or string with a specified character to a given length.
 * The default length is 2 characters if not provided.
 *
 * @param {number | string} value - The value to be padded (either a number or a string).
 * @param {string} padChar - The character used for padding (must be a non-empty string).
 * @param {number} length - The target length of the padded string. Default is 2.
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
export function padWithChar(
  value: number | string,
  padChar: string,
  length: number,
  position: 'left' | 'right' = 'left',
): string {
  if (typeof length !== 'number' || length < 0) {
    throw new TypeError('Length must be a non-negative number');
  }

  if (!padChar || padChar.length !== 1) {
    throw new Error('Padding character must be a single non-empty character');
  }

  const strValue = String(value);
  const padLength = Math.max(0, length - strValue.length);
  const padding = padChar.repeat(padLength);

  return position === 'left' ? padding + strValue : strValue + padding;
}
