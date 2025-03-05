import { expect } from 'chai';

import { getValueFor } from '../../common/helpers';

describe('getValueFor', () => {
  const objectTest = {
    test: {
      child: {
        string: 's',
        number: 2,
        boolean: true,
      }
    }
  };

  it('should return a value for given property in target object', () => {
    const value = getValueFor(objectTest, 'test.child.string');

    expect(value).to.be.eq('s');
  });

  it('should return undefined value when given property found in the target object', () => {
    const value = getValueFor(objectTest, 'test.child.notFound');

    expect(value).to.be.eq(undefined);
  });

  it('should return null undefined value for given property when target empty', () => {
    const value = getValueFor(null, 'test.child.notFound');

    expect(value).to.be.eq(undefined);
  });

  it('should return null value when given property is empty', () => {
    const value = getValueFor(objectTest, '');

    expect(value).to.be.eq(null);
  });
});
