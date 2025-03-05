import { expect } from 'chai';

import { isArray } from '../../common/helpers';

describe('isArray', () => {
  it('should return true when an array value is passed', function () {
    expect(isArray([1, 2, 3])).to.be.true;
  });

  it('should return false when a non-array value is passed', function () {
    expect(isArray('false')).to.be.false;
    expect(isArray(true)).to.be.false;
  });
});
