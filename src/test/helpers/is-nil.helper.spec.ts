import { expect } from 'chai';

import { isNil } from '../../common/helpers';

describe('isNil', () => {
  it('should return true when a null value is passed', () => {
    expect(isNil(null)).to.be.true;
  });

  it('should return true when an undefined value is passed', function () {
    expect(isNil(undefined)).to.be.true;
  });

  it('should return true when not null or undefined values are passed', function () {
    expect(isNil(-10)).to.be.false;
    expect(isNil('-10.5')).to.be.false;
    expect(isNil(false)).to.be.false;
    expect(isNil([])).to.be.false;
  });
});
