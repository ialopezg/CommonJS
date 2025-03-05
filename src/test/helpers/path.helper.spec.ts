import { expect } from 'chai';

import { isString, validatePath } from '../../common/helpers';

describe('isString', () => {
  it('should return a valid *nix path', () => {
    const path = 'media/icons/check.svg';

    expect(validatePath(path)).to.be.eql('/media/icons/check.svg');
  });

  it('should validate path and return it as an *nix path', () => {
    const path = '/media/icons/check.svg';

    expect(validatePath(path)).to.be.eql(path);
  });
});
