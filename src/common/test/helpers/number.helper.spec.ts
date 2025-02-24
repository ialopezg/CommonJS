import { expect } from 'chai';

import '../../helpers/string.helper';
import '../../helpers/number.helper';

describe('Number', () => {
  describe('getOrdinal', () => {
    it('should return the ordinal value for given number', () => {
      expect(Number(1).getOrdinal()).to.equals('1st');
      expect(Number(2).getOrdinal()).to.equals('2nd');
      expect(Number(3).getOrdinal()).to.equals('3rd');
      expect(Number(4).getOrdinal()).to.equals('4th');
      expect(Number(11).getOrdinal()).to.equals('11th');
      expect(Number(21).getOrdinal()).to.equals('21st');
      expect(Number(102).getOrdinal()).to.equals('102nd');
      expect(Number(113).getOrdinal()).to.equals('113th');
    });
  });

  describe('padWithChar', () => {
    // Instance Method Tests
    it('should throw an error when length is negative', () => {
      expect(() => (42).padWithChar('0', -5)).to.throw(
        TypeError,
        'Length must be a non-negative number',
      );
    });

    it('should throw an error when padding character is empty', () => {
      expect(() => (42).padWithChar('', 5)).to.throw(
        Error,
        'Padding character must be a single non-empty character',
      );
    });

    it('should pad the string on the left with the given character (instance method)', () => {
      const result = (42).padWithChar('*', 5, 'left');
      expect(result).to.equal('***42');
    });

    it('should pad the string on the right with the given character (instance method)', () => {
      const result = (42).padWithChar('*', 5, 'right');
      expect(result).to.equal('42***');
    });

    it('should pad the string on the left with the default position if not specified (instance method)', () => {
      const result = (42).padWithChar('*', 5);
      expect(result).to.equal('42***'); // Default padding is on the right
    });

    it('should not change the string if the length is equal to the original length (instance method)', () => {
      const result = (42).padWithChar('*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string to the specified length even if the padding character is not needed (instance method)', () => {
      const result = (42).padWithChar('*', 10, 'right');
      expect(result).to.equal('42********');
    });

    // Static Method Tests
    it('should pad the string with default options (static method)', () => {
      const result = Number.padWithChar(42, '*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string on the left with the given character (instance method)', () => {
      expect((42).padWithChar('*')).to.equal('42');
    });

    it('should pad the string on the left with the given character (static method)', () => {
      const result = Number.padWithChar(42, '*', 5, 'left');
      expect(result).to.equal('***42');
    });

    it('should pad the string on the right with the given character (static method)', () => {
      const result = Number.padWithChar(42, '*', 5, 'right');
      expect(result).to.equal('42***');
    });

    it('should pad the string on the left with the default position if not specified (static method)', () => {
      const result = Number.padWithChar(42, '*', 5);
      expect(result).to.equal('***42'); // Default padding is on the left
    });

    it('should not change the string if the length is equal to the original length (static method)', () => {
      const result = Number.padWithChar(42, '*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string to the specified length even if the padding character is not needed (static method)', () => {
      const result = Number.padWithChar(42, '*', 10, 'right');
      expect(result).to.equal('42********');
    });
  });
});
