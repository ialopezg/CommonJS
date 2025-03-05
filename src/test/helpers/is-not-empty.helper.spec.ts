import { expect } from 'chai';

import { isNotEmpty } from '../../common/helpers';

describe('isNotEmpty', () => {
  it('should return false when undefined value is passed', function () {
    expect(isNotEmpty(undefined)).to.be.false;
  });

  it('should return false when null value is passed', function () {
    expect(isNotEmpty(undefined)).to.be.false;
  });

  it('should return false when empty object is passed', function () {
    expect(isNotEmpty({})).to.be.false;
  });

  it('should return false when empty array is passed', function () {
    expect(isNotEmpty([])).to.be.false;
  });

  it('should return false when empty string is passed', function () {
    expect(isNotEmpty('')).to.be.false;
  });

  it('should return true when not empty string is passed', function () {
    expect(isNotEmpty('Not empty')).to.be.true;
  });

  it('should return true when not empty object is passed', function () {
    expect(isNotEmpty({ notEmpty: true })).to.be.true;
  });

  it('should return true when not empty object is passed', function () {
    expect(isNotEmpty([1, 2, 3])).to.be.true;
  });

  it('should return true when a function, boolean, date, or number value is passed', function () {
    expect(isNotEmpty(true)).to.be.true;
    expect(isNotEmpty(1)).to.be.true;
    expect(isNotEmpty(new Date())).to.be.true;
  });
});
