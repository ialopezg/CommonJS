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
 */
export const pad = (
  value: unknown,
  threshold?: number,
  direction: 'LEFT' | 'RIGHT' = 'LEFT',
  pad: string = '0',
): string => {
  const str = String(value);
  const length = str.length;

  if (length >= threshold) {
    return str;
  }

  if (direction === 'LEFT') {
    return Array(threshold - length + 1).join(pad) + str;
  }

  return str + Array(threshold - length + 1).join(pad);
};

export const zeroise = (
  value: unknown,
  threshold: number,
  direction?: 'LEFT' | 'RIGHT',
) => pad(value, threshold, direction);

export const padLeft = (value: unknown, threshold: number) =>
  pad(value, threshold, 'LEFT');

export const padRight = (value: unknown, threshold: number) =>
  pad(value, threshold, 'RIGHT');
