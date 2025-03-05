import { expect } from 'chai';

import { isNil, isUndefined } from '../../common/helpers';

describe('isUndefined', () => {
  it('should return true when an undefined value is passed', () => {
    expect(isUndefined(undefined)).to.be.true;
  });

  it('should return true when not undefined value is passed', function () {
    expect(isUndefined(-10)).to.be.false;
    expect(isUndefined('-10.5')).to.be.false;
    expect(isUndefined(false)).to.be.false;
    expect(isUndefined([])).to.be.false;
  });
});
