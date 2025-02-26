import { expect } from 'chai';

import '../../../helpers/string.helper'

import { mask } from '../../../helpers/string/mask.helper';

describe('Mask function', () => {
  describe('General Custom Masking', () => {
    it('should mask the full string if no visibleStart or visibleEnd is provided', () => {
      expect(mask('HelloWorld')).to.equal('**********');
      expect(mask('SensitiveData', '#')).to.equal('#############');
    });

    it('should mask the full string given char', () => {
      expect(mask('SensitiveData', '•')).to.equal('•••••••••••••');
    });

    it('should mask only the middle characters when visibleStart and visibleEnd are specified', () => {
      expect(mask('SensitiveData', '*', 2, 2)).to.equal('Se*********ta');
      expect(mask('1234567890', '#', 3, 3)).to.equal('123####890');
    });

    it('should return the original string if visibleStart + visibleEnd >= string length', () => {
      expect(mask('Short', '*', 5, 0)).to.equal('Short');
      expect(mask('EdgeCase', '#', 3, 5)).to.equal('EdgeCase');
    });

    it('should throw an error if input is null or undefined', () => {
      expect(() => mask(null as any)).to.throw();
      expect(() => mask(undefined as any)).to.throw();
    });
  });

  describe('Masking Special Types', () => {
    it('should fully mask passwords regardless of visibility parameters', () => {
      expect(mask('SuperSecret123', 'password')).to.equal('**************');
      expect(mask('P@ssw0rd!', 'password', 3, 2)).to.equal('*********');
    });

    it('should correctly mask emails', () => {
      expect(mask('johndoe@example.com', 'email')).to.equal(
        '*******@example.com',
      );
      expect(mask('user1234@test.org', 'email')).to.equal('********@test.org');
      expect(mask('johndoe@example.com', 'email', 1, 1)).to.equal(
        'j*****e@example.com',
      );
      expect(mask('john.doe@example.com', 'email', 3, 2)).to.equal(
        'joh***oe@example.com',
      );
      expect(() => mask('john.doe', 'email')).to.throw()
    });

    it('should correctly mask phone numbers', () => {
      expect(mask('123-456-7890', 'phone')).to.equal('********7890');
      expect(mask('+1 (234) 567-8900', 'phone')).to.equal('*************8900');
    });

    it('should correctly mask credit card numbers', () => {
      expect(mask('4111 1111 1111 1111', 'credit-card')).to.equal('**** **** **** 1111');
      expect(mask('5500123412345678', 'credit-card')).to.equal('************5678');
      expect(mask('4111 1111 1111 1111', 'credit-card', 2)).to.equal('41** **** **** 1111');
    });

    it('should correctly mask SSNs', () => {
      expect(mask('123-45-6789', 'ssn')).to.equal('***-**-6789');
      expect(mask('987654321', 'ssn')).to.equal('*****4321');
    });

    it('should correctly mask IBANs', () => {
      expect(mask('DE44500105175407324931', 'iban')).to.equal(
        'DE44**************4931',
      );
    });

    it('should correctly mask ZIP codes', () => {
      expect(mask('90210', 'zip-code')).to.equal('****0');
      expect(mask('12345-6789', 'zip-code')).to.equal('******6789');
    });

    it('should correctly mask tax IDs', () => {
      expect(mask('12-3456789', 'tax-id')).to.equal('**-***6789');
      expect(mask('123456789', 'tax-id')).to.equal('*****6789');
    });

    it('should correctly mask bank account numbers', () => {
      expect(mask('123456789012', 'bank-account')).to.equal('********9012');
    });

    it("should correctly mask driver's license numbers", () => {
      expect(mask('D123456789', 'drivers-license')).to.equal('D********9');
      expect(mask('D123-456-789', 'drivers-license')).to.equal('D***-***-**9');
    });
  });

  describe('Edge Cases', () => {
    it('should handle short inputs properly', () => {
      expect(mask('a', '*')).to.equal('*');
      expect(mask('ab', '*', 1, 0)).to.equal('a*');
      expect(mask('abc', '*', 1, 1)).to.equal('a*c');
    });

    it('should return the input unchanged if masking is unnecessary', () => {
      expect(mask('open', '*', 4)).to.equal('open');
      expect(mask('visibleData', '*', 6, 5)).to.equal('visibleData');
    });

    it('should allow custom mask characters', () => {
      expect(mask('SensitiveInfo', '#', 2, 2)).to.equal('Se#########fo');
      expect(mask('SecureData', 'X', 3, 3)).to.equal('SecXXXXata');
    });
  });
});
