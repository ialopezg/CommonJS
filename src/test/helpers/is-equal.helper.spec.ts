import { expect } from 'chai';

import { isEqual } from '../../common/helpers';

describe('isEqual', () => {
  it('should return true when both values passed are content equally', function () {
    expect(isEqual(['a', 'b'], ['a', 'b'])).to.be.true;
    expect(isEqual({ a: 'b' }, { a: 'b' })).to.be.true;
    expect(isEqual('a', 'a')).to.be.true;
    expect(isEqual(true, true)).to.be.true;
    expect(isEqual(1, 1)).to.be.true;
  });

  it('should return false when both values passed are content equally', function () {
    expect(isEqual(['a', 'b'], ['a', 'c'])).to.be.false;
    expect(isEqual({ a: 'b' }, { a: 'c' })).to.be.false;
    expect(isEqual('a', 'b')).to.be.false;
    expect(isEqual(true, false)).to.be.false;
    expect(isEqual(1, 2)).to.be.false;
  });
});
