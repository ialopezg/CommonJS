import { expect } from 'chai';

import { isFunction } from '../../common/helpers';

describe('isFunction', () => {
  it('should return false when an undefined object or function is passed', function () {
    expect(isFunction(undefined)).to.be.false;
  });

  it('should return true when a prototype class is passed', function () {
    class Test {}

    expect(isFunction(Test)).to.be.true;
  });


  it('should return true if a constructor function is passed', function () {
    expect(isFunction(function () {})).to.be.true;
    expect(isFunction(function foo() {})).to.be.true;
    expect(isFunction(class {})).to.be.true;
    expect(isFunction(class Foo {})).to.be.true;
  });
});
