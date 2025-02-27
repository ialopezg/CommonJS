import { mask } from './string/mask.helper';
import { padWithChar } from './string/pad.helper';

export type MaskType =
  | 'email'
  | 'phone'
  | 'credit-card'
  | 'password'
  | 'ssn'
  | 'iban'
  | 'zip-code'
  | 'tax-id'
  | 'bank-account'
  | 'drivers-license'
  | string; // Allows custom mask characters

declare global {
  interface String {
    /**
     * Masks the current string based on the given masking type or custom mask character.
     *
     * @param maskCharOrType - The type of masking to apply or a custom mask character.
     * @param visibleStart - Number of characters to remain visible at the beginning.
     * @param visibleEnd - Number of characters to remain visible at the end.
     * @returns A masked version of the string.
     */
    mask(
      maskCharOrType?: MaskType | string,
      visibleStart?: number,
      visibleEnd?: number,
    ): string;

    /**
     * Pads the current string with the specified character up to the given length.
     *
     * @param {string} padChar - The character to use for padding.
     * @param {number} [length] - The total desired length of the resulting string. Defaults to the current length.
     * @param {'left' | 'right'} [position='right'] - The side to apply padding ('left' or 'right'). Defaults to 'right'.
     * @returns {string} The padded string.
     *
     * @example
     * "42".padWithChar('*', 5, 'left');  // "***42"
     * "42".padWithChar('0', 4, 'right'); // "4200"
     */
    padWithChar(
      padChar: string,
      length?: number,
      position?: 'left' | 'right',
    ): string;
  }

  interface StringConstructor {
    /**
     * Masks a given string based on the specified masking type or custom character.
     *
     * @param input - The string to be masked.
     * @param maskCharOrType - The type of masking to apply or a custom mask character.
     * @param visibleStart - Number of characters to remain visible at the beginning.
     * @param visibleEnd - Number of characters to remain visible at the end.
     * @param locale - The locale to apply for formatting specific types (e.g., phone numbers).
     * @returns A masked version of the input string.
     */
    mask(
      input: string,
      maskCharOrType?: MaskType,
      visibleStart?: number,
      visibleEnd?: number,
      locale?: string,
    ): string;

    /**
     * Pads a string with the specified character up to the given length.
     *
     * @param {string} str - The string to pad.
     * @param {string} padChar - The character to use for padding.
     * @param {number} [length] - The total desired length of the resulting string. Defaults to the current length.
     * @param {'left' | 'right'} [position='right'] - The side to apply padding ('left' or 'right'). Defaults to 'right'.
     * @returns {string} The padded string.
     *
     * @example
     * String.padWithChar("42", '*', 5, 'left');  // "***42"
     * String.padWithChar("42", '0', 4, 'right'); // "4200"
     */
    padWithChar(
      str: string,
      padChar: string,
      length?: number,
      position?: 'left' | 'right',
    ): string;
  }
}

export const camelize = (value: string) => {
  return value.replace(/^([A-Z])|[\s-_](\w)/g, (_, p, p2, __) => {
    return p2 ? p2.toUpperCase() : p.toLowerCase();
  });
};

/**
 * Capitalize first char of a word.
 *
 * @param {string} value text to be transformed.
 *
 * @returns {string} A new string representing the calling string converted to capitalize string.
 */
export const capitalize = (value: string): string => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;
};

String.prototype.mask = function (
  maskCharOrType?: MaskType,
  visibleStart?: number,
  visibleEnd?: number,
): string {
  return mask(this as string, maskCharOrType, visibleStart, visibleEnd);
};

String.mask = mask;

String.prototype.padWithChar = function (
  padChar: string,
  length: number = 2,
  position: 'left' | 'right' = 'left',
): string {
  return padWithChar(this, padChar, length, position);
};
String.padWithChar = padWithChar;
