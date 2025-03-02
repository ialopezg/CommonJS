
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
