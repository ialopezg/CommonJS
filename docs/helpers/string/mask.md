# Masking Utility Library

A utility library for masking sensitive data such as credit card numbers, phone numbers, email
addresses, and more. The library provides several functions that allow you to easily mask or reveal
parts of a string, making it useful for data privacy and security purposes.

## Features

* **Mask Sensitive Data**: Mask email, phone numbers, credit cards, passwords, tax IDs, and more.
* **Customizable Masking**: Choose specific parts of the string to keep visible.
* **String Extension**: Extend the native String class to allow direct masking on string instances.
* **Multiple Masking Types**: Supports multiple masking types such as email, phone, credit card, tax
  ID, zip codes, bank accounts, and more.
* **Validations**: Basic validation for different types (email, phone, credit card, etc.) before
  applying the mask.

## Installation

To install and use this library in your project, follow these steps:

1. **Clone the Repository:**

```bash
npm install @ialopezg/commonjs
```

2. **Import the Utility**: If you are using this library in a TypeScript project, you can import the
   masking functions or use the extended String prototype.

```typescript
import { mask } from '@ialopezg/commonjs';

const maskedEmail = "john.doe@example.com".mask('email');
const maskedPhone = "123-456-7890".mask('phone');
```

## API

### `String.prototype.mask`

Masks a string based on the provided masking type or custom mask character.

#### Parameters:

* **maskCharOrType (optional)**: The type of masking (e.g., 'email', 'phone', 'credit-card', etc.)
  or a custom mask character (e.g., '*').
* **visibleStart (optional)**: The number of characters to keep visible from the start of the
  string.
* **visibleEnd (optional)**: The number of characters to keep visible from the end of the string.

#### Example

```typescript
const maskedEmail = "john.doe@example.com".mask('email');  // "jo***@example.com"
const maskedPhone = "123-456-7890".mask('phone');  // "******7890"
const maskedCreditCard = "1234-5678-9876-5432".mask('credit-card');  // "************5432"
const customMasked = "12345".mask('*', 1, 3);  // "1***5"

```

### Supported Masking Types:

* **email**: Masks the local part of an email address but keeps the domain.
* **phone**: Masks all digits except for the last 4 digits of a phone number.
* **credit-card**: Masks all digits of the credit card except for the last 4 digits.
* **password**: Fully masks the password (all characters hidden).
* **ssn**: Masks all digits except for the last 4 digits of a social security number. Format
  supported: `United States`
* **iban**: Masks the IBAN, showing only the first 4 characters.
* **zip-code**: Masks a zip code but keeps the first two digits visible.
* **tax-id**: Masks the tax ID number except for the last 4 digits.
* **bank-account**: Masks the bank account number, leaving the first 3 digits visible.
* **driver-license**: Masks the middle digits of a driver's license, keeping the first and last
  digits visible.

### Validation:

The following types are validated before applying the mask:

* **email**: Validates using a regular expression.
* **phone**: Validates based on the E.164 phone format.
* **credit**-card: Validates based on the length of the credit card number (13-19 digits).
* **zip-code**: Validates US zip codes (5 digits).

## Example Use Cases:

### Mask Email:

```typescript
const maskedEmail = "user@example.com".mask('email');
console.log(maskedEmail); // "us***@example.com"
```

### Mask Phone Number:

```typescript
const maskedPhone = "123-456-7890".mask('phone');
console.log(maskedPhone); // "******7890"
```

### Mask Credit Card Number:

```typescript
const maskedCard = "1234-5678-9876-5432".mask('credit-card');
console.log(maskedCard); // "************5432"
```

### Custom Masking:

```typescript
const maskedCustom = "12345".mask('*', 1, 3);
console.log(maskedCustom); // "1***5"
```

### Validations:

If the input string does not match the expected format for the selected mask type (e.g., an invalid
email or phone number), an error will be thrown.

#### Example

```typescript
try {
  const invalidEmail = 'invalid-email'.mask('email');
} catch (error) {
  console.error(error.message); // "Invalid email format"
}
```

### Development

To contribute to the project, fork the repository, make your changes, and submit a pull request.
Please ensure that all code follows the existing code style and includes tests.

1. Clone the repository:

```bash
git clone https://github.com/ialopezg/commonjs.git
cd commonjs
```

2. Install dependencies:

```bash
npm install
```

3. Run tests:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](../../../LICENSE) file for details.
