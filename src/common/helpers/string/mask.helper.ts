import { MaskType } from '../string.helper';

/**
 * Masks a given string based on the specified masking type or custom character.
 *
 * @param {string} input - The string to be masked.
 * @param {MaskType} [maskCharOrType="*"] - The type of masking to apply or a custom mask character.
 * @param {number} [visibleStart=0] - Number of characters to remain visible at the beginning.
 * @param {number} [visibleEnd=0] - Number of characters to remain visible at the end.
 * @returns {string} A masked version of the input string.
 * @throws {Error} If the input string is empty.
 */
export function mask(
  input: string,
  maskCharOrType?: MaskType,
  visibleStart: number = 0,
  visibleEnd: number = 0,
): string {
  if (!input) {
    throw new Error('Input string cannot be empty');
  }

  let maskChar = '*';

  // If no visibleStart and visibleEnd are provided, mask the entire string
  if (!maskCharOrType && visibleStart === 0 && visibleEnd === 0) {
    return maskChar.repeat(input.length);
  }

  switch (maskCharOrType) {
    case 'password':
      return '*'.repeat(input.length); // Always fully masked
    case 'email':
      return maskEmail(input, visibleStart, visibleEnd);
    case 'phone':
      return maskPhone(input);
    case 'credit-card':
      return maskCreditCard(
        input,
        maskChar,
        visibleStart,
        visibleEnd > 0 ? visibleEnd : undefined,
      );
    case 'ssn':
      return maskSSN(input);
    case 'iban':
      return maskIBAN(input);
    case 'zip-code':
      return maskZipCode(input);
    case 'tax-id':
      return maskTaxID(input);
    case 'bank-account':
      return maskBankAccount(input);
    case 'drivers-license':
      return maskDriversLicense(input);
    default:
      if (typeof maskCharOrType === 'string' && maskCharOrType.length === 1) {
        maskChar = maskCharOrType;
      }

      return maskCustom(input, maskChar, visibleStart, visibleEnd);
  }
}

/**
 * Masks an email address, fully masking the username by default.
 * If `visibleStart` and `visibleEnd` are provided, only masks the middle part accordingly.
 *
 * @param {string} email - The email address to be masked.
 * @param {number} [visibleStart=0] - Number of characters to remain visible at the beginning.
 * @param {number} [visibleEnd=0] - Number of characters to remain visible at the end.
 * @returns {string} A masked email address.
 */
function maskEmail(
  email: string,
  visibleStart: number = 0,
  visibleEnd: number = 0,
): string {
  const [user, domain] = email.split('@');
  if (!domain) {
    throw new Error('Invalid email address!');
  }

  // Default behavior: Mask full username
  if (visibleStart === 0 && visibleEnd === 0) {
    return '*'.repeat(user.length) + '@' + domain;
  }

  return maskCustom(user, '*', visibleStart, visibleEnd) + '@' + domain;
}

/**
 * Masks a phone number, keeping only the last 4 digits visible.
 *
 * @param {string} phone - The phone number to be masked.
 * @returns {string} A masked phone number.
 */
function maskPhone(phone: string): string {
  return maskCustom(phone, '*', 0, 4);
}

/**
 * Masks a credit card number, keeping only the last 4 digits visible.
 *
 * @param {string} cardNumber - The credit card number to be masked.
 * @param {string} [maskChar="*"] - The masking to apply.
 * @param {number} [visibleStart=0] - Number of characters to remain visible at the beginning.
 * @param {number} [visibleEnd=4] - Number of characters to remain visible at the end.
 * @returns {string} A masked credit card number.
 */
function maskCreditCard(
  cardNumber: string,
  maskChar: string = '*',
  visibleStart: number = 0,
  visibleEnd: number = 4,
): string {
  const hasSpaces = cardNumber.includes(' ');

  // Slice the visibleStart portion if it exists
  const firstVisible =
    visibleStart > 0 ? cardNumber.slice(0, visibleStart) : '';
  // Get the last visible portion (visibleEnd)
  const lastVisible = cardNumber.slice(-visibleEnd);
  // Mask the middle portion
  let middleMask = cardNumber.slice(visibleStart, -visibleEnd).trim();

  // If there are spaces in the middle, handle masking each group individually
  if (hasSpaces) {
    middleMask = middleMask
      .split(' ')
      .map((group) => maskChar.repeat(group.length))
      .join(' ');

    return firstVisible.length < 4
      ? firstVisible + middleMask + ' ' + lastVisible
      : [firstVisible, middleMask, lastVisible].join(' ');
  }

  middleMask = maskChar.repeat(middleMask.length);

  return [firstVisible, middleMask, lastVisible].filter(Boolean).join('');
}

/**
 * Masks a Social Security Number (SSN), keeping only the last 4 digits visible.
 *
 * @param {string} ssn - The SSN to be masked.
 * @param {string} [maskChar="*"] - The masking to apply.
 * @param {number} [visibleStart=0] - Number of characters to remain visible at the beginning.
 * @param {number} [visibleEnd=4] - Number of characters to remain visible at the end.
 * @returns {string} A masked SSN.
 */
function maskSSN(
  ssn: string,
  maskChar: string = '*',
  visibleStart: number = 0,
  visibleEnd: number = 4,
): string {
  const hasDashes = ssn.includes('-');
  const firstVisible = visibleStart > 0 ? ssn.slice(0, visibleStart) : '';
  const lastVisible = ssn.slice(-visibleEnd);
  let middleMask = ssn
    .slice(visibleStart, -(visibleEnd + (hasDashes ? 1 : 0)))
    .trim();

  if (hasDashes) {
    middleMask = middleMask
      .split('-')
      .map((group) => maskChar.repeat(group.length))
      .join('-');
  } else {
    middleMask = maskChar.repeat(middleMask.length);
  }

  return [firstVisible, middleMask, lastVisible]
    .filter(Boolean)
    .join(hasDashes ? '-' : '');
}

/**
 * Masks an IBAN (International Bank Account Number), keeping the first 4 and last 4 digits visible.
 *
 * @param {string} iban - The IBAN to be masked.
 * @returns {string} A masked IBAN.
 */
function maskIBAN(iban: string): string {
  return maskCustom(iban, '*', 4, 4);
}

/**
 * Masks a ZIP code, keeping only the last digit visible.
 *
 * @param {string} zip - The ZIP code to be masked.
 * @returns {string} A masked ZIP code.
 */
function maskZipCode(zip: string): string {
  const hasDashes = zip.includes('-');
  if (hasDashes) {
    return maskCustom(zip, '*', 0, 4);
  }

  return maskCustom(zip, '*', 0, 1);
}

/**
 * Masks a tax ID, keeping only the last 4 digits visible.
 *
 * @param {string} taxId - The tax ID to be masked.
 * @returns {string} A masked tax ID.
 */
function maskTaxID(taxId: string): string {
  const hasDashes = taxId.includes('-');
  if (hasDashes) {
    const lastVisible = taxId.slice(-4);
    return (
      taxId
        .slice(0, -4)
        .split('-')
        .map((group) => '*'.repeat(group.length))
        .join('-') + lastVisible
    );
  }

  return maskCustom(taxId, '*', 0, 4);
}

/**
 * Masks a bank account number, keeping only the last 4 digits visible.
 *
 * @param {string} accountNumber - The bank account number to be masked.
 * @returns {string} A masked bank account number.
 */
function maskBankAccount(accountNumber: string): string {
  return maskCustom(accountNumber, '*', 0, 4);
}

/**
 * Masks a driver's license number, keeping only the first character and last digit visible.
 *
 * @param {string} license - The driver's license number to be masked.
 * @returns {string} A masked driver's license number.
 */
function maskDriversLicense(license: string): string {
  const hasDashes = license.includes('-');
  if (hasDashes) {
    const firstVisible = license.slice(0, 1);
    const lastVisible = license.slice(-1);
    return (
      firstVisible +
      license
        .slice(1, -1)
        .split('-')
        .map((group) => '*'.repeat(group.length))
        .join('-') +
      lastVisible
    );
  }

  return maskCustom(license, '*', 1, 1);
}

/**
 * Generic masking function for custom cases.
 *
 * @param {string} input - The string to be masked.
 * @param {string} maskChar - The character used for masking.
 * @param {number} visibleStart - Number of characters to remain visible at the beginning.
 * @param {number} visibleEnd - Number of characters to remain visible at the end.
 * @returns {string} A masked string.
 */
function maskCustom(
  input: string,
  maskChar: string,
  visibleStart: number,
  visibleEnd: number,
): string {
  if (visibleStart + visibleEnd >= input.length) {
    return input; // Not enough characters to mask
  }

  const maskedPart = maskChar.repeat(
    input.length - (visibleStart + visibleEnd),
  );
  return (
    input.slice(0, visibleStart) +
    maskedPart +
    input.slice(input.length - visibleEnd)
  );
}
