import { expect } from 'chai';

import { getValueFor, setValueFor } from '../../helpers';

describe('setValueFor', () => {
  const objectTest = {
    test: {
      child: {
        string: 's',
        number: 2,
        boolean: true,
      },
    },
  };

  it('should thrown an error when given property is empty', () => {
    const value = 'empty';
    const property = '';

    expect(() => {
      setValueFor(objectTest, property, value);
    }).to.throw('key cannot be empty!');
  });

  it('should set an empty value to given property in target object', () => {
    const property = 'test.child.empty';

    setValueFor(objectTest, property);

    expect(getValueFor(objectTest, property)).to.be.eql('');
  });

  it('should set a value to given property in target object', () => {
    const value = new Date().toLocaleString('en-US');
    const property = 'test.child.date';

    setValueFor(objectTest, property, value);

    expect(getValueFor(objectTest, property)).to.be.eql(value);
  });

  it('should set a value to given property when not exists in target object', () => {
    const value = new Date().toLocaleString('en-US');
    const property = 'test.date';

    setValueFor(objectTest, property, value);

    expect(getValueFor(objectTest, property)).to.be.eql(value);
  });
});
