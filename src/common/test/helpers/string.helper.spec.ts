import { expect } from 'chai';

import { camelize, capitalize } from '../../helpers';
import {
  pad,
  padLeft,
  padRight,
  zeroise,
} from '../../helpers/string/pad.helper'; // Adjust the import based on your actual file structure

describe('string', () => {
  it('should camelize a string value', () => {
    expect(camelize('EquipmentClass name')).to.be.equal('equipmentClassName');
    expect(camelize('Equipment className')).to.be.equal('equipmentClassName');
    expect(camelize('equipment class name')).to.be.equal('equipmentClassName');
    expect(camelize('Equipment Class Name')).to.be.equal('equipmentClassName');
    expect(camelize('equipment_class_name')).to.be.equal('equipmentClassName');
    expect(camelize('Equipment-Class-Name')).to.be.equal('equipmentClassName');
  });

  it('should return a capitalized word', () => {
    const word = 'WORD';

    expect(capitalize(word)).to.be.eql('Word');
  });

  it('should return a pad right value', () => {
    const number = 17;

    expect(pad(number, 2)).to.be.eql('17');
    expect(pad(number, 4)).to.be.eql('0017');
    expect(pad(number, 4, 'left')).to.be.eql('0017');
    expect(pad(number, 4, 'left', '0')).to.be.eql('0017');
    expect(pad(number, 4, 'right', '0')).to.be.eql('1700');
  });

  it('should return a zeroized value', () => {
    const number = 17;

    expect(zeroise(number, 4)).to.be.eql('0017');
    expect(zeroise(number, 4, 'right')).to.be.eql('1700');
  });

  it('should return a pad left value', () => {
    const number = 17;

    expect(padLeft(number, 4)).to.be.eql('0017');
  });

  it('should return a pad right value', () => {
    const number = 17;

    expect(padRight(number, 4)).to.be.eql('1700');
  });

  describe('padWithChar', () => {
    // Instance Method Tests
    it('should throw an error when length is negative', () => {
      expect(() => '42'.padWithChar('*', -5, 'right')).to.throw(
        TypeError,
        'Length must be a non-negative number',
      );
    });

    it('should throw an error when padding character is empty', () => {
      expect(() => '42'.padWithChar('', 5, 'right')).to.throw(
        Error,
        'Padding character must be a single non-empty character',
      );
    });

    it('should pad the string on the left with the given character (instance method)', () => {
      const result = '42'.padWithChar('*', 5, 'left');
      expect(result).to.equal('***42');
    });

    it('should pad the string on the right with the given character (instance method)', () => {
      const result = '42'.padWithChar('*', 5, 'right');
      expect(result).to.equal('42***');
    });

    it('should pad the string on the left with the default position if not specified (instance method)', () => {
      const result = '42'.padWithChar('*', 5);
      expect(result).to.equal('42***'); // Default padding is on the right
    });

    it('should not change the string if the length is equal to the original length (instance method)', () => {
      const result = '42'.padWithChar('*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string to the specified length even if the padding character is not needed (instance method)', () => {
      const result = '42'.padWithChar('*', 10, 'right');
      expect(result).to.equal('42********');
    });

    it('should handle padding with different characters (instance method)', () => {
      const result = 'abc'.padWithChar('#', 6, 'right');
      expect(result).to.equal('abc###');
    });

    it('should work with an empty string (instance method)', () => {
      const result = ''.padWithChar('*', 5, 'left');
      expect(result).to.equal('*****');
    });

    // Static Method Tests
    it('should pad the string with default options (static method)', () => {
      const result = String.padWithChar('42', '*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string on the left with the given character (instance method)', () => {
      expect('42'.padWithChar('*')).to.equal('42');
    });

    it('should pad the string on the left with the given character (static method)', () => {
      const result = String.padWithChar('42', '*', 5, 'left');
      expect(result).to.equal('***42');
    });

    it('should pad the string on the right with the given character (static method)', () => {
      const result = String.padWithChar('42', '*', 5, 'right');
      expect(result).to.equal('42***');
    });

    it('should pad the string on the left with the default position if not specified (static method)', () => {
      const result = String.padWithChar('42', '*', 5);
      expect(result).to.equal('***42'); // Default padding is on the right
    });

    it('should not change the string if the length is equal to the original length (static method)', () => {
      const result = String.padWithChar('42', '*', 2);
      expect(result).to.equal('42');
    });

    it('should pad the string to the specified length even if the padding character is not needed (static method)', () => {
      const result = String.padWithChar('42', '*', 10, 'right');
      expect(result).to.equal('42********');
    });

    it('should handle padding with different characters (static method)', () => {
      const result = String.padWithChar('abc', '#', 6, 'right');
      expect(result).to.equal('abc###');
    });

    it('should work with an empty string (static method)', () => {
      const result = String.padWithChar('', '*', 5, 'left');
      expect(result).to.equal('*****');
    });
  });
});
