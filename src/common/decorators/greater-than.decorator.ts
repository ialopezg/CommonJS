/**
 * Utility function that checks if a number is strictly greater than a given threshold.
 *
 * @param value - The number to check.
 * @param threshold - The threshold value.
 * @returns True if `value` is strictly greater than `threshold`, false otherwise.
 *
 * @example
 * console.log(isGreaterThan(10, 5)); // true
 * console.log(isGreaterThan(5, 5));  // false
 */
export const isGreaterThan = (value: number, threshold: number): boolean => {
  return value > threshold;
};

/**
 * A property decorator factory that validates if a number is strictly greater than a specified minimum value.
 *
 * @param minValue - The minimum value that the number must exceed.
 *
 * @example
 * class Product {
 *   // The price must be greater than 0.
 *   @GreaterThan(0)
 *   public price: number;
 *
 *   constructor(price: number) {
 *     this.price = price;
 *   }
 * }
 *
 * const validProduct = new Product(10); // Works fine.
 *
 * // This will throw an error:
 * const invalidProduct = new Product(0); // Error: Property "price" must be greater than 0.
 */
export const GreaterThan = (minValue: number): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    let value: number;

    const getter = function() {
      return value;
    };

    const setter = function(newVal: number) {
      if (typeof newVal !== 'number') {
        throw new Error(`Property "${String(propertyKey)}" must be a number.`);
      }
      if (!isGreaterThan(newVal, minValue)) {
        throw new Error(`Property "${String(propertyKey)}" must be greater than ${minValue}.`);
      }
      value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
};
