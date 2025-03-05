import { expect } from 'chai';

import { isObject } from '../../common/helpers';

describe('isObject', () => {
  it('should return true when an object value is passed', function () {
    const objectTest = { key: 'key', value: 'value' };

    expect(isObject(objectTest)).to.be.true;
  });

  it('should return false when a non-array value is passed', function () {
    expect(isObject('false')).to.be.false;
    expect(isObject(true)).to.be.false;
  });
});
